import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Card} from '../../real/ui';
import {Ico, IcoBox} from '../../lazy-agency/scenes/common';
import type {IcoName} from '../../lazy-agency/scenes/common';
import {ACC, Abs, Bot, DIM, Head, In, M, Pill, RSlide, RealSrc, SHOT, TEAM} from './common';
import {mkShot} from './p1';

const RED = '#e5484d';
const GREEN = '#1a9b5c';

/* ============ HOOK ============ */

/** hook-result: 8:00, three finished results slam in, brief notification drops. */
export const HookResult: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const mins = interpolate(f, [0, at(0.18)], [7 * 60 + 52, 8 * 60], clamp);
  const res: {ico: IcoName; t: string; s: string; c: string}[] = [
    {ico: 'box', t: 'Store checked', s: '3 items low · flagged', c: M.larm.color},
    {ico: 'doc', t: 'Reports written', s: '6 client cards', c: M.rarm.color},
    {ico: 'cal', t: 'Plan waiting', s: 'top 5 moves', c: M.head.color},
  ];
  const note = spring({frame: f - at(0.72), fps, config: {damping: 14, stiffness: 150}});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.18)} name="ding" vol={0.28} dur={40} />
      {res.map((_, i) => <Sfx key={i} at={at(0.26) + i * at(0.13)} name="pop2" vol={0.24} dur={20} />)}
      <Abs x={0} y={70} style={{width: 1280, textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: mono.fontFamily, fontSize: 96, fontWeight: 800, letterSpacing: -2, color: mins >= 480 ? ACC : '#15151c'}}>
          {Math.floor(mins / 60)}:{String(Math.floor(mins % 60)).padStart(2, '0')}
          <span style={{fontSize: 34, color: DIM, marginLeft: 12}}>AM</span>
        </div>
      </Abs>
      {res.map((r, i) => {
        const p = spring({frame: f - (at(0.26) + i * at(0.13)), fps, config: {damping: 11, stiffness: 190}});
        return (
          <div key={r.t} style={{position: 'absolute', left: 110 + i * 360, top: 230, opacity: Math.min(1, p * 2), transform: `scale(${1.6 - 0.6 * p}) rotate(${(1 - p) * (i - 1) * 8}deg)`}}>
            <div style={{width: 330, background: '#fff', borderRadius: 26, boxShadow: 'var(--op-shadow)', padding: '22px 22px', display: 'flex', alignItems: 'center', gap: 16, borderLeft: `8px solid ${r.c}`}}>
              <IcoBox n={r.ico} s={60} c={r.c} />
              <div>
                <div style={{fontSize: 27, fontWeight: 800}}>{r.t} <span style={{color: GREEN}}>✓</span></div>
                <div style={{fontSize: 17, color: DIM, fontWeight: 600}}>{r.s}</div>
              </div>
            </div>
          </div>
        );
      })}
      {f > at(0.72) && (
        <div style={{position: 'absolute', left: 340, top: 380 - (1 - note) * 120, opacity: note}}>
          <div style={{width: 600, background: 'rgba(255,255,255,0.96)', borderRadius: 22, boxShadow: '0 18px 50px rgba(30,40,80,0.25)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14}}>
            <Bot shape={M.head.shape} color={M.head.color} size={50} bob={0} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 14, color: DIM, fontWeight: 700}}>GROK BOT · now</div>
              <div style={{fontSize: 21, fontWeight: 800}}>Chief Brain: your morning brief is ready</div>
            </div>
          </div>
        </div>
      )}
    </RSlide>
  );
};

