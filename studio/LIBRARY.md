# Reusable scene library

Everything below already exists in `studio/src`. When cloning a new video, **pick shots from here first**, restyle
(text, colours, mascot accessory), and only draw a new one when nothing fits. Rule from the user: never repeat one
template — assign a different "look" to every shot (about 1 shot per sentence).

Every shot is a `React.FC<P>` (`P = {n: number; vo: string}`): `n` = shot number, `vo` = narration (becomes the captions).
Length comes from `content/<slug>/slides.json`; inside a shot use `useAt()` (fractions of its length), never fixed frames.
Register shots in a `SCENES: Record<id, React.FC<P>>` map and loop over slides.json — copy `videos/grok-bot/BotGuideRich.tsx`.

## 1. Building blocks (`src/lib`)

| File | Exports | Use for |
|---|---|---|
| `kit.tsx` | `Slide` (bg `ember\|night\|screen\|dusk\|none`, `bare` = art only, `head`, `eyebrow`, `compact`), `Card`, `Chip`, `Em`, `Label`, `Arrow`, `Captions`, `Sfx`, `useAt`, `typed`, `clamp`, `BG` | wrapper, captions, fade in/out, whoosh, entrance ticks |
| `Art.tsx` | `D` palette, `inter`, `mono`, `At`, `Float`, `AppWindow`, `Bar`, `Dot`, `IconCard` (glyph set), `Phone`, `Laptop`, `Beams`, `Glow` | app windows, phones, laptops, icon tiles, light beams |
| `Env.tsx` | `Skyline`, `CityWindow`, `Desk`, `Monitor`, `MiniUI` (chat/timeline/grid/code/chart), `Lamp`, `Plant`, `Mug`, `Poster`, `Sunset`, `Castle`, `Cooler`, `Palm`, `HoloOrg` (+`tangled`), `Wires`, `Bloom`, `Vignette`, `rand` | pseudo-3D rooms, skylines, props, hologram org chart |
| `Mascot.tsx` | `Mascot` (`color,size,phase,satellite,acc: glasses\|headphones\|cap\|crown\|tie\|none`) | the orb character (no human photos) |
| `Pop.tsx` | `Pop` | spring entrance for any element |

Sound: `Sfx name=` `tick1-3`, `pop1/2`, `whoosh`, `ding`, `typing`, `bed` (music, in the root composition at volume ≈0.09).
Layout rule: keep content above y≈545 (captions occupy ≈560–660).

## 2. Full-bleed illustrations (`videos/rich/Illustrations.tsx`) — use `<Slide bare>`

| Shot | Look | Good for narration about… |
|---|---|---|
| `HeroDesk` | desk at night, glowing monitor, city window, lamp, mug, orb | intro / hook / "you at 3 a.m." |
| `Command` | control-room wall of monitors, orb in the middle | "everything in one place", aha moment |
| `Tangled` | desk buried in wires + tangled hologram org | chaos, "too many tools" |
| `Ring` | ring of devices/icons orbiting an orb | works on every device / integrations |
| `TeamDesks` | row of bot "employees" at desks, dawn light | build a team / company |
| `Footage` | editing desk, timeline, footage thumbnails | video / content work |
| `Covers` | wall of posters in several aspect ratios | cover/thumbnail/design output |
| `TrapOffice` | office scene with hazard/“trap” feel | pitfalls, warnings |
| `WaterIll` | water cooler hangout | "while you take a break" |
| `Beach` | sunset beach, palm, orb | relaxing / results while you rest |
| `Dream` | sunset fortress (`Castle`) with orb | big finale / vision |

## 3. App / phone / neon / data shots (`videos/rich/Screens.tsx`)

