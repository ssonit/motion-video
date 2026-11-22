# fb-1E2uWdhpVR — "AI dựng video trong After Effects: quy trình ý tưởng → storyboard → AE → góp ý"

Source: https://www.facebook.com/share/v/1E2uWdhpVR/ (FB reel link; 10:59, 1280x720, 30fps, audio, Vietnamese). Fetched OK with yt-dlp.

## Facts
- **Observed (frames + vi_VN subtitles):** a Vietnamese video editor (brand watermark EDITORNGHIEPDU.VN) shows how he made a ~45 s Shopee 11.11
  UI-animation ad with Claude desktop app + After Effects via an MCP bridge. Screen recording of the Claude app / storyboard page / AE timeline,
  plus motion-graphics intro/chapter cards (orange "ember" palette, same as our house style).
- Structure (subtitle timestamps): 0:00 before/after hook (two phone ads side by side, "BẢN ĐẦU TIÊN" vs "SAU KHI GÓP Ý") → 0:18 claim
  "both made by AI directly in After Effects" → 0:40 value (30 s ad earns millions VND, 5 h total, eyes replace hands) → 1:46 "let's start" →
  1:55 Step 1 idea (prompt typed in Claude, fast-forward) → 3:28 Claude splits into 13 scenes, 45 s → 3:54 first draft has no Shopee look,
  he photographs real Shopee UI and feeds it back → 5:03 improved storyboard, adds 3D box idea → 6:35 opens AE, MCP, "use scripts not Express"
  → 7:36 course promo (inferred: ad, not to copy) → 8:17 AE result v1 ("drawn right, animation/rhythm boring") → 8:36 Step 4 feedback by timecode
  + easing/graph notes (longest step, fast-forwarded) → 9:41 result beyond expectation → 9:48 final with music/sfx → 10:18 outro.
- Chapter card (observed, ~0:50–1:40): timeline Ý tưởng · Storyboard · After Effects · Góp ý, lightbulb + note bubble, phone cards fan, AI chip,
  REC corners, orange notes "0:33 …", "0:13 ease-out expo", "0:03 hiện cùng lúc logo".

## Style (observed)
- Dark charcoal + ember orange (#F26A1B-ish) with glows, grid, dust particles, rounded cards, bold sans titles, mono-ish labels, capsule tags.
- Mixed shots: split-screen before/after phones with orange labels; timeline/keyframe bars ("03 NHỊP"); calendar "DEADLINE T6/T7";
  phone with checkmark badge; eye + beam → phone "VIDEO NÀY"; real screen recordings (Claude app, storyboard page, AE) sped up; full-screen finished ad.
- Ad itself (observed): orange sunburst bg, 11.11 logo, search bar typing "tai nghe không dây", phone mock + product (earbuds), map delivery, 3D gift box pop, "+150.000 xu", Shopee logo.

## Shot mix (CODE-ONLY vs NEEDS MEDIA)
- Hook split-screen, chapter timeline, keyframe/graph cards, deadline calendar, eye/beam, phone with callouts: **CODE-ONLY** (SVG/CSS in Remotion).
- Claude-app / AE screen recordings: **NEEDS MEDIA** (user's own recordings) or CODE-ONLY faithful mock if user sends screenshots.
- Finished ad clips (the "before/after"): ours would be a **different, our-own ad** built in Remotion (not Shopee branding).
- Presenter voice-over: original is the creator's own voice (**unknown** whether face shown; frames show none).

## Editable choices
- Replace: product/brand (Shopee 11.11 → our own generic or user's product), creator identity, course promo (drop), Vietnamese → user's language.
- Preserve: 4-step workflow story, before/after hook, "give feedback by timecode + easing" lesson, 13-scene/45 s storyboard idea, pacing (fast-forwarded long steps).

## Script (English gist)
Hook: same ad, two versions, only the eye differs → AI built both, human taste fixes weak impact/stutter/half-second lag → 5 h vs a week →
work shifts from hands to eyes → Step 1 idea → Step 2 storyboard (13 scenes) + feed real UI screenshots → Step 3 AE via MCP, scripts not shortcuts →
Step 4 feedback with exact timecodes and easing → before/after → final with sound.

## Sound / checks
Observed only through subtitles + frames; **audio not heard**. Cuts not yet measured with tools/measure.py (do after brief is agreed).
