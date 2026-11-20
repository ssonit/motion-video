import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Phone, mono} from '../../lib/Art';
import {Sfx, clamp, typed, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {Bot} from './BotMark';
import {Abs, AppWindow, Card, Head, IconCheck, In, Label, Pill, R, RSlide} from './ui';
import type {BotSpec} from './ui';
import {CAST, THREADS} from './ScenesA';

const FIVE: BotSpec[] = [
  {name: 'Topics', shape: 'drop', color: R.orange},
  {name: 'Writer', shape: 'pillow', color: R.green},
  {name: 'Splitter', shape: 'circle', color: R.violet},
  {name: 'Director', shape: 'blob', color: R.blue},
  {name: 'Editor', shape: 'drop', color: R.white},
];

/* 1 - title: wordmark + five bots on a shelf */
export const TitleC: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.22} dur={40} />
      <Abs x={0} y={110} w={1280} style={{textAlign: 'center'}}>
        <In at={3} tick={false}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 22}}>
            <Bot shape="drop" color={R.white} size={92} />
            <div style={{fontSize: 104, fontWeight: 600, letterSpacing: -4}}>Grok Bot</div>
          </div>
        </In>
        <In at={12} tick={false}>
          <div style={{fontSize: 70, fontWeight: 700, color: '#FFC83D', letterSpacing: -2, marginTop: 6}}>Zero to Bot, step by step</div>
        </In>
      </Abs>
      <Abs x={290} y={380} w={700} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        {FIVE.map((b, i) => (
          <In key={b.name} at={at(0.14) + i * 7}>
            <Bot shape={b.shape} color={b.color} size={92} phase={i * 9} />
          </In>
        ))}
      </Abs>
      <Abs x={250} y={490} w={780} h={18} style={{background: '#EADFC8', borderRadius: 9, boxShadow: '0 10px 40px rgba(255,255,255,0.08)'}}>
        <div />
      </Abs>
    </RSlide>
  );
};