| Shot | Look |
|---|---|
| `Zero`, `Evolve` | big-statement / evolution slides (dark text + chips) |
| `ChapterCard` (`num`,`title`) | giant chapter number card — wrap with `chapter('05','Title')` |
| `ToolWin` | Windows tool window with command line |
| `OpenSource` | open-source repo card |
| `Key` | API-key / credentials screen |
| `NeonTwo` | two neon panels side by side ("two ways to…") |
| `NeonReq` | neon requirements checklist ("check two things") |
| `Shortcut` | phone Shortcuts walkthrough with orange callouts |
| `BackTap` | phone Back-Tap setup with chips |
| `Hey` | voice trigger "Hey Bot" ×3 |
| `Issue1`, `Issue2` | pitfall screens (error window / warning) |
| `Tokens` | usage heat-map data screen |

## 4. Card-style scenes (`videos/grok-bot/BotGuide.tsx`, `BotGuideFull.tsx`)

`Intro`, `What`, `First`, `Job`, `Handoff`, `Manager`, `Devices`, `Launch`, `Pitfalls`, `Roi` (before/after + chart), `After`,
`Outro`; `Install` (progress bar), `Directory` (bot catalogue), `Work`, `Solo`, `Water`, `Personal`, `LaunchSetup`.
These are the "dark card" look — use sparingly, at most 1 in 3 shots.

## 4b. Real-footage + data-driven templates (`videos/rich/Templates.tsx`, `lib/Slot.tsx`)

The reference is a **hybrid**: motion graphics + the creator's real footage (talking-head picture-in-picture, real
Mac/iPhone screen recordings). Our clone keeps those as **slots**; the user films/records, we drop the files in.
Placeholders ("YOUR FOOTAGE") show in the layout until a file is mapped, so the video renders either way.

How to use (see `videos/TemplateDemo.tsx` — composition `TemplateDemo`, a live sheet of every template):
1. In a SCENES map, use factories instead of hand-writing a component: `intro: textBuild({eyebrow, head, flow, chips, note, pip})`.
2. Map the user's clips in `content/<slug>/footage.json`: `{"<shot-id>": {"pip": "face-01.mp4", "main": "screen-mac.mp4", "start": 3}}`
   (paths relative to `studio/public/<slug>/`; `start` = seconds into the clip; images work too).
3. Wrap each Sequence child in `<FootageProvider slug entry={footage[s.id]}>` (copy `TemplateDemo.tsx`). Footage is muted: our TTS is the narration.
4. Tell the user which shots need a clip: list every shot whose template contains `<Slot>`/`<Pip>` with what to record
   (talking-head line, screen recording of X). If they give nothing, set `pip: null` or leave placeholders out of the final render.

| Factory | Look | Footage slots |
|---|---|---|
| `textBuild({eyebrow, head, flow[], chips[], note, pip})` | dark slide, headline + cards/chips/note that build up | pip (default circle bottom-right) |
| `bigWord({eyebrow, word, strike[], pip})` | one giant word, optional struck-out list | pip |
| `screenRec({pills[], callout, pip, label})` | Mac-style window on orange wallpaper + ①②③ pills | main = screen recording, pip tr |
| `phoneRec({chapter, bgWord, callout, pip})` | portrait phone on dark scrolling-word wallpaper | main = phone recording, pip |
| `withPip(Illustration, pos)` | any full-bleed illustration + presenter | pip (pick a corner free of text: HeroDesk→`tr-round`, TeamDesks→`bl-round`) |
| `posterStack({titles[], pip})` | tilted cover cards with arrows | pip |
| `chatPanel({title, rows[], chapter, pip})` | white contacts panel on faint repeated title | pip |
| `realCase({eyebrow, head, items[], tag, pip})` | app window (footage) + numbered list | main = app/screen, pip |
| `closer({word, sub})` | closing brush word on light beams | — |

PiP positions (`PipPos`): `br-circle`, `bl-circle` (dark text slides) · `tl-round`, `tr-round`, `bl-round`, `br-round` (over art).
Keep text out of the chosen corner; captions use y 560–660.

## 5. Shot-type recipe (aim for this mix per 5 min)

