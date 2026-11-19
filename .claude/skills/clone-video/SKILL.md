---
name: clone-video
description: Use when the user sends a video link or file (Douyin, TikTok, YouTube, local mp4) and wants a similar video made. Reads the reference, writes an analysis and a new script, then builds the video with Remotion in D:\Project\motion/studio.
---

# Clone a video (read → script → build → render)

Read `CLAUDE.md` in the project root first for conventions and folder map.

## 1. Fetch and sample the reference
```bash
python tools/analyze.py "<url-or-file>" <slug>
```
`<slug>` = short kebab-case name, e.g. `grok-bot-beginner-cn`. Creates `references/<slug>/{source.mp4,meta.json,sheets/,subs/}`.
- URL fails (login/captcha)? Ask the user to download it and send the file path; rerun with the path.
- Long video (>10 min)? The default sampling (≈48 frames) is fine; use `--every` for finer detail on a section.

## 2. Read it
Read every `sheets/sNN.png` with the image viewer (6 frames each, left→right, top→bottom; time = (k-1)·6·every + index·every).
Reference videos burn subtitles into the picture, so the frames usually carry the whole script.
Zoom into a moment: `ffmpeg -ss <t> -i references/<slug>/source.mp4 -frames:v 1 f.png`.
Captions from the platform (if any) are in `subs/`. No speech-to-text model is installed; do not claim to have heard the audio.

Write `references/<slug>/analysis.md` from the template `analysis-template.md` (next to this file): facts, brand/assets,
shot table with timestamps + transitions, shot mix with CODE-ONLY vs NEEDS MEDIA per shot, motion/composition, sound,
editable choices (replace / preserve), and the script translated to English.
See `references/bot-guide-cn/analysis.md` for a worked example of the prose parts.

**Keep the reference's richness.** The new video must match its visual density (a screen full of tiles stays full),
type scale/character, background layers and pacing, and must not look darker, flatter or sparser than the reference.
Mirror craft, not branding (see CLAUDE.md).

## 3. Decide the brief (ask once, in one batch)
Default: English, no presenter, 2–2.5 min, our mascot, hand-drawn scenes, neural voice + sfx + music.
If something only the user can supply is missing (brand/product facts, footage, language, length, voice), ask **all of it
in a single message** and offer "you decide" for each item. If nothing is missing, don't ask: state the assumptions at delivery.
Never ask about technical choices or intermediate approval; after the answers, work through to the finished video.

## 4. Script
For each shot first write one line: "what the viewer will go through" (the change they SEE, not what the text announces).
Self-check: can the viewer see the change, or only learn it from the title? Without the decoration, is there still a concrete
development over time? If not, change the shot's look or its content, don't just tune easing.
Don't pad leftover time with slow zooms, floating or repeated titles: when the main action ends, cut shorter or hold still on purpose.
For long videos (>2 min), do a rough full cut first (placeholders ok, real timing) and check pacing before polishing details.

Create `studio/content/<new-slug>/slides.json`:
```json
[{"id": "intro", "vo": "Spoken line for the scene.", "frames": 300}]
```
One entry per scene (8–14 scenes, 1–3 sentences each). `frames` is a placeholder; tts.py overwrites it.
Also keep a readable `script.md` next to it for the user.

## 5. Voice and sounds
```bash
python tools/tts.py <new-slug> --voice en-US-GuyNeural     # or en-US-AriaNeural, vi-VN-HoaiMyNeural …
python tools/sfx.py                                        # only needed once (files already exist)
```

## 6. Build the composition
First open `studio/LIBRARY.md` (catalogue of ready shots: illustrations, screens, phones, neon, chapter cards, and the
real-footage templates §4b) and reuse/restyle them. If the reference mixes real footage (presenter PiP, screen/phone
recordings) use `textBuild/screenRec/phoneRec/withPip…` + `content/<slug>/footage.json`, and finish by telling the user
exactly which clips to record/send for each shot id.
Create `studio/src/videos/<Name>.tsx`. Import the building blocks from `../lib/kit` (Slide, Card, Chip, Sfx, useAt…).
Copy the structure of `BotGuideFull.tsx` (new scenes + reuse of exported scenes from `BotGuide.tsx` where the content matches):
- scenes in a `<Sequence>` each, lengths from `slides.json`, narration `<Audio src={staticFile('<new-slug>/vo/NN.mp3')}/>`
- `Slide` wrapper gives background, headline, footer, captions and a whoosh; `Card`/`Chip` tick on entrance
- give each scene its own composition from `src/lib/Art.tsx` (AppWindow, Phone, Laptop, IconCard, Beams, Glow, Float)
  and `Mascot` (accessories: glasses, headphones, cap, crown, tie; `satellite`)
- timing inside a scene uses fractions of its length (`useAt()`), so it adapts to the voice length
- vary layouts and backgrounds (`ember`, `night`, `screen`, `dusk`); never reuse one card template for every scene
- typed text → add a `typing` Sfx; success moments → `ding`; a hand-off/arrival → `pop1`/`pop2`
Register it in `studio/src/Root.tsx` with `durationInFrames = sum(frames)`.

## 7. Check, then render
```bash
cd studio && npm run typecheck
python tools/render.py <CompId> <name> --scale 0.5        # fast preview → output/_preview/
```
Extract frames at ~80% of each scene, tile into contact sheets with ffmpeg, **read them**, fix overlaps/clipping.
Also compare 3–4 representative moments (opening, a dense shot, a chart/phone shot, the closing frame) side by side with the
reference frames: is ours as full, as bright, as varied? Fix clear defects in one batch, then render.
Delete `output/_preview` when done, then:
```bash
python tools/render.py <CompId> <name>                    # final, loudness-normalized → output/<name>.mp4
```
Deliver with SendUserFile. Say what was checked (frames, audio levels) and that audio was not listened to.

## Gotchas
- Caption pill can be 2 lines (≈ y 560–660): keep content ending by y≈545.
- JetBrains Mono lacks Vietnamese glyphs; use Be Vietnam Pro for Vietnamese UI text.
- Hooks (`useCurrentFrame`) must not be called conditionally or inside nested JSX callbacks that vary.
- Free TTS may fail transiently; tts.py retries 3×.
- Never delete `archive/` or `references/_external/`; they are the user's earlier work.
