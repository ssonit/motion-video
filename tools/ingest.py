"""Catalogue the user's own footage (videos + photos) and cut pieces out of it for Remotion.

    python tools/ingest.py scan <slug> [<folder-or-file> ...] [--thresh 0.12] [--every SECONDS] [--rescan]
    python tools/ingest.py cut  <slug> <id> <start> <end> --name <name> [--to <public-subdir>] [--speed 2]
                                [--crop W:H:X:Y] [--height 1080]
    python tools/ingest.py cut  <slug> <image-id> --name <name> [--to ...]      (photos: oriented + resized copy)
    python tools/ingest.py list <slug>

Layout (footage/ is git-ignored except the two catalogue files):
    footage/<slug>/raw/            drop the user's files here (default source of `scan`; sub-folders are fine)
    footage/<slug>/clips.json      machine catalogue: every file with id, size, orientation, shots, cuts made
    footage/<slug>/clips.md        human catalogue: Claude fills "content / usable for" per file and per shot
    footage/<slug>/sheets/<id>-shots-NN.jpg   one labelled thumbnail per detected shot (pick from these)
    footage/<slug>/sheets/<id>-time-NN.jpg    frames every --every s, labelled with the timecode
    footage/<slug>/sheets/images-NN.jpg       all photos, labelled with their id
    studio/public/<to>/<name>.mp4  cut pieces (h264, 30 fps, no audio: the narration is our TTS)

Ids: v01.. videos, i01.. images; stable across re-scans (matched by file path), new files get the next id.
Times accept seconds (12.5) or m:ss(.f) / h:mm:ss.  `cut` re-encodes, so start/end are frame accurate.
The footage audio is dropped on purpose (the user does not speak; voice comes from tools/tts.py).
"""
import argparse, json, math, pathlib, re, shutil, subprocess, sys

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
VIDEO_EXT = {".mp4", ".mov", ".m4v", ".mkv", ".webm", ".avi", ".mts", ".3gp"}
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".bmp", ".gif", ".tif", ".tiff"}
THUMB_W = 320
COLS = 4

try:
    FONT = ImageFont.truetype("arial.ttf", 15)
    FONT_B = ImageFont.truetype("arialbd.ttf", 15)
except OSError:
    FONT = FONT_B = ImageFont.load_default()


# ---------- helpers ----------
def run(cmd: list[str], binary: bool = False):
    p = subprocess.run(cmd, capture_output=True)
    if p.returncode:
        raise RuntimeError(p.stderr.decode(errors="replace")[-1200:])
    return p if binary else p.stdout.decode(errors="replace")


def tc(s: float) -> str:
    s = max(0.0, s)
    m, sec = divmod(s, 60)
    h, m = divmod(int(m), 60)
    return f"{h}:{m:02d}:{sec:04.1f}" if h else f"{m}:{sec:04.1f}"


def parse_t(v: str) -> float:
    parts = [float(x) for x in v.split(":")]
    t = 0.0
    for x in parts:
        t = t * 60 + x
    return t


def fdir(slug: str) -> pathlib.Path:
    return ROOT / "footage" / slug


def load(slug: str) -> dict:
    p = fdir(slug) / "clips.json"
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return {"slug": slug, "items": [], "cuts": []}


