import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Abs, In, Pill, R, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';
import {ACC, DIM, Real} from '../../lazy-agency/scenes/common';
import type {ShotSpec} from '../../lazy-agency/scenes/common';
import {Colossus, M, TEAM} from './robot';
import type {Member, PartKey} from './robot';

export {ACC, DIM};

/* ---------- real Grok Bot captures (references/yt-C2llc614D2M/assets, 1440x900) ---------- */
const S = (f: string) => ({src: `bot-team/assets/${f}`, sw: 1440, sh: 900});
export const SHOT = {
  needsOk: S('02-app-needs-ok.png'),
  computer: S('03-computer.png'),
  team: S('04-team-each-other.png'),
  jobs: S('05-give-each-bot-a-job.png'),
  approvals: S('06-docs-auto-review.png'),
  routine: S('07-docs-routine.png'),
};

/** Real screenshot + "Source: …" tag under its right edge. */
export const RealSrc: React.FC<{spec: ShotSpec; at: number; source: string}> = ({spec, at, source}) => {
  const h = Math.round(spec.crop.h * (spec.w / spec.crop.w));
  const x = spec.x ?? (1280 - spec.w) / 2;
  const y = spec.y ?? 195;
  return (
    <>
      <Real spec={spec} at={at} />
      <In at={at + 10} tick={false} style={{position: 'absolute', left: x, top: y + h + 12, width: spec.w, display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{fontFamily: mono.fontFamily, fontSize: 15, letterSpacing: 1, color: 'rgba(21,21,28,0.62)', background: 'rgba(255,255,255,0.75)', borderRadius: 8, padding: '4px 10px'}}>Source: {source}</div>
      </In>
    </>
  );
};

/** Bot mark + name pill. */
export const BotTag: React.FC<{m: Member; size?: number; dark?: boolean}> = ({m, size = 22, dark}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, background: dark ? '#1d1d26' : '#fff', color: dark ? '#fff' : '#15151c', borderRadius: 9999, padding: `${size * 0.3}px ${size * 0.8}px ${size * 0.3}px ${size * 0.35}px`, boxShadow: 'var(--op-shadow)', fontSize: size, fontWeight: 700, whiteSpace: 'nowrap'}}>
    <Bot shape={m.shape} color={m.color} size={size * 1.6} bob={2} />
    {m.name}
  </div>
);

/** Robot parts already built before piece n (1-based). */
export const builtBefore = (n: number): Partial<Record<PartKey, number>> => {
  const o: Partial<Record<PartKey, number>> = {};
  TEAM.slice(0, Math.min(5, n - 1)).forEach((t) => (o[t.key] = -60));
  return o;
};

/**
 * Piece chapter: left = "PIECE n" + part name + Bot tag + job; right = the Colossus with earlier parts on
 * and this part snapping in (ding on the landing frame) and glowing.
 */
export const mkPiece = (o: {n: number; part: PartKey; title: string; sub: string; m?: Member}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const snap = at(0.32);
  const parts = {...builtBefore(o.n), [o.part]: snap};
  const col = o.m?.color ?? '#804EE0';
  return (
    <RSlide vo={vo}>
      <Sfx at={snap + 6} name="pop2" vol={0.28} dur={20} />
      <Sfx at={snap + 8} name="ding" vol={0.22} dur={40} />
      <Abs x={96} y={120} style={{fontFamily: mono.fontFamily, fontSize: 24, letterSpacing: 5, color: col}}>
        <In at={at(0.02)} tick={false}>PIECE {o.n} OF 6</In>
      </Abs>
      <In at={at(0.06)} tick={false} style={{position: 'absolute', left: 90, top: 160, fontSize: 104, fontWeight: 800, letterSpacing: -4, lineHeight: 1}}>
        {o.title}
      </In>
      <div style={{position: 'absolute', left: 96, top: 290, width: 130, height: 8, borderRadius: 4, background: col, transformOrigin: 'left', transform: `scaleX(${interpolate(useCurrentFrame(), [at(0.1), at(0.3)], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)})})`}} />
      {o.m && (
        <In at={at(0.4)} style={{position: 'absolute', left: 96, top: 330}}>
          <BotTag m={o.m} size={30} />
        </In>
      )}
      <In at={at(0.5)} style={{position: 'absolute', left: 100, top: o.m ? 410 : 340}}>
        <div style={{fontSize: 30, color: DIM, fontWeight: 600}}>{o.sub}</div>
      </In>
      <Abs x={830} y={110}>
        <Colossus h={420} parts={parts} glow={o.part} />
      </Abs>
    </RSlide>
  );
};

