# Grok Bot + UGC ad factory — script (series `grok-ugc`)
Reference: `references/grok-bot-ugc-ads` (13:20; ≈10:20 without the ad playback + outro). Target ≈ 9:30–10:30.
Voice: `--engine omnivoice --clone bot-narrator --speed 0.8` (≈3.15 words/s measured on past videos). Product = our made-up Driftwood Cold Brew.

## Part 1-hook — Hook & why now (21 shots, 371 words ≈ 1:57)
- **hook-cold**: If you sell anything online, these three video ads were made without a camera, a creator, or an editor.
- **hook-claim**: One team of Grok Bots wrote them, made them, and launched them.
- **hook-factory**: I call it an ad factory, and today I'll build the whole thing in front of you.
- **hook-toc1**: By the end, you'll know how to find an ad that already works,
- **hook-toc2**: how to make a Bot break it down shot by shot,
- **hook-toc3**: how to swap in your own product,
- **hook-toc4**: turn one ad into three,
- **hook-toc5**: and hand it all to a second Bot that launches the campaign.
- **hook-loop**: Stay to the end, because there's one mistake in this setup that can get your ad account shut down.
- **proof-intro**: Before the setup, let me show you what comes out the other end, so you know it's worth the next ten minutes.
- **proof-list**: Ad one is a list format: three reasons I switched to cold brew, number one, no more two p.m. crash. Lists keep people watching to the end.
- **proof-story**: Ad two is a story: a tiny problem, a discovery, a payoff, and an offer. It runs thirty seconds and still feels like a friend talking.
- **proof-demo**: Ad three is a plain product demo: pour, sip, react. Short, almost boring, and these often have the cheapest clicks.
- **proof-same**: All three came from the same Bot, the same product photo, and about one paragraph of instructions each.
- **why-ugc**: First, why this matters. UGC means user-generated content: a normal-looking person, holding a phone, talking about a product.
- **why-cost**: Those ads usually win on social feeds, but every one of them costs a creator, a shoot, and a few days of waiting.
- **why-test**: And you never need one ad. You need ten, so you can test which hook actually sells.
- **why-model**: What changed is the video models. Seedance 2.5 can now generate thirty seconds of a person talking, holding your product, in one go.
- **why-bot**: And Grok Bot gives you AI teammates with their own computer, that can use tools like that for you.
- **why-need**: What you need: the Grok Bot app, an account with a video model, a Meta ad account, and one good photo of your product. That's the whole kit.
- **why-map**: Put them together and you get a five-step line: find, break down, recreate, multiply, launch.

## Part 2-setup — Set up the studio Bot (21 shots, 394 words ≈ 2:05)
- **install**: Step one: install Grok Bot. Go to x dot a i slash bot, download the desktop app, and finish the short onboarding.
- **app-tour**: On the left are your channels and Bots. A channel is a room; Bots are the teammates you put in it.
- **new-channel**: Create a new channel for this project. I'll call it Ad Factory.
- **new-bot**: Now press New Bot. Give it a name, AI UGC Studio, and a one-line title: makes video ads from a reference.
- **bot-desc**: The description is optional, but one sentence about your brand helps every answer that follows.
- **bot-computer**: Every Bot works on its own computer in the cloud, so it can download files and run tools while your laptop is closed.
- **plugins-open**: Next, plugins. These give the Bot extra powers, and this setup needs four of them.
- **plugins-search**: Use the search box at the top of the dialog. Type a name, and press Add on the result.
- **plug-video**: One: a video generation connector, so the Bot can call a model like Seedance directly. This is the engine.
- **plug-drive**: Two: Google Drive, so every finished video lands in a folder you can share.
- **plug-x**: Three: an X research plugin. X is where marketers post what's working right now, so it's high-signal research.
- **plug-ads**: Four: an ads connector, so a Bot can create campaigns on Meta without you clicking through Ads Manager.
- **plug-check**: Quick check: ask the Bot, what tools do you have? It should list all four. If one is missing, add it again before you go on.
- **find-where**: Now the first real job: find an ad that already works. Don't invent a format, borrow a proven one.
- **find-library**: The Meta Ad Library is free. Search your product type and filter to active video ads.
- **find-signal**: Look for ads that have been running for weeks, with several versions. Nobody keeps paying for an ad that loses.
- **find-comments**: Open the comments too. If people ask where to buy, or argue about it, the ad is doing its job.
- **find-length**: And prefer short, simple ads for your first build: one person, one room, under thirty seconds. They copy cleanly.
- **find-pick**: I found a simple one: a person wakes up tired, discovers the product, shows it, and asks a question at the end.
- **download**: Copy the link, paste it into the Bot's chat, and say: download this video and tell me when it's done.
- **download-done**: Seconds later, the video is sitting in the chat. Nothing to install, no downloader site.

