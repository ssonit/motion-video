import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Mascot} from '../../lib/Mascot';
import {Pop} from '../../lib/Pop';
import {AppWindow, At, Beams, D, Float, Glow, IconCard, Laptop, Phone, mono} from '../../lib/Art';
import {Chip, Em, Slide, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {
  Bloom,
  Castle,
  CityWindow,
  Cooler,
  Desk,
  HoloOrg,
  Lamp,
  Monitor,
  MiniUI,
  Mug,
  Palm,
  Plant,
  Poster,
  Sunset,
  Vignette,
  Wires,
} from '../../lib/Env';

const Art: React.FC<P & {children: React.ReactNode}> = ({n, vo, children}) => (
  <Slide n={n} vo={vo} bg="none" bare eyebrow="">
    {children}
    <Vignette />
  </Slide>
);

/* ===== 01 · Hero desk at night (intro) ===== */
export const HeroDesk: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const chips = ['Install', 'Core idea', 'First Bot', 'Devices', 'Real work', 'Solo company'];
  return (
    <Slide
      n={n}
      vo={vo}
      bg="none"
      eyebrow="Beginner's guide"
      head={
        <>
          Your first AI
          <br />
          <Em>Bot employee</Em>
        </>
      }
    >
      <AbsoluteFill style={{background: 'linear-gradient(180deg,#0d1030 0%,#1b1840 70%,#2a1c40 100%)'}} />
      <CityWindow x={700} y={40} w={520} h={300} seed={11} />
      <Desk y={470} />
      <At x={440} y={238}>
        <Plant size={150} />
      </At>
      <At x={470} y={230}>
        <Lamp />
      </At>
      <Pop at={at(0.1)} style={{position: 'absolute', left: 590, top: 245}}>
        <Monitor w={290} h={180} rot={9} kind="timeline" glow={D.blue} />
      </Pop>
      <Pop at={at(0.14)} style={{position: 'absolute', left: 940, top: 245}}>
        <Monitor w={290} h={180} rot={-9} kind="chat" glow={D.orange} />
      </Pop>
      <Bloom x={860} y={380} r={260} c="#FF7A2F" o={0.3} />
      <Pop at={at(0.2)} style={{position: 'absolute', left: 760, top: 240}}>
        <Mascot color={D.orange} size={250} satellite acc="headphones" />
      </Pop>
      <Pop at={at(0.3)} style={{position: 'absolute', left: 700, top: 150}}>
        <Float phase={4}>
          <IconCard kind="calendar" size={70} />
        </Float>
      </Pop>
      <Pop at={at(0.36)} style={{position: 'absolute', left: 1040, top: 130}}>
        <Float phase={14}>
          <IconCard kind="chart" size={64} color={D.mint} />
        </Float>
      </Pop>
      <Pop at={at(0.42)} style={{position: 'absolute', left: 1150, top: 395}}>
        <Float phase={24}>
          <IconCard kind="doc" size={60} color={D.blue} />
        </Float>
      </Pop>
      <At x={1090} y={420}>
        <Mug />
      </At>
      <At x={72} y={300} style={{display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 10, justifyContent: 'start'}}>
        {chips.map((c, i) => (
          <Chip key={c} at={at(0.25) + i * 7} size={20}>
            {String(i + 1).padStart(2, '0')} · {c}
          </Chip>
        ))}
      </At>
      <Vignette strength={0.45} />
    </Slide>
  );
};

