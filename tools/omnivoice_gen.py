"""OmniVoice batch worker. Runs inside the shared OmniVoice venv (NOT the system python); tts.py launches it.

    D:\\Project\\repo\\OmniVoice\\.venv\\Scripts\\python tools/omnivoice_gen.py <slug>
        [--instruct "male, american accent"] [--ref voice.wav --ref-text "words said in voice.wav"]
        [--speed 1.0] [--steps 32]

Reads studio/content/<slug>/slides.json, writes studio/public/<slug>/vo/NN.mp3.
Voice modes (README of k2-fsa/OmniVoice):
  --ref        clone a voice from a 3-10 s clip (most stable; keeps the same voice on every slide)
  --instruct   "voice design" from attributes, no clip needed (may drift a little between lines)
  neither      the model picks a voice itself (differs per line: only for quick tests)
Inline tags like [laughter] / [sigh] in the narration text are kept.
Model cache lives next to the shared repo so every project reuses one download.
"""
import argparse, json, os, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OMNI_DIR = pathlib.Path(os.environ.get("OMNIVOICE_DIR", r"D:\Project\repo\OmniVoice"))
os.environ.setdefault("HF_HOME", str(OMNI_DIR / "models"))

import soundfile as sf
import torch
from omnivoice import OmniVoice


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("slug")
    ap.add_argument("--instruct", default=None, help='e.g. "male, american accent"')
    ap.add_argument("--ref", default=None, help="3-10 s reference wav to clone")
    ap.add_argument("--ref-text", default=None, help="exact transcript of --ref (omit: Whisper transcribes it)")
    ap.add_argument("--clone", default=None, help="saved voice in <OmniVoice>/voices/<name>/")
    ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--steps", type=int, default=32, help="diffusion steps (16 = faster)")
    a = ap.parse_args()

    slides = json.loads((ROOT / "studio" / "content" / a.slug / "slides.json").read_text(encoding="utf-8"))
    out = ROOT / "studio" / "public" / a.slug / "vo"
    out.mkdir(parents=True, exist_ok=True)

    cuda = torch.cuda.is_available()
    print(f"omnivoice device={'cuda' if cuda else 'cpu'}", flush=True)
    model = OmniVoice.from_pretrained(
        "k2-fsa/OmniVoice",
        device_map="cuda:0" if cuda else "cpu",
        dtype=torch.float16 if cuda else torch.float32,
    )

    prompt = None
    if a.clone:  # shared saved voice: encode once to prompt.pt, then just load it
        from omnivoice import VoiceClonePrompt

        vdir = OMNI_DIR / "voices" / a.clone
        pt = vdir / "prompt.pt"
        if pt.exists():
            prompt = VoiceClonePrompt.load(str(pt))
        else:
            ref_text = (vdir / "ref_text.txt").read_text(encoding="utf-8").strip()
            prompt = model.create_voice_clone_prompt(ref_audio=str(vdir / "ref_audio.wav"), ref_text=ref_text)
            prompt.save(str(pt))
            print(f"saved {pt}", flush=True)
    elif a.ref:  # encode the reference once, reuse for every slide
        prompt = model.create_voice_clone_prompt(ref_audio=a.ref, ref_text=a.ref_text)

    for i, s in enumerate(slides, 1):
        kw = dict(text=s["vo"], num_step=a.steps, speed=a.speed)
        if prompt is not None:
            kw["voice_clone_prompt"] = prompt
        elif a.instruct:
            kw["instruct"] = a.instruct
        audio = model.generate(**kw)
        wav = out / f"{i:02d}.wav"
        sf.write(str(wav), audio[0], 24000)
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-b:a", "192k", str(out / f"{i:02d}.mp3")],
            check=True,
        )
        wav.unlink()
        print(f"ok {i}/{len(slides)} {s['id']}", flush=True)


if __name__ == "__main__":
    sys.exit(main())
