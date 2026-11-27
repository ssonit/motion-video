import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {clamp} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {FooterCtx} from '../real/ui';

/** `cut: true` = slide stays in slides.json (its mp3 keeps its number) but is left out of the video. */
export type Slide = {id: string; vo: string; frames: number; cut?: boolean};

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
  /** Per-scene CSS-var overrides (e.g. a different pastel background per scene). */
  sceneTheme?: (i: number) => React.CSSProperties;
}) => {
  const {slug, n, total, label, scenes, theme, sceneTheme} = opts;
  const all = opts.slides.map((s, i) => ({...s, i}));
  const slides = all.filter((s) => !s.cut);
  // Every video opens with a hook (user rule 2026-11-26): part 1's first slide id must start with "hook".
  if (n === 1 && !slides[0]?.id.startsWith('hook')) {
    throw new Error(`${slug}: part 1 must open with a hook slide (id "hook" or "hook-…"), got "${slides[0]?.id}". See .claude/skills/clone-video/SKILL.md §4 "Hook".`);
  }
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
          {slides.map((s) => {
            const Scene = scenes[s.id];
            const start = from;
            from += s.frames;
            return (
              <Sequence key={s.id} from={start} durationInFrames={s.frames}>
                <Audio src={staticFile(`${slug}/vo/${String(s.i + 1).padStart(2, '0')}.mp3`)} />
                <AbsoluteFill style={sceneTheme?.(s.i)}>
                  <Scene n={s.i + 1} vo={s.vo} />
                </AbsoluteFill>
              </Sequence>
            );
          })}
        </FooterCtx.Provider>
      </AbsoluteFill>
    );
  };
  return {Comp, frames};
};
