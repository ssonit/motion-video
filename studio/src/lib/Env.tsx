import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {D} from './Art';

/** Illustration kit: pseudo-3D environments (rooms, desks, monitors, skylines, hills…) drawn with SVG/CSS. */

export const rand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.55}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: 'none',
    }}
  />
);

export const Skyline: React.FC<{
  w: number;
  h: number;
  seed?: number;
  lit?: string;
  body?: string;
}> = ({w, h, seed = 3, lit = '#FFD98A', body = '#12162E'}) => {
  const r = rand(seed);
  const items: React.ReactNode[] = [];
  let x = 0;
  let k = 0;
  while (x < w) {
    const bw = 28 + r() * 46;
    const bh = h * (0.25 + r() * 0.65);
    const y = h - bh;
    items.push(<rect key={`b${k}`} x={x} y={y} width={bw} height={bh} fill={body} />);
    for (let wy = y + 8; wy < h - 8; wy += 12) {
      for (let wx = x + 5; wx < x + bw - 8; wx += 10) {
        if (r() < 0.38) {
          items.push(
            <rect key={`w${k}-${Math.round(wx)}-${Math.round(wy)}`} x={wx} y={wy} width={5} height={6} fill={lit} opacity={0.5 + r() * 0.5} />,
          );
        }
      }
    }
    x += bw + 2;
    k++;
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display: 'block'}}>
      {items}
    </svg>
  );
};

/** A window onto a night city. */
export const CityWindow: React.FC<{x: number; y: number; w: number; h: number; seed?: number}> = ({
  x,
  y,
  w,
  h,
  seed = 5,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 8,
      overflow: 'hidden',
      border: '7px solid #161a2e',
      background: 'linear-gradient(180deg,#1c1f55 0%,#4b2c6b 62%,#d77a5a 100%)',
      boxShadow: '0 0 80px rgba(120,140,255,0.25) inset',
    }}
  >
    <div style={{position: 'absolute', left: 0, bottom: 0}}>
      <Skyline w={w} h={h * 0.62} seed={seed} />
    </div>
    <div style={{position: 'absolute', left: w / 2 - 3, top: 0, width: 6, height: h, background: '#161a2e'}} />
  </div>
);

