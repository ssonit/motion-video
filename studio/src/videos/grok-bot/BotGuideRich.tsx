import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import slides from '../../../content/grok-bot/guide-rich/slides.json';
import {D} from '../../lib/Art';
import {clamp} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {After, Devices, First, Handoff, Job, Manager, Outro, Roi, What} from './BotGuide';
import {Directory, Install, Solo, Water, Work} from './BotGuideFull';
import {
  Beach,
  Command,
  Covers,
  Dream,
  Footage,
  HeroDesk,
  Ring,
  Tangled,
  TeamDesks,
  TrapOffice,
  WaterIll,
} from '../rich/Illustrations';
import {
  BackTap,
  ChapterCard,
  Evolve,
  Hey,
  Issue1,
  Issue2,
  Key,
  NeonReq,
  NeonTwo,
  OpenSource,
  Shortcut,
  ToolWin,
  Tokens,
  Zero,
} from '../rich/Screens';

export const BOT_GUIDE_RICH_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

const chapter = (num: string, title: string): React.FC<P> => (props) => (
  <ChapterCard {...props} num={num} title={title} />
);

/**
 * 41 short shots, deliberately mixing many looks:
 * illustrated rooms, app screens, phone walkthroughs, neon panels, chapter cards, data, text slides.
 */
const SCENES: Record<string, React.FC<P>> = {
  intro: HeroDesk,
  zero: Zero,
  evolve: Evolve,
  aha: Command,
  install: Install,
  what: What,
  first: First,
  directory: Directory,
  tangled: Tangled,
  ring: Ring,
  devices: Devices,
  ch05: chapter('05', 'Real business'),
  company: TeamDesks,
  job: Job,
  footage: Footage,
  handoff: Handoff,
  covers: Covers,
  opensource: OpenSource,
  manager: Manager,
  toolwin: ToolWin,
  work: Work,
  solo: Solo,
  key: Key,
  ch06: chapter('06', 'Quick launch'),
  neontwo: NeonTwo,
  neonreq: NeonReq,
  shortcut: Shortcut,
  backtap: BackTap,
  hey: Hey,
  ch07: chapter('07', 'Pitfalls'),
  issue1: Issue1,
  issue2: Issue2,
  trap: TrapOffice,
  roi: Roi,
  tokens: Tokens,
  after: After,
  waterill: WaterIll,
  water: Water,
  beach: Beach,
  dream: Dream,
  outro: Outro,
};

export const BotGuideRich: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: D.bg}}>
      <Audio
        src={staticFile('shared/sfx/bed.wav')}
        loop
        volume={(f) =>
          0.09 *
          interpolate(f, [0, 30, BOT_GUIDE_RICH_FRAMES - 90, BOT_GUIDE_RICH_FRAMES], [0, 1, 1, 0], clamp)
        }
      />
      {slides.map((s, i) => {
        const Comp = SCENES[s.id];
        const start = from;
        from += s.frames;
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`grok-bot/guide-rich/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Comp n={i + 1} vo={s.vo} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
