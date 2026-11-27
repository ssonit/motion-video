import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Abs, Card, Head, In, Pill, R, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';
import {RealShot} from '../../real/RealShot';
import {ACC, ASSETS, BC, DIM, Ico, IcoBox, Real, SHOTS} from './common';
import type {IcoName} from './common';

/** Map with pins; "no website" pins glow orange. Right side: a checklist or a counter. */
export const mkMap = (o: {label: string; title: string; pins?: number; glow?: number; checks?: string[]; counter?: {to: number; text: string}; asset?: string}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const n = o.pins ?? 22;
  const real = o.asset ? ASSETS[o.asset] : undefined;
  const pins = Array.from({length: n}).map((_, i) => ({x: 30 + ((i * 89) % 560), y: 24 + ((i * 53) % 290), no: i % 3 !== 0}));
  const glow = o.glow ?? 0.5;
  const cnt = o.counter ? Math.round(interpolate(f, [at(0.3), at(0.8)], [0, o.counter.to], {...clamp, easing: Easing.out(Easing.cubic)})) : 0;
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      {real ? (
        <Abs x={110} y={195}><RealShot src={real} w={640} h={340} /></Abs>
      ) : (
        <Card at={at(0.04)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 640, height: 340, padding: 0, overflow: 'hidden', background: '#1b2024', position: 'relative'}}>
          {[0, 1, 2, 3].map((k) => <div key={'h' + k} style={{position: 'absolute', left: 0, right: 0, top: 70 + k * 80, height: 2, background: 'rgba(255,255,255,0.05)'}} />)}
          {[0, 1, 2, 3, 4, 5].map((k) => <div key={'v' + k} style={{position: 'absolute', top: 0, bottom: 0, left: 60 + k * 105, width: 2, background: 'rgba(255,255,255,0.05)'}} />)}
          {pins.map((p, i) => {
            const on = p.no && f > at(glow) + (i % 6) * 3;
            return (
              <In key={i} at={at(0.08) + i * 2} tick={false} style={{position: 'absolute', left: p.x, top: p.y}}>
                <div style={{width: 26, height: 26, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: on ? ACC : '#6b7380', boxShadow: on ? `0 0 22px ${ACC}` : 'none'}} />
              </In>
            );
          })}
        </Card>
      )}
      {o.checks && (
        <Abs x={800} y={200} style={{width: 380}}>
          {o.checks.map((c, i) => (
            <Card key={c} at={at(0.3) + i * at(0.15)} box={{marginBottom: 14, padding: '14px 18px', fontSize: 24, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12}}>
              <Ico n="x" s={24} c="#ff5a6e" />
              {c}
            </Card>
          ))}
        </Abs>
      )}
      {o.counter && (
        <Abs x={800} y={230} style={{width: 380}}>
          <div style={{fontSize: 110, fontWeight: 800, letterSpacing: -4, color: ACC}}>{cnt}<span style={{fontSize: 50}}>{cnt >= o.counter.to ? '+' : ''}</span></div>
          <div style={{fontSize: 24, color: DIM}}>{o.counter.text}</div>
        </Abs>
      )}
      <Sfx at={at(glow)} name="pop1" vol={0.2} dur={30} />
    </RSlide>
  );
};

/** Phone whose empty gallery fills up with lawn-stripe photos (drawn). */
export const PhoneGallery: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Head label="Another gap">No *portfolio* to show</Head>
      <Card at={at(0.04)} style={{position: 'absolute', left: 150, top: 175}} box={{width: 260, height: 370, borderRadius: 40, padding: 14, background: '#0f0f10', border: '3px solid #3a3a40'}}>
        <div style={{fontSize: 15, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: 8, fontFamily: mono.fontFamily}}>MY LAWNS</div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6}}>
          {Array.from({length: 12}).map((_, i) => (
            <In key={i} at={at(0.25) + i * 5} tick={i % 3 === 0}>
              <div style={{height: 62, borderRadius: 8, background: `repeating-linear-gradient(${i % 2 ? 0 : 90}deg, hsl(125,45%,${28 + (i % 3) * 4}%) 0 8px, hsl(125,45%,${22 + (i % 3) * 4}%) 8px 16px)`}} />
            </In>
          ))}
        </div>
      </Card>
      <Abs x={520} y={220} style={{width: 640}}>
        <In at={at(0.1)}><Pill kind="ghost" size={24}>Before: an empty phone, nothing to show</Pill></In>
        <div style={{height: 22}} />
        <In at={at(0.4)}><Pill kind="white" size={24}>After: a gallery of perfect stripes</Pill></In>
        <div style={{height: 22}} />
        <In at={at(0.7)}><Card at={at(0.7)} box={{display: 'flex', alignItems: 'center', gap: 14}}><IcoBox n="camera" s={48} /><div style={{fontSize: 26, fontWeight: 600}}>Every gap is a product</div></Card></In>
      </Abs>
    </RSlide>
  );
};

