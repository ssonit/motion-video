"""Narration generator.

    python tools/tts.py <content-slug> [--voice en-US-GuyNeural] [--rate +6%] [--pitch +2Hz]

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
import argparse, asyncio, json, math, pathlib, subprocess

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
    a = ap.parse_args()

    slides_file = ROOT / "studio" / "content" / a.slug / "slides.json"
    out = ROOT / "studio" / "public" / a.slug / "vo"
    out.mkdir(parents=True, exist_ok=True)
    slides = json.loads(slides_file.read_text(encoding="utf-8"))

    for i, s in enumerate(slides, 1):
        f = out / f"{i:02d}.mp3"
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
    print(f"voice={a.voice} total={sum(s['frames'] for s in slides) / FPS:.1f}s")


asyncio.run(main())
