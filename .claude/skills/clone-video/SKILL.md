---
name: clone-video
description: Use when the user sends a video link or file (Douyin, TikTok, YouTube, local mp4) and wants a similar video made. Reads the reference, writes an analysis and a new script, then builds the video with Remotion in D:\Project\motion-video/studio.
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

**Evidence rules (from the openmotion repo):**
- A contact sheet is for navigation only. Judge motion from CONSECUTIVE frames: for every cut, entrance and transition run
  `python tools/measure.py strip references/<slug>/source.mp4 --at <t> --dur 1 --fps 15 --out .tmp/strip.png` and read it
  (what persists / enters / changes / holds / exits; how an element appears: pop, scale, fade, type, wipe).
- Segment first: `python tools/measure.py cuts <source.mp4>` gives hard-cut candidates, soft windows and shot lengths.
  Verify each candidate with `strip`; gradient/morph films have few cuts, so split further by picture content.
- Background and colour: `python tools/measure.py look <source.mp4> --at <t> --grid 8x6` (sample at several moments).
- Never claim to have watched a video you only know from a cover, link or caption. If it could not be fetched, say so.
- Mark every analysis line as **observed** (seen in frames), **inferred** (our guess) or **unknown**. Audio is never "heard".

Write `references/<slug>/analysis.md` from the template `analysis-template.md` (next to this file): facts, brand/assets,
shot table with timestamps + transitions, shot mix with CODE-ONLY vs NEEDS MEDIA per shot, motion/composition, sound,
editable choices (replace / preserve), and the script translated to English.
See `references/INDEX.md` for existing references and `references/bot-guide-cn/analysis.md` for a worked example of the prose parts.

**Keep the reference's richness.** The new video must match its visual density (a screen full of tiles stays full),
type scale/character, background layers and pacing, and must not look darker, flatter or sparser than the reference.
Mirror craft, not branding (see CLAUDE.md).

## 3. Decide the brief (ask once, in one batch)
Default: English, no presenter, 2–2.5 min, our mascot, hand-drawn scenes, neural voice + sfx, no music bed (`MUSIC_ON = false`, user 2026-11-27).
If something only the user can supply is missing (brand/product facts, footage, language, length, voice), ask **all of it
in a single message** and offer "you decide" for each item. If nothing is missing, don't ask: state the assumptions at delivery.
**Accurate UI = real screenshots.** If the video must show a real app/site/product UI faithfully (layout, text, colours, icons),
ask the user to send screenshots (or a screen recording) of exactly the screens needed, or capture them yourself in the
built-in browser when the page is public. Save them in `references/<ui-name>/` and rebuild from them (measure colours/spacing,
copy real labels). Without screenshots, keep the UI generic/loosely inspired and say so at delivery.
Never ask about technical choices. Do stop at the review checkpoints in 4b (storyboard, then preview) before the final render.

### 3b. Gather real evidence images (default on)
Motion-only videos read as flat; real images add credibility. Before scripting, search the web / X / social for the topic
(WebSearch + built-in browser; screenshot public pages with `mcp__Claude_Browser__*`). Collect 3-6 items: product/news pages,
posts, charts, logos, UI. Save to `references/<slug>/assets/` + `sources.md` (url, what it shows, licence note).
Use them as framed "screenshot" shots (browser/phone frame, source label, a callout or highlight animating on the key line),
mixed between the motion shots. Skip people's photos. Downloading files: say what/where from in the delivery note.

### 3c. The user's own footage (videos/photos they filmed)
The user films b-roll / screen or phone recordings **without speaking**: the narration is always our TTS from the script.
1. Files go in `footage/<slug>/raw/` (or pass a folder). `python tools/ingest.py scan <slug> [folder]` → `footage/<slug>/clips.json`,
   `clips.md` (skeleton) and labelled sheets in `footage/<slug>/sheets/` (`<id>-shots-NN` = one thumb per detected shot,
   `<id>-time-NN` = timecode frames; `images-NN` = photos). Ids v01../i01.. stay stable on re-scan.
2. READ every sheet, fill `clips.md` (what is seen per shot, usable? shaky/blurry/private info on screen?).
3. In the storyboard, tag every shot **[FOOTAGE vNN 0:12–0:18]** or **[AI: look]**. Footage for what only reality shows
   (real app use, product, workspace, results, places); motion graphics for concepts, numbers, comparisons, chapter cards,
   and any line with no matching footage. List shots the user could still film to replace AI shots.
4. After OK: `python tools/ingest.py cut <slug> vNN <start> <end> --name <shot-id> [--to <series>/<part>/clips] [--speed 2] [--crop W:H:X:Y]`
   (re-encoded, 30 fps, muted, ≤1080p; photos: `cut <slug> iNN --name x`). Use the clip via `<Slot src>` / `footage.json` /
   `OffthreadVideo`; portrait phone clips go in `phoneRec` or a blurred-fill frame, never stretched. Keep a clip shorter than its
   narration line, or slow it (`--speed 0.8`) rather than freezing.

