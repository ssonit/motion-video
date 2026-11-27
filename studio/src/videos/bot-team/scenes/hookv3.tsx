/**
 * Hook v3 for "bot-team": the TOC-montage hook pattern from references/yt-q1IwR88mhaA (§6/§8).
 * One literal picture per phrase (~1.5–3 s), pop on every new picture/word, an "anchor" set
 * (Chief Bot on a pastel stage) that returns every ~10 s in place of a presenter.
 */
import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {inter, mono} from '../../../lib/Art';
import {Bot} from '../../real/BotMark';
import {BOT_COLORS, GrokBotMark} from '../../../lib/GrokBotMark';
import {Colossus, M, TEAM} from './robot';
import {GroupChat} from './common';

const F = inter.fontFamily;
const YEL = '#1E6FE0'; // accent (paper look; name kept)
const PAPER = '#F7F7F8';
const INK = '#15151c';

/* ---------- helpers ---------- */
const usePop = (at: number, damping = 11) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return f < at ? 0 : spring({frame: f - at, fps, config: {damping, stiffness: 170}});
};

/** Element that springs in (scale + fade) at `at`, with an optional pop sound. */
const Pop: React.FC<{at: number; sfx?: string | false; vol?: number; style?: React.CSSProperties; children: React.ReactNode; from?: number}> = ({
  at,
  sfx = 'pop1',
  vol = 0.3,
  style,
  children,
  from = 0.2,
}) => {
  const p = usePop(at);
  return (
    <>
      {sfx && <Sfx at={at} name={sfx} vol={vol} dur={30} />}
      <div style={{...style, opacity: Math.min(1, p * 2), transform: `${style?.transform ?? ''} scale(${from + (1 - from) * p})`}}>{children}</div>
    </>
  );
};

/** Word that slams in from big + blurred. */
const Slam: React.FC<{at: number; children: React.ReactNode; style?: React.CSSProperties; sfx?: string}> = ({at, children, style, sfx = 'pop2'}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + 7], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <>
      <Sfx at={at} name={sfx} vol={0.32} dur={30} />
      <div style={{...style, opacity: t, transform: `scale(${1.7 - 0.7 * t})`, filter: `blur(${(1 - t) * 10}px)`}}>{children}</div>
    </>
  );
};

/** Dark textured wall (title card / cut-in backgrounds). */
const Wall: React.FC<{c?: string}> = () => <AbsoluteFill style={{background: PAPER}} />;

/** The anchor set: pastel stage + spotlight + Chief Bot. `behind` = giant words behind the Bot. */
const Anchor: React.FC<{behind?: React.ReactNode; children?: React.ReactNode; chief?: boolean; size?: number}> = ({behind, children, chief = true, size = 300}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 240, top: 560, width: 800, height: 120, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(21,21,28,0.10), transparent 70%)'}} />
      {behind}
      {chief && (
        <div style={{position: 'absolute', left: 640 - size / 2, top: 560 - size, transform: `translateY(${Math.sin(f / 12) * 6}px)`}}>
          <GrokBotMark shape="drop" color={M.head.color} size={size} />
        </div>
      )}
      {children}
    </AbsoluteFill>
  );
};

