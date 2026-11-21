"""Optional: speech, burned-in subtitles, tempo and stems of a reference via rea-video.

    python tools/rea.py references/<slug>/source.mp4 <slug>

Writes references/<slug>/rea/ (git-ignored, ~160 MB). Takes ~5 min for a 3-4 min video (OCR is the slow part),
so run it IN THE BACKGROUND (Bash run_in_background) and never wrap it in a short timeout: a killed run leaves a
half-empty folder without breakdown.json.

Read only these, and label them "observed (auto-recognised, unchecked)" in analysis.md:
    rea/packaging/subtitles.srt   burned-in subtitles with timings (OCR) = the reference's script
    rea/video/content.md          speech transcript with timings (local ASR)
    rea/video/sound.md            tempo (BPM) / key / section changes
    rea/stems/                    vocals.wav, music.wav, effects
IGNORE its live/AI/3D/code shot classification: without a vision model it is pixel statistics and was wrong here
(a screen-recording tutorial was called "77% code render"). Our own frame reading decides CODE-ONLY vs NEEDS MEDIA.

Setup (once, already done on this machine): venv .venv-rea + `pip install -e "references/_external/rea-video[ocr,asr]"`
then `pip uninstall -y opencv-python && pip install --force-reinstall --no-deps opencv-python-headless`.
"""
import os, pathlib, subprocess, sys, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXE = ROOT / ".venv-rea" / "Scripts" / "rea-video.exe"


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    video, slug = sys.argv[1], sys.argv[2]
    if not EXE.exists():
        sys.exit(f"{EXE} missing: see the Setup note at the top of tools/rea.py")
    out = ROOT / "references" / slug / "rea"
    env = {**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8",
           "REA_VIDEO_MODELS": str(ROOT / ".rea-models"), "REA_VIDEO_HOME": str(ROOT / ".rea-models" / "home"),
           "PATH": r"C:\ffmpeg\bin" + os.pathsep + os.environ["PATH"]}
    t0 = time.time()
    r = subprocess.run([str(EXE), "decompose", video, "-o", str(out), "--lang", "en", "--no-vlm"], env=env)
    if r.returncode or not (out / "breakdown.json").exists():
        sys.exit(f"rea-video failed or was cut short (exit {r.returncode}); no breakdown.json in {out}")
    print(f"\ndone in {time.time() - t0:.0f}s. Read:")
    for f in ("packaging/subtitles.srt", "video/content.md", "video/sound.md"):
        print("  ", out / f, "" if (out / f).exists() else "(missing)")


main()
