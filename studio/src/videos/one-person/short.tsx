import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Sfx, clamp, useAt} from '../../lib/kit';
import slidesJson from '../../../content/one-person/short-ladder/slides.json';

/** Vertical 1080x1920 short: "The Agent Ladder in 45 seconds" (storyboard: content/one-person/short-ladder/storyboard.md). */

type SlideRow = {id: string; vo: string; frames: number};
const OR = '#ff7a1a';
const CARD = '#27272c';
const DIM = 'rgba(255,255,255,0.58)';
const SANS = 'Inter, system-ui, sans-serif';
const MONO = '"JetBrains Mono", monospace';
const expo = Easing.out(Easing.exp);

const useSpring = (at: number, damping = 12) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - at, fps, config: {damping, stiffness: 140}});
};

const Abs: React.FC<{x: number; y: number; w?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, ...style}}>{children}</div>
);

/** Captions: the narration in 3-word chunks, timed across the shot. */
const Caps: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const words = vo.split(' ');
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += 3) chunks.push(words.slice(i, i + 3).join(' '));
  const k = Math.min(chunks.length - 1, Math.floor((f / (durationInFrames - 8)) * chunks.length));
  const local = f - (k * (durationInFrames - 8)) / chunks.length;
  const s = interpolate(local, [0, 5], [0.86, 1], {...clamp, easing: expo});
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 1380, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          fontFamily: SANS, fontWeight: 900, fontSize: 84, lineHeight: 1.05, textAlign: 'center', color: '#fff',
          textTransform: 'uppercase', transform: `scale(${s})`, textShadow: '0 6px 30px rgba(0,0,0,0.85)', letterSpacing: -1,
        }}
      >
        {chunks[k]}
      </div>
    </div>
  );
};

/** Shot wrapper: ember background, fade in, whoosh, ladder rail (5 dots), captions. */
const Shot: React.FC<{vo: string; rung?: number; children: React.ReactNode}> = ({vo, rung = -1, children}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const fade = interpolate(f, [0, 5, durationInFrames - 4, durationInFrames], [0, 1, 1, 0.6], clamp);
  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(900px 700px at 100% -5%, rgba(255,110,20,0.34), transparent 62%), radial-gradient(700px 500px at -10% 105%, rgba(255,90,0,0.16), transparent 62%), #121214',
        opacity: fade, fontFamily: SANS, overflow: 'hidden',
      }}
    >
      <Sfx at={0} name="whoosh" vol={0.28} dur={40} />
      <Abs x={60} y={70} style={{fontFamily: MONO, fontSize: 28, letterSpacing: 4, color: OR}}>ONE PERSON · AGENT LADDER</Abs>
      <div style={{position: 'absolute', right: 52, top: 700 - 200, display: 'flex', flexDirection: 'column-reverse', gap: 26}}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{width: 18, height: 18, borderRadius: 9, background: i <= rung ? OR : 'rgba(255,255,255,0.18)', boxShadow: i === rung ? `0 0 24px ${OR}` : 'none'}} />
        ))}
      </div>
      {children}
      <Caps vo={vo} />
    </AbsoluteFill>
  );
};

const Counter: React.FC<{from: number; to: number; start: number; end: number; style?: React.CSSProperties; pre?: string}> = ({from, to, start, end, style, pre = ''}) => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [start, end], [from, to], {...clamp, easing: Easing.out(Easing.cubic)}));
  return <span style={style}>{pre}{v}</span>;
};

const Person: React.FC<{s: number; c: string}> = ({s, c}) => (
  <svg width={s} height={s * 1.5} viewBox="0 0 40 60">
    <circle cx="20" cy="14" r="11" fill={c} />
    <path d="M2 58a18 22 0 0 1 36 0Z" fill={c} />
  </svg>
);

const BotDot: React.FC<{s: number; glow?: boolean}> = ({s, glow}) => (
  <div style={{width: s, height: s, borderRadius: s / 2, background: `radial-gradient(circle at 35% 30%, #ffc08a, ${OR} 60%, #c2410c)`, boxShadow: glow ? `0 0 ${s}px rgba(255,122,26,0.7)` : 'none', position: 'relative'}}>
    <div style={{position: 'absolute', left: '28%', top: '40%', width: '14%', height: '14%', borderRadius: '50%', background: '#1a1209'}} />
    <div style={{position: 'absolute', right: '28%', top: '40%', width: '14%', height: '14%', borderRadius: '50%', background: '#1a1209'}} />
  </div>
);

