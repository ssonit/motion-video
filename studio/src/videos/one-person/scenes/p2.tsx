import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {Abs, Card, Head, In, Pill, R, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';
import {RealShot} from '../../real/RealShot';
import {mkPrompt} from '../../shared/mkPrompt';
import {mkChapter} from '../../shared/ChapterCard';

/** Scenes for part 2 (op-2-inbox). Colours come from the series theme (CSS vars). */
const expo = Easing.out(Easing.exp);
const CARD = 'var(--op-card, #202020)';
const DIM = 'var(--op-dim, rgba(255,255,255,0.42))';
const ACC = '#ff7a1a';
const GLASS = 'rgba(255,255,255,0.12)';

/* 1 admin: sources converge on one Bot */
export const AdminOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const src: [string, string][] = [['✉️', 'Inbox'], ['📅', 'Calendar'], ['💬', 'Messages'], ['📎', 'Information']];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.25} dur={40} />
      <Head label="Rung 1 · Admin">Your *inbox* and calendar, one place</Head>
      <Abs x={110} y={195} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {src.map(([ic, t], i) => (
          <Card key={t} at={at(0.08) + i * at(0.08)} box={{width: 270, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px'}}>
            <span style={{fontSize: 30}}>{ic}</span><span style={{fontSize: 24}}>{t}</span>
          </Card>
        ))}
      </Abs>
      <Abs x={420} y={330} style={{fontSize: 56, color: DIM}}>→</Abs>
      <In at={at(0.45)} style={{position: 'absolute', left: 520, top: 250}}>
        <div style={{width: 240, height: 240, borderRadius: '50%', background: GLASS, border: `3px solid ${ACC}`, boxShadow: `0 0 60px ${ACC}55`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Bot shape="drop" color={R.white} size={130} bob={6} />
        </div>
      </In>
      <In at={at(0.62)} style={{position: 'absolute', left: 840, top: 235}}>
        <Card at={0} box={{width: 330}}>
          <div style={{fontSize: 17, color: DIM, fontFamily: mono.fontFamily}}>BEFORE</div>
          <div style={{fontSize: 26, marginBottom: 14}}>You hired a person</div>
          <div style={{fontSize: 17, color: ACC, fontFamily: mono.fontFamily}}>NOW</div>
          <div style={{fontSize: 26}}>You configure a Bot</div>
        </Card>
      </In>
    </RSlide>
  );
};

/* 2 room: most people still do it by hand */
export const RoomOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const n = 60;
  const green = new Set([7, 19, 33, 41, 52, 58]);
  return (
    <RSlide vo={vo}>
      <Head label="A room of 1,000 people">Most still do it *by hand*</Head>
      <Abs x={110} y={195} style={{display: 'grid', gridTemplateColumns: 'repeat(15, 48px)', gap: 12}}>
        {Array.from({length: n}).map((_, i) => {
          const on = interpolate(f, [at(0.05) + i, at(0.05) + i + 10], [0, 1], clamp);
          const g = green.has(i) && f > at(0.5);
          return <div key={i} style={{width: 48, height: 48, borderRadius: 14, background: g ? R.green : 'rgba(255,255,255,0.16)', opacity: on, transform: `scale(${g ? 1.1 : 1})`}} />;
        })}
      </Abs>
      <Sfx at={at(0.5)} name="ding" vol={0.22} dur={30} />
      <Abs x={110} y={455} style={{display: 'flex', gap: 14}}>
        <In at={at(0.3)}><Pill kind="dark" size={21}>Sort every email by hand</Pill></In>
        <In at={at(0.38)}><Pill kind="dark" size={21}>Manage every meeting by hand</Pill></In>
        <In at={at(0.55)}><Pill kind="white" size={21}>Connected to a Bot</Pill></In>
      </Abs>
    </RSlide>
  );
};

/* 3 story: unread counter to zero */
export const StoryOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const left = Math.round(interpolate(f, [at(0.4), at(0.85)], [148, 0], {...clamp, easing: Easing.out(Easing.cubic)}));
  const h = interpolate(f, [at(0.4), at(0.85)], [9, 10], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.85)} name="ding" vol={0.28} dur={40} />
      <Head label="A real result">Inbox zero by *ten a.m.*</Head>
      <Card at={at(0.08)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 480, height: 300}}>
        <div style={{fontSize: 18, color: DIM, fontFamily: mono.fontFamily}}>SUPPORT INBOX</div>
        <div style={{fontSize: 130, fontWeight: 700, letterSpacing: -5, color: left === 0 ? R.green : '#fff', marginTop: 10}}>{left}</div>
        <div style={{fontSize: 24, color: 'rgba(255,255,255,0.7)'}}>{left === 0 ? 'all answered' : 'customer emails waiting'}</div>
      </Card>
      <Abs x={640} y={195} style={{width: 530}}>
        <In at={at(0.14)}><Pill kind="dark" size={22}>1 · Past replies given to the Bot</Pill></In>
        <In at={at(0.24)} style={{marginTop: 14}}><Pill kind="dark" size={22}>2 · Her steps written as rules</Pill></In>
        <In at={at(0.34)} style={{marginTop: 14}}><Pill kind="dark" size={22}>3 · Replies drafted from her answers</Pill></In>
        <In at={at(0.5)} style={{marginTop: 34}}>
          <div style={{fontFamily: mono.fontFamily, fontSize: 64, fontWeight: 600}}>{Math.floor(h)}:{String(Math.round((h % 1) * 59)).padStart(2, '0')} <span style={{fontSize: 28, color: DIM}}>a.m.</span></div>
        </In>
        <In at={at(0.85)} style={{marginTop: 16}}><Pill kind="white" size={22}>First time she felt caught up</Pill></In>
      </Abs>
    </RSlide>
  );
};