/** hook-claim: "I didn't do any of it." → five Bots pop in. */
export const HookClaim: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.05)} name="whoosh" vol={0.22} dur={25} />
      {TEAM.map((_, i) => <Sfx key={i} at={at(0.42) + i * 5} name={`tick${(i % 3) + 1}`} vol={0.2} />)}
      <In at={at(0.04)} tick={false} style={{position: 'absolute', left: 0, width: 1280, top: 120, textAlign: 'center', fontSize: 100, fontWeight: 800, letterSpacing: -4}}>
        I didn’t do <span style={{color: ACC}}>any</span> of it.
      </In>
      <Abs x={0} y={290} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 34}}>
        {TEAM.map((m, i) => (
          <In key={m.key} at={at(0.42) + i * 5} tick={false} style={{textAlign: 'center'}}>
            <div style={{width: 130, height: 130, borderRadius: 65, background: '#fff', boxShadow: 'var(--op-shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Bot shape={m.shape} color={m.color} size={86} phase={i * 8} />
            </div>
            <div style={{fontSize: 18, fontWeight: 800, marginTop: 8}}>{m.name}</div>
          </In>
        ))}
      </Abs>
      <In at={at(0.7)} style={{position: 'absolute', left: 0, width: 1280, top: 485, textAlign: 'center'}}>
        <Pill kind="dark" size={24}># one group chat · they fix each other{f % 30 < 15 ? '' : ''}</Pill>
      </In>
    </RSlide>
  );
};

/** hook-loop: exact messages flicker (left), locked "tip 3" card (right). */
const SNIPS = ['You are Chief Brain, the head of my team…', 'You look after Driftwood Supply. Track every product…', 'You are the Client Bot for Brightlane…', 'Plan content for both businesses…', 'Find ten small businesses that could use…'];
export const HookLoop: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const k = Math.min(4, Math.floor(interpolate(f, [at(0.08), at(0.5)], [0, 5], clamp)));
  const m = TEAM[k];
  const shake = f > at(0.62) && f < at(0.72) ? Math.sin(f * 2) * 5 : 0;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.6)} name="ding" vol={0.24} dur={40} />
      <Head label="By the end of this video">The exact messages, *no code*</Head>
      <Card at={at(0.04)} style={{position: 'absolute', left: 90, top: 190}} box={{width: 560, minHeight: 250, padding: '18px 22px'}} hl={m.color}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12}}>
          <Bot shape={m.shape} color={m.color} size={40} bob={1} />
          <div style={{fontFamily: mono.fontFamily, fontSize: 15, letterSpacing: 2, color: m.color}}>THE EXACT MESSAGE · {m.name.toUpperCase()}</div>
        </div>
        <div style={{fontSize: 27, fontWeight: 600, lineHeight: 1.4}}>{SNIPS[k]}</div>
        <div style={{display: 'flex', gap: 6, marginTop: 18}}>
          {TEAM.map((t, i) => <div key={t.key} style={{width: 34, height: 6, borderRadius: 3, background: i <= k ? t.color : 'rgba(21,21,28,0.12)'}} />)}
        </div>
      </Card>
      <In at={at(0.55)} style={{position: 'absolute', left: 720, top: 190}}>
        <div style={{width: 470, height: 250, borderRadius: 26, background: '#1d1d26', color: '#fff', padding: '22px 26px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden', transform: `translateX(${shake}px)`}}>
          <div style={{fontFamily: mono.fontFamily, fontSize: 15, letterSpacing: 3, color: ACC}}>STAY FOR TIP 3</div>
          <div style={{fontSize: 34, fontWeight: 800, marginTop: 10, lineHeight: 1.15}}>The one mistake that breaks everything</div>
          <div style={{position: 'absolute', right: 22, bottom: 14, fontSize: 90, fontWeight: 800, color: 'rgba(255,255,255,0.12)'}}>?</div>
          <div style={{position: 'absolute', left: 26, bottom: 22, display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, color: 'rgba(255,255,255,0.7)'}}>
            <Ico n="lock" s={22} c="rgba(255,255,255,0.7)" /> unlocks at the end
          </div>
        </div>
      </In>
    </RSlide>
  );
};

/* ============ PART 1 additions ============ */