/* 1 ===== 1 = 20 ===== */
const Hook: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const at = useAt();
  const slam = spring({frame: f, fps: 30, config: {damping: 9, stiffness: 220}});
  const shake = f > 6 && f < 16 ? Math.sin(f * 3) * (16 - f) * 1.4 : 0;
  return (
    <Shot vo={vo}>
      <Sfx at={4} name="ding" vol={0.3} dur={40} />
      <Abs x={0} y={150} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `translateX(${shake}px)`}}>
        <div style={{fontSize: 520, fontWeight: 900, color: '#fff', lineHeight: 1, transform: `scale(${interpolate(slam, [0, 1], [3.2, 1])})`, opacity: Math.min(1, f / 3), textShadow: `0 0 90px ${OR}`}}>1</div>
      </Abs>
      <Abs x={90} y={760} w={900} style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 6, justifyItems: 'center'}}>
        {Array.from({length: 20}).map((_, i) => {
          const s = interpolate(f, [at(0.22) + i * 2, at(0.22) + i * 2 + 8], [0, 1], {...clamp, easing: expo});
          return (
            <div key={i} style={{transform: `scale(${s})`, opacity: s}}>
              <Person s={50} c={i === 0 ? OR : 'rgba(255,255,255,0.35)'} />
            </div>
          );
        })}
      </Abs>
      <Abs x={0} y={1090} w={1080} style={{textAlign: 'center', fontSize: 110, fontWeight: 900, color: OR, opacity: interpolate(f, [at(0.55), at(0.55) + 6], [0, 1], clamp), transform: `scale(${interpolate(f, [at(0.55), at(0.55) + 8], [1.4, 1], {...clamp, easing: expo})})`}}>
        = 20 PEOPLE
      </Abs>
    </Shot>
  );
};

/* 2 ===== vitamin vs painkiller ===== */
const Capsule: React.FC<{w: number; h: number; a: string; b: string; rot: number; glow?: boolean}> = ({w, h, a, b, rot, glow}) => (
  <div style={{width: w, height: h, borderRadius: h / 2, transform: `rotate(${rot}deg)`, overflow: 'hidden', display: 'flex', boxShadow: glow ? `0 0 120px rgba(255,122,26,0.65)` : 'none'}}>
    <div style={{flex: 1, background: a}} />
    <div style={{flex: 1, background: b}} />
  </div>
);
const Painkiller: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const at = useAt();
  const drop = useSpring(at(0.3), 9);
  const fadeV = interpolate(f, [at(0.25), at(0.4)], [1, 0.18], clamp);
  return (
    <Shot vo={vo}>
      <Sfx at={at(0.3)} name="ding" vol={0.3} dur={40} />
      <Abs x={190} y={280} style={{opacity: fadeV, transform: `translateY(${interpolate(f, [at(0.25), at(0.4)], [0, 40], clamp)}px)`}}>
        <Capsule w={700} h={240} a="#cfd3da" b="#9aa3b2" rot={-12} />
      </Abs>
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center', fontSize: 52, color: DIM, fontWeight: 800, letterSpacing: 4, opacity: fadeV}}>VITAMIN · nice to have</Abs>
      <Abs x={190} y={interpolate(drop, [0, 1], [-400, 700])} style={{}}>
        <Capsule w={700} h={240} a={OR} b="#ffd2a6" rot={8} glow />
      </Abs>
      <Abs x={0} y={1000} w={1080} style={{textAlign: 'center', fontSize: 52, color: OR, fontWeight: 900, letterSpacing: 4, opacity: interpolate(f, [at(0.45), at(0.55)], [0, 1], clamp)}}>PAINKILLER · must have</Abs>
      <Abs x={0} y={1110} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontSize: 96, fontWeight: 800, color: '#fff', opacity: interpolate(f, [at(0.5), at(0.6)], [0, 1], clamp)}}>
        <Counter from={9} to={900} start={at(0.5)} end={at(0.95)} pre="$" />
      </Abs>
    </Shot>
  );
};

