import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import slides from '../../content/one-person-company/slides.json';
import {clamp} from '../lib/kit';
import type {P} from '../lib/kit';
import * as S from './real/ScenesOP';

export const ONE_PERSON_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

const SCENES: Record<string, React.FC<P>> = {
  hook: S.HookOP,
  small: S.SmallOP,
  map: S.MapOP,
  pain: S.PainOP,
  research: S.ResearchOP,
  advice: S.AdviceOP,
  ladder: S.LadderOP,
  recipe: S.RecipeOP,
  inboxdata: S.InboxDataOP,
  calendar: S.CalendarOP,
  loop: S.LoopOP,
  cadence: S.CadenceOP,
  delivery: S.DeliveryOP,
  interview: S.InterviewOP,
  board: S.BoardOP,
  marketing: S.MarketingOP,
  leads: S.LeadsOP,
  content: S.ContentOP,
  funnel: S.FunnelOP,
  sales: S.SalesOP,
  coach: S.CoachOP,
  winrate: S.WinrateOP,
  brain: S.BrainOP,
  friday: S.FridayOP,
  vision: S.VisionOP,
  outro: S.OutroOP,
};

export const OnePersonCompany: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#0A0A0A'}}>
      <Audio
        src={staticFile('shared/sfx/bed.wav')}
        loop
        volume={(f) => 0.09 * interpolate(f, [0, 30, ONE_PERSON_FRAMES - 90, ONE_PERSON_FRAMES], [0, 1, 1, 0], clamp)}
      />
      {slides.map((s, i) => {
        const Comp = SCENES[s.id];
        const start = from;
        from += s.frames;
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`one-person-company/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Comp n={i + 1} vo={s.vo} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
