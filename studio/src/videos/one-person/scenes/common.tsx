import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Abs, Card, Head, In, Pill, R, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';

/** Scenes for "one-person-company": 26 shots, every one a different look. */

const expo = Easing.out(Easing.exp);
const CARD = 'var(--op-card, #202020)';
const CARD2 = 'var(--op-card2, #171717)';
const PANEL = 'var(--op-panel, #111111)';
const DIM = 'var(--op-dim, rgba(255,255,255,0.42))';
const BGS = 'var(--op-bg-solid, #0A0A0A)';
const COLS = [R.pink, R.blue, R.green, R.violet, R.orange, R.teal];

const Center: React.FC<{y: number; children: React.ReactNode}> = ({y, children}) => (
  <Abs x={0} y={y} style={{width: 1280, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
    {children}
  </Abs>
);

const Person: React.FC<{s?: number; c?: string}> = ({s = 36, c = '#777'}) => (
  <svg width={s} height={s * 1.5} viewBox="0 0 40 60">
    <circle cx="20" cy="14" r="11" fill={c} />
    <path d="M2 58a18 22 0 0 1 36 0Z" fill={c} />
  </svg>
);

/* 1 ===== crowd fades, one founder + bots ===== */
export const HookOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.4)} name="ding" vol={0.25} dur={40} />
      <Head label="The next kind of company">One founder. A crew of *Bots*.</Head>
      <Abs x={90} y={200} style={{display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', gap: 10}}>
        {Array.from({length: 20}).map((_, i) => (
          <div key={i} style={{opacity: interpolate(f, [at(0.1) + i * 3, at(0.1) + i * 3 + 14], [0.9, 0.08], clamp)}}>
            <Person s={40} />
          </div>
        ))}
      </Abs>
      <In at={at(0.4)} style={{position: 'absolute', left: 640, top: 190}}>
        <div style={{position: 'relative', width: 500, height: 320}}>
          <div style={{position: 'absolute', left: 190, top: 90}}>
            <Person s={90} c="#fff" />
          </div>
          {[[40, 20], [380, 10], [20, 200], [400, 210]].map(([x, y], i) => (
            <div key={i} style={{position: 'absolute', left: x, top: y}}>
              <Bot shape={(['drop', 'blob', 'circle', 'pillow'] as const)[i]} color={COLS[i]} size={78} phase={i * 9} bob={5} />
            </div>
          ))}
        </div>
      </In>
    </RSlide>
  );
};

/* 2 ===== 20 people vs the small team ===== */
export const SmallOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const strike = interpolate(f, [at(0.3), at(0.4)], [0, 100], clamp);
  const items: [string, string][] = [['1', 'founder'], ['2', 'part-timers'], ['+', 'Bots for the routine']];
  return (
    <RSlide vo={vo}>
      <Head label="Then vs now">Same business, a much smaller *team*</Head>
      <Abs x={90} y={190} style={{width: 300}}>
        <div style={{fontSize: 130, fontWeight: 500, letterSpacing: -6, color: DIM, position: 'relative', display: 'inline-block'}}>
          20
          <div style={{position: 'absolute', left: 0, top: 70, height: 8, width: `${strike}%`, background: R.red, borderRadius: 4}} />
        </div>
        <div style={{fontSize: 24, color: DIM}}>people on payroll</div>
      </Abs>
      <Abs x={440} y={215} style={{fontSize: 56, color: DIM}}>→</Abs>
      {items.map(([n, l], i) => (
        <Card key={l} at={at(0.4) + i * at(0.12)} style={{position: 'absolute', left: 540 + i * 230, top: 190}} box={{width: 205, height: 190}} hl={i === 2 ? R.green : undefined}>
          <div style={{fontSize: 80, fontWeight: 500, letterSpacing: -3}}>{n}</div>
          <div style={{fontSize: 22, color: R.mute, marginTop: 4}}>{l}</div>
        </Card>
      ))}
    </RSlide>
  );
};