/* 1 ---------- cold open: the team wakes up behind the Chief ---------- */
export const HookCold: React.FC<P> = () => {
  const at = useAt();
  const xs = [190, 380, 900, 1090];
  const others = TEAM.slice(1);
  return (
    <Anchor>
      {others.map((m, i) => (
        <Pop key={m.key} at={at(0.12 + i * 0.13)} sfx={i % 2 ? 'pop2' : 'pop1'} vol={0.22} style={{position: 'absolute', left: xs[i] - 60, top: 330}}>
          <Bot shape={m.shape} color={m.color} size={120} phase={i * 9} />
          <div style={{marginTop: 8, textAlign: 'center', fontFamily: F, fontWeight: 700, fontSize: 18, color: INK}}>{m.name}</div>
        </Pop>
      ))}
      <Pop at={at(0.7)} sfx="ding" vol={0.2} style={{position: 'absolute', left: 0, width: 1280, top: 600, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontFamily: mono.fontFamily, fontSize: 20, letterSpacing: 3, color: INK, background: '#fff', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', padding: '8px 18px', borderRadius: 999}}>
          WORKING · 3:12 AM
        </div>
      </Pop>
    </Anchor>
  );
};

/* 2 ---------- title builds word by word, Chief Bot is the O ---------- */
const TitleLines: React.FC<{at: (x: number) => number; still?: boolean}> = ({at, still}) => {
  const big: React.CSSProperties = {fontFamily: F, fontWeight: 800, letterSpacing: -3, lineHeight: 1};
  const W: React.FC<{t: number; children: React.ReactNode; style?: React.CSSProperties}> = ({t, children, style}) =>
    still ? <div style={style}>{children}</div> : <Slam at={t} style={style}>{children}</Slam>;
  return (
    <div style={{position: 'absolute', left: 0, top: 120, width: 1280, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
      <W t={at(0.02)} style={{...big, fontSize: 64, color: INK, letterSpacing: 4}}>THE 5-BOT</W>
      <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
        <W t={at(0.2)} style={{...big, fontSize: 170, color: YEL}}>GROK</W>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <W t={at(0.36)} style={{...big, fontSize: 170, color: YEL}}>B</W>
          <W t={at(0.5)} style={{width: 132, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <GrokBotMark shape="drop" color={M.head.color} size={130} />
          </W>
          <W t={at(0.36)} style={{...big, fontSize: 170, color: YEL}}>T</W>
        </div>
      </div>
      <W t={at(0.66)} style={{...big, fontSize: 120, color: INK, letterSpacing: 10}}>TEAM</W>
    </div>
  );
};
export const HookTitle: React.FC<P> = () => {
  const at = useAt();
  return (
    <AbsoluteFill>
      <Wall />
      <TitleLines at={at} />
    </AbsoluteFill>
  );
};

/* 3 ---------- "Yes, you": a hand points at the viewer over the blurred title ---------- */
/** Yellow burst lines radiating from (cx, cy), slowly turning. */
const Burst: React.FC<{cx: number; cy: number; p: number}> = ({cx, cy, p}) => {
  const f = useCurrentFrame();
  return (
    <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0, opacity: p}}>
      {Array.from({length: 18}).map((_, i) => {
        const a = (i / 18) * Math.PI * 2 + f / 60;
        const r0 = 170 * p;
        const r1 = 900;
        return (
          <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1}
            stroke={YEL} strokeWidth={i % 2 ? 10 : 22} strokeLinecap="round" opacity={i % 2 ? 0.12 : 0.22} />
        );
      })}
    </svg>
  );
};
export const HookYou: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const p = usePop(at(0.02), 10);
  const zoom = interpolate(f, [at(0.02), at(1)], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Wall />
      <div style={{filter: 'blur(10px)', opacity: 0.55}}>
        <TitleLines at={at} still />
      </div>
      <Burst cx={420} cy={360} p={p} />
      <Sfx at={at(0.02)} name="whoosh" vol={0.3} dur={30} />
      <div style={{position: 'absolute', left: 420 - 140, top: 360 - 150, transform: `scale(${(0.2 + 0.8 * p) * (1 + zoom * 0.12)})`}}>
        <GrokBotMark shape="drop" color={M.head.color} size={280} />
      </div>
      <Slam at={at(0.22)} style={{position: 'absolute', left: 640, top: 250, fontFamily: F, fontWeight: 800, fontSize: 150, lineHeight: 0.95, letterSpacing: -4, color: INK}}>
        YES,
        <div style={{color: YEL}}>YOU.</div>
      </Slam>
    </AbsoluteFill>
  );
};

/* 4 ---------- split screen: online store | agency ---------- */
const Panel: React.FC<{x: number; at: number; bg: string; title: string; children: React.ReactNode}> = ({x, at, bg, title, children}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + 9], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <>
      <Sfx at={at} name="whoosh" vol={0.22} dur={30} />
      <div style={{position: 'absolute', left: x, top: 0, width: 640, height: 720, background: bg, overflow: 'hidden', transform: `translateY(${(1 - t) * 720}px)`}}>
        <div style={{position: 'absolute', left: 40, top: 40, fontFamily: mono.fontFamily, fontSize: 20, letterSpacing: 3, color: 'rgba(30,30,50,0.6)'}}>{title}</div>
        {children}
      </div>
    </>
  );
};
export const HookSplit: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const box = (c: string, w: number, h: number): React.CSSProperties => ({width: w, height: h, background: c, borderRadius: 8, boxShadow: 'inset 0 -8px 0 rgba(0,0,0,0.12)'});
  const shelves = [
    ['#D5D9E1', '#1E6FE0', '#C4CAD4', '#E2E5EA'],
    ['#C4CAD4', '#E2E5EA', '#D5D9E1', '#1E6FE0'],
  ];
  return (
    <AbsoluteFill style={{background: '#fff'}}>
      <Panel x={0} at={0} bg={PAPER} title="ONLINE STORE">
        {shelves.map((row, r) => (
          <div key={r} style={{position: 'absolute', left: 70, top: 170 + r * 170, width: 500}}>
            <div style={{display: 'flex', gap: 22, alignItems: 'flex-end', height: 120, paddingLeft: 20}}>
              {row.map((c, i) => <div key={i} style={box(c, 88, 70 + ((i + r) % 3) * 22)} />)}
            </div>
            <div style={{height: 14, background: '#C9C2B6', borderRadius: 4}} />
          </div>
        ))}
        {[0, 1, 2].map((i) => (
          <Pop key={i} at={at(0.18 + i * 0.12)} sfx={i === 0 ? 'tick1' : 'tick2'} vol={0.18} style={{position: 'absolute', left: 90 + i * 160, top: 560}}>
            <div style={{background: '#fff', borderRadius: 14, padding: '10px 16px', fontFamily: F, fontWeight: 700, fontSize: 20, color: '#1f8a4c', boxShadow: '0 8px 24px rgba(21,21,28,0.07)'}}>+1 order</div>
          </Pop>
        ))}
      </Panel>
      <Panel x={640} at={at(0.42)} bg={PAPER} title="SMALL AGENCY">
        {[0, 1, 2].map((i) => {
          const g = interpolate(f, [at(0.5) + i * 4, at(0.75) + i * 4], [0.2, 1], clamp);
          return (
            <div key={i} style={{position: 'absolute', left: 60 + i * 180, top: 170, width: 160, height: 330, background: '#fff', borderRadius: 18, boxShadow: '0 8px 24px rgba(21,21,28,0.07)', padding: 16}}>
              <div style={{width: 46, height: 46, borderRadius: 23, background: ['#D5D9E1', '#C4CAD4', '#E2E5EA'][i]}} />
              <div style={{marginTop: 12, height: 10, width: 100, background: '#dfe6f3', borderRadius: 5}} />
              <div style={{position: 'absolute', left: 16, right: 16, bottom: 18, display: 'flex', alignItems: 'flex-end', gap: 10, height: 170}}>
                {[0.4, 0.6, 0.8, 1].map((h, k) => <div key={k} style={{flex: 1, height: 170 * h * g, background: '#1E6FE0', borderRadius: 6, opacity: 0.5 + k * 0.15}} />)}
              </div>
            </div>
          );
        })}
      </Panel>
      <div style={{position: 'absolute', left: 637, top: 0, width: 2, height: 720, background: 'rgba(21,21,28,0.10)'}} />
    </AbsoluteFill>
  );
};