## 4. Script
**Length = the reference's content length** (user, 2026-11-26: an 8:20 reference came back as 3:51 and was rejected).
Measure the reference minus promo/ads/outro, aim for that ±10 %, and check it after tts.py (sum of `frames` / 30).
If the voice comes out short, add shots (deeper per-step detail, exact messages, examples), never slow padding.

**Hook (mandatory, enforced in code).** Part 1's first slide id must be `hook` or `hook-…`: `makePart` throws and
`tools/tts.py` refuses otherwise (`--no-hook` only for later parts / legacy videos). A hook is the first 15–30 s and is
NOT a title card or "in this video": 1) show the payoff first (the finished result working, fast cuts), 2) one bold,
concrete claim, 3) an open loop that pays off at the end ("stay for the mistake that breaks it"). Split it into
`hook-…` slides of one sentence each so every cut is visible. Mirror the reference's own opening seconds when it has one.

For each shot first write one line: "what the viewer will go through" (the change they SEE, not what the text announces).
Self-check: can the viewer see the change, or only learn it from the title? Without the decoration, is there still a concrete
development over time? If not, change the shot's look or its content, don't just tune easing.
Don't pad leftover time with slow zooms, floating or repeated titles: when the main action ends, cut shorter or hold still on purpose.
Separate what the text announces from what the picture makes the viewer go through. Give key actions a time shape
(anticipation → fast move → landing → follow-through → readable hold); mechanical UI may be direct. Give each reveal enough
reading time; don't push the next scene in before the previous one is readable. When a shot hands over to the next,
note what the old focus was and what the new one is (continue, contrast or hard cut: a hard cut is fine).
Only rebuild what code can carry; what it cannot (real photos, footage, talking head) is marked NEEDS MEDIA, never faked
or silently dropped. Never "recreate" by playing the reference itself.
For long references (>10 min): rewrite the WHOLE script first, split it by the source's chapters into parts (≈2–4 min each, 11–16 shots),
and build each part as its own composition in a series folder (see `PROJECTS.md` "Layout": `studio/src/videos/<series>/parts.tsx`
`makePart('<series>/<n>-<name>', n, slides, scenes)`, scenes in `<series>/scenes/`, registry in `<series>/index.ts`; content in
`content/<series>/<n>-<name>/slides.json`, outline `content/<series>/script.md`; mp4 in `output/<series>/`). Render parts separately,
deliver part by part, join with ffmpeg concat at the end (`output/<series>/full-*.mp4`); a fix re-renders only the part that has the problem.
Never squeeze 30 min into 4.
For long videos (>2 min), do a rough full cut first (placeholders ok, real timing) and check pacing before polishing details.

Create `studio/content/<new-slug>/slides.json`:
```json
[{"id": "intro", "vo": "Spoken line for the scene.", "frames": 300}]
```
One entry per scene (8–14 scenes, 1–3 sentences each). `frames` is a placeholder; tts.py overwrites it.
Also keep a readable `script.md` next to it for the user.

### 4b. Storyboard (learned from a Shopee 11.11 ad workflow: idea → storyboard → build → feedback)
**Default (changed 2026-11-22, user wants to review before the build): checkpoints, not one run.** The user's videos are simple
tutorials, so `storyboard.md` stays light (one line per shot: what the viewer sees + which look/template + which shots use real
evidence images), but you STOP and show it before any voice/build work. Checkpoints, each ends with the user's OK or notes:
1. **Storyboard** (script + light storyboard + evidence images found): send it, wait.
2. **Rough preview**: build, then open Remotion Studio in the built-in browser (`preview_start`, `npm run dev` in `studio/`) or
   deliver a `--scale 0.5` preview mp4 (`tools/render.py <CompId> <name> --scale 0.5`); wait for notes by timecode (§4c).
3. **Final render** only after the preview is accepted.
Fix notes in the same composition, re-preview only the affected range. The full timecoded table below is still opt-in
(ad-style / precise-timing videos):

| # | time | what the viewer SEES (the change) | look/template | motion + easing | sfx cue / sync point |
|---|------|-----------------------------------|---------------|-----------------|----------------------|
| 1 | 0:00–0:05 | … | BotGuideReal §9b scene / illustration / phone… | e.g. ease-out expo, spring pop | e.g. "logo lands at 0:03, ding on the same frame" |

- Name the easing explicitly (Remotion: `Easing.out(Easing.exp)`, `spring({damping…})`) and the sync point between elements/sound.
- Mark each shot CODE-ONLY or NEEDS MEDIA; check that no two neighbouring shots share the same look.
- Keep a short "idea" line at the top: the one image the whole video hangs on.
- After approval, build from this table; the timecodes are the reference for the next step.