export const Desk: React.FC<{y: number; top?: string; bottom?: string}> = ({
  y,
  top = '#6b4630',
  bottom = '#241610',
}) => (
  <>
    <div style={{position: 'absolute', left: 0, top: y, width: 1280, height: 720 - y, background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`}} />
    <div style={{position: 'absolute', left: 0, top: y, width: 1280, height: 4, background: 'rgba(255,255,255,0.22)'}} />
    <div style={{position: 'absolute', left: 0, top: y + 4, width: 1280, height: 60, background: 'linear-gradient(180deg, rgba(0,0,0,0.35), transparent)'}} />
  </>
);

export const MiniUI: React.FC<{kind?: 'chat' | 'timeline' | 'grid' | 'code' | 'chart'; accent?: string}> = ({
  kind = 'chat',
  accent = D.orange,
}) => {
  const bar = (w: string, c = '#2B2B38', h = 8) => <div style={{width: w, height: h, borderRadius: h / 2, background: c}} />;
  if (kind === 'timeline') {
    return (
      <div style={{padding: 10, display: 'flex', flexDirection: 'column', gap: 7, height: '100%'}}>
        <div style={{display: 'flex', gap: 6, height: '40%'}}>
          <div style={{flex: 2, background: '#1B1B26', borderRadius: 6}} />
          <div style={{flex: 1, background: '#1B1B26', borderRadius: 6}} />
        </div>
        {[accent, D.blue, D.mint].map((c, i) => (
          <div key={i} style={{display: 'flex', gap: 5}}>
            <div style={{width: `${30 + i * 12}%`, height: 9, borderRadius: 4, background: c, opacity: 0.85}} />
            <div style={{width: `${25 - i * 4}%`, height: 9, borderRadius: 4, background: '#34344A'}} />
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'grid') {
    return (
      <div style={{padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, height: '100%'}}>
        {[accent, D.blue, D.mint, D.pink, D.violet, D.yellow].map((c, i) => (
          <div key={i} style={{background: c, opacity: 0.8, borderRadius: 6}} />
        ))}
      </div>
    );
  }
  if (kind === 'code') {
    return (
      <div style={{padding: 12, display: 'flex', flexDirection: 'column', gap: 7}}>
        {[60, 85, 45, 70, 90, 35, 65].map((w, i) => bar(`${w}%`, [accent, D.blue, D.mint, '#3A3A4C'][i % 4]))}
      </div>
    );
  }
  if (kind === 'chart') {
    return (
      <div style={{padding: 12, display: 'flex', alignItems: 'flex-end', gap: 7, height: '100%'}}>
        {[30, 55, 40, 75, 60, 90].map((h, i) => (
          <div key={i} style={{flex: 1, height: `${h}%`, borderRadius: '5px 5px 2px 2px', background: i === 5 ? accent : `${accent}66`}} />
        ))}
      </div>
    );
  }
  return (
    <div style={{display: 'flex', height: '100%'}}>
      <div style={{width: '16%', background: '#12121A', padding: 8, display: 'flex', flexDirection: 'column', gap: 7}}>
        {[accent, D.blue, D.mint, D.pink].map((c, i) => (
          <div key={i} style={{width: 14, height: 14, borderRadius: 7, background: c}} />
        ))}
      </div>
      <div style={{flex: 1, padding: 10, display: 'flex', flexDirection: 'column', gap: 8}}>
        <div style={{alignSelf: 'flex-end', background: accent, borderRadius: 8, padding: '6px 14px'}} />
        {bar('80%', '#2B2B38', 9)}
        {bar('60%', '#2B2B38', 9)}
        {bar('40%', accent, 9)}
      </div>
    </div>
  );
};

export const Monitor: React.FC<{
  w: number;
  h: number;
  rot?: number;
  glow?: string;
  kind?: 'chat' | 'timeline' | 'grid' | 'code' | 'chart';
  accent?: string;
  children?: React.ReactNode;
}> = ({w, h, rot = 0, glow = D.blue, kind, accent, children}) => (
  <div style={{transform: `perspective(1100px) rotateY(${rot}deg)`, width: w}}>
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 10,
        background: '#07070D',
        border: '6px solid #1b1b27',
        boxShadow: `0 0 70px ${glow}55, 0 18px 40px rgba(0,0,0,0.5)`,
        overflow: 'hidden',
      }}
    >
      {children ?? <MiniUI kind={kind} accent={accent} />}
    </div>
    <div style={{width: 22, height: 34, margin: '0 auto', background: 'linear-gradient(#2c2c3a,#17171f)'}} />
    <div style={{width: w * 0.42, height: 9, margin: '0 auto', borderRadius: 5, background: 'linear-gradient(#3a3a4a,#1b1b25)'}} />
  </div>
);

export const Lamp: React.FC<{glow?: string}> = ({glow = '#FFD58A'}) => (
  <svg width="190" height="260" viewBox="0 0 190 260" style={{overflow: 'visible'}}>
    <defs>
      <linearGradient id="lampcone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={glow} stopOpacity="0.55" />
        <stop offset="1" stopColor={glow} stopOpacity="0" />
      </linearGradient>
    </defs>
    <polygon points="30,70 130,70 190,260 -40,260" fill="url(#lampcone)" />
    <ellipse cx="70" cy="250" rx="42" ry="8" fill="#15151d" />
    <path d="M70 248 L72 160 L40 90" stroke="#20202c" strokeWidth="9" fill="none" strokeLinecap="round" />
    <path d="M18 72 Q80 40 142 72 L130 90 Q80 70 30 90 Z" fill="#2c2c3c" />
    <ellipse cx="80" cy="82" rx="46" ry="6" fill={glow} opacity="0.9" />
  </svg>
);

export const Plant: React.FC<{size?: number}> = ({size = 160}) => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 30) * 2;
  const leaves = [-50, -25, 0, 22, 46];
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 120 150" style={{overflow: 'visible'}}>
      <g transform={`rotate(${sway} 60 110)`}>
        {leaves.map((a, i) => (
          <ellipse key={i} cx={60} cy={55} rx={11} ry={44 - Math.abs(a) * 0.2} fill={['#2f8f5b', '#3fae6d', '#27774c'][i % 3]} transform={`rotate(${a} 60 112)`} />
        ))}
      </g>
      <path d="M32 110 L88 110 L80 148 L40 148 Z" fill="#c9693f" />
      <rect x="30" y="104" width="60" height="9" rx="3" fill="#dd7e52" />
    </svg>
  );
};

export const Mug: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width="60" height="70" viewBox="0 0 60 70" style={{overflow: 'visible'}}>
      {[16, 28, 40].map((x, i) => (
        <path key={i} d={`M${x} 18 q-6 -8 0 -14 q6 -6 0 -12`} stroke="#fff" strokeWidth="2" fill="none" opacity={0.25 + 0.2 * Math.sin((f + i * 12) / 10)} />
      ))}
      <rect x="6" y="22" width="40" height="40" rx="7" fill="#e8e8f0" />
      <path d="M46 30 q14 0 14 12 q0 12 -14 12" stroke="#e8e8f0" strokeWidth="6" fill="none" />
      <rect x="6" y="22" width="40" height="8" rx="4" fill="#bfc0d0" />
    </svg>
  );
};

export const Poster: React.FC<{
  w: number;
  h: number;
  title: string;
  c1: string;
  c2: string;
  rot?: number;
  shape?: 'sun' | 'peak' | 'rider';
  sub?: string;
}> = ({w, h, title, c1, c2, rot = 0, shape = 'sun', sub}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 14,
      transform: `perspective(900px) rotateY(${rot}deg)`,
      background: `linear-gradient(160deg, ${c1}, ${c2})`,
      boxShadow: '0 22px 50px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{position: 'absolute', left: 0, top: 0}}>
      {shape === 'sun' && <circle cx={w * 0.5} cy={h * 0.58} r={w * 0.28} fill="rgba(255,255,255,0.28)" />}
      {shape === 'peak' && (
        <>
          <polygon points={`0,${h} ${w * 0.35},${h * 0.5} ${w * 0.62},${h * 0.78} ${w * 0.8},${h * 0.55} ${w},${h}`} fill="rgba(0,0,0,0.35)" />
          <circle cx={w * 0.74} cy={h * 0.3} r={w * 0.1} fill="rgba(255,255,255,0.5)" />
        </>
      )}
      {shape === 'rider' && (
        <>
          <rect x="0" y={h * 0.72} width={w} height={h * 0.28} fill="rgba(0,0,0,0.4)" />
          <circle cx={w * 0.34} cy={h * 0.76} r={w * 0.09} fill="rgba(0,0,0,0.6)" />
          <circle cx={w * 0.7} cy={h * 0.76} r={w * 0.09} fill="rgba(0,0,0,0.6)" />
          <polygon points={`${w * 0.34},${h * 0.76} ${w * 0.5},${h * 0.56} ${w * 0.7},${h * 0.76}`} fill="rgba(255,255,255,0.35)" />
        </>
      )}
    </svg>
    <div style={{position: 'absolute', left: 14, right: 14, top: 16, fontSize: w * 0.17, fontWeight: 800, color: '#fff', lineHeight: 1.0, textShadow: '0 3px 14px rgba(0,0,0,0.5)', letterSpacing: -1}}>
      {title}
    </div>
    {sub && (
      <div style={{position: 'absolute', left: 14, bottom: 12, fontSize: w * 0.07, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: 2, textTransform: 'uppercase'}}>
        {sub}
      </div>
    )}
  </div>
);

/** Sky + sun + layered hills. */
export const Sunset: React.FC<{sky?: [string, string, string]; sunX?: number; sunY?: number; hills?: [string, string, string]}> = ({
  sky = ['#1b1040', '#8a3f7a', '#ffa05c'],
  sunX = 900,
  sunY = 360,
  hills = ['#4a2a63', '#2f1b4a', '#1a0f2e'],
}) => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${sky[0]} 0%, ${sky[1]} 55%, ${sky[2]} 100%)`}} />
    <div style={{position: 'absolute', left: sunX - 150, top: sunY - 150, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #FFF0C8 0%, #FFC27A 35%, rgba(255,150,90,0) 70%)'}} />
    <svg width="1280" height="720" viewBox="0 0 1280 720" style={{position: 'absolute', left: 0, top: 0}}>
      <path d="M0 470 Q200 380 400 450 T800 430 T1280 440 L1280 720 L0 720 Z" fill={hills[0]} />
      <path d="M0 540 Q250 470 520 540 T1040 520 T1280 540 L1280 720 L0 720 Z" fill={hills[1]} />
      <path d="M0 620 Q300 570 640 620 T1280 610 L1280 720 L0 720 Z" fill={hills[2]} />
    </svg>
  </AbsoluteFill>
);

export const Castle: React.FC<{w?: number; label?: string}> = ({w = 360, label = 'BOT'}) => {
  const f = useCurrentFrame();
  const wave = Math.sin(f / 9) * 4;
  return (
    <svg width={w} height={w * 0.62} viewBox="0 0 360 224" style={{overflow: 'visible'}}>
      <rect x="40" y="110" width="280" height="110" fill="#2b1b45" />
      {[40, 120, 220, 290].map((x, i) => (
        <rect key={i} x={x} y={i % 2 ? 70 : 54} width="36" height={i % 2 ? 150 : 166} fill="#35215a" />
      ))}
      {[48, 128, 228, 298].map((x, i) => (
        <rect key={i} x={x} y={(i % 2 ? 70 : 54) + 20} width="8" height="14" fill="#FFC27A" />
      ))}
      <path d="M150 220 L150 160 Q180 130 210 160 L210 220 Z" fill="#FFB35C" opacity="0.9" />
      <line x1="180" y1="54" x2="180" y2="-10" stroke="#20122f" strokeWidth="3" />
      <g transform={`skewY(${wave})`}>
        <rect x="181" y="-8" width="66" height="34" fill={D.orange} />
        <text x="214" y="16" textAnchor="middle" fontSize="16" fontWeight="800" fill="#1A0E06">
          {label}
        </text>
      </g>
    </svg>
  );
};

export const Cooler: React.FC<{size?: number}> = ({size = 320}) => {
  const f = useCurrentFrame();
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 200 300" style={{overflow: 'visible'}}>
      <ellipse cx="100" cy="292" rx="70" ry="8" fill="rgba(0,0,0,0.3)" />
      <rect x="45" y="120" width="110" height="170" rx="10" fill="#dfe3f2" />
      <rect x="45" y="120" width="110" height="26" rx="10" fill="#c3c9e0" />
      <rect x="62" y="170" width="76" height="34" rx="6" fill="#aeb6d4" />
      <rect x="84" y="196" width="10" height="12" fill="#4a8cff" />
      <rect x="108" y="196" width="10" height="12" fill="#ff6a5c" />
      <rect x="60" y="236" width="80" height="46" rx="6" fill="#c3c9e0" />
      <path d="M62 120 L62 52 Q62 8 100 8 Q138 8 138 52 L138 120 Z" fill="rgba(110,180,255,0.55)" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
      <rect x="62" y="70" width="76" height="50" fill="rgba(60,140,255,0.55)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={80 + i * 18} cy={110 - ((f * 1.2 + i * 22) % 60)} r={3.5} fill="rgba(255,255,255,0.7)" />
      ))}
    </svg>
  );
};

