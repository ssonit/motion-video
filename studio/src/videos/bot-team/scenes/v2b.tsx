import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {BOT_COLORS} from '../../../lib/GrokBotMark';
import {AppWindow, Card} from '../../real/ui';
import {Ico, IcoBox} from '../../lazy-agency/scenes/common';
import {ACC, Abs, Bot, BotTag, DIM, Head, In, M, Pill, R, RSlide, TEAM} from './common';
import {ALL, Colossus} from './robot';
import type {Member} from './robot';

const RED = '#e5484d';
const GREEN = '#1a9b5c';
const AMBER = '#f59e0b';

/* test: ask the Chief, one row wrong → fix the message */
export const Test: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const wrong = f > at(0.5);
  const fixed = f > at(0.78);
  const rows = [
    {m: M.larm, t: 'Store: stock + sales, 7:00 AM'},
    {m: M.rarm, t: fixed ? 'Clients: report cards, Mon 9:00' : 'Clients: posts to Instagram', bad: true},
    {m: M.chest, t: 'Content: week plan, Sun 6 PM'},
    {m: M.legs, t: 'Leads: scored list, 10 AM'},
  ];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="tick3" vol={0.24} />
      <Sfx at={at(0.78)} name="ding" vol={0.24} dur={40} />
      <Head label="Test before you go on">Ask the Chief: *who does what?*</Head>
      <In at={at(0.04)} style={{position: 'absolute', left: 90, top: 175}}>
        <div style={{width: 640, background: '#0A0A0A', color: '#fff', borderRadius: 18, padding: '16px 20px', boxShadow: '0 24px 60px rgba(20,25,60,0.35)'}}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{background: R.user, borderRadius: 9999, padding: '8px 16px', fontSize: 17, fontWeight: 600}}>What does each Bot do?</div>
          </div>
          <div style={{display: 'flex', gap: 10, marginTop: 12}}>
            <Bot shape={M.head.shape} color={M.head.color} size={32} bob={1} />
            <div style={{flex: 1, background: '#161616', borderRadius: 14, padding: '8px 12px', border: `1px solid ${R.line}`}}>
              {rows.map((r, i) => (
                <In key={i} at={at(0.14) + i * 7} tick={false} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', color: r.bad && wrong && !fixed ? '#ff7b7f' : '#fff', fontSize: 17}}>
                  <Bot shape={r.m.shape} color={r.m.color} size={20} bob={0} />
                  <span style={{flex: 1, textDecoration: r.bad && wrong && !fixed ? 'line-through' : 'none'}}>{r.t}</span>
                  {r.bad && wrong && <span style={{fontSize: 14, fontWeight: 800, color: fixed ? GREEN : RED}}>{fixed ? '✓ fixed' : '✗ wrong'}</span>}
                </In>
              ))}
            </div>
          </div>
        </div>
      </In>
      <In at={at(0.58)} style={{position: 'absolute', left: 780, top: 205}}>
        <div style={{width: 400, background: '#fff', borderRadius: 22, boxShadow: 'var(--op-shadow)', padding: '18px 22px', border: `3px solid ${GREEN}`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 800}}><Ico n="check" s={26} c={GREEN} /> Fix the message</div>
          <div style={{fontSize: 18, color: DIM, marginTop: 6}}>re-send it, the board rebuilds</div>
        </div>
      </In>
      <In at={at(0.66)} style={{position: 'absolute', left: 780, top: 340}}>
        <div style={{width: 400, background: 'rgba(255,255,255,0.55)', borderRadius: 22, padding: '18px 22px', border: '2px dashed rgba(21,21,28,0.2)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, fontWeight: 800, color: DIM}}><Ico n="x" s={26} c={RED} /> Patch the board</div>
          <div style={{fontSize: 18, color: DIM, marginTop: 6}}>breaks again tomorrow</div>
        </div>
      </In>
    </RSlide>
  );
};