/* numbered cards: "three things" and "three features" */
export const NumCards: React.FC<P & {label: string; title: string; items: [string, string][]}> = ({vo, label, title, items}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Head label={label}>{title}</Head>
      <Abs x={90} y={210} style={{display: 'flex', gap: 28}}>
        {items.map(([t, s], i) => (
          <Card key={t} at={at(0.14 + i * 0.2)} hl={i === 0 ? R.blue : undefined} box={{width: 330, height: 250, padding: '26px 28px', background: '#14202A'}}>
            <div style={{fontFamily: mono.fontFamily, fontSize: 54, fontWeight: 700, color: i === 0 ? '#7FD6E8' : '#fff'}}>{`0${i + 1}`}</div>
            <div style={{fontSize: 36, fontWeight: 700, marginTop: 38, whiteSpace: 'nowrap'}}>{t}</div>
            <div style={{fontSize: 18, color: R.mute, marginTop: 8}}>{s}</div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 3 + 18 - five-bot line; relay=true lights them one after another with a final result pill */
export const LineC: React.FC<P & {relay?: boolean}> = ({vo, relay}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Head label={relay ? 'Hand-off' : 'My real example'}>{relay ? 'Specialists pass the baton' : 'A one-person media line'}</Head>
      <Abs x={90} y={250} w={1100} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        {FIVE.map((b, i) => {
          const t0 = at(0.15 + i * (relay ? 0.12 : 0.1));
          return (
            <React.Fragment key={b.name}>
              <In at={t0}>
                <div style={{textAlign: 'center'}}>
                  <Bot shape={b.shape} color={b.color} size={110} phase={i * 8} />
                  <div style={{fontSize: 20, marginTop: 10, fontWeight: 500}}>{b.name}</div>
                  <div style={{fontFamily: mono.fontFamily, fontSize: 13, color: R.dim, marginTop: 4}}>{`0${i + 1} / BOT`}</div>
                </div>
              </In>
              {i < 4 && <div style={{flex: 1, height: 2, margin: '0 10px 40px', borderTop: `2px dashed ${f >= t0 + 8 ? '#fff' : R.line}`}} />}
            </React.Fragment>
          );
        })}
      </Abs>
      {relay && (
        <Abs x={150} y={430} w={980} style={{display: 'flex', justifyContent: 'center'}}>
          <In at={at(0.8)}>
            <Pill kind="white" size={22}>
              ✓ One task in → finished video out
            </Pill>
          </In>
        </Abs>
      )}
    </RSlide>
  );
};

/* 4 - chat-app look with two callouts */
export const RailC: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Abs x={72} y={60}>
        <AppWindow
          h={470}
          threads={THREADS}
          active={1}
          bot={CAST.writer}
          msgs={[
            {who: 'me', text: 'Draft the intro for episode 12', at: at(0.5)},
            {who: 'bot', text: 'Here is a first draft. Want it shorter?', at: at(0.62)},
          ]}
          input={{placeholder: 'Message Writer'}}
        />
      </Abs>
      <In at={at(0.14)} style={{position: 'absolute', left: 330, top: 14}}>
        <Pill kind="white" size={19}>
          ← Your team
        </Pill>
      </In>
      <In at={at(0.4)} style={{position: 'absolute', left: 760, top: 14}}>
        <Pill kind="white" size={19}>
          The work happens here →
        </Pill>
      </In>
    </RSlide>
  );
};

/* 5 - three tilted agent cards, one per job */
export const AgentsC: React.FC<P> = ({vo}) => {
  const at = useAt();
  const jobs = [
    ['Topics', 'IDEATION', R.orange],
    ['Writing', 'WRITING', R.green],
    ['Editing', 'EDITING', R.blue],
  ] as const;
  return (
    <RSlide vo={vo}>
      <Head label="How it works / 01">One job, one specialist</Head>
      <Abs x={110} y={215} style={{display: 'flex', gap: 34}}>
        {jobs.map(([t, s, c], i) => (
          <Card key={t} at={at(0.16 + i * 0.18)} hl={c} box={{width: 320, height: 250, transform: `rotate(${(1 - i) * 2.5}deg)`, padding: '24px 26px'}}>
            <Label>{`AGENT / 0${i + 1}`}</Label>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 28}}>
              <Bot shape={FIVE[i].shape} color={c} size={72} phase={i * 10} />
              <div style={{fontSize: 44, fontWeight: 700}}>{t}</div>
            </div>
            <div style={{fontFamily: mono.fontFamily, fontSize: 15, color: R.dim, marginTop: 30}}>{s}</div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 6 - Skill vs Bot: spotlight swaps from the left card to the right */
export const SkillBotC: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const sw = interpolate(f, [at(0.5), at(0.58)], [0, 1], clamp);
  const box = (on: boolean): React.CSSProperties => ({width: 480, height: 270, padding: '26px 30px', opacity: on ? 1 : 0.38});
  return (
    <RSlide vo={vo}>
      <Head label="How it works / 02">Skill is the ability. Bot is the position.</Head>
      <Abs x={90} y={210} style={{display: 'flex', gap: 40}}>
        <Card at={at(0.1)} hl={sw < 0.5 ? R.blue : undefined} box={box(sw < 0.5)}>
          <Label color="#7FD6E8">SKILL</Label>
          <div style={{fontSize: 34, fontWeight: 700, marginTop: 14}}>A reusable ability</div>
          <div style={{display: 'flex', gap: 10, marginTop: 24}}>
            {['Organize', 'Express', 'Analyze'].map((t) => (
              <Pill key={t} size={16}>
                {t}
              </Pill>
            ))}
          </div>
          <div style={{fontSize: 17, color: R.mute, marginTop: 24}}>Package one kind of task as a method you can reuse.</div>
        </Card>
        <Card at={at(0.22)} hl={sw >= 0.5 ? R.green : undefined} box={box(sw >= 0.5)}>
          <Label color="#7FD6E8">BOT</Label>
          <div style={{fontSize: 34, fontWeight: 700, marginTop: 14}}>A teammate, always online</div>
          <div style={{display: 'flex', gap: 10, marginTop: 24}}>
            {['Duty', 'Context', 'Teamwork'].map((t) => (
              <Pill key={t} size={16}>
                {t}
              </Pill>
            ))}
          </div>
          <div style={{fontSize: 17, color: R.mute, marginTop: 24}}>Owns one kind of problem and keeps learning your needs.</div>
        </Card>
      </Abs>
    </RSlide>
  );
};

/* 7 - carousel: one job card at a time slides through */
export const OneJobC: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const jobs = [
    ['Editor', 'Rhythm / picture / cuts', FIVE[4]],
    ['Splitter', 'Hooks / structure / pacing', FIVE[2]],
  ] as const;
  const idx = f < at(0.5) ? 0 : 1;
  const local = f - (idx ? at(0.5) : 0);
  const x = interpolate(local, [0, 10], [60, 0], clamp);
  return (
    <RSlide vo={vo}>
      <Head label="How it works / 03">Each owns one thing. Delivery is clearer.</Head>
      <Sfx at={at(0.5)} name="pop1" vol={0.22} dur={30} />
      <Abs x={340} y={225}>
        <div style={{transform: `translateX(${x}px)`, opacity: interpolate(local, [0, 8], [0, 1], clamp)}}>
          <Card at={0} hl={R.blue} box={{width: 600, height: 240, padding: '30px 36px'}}>
            <Label color="#7FD6E8">{`DEDICATED BOT / 0${idx + 2}`}</Label>
            <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 22}}>
              <Bot shape={jobs[idx][2].shape} color={jobs[idx][2].color} size={96} />
              <div>
                <div style={{fontSize: 56, fontWeight: 700}}>{jobs[idx][0]}</div>
                <div style={{fontSize: 21, color: R.mute, marginTop: 6}}>{jobs[idx][1]}</div>
              </div>
            </div>
          </Card>
        </div>
      </Abs>
    </RSlide>
  );
};