/* ===== 04 · Night command room ===== */
export const Command: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  return (
    <Art n={n} vo={vo}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg,#0a0d26 0%,#15103a 100%)'}} />
      <Bloom x={640} y={300} r={420} c="#5B8CFF" o={0.3} />
      <CityWindow x={40} y={50} w={260} h={240} seed={21} />
      <Desk y={500} top="#4b3225" bottom="#1b110c" />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 330, top: 120}}>
        <Monitor w={620} h={330} glow={D.blue}>
          <div style={{transform: 'scale(2.1)', transformOrigin: '0 0', width: '47.6%', height: '47.6%'}}>
            <MiniUI kind="chat" accent={D.orange} />
          </div>
        </Monitor>
      </Pop>
      <Pop at={at(0.25)} style={{position: 'absolute', left: 100, top: 300}}>
        <Float phase={3}>
          <div style={{width: 210, background: 'rgba(30,60,140,0.55)', border: '2px solid #59d9ff', borderRadius: 16, padding: 12, boxShadow: '0 0 40px rgba(89,217,255,0.35)', color: '#fff', fontWeight: 800, fontSize: 20}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <Mascot color={D.mint} size={44} />
              Writer Bot
            </div>
            <div style={{height: 70, marginTop: 8}}>
              <MiniUI kind="code" accent={D.mint} />
            </div>
          </div>
        </Float>
      </Pop>
      <Pop at={at(0.35)} style={{position: 'absolute', left: 960, top: 190}}>
        <Float phase={12}>
          <div style={{width: 210, background: 'rgba(90,30,120,0.55)', border: '2px solid #d58cff', borderRadius: 16, padding: 12, boxShadow: '0 0 40px rgba(213,140,255,0.35)', color: '#fff', fontWeight: 800, fontSize: 20}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <Mascot color={D.pink} size={44} />
              Design Bot
            </div>
            <div style={{height: 70, marginTop: 8}}>
              <MiniUI kind="grid" accent={D.pink} />
            </div>
          </div>
        </Float>
      </Pop>
      <Pop at={at(0.45)} style={{position: 'absolute', left: 990, top: 420}}>
        <Float phase={22}>
          <IconCard kind="play" size={68} color={D.blue} />
        </Float>
      </Pop>
      <Pop at={at(0.2)} style={{position: 'absolute', left: 560, top: 360}}>
        <Mascot color={D.orange} size={190} acc="glasses" />
      </Pop>
      <Bloom x={1120} y={600} r={140} c="#FFD58A" o={0.25} />
    </Art>
  );
};

/* ===== 09 · Tangled desk (before) ===== */
export const Tangled: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  return (
    <Art n={n} vo={vo}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg,#12121c 0%,#1d1a26 100%)'}} />
      <Desk y={430} top="#4a3a30" bottom="#1a120e" />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 60, top: 200}}>
        <Monitor w={300} h={190} rot={14} kind="chart" accent={D.blue} glow={D.blue} />
      </Pop>
      <Pop at={at(0.16)} style={{position: 'absolute', left: 930, top: 190}}>
        <Monitor w={300} h={190} rot={-14} kind="code" accent={D.mint} glow={D.mint} />
      </Pop>
      <Pop at={at(0.22)} style={{position: 'absolute', left: 430, top: 250}}>
        <Laptop w={260} h={160}>
          <MiniUI kind="grid" accent={D.pink} />
        </Laptop>
      </Pop>
      <Pop at={at(0.28)} style={{position: 'absolute', left: 770, top: 330}}>
        <Phone w={96} h={190}>
          <MiniUI kind="chat" accent={D.orange} />
        </Phone>
      </Pop>
      <Wires seed={4} count={18} />
      <Pop at={at(0.34)} style={{position: 'absolute', left: 590, top: 340}}>
        <Mascot color={D.orange} size={170} acc="glasses" />
      </Pop>
      {['?', '!', '?!'].map((t, i) => (
        <Pop key={t} at={at(0.45) + i * 8} style={{position: 'absolute', left: 560 + i * 90, top: 280 - (i % 2) * 36}}>
          <Float phase={i * 9}>
            <div style={{fontSize: 56, fontWeight: 800, color: '#FFD34D', textShadow: '0 4px 20px rgba(0,0,0,0.6)'}}>{t}</div>
          </Float>
        </Pop>
      ))}
    </Art>
  );
};