/* 3 ===== plan: route list ===== */
export const MapOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const rows: [string, string, string][] = [
    ['0', 'Find the right problem', R.pink],
    ['1', 'Inbox Bot', R.blue],
    ['2', 'Delivery Bot', R.green],
    ['3', 'Marketing Bot', R.violet],
    ['4', 'Sales Bot', R.orange],
    ['5', 'One shared brain', R.teal],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="The plan">Six *moves*, in order</Head>
      <Abs x={110} y={180} style={{display: 'grid', gridTemplateColumns: '520px 520px', gap: 16}}>
        {rows.map(([n, t, c], i) => (
          <Card key={t} at={at(0.1) + i * at(0.1)} box={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 20px'}} hl={i === 5 ? c : undefined}>
            <div style={{width: 46, height: 46, borderRadius: '50%', background: c, color: '#000', fontSize: 24, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
            <div style={{fontSize: 28, fontWeight: 500}}>{t}</div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 4 ===== painkiller vs vitamin ===== */
export const PainOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(f / 7);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.25} dur={40} />
      <Head label="Choose the pain">*Painkiller*, not vitamin</Head>
      <Card at={at(0.1)} style={{position: 'absolute', left: 130, top: 190}} box={{width: 450, height: 300, opacity: 0.55}}>
        <div style={{fontSize: 30, fontWeight: 500}}>Vitamin</div>
        <svg width="160" height="80" viewBox="0 0 160 80" style={{marginTop: 24}}>
          <rect x="10" y="10" width="140" height="60" rx="30" fill="#555" />
          <rect x="10" y="10" width="70" height="60" rx="30" fill="#777" />
        </svg>
        <div style={{fontSize: 22, color: DIM, marginTop: 20}}>Nice to have. "Maybe later."</div>
      </Card>
      <Card at={at(0.3)} style={{position: 'absolute', left: 660, top: 190}} box={{width: 450, height: 300, boxShadow: `0 0 ${30 + pulse * 40}px ${R.red}55`}} hl={R.red}>
        <div style={{fontSize: 30, fontWeight: 500}}>Painkiller</div>
        <svg width="160" height="80" viewBox="0 0 160 80" style={{marginTop: 24}}>
          <rect x="10" y="10" width="140" height="60" rx="30" fill="#fff" />
          <rect x="10" y="10" width="70" height="60" rx="30" fill={R.red} />
        </svg>
        <div style={{fontSize: 22, color: R.mute, marginTop: 20}}>Real pain. "Fix it now."</div>
      </Card>
    </RSlide>
  );
};

/* 5 ===== 50 problems → 3 ===== */
export const ResearchOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const pick = f > at(0.55);
  const winners = [4, 17, 33];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Head label="Let the Bot research">Fifty problems, three *winners*</Head>
      <Abs x={110} y={190} style={{display: 'grid', gridTemplateColumns: 'repeat(10, 60px)', gap: 12}}>
        {Array.from({length: 50}).map((_, i) => {
          const win = winners.includes(i);
          const appear = interpolate(f, [at(0.05) + i * 2, at(0.05) + i * 2 + 8], [0, 1], clamp);
          return (
            <div
              key={i}
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: pick ? (win ? COLS[winners.indexOf(i)] : 'rgba(255,255,255,0.07)') : 'rgba(255,255,255,0.13)',
                opacity: pick && !win ? 0.25 : appear,
                transform: `scale(${pick && win ? 1.15 : 1})`,
              }}
            />
          );
        })}
      </Abs>
      <In at={at(0.62)} style={{position: 'absolute', left: 110, top: 480}}>
        <Pill kind="white" size={24}>Already paying to fix these 3</Pill>
      </In>
    </RSlide>
  );
};

/* 6 ===== ask for advice ===== */
export const AdviceOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const msgs: [boolean, string][] = [
    [true, 'Have you run into these 3 problems? Could I ask for your advice?'],
    [false, 'Yes! Happy to jump on a quick call.'],
    [true, 'Great. I am building something that fixes them. Want to be my first customer?'],
  ];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="typing" vol={0.15} dur={50} />
      <Head label="Don't pitch">Ask for *advice*, get the sale</Head>
      <Abs x={110} y={190} style={{width: 640, display: 'flex', flexDirection: 'column', gap: 16}}>
        {msgs.map(([me, t], i) => (
          <In key={i} at={at(0.1) + i * at(0.22)} style={{alignSelf: me ? 'flex-end' : 'flex-start'}}>
            <div style={{maxWidth: 440, padding: '14px 20px', borderRadius: 22, fontSize: 21, lineHeight: 1.3, background: me ? '#fff' : CARD, color: me ? R.bg : '#fff'}}>{t}</div>
          </In>
        ))}
      </Abs>
      <Abs x={820} y={190} style={{display: 'grid', gridTemplateColumns: 'repeat(5, 70px)', gap: 12}}>
        {Array.from({length: 10}).map((_, i) => (
          <In key={i} at={at(0.05) + i * 4} tick={false}>
            <Person s={40} c={i < 3 ? R.green : '#555'} />
          </In>
        ))}
      </Abs>
      <In at={at(0.75)} style={{position: 'absolute', left: 820, top: 330}}>
        <Pill kind="white" size={22}>10 messages · 3 calls</Pill>
      </In>
    </RSlide>
  );
};

/* 7 ===== the ladder ===== */
const Ladder: React.FC<{rungs: string[]; on: number; climb?: number}> = ({rungs, on, climb = on}) => (
  <div style={{position: 'relative', width: 520, height: 330}}>
    <div style={{position: 'absolute', left: 60, top: 0, bottom: 0, width: 10, borderRadius: 5, background: CARD}} />
    <div style={{position: 'absolute', right: 60, top: 0, bottom: 0, width: 10, borderRadius: 5, background: CARD}} />
    {rungs.map((r, i) => {
      const y = 330 - 70 - i * 76;
      return (
        <div key={r} style={{position: 'absolute', left: 60, right: 60, top: y}}>
          <div style={{height: 10, borderRadius: 5, background: i <= on ? R.orange : CARD, marginTop: 28}} />
          <div style={{position: 'absolute', left: 90, top: -4, fontSize: 28, fontWeight: 500, background: BGS, padding: '0 14px', color: i <= on ? '#fff' : DIM}}>{r}</div>
        </div>
      );
    })}
    <div style={{position: 'absolute', left: -30, top: 330 - 120 - climb * 76}}>
      <Bot shape="drop" color={R.white} size={70} bob={4} />
    </div>
  </div>
);

