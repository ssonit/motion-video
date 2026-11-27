import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {Pop} from './Pop';
import {D, inter, mono} from './Art';

/**
 * Building blocks shared by every guide-style video:
 * Slide (background, headline, footer, captions, whoosh), Card/Chip (tick on entrance),
 * Sfx (one-shot sound), useAt (frame at a fraction of the scene), typed (typewriter text).
 */
export type P = {n: number; vo: string};

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const typed = (text: string, frame: number, at: number, cps: number) =>
  text.slice(0, Math.max(0, Math.floor(((frame - at) / 30) * cps)));

/** Frame at a fraction of the current slide's length. */
export const useAt = () => {
  const {durationInFrames} = useVideoConfig();
  return (f: number) => Math.round(durationInFrames * f);
};

export const Sfx: React.FC<{at: number; name: string; vol?: number; dur?: number}> = ({
  at,
  name,
  vol = 0.3,
  dur = 45,
}) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={dur} layout="none">
    <Audio src={staticFile(`shared/sfx/${name}.wav`)} volume={vol} />
  </Sequence>
);

export const Em: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{color: D.orange}}>{children}</span>
);

export const Label: React.FC<{children: React.ReactNode; color?: string}> = ({children, color}) => (
  <div
    style={{
      fontFamily: mono.fontFamily,
      fontSize: 17,
      letterSpacing: 2,
      color: color ?? D.orange,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

export const Card: React.FC<{
  at: number;
  hl?: boolean;
  style?: React.CSSProperties;
  box?: React.CSSProperties;
  children: React.ReactNode;
}> = ({at, hl, style, box, children}) => (
  <>
    <Sfx at={at} name={`tick${(Math.round(at) % 3) + 1}`} vol={0.2} />
    <Pop at={at} style={style}>
    <div
      style={{
        background: hl ? D.soft : D.card,
        border: `2px solid ${hl ? D.orange : D.line}`,
        borderRadius: 20,
        padding: '18px 22px',
        color: D.ink,
        boxShadow: hl ? '0 0 50px rgba(255,122,47,0.25)' : 'none',
        ...box,
      }}
    >
      {children}
    </div>
  </Pop>
  </>
);

export const Chip: React.FC<{at: number; children: React.ReactNode; hl?: boolean; size?: number}> = ({
  at,
  children,
  hl,
  size = 24,
}) => (
  <>
  <Sfx at={at} name={`tick${(Math.round(at) % 3) + 1}`} vol={0.16} />
  <Pop at={at}>
    <div
      style={{
        background: hl ? D.orange : 'rgba(23,23,29,0.92)',
        color: hl ? '#1A0E06' : D.ink,
        border: `2px solid ${hl ? D.orange : D.line}`,
        borderRadius: 999,
        fontSize: size,
        fontWeight: 700,
        padding: '7px 20px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </div>
  </Pop>
  </>
);

export const Arrow: React.FC<{at: number}> = ({at}) => (
  <Pop at={at}>
    <div style={{fontSize: 40, color: D.orange, fontWeight: 800, padding: '0 6px'}}>→</div>
  </Pop>
);

/** On-screen subtitles. OFF by default (user, 2026-11-26: "không cần phụ đề"); set true only if a video asks for them. */
export const CAPTIONS_ON = false;
/** Background music bed under the narration. Off by default (user, 2026-11-27); sfx stay on. */
export const MUSIC_ON = false;
export const Captions: React.FC<{text: string}> = ({text}) => (CAPTIONS_ON ? <CaptionsInner text={text} /> : null);

const CaptionsInner: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const parts = text.split(/(?<=[.!?])\s+/);
  const total = parts.reduce((a, p) => a + p.length, 0);
  const start = 6;
  const span = durationInFrames - 6 - 22;
  let acc = 0;
  let current = parts[parts.length - 1];
  for (const p of parts) {
    acc += p.length;
    if (frame < start + (span * acc) / total) {
      current = p;
      break;
    }
  }
  const o = interpolate(frame, [4, 12], [0, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 54,
        display: 'flex',
        justifyContent: 'center',
        opacity: o,
      }}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.74)',
          border: `1px solid ${D.line}`,
          color: '#fff',
          fontSize: 30,
          fontWeight: 700,
          padding: '12px 28px',
          borderRadius: 16,
          maxWidth: 1136,
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {current}
      </div>
    </div>
  );
};

export type Bg = 'ember' | 'night' | 'screen' | 'dusk' | 'none';

export const BG: Record<Bg, string> = {
  ember: `radial-gradient(900px 520px at 92% -6%, rgba(255,122,47,0.30), transparent 62%), ${D.bg}`,
  night:
    'radial-gradient(700px 420px at 10% 0%, rgba(80,140,255,0.32), transparent 60%), radial-gradient(700px 420px at 96% 100%, rgba(255,122,47,0.22), transparent 60%), #0A1020',
  screen:
    'radial-gradient(620px 420px at 86% 8%, rgba(255,214,102,0.75), transparent 60%), radial-gradient(720px 520px at 4% 92%, rgba(107,123,255,0.85), transparent 60%), linear-gradient(135deg,#FF9A62,#FF5E8E)',
  dusk: 'linear-gradient(180deg,#160E33 0%,#4A2570 48%,#FF8A4C 100%)',
  none: '#0A0A12',
};

export const Slide: React.FC<{
  n: number;
  eyebrow: string;
  head?: React.ReactNode;
  compact?: boolean;
  /** Illustration shots: no tag chip, no footer — just the art and the caption. */
  bare?: boolean;
  bg?: Bg;
  vo: string;
  children?: React.ReactNode;
}> = ({n, eyebrow, head, compact, bare, bg = 'ember', vo, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const o = interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );
  const grid = bg === 'ember' || bg === 'night';
  const foot = bg === 'screen' || bg === 'dusk' ? 'rgba(255,255,255,0.75)' : '#5B5B68';
  return (
    <AbsoluteFill style={{opacity: o, background: BG[bg], fontFamily: inter.fontFamily}}>
      {grid && (
        <AbsoluteFill
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      )}
      <Sfx at={0} name="whoosh" vol={0.3} dur={30} />
      {children}
      {head ? (
        <>
          <Pop at={2} style={{position: 'absolute', left: 72, top: compact ? 54 : 68}}>
            <Label>{eyebrow}</Label>
          </Pop>
          <Pop at={6} style={{position: 'absolute', left: 72, top: compact ? 86 : 104}}>
            <div
              style={{
                fontSize: compact ? 52 : 70,
                fontWeight: 800,
                color: D.ink,
                lineHeight: 1.08,
                letterSpacing: compact ? -1 : -1.5,
              }}
            >
              {head}
            </div>
          </Pop>
        </>
      ) : bare ? null : (
        <Pop at={2} style={{position: 'absolute', left: 0, right: 0, top: 22, display: 'flex', justifyContent: 'center'}}>
          <div
            style={{
              fontFamily: mono.fontFamily,
              fontSize: 17,
              letterSpacing: 2,
              color: '#fff',
              background: 'rgba(20,20,29,0.78)',
              padding: '8px 20px',
              borderRadius: 999,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>
        </Pop>
      )}
      {!bare && (
      <div
        style={{
          position: 'absolute',
          left: 72,
          bottom: 22,
          fontFamily: mono.fontFamily,
          fontSize: 14,
          letterSpacing: 2,
          color: foot,
        }}
      >
        BOT GUIDE · BEGINNER
      </div>
      )}
      {!bare && (
      <div
        style={{
          position: 'absolute',
          right: 72,
          bottom: 22,
          fontFamily: mono.fontFamily,
          fontSize: 14,
          color: foot,
        }}
      >
        {String(n).padStart(2, '0')}
      </div>
      )}
      <Captions text={vo} />
    </AbsoluteFill>
  );
};

