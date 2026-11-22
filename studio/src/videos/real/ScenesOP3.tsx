import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {mono} from '../../lib/Art';
import {Abs, Card, Head, In, Pill, R, RSlide} from './ui';
import {Bot} from './BotMark';
import {mkPrompt} from './ScenesOP2';

/** Scenes for part 3 (op-3-delivery). */
const DIM = 'var(--op-dim, rgba(255,255,255,0.42))';
const ACC = '#ff7a1a';
const GLASS = 'rgba(255,255,255,0.12)';

/* 1 chapter card */
export const Intro3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const drift = (f * 0.4) % 80;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="ding" vol={0.25} dur={40} />
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.12}}>
        {Array.from({length: 9}).map((_, i) => (
          <div key={i} style={{fontSize: 70, fontWeight: 800, letterSpacing: 6, whiteSpace: 'nowrap', transform: `translateX(${(i % 2 ? -1 : 1) * drift - 200}px)`, lineHeight: '80px'}}>
            {'DELIVERY · DELIVERY · DELIVERY · DELIVERY'}
          </div>
        ))}
      </div>
      <Abs x={0} y={120} style={{width: 1280, textAlign: 'center', fontFamily: mono.fontFamily, color: ACC, fontSize: 24, letterSpacing: 4}}>RUNG 2</Abs>
      <In at={at(0.08)} tick={false} style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontSize: 230, fontWeight: 800, letterSpacing: -8, lineHeight: 1}}>
        <span style={{color: ACC}}>03</span>
      </In>
      <In at={at(0.2)} style={{position: 'absolute', left: 0, right: 0, top: 390, textAlign: 'center', fontSize: 64, fontWeight: 700}}>Delivery</In>
    </RSlide>
  );
};

/* 2 what a delivery bot does */
export const Role3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const jobs: [string, string][] = [['🚀', 'Runs onboarding'], ['💬', 'Answers client questions'], ['📄', 'Prepares documents for review'], ['🛠️', 'Even does the work you sold']];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 2 · Delivery">What a *delivery Bot* does</Head>
      <In at={at(0.06)} style={{position: 'absolute', left: 110, top: 240}}>
        <div style={{width: 200, height: 200, borderRadius: '50%', background: GLASS, border: `3px solid ${ACC}`, boxShadow: `0 0 50px ${ACC}55`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Bot shape="drop" color={R.white} size={110} bob={6} />
        </div>
      </In>
      <Abs x={400} y={195} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: 770}}>
        {jobs.map(([ic, t], i) => (
          <Card key={t} at={at(0.18) + i * at(0.1)} box={{height: 120, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px'}}>
            <span style={{fontSize: 40}}>{ic}</span><span style={{fontSize: 24, fontWeight: 600, lineHeight: 1.2}}>{t}</span>
          </Card>
        ))}
      </Abs>
      <In at={at(0.72)} style={{position: 'absolute', left: 400, top: 460}}><Pill kind="ghost" size={22}>The client never needs to know how</Pill></In>
    </RSlide>
  );
};

/* 3 founder story: wait grows */
export const Story3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const days = Math.round(interpolate(f, [at(0.3), at(0.75)], [10, 20], {...clamp, easing: Easing.out(Easing.cubic)}));
  const bars = [30, 44, 60, 82, 110, 150, 190];
  const bad = days >= 20;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.78)} name="ding" vol={0.25} dur={40} />
      <Head label="A true pattern">Sales grew. *Service* did not.</Head>
      <Abs x={110} y={195} style={{display: 'flex', alignItems: 'flex-end', gap: 14, height: 230}}>
        {bars.map((h, i) => {
          const k = interpolate(f, [at(0.08) + i * 6, at(0.08) + i * 6 + 14], [0, 1], clamp);
          return <div key={i} style={{width: 52, height: h * k, borderRadius: 10, background: i > 3 ? ACC : 'rgba(255,255,255,0.22)'}} />;
        })}
      </Abs>
      <Abs x={110} y={440} style={{fontSize: 20, color: DIM}}>Licenses sold</Abs>
      <Card at={at(0.2)} style={{position: 'absolute', left: 620, top: 195}} box={{width: 270, textAlign: 'center'}}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily}}>ONBOARDING</div>
        <div style={{fontSize: 80, fontWeight: 700, color: R.white}}>10h</div>
        <div style={{fontSize: 20, color: 'rgba(255,255,255,0.7)'}}>per customer</div>
      </Card>
      <Card at={at(0.3)} style={{position: 'absolute', left: 910, top: 195}} box={{width: 260, textAlign: 'center'}} hl={bad ? R.red : undefined}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily}}>WAIT TIME</div>
        <div style={{fontSize: 80, fontWeight: 700, color: bad ? R.red : '#fff'}}>{days}d</div>
        <div style={{fontSize: 20, color: 'rgba(255,255,255,0.7)'}}>to get started</div>
      </Card>
      <In at={at(0.82)} style={{position: 'absolute', left: 620, top: 410}}><Pill kind="dark" size={24} style={{border: `2px solid ${R.red}`}}>Cancelled · refund requested</Pill></In>
    </RSlide>
  );
};

