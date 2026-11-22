import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {mono} from '../../lib/Art';
import {AppWindow, Abs, Card, Head, In, Pill, R, RSlide} from './ui';
import type {BotSpec} from './ui';
import {Bot} from './BotMark';

/** Scenes for "bot-feedback-loop": 14 different looks (phones, bars, timelines, curves, loops, wipe…). */

const expo = Easing.out(Easing.exp);
const BOT: BotSpec = {name: 'Edit Bot', shape: 'drop', color: R.white};

/** A tiny ad used in the hook and the before/after shots. `punchy` = after feedback. */
const MiniAd: React.FC<{w: number; h: number; punchy: boolean; t: number}> = ({w, h, punchy, t}) => {
  const slam = punchy ? interpolate(t, [0, 8, 14], [3.2, 0.92, 1], {...clamp, easing: expo}) : interpolate(t, [0, 40], [0.9, 1], clamp);
  const op = punchy ? 1 : interpolate(t, [0, 40], [0, 1], clamp);
  const ring = punchy ? interpolate(t, [8, 30], [0, 1], clamp) : 0;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 26,
        overflow: 'hidden',
        position: 'relative',
        background: `repeating-conic-gradient(${R.orange} 0 8deg, #ff9a3c 8deg 16deg)`,
        border: `2px solid ${R.line}`,
      }}
    >
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {punchy && (
          <div
            style={{
              position: 'absolute',
              width: w * 0.9 * ring,
              height: w * 0.9 * ring,
              borderRadius: '50%',
              border: `5px solid rgba(255,255,255,${0.9 * (1 - ring)})`,
            }}
          />
        )}
        <div style={{transform: `scale(${slam})`, opacity: op}}>
          <Bot shape="drop" color={R.white} size={w * 0.42} bob={punchy ? 0 : 3} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 22,
          textAlign: 'center',
          fontSize: 22,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: 2,
          opacity: punchy ? interpolate(t, [14, 26], [0, 1], clamp) : 0.7,
        }}
      >
        MEGA SALE
      </div>
    </div>
  );
};

const PhoneShell: React.FC<{children: React.ReactNode; w?: number; h?: number}> = ({children, w = 250, h = 440}) => (
  <div style={{width: w, height: h, borderRadius: 36, background: '#050505', padding: 10, boxShadow: '0 20px 60px rgba(0,0,0,0.6)', border: `1px solid ${R.line}`}}>
    {children}
  </div>
);

/* 1 ===== Hook: same ad twice ===== */
export const HookFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const t = Math.max(0, f - at(0.32));
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.32)} name="ding" vol={0.3} dur={40} />
      <Abs x={0} y={30} style={{width: 1280, textAlign: 'center', fontSize: 30, color: R.mute}}>
        Same task. Same Bot.
      </Abs>
      <In at={at(0.04)} style={{position: 'absolute', left: 250, top: 70}}>
        <PhoneShell h={390}>
          <MiniAd w={228} h={368} punchy={false} t={f} />
        </PhoneShell>
      </In>
      <In at={at(0.12)} style={{position: 'absolute', left: 780, top: 70}}>
        <PhoneShell h={390}>
          <MiniAd w={228} h={368} punchy t={t} />
        </PhoneShell>
      </In>
      <Abs x={250} y={475} style={{width: 270, textAlign: 'center'}}>
        <Pill kind="dark" size={18}>First draft</Pill>
      </Abs>
      <Abs x={780} y={475} style={{width: 270, textAlign: 'center'}}>
        <Pill kind="white" size={18}>After one round of feedback</Pill>
      </Abs>
    </RSlide>
  );
};

