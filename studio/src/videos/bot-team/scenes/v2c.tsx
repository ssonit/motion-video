import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Sfx, clamp, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {ACC, Abs, Bot, DIM, Head, In, M, Pill, RSlide, TEAM} from './common';
import {Colossus} from './robot';

const GREEN = '#1a9b5c';

/* chief-plan: top-5 plan builds row by row, row 3 on HOLD */
export const ChiefPlan: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const rows = [
    {m: M.larm, t: 'Reorder hiking packs (12 left)', s: 'today'},
    {m: M.rarm, t: 'Send 6 report cards', s: 'needs your OK'},
    {m: M.chest, t: 'Hiking pack video', s: 'HOLD', hold: true},
    {m: M.legs, t: 'Reply to Summit Outdoor', s: 'draft ready'},
    {m: M.chest, t: 'Post café map tip', s: 'Thu'},
  ];
  const holdAt = at(0.62);
  return (
    <RSlide vo={vo}>
      <Sfx at={holdAt} name="tick3" vol={0.26} />
      <Head label="Chief Brain · today’s plan">Five things, in *order*</Head>
      <In at={at(0.03)} tick={false} style={{position: 'absolute', left: 160, top: 160}}>
        <div style={{width: 960, background: '#fff', borderRadius: 24, boxShadow: 'var(--op-shadow)', padding: '14px 26px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0 10px'}}>
            <Bot shape={M.head.shape} color={M.head.color} size={32} bob={1} />
            <div style={{fontSize: 20, fontWeight: 800}}>Top 5 for Tuesday</div>
            <div style={{flex: 1}} />
            <div style={{fontFamily: mono.fontFamily, fontSize: 15, color: DIM}}>built from 4 reports</div>
          </div>
          {rows.map((r, i) => {
            const hold = r.hold && f > holdAt;
            return (
              <In key={i} at={at(0.1) + i * at(0.08)} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderTop: '1px solid var(--op-line)'}}>
                <div style={{width: 40, height: 40, borderRadius: 12, background: hold ? M.chest.color : '#f2f2f6', color: hold ? '#fff' : '#15151c', fontSize: 22, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
                <Bot shape={r.m.shape} color={r.m.color} size={26} bob={0} />
                <div style={{flex: 1, fontSize: 23, fontWeight: 700, color: hold ? DIM : '#15151c', textDecoration: hold ? 'line-through' : 'none'}}>{r.t}</div>
                {(!r.hold || hold) && (
                  <span style={{fontSize: 15, fontWeight: 800, borderRadius: 9999, padding: '5px 12px', background: hold ? M.chest.color : '#f2f2f6', color: hold ? '#fff' : DIM}}>{r.s}</span>
                )}
              </In>
            );
          })}
        </div>
      </In>
    </RSlide>
  );
};