export const LadderOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const climb = interpolate(f, [at(0.4), at(0.9)], [0, 0.0], clamp);
  return (
    <RSlide vo={vo}>
      <Head label="Order matters">Climb one *rung* at a time</Head>
      <Abs x={160} y={185}><Ladder rungs={['Inbox', 'Delivery', 'Marketing', 'Sales']} on={0} climb={climb} /></Abs>
      <In at={at(0.4)} style={{position: 'absolute', left: 790, top: 250}}>
        <Card at={0} box={{width: 360}} hl={R.orange}>
          <div style={{fontSize: 16, color: DIM, letterSpacing: 2, fontFamily: mono.fontFamily}}>RUNG 1</div>
          <div style={{fontSize: 38, fontWeight: 500, marginTop: 6}}>Inbox + calendar</div>
          <div style={{fontSize: 20, color: R.mute, marginTop: 8}}>All your messages in one place</div>
        </Card>
      </In>
    </RSlide>
  );
};

/* 8 ===== four ingredients ===== */
export const RecipeOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const items: [string, string, React.ReactNode][] = [
    ['Data', 'What only you have', <svg key="d" width="54" height="54" viewBox="0 0 54 54"><ellipse cx="27" cy="12" rx="20" ry="8" fill={R.blue} /><path d="M7 12v30c0 4 9 8 20 8s20-4 20-8V12" fill="none" stroke={R.blue} strokeWidth="4" /></svg>],
    ['Playbook', 'The steps to follow', <svg key="p" width="54" height="54" viewBox="0 0 54 54"><rect x="8" y="6" width="38" height="44" rx="6" fill="none" stroke={R.green} strokeWidth="4" /><path d="M16 18h22M16 28h22M16 38h14" stroke={R.green} strokeWidth="4" /></svg>],
    ['Schedule', 'How often it runs', <svg key="s" width="54" height="54" viewBox="0 0 54 54"><circle cx="27" cy="27" r="21" fill="none" stroke={R.orange} strokeWidth="4" /><path d="M27 13v15l10 6" fill="none" stroke={R.orange} strokeWidth="4" strokeLinecap="round" /></svg>],
    ['Signal', 'Proof it works', <svg key="g" width="54" height="54" viewBox="0 0 54 54"><path d="M8 40v6M20 30v16M32 20v26M44 8v38" stroke={R.pink} strokeWidth="7" strokeLinecap="round" /></svg>],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Every Bot needs">Data · Playbook · Schedule · Signal</Head>
      {items.map(([t, s, ic], i) => (
        <Card key={t} at={at(0.1) + i * at(0.14)} style={{position: 'absolute', left: 110 + (i % 2) * 540, top: 185 + Math.floor(i / 2) * 170}} box={{width: 510, height: 145, display: 'flex', alignItems: 'center', gap: 22, boxShadow: f > at(0.7) ? '0 0 30px rgba(255,255,255,0.08)' : 'none'}}>
          {ic}
          <div>
            <div style={{fontSize: 34, fontWeight: 500}}>{t}</div>
            <div style={{fontSize: 21, color: R.mute}}>{s}</div>
          </div>
        </Card>
      ))}
    </RSlide>
  );
};

/* 9 ===== inbox sorted by learned rules ===== */
export const InboxDataOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const mails: [string, string, string, string][] = [
    ['Invoice #204', 'Finance', R.green, 'from billing@'],
    ['Can we book a demo?', 'Clients', R.blue, 'from Mia'],
    ['Weekly newsletter', 'Later', DIM, 'from news@'],
    ['Question about my order', 'Clients', R.blue, 'from Jon'],
    ['Receipt for hosting', 'Finance', R.green, 'from cloud@'],
  ];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="tick1" vol={0.15} />
      <Head label="Rung 1 · Data">It learns from your sent mail</Head>
      <Abs x={110} y={185} style={{width: 1060, borderRadius: 18, background: PANEL, border: `1px solid ${R.line}`, padding: 14}}>
        {mails.map(([t, l, c, from], i) => {
          const tagAt = at(0.35) + i * at(0.1);
          return (
            <div key={t} style={{display: 'flex', alignItems: 'center', height: 56, borderBottom: i < 4 ? `1px solid ${R.line}` : 'none', opacity: interpolate(f, [at(0.05) + i * 5, at(0.05) + i * 5 + 8], [0, 1], clamp)}}>
              <div style={{width: 220, fontSize: 18, color: DIM}}>{from}</div>
              <div style={{flex: 1, fontSize: 22}}>{t}</div>
              {f >= tagAt && (
                <div style={{transform: `scale(${interpolate(f, [tagAt, tagAt + 8], [0.6, 1], {...clamp, easing: expo})})`}}>
                  <Pill kind="dark" size={18} style={{border: `2px solid ${c}`}}>{l}</Pill>
                </div>
              )}
            </div>
          );
        })}
      </Abs>
      <In at={at(0.8)} style={{position: 'absolute', left: 840, top: 62}}>
        <Pill kind="white" size={22}>Rules found in your replies</Pill>
      </In>
    </RSlide>
  );
};

