"""Narration generator.

    python tools/tts.py <content-slug> [--voice en-US-GuyNeural] [--rate +6%] [--pitch +2Hz]
    python tools/tts.py <content-slug> --engine omnivoice [--instruct "male, american accent"]
                                       [--ref clip.wav --ref-text "words said in clip"] [--speed 1.0]
(omnivoice = local, expressive, multilingual; runs tools/omnivoice_gen.py in the shared
 D:\Project\repo\OmniVoice venv. edge = default, free, but reads flat.)

Reads  studio/content/<slug>/slides.json   ([{id, vo, frames}, ...])
Writes studio/public/<slug>/vo/NN.mp3      (one narration file per slide)
and updates each slide's `frames` to the real audio length (+ padding), so the
video timing always follows the voice.

Good voices (edge-tts neural, free):
  English  en-US-GuyNeural (male, energetic), en-US-AndrewNeural, en-US-AriaNeural (female),
           en-US-JennyNeural, en-GB-SoniaNeural, en-GB-RyanNeural
  Vietnamese vi-VN-HoaiMyNeural (female), vi-VN-NamMinhNeural (male)
  Chinese  zh-CN-YunxiNeural (male), zh-CN-XiaoxiaoNeural (female)
List all: python -m edge_tts --list-voices
"""
import argparse, asyncio, json, math, os, pathlib, subprocess

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
FPS = 30


def duration(path: pathlib.Path) -> float:
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(r.stdout.strip())


async def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("--voice", default="en-US-GuyNeural")
    ap.add_argument("--rate", default="+6%")
    ap.add_argument("--pitch", default="+2Hz")
    ap.add_argument("--pad", type=float, default=0.6, help="seconds of silence after each line")
    ap.add_argument("--engine", choices=["edge", "omnivoice"], default="edge",
                    help="omnivoice = local multilingual TTS (shared venv in D:\\Project\\repo\\OmniVoice); edge = default")
    ap.add_argument("--instruct", default=None, help='omnivoice: voice design, e.g. "male, american accent"')
    ap.add_argument("--ref-text", default=None, help="omnivoice: exact transcript of --ref")
    ap.add_argument("--speed", type=float, default=1.0, help="omnivoice: speed factor")
    ap.add_argument("--ref", default=None, help="omnivoice: optional 5-10s wav to clone the voice from")
    ap.add_argument("--clone", default=None,
                    help="omnivoice: saved voice name in <OmniVoice>/voices/<name>/ (ref_audio.wav + ref_text.txt; "
                         "encoded once to prompt.pt, reused by every project)")
    ap.add_argument("--no-hook", action="store_true",
                    help="skip the opening-hook check (only for later parts / legacy videos)")
    a = ap.parse_args()

    slides_file = ROOT / "studio" / "content" / a.slug / "slides.json"
    out = ROOT / "studio" / "public" / a.slug / "vo"
    out.mkdir(parents=True, exist_ok=True)
    slides = json.loads(slides_file.read_text(encoding="utf-8"))

    # Every video opens with a hook (user rule 2026-11-26). Part folders are "<n>-<name>"; only part 1 needs it.
    part = a.slug.rstrip("/").split("/")[-1]
    first_part = not (part[:1].isdigit() and not part.startswith("1-"))
    first = next((s for s in slides if not s.get("cut")), {})
    if first_part and not a.no_hook and not str(first.get("id", "")).startswith("hook"):
        raise SystemExit(
            f"{a.slug}: the first slide must be the opening hook (id 'hook' or 'hook-...'), got '{first.get('id')}'. "
            "Write one (payoff shown first, bold claim, open loop; see clone-video SKILL.md section 4 'Hook') "
            "or pass --no-hook for a legacy video."
        )

    if a.engine == "omnivoice":
        omni = pathlib.Path(os.environ.get("OMNIVOICE_DIR", r"D:\Project\repo\OmniVoice"))
        cmd = [str(omni / ".venv" / "Scripts" / "python.exe"), str(ROOT / "tools" / "omnivoice_gen.py"),
               a.slug, "--speed", str(a.speed)]
        if a.instruct:
            cmd += ["--instruct", a.instruct]
        if a.clone:
            cmd += ["--clone", a.clone]
        if a.ref:
            cmd += ["--ref", a.ref]
        if a.ref_text:
            cmd += ["--ref-text", a.ref_text]
        subprocess.run(cmd, check=True)

    for i, s in enumerate(slides, 1):
        f = out / f"{i:02d}.mp3"
        if a.engine == "edge":
            err = None
            for _ in range(3):  # the free service occasionally hiccups: retry
                try:
                    await edge_tts.Communicate(s["vo"], a.voice, rate=a.rate, pitch=a.pitch).save(str(f))
                    err = None
                    break
                except Exception as e:
                    err = e
                    await asyncio.sleep(1.5)
            if err:
                raise err
        s["frames"] = math.ceil((duration(f) + a.pad) * FPS)
        print(i, s["id"], s["frames"])

    slides_file.write_text(json.dumps(slides, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    label = {"edge": a.voice,
             "omnivoice": f"omnivoice({a.clone or a.instruct or a.ref or 'auto'})"}[a.engine]
    print(f"voice={label} total={sum(s['frames'] for s in slides) / FPS:.1f}s")


asyncio.run(main())
