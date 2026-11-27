"""Render a composition and normalize its loudness.

    python tools/render.py <CompositionId> <output-name> [--scale 0.5 | --scale 1.5 --final]

Writes output/<output-name>.mp4.  With --scale (e.g. 0.5) it renders a fast preview
without loudness normalization to output/_preview/<output-name>.mp4.
Run from anywhere; `npm run render -- BotGuide bot-guide-en` (in studio/) works too.
"""
import argparse, os, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
STUDIO = ROOT / "studio"


TMP = ROOT / ".tmp"  # keep Remotion/Chromium temp files on the project drive (C: can fill up)


def run(cmd: list[str], cwd: pathlib.Path | None = None) -> None:
    print("$", " ".join(cmd))
    TMP.mkdir(exist_ok=True)
    env = {**os.environ, "TEMP": str(TMP), "TMP": str(TMP)}
    r = subprocess.run(cmd, cwd=cwd, env=env, shell=sys.platform == "win32")
    if r.returncode:
        sys.exit(r.returncode)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("composition")
    ap.add_argument("name")
    ap.add_argument("--scale", type=float, default=1.0)
    ap.add_argument("--final", action="store_true", help="with --scale >1: hi-res FINAL (e.g. 1.5 = 1080p, 3 = 4K) written to output/<name>.mp4 with loudnorm")
    a = ap.parse_args()

    if a.scale != 1.0 and not a.final:
        out = ROOT / "output" / "_preview" / f"{a.name}.mp4"
        out.parent.mkdir(parents=True, exist_ok=True)
        run(["npx", "remotion", "render", "src/index.ts", a.composition, str(out), f"--scale={a.scale}"], STUDIO)
        print("preview:", out)
        return

    out = ROOT / "output" / f"{a.name}.mp4"
    out.parent.mkdir(parents=True, exist_ok=True)
    raw = out.with_suffix(".raw.mp4")
    extra = [f"--scale={a.scale}"] if a.scale != 1.0 else []
    run(["npx", "remotion", "render", "src/index.ts", a.composition, str(raw), *extra], STUDIO)
    run([
        "ffmpeg", "-loglevel", "error", "-y", "-i", str(raw), "-c:v", "copy",
        "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-c:a", "aac", "-b:a", "192k", str(out),
    ])
    raw.unlink(missing_ok=True)
    print("done:", out)


main()