### 4c. Feedback by timecode
User notes like "0:33 transition too slow" map to the storyboard row and its scene id; fix only that shot, re-render a
`--scale 0.5` preview of the affected range, then the final. Keep `storyboard.md` in sync with what changed.

## 5. Voice and sounds
```bash
python tools/tts.py <new-slug> --voice en-US-GuyNeural     # or en-US-AriaNeural, vi-VN-HoaiMyNeural …
python tools/sfx.py                                        # only needed once (files already exist)
```

Sound rules: if the reference has sound, ours has sound. Give sound a job (rhythm, the 3-5 key events, silence), don't put a
whoosh/tick on every movement. Pick the moment of the action the sound marks (start, clearest, contact or landing: they can be
far apart). Captions must follow real timings (tts.py per-sentence mp3 durations), never guessed split points.
Record "timing checked" and "heard by a person" separately; the second is always "no" for us.

## 6. Build the composition
First open `studio/LIBRARY.md` (catalogue of ready shots: illustrations, screens, phones, neon, chapter cards, and the
real-footage templates §4b) and reuse/restyle them. If the reference mixes real footage (presenter PiP, screen/phone
recordings) use `textBuild/screenRec/phoneRec/withPip…` + `content/<slug>/footage.json`, and finish by telling the user
exactly which clips to record/send for each shot id.
Create `studio/src/videos/<Name>.tsx`. Import the building blocks from `../lib/kit` (Slide, Card, Chip, Sfx, useAt…).
Copy the structure of `src/videos/grok-bot/BotGuideFull.tsx` (new scenes + reuse of exported scenes from `BotGuide.tsx` where the content matches):
- scenes in a `<Sequence>` each, lengths from `slides.json`, narration `<Audio src={staticFile('<new-slug>/vo/NN.mp3')}/>`
- `Slide` wrapper gives background, headline, footer, captions and a whoosh; `Card`/`Chip` tick on entrance
- give each scene its own composition from `src/lib/Art.tsx` (AppWindow, Phone, Laptop, IconCard, Beams, Glow, Float)
  and `Mascot` (accessories: glasses, headphones, cap, crown, tie; `satellite`)
- timing inside a scene uses fractions of its length (`useAt()`), so it adapts to the voice length
- vary layouts and subjects, NOT colours: one `PAPER_THEME` for the whole video (same near-white bg, white cards, ink, one
  accent; see CLAUDE.md "One calm colour system"); never reuse one card template for every scene either
- typed text → add a `typing` Sfx; success moments → `ding`; a hand-off/arrival → `pop1`/`pop2`
Register it in `studio/src/Root.tsx` with `durationInFrames = sum(frames)`.

## 7. Check, then render
```bash
cd studio && npm run typecheck
python tools/render.py <CompId> <name> --scale 0.5        # fast preview → output/_preview/
```
Extract frames at ~80% of each scene, tile into contact sheets with ffmpeg, **read them**, fix overlaps/clipping.
Also compare 3–4 representative moments (opening, a dense shot, a chart/phone shot, the closing frame) side by side with the
reference frames: is ours as full, as bright, as varied? Numbers per moment:
`python tools/measure.py compare references/<slug>/source.mp4 .tmp/preview.mp4 --t <ours> --ref-t <ref>`
(flags darker / sparser / less colourful; diagnostic only, the frames decide). Also run `measure.py cuts` on both and check
every reference hard cut has a counterpart within ~3 frames, or record what the viewer sees instead.
Fix clear defects (missing content, wrong text, clipping, broken assets) in ONE batch and re-check only the affected moments.
If two fixes for the same issue don't visibly improve it, change approach once; if that fails, write it in the delivery note and move on.
Delete `output/_preview` when done, then:
```bash
python tools/render.py <CompId> <name>                    # final, loudness-normalized → output/<name>.mp4
```
Deliver with SendUserFile. Say what was checked (frames, measure.py numbers, audio levels), that audio was not listened to,
the assumptions made, which shots need the user's media, and any remaining visible gap vs the reference.
Technical export success is not visual acceptance: say which one you have.
Follow-ups edit the same composition; never start over.

## Gotchas
- Caption pill can be 2 lines (≈ y 560–660): keep content ending by y≈545.
- JetBrains Mono lacks Vietnamese glyphs; use Be Vietnam Pro for Vietnamese UI text.
- Hooks (`useCurrentFrame`) must not be called conditionally or inside nested JSX callbacks that vary.
- Free TTS may fail transiently; tts.py retries 3×.
- Never delete `archive/` or `references/_external/`; they are the user's earlier work.