/* chief-check: empty slot pulses, Chief asks, reply fills it */
export const ChiefCheck: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const ask = at(0.38);
  const reply = at(0.66);
  return (
    <RSlide vo={vo}>
      <Sfx at={ask} name="pop1" vol={0.22} dur={20} />
      <Sfx at={reply} name="ding" vol={0.24} dur={40} />
      <Head label="Chief Brain keeps watch">A missing report gets a *question*</Head>
      <Abs x={90} y={170} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: 560}}>
        {TEAM.slice(1).map((m, i) => {
          const empty = m.key === 'legs' && f < reply;
          return (
            <In key={m.key} at={at(0.04) + i * 5}>
              <div style={{height: 150, background: empty ? 'rgba(255,255,255,0.5)' : '#fff', borderRadius: 20, boxShadow: empty ? 'none' : 'var(--op-shadow)', padding: '14px 16px', boxSizing: 'border-box', border: empty ? `3px dashed ${RED}` : `3px solid transparent`, opacity: empty ? 0.6 + 0.4 * Math.sin(f / 5) : 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}><Bot shape={m.shape} color={m.color} size={30} bob={1} /><div style={{fontSize: 19, fontWeight: 800}}>{m.name}</div></div>
                <div style={{fontSize: 16, color: empty ? RED : GREEN, fontWeight: 700, marginTop: 14}}>{empty ? 'no report yet' : '✓ report in'}</div>
              </div>
            </In>
          );
        })}
      </Abs>
      <In at={ask} style={{position: 'absolute', left: 700, top: 200}}>
        <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', width: 500}}>
          <Bot shape={M.head.shape} color={M.head.color} size={44} bob={1} />
          <div style={{background: '#1d1d26', color: '#fff', borderRadius: 18, padding: '12px 16px', fontSize: 21, fontWeight: 600}}>@Lead Bot, no report today. Anything blocking you?</div>
        </div>
      </In>
      <In at={reply} style={{position: 'absolute', left: 760, top: 320}}>
        <div style={{display: 'flex', gap: 10, alignItems: 'flex-start', width: 440}}>
          <Bot shape={M.legs.shape} color={M.legs.color} size={44} bob={1} />
          <div style={{background: '#fff', borderRadius: 18, padding: '12px 16px', fontSize: 21, fontWeight: 600, boxShadow: 'var(--op-shadow)'}}>Search page timed out. Re-ran it, report is in.</div>
        </div>
      </In>
    </RSlide>
  );
};

/* exact-message scenes, four different looks */
const STORE_MSG = 'You look after Driftwood Supply. Track every product: how much is left, how fast it sells, and flag anything that runs out in under two weeks.';
export const StoreMsg: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const send = at(0.55);
  const shown = f < send ? typed(STORE_MSG, f, at(0.08), 30) : '';
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.08)} name="typing" vol={0.15} dur={send - at(0.08)} />
      <Sfx at={send} name="pop2" vol={0.22} dur={20} />
      <Head label="Store Bot · the exact message">Tell it *what to watch*</Head>
      <In at={at(0.02)} tick={false} style={{position: 'absolute', left: 72, top: 160}}>
        <AppWindow
          w={1136}
          h={380}
          threads={TEAM.map((t) => ({name: t.name, prev: t.job, shape: t.shape, color: t.color}))}
          active={1}
          bot={{name: 'Store Bot', shape: M.larm.shape, color: M.larm.color}}
          msgs={[
            {who: 'me', text: STORE_MSG, at: send},
            {who: 'bot', text: 'Got it. Building the stock page now, first check tomorrow at 7:00.', at: send + 16},
          ]}
          input={{text: shown.length > 64 ? '…' + shown.slice(-64) : shown, placeholder: 'Message Store Bot', cursor: f < send}}
          fs={15}
        />
      </In>
    </RSlide>
  );
};