/* ===== 10 · Devices linked by rings ===== */
export const Ring: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const ring = (rx: number, ry: number, rot: number, c: string, dash: string) => (
    <ellipse cx={640} cy={380} rx={rx} ry={ry} fill="none" stroke={c} strokeWidth={3} strokeDasharray={dash} strokeDashoffset={-f * 2} transform={`rotate(${rot} 640 380)`} opacity={0.75} />
  );
  return (
    <Art n={n} vo={vo}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg,#070b1e 0%,#101a3c 100%)'}} />
      <Desk y={520} top="#3b2a22" bottom="#140d0a" />
      <Bloom x={640} y={380} r={380} c="#5B8CFF" o={0.3} />
      <svg width="1280" height="720" viewBox="0 0 1280 720" style={{position: 'absolute', left: 0, top: 0}}>
        {ring(330, 120, -8, '#59d9ff', '14 10')}
        {ring(420, 160, 6, '#8ea2ff', '4 10')}
        {ring(250, 90, 0, '#FFB36A', '20 8')}
      </svg>
      <Beams
        lines={[
          {x1: 280, y1: 360, x2: 590, y2: 380, c: D.blue},
          {x1: 1000, y1: 330, x2: 700, y2: 372, c: D.mint},
          {x1: 360, y1: 520, x2: 600, y2: 410, c: D.pink},
          {x1: 960, y1: 520, x2: 690, y2: 410, c: D.orange},
        ]}
      />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 70, top: 230}}>
        <Float phase={2}>
          <Laptop w={300} h={190}>
            <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Mascot color={D.orange} size={90} />
            </div>
          </Laptop>
        </Float>
      </Pop>
      <Pop at={at(0.16)} style={{position: 'absolute', left: 880, top: 160}}>
        <Float phase={9}>
          <Monitor w={330} h={200} rot={-10} glow={D.mint}>
            <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#143a5a,#0b1730)'}}>
              <Mascot color={D.orange} size={96} />
            </div>
          </Monitor>
        </Float>
      </Pop>
      <Pop at={at(0.22)} style={{position: 'absolute', left: 300, top: 500}}>
        <Float phase={15}>
          <Phone w={110} h={210} glow="rgba(255,95,162,0.4)">
            <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Mascot color={D.orange} size={60} />
            </div>
          </Phone>
        </Float>
      </Pop>
      <Pop at={at(0.28)} style={{position: 'absolute', left: 900, top: 480}}>
        <Float phase={21}>
          <div style={{width: 230, height: 160, borderRadius: 16, background: '#07070B', border: '5px solid #3A3A47', boxShadow: '0 0 40px rgba(255,122,47,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-6deg)'}}>
            <Mascot color={D.orange} size={70} />
          </div>
        </Float>
      </Pop>
      <Pop at={at(0.32)} style={{position: 'absolute', left: 540, top: 300}}>
        <Mascot color={D.orange} size={200} satellite acc="headphones" />
      </Pop>
    </Art>
  );
};

/* ===== 13 · Team at desks (bright office) ===== */
export const TeamDesks: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const crew = [
    {t: 'Topic', c: D.blue, acc: 'glasses' as const, cx: 130, kind: 'chart' as const},
    {t: 'Write', c: D.mint, acc: 'headphones' as const, cx: 385, kind: 'code' as const},
    {t: 'Assets', c: D.violet, acc: 'cap' as const, cx: 640, kind: 'grid' as const},
    {t: 'Edit', c: D.pink, acc: 'tie' as const, cx: 895, kind: 'timeline' as const},
    {t: 'Design', c: D.yellow, acc: 'glasses' as const, cx: 1150, kind: 'grid' as const},
  ];
  return (
    <Art n={n} vo={vo}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg,#ffe3b8 0%,#ffb27a 55%,#f08a63 100%)'}} />
      <div style={{position: 'absolute', left: 120, top: 40, width: 1040, height: 190, borderRadius: 14, border: '8px solid #fff3e0', background: 'linear-gradient(180deg,#8fd0ff,#ffe9c6)', boxShadow: '0 0 80px rgba(255,255,255,0.5)'}}>
        <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, transparent 0 250px, #fff3e0 250px 258px)'}} />
      </div>
      <Bloom x={1000} y={120} r={300} c="#fff6d0" o={0.7} />
      <Desk y={470} top="#b97a52" bottom="#6b3f2b" />
      <Beams lines={crew.slice(0, -1).map((k, i) => ({x1: k.cx + 60, y1: 360, x2: crew[i + 1].cx - 60, y2: 360, c: '#2f7bff', d: i * 0.25}))} />
      {crew.map((k, i) => (
        <React.Fragment key={k.t}>
          <Pop at={at(0.08) + i * 7} style={{position: 'absolute', left: k.cx - 85, top: 282}}>
            <Monitor w={170} h={105} rot={i < 2 ? 12 : i > 2 ? -12 : 0} glow={k.c} kind={k.kind} accent={k.c} />
          </Pop>
          <Pop at={at(0.14) + i * 7} style={{position: 'absolute', left: k.cx - 50, top: 398}}>
            <Mascot color={k.c} size={100} phase={i * 17} acc={k.acc} />
          </Pop>
          <At x={k.cx - 60} y={246} style={{width: 120, display: 'flex', justifyContent: 'center'}}>
            <Chip at={at(0.3) + i * 8} size={20} hl={i === 4}>
              {k.t}
            </Chip>
          </At>
        </React.Fragment>
      ))}
    </Art>
  );
};

