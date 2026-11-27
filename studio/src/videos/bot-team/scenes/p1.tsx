import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {BOT_COLORS} from '../../../lib/GrokBotMark';
import {AppWindow, Card} from '../../real/ui';
import {Ico, IcoBox} from '../../lazy-agency/scenes/common';
import type {IcoName, Row, ShotSpec} from '../../lazy-agency/scenes/common';
import {L, TrafficLights} from '../../lazy-agency/scenes/chat';
import {ACC, Abs, Bot, BotTag, DIM, GroupChat, Head, In, Kicker, M, Pill, RSlide, RealSrc, SHOT, TEAM, mkPiece} from './common';
import {ALL, Colossus} from './robot';
import type {PartKey} from './robot';

const RED = '#e5484d';
const GREEN = '#1a9b5c';

/* ---------- generic: real screenshot + rows ---------- */
export const mkShot = (o: {label: string; title: string; spec: ShotSpec; source: string; rows?: Row[]; rowsX?: number}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const rx = o.rowsX ?? 820;
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      <RealSrc spec={o.spec} at={at(0.04)} source={o.source} />
      {o.rows?.map((r, i) => (
        <Card key={r.t} at={at(0.3) + i * at(0.14)} style={{position: 'absolute', left: rx, top: 205 + i * 92}} box={{width: 1210 - rx, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14}}>
          <IcoBox n={r.ico} s={44} c={r.c ?? ACC} />
          <div>
            <div style={{fontSize: 23, fontWeight: 700}}>{r.t}</div>
            {r.s && <div style={{fontSize: 16, color: DIM}}>{r.s}</div>}
          </div>
        </Card>
      ))}
    </RSlide>
  );
};

/* 1 ---------- hook: the group chat that checks itself ---------- */
export const Hook: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.72)} name="ding" vol={0.25} dur={40} />
      <Head label="One group chat · five Bots">Nobody told them to *check each other*</Head>
      <GroupChat
        y={158}
        h={385}
        msgs={[
          {m: M.larm, text: 'Hiking packs: only 4 left. Restock lands Friday.', at: at(0.08), tone: 'warn'},
          {m: M.chest, text: 'Saw that. Holding the hiking pack video until the restock. ✓', at: at(0.24), tone: 'fix'},
          {m: M.legs, text: '3 hot leads scored. Drafts only, waiting for approval.', at: at(0.4)},
          {m: M.rarm, text: 'Brightlane report cards are done for all six clients.', at: at(0.54)},
          {m: M.head, text: 'Checked all four reports. Today’s plan is ready.', at: at(0.68)},
        ]}
      />
    </RSlide>
  );
};