/* morning: night → sunrise, clock rolls to 8:00, phone notification with Yes */
export const Morning: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sun = interpolate(f, [at(0.05), at(0.4)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const mins = Math.round(interpolate(f, [at(0.05), at(0.4)], [2 * 60 + 14, 8 * 60], clamp));
  const hh = Math.floor(mins / 60);
  const mm = mins % 60;
  const note = spring({frame: f - at(0.45), fps, config: {damping: 13, stiffness: 140}});
  const yes = f > at(0.75);
  const mix = (a: number[], b: number[]) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * sun)).join(',')})`;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.45)} name="pop2" vol={0.26} dur={20} />
      <Sfx at={at(0.75)} name="ding" vol={0.24} dur={40} />
      <div style={{position: 'absolute', left: 80, top: 80, width: 620, height: 465, borderRadius: 28, overflow: 'hidden', background: `linear-gradient(180deg, ${mix([20, 24, 60], [255, 196, 140])}, ${mix([46, 40, 90], [255, 236, 210])})`, boxShadow: 'var(--op-shadow)'}}>
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{position: 'absolute', left: (i * 97) % 600, top: 20 + ((i * 53) % 180), width: 3, height: 3, borderRadius: 2, background: '#fff', opacity: (1 - sun) * 0.9}} />
        ))}
        <div style={{position: 'absolute', left: 250, top: 390 - sun * 200, width: 120, height: 120, borderRadius: 60, background: sun > 0.2 ? '#ffb347' : '#f4f1de', boxShadow: `0 0 ${60 * sun + 20}px ${sun > 0.2 ? '#ffb347' : '#f4f1de'}`}} />
        <svg width={620} height={465} style={{position: 'absolute', left: 0, top: 0}}>
          <path d="M0 360 Q 150 300 300 350 T 620 330 V465 H0Z" fill={mix([30, 30, 70], [120, 170, 120])} />
          <path d="M0 400 Q 200 360 380 395 T 620 380 V465 H0Z" fill={mix([20, 20, 50], [80, 140, 95])} />
        </svg>
        <div style={{position: 'absolute', left: 30, top: 26, fontFamily: mono.fontFamily, fontSize: 64, fontWeight: 700, color: sun > 0.5 ? '#2b1d10' : '#fff'}}>
          {String(hh).padStart(2, '0')}:{String(mm).padStart(2, '0')}
        </div>
        <div style={{position: 'absolute', left: 34, top: 108, fontSize: 20, fontWeight: 700, color: sun > 0.5 ? '#5a3d20' : 'rgba(255,255,255,0.7)'}}>{sun < 0.5 ? 'you’re asleep · the team is working' : 'good morning'}</div>
      </div>
      <div style={{position: 'absolute', left: 780, top: 90, width: 300, height: 450, borderRadius: 44, background: '#111', padding: 12, boxSizing: 'border-box', boxShadow: '0 24px 60px rgba(20,25,60,0.35)'}}>
        <div style={{width: '100%', height: '100%', borderRadius: 34, background: 'linear-gradient(180deg, #ffe2c4, #ffd0a8)', padding: '40px 14px', boxSizing: 'border-box', position: 'relative'}}>
          <div style={{textAlign: 'center', fontSize: 52, fontWeight: 300, color: '#3a2a1a'}}>8:00</div>
          <div style={{transform: `translateY(${(1 - note) * -80}px)`, opacity: Math.min(1, note * 2), marginTop: 26, background: 'rgba(255,255,255,0.92)', borderRadius: 20, padding: '12px 14px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <Bot shape={M.head.shape} color={M.head.color} size={24} bob={0} />
              <div style={{fontSize: 13, fontWeight: 800, flex: 1}}>Chief Brain</div>
              <div style={{fontSize: 11, color: DIM}}>now</div>
            </div>
            <div style={{fontSize: 16, fontWeight: 700, marginTop: 6}}>Today’s plan is ready</div>
            <div style={{fontSize: 13, color: DIM, marginTop: 2}}>5 items · 2 need your OK</div>
            <div style={{display: 'flex', gap: 8, marginTop: 10}}>
              <div style={{flex: 1, textAlign: 'center', borderRadius: 12, padding: '8px 0', fontSize: 15, fontWeight: 800, background: yes ? GREEN : ACC, color: '#fff', transform: `scale(${yes ? 1 : 1 + 0.04 * Math.sin(f / 4)})`}}>{yes ? '✓ Approved' : 'Yes'}</div>
              <div style={{flex: 1, textAlign: 'center', borderRadius: 12, padding: '8px 0', fontSize: 15, fontWeight: 700, background: '#eee', color: DIM}}>Open</div>
            </div>
          </div>
        </div>
      </div>
    </RSlide>
  );
};

/* week: Mon–Fri strip fills with result tiles, approvals counter */
export const Week: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const tiles: {m: (typeof TEAM)[number]; t: string}[][] = [
    [{m: M.larm, t: 'Stock checked'}, {m: M.rarm, t: '6 reports'}],
    [{m: M.chest, t: 'Video drafted'}, {m: M.legs, t: '10 leads'}, {m: M.larm, t: '3 descriptions'}],
    [{m: M.rarm, t: 'Ranks up 4'}, {m: M.chest, t: 'Posts planned'}],
    [{m: M.legs, t: '3 replies sent'}, {m: M.larm, t: 'Reorder placed'}, {m: M.chest, t: 'Café tip live'}],
    [{m: M.head, t: 'Week summary'}, {m: M.rarm, t: 'Client call prep'}],
  ];
  const approvals = Math.round(interpolate(f, [at(0.15), at(0.85)], [0, 23], clamp));
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.88)} name="ding" vol={0.24} dur={40} />
      <Head label="A normal week">The team works, you *approve*</Head>
      {days.map((d, di) => (
        <div key={d} style={{position: 'absolute', left: 70 + di * 200, top: 165, width: 186, height: 380, background: 'rgba(255,255,255,0.55)', borderRadius: 20, padding: 10, boxSizing: 'border-box'}}>
          <div style={{fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 8}}>{d}</div>
          {tiles[di].map((t, ti) => (
            <In key={ti} at={at(0.08) + di * at(0.13) + ti * 6} style={{marginBottom: 8}}>
              <div style={{background: '#fff', borderRadius: 14, boxShadow: 'var(--op-shadow)', padding: '9px 10px', borderLeft: `5px solid ${t.m.color}`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
                  <Bot shape={t.m.shape} color={t.m.color} size={18} bob={0} />
                  <span style={{fontSize: 12, color: DIM, fontWeight: 700}}>{t.m.name}</span>
                </div>
                <div style={{fontSize: 16, fontWeight: 700, marginTop: 4}}>{t.t}</div>
              </div>
            </In>
          ))}
        </div>
      ))}
      <In at={at(0.12)} style={{position: 'absolute', left: 1080, top: 170}}>
        <div style={{width: 150, background: '#1d1d26', color: '#fff', borderRadius: 22, padding: '16px 14px', textAlign: 'center'}}>
          <div style={{fontSize: 14, fontFamily: mono.fontFamily, letterSpacing: 2, color: 'rgba(255,255,255,0.6)'}}>APPROVALS</div>
          <div style={{fontSize: 64, fontWeight: 800, color: ACC, lineHeight: 1.1}}>{approvals}</div>
          <div style={{fontSize: 15, color: 'rgba(255,255,255,0.75)'}}>each one a tap</div>
        </div>
      </In>
    </RSlide>
  );
};

/* hours: before/after bars + count-up of hours back */
export const Hours: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const grow = interpolate(f, [at(0.08), at(0.4)], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const shrink = interpolate(f, [at(0.4), at(0.65)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const before = [
    {t: 'Checking stock', h: 3},
    {t: 'Client reports', h: 4},
    {t: 'Content planning', h: 3},
    {t: 'Finding leads', h: 3},
  ];
  const after = [0.5, 0.5, 0.5, 0.5];
  const back = Math.round(interpolate(f, [at(0.45), at(0.75)], [0, 11], clamp));
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.75)} name="ding" vol={0.26} dur={40} />
      <Head label="Hours per week">Where the time *comes back*</Head>
      <In at={at(0.03)} tick={false} style={{position: 'absolute', left: 90, top: 165}}>
        <div style={{width: 760, background: '#fff', borderRadius: 24, boxShadow: 'var(--op-shadow)', padding: '18px 26px'}}>
          {before.map((b, i) => {
            const h = b.h + (after[i] - b.h) * shrink;
            return (
              <div key={b.t} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0'}}>
                <div style={{width: 200, fontSize: 20, fontWeight: 700}}>{b.t}</div>
                <div style={{flex: 1, height: 34, background: '#f2f2f6', borderRadius: 10, position: 'relative'}}>
                  <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(h / 4.2) * 100 * grow}%`, borderRadius: 10, background: shrink > 0.5 ? GREEN : '#e5484d'}} />
                </div>
                <div style={{width: 70, textAlign: 'right', fontSize: 20, fontWeight: 800}}>{(h * grow).toFixed(1)}h</div>
              </div>
            );
          })}
          <div style={{display: 'flex', gap: 14, marginTop: 8, fontSize: 16, color: DIM, fontWeight: 700}}>
            <span style={{color: shrink < 0.5 ? '#e5484d' : DIM}}>● doing it yourself</span>
            <span style={{color: shrink > 0.5 ? GREEN : DIM}}>● reviewing the team</span>
          </div>
        </div>
      </In>
      <In at={at(0.45)} style={{position: 'absolute', left: 890, top: 190}}>
        <div style={{width: 300, background: '#1d1d26', color: '#fff', borderRadius: 26, padding: '24px 22px', textAlign: 'center'}}>
          <div style={{fontFamily: mono.fontFamily, fontSize: 15, letterSpacing: 2, color: 'rgba(255,255,255,0.6)'}}>BACK EACH WEEK</div>
          <div style={{fontSize: 120, fontWeight: 800, color: ACC, lineHeight: 1}}>{back}h</div>
          <div style={{fontSize: 18, color: 'rgba(255,255,255,0.8)', marginTop: 6}}>an example shop + agency</div>
        </div>
      </In>
    </RSlide>
  );
};