/* ===== 15 · Footage / editing gear ===== */
export const Footage: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const knobs = [0, 1, 2, 3, 4, 5];
  return (
    <Art n={n} vo={vo}>
      <AbsoluteFill style={{background: 'linear-gradient(135deg,#06121a 0%,#0b2530 60%,#103a3a 100%)'}} />
      {[[200, 160, 90, '#5ad6c1'], [520, 120, 60, '#5B8CFF'], [900, 100, 80, '#ffb36a'], [1180, 200, 70, '#5ad6c1'], [700, 560, 100, '#5B8CFF']].map(([x, y, r, c], i) => (
        <div key={i} style={{filter: 'blur(14px)'}}>
          <Bloom x={x as number} y={y as number} r={r as number} c={c as string} o={0.35} />
        </div>
      ))}
      <Desk y={500} top="#2d3b3a" bottom="#0e1616" />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 90, top: 280}}>
        <svg width="320" height="230" viewBox="0 0 320 230" style={{overflow: 'visible'}}>
          <rect x="20" y="30" width="280" height="170" rx="22" fill="#23262e" />
          <rect x="100" y="8" width="90" height="32" rx="8" fill="#2f333d" />
          <circle cx="160" cy="118" r="76" fill="#111319" />
          <circle cx="160" cy="118" r="60" fill="#1b2130" />
          <circle cx="160" cy="118" r="38" fill="#0b1226" />
          <circle cx="148" cy="106" r="11" fill="#6fa8ff" opacity="0.8" />
          <rect x="236" y="50" width="48" height="16" rx="6" fill="#C9372C" />
        </svg>
      </Pop>
      <Pop at={at(0.2)} style={{position: 'absolute', left: 420, top: 390}}>
        <div style={{width: 330, height: 120, borderRadius: 14, background: 'linear-gradient(#2c3340,#171b24)', boxShadow: '0 0 40px rgba(60,255,170,0.25)', padding: 14, display: 'flex', gap: 12, alignItems: 'center', transform: 'perspective(700px) rotateX(18deg)'}}>
          <div style={{width: 100, height: 70, borderRadius: 8, background: '#06130e', border: '2px solid #3cffaa', color: '#3cffaa', fontFamily: mono.fontFamily, fontSize: 36, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {String(30 + (Math.floor(f / 10) % 5)).padStart(2, '0')}
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, flex: 1}}>
            {knobs.map((k) => (
              <div key={k} style={{width: 34, height: 34, borderRadius: '50%', background: '#0f1218', border: '3px solid #4a5163', position: 'relative'}}>
                <div style={{position: 'absolute', left: 14, top: 3, width: 3, height: 12, background: '#3cffaa', transform: `rotate(${(k * 50 + f) % 360}deg)`, transformOrigin: '2px 14px'}} />
              </div>
            ))}
          </div>
        </div>
      </Pop>
      <Pop at={at(0.3)} style={{position: 'absolute', left: 790, top: 200}}>
        <Monitor w={420} h={250} rot={-8} glow={D.mint} kind="timeline" accent={D.mint} />
      </Pop>
      <At x={805} y={165} style={{display: 'flex', gap: 8}}>
        {[D.blue, D.pink, D.yellow, D.violet].map((c, i) => (
          <Pop key={i} at={at(0.4) + i * 6}>
            <div style={{width: 84, height: 50, borderRadius: 8, background: c, opacity: 0.9}} />
          </Pop>
        ))}
      </At>
      <Pop at={at(0.25)} style={{position: 'absolute', left: 560, top: 250}}>
        <Mascot color={D.orange} size={150} acc="headphones" />
      </Pop>
    </Art>
  );
};