const CLIENT_MSG: {t: string; k?: boolean}[] = [
  {t: 'You are the Client Bot for Brightlane. List our '},
  {t: 'six clients', k: true},
  {t: ', the '},
  {t: 'keywords we track', k: true},
  {t: ', and where each one ranks '},
  {t: 'this week and last week', k: true},
  {t: '. Then write one report card per client.'},
];
export const ClientMsg: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const full = CLIENT_MSG.map((s) => s.t).join('');
  const n = Math.floor(((f - at(0.06)) / 30) * 34);
  let used = 0;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.06)} name="typing" vol={0.15} dur={Math.round((full.length / 34) * 30)} />
      <Head label="Client Bot · the exact message">Three things to *track*</Head>
      <In at={at(0.02)} tick={false} style={{position: 'absolute', left: 230, top: 160}}>
        <div style={{width: 820, position: 'relative'}}>
          <div style={{position: 'absolute', left: 340, top: -18, width: 140, height: 40, borderRadius: 10, background: '#b8bcc8', zIndex: 2}} />
          <div style={{background: '#fffdf6', borderRadius: 22, boxShadow: 'var(--op-shadow)', padding: '40px 40px 30px', borderTop: `8px solid ${M.rarm.color}`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14}}>
              <Bot shape={M.rarm.shape} color={M.rarm.color} size={36} bob={1} />
              <div style={{fontFamily: mono.fontFamily, fontSize: 15, letterSpacing: 2, color: M.rarm.color}}>MESSAGE · CLIENT BOT</div>
            </div>
            <div style={{fontSize: 30, fontWeight: 600, lineHeight: 1.5}}>
              {CLIENT_MSG.map((s, i) => {
                const take = Math.max(0, Math.min(s.t.length, n - used));
                used += s.t.length;
                if (!take) return null;
                const txt = s.t.slice(0, take);
                return s.k ? (
                  <span key={i} style={{background: `${M.rarm.color}22`, color: M.rarm.color, borderRadius: 8, padding: '0 6px', fontWeight: 800}}>{txt}</span>
                ) : (
                  <span key={i}>{txt}</span>
                );
              })}
              <span style={{opacity: f % 20 < 10 ? 1 : 0, color: M.rarm.color}}>▌</span>
            </div>
          </div>
        </div>
      </In>
    </RSlide>
  );
};

const CONTENT_MSG = 'Plan content for Driftwood and Brightlane, using what the other Bots found this week.';
export const ContentMsg: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const send = at(0.5);
  const beam = interpolate(f, [at(0.6), at(0.8)], [0, 1], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.06)} name="typing" vol={0.15} dur={send - at(0.06)} />
      <Sfx at={send} name="whoosh" vol={0.2} dur={20} />
      <Head label="Content Bot · the exact message">Feed it the *team’s findings*</Head>
      <In at={at(0.02)} tick={false} style={{position: 'absolute', left: 140, top: 150}}>
        <div style={{width: 280, height: 390, borderRadius: 40, background: '#111', padding: 12, boxShadow: '0 24px 60px rgba(20,25,60,0.35)'}}>
          <div style={{width: '100%', height: '100%', borderRadius: 30, background: '#0A0A0A', color: '#fff', padding: '30px 14px 14px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 12}}>
              <Bot shape={M.chest.shape} color={M.chest.color} size={26} bob={0} />
              <span style={{fontSize: 15, fontWeight: 700}}>Content Bot</span>
            </div>
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8}}>
              {f >= send && (
                <In at={send} style={{alignSelf: 'flex-end'}}>
                  <div style={{background: M.chest.color, borderRadius: 16, padding: '8px 12px', fontSize: 14, lineHeight: 1.35}}>{CONTENT_MSG}</div>
                </In>
              )}
              {f >= send + 20 && <In at={send + 20}><div style={{background: '#1c1c1c', borderRadius: 16, padding: '8px 12px', fontSize: 14}}>Reading Store + Client reports…</div></In>}
            </div>
            <div style={{height: 34, borderRadius: 17, background: '#1a1a1a', marginTop: 10, fontSize: 12, padding: '0 12px', lineHeight: '34px', color: f < send ? '#fff' : 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden'}}>
              {f < send ? typed(CONTENT_MSG, f, at(0.06), 40).slice(-30) : 'Message'}
            </div>
          </div>
        </div>
      </In>
      {[
        {m: M.larm, t: 'Hiking packs selling fast', y: 200},
        {m: M.rarm, t: 'Cafés asking about maps', y: 330},
      ].map((s, i) => (
        <React.Fragment key={s.t}>
          <In at={at(0.55) + i * 8} style={{position: 'absolute', left: 760, top: s.y}}>
            <div style={{width: 400, background: '#fff', borderRadius: 20, boxShadow: 'var(--op-shadow)', padding: '14px 18px', borderLeft: `6px solid ${s.m.color}`}}>
              <BotTag m={s.m} size={17} />
              <div style={{fontSize: 21, fontWeight: 700, marginTop: 8}}>{s.t}</div>
            </div>
          </In>
          <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
            <line x1={760} y1={s.y + 50} x2={760 - 320 * beam} y2={s.y + 50 + (300 - s.y - 50) * beam} stroke={s.m.color} strokeWidth={4} strokeDasharray="9 7" strokeDashoffset={f * 1.5} opacity={beam > 0 ? 0.8 : 0} />
          </svg>
        </React.Fragment>
      ))}
    </RSlide>
  );
};

