import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp} from '../../../lib/kit';
import {BOT_COLORS} from '../../../lib/GrokBotMark';
import type {BotShape} from '../../../lib/GrokBotMark';

/** The five Bots of the team and the body part each one is. */
export type PartKey = 'head' | 'larm' | 'rarm' | 'chest' | 'legs' | 'shield';
export type Member = {key: Exclude<PartKey, 'shield'>; part: string; name: string; job: string; shape: BotShape; color: string};
export const TEAM: Member[] = [
  {key: 'head', part: 'The head', name: 'Chief Brain', job: 'Plans the day', shape: 'drop', color: BOT_COLORS.orange},
  {key: 'larm', part: 'The left arm', name: 'Store Bot', job: 'Watches the store', shape: 'blob', color: BOT_COLORS.green},
  {key: 'rarm', part: 'The right arm', name: 'Client Bot', job: 'Looks after clients', shape: 'circle', color: BOT_COLORS.blue},
  {key: 'chest', part: 'The chest', name: 'Content Bot', job: 'Plans content', shape: 'pillow', color: BOT_COLORS.pink},
  {key: 'legs', part: 'The legs', name: 'Lead Bot', job: 'Hunts for leads', shape: 'drop', color: BOT_COLORS.teal},
];
export const M = Object.fromEntries(TEAM.map((t) => [t.key, t])) as Record<Member['key'], Member>;
export const SHIELD = BOT_COLORS.violet;

const INK = '#23242f';
const INK2 = '#2f3140';

/** Where each part flies in from (svg units). */
const FROM: Record<PartKey, [number, number]> = {head: [0, -120], larm: [-130, 0], rarm: [130, 0], chest: [0, 0], legs: [0, 130], shield: [0, 0]};

/**
 * "The Colossus": our own SVG robot. Each part is one Bot (TEAM). `parts[k]` = frame at which the part
 * snaps on (≤ 0 = already there); a missing key = not built yet (drawn as a dashed ghost when `ghost`).
 * `glow` = part with a pulsing halo.
 */