/* 2 ===== Eye replaces the hands ===== */
export const ShiftFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const bar = interpolate(f, [at(0.08), at(0.35)], [0, 78], clamp);
  const eye = interpolate(f, [at(0.55), at(0.7)], [0, 1], {...clamp, easing: expo});
  const ok = f > at(0.7);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.7)} name="ding" vol={0.3} dur={40} />
      <Head label="Fast, not wise">A Bot can't feel what's off</Head>
      <Abs x={110} y={250} style={{width: 520}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <Bot shape="drop" color={R.white} size={78} bob={5} />
          <div style={{flex: 1}}>
            <div style={{fontSize: 18, color: R.dim, marginBottom: 8}}>Bot working…</div>
            <div style={{height: 18, borderRadius: 9, background: R.card}}>
              <div style={{width: `${bar}%`, height: '100%', borderRadius: 9, background: R.white}} />
            </div>
          </div>
          <div style={{fontSize: 46, color: ok ? R.green : R.red}}>{ok ? '✓' : f > at(0.35) ? '?' : ''}</div>
        </div>
        <In at={at(0.38)} style={{marginTop: 26}}>
          <Pill kind="ghost" size={22}>Done fast. Is it good?</Pill>
        </In>
      </Abs>
      <Abs x={760} y={200} style={{width: 400, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <svg width="360" height="220" viewBox="0 0 360 220">
          <path d="M20 110 Q180 -10 340 110 Q180 230 20 110Z" fill="none" stroke="#fff" strokeWidth="8" strokeLinejoin="round" />
          <circle cx="180" cy="110" r={46 * eye} fill={R.pink} />
          <circle cx="180" cy="110" r={20 * eye} fill="#0A0A0A" />
          <circle cx="194" cy="96" r={8 * eye} fill="#fff" />
        </svg>
      </Abs>
      <In at={at(0.75)} style={{position: 'absolute', left: 760, top: 470}}>
        <Pill kind="white" size={24}>Your eye is the skill</Pill>
      </In>
    </RSlide>
  );
};

/* 3 ===== Map of the 4 steps ===== */
export const MapFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const steps = ['Idea', 'Plan', 'Build', 'Feedback'];
  const line = interpolate(f, [at(0.08), at(0.6)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Head label="The method">Four steps, one loop</Head>
      <Abs x={140} y={330} style={{width: 1000, height: 6, borderRadius: 3, background: R.card}}>
        <div style={{width: `${line * 100}%`, height: '100%', borderRadius: 3, background: R.white}} />
      </Abs>
      {steps.map((s, i) => {
        const x = 140 + (i / 3) * 1000;
        const on = line >= i / 3 - 0.001;
        return (
          <React.Fragment key={s}>
            <In at={at(0.08 + (i / 3) * 0.52)} style={{position: 'absolute', left: x - 30, top: 303}}>
              <div style={{width: 60, height: 60, borderRadius: '50%', background: on ? '#fff' : R.card, color: R.bg, fontSize: 26, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 36px rgba(255,255,255,0.35)'}}>
                {i + 1}
              </div>
            </In>
            <Abs x={x - 100} y={385} style={{width: 200, textAlign: 'center', fontSize: 30, fontWeight: 500}}>{s}</Abs>
          </React.Fragment>
        );
      })}
    </RSlide>
  );
};

/* 4 ===== Idea: one sentence → one picture ===== */
export const IdeaFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const line = 'A phone ad where the logo slams in on a sunburst.';
  const glow = 0.5 + 0.5 * Math.sin(f / 9);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.2)} name="typing" vol={0.18} dur={90} />
      <Sfx at={at(0.72)} name="ding" vol={0.28} dur={40} />
      <Head label="Step 1 · Idea">One sentence, one picture</Head>
      <In at={at(0.05)} style={{position: 'absolute', left: 120, top: 250}}>
        <svg width="150" height="200" viewBox="0 0 150 200">
          <circle cx="75" cy="75" r={70 + glow * 8} fill="rgba(255,200,60,0.18)" />
          <path d="M75 15a48 48 0 0 1 28 87v18H47v-18A48 48 0 0 1 75 15Z" fill="#FFC83C" />
          <rect x="52" y="128" width="46" height="10" rx="5" fill="#bbb" />
          <rect x="58" y="146" width="34" height="10" rx="5" fill="#888" />
        </svg>
      </In>
      <Card at={at(0.15)} style={{position: 'absolute', left: 300, top: 270}} box={{width: 470, minHeight: 120}}>
        <div style={{fontSize: 27, lineHeight: 1.3, fontStyle: 'italic'}}>“{typed(line, f, at(0.2), 26)}”</div>
      </Card>
      <In at={at(0.6)} style={{position: 'absolute', left: 860, top: 190}}>
        <PhoneShell w={210} h={370}>
          <MiniAd w={190} h={350} punchy t={Math.max(0, f - at(0.62))} />
        </PhoneShell>
      </In>
    </RSlide>
  );
};