/* 5 ---------- the team checks its own work ---------- */
export const HookCheck: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const slide = interpolate(f, [at(0.25), at(0.45)], [400, 0], {...clamp, easing: Easing.out(Easing.back(1.4))});
  const stamp = usePop(at(0.55), 8);
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <Pop at={at(0.02)} style={{position: 'absolute', left: 250, top: 190}}>
        <div style={{width: 560, background: '#fff', borderRadius: 26, padding: '28px 32px', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', fontFamily: F}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Bot shape={M.larm.shape} color={M.larm.color} size={56} />
            <div style={{fontSize: 26, fontWeight: 800, color: '#15151c'}}>{M.larm.name}</div>
            <div style={{flex: 1}} />
            <div style={{fontSize: 34}}>🚩</div>
          </div>
          <div style={{marginTop: 18, fontSize: 30, fontWeight: 700, color: '#15151c'}}>Hiking packs: 3 left</div>
          <div style={{marginTop: 6, fontSize: 22, color: '#6b6f80'}}>Video about them goes out at 10:00</div>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 900, top: 230, transform: `translateX(${slide}px)`}}>
        <Bot shape={M.chest.shape} color={M.chest.color} size={150} />
        <div style={{textAlign: 'center', fontFamily: F, fontWeight: 700, fontSize: 20, color: '#2d3a35'}}>{M.chest.name}</div>
      </div>
      <Sfx at={at(0.55)} name="ding" vol={0.3} dur={40} />
      <div style={{position: 'absolute', left: 300, top: 372, transform: `rotate(-8deg) scale(${2.2 - 1.2 * stamp})`, opacity: stamp}}>
        <div style={{border: '6px solid #1f9d5c', color: '#1f9d5c', borderRadius: 16, padding: '8px 22px', fontFamily: F, fontWeight: 800, fontSize: 30, letterSpacing: 2, background: 'rgba(255,255,255,0.9)'}}>
          ✓ CHECKED · VIDEO HELD
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* 6 ---------- why separate helpers fail: links snap ---------- */
export const HookToc1: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const snap = at(0.5);
  const fall = interpolate(f, [snap, snap + 18], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const tiles = [
    {x: 640, y: 170, t: 'Store helper'},
    {x: 960, y: 170, t: 'Content helper'},
    {x: 800, y: 420, t: 'Email helper'},
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [2, 0]];
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <Pop at={at(0.02)} sfx="pop2" style={{position: 'absolute', left: 120, top: 120, fontFamily: F, fontWeight: 800, fontSize: 380, color: YEL, lineHeight: 1}}>
        ?
      </Pop>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        {links.map(([a, b], i) => {
          const A = tiles[a];
          const B = tiles[b];
          const mx = (A.x + B.x) / 2 + 100;
          const my = (A.y + B.y) / 2 + 40;
          const drop = fall * 160;
          return (
            <g key={i} opacity={f < at(0.12) ? 0 : 1 - fall * 0.8}>
              <line x1={A.x + 100} y1={A.y + 40} x2={mx - 8} y2={my + drop * 0.6} stroke={INK} strokeOpacity={0.35} strokeWidth={6} strokeDasharray="14 10" />
              <line x1={mx + 8} y1={my + drop} x2={B.x + 100} y2={B.y + 40} stroke={INK} strokeOpacity={0.35} strokeWidth={6} strokeDasharray="14 10" />
            </g>
          );
        })}
      </svg>
      <Sfx at={snap} name="tick3" vol={0.35} dur={30} />
      {tiles.map((t, i) => (
        <Pop key={i} at={at(0.06 + i * 0.08)} sfx="tick1" vol={0.18} style={{position: 'absolute', left: t.x, top: t.y, transform: `rotate(${fall * (i - 1) * 9}deg)`}}>
          <div style={{width: 200, height: 80, background: '#fff', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 700, fontSize: 22, color: INK, boxShadow: '0 8px 24px rgba(21,21,28,0.07)'}}>
            {t.t}
          </div>
        </Pop>
      ))}
    </AbsoluteFill>
  );
};