## Part 3-make — Make the ad (26 shots, 477 words ≈ 2:31)
- **sop-why**: Before it copies anything, the Bot needs to know how to watch an ad. That's what a breakdown guide is for.
- **sop-list**: Mine asks for five things: the hook in the first two seconds, every cut, what's on screen, the exact words, and the call to action.
- **sop-send**: Attach the guide and write: read this, then break down the full video.
- **breakdown**: The Bot measures the cuts, writes the script word for word, and lists every scene with its timing.
- **breakdown-sheet**: It even builds a contact sheet, a grid of frames, and saves the whole thing as a file you can reuse.
- **breakdown-hook**: Look at what it found: the hook isn't the product. It's the tired face. The product only shows up at second four.
- **breakdown-words**: It also counts the words. This ad says about seventy words in twenty-three seconds, so your new script has to fit the same length.
- **breakdown-save**: Tell it to save this method as a skill. Next time you just say: break this one down, the same way.
- **product-upload**: Now swap in your product. Upload one clean photo, front-facing, on a plain background.
- **product-prompt**: Then one prompt: recreate this ad with my product, use Seedance 2.5, keep the structure, and rewrite the lines for cold brew.
- **script-new**: Before it renders, ask to see the new script. It keeps the same beats: tired at two p.m., found this, here's how it tastes, will you try it?
- **script-edit**: Change any line you don't like now. Editing a sentence costs nothing; re-rendering a video costs credits and minutes.
- **voice-pick**: Pick the creator and the voice in plain words too: late twenties, friendly, a little sleepy, kitchen in morning light.
- **render-steps**: The Bot maps the old structure onto your can, rewrites the script, writes the video prompt, and sends it to the model.
- **render-wait**: A thirty-second clip takes a few minutes. The Bot checks the job and pings you when it's ready.
- **result**: And here's the result: same rhythm, same hook, new product, new words.
- **result-compare**: Side by side with the original, the beats line up almost frame for frame.
- **result-check**: Before you use it, watch it once yourself. Check the product looks right and every claim is true.
- **fix-bad**: Sometimes a take comes out wrong: an extra finger, a label that melts, a can that changes colour halfway.
- **fix-prompt**: Don't start over. Tell the Bot exactly what's wrong and which seconds: at second six the label is blurry, redo only that part.
- **vari-why**: Next, one ad is a guess. Three ads are a test.
- **vari-prompt**: Ask: make three variations of this ad with different creators, and keep the script the same.
- **vari-who**: Each version speaks to a different viewer: a student before class, a nurse after a night shift, a dad at six a.m.
- **vari-grid**: The Bot renders all three at once and shows them side by side.
- **vari-hooks**: You can vary the first line too. Same product, three different hooks.
- **vari-drive**: Everything lands in your Drive folder, named and ready.

## Part 4-launch — Launch & the rules (23 shots, 427 words ≈ 2:15)
- **mgr-why**: Making ads is half the job. Running them is the other half, and that's a different skill.
- **mgr-channel**: Create one more channel called Management, and add your studio Bot to it.
- **mgr-bot**: Then create a second Bot, Ads Manager. Its title: launches and watches our ad campaigns.
- **mgr-team**: Now one room has two teammates: one that makes the ads, and one that runs them.
- **launch-msg**: In the Management channel, write one message: launch my three new cold brew ads on Meta.
- **launch-handoff**: The studio Bot hands over the files. The Ads Manager picks them up and asks one question back.
- **launch-yes**: Put all three in one ad set, same budget, so they compete fairly? Yes.
- **launch-blocker**: If something is missing, like a Facebook page that isn't connected yet, it tells you instead of guessing.
- **launch-form**: Then it fills in the campaign: platform Meta, objective sales, a test budget of twenty-five dollars a day.
- **launch-approve**: It still waits for your OK before anything goes live. You stay the one who spends the money.
- **launch-cap**: Set a hard limit in the request too: never spend more than twenty-five dollars a day without asking me. Bots follow written boundaries.
- **launch-watch**: After launch, the two Bots keep talking: which ad is winning, which hook to try next.
- **watch-metrics**: The three numbers to watch: how many people stop scrolling, how many click, and what each sale costs you.
- **watch-rule**: Give the Ads Manager a simple rule: after three days, pause the weakest ad and move its budget to the best one.
- **watch-routine**: Then turn it into a routine. Every morning at nine, the Ads Manager posts a short report, and the Studio Bot makes two new versions of the winner.
- **watch-loop**: That's the loop: make, test, keep the winner, make more like it. The Bots run it; you read one message a day.
- **loop-reveal**: Now, the mistake I promised. It's letting the AI say things your product can't back up.
- **rule-ftc**: In the US, the FTC banned fake reviews and testimonials, and it named AI-generated ones on purpose.
- **rule-meta**: And Meta reviews every ad against its advertising standards. Break them often enough and your ad account gets restricted.
- **rule-three**: So three rules: no made-up results, no fake 'I've used this for years' stories, and label AI content where the platform asks.
- **rule-safe**: Write the lines as a scene, not a testimony. 'Here's my morning with it' is honest. 'It cured my tiredness' is not.
- **recap**: That's the full factory: find a winner, break it down, recreate it, make three, and launch with a second Bot.
- **outro-start**: Start small. One Bot, one reference ad, one product photo. You can have your first ad before lunch.

**Total: 1669 words ≈ 8:49 at 3.15 words/s** (checked again after tts.py).