/* cta: robot head alone, start with the head */
export const Cta: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="pop2" vol={0.26} dur={20} />
      <Sfx at={at(0.55)} name="ding" vol={0.22} dur={40} />
      <Abs x={130} y={110}><Colossus h={420} parts={{head: at(0.1)}} glow="head" /></Abs>
      <Abs x={580} y={140} style={{fontFamily: mono.fontFamily, fontSize: 22, letterSpacing: 4, color: ACC}}><In at={at(0.04)} tick={false}>YOUR NEXT STEP</In></Abs>
      <In at={at(0.14)} tick={false} style={{position: 'absolute', left: 576, top: 180, fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02}}>
        Start with<br />the <span style={{color: ACC}}>head</span> today.
      </In>
      <Abs x={580} y={380} style={{display: 'flex', gap: 12}}>
        {['1 Bot', '1 message', 'tomorrow’s brief'].map((t, i) => (
          <In key={t} at={at(0.4) + i * at(0.07)}><Pill kind="dark" size={22}>{t}</Pill></In>
        ))}
      </Abs>
      <In at={at(0.65)} tick={false} style={{position: 'absolute', left: 582, top: 460, fontSize: 24, color: DIM, fontWeight: 600}}>
        Add one body part a day. The rest follows.
      </In>
    </RSlide>
  );
};