/* 10 ===== calendar playbook ===== */
export const CalendarOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const blocks: [number, number, number, string, string][] = [
    [0, 0, 2, 'Deep work', R.violet], [1, 3, 1, 'Calls', R.blue], [2, 0, 2, 'Deep work', R.violet],
    [3, 3, 1, 'Calls', R.blue], [4, 1, 1, 'Calls', R.blue], [0, 4, 1, 'Home', R.green], [2, 4, 1, 'Home', R.green], [4, 4, 1, 'Home', R.green],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 1 · Playbook">Your week, as rules</Head>
      <Abs x={110} y={185} style={{display: 'grid', gridTemplateColumns: 'repeat(5, 200px)', gap: 12}}>
        {days.map((d) => (
          <div key={d} style={{textAlign: 'center', fontSize: 20, color: DIM, fontFamily: mono.fontFamily}}>{d}</div>
        ))}
      </Abs>
      <Abs x={110} y={225} style={{position: 'absolute', width: 1050, height: 280}}>
        {days.map((d, i) => (
          <div key={d} style={{position: 'absolute', left: i * 212, top: 0, width: 200, height: 280, borderRadius: 14, background: CARD2, border: `1px solid ${R.line}`}} />
        ))}
        {blocks.map(([d, row, span, label, c], i) => (
          <In key={i} at={at(0.15) + i * 7} tick={i % 2 === 0} style={{position: 'absolute', left: d * 212 + 8, top: row * 55 + 6, width: 184, height: span * 55 - 8}}>
            <div style={{height: '100%', borderRadius: 10, background: c, color: '#000', fontSize: 18, fontWeight: 600, padding: '8px 12px'}}>{label}</div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 11 ===== learning loop ===== */
export const LoopOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const nodes = ['Bot drafts', 'You edit', 'You send', 'Bot learns'];
  const pos: [number, number][] = [[470, 0], [900, 130], [470, 260], [40, 130]];
  const phase = (f / Math.max(1, at(0.12))) % 4;
  const cur = Math.floor(phase);
  return (
    <RSlide vo={vo}>
      <Head label="Rung 1 · The loop">Draft. Edit. Send. Learn.</Head>
      <Abs x={110} y={190} style={{width: 1060, height: 330}}>
        <svg width="1060" height="330" style={{position: 'absolute', inset: 0}}>
          <ellipse cx="530" cy="150" rx="410" ry="125" fill="none" stroke={CARD} strokeWidth="6" strokeDasharray="10 10" />
        </svg>
        {nodes.map((n, i) => (
          <div key={n} style={{position: 'absolute', left: pos[i][0], top: pos[i][1]}}>
            <In at={at(0.08) + i * 8}>
              <div style={{padding: '16px 28px', borderRadius: 40, fontSize: 26, fontWeight: 500, background: cur === i && f > at(0.4) ? (i === 3 ? R.green : '#fff') : CARD, color: cur === i && f > at(0.4) ? R.bg : '#fff', border: `1px solid ${R.line}`}}>{n}</div>
            </In>
          </div>
        ))}
      </Abs>
      <Sfx at={at(0.75)} name="ding" vol={0.22} dur={40} />
      <In at={at(0.75)} style={{position: 'absolute', left: 380, top: 285}}>
        <Pill kind="ghost" size={22}>No learning loop = no agent</Pill>
      </In>
    </RSlide>
  );
};

/* 12 ===== schedule + signal ===== */
export const CadenceOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const sweep = interpolate(f, [at(0.1), at(0.5)], [0, 360], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.25} dur={40} />
      <Head label="Rung 1 · Schedule + Signal">Twice a day, with a heads-up</Head>
      <Abs x={140} y={190} style={{width: 300, height: 300}}>
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="130" fill={CARD2} stroke={R.line} strokeWidth="3" />
          {Array.from({length: 12}).map((_, i) => (
            <line key={i} x1="150" y1="28" x2="150" y2="40" stroke={DIM} strokeWidth="3" transform={`rotate(${i * 30} 150 150)`} />
          ))}
          <line x1="150" y1="150" x2="150" y2="62" stroke="#fff" strokeWidth="6" strokeLinecap="round" transform={`rotate(${sweep} 150 150)`} />
          <circle cx="150" cy="150" r="8" fill="#fff" />
        </svg>
        <div style={{position: 'absolute', left: 10, top: 100, fontSize: 22, fontWeight: 600, color: R.orange}}>11:00</div>
        <div style={{position: 'absolute', right: 20, top: 150, fontSize: 22, fontWeight: 600, color: R.orange}}>4:00</div>
      </Abs>
      <Card at={at(0.5)} style={{position: 'absolute', left: 560, top: 215}} box={{width: 560}} hl={R.green}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Bot shape="drop" color={R.white} size={54} />
          <div style={{fontSize: 22, fontWeight: 600}}>Inbox Bot · just now</div>
        </div>
        <div style={{fontSize: 22, lineHeight: 1.45, marginTop: 14, color: R.mute}}>
          12 drafts ready for review<br />3 people have not replied yet<br />
          <span style={{color: '#fff', textDecoration: 'underline'}}>Open drafts folder →</span>
        </div>
      </Card>
      <In at={at(0.8)} style={{position: 'absolute', left: 560, top: 440}}>
        <Pill kind="white" size={22}>Review mode first</Pill>
      </In>
    </RSlide>
  );
};

/* 13 ===== delivery flow ===== */
export const DeliveryOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const steps: [string, string][] = [['💳', 'Payment clears'], ['✉️', 'Welcome mail'], ['📝', 'Intake form'], ['📁', 'Client folder'], ['🏆', 'First win']];
  const prog = interpolate(f, [at(0.1), at(0.85)], [0, 4], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.85)} name="ding" vol={0.28} dur={40} />
      <Head label="Rung 2 · Delivery">From “paid” to “happy”, by itself</Head>
      <Abs x={70} y={230} style={{display: 'flex', alignItems: 'center', gap: 10}}>
        {steps.map(([ic, t], i) => (
          <React.Fragment key={t}>
            <Card at={at(0.08) + i * at(0.12)} box={{width: 182, height: 180, textAlign: 'center', background: prog >= i ? '#fff' : CARD, color: prog >= i ? R.bg : '#fff'}}>
              <div style={{fontSize: 52}}>{ic}</div>
              <div style={{fontSize: 21, fontWeight: 600, marginTop: 10}}>{t}</div>
              {prog >= i + 0.99 && <div style={{fontSize: 24, color: R.green}}>✓</div>}
            </Card>
            {i < 4 && <div style={{fontSize: 28, color: DIM}}>›</div>}
          </React.Fragment>
        ))}
      </Abs>
      <In at={at(0.8)} style={{position: 'absolute', left: 70, top: 450}}>
        <Pill kind="ghost" size={22}>Goal: a first win on day one</Pill>
      </In>
    </RSlide>
  );
};