/* 2 ---------- team ring: four workers report to one chief ---------- */
const NODES: [number, number][] = [
  [250, 225],
  [1030, 225],
  [250, 420],
  [1030, 420],
];
export const Team: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const beam = interpolate(f, [at(0.74), at(0.9)], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const order = [0.06, 0.18, 0.3, 0.42, 0.54];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.76)} name="ding" vol={0.22} dur={40} />
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        {NODES.map(([x, y], i) => (
          <line key={i} x1={x + (x < 640 ? 52 : -52)} y1={y - 26} x2={x + (x < 640 ? 52 : -52) + (640 - x - (x < 640 ? 52 : -52)) * beam * 0.82} y2={y - 26 + (255 - y + 26) * beam * 0.82} stroke={TEAM[i + 1].color} strokeWidth={4} strokeDasharray="10 8" strokeDashoffset={-f * 1.5} opacity={beam > 0 ? 0.8 : 0} />
        ))}
      </svg>
      <In at={at(order[0])} style={{position: 'absolute', left: 540, top: 170, width: 200, textAlign: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: 170, height: 170, borderRadius: 85, background: '#fff', boxShadow: `0 0 0 6px ${M.head.color}55, var(--op-shadow)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Bot shape={M.head.shape} color={M.head.color} size={118} />
          </div>
        </div>
        <div style={{fontSize: 26, fontWeight: 800, marginTop: 12}}>Chief Brain</div>
        <Pill kind="dark" size={18}>Plans the day</Pill>
      </In>
      {NODES.map(([x, y], i) => {
        const m = TEAM[i + 1];
        return (
          <In key={m.key} at={at(order[i + 1])} style={{position: 'absolute', left: x - 110, top: y - 78, width: 220, textAlign: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{width: 104, height: 104, borderRadius: 52, background: '#fff', boxShadow: 'var(--op-shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Bot shape={m.shape} color={m.color} size={68} phase={i * 9} />
              </div>
            </div>
            <div style={{fontSize: 22, fontWeight: 800, marginTop: 6}}>{m.name}</div>
            <div style={{fontSize: 16, color: DIM, fontWeight: 600}}>{m.job}</div>
          </In>
        );
      })}
      <In at={at(0.8)} style={{position: 'absolute', left: 0, width: 1280, top: 478, textAlign: 'center'}}>
        <Pill kind="white" size={24} style={{boxShadow: 'var(--op-shadow)'}}>All four report to one chief</Pill>
      </In>
    </RSlide>
  );
};

/* 3 ---------- promise: the Colossus assembles ---------- */
export const Promise: React.FC<P> = ({vo}) => {
  const at = useAt();
  const keys: PartKey[] = ['legs', 'chest', 'larm', 'rarm', 'head'];
  const parts = Object.fromEntries(keys.map((k, i) => [k, at(0.12) + i * 9])) as Partial<Record<PartKey, number>>;
  return (
    <RSlide vo={vo}>
      {keys.map((k, i) => <Sfx key={k} at={at(0.12) + i * 9 + 5} name={`tick${(i % 3) + 1}`} vol={0.2} />)}
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Abs x={140} y={110}><Colossus h={420} parts={parts} /></Abs>
      <Abs x={560} y={150} style={{fontFamily: mono.fontFamily, fontSize: 22, letterSpacing: 4, color: ACC}}><In at={at(0.04)} tick={false}>I CALL IT</In></Abs>
      <In at={at(0.55)} tick={false} style={{position: 'absolute', left: 552, top: 185, fontSize: 116, fontWeight: 800, letterSpacing: -5, lineHeight: 1}}>
        The <span style={{color: ACC}}>Colossus</span>
      </In>
      <Abs x={560} y={340} style={{display: 'flex', gap: 14}}>
        {['5 Bots', '6 pieces', 'No code'].map((c, i) => <In key={c} at={at(0.66) + i * 7}><Pill kind="dark" size={24}>{c}</Pill></In>)}
      </Abs>
      <In at={at(0.8)} style={{position: 'absolute', left: 562, top: 420}}><div style={{fontSize: 26, color: DIM, fontWeight: 600}}>Built piece by piece, with you.</div></In>
    </RSlide>
  );
};

/* 4 ---------- problem: separate helpers ---------- */
export const Problem: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const tiles: {ico: IcoName; t: string; c: string; q?: boolean}[] = [
    {ico: 'box', t: 'Store helper', c: BOT_COLORS.green},
    {ico: 'search', t: 'No idea', c: RED, q: true},
    {ico: 'doc', t: 'Content helper', c: BOT_COLORS.pink},
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Why most setups fail">Separate helpers, *no idea* of each other</Head>
      {tiles.map((t, i) => {
        const float = Math.sin((f + i * 20) / 18) * 8;
        return (
          <In key={t.t} at={at(0.08) + i * at(0.14)} style={{position: 'absolute', left: 150 + i * 360, top: 220 + float}}>
            <div style={{width: 260, height: 240, borderRadius: 30, background: '#fff', boxShadow: 'var(--op-shadow)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, border: t.q ? `3px solid ${RED}` : 'none'}}>
              {t.q ? (
                <div style={{fontSize: 130, fontWeight: 800, color: RED, lineHeight: 1, transform: `scale(${1 + 0.06 * Math.sin(f / 5)})`}}>?</div>
              ) : (
                <IcoBox n={t.ico} s={100} c={t.c} />
              )}
              <div style={{fontSize: 28, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase'}}>{t.t}</div>
            </div>
          </In>
        );
      })}
      {[0, 1].map((i) => (
        <In key={i} at={at(0.55) + i * 8} style={{position: 'absolute', left: 418 + i * 360, top: 318}}>
          <div style={{width: 84, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6}}>
            <div style={{width: 22, borderTop: `4px dashed ${DIM}`}} />
            <Ico n="x" s={30} c={RED} />
            <div style={{width: 22, borderTop: `4px dashed ${DIM}`}} />
          </div>
        </In>
      ))}
    </RSlide>
  );
};

/* 5 ---------- glue: you copy the same answer chat to chat ---------- */
export const Glue: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const wins = [
    {t: 'Store helper', c: BOT_COLORS.green},
    {t: 'Content helper', c: BOT_COLORS.pink},
    {t: 'Ads helper', c: BOT_COLORS.blue},
  ];
  const hop = (a: number) => interpolate(f, [at(a), at(a + 0.14)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const px = 150 + 360 * hop(0.25) + 360 * hop(0.5);
  const lift = Math.sin(Math.PI * hop(0.25)) * -60 + Math.sin(Math.PI * hop(0.5)) * -60;
  const copies = Math.floor(interpolate(f, [at(0.2), at(0.9)], [1, 12], clamp));
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.25)} name="whoosh" vol={0.15} dur={20} />
      <Sfx at={at(0.5)} name="whoosh" vol={0.15} dur={20} />
      <Head label="So you become the glue">Copy, paste, *repeat*</Head>
      {wins.map((w, i) => (
        <In key={w.t} at={at(0.04) + i * 6} style={{position: 'absolute', left: 120 + i * 360, top: 260}}>
          <div style={{width: 320, height: 230, borderRadius: 18, background: L.bg, border: `1px solid ${L.line}`, boxShadow: 'var(--op-shadow)', overflow: 'hidden'}}>
            <div style={{height: 38, background: L.rail, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px'}}>
              <TrafficLights />
              <span style={{fontSize: 15, fontWeight: 700, color: L.text}}>{w.t}</span>
            </div>
            <div style={{padding: 14}}>
              {[70, 50, 82].map((wd, k) => <div key={k} style={{height: 13, width: `${wd}%`, borderRadius: 7, background: k === 0 ? `${w.c}44` : L.card, marginBottom: 12}} />)}
            </div>
          </div>
        </In>
      ))}
      <In at={at(0.12)} style={{position: 'absolute', left: px, top: 380 + lift}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, background: '#1d1d26', color: '#fff', padding: '10px 16px', borderRadius: 14, fontSize: 18, fontWeight: 600, boxShadow: '0 12px 30px rgba(20,20,40,0.3)', width: 260}}>
          <Ico n="doc" s={20} c="#fff" />
          “Hiking packs are low…”
        </div>
      </In>
      <Abs x={0} y={180} style={{width: 1280, textAlign: 'center'}}>
        <In at={at(0.2)}><Pill kind="white" size={22} style={{boxShadow: 'var(--op-shadow)'}}>Every morning · copied {copies}×</Pill></In>
      </Abs>
    </RSlide>
  );
};

/* 6–8 ---------- real Grok Bot captures ---------- */
export const Computer = mkShot({
  label: 'Grok Bot is built differently',
  title: 'Every Bot has its *own computer*',
  spec: {...SHOT.computer, crop: {x: 720, y: 40, w: 640, h: 430}, w: 500, x: 110, y: 160, hl: {x: 760, y: 190, w: 560, h: 270}},
  source: 'x.ai/bot',
  rows: [
    {ico: 'window', t: 'Its own computer', s: 'not your laptop', c: '#5b6cff'},
    {ico: 'lock', t: 'Signs in to your tools', s: 'once, then it remembers'},
    {ico: 'clock', t: 'Keeps working', s: 'even with the lid closed', c: GREEN},
  ],
  rowsX: 720,
});

export const Talk = mkShot({
  label: 'Bots talk to each other',
  title: 'One Bot *tags* another',
  spec: {...SHOT.team, crop: {x: 90, y: 40, w: 620, h: 430}, w: 500, x: 110, y: 160, hl: {x: 196, y: 248, w: 470, h: 96}},
  source: 'x.ai/bot',
  rows: [
    {ico: 'link', t: 'Tags another Bot', s: '@AP Bot, can you check?', c: BOT_COLORS.blue},
    {ico: 'up', t: 'Hands over the task', s: 'no copy-paste'},
    {ico: 'eye', t: 'Your team sees every step', c: GREEN},
  ],
  rowsX: 720,
});

export const Jobs: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Head label="Straight from the official site">Give each Bot *one job*</Head>
      <RealSrc spec={{...SHOT.jobs, crop: {x: 190, y: 50, w: 960, h: 440}, w: 760, x: 90, y: 168, hl: {x: 215, y: 120, w: 450, h: 190}}} at={at(0.04)} source="x.ai/bot" />
      {['One job each', 'Add another as work grows'].map((c, i) => (
        <In key={c} at={at(0.45) + i * at(0.16)} style={{position: 'absolute', left: 890, top: 230 + i * 90}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, background: i ? '#fff' : ACC, color: i ? '#15151c' : '#fff', fontWeight: 700, fontSize: 22, padding: '12px 20px', borderRadius: 14, boxShadow: 'var(--op-shadow)', width: 300}}>
            <Ico n={i ? 'up' : 'check'} s={24} c={i ? ACC : '#fff'} />
            {c}
          </div>
        </In>
      ))}
    </RSlide>
  );
};

/* 9 ---------- the order matters ---------- */
export const Order: React.FC<P> = ({vo}) => {
  const at = useAt();
  const rows: {k: PartKey; t: string; s: string; c: string}[] = [
    {k: 'head', t: 'The head', s: 'Chief Brain', c: M.head.color},
    {k: 'larm', t: 'The left arm', s: 'Store Bot', c: M.larm.color},
    {k: 'rarm', t: 'The right arm', s: 'Client Bot', c: M.rarm.color},
    {k: 'chest', t: 'The chest', s: 'Content Bot', c: M.chest.color},
    {k: 'legs', t: 'The legs', s: 'Lead Bot', c: M.legs.color},
    {k: 'shield', t: 'The shield', s: 'Your approval', c: '#804EE0'},
  ];
  const t = (i: number) => at(0.14) + i * at(0.11);
  const parts = Object.fromEntries(rows.map((r, i) => [r.k, t(i) + 4])) as Partial<Record<PartKey, number>>;
  const f = useCurrentFrame();
  const cur = rows.findIndex((_, i) => f < t(i + 1));
  return (
    <RSlide vo={vo}>
      <Head label="How the team gets built">The order *matters*</Head>
      {rows.map((r, i) => (
        <In key={r.k} at={t(i)} style={{position: 'absolute', left: 96, top: 172 + i * 61}}>
          <div style={{width: 560, display: 'flex', alignItems: 'center', gap: 14, background: i === cur ? '#fff' : 'rgba(255,255,255,0.55)', borderRadius: 16, padding: '8px 14px', boxShadow: i === cur ? 'var(--op-shadow)' : 'none', border: i === cur ? `2px solid ${r.c}` : '2px solid transparent'}}>
            <div style={{width: 34, height: 34, borderRadius: 10, background: r.c, color: '#fff', fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
            <div style={{fontSize: 24, fontWeight: 800, flex: 1}}>{r.t}</div>
            <div style={{fontSize: 18, color: DIM, fontWeight: 600}}>{r.s}</div>
          </div>
        </In>
      ))}
      <Abs x={800} y={130}><Colossus h={400} parts={parts} glow={rows[Math.max(0, cur)]?.k} /></Abs>
    </RSlide>
  );
};

/* 10, 15, 19 ---------- piece chapters ---------- */
export const HeadPiece = mkPiece({n: 1, part: 'head', title: 'The head', sub: 'Every Bot reports here', m: M.head});
export const LeftArm = mkPiece({n: 2, part: 'larm', title: 'The left arm', sub: 'Watches the online store', m: M.larm});
export const RightArm = mkPiece({n: 3, part: 'rarm', title: 'The right arm', sub: 'Looks after agency clients', m: M.rarm});

/* 11 ---------- create the Chief Brain ---------- */
const SH = ['drop', 'blob', 'circle', 'pillow'] as const;
const DOTS = [BOT_COLORS.pink, BOT_COLORS.red, BOT_COLORS.orange, BOT_COLORS.green, BOT_COLORS.teal, BOT_COLORS.blue, BOT_COLORS.violet];
export const Create: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const pick = f > at(0.42) ? 4 : f > at(0.3) ? 1 : 0;
  const colorI = f > at(0.55) ? 2 : 5;
  const ready = f > at(0.72);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.3)} name="pop1" vol={0.2} dur={20} />
      <Sfx at={at(0.42)} name="pop1" vol={0.2} dur={20} />
      <Sfx at={at(0.6)} name="typing" vol={0.15} dur={40} />
      <Sfx at={at(0.82)} name="ding" vol={0.25} dur={40} />
      <Head label="Piece 1 · step 1">Create the *Chief Brain*</Head>
      <In at={at(0.03)} tick={false} style={{position: 'absolute', left: 290, top: 150}}>
        <div style={{width: 700, height: 390, borderRadius: 18, background: '#ffffff', boxShadow: '0 28px 70px rgba(20,25,60,0.35)', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', inset: 0, opacity: 0.35, display: 'flex'}}>
            <div style={{width: 180, background: '#F7F7F8', padding: 12}}>
              {TEAM.slice(1).map((t) => <div key={t.key} style={{display: 'flex', gap: 8, alignItems: 'center', padding: '7px 0'}}><Bot shape={t.shape} color={t.color} size={22} bob={0} /><div style={{width: 80, height: 10, borderRadius: 5, background: '#E4E4EA'}} /></div>)}
            </div>
          </div>
          <div style={{position: 'absolute', left: 190, top: 16, width: 360, height: 358, borderRadius: 16, background: '#F1F1F4', border: '1px solid rgba(21,21,28,0.12)', padding: '12px 18px', color: '#15151c'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'rgba(21,21,28,0.6)'}}><span>Create New Bot</span><span>✕</span></div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 6}}><Bot shape={SH[pick % 4]} color={DOTS[colorI]} size={74} bob={3} /></div>
            <div style={{margin: '8px auto', width: 260, height: 34, borderRadius: 9, background: '#F7F7F8', border: '1px solid rgba(21,21,28,0.12)', textAlign: 'center', lineHeight: '34px', fontSize: 16, fontWeight: 700, color: f > at(0.6) ? '#15151c' : 'rgba(21,21,28,0.35)'}}>
              {f > at(0.6) ? typed('Chief Brain', f, at(0.6), 14) : 'Name your Bot'}
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 5, justifyItems: 'center'}}>
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} style={{width: 40, height: 40, borderRadius: 10, background: i === pick ? '#E9E9EE' : 'transparent', border: i === pick ? `2px solid ${DOTS[colorI]}` : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Bot shape={SH[i % 4]} color={i === pick ? DOTS[colorI] : '#9a9aa6'} size={26} bob={0} />
                </div>
              ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: 9, margin: '12px 0'}}>
              {DOTS.map((c, i) => <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c, outline: i === colorI ? '2px solid #fff' : 'none', outlineOffset: 2}} />)}
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 10}}>
              <span style={{fontSize: 14, padding: '7px 16px', color: 'rgba(21,21,28,0.7)'}}>Cancel</span>
              <span style={{fontSize: 14, fontWeight: 700, padding: '7px 18px', borderRadius: 9999, background: ready ? '#15151c' : '#E9E9EE', color: ready ? '#0a0a0a' : 'rgba(21,21,28,0.4)'}}>Create</span>
            </div>
          </div>
        </div>
      </In>
      {[
        {t: 'Pick a face', a: 0.3},
        {t: 'Name it', a: 0.6},
        {t: 'Create', a: 0.75},
      ].map((s, i) => (
        <In key={s.t} at={at(s.a)} style={{position: 'absolute', left: 1020, top: 220 + i * 80}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 14, padding: '9px 16px', boxShadow: 'var(--op-shadow)', fontSize: 21, fontWeight: 700}}>
            <span style={{background: ACC, color: '#15151c', width: 28, height: 28, borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16}}>{i + 1}</span>
            {s.t}
          </div>
        </In>
      ))}
    </RSlide>
  );
};

/* 12 ---------- the exact message ---------- */
const CHIEF_MSG =
  'You are Chief Brain, the head of my team. Four Bots will report to you: Store Bot, Client Bot, Content Bot and Lead Bot. Build a board that shows each Bot, its job, and its routine time.';
export const Message: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const send = at(0.82);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.08)} name="typing" vol={0.15} dur={send - at(0.08)} />
      <Sfx at={send} name="pop2" vol={0.22} dur={20} />
      <Head label="Piece 1 · step 2">One *clear* message</Head>
      <In at={at(0.02)} tick={false} style={{position: 'absolute', left: 72, top: 165}}>
        <AppWindow
          w={600}
          h={375}
          rail={false}
          threads={[]}
          active={0}
          bot={{name: 'Chief Brain', shape: M.head.shape, color: M.head.color}}
          msgs={[
            {who: 'bot', text: 'Hi! I’m Chief Brain. What should I run for you?', at: at(0.03)},
            {who: 'me', text: 'You are Chief Brain, the head of my team…', at: send},
            {who: 'bot', text: 'On it. Building your team board now.', at: send + 14},
          ]}
          input={{text: f < send ? typed('You are Chief Brain, the head of my team…', f, at(0.08), 18) : '', placeholder: 'Message Chief Brain', cursor: f < send}}
          fs={15}
        />
      </In>
      <Card at={at(0.06)} style={{position: 'absolute', left: 700, top: 165}} box={{width: 510, padding: '16px 20px', minHeight: 300}} hl={ACC}>
        <div style={{fontFamily: mono.fontFamily, fontSize: 14, letterSpacing: 2, color: ACC, marginBottom: 10}}>THE EXACT MESSAGE · CHIEF BRAIN</div>
        <div style={{fontSize: 21, lineHeight: 1.45, fontWeight: 500}}>
          {typed(CHIEF_MSG, f, at(0.08), 34)}
          <span style={{opacity: f % 20 < 10 ? 1 : 0, color: ACC}}>▌</span>
        </div>
      </Card>
    </RSlide>
  );
};

/* 13 ---------- command board ---------- */
export const Board: React.FC<P> = ({vo}) => {
  const at = useAt();
  const cards = TEAM.slice(1).map((m, i) => ({m, time: ['7:00 AM daily', 'Mon 9:00 AM', 'Sun 6:00 PM', '10:00 AM weekdays'][i]}));
  return (
    <RSlide vo={vo}>
      <Head label="What Chief Brain builds">A *command board*</Head>
      <In at={at(0.04)} tick={false} style={{position: 'absolute', left: 72, top: 150}}>
        <div style={{width: 1136, height: 395, borderRadius: 20, background: '#ffffff', boxShadow: '0 28px 70px rgba(20,25,60,0.35)', padding: '18px 24px', color: '#15151c', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{fontFamily: mono.fontFamily, fontSize: 13, letterSpacing: 2, color: 'rgba(21,21,28,0.5)'}}>TEAM BOARD · SAMPLE DATA</div>
            <div style={{flex: 1}} />
            {[
              {t: 'Driftwood Supply', s: 'online gear store', a: 0.62},
              {t: 'Brightlane', s: 'marketing agency', a: 0.72},
            ].map((b) => (
              <In key={b.t} at={at(b.a)}>
                <div style={{background: 'rgba(21,21,28,0.08)', borderRadius: 9999, padding: '6px 14px', fontSize: 15}}>
                  <b>{b.t}</b> <span style={{color: 'rgba(21,21,28,0.55)'}}>· {b.s}</span>
                </div>
              </In>
            ))}
          </div>
          <In at={at(0.12)} style={{marginTop: 14}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,103,0,0.12)', border: `2px solid ${M.head.color}`, borderRadius: 16, padding: '12px 18px'}}>
              <Bot shape={M.head.shape} color={M.head.color} size={54} />
              <div style={{flex: 1}}>
                <div style={{fontSize: 13, letterSpacing: 2, fontFamily: mono.fontFamily, color: M.head.color}}>HEAD BOT</div>
                <div style={{fontSize: 26, fontWeight: 800}}>Chief Brain</div>
                <div style={{fontSize: 15, color: 'rgba(21,21,28,0.6)'}}>Reads every report, writes the morning brief</div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: 13, color: 'rgba(21,21,28,0.5)', fontFamily: mono.fontFamily}}>ROUTINE</div>
                <div style={{fontSize: 26, fontWeight: 800}}>8:00 AM · Mon–Fri</div>
              </div>
            </div>
          </In>
          <div style={{display: 'flex', gap: 14, marginTop: 16}}>
            {cards.map((c, i) => (
              <In key={c.m.key} at={at(0.26) + i * at(0.08)} style={{flex: 1}}>
                <div style={{background: 'rgba(21,21,28,0.05)', borderTop: `4px solid ${c.m.color}`, borderRadius: 14, padding: '12px 14px', height: 150, boxSizing: 'border-box'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <Bot shape={c.m.shape} color={c.m.color} size={30} bob={1} />
                    <div style={{fontSize: 19, fontWeight: 800}}>{c.m.name}</div>
                  </div>
                  <div style={{fontSize: 15, color: 'rgba(21,21,28,0.62)', margin: '8px 0 14px'}}>{c.m.job}</div>
                  <div style={{fontFamily: mono.fontFamily, fontSize: 14, color: c.m.color === BOT_COLORS.blue ? '#5aa2f0' : c.m.color}}>⏱ {c.time}</div>
                </div>
              </In>
            ))}
          </div>
        </div>
      </In>
    </RSlide>
  );
};

/* 14 ---------- 8 a.m. brief ---------- */
export const Brief: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const mins = interpolate(f, [at(0.3), at(0.5)], [7 * 60 + 40, 8 * 60], clamp);
  const hh = Math.floor(mins / 60);
  const mm = Math.floor(mins % 60);
  const lines = ['Store: 3 products low on stock', 'Clients: 2 report cards to approve', 'Content: week plan saved', 'Leads: 3 hot, drafts waiting'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.25} dur={40} />
      <Head label="A routine on a schedule">Every weekday at *8:00*</Head>
      <RealSrc spec={{...SHOT.routine, crop: {x: 360, y: 90, w: 860, h: 430}, w: 560, x: 72, y: 168, hl: {x: 385, y: 262, w: 720, h: 62}}} at={at(0.03)} source="docs.x.ai/grok-bot" />
      <In at={at(0.25)} style={{position: 'absolute', left: 680, top: 170}}>
        <div style={{width: 170, height: 170, borderRadius: 85, background: '#fff', boxShadow: 'var(--op-shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <div style={{fontSize: 46, fontWeight: 800, fontFamily: mono.fontFamily, color: mins >= 480 ? ACC : '#15151c'}}>{hh}:{String(mm).padStart(2, '0')}</div>
          <div style={{fontSize: 15, color: DIM, fontWeight: 700}}>MON–FRI</div>
        </div>
      </In>
      <Card at={at(0.5)} style={{position: 'absolute', left: 880, top: 170}} box={{width: 330, padding: '14px 18px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
          <Bot shape={M.head.shape} color={M.head.color} size={28} bob={1} />
          <div style={{fontSize: 18, fontWeight: 800}}>Morning brief</div>
        </div>
        {lines.map((l, i) => (
          <In key={l} at={at(0.56) + i * 8} style={{fontSize: 16, padding: '6px 0', borderTop: '1px solid var(--op-line)'}}>
            {l}
          </In>
        ))}
      </Card>
      <In at={at(0.75)} style={{position: 'absolute', left: 680, top: 390}}><Pill kind="dark" size={20}>One page · every report in one place</Pill></In>
    </RSlide>
  );
};

/* 16 ---------- store table ---------- */
const PRODUCTS: [string, number, number][] = [
  ['Trail tent 2P', 34, 6],
  ['Hiking pack 40L', 4, 7],
  ['Camp stove', 22, 5],
  ['Water bottle', 61, 18],
  ['Headlamp', 9, 6],
  ['Sleeping bag', 27, 4],
  ['Rain shell', 15, 3],
  ['Trek poles', 6, 4],
  ['Camp mug', 48, 9],
  ['First aid kit', 31, 5],
  ['Wool socks', 70, 22],
  ['Dry bag', 19, 3],
];
export const Store: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const flag = f > at(0.62);
  const risk = PRODUCTS.filter(([, s, w]) => s / w < 2).length;
  return (
    <RSlide vo={vo}>
      {flag && <Sfx at={at(0.62)} name="pop1" vol={0.22} dur={20} />}
      <Head label="Store Bot · Driftwood Supply">Twelve products, *watched*</Head>
      {[0, 1].map((col) => (
        <In key={col} at={at(0.04) + col * 6} tick={false} style={{position: 'absolute', left: 72 + col * 420, top: 160}}>
          <div style={{width: 400, background: '#fff', borderRadius: 18, boxShadow: 'var(--op-shadow)', padding: '10px 16px'}}>
            <div style={{display: 'flex', fontFamily: mono.fontFamily, fontSize: 12.5, letterSpacing: 1.5, color: DIM, padding: '4px 0 8px'}}>
              <span style={{flex: 1}}>PRODUCT</span>
              <span style={{width: 62, textAlign: 'right'}}>STOCK</span>
              <span style={{width: 62, textAlign: 'right'}}>SOLD/WK</span>
              <span style={{width: 70, textAlign: 'right'}}>WEEKS</span>
            </div>
            {PRODUCTS.slice(col * 6, col * 6 + 6).map(([n, s, w], i) => {
              const weeks = s / w;
              const bad = flag && weeks < 2;
              return (
                <In key={n} at={at(0.08) + (col * 6 + i) * at(0.035)} tick={i % 2 === 0} style={{display: 'flex', alignItems: 'center', fontSize: 18, padding: '8px 6px', borderTop: '1px solid var(--op-line)', background: bad ? 'rgba(229,72,77,0.12)' : 'transparent', borderRadius: 8, color: bad ? RED : '#15151c', fontWeight: bad ? 700 : 500}}>
                  <span style={{flex: 1}}>{n}</span>
                  <span style={{width: 62, textAlign: 'right'}}>{s}</span>
                  <span style={{width: 62, textAlign: 'right'}}>{w}</span>
                  <span style={{width: 70, textAlign: 'right'}}>{weeks.toFixed(1)}</span>
                </In>
              );
            })}
          </div>
        </In>
      ))}
      <In at={at(0.66)} style={{position: 'absolute', left: 940, top: 170}}>
        <div style={{width: 270, background: '#fff', borderRadius: 22, boxShadow: 'var(--op-shadow)', padding: '20px 22px', border: `3px solid ${RED}`}}>
          <div style={{fontSize: 80, fontWeight: 800, color: RED, lineHeight: 1}}>{risk}</div>
          <div style={{fontSize: 22, fontWeight: 800, marginTop: 6}}>run out in under 2 weeks</div>
          <div style={{fontSize: 16, color: DIM, marginTop: 6}}>flagged in red, every morning</div>
        </div>
      </In>
      <In at={at(0.8)} style={{position: 'absolute', left: 940, top: 400}}><BotTag m={M.larm} size={22} /></In>
    </RSlide>
  );
};

/* 17 ---------- store routine → Chief ---------- */
export const StoreRoutine: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const steps: {ico: IcoName; t: string; s: string}[] = [
    {ico: 'clock', t: '7:00 AM', s: 'every morning'},
    {ico: 'gear', t: 'Refresh', s: 'stock + sales'},
    {ico: 'doc', t: 'Summary', s: '3 lines'},
  ];
  const fly = interpolate(f, [at(0.6), at(0.8)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.8)} name="ding" vol={0.25} dur={40} />
      <Head label="Store Bot · routine">Then it *reports up*</Head>
      <div style={{position: 'absolute', left: 120, top: 330, width: 900, height: 6, borderRadius: 3, background: 'rgba(21,21,28,0.12)'}}>
        <div style={{width: `${interpolate(f, [at(0.08), at(0.6)], [0, 100], clamp)}%`, height: '100%', borderRadius: 3, background: M.larm.color}} />
      </div>
      {steps.map((s, i) => (
        <In key={s.t} at={at(0.08) + i * at(0.16)} style={{position: 'absolute', left: 100 + i * 290, top: 225}}>
          <div style={{width: 220, background: '#fff', borderRadius: 22, boxShadow: 'var(--op-shadow)', padding: '18px 16px', textAlign: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: 8}}>
              {s.ico === 'gear' ? (
                <div style={{transform: `rotate(${f * 4}deg)`}}><IcoBox n="gear" s={62} c={M.larm.color} /></div>
              ) : (
                <IcoBox n={s.ico} s={62} c={M.larm.color} />
              )}
            </div>
            <div style={{fontSize: 26, fontWeight: 800}}>{s.t}</div>
            <div style={{fontSize: 17, color: DIM}}>{s.s}</div>
          </div>
        </In>
      ))}
      <In at={at(0.5)} style={{position: 'absolute', left: 1010, top: 210, textAlign: 'center'}}>
        <div style={{width: 170, height: 170, borderRadius: 85, background: '#fff', boxShadow: `0 0 0 ${fly > 0.95 ? 8 : 0}px ${M.head.color}55, var(--op-shadow)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Bot shape={M.head.shape} color={M.head.color} size={110} />
        </div>
        <div style={{fontSize: 22, fontWeight: 800, marginTop: 8}}>Chief Brain</div>
      </In>
      {f > at(0.58) && (
        <div style={{position: 'absolute', left: 680 + 360 * fly, top: 250 + Math.sin(Math.PI * fly) * -70, opacity: fly > 0.97 ? 0 : 1, transform: `scale(${1 - 0.4 * fly})`}}>
          <div style={{background: '#1d1d26', color: '#fff', borderRadius: 12, padding: '8px 14px', fontSize: 16, fontWeight: 700, display: 'flex', gap: 8, alignItems: 'center'}}>
            <Ico n="doc" s={18} c="#fff" /> store-summary
          </div>
        </div>
      )}
      <In at={at(0.82)} style={{position: 'absolute', left: 0, width: 1280, top: 440, textAlign: 'center'}}>
        <Pill kind="white" size={22} style={{boxShadow: 'var(--op-shadow)'}}>Hiking pack 40L · 4 left · reorder</Pill>
      </In>
    </RSlide>
  );
};