/* 8 - preference chips feed a growing job profile */
export const PrefsC: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Head label="How it works / 04">Keep your preferences in the job</Head>
      <Abs x={110} y={235} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        {['Audience', 'Tone', 'Working rules'].map((t, i) => (
          <In key={t} at={at(0.12 + i * 0.12)}>
            <Pill size={24} style={{width: 220, justifyContent: 'space-between', border: '1.5px solid #7FD6E8', background: 'transparent'}}>
              {t}
              <span>→</span>
            </Pill>
          </In>
        ))}
      </Abs>
      <Card at={at(0.2)} hl={R.blue} box={{width: 560, height: 290, padding: '24px 30px'}} style={{position: 'absolute', left: 470, top: 215}}>
        <Label color="#7FD6E8">JOB PROFILE</Label>
        <div style={{fontSize: 32, fontWeight: 700, marginTop: 10}}>Fits the way you work, more each time</div>
        {['For beginners', 'Show first, explain after', 'Fewer terms, spoken style'].map((t, i) => (
          <In key={t} at={at(0.4 + i * 0.14)} style={{display: 'flex', gap: 12, alignItems: 'center', marginTop: 14, fontSize: 21}}>
            <IconCheck s={20} />
            {t}
          </In>
        ))}
      </Card>
    </RSlide>
  );
};

