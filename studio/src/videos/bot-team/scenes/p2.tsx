import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Card} from '../../real/ui';
import {Ico, IcoBox} from '../../lazy-agency/scenes/common';
import type {IcoName} from '../../lazy-agency/scenes/common';
import {mkChapter} from '../../shared/ChapterCard';
import {ACC, Abs, Bot, BotTag, DIM, GroupChat, Head, In, Kicker, M, Pill, RSlide, RealSrc, SHOT, TEAM, builtBefore, mkPiece} from './common';
import {ALL, Colossus, SHIELD} from './robot';
import type {PartKey} from './robot';

const RED = '#e5484d';
const GREEN = '#1a9b5c';
const AMBER = '#f59e0b';

/* 1, 4, 7 ---------- piece chapters ---------- */
export const Chest = mkPiece({n: 4, part: 'chest', title: 'The chest', sub: 'Everything feeds into it', m: M.chest});
export const Legs = mkPiece({n: 5, part: 'legs', title: 'The legs', sub: 'Brings in new business', m: M.legs});
export const ShieldPiece = mkPiece({n: 6, part: 'shield', title: 'The shield', sub: 'Nothing goes out without your OK'});

/* 2 ---------- week plan fills ---------- */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ITEMS: {d: number; t: string; k: 'video' | 'carousel' | 'blog'}[] = [
  {d: 0, t: 'Pack a tent in 60s', k: 'video'},
  {d: 0, t: '5 trail snacks', k: 'carousel'},
  {d: 1, t: 'Café rush hour', k: 'video'},
  {d: 2, t: 'Rain shell test', k: 'video'},
  {d: 2, t: 'Before / after site', k: 'carousel'},
  {d: 3, t: 'Ask a florist', k: 'video'},
  {d: 3, t: 'Pick a first tent', k: 'blog'},
  {d: 4, t: 'Hiking pack drop', k: 'video'},
  {d: 4, t: 'Client wins', k: 'carousel'},
];
const KC = {video: M.chest.color, carousel: '#5b6cff', blog: GREEN};
export const Plan: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.08)} name="ding" vol={0.22} dur={40} />
      <Head label="Content Bot · every Sunday 6 PM">Next week, *planned*</Head>
      <Abs x={72} y={160} style={{display: 'grid', gridTemplateColumns: 'repeat(7, 154px)', gap: 10}}>
        {DAYS.map((d, i) => (
          <In key={d} at={at(0.03) + i * 2} tick={false}>
            <div style={{height: 290, background: i === 6 ? 'rgba(224,42,136,0.10)' : '#fff', borderRadius: 16, boxShadow: 'var(--op-shadow)', padding: 8, boxSizing: 'border-box', border: i === 6 ? `2px solid ${M.chest.color}` : 'none'}}>
              <div style={{fontFamily: mono.fontFamily, fontSize: 14, letterSpacing: 2, color: i === 6 ? M.chest.color : DIM, textAlign: 'center', marginBottom: 6}}>{d.toUpperCase()}</div>
              {i === 6 && <div style={{textAlign: 'center', marginTop: 50}}><Bot shape={M.chest.shape} color={M.chest.color} size={60} /><div style={{fontSize: 14, fontWeight: 700, marginTop: 6}}>Plans at 6 PM</div></div>}
              {ITEMS.filter((x) => x.d === i).map((x, k) => (
                <In key={x.t} at={at(0.18) + ITEMS.indexOf(x) * at(0.06)} style={{marginBottom: 8}}>
                  <div style={{borderLeft: `4px solid ${KC[x.k]}`, background: '#f6f6fa', borderRadius: 8, padding: '7px 8px'}}>
                    <div style={{fontSize: 12, fontWeight: 800, letterSpacing: 1, color: KC[x.k], textTransform: 'uppercase'}}>{x.k}</div>
                    <div style={{fontSize: 17, fontWeight: 700, lineHeight: 1.2}}>{x.t}</div>
                    <div style={{height: 34, marginTop: 6, borderRadius: 6, background: `${KC[x.k]}22`}} />
                  </div>
                </In>
              ))}
            </div>
          </In>
        ))}
      </Abs>
      <Abs x={72} y={478} style={{display: 'flex', gap: 12}}>
        {[
          ['5 short videos + hooks', KC.video],
          ['3 carousels', KC.carousel],
          ['1 blog post', KC.blog],
        ].map(([t, c], i) => (
          <In key={t} at={at(0.78) + i * 6}>
            <div style={{background: c, color: '#fff', borderRadius: 9999, padding: '7px 16px', fontSize: 18, fontWeight: 700}}>{t}</div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 3 ---------- never posts: locked button, plan to the Chief ---------- */
export const NoPost: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const drop = interpolate(f, [at(0.45), at(0.7)], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  const shake = f > at(0.18) && f < at(0.3) ? Math.sin(f * 2.2) * 6 : 0;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.18)} name="tick2" vol={0.25} />
      <Sfx at={at(0.7)} name="pop2" vol={0.25} dur={20} />
      <Head label="Content Bot · the rule">It *never* posts on its own</Head>
      <In at={at(0.05)} style={{position: 'absolute', left: 150, top: 220}}>
        <div style={{width: 380, background: '#fff', borderRadius: 24, boxShadow: 'var(--op-shadow)', padding: 24, textAlign: 'center', transform: `translateX(${shake}px)`}}>
          <div style={{fontSize: 20, color: DIM, fontWeight: 600, marginBottom: 16}}>Instagram · TikTok · Blog</div>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, background: '#e7e7ee', color: 'rgba(21,21,28,0.4)', borderRadius: 9999, padding: '14px 36px', fontSize: 30, fontWeight: 800}}>
            <Ico n="lock" s={30} c="rgba(21,21,28,0.45)" /> Post
          </div>
          <div style={{fontSize: 18, color: RED, fontWeight: 700, marginTop: 14}}>Locked for Bots</div>
        </div>
      </In>
      <div style={{position: 'absolute', left: 700, top: 150 + 230 * drop, opacity: f > at(0.4) && drop < 1 ? 1 : 0}}>
        <div style={{background: '#1d1d26', color: '#fff', borderRadius: 12, padding: '10px 16px', fontSize: 18, fontWeight: 700, display: 'flex', gap: 8, alignItems: 'center'}}>
          <Ico n="doc" s={20} c="#fff" /> week-plan.md
        </div>
      </div>
      <In at={at(0.32)} style={{position: 'absolute', left: 650, top: 360}}>
        <div style={{width: 470, height: 140, background: '#fff', borderRadius: 24, boxShadow: drop >= 1 ? `0 0 0 6px ${M.head.color}55, var(--op-shadow)` : 'var(--op-shadow)', display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', boxSizing: 'border-box'}}>
          <Bot shape={M.head.shape} color={M.head.color} size={84} />
          <div>
            <div style={{fontSize: 26, fontWeight: 800}}>Chief Brain inbox</div>
            <div style={{fontSize: 18, color: drop >= 1 ? GREEN : DIM, fontWeight: 700}}>{drop >= 1 ? '✓ week plan received' : 'waiting…'}</div>
          </div>
        </div>
      </In>
    </RSlide>
  );
};