- ~10 full-bleed illustrations · ~8 app-window / screen shots · ~5 phone walkthroughs · ~4 neon panels
- ~3 chapter cards · ~3 data/chart shots · rest short text/card slides · 1 intro + 1 outro
- Never put two shots of the same look back to back.

## 6. Adding a new reusable shot

1. Build it from `Env`/`Art` pieces, as `export const Name: React.FC<P>` in `videos/rich/` (illustration or screen).
2. `<Slide n={n} vo={vo} eyebrow="" bare bg="none">` for art; add `Sfx` ticks/pops on entrances.
3. Add one row to the tables above, then render a preview and read the frame (`python tools/render.py <Comp> <name> --scale 0.5`).

## 7. The Bot mascot (`lib/Mascot.tsx`) — keep this look in every video

Glossy orb: flat colour disc (r=42) + 3 radial gradients (soft glow behind, white top-left highlight, dark bottom-right shade),
ground shadow ellipse, two white **pill eyes** (12x19, rx 6) that blink every ~100 frames and drift left/right slightly,
and the body bobs (`sin(t/14)*7px`). The user rejected an earlier "ugly" version; they wanted glossy orb + pill eyes.
`<Mascot color size phase satellite acc />`
- `acc`: `glasses` (dark thin ring lenses, NOT thick/double rings), `headphones` (white band + ear cups), `cap` (white cap + brim),
  `crown` (gold), `tie` (white bow at bottom), `none`.
- `satellite`: small orbiting ball of the same colour at the right (the "assistant" detail).
- `phase`: offset so several mascots don't bob in sync.
- Colours in use: orange `D.orange` (main/default hero), `D.blue`, `D.violet`, `D.pink` (team members), `D.mint`, yellow, dark `#2B2B35`
  for "off/idle" bots. Different role = different colour + accessory (e.g. glasses=analyst, headphones=editor/support, cap=publisher,
  tie=manager, crown=chief). Never add a human face/photo.
- Placement: keep it clear of headline and chips (earlier bug: orb overlapped chips) and above caption zone (y<545).
- Related props in `lib/Env.tsx` / `rich/*`: orb in HeroDesk/Command/Ring/Dream scenes, `HoloOrg` org chart of orbs, `Castle` with BOT flag.

## 8. Sound design (`tools/sfx.py` → `studio/public/shared/sfx/*.wav`, all synthesised with numpy, royalty-free)

Run `python tools/sfx.py` once (files already exist). Played with `<Sfx at={frame} name="…" vol={…} />` (frames relative to the shot).

| name | sound | where / default volume |
|---|---|---|
| `tick1` `tick2` `tick3` | crisp UI click: noise transient + short thock, 3 pitches | automatic in `Card` (0.20) and `Chip` (0.16), cycling by entrance frame — this is the "tick tick tick" the user asked for |
| `pop1` `pop2` | bubble pop, rising pitch | hand-off / arrival moments, icons landing (≈0.3) |
| `whoosh` | filtered noise sweep | automatic at start of every `Slide` (0.30, 30 frames) |
| `ding` | 3-note rising chime E6–G#6–B6 with shimmer | key moments, success, big words, closer (0.25–0.3) |
| `typing` | run of mechanical key clicks | whenever text is typed (`typed()` helper) |
| `bed` | 112 BPM loop: plucks + kick/hat/clap, upbeat | one `<Audio loop volume=0.09>` in the root composition with 1 s fade in, 3 s fade out; keep it quiet under the voice |

Rules: whoosh at each shot start, tick on every card/chip, typing on typed text, ding on payoff, quiet bed. Don't stack more than
~3 effects at the same frame. Final pass is always `loudnorm I=-16, TP=-1.5` (render.py). We cannot listen — only check levels
(`ffmpeg -af volumedetect`) and say so. New sound? add a generator in `tools/sfx.py`, rerun, add a row here.