/* 9 - three platform columns */
export const PlatformsC: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const cols: [string, string[]][] = [
    ['macOS', ['Apple Silicon', 'Intel']],
    ['Windows', ['x64', 'ARM64']],
    ['Linux', ['deb', 'rpm', 'AppImage']],
  ];
  const pick = f > at(0.55);
  return (
    <RSlide vo={vo}>
      <Head label="01 / Download">Pick the build for your system</Head>
      <Abs x={90} y={190} style={{display: 'flex', gap: 24}}>
        {cols.map(([os, rows], ci) => (
          <Card key={os} at={at(0.1 + ci * 0.12)} hl={pick && ci === 1 ? R.green : undefined} box={{width: 350, height: 290, padding: '20px 24px'}}>
            <div style={{fontSize: 28, fontWeight: 600}}>{os}</div>
            {rows.map((r) => (
              <div key={r} style={{display: 'flex', justifyContent: 'space-between', marginTop: 20, fontSize: 20, color: R.mute, borderTop: `1px solid ${R.line}`, paddingTop: 16}}>
                {r}
                <span>⤓</span>
              </div>
            ))}
          </Card>
        ))}
      </Abs>
      <In at={at(0.55)} style={{position: 'absolute', left: 440, top: 495}}>
        <Pill kind="white" size={22}>
          ⤓ Download for Windows
        </Pill>
      </In>
    </RSlide>
  );
};

/* 10 - four plan cards; the chosen one lifts */
export const PricingC: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const plans: [string, string, string][] = [
    ['Starter', '$10', 'Light use'],
    ['Plus', '$30', 'Everyday use'],
    ['Pro', '$100', '15x the usage'],
    ['Max', '$200', '50x the usage'],
  ];
  const sel = f > at(0.55) ? 2 : -1;
  return (
    <RSlide vo={vo}>
      <Head label="02 / Choose a plan">One subscription, pick your size</Head>
      <Abs x={86} y={200} style={{display: 'flex', gap: 22}}>
        {plans.map(([n, p, d], i) => (
          <Card
            key={n}
            at={at(0.1 + i * 0.1)}
            hl={sel === i ? R.blue : undefined}
            box={{width: 262, height: 290, padding: '24px 24px', transform: `translateY(${sel === i ? -10 : 0}px)`, opacity: sel >= 0 && sel !== i ? 0.5 : 1}}
          >
            <div style={{fontSize: 22, color: R.mute}}>{n}</div>
            <div style={{fontSize: 62, fontWeight: 600, letterSpacing: -2, marginTop: 10}}>
              {p}
              <span style={{fontSize: 18, color: R.dim}}>/mo</span>
            </div>
            <Pill size={17} style={{marginTop: 18, width: '100%', justifyContent: 'center', boxSizing: 'border-box'}} kind={sel === i ? 'white' : 'dark'}>
              {sel === i ? 'Selected' : 'Choose'}
            </Pill>
            <div style={{fontSize: 18, color: R.mute, marginTop: 22}}>{d}</div>
          </Card>
        ))}
      </Abs>
      <Abs x={86} y={510}>
        <div style={{fontSize: 14, color: R.dim}}>Example numbers for illustration only.</div>
      </Abs>
    </RSlide>
  );
};

/* 11 - checkout dialog */
export const PayC: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const done = f > at(0.7);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.7)} name="ding" vol={0.25} dur={40} />
      <Abs x={290} y={50}>
        <In at={4} tick={false}>
          <div style={{width: 700, height: 440, borderRadius: 22, background: R.card, border: `1px solid ${R.line}`, padding: 30, boxShadow: '0 30px 90px rgba(0,0,0,0.7)'}}>
            <div style={{fontSize: 26, fontWeight: 600}}>Configure your plan</div>
            <div style={{fontSize: 16, color: R.dim, margin: '18px 0 8px'}}>Pay with</div>
            {[
              ['Local wallet', true],
              ['New payment method', false],
            ].map(([t, on], i) => (
              <In key={String(t)} at={at(0.18 + i * 0.12)} style={{marginTop: 10}}>
                <div style={{height: 54, borderRadius: 14, border: `2px solid ${on && f > at(0.45) ? '#fff' : R.line}`, display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 19}}>
                  {String(t)}
                </div>
              </In>
            ))}
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 28, fontSize: 18, color: R.mute}}>
              <span>Due today</span>
              <span style={{color: '#fff', fontWeight: 600}}>$100.00</span>
            </div>
            <Pill kind="white" size={21} style={{marginTop: 22, width: '100%', justifyContent: 'center', boxSizing: 'border-box'}}>
              {done ? '✓ Plan active' : 'Confirm plan change'}
            </Pill>
          </div>
        </In>
      </Abs>
    </RSlide>
  );
};