/* 5 ---------- scored leads ---------- */
const LEADS: [string, string, 'hot' | 'warm' | 'cold'][] = [
  ['Summit Outdoor Co.', 'no product videos', 'hot'],
  ['Bluebird Bakery', 'site loads in 9 s', 'hot'],
  ['Atlas Movers', 'no Google reviews reply', 'hot'],
  ['Copper Kettle', 'old menu online', 'warm'],
  ['Fern & Moss', 'no blog in 2 years', 'warm'],
  ['Ridge Yoga', 'ads with no landing page', 'warm'],
  ['Sunny Laundry', 'busy, happy', 'cold'],
  ['Kite Studio', 'agency already', 'cold'],
  ['Tidal Surf', 'small gap', 'cold'],
  ['Mango Print', 'no budget', 'cold'],
];
const SC = {hot: RED, warm: AMBER, cold: '#5b8def'};
export const Leads: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const scoreAt = at(0.45);
  const draftAt = at(0.7);
  return (
    <RSlide vo={vo}>
      <Sfx at={scoreAt} name="pop1" vol={0.2} dur={20} />
      <Sfx at={draftAt} name="typing" vol={0.14} dur={40} />
      <Head label="Lead Bot · weekdays 10 AM">Ten leads, *scored*</Head>
      <In at={at(0.03)} tick={false} style={{position: 'absolute', left: 72, top: 158}}>
        <div style={{width: 1136, background: '#fff', borderRadius: 18, boxShadow: 'var(--op-shadow)', padding: '8px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 30}}>
          {LEADS.map(([n, gap, s], i) => (
            <In key={n} at={at(0.06) + i * at(0.03)} tick={i % 3 === 0} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '9px 4px', borderTop: i > 1 ? '1px solid var(--op-line)' : 'none'}}>
              <div style={{flex: 1}}>
                <div style={{fontSize: 19, fontWeight: 700}}>{n}</div>
                <div style={{fontSize: 14, color: DIM}}>{gap}</div>
              </div>
              {f > scoreAt + (i % 10) * 2 && (
                <div style={{background: SC[s], color: '#fff', borderRadius: 9999, padding: '3px 12px', fontSize: 14, fontWeight: 800, textTransform: 'uppercase'}}>{s}</div>
              )}
              {s === 'hot' && f > draftAt + i * 6 && (
                <div style={{display: 'flex', alignItems: 'center', gap: 5, background: '#1d1d26', color: '#fff', borderRadius: 9999, padding: '3px 10px', fontSize: 13, fontWeight: 700}}>
                  <Ico n="mail" s={15} c="#fff" /> draft
                </div>
              )}
            </In>
          ))}
        </div>
      </In>
    </RSlide>
  );
};

