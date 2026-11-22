import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {mono} from '../../lib/Art';
import {Abs, Card, Head, In, Pill, R, RSlide} from './ui';
import {Bot} from './BotMark';
import {RealShot} from './RealShot';

/** New scenes for part 1 (op-1-problem). The rest reuse ScenesOP. */
const expo = Easing.out(Easing.exp);
const CARD = 'var(--op-card, #202020)';
const CARD2 = 'var(--op-card2, #171717)';
const PANEL = 'var(--op-panel, #111111)';
const DIM = 'var(--op-dim, rgba(255,255,255,0.42))';
const BGS = 'var(--op-bg-solid, #0A0A0A)';

/* problem, not idea */
export const IdeaProbOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(f / 8);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.25} dur={40} />
      <Head label="First rule">Start with the *problem*, not the idea</Head>
      <Card at={at(0.08)} style={{position: 'absolute', left: 120, top: 200}} box={{width: 400, height: 290, opacity: 0.6}}>
        <svg width="70" height="90" viewBox="0 0 70 90"><path d="M35 6a26 26 0 0 1 15 47v10H20V53A26 26 0 0 1 35 6Z" fill="#777" /><rect x="24" y="68" width="22" height="6" rx="3" fill="#555" /></svg>
        <div style={{fontSize: 34, fontWeight: 500, marginTop: 12}}>Your idea</div>
        <div style={{fontSize: 21, color: DIM, marginTop: 8}}>“It sounds awesome.”</div>
      </Card>
      <Abs x={560} y={310} style={{fontSize: 60, color: DIM}}>→</Abs>
      <Card at={at(0.35)} style={{position: 'absolute', left: 660, top: 200}} box={{width: 470, height: 290, boxShadow: `0 0 ${30 + pulse * 40}px ${R.red}55`}} hl={R.red}>
        <svg width="90" height="90" viewBox="0 0 90 90"><circle cx="45" cy="45" r="40" fill="none" stroke="#fff" strokeWidth="5" /><circle cx="45" cy="45" r="24" fill="none" stroke="#fff" strokeWidth="5" /><circle cx="45" cy="45" r="8" fill={R.red} /></svg>
        <div style={{fontSize: 34, fontWeight: 500, marginTop: 12}}>The problem it fixes</div>
        <div style={{fontSize: 21, color: R.mute, marginTop: 8}}>What pain? Whose? How big?</div>
      </Card>
    </RSlide>
  );
};

/* pain -> price */
export const MigraineOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const k = interpolate(f, [at(0.15), at(0.7)], [0.08, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const pain = Math.round(1 + k * 9);
  const price = Math.round(5 + k * k * 995);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.7)} name="ding" vol={0.25} dur={40} />
      <Head label="Why pain pays">The bigger the pain, the bigger the *money*</Head>
      <Abs x={110} y={215} style={{width: 460}}>
        <div style={{fontSize: 22, color: R.mute, marginBottom: 12}}>Pain level · {pain}/10</div>
        <div style={{height: 34, borderRadius: 17, background: CARD}}>
          <div style={{width: `${k * 100}%`, height: '100%', borderRadius: 17, background: `linear-gradient(90deg, ${R.orange}, ${R.red})`}} />
        </div>
        <div style={{marginTop: 34, fontSize: 80}}>{k < 0.35 ? '🙂' : k < 0.7 ? '😣' : '🤕'}</div>
      </Abs>
      <Abs x={680} y={215} style={{width: 470}}>
        <div style={{fontSize: 22, color: R.mute, marginBottom: 12}}>What they'd pay to fix it</div>
        <div style={{fontSize: 110, fontWeight: 500, letterSpacing: -4, fontFamily: mono.fontFamily}}>${price}</div>
        <div style={{marginTop: 14}}>
          <Pill kind={k < 0.45 ? 'dark' : 'white'} size={22}>{k < 0.45 ? 'Vitamin: “maybe later”' : 'Painkiller: “right now”'}</Pill>
        </div>
      </Abs>
    </RSlide>
  );
};

