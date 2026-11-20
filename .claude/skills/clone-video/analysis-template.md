# analysis.md template (shot-by-shot, "Motion MD" style)

Idea borrowed from references/_external/openmotion (Motion.md). Copy this into `references/<slug>/analysis.md`
and fill it. Keep the existing `references/bot-guide-cn/analysis.md` as a worked example of the prose parts.

```markdown
# Reference: "<title>"
Source / sampling / what was NOT checked (e.g. audio not heard).

## Facts
Length, ratio, fps, audio yes/no, language, presenter yes/no.

## Brand & assets
What in the reference is the original brand (names, logos, faces, product claims) — we do NOT copy these.
What we have for our version (own mascot, tokens, screenshots in references/grok-bot-ui/).

## Audience & promise
Who it is for, the one-sentence message, hook in the first 3 s.

## Story & timing
| Time | Purpose | Picture & copy | Transition |
|---|---|---|---|
| 0:00–0:10 | hook / problem | … | … |
(one row per chapter or per shot; ~1 shot per sentence)

## Shot mix (see studio/LIBRARY.md §5 and §10)
Per shot: look (illustration / app window / phone / neon / chart / chapter card / text slide),
and what it needs: CODE-ONLY or NEEDS MEDIA (talking head, real screen recording, photo, music).

## Motion & composition
Camera/layer motion, type scale and type character, density (a full screen stays full), background layers,
pacing (cut every ~5–8 s), readable hold after each reveal.

## Sound
Voice style, music bed, sfx pattern. (Audio not heard unless the user said so.)

## Editable choices
| Replace | Preserve |
|---|---|
| names, wording, palette, mascot, examples | structure, pacing, density, shot variety, closing frame |

## Keep / Replace / Invariants
Keep: the decisions that must survive the content change (hook order, reveal rhythm, final reading hold).
Replace: text, subject, data, brand, assets, with real capacity limits (longer copy → split the beat, don't shrink).
Label every line observed / inferred / unknown. Deviations from the reference are listed on purpose.

## Measurements
Output of `tools/measure.py` (cuts, shot lengths, look grid at 3+ moments). Unverified intervals and why.

## Review log (filled after render)
Moments compared (ref t → ours t), measure.py flags, defects fixed, defects left, what was NOT checked (audio not heard).

## Script (translated to English)
Per scene: id, line, approx. seconds.
```