/* 6 ---------- drafts only ---------- */
export const Drafts: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.4)} name="ding" vol={0.24} dur={40} />
      <In at={at(0.04)} style={{position: 'absolute', left: 120, top: 175}}>
        <div style={{width: 470, background: '#fff', borderRadius: 26, boxShadow: 'var(--op-shadow)', padding: '20px 24px'}}>
          <div style={{fontFamily: mono.fontFamily, fontSize: 15, letterSpacing: 2, color: DIM}}>OUTBOX</div>
          <div style={{fontSize: 26, fontWeight: 800, margin: '4px 0 12px'}}>Waiting for you</div>
          {['Summit Outdoor Co.', 'Bluebird Bakery', 'Atlas Movers'].map((n, i) => (
            <In key={n} at={at(0.12) + i * 7} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: '1px solid var(--op-line)'}}>
              <IcoBox n="mail" s={40} c={M.legs.color} />
              <div style={{flex: 1, fontSize: 20, fontWeight: 700}}>{n}</div>
              <Pill kind="ghost" size={15}>not sent</Pill>
            </In>
          ))}
        </div>
      </In>
      <In at={at(0.38)} tick={false} style={{position: 'absolute', left: 650, top: 200, fontSize: 104, fontWeight: 800, letterSpacing: -4, lineHeight: 1}}>
        Drafts<br /><span style={{color: ACC}}>only.</span>
      </In>
      <In at={at(0.6)} style={{position: 'absolute', left: 656, top: 430}}><div style={{fontSize: 28, color: DIM, fontWeight: 700}}>Nothing leaves without you.</div></In>
    </RSlide>
  );
};