/* ===== 17 · Covers in every size ===== */
export const Covers: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  return (
    <Art n={n} vo={vo}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 30%, #3a2a6a 0%, #120d26 70%)'}} />
      <Bloom x={640} y={200} r={420} c="#9a7bff" o={0.25} />
      <Desk y={560} top="#2a2036" bottom="#100a1a" />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 80, top: 290}}>
        <Mascot color={D.pink} size={190} acc="cap" satellite />
      </Pop>
      <Pop at={at(0.2)} style={{position: 'absolute', left: 330, top: 160}}>
        <Poster w={190} h={338} title="DEEP MOUNTAIN" c1="#2d4b8f" c2="#0e1330" shape="peak" rot={16} sub="9:16" />
      </Pop>
      <Pop at={at(0.3)} style={{position: 'absolute', left: 560, top: 200}}>
        <Poster w={260} h={298} title="NIGHT RIDER" c1="#e34b6a" c2="#2a0f34" shape="rider" rot={0} sub="1:1" />
      </Pop>
      <Pop at={at(0.4)} style={{position: 'absolute', left: 850, top: 235}}>
        <Poster w={340} h={263} title="NEW SERIES" c1="#ff9a4a" c2="#5b1f6a" shape="sun" rot={-16} sub="16:9" />
      </Pop>
      {[['9:16', 392], ['1:1', 660], ['16:9', 990]].map(([c, x], i) => (
        <At key={c as string} x={x as number} y={512}>
          <Chip at={at(0.55) + i * 8} size={20} hl={i === 1}>
            {c as string}
          </Chip>
        </At>
      ))}
    </Art>
  );
};

/* ===== 33 · Over-designed org chart ===== */
export const TrapOffice: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  return (
    <Art n={n} vo={vo}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg,#0c1424 0%,#1b2a44 100%)'}} />
      <Bloom x={640} y={200} r={380} c="#59d9ff" o={0.22} />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 340, top: 60}}>
        <Float amp={5} speed={20}>
          <HoloOrg tangled w={600} h={320} />
        </Float>
      </Pop>
      <Desk y={500} top="#5a6b82" bottom="#1d2634" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{position: 'absolute', left: 120 + i * 190, top: 478 + (i % 2) * 8, width: 110, height: 62, background: '#e9edf5', opacity: 0.9, borderRadius: 4, transform: `rotate(${(i - 2.5) * 5}deg)`}} />
      ))}
      {[0, 1, 2].map((i) => (
        <Pop key={i} at={at(0.25) + i * 8} style={{position: 'absolute', left: 300 + i * 270, top: 360}}>
          <Mascot color={[D.orange, D.blue, D.violet][i]} size={130} phase={i * 14} acc={(['glasses', 'headphones', 'tie'] as const)[i]} />
        </Pop>
      ))}
      <Pop at={at(0.5)} style={{position: 'absolute', left: 720, top: 300}}>
        <Float>
          <div style={{fontSize: 70, fontWeight: 800, color: '#FFD34D', textShadow: '0 6px 24px rgba(0,0,0,0.6)'}}>?!</div>
        </Float>
      </Pop>
    </Art>
  );
};

/* ===== 37 · Water cooler ===== */
export const WaterIll: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  return (
    <Art n={n} vo={vo}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg,#ffe8cc 0%,#ffcfa1 100%)'}} />
      <div style={{position: 'absolute', left: 840, top: 40, width: 340, height: 260, borderRadius: 12, border: '8px solid #fff', background: 'linear-gradient(180deg,#9bd7ff,#ffeccf)'}} />
      <Bloom x={1000} y={170} r={260} c="#fff6d0" o={0.7} />
      <Desk y={560} top="#c68f63" bottom="#7a4d33" />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 120, top: 120}}>
        <Cooler size={300} />
      </Pop>
      <Pop at={at(0.25)} style={{position: 'absolute', left: 470, top: 330}}>
        <Mascot color={D.orange} size={210} acc="glasses" satellite />
      </Pop>
      <Pop at={at(0.4)} style={{position: 'absolute', left: 790, top: 330}}>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{position: 'relative', width: 54, height: 160 + (i % 2) * 10}}>
              <div style={{position: 'absolute', left: 17, top: 0, width: 20, height: 16, borderRadius: 4, background: '#2f6fe0'}} />
              <div style={{position: 'absolute', left: 4, top: 14, width: 46, height: 140, borderRadius: 18, background: 'linear-gradient(90deg,rgba(120,190,255,0.85),rgba(210,235,255,0.9),rgba(120,190,255,0.85))', border: '2px solid rgba(255,255,255,0.8)'}} />
            </div>
          ))}
        </div>
      </Pop>
      <At x={120} y={496} style={{width: 300, display: 'flex', justifyContent: 'center'}}>
        <Chip at={at(0.55)} size={22}>
          One heavy jug
        </Chip>
      </At>
      <At x={790} y={512} style={{width: 330, display: 'flex', justifyContent: 'center'}}>
        <Chip at={at(0.65)} size={22} hl>
          A case of bottles
        </Chip>
      </At>
    </Art>
  );
};

