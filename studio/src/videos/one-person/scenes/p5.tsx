import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Abs, Card, Head, In, Pill, R, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';
import {mkPrompt} from '../../shared/mkPrompt';
import {mkChapter} from '../../shared/ChapterCard';

/** Scenes for part 5 (op-5-sales). */
const DIM = 'var(--op-dim, rgba(255,255,255,0.42))';
const ACC = '#ff7a1a';
const GLASS = 'rgba(255,255,255,0.12)';

/* 1 chapter card */
export const Intro5OP = mkChapter({kicker: 'RUNG 4', num: '05', title: 'Sales', bgWord: 'SALES'});

/* 3 story: packed calendar, few customers */
export const Story5OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const hrs = Math.round(interpolate(f, [at(0.1), at(0.45)], [0, 50], {...clamp, easing: Easing.out(Easing.cubic)}));
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const win = new Set([3, 17]);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.75)} name="ding" vol={0.22} dur={40} />
      <Head label="A true pattern">Fifty hours of *calls*</Head>
      <Card at={at(0.05)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 300, textAlign: 'center'}}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily}}>CEO, SALES PER WEEK</div>
        <div style={{fontSize: 96, fontWeight: 700, letterSpacing: -3}}>{hrs}h</div>
      </Card>
      <Abs x={450} y={195} style={{display: 'grid', gridTemplateColumns: 'repeat(5, 130px)', gap: 12}}>
        {days.map((d) => <div key={d} style={{fontSize: 18, color: DIM, textAlign: 'center'}}>{d}</div>)}
        {Array.from({length: 20}).map((_, i) => {
          const done = win.has(i) && f > at(0.6);
          return <In key={i} at={at(0.15) + i * 2} tick={false}><div style={{height: 44, borderRadius: 10, background: done ? R.green : 'rgba(255,255,255,0.18)'}} /></In>;
        })}
      </Abs>
      <In at={at(0.8)} style={{position: 'absolute', left: 110, top: 430}}><Pill kind="ghost" size={22}>Most calls never became customers</Pill></In>
    </RSlide>
  );
};

/* 4 voice bot phones every lead */
export const Voice5OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const qs = ['Do you have the problem now?', 'How big is it today?', 'What have you tried?'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="ding" vol={0.22} dur={30} />
      <Head label="Rung 4 · A voice Bot">It phones every *new lead* first</Head>
      <Card at={at(0.05)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 420, height: 300}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Bot shape="drop" color={R.white} size={48} />
          <div><div style={{fontSize: 21, fontWeight: 600}}>AI assistant</div><div style={{fontSize: 15, color: R.green}}>● calling on his behalf</div></div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 4, height: 90, marginTop: 26}}>
          {Array.from({length: 26}).map((_, i) => <div key={i} style={{width: 8, borderRadius: 4, background: ACC, height: 12 + Math.abs(Math.sin((f + i * 3) / 4)) * 60}} />)}
        </div>
      </Card>
      <Abs x={570} y={195} style={{width: 600}}>
        {qs.map((q, i) => (
          <Card key={q} at={at(0.25) + i * at(0.12)} box={{marginBottom: 12, padding: '14px 20px', fontSize: 23}}><span style={{color: ACC, fontFamily: mono.fontFamily}}>Q{i + 1} </span>{q}</Card>
        ))}
        <div style={{display: 'flex', gap: 12, marginTop: 8}}>
          <In at={at(0.65)}><Pill kind="white" size={21}>Fit → keep the invite</Pill></In>
          <In at={at(0.78)}><Pill kind="dark" size={21}>Not a fit → cancel it</Pill></In>
        </div>
      </Abs>
    </RSlide>
  );
};