/* 8 ---------- approvals (real) ---------- */
export const Approve: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Head label="Built into Grok Bot">Sensitive steps wait for *your OK*</Head>
      <RealSrc spec={{...SHOT.needsOk, crop: {x: 224, y: 70, w: 976, h: 470}, w: 720, x: 72, y: 165, hl: {x: 520, y: 96, w: 440, h: 112}}} at={at(0.04)} source="x.ai/bot" />
      {[
        {ico: 'bolt' as IcoName, t: 'Bot proposes', s: 'the exact action', c: '#5b6cff'},
        {ico: 'eye' as IcoName, t: 'You review', s: 'send · edit · skip'},
        {ico: 'check' as IcoName, t: 'Then it runs', c: GREEN},
      ].map((r, i) => (
        <Card key={r.t} at={at(0.3) + i * at(0.14)} style={{position: 'absolute', left: 840, top: 205 + i * 92}} box={{width: 370, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14}}>
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

/* 9 ---------- the rule ---------- */
const RULE = 'Always ask me before anything goes to a customer.';
export const Rule: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.3)} name="typing" vol={0.15} dur={70} />
      <Head label="Write your own rule">Set the *boundary* in plain words</Head>
      <RealSrc spec={{...SHOT.approvals, crop: {x: 370, y: 120, w: 860, h: 620}, w: 470, x: 72, y: 160}} at={at(0.03)} source="docs.x.ai/grok-bot" />
      <Card at={at(0.22)} style={{position: 'absolute', left: 600, top: 200}} box={{width: 610, borderRadius: 28, padding: '26px 30px'}} hl={SHIELD}>
        <div style={{display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12}}>
          <Ico n="shield" s={34} c={SHIELD} />
          <div style={{fontFamily: mono.fontFamily, fontSize: 15, letterSpacing: 2, color: SHIELD}}>RULE FOR EVERY BOT</div>
        </div>
        <div style={{fontSize: 38, fontWeight: 800, lineHeight: 1.22, minHeight: 140}}>
          “{typed(RULE, f, at(0.3), 26)}
          <span style={{opacity: f % 20 < 10 ? 1 : 0, color: SHIELD}}>▌</span>
        </div>
      </Card>
    </RSlide>
  );
};

/* 10–13 ---------- the group chat moment ---------- */
const JOIN = (at: (x: number) => number) => TEAM.map((m, i) => ({m, at: at(0.18) + i * at(0.12)}));
const ASK = 'Everyone post your most important finding in one line, then turn it into one plan with today’s top five moves.';

export const Moment: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      {TEAM.map((_, i) => <Sfx key={i} at={at(0.18) + i * at(0.12)} name={`tick${(i % 3) + 1}`} vol={0.2} />)}
      <Head label="Now, the moment">One group chat, *all five* Bots</Head>
      <GroupChat y={158} h={385} joined={JOIN(at)} msgs={[]} />
    </RSlide>
  );
};

export const OneMsg: React.FC<P> = ({vo}) => {
  const at = useAt();
  const send = at(0.62);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.08)} name="typing" vol={0.15} dur={send - at(0.08)} />
      <Sfx at={send} name="whoosh" vol={0.25} dur={25} />
      <Head label="One message">Send it *once*</Head>
      <GroupChat
        y={158}
        h={385}
        joined={TEAM.map((m) => ({m, at: -100}))}
        msgs={[{me: true, text: ASK, at: send}]}
        input={{text: ASK, typeAt: at(0.08), sendAt: send}}
        typingAt={send + 10}
      />
    </RSlide>
  );
};

const REPLIES = (at: (x: number) => number) => [
  {me: true, text: 'Everyone post your top finding, then one plan with today’s top five moves.', at: -100},
  {m: M.larm, text: 'Hiking pack 40L: only 4 left. Restock not confirmed yet.', at: at(0.1), tone: 'warn' as const},
  {m: M.rarm, text: 'Two client report cards need your approval.', at: at(0.3)},
  {m: M.legs, text: '3 hot leads, drafts waiting.', at: at(0.48)},
];
export const Replies: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="pop1" vol={0.22} dur={20} />
      <Head label="The replies come in">Store Bot raises a *flag*</Head>
      <GroupChat y={158} h={385} joined={TEAM.map((m) => ({m, at: -100}))} msgs={REPLIES(at)} />
    </RSlide>
  );
};