def save(slug: str, cat: dict) -> None:
    (fdir(slug) / "clips.json").write_text(json.dumps(cat, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def rel(p: pathlib.Path) -> str:
    try:
        return p.resolve().relative_to(ROOT).as_posix()
    except ValueError:
        return str(p.resolve())


def src_path(item: dict) -> pathlib.Path:
    p = pathlib.Path(item["path"])
    return p if p.is_absolute() else ROOT / p


# ---------- probing ----------
def probe_video(path: pathlib.Path) -> dict:
    j = json.loads(run(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", str(path)]))
    v = next((s for s in j["streams"] if s["codec_type"] == "video"), None)
    if not v:
        raise RuntimeError("no video stream")
    rot = 0
    for sd in v.get("side_data_list", []) or []:
        if "rotation" in sd:
            rot = int(float(sd["rotation"]))
    rot = int((v.get("tags") or {}).get("rotate", rot))
    w, h = v.get("width") or 0, v.get("height") or 0
    if abs(rot) % 180 == 90:
        w, h = h, w  # ffmpeg auto-rotates on decode: report what the viewer sees
    num, _, den = (v.get("r_frame_rate") or "0/1").partition("/")
    fps = float(num) / float(den or 1) if float(den or 1) else 0
    dur = float(j["format"].get("duration") or v.get("duration") or 0)
    return {
        "duration_s": round(dur, 2),
        "width": w,
        "height": h,
        "orientation": "portrait" if h > w else "square" if h == w else "landscape",
        "fps": round(fps, 2),
        "size_mb": round(int(j["format"].get("size", 0)) / 1e6, 1),
        "has_audio": any(s["codec_type"] == "audio" for s in j["streams"]),
        "codec": v.get("codec_name"),
    }


def open_image(path: pathlib.Path) -> Image.Image:
    try:
        im = Image.open(path)
        im = ImageOps.exif_transpose(im)
        return im.convert("RGB")
    except Exception:
        # HEIC etc.: let ffmpeg decode it
        tmp = ROOT / ".tmp" / "ingest-img.png"
        tmp.parent.mkdir(exist_ok=True)
        run(["ffmpeg", "-v", "error", "-y", "-i", str(path), "-frames:v", "1", str(tmp)])
        return Image.open(tmp).convert("RGB")


def detect_shots(path: pathlib.Path, dur: float, thresh: float, min_len: float = 1.0) -> list[list[float]]:
    """Scene-change boundaries via ffmpeg's scene score (on a small copy of the stream, so it is fast)."""
    p = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-an", "-sn",
         "-vf", f"scale=192:-2,select='gt(scene,{thresh})',showinfo", "-f", "null", "-"],
        capture_output=True,
    )
    cuts = [float(m) for m in re.findall(r"pts_time:([0-9.]+)", p.stderr.decode(errors="replace"))]
    bounds = [0.0]
    for c in cuts:
        if c - bounds[-1] >= min_len and dur - c >= min_len:
            bounds.append(c)
    bounds.append(dur)
    return [[round(a, 2), round(b, 2)] for a, b in zip(bounds, bounds[1:])]


def grab(path: pathlib.Path, t: float) -> Image.Image | None:
    p = subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", str(path), "-frames:v", "1",
         "-vf", f"scale={THUMB_W}:-2", "-f", "image2pipe", "-vcodec", "png", "-"],
        capture_output=True,
    )
    if p.returncode or not p.stdout:
        return None
    import io
    return Image.open(io.BytesIO(p.stdout)).convert("RGB")


def luma(im: Image.Image) -> float:
    g = im.convert("L").resize((32, 18))
    return sum(g.tobytes()) / (32 * 18)