/* ---------- dark group chat window ---------- */
export type GMsg = {m?: Member; me?: boolean; text: string; at: number; tone?: 'warn' | 'fix'};
export const GroupChat: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  name?: string;
  joined?: {m: Member; at: number}[];
  msgs: GMsg[];
  input?: {text: string; typeAt: number; sendAt: number};
  typingAt?: number;
  fs?: number;
}> = ({x = 120, y = 150, w = 1040, h = 395, name = 'colossus', joined = [], msgs, input, typingAt, fs = 17}) => {
  const f = useCurrentFrame();
  const shown = msgs.filter((m) => f >= m.at);
  const typedText = input && f < input.sendAt ? typed(input.text, f, input.typeAt, 60) : '';
  const dots = typingAt !== undefined && f > typingAt && shown.filter((m) => !m.me).length === 0;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 18, background: R.bg, border: `1.5px solid ${R.line}`, boxShadow: '0 28px 80px rgba(20,25,60,0.45)', display: 'flex', overflow: 'hidden', color: '#fff'}}>
      <div style={{width: 210, background: '#0D0D0D', borderRight: `1px solid ${R.line}`, padding: '14px 12px'}}>
        <div style={{display: 'flex', gap: 7, marginBottom: 14}}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => <div key={c} style={{width: 11, height: 11, borderRadius: 6, background: c}} />)}
        </div>
        <div style={{fontSize: 12, color: R.dim, letterSpacing: 1.5, fontFamily: mono.fontFamily, margin: '4px 6px 8px'}}>GROUP CHATS</div>
        <div style={{background: R.card, borderRadius: 10, padding: '8px 10px', fontSize: 15, fontWeight: 700}}># {name}</div>
        <div style={{fontSize: 12, color: R.dim, letterSpacing: 1.5, fontFamily: mono.fontFamily, margin: '16px 6px 8px'}}>BOTS</div>
        {TEAM.map((t, i) => (
          <div key={t.key} style={{display: 'flex', alignItems: 'center', gap: 9, padding: '5px 6px', opacity: joined.length === 0 || joined.some((j) => j.m.key === t.key && f >= j.at) ? 1 : 0.35}}>
            <Bot shape={t.shape} color={t.color} size={24} phase={i * 7} bob={1.5} />
            <span style={{fontSize: 14, fontWeight: 600}}>{t.name}</span>
          </div>
        ))}
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 22px 16px', minWidth: 0}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: `1px solid ${R.line}`}}>
          <span style={{fontSize: 18, fontWeight: 700}}># {name}</span>
          <span style={{fontSize: 13, color: R.dim}}>group chat · 5 Bots</span>
          <div style={{flex: 1}} />
          {TEAM.map((t, i) => (
            <div key={t.key} style={{marginLeft: -6, width: 28, height: 28, borderRadius: 14, background: '#1a1a1a', border: '2px solid #0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Bot shape={t.shape} color={t.color} size={18} bob={0} phase={i} />
            </div>
          ))}
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 9, overflow: 'hidden', padding: '10px 0'}}>
          {joined.filter((j) => f >= j.at).map((j) => (
            <In key={j.m.key} at={j.at} style={{alignSelf: 'center'}}>
              <div style={{fontSize: 14, color: R.mute, display: 'flex', alignItems: 'center', gap: 8, fontFamily: mono.fontFamily}}>
                <Bot shape={j.m.shape} color={j.m.color} size={18} bob={0} />
                {j.m.name} joined the chat
              </div>
            </In>
          ))}
          {shown.map((m, i) =>
            m.me ? (
              <In key={i} at={m.at} style={{alignSelf: 'flex-end'}}>
                <div style={{background: R.user, borderRadius: 18, padding: '9px 16px', fontSize: fs, fontWeight: 500, maxWidth: 560, lineHeight: 1.35}}>{m.text}</div>
              </In>
            ) : (
              <In key={i} at={m.at} style={{alignSelf: 'stretch'}}>
                <div style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
                  <Bot shape={m.m!.shape} color={m.m!.color} size={30} bob={1} />
                  <div style={{flex: 1, background: m.tone === 'warn' ? 'rgba(255,170,40,0.12)' : m.tone === 'fix' ? 'rgba(224,42,136,0.14)' : '#161616', border: `1px solid ${m.tone === 'warn' ? '#ffaa28' : m.tone === 'fix' ? R.pink : R.line}`, borderRadius: 14, padding: '7px 13px', boxShadow: m.tone ? `0 0 26px ${m.tone === 'warn' ? '#ffaa2855' : '#E02A8855'}` : 'none'}}>
                    <div style={{fontSize: 13, fontWeight: 700, color: m.m!.color === R.blue ? '#5aa2f0' : m.m!.color}}>{m.m!.name}</div>
                    <div style={{fontSize: fs, lineHeight: 1.35, color: 'rgba(255,255,255,0.92)'}}>{m.text}</div>
                  </div>
                </div>
              </In>
            ),
          )}
          {dots && (
            <div style={{display: 'flex', gap: 14, paddingLeft: 4}}>
              {TEAM.map((t, i) => (
                <div key={t.key} style={{display: 'flex', alignItems: 'center', gap: 4, background: '#161616', borderRadius: 12, padding: '6px 9px'}}>
                  <Bot shape={t.shape} color={t.color} size={16} bob={0} />
                  {[0, 1, 2].map((k) => <div key={k} style={{width: 5, height: 5, borderRadius: 3, background: '#fff', opacity: 0.3 + 0.7 * Math.max(0, Math.sin((f - i * 3 - k * 4) / 4))}} />)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{height: 42, borderRadius: 9999, background: R.card2, border: `1.5px solid ${R.line}`, display: 'flex', alignItems: 'center', padding: '0 8px 0 16px', gap: 10, fontSize: 15}}>
          <span style={{color: R.dim, fontSize: 20}}>+</span>
          <span style={{flex: 1, color: typedText ? '#fff' : R.dim, whiteSpace: 'nowrap', overflow: 'hidden'}}>
            {typedText ? (typedText.length > 72 ? '…' + typedText.slice(-72) : typedText) : `Message #${name}`}
            {input && f < input.sendAt && <span style={{opacity: f % 20 < 10 ? 1 : 0}}>▌</span>}
          </span>
          <div style={{width: 30, height: 30, borderRadius: 15, background: R.pink}} />
        </div>
      </div>
    </div>
  );
};

/** Small headline used by custom scenes (label + title, like real/ui Head). */
export {Head} from '../../real/ui';
export {M, TEAM};
export const Kicker: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 120}) => (
  <Abs x={0} y={y} style={{width: 1280, textAlign: 'center', fontFamily: mono.fontFamily, color: ACC, fontSize: 22, letterSpacing: 4}}>{children}</Abs>
);
export {Pill, In, Abs, RSlide, R, Bot};
