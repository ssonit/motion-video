import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Abs, Card, Head, In, Pill, R, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';

/** Scenes for part 6 (op-6-brain). */
const DIM = 'var(--op-dim, rgba(255,255,255,0.42))';
const ACC = '#ff7a1a';
const GLASS = 'rgba(255,255,255,0.12)';
const BOTS: [string, string][] = [['Inbox', R.blue], ['Delivery', R.green], ['Marketing', R.violet], ['Sales', R.orange]];

/* 1 problem: bots are islands */
export const Problem6OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const gaps = [at(0.45), at(0.62), at(0.78)];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.45)} name="tick1" vol={0.2} />
      <Head label="Part six · The gap">Your Bots don't *talk*</Head>
      <Abs x={90} y={230} style={{display: 'flex', alignItems: 'center'}}>
        {BOTS.map(([b, c], i) => (
          <React.Fragment key={b}>
            <Card at={at(0.06) + i * at(0.08)} box={{width: 190, height: 170, textAlign: 'center', border: `2px solid ${c}`}}>
              <Bot shape="drop" color={R.white} size={56} />
              <div style={{fontSize: 24, fontWeight: 600, marginTop: 10}}>{b}</div>
            </Card>
            {i < 3 && (
              <div style={{width: 86, textAlign: 'center', fontSize: 30, color: R.red, opacity: interpolate(f, [gaps[i], gaps[i] + 10], [0, 1], clamp), fontWeight: 700}}>✕</div>
            )}
          </React.Fragment>
        ))}
      </Abs>
      <In at={at(0.5)} style={{position: 'absolute', left: 90, top: 430}}><Pill kind="dark" size={21}>Inbox → Marketing: never arrives</Pill></In>
      <In at={at(0.66)} style={{position: 'absolute', left: 90, top: 478}}><Pill kind="dark" size={21}>Marketing → Sales: never arrives</Pill></In>
    </RSlide>
  );
};

/* 2 handover: the client explains twice */
export const Handover6OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.22} dur={40} />
      <Head label="The handover">The conversation should *travel*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 200}} box={{width: 400, height: 240}}>
        <Pill kind="dark" size={18}>Sales call</Pill>
        <div style={{fontSize: 22, lineHeight: 1.45, marginTop: 16, color: 'rgba(255,255,255,0.8)'}}>Goals, worries, what was promised, deadlines…</div>
      </Card>
      <Abs x={540} y={300} style={{fontSize: 52, color: ACC}}>→</Abs>
      <Card at={at(0.4)} style={{position: 'absolute', left: 640, top: 200}} box={{width: 530, height: 240}} hl={R.green}>
        <Pill kind="white" size={18}>Delivery starts</Pill>
        <div style={{fontSize: 24, lineHeight: 1.45, marginTop: 16}}>Already knows everything.</div>
        <In at={at(0.7)} style={{marginTop: 18}}><Pill kind="dark" size={20} style={{textDecoration: 'line-through', opacity: 0.6}}>“Can you explain it again?”</Pill></In>
      </Card>
    </RSlide>
  );
};

/* 3 surgeons sharing */
export const Surgeons6OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const n = 8;
  const pts = Array.from({length: n}).map((_, i) => [640 + Math.cos((i / n) * Math.PI * 2) * 250, 380 + Math.sin((i / n) * Math.PI * 2) * 120] as [number, number]);
  const pulse = (f % 60) / 60;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Head label="A picture of it">Every expert shares *everything*</Head>
      <svg width="1280" height="560" style={{position: 'absolute', inset: 0}}>
        {pts.map((a, i) => pts.slice(i + 1).map((b, j) => <line key={`${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={ACC} strokeWidth="1.5" opacity={interpolate(f, [at(0.3), at(0.6)], [0, 0.25], clamp)} />))}
      </svg>
      {pts.map(([x, y], i) => (
        <In key={i} at={at(0.06) + i * 4} tick={false} style={{position: 'absolute', left: x - 30, top: y - 30}}>
          <div style={{width: 60, height: 60, borderRadius: '50%', background: GLASS, border: `2px solid ${ACC}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, transform: `scale(${1 + (Math.abs(pulse - i / n) < 0.1 ? 0.15 : 0)})`}}>🩺</div>
        </In>
      ))}
      <In at={at(0.7)} style={{position: 'absolute', left: 520, top: 350}}><Pill kind="white" size={24}>One shared brain</Pill></In>
    </RSlide>
  );
};

/* 4 equity: how you do things is the asset */
export const Equity6OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Head label="What you own">The real asset: *how you do things*</Head>
      <Abs x={110} y={200} style={{width: 460}}>
        <div style={{fontSize: 20, color: DIM, marginBottom: 12}}>Bots are only as good as what they know</div>
        {['Your voice', 'Your process', 'Your best answers', 'Your edge'].map((t, i) => (
          <Card key={t} at={at(0.1) + i * at(0.09)} box={{marginBottom: 12, padding: '14px 20px', fontSize: 25}}>{t}</Card>
        ))}
      </Abs>
      <Abs x={640} y={290} style={{fontSize: 48, color: DIM}}>→</Abs>
      <In at={at(0.55)} style={{position: 'absolute', left: 740, top: 230}}>
        <div style={{width: 340, height: 220, borderRadius: 28, background: GLASS, border: `3px solid ${ACC}`, boxShadow: `0 0 50px ${ACC}44`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
          <div style={{fontSize: 72}}>🧠</div>
          <div style={{fontSize: 24, fontWeight: 600}}>One place</div>
        </div>
      </In>
    </RSlide>
  );
};