/* ===== 39 · Beach ===== */
export const Beach: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <Art n={n} vo={vo}>
      <Sunset sky={['#2b1a5c', '#d6567a', '#ffb36a']} sunX={930} sunY={380} hills={['#3a2a5e', '#2a1f48', '#171031']} />
      <div style={{position: 'absolute', left: 0, top: 470, width: 1280, height: 250, background: 'linear-gradient(180deg,#e0823f 0%,#6e3a6a 40%,#1b1238 100%)'}} />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{position: 'absolute', left: 700 + i * 70 - ((f * 0.6 + i * 12) % 40), top: 490 + i * 28, width: 220 - i * 30, height: 4, borderRadius: 2, background: 'rgba(255,230,180,0.5)'}} />
      ))}
      <At x={60} y={150}>
        <Palm size={340} />
      </At>
      <At x={250} y={320}>
        <Palm size={200} />
      </At>
      <Pop at={at(0.15)} style={{position: 'absolute', left: 520, top: 230}}>
        <div style={{transform: 'rotate(-9deg)'}}>
          <Phone w={230} h={420} glow="rgba(255,150,90,0.5)">
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, paddingTop: 20}}>
              <Mascot color={D.orange} size={100} />
              <div style={{background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 20, padding: '8px 20px', borderRadius: 999}}>Done ✓</div>
              <div style={{width: 150, height: 10, borderRadius: 5, background: '#2B2B38'}} />
              <div style={{width: 110, height: 10, borderRadius: 5, background: '#2B2B38'}} />
            </div>
          </Phone>
        </div>
      </Pop>
      <Beams lines={[{x1: 690, y1: 250, x2: 1010, y2: 140, c: '#FFE2A8'}]} />
      <Pop at={at(0.4)} style={{position: 'absolute', left: 960, top: 90}}>
        <Float>
          <IconCard kind="check" size={70} color="#FFE2A8" />
        </Float>
      </Pop>
    </Art>
  );
};

/* ===== 40 · The dream: commanding from afar ===== */
export const Dream: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const stations = [
    {t: 'Topic', x: 140, y: 470, c: D.blue},
    {t: 'Write', x: 330, y: 420, c: D.mint},
    {t: 'Assets', x: 520, y: 380, c: D.violet},
    {t: 'Edit', x: 700, y: 345, c: D.pink},
    {t: 'Design', x: 870, y: 315, c: D.yellow},
  ];
  return (
    <Art n={n} vo={vo}>
      <Sunset sky={['#1a1346', '#a4467f', '#ffb870']} sunX={640} sunY={300} hills={['#5a3068', '#3a2250', '#1f1233']} />
      <At x={780} y={110}>
        <Castle w={440} />
      </At>
      <Beams lines={stations.slice(0, -1).map((s, i) => ({x1: s.x + 40, y1: s.y + 50, x2: stations[i + 1].x + 40, y2: stations[i + 1].y + 50, c: '#6fb4ff', d: i * 0.2})).concat([{x1: 910, y1: 360, x2: 960, y2: 250, c: '#6fb4ff', d: 0.5}])} />
      {stations.map((s, i) => (
        <React.Fragment key={s.t}>
          <Pop at={at(0.1) + i * 7} style={{position: 'absolute', left: s.x - 20, top: s.y - 30}}>
            <Mascot color={s.c} size={80} phase={i * 11} acc={(['glasses', 'headphones', 'cap', 'tie', 'glasses'] as const)[i]} />
          </Pop>
          <At x={s.x - 30} y={s.y - 62} style={{width: 120, display: 'flex', justifyContent: 'center'}}>
            <Chip at={at(0.3) + i * 6} size={16}>
              {s.t}
            </Chip>
          </At>
        </React.Fragment>
      ))}
      <div style={{position: 'absolute', left: 20, top: 400, width: 0, height: 0, borderLeft: '130px solid transparent', borderRight: '130px solid transparent', borderBottom: '170px solid #2b1a2f'}} />
      <Pop at={at(0.5)} style={{position: 'absolute', left: 70, top: 385}}>
        <Mascot color={D.orange} size={150} acc="crown" satellite />
      </Pop>
    </Art>
  );
};