const LEAD_MSG: {t: string; k?: boolean}[] = [
  {t: '> Find '},
  {t: 'ten small businesses', k: true},
  {t: ' that could use Brightlane.\n> For each, look for the '},
  {t: 'biggest gap', k: true},
  {t: ' in what they show online.\n> Score hot / warm / cold.\n> '},
  {t: 'Drafts only.', k: true},
];
export const LeadMsg: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const n = Math.floor(((f - at(0.06)) / 30) * 40);
  let used = 0;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.06)} name="typing" vol={0.15} dur={110} />
      <Head label="Lead Bot · the exact message">Hunt for the *biggest gap*</Head>
      <In at={at(0.02)} tick={false} style={{position: 'absolute', left: 90, top: 165}}>
        <div style={{width: 1100, background: '#10201e', color: '#d8fff7', borderRadius: 18, boxShadow: '0 24px 60px rgba(10,40,40,0.35)', overflow: 'hidden'}}>
          <div style={{height: 38, background: '#0b1716', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px'}}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => <div key={c} style={{width: 11, height: 11, borderRadius: 6, background: c}} />)}
            <span style={{marginLeft: 10, fontFamily: mono.fontFamily, fontSize: 14, color: 'rgba(216,255,247,0.6)'}}>lead-bot · brief.txt</span>
          </div>
          <div style={{padding: '22px 28px', fontFamily: mono.fontFamily, fontSize: 27, lineHeight: 1.65, whiteSpace: 'pre-wrap', minHeight: 230}}>
            {LEAD_MSG.map((s, i) => {
              const take = Math.max(0, Math.min(s.t.length, n - used));
              used += s.t.length;
              if (!take) return null;
              const txt = s.t.slice(0, take);
              return s.k ? <span key={i} style={{color: '#fff', borderBottom: `4px solid ${M.legs.color}`, fontWeight: 700}}>{txt}</span> : <span key={i}>{txt}</span>;
            })}
            <span style={{opacity: f % 20 < 10 ? 1 : 0}}>█</span>
          </div>
        </div>
      </In>
    </RSlide>
  );
};

/* sellers: podium + three slow products get a new description */
export const Sellers: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pod = [
    {n: 'Wool socks', h: 150, c: '#d4a017', r: 1},
    {n: 'Water bottle', h: 115, c: '#9aa4b2', r: 2},
    {n: 'Camp mug', h: 90, c: '#c07a45', r: 3},
  ];
  const order = [1, 0, 2];
  const slow = [
    {n: 'Trek poles', d: 'Lighter than your coffee. Saves your knees on every descent.'},
    {n: 'Rain shell', d: 'Packs into its own pocket. Stays dry in a two-hour storm.'},
    {n: 'Dry bag', d: 'Phone, snacks, socks: dry, even if you drop it in the lake.'},
  ];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="ding" vol={0.22} dur={40} />
      <Sfx at={at(0.5)} name="typing" vol={0.14} dur={80} />
      <Head label="Store Bot · extra jobs">Top sellers, *second chances*</Head>
      <Abs x={90} y={190} style={{display: 'flex', alignItems: 'flex-end', gap: 10, height: 330}}>
        {order.map((i) => {
          const p = pod[i];
          const s = spring({frame: f - at(0.06) - i * 6, fps, config: {damping: 14, stiffness: 120}});
          return (
            <div key={p.n} style={{width: 150, textAlign: 'center'}}>
              <div style={{fontSize: 18, fontWeight: 800, marginBottom: 8, opacity: s}}>{p.n}</div>
              <div style={{height: p.h * s, background: p.c, borderRadius: '14px 14px 0 0', color: '#fff', fontSize: 46, fontWeight: 800, display: 'flex', justifyContent: 'center', paddingTop: 10, boxSizing: 'border-box', overflow: 'hidden'}}>{p.r}</div>
            </div>
          );
        })}
      </Abs>
      {slow.map((s, i) => (
        <In key={s.n} at={at(0.4) + i * at(0.08)} style={{position: 'absolute', left: 620, top: 175 + i * 118}}>
          <div style={{width: 580, background: '#fff', borderRadius: 18, boxShadow: 'var(--op-shadow)', padding: '12px 16px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div style={{fontSize: 20, fontWeight: 800, flex: 1}}>{s.n}</div>
              <span style={{fontSize: 13, fontWeight: 800, color: '#fff', background: M.larm.color, borderRadius: 9999, padding: '3px 10px'}}>NEW DESCRIPTION</span>
            </div>
            <div style={{fontSize: 17, color: '#33343f', marginTop: 4, minHeight: 24}}>{typed(s.d, f, at(0.45) + i * at(0.1), 40)}</div>
          </div>
        </In>
      ))}
    </RSlide>
  );
};