export const Correct: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const fixAt = at(0.3);
  const flip = f > at(0.55);
  const old = REPLIES(at).map((m) => ({...m, at: -100}));
  return (
    <RSlide vo={vo}>
      <Sfx at={fixAt} name="pop2" vol={0.24} dur={20} />
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Head label="Nobody asked it to">The Content Bot *corrects* the plan</Head>
      <GroupChat x={72} y={158} w={760} h={385} fs={15} joined={TEAM.map((m) => ({m, at: -100}))} msgs={[...old, {m: M.chest, text: 'Holding the hiking pack video until the restock is confirmed.', at: fixAt, tone: 'fix'}]} />
      <Card at={at(0.08)} style={{position: 'absolute', left: 852, top: 158}} box={{width: 356, padding: '14px 16px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6}}>
          <Bot shape={M.head.shape} color={M.head.color} size={26} bob={1} />
          <div style={{fontSize: 17, fontWeight: 800}}>Today’s top 5</div>
        </div>
        {['Reply to 3 hot leads', 'Approve 2 report cards', 'Post hiking pack video', 'Publish week plan', 'Reorder hiking packs'].map((t, i) => {
          const isFix = i === 2;
          return (
            <div key={t} style={{display: 'flex', gap: 10, alignItems: 'center', fontSize: 16, padding: '8px 6px', borderTop: '1px solid var(--op-line)', background: isFix && flip ? 'rgba(224,42,136,0.10)' : 'transparent', borderRadius: 8}}>
              <span style={{width: 22, height: 22, borderRadius: 11, background: isFix && flip ? M.chest.color : '#ececf2', color: isFix && flip ? '#fff' : DIM, fontSize: 13, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</span>
              <span style={{flex: 1, fontWeight: 600, textDecoration: isFix && flip ? 'line-through' : 'none', color: isFix && flip ? DIM : '#15151c'}}>{t}</span>
              {isFix && flip && <In at={at(0.55)} tick={false}><span style={{background: M.chest.color, color: '#fff', borderRadius: 9999, padding: '2px 10px', fontSize: 13, fontWeight: 800}}>HOLD</span></In>}
            </div>
          );
        })}
      </Card>
    </RSlide>
  );
};

/* 14 ---------- why: same thread ---------- */
export const Why: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const beam = interpolate(f, [at(0.3), at(0.55)], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.22} dur={40} />
      <Head label="Why it worked">They see each other’s *work*</Head>
      {[
        {m: M.larm, t: 'Hiking packs: 4 left', s: 'restock not confirmed', x: 110},
        {m: M.chest, t: 'Hold the hiking pack video', s: 'until restock', x: 790},
      ].map((c, i) => (
        <In key={c.t} at={at(0.06) + i * at(0.12)} style={{position: 'absolute', left: c.x, top: 230}}>
          <div style={{width: 380, background: '#fff', borderRadius: 24, boxShadow: 'var(--op-shadow)', padding: '20px 22px', borderTop: `6px solid ${c.m.color}`}}>
            <BotTag m={c.m} size={20} />
            <div style={{fontSize: 27, fontWeight: 800, marginTop: 14}}>{c.t}</div>
            <div style={{fontSize: 18, color: DIM}}>{c.s}</div>
          </div>
        </In>
      ))}
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <line x1={490} y1={315} x2={490 + 300 * beam} y2={315} stroke={ACC} strokeWidth={6} strokeLinecap="round" strokeDasharray="12 10" strokeDashoffset={-f * 2} />
      </svg>
      <In at={at(0.5)} style={{position: 'absolute', left: 530, top: 345}}><Pill kind="dark" size={22}># same thread</Pill></In>
      <In at={at(0.7)} style={{position: 'absolute', left: 0, width: 1280, top: 460, textAlign: 'center'}}><div style={{fontSize: 30, fontWeight: 800}}>Nobody told it to.</div></In>
    </RSlide>
  );
};

/* 15 ---------- old way vs new way ---------- */
export const OldNew: React.FC<P> = ({vo}) => {
  const at = useAt();
  const old = ['5 tools every morning', 'Stock checked by hand', 'Evenings on client reports', 'Blank page for posts', 'Mornings hunting leads'];
  const neu = ['One plan in one chat', 'Low stock flagged', 'Report cards by Monday', 'Week of content planned', 'Leads scored + drafted'];
  return (
    <RSlide vo={vo}>
      {[0, 1].map((side) => (
        <In key={side} at={at(side ? 0.5 : 0.03)} tick={false} style={{position: 'absolute', left: 90 + side * 560, top: 120}}>
          <div style={{width: 520, height: 410, background: side ? '#fff' : 'rgba(255,255,255,0.55)', borderRadius: 26, boxShadow: side ? 'var(--op-shadow)' : 'none', padding: '22px 28px', boxSizing: 'border-box', border: side ? `3px solid ${GREEN}` : '2px dashed rgba(21,21,28,0.18)'}}>
            <div style={{fontSize: 34, fontWeight: 800, color: side ? GREEN : RED, marginBottom: 14}}>{side ? 'The new way' : 'The old way'}</div>
            {(side ? neu : old).map((t, i) => (
              <In key={t} at={at(side ? 0.56 : 0.08) + i * at(0.06)} style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 600, padding: '9px 0', color: side ? '#15151c' : 'rgba(21,21,28,0.6)'}}>
                <Ico n={side ? 'check' : 'x'} s={24} c={side ? GREEN : RED} />
                {t}
              </In>
            ))}
          </div>
        </In>
      ))}
    </RSlide>
  );
};