/* 4 review mode: approve, then let go */
export const ReviewOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const k = interpolate(f, [at(0.5), at(0.9)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.3)} name="tick1" vol={0.2} />
      <Head label="Rung 1 · Trust">Start in *review mode*</Head>
      <Card at={at(0.08)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 560}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Bot shape="drop" color={R.white} size={40} />
          <div style={{fontSize: 20, fontWeight: 600}}>Draft reply · ready</div>
        </div>
        {[100, 92, 70].map((w, i) => <div key={i} style={{height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.18)', width: `${w}%`, marginTop: 14}} />)}
        <div style={{display: 'flex', gap: 12, marginTop: 24}}>
          <Pill kind="white" size={21}>Approve & send</Pill>
          <Pill kind="dark" size={21}>Edit first</Pill>
        </div>
      </Card>
      <Abs x={730} y={215} style={{width: 440}}>
        <div style={{fontSize: 22, color: 'rgba(255,255,255,0.7)', marginBottom: 14}}>How much you let it run</div>
        <div style={{position: 'relative', height: 22, borderRadius: 11, background: 'rgba(255,255,255,0.15)'}}>
          <div style={{width: `${8 + k * 84}%`, height: '100%', borderRadius: 11, background: ACC}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 20, marginTop: 10}}>
          <span style={{color: k < 0.5 ? '#fff' : DIM}}>You check all</span>
          <span style={{color: k >= 0.5 ? '#fff' : DIM}}>It runs on its own</span>
        </div>
        <In at={at(0.9)} style={{marginTop: 34}}><Pill kind="ghost" size={22}>Over time, you let it go</Pill></In>
      </Abs>
    </RSlide>
  );
};