export const Palm: React.FC<{size?: number}> = ({size = 300}) => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 28) * 3;
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 200 280" style={{overflow: 'visible'}}>
      <path d="M100 280 Q90 180 110 90" stroke="#3a2415" strokeWidth="12" fill="none" strokeLinecap="round" />
      <g transform={`rotate(${sway} 110 90)`}>
        {[-70, -35, 0, 35, 70].map((a, i) => (
          <path key={i} d="M110 90 Q170 50 200 90 Q160 70 110 96 Z" fill={i % 2 ? '#1f6b46' : '#2a8a5a'} transform={`rotate(${a - 20} 110 90)`} />
        ))}
        <path d="M110 90 Q50 50 20 90 Q60 70 110 96 Z" fill="#256f4a" />
      </g>
    </svg>
  );
};

export const HoloOrg: React.FC<{tangled?: boolean; w?: number; h?: number}> = ({tangled = false, w = 560, h = 300}) => {
  const f = useCurrentFrame();
  const nodes: [number, number][] = [
    [0.5, 0.1],
    [0.22, 0.42],
    [0.5, 0.42],
    [0.78, 0.42],
    [0.1, 0.78],
    [0.34, 0.78],
    [0.58, 0.78],
    [0.82, 0.78],
  ];
  const tree = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [3, 6], [3, 7]];
  const mess = [[4, 7], [5, 3], [6, 1], [2, 7], [4, 2], [5, 6], [0, 4], [0, 7], [1, 7], [2, 4]];
  const pulse = 0.55 + 0.3 * Math.sin(f / 10);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{overflow: 'visible'}}>
      {[...tree, ...(tangled ? mess : [])].map(([a, b], i) => (
        <line key={i} x1={nodes[a][0] * w} y1={nodes[a][1] * h + 14} x2={nodes[b][0] * w} y2={nodes[b][1] * h + 14} stroke={tangled && i >= tree.length ? D.orange : '#59d9ff'} strokeOpacity={tangled && i >= tree.length ? 0.7 : pulse} strokeWidth={2.4} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x * w - 30} y={y * h - 8} width={60} height={34} rx={8} fill="rgba(20,40,70,0.85)" stroke="#59d9ff" strokeWidth={2} />
          <circle cx={x * w} cy={y * h + 3} r={6} fill="#59d9ff" />
          <rect x={x * w - 16} y={y * h + 14} width={32} height={5} rx={2.5} fill="#59d9ff" opacity={0.7} />
        </g>
      ))}
    </svg>
  );
};

export const Wires: React.FC<{seed?: number; count?: number}> = ({seed = 9, count = 16}) => {
  const r = rand(seed);
  const cols = [D.orange, D.blue, D.pink, D.mint, '#9a9ab0'];
  return (
    <svg width="1280" height="720" viewBox="0 0 1280 720" style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
      {Array.from({length: count}).map((_, i) => {
        const x1 = r() * 1280;
        const y1 = 380 + r() * 340;
        const x2 = r() * 1280;
        const y2 = 380 + r() * 340;
        return (
          <path
            key={i}
            d={`M${x1} ${y1} C ${x1 + (r() - 0.5) * 500} ${y1 + 200}, ${x2 + (r() - 0.5) * 500} ${y2 + 200}, ${x2} ${y2}`}
            stroke={cols[i % cols.length]}
            strokeWidth={4}
            fill="none"
            opacity={0.8}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export const Bloom: React.FC<{x: number; y: number; r: number; c: string; o?: number}> = ({x, y, r, c, o = 0.35}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: `radial-gradient(circle, ${c} 0%, transparent 70%)`, opacity: o, mixBlendMode: 'screen'}} />
);
