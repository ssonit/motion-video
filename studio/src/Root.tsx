import React from 'react';
import {Composition} from 'remotion';
import {Explainer30, FPS, DURATION} from './videos/Explainer30';
import {BotGuide, BOT_GUIDE_FRAMES} from './videos/BotGuide';
import {BotGuideFull, BOT_GUIDE_FULL_FRAMES} from './videos/BotGuideFull';
import {BotGuideRich, BOT_GUIDE_RICH_FRAMES} from './videos/BotGuideRich';
import {BotGuideReal, BOT_GUIDE_REAL_FRAMES} from './videos/BotGuideReal';
import {BotFeedbackLoop, BOT_FEEDBACK_LOOP_FRAMES} from './videos/BotFeedbackLoop';
import {onePersonCompositions} from './videos/one-person';
import {BotBasics, BOT_BASICS_FRAMES} from './videos/BotBasics';
import {NightStudio, NIGHT_STUDIO_FRAMES} from './videos/NightStudio';
import {TemplateDemo, TEMPLATE_DEMO_FRAMES} from './videos/TemplateDemo';

/** One <Composition> per video. Add new videos here (see ../../CLAUDE.md). */
export const Root: React.FC = () => (
  <>
    <Composition
      id="Explainer30"
      component={Explainer30}
      durationInFrames={FPS * DURATION}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="BotGuide"
      component={BotGuide}
      durationInFrames={BOT_GUIDE_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="BotGuideFull"
      component={BotGuideFull}
      durationInFrames={BOT_GUIDE_FULL_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="BotGuideRich"
      component={BotGuideRich}
      durationInFrames={BOT_GUIDE_RICH_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="BotGuideReal"
      component={BotGuideReal}
      durationInFrames={BOT_GUIDE_REAL_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="BotFeedbackLoop"
      component={BotFeedbackLoop}
      durationInFrames={BOT_FEEDBACK_LOOP_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="BotBasics"
      component={BotBasics}
      durationInFrames={BOT_BASICS_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="NightStudio"
      component={NightStudio}
      durationInFrames={NIGHT_STUDIO_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="TemplateDemo"
      component={TemplateDemo}
      durationInFrames={TEMPLATE_DEMO_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    {onePersonCompositions.map((c) => (
      <Composition key={c.id} id={c.id} component={c.component} durationInFrames={c.frames} fps={FPS} width={1280} height={720} />
    ))}
  </>
);
