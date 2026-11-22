# Storyboard — bot-feedback-loop (draft for approval)
Idea (one image): the SAME small ad twice, flat vs punchy, and a timeline that climbs through 4 glowing steps.
Look: BotGuideReal (ember, dark page). Colours: ember orange + white bot mark; scenes vary per row.

| # | id | time (est.) | what the viewer SEES | look/template | motion + easing | sfx / sync |
|---|----|-------------|----------------------|---------------|-----------------|------------|
| 1 | hook | 0:00–0:10 | Two phone cards slide in: "FIRST DRAFT" (flat, a logo that just fades) vs "AFTER FEEDBACK" (logo slams in with shockwave) | split-screen phones (new, from lib/Art Phone) | cards spring in; right logo ease-out expo hit | whoosh; thud on the right-hand slam |
| 2 | shift | 0:10–0:21 | Bot mark fills a progress bar fast, then freezes at a red "?"; an eye icon opens and the "?" turns into a tick | ZeroR-like centre stage + Pop | bar linear fast → hold; eye iris scale ease-out | tick, ding on the tick |
| 3 | map | 0:21–0:29 | Orange timeline draws left→right; 4 nodes light up one by one: Idea · Plan · Build · Feedback | chapter timeline (new ChapterR variant, from the reference card) | line draw ease-in-out, node pop spring | tick per node |
| 4 | idea | 0:29–0:40 | A lightbulb glows; a quote bubble types one sentence; the sentence turns into one picture (poster card) | lightbulb + typed bubble + poster | typed text, bulb glow pulse once | typing; ding when the poster lands |
| 5 | refs | 0:40–0:49 | Four reference thumbnails fly in from the sides into a grid, one gets a star | phone-fan / thumbnail grid | stagger 4f, ease-out | pop1,pop2 |
| 6 | plan | 0:49–1:01 | App window: user prompt → Bot replies with a 13-row scene list; clock chips "0:00 / 0:03 / 0:08" tick onto rows | AppWindow (real/ui.tsx) | rows stagger, chips pop | typing, tick per row |
| 7 | real | 1:01–1:12 | Generic grey screen on the left is swapped for a real-looking UI via a camera-flash wipe; screenshot cards drop in | phone + screenshot stack | wipe ease-out expo | camera click, ding |
| 8 | build | 1:12–1:22 | Bot works: a terminal/AE-like timeline fills with layer bars while the user avatar sips from a cup/idle | ComputerR + timeline | bars grow staggered | quiet loop, soft tick |
| 9 | v1 | 1:22–1:33 | Draft plays in a monitor frame: shows content OK, a stutter marker on the timeline blinks "weak rhythm" | monitor + timeline red marker | blink x2, hold | low tick |
| 10 | time | 1:33–1:46 | Feedback note card types "0:33 transition too slow, fast and sharp"; the playhead jumps to 0:33, the matching bar gets orange | note cards + playhead | playhead snap ease-out expo | typing, whoosh on the jump |
| 11 | ease | 1:46–1:58 | Three note chips stack ("ease-out expo", "hard hit", "same beat as logo"); each draws a tiny easing curve | graph cards (curve drawn with SVG) | curve draw, chip pop | tick x3 |
| 12 | loop | 1:58–2:08 | A looping arrow circles 3 rounds; a quality bar steps up each lap, 40→70→95% | loop diagram + bar | arrow rotate, bar spring | ding each lap |
| 13 | compare | 2:08–2:19 | Before/after slider wipes across the same ad; labels FIRST DRAFT / FINAL | before/after wipe | wipe linear then ease | whoosh, final ding |
| 14 | outro | 2:19–2:30 | Hand icon fades into eye icon; 3-word checklist "Watch · Note the moment · Say the change" lands, Bot mark waves | OutroR-style closing card | cross-morph, stagger | music swell, soft ding |

Shots 1,3,10,13 reuse the reference's pacing: fast hook, timeline, timecode note, before/after.
All 14 are CODE-ONLY (no footage needed). Captions = narration per sentence (tts.py timings).
Open points for you: voice (default en-US-AriaNeural; or OmniVoice, you judge), and whether to name the product "Grok Bot" on screen or keep "Bot".