/* 7 ---------- one clear job each ---------- */
export const HookToc2: React.FC<P> = () => {
  const at = useAt();
  const jobs = ['Plan', 'Store', 'Clients', 'Content', 'Leads'];
  return (
    <AbsoluteFill
      style={{
        background: PAPER,
      }}
    >
      {TEAM.map((m, i) => (
        <React.Fragment key={m.key}>
          <Pop at={at(0.04 + i * 0.08)} sfx={i % 2 ? 'pop2' : 'pop1'} vol={0.22} style={{position: 'absolute', left: 120 + i * 220, top: 200}}>
            <Bot shape={m.shape} color={m.color} size={150} phase={i * 6} />
          </Pop>
          <Pop at={at(0.4 + i * 0.06)} sfx="tick2" vol={0.16} style={{position: 'absolute', left: 120 + i * 220 - 10, top: 400, width: 170, display: 'flex', justifyContent: 'center'}}>
            <div style={{background: '#fff', color: INK, fontFamily: F, fontWeight: 800, fontSize: 26, padding: '10px 20px', borderRadius: 999, boxShadow: '0 8px 24px rgba(21,21,28,0.07)'}}>{jobs[i]}</div>
          </Pop>
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};

/* 8 ---------- the exact message: types, then flies off ---------- */
export const HookToc3: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const msg = 'You are my Store Bot. Every morning at 7, check stock and flag anything under 2 weeks.';
  const send = at(0.72);
  const fly = interpolate(f, [send, send + 10], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <Sfx at={at(0.04)} name="typing" vol={0.25} dur={Math.max(10, send - at(0.04))} />
      <Sfx at={send} name="whoosh" vol={0.3} dur={30} />
      <div style={{position: 'absolute', left: 190, top: 250, width: 900, transform: `translate(${fly * 700}px, ${-fly * 420}px) scale(${1 - fly * 0.6})`, opacity: 1 - fly}}>
        <div style={{fontFamily: mono.fontFamily, fontSize: 16, letterSpacing: 3, color: 'rgba(21,21,28,0.5)', marginBottom: 14}}>MESSAGE · STORE BOT</div>
        <div style={{background: '#fff', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', borderRadius: 22, padding: '26px 30px', display: 'flex', gap: 20, alignItems: 'flex-end'}}>
          <div style={{flex: 1, fontFamily: F, fontSize: 32, lineHeight: 1.35, color: INK, minHeight: 130}}>
            {typed(msg, f, at(0.04), 70)}
            <span style={{opacity: f % 16 < 8 ? 1 : 0}}>|</span>
          </div>
          <div style={{width: 58, height: 58, borderRadius: 29, background: INK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 800}}>↑</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* 9 ---------- on a schedule: clock spins to 8:00 ---------- */
export const HookToc4: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const t = interpolate(f, [at(0.02), at(0.6)], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const hours = 3 + 5 * t + 24 * t; // spins round twice, lands on 8:00
  const hourDeg = (hours % 12) * 30;
  const minDeg = (hours % 1) * 360 + Math.floor(hours - 3) * 360 * 0;
  const C = INK;
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <Sfx at={at(0.6)} name="ding" vol={0.3} dur={40} />
      <svg width={420} height={420} viewBox="-210 -210 420 420" style={{position: 'absolute', left: 430, top: 120, filter: 'drop-shadow(0 8px 24px rgba(21,21,28,0.08))'}}>
        <circle r={190} fill="#fff" stroke={C} strokeWidth={6} />
        {Array.from({length: 12}).map((_, i) => (
          <line key={i} x1={0} y1={-170} x2={0} y2={i % 3 ? -155 : -140} stroke={C} strokeWidth={i % 3 ? 4 : 8} transform={`rotate(${i * 30})`} />
        ))}
        <line x1={0} y1={0} x2={0} y2={-95} stroke={C} strokeWidth={12} strokeLinecap="round" transform={`rotate(${hourDeg})`} />
        <line x1={0} y1={0} x2={0} y2={-150} stroke={YEL} strokeWidth={6} strokeLinecap="round" transform={`rotate(${minDeg})`} />
        <circle r={12} fill={YEL} />
      </svg>
      <Pop at={at(0.62)} sfx={false} style={{position: 'absolute', left: 0, width: 1280, top: 580, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontFamily: mono.fontFamily, fontSize: 30, letterSpacing: 4, color: '#fff', background: C, padding: '10px 26px', borderRadius: 999, fontWeight: 700}}>MON–FRI · 8:00</div>
      </Pop>
    </AbsoluteFill>
  );
};

/* 10 ---------- done before you wake up: night → sunrise, phone lights ---------- */
export const HookToc5: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const d = interpolate(f, [at(0.05), at(0.6)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const mix = (a: number[], b: number[]) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * d)).join(',')})`;
  const glow = usePop(at(0.62), 10);
  return (
    <AbsoluteFill style={{background: PAPER}}>
      {/* window */}
      <div style={{position: 'absolute', left: 140, top: 90, width: 520, height: 400, borderRadius: 18, overflow: 'hidden', border: '14px solid #fff', background: `linear-gradient(180deg, ${mix([10, 14, 40], [120, 170, 240])}, ${mix([40, 40, 90], [255, 190, 140])})`}}>
        <div style={{position: 'absolute', left: 340, top: 60 + d * 300, width: 60, height: 60, borderRadius: 30, background: '#F3F0D8', opacity: 1 - d}} />
        <div style={{position: 'absolute', left: 150, top: 380 - d * 230, width: 110, height: 110, borderRadius: 55, background: '#FFC85A', opacity: d}} />
        <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: 90, background: mix([20, 22, 40], [120, 150, 110])}} />
        <div style={{position: 'absolute', left: 246, top: 0, width: 14, height: '100%', background: '#fff'}} />
      </div>
      {/* bed */}
      <div style={{position: 'absolute', left: 60, top: 540, width: 760, height: 120, borderRadius: 30, background: '#E2DCD2'}} />
      <div style={{position: 'absolute', left: 90, top: 500, width: 200, height: 70, borderRadius: 30, background: '#fff'}} />
      {/* nightstand + phone */}
      <div style={{position: 'absolute', left: 880, top: 520, width: 260, height: 160, borderRadius: 14, background: '#D6CABB'}} />
      <Sfx at={at(0.62)} name="ding" vol={0.3} dur={40} />
      <div style={{position: 'absolute', left: 930, top: 250, width: 170, height: 300, borderRadius: 26, background: '#111', border: '5px solid #2b2b2b', overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, background: `rgba(40,40,60,${glow})`}} />
        <div style={{position: 'absolute', left: 10, right: 10, top: 40, transform: `translateY(${(1 - glow) * -60}px)`, opacity: glow, background: '#fff', borderRadius: 14, padding: 10, fontFamily: F}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <GrokBotMark shape="drop" color={M.head.color} size={22} />
            <span style={{fontSize: 11, fontWeight: 700, color: '#555'}}>Chief Brain</span>
          </div>
          <div style={{fontSize: 15, fontWeight: 800, color: '#111', marginTop: 4}}>Today’s plan is ready ✓</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* 11 ---------- anchor: NO CODE glowing behind the Chief ---------- */
export const HookAnchor: React.FC<P> = () => {
  const at = useAt();
  return (
    <Anchor
      size={190}
      behind={
        <Slam at={at(0.25)} sfx="whoosh" style={{position: 'absolute', left: 0, top: 70, width: 1280, textAlign: 'center', fontFamily: F, fontWeight: 800, fontSize: 270, letterSpacing: -10, lineHeight: 1, color: YEL}}>
          NO CODE
        </Slam>
      }
    />
  );
};

/* 12 ---------- setup gauge drops to zero and spins away ---------- */
export const HookNoCode: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const needle = interpolate(f, [at(0.08), at(0.5)], [70, -70], {...clamp, easing: Easing.out(Easing.back(1.6))});
  const out = interpolate(f, [at(0.72), at(0.95)], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <Sfx at={at(0.08)} name="tick3" vol={0.3} dur={20} />
      <Sfx at={at(0.72)} name="whoosh" vol={0.3} dur={30} />
      <div style={{position: 'absolute', left: 340, top: 70, transform: `rotate(${out * 220}deg) scale(${1 + out * 0.6})`, filter: `blur(${out * 14}px)`, opacity: 1 - out * 0.9}}>
        <svg width={600} height={600} viewBox="-300 -300 600 600">
          <circle r={250} fill="#f4f4f6" stroke="#9a9aa2" strokeWidth={26} />
          <circle r={232} fill="none" stroke="#c9c9cf" strokeWidth={4} />
          <rect x={-40} y={-300} width={80} height={44} rx={10} fill="#a5a5ad" />
          {Array.from({length: 41}).map((_, i) => (
            <line key={i} x1={0} y1={-215} x2={0} y2={i % 5 ? -200 : -185} stroke="#333" strokeWidth={i % 5 ? 2 : 4} transform={`rotate(${-100 + i * 5})`} />
          ))}
          <text x={0} y={70} textAnchor="middle" fontFamily={F} fontWeight={800} fontSize={64} fill="#D7262E" letterSpacing={2}>SETUP</text>
          <text x={-150} y={20} textAnchor="middle" fontFamily={F} fontWeight={700} fontSize={26} fill="#555">0</text>
          <line x1={0} y1={30} x2={0} y2={-190} stroke="#D7262E" strokeWidth={8} strokeLinecap="round" transform={`rotate(${needle})`} />
          <circle r={18} fill="#D7262E" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

/* 13 ---------- a real team in one group chat ---------- */
export const HookTeam: React.FC<P> = () => {
  const at = useAt();
  const t = [0.06, 0.2, 0.34, 0.48, 0.62].map(at);
  return (
    <AbsoluteFill style={{background: PAPER, fontFamily: F}}>
      {t.map((x, i) => <Sfx key={i} at={x} name={i % 2 ? 'pop2' : 'pop1'} vol={0.22} dur={20} />)}
      <GroupChat
        x={150}
        y={90}
        w={980}
        h={540}
        fs={20}
        joined={TEAM.map((m, i) => ({m, at: t[i] - 2}))}
        msgs={[
          {m: M.head, text: 'Morning team. Reports in by 8, please.', at: t[0]},
          {m: M.larm, text: 'Stock checked ✓', at: t[1]},
          {m: M.rarm, text: 'Client reports written ✓', at: t[2]},
          {m: M.chest, text: 'Week of posts planned ✓', at: t[3]},
          {m: M.legs, text: '3 hot leads scored ✓', at: t[4]},
        ]}
      />
    </AbsoluteFill>
  );
};

/* 14 ---------- hand work to each other ---------- */
export const HookHandoff: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const pts: [number, number][] = [
    [180, 420],
    [420, 250],
    [640, 420],
    [860, 250],
    [1100, 420],
  ];
  const hop = interpolate(f, [at(0.08), at(0.8)], [0, 4], {...clamp, easing: Easing.inOut(Easing.quad)});
  const k = Math.min(3, Math.floor(hop));
  const u = hop - k;
  const [x0, y0] = pts[k];
  const [x1, y1] = pts[k + 1];
  const cx = x0 + (x1 - x0) * u;
  const cy = y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 90;
  return (
    <AbsoluteFill>
      <Wall c="#18181d" />
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <polyline points={pts.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke="rgba(21,21,28,0.22)" strokeWidth={4} strokeDasharray="8 10" strokeDashoffset={-f * 2} />
      </svg>
      {[1, 2, 3, 4].map((i) => <Sfx key={i} at={at(0.08) + ((at(0.8) - at(0.08)) * i) / 4} name="tick2" vol={0.2} dur={20} />)}
      {TEAM.map((m, i) => (
        <div key={m.key} style={{position: 'absolute', left: pts[i][0] - 70, top: pts[i][1] - 40}}>
          <Bot shape={m.shape} color={m.color} size={140} phase={i * 8} />
        </div>
      ))}
      <div style={{position: 'absolute', left: cx - 70, top: cy - 140, width: 140, background: '#fff', borderRadius: 12, padding: '10px 12px', fontFamily: F, boxShadow: '0 8px 24px rgba(21,21,28,0.07)', transform: `rotate(${Math.sin(u * Math.PI) * -8}deg)`}}>
        <div style={{fontSize: 12, fontWeight: 700, color: '#888', letterSpacing: 1}}>TASK</div>
        <div style={{height: 8, background: '#e5e5ea', borderRadius: 4, marginTop: 6}} />
        <div style={{height: 8, width: '70%', background: '#e5e5ea', borderRadius: 4, marginTop: 6}} />
      </div>
    </AbsoluteFill>
  );
};

/* 15 ---------- they catch each other's mistakes (real-look chat) ---------- */
export const HookCatch: React.FC<P> = () => {
  const at = useAt();
  return (
    <AbsoluteFill style={{background: PAPER, fontFamily: F}}>
      <Sfx at={at(0.1)} name="pop1" vol={0.25} dur={20} />
      <Sfx at={at(0.45)} name="ding" vol={0.3} dur={40} />
      <GroupChat
        x={150}
        y={110}
        w={980}
        h={500}
        fs={24}
        msgs={[
          {m: M.larm, text: 'Hiking packs: only 3 left. Restock lands Friday.', at: at(0.1), tone: 'warn'},
          {m: M.chest, text: 'Saw that. Holding the hiking pack video until Friday. ✓', at: at(0.45), tone: 'fix'},
        ]}
      />
    </AbsoluteFill>
  );
};

/* 15b ---------- open loop: tip 3 is locked; one switch breaks everything ---------- */
export const HookLoop3: React.FC<P> = () => {
  const at = useAt();
  const f = useCurrentFrame();
  const flip = at(0.62);
  const on = interpolate(f, [flip, flip + 5], [0, 1], clamp);
  const flash = interpolate(f, [flip + 4, flip + 8, flip + 26], [0, 0.3, 0], clamp);
  const crack = interpolate(f, [flip + 4, flip + 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const shake = f >= flip + 4 && f < flip + 16 ? Math.sin(f * 2.7) * 9 : 0;
  const lockWobble = f > at(0.2) && f < at(0.32) ? Math.sin(f * 1.6) * 10 : 0;
  return (
    <AbsoluteFill style={{transform: `translateX(${shake}px)`}}>
      <Wall />
      {[0, 1].map((i) => (
        <Pop key={i} at={at(0.02 + i * 0.06)} sfx="tick1" vol={0.16} style={{position: 'absolute', left: 110 + i * 210, top: 230, opacity: 0.45}}>
          <div style={{width: 170, height: 220, borderRadius: 20, background: '#fff', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: F, color: INK}}>
            <div style={{fontSize: 18, letterSpacing: 3, opacity: 0.7}}>TIP</div>
            <div style={{fontSize: 70, fontWeight: 800}}>{i + 1}</div>
            <div style={{fontSize: 30, color: '#2E9E62'}}>✓</div>
          </div>
        </Pop>
      ))}
      <Pop at={at(0.12)} sfx="pop2" style={{position: 'absolute', left: 560, top: 130}}>
        <div style={{width: 600, height: 430, borderRadius: 28, background: '#fff', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', padding: '30px 40px', fontFamily: F, color: INK, position: 'relative', overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <div style={{fontSize: 24, letterSpacing: 4, color: YEL, fontWeight: 700}}>TIP 3 · THE ONE THAT BREAKS IT</div>
          </div>
          <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14, filter: 'blur(7px)'}}>
            {[0.9, 0.75, 0.82].map((w, i) => <div key={i} style={{height: 22, width: `${w * 100}%`, background: 'rgba(21,21,28,0.1)', borderRadius: 11}} />)}
          </div>
          {/* the mystery switch */}
          <div style={{position: 'absolute', left: 40, bottom: 40, display: 'flex', alignItems: 'center', gap: 20}}>
            <div style={{width: 120, height: 62, borderRadius: 31, background: on > 0.5 ? '#C9524C' : 'rgba(21,21,28,0.15)', position: 'relative', transition: 'none'}}>
              <div style={{position: 'absolute', top: 6, left: 6 + on * 58, width: 50, height: 50, borderRadius: 25, background: '#fff'}} />
            </div>
            <div style={{fontSize: 26, fontWeight: 700, filter: 'blur(6px)'}}>Something on day one</div>
          </div>
          {/* padlock */}
          <div style={{position: 'absolute', right: 40, top: 110, transform: `rotate(${lockWobble}deg)`, transformOrigin: '50% 0%'}}>
            <svg width={120} height={150} viewBox="0 0 120 150">
              <path d="M30 70 V45 a30 30 0 0 1 60 0 V70" fill="none" stroke={YEL} strokeWidth={12} strokeLinecap="round" />
              <rect x={12} y={66} width={96} height={78} rx={16} fill={YEL} />
              <text x={60} y={124} textAnchor="middle" fontFamily={F} fontWeight={800} fontSize={48} fill="#fff">?</text>
            </svg>
          </div>
        </div>
      </Pop>
      <Sfx at={at(0.22)} name="tick3" vol={0.25} dur={20} />
      <Sfx at={flip} name="tick2" vol={0.35} dur={20} />
      <Sfx at={flip + 4} name="whoosh" vol={0.35} dur={30} />
      {/* crack across the screen */}
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <polyline points="560,120 700,260 660,330 820,420 790,480 980,600 1180,700" fill="none" stroke={INK} strokeWidth={5}
          strokeDasharray={1400} strokeDashoffset={1400 * (1 - crack)} strokeLinejoin="round" />
      </svg>
      <AbsoluteFill style={{background: '#E5484D', opacity: flash, mixBlendMode: 'screen'}} />
    </AbsoluteFill>
  );
};

/* 16 ---------- anchor: the Colossus snaps together, let's build it ---------- */
export const HookGo: React.FC<P> = () => {
  const at = useAt();
  const s = [0.02, 0.1, 0.18, 0.26, 0.34, 0.46].map(at);
  return (
    <Anchor chief={false}>
      {s.slice(0, 5).map((x, i) => <Sfx key={i} at={x + 6} name={i % 2 ? 'pop2' : 'pop1'} vol={0.25} dur={20} />)}
      <Sfx at={s[5] + 6} name="ding" vol={0.3} dur={40} />
      <Sfx at={at(0.88)} name="whoosh" vol={0.3} dur={30} />
      <div style={{position: 'absolute', left: 640 - 230, top: 90}}>
        <Colossus h={520} parts={{head: s[0], larm: s[1], rarm: s[2], chest: s[3], legs: s[4], shield: s[5]}} ghost={false} glow="head" />
      </div>
    </Anchor>
  );
};

export {BOT_COLORS};
