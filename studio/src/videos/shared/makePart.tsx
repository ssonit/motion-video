import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {clamp} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {FooterCtx} from '../real/ui';

export type Slide = {id: string; vo: string; frames: number};

/**
 * One part of a series = one slides.json + a map slide id → scene.
 * Adds the shared sfx bed, one narration mp3 per slide (public/<slug>/vo/NN.mp3) and the footer label.
 * `theme` = CSS vars (see themes.ts); omit for the default Bot look.
 */
export const makePart = (opts: {
  slug: string;
  n: number;
  total: number;
  label: string;
  slides: Slide[];
  scenes: Record<string, React.FC<P>>;
  theme?: React.CSSProperties;
}) => {
  const {slug, n, total, label, slides, scenes, theme} = opts;
  const frames = slides.reduce((a, s) => a + s.frames, 0);
  const Comp: React.FC = () => {
    let from = 0;
    return (
      <AbsoluteFill style={{background: '#121214', ...theme}}>
        <FooterCtx.Provider value={`${label} · PART ${n} OF ${total}`}>
          <Audio
            src={staticFile('shared/sfx/bed.wav')}
            loop
            volume={(f) => 0.09 * interpolate(f, [0, 30, frames - 90, frames], [0, 1, 1, 0], clamp)}
          />
          {slides.map((s, i) => {
            const Scene = scenes[s.id];
            const start = from;
            from += s.frames;
            return (
              <Sequence key={s.id} from={start} durationInFrames={s.frames}>
                <Audio src={staticFile(`${slug}/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
                <Scene n={i + 1} vo={s.vo} />
              </Sequence>
            );
          })}
        </FooterCtx.Provider>
      </AbsoluteFill>
    );
  };
  return {Comp, frames};
};