/** Calendar strip: months flip in, a coin lands on each. */
export const Months: React.FC<P> = ({vo}) => {
  const at = useAt();
  const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return (
    <RSlide vo={vo}>
      <Head label="Recurring income">Sell it *monthly*</Head>
      <Abs x={0} y={215} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 16}}>
        {ms.map((m, i) => (
          <Card key={m} at={at(0.08) + i * at(0.1)} box={{width: 150, textAlign: 'center', padding: '14px 10px'}}>
            <div style={{fontFamily: mono.fontFamily, fontSize: 20, color: DIM}}>{m}</div>
            <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0'}}><IcoBox n="coin" s={58} c="#ffd166" /></div>
            <In at={at(0.14) + i * at(0.1)}><div style={{fontSize: 22, fontWeight: 700, color: R.green}}>+ paid</div></In>
          </Card>
        ))}
      </Abs>
      <In at={at(0.7)} style={{position: 'absolute', left: 0, width: 1280, top: 420, textAlign: "center", fontSize: 46, fontWeight: 800}}>
        One sale is nice. <span style={{color: ACC}}>The subscription is the point.</span>
      </In>
      <Sfx at={at(0.7)} name="ding" vol={0.25} dur={40} />
    </RSlide>
  );
};

/** Email composer: text types out, price tag pops. */
export const Composer: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const body = 'Hi! I built a website for your business. Take a look. If you like it, it is $499. If not, no hard feelings.';
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="typing" vol={0.15} dur={110} />
      <Head label="Step 2">A short, friendly *email*</Head>
      <Card at={at(0.04)} style={{position: 'absolute', left: 150, top: 190}} box={{width: 980, padding: 0, overflow: 'hidden'}}>
        <div style={{padding: '12px 22px', background: 'rgba(21,21,28,0.06)', fontSize: 19, color: DIM, fontFamily: mono.fontFamily}}>To: local business · Subject: I built you a website</div>
        <div style={{padding: '22px 26px', fontSize: 30, lineHeight: 1.4, minHeight: 190}}>{typed(body, f, at(0.12), 34)}<span style={{opacity: f % 20 < 10 ? 1 : 0, color: ACC}}>▌</span></div>
      </Card>
      <In at={at(0.7)} style={{position: 'absolute', left: 860, top: 440}}><Pill kind="white" size={32}>$499 if you like it</Pill></In>
      <Sfx at={at(0.7)} name="ding" vol={0.22} dur={40} />
    </RSlide>
  );
};

