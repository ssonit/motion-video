# Reference: "Seedance 2.5 + Grok Bot = 50 Viral AI UGC Ads a Day (Full Tutorial)"
Source: https://www.youtube.com/watch?v=mcY7ReDNrd0 (channel Miko, ~3 months old, 25K views; fetched 2026-11-27 with
`tools/analyze.py`). Sampling: 8 contact sheets, 1 frame / 17 s; YouTube auto captions → `transcript.txt` (36 blocks of ~20 s).
Not checked: audio was not heard (script comes from auto captions, names are mis-transcribed: "C Dance" = Seedance,
"WaaS / Wopster / Watsi" = Whop, "Hixter" = Higgsfield). Motion inside the screen recording was not strip-checked
(it is a plain screen capture, see Measurements).

## Facts (observed)
- 13:20, 16:9, 1280x720 at 60 fps, audio yes, English, presenter **no** (voice-over over a screen recording only).
- 100 % screen recording of a Mac desktop (blue wallpaper visible at the edges): browser tabs + the Grok Bot desktop app (dark).
- No burned-in captions in the tutorial part; the AI ad examples carry their own word-by-word captions.

## Brand & assets
- Theirs (do NOT copy): the creator's name/product ("Miko's Copper Peptide Serum", "Mikos chocolate bar"), the NIOD ad
  they recreate (a real brand's TikTok), the faces of the AI avatars, Whop / Higgsfield as named sponsors-style tools,
  "50 ads a day" claim, the SOP PDF.
- Ours: BotGuideReal look + `studio/src/videos/real/` kit (dark Grok Bot window, BotMark), light pastel backgrounds
  ([[feedback-light-look]]), real captures of x.ai/bot in `references/yt-C2llc614D2M/assets/`, new captures in `assets/` here.
  Product in our demo = our own made-up product. AI "creators" = drawn avatars / phone frames, never photo faces.

## Audience & promise
Marketers / small e-commerce sellers who run paid social. Promise: "one Bot team that researches, makes and launches UGC-style
video ads for you". Hook (observed, 0:00–0:23): a fast montage of finished AI UGC ads + the claim "an entire AI UGC ad factory",
then the 4-step pipeline is named (research → winning format → generate → push to Meta Ads).

## Story & timing (observed)
| Time | Purpose | Picture & copy | Transition |
|---|---|---|---|
| 0:00–0:23 | hook | x.ai/bot page, Seedance 2.5 landing page; VO names the pipeline | hard cuts between browser tabs |
| 0:23–0:44 | why now | Seedance 2.5 page (BytePlus), pricing plans | scroll |
| 0:44–3:01 | proof | 3 finished AI UGC ads played full: makeup list (5 products), chocolate story ad (2:15, long-form) | hard cut to local mp4 in browser |
| 3:01–3:23 | reaction | "one prompt, end-to-end long video" | — |
| 3:23–4:06 | step 1: install | x.ai/bot download, app with channels + bots | cut |
| 4:06–4:30 | step 2: new bot | New Bot panel: name "AI UGC STUDIO", title, description | — |
| 4:30–5:36 | step 3: plugins | Plugins dialog: video-generation connector, Google Drive, X research, an ads/business connector | — |
| 5:36–6:20 | step 4: find a winning ad | where to look (TikTok, Meta Ad Library, ad-spy tools); plays a TikTok eye-serum ad | cut to TikTok |
| 6:20–6:43 | step 5: download | paste link in chat → bot downloads (23 s, 576x1024) | cut back to app |
| 6:43–7:48 | step 6: breakdown | upload SOP PDF, "read this and break down the full video" → bot writes scene-by-scene breakdown + contact sheet + .md | long hold, scroll |
| 7:48–8:55 | step 7: recreate | upload own product photo, one prompt → bot recasts the structure onto the new product, renders | long hold |
| 8:55–9:20 | result | 23 s AI ad with their bottle | cut to mp4 |
| 9:20–10:40 | step 8: variations | "make 3 more variations" (different avatars) → side-by-side triple player | cut |
| 10:40–11:08 | step 9: manager bot | new channel MANAGEMENT, new bot ADS MANAGER, both bots as members | — |
| 11:08–12:38 | step 10: launch | one message "launch my 3 ads to Meta" → studio bot and ads bot talk, ask "one ad set?" → yes → campaign form (Meta, Sales, $25/day) | long hold |
| 12:38–13:20 | outro | recap "full ad factory", "links below", back to x.ai/bot | — |

## Shot mix
Reference = one look only (screen recording), shots held 20–210 s. Ours must cut every ~5–8 s and vary looks (CLAUDE.md).
| Ref section | Our look | Need |
|---|---|---|
| hook montage of ads | phone frames with drawn UGC avatars + product, kinetic words | CODE-ONLY |
| x.ai/bot, Seedance page | framed real screenshot + source tag | real capture (have/new) |
| app: channels, new bot, plugins | BotGuideReal dark window on pastel | CODE-ONLY |
| TikTok / ad library | phone feed mock + [R] Meta Ad Library capture | CODE-ONLY + real capture |
| breakdown / recreate chat | dark chat, typed prompt, file chips, scene grid | CODE-ONLY |
| finished AI ad | our own drawn 9:16 ad playing in a phone | CODE-ONLY (no real faces) |
| variations | 3 phones side by side, avatar swap | CODE-ONLY |
| campaign launch | bot-to-bot chat + campaign form mock | CODE-ONLY |
The finished AI ads themselves (real-looking people) are NEEDS MEDIA if the user wants them; by default we draw them.

## Motion & composition (observed)
Static screen capture, cursor moves, occasional scroll; no zooms, no stickers, no music under the demo (inferred from no visible
beat cues; not heard). Density: full dark app UI edge to edge. Our version adds zoom-to-active-area + arrow callouts
(standard template §8.6).

## Sound
Voice only, fast casual male narration (~3.3 words/s from captions: 2,600 words / 13:20). Ads play with their own audio. Not heard.

## Editable choices
| Replace | Preserve |
|---|---|
| creator, product, NIOD ad, avatars' faces, tool brand names (keep generic "video connector", "ads connector"), "50 a day" | pipeline order find → break down → recreate → variations → launch; payoff-first hook; two-bot hand-off at the end |

## Keep / Replace / Invariants
- Keep (observed): hook shows finished ads before any setup; every step ends on a visible result (file downloaded, breakdown
  written, video rendered, 3 variants side by side, campaign form filled).
- Replace: all ad content with our own product; long screen holds → 5–8 s shots.
- Add (our deviation, on purpose): a "rules" beat — AI-made testimonials must not invent results, label AI content where the
  platform asks, check claims before launch (Meta / FTC). Used as the hook's open loop ("the mistake that gets the ad account banned").

## Measurements
`measure.py cuts`: 40 shot segments; the first 38 s are a burst of sub-second cuts (ad montage, observed); after that shots
are 12–212 s long (screen recording). Hard cuts at 202, 277, 365, 380, 418, 531, 641 s match the section table.
Look not sampled (dark app on blue wallpaper is obvious from the sheets).

## Script (English, condensed)
See `transcript.txt` for the full auto caption. Our rewrite: `studio/content/grok-ugc/script.md`.
