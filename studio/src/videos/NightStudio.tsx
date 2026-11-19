import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import slides from '../../content/night-studio/slides.json';
import {clamp} from '../lib/kit';
import type {P} from '../lib/kit';
import {
  BannedN,
  BeatsN,
  BlurN,
  CrewN,
  CriticN,
  FolderN,
  HookN,
  LaptopN,
  LoopN,
  MissingN,
  NightN,
  NoGpuN,
  NoPickerN,
  OutroN,
  RenderN,
  RisksN,
  ShotlistN,
  SkillN,
  StallN,
  StatesN,
} from './night/NightScenes';

export const NIGHT_STUDIO_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

const SCENES: Record<string, React.FC<P>> = {
  hook: HookN,
  stall: StallN,
  missing: MissingN,
  crew: CrewN,
  nopicker: NoPickerN,
  laptop: LaptopN,
  nogpu: NoGpuN,
  folder: FolderN,
  skill: SkillN,
  banned: BannedN,
  states: StatesN,
  shotlist: ShotlistN,
  render: RenderN,
  blur: BlurN,
  beats: BeatsN,
  critic: CriticN,
  loop: LoopN,
  night: NightN,
  risks: RisksN,
  outro: OutroN,
};

export const NightStudio: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#0A0A0A'}}>
      <Audio
        src={staticFile('shared/sfx/bed.wav')}
        loop
        volume={(f) => 0.09 * interpolate(f, [0, 30, NIGHT_STUDIO_FRAMES - 90, NIGHT_STUDIO_FRAMES], [0, 1, 1, 0], clamp)}
      />
      {slides.map((s, i) => {
        const Comp = SCENES[s.id];
        const start = from;
        from += s.frames;
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`night-studio/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Comp n={i + 1} vo={s.vo} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
