import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import slides from '../../../content/grok-bot/guide-real/slides.json';
import footage from '../../../content/grok-bot/guide-real/footage.json';
import {clamp} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {BOT_COLORS} from '../../lib/GrokBotMark';
import {FootageProvider, Pip} from '../../lib/Slot';
import type {FootageEntry} from '../../lib/Slot';
import {Beach, Command, Covers, Dream, Footage, HeroDesk, Ring, Tangled, TeamDesks, TrapOffice, WaterIll} from '../real/IllustrationsM';
import {NeonTwo, Shortcut, Tokens} from '../real/ScreensM';
import {
  ChapterR,
  ConnectR,
  DevicesR,
  DirectoryR,
  EvolveR,
  FirstR,
  HandoffR,
  InstallR,
  JobR,
  OpenSourceR,
  WhatR,
  ZeroR,
} from '../real/ScenesA';
import {
  AfterR,
  BackTapR,
  ChainR,
  ComputerR,
  HeyR,
  Issue1R,
  Issue2R,
  KeyR,
  ManagerR,
  OutroR,
  ReqR,
  RoiR,
  RoutineR,
  SoloR,
} from '../real/ScenesB';

export const BOT_GUIDE_REAL_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

const chapter = (num: string, title: string, color: string, shape: 'drop' | 'blob' | 'circle' | 'pillow'): React.FC<P> => (props) => (
  <ChapterR {...props} num={num} title={title} color={color} shape={shape} />
);

/**
 * 42 shots. Product-UI shots use the real-look scenes (real/ScenesA+B: app window, Connect Apps dialog,
 * marketplace, bot detail page, voice panel…); mood shots keep Rich's illustrations with GrokBotMark swapped in
 * (real/BotMark.tsx maps the old Mascot onto the real mark).
 */
const SCENES: Record<string, React.FC<P>> = {
  intro: HeroDesk,
  zero: ZeroR,
  evolve: EvolveR,
  aha: Command,
  install: InstallR,
  what: WhatR,
  first: FirstR,
  directory: DirectoryR,
  connect: ConnectR,
  tangled: Tangled,
  ring: Ring,
  devices: DevicesR,
  ch05: chapter('05', 'Real business', BOT_COLORS.pink, 'drop'),
  company: TeamDesks,
  job: JobR,
  footage: Footage,
  handoff: HandoffR,
  covers: Covers,
  opensource: OpenSourceR,
  manager: ManagerR,
  toolwin: ComputerR,
  work: RoutineR,
  solo: SoloR,
  key: KeyR,
  ch06: chapter('06', 'Quick launch', BOT_COLORS.teal, 'blob'),
  neontwo: NeonTwo,
  neonreq: ReqR,
  shortcut: Shortcut,
  backtap: BackTapR,
  hey: HeyR,
  ch07: chapter('07', 'Pitfalls', BOT_COLORS.red, 'circle'),
  issue1: Issue1R,
  issue2: Issue2R,
  trap: TrapOffice,
  roi: RoiR,
  tokens: Tokens,
  after: AfterR,
  waterill: WaterIll,
  water: ChainR,
  beach: Beach,
  dream: Dream,
  outro: OutroR,
};

const FOOT = footage as unknown as Record<string, FootageEntry & {pip: string | null}>;

export const BotGuideReal: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#0A0A0A'}}>
      <Audio
        src={staticFile('shared/sfx/bed.wav')}
        loop
        volume={(f) =>
          0.09 *
          interpolate(f, [0, 30, BOT_GUIDE_REAL_FRAMES - 90, BOT_GUIDE_REAL_FRAMES], [0, 1, 1, 0], clamp)
        }
      />
      {slides.map((s, i) => {
        const Comp = SCENES[s.id];
        const start = from;
        from += s.frames;
        const entry = FOOT[s.id];
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`grok-bot/guide-real/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <FootageProvider slug="grok-bot/guide-real" entry={entry}>
              <Comp n={i + 1} vo={s.vo} />
              {/* presenter picture-in-picture only where the user supplies a clip (pip: null = off) */}
              {entry?.pip ? <Pip pos="br-circle" /> : null}
            </FootageProvider>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