/* 5 ===== References beat a vague wish ===== */
export const RefsFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const cols = [R.pink, R.blue, R.green, R.violet];
  const from = [[-400, -80], [1500, -100], [-400, 260], [1500, 240]];
  return (
    <RSlide vo={vo}>
      <Head label="No idea yet?">Collect references first</Head>
      {cols.map((c, i) => {
        const k = interpolate(f, [at(0.1) + i * 8, at(0.1) + i * 8 + 28], [0, 1], {...clamp, easing: expo});
        const tx = 330 + (i % 2) * 330;
        const ty = 200 + Math.floor(i / 2) * 190;
        const x = from[i][0] + (tx - from[i][0]) * k;
        const y = ty + (from[i][1] - 0) * (1 - k) * 0.4;
        return (
          <Abs key={i} x={x} y={y} style={{width: 290, height: 160, borderRadius: 20, background: `linear-gradient(135deg, ${c}, ${R.card})`, border: `1px solid ${R.line}`, display: 'flex', alignItems: 'flex-end', padding: 14}}>
            <Pill kind="dark" size={16}>Reference {i + 1}</Pill>
            {i === 2 && f > at(0.6) && <div style={{position: 'absolute', right: 14, top: 8, fontSize: 40, color: '#FFD84A'}}>★</div>}
          </Abs>
        );
      })}
      <Sfx at={at(0.1)} name="pop1" vol={0.2} />
      <Sfx at={at(0.2)} name="pop2" vol={0.2} />
      <Sfx at={at(0.6)} name="ding" vol={0.22} dur={40} />
      <In at={at(0.7)} style={{position: 'absolute', left: 970, top: 250}}>
        <Pill kind="white" size={26}>Real examples win</Pill>
      </In>
    </RSlide>
  );
};