/* 18 ---------- not a helper, a system ---------- */
export const System: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const strike = interpolate(f, [at(0.35), at(0.45)], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.36)} name="whoosh" vol={0.2} dur={20} />
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Kicker y={130}>THE SHIFT</Kicker>
      <In at={at(0.08)} tick={false} style={{position: 'absolute', left: 0, width: 1280, top: 185, textAlign: 'center'}}>
        <span style={{position: 'relative', display: 'inline-block', fontSize: 92, fontWeight: 800, letterSpacing: -3, color: strike > 0.5 ? 'rgba(21,21,28,0.35)' : '#15151c'}}>
          Not a helper.
          <span style={{position: 'absolute', left: 0, top: '52%', height: 9, borderRadius: 5, width: `${strike * 100}%`, background: RED}} />
        </span>
      </In>
      <In at={at(0.52)} tick={false} style={{position: 'absolute', left: 0, width: 1280, top: 300, textAlign: 'center', fontSize: 120, fontWeight: 800, letterSpacing: -4}}>
        A <span style={{color: ACC}}>system.</span>
      </In>
      <Abs x={0} y={455} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 22}}>
        {TEAM.map((m, i) => (
          <In key={m.key} at={at(0.62) + i * 5}>
            <div style={{transform: `rotate(${(i % 2 ? -1 : 1) * f * 2}deg)`}}><Ico n="gear" s={44} c={m.color} /></div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 20 ---------- client report cards ---------- */
const CLIENTS: {n: string; up: string; down?: string}[] = [
  {n: 'Oak & Ember Café', up: 'Bookings +12%'},
  {n: 'Pine Street Dental', up: 'Calls +8%', down: 'Reviews flat'},
  {n: 'Velo Repair Co.', up: 'Map views +21%'},
  {n: 'Lumen Yoga', up: 'Signups +5%', down: 'Ad cost up'},
  {n: 'Harbor Florist', up: 'Orders +9%'},
  {n: 'Northwind Tiles', up: 'Leads +14%', down: 'Blog traffic −3%'},
];
export const Cards: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.78)} name="ding" vol={0.22} dur={40} />
      <Head label="Client Bot · Brightlane">A report card per *client*</Head>
      {CLIENTS.map((c, i) => {
        const flip = interpolate(f, [at(0.08) + i * at(0.08), at(0.08) + i * at(0.08) + 12], [90, 0], clamp);
        return (
          <div key={c.n} style={{position: 'absolute', left: 72 + (i % 3) * 300, top: 165 + Math.floor(i / 3) * 190, transform: `perspective(800px) rotateY(${flip}deg)`, opacity: flip > 85 ? 0 : 1}}>
            {flip < 85 && flip > 70 && <Sfx at={at(0.08) + i * at(0.08)} name={`tick${(i % 3) + 1}`} vol={0.16} />}
            <div style={{width: 280, height: 170, background: '#fff', borderRadius: 20, boxShadow: 'var(--op-shadow)', padding: '14px 16px', boxSizing: 'border-box', borderTop: `5px solid ${M.rarm.color}`}}>
              <div style={{fontSize: 19, fontWeight: 800}}>{c.n}</div>
              <div style={{fontSize: 17, color: GREEN, fontWeight: 700, marginTop: 10}}>▲ {c.up}</div>
              <div style={{fontSize: 17, color: c.down ? RED : DIM, fontWeight: 700, marginTop: 4}}>{c.down ? `▼ ${c.down}` : '— nothing down'}</div>
              <div style={{fontSize: 14, color: DIM, marginTop: 10}}>Next: 3 jobs, in plain English</div>
            </div>
          </div>
        );
      })}
      <In at={at(0.75)} style={{position: 'absolute', left: 990, top: 220}}>
        <div style={{width: 210, height: 210, borderRadius: 105, border: `6px solid ${M.rarm.color}`, color: M.rarm.color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-12deg)', background: 'rgba(255,255,255,0.7)'}}>
          <div style={{fontSize: 22, fontWeight: 800, letterSpacing: 3}}>EVERY</div>
          <div style={{fontSize: 46, fontWeight: 800}}>MON</div>
          <div style={{fontSize: 30, fontWeight: 800}}>9:00</div>
        </div>
      </In>
    </RSlide>
  );
};

export {ALL};