export const Colossus: React.FC<{
  h?: number;
  parts: Partial<Record<PartKey, number>>;
  glow?: PartKey;
  ghost?: boolean;
  style?: React.CSSProperties;
  nod?: number;
}> = ({h = 380, parts, glow, ghost = true, style, nod}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pr = (k: PartKey) => {
    const at = parts[k];
    if (at === undefined) return -1;
    return spring({frame: f - at, fps, config: {damping: 13, stiffness: 140}});
  };
  const pulse = 0.55 + 0.45 * Math.sin(f / 6);
  const nodY = nod !== undefined ? interpolate(f, [nod, nod + 8, nod + 16, nod + 24], [0, 7, -2, 0], clamp) : 0;

  const Part: React.FC<{k: PartKey; children: React.ReactNode; ghostEl: React.ReactNode}> = ({k, children, ghostEl}) => {
    const p = pr(k);
    const [dx, dy] = FROM[k];
    const halo = glow === k ? `drop-shadow(0 0 ${8 + 10 * pulse}px ${k === 'shield' ? SHIELD : M[k as Member['key']]?.color ?? '#fff'})` : 'none';
    return (
      <>
        {ghost && p < 0.98 && <g opacity={0.5 * (1 - Math.max(0, p))}>{ghostEl}</g>}
        {p >= 0 && (
          <g
            style={{filter: halo}}
            opacity={Math.min(1, p * 1.6)}
            transform={k === 'chest' ? `translate(150 172) scale(${0.6 + 0.4 * p}) translate(-150 -172)` : `translate(${dx * (1 - p)} ${dy * (1 - p)})`}
          >
            {children}
          </g>
        )}
      </>
    );
  };
  const g = {fill: 'none', stroke: 'rgba(21,21,28,0.45)', strokeWidth: 2.5, strokeDasharray: '7 6'};
  const sp = pr('shield');

  return (
    <svg width={(h * 300) / 420} height={h} viewBox="0 0 300 420" style={{overflow: 'visible', ...style}}>
      {/* legs */}
      <Part
        k="legs"
        ghostEl={
          <>
            <rect x={100} y={240} width={42} height={116} rx={16} {...g} />
            <rect x={158} y={240} width={42} height={116} rx={16} {...g} />
          </>
        }
      >
        <rect x={96} y={232} width={108} height={16} rx={8} fill={INK2} />
        {[100, 158].map((x) => (
          <g key={x}>
            <rect x={x} y={242} width={42} height={112} rx={16} fill={INK} />
            <rect x={x + 8} y={282} width={26} height={8} rx={4} fill={M.legs.color} />
            <rect x={x - 10} y={350} width={62} height={22} rx={11} fill={INK2} />
          </g>
        ))}
      </Part>
      {/* arms */}
      {(['larm', 'rarm'] as const).map((k) => {
        const x = k === 'larm' ? 48 : 218;
        const c = M[k].color;
        return (
          <Part key={k} k={k} ghostEl={<rect x={x} y={124} width={34} height={128} rx={17} {...g} />}>
            <circle cx={x + 17} cy={126} r={18} fill={INK2} />
            <rect x={x} y={132} width={34} height={112} rx={17} fill={INK} />
            <rect x={x + 6} y={170} width={22} height={9} rx={4.5} fill={c} />
            <rect x={x + 6} y={186} width={22} height={9} rx={4.5} fill={c} opacity={0.6} />
            <circle cx={x + 17} cy={254} r={15} fill={INK2} stroke={c} strokeWidth={3} />
          </Part>
        );
      })}
      {/* chest */}
      <Part k="chest" ghostEl={<rect x={82} y={110} width={136} height={124} rx={24} {...g} />}>
        <rect x={82} y={110} width={136} height={124} rx={24} fill={INK} />
        <circle cx={150} cy={168} r={34} fill={M.chest.color} opacity={0.22 + 0.12 * pulse} />
        <circle cx={150} cy={168} r={24} fill={M.chest.color} />
        <circle cx={150} cy={168} r={10} fill="#fff" opacity={0.85} />
        <rect x={100} y={214} width={100} height={6} rx={3} fill={INK2} />
      </Part>
      {/* head */}
      <g transform={`translate(0 ${nodY})`}>
        <Part k="head" ghostEl={<rect x={95} y={18} width={110} height={86} rx={28} {...g} />}>
          <rect x={138} y={98} width={24} height={16} rx={4} fill={INK2} />
          <line x1={150} y1={20} x2={150} y2={2} stroke={INK} strokeWidth={4} />
          <circle cx={150} cy={2} r={6} fill={M.head.color} />
          <rect x={95} y={18} width={110} height={86} rx={28} fill={INK} />
          <rect x={107} y={31} width={86} height={60} rx={20} fill={M.head.color} />
          <rect x={131} y={45} width={11} height={25} rx={5.5} fill="#0a0a0a" transform="rotate(-10 136 57)" />
          <rect x={157} y={45} width={11} height={25} rx={5.5} fill="#0a0a0a" transform="rotate(-10 162 57)" />
        </Part>
      </g>
      {/* shield */}
      {sp >= 0 && (
        <g opacity={Math.min(1, sp * 1.5)} transform={`translate(150 200) scale(${0.7 + 0.3 * sp}) translate(-150 -200)`} style={{filter: glow === 'shield' ? `drop-shadow(0 0 ${10 + 10 * pulse}px ${SHIELD})` : 'none'}}>
          <path
            d="M150 -18 L296 62 L296 300 L150 412 L4 300 L4 62 Z"
            fill={`${SHIELD}14`}
            stroke={SHIELD}
            strokeWidth={4}
            strokeLinejoin="round"
          />
          {Array.from({length: 6}).map((_, i) => (
            <path key={i} d={`M150 200 L${150 + 146 * Math.cos((i * Math.PI) / 3 - Math.PI / 2)} ${200 + 200 * Math.sin((i * Math.PI) / 3 - Math.PI / 2)}`} stroke={SHIELD} strokeOpacity={0.18} strokeWidth={2} />
          ))}
        </g>
      )}
    </svg>
  );
};

/** All parts present from the start. */
export const ALL: Partial<Record<PartKey, number>> = {head: 0, larm: 0, rarm: 0, chest: 0, legs: 0};
