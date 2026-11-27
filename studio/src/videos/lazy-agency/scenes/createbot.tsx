import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Sfx, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {BOT_COLORS} from '../../../lib/GrokBotMark';
import type {BotShape} from '../../../lib/GrokBotMark';
import {Head, In, Pill, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';
import {ACC, IcoBox} from './common';
import type {IcoName} from './common';
import {L, THREADS, TrafficLights} from './chat';

const SHAPES: BotShape[] = ['drop', 'blob', 'circle', 'pillow'];
const DOTS = [BOT_COLORS.pink, BOT_COLORS.red, BOT_COLORS.orange, BOT_COLORS.green, BOT_COLORS.teal, BOT_COLORS.blue, BOT_COLORS.violet];

/**
 * "Create new Bot" dialog over a faded light app window (reference: the macOS app in tiktok-7706, rebuilt in English).
 * Name types, a shape and a colour get picked, the Create button lights up.
 */
export const mkCreateBot = (o: {label: string; title: string; name: string; rows: {ico: IcoName; t: string; c?: string}[]}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const pickShape = f > at(0.5) ? 5 : f > at(0.34) ? 2 : 0;
  const pickColor = f > at(0.64) ? 0 : 3;
  const shape = SHAPES[pickShape % 4];
  const color = DOTS[pickColor];
  const ready = f > at(0.78);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="typing" vol={0.15} dur={50} />
      <Sfx at={at(0.5)} name="pop1" vol={0.2} dur={20} />
      <Sfx at={at(0.78)} name="ding" vol={0.25} dur={40} />
      <Head label={o.label}>{o.title}</Head>
      {/* faded app window behind */}
      <In at={at(0.02)} tick={false} style={{position: 'absolute', left: 72, top: 170, width: 640, height: 370}}>
        <div style={{width: 640, height: 370, borderRadius: 18, background: L.bg, border: `1px solid ${L.line}`, boxShadow: '0 24px 60px rgba(40,50,90,0.22)', overflow: 'hidden', position: 'relative', color: L.text}}>
          <div style={{display: 'flex', height: '100%', opacity: 0.45}}>
            <div style={{width: 170, background: L.rail, padding: 10}}>
              <TrafficLights />
              <div style={{marginTop: 12}}>
                {THREADS.map((t, i) => (
                  <div key={t.name} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px'}}>
                    <Bot shape={t.shape} color={t.color} size={22} bob={0} />
                    <div style={{fontSize: 12.5, fontWeight: 700}}>{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{flex: 1, padding: 16}}>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{height: 18, borderRadius: 9, background: L.card, marginBottom: 12, width: `${90 - k * 14}%`}} />)}
            </div>
          </div>
          {/* dialog */}
          <div style={{position: 'absolute', left: 155, top: 18, width: 330, height: 334, borderRadius: 16, background: '#fff', boxShadow: '0 18px 50px rgba(30,40,80,0.35)', border: `1px solid ${L.line}`, padding: '12px 16px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 13, color: L.mute}}><span>Create new Bot</span><span>✕</span></div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 8}}><Bot shape={shape} color={color} size={70} bob={3} /></div>
            <div style={{textAlign: 'center', fontSize: 17, fontWeight: 700, margin: '6px 0 8px', minHeight: 24}}>{typed(o.name, f, at(0.12), 14)}<span style={{opacity: f % 20 < 10 && f < at(0.34) ? 1 : 0, color: ACC}}>|</span></div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, justifyItems: 'center'}}>
              {Array.from({length: 12}).map((_, i) => (
                <In key={i} at={at(0.24) + i * 2} tick={false}>
                  <div style={{width: 38, height: 38, borderRadius: 10, background: i === pickShape ? '#f1f1f6' : 'transparent', border: i === pickShape ? `2px solid ${color}` : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Bot shape={SHAPES[i % 4]} color={i === pickShape ? color : '#8a8a96'} size={26} bob={0} />
                  </div>
                </In>
              ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: 8, margin: '12px 0 10px'}}>
              {DOTS.map((c, i) => <div key={i} style={{width: 18, height: 18, borderRadius: 9, background: c, outline: i === pickColor ? `2px solid ${L.text}` : 'none', outlineOffset: 2}} />)}
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 9999, fontSize: 14, fontWeight: 700, background: ready ? '#1d1d26' : L.card, color: ready ? '#fff' : L.dim}}>Create</div>
            </div>
          </div>
        </div>
      </In>
      <In at={at(0.06)} style={{position: 'absolute', left: 770, top: 488}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, background: ACC, color: '#fff', fontWeight: 700, fontSize: 22, padding: '9px 20px', borderRadius: 14, boxShadow: `0 8px 26px ${ACC}77`}}>
          <span style={{background: '#fff', color: ACC, width: 28, height: 28, borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 17}}>1</span>
          Press + to make a Bot
        </div>
      </In>
      {o.rows.map((r, i) => (
        <In key={r.t} at={at(0.3) + i * at(0.12)} style={{position: 'absolute', left: 770, top: 200 + i * 80}}>
          <div style={{width: 430, background: '#fff', borderRadius: 22, border: '1px solid var(--op-line)', boxShadow: 'var(--op-shadow)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 16}}>
            <IcoBox n={r.ico} s={44} c={r.c} />
            <div style={{fontSize: 24, fontWeight: 600}}>{r.t}</div>
          </div>
        </In>
      ))}
      <In at={at(0.82)} style={{position: 'absolute', left: 770, top: 200 + o.rows.length * 80}}><Pill kind="white" size={22}>Ready in a few hours</Pill></In>
    </RSlide>
  );
};
