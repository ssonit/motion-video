import React from 'react';
import {useCurrentFrame} from 'remotion';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const inter = loadInter('normal', {weights: ['500', '700', '800'], subsets: ['latin']});
export const mono = loadMono('normal', {weights: ['500'], subsets: ['latin']});

export const D = {
  bg: '#0E0E11',
  card: '#17171D',
  line: '#2B2B35',
  ink: '#F6F6F8',
  mute: '#8E8E9C',
  orange: '#FF7A2F',
  soft: 'rgba(255,122,47,0.14)',
  blue: '#5B8CFF',
  mint: '#1FBF8F',
  pink: '#FF5FA2',
  violet: '#B58CFF',
  yellow: '#FFD34D',
};

export const At: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>{children}</div>
);

export const Float: React.FC<{
  amp?: number;
  speed?: number;
  phase?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({amp = 8, speed = 14, phase = 0, style, children}) => {
  const f = useCurrentFrame();
  return (
    <div style={{transform: `translateY(${Math.sin((f + phase) / speed) * amp}px)`, ...style}}>
      {children}
    </div>
  );
};

export const AppWindow: React.FC<{
  w: number;
  h: number;
  dark?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({w, h, dark, style, children}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 16,
      overflow: 'hidden',
      background: dark ? '#15151B' : '#FFFFFF',
      border: `1.5px solid ${dark ? '#2B2B35' : '#E3E4EE'}`,
      boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
      position: 'relative',
      ...style,
    }}
  >
    <div
      style={{
        height: 30,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 12px',
        background: dark ? '#1C1C24' : '#F3F4FA',
      }}
    >
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
        <div key={c} style={{width: 10, height: 10, borderRadius: 5, background: c}} />
      ))}
    </div>
    <div style={{position: 'absolute', top: 30, left: 0, right: 0, bottom: 0}}>{children}</div>
  </div>
);

export const Bar: React.FC<{w: number | string; h?: number; color?: string; style?: React.CSSProperties}> = ({
  w,
  h = 10,
  color = '#2B2B35',
  style,
}) => <div style={{width: w, height: h, borderRadius: h / 2, background: color, ...style}} />;

export const Dot: React.FC<{c: string; s?: number; ring?: string}> = ({c, s = 28, ring}) => (
  <div
    style={{
      width: s,
      height: s,
      borderRadius: s / 2,
      background: c,
      boxShadow: ring ? `0 0 0 3px ${ring}` : undefined,
      flexShrink: 0,
    }}
  />
);

const GLYPHS: Record<string, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <line x1="9" y1="12" x2="16" y2="12" />
      <line x1="9" y1="16" x2="16" y2="16" />
    </>
  ),
  chart: (
    <>
      <rect x="4" y="12" width="4" height="8" rx="1" />
      <rect x="10" y="7" width="4" height="13" rx="1" />
      <rect x="16" y="3" width="4" height="17" rx="1" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <polyline points="3,7 12,13 21,7" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8,12.5 11,15.5 16,9" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="9" cy="10" r="1.8" />
      <polyline points="4,18 10,13 14,16 17,13 21,17" />
    </>
  ),
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <polygon points="10,9 16,12 10,15" />
    </>
  ),
  bolt: <polygon points="13,2 5,13 11,13 10,22 19,10 13,10" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12,7 12,12 16,14" />
    </>
  ),
  news: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </>
  ),
  warn: (
    <>
      <path d="M12 3 L22 20 H2 Z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <circle cx="12" cy="17" r="0.6" />
    </>
  ),
};

export const IconCard: React.FC<{
  kind: keyof typeof GLYPHS | string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({kind, size = 64, color = D.orange, style}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: 'rgba(255,255,255,0.08)',
      border: '1.5px solid rgba(255,255,255,0.2)',
      boxShadow: `0 0 ${size * 0.5}px ${color}33`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    <svg
      width={size * 0.56}
      height={size * 0.56}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {GLYPHS[kind]}
    </svg>
  </div>
);

export const Phone: React.FC<{
  w: number;
  h: number;
  glow?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({w, h, glow, style, children}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: w * 0.2,
      background: '#07070B',
      border: '3px solid #3A3A47',
      boxShadow: glow ? `0 0 70px ${glow}` : '0 20px 50px rgba(0,0,0,0.45)',
      padding: 7,
      position: 'relative',
      ...style,
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: w * 0.15,
        overflow: 'hidden',
        background: 'linear-gradient(180deg,#1B1B26,#101018)',
        position: 'relative',
      }}
    >
      {children}
    </div>
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: '50%',
        marginLeft: -w * 0.14,
        width: w * 0.28,
        height: 8,
        borderRadius: 4,
        background: '#000',
      }}
    />
  </div>
);

export const Laptop: React.FC<{w: number; h: number; children?: React.ReactNode}> = ({w, h, children}) => (
  <div style={{width: w * 1.1}}>
    <div
      style={{
        width: w,
        height: h,
        margin: '0 auto',
        borderRadius: '14px 14px 4px 4px',
        background: '#07070B',
        border: '3px solid #3A3A47',
        padding: 6,
        boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
          overflow: 'hidden',
          background: 'linear-gradient(180deg,#1B1B26,#101018)',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
    <div
      style={{
        width: w * 1.1,
        height: 14,
        borderRadius: '0 0 16px 16px',
        background: 'linear-gradient(#4A4A58,#2A2A34)',
      }}
    />
  </div>
);

export const Beams: React.FC<{
  lines: {x1: number; y1: number; x2: number; y2: number; c?: string; d?: number}[];
}> = ({lines}) => {
  const f = useCurrentFrame();
  return (
    <svg
      width={1280}
      height={720}
      viewBox="0 0 1280 720"
      style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}
    >
      {lines.map((l, i) => {
        const t = (f * 0.011 + (l.d ?? i * 0.23)) % 1;
        const c = l.c ?? D.orange;
        return (
          <g key={i}>
            <line
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={c}
              strokeOpacity={0.4}
              strokeWidth={2}
              strokeDasharray="6 8"
            />
            <circle cx={l.x1 + (l.x2 - l.x1) * t} cy={l.y1 + (l.y2 - l.y1) * t} r={5.5} fill={c} />
          </g>
        );
      })}
    </svg>
  );
};

export const Glow: React.FC<{x: number; y: number; r: number; c: string; o?: number}> = ({x, y, r, c, o = 0.4}) => (
  <div
    style={{
      position: 'absolute',
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${c} 0%, transparent 70%)`,
      opacity: o,
    }}
  />
);
