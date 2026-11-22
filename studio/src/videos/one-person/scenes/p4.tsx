import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Abs, Card, Head, In, Pill, R, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';
import {mkPrompt} from './p2';

/** Scenes for part 4 (op-4-marketing). */
const DIM = 'var(--op-dim, rgba(255,255,255,0.42))';
const ACC = '#ff7a1a';
const GLASS = 'rgba(255,255,255,0.12)';

/* 1 chapter card: third on purpose */
export const Intro4OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const drift = (f * 0.4) % 80;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="ding" vol={0.25} dur={40} />
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.12}}>
        {Array.from({length: 9}).map((_, i) => (
          <div key={i} style={{fontSize: 70, fontWeight: 800, letterSpacing: 6, whiteSpace: 'nowrap', transform: `translateX(${(i % 2 ? -1 : 1) * drift - 200}px)`, lineHeight: '80px'}}>
            {'MARKETING · MARKETING · MARKETING · MARKETING'}
          </div>
        ))}
      </div>
      <Abs x={0} y={120} style={{width: 1280, textAlign: 'center', fontFamily: mono.fontFamily, color: ACC, fontSize: 24, letterSpacing: 4}}>RUNG 3</Abs>
      <In at={at(0.08)} tick={false} style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontSize: 230, fontWeight: 800, letterSpacing: -8, lineHeight: 1}}>
        <span style={{color: ACC}}>04</span>
      </In>
      <In at={at(0.2)} style={{position: 'absolute', left: 0, right: 0, top: 390, textAlign: 'center', fontSize: 64, fontWeight: 700}}>Marketing</In>
    </RSlide>
  );
};

/* 2 order: why third */
export const Order4OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const rungs: [string, string][] = [['1', 'Inbox'], ['2', 'Delivery'], ['3', 'Marketing']];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.6)} name="ding" vol={0.25} dur={40} />
      <Head label="Why this order">Build the *foundation* first</Head>
      <Abs x={110} y={200} style={{display: 'flex', alignItems: 'flex-end', gap: 20}}>
        {rungs.map(([n, t], i) => (
          <Card key={t} at={at(0.08) + i * at(0.15)} box={{width: 200, height: 120 + i * 50, textAlign: 'center', paddingTop: 20, border: i === 2 ? `2px solid ${ACC}` : undefined}}>
            <div style={{fontFamily: mono.fontFamily, color: ACC, fontSize: 20}}>{n}</div>
            <div style={{fontSize: 30, fontWeight: 700}}>{t}</div>
            <div style={{fontSize: 18, color: DIM, marginTop: 6}}>{i === 2 ? 'last, not first' : 'ready'}</div>
          </Card>
        ))}
      </Abs>
      <Abs x={850} y={210} style={{width: 320}}>
        <In at={at(0.5)}><div style={{fontSize: 18, color: DIM, fontFamily: mono.fontFamily}}>HAPPY CUSTOMERS</div></In>
        <div style={{display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap'}}>
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} style={{width: 48, height: 48, borderRadius: '50%', background: R.green, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: interpolate(f, [at(0.55) + i * 3, at(0.55) + i * 3 + 8], [0, 1], clamp)}}>🙂</div>
          ))}
        </div>
        <In at={at(0.85)} style={{marginTop: 22}}><Pill kind="white" size={22}>Happy ones refer others</Pill></In>
      </Abs>
    </RSlide>
  );
};

/* 3 daily: manual vs every day */
export const Daily4OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const you = [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Head label="The problem">Marketing that depends on *you* stops</Head>
      {[['You, when you have time', you, 'rgba(255,255,255,0.3)', 0.1], ['A Bot, every day', days.map(() => 1), ACC, 0.45]].map(([t, arr, c, st], r) => (
        <Abs key={String(t)} x={110} y={200 + r * 140} style={{width: 1060}}>
          <div style={{fontSize: 24, marginBottom: 12, color: r ? '#fff' : 'rgba(255,255,255,0.7)'}}>{t as string}</div>
          <div style={{display: 'flex', gap: 10}}>
            {(arr as number[]).map((v, i) => (
              <In key={i} at={at(st as number) + i * 3} tick={false}>
                <div style={{width: 66, height: 56, borderRadius: 12, background: v ? (c as string) : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: v ? '#111' : DIM, fontWeight: 700}}>{days[i]}</div>
              </In>
            ))}
          </div>
        </Abs>
      ))}
      <In at={at(0.8)} style={{position: 'absolute', left: 110, top: 480}}><Pill kind="ghost" size={22}>Consistency is the foundation</Pill></In>
    </RSlide>
  );
};

