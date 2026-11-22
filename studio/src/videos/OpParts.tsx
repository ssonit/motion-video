import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {clamp} from '../lib/kit';
import type {P} from '../lib/kit';
import slides1 from '../../content/op-1-problem/slides.json';
import slides2 from '../../content/op-2-inbox/slides.json';
import * as S from './real/ScenesOP';
import * as S1 from './real/ScenesOP1';
import slides3 from '../../content/op-3-delivery/slides.json';
import * as S2 from './real/ScenesOP2';
import * as S3 from './real/ScenesOP3';
import slides4 from '../../content/op-4-marketing/slides.json';
import * as S4 from './real/ScenesOP4';
import slides5 from '../../content/op-5-sales/slides.json';
import * as S5 from './real/ScenesOP5';
import slides6 from '../../content/op-6-brain/slides.json';
import * as S6 from './real/ScenesOP6';
import {FooterCtx} from './real/ui';

type Slide = {id: string; vo: string; frames: number};

/** Series look = tiktok-7706 reference: charcoal + ember glow, orange eyebrow + keyword, bold headline (CSS vars read by real/ui.tsx and ScenesOP*). */
const THEME = {
  '--op-bg':
    'radial-gradient(760px 480px at 90% -10%, rgba(255,110,20,0.30), transparent 62%), radial-gradient(520px 340px at -5% 108%, rgba(255,90,0,0.14), transparent 62%), #121214',
  '--op-bg-solid': '#121214',
  '--op-card': '#27272c',
  '--op-card2': '#18181b',
  '--op-panel': '#151518',
  '--op-dim': 'rgba(255,255,255,0.58)',
  '--op-eyebrow': '#ff7a1a',
  '--op-accent': '#ff7a1a',
  '--op-hw': '700',
} as React.CSSProperties;

/** A part = one slides.json + a map id → scene. Shared sfx bed, one narration mp3 per slide. */
const makePart = (slug: string, n: number, slides: Slide[], scenes: Record<string, React.FC<P>>) => {
  const frames = slides.reduce((a, s) => a + s.frames, 0);
  const Comp: React.FC = () => {
    let from = 0;
    return (
      <AbsoluteFill style={{background: '#121214', ...THEME}}>
        <FooterCtx.Provider value={`ONE PERSON · PART ${n} OF 6`}>
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

const p1 = makePart('op-1-problem', 1, slides1 as Slide[], {
  hook: S.HookOP,
  small: S.SmallOP,
  map: S.MapOP,
  ideaprob: S1.IdeaProbOP,
  pain: S.PainOP,
  migraine: S1.MigraineOP,
  gym: S1.GymOP,
  research: S.ResearchOP,
  message: S1.MessageOP,
  advice: S.AdviceOP,
  call: S1.CallOP,
  existing: S1.ExistingOP,
  pile: S1.PileOP,
  order: S.LadderOP,
});
export const OpPart1 = p1.Comp;
export const OP_PART1_FRAMES = p1.frames;

const p2 = makePart('op-2-inbox', 2, slides2 as Slide[], {
  admin: S2.AdminOP,
  room: S2.RoomOP,
  story: S2.StoryOP,
  review: S2.ReviewOP,
  recipe: S2.ConnectOP,
  edge: S2.EdgeOP,
  prompt1: S2.Prompt1OP,
  rules: S.InboxDataOP,
  playbook: S.CalendarOP,
  replies: S2.LabelsOP,
  loop: S.LoopOP,
  cadence: S2.ScheduleOP,
  signal: S2.SignalOP,
  day: S2.DayOP,
  fullprompt: S2.FullPromptOP,
  next: S2.NextOP,
});
export const OpPart2 = p2.Comp;
export const OP_PART2_FRAMES = p2.frames;

const p3 = makePart('op-3-delivery', 3, slides3 as Slide[], {
  intro: S3.Intro3OP,
  role: S3.Role3OP,
  story: S3.Story3OP,
  fix: S3.Fix3OP,
  simplify: S3.Simplify3OP,
  firstwin: S3.FirstWin3OP,
  goal: S3.Goal3OP,
  data: S3.Data3OP,
  talk: S3.Talk3OP,
  interview: S.InterviewOP,
  flow: S.DeliveryOP,
  teach: S3.Teach3OP,
  board: S.BoardOP,
  tip: S3.Tip3OP,
});
export const OpPart3 = p3.Comp;
export const OP_PART3_FRAMES = p3.frames;

const p4 = makePart('op-4-marketing', 4, slides4 as Slide[], {
  intro: S4.Intro4OP,
  order: S4.Order4OP,
  daily: S4.Daily4OP,
  data: S4.Data4OP,
  blueprint: S4.Blueprint4OP,
  consumer: S4.Consumer4OP,
  leads: S.LeadsOP,
  funnel: S.FunnelOP,
  home: S4.Home4OP,
  content: S.ContentOP,
  iterate: S4.Iterate4OP,
});
export const OpPart4 = p4.Comp;
export const OP_PART4_FRAMES = p4.frames;

const p5 = makePart('op-5-sales', 5, slides5 as Slide[], {
  intro: S5.Intro5OP,
  around: S.SalesOP,
  story: S5.Story5OP,
  voice: S5.Voice5OP,
  result: S5.Result5OP,
  practice: S.CoachOP,
  past: S5.Past5OP,
  data: S5.Data5OP,
  jobs: S5.Jobs5OP,
  prompt: S5.Prompt5OP,
  after: S5.After5OP,
  signal: S.WinrateOP,
  objections: S5.Objections5OP,
});
export const OpPart5 = p5.Comp;
export const OP_PART5_FRAMES = p5.frames;

const p6 = makePart('op-6-brain', 6, slides6 as Slide[], {
  problem: S6.Problem6OP,
  handover: S6.Handover6OP,
  surgeons: S6.Surgeons6OP,
  equity: S6.Equity6OP,
  step1: S.BrainOP,
  step2: S6.Connect6OP,
  friday: S.FridayOP,
  more: S6.More6OP,
  diy: S6.Diy6OP,
  recap: S.LadderOP,
  vision: S.VisionOP,
  outro: S.OutroOP,
});
export const OpPart6 = p6.Comp;
export const OP_PART6_FRAMES = p6.frames;