/* 16 ---------- you're the boss ---------- */
export const Boss: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const stamp = spring({frame: f - at(0.55), fps, config: {damping: 10, stiffness: 160}});
  const press = f > at(0.48) && f < at(0.56);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="pop2" vol={0.3} dur={20} />
      <Sfx at={at(0.58)} name="ding" vol={0.25} dur={40} />
      <Abs x={130} y={175}><Colossus h={360} parts={{...ALL, shield: -60}} nod={at(0.6)} /></Abs>
      <Head label="Your new job">You’re the *boss*</Head>
      <In at={at(0.08)} style={{position: 'absolute', left: 560, top: 180}}>
        <div style={{width: 560, background: '#fff', borderRadius: 24, boxShadow: 'var(--op-shadow)', padding: '20px 24px', position: 'relative'}}>
          <div style={{fontSize: 22, fontWeight: 800}}>Today’s plan · 5 moves</div>
          {['Reply to 3 hot leads', 'Approve 2 report cards', 'Reorder hiking packs'].map((t) => (
            <div key={t} style={{fontSize: 19, color: DIM, padding: '6px 0', borderTop: '1px solid var(--op-line)'}}>{t}</div>
          ))}
          <div style={{display: 'flex', gap: 14, marginTop: 14}}>
            <div style={{background: GREEN, color: '#fff', borderRadius: 9999, padding: '10px 34px', fontSize: 22, fontWeight: 800, transform: `scale(${press ? 0.92 : 1})`}}>Yes</div>
            <div style={{background: '#ececf2', borderRadius: 9999, padding: '10px 34px', fontSize: 22, fontWeight: 800}}>No</div>
          </div>
          {f > at(0.55) && (
            <div style={{position: 'absolute', right: 30, top: 70, transform: `rotate(-14deg) scale(${2 - stamp})`, opacity: Math.min(1, stamp * 1.5), border: `5px solid ${GREEN}`, color: GREEN, borderRadius: 14, padding: '6px 16px', fontSize: 34, fontWeight: 800, letterSpacing: 3}}>
              APPROVED
            </div>
          )}
        </div>
      </In>
    </RSlide>
  );
};

