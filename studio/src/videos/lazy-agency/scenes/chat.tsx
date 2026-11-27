import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {BOT_COLORS} from '../../../lib/GrokBotMark';
import type {BotShape} from '../../../lib/GrokBotMark';
import {Head, In, IconCheck, IconMic, IconPlus, IconSearch, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';
import {ACC} from './common';

/**
 * Recreated Grok Bot desktop chat window in LIGHT mode (reference: the macOS app in tiktok-7706), English invented text.
 * A Bot does a task: steps tick off, results appear.
 */
export const L = {
  bg: '#ffffff',
  rail: '#f3f3f7',
  card: '#ebebf1',
  bubble: '#f4f4f8',
  line: 'rgba(21,21,28,0.10)',
  text: '#15151c',
  dim: 'rgba(21,21,28,0.5)',
  mute: 'rgba(21,21,28,0.7)',
};

type Block =
  | {k: 'text'; t: string}
  | {k: 'steps'; items: string[]; gap?: number}
  | {k: 'leads'; rows: [string, string, string][]}
  | {k: 'site'; name: string; lines: string[]}
  | {k: 'review'; stars: number; quote: string; reply: string};
type Th = {name: string; prev: string; shape: BotShape; color: string};

const Step: React.FC<{t: string; at: number}> = ({t, at}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const done = f >= at + 12;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: done ? L.text : L.mute, padding: '3px 0'}}>
      {done ? <IconCheck s={16} c="#1a9b5c" /> : <div style={{width: 14, height: 14, borderRadius: 7, border: `2px solid ${ACC}`, borderTopColor: 'transparent', transform: `rotate(${f * 24}deg)`}} />}
      {t}
    </div>
  );
};

const Blocks: React.FC<{blocks: Block[]; at: number}> = ({blocks, at}) => {
  const f = useCurrentFrame();
  let t0 = at;
  return (
    <>
      {blocks.map((b, bi) => {
        const start = t0;
        if (b.k === 'steps') t0 += b.items.length * (b.gap ?? 16) + 8;
        else t0 += 20;
        if (f < start) return null;
        if (b.k === 'text') return <div key={bi} style={{fontSize: 15, lineHeight: 1.4, marginBottom: 6}}>{b.t}</div>;
        if (b.k === 'steps') return <div key={bi} style={{marginBottom: 6}}>{b.items.map((s, i) => <Step key={s} t={s} at={start + i * (b.gap ?? 16)} />)}</div>;
        if (b.k === 'leads')
          return (
            <div key={bi} style={{background: '#fff', borderRadius: 12, border: `1px solid ${L.line}`, padding: '6px 10px', marginTop: 4}}>
              {b.rows.map(([n, ph, s], i) => (
                <div key={n} style={{display: 'flex', gap: 10, fontSize: 13.5, padding: '3px 0', opacity: f >= start + i * 6 ? 1 : 0, borderTop: i ? `1px solid ${L.line}` : 'none'}}>
                  <span style={{flex: 1.4, fontWeight: 600}}>{n}</span>
                  <span style={{flex: 1, color: L.mute}}>{ph}</span>
                  <span style={{color: '#e0600a', fontWeight: 600}}>{s}</span>
                </div>
              ))}
            </div>
          );
        if (b.k === 'site')
          return (
            <div key={bi} style={{background: '#fff', borderRadius: 12, border: `1px solid ${L.line}`, overflow: 'hidden', marginTop: 4, width: 300}}>
              <div style={{background: 'linear-gradient(120deg,#2d6a3a,#1c3a2a)', padding: '10px 12px', color: '#fff'}}>
                <div style={{fontSize: 16, fontWeight: 700}}>{b.name}</div>
                <div style={{fontSize: 12, color: 'rgba(255,255,255,0.75)'}}>{b.lines[0]}</div>
              </div>
              <div style={{padding: '8px 12px', display: 'flex', gap: 6}}>
                {[0, 1, 2, 3].map((k) => <div key={k} style={{flex: 1, height: 26, borderRadius: 6, background: `hsl(${120 + k * 8},35%,${40 + k * 4}%)`}} />)}
              </div>
              <div style={{padding: '0 12px 10px'}}><div style={{display: 'inline-block', background: ACC, color: '#fff', borderRadius: 9999, padding: '4px 14px', fontSize: 13, fontWeight: 700}}>{b.lines[1]}</div></div>
            </div>
          );
        return (
          <div key={bi} style={{background: '#fff', borderRadius: 12, border: `1px solid ${L.line}`, padding: '8px 12px', marginTop: 4, fontSize: 14}}>
            <div style={{color: '#f0a500', letterSpacing: 2}}>{'★'.repeat(b.stars)}</div>
            <div style={{color: L.mute, margin: '2px 0 6px'}}>"{b.quote}"</div>
            <div style={{borderLeft: `3px solid ${ACC}`, paddingLeft: 10}}>{b.reply}</div>
          </div>
        );
      })}
    </>
  );
};