/* 6 ===== Plan: ask for scenes with times ===== */
export const PlanFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const rows = ['Logo slams in', 'Search bar types', 'Phone shows product', 'Delivery map', 'Gift box pops'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="typing" vol={0.15} dur={60} />
      <Head label="Step 2 · Plan">Split it into scenes, with times</Head>
      <Abs x={72} y={190}>
        <AppWindow
          w={720}
          h={340}
          rail={false}
          fs={15}
          threads={[]}
          active={0}
          bot={BOT}
          msgs={[
            {who: 'me', text: 'Split my idea into scenes. Give each a time.', at: at(0.08)},
            {who: 'bot', text: '13 scenes · about 45 seconds. Ready for you to read.', at: at(0.3)},
          ]}
        />
      </Abs>
      <Abs x={830} y={190} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {rows.map((r, i) => (
          <Card key={r} at={at(0.35) + i * 9} box={{width: 380, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12}}>
            <span style={{fontFamily: mono.fontFamily, fontSize: 18, color: R.orange}}>0:{String(i * 4).padStart(2, '0')}</span>
            <span style={{fontSize: 20}}>{r}</span>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 7 ===== Show the real thing ===== */
export const RealFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const swap = f > at(0.45);
  const flash = interpolate(f, [at(0.45), at(0.45) + 4, at(0.45) + 14], [0, 0.9, 0], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.45)} name="ding" vol={0.28} dur={40} />
      <Head label="First plan looks generic">Show it the real screens</Head>
      <In at={at(0.06)} style={{position: 'absolute', left: 420, top: 150}}>
        <PhoneShell w={250} h={400}>
          <div style={{width: 230, height: 380, borderRadius: 28, overflow: 'hidden', background: swap ? R.card2 : '#2a2a2a', padding: 14}}>
            {swap ? (
              <>
                <div style={{height: 36, borderRadius: 18, background: '#fff', color: '#111', fontSize: 15, display: 'flex', alignItems: 'center', padding: '0 14px'}}>🔍 wireless earbuds</div>
                {[R.pink, R.blue, R.green].map((c, i) => (
                  <div key={i} style={{display: 'flex', gap: 10, marginTop: 12, alignItems: 'center'}}>
                    <div style={{width: 64, height: 64, borderRadius: 14, background: c}} />
                    <div style={{flex: 1}}>
                      <div style={{height: 10, borderRadius: 5, background: R.mute, width: '80%'}} />
                      <div style={{height: 10, borderRadius: 5, background: R.orange, width: '40%', marginTop: 8}} />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              [0, 1, 2, 3].map((i) => <div key={i} style={{height: 50, borderRadius: 12, background: '#3a3a3a', marginBottom: 14}} />)
            )}
          </div>
        </PhoneShell>
      </In>
      {[0, 1, 2].map((i) => (
        <In key={i} at={at(0.55) + i * 8} style={{position: 'absolute', left: 740 + i * 46, top: 200 + i * 56, transform: `rotate(${(i - 1) * 6}deg)`}}>
          <div style={{width: 200, height: 130, borderRadius: 16, background: R.card, border: `1px solid ${R.line}`, padding: 12, fontSize: 16, color: R.mute}}>
            screenshot {i + 1}
            <div style={{height: 60, borderRadius: 10, background: [R.pink, R.blue, R.green][i], marginTop: 10, opacity: 0.8}} />
          </div>
        </In>
      ))}
      <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: flash, pointerEvents: 'none'}} />
    </RSlide>
  );
};

/* 8 ===== Build: layers fill a timeline ===== */
export const BuildFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const layers: [string, string][] = [['Background', R.violet], ['Logo', R.white], ['Search bar', R.blue], ['Phone', R.pink], ['Box', R.orange], ['Sound', R.green]];
  return (
    <RSlide vo={vo}>
      <Head label="Step 3 · Build">Let the Bot work</Head>
      <Abs x={110} y={190} style={{width: 1060, padding: 18, borderRadius: 18, background: R.panel, border: `1px solid ${R.line}`}}>
        {layers.map(([n, c], i) => {
          const w = interpolate(f, [at(0.1) + i * at(0.1), at(0.1) + i * at(0.1) + at(0.25)], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
          return (
            <div key={n} style={{display: 'flex', alignItems: 'center', height: 44, borderBottom: `1px solid ${R.line}`}}>
              <div style={{width: 160, fontSize: 18, color: R.mute}}>{n}</div>
              <div style={{flex: 1, position: 'relative', height: 26}}>
                <div style={{position: 'absolute', left: `${i * 9}%`, width: `${w * (48 - i * 2)}%`, height: 26, borderRadius: 8, background: c, opacity: 0.9}} />
              </div>
            </div>
          );
        })}
      </Abs>
      <Sfx at={at(0.1)} name="tick1" vol={0.16} />
      <Sfx at={at(0.3)} name="tick2" vol={0.16} />
      <In at={at(0.7)} style={{position: 'absolute', left: 110, top: 500}}>
        <Pill kind="ghost" size={22}>Use the wait to prepare notes</Pill>
      </In>
      <Abs x={1070} y={455}>
        <Bot shape="drop" color={R.white} size={84} bob={6} />
      </Abs>
    </RSlide>
  );
};

/* 9 ===== First draft: content ok, rhythm weak ===== */
export const DraftFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const blink = Math.floor(f / 9) % 2 === 0;
  const head = interpolate(f, [at(0.05), at(0.9)], [0, 1], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.45)} name="tick3" vol={0.2} />
      <Head label="First draft">Right content, weak rhythm</Head>
      <In at={at(0.05)} style={{position: 'absolute', left: 110, top: 190}}>
        <div style={{width: 520, height: 290, borderRadius: 16, border: `6px solid #1d1d1d`, background: R.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.6)'}}>
          <MiniAd w={150} h={270} punchy={false} t={f} />
        </div>
      </In>
      <Abs x={680} y={200} style={{width: 500}}>
        <div style={{fontSize: 18, color: R.dim, marginBottom: 14}}>TIMELINE</div>
        <div style={{position: 'relative', height: 120, borderRadius: 14, background: R.card2, border: `1px solid ${R.line}`}}>
          {[8, 22, 40, 58, 78].map((x, i) => (
            <div key={i} style={{position: 'absolute', left: `${x}%`, top: 20 + (i % 2) * 40, width: 70, height: 30, borderRadius: 8, background: i === 2 ? R.red : '#555'}} />
          ))}
          <div style={{position: 'absolute', left: `${head * 100}%`, top: 0, bottom: 0, width: 3, background: R.orange}} />
        </div>
        {f > at(0.4) && (
          <div style={{marginTop: 22, opacity: blink ? 1 : 0.35}}>
            <Pill kind="dark" size={22} style={{border: `2px solid ${R.red}`}}>⚠ stutter here · weak hit</Pill>
          </div>
        )}
      </Abs>
    </RSlide>
  );
};