/* 17 ---------- tips chapter ---------- */
export const Tips = mkChapter({kicker: 'BEFORE YOU BUILD', num: '3', title: 'Tips', bgWord: 'TIPS'});

/* 18 ---------- tip 1: head first ---------- */
export const Tip1: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const snap = at(0.5);
  const tidy = interpolate(f, [snap, snap + 18], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={snap + 6} name="pop2" vol={0.26} dur={20} />
      <Head label="Tip 1">Build the *head* first</Head>
      <Abs x={110} y={130}><Colossus h={400} parts={{larm: -60, rarm: -60, chest: -60, legs: -60, head: snap}} glow={f > snap ? 'head' : undefined} /></Abs>
      {TEAM.slice(1).map((m, i) => {
        const sx = 520 + (i % 2) * 330 + Math.sin(f / 12 + i) * 12;
        const sy = 180 + Math.floor(i / 2) * 150 + Math.cos(f / 14 + i) * 10;
        const tx = 560;
        const ty = 190 + i * 82;
        return (
          <In key={m.key} at={at(0.06) + i * 5} style={{position: 'absolute', left: sx + (tx - sx) * tidy, top: sy + (ty - sy) * tidy, transform: `rotate(${(1 - tidy) * (i % 2 ? 6 : -6)}deg)`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 18, padding: '10px 16px', boxShadow: 'var(--op-shadow)', width: 300}}>
              <Bot shape={m.shape} color={m.color} size={36} bob={1} />
              <div style={{fontSize: 19, fontWeight: 700, flex: 1}}>{m.name}</div>
              {tidy > 0.9 ? <Ico n="up" s={20} c={M.head.color} /> : <span style={{fontSize: 14, color: DIM}}>chat</span>}
            </div>
          </In>
        );
      })}
      <In at={at(0.2)} style={{position: 'absolute', left: 900, top: 470}}><Pill kind="ghost" size={20}>{f > snap ? 'Now they report up' : 'Five more chats'}</Pill></In>
    </RSlide>
  );
};

/* 19 ---------- tip 2: one job, one schedule ---------- */
export const Tip2: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const cross = interpolate(f, [at(0.55), at(0.65)], [0, 1], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="tick3" vol={0.24} />
      <Head label="Tip 2">One job, *one schedule*</Head>
      <In at={at(0.06)} style={{position: 'absolute', left: 130, top: 190}}>
        <div style={{width: 440, height: 300, background: '#fff', borderRadius: 26, boxShadow: 'var(--op-shadow)', padding: '22px 26px', boxSizing: 'border-box', border: `3px solid ${GREEN}`}}>
          <BotTag m={M.larm} size={22} />
          <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily, letterSpacing: 2, marginTop: 18}}>JOB</div>
          <div style={{fontSize: 28, fontWeight: 800}}>Flag low stock</div>
          <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily, letterSpacing: 2, marginTop: 14}}>SCHEDULE</div>
          <div style={{fontSize: 28, fontWeight: 800}}>⏱ 7:00 AM daily</div>
        </div>
      </In>
      <In at={at(0.3)} style={{position: 'absolute', left: 700, top: 190}}>
        <div style={{width: 440, height: 300, background: 'rgba(255,255,255,0.6)', borderRadius: 26, padding: '22px 26px', boxSizing: 'border-box', position: 'relative', border: '2px dashed rgba(21,21,28,0.2)'}}>
          <div style={{fontSize: 22, fontWeight: 800, color: DIM, marginBottom: 12}}>Do-everything Bot</div>
          {['Store', 'Clients', 'Content', 'Leads', 'Emails', 'Ads'].map((t) => (
            <span key={t} style={{display: 'inline-block', margin: '0 8px 10px 0', background: '#ececf2', borderRadius: 9999, padding: '6px 14px', fontSize: 18, fontWeight: 600, color: DIM}}>{t}</span>
          ))}
          <div style={{fontSize: 20, color: DIM, marginTop: 6}}>⏱ whenever…</div>
          <svg width={440} height={300} style={{position: 'absolute', left: 0, top: 0}}>
            <line x1={30} y1={30} x2={30 + 380 * cross} y2={30 + 240 * cross} stroke={RED} strokeWidth={8} strokeLinecap="round" />
          </svg>
        </div>
      </In>
    </RSlide>
  );
};

