"""Measure a reference video with numbers (ffmpeg + numpy only).

    python tools/measure.py cuts    <video> [--thresh 22] [--fps 30]
    python tools/measure.py strip   <video> --at 12.0 [--dur 1.0] [--fps 15] --out .tmp/strip.png
    python tools/measure.py look    <video> --at 12.0 [--grid 8x6]
    python tools/measure.py compare <ref.mp4> <ours.mp4> --t 12.0 [--ref-t 12.4]

cuts     hard-cut candidates (+ "soft" windows = fades/wipes). Verify each one with `strip`; a detector can be wrong.
strip    CONSECUTIVE frames around a time, tiled in one png. A 1-frame/sec contact sheet drops entrances,
         blur and flashes; read motion only from consecutive frames.
look     mean brightness, edge density, colourful share and a colour grid (background gradient, light falloff).
compare  same moment in reference and ours: luma / detail / accent side by side. Ours must not be darker,
         flatter or sparser than the reference.
"""
import argparse, json, subprocess, sys
import numpy as np


def run(cmd, binary=False):
    p = subprocess.run(cmd, capture_output=True)
    if p.returncode:
        sys.exit(p.stderr.decode(errors="replace")[-800:])
    return p.stdout if binary else p.stdout.decode()


def probe(path):
    j = json.loads(run(["ffprobe", "-v", "error", "-print_format", "json", "-show_streams", "-show_format", path]))
    v = next(s for s in j["streams"] if s["codec_type"] == "video")
    n, _, d = v["r_frame_rate"].partition("/")
    return float(j["format"]["duration"]), float(n) / float(d or 1)


def frames(path, w, h, fps=None, ss=None, t=None):
    cmd = ["ffmpeg", "-v", "error"]
    if ss is not None:
        cmd += ["-ss", str(ss)]
    cmd += ["-i", path]
    if t is not None:
        cmd += ["-t", str(t)]
    vf = (f"fps={fps}," if fps else "") + f"scale={w}:{h}"
    cmd += ["-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
    raw = run(cmd, binary=True)
    return np.frombuffer(raw, np.uint8).reshape(-1, h, w, 3)


def metrics(img):
    f = img.astype(np.float32)
    luma = f @ np.array([0.299, 0.587, 0.114], np.float32)
    gx = np.abs(np.diff(luma, axis=1))[:-1]
    gy = np.abs(np.diff(luma, axis=0))[:, :-1]
    detail = float(((gx + gy) > 60).mean())
    sat = f.max(axis=2) - f.min(axis=2)
    accent = float(((sat > 90) & (f.max(axis=2) > 90)).mean())
    return float(luma.mean()), detail, accent


def cmd_cuts(a):
    dur, native = probe(a.video)
    fps = min(a.fps, native)
    fr = frames(a.video, 160, 90, fps=fps).astype(np.float32)
    d = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2, 3))
    print(f"{len(fr)} frames @ {fps:g} fps, duration {dur:.1f}s")
    cuts = [i + 1 for i, v in enumerate(d) if v > a.thresh]
    print("HARD CUTS (verify with strip):")
    for i in cuts:
        print(f"  {i / fps:7.2f}s  diff {d[i - 1]:.0f}")
    soft, run_len = [], 0
    for i, v in enumerate(d):
        if 6 < v <= a.thresh:
            run_len += 1
        else:
            if run_len >= 4:
                soft.append((i - run_len + 1, i))
            run_len = 0
    print("SOFT CHANGE WINDOWS (fade / wipe / fast motion):")
    for s, e in soft:
        print(f"  {s / fps:7.2f}s – {e / fps:7.2f}s")
    bounds = [0] + cuts + [len(fr)]
    print("SHOT LENGTHS (s):", " ".join(f"{(b - a_) / fps:.1f}" for a_, b in zip(bounds, bounds[1:])))


def cmd_strip(a):
    cols = 6
    out = a.out
    import os; os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    run(["ffmpeg", "-y", "-v", "error", "-ss", str(a.at), "-i", a.video, "-t", str(a.dur),
         "-vf", f"fps={a.fps},scale=320:-1,tile={cols}x{max(1, int(a.dur * a.fps + cols - 1) // cols)}",
         "-frames:v", "1", out])
    print(out)


def cmd_look(a):
    gw, gh = map(int, a.grid.split("x"))
    img = frames(a.video, 320, 180, ss=a.at, t=0.1)[0]
    luma, detail, accent = metrics(img)
    print(f"mean_luma {luma:.0f}/255  detail {detail:.3f}  accent {accent:.3f}")
    cell = np.array([[img[r * 180 // gh:(r + 1) * 180 // gh, c * 320 // gw:(c + 1) * 320 // gw].reshape(-1, 3).mean(0)
                      for c in range(gw)] for r in range(gh)]).astype(int)
    for row in cell:
        print(" ".join("#%02x%02x%02x" % tuple(px) for px in row))


def cmd_compare(a):
    rt = a.ref_t if a.ref_t is not None else a.t
    rows = []
    for name, path, t in (("reference", a.ref, rt), ("ours", a.ours, a.t)):
        rows.append((name, *metrics(frames(path, 640, 360, ss=t, t=0.1)[0])))
    print(f"{'':10} {'luma':>6} {'detail':>7} {'accent':>7}")
    for n, l, d, c in rows:
        print(f"{n:10} {l:6.0f} {d:7.3f} {c:7.3f}")
    (_, l0, d0, c0), (_, l1, d1, c1) = rows
    flags = []
    if l1 < l0 * 0.85: flags.append("ours is darker")
    if d1 < d0 * 0.7: flags.append("ours is sparser / blurrier")
    if c1 < c0 * 0.6: flags.append("ours has less colour")
    print("FLAGS:", ", ".join(flags) or "none (numbers are diagnostic; still look at the frames)")


p = argparse.ArgumentParser()
s = p.add_subparsers(dest="cmd", required=True)
c = s.add_parser("cuts"); c.add_argument("video"); c.add_argument("--thresh", type=float, default=22); c.add_argument("--fps", type=float, default=30); c.set_defaults(f=cmd_cuts)
c = s.add_parser("strip"); c.add_argument("video"); c.add_argument("--at", type=float, required=True); c.add_argument("--dur", type=float, default=1.0); c.add_argument("--fps", type=float, default=15); c.add_argument("--out", default=".tmp/strip.png"); c.set_defaults(f=cmd_strip)
c = s.add_parser("look"); c.add_argument("video"); c.add_argument("--at", type=float, required=True); c.add_argument("--grid", default="8x6"); c.set_defaults(f=cmd_look)
c = s.add_parser("compare"); c.add_argument("ref"); c.add_argument("ours"); c.add_argument("--t", type=float, required=True); c.add_argument("--ref-t", type=float); c.set_defaults(f=cmd_compare)
a = p.parse_args()
a.f(a)
