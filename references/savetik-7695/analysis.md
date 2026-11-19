# Reference: "Overnight motion-design studio with 5 bots" (Chinese, 3:47)

Source: `source.mp4` (SaveTik, user-supplied). 1280x720, 30 fps, 227 s. Analysed from burned-in subtitles + frames (1 per 5 s); audio not transcribed.

## Structure (timestamps approx.)
- 0:00 Title: "How to build a studio that makes motion videos overnight" - 5 bots (Director, Animator, Render, Critic, Delivery)
- 0:05 Problem: most people stall at the same place (render stuck)
- 0:12 Missing = a studio (empty desks: director, critic, render queue)
- 0:20 5 bots split the work, night scene
- 0:28 Backend model is chosen per task; no model picker, no effort setting -> structure, not one magic prompt (spec / gate / critic)
- 0:50 Laptop can be closed; cloud computer stays on; all bots share one computer
- 1:08 No GPU decides everything -> HTML/CSS/Canvas/SVG fine; Blender-style GPU rendering not default; frame-by-frame screenshots
- 1:30 Files live in /workspace; install via bootstrap script, rerun any time
- 1:45 House-style skill shared by all bots (render contract: each frame a pure function of time)
- 1:55 Banned list (5 items) + "avoid generic AI look just swaps one default for another" -> add a line each time a new habit appears
- 2:15 Roster: Director owns request->delivery; Animator codes; Render only renders; Critic scores, writes no code; Delivery hands over
- 2:25 Why one render role: two parallel renders both slow down
- 2:30 Handoffs: bots forget, chats scroll, files don't -> a project = a folder, each file = a state (brief, shotlist, approved, index.html, final.mp4, PASSED, DELIVERED)
- 3:00 Engine = a public template (a ~1M-view video written entirely in code); template's last line: shot list first, then code
- 3:15 Renderer: seek per frame, headless browser screenshots -> ffmpeg; motion blur = 4 sub-frames averaged; no GPU = slower not dropped
- 3:30 Test on 2-core no-GPU box (15 s clip, draft 48 s)
- 3:35 Beat grid from licensed music + click track
- 3:45 Critic cannot see MP4 -> contact sheets; 6 scores, all >= 8; 3-round loop then stop and ask
- 4:00 Pixel-art night timeline 21:00 -> 08:00: render checks queue hourly, deliver next morning
- 4:10 Failure points: usage runs out, long render interrupted, routine paused
- 4:20 Close: from one person/one chat/one video to a bot studio overnight

## Visual style
Light/pastel cards with big headline + eyebrow chip (Chinese UI), one scene dark navy night, one pixel-art city, one paper-craft diorama, one dark "state machine" diagram. Bot mascots in 5 colours/shapes. Captions: white text in dark pill.

## What we reuse / change (copyright-safe rewrite)
- Reuse the *idea chain*: studio of role-bots -> constraints (no GPU, files) -> shared rules -> state files -> deterministic frame render -> critic loop -> overnight timeline -> risks.
- New: hook opens on the morning result, then explains backwards; own wording; generic "Bot"; role names Director/Animator/Renderer/Critic/Courier; no quotes from the third-party tweet or docs; no benchmark numbers or view counts from the original; own visuals in the approved real-look dark UI.