Voices (`tools/tts.py`, edge-tts neural): English `en-US-GuyNeural` (male, energetic default), `en-US-AriaNeural` (female — used for
the latest Rich video), `en-US-AndrewNeural`, `en-US-JennyNeural`, `en-GB-SoniaNeural/RyanNeural`; Vietnamese `vi-VN-HoaiMyNeural`,
`vi-VN-NamMinhNeural`; Chinese `zh-CN-YunxiNeural/XiaoxiaoNeural`. Tune with `--rate +6% --pitch +2Hz`; shot length follows the audio
(+0.6 s pad). Never use the offline Windows SAPI voices (user: flat, boring). Retry on `NoAudioReceived` (built in).

## 9. Real Grok Bot UI kit (for 1:1 recreations)
Screenshots of the real app + marketplace, design tokens, and the real bot mark live in `references/grok-bot-ui/README.md`.
Use `lib/GrokBotMark.tsx` (`<GrokBotMark shape color size />`, `BOT_COLORS`) instead of the generic orb `Mascot` when the video is *about Grok Bot* and should look real.
The generic `Mascot` stays for our own invented bot brands.

### 9b. Real-look scenes (`videos/real/`, used by `BotGuideReal`, 42 shots)
- `real/ui.tsx` — kit from the tokens: `R` (colours), `RSlide` (dark page + whoosh + captions), `Pill`, `Card`, `In` (pop + tick), `Head`, `Avatar`, `InputPill` (+ · mic · wave), `AppWindow` (left rail + chat + right panel; props `threads/msgs/panel/input`), `PanelHeading/PanelRow/VoiceChatBlock` (Suggested · Computer · Voice chat), `SiteNav`, `AppIcon`.
- `real/ScenesA.tsx` / `ScenesB.tsx` — ready shots: ZeroR, EvolveR, InstallR (website + sign-in), WhatR (app window + side panel), FirstR (4-step new-bot dialog + avatar picker), DirectoryR (marketplace grid + Add), ConnectR (Connect Apps dialog over blurred app), DevicesR, ChapterR, JobR (bot detail page, Skills tab), HandoffR, OpenSourceR (repo page), ManagerR (org chart), ComputerR ("Bot's computer" terminal), RoutineR, SoloR (app window + reports panel), KeyR, ReqR, BackTapR (iOS settings list), HeyR (voice panel), Issue1R (diff), Issue2R, RoiR, AfterR, ChainR, OutroR. `CAST`/`THREADS` = invented bots.
- `real/BotMark.tsx` — `Bot` (bobbing `GrokBotMark`) and a `Mascot` shim (same props as `lib/Mascot`, old orange → white bot, other colours → real palette) so copied scenes get the real mark: `real/IllustrationsM.tsx` and `real/ScreensM.tsx` are `sed`-copies of `rich/` with only that import changed.
- Footage: `content/grok-bot/guide-real/footage.json` (`pip: null` = no presenter overlay in this render; put a path to switch it on).

## 10. What code can build vs what needs real media (idea from openmotion's recreate workflow)

Decide this per shot when writing `analysis.md`, and tell the user which shots need their material.

| Code-only (we build it) | Needs real media (user clip/photo, or AI art from prompts we write) |
|---|---|
| Text, headlines, captions, chips, cards | Talking head / presenter PiP (`Pip`, `Slot`) |
| App windows, phones, UI recreations (`Art.tsx`, `videos/real/`) | Real screen / phone recordings (`screenRec`, `phoneRec`, `realCase`) |
| Charts, org charts, before/after, data screens | Product photography, portraits, live-action, AI footage |
| Logos/marks drawn as SVG, shapes, beams, glows | Original soundtrack / licensed music (ours: synthesised beat bed) |
| Camera and layer motion, transitions, mascot | Photoreal 3D art (ours: hand-drawn SVG in `Env.tsx`, `Illustrations.tsx`) |

Rules: keep text, logos and UI as native layers above any media (never baked into pixels); match a media shot's role, framing and
timing, not its exact pixels or a real person's identity; if a shot has no media yet, leave a visible placeholder and list it.
Keep richness: match the reference's density, type scale/character, background layers and brightness. Never ship a version that is
darker or sparser than the source.
