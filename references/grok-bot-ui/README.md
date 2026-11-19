# Grok Bot — real UI reference (for 1:1 recreations)

Captured 2026-11-19. Web pages by us in the built-in browser (viewport 1440x900, screenshots are 800 px wide);
app screenshots (`app/`) were sent by the user from the desktop Grok Bot app. Fan-film use only: do not present as official.

## Files
| File | What |
|---|---|
| `app/01-bot-profile-add-dialog.png` | Bot profile card (from a marketplace link): coloured banner with the bot mark, name, description, grey legal line, white "Add to Grok Bot" pill, "Opening Grok Bot…" below |
| `app/02-main-chat-window.webp` | Desktop app: left rail (search + "+" top; round avatars "Grok Bot", "dr eggbot"; thread list with coloured bot icon, name, 1-line preview, blue unread dot), centre chat (bot messages as dark rounded cards, user message as a pink pill on the right, timestamp grey), bottom input pill "Message <bot>" with + and mic/voice buttons, right panel (bot mark, name, tabs Activity / Library) |
| `app/03-connect-apps-dialog.png` | "Connect Apps": modal, search "Search across apps and skills", "Bot templates ↗" pill, category pills (All, Password Managers, Productivity, Communication, Design, Code, More ⌄), "Recommended for you" 2-column list of app icon + name + grey "Connect" pill (✓ Connected for Notion), "7 connected" avatars top-right |
| `app/04-bot-side-panel.png` | Bot panel: big pink bot mark, name, Activity/Library tabs, "Suggested › Create a routine", "Computer: Bot's computer · Awake" with a blurred thumbnail, "Voice chat": Voice = Liora 1.0x, Language = Auto-detect |
| `web/00…06-*.jpg` | x.ai/bot/marketplace (narrow + 1440 wide, 4 scroll positions), a bot detail page (dr-eggbot-v2), a category page (/engineering) |

## Design tokens (computed from the live page)
- Page bg `#0A0A0A`, text `#FFFFFF`, secondary text `rgba(255,255,255,.7)` / `.3`; cards `~#202020` (`color(srgb .127 .127 .127)` = #202020).
- Font: custom "xVf" (geometric grotesk, comparable to Universal Sans / Inter Tight). H1 36px/500; body 16px/400; pills 14px/500.
- Pills fully rounded (`border-radius: 9999px`), height 40px: active filter = white bg `#0A0A0A` text; inactive = `#202020` bg white text.
- Cards radius ≈ 16–24px; "Add" buttons dark pill `#202020`; primary CTAs ("Add to Grok Bot", "Import Bot", "Download") white pill, dark text.
- Header: SpaceX-style slash logo left, nav (Products, Solutions, Developer, Company, Pricing, News), "Contact Sales" dark pill, "Download" white pill with chevron.
- Cookie banner bottom-right (Reject All / Accept All) — we pressed Reject.

## Marketplace structure
Title "Marketplace" → filter pills `All · From Grok Bot Team · Engineering · Sales · Marketing · Design · Personal · Recruiting & People · Product · Operations`
→ search "Search by creator or bot name" → **Featured** (4 tall cards, big mark + coloured name + "by creator": dr eggbot red, Overheard orange, Tradbot violet, Projects Manager pink)
→ per category: heading + "View all", 2-column list rows: small mark · "Name by Creator" · 1-line description (ellipsis) · dark "Add" pill.
Bot detail page `/marketplace/bots/<slug>`: "‹ Back to Bot Marketplace", big mark with creator avatar badge, name, "By <creator> ✓", description, white "Import Bot", left tabs (Memories · Skills · Routines · Integrations), right dark card with the memory text.
Sample bots (public): Outbound Prospecting, SEO & AEO Desk, Haggle Bot, Recruiting Coordinator, Researchy, Lingxi's Engineer Bot, tinkabot, QA bot, GTM Loop Closer, Sales Call Coach, Meeting Recap Deck, Clip Bot, Copy Humanizer, Imogen, figma bro, Home robots, Director Bot, PM bot, Executive Assistant, Alfred… (use generic names in our own films).

## The bot mark
Component `studio/src/lib/GrokBotMark.tsx` (real SVG paths: head blob + 2 capsule eyes `#0A0A0A`, viewBox `-9.94 -9.94 248.41 248.41`).
Palette on the site: pink `#E02A88`, red `#E02135`, orange `#FF6700`, green `#009957`, teal `#00A592`, blue `#0E74E0`, violet `#804EE0`, grey `#777777`; the default Grok Bot is white.
~16 head shapes exist (leaning drop, round blob, circle, pillow, rounded squares, hexagon-ish…): 4 stored; get the rest with `tools/grokbot-marks-extract.js`.
The eyes are always two tilted capsules, tilted along the head's lean; the head is never symmetric, which is what makes them look alive.

## How to use for a 1:1 recreation
1. Build UI scenes in Remotion/HTML from these tokens; place `GrokBotMark` for every avatar; copy layout from the screenshots at their pixel positions (app screenshots are 2000 px wide; the sidebar is ≈ 220 px, right panel ≈ 250 px).
2. Real text from the user's own bots is private (the screenshots contain Vietnamese business chats): replace with invented text in any video.
3. Still missing (ask the user): the chat input/voice-call screen, routines screen, "Bot's computer" window, settings, the iOS app.
