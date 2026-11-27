# Short — "The Agent Ladder in 45 seconds" (vertical 1080x1920, ember look, ~45-50 s)

Role: the trailer for the series; ends on "watch the full 12-minute video". Narration bot-narrator, speed 0.8 for the long video;
for the short we use speed 0.95 (punchier). Captions: big, 2-3 words at a time, centred in the lower third (Shorts-safe zone).
Spine: ONE vertical ladder that the camera climbs; each shot lights one rung, but every shot has its own scene look.

| # | s | What is seen | Look |
|---|---|---|---|
| 1 hook | ~5 | Black. A single orange dot (the founder). Number "1" slams in, then ×20 ghost figures fan out behind it and snap into "1 = 20". Title slams: ONE PERSON. | kinetic type + glow, shake on hit |
| 2 painkiller | ~5 | A pale "vitamin" pill fades and cracks; a glowing orange "painkiller" pill drops in with a ding, price tag $0 → $$$ ticks up | 3D-style pills on dark, price counter |
| 3 inbox | ~7 | Phone mock-up: inbox with 47 unread; Bot badge sweeps down, mails flip to "drafted", counter 47 → 0; clock jumps to 9:00 "mornings back" | phone UI, counter |
| 4 delivery | ~5 | "PAID ✓" stamp → welcome email flies out → intake form checks itself → client card slides into a 3-column board | app-window flow |
| 5 marketing | ~5 | Dark map/feed; ten lead cards drop one by one with a tick sound, counter 1…10, last one pulses "booked call" | card cascade |
| 6 sales | ~6 | Phone call screen, orange waveform pulsing; a "qualified" tag pops; a second mini-card "mock call: 8/10" | call UI + waveform |
| 7 brain | ~6 | The four Bots appear as nodes; thin beams connect them into a glowing brain/network; a "memory" packet travels node to node | beams/network (Art.tsx Beams) |
| 8 close | ~6 | Camera pulls back: the full ladder, person at the top, Bots on each rung, sunrise glow; end card "Full 12-min video →" + series name | big finale, slow pull-back (the one deliberate hold) |

Notes
- Hook line is the retention hook: the first 2 s must already show motion + the "1 = 20" number.
- Sfx: whoosh per cut, tick on each card, ding on #2 / #5 / #8, bed at 0.09.
- Needs a vertical composition (1080x1920): new `Short` wrapper in `studio/src/videos/shared/` (same as makePart but 9:16 + big captions).
- Nothing in it uses real people or real brand marks.