/* 20 ---------- tip 3: sample data first, then live ---------- */
export const Tip3: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const days = Math.floor(interpolate(f, [at(0.3), at(0.65)], [0, 7], clamp));
  const live = f > at(0.72);
  const knob = interpolate(f, [at(0.72), at(0.78)], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.72)} name="ding" vol={0.25} dur={40} />
      <Head label="Tip 3 · the mistake that breaks it">Never go live on *day one*</Head>
      <Abs x={110} y={200} style={{display: 'flex', gap: 14}}>
        {Array.from({length: 7}).map((_, i) => (
          <div key={i} style={{width: 92, height: 110, borderRadius: 18, background: i < days ? '#fff' : 'rgba(255,255,255,0.5)', boxShadow: i < days ? 'var(--op-shadow)' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
            <div style={{fontFamily: mono.fontFamily, fontSize: 14, color: DIM}}>DAY {i + 1}</div>
            {i < days ? <Ico n="check" s={40} c={GREEN} /> : <div style={{height: 40}} />}
          </div>
        ))}
      </Abs>
      <In at={at(0.05)} style={{position: 'absolute', left: 110, top: 360}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 24, boxShadow: 'var(--op-shadow)', padding: '18px 26px', width: 860, boxSizing: 'border-box'}}>
          <div style={{fontSize: 24, fontWeight: 800, color: live ? DIM : '#15151c'}}>Sample data · drafts only</div>
          <div style={{width: 110, height: 56, borderRadius: 28, background: live ? GREEN : '#d6d6de', position: 'relative'}}>
            <div style={{position: 'absolute', top: 6, left: 6 + 54 * knob, width: 44, height: 44, borderRadius: 22, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'}} />
          </div>
          <div style={{fontSize: 24, fontWeight: 800, color: live ? GREEN : DIM}}>Real sending</div>
        </div>
      </In>
    </RSlide>
  );
};

/* 21 ---------- outro ---------- */
export const Outro: React.FC<P> = ({vo}) => {
  const at = useAt();
  const keys: PartKey[] = ['head', 'larm', 'rarm', 'chest', 'legs', 'shield'];
  const parts = Object.fromEntries(keys.map((k, i) => [k, at(0.06) + i * at(0.1)])) as Partial<Record<PartKey, number>>;
  const names = ['Head', 'Two arms', 'Chest', 'Legs', 'Shield'];
  return (
    <RSlide vo={vo}>
      {keys.map((k, i) => <Sfx key={k} at={at(0.06) + i * at(0.1) + 5} name={`tick${(i % 3) + 1}`} vol={0.2} />)}
      <Sfx at={at(0.7)} name="ding" vol={0.28} dur={40} />
      <Abs x={130} y={110}><Colossus h={420} parts={parts} glow="shield" /></Abs>
      <Abs x={560} y={140} style={{display: 'flex', gap: 10, flexWrap: 'wrap', width: 640}}>
        {names.map((n, i) => <In key={n} at={at(0.06) + i * at(0.11)}><Pill kind="dark" size={22}>{n}</Pill></In>)}
      </Abs>
      <In at={at(0.68)} tick={false} style={{position: 'absolute', left: 556, top: 220, fontSize: 70, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05}}>
        Let your Bots<br /><span style={{color: ACC}}>check each other.</span>
      </In>
      <Abs x={560} y={410} style={{display: 'flex', gap: 18}}>
        {TEAM.map((m, i) => <In key={m.key} at={at(0.76) + i * 4}><Bot shape={m.shape} color={m.color} size={70} phase={i * 8} /></In>)}
      </Abs>
    </RSlide>
  );
};

export {Kicker, builtBefore};