/* keywords: rank last week → this week */
const KW: {k: string; c: string; last: number; now: number}[] = [
  {k: 'café near me', c: 'Oak & Ember', last: 9, now: 4},
  {k: 'emergency dentist', c: 'Pine Street', last: 6, now: 7},
  {k: 'bike repair', c: 'Velo Repair', last: 12, now: 5},
  {k: 'yoga classes', c: 'Lumen Yoga', last: 3, now: 3},
  {k: 'flower delivery', c: 'Harbor Florist', last: 8, now: 6},
  {k: 'bathroom tiles', c: 'Northwind', last: 5, now: 8},
];
export const Keywords: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const p = interpolate(f, [at(0.3), at(0.6)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.6)} name="ding" vol={0.22} dur={40} />
      <Head label="Client Bot · keyword ranks">Movement at a *glance*</Head>
      <In at={at(0.03)} tick={false} style={{position: 'absolute', left: 140, top: 160}}>
        <div style={{width: 1000, background: '#fff', borderRadius: 20, boxShadow: 'var(--op-shadow)', padding: '10px 22px'}}>
          <div style={{display: 'flex', fontFamily: mono.fontFamily, fontSize: 14, letterSpacing: 2, color: DIM, padding: '6px 0'}}>
            <span style={{flex: 1.4}}>KEYWORD</span><span style={{flex: 1}}>CLIENT</span><span style={{width: 120, textAlign: 'center'}}>LAST WEEK</span><span style={{width: 120, textAlign: 'center'}}>THIS WEEK</span><span style={{width: 90, textAlign: 'right'}}>MOVE</span>
          </div>
          {KW.map((r, i) => {
            const d = r.last - r.now;
            const col = d > 0 ? GREEN : d < 0 ? RED : DIM;
            const cur = Math.round(r.last + (r.now - r.last) * p);
            return (
              <In key={r.k} at={at(0.06) + i * 5} tick={false} style={{display: 'flex', alignItems: 'center', fontSize: 21, padding: '9px 0', borderTop: '1px solid var(--op-line)', background: p > 0.99 && d !== 0 ? `${col}10` : 'transparent'}}>
                <span style={{flex: 1.4, fontWeight: 700}}>{r.k}</span>
                <span style={{flex: 1, color: DIM}}>{r.c}</span>
                <span style={{width: 120, textAlign: 'center', color: DIM}}>#{r.last}</span>
                <span style={{width: 120, textAlign: 'center', fontWeight: 800, fontSize: 24}}>#{cur}</span>
                <span style={{width: 90, textAlign: 'right', fontWeight: 800, color: col, opacity: p}}>{d > 0 ? `▲ ${d}` : d < 0 ? `▼ ${-d}` : '—'}</span>
              </In>
            );
          })}
        </div>
      </In>
    </RSlide>
  );
};