export const THREADS: Th[] = [
  {name: 'Lead Hunter', prev: 'Found 548 with no website', shape: 'drop', color: BOT_COLORS.pink},
  {name: 'Site Builder', prev: 'Draft ready to send', shape: 'blob', color: BOT_COLORS.green},
  {name: 'Review Replier', prev: 'Replied to 3 reviews', shape: 'pillow', color: BOT_COLORS.orange},
  {name: 'Invoice Bot', prev: 'Sent 4 invoices', shape: 'circle', color: BOT_COLORS.blue},
  {name: 'Inbox Bot', prev: 'Drafted 12 replies', shape: 'drop', color: BOT_COLORS.violet},
];

export const TrafficLights: React.FC = () => (
  <div style={{display: 'flex', gap: 8}}>
    {['#ff5f57', '#febc2e', '#28c840'].map((c) => <div key={c} style={{width: 12, height: 12, borderRadius: 6, background: c}} />)}
  </div>
);

/** One chat scene. `typeAt` = when the user starts typing, `sendAt` = when it is sent (fractions of the scene). */
export const mkChat = (o: {label: string; title: string; active: number; bot: string; ask: string; typeAt?: number; sendAt: number; replies: {at: number; blocks: Block[]}[]; panelNote?: string}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const th = THREADS[o.active];
  const send = at(o.sendAt);
  const askShown = f >= send;
  const working = f > send + 8;
  const pulse = 0.55 + 0.45 * Math.sin(f / 5);
  const typedText = askShown ? '' : typed(o.ask, f, at(o.typeAt ?? 0.08), 38);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(o.typeAt ?? 0.08)} name="typing" vol={0.15} dur={Math.max(30, send - at(o.typeAt ?? 0.08))} />
      <Sfx at={send} name="pop2" vol={0.2} dur={20} />
      <Head label={o.label}>{o.title}</Head>
      <div style={{position: 'absolute', left: 72, top: 158, width: 1136, height: 388, borderRadius: 18, background: L.bg, color: L.text, border: `1px solid ${L.line}`, boxShadow: '0 28px 70px rgba(40,50,90,0.28)', display: 'flex', overflow: 'hidden'}}>
        <div style={{width: 224, background: L.rail, borderRight: `1px solid ${L.line}`, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
            <TrafficLights />
            <div style={{display: 'flex', gap: 8}}>
              {[<IconSearch key="s" s={14} />, <IconPlus key="p" s={14} />].map((ic, i) => <div key={i} style={{width: 26, height: 26, borderRadius: '50%', background: '#fff', border: `1px solid ${L.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: L.text}}><span style={{filter: 'invert(1)'}}>{ic}</span></div>)}
            </div>
          </div>
          {THREADS.map((t, i) => (
            <div key={t.name} style={{display: 'flex', alignItems: 'center', gap: 9, padding: '7px 8px', borderRadius: 12, background: i === o.active ? '#fff' : 'transparent', boxShadow: i === o.active ? '0 2px 8px rgba(40,50,90,0.10)' : 'none'}}>
              <Bot shape={t.shape} color={t.color} size={28} phase={i * 7} bob={1.5} />
              <div style={{minWidth: 0, flex: 1}}>
                <div style={{fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap'}}>{t.name}</div>
                <div style={{fontSize: 11.5, color: L.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{t.prev}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0 12px', minWidth: 0}}>
          <div style={{flex: 1, width: 600, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, overflow: 'hidden', paddingBottom: 8}}>
            {askShown && (
              <In at={send} style={{alignSelf: 'flex-end'}}>
                <div style={{background: th.color, color: '#fff', borderRadius: 9999, padding: '8px 18px', fontSize: 15, fontWeight: 500, maxWidth: 440}}>{o.ask}</div>
              </In>
            )}
            {o.replies.map((r, i) =>
              f >= at(r.at) ? (
                <In key={i} at={at(r.at)} tick={false}>
                  <div style={{background: L.bubble, border: `1px solid ${L.line}`, borderRadius: 16, padding: '10px 14px'}}>
                    <Blocks blocks={r.blocks} at={at(r.at)} />
                  </div>
                </In>
              ) : null,
            )}
          </div>
          <div style={{width: 600, height: 40, borderRadius: 9999, background: L.rail, border: `1px solid ${L.line}`, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 10, fontSize: 14}}>
            <span style={{color: L.dim, fontSize: 20}}>+</span>
            <span style={{flex: 1, color: typedText ? L.text : L.dim}}>
              {typedText || `Message ${th.name}`}
              {!askShown && <span style={{opacity: f % 20 < 10 ? 1 : 0, color: th.color}}>▌</span>}
            </span>
            <IconMic s={15} c={L.dim} />
            <div style={{width: 26, height: 26, borderRadius: 13, background: th.color}} />
          </div>
        </div>
        <div style={{width: 236, borderLeft: `1px solid ${L.line}`, background: L.rail, padding: '14px 12px'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Bot shape={th.shape} color={th.color} size={62} bob={3} />
            <div style={{fontSize: 17, fontWeight: 600, marginTop: 4}}>{th.name}</div>
            <div style={{display: 'flex', gap: 6, marginTop: 8, fontSize: 12.5}}>
              <span style={{background: '#fff', borderRadius: 9999, padding: '3px 11px', border: `1px solid ${L.line}`}}>Activity</span>
              <span style={{color: L.dim, padding: '3px 11px'}}>Library</span>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: L.mute, margin: '14px 2px 6px'}}><span>Suggested</span><span style={{color: L.dim}}>Hide</span></div>
          <div style={{background: '#fff', border: `1px solid ${L.line}`, borderRadius: 14, padding: '10px 12px', fontSize: 14, display: 'flex', justifyContent: 'space-between'}}><span>Create a routine</span><span style={{color: L.dim}}>›</span></div>
          <div style={{fontSize: 12.5, color: L.mute, margin: '14px 2px 6px'}}>Computer</div>
          <div style={{background: '#fff', border: `1px solid ${L.line}`, borderRadius: 14, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10}}>
            <div style={{flex: 1}}>
              <div style={{fontSize: 14, fontWeight: 600}}>Bot's computer</div>
              <div style={{fontSize: 12.5, color: working ? '#e0600a' : L.dim, opacity: working ? pulse : 1}}>{working ? o.panelNote ?? 'Working…' : 'Awake'}</div>
            </div>
            <div style={{width: 52, height: 36, borderRadius: 8, background: `linear-gradient(${interpolate(f, [0, 90], [0, 180], clamp)}deg, ${th.color}99, #f0f0f4)`}} />
          </div>
        </div>
      </div>
    </RSlide>
  );
};