/* 4 fix: bot takes the backlog */
export const Fix3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const left = Math.round(interpolate(f, [at(0.3), at(0.85)], [38, 0], {...clamp, easing: Easing.out(Easing.cubic)}));
  const jobs = ['Calls customers', 'Runs intake forms', 'Schedules sessions', 'Follows up by text'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.85)} name="ding" vol={0.28} dur={40} />
      <Head label="The fix">A Bot took *onboarding*</Head>
      <Abs x={110} y={200} style={{width: 520}}>
        {jobs.map((j, i) => (
          <Card key={j} at={at(0.08) + i * at(0.09)} box={{marginBottom: 12, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px'}}>
            <Bot shape="drop" color={R.white} size={34} /><span style={{fontSize: 24}}>{j}</span>
          </Card>
        ))}
      </Abs>
      <Card at={at(0.2)} style={{position: 'absolute', left: 700, top: 200}} box={{width: 470, height: 250, textAlign: 'center'}}>
        <div style={{fontSize: 17, color: DIM, fontFamily: mono.fontFamily}}>ONBOARDING BACKLOG</div>
        <div style={{fontSize: 130, fontWeight: 700, letterSpacing: -4, color: left === 0 ? R.green : '#fff'}}>{left}</div>
        <div style={{fontSize: 22, color: 'rgba(255,255,255,0.7)'}}>{left === 0 ? 'cleared' : 'customers waiting'}</div>
      </Card>
      <In at={at(0.88)} style={{position: 'absolute', left: 110, top: 480}}><Pill kind="ghost" size={22}>People were doing a Bot's work</Pill></In>
    </RSlide>
  );
};

/* 5 simplify: one product, one path */
export const Simplify3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const steps = ['Customer pays', 'Gets welcome + form', 'Booked and set up', 'First result', 'Happy customer'];
  return (
    <RSlide vo={vo}>
      <Head label="Before you build">Simplify to *one path*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 1060, display: 'flex', alignItems: 'center', gap: 20}} hl={ACC}>
        <span style={{fontSize: 18, color: ACC, fontFamily: mono.fontFamily}}>THE ONE THING YOU SELL</span>
        <span style={{fontSize: 30, fontWeight: 600}}>One offer, one outcome</span>
      </Card>
      <Abs x={90} y={320} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <Card at={at(0.25) + i * at(0.12)} box={{width: 190, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 22, fontWeight: 600}}>
              <div><div style={{fontFamily: mono.fontFamily, fontSize: 18, color: ACC}}>{i + 1}</div>{s}</div>
            </Card>
            {i < 4 && <div style={{fontSize: 28, color: DIM}}>›</div>}
          </React.Fragment>
        ))}
      </Abs>
      <In at={at(0.85)} style={{position: 'absolute', left: 110, top: 495}}><Pill kind="white" size={22}>Write the steps down = the Bot's training</Pill></In>
    </RSlide>
  );
};

/* 6 first win */
export const FirstWin3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.3} dur={40} />
      <Head label="Speed matters">Pay → *first win*, fast</Head>
      <Abs x={110} y={260} style={{width: 1060, height: 120}}>
        <div style={{position: 'absolute', left: 40, right: 40, top: 56, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.15)'}} />
        <In at={at(0.1)} tick={false} style={{position: 'absolute', left: 0, top: 0}}><Pill kind="dark" size={22}>💳 Paid</Pill></In>
        <In at={at(0.5)} style={{position: 'absolute', left: 380, top: 0}}><Pill kind="white" size={22}>🏆 First win</Pill></In>
        <In at={at(0.75)} style={{position: 'absolute', left: 700, top: 0}}><Pill kind="ghost" size={22}>🤝 Who else wants this?</Pill></In>
      </Abs>
      <Card at={at(0.78)} style={{position: 'absolute', left: 110, top: 400}} box={{width: 1060}}>
        <span style={{fontSize: 24}}>A happy customer → introductions → more sales, and you get your time back.</span>
      </Card>
    </RSlide>
  );
};

