import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import slides from '../../../content/grok-bot/basics/slides.json';
import {clamp} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {FirstR, HandoffR} from '../real/ScenesA';
import {ComputerR, OutroR} from '../real/ScenesB';
import {
  AgentsC,
  LineC,
  NumCards,
  OneJobC,
  PayC,
  PhoneC,
  PlatformsC,
  PrefsC,
  PricingC,
  RailC,
  RulesC,
  SkillBotC,
  TitleC,
} from '../real/ScenesC';

export const BOT_BASICS_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

/** Clone of the "Grok Bot zero-basics" tutorial (references/tiktok-7704): download → pay → use. 19 shots, real-look UI. */
const SCENES: Record<string, React.FC<P>> = {
  title: TitleC,
  three: (p) => (
    <NumCards {...p} label="Three things to start" title="Let me break it all down" items={[['Download', 'Install the app'], ['Pay', 'Choose a plan'], ['Use', 'Bots and workflows']]} />
  ),
  line: (p) => <LineC {...p} />,
  rail: RailC,
  agent: AgentsC,
  skillbot: SkillBotC,
  onejob: OneJobC,
  prefs: PrefsC,
  download: PlatformsC,
  pricing: PricingC,
  pay: PayC,
  phone: PhoneC,
  feat: (p) => (
    <NumCards {...p} label="Three to master first" title="Three features you will use" items={[['Job Bot', 'One Bot per position'], ['Cloud computer', 'Keeps running for you'], ['Group work', 'Bots team up']]} />
  ),
  first: FirstR,
  rules: RulesC,
  cloud: ComputerR,
  group: HandoffR,
  relay: (p) => <LineC {...p} relay />,
  outro: OutroR,
};

export const BotBasics: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#0A0A0A'}}>
      <Audio
        src={staticFile('shared/sfx/ref_music.wav')}
        loop
        volume={(f) => 0.5 * interpolate(f, [0, 45, BOT_BASICS_FRAMES - 90, BOT_BASICS_FRAMES], [0, 1, 1, 0], clamp)}
      />
      {slides.map((s, i) => {
        const Comp = SCENES[s.id];
        const start = from;
        from += s.frames;
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`grok-bot/basics/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Comp n={i + 1} vo={s.vo} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