/* 5 recipe + real Connect Apps screenshot */
export const ConnectOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const items: [string, string, string][] = [['Data', 'What only you have', R.blue], ['Playbook', 'The steps to follow', R.green], ['Schedule', 'How often it runs', R.orange], ['Signal', 'Proof it works', R.pink]];
  return (
    <RSlide vo={vo}>
      <Head label="Any AI tool works">Connect it, then give it *four things*</Head>
      <Abs x={90} y={170}>
        <RealShot src="shared/real/connect-apps.png" w={500} h={385} at={at(0.06)} zoomTo={1.08} pos="center top"
          callout={{n: '1', text: 'Connect mail + calendar', x: 30, y: 300, at: at(0.2)}} />
      </Abs>
      <Abs x={650} y={175} style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {items.map(([t, s, c], i) => (
          <Card key={t} at={at(0.35) + i * at(0.1)} box={{width: 520, display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderLeft: `6px solid ${c}`}}>
            <span style={{fontSize: 30, fontWeight: 600, width: 170}}>{t}</span>
            <span style={{fontSize: 21, color: 'rgba(255,255,255,0.7)'}}>{s}</span>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* 6 your data is the edge */
export const EdgeOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const mine = ['Your sent mail', 'Your templates', 'Your customer history', 'Your scripts'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.5)} name="ding" vol={0.25} dur={40} />
      <Head label="The real edge">AI is common. Your *data* is not.</Head>
      <Abs x={110} y={200} style={{width: 460}}>
        <div style={{fontSize: 22, color: DIM, marginBottom: 14}}>Everyone has this</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 90px)', gap: 14}}>
          {Array.from({length: 8}).map((_, i) => (
            <In key={i} at={at(0.06) + i * 3} tick={false}>
              <div style={{width: 90, height: 90, borderRadius: 22, background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,0.5)'}}>AI</div>
            </In>
          ))}
        </div>
      </Abs>
      <Abs x={680} y={200} style={{width: 490}}>
        <div style={{fontSize: 22, color: ACC, marginBottom: 14}}>Only you have this</div>
        {mine.map((m, i) => (
          <Card key={m} at={at(0.4) + i * at(0.1)} box={{marginBottom: 12, fontSize: 25, border: `2px solid ${ACC}`, padding: '14px 20px'}}>{m}</Card>
        ))}
      </Abs>
    </RSlide>
  );
};

export const Prompt1OP = mkPrompt(
  'Rung 1 · First prompt',
  'Let it *learn your rules*',
  'Scan my inbox and look at every reply I have sent. Work out the rules I follow, then set up a filtered inbox using those rules.',
  ['Reads your sent replies', 'Finds your rules', 'Sorts new mail the same way'],
);
export const FullPromptOP = mkPrompt(
  'Rung 1 · The full prompt',
  'One prompt, *with the loop*',
  'Process my inbox. Draft replies as me, in my voice, using emails I have already written. Do not send anything. Leave placeholders for details you do not have.',
  ['Your voice', 'Nothing sent without you', 'Placeholders for gaps'],
);

/* 11 replies + labels */
export const LabelsOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const labels: [string, number, string][] = [['Needs action', 6, R.red], ['Waiting on others', 3, R.orange], ['Finance', 4, R.green], ['Later', 12, R.blue]];
  return (
    <RSlide vo={vo}>
      <Head label="Rung 1 · Playbook">Clear replies, *labeled* mail</Head>
      <Card at={at(0.08)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 600}}>
        <div style={{fontSize: 17, color: DIM, fontFamily: mono.fontFamily}}>A GOOD REPLY HAS</div>
        {[['1', 'The answer first'], ['2', 'Every detail they need'], ['3', 'One clear next step']].map(([n, t], i) => (
          <In key={n} at={at(0.2) + i * at(0.1)} style={{marginTop: 14}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 26}}>
              <span style={{width: 38, height: 38, borderRadius: '50%', background: ACC, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700}}>{n}</span>{t}
            </div>
          </In>
        ))}
        <div style={{fontSize: 20, color: 'rgba(255,255,255,0.65)', marginTop: 22}}>So nobody writes back asking for more.</div>
      </Card>
      <Abs x={780} y={195} style={{width: 390}}>
        {labels.map(([l, n, c], i) => (
          <Card key={l} at={at(0.4) + i * at(0.09)} box={{marginBottom: 12, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px'}}>
            <div style={{width: 16, height: 16, borderRadius: '50%', background: c}} />
            <span style={{fontSize: 24, flex: 1}}>{l}</span>
            <span style={{fontFamily: mono.fontFamily, fontSize: 20, color: DIM}}>{n}</span>
          </Card>
        ))}
        <In at={at(0.82)}><Pill kind="ghost" size={20}>Don't know a system? Ask the Bot</Pill></In>
      </Abs>
    </RSlide>
  );
};

