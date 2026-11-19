"""Fetch a reference video and prepare it for analysis.

    python tools/analyze.py <url-or-file> <slug> [--every SECONDS]

Creates references/<slug>/ with
    source.mp4     the video (downloaded with yt-dlp, or copied from a local file)
    meta.json      duration, size, resolution, fps, audio?
    sheets/sNN.png contact sheets, 6 frames each (2x3, 640px wide), one frame per --every seconds
    subs/          captions if the platform provides them (URLs only)

Then READ the sheets (image viewer) and write references/<slug>/analysis.md.
If a URL cannot be downloaded (login wall, captcha), ask the user to save the file
(e.g. via SaveTik / yt-dlp in their browser) and pass the local path instead.
"""
import argparse, json, math, pathlib, shutil, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent


def sh(cmd: list[str], check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True, check=check)


def probe(path: pathlib.Path) -> dict:
    j = json.loads(sh([
        "ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", str(path)
    ]).stdout)
    v = next((s for s in j["streams"] if s["codec_type"] == "video"), {})
    num, _, den = (v.get("r_frame_rate") or "0/1").partition("/")
    return {
        "duration_s": round(float(j["format"]["duration"]), 2),
        "size_mb": round(int(j["format"]["size"]) / 1e6, 1),
        "width": v.get("width"),
        "height": v.get("height"),
        "fps": round(float(num) / float(den or 1), 2) if float(den or 1) else None,
        "has_audio": any(s["codec_type"] == "audio" for s in j["streams"]),
    }


def fetch(src: str, dest_dir: pathlib.Path) -> pathlib.Path:
    dest = dest_dir / "source.mp4"
    if src.startswith(("http://", "https://")):
        cmd = [
            sys.executable, "-m", "yt_dlp", "-f", "bv*[height<=720]+ba/b[height<=720]/b",
            "--merge-output-format", "mp4", "-o", str(dest_dir / "source.%(ext)s"),
            "--write-info-json", "--write-subs", "--write-auto-subs", "--sub-langs", "all,-live_chat",
            "-P", f"subtitle:{dest_dir / 'subs'}", src,
        ]
        r = subprocess.run(cmd)
        if r.returncode or not dest.exists():
            if not any(dest_dir.iterdir()):
                dest_dir.rmdir()  # don't leave an empty reference folder behind
            sys.exit(
                "\nDownload failed (login wall / captcha / geo block?). Ask the user to download the "
                "video themselves and give you the file path, then run this script with that path."
            )
    else:
        p = pathlib.Path(src).expanduser()
        if not p.exists():
            sys.exit(f"File not found: {p}")
        shutil.copy2(p, dest)
    return dest


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("slug")
    ap.add_argument("--every", type=float, default=0, help="seconds between sampled frames (default: auto)")
    a = ap.parse_args()

    d = ROOT / "references" / a.slug
    d.mkdir(parents=True, exist_ok=True)
    video = fetch(a.source, d)
    meta = probe(video)
    (d / "meta.json").write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")

    every = a.every or max(4, round(meta["duration_s"] / 48))
    sheets = d / "sheets"
    shutil.rmtree(sheets, ignore_errors=True)
    sheets.mkdir()
    sh([
        "ffmpeg", "-loglevel", "error", "-y", "-i", str(video),
        "-vf", f"fps=1/{every},scale=640:-1,tile=2x3", str(sheets / "s%02d.png"),
    ])
    n = len(list(sheets.glob("s*.png")))
    print(json.dumps(meta, indent=2))
    print(f"{n} contact sheets in {sheets} (1 frame per {every}s, sheet k covers {6 * every}s starting at {6 * every}*(k-1))")
    print(f"Next: read the sheets, then write {d / 'analysis.md'}")


main()