/* 14 ===== interview to teach ===== */
export const InterviewOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const q = 'How do you deliver your work, from payment to the first win?';
  const steps: [string, boolean][] = [['Collect intake answers', false], ['Prepare the client folder', false], ['Run the kickoff call', true], ['Send the first deliverable', false]];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.2)} name="typing" vol={0.15} dur={60} />
      <Head label="Rung 2 · Playbook">Just talk, let it ask</Head>
      <Abs x={110} y={200} style={{display: 'flex', alignItems: 'center', gap: 5, height: 120}}>
        {Array.from({length: 24}).map((_, i) => (
          <div key={i} style={{width: 9, borderRadius: 5, background: R.pink, height: 14 + Math.abs(Math.sin((f + i * 4) / 5)) * 90 * (f < at(0.5) ? 1 : 0.2)}} />
        ))}
      </Abs>
      <Card at={at(0.15)} style={{position: 'absolute', left: 110, top: 340}} box={{width: 500}}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily}}>Bot · question 1</div>
        <div style={{fontSize: 24, marginTop: 8}}>{typed(q, f, at(0.2), 30)}</div>
      </Card>
      <Abs x={700} y={195} style={{width: 470, display: 'flex', flexDirection: 'column', gap: 12}}>
        {steps.map(([s, you], i) => (
          <Card key={s} at={at(0.5) + i * at(0.1)} box={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px'}}>
            <span style={{fontSize: 21}}>{s}</span>
            <Pill kind={you ? 'white' : 'dark'} size={15}>{you ? 'You' : 'Bot'}</Pill>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 15 ===== client board ===== */
export const BoardOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const rows: [string, string, string, number][] = [
    ['Acme Gym', 'Onboarding', R.green, 1], ['Bright Dental', 'Intake form', R.green, 2], ['Nova Studio', 'Kickoff', R.orange, 5],
    ['Peak Coaching', 'Folder setup', R.green, 1], ['Harbor Cafe', 'Intake form', R.red, 9],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 2 · Signal">Fix only the red</Head>
      <Abs x={110} y={185} style={{width: 1060, borderRadius: 18, background: PANEL, border: `1px solid ${R.line}`, padding: '8px 18px'}}>
        {rows.map(([n, st, c, d], i) => (
          <In key={n} at={at(0.1) + i * at(0.1)} tick={false}>
            <div style={{display: 'flex', alignItems: 'center', height: 58, borderBottom: i < 4 ? `1px solid ${R.line}` : 'none', background: c === R.red ? 'rgba(255,80,80,0.1)' : 'transparent'}}>
              <div style={{width: 18, height: 18, borderRadius: '50%', background: c, marginRight: 20}} />
              <div style={{width: 280, fontSize: 24, fontWeight: 500}}>{n}</div>
              <div style={{width: 260, fontSize: 21, color: R.mute}}>{st}</div>
              <div style={{flex: 1, height: 12, borderRadius: 6, background: CARD}}>
                <div style={{width: `${d * 10}%`, height: '100%', borderRadius: 6, background: c}} />
              </div>
              <div style={{width: 110, textAlign: 'right', fontSize: 20, color: DIM, fontFamily: mono.fontFamily}}>{d} days</div>
            </div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 16 ===== capacity bars ===== */
export const MarketingOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const grow = interpolate(f, [at(0.1), at(0.55)], [10, 90], clamp);
  const cap = interpolate(f, [at(0.55), at(0.8)], [45, 95], {...clamp, easing: expo});
  const over = grow > cap;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Head label="Rung 3 · Marketing">Serve first, then grow</Head>
      {[['New customers', grow, R.blue], ['Your capacity to serve', cap, over ? R.red : R.green]].map(([l, v, c], i) => (
        <Abs key={String(l)} x={130} y={210 + i * 120} style={{width: 1000}}>
          <div style={{fontSize: 24, color: R.mute, marginBottom: 10}}>{l as string}</div>
          <div style={{height: 38, borderRadius: 19, background: CARD}}>
            <div style={{width: `${v as number}%`, height: '100%', borderRadius: 19, background: c as string}} />
          </div>
        </Abs>
      ))}
      <In at={at(0.6)} style={{position: 'absolute', left: 130, top: 460}}>
        <Pill kind="white" size={22}>Delivery Bot raises capacity</Pill>
      </In>
    </RSlide>
  );
};

/* 17 ===== ten leads each morning ===== */
export const LeadsOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const names = ['Ana', 'Ben', 'Cai', 'Dee', 'Eli', 'Fay', 'Gus', 'Hui', 'Ivo', 'Jo'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="ding" vol={0.2} dur={30} />
      <Head label="Rung 3 · Schedule">Ten new people, every morning</Head>
      <Abs x={110} y={185} style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <svg width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="11" fill="#FFC83C" />{Array.from({length: 8}).map((_, i) => <line key={i} x1="25" y1="4" x2="25" y2="10" stroke="#FFC83C" strokeWidth="3" transform={`rotate(${i * 45} 25 25)`} />)}</svg>
        <Pill kind="dark" size={22}>7:00 · 10 new leads in your inbox</Pill>
      </Abs>
      <Abs x={110} y={265} style={{display: 'grid', gridTemplateColumns: 'repeat(5, 200px)', gap: 12}}>
        {names.map((n, i) => (
          <Card key={n} at={at(0.18) + i * 5} box={{padding: '12px 14px', height: 110}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div style={{width: 34, height: 34, borderRadius: '50%', background: COLS[i % 6]}} />
              <div style={{fontSize: 22, fontWeight: 500}}>{n}</div>
            </div>
            <div style={{fontSize: 15, color: DIM, marginTop: 10}}>{['posted in a group', 'asked for help', 'complaining on X', 'comment on a post', 'forum thread'][i % 5]}</div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 18 ===== content scripts ===== */
export const ContentOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const script = 'Hook: "Why your clients ghost you after week one". Three lines, one tip, one call to action.';
  const topics = ['Specific problem', 'Real example', 'Plain words'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.2)} name="typing" vol={0.15} dur={80} />
      <Head label="Rung 3 · Blueprint">Short videos from real problems</Head>
      <In at={at(0.08)} style={{position: 'absolute', left: 120, top: 175}}>
        <div style={{width: 250, height: 380, borderRadius: 36, background: '#050505', padding: 10, border: `1px solid ${R.line}`}}>
          <div style={{height: '100%', borderRadius: 28, background: CARD2, padding: 18, fontSize: 18, lineHeight: 1.4, color: R.mute}}>
            <div style={{fontSize: 14, color: R.orange, fontFamily: mono.fontFamily, marginBottom: 10}}>SCRIPT · YOUR VOICE</div>
            {typed(script, f, at(0.2), 28)}
          </div>
        </div>
      </In>
      <Abs x={470} y={210} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {topics.map((t, i) => (
          <In key={t} at={at(0.35) + i * at(0.12)}>
            <Pill kind="dark" size={26}>✓ {t}</Pill>
          </In>
        ))}
        <In at={at(0.75)}><Pill kind="white" size={24}>Too generic? “Be more specific.”</Pill></In>
      </Abs>
    </RSlide>
  );
};

/* 19 ===== funnel ===== */
export const FunnelOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const lv: [string, string, string][] = [['Found', '120', R.blue], ['Qualified', '48', R.violet], ['Booked', '20', R.orange], ['Bought', '7', R.green]];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 3 · Signal">Watch the whole funnel</Head>
      <Abs x={0} y={190} style={{width: 1280}}>
        {lv.map(([l, n, c], i) => (
          <In key={l} at={at(0.1) + i * at(0.15)} style={{display: 'flex', justifyContent: 'center', marginBottom: 12}}>
            <div style={{width: 760 - i * 150, height: 62, borderRadius: 14, background: c, color: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 26px', fontSize: 26, fontWeight: 600}}>
              <span>{l}</span><span>{n}</span>
            </div>
          </In>
        ))}
      </Abs>
      <In at={at(0.8)} style={{position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center'}}>
        <Pill kind="white" size={22}>Feed the winners back in</Pill>
      </In>
    </RSlide>
  );
};

/* 20 ===== human vs bot split ===== */
export const SalesOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const tasks = ['Qualify new leads', 'Follow up the same day', 'Rebook no-shows', 'Update your records'];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 4 · Sales">The close stays human</Head>
      <Card at={at(0.1)} style={{position: 'absolute', left: 110, top: 190}} box={{width: 420, height: 300, textAlign: 'center'}} hl={R.pink}>
        <div style={{marginTop: 30, display: 'flex', justifyContent: 'center'}}><Person s={80} c="#fff" /></div>
        <div style={{fontSize: 36, fontWeight: 500, marginTop: 18}}>You</div>
        <div style={{fontSize: 24, color: R.mute, marginTop: 6}}>The conversation and the close</div>
      </Card>
      <Abs x={580} y={190} style={{width: 590, display: 'flex', flexDirection: 'column', gap: 12}}>
        {tasks.map((t, i) => (
          <Card key={t} at={at(0.3) + i * at(0.1)} box={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px'}}>
            <Bot shape="drop" color={COLS[i]} size={38} />
            <span style={{fontSize: 25}}>{t}</span>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 21 ===== call coach scorecard ===== */
export const CoachOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const talk = interpolate(f, [at(0.45), at(0.7)], [0, 68], {...clamp, easing: expo});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.45)} name="ding" vol={0.22} dur={40} />
      <Head label="Rung 4 · Playbook">A practice buyer that scores you</Head>
      <Card at={at(0.08)} style={{position: 'absolute', left: 110, top: 190}} box={{width: 400, height: 300}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Bot shape="blob" color={R.pink} size={52} />
          <div><div style={{fontSize: 22, fontWeight: 600}}>Practice buyer</div><div style={{fontSize: 16, color: R.green}}>● on call 04:12</div></div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 4, height: 100, marginTop: 30}}>
          {Array.from({length: 26}).map((_, i) => (
            <div key={i} style={{width: 8, borderRadius: 4, background: '#fff', height: 12 + Math.abs(Math.sin((f + i * 3) / 4)) * 70}} />
          ))}
        </div>
      </Card>
      <Card at={at(0.4)} style={{position: 'absolute', left: 560, top: 190}} box={{width: 610, height: 300}} hl={R.orange}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily, letterSpacing: 2}}>CALL REPORT</div>
        <div style={{fontSize: 22, marginTop: 14, color: R.mute}}>You talked {Math.round(talk)}%</div>
        <div style={{height: 20, borderRadius: 10, background: CARD2, marginTop: 8}}>
          <div style={{width: `${talk}%`, height: '100%', borderRadius: 10, background: talk > 60 ? R.orange : R.green}} />
        </div>
        <div style={{display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap'}}>
          <Pill kind="dark" size={19}>Skipped: budget question</Pill>
          <Pill kind="dark" size={19}>Fumbled: “too expensive”</Pill>
        </div>
      </Card>
    </RSlide>
  );
};

/* 22 ===== win-rate chart + clean records ===== */
export const WinrateOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const k = interpolate(f, [at(0.1), at(0.7)], [0, 1], clamp);
  const pts = [20, 26, 24, 34, 40, 38, 52, 60];
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * 70} ${200 - p * 2.8}`).join(' ');
  const checks = ['Call notes saved', 'Pain points tagged', 'Handed to delivery'];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 4 · Signal">Win rate and clean records</Head>
      <Abs x={130} y={210}>
        <svg width="500" height="220" viewBox="-10 -10 510 220">
          <path d="M0 200H490" stroke={R.line} strokeWidth="2" />
          <path d={path} fill="none" stroke={R.green} strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
        </svg>
        <div style={{fontSize: 20, color: DIM, marginTop: 6}}>Win rate, week by week</div>
      </Abs>
      <Abs x={720} y={210} style={{width: 440, display: 'flex', flexDirection: 'column', gap: 14}}>
        {checks.map((c, i) => (
          <Card key={c} at={at(0.4) + i * at(0.13)} box={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px'}}>
            <span style={{color: R.green, fontSize: 26}}>✓</span><span style={{fontSize: 23}}>{c}</span>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 23 ===== shared brain ===== */
export const BrainOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const src = ['Mail', 'Calendar', 'Calls', 'Customers', 'Docs'];
  const bots: [string, string][] = [['Inbox', R.blue], ['Delivery', R.green], ['Marketing', R.violet], ['Sales', R.orange]];
  const glow = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.25} dur={40} />
      <Head label="The final step">One shared brain</Head>
      <Abs x={0} y={190} style={{width: 1280, height: 330}}>
        <svg width="1280" height="330" style={{position: 'absolute', inset: 0}}>
          {src.map((_, i) => <line key={i} x1="640" y1="165" x2={90 + i * 60} y2={30 + i * 66} stroke={R.line} strokeWidth="3" />)}
          {bots.map((_, i) => <line key={i} x1="640" y1="165" x2="1100" y2={25 + i * 90} stroke={COLS[i]} strokeWidth="3" opacity={f > at(0.5) ? 1 : 0.2} />)}
        </svg>
        {src.map((s, i) => (
          <In key={s} at={at(0.08) + i * 6} tick={i % 2 === 0} style={{position: 'absolute', left: 90 + i * 60 - 70, top: 30 + i * 66 - 20}}>
            <Pill kind="dark" size={20}>{s}</Pill>
          </In>
        ))}
        <div style={{position: 'absolute', left: 560, top: 85, width: 160, height: 160, borderRadius: '50%', background: CARD, border: `3px solid ${R.teal}`, boxShadow: `0 0 ${30 + glow * 40}px ${R.teal}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 78}}>🧠</div>
        {bots.map(([b, c], i) => (
          <In key={b} at={at(0.45) + i * 6} style={{position: 'absolute', left: 1040, top: 25 + i * 90 - 22}}>
            <Pill kind="dark" size={20} style={{border: `2px solid ${c}`}}>{b} Bot</Pill>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 24 ===== Friday → Monday handoff ===== */
export const FridayOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const x = interpolate(f, [at(0.4), at(0.65)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.4)} name="whoosh" vol={0.25} dur={30} />
      <Sfx at={at(0.7)} name="ding" vol={0.22} dur={40} />
      <Head label="One handoff first">Friday → Monday</Head>
      <Card at={at(0.08)} style={{position: 'absolute', left: 110, top: 200}} box={{width: 400, height: 250}} hl={R.orange}>
        <Pill kind="white" size={18}>Friday</Pill>
        <div style={{fontSize: 30, fontWeight: 500, marginTop: 16}}>Sales Bot saves the top objections</div>
        <div style={{fontSize: 20, color: R.mute, marginTop: 12}}>“Too expensive” · “No time”</div>
      </Card>
      <Abs x={540} y={310} style={{width: 200, height: 40}}>
        <div style={{height: 6, borderRadius: 3, background: CARD}} />
        <div style={{position: 'absolute', left: x * 150, top: -14}}><Bot shape="drop" color={R.white} size={40} /></div>
      </Abs>
      <Card at={at(0.2)} style={{position: 'absolute', left: 770, top: 200}} box={{width: 400, height: 250}} hl={R.violet}>
        <Pill kind="white" size={18}>Monday</Pill>
        <div style={{fontSize: 30, fontWeight: 500, marginTop: 16}}>Marketing Bot turns them into topics</div>
        <div style={{fontSize: 20, color: R.mute, marginTop: 12}}>3 videos planned for the week</div>
      </Card>
    </RSlide>
  );
};

/* 25 ===== vision: sunrise ===== */
export const VisionOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const sun = interpolate(f, [at(0.1), at(0.7)], [150, 20], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.7)} name="ding" vol={0.25} dur={40} />
      <svg width="1280" height="560" viewBox="0 0 1280 560" style={{position: 'absolute', top: 0}}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f4fb5" /><stop offset="1" stopColor="#ff9a4d" /></linearGradient>
        </defs>
        <rect width="1280" height="560" fill="url(#sky)" />
        <circle cx="640" cy={330 + sun} r="110" fill="#FFB347" opacity="0.95" />
        <circle cx="640" cy={330 + sun} r="170" fill="#FFB347" opacity="0.15" />
        <path d="M0 470 L230 330 L420 440 L640 300 L860 430 L1050 340 L1280 460 V560 H0Z" fill="#0d2a63" />
      </svg>
      <In at={at(0.2)} style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontSize: 70, fontWeight: 500, letterSpacing: -2}}>
        The vision stays yours
      </In>
      <Abs x={590} y={405}><Bot shape="drop" color={R.white} size={90} bob={5} /></Abs>
    </RSlide>
  );
};

/* 26 ===== outro ===== */
export const OutroOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const words: [string, string][] = [['1', 'Find the painkiller'], ['2', 'Climb the ladder'], ['3', 'Share one brain']];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Center y={50}><Bot shape="drop" color={R.white} size={150} bob={6} /></Center>
      <Center y={230}><div style={{fontSize: 66, fontWeight: 500, letterSpacing: -2}}>One founder. A crew of Bots.</div></Center>
      <Abs x={0} y={340} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 18}}>
        {words.map(([n, w], i) => (
          <In key={w} at={at(0.25) + i * 10}>
            <Pill kind={i === 2 ? 'white' : 'dark'} size={26}>{n} · {w}</Pill>
          </In>
        ))}
      </Abs>
      <In at={at(0.6)} style={{position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center'}}>
        <Pill kind="ghost" size={26}>This week: start with the inbox</Pill>
      </In>
    </RSlide>
  );
};