/* 12 - phone: store search -> app page */
export const PhoneC: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const q = typed('grok bot', f, at(0.12), 9);
  const opened = f > at(0.5);
  return (
    <RSlide vo={vo}>
      <Head label="04 / On your phone">Same account, any device</Head>
      <Abs x={840} y={30}>
        <In at={at(0.04)} tick={false}>
          <Phone w={300} h={520} glow="rgba(255,255,255,0.08)">
            <div style={{padding: '48px 18px 0', color: '#fff'}}>
              {!opened ? (
                <>
                  <div style={{height: 40, borderRadius: 20, background: '#2A2A2A', fontSize: 17, display: 'flex', alignItems: 'center', padding: '0 16px'}}>⌕ {q}</div>
                  <In at={at(0.3)} style={{marginTop: 22, display: 'flex', gap: 12, alignItems: 'center'}}>
                    <div style={{width: 56, height: 56, borderRadius: 14, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <Bot shape="drop" size={34} />
                    </div>
                    <div style={{fontSize: 17, fontWeight: 600}}>Grok Bot</div>
                    <Pill kind="white" size={13} style={{marginLeft: 'auto'}}>
                      Get
                    </Pill>
                  </In>
                </>
              ) : (
                <In at={at(0.5)} tick={false} style={{textAlign: 'center', marginTop: 70}}>
                  <Bot shape="drop" size={110} />
                  <div style={{fontSize: 24, fontWeight: 600, marginTop: 12}}>Your AI agents for everyday work</div>
                  <Pill kind="white" size={16} style={{marginTop: 22}}>
                    Open
                  </Pill>
                </In>
              )}
            </div>
          </Phone>
        </In>
      </Abs>
      <Abs x={90} y={230} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <In at={at(0.2)}>
          <Pill size={24}>1 · Search the store</Pill>
        </In>
        <In at={at(0.4)}>
          <Pill size={24}>2 · Sign in with the same account</Pill>
        </In>
        <In at={at(0.62)}>
          <Pill kind="white" size={24}>
            3 · Try the flow on desktop first
          </Pill>
        </In>
      </Abs>
    </RSlide>
  );
};

/* 15 - chat options A-D, then the description becomes rules */
export const RulesC: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const opts = ['Draft a batch of topics', 'Set style and direction', 'Explain my account niche', 'Something else'];
  return (
    <RSlide vo={vo}>
      <Head label="03 / Set the rules">Describe the job, get the rules</Head>
      <Card at={at(0.08)} box={{width: 560, height: 330, padding: '22px 26px'}} style={{position: 'absolute', left: 72, top: 190}}>
        <div style={{fontSize: 18, color: R.mute}}>Hi, I am Topic Editor. What do you want me to start with?</div>
        {opts.map((o, i) => (
          <In key={o} at={at(0.18 + i * 0.07)} style={{marginTop: 12}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'center', fontSize: 19, padding: '10px 14px', borderRadius: 12, background: i === 0 && f > at(0.45) ? '#2B3A2B' : R.card2}}>
              <span style={{fontFamily: mono.fontFamily, color: R.dim}}>{'ABCD'[i]}</span>
              {o}
            </div>
          </In>
        ))}
      </Card>
      <Card at={at(0.55)} hl={R.green} box={{width: 500, height: 330, padding: '22px 26px'}} style={{position: 'absolute', left: 690, top: 190}}>
        <Label color="#7FD6E8">YOUR DESCRIPTION → RULES</Label>
        <div style={{fontSize: 21, marginTop: 16, lineHeight: 1.4, color: R.mute}}>
          {typed('You are a topic editor. Pitch five short-video topics a day, each with a hook and a title. Ask before you assume.', f, at(0.6), 38)}
        </div>
        <In at={at(0.85)} style={{marginTop: 18}}>
          <Pill size={17}>= the prompt</Pill>
        </In>
      </Card>
    </RSlide>
  );
};