/* 3 ===== inbox ===== */
const Inbox: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const at = useAt();
  const rows = ['Invoice #2041', 'Can we move Tuesday?', 'Quick question about pricing', 'Re: onboarding docs', 'New client enquiry', 'Contract for review'];
  return (
    <Shot vo={vo} rung={0}>
      <Abs x={190} y={170} style={{width: 700, height: 1130, borderRadius: 64, background: '#151518', border: '3px solid #3a3a42', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.6)'}}>
        <div style={{padding: '36px 34px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <div style={{fontSize: 46, fontWeight: 800, color: '#fff'}}>Inbox</div>
          <div style={{fontFamily: MONO, fontSize: 44, color: OR, fontWeight: 800}}>
            <Counter from={47} to={0} start={at(0.2)} end={at(0.8)} /> unread
          </div>
        </div>
        {rows.map((r, i) => {
          const done = f > at(0.2) + i * 8;
          const s = interpolate(f, [i * 3, i * 3 + 8], [0, 1], {...clamp, easing: expo});
          return (
            <div key={r} style={{margin: '0 24px 18px', padding: '22px 26px', borderRadius: 24, background: done ? 'rgba(255,122,26,0.14)' : CARD, border: `2px solid ${done ? OR : 'transparent'}`, opacity: s, transform: `translateX(${(1 - s) * 80}px)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize: 33, color: '#fff', fontWeight: 600}}>{r}</div>
              <div style={{fontSize: 26, color: done ? OR : DIM, fontWeight: 800, fontFamily: MONO}}>{done ? 'DRAFTED ✓' : '...'}</div>
            </div>
          );
        })}
        <Abs x={0} y={820} w={700} style={{textAlign: 'center', opacity: interpolate(f, [at(0.75), at(0.85)], [0, 1], clamp)}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 22, padding: '20px 40px', borderRadius: 60, background: OR, color: '#1a0f05', fontSize: 52, fontWeight: 900}}>☀ 9:00 · mornings back</div>
        </Abs>
        <Abs x={0} y={960} w={700} style={{display: 'flex', justifyContent: 'center'}}><BotDot s={90} glow /></Abs>
      </Abs>
    </Shot>
  );
};

/* 4 ===== delivery ===== */
const Delivery: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const at = useAt();
  const steps = [['PAID ✓', 'Payment clears', '$'], ['Welcome email', 'Sent in seconds', '✉'], ['Intake form', 'Answers fill themselves', '☑'], ['Client board', 'Card moves to “Onboarding”', '▦']];
  return (
    <Shot vo={vo} rung={1}>
      {steps.map(([t, s, ic], i) => {
        const st = at(0.08 + i * 0.2);
        const p = interpolate(f, [st, st + 10], [0, 1], {...clamp, easing: expo});
        return (
          <React.Fragment key={t}>
            <Sfx at={st} name={`tick${(i % 3) + 1}`} vol={0.22} dur={20} />
            <Abs x={120} y={190 + i * 270} style={{width: 840, height: 220, borderRadius: 36, background: i === 0 ? OR : CARD, display: 'flex', alignItems: 'center', gap: 36, padding: '0 44px', opacity: p, transform: `translateX(${(1 - p) * 300}px) scale(${0.9 + 0.1 * p})`}}>
              <div style={{width: 110, height: 110, borderRadius: 30, background: i === 0 ? '#1a0f05' : 'rgba(255,122,26,0.18)', color: i === 0 ? OR : OR, fontSize: 60, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ic}</div>
              <div>
                <div style={{fontSize: 56, fontWeight: 900, color: i === 0 ? '#1a0f05' : '#fff'}}>{t}</div>
                <div style={{fontSize: 34, color: i === 0 ? 'rgba(26,15,5,0.7)' : DIM, fontWeight: 600}}>{s}</div>
              </div>
            </Abs>
            {i < 3 ? <Abs x={530} y={190 + i * 270 + 222} style={{width: 6, height: 46, background: OR, opacity: p * 0.7}}>{null}</Abs> : null}
          </React.Fragment>
        );
      })}
    </Shot>
  );
};

/* 5 ===== marketing: lead cascade ===== */
const Marketing: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const at = useAt();
  const names = ['Maya R.', 'Daniel K.', 'Priya S.', 'Tom W.', 'Lena B.', 'Omar H.', 'Ava C.', 'Ben T.', 'Sofia M.', 'Jack L.'];
  const n = Math.min(10, Math.max(0, Math.floor((f - 4) / ((at(0.8) - 4) / 10)) + 1));
  return (
    <Shot vo={vo} rung={2}>
      <Abs x={0} y={150} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontSize: 130, fontWeight: 800, color: OR}}>
        {n}<span style={{color: DIM, fontSize: 70}}> / 10 leads</span>
      </Abs>
      {names.map((nm, i) => {
        const st = 4 + i * ((at(0.8) - 4) / 10);
        const p = interpolate(f, [st, st + 7], [0, 1], {...clamp, easing: expo});
        const last = i === 9;
        const col = i % 2, row = Math.floor(i / 2);
        return (
          <React.Fragment key={nm}>
            <Sfx at={st} name={`tick${(i % 3) + 1}`} vol={0.18} dur={16} />
            <Abs x={75 + col * 470} y={330 + row * 190} style={{width: 440, height: 160, borderRadius: 28, background: last ? 'rgba(255,122,26,0.18)' : CARD, border: `2px solid ${last ? OR : 'transparent'}`, padding: '24px 28px', opacity: p, transform: `translateY(${(1 - p) * -120}px) scale(${0.85 + 0.15 * p})`}}>
              <div style={{fontSize: 38, fontWeight: 800, color: '#fff'}}>{nm}</div>
              <div style={{fontSize: 26, color: last ? OR : DIM, fontWeight: 700, marginTop: 8}}>{last ? '📞 booked a call' : 'qualified · ready'}</div>
            </Abs>
          </React.Fragment>
        );
      })}
    </Shot>
  );
};

/* 6 ===== sales: call ===== */
const Sales: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const at = useAt();
  const tag = (st: number, y: number, t: string, x: number) => {
    const p = interpolate(f, [st, st + 9], [0, 1], {...clamp, easing: expo});
    return (
      <Abs x={x} y={y} style={{padding: '20px 34px', borderRadius: 50, background: OR, color: '#1a0f05', fontSize: 44, fontWeight: 900, opacity: p, transform: `scale(${0.6 + 0.4 * p})`}}>{t}</Abs>
    );
  };
  return (
    <Shot vo={vo} rung={3}>
      <Sfx at={at(0.3)} name="pop1" vol={0.3} dur={20} />
      <Abs x={0} y={170} w={1080} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', inset: -50 - (f % 30) * 1.2, borderRadius: '50%', border: `3px solid rgba(255,122,26,${0.5 - (f % 30) / 70})`}} />
          <BotDot s={300} glow />
        </div>
      </Abs>
      <Abs x={0} y={560} w={1080} style={{textAlign: 'center', fontSize: 50, color: '#fff', fontWeight: 800}}>Calling new lead…</Abs>
      <Abs x={90} y={680} w={900} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 240}}>
        {Array.from({length: 28}).map((_, i) => (
          <div key={i} style={{width: 18, borderRadius: 9, background: OR, height: 30 + Math.abs(Math.sin(f * 0.25 + i * 0.7)) * 190 * (0.5 + 0.5 * Math.sin(i * 0.5 + f * 0.05) ** 2)}} />
        ))}
      </Abs>
      {tag(at(0.4), 980, '✓ QUALIFIED', 90)}
      {tag(at(0.62), 1090, 'MOCK CALL · 8/10', 330)}
      {tag(at(0.8), 1200, '📝 CRM updated', 150)}
    </Shot>
  );
};

/* 7 ===== brain ===== */
const Brain: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const at = useAt();
  const cx = 540, cy = 650, R = 380;
  const nodes = [['INBOX', -90], ['DELIVERY', 0], ['MARKETING', 90], ['SALES', 180]].map(([t, a]) => ({t: t as string, x: cx + R * Math.cos(((a as number) * Math.PI) / 180), y: cy + R * Math.sin(((a as number) * Math.PI) / 180)}));
  const pulse = 1 + Math.sin(f * 0.18) * 0.04;
  const k = Math.floor((f / 14) % 4);
  const tt = (f % 14) / 14;
  const a = nodes[k], b = nodes[(k + 1) % 4];
  return (
    <Shot vo={vo} rung={4}>
      <Sfx at={at(0.25)} name="ding" vol={0.28} dur={40} />
      <svg width={1080} height={1380} style={{position: 'absolute', left: 0, top: 0}}>
        {nodes.map((n, i) => {
          const p = interpolate(f, [8 + i * 6, 22 + i * 6], [0, 1], clamp);
          return <line key={i} x1={cx} y1={cy} x2={cx + (n.x - cx) * p} y2={cy + (n.y - cy) * p} stroke={OR} strokeWidth={5} strokeOpacity={0.75} />;
        })}
        {f > at(0.5) ? <circle cx={a.x + (b.x - a.x) * tt} cy={a.y + (b.y - a.y) * tt} r={14} fill="#fff" /> : null}
        {f > at(0.5) ? nodes.map((n, i) => <line key={'r' + i} x1={n.x} y1={n.y} x2={nodes[(i + 1) % 4].x} y2={nodes[(i + 1) % 4].y} stroke={OR} strokeOpacity={0.3} strokeWidth={3} strokeDasharray="10 10" />) : null}
      </svg>
      <Abs x={cx - 190 * pulse} y={cy - 190 * pulse} style={{width: 380 * pulse, height: 380 * pulse, borderRadius: '50%', background: `radial-gradient(circle at 40% 35%, #ffb070, ${OR} 55%, #8a2d05)`, boxShadow: '0 0 160px rgba(255,122,26,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#1a0f05', fontSize: 50, fontWeight: 900, lineHeight: 1.05}}>
        SHARED<br />BRAIN
      </Abs>
      {nodes.map((n, i) => {
        const p = interpolate(f, [4 + i * 6, 14 + i * 6], [0, 1], {...clamp, easing: expo});
        return (
          <Abs key={n.t} x={n.x - 130} y={n.y - 45} style={{width: 260, height: 90, borderRadius: 45, background: CARD, border: `3px solid ${OR}`, color: '#fff', fontSize: 34, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`}}>
            {n.t}
          </Abs>
        );
      })}
    </Shot>
  );
};

/* 8 ===== close: pull back, full ladder ===== */
const Close: React.FC<{vo: string}> = ({vo}) => {
  const f = useCurrentFrame();
  const at = useAt();
  const rungs = ['BRAIN', 'SALES', 'MARKETING', 'DELIVERY', 'INBOX'];
  const zoom = interpolate(f, [0, at(0.9)], [1.25, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Shot vo={vo} rung={4}>
      <Sfx at={at(0.55)} name="ding" vol={0.3} dur={40} />
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1380, transform: `scale(${zoom})`, transformOrigin: '50% 80%'}}>
        <Abs x={0} y={110} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: interpolate(f, [at(0.3), at(0.45)], [0, 1], clamp)}}>
          <Person s={110} c="#fff" />
        </Abs>
        {rungs.map((r, i) => {
          const st = 6 + (4 - i) * 9;
          const p = interpolate(f, [st, st + 9], [0, 1], {...clamp, easing: expo});
          return (
            <Abs key={r} x={160} y={340 + i * 195} style={{width: 760, height: 150, borderRadius: 30, background: i === 0 ? OR : CARD, border: `3px solid ${OR}`, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', opacity: p, transform: `translateY(${(1 - p) * 60}px)`}}>
              <BotDot s={90} glow={i === 0} />
              <div style={{fontSize: 56, fontWeight: 900, color: i === 0 ? '#1a0f05' : '#fff', letterSpacing: 2}}>{r}</div>
            </Abs>
          );
        })}
        <Abs x={110} y={300} style={{width: 6, height: 940, background: `linear-gradient(${OR}, transparent)`, opacity: 0.6}}>{null}</Abs>
        <Abs x={964} y={300} style={{width: 6, height: 940, background: `linear-gradient(${OR}, transparent)`, opacity: 0.6}}>{null}</Abs>
      </div>
      <Abs x={0} y={1640} w={1080} style={{textAlign: 'center', opacity: interpolate(f, [at(0.7), at(0.85)], [0, 1], clamp)}}>
        <div style={{display: 'inline-block', padding: '26px 56px', borderRadius: 60, background: OR, color: '#1a0f05', fontSize: 54, fontWeight: 900}}>FULL 12-MIN VIDEO ↑</div>
      </Abs>
    </Shot>
  );
};

const SCENES: Record<string, React.FC<{vo: string}>> = {hook: Hook, painkiller: Painkiller, inbox: Inbox, delivery: Delivery, marketing: Marketing, sales: Sales, brain: Brain, close: Close};

const slides = slidesJson as SlideRow[];
export const SHORT_LADDER_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

export const ShortLadder: React.FC = () => {
  let from = 0;
  const total = SHORT_LADDER_FRAMES;
  return (
    <AbsoluteFill style={{background: '#121214'}}>
      <Audio src={staticFile('shared/sfx/bed.wav')} loop volume={(f) => 0.1 * interpolate(f, [0, 20, total - 60, total], [0, 1, 1, 0], clamp)} />
      {slides.map((s, i) => {
        const Scene = SCENES[s.id];
        const start = from;
        from += s.frames;
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`one-person/short-ladder/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Scene vo={s.vo} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