/* 10 ===== Feedback with a time and a change ===== */
export const TimeFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const msg = '0:33 transition too slow. Make it fast and sharp.';
  const jump = interpolate(f, [at(0.55), at(0.62)], [8, 66], {...clamp, easing: expo});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="typing" vol={0.18} dur={90} />
      <Sfx at={at(0.55)} name="whoosh" vol={0.25} dur={30} />
      <Head label="Step 4 · Feedback">A time + a change</Head>
      <Card at={at(0.08)} style={{position: 'absolute', left: 110, top: 190}} box={{width: 820}} hl={R.orange}>
        <div style={{fontFamily: mono.fontFamily, fontSize: 28}}>
          <span style={{color: R.orange}}>{typed(msg.slice(0, 4), f, at(0.12), 20)}</span>
          {typed(msg.slice(4), f, at(0.12) + 12, 30)}
        </div>
      </Card>
      <Abs x={110} y={340} style={{width: 1060}}>
        <div style={{position: 'relative', height: 80, borderRadius: 14, background: R.card2, border: `1px solid ${R.line}`}}>
          {[6, 20, 34, 52, 68, 84].map((x, i) => (
            <div key={i} style={{position: 'absolute', left: `${x}%`, top: 24, width: '11%', height: 32, borderRadius: 8, background: f > at(0.62) && i === 3 ? R.orange : '#444'}} />
          ))}
          <div style={{position: 'absolute', left: `${jump}%`, top: -8, bottom: -8, width: 4, background: '#fff', borderRadius: 2}} />
          <div style={{position: 'absolute', left: `${jump}%`, top: -34, transform: 'translateX(-50%)', fontFamily: mono.fontFamily, fontSize: 18, color: '#fff'}}>0:33</div>
        </div>
      </Abs>
    </RSlide>
  );
};

/* 11 ===== Name the motion ===== */
export const EaseFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const items: [string, string][] = [
    ['ease-out expo', 'M0 100 C 10 10, 40 0, 100 0'],
    ['hard hit', 'M0 100 L 55 100 L 62 0 L 100 0'],
    ['same beat as the logo', 'M0 100 L 30 100 L 30 50 L 60 50 L 60 0 L 100 0'],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Be specific">Name the motion</Head>
      {items.map(([t, d], i) => {
        const k = interpolate(f, [at(0.15) + i * at(0.2), at(0.15) + i * at(0.2) + 24], [0, 1], clamp);
        return (
          <React.Fragment key={t}>
            <Sfx at={at(0.15) + i * at(0.2)} name={`tick${i + 1}`} vol={0.18} />
            <Card at={at(0.15) + i * at(0.2)} style={{position: 'absolute', left: 72 + i * 392, top: 200}} box={{width: 350, height: 300}} hl={i === 0 ? R.orange : undefined}>
              <div style={{fontSize: 26, fontWeight: 500, marginBottom: 16}}>{t}</div>
              <svg width="306" height="170" viewBox="-6 -6 112 112" preserveAspectRatio="none">
                <rect x="0" y="0" width="100" height="100" fill="none" stroke={R.line} />
                <path d={d} fill="none" stroke={R.orange} strokeWidth="3" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
              </svg>
            </Card>
          </React.Fragment>
        );
      })}
    </RSlide>
  );
};

