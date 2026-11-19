# motion-video

Video studio: send a **video link or file**, Claude watches it, then builds a **similar video** (usually English, no
human presenter, our own visuals) with [Remotion](https://www.remotion.dev/).

Workflow and conventions live in [`CLAUDE.md`](CLAUDE.md) and the skill
[`.claude/skills/clone-video/SKILL.md`](.claude/skills/clone-video/SKILL.md).

## Architecture

```
motion/
├─ CLAUDE.md                 project rules for Claude (conventions, verify steps, environment notes)
├─ .claude/skills/clone-video/   the skill: link/file → analysis → script → voice → Remotion → mp4
│    └─ analysis-template.md     shot-by-shot template for references/<slug>/analysis.md
├─ studio/                   Remotion project  (npm install, then npm run dev = preview in browser)
│    ├─ LIBRARY.md           catalogue of reusable shots/blocks, mascot spec, sound catalogue
│    ├─ src/Root.tsx         registers every composition
│    ├─ src/lib/             shared pieces: kit.tsx, Art.tsx, Env.tsx, Mascot.tsx, Pop.tsx, Slot.tsx
│    ├─ src/videos/          one file per video (BotGuideReal = approved look for Grok Bot videos)
│    │    ├─ real/           real-look Grok Bot UI scenes
│    │    └─ rich/           illustrations, screens, footage-slot templates
│    ├─ content/<slug>/      slides.json (script) + footage.json (user clips per shot)
│    └─ public/              narration mp3 per video (<slug>/vo) and shared sfx/music (shared/sfx)
├─ tools/                    analyze.py (fetch + contact sheets), tts.py (voice), sfx.py (sounds),
│                            render.py (render + loudnorm)
├─ references/               analysed reference videos, one folder per video
│    ├─ <slug>/              analysis.md, sheets/, subs/, meta.json  (+ source.mp4, NOT in git)
│    ├─ grok-bot-ui/         real Grok Bot app screenshots, tokens, bot mark
│    └─ _external/           cloned third-party repos, idea sources only (NOT in git)
├─ output/                   finished mp4 files, named <topic>-<lang>[_<voice>].mp4  (NOT in git)
└─ archive/                  older experiments (demo, grok3min, huashu-grok), kept on purpose
```

## What is not in git (see `.gitignore`)

| Path | Why | How to get it back |
|---|---|---|
| `output/*.mp4` | large rendered videos | `python tools/render.py <CompId> <name>` |
| `references/*/source.mp4` and any other video | large downloaded references | `python tools/analyze.py "<url-or-file>" <slug>` |
| `references/_external/` | cloned third-party repos (huashu-motion, awesome-opus5-5-videos, openmotion), idea sources only | `git clone` them again into this folder |
| `studio/node_modules/` | dependencies | `cd studio && npm install` |
| `.tmp/`, `output/_preview/` | render temp files and preview frames | generated automatically |

`output/` and `references/_external/` keep a `.gitkeep` so the folders exist after cloning.

## Quick start

```bash
cd studio && npm install && npm run dev                      # preview
python tools/tts.py <slug> --voice en-US-AriaNeural          # narration (edge-tts)
python tools/render.py <CompId> <name> --scale 0.5           # fast preview render
python tools/render.py <CompId> <name>                       # final, loudness-normalised -> output/<name>.mp4
```

Requirements: Windows 11, Node 24, Python 3.13 (`pip install edge-tts yt-dlp numpy`), ffmpeg on PATH or at `C:\ffmpeg\bin`.