/* 12 schedule: real time vs twice a day */
export const ScheduleOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const sweep = interpolate(f, [at(0.1), at(0.8)], [0, 1], clamp);
  const W = 1000;
  const mark = (h: number) => (h / 24) * W;
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.55)} name="ding" vol={0.22} dur={30} />
      <Head label="Rung 1 · Schedule">When it *runs*</Head>
      {[['Real time · every 30 min', 0], ['Twice a day · 11:00 and 16:00', 1]].map(([t, row]) => (
        <Abs key={String(t)} x={140} y={200 + Number(row) * 150} style={{width: W}}>
          <div style={{fontSize: 24, marginBottom: 12, color: Number(row) === 1 ? '#fff' : 'rgba(255,255,255,0.7)'}}>{t as string}</div>
          <div style={{position: 'relative', height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.1)'}}>
            {Number(row) === 0
              ? Array.from({length: 48}).map((_, i) => <div key={i} style={{position: 'absolute', left: (i / 48) * W, top: 10, width: 6, height: 24, borderRadius: 3, background: R.blue, opacity: sweep * 48 > i ? 1 : 0.2}} />)
              : [11, 16].map((h) => <div key={h} style={{position: 'absolute', left: mark(h) - 10, top: 4, width: 20, height: 36, borderRadius: 8, background: ACC, opacity: sweep * 24 > h ? 1 : 0.2}} />)}
          </div>
        </Abs>
      ))}
      <In at={at(0.55)} style={{position: 'absolute', left: 140, top: 500}}>
        <Pill kind="dark" size={21} style={{border: `2px solid ${R.red}`}}>3:00 a.m. reply · looks like a bot, or no sleep</Pill>
      </In>
    </RSlide>
  );
};

/* 13 signal: DM + nudge */
export const SignalOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="ding" vol={0.25} dur={40} />
      <Head label="Rung 1 · Signal">A short message, every run</Head>
      <Card at={at(0.1)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 520}} hl={R.green}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Bot shape="drop" color={R.white} size={52} />
          <div style={{fontSize: 22, fontWeight: 600}}>Inbox Bot · just now</div>
        </div>
        <div style={{fontSize: 23, lineHeight: 1.55, marginTop: 14, color: 'rgba(255,255,255,0.8)'}}>
          12 drafts ready for review<br />27 new mails processed<br />3 people have not replied
          <div style={{color: ACC, textDecoration: 'underline', marginTop: 8}}>Open drafts folder →</div>
        </div>
      </Card>
      <Abs x={650} y={320} style={{fontSize: 52, color: DIM}}>→</Abs>
      <Card at={at(0.55)} style={{position: 'absolute', left: 740, top: 215}} box={{width: 430}}>
        <div style={{fontSize: 16, color: DIM, fontFamily: mono.fontFamily}}>NUDGE DRAFT · 3 PEOPLE</div>
        <div style={{fontSize: 22, lineHeight: 1.45, marginTop: 10}}>“Hi Jon, just checking in on my last message. Happy to adjust anything.”</div>
        <div style={{marginTop: 14}}><Pill kind="white" size={19}>Ready to send</Pill></div>
      </Card>
    </RSlide>
  );
};

/* 14 a day with no effort */
export const DayOP: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const steps: [string, string, string][] = [['9:12', 'New client emails', '✉️'], ['9:13', 'Bot drafts a reply', '✍️'], ['11:00', 'You review and send', '✅'], ['16:30', 'Discovery call booked', '📅']];
  const prog = interpolate(f, [at(0.1), at(0.8)], [0, 3], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.8)} name="ding" vol={0.28} dur={40} />
      <Head label="One ordinary day">A client books *without you*</Head>
      <Abs x={90} y={215} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        {steps.map(([t, s, ic], i) => (
          <React.Fragment key={t}>
            <Card at={at(0.08) + i * at(0.14)} box={{width: 255, height: 220, textAlign: 'center', background: prog >= i ? '#fff' : CARD, color: prog >= i ? '#111' : '#fff'}}>
              <div style={{fontFamily: mono.fontFamily, fontSize: 22, opacity: 0.7}}>{t}</div>
              <div style={{fontSize: 54, margin: '8px 0'}}>{ic}</div>
              <div style={{fontSize: 23, fontWeight: 600, lineHeight: 1.15}}>{s}</div>
            </Card>
            {i < 3 && <div style={{fontSize: 30, color: DIM}}>›</div>}
          </React.Fragment>
        ))}
      </Abs>
      <In at={at(0.82)} style={{position: 'absolute', left: 90, top: 480}}><Pill kind="ghost" size={23}>You weren't involved</Pill></In>
    </RSlide>
  );
};

/* 16 chapter card: next part */
export const NextOP = mkChapter({kicker: 'RUNG 2', num: '02', title: 'Next: Delivery', bgWord: 'DELIVERY', t: {sfx: 0.2, num: 0.12, title: 0.3}});