/* ideas: five video idea cards fan out with a typed hook */
const IDEAS = [
  {t: 'Pack a tent in 60s', h: 'Most people pack it wrong.'},
  {t: 'Rain shell test', h: 'I stood in a storm for 2 hours.'},
  {t: 'Café rush hour', h: 'This map pin made them busy.'},
  {t: 'Ask a florist', h: 'The order nobody wants.'},
  {t: 'Hiking pack drop', h: 'Only 40 made. Here’s why.'},
];
export const Ideas: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.4)} name="typing" vol={0.14} dur={70} />
      <Head label="Content Bot · video ideas">Every idea comes with a *hook*</Head>
      {IDEAS.map((it, i) => {
        const s = spring({frame: f - at(0.04) - i * 4, fps, config: {damping: 14, stiffness: 120}});
        const ang = (i - 2) * 7 * s;
        const x = 640 + (i - 2) * 215 * s - 105;
        return (
          <div key={it.t} style={{position: 'absolute', left: x, top: 200 + Math.abs(i - 2) * 18 * s, transform: `rotate(${ang}deg)`, transformOrigin: 'center 160%', opacity: Math.min(1, s * 2)}}>
            {i === 0 && <Sfx at={at(0.04)} name="whoosh" vol={0.18} dur={20} />}
            <div style={{width: 210, height: 290, background: '#fff', borderRadius: 22, boxShadow: 'var(--op-shadow)', padding: 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>
              <div style={{height: 110, borderRadius: 14, background: `linear-gradient(135deg, ${M.chest.color}, #ff9a5a)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: 0, height: 0, borderLeft: '26px solid #fff', borderTop: '16px solid transparent', borderBottom: '16px solid transparent', marginLeft: 6}} />
              </div>
              <div style={{fontSize: 18, fontWeight: 800, marginTop: 10}}>{it.t}</div>
              <div style={{fontSize: 12, fontWeight: 800, letterSpacing: 1.5, color: M.chest.color, marginTop: 10}}>HOOK</div>
              <div style={{fontSize: 16, fontWeight: 600, lineHeight: 1.3, color: '#33343f'}}>“{typed(it.h, f, at(0.4) + i * 8, 30)}”</div>
            </div>
          </div>
        );
      })}
    </RSlide>
  );
};

/* pipeline: kanban Hot / Warm / Cold */
const COLS: {t: string; c: string; items: string[]; tag?: string}[] = [
  {t: 'Hot', c: RED, items: ['Summit Outdoor', 'Bluebird Bakery', 'Atlas Movers'], tag: 'draft ready'},
  {t: 'Warm', c: AMBER, items: ['Copper Kettle', 'Fern & Moss', 'Ridge Yoga'], tag: 'follow up Thu'},
  {t: 'Cold', c: '#5b8def', items: ['Sunny Laundry', 'Kite Studio', 'Tidal Surf', 'Mango Print']},
];
export const Pipeline: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  let k = 0;
  return (
    <RSlide vo={vo}>
      <Head label="Lead Bot · simple pipeline">Hot first, warm *later*, cold waits</Head>
      {COLS.map((c, ci) => (
        <div key={c.t} style={{position: 'absolute', left: 90 + ci * 375, top: 160, width: 350, height: 385, background: 'rgba(255,255,255,0.55)', borderRadius: 22, padding: 14, boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
            <div style={{width: 14, height: 14, borderRadius: 7, background: c.c}} />
            <div style={{fontSize: 24, fontWeight: 800}}>{c.t}</div>
            <div style={{fontSize: 18, color: DIM, fontWeight: 700}}>{c.items.length}</div>
          </div>
          {c.items.map((it) => {
            const t0 = at(0.1) + k++ * at(0.05);
            const s = spring({frame: f - t0, fps, config: {damping: 15, stiffness: 140}});
            return (
              <div key={it} style={{marginBottom: 8, opacity: Math.min(1, s * 2), transform: `translateX(${(1 - s) * -120}px)`}}>
                {f > t0 && f < t0 + 2 && <Sfx at={t0} name={`tick${(k % 3) + 1}`} vol={0.15} />}
                <div style={{background: '#fff', borderRadius: 14, boxShadow: 'var(--op-shadow)', padding: '10px 12px', borderLeft: `5px solid ${c.c}`, display: 'flex', alignItems: 'center', gap: 8}}>
                  <div style={{flex: 1, fontSize: 18, fontWeight: 700}}>{it}</div>
                  {c.tag && f > at(0.7) && <span style={{fontSize: 12, fontWeight: 800, background: ci === 0 ? '#1d1d26' : `${AMBER}26`, color: ci === 0 ? '#fff' : '#9a6200', borderRadius: 9999, padding: '3px 9px'}}>{c.tag}</span>}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </RSlide>
  );
};

/* rules: three switches flip on */
export const Rules: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const rules: {ico: 'mail' | 'coin' | 'x'; t: string}[] = [
    {ico: 'mail', t: 'Ask before anything goes to a customer'},
    {ico: 'coin', t: 'Never spend money without asking'},
    {ico: 'x', t: 'Never delete anything without asking'},
  ];
  return (
    <RSlide vo={vo}>
      <Head label="The shield · your rules">Two more while you’re *there*</Head>
      {rules.map((r, i) => {
        const on = interpolate(f, [at(0.15) + i * at(0.2), at(0.15) + i * at(0.2) + 6], [i === 0 ? 1 : 0, 1], clamp);
        return (
          <In key={r.t} at={at(0.04) + i * 5} style={{position: 'absolute', left: 150, top: 180 + i * 112}}>
            {i > 0 && <Sfx at={at(0.15) + i * at(0.2)} name="pop1" vol={0.22} dur={20} />}
            <div style={{width: 980, display: 'flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 22, boxShadow: 'var(--op-shadow)', padding: '16px 24px', boxSizing: 'border-box'}}>
              <IcoBox n={r.ico} s={56} c={on > 0.5 ? BOT_COLORS.violet : '#9aa0b0'} />
              <div style={{flex: 1, fontSize: 28, fontWeight: 700}}>{r.t}</div>
              <Ico n="lock" s={28} c={on > 0.5 ? BOT_COLORS.violet : '#c4c6d0'} />
              <div style={{width: 92, height: 48, borderRadius: 24, background: on > 0.5 ? BOT_COLORS.violet : '#d6d6de', position: 'relative'}}>
                <div style={{position: 'absolute', top: 5, left: 5 + 44 * on, width: 38, height: 38, borderRadius: 19, background: '#fff'}} />
              </div>
            </div>
          </In>
        );
      })}
    </RSlide>
  );
};

/* built: complete robot + shield, bridge to part 3 */
export const Built: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.14)} name="ding" vol={0.26} dur={40} />
      <Sfx at={at(0.7)} name="whoosh" vol={0.22} dur={25} />
      <Abs x={140} y={110}><Colossus h={420} parts={{...ALL, shield: at(0.1)}} glow="shield" /></Abs>
      <Abs x={560} y={140} style={{fontFamily: mono.fontFamily, fontSize: 22, letterSpacing: 4, color: ACC}}><In at={at(0.04)} tick={false}>THE BODY IS BUILT</In></Abs>
      <Abs x={556} y={180} style={{display: 'flex', gap: 16}}>
        {[
          ['6', 'pieces'],
          ['5', 'Bots'],
          ['1', 'set of rules'],
        ].map(([n, t], i) => (
          <In key={t} at={at(0.2) + i * at(0.08)}>
            <div style={{width: 190, background: '#fff', borderRadius: 22, boxShadow: 'var(--op-shadow)', padding: '16px 18px'}}>
              <div style={{fontSize: 64, fontWeight: 800, color: ACC, lineHeight: 1}}>{n}</div>
              <div style={{fontSize: 22, fontWeight: 700}}>{t}</div>
            </div>
          </In>
        ))}
      </Abs>
      <In at={at(0.68)} tick={false} style={{position: 'absolute', left: 556, top: 360, fontSize: 64, fontWeight: 800, letterSpacing: -2}}>
        Now, <span style={{color: ACC}}>switch it on.</span>
      </In>
      <In at={at(0.78)} style={{position: 'absolute', left: 560, top: 450}}><Pill kind="dark" size={20}>Next · part 3 · run it</Pill></In>
    </RSlide>
  );
};

export type {Member};
export {Card};