def sheet(tiles: list[tuple[Image.Image, str]], out_stem: pathlib.Path, per_sheet: int = 12) -> list[str]:
    """Tile labelled thumbnails (COLS wide), several sheets if needed. Returns written file names."""
    written = []
    for k in range(0, len(tiles), per_sheet):
        chunk = tiles[k:k + per_sheet]
        cell_h = max(im.height for im, _ in chunk) + 24
        rows = math.ceil(len(chunk) / COLS)
        canvas = Image.new("RGB", (COLS * (THUMB_W + 6) + 6, rows * (cell_h + 6) + 6), (24, 24, 30))
        d = ImageDraw.Draw(canvas)
        for i, (im, label) in enumerate(chunk):
            x, y = 6 + (i % COLS) * (THUMB_W + 6), 6 + (i // COLS) * (cell_h + 6)
            if im.width != THUMB_W:
                im = im.resize((THUMB_W, round(im.height * THUMB_W / im.width)))
            canvas.paste(im, (x + (THUMB_W - im.width) // 2, y + 24))
            d.text((x + 4, y + 3), label, fill=(255, 210, 120), font=FONT_B)
        name = f"{out_stem.name}-{k // per_sheet + 1:02d}.jpg"
        canvas.save(out_stem.parent / name, quality=85)
        written.append(name)
    return written


# ---------- scan ----------
def collect(sources: list[pathlib.Path]) -> list[pathlib.Path]:
    files = []
    for s in sources:
        if s.is_file():
            files.append(s)
        elif s.is_dir():
            files += [p for p in s.rglob("*") if p.is_file()]
        else:
            sys.exit(f"Not found: {s}")
    return sorted(p for p in files if p.suffix.lower() in VIDEO_EXT | IMAGE_EXT and "sheets" not in p.parts)


def scan_video(item: dict, sheets: pathlib.Path, thresh: float, every: float) -> None:
    path = src_path(item)
    meta = probe_video(path)
    item.update(meta)
    dur = meta["duration_s"]
    shots = detect_shots(path, dur, thresh)
    tiles = []
    for n, (a, b) in enumerate(shots, 1):
        im = grab(path, a + (b - a) * 0.4)
        if im is None:
            continue
        tiles.append((im, f"{item['id']} #{n}  {tc(a)}-{tc(b)}  ({b - a:.1f}s)"))
        shots[n - 1] = {"n": n, "start": a, "end": b, "dur": round(b - a, 2), "luma": round(luma(im))}
    item["shots"] = [s for s in shots if isinstance(s, dict)]
    item["shot_sheets"] = sheet(tiles, sheets / f"{item['id']}-shots")
    step = every or min(10.0, max(1.0, round(dur / 36, 1)))
    ttiles = []
    t = 0.0
    while t < dur:
        im = grab(path, t)
        if im is not None:
            ttiles.append((im, f"{item['id']}  {tc(t)}"))
        t += step
    item["time_sheets"] = sheet(ttiles, sheets / f"{item['id']}-time")
    item["time_step_s"] = step
    dark = [s["n"] for s in item["shots"] if s["luma"] < 25]
    item["flags"] = (["very dark (underexposed?) shots: " + ", ".join(f"#{n}" for n in dark)] if dark else []) + \
                    (["portrait (phone) video"] if meta["orientation"] == "portrait" else []) + \
                    (["low res"] if min(meta["width"], meta["height"]) < 600 else [])


def scan_images(items: list[dict], sheets: pathlib.Path) -> list[str]:
    tiles = []
    for it in items:
        try:
            im = open_image(src_path(it))
        except Exception as e:
            it["error"] = str(e)[-200:]
            continue
        it.update({"width": im.width, "height": im.height,
                   "orientation": "portrait" if im.height > im.width else "landscape" if im.width > im.height else "square",
                   "size_mb": round(src_path(it).stat().st_size / 1e6, 1)})
        it["flags"] = ["low res"] if min(im.width, im.height) < 600 else []
        th = im.copy()
        th.thumbnail((THUMB_W, THUMB_W))
        tiles.append((th, f"{it['id']}  {src_path(it).name[:28]}"))
    for old in sheets.glob("images-*.jpg"):
        old.unlink()
    return sheet(tiles, sheets / "images", per_sheet=16)


def md_section(it: dict) -> str:
    name = pathlib.Path(it["path"]).name
    if it["kind"] == "image":
        return (f"### {it['id']} · {name} · photo {it.get('width')}x{it.get('height')}\n"
                f"- Content: TODO\n- Use for: TODO\n\n")
    lines = [f"### {it['id']} · {name} · {tc(it['duration_s'])} · {it['width']}x{it['height']} {it['orientation']}",
             f"Shot sheets: {', '.join('sheets/' + s for s in it.get('shot_sheets', []))}",
             f"Timecode sheets (1 frame / {it.get('time_step_s')}s, for picking in-points inside long shots): "
             f"{', '.join('sheets/' + s for s in it.get('time_sheets', []))}",
             "- Content: TODO", "- Use for: TODO", "",
             "| # | time | len | what is seen | usable? |", "|---|---|---|---|---|"]
    for s in it.get("shots", []):
        lines.append(f"| {s['n']} | {tc(s['start'])}-{tc(s['end'])} | {s['dur']}s | TODO | |")
    return "\n".join(lines) + "\n\n"


def cmd_scan(a) -> None:
    d = fdir(a.slug)
    (d / "raw").mkdir(parents=True, exist_ok=True)
    sheets = d / "sheets"
    sheets.mkdir(exist_ok=True)
    sources = [pathlib.Path(s).expanduser() for s in a.sources] or [d / "raw"]
    files = collect(sources)
    if not files:
        sys.exit(f"No video/image files found in: {', '.join(map(str, sources))}\n"
                 f"Drop the files into {d / 'raw'} (or pass a folder) and run again.")
    cat = load(a.slug)
    by_path = {it["path"]: it for it in cat["items"]}
    nv = max([int(it["id"][1:]) for it in cat["items"] if it["kind"] == "video"] or [0])
    ni = max([int(it["id"][1:]) for it in cat["items"] if it["kind"] == "image"] or [0])
    new_ids = []
    for f in files:
        key = rel(f)
        if key in by_path:
            continue
        kind = "video" if f.suffix.lower() in VIDEO_EXT else "image"
        if kind == "video":
            nv += 1; iid = f"v{nv:02d}"
        else:
            ni += 1; iid = f"i{ni:02d}"
        it = {"id": iid, "kind": kind, "path": key}
        cat["items"].append(it); by_path[key] = it; new_ids.append(iid)

    todo = [it for it in cat["items"] if it["kind"] == "video" and (a.rescan or it["id"] in new_ids or "shots" not in it)]
    for it in todo:
        print(f"[{it['id']}] {it['path']} ...", flush=True)
        try:
            scan_video(it, sheets, a.thresh, a.every)
            print(f"      {tc(it['duration_s'])}, {it['width']}x{it['height']}, {len(it['shots'])} shots", flush=True)
        except Exception as e:
            it["error"] = str(e)[-300:]
            print(f"      ERROR: {it['error']}", flush=True)
    imgs = [it for it in cat["items"] if it["kind"] == "image"]
    cat["image_sheets"] = scan_images(imgs, sheets) if imgs else []
    save(a.slug, cat)

    md = d / "clips.md"
    if not md.exists():
        md.write_text(
            f"# Footage catalogue: {a.slug}\n\n"
            "Filled by Claude after reading the sheets. Per shot: what is seen, and whether it is usable\n"
            "(sharp? steady? anything private in frame?). Cut with `python tools/ingest.py cut "
            f"{a.slug} <id> <start> <end> --name <name>`.\n\n"
            + (f"Photo sheets: {', '.join('sheets/' + s for s in cat['image_sheets'])}\n\n" if imgs else ""),
            encoding="utf-8")
    with md.open("a", encoding="utf-8") as fh:
        for it in cat["items"]:
            if it["id"] in new_ids and "error" not in it:
                fh.write(md_section(it))
    summary(cat)
    print(f"\nNext: read the sheets in {sheets}, fill {md}")


def summary(cat: dict) -> None:
    print(f"\n{'id':4} {'kind':5} {'len/size':>12} {'shots':>5}  file / flags")
    for it in cat["items"]:
        if it["kind"] == "video":
            size = f"{tc(it.get('duration_s', 0))} {it.get('width', '?')}x{it.get('height', '?')}"
            shots = len(it.get("shots", []))
        else:
            size, shots = f"{it.get('width', '?')}x{it.get('height', '?')}", ""
        flags = "; ".join(it.get("flags", []) + ([f"ERROR {it['error'][:80]}"] if "error" in it else []))
        print(f"{it['id']:4} {it['kind']:5} {size:>12} {shots!s:>5}  {pathlib.Path(it['path']).name}  {flags}")
    if cat.get("cuts"):
        print("\ncuts made:")
        for c in cat["cuts"]:
            print(f"  {c['out']}  <- {c['id']} {c.get('start', '')}-{c.get('end', '')}")


def cmd_list(a) -> None:
    summary(load(a.slug))


# ---------- cut ----------
def cmd_cut(a) -> None:
    cat = load(a.slug)
    it = next((x for x in cat["items"] if x["id"] == a.id), None)
    if not it:
        sys.exit(f"No item {a.id} in footage/{a.slug}/clips.json (run scan first)")
    out_dir = ROOT / "studio" / "public" / (a.to or f"{a.slug}/clips")
    out_dir.mkdir(parents=True, exist_ok=True)
    src = src_path(it)
    rec = {"id": a.id, "name": a.name}
    if it["kind"] == "image":
        im = open_image(src)
        im.thumbnail((1920, 1920))  # never upscales; caps the long side
        out = out_dir / f"{a.name}.jpg"
        im.save(out, quality=90)
    else:
        if a.start is None or a.end is None:
            sys.exit("Video cut needs <start> <end>")
        t0, t1 = parse_t(a.start), parse_t(a.end)
        if t1 <= t0:
            sys.exit("end must be after start")
        vf = []
        if a.crop:
            vf.append(f"crop={a.crop}")
        if a.speed != 1:
            vf.append(f"setpts=PTS/{a.speed}")
        vf += [f"scale=-2:'min({a.height},ih)'", "fps=30", "format=yuv420p"]
        out = out_dir / f"{a.name}.mp4"
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t0:.3f}", "-to", f"{t1:.3f}", "-i", str(src),
             "-vf", ",".join(vf), "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "19",
             "-movflags", "+faststart", str(out)])
        dur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(out)]))
        rec.update({"start": tc(t0), "end": tc(t1), "speed": a.speed, "crop": a.crop, "dur_s": round(dur, 2),
                    "frames_30fps": round(dur * 30)})
    rec["out"] = rel(out)
    rec["public_path"] = out.relative_to(ROOT / "studio" / "public").as_posix()
    cat["cuts"] = [c for c in cat.get("cuts", []) if c["out"] != rec["out"]] + [rec]
    save(a.slug, cat)
    print(json.dumps(rec, indent=2))
    print(f"Use in Remotion: staticFile('{rec['public_path']}')  or footage.json main/pip: path relative to public/<slug>/")


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    s = p.add_subparsers(dest="cmd", required=True)
    c = s.add_parser("scan")
    c.add_argument("slug")
    c.add_argument("sources", nargs="*", help="files/folders (default footage/<slug>/raw)")
    c.add_argument("--thresh", type=float, default=0.12, help="scene-change score 0..1 (lower = more shots)")
    c.add_argument("--every", type=float, default=0, help="seconds between timecode frames (default auto)")
    c.add_argument("--rescan", action="store_true", help="re-analyse videos already in the catalogue")
    c.set_defaults(f=cmd_scan)
    c = s.add_parser("cut")
    c.add_argument("slug"); c.add_argument("id")
    c.add_argument("start", nargs="?"); c.add_argument("end", nargs="?")
    c.add_argument("--name", required=True)
    c.add_argument("--to", help="sub-folder of studio/public (default <slug>/clips)")
    c.add_argument("--speed", type=float, default=1.0, help="2 = twice as fast (screen recordings)")
    c.add_argument("--crop", help="ffmpeg crop W:H:X:Y, applied before scaling")
    c.add_argument("--height", type=int, default=1080, help="max output height (never upscales)")
    c.set_defaults(f=cmd_cut)
    c = s.add_parser("list"); c.add_argument("slug"); c.set_defaults(f=cmd_list)
    a = p.parse_args()
    a.f(a)


if __name__ == "__main__":
    main()