/* 4 data: best-fit customers */
export const Data4OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const best = new Set([2, 6, 9, 13, 17, 20]);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.25} dur={40} />
      <Head label="Rung 3 · Data">Your *best-fit* customers</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 380}}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily}}>INTAKE FORMS FROM DELIVERY</div>
        {['Knew they had the problem', 'Liked the solution', 'Happy with the result'].map((t, i) => (
          <In key={t} at={at(0.2) + i * at(0.1)} style={{marginTop: 14, fontSize: 22}}><span style={{color: R.green}}>✓ </span>{t}</In>
        ))}
      </Card>
      <Abs x={560} y={200} style={{display: 'grid', gridTemplateColumns: 'repeat(7, 80px)', gap: 12}}>
        {Array.from({length: 21}).map((_, i) => {
          const on = best.has(i);
          const lit = on && f > at(0.5) + [...best].indexOf(i) * 4;
          return <div key={i} style={{width: 80, height: 80, borderRadius: '50%', background: lit ? ACC : 'rgba(255,255,255,0.14)', boxShadow: lit ? `0 0 24px ${ACC}88` : 'none', opacity: interpolate(f, [at(0.1) + i * 2, at(0.1) + i * 2 + 8], [0, 1], clamp)}} />;
        })}
      </Abs>
      <In at={at(0.78)} style={{position: 'absolute', left: 560, top: 495}}><Pill kind="white" size={22}>Everyone like them is a target</Pill></In>
    </RSlide>
  );
};

/* 6 consumer: publicly complaining → helpful reply */
export const Consumer4OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.22} dur={40} />
      <Head label="Selling to consumers">Find the *public complaint*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 500}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 42, height: 42, borderRadius: '50%', background: R.blue}} />
          <div><div style={{fontSize: 20, fontWeight: 600}}>Local neighbour</div><div style={{fontSize: 15, color: DIM}}>public post · 2h ago</div></div>
        </div>
        <div style={{fontSize: 23, lineHeight: 1.45, marginTop: 14}}>Anyone know a good gym nearby? Every one I try is packed or far away. So tired of this.</div>
      </Card>
      <Abs x={625} y={320} style={{fontSize: 48, color: DIM}}>→</Abs>
      <Card at={at(0.5)} style={{position: 'absolute', left: 700, top: 215}} box={{width: 470}} hl={ACC}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <Bot shape="drop" color={R.white} size={36} /><span style={{fontSize: 16, color: ACC, fontFamily: mono.fontFamily}}>SUGGESTED REPLY</span>
        </div>
        <div style={{fontSize: 22, lineHeight: 1.45, marginTop: 12}}>Quiet hours are 6–8 a.m. at most gyms. Happy to share a few that stay calm if that helps.</div>
        <div style={{marginTop: 14}}><Pill kind="white" size={18}>Genuinely helpful, no hard sell</Pill></div>
      </Card>
    </RSlide>
  );
};

/* 5 blueprint: the daily instruction */
export const Blueprint4OP = mkPrompt(
  'Rung 3 · Playbook',
  'Tell it *who to find*',
  'Every day, find me new people like my best clients: they have this problem, live in this city, and run a business of this size. Search public posts and groups, and bring me the best matches.',
  ['Looks like your best clients', 'Public posts and groups', 'Best matches only'],
);

/* 9 home builder example */
export const Home4OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const groups = ['Local home projects', 'Renovation tips', 'Our street'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.6)} name="ding" vol={0.25} dur={40} />
      <Head label="One example">A home builder, *gently*</Head>
      <Abs x={110} y={200} style={{width: 330}}>
        <div style={{fontSize: 18, color: DIM, fontFamily: mono.fontFamily, marginBottom: 12}}>BOT SCANS LOCAL GROUPS</div>
        {groups.map((g, i) => (
          <Card key={g} at={at(0.08) + i * at(0.1)} box={{marginBottom: 12, padding: '14px 18px', fontSize: 22}}>👥 {g}</Card>
        ))}
      </Abs>
      <Abs x={470} y={300} style={{fontSize: 48, color: DIM}}>→</Abs>
      <Card at={at(0.4)} style={{position: 'absolute', left: 560, top: 200}} box={{width: 610}}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily}}>SOMEONE POSTS</div>
        <div style={{fontSize: 23, marginTop: 8}}>“Thinking about extending our kitchen this year…”</div>
        <In at={at(0.65)} style={{marginTop: 20}}>
          <div style={{background: GLASS, borderRadius: 16, padding: '14px 18px', fontSize: 21, lineHeight: 1.4}}>
            Lovely plan! If you ever want to design your dream home, just say.
          </div>
        </In>
      </Card>
    </RSlide>
  );
};

export const Iterate4OP = mkPrompt(
  'Make it novel',
  'Ask for a *more specific* problem',
  'These topics feel broad and familiar. Give me ten more, each about one specific problem a client can actually see and notice.',
  ['Specific', 'Observable', 'Then: camera, talk, publish'],
);