/* 5 result: hours back */
export const Result5OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const back = Math.round(interpolate(f, [at(0.15), at(0.6)], [0, 20], {...clamp, easing: Easing.out(Easing.cubic)}));
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.6)} name="ding" vol={0.3} dur={40} />
      <Head label="The result">About *twenty hours* back</Head>
      <Card at={at(0.05)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 400, height: 260, textAlign: 'center'}} hl={R.green}>
        <div style={{fontSize: 17, color: DIM, fontFamily: mono.fontFamily}}>HOURS GIVEN BACK</div>
        <div style={{fontSize: 150, fontWeight: 700, color: R.green, letterSpacing: -5, lineHeight: 1.1}}>{back}</div>
        <div style={{fontSize: 22, color: 'rgba(255,255,255,0.7)'}}>every week</div>
      </Card>
      <Abs x={570} y={205} style={{width: 600}}>
        {['People still answered', 'People still talked to it', 'Kept calls came ready to buy'].map((t, i) => (
          <Card key={t} at={at(0.3) + i * at(0.14)} box={{marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px'}}>
            <span style={{color: R.green, fontSize: 28}}>✓</span><span style={{fontSize: 25}}>{t}</span>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 7 past calls → objections and talk tracks */
export const Past5OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.22} dur={40} />
      <Head label="Rung 4 · Learn">Study *past calls*</Head>
      <Abs x={110} y={200} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {['Call 12 · won', 'Call 18 · lost', 'Call 21 · won', 'Call 27 · lost'].map((c, i) => (
          <Card key={c} at={at(0.06) + i * at(0.07)} box={{width: 270, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 20}}>
            <span style={{width: 12, height: 12, borderRadius: '50%', background: c.includes('won') ? R.green : R.red}} />{c}
          </Card>
        ))}
      </Abs>
      <Abs x={420} y={320} style={{fontSize: 44, color: DIM}}>→</Abs>
      <Abs x={490} y={200} style={{width: 330}}>
        <div style={{fontSize: 17, color: DIM, fontFamily: mono.fontFamily, marginBottom: 10}}>THEIR OBJECTIONS</div>
        {['“Too expensive”', '“Need to think”', '“Is it proven?”'].map((o, i) => (
          <In key={o} at={at(0.35) + i * at(0.09)} style={{marginBottom: 10}}><Pill kind="dark" size={21}>{o}</Pill></In>
        ))}
      </Abs>
      <Abs x={840} y={320} style={{fontSize: 44, color: DIM}}>→</Abs>
      <Card at={at(0.65)} style={{position: 'absolute', left: 910, top: 215}} box={{width: 260, height: 190}} hl={ACC}>
        <div style={{fontSize: 15, color: ACC, fontFamily: mono.fontFamily}}>TALK TRACKS</div>
        <div style={{fontSize: 21, marginTop: 10, lineHeight: 1.4}}>One tested answer per objection</div>
        <div style={{height: 10, borderRadius: 5, background: GLASS, marginTop: 18}}><div style={{width: `${interpolate(f, [at(0.7), at(0.95)], [0, 100], clamp)}%`, height: '100%', borderRadius: 5, background: ACC}} /></div>
      </Card>
    </RSlide>
  );
};

/* 8 data: record calls */
export const Data5OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Head label="Rung 4 · Data">Your data is your *sales calls*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 480, height: 270}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, color: R.red, fontSize: 20, fontWeight: 700}}>
          <span style={{width: 14, height: 14, borderRadius: '50%', background: R.red, opacity: f % 30 < 18 ? 1 : 0.3}} /> RECORDING CALL
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 5, height: 100, marginTop: 18}}>
          {Array.from({length: 28}).map((_, i) => <div key={i} style={{width: 9, borderRadius: 5, background: ACC, height: 14 + Math.abs(Math.sin(f / 5 + i * 0.6)) * 76}} />)}
        </div>
        <In at={at(0.4)} style={{marginTop: 18}}><Pill kind="white" size={20}>⭐ Best calls: bought quickly</Pill></In>
      </Card>
      <Abs x={650} y={200} style={{width: 520}}>
        <In at={at(0.5)}><div style={{fontSize: 22, color: ACC, marginBottom: 12}}>No calls yet?</div></In>
        {['Public videos and materials', 'From someone you trust'].map((t, i) => (
          <Card key={t} at={at(0.58) + i * at(0.12)} box={{marginBottom: 12, padding: '16px 22px', fontSize: 24}}>{t}</Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 9 jobs: two jobs in order */
export const Jobs5OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const second = ['Qualify before anyone books', 'Same-day follow-ups', 'Rebook no-shows', 'Update your records'];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 4 · Playbook">Two jobs, *in this order*</Head>
      <Card at={at(0.06)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 400, height: 250}} hl={ACC}>
        <div style={{width: 44, height: 44, borderRadius: '50%', background: ACC, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24}}>1</div>
        <div style={{fontSize: 32, fontWeight: 700, marginTop: 14}}>Coach you</div>
        <div style={{fontSize: 22, color: 'rgba(255,255,255,0.7)', marginTop: 8}}>Mock calls, scores, tips</div>
      </Card>
      <Card at={at(0.35)} style={{position: 'absolute', left: 560, top: 195}} box={{width: 610, height: 250}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div style={{width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24}}>2</div>
          <div style={{fontSize: 32, fontWeight: 700}}>Everything except the close</div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20}}>
          {second.map((s, i) => <In key={s} at={at(0.5) + i * at(0.08)}><Pill kind="dark" size={19}>{s}</Pill></In>)}
        </div>
      </Card>
    </RSlide>
  );
};

/* 10 prompt */
export const Prompt5OP = mkPrompt(
  'Rung 4 · The prompt',
  'Role-play, then *review*',
  'Call me and run a sales call as my ideal client. Then review the transcript: how much did I talk versus listen, which steps did I skip, and which objections did I fumble?',
  ['Plays the buyer', 'Talk vs listen', 'Skipped steps', 'Fumbled objections'],
);

/* 11 schedule: after every call */
export const After5OP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const k = interpolate(f, [at(0.1), at(0.7)], [0, 1], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.22} dur={30} />
      <Head label="Rung 4 · Schedule">Review after *every call*</Head>
      <Abs x={110} y={240} style={{width: 1060, display: 'flex', alignItems: 'center', gap: 14}}>
        {[['📞', 'Call ends'], ['📝', 'Report in minutes'], ['🔧', 'One tweak'], ['🔁', 'Try it right away']].map(([ic, t], i) => (
          <React.Fragment key={t}>
            <Card at={at(0.08) + i * at(0.15)} box={{width: 230, height: 150, textAlign: 'center', background: k * 4 > i ? '#fff' : undefined, color: k * 4 > i ? '#111' : '#fff'}}>
              <div style={{fontSize: 44}}>{ic}</div><div style={{fontSize: 22, fontWeight: 600, marginTop: 8}}>{t}</div>
            </Card>
            {i < 3 && <div style={{fontSize: 30, color: DIM}}>›</div>}
          </React.Fragment>
        ))}
      </Abs>
      <In at={at(0.78)} style={{position: 'absolute', left: 110, top: 440}}><Pill kind="ghost" size={22}>Fast enough to fix it before the next call</Pill></In>
    </RSlide>
  );
};

/* 13 objections prompt */
export const Objections5OP = mkPrompt(
  'One more prompt',
  'Turn *objections* into answers',
  'Analyze these call transcripts, pull out every objection, group the common ones, and propose the best way to handle each. I am giving you both won and lost calls.',
  ['Won and lost calls', 'Grouped objections', 'Best answer for each'],
);