/* 7 goal: stop doing tasks */
export const Goal3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const tasks = ['Send welcome mail', 'Book the call', 'Chase the form', 'Update the folder', 'Answer FAQ', 'Remind the client', 'File the notes', 'Report status'];
  return (
    <RSlide vo={vo}>
      <Head label="The real goal">Stop doing what tech *already can*</Head>
      <Abs x={110} y={195} style={{display: 'grid', gridTemplateColumns: 'repeat(4, 262px)', gap: 14}}>
        {tasks.map((t, i) => {
          const done = f > at(0.25) + i * at(0.07);
          return (
            <Card key={t} at={at(0.05) + i * 3} box={{height: 90, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', fontSize: 21, opacity: done ? 0.5 : 1, textDecoration: done ? 'line-through' : 'none'}}>
              <span style={{color: done ? R.green : DIM}}>{done ? '✓' : '○'}</span>{t}
            </Card>
          );
        })}
      </Abs>
      <In at={at(0.82)} style={{position: 'absolute', left: 110, top: 440}}><Pill kind="white" size={24}>Today, that is nearly all of them</Pill></In>
    </RSlide>
  );
};

/* 8 data */
export const Data3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const q: [string, string][] = [['🏅', 'What does great delivery look like?'], ['🔑', 'What do you log into to get results?'], ['👀', 'What will the client see?'], ['🙋', 'What do they need from you?']];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 2 · Data">Start with *your data*</Head>
      <Abs x={110} y={180} style={{width: 1060}}>
        {q.map(([ic, t], i) => (
          <Card key={t} at={at(0.08) + i * at(0.14)} box={{marginBottom: 10, display: 'flex', alignItems: 'center', gap: 18, padding: '10px 24px'}}>
            <span style={{fontSize: 34}}>{ic}</span><span style={{fontSize: 27}}>{t}</span>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 9 talk: record yourself */
export const Talk3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Head label="Rung 2 · Playbook">The easiest way: *just talk*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 200}} box={{width: 440, height: 250}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, color: R.red, fontSize: 20, fontWeight: 700}}>
          <span style={{width: 14, height: 14, borderRadius: '50%', background: R.red, opacity: f % 30 < 18 ? 1 : 0.3}} /> REC 02:14
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 5, height: 100, marginTop: 20}}>
          {Array.from({length: 24}).map((_, i) => <div key={i} style={{width: 10, borderRadius: 5, background: ACC, height: 14 + Math.abs(Math.sin(f / 5 + i * 0.7)) * 70}} />)}
        </div>
        <div style={{fontSize: 20, color: 'rgba(255,255,255,0.7)', marginTop: 14}}>“When a client pays, I first…”</div>
      </Card>
      <Abs x={580} y={300} style={{fontSize: 52, color: DIM}}>→</Abs>
      <Card at={at(0.5)} style={{position: 'absolute', left: 680, top: 200}} box={{width: 490, height: 250}}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily}}>STEP-BY-STEP PROCESS</div>
        {['Send welcome mail', 'Collect intake answers', 'Set up client folder', 'Book first session'].map((s, i) => (
          <In key={s} at={at(0.6) + i * 8} tick={false} style={{marginTop: 14, fontSize: 24}}><span style={{color: ACC, fontFamily: mono.fontFamily}}>{i + 1}. </span>{s}</In>
        ))}
      </Card>
    </RSlide>
  );
};

/* 12 teach: save a skill */
export const Teach3OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.45)} name="ding" vol={0.25} dur={40} />
      <Head label="Another move">Do it once, *save it as a skill*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 200}} box={{width: 320, height: 200, textAlign: 'center'}}>
        <div style={{fontSize: 54}}>🖥️</div>
        <div style={{fontSize: 24, fontWeight: 600, marginTop: 8}}>You do the task once</div>
      </Card>
      <Abs x={455} y={270} style={{fontSize: 48, color: DIM}}>→</Abs>
      <In at={at(0.4)} style={{position: 'absolute', left: 540, top: 200}}>
        <div style={{width: 270, height: 200, borderRadius: 24, background: '#fff', color: '#111', padding: 22, boxShadow: `0 0 40px ${ACC}66`}}>
          <div style={{fontFamily: mono.fontFamily, fontSize: 15, color: ACC}}>SKILL</div>
          <div style={{fontSize: 28, fontWeight: 700, marginTop: 6}}>Set up new client</div>
          <div style={{fontSize: 18, opacity: 0.6, marginTop: 10}}>saved · reusable</div>
        </div>
      </In>
      <Abs x={835} y={270} style={{fontSize: 48, color: DIM}}>→</Abs>
      <Card at={at(0.7)} style={{position: 'absolute', left: 920, top: 200}} box={{width: 250, height: 200, textAlign: 'center'}}>
        <Bot shape="drop" color={R.white} size={70} />
        <div style={{fontSize: 22, fontWeight: 600, marginTop: 8}}>Delivery Bot reuses it</div>
      </Card>
    </RSlide>
  );
};

/* 14 tip */
export const Tip3OP = mkPrompt(
  'One last tip',
  'Fix the *questions* that repeat',
  'Read my support emails. Find the questions that keep coming back, then rewrite my onboarding so those questions never come up again.',
  ['Reads support mail', 'Finds repeat questions', 'Improves onboarding'],
);
