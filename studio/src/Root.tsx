import React from 'react';
import {Composition} from 'remotion';
import {Explainer30, FPS, DURATION} from './videos/Explainer30';
import {BotGuide, BOT_GUIDE_FRAMES} from './videos/BotGuide';
import {BotGuideFull, BOT_GUIDE_FULL_FRAMES} from './videos/BotGuideFull';
import {BotGuideRich, BOT_GUIDE_RICH_FRAMES} from './videos/BotGuideRich';
import {BotGuideReal, BOT_GUIDE_REAL_FRAMES} from './videos/BotGuideReal';
import {BotFeedbackLoop, BOT_FEEDBACK_LOOP_FRAMES} from './videos/BotFeedbackLoop';
import {OnePersonCompany, ONE_PERSON_FRAMES} from './videos/OnePersonCompany';
import {OpPart1, OP_PART1_FRAMES, OpPart2, OP_PART2_FRAMES, OpPart3, OP_PART3_FRAMES, OpPart4, OP_PART4_FRAMES, OpPart5, OP_PART5_FRAMES, OpPart6, OP_PART6_FRAMES} from './videos/OpParts';
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
      id="OnePersonCompany"
      component={OnePersonCompany}
      durationInFrames={ONE_PERSON_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="OpPart1"
      component={OpPart1}
      durationInFrames={OP_PART1_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="OpPart2"
      component={OpPart2}
      durationInFrames={OP_PART2_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="OpPart3"
      component={OpPart3}
      durationInFrames={OP_PART3_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="OpPart4"
      component={OpPart4}
      durationInFrames={OP_PART4_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="OpPart5"
      component={OpPart5}
      durationInFrames={OP_PART5_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
    <Composition
      id="OpPart6"
      component={OpPart6}
      durationInFrames={OP_PART6_FRAMES}
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
  </>
);