/* 12 ===== Loop: each round climbs ===== */
export const LoopFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const rot = interpolate(f, [at(0.05), at(0.95)], [0, 1080], clamp);
  const level = f < at(0.3) ? 40 : f < at(0.6) ? 70 : 95;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.3)} name="ding" vol={0.2} dur={30} />
      <Sfx at={at(0.6)} name="ding" vol={0.25} dur={30} />
      <Head label="Rounds">Each round climbs</Head>
      <Abs x={140} y={190} style={{width: 300, height: 300}}>
        <svg width="300" height="300" viewBox="0 0 300 300" style={{transform: `rotate(${rot}deg)`}}>
          <circle cx="150" cy="150" r="110" fill="none" stroke={R.card} strokeWidth="18" />
          <path d="M150 40 A110 110 0 1 1 40 150" fill="none" stroke={R.orange} strokeWidth="18" strokeLinecap="round" />
          <path d="M20 128 L40 160 L68 134Z" fill={R.orange} />
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Bot shape="drop" color={R.white} size={80} bob={4} />
        </div>
      </Abs>
      <Abs x={560} y={210} style={{width: 580}}>
        {[40, 70, 95].map((v, i) => (
          <In key={v} at={at(0.05 + i * 0.3)} style={{marginBottom: 26}}>
            <div style={{fontSize: 20, color: R.mute, marginBottom: 8}}>Round {i + 1}</div>
            <div style={{height: 26, borderRadius: 13, background: R.card}}>
              <div style={{width: `${level >= v ? v : 0}%`, height: '100%', borderRadius: 13, background: i === 2 ? R.green : R.white, transition: 'none'}} />
            </div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 13 ===== Before / after wipe ===== */
export const CompareFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const x = interpolate(f, [at(0.2), at(0.75)], [0, 100], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const t = Math.max(0, f - at(0.3));
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.2)} name="whoosh" vol={0.25} dur={40} />
      <Sfx at={at(0.8)} name="ding" vol={0.28} dur={40} />
      <Head label="Same content">Before and after</Head>
      <Abs x={440} y={150} style={{width: 400, height: 400}}>
        <div style={{position: 'relative', width: 400, height: 400}}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center'}}>
            <MiniAd w={226} h={400} punchy={false} t={f} />
          </div>
          <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', clipPath: `inset(0 ${100 - x}% 0 0)`}}>
            <div style={{width: 226, height: 400, marginLeft: 0}}>
              <MiniAd w={226} h={400} punchy t={t} />
            </div>
          </div>
        </div>
      </Abs>
      <Abs x={110} y={330}><Pill kind="dark" size={22}>First draft</Pill></Abs>
      <Abs x={900} y={330}><Pill kind="white" size={22}>Final</Pill></Abs>
    </RSlide>
  );
};

/* 14 ===== Outro: hands → eyes ===== */
export const OutroFB: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const m = interpolate(f, [at(0.1), at(0.3)], [0, 1], clamp);
  const words = ['Watch', 'Note the moment', 'Say the change'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.3)} name="ding" vol={0.25} dur={40} />
      <Abs x={0} y={50} style={{width: 1280, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, fontSize: 96}}>
        <span style={{opacity: 1 - m, transform: `scale(${1 - m * 0.4})`}}>✋</span>
        <span style={{fontSize: 40, color: R.dim}}>→</span>
        <span style={{opacity: 0.25 + m * 0.75, transform: `scale(${0.7 + m * 0.3})`}}>👁</span>
      </Abs>
      <Abs x={0} y={200} style={{width: 1280, textAlign: 'center', fontSize: 64, fontWeight: 500, letterSpacing: -2}}>
        From your hands to your eyes
      </Abs>
      <Abs x={0} y={330} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 20}}>
        {words.map((w, i) => (
          <In key={w} at={at(0.4) + i * 10}>
            <Pill kind={i === 2 ? 'white' : 'dark'} size={26}>{i + 1} · {w}</Pill>
          </In>
        ))}
      </Abs>
      <Abs x={0} y={440} style={{width: 1280, display: 'flex', justifyContent: 'center'}}>
        <Bot shape="drop" color={R.white} size={90} bob={6} />
      </Abs>
    </RSlide>
  );
};