/** Grid of envelopes; only a few light up (replies). `built` = how many get a site. */
export const mkEnvelopes = (o: {label: string; title: string; lit: number; foot: string; thumbs?: boolean}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const N = 60;
  const litSet = new Set([7, 23, 41, 52].slice(0, o.lit));
  const fade = o.thumbs ? interpolate(f, [at(0.45), at(0.7)], [1, 0.12], clamp) : 1;
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      <Abs x={140} y={195} style={{display: 'grid', gridTemplateColumns: 'repeat(15, 62px)', gap: 8}}>
        {Array.from({length: N}).map((_, i) => {
          const on = litSet.has(i) && f > at(0.4);
          return (
            <div key={i} style={{opacity: on ? 1 : fade, transform: `scale(${on ? 1.18 : 1})`, transition: 'none'}}>
              <In at={at(0.04) + i * 0.6} tick={false}>
                <div style={{height: 46, borderRadius: 8, background: on ? ACC : 'rgba(21,21,28,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: on ? `0 0 24px ${ACC}` : 'none'}}>
                  <Ico n={o.thumbs && !on ? 'globe' : 'mail'} s={22} c={on ? '#fff' : 'rgba(21,21,28,0.45)'} />
                </div>
              </In>
            </div>
          );
        })}
      </Abs>
      <Sfx at={at(0.4)} name="pop2" vol={0.22} dur={30} />
      <In at={at(0.62)} style={{position: 'absolute', left: 140, top: 470}}><Pill kind="white" size={26}>{o.foot}</Pill></In>
    </RSlide>
  );
};

/** Chat thread: short messages from the business, the Bot answers. */
export const Chat: React.FC<P> = ({vo}) => {
  const at = useAt();
  const msgs: [boolean, string][] = [
    [true, 'Yes! I meant to get a site last year.'],
    [false, 'Great. What services do you offer?'],
    [true, 'Mowing, hedges, planting.'],
    [false, 'Send me two photos and I will start.'],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="A reply arrives">Answer fast, keep it *simple*</Head>
      <Abs x={270} y={190} style={{width: 740}}>
        {msgs.map(([them, t], i) => (
          <In key={t} at={at(0.12) + i * at(0.17)} style={{marginBottom: 12, display: 'flex', justifyContent: them ? 'flex-start' : 'flex-end'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, flexDirection: them ? 'row' : 'row-reverse'}}>
              <Ico n={them ? 'user' : 'mail'} s={0} />
              <div style={{maxWidth: 520, padding: '14px 22px', fontSize: 26, borderRadius: 24, background: them ? '#ffffff' : '#1d1d26', color: them ? '#15151c' : '#fff', fontWeight: 500, boxShadow: '0 6px 18px rgba(40,50,90,0.12)'}}>{t}</div>
              {!them && <Bot shape="drop" color={BC.drop} size={42} />}
            </div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/** Search results list; the client's site climbs to first place. */
export const SearchRank: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const climb = interpolate(f, [at(0.3), at(0.75)], [4, 0], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const names = ['Other site A', 'Other site B', 'Other site C', 'Other site D'];
  const slots = 5;
  const rows = [...names.map((t, i) => ({t, k: i, me: false})), {t: 'Your client', k: 4, me: true}];
  return (
    <RSlide vo={vo}>
      <Head label="Offer 2 · Search">I can also work on *SEO*</Head>
      <Card at={at(0.04)} style={{position: 'absolute', left: 110, top: 190}} box={{width: 560, height: 350, padding: '14px 18px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 22, color: DIM}}><Ico n="search" s={22} c={DIM} /> plumber near me</div>
        <div style={{position: 'relative'}}>
          {rows.map((r) => {
            const shift = r.me ? 0 : Math.min(1, Math.max(0, r.k - climb + 1));
            const y = r.me ? climb * 58 : (r.k + shift) * 58;
            return (
              <div key={r.t} style={{position: 'absolute', left: 0, right: 0, top: y, height: 50, borderRadius: 14, background: r.me ? `${ACC}33` : 'rgba(21,21,28,0.05)', border: r.me ? `2px solid ${ACC}` : '1px solid rgba(21,21,28,0.10)', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 23, fontWeight: 600, gap: 12}}>
                <Ico n="globe" s={22} c={r.me ? ACC : DIM} />{r.t}
              </div>
            );
          })}
          <div style={{height: slots * 58}} />
        </div>
      </Card>
      <Real spec={{...SHOTS.cats, crop: {x: 40, y: 255, w: 380, h: 90}, w: 500, x: 700, y: 195, hl: {x: 55, y: 292, w: 350, h: 36}, callout: 'An SEO Bot: keywords to content ideas'}} at={at(0.12)} />
      <In at={at(0.78)} style={{position: 'absolute', left: 700, top: 370}}><Pill kind="white" size={28}>#1</Pill></In>
      <In at={at(0.86)} style={{position: 'absolute', left: 790, top: 370}}><Pill kind="dark" size={24}>$249 / month</Pill></In>
      <Sfx at={at(0.75)} name="ding" vol={0.25} dur={40} />
    </RSlide>
  );
};

/** Review card; the Bot's reply types itself. */
export const ReviewReply: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const real = ASSETS.reviewreply;
  const reply = 'Thank you so much, we are glad the team could help. See you next time!';
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.3)} name="typing" vol={0.15} dur={90} />
      <Head label="Offer 3 · Reviews">I reply to your *reviews*</Head>
      {real ? (
        <Abs x={190} y={190}><RealShot src={real} w={900} h={340} /></Abs>
      ) : (
        <>
          <Card at={at(0.04)} style={{position: 'absolute', left: 190, top: 190}} box={{width: 900}}>
            <div style={{display: 'flex', gap: 4, marginBottom: 6}}>{[0, 1, 2, 3, 4].map((k) => <Ico key={k} n="star" s={26} c="#ffd166" />)}</div>
            <div style={{fontSize: 26}}>Fast, friendly and fair price. Would call again.</div>
          </Card>
          <Card at={at(0.25)} style={{position: 'absolute', left: 250, top: 340}} box={{width: 840, borderLeft: `4px solid ${ACC}`}}>
            <div style={{display: 'flex', gap: 14, alignItems: 'center'}}>
              <Bot shape="drop" color={BC.drop} size={44} />
              <div style={{fontSize: 24, lineHeight: 1.35}}>{typed(reply, f, at(0.3), 36)}</div>
            </div>
          </Card>
        </>
      )}
    </RSlide>
  );
};

/** Three agent windows, each with a tiny drawn chart. */
export const AgentWindows: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const ws: {t: string; ico: IcoName; h: number[]}[] = [
    {t: 'Stock agent', ico: 'box', h: [60, 44, 30, 18]},
    {t: 'Bookings agent', ico: 'cal', h: [30, 44, 52, 70]},
    {t: 'Finance agent', ico: 'coin', h: [50, 34, 60, 42]},
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Built in the background">The *next* agents</Head>
      <Abs x={0} y={200} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 24}}>
        {ws.map((w, i) => (
          <Card key={w.t} at={at(0.1) + i * at(0.2)} box={{width: 330, height: 330}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14}}><IcoBox n={w.ico} s={40} /><div style={{fontSize: 24, fontWeight: 700}}>{w.t}</div></div>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, height: 170}}>
              {w.h.map((h, k) => <div key={k} style={{flex: 1, height: interpolate(f, [at(0.2) + i * at(0.2), at(0.4) + i * at(0.2)], [4, h * 2.2], clamp), borderRadius: 8, background: k === 3 ? ACC : 'rgba(21,21,28,0.18)'}} />)}
            </div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};
