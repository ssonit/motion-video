import React from 'react';
import {Composition} from 'remotion';
import {FPS} from './videos/experiments/Explainer30';
import {experimentCompositions} from './videos/experiments';
import {grokBotCompositions} from './videos/grok-bot';
import {onePersonCompositions} from './videos/one-person';

/** One folder per series under src/videos/<series>/ with an index.ts registry; add a series = one line here (see ../../PROJECTS.md). */
const all = [...grokBotCompositions, ...onePersonCompositions, ...experimentCompositions];

export const Root: React.FC = () => (
  <>
    {all.map((c) => (
      <Composition key={c.id} id={c.id} component={c.component} durationInFrames={c.frames} fps={FPS} width={1280} height={720} />
    ))}
  </>
);
