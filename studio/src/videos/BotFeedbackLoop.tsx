import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import slides from '../../content/bot-feedback-loop/slides.json';
import {clamp} from '../lib/kit';
import type {P} from '../lib/kit';
import {
  BuildFB,
  CompareFB,
  DraftFB,
  EaseFB,
  HookFB,
  IdeaFB,
  LoopFB,
  MapFB,
  OutroFB,
  PlanFB,
  RealFB,
  RefsFB,
  ShiftFB,
  TimeFB,
} from './real/ScenesFB';

export const BOT_FEEDBACK_LOOP_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

const SCENES: Record<string, React.FC<P>> = {
  hook: HookFB,
  shift: ShiftFB,
  map: MapFB,
  idea: IdeaFB,
  refs: RefsFB,
  plan: PlanFB,
  real: RealFB,
  build: BuildFB,
  v1: DraftFB,
  time: TimeFB,
  ease: EaseFB,
  loop: LoopFB,
  compare: CompareFB,
  outro: OutroFB,
};

export const BotFeedbackLoop: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#0A0A0A'}}>
      <Audio
        src={staticFile('shared/sfx/bed.wav')}
        loop
        volume={(f) =>
          0.09 * interpolate(f, [0, 30, BOT_FEEDBACK_LOOP_FRAMES - 90, BOT_FEEDBACK_LOOP_FRAMES], [0, 1, 1, 0], clamp)
        }
      />
      {slides.map((s, i) => {
        const Comp = SCENES[s.id];
        const start = from;
        from += s.frames;
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`bot-feedback-loop/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Comp n={i + 1} vo={s.vo} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