/* gym prompt */
export const GymOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const q = 'I have run a gym for 10 years. Find 50 specific, observable problems gym owners face right now.';
  const list = ['Members quit after month two', 'Empty classes at 2 p.m.', 'No-shows on trial sessions', 'Staff turnover every spring', 'Unpaid memberships pile up'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="typing" vol={0.16} dur={90} />
      <Head label="Let the Bot search">Give it your world, ask for *50 problems*</Head>
      <Card at={at(0.05)} style={{position: 'absolute', left: 110, top: 190}} box={{width: 1060}} hl={R.blue}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Bot shape="drop" color={R.white} size={44} />
          <div style={{fontSize: 25, lineHeight: 1.3}}>{typed(q, f, at(0.1), 36)}<span style={{opacity: f % 20 < 10 ? 1 : 0}}>|</span></div>
        </div>
      </Card>
      <Abs x={110} y={310} style={{display: 'flex', flexWrap: 'wrap', gap: 12, width: 1060}}>
        {list.map((t, i) => (
          <In key={t} at={at(0.55) + i * 8}>
            <Pill kind="dark" size={22}><span style={{color: DIM, fontFamily: mono.fontFamily}}>{i + 1}</span> {t}</Pill>
          </In>
        ))}
        <In at={at(0.55) + 45}><Pill kind="ghost" size={22}>+ 45 more…</Pill></In>
      </Abs>
    </RSlide>
  );
};

/* write a message for ten people */
export const MessageOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const body = 'Hi! Do these three problems sound familiar? I would love your advice on a new project.';
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.2)} name="typing" vol={0.15} dur={70} />
      <Sfx at={at(0.85)} name="whoosh" vol={0.22} dur={30} />
      <Head label="Draft the outreach">One short message, *ten people*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 190}} box={{width: 700, height: 310}}>
        <div style={{fontSize: 17, color: DIM, fontFamily: mono.fontFamily}}>TO: 10 gym owners</div>
        <div style={{fontSize: 22, fontWeight: 600, margin: '12px 0', borderBottom: `1px solid ${R.line}`, paddingBottom: 10}}>Quick question about your gym</div>
        <div style={{fontSize: 23, lineHeight: 1.4, color: R.mute}}>{typed(body, f, at(0.2), 34)}</div>
      </Card>
      <Abs x={870} y={200} style={{display: 'grid', gridTemplateColumns: 'repeat(5, 56px)', gap: 12}}>
        {Array.from({length: 10}).map((_, i) => {
          const sent = f > at(0.85) + i * 2;
          return (
            <In key={i} at={at(0.1) + i * 4} tick={false}>
              <div style={{width: 52, height: 52, borderRadius: '50%', background: sent ? R.green : 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#000'}}>{sent ? '✓' : ''}</div>
            </In>
          );
        })}
      </Abs>
      <In at={at(0.7)} style={{position: 'absolute', left: 870, top: 340}}><Pill kind="white" size={22}>Not a pitch. A question.</Pill></In>
    </RSlide>
  );
};

/* call → offer → first customer */
export const CallOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const steps: [string, string, string][] = [['📞', 'Advice call', 'Listen first'], ['❓', '“What are you building?”', 'They ask you'], ['🎁', 'Present your offer', 'Fixes their 3 pains'], ['🏆', 'First customer', 'They say yes']];
  const prog = interpolate(f, [at(0.1), at(0.85)], [0, 3], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.85)} name="ding" vol={0.28} dur={40} />
      <Head label="The turn">Advice turns into a *first customer*</Head>
      <Abs x={70} y={230} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        {steps.map(([ic, t, s], i) => (
          <React.Fragment key={t}>
            <Card at={at(0.08) + i * at(0.15)} box={{width: 255, height: 230, textAlign: 'center', background: prog >= i ? '#fff' : CARD, color: prog >= i ? R.bg : '#fff'}}>
              <div style={{fontSize: 56}}>{ic}</div>
              <div style={{fontSize: 24, fontWeight: 600, marginTop: 10, lineHeight: 1.15}}>{t}</div>
              <div style={{fontSize: 18, marginTop: 8, opacity: 0.65}}>{s}</div>
            </Card>
            {i < 3 && <div style={{fontSize: 30, color: DIM}}>›</div>}
          </React.Fragment>
        ))}
      </Abs>
    </RSlide>
  );
};