/** glue-cost: 4 min × 5 chats × 5 days → ≈ 2 h / week. */
export const GlueCost: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const terms = [
    {v: '4 min', s: 'per chat'},
    {v: '5 chats', s: 'every morning'},
    {v: '5 days', s: 'a week'},
  ];
  const total = interpolate(f, [at(0.55), at(0.78)], [0, 100], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.78)} name="ding" vol={0.25} dur={40} />
      <Head label="What being the glue costs">You, the *messenger*</Head>
      <Abs x={0} y={200} style={{width: 1280, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22}}>
        {terms.map((t, i) => (
          <React.Fragment key={t.v}>
            <In at={at(0.06) + i * at(0.12)}>
              <div style={{width: 230, background: '#fff', borderRadius: 24, boxShadow: 'var(--op-shadow)', padding: '20px 10px', textAlign: 'center'}}>
                <div style={{fontSize: 52, fontWeight: 800}}>{t.v}</div>
                <div style={{fontSize: 19, color: DIM, fontWeight: 600}}>{t.s}</div>
              </div>
            </In>
            {i < 2 && <In at={at(0.1) + i * at(0.12)} tick={false}><div style={{fontSize: 50, fontWeight: 800, color: DIM}}>×</div></In>}
          </React.Fragment>
        ))}
      </Abs>
      <In at={at(0.5)} tick={false} style={{position: 'absolute', left: 0, width: 1280, top: 370, textAlign: 'center'}}>
        <span style={{fontSize: 40, fontWeight: 800, color: DIM}}>= </span>
        <span style={{fontSize: 110, fontWeight: 800, letterSpacing: -4, color: RED}}>{Math.floor(total / 60)}h {String(Math.round(total % 60)).padStart(2, '0')}m</span>
        <span style={{fontSize: 34, fontWeight: 700, color: DIM}}> / week</span>
      </In>
    </RSlide>
  );
};

export const Memory = mkShot({
  label: 'Bots get smarter over time',
  title: 'They *remember* your business',
  spec: {...SHOT.team, crop: {x: 720, y: 40, w: 640, h: 430}, w: 500, x: 110, y: 160, hl: {x: 770, y: 290, w: 520, h: 140}},
  source: 'x.ai/bot',
  rows: [
    {ico: 'doc', t: 'Keeps context', s: 'from past conversations', c: '#5b6cff'},
    {ico: 'people', t: 'Learns how you work', s: 'no re-explaining'},
    {ico: 'bolt', t: 'Suggests improvements', s: 'you approve or skip', c: GREEN},
  ],
  rowsX: 720,
});

/** teach: real "Show a Bot how it's done" + watch → remember → repeat. */
export const Teach: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const steps: {ico: IcoName; t: string; s: string}[] = [
    {ico: 'eye', t: 'Watch', s: 'you do it once'},
    {ico: 'doc', t: 'Remember', s: 'saves the steps'},
    {ico: 'bolt', t: 'Repeat', s: 'on its own'},
  ];
  const cur = Math.floor(interpolate(f, [at(0.35), at(0.85)], [0, 3], clamp));
  return (
    <RSlide vo={vo}>
      <Head label="Hard to explain? Show it">Teach a job *once*</Head>
      <RealSrc spec={{...SHOT.computer, crop: {x: 90, y: 470, w: 620, h: 430}, w: 500, x: 110, y: 160, hl: {x: 130, y: 640, w: 560, h: 60}}} at={at(0.04)} source="x.ai/bot" />
      {steps.map((s, i) => (
        <In key={s.t} at={at(0.25) + i * at(0.12)} style={{position: 'absolute', left: 720, top: 200 + i * 98}}>
          <div style={{width: 470, display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 20, padding: '14px 18px', boxShadow: 'var(--op-shadow)', border: i === cur ? `3px solid ${ACC}` : '3px solid transparent'}}>
            <div style={{width: 46, height: 46, borderRadius: 23, background: i === 0 ? RED : ACC, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {i === 0 ? <div style={{width: 18, height: 18, borderRadius: 9, background: '#fff', opacity: f % 30 < 15 ? 1 : 0.4}} /> : <Ico n={s.ico} s={24} c="#fff" />}
            </div>
            <div>
              <div style={{fontSize: 26, fontWeight: 800}}>{s.t}</div>
              <div style={{fontSize: 17, color: DIM}}>{s.s}</div>
            </div>
          </div>
        </In>
      ))}
    </RSlide>
  );
};

export {typed};