/* 6 step 2: connect every bot */
export const Connect6OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.4)} name="ding" vol={0.25} dur={40} />
      <Head label="Step 2">Connect *every Bot* to it</Head>
      <Abs x={540} y={290}>
        <div style={{width: 200, height: 200, borderRadius: '50%', background: GLASS, border: `3px solid ${ACC}`, boxShadow: `0 0 ${40 + 20 * Math.sin(f / 10)}px ${ACC}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 90, position: 'relative', left: 10, top: -60}}>🧠</div>
      </Abs>
      {BOTS.map(([b, c], i) => {
        const pos: [number, number][] = [[130, 220], [130, 380], [880, 220], [880, 380]];
        const [x, y] = pos[i];
        return (
          <React.Fragment key={b}>
            <svg width="1280" height="560" style={{position: 'absolute', inset: 0}}>
              <line x1={x + 135} y1={y + 35} x2="640" y2="330" stroke={c} strokeWidth="3" strokeDasharray="8 8" strokeDashoffset={-f} opacity={interpolate(f, [at(0.3) + i * 6, at(0.3) + i * 6 + 10], [0, 1], clamp)} />
            </svg>
            <Card at={at(0.08) + i * at(0.07)} style={{position: 'absolute', left: x, top: y}} box={{width: 270, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, border: `2px solid ${c}`}}>
              <Bot shape="drop" color={R.white} size={36} /><span style={{fontSize: 23, fontWeight: 600}}>{b} Bot</span>
            </Card>
          </React.Fragment>
        );
      })}
      <In at={at(0.7)} style={{position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center'}}><Pill kind="white" size={22}>Whichever tool each one runs on</Pill></In>
    </RSlide>
  );
};

/* 8 more handoffs */
export const More6OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.22} dur={40} />
      <Head label="Then add more">Each Bot *feeds the next*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 200}} box={{width: 460, height: 260}} hl={R.blue}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Bot shape="drop" color={R.white} size={40} /><span style={{fontSize: 24, fontWeight: 600}}>Inbox Bot</span>
        </div>
        <div style={{fontSize: 22, lineHeight: 1.45, marginTop: 16, color: 'rgba(255,255,255,0.8)'}}>Knows your voice → writes the sales follow-ups</div>
        <div style={{marginTop: 16}}><Pill kind="dark" size={19}>→ Sales</Pill></div>
      </Card>
      <Card at={at(0.4)} style={{position: 'absolute', left: 640, top: 200}} box={{width: 530, height: 260}} hl={R.green}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Bot shape="drop" color={R.white} size={40} /><span style={{fontSize: 24, fontWeight: 600}}>Delivery Bot</span>
        </div>
        <div style={{fontSize: 22, lineHeight: 1.45, marginTop: 16, color: 'rgba(255,255,255,0.8)'}}>Reads promises made in sales → builds a punch list</div>
        <In at={at(0.7)} style={{marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Pill kind="dark" size={19}>☐ Promise 1</Pill><Pill kind="dark" size={19}>☐ Promise 2</Pill><Pill kind="white" size={19}>Nothing dropped</Pill>
        </In>
      </Card>
    </RSlide>
  );
};

/* 9 diy vs platform; tools change, brain stays */
export const Diy6OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const swap = Math.floor(f / 24) % 4;
  const tools = ['Tool A', 'Tool B', 'Tool C', 'Tool D'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.7)} name="ding" vol={0.25} dur={40} />
      <Head label="Build or buy">Tools change. *The brain stays.*</Head>
      <Abs x={110} y={200} style={{display: 'flex', gap: 16}}>
        <Card at={at(0.06)} box={{width: 270, height: 150}}>
          <div style={{fontSize: 20, color: DIM, fontFamily: mono.fontFamily}}>DIY</div>
          <div style={{fontSize: 24, marginTop: 8}}>Takes time, and can break</div>
        </Card>
        <Card at={at(0.15)} box={{width: 270, height: 150}} hl={ACC}>
          <div style={{fontSize: 20, color: ACC, fontFamily: mono.fontFamily}}>READY-MADE</div>
          <div style={{fontSize: 24, marginTop: 8}}>A platform is faster</div>
        </Card>
      </Abs>
      <Abs x={110} y={390} style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{width: 130, height: 90, borderRadius: 20, background: GLASS, border: `3px solid ${ACC}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46}}>🧠</div>
        <div style={{fontSize: 30, color: DIM}}>←</div>
        {tools.map((t, i) => <div key={t} style={{padding: '14px 22px', borderRadius: 16, background: i === swap ? '#fff' : 'rgba(255,255,255,0.1)', color: i === swap ? '#111' : DIM, fontSize: 22, fontWeight: 600}}>{t}</div>)}
      </Abs>
    </RSlide>
  );
};