/* existing business: sharpen message */
export const ExistingOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const wipe = interpolate(f, [at(0.45), at(0.7)], [0, 100], {...clamp, easing: expo});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.45)} name="whoosh" vol={0.25} dur={30} />
      <Sfx at={at(0.75)} name="ding" vol={0.25} dur={40} />
      <Head label="Already have a business?">Sharpen the *message*</Head>
      <Abs x={110} y={200} style={{width: 520}}>
        <Pill kind="dark" size={18}>Before</Pill>
        <Card at={at(0.08)} box={{marginTop: 14, height: 190, opacity: 0.7}}>
          <div style={{fontSize: 28, lineHeight: 1.3}}>“We offer great fitness services for everyone.”</div>
        </Card>
      </Abs>
      <Abs x={650} y={200} style={{width: 520}}>
        <Pill kind="white" size={18}>After the search</Pill>
        <div style={{marginTop: 14, height: 190, position: 'relative'}}>
          <Card at={at(0.08)} box={{height: 190}} hl={R.green}>
            <div style={{fontSize: 28, lineHeight: 1.3, clipPath: `inset(0 ${100 - wipe}% 0 0)`}}>“Stop losing members in month two.”</div>
          </Card>
        </div>
      </Abs>
      <In at={at(0.75)} style={{position: 'absolute', left: 110, top: 460}}>
        <Pill kind="ghost" size={22}>Same search, sharper pain</Pill>
      </In>
    </RSlide>
  );
};

/* time piles up */
export const PileOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const labels = ['Sales call', 'Onboarding', 'Support', 'Delivery', 'Sales call', 'Proposal', 'Follow-up', 'Admin', 'Delivery', 'Sales call'];
  const cols = [R.blue, R.green, R.violet, R.orange, R.blue, R.pink, R.teal, DIM, R.orange, R.blue];
  const n = Math.floor(interpolate(f, [at(0.08), at(0.65)], [0, 10], clamp));
  const over = n >= 8;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.65)} name="ding" vol={0.25} dur={40} />
      <Head label="Success has a cost">Everything lands on *you*</Head>
      <Abs x={90} y={190} style={{width: 500, height: 320, borderRadius: 18, background: PANEL, border: `2px solid ${over ? R.red : R.line}`, padding: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 6}}>
        {labels.slice(0, n).map((l, i) => (
          <div key={i} style={{height: 26, borderRadius: 8, background: cols[i], color: '#000', fontSize: 16, fontWeight: 600, padding: '2px 12px', flex: '0 0 auto'}}>{l}</div>
        ))}
      </Abs>
      {over && <In at={0} style={{position: 'absolute', left: 110, top: 520}}><Pill kind="dark" size={22} style={{border: `2px solid ${R.red}`}}>Overbooked</Pill></In>}
      <Abs x={630} y={185}>
        <RealShot src="shared/real/marketplace-cats.jpg" w={580} h={294} at={at(0.62)} zoomTo={1.1}
          callout={{n: '1', text: 'Ready-made Bots', x: 30, y: 250, at: at(0.72)}} />
      </Abs>
      <In at={at(0.7)} style={{position: 'absolute', left: 630, top: 500}}>
        <Pill kind="white" size={24}>Time to bring in agents</Pill>
      </In>
    </RSlide>
  );
};
