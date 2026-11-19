import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import slides from '../../content/bot-guide-full/slides.json';
import {Mascot} from '../lib/Mascot';
import {Pop} from '../lib/Pop';
import {AppWindow, At, Beams, D, Dot, Glow, IconCard, Phone, mono} from '../lib/Art';
import {Arrow, Card, Chip, Em, Label, Sfx, Slide, clamp, useAt} from '../lib/kit';
import type {P} from '../lib/kit';
import {
  After,
  Devices,
  First,
  Handoff,
  Intro,
  Job,
  Launch,
  Manager,
  Outro,
  Pitfalls,
  Roi,
  What,
} from './BotGuide';

export const BOT_GUIDE_FULL_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

const ink = '#1A1B2E';
const mute = '#7A7D96';

/* ---------- 01 · Install ---------- */
export const Install: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const prog = interpolate(frame, [Dn * 0.3, Dn * 0.62], [0, 1], clamp);
  const done = prog >= 1;
  const steps = ['Open the official site', 'Download and install', 'Sign in'];
  return (
    <Slide
      n={n}
      vo={vo}
      bg="night"
      compact
      eyebrow="01 · Install"
      head={
        <>
          Just <Em>download</Em> it
        </>
      }
    >
      <Sfx at={Math.round(Dn * 0.62)} name="ding" vol={0.28} dur={40} />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 72, top: 232}}>
        <AppWindow w={600} h={300}>
          <div style={{padding: '8px 26px'}}>
            <div style={{background: '#F3F4FA', borderRadius: 999, padding: '8px 18px', fontSize: 16, color: mute, fontWeight: 600, width: 240}}>
              Official site
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 10}}>
              <Mascot color={D.orange} size={100} acc="headphones" />
              <div>
                <div style={{fontSize: 34, fontWeight: 800, color: ink, lineHeight: 1.1}}>
                  Your all-day
                  <br />
                  Bot team
                </div>
                <div style={{fontSize: 19, color: mute, marginTop: 8}}>Real work, handed off.</div>
              </div>
            </div>
            <div style={{marginTop: 12, width: 340}}>
              <div style={{background: done ? D.mint : D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 24, padding: '8px 0', borderRadius: 14, textAlign: 'center'}}>
                {done ? '✓ Installed' : 'Download'}
              </div>
              <div style={{height: 8, borderRadius: 4, background: '#E3E4EE', marginTop: 10, overflow: 'hidden'}}>
                <div style={{width: `${prog * 100}%`, height: '100%', background: D.orange}} />
              </div>
            </div>
          </div>
        </AppWindow>
      </Pop>
      <At x={720} y={232} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {steps.map((s, i) => (
          <Card
            key={s}
            at={at(0.18) + i * at(0.14)}
            hl={done && i === 2}
            box={{width: 488, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16}}
          >
            <div style={{width: 40, height: 40, borderRadius: 20, background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {i + 1}
            </div>
            <div style={{fontSize: 28, fontWeight: 800}}>{s}</div>
          </Card>
        ))}
      </At>
      <At x={720} y={482} style={{display: 'flex', gap: 10}}>
        {['macOS', 'Windows', 'iPhone'].map((p, i) => (
          <Chip key={p} at={at(0.55) + i * 8} size={21}>
            {p}
          </Chip>
        ))}
      </At>
    </Slide>
  );
};

/* ---------- 02 · Directory of ready-made Bots + connectors ---------- */
export const Directory: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const cats = ['Marketing', 'Design', 'Hiring', 'Operations'];
  const bots: [string, string][] = [
    ['Ad copy Bot', D.orange],
    ['Brand designer', D.pink],
    ['Recruiter', D.blue],
    ['Ops tracker', D.mint],
    ['SEO helper', D.violet],
    ['Support triage', D.yellow],
  ];
  const tools: [string, string][] = [
    ['doc', 'Notion'],
    ['calendar', 'Calendar'],
    ['mail', 'Mail'],
    ['chart', 'Sheets'],
  ];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="02 · Core features"
      head={
        <>
          A directory of <Em>ready-made Bots</Em>
        </>
      }
    >
      <Pop at={at(0.1)} style={{position: 'absolute', left: 72, top: 232}}>
        <AppWindow w={760} h={300} dark>
          <div style={{padding: '14px 18px'}}>
            <div style={{display: 'flex', gap: 8}}>
              {cats.map((c, i) => (
                <div key={c} style={{background: i === 0 ? D.orange : '#262633', color: i === 0 ? '#1A0E06' : '#C9C9D6', fontWeight: 700, fontSize: 16, padding: '5px 14px', borderRadius: 999}}>
                  {c}
                </div>
              ))}
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 14}}>
              {bots.map(([t, c], i) => (
                <Pop key={t} at={at(0.18) + i * 7} style={{background: '#1E1E28', border: `1.5px solid ${D.line}`, borderRadius: 14, padding: '12px 12px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <Dot c={c} s={34} />
                    <div style={{fontSize: 18, fontWeight: 800, color: D.ink, lineHeight: 1.1}}>{t}</div>
                  </div>
                  <div style={{marginTop: 12, fontSize: 15, fontWeight: 800, color: D.orange, border: `1.5px solid ${D.orange}`, borderRadius: 999, padding: '3px 0', textAlign: 'center'}}>
                    + Add
                  </div>
                </Pop>
              ))}
            </div>
          </div>
        </AppWindow>
      </Pop>
      <Card at={at(0.4)} style={{position: 'absolute', left: 860, top: 232}} box={{width: 348, height: 300, padding: '16px 18px'}}>
        <Label>Connect your tools</Label>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14}}>
          {tools.map(([k, t], i) => {
            const on = frame > at(0.55) + i * 12;
            return (
              <div key={t} style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <IconCard kind={k} size={44} />
                <div style={{flex: 1, fontSize: 22, fontWeight: 800}}>{t}</div>
                <div style={{fontSize: 15, fontWeight: 800, padding: '4px 12px', borderRadius: 999, background: on ? D.mint : 'transparent', color: on ? '#06231A' : D.mute, border: `1.5px solid ${on ? D.mint : D.line}`}}>
                  {on ? '✓ On' : 'Connect'}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </Slide>
  );
};

/* ---------- 05 · A real, scheduled job ---------- */
export const Work: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const tiles = [D.blue, D.pink, D.mint, D.yellow, D.violet];
  const rows = ['Cut the video from my desktop assets', 'Publish it', 'Fill the links back in'];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="05 · Real work"
      head={
        <>
          A real job, <Em>on schedule</Em>
        </>
      }
    >
      <Sfx at={at(0.82)} name="ding" vol={0.28} dur={40} />
      <Card at={at(0.12)} hl style={{position: 'absolute', left: 72, top: 232}} box={{width: 300, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8}}>
        <IconCard kind="clock" size={72} />
        <div style={{fontSize: 84, fontWeight: 800, lineHeight: 1, fontFamily: mono.fontFamily, color: D.orange}}>17:30</div>
        <div style={{fontSize: 24, fontWeight: 700}}>every day</div>
        <div style={{fontSize: 18, color: D.mute}}>Runs by itself</div>
      </Card>
      <At x={410} y={232} style={{display: 'flex', alignItems: 'center', gap: 12}}>
        {tiles.map((c, i) => (
          <Pop key={i} at={at(0.2) + i * 6}>
            <div style={{width: 96, height: 62, borderRadius: 12, background: c, opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{width: 0, height: 0, borderLeft: '16px solid #fff', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', opacity: 0.85}} />
            </div>
          </Pop>
        ))}
        <Arrow at={at(0.38)} />
        <Pop at={at(0.42)}>
          <div style={{width: 120, height: 76, borderRadius: 14, background: D.orange, boxShadow: '0 0 40px rgba(255,122,47,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A0E06', fontWeight: 800, fontSize: 20}}>
            Video
          </div>
        </Pop>
      </At>
      <At x={410} y={340} style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {rows.map((r, i) => (
          <Card key={r} at={at(0.45) + i * at(0.12)} box={{width: 798, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 16}} hl={i === 2}>
            <div style={{width: 36, height: 36, borderRadius: 18, background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              ✓
            </div>
            <div style={{fontSize: 26, fontWeight: 800}}>{r}</div>
          </Card>
        ))}
      </At>
    </Slide>
  );
};

/* ---------- 06 · One-person company ---------- */
export const Solo: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const rows: [string, string, string, boolean][] = [
    ['Chief Bot', 'Sent 1 video', D.violet, true],
    ['Editor Bot', 'Cut finished', D.blue, true],
    ['Copy Bot', '6 scripts ready', D.mint, true],
    ['Publish Bot', 'Waiting for your go', D.yellow, false],
    ['Asset Bot', 'Standing by', D.pink, false],
  ];
  return (
    <Slide
      n={n}
      vo={vo}
      bg="night"
      compact
      eyebrow="06 · One-person company"
      head={
        <>
          A real <Em>one-person company</Em>
        </>
      }
    >
      <Beams lines={rows.map((_, i) => ({x1: 640, y1: 298 + i * 48, x2: 880, y2: 380, c: rows[i][2], d: i * 0.18}))} />
      <Glow x={980} y={390} r={220} c="#FF7A2F" o={0.3} />
      <Card at={at(0.1)} style={{position: 'absolute', left: 72, top: 232}} box={{width: 568, padding: '14px 20px'}}>
        <Label>Comic-drama department</Label>
        <div style={{display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8}}>
          {rows.map(([t, s, c, unread], i) => (
            <Pop key={t} at={at(0.2) + i * 9} style={{display: 'flex', alignItems: 'center', gap: 14, height: 44}}>
              <Dot c={c} s={34} />
              <div style={{width: 160, fontSize: 22, fontWeight: 800}}>{t}</div>
              <div style={{flex: 1, fontSize: 19, color: D.mute}}>{s}</div>
              {unread && <Dot c={D.blue} s={12} />}
            </Pop>
          ))}
        </div>
      </Card>
      <Pop at={at(0.3)} style={{position: 'absolute', left: 880, top: 260}}>
        <Mascot color={D.orange} size={200} acc="crown" satellite />
      </Pop>
      <At x={850} y={480}>
        <Chip at={at(0.7)} hl size={24}>
          Five Bots. One person.
        </Chip>
      </At>
    </Slide>
  );
};

/* ---------- Why it works: personal agent + scheduling ---------- */
const Personal: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const stages: [string, string, string, boolean][] = [
    ['Before', 'Chat box', 'You ask, it answers', false],
    ['Then', 'Coding agent', 'Powerful, high barrier', false],
    ['Now', 'Personal agent', 'Works inside your business', true],
  ];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="Why it works"
      head={
        <>
          The new <Em>way out</Em>
        </>
      }
    >
      {stages.map(([l, t, s, hl], i) => (
        <Card key={t} at={at(0.1) + i * at(0.1)} hl={hl} style={{position: 'absolute', left: 72 + i * 392, top: 232}} box={{width: 330, height: 118, padding: '14px 20px'}}>
          <Label color={hl ? D.orange : D.mute}>{l}</Label>
          <div style={{fontSize: 32, fontWeight: 800, marginTop: 4}}>{t}</div>
          <div style={{fontSize: 19, color: D.mute, marginTop: 2}}>{s}</div>
        </Card>
      ))}
      <At x={404} y={262}>
        <Arrow at={at(0.18)} />
      </At>
      <At x={796} y={262}>
        <Arrow at={at(0.28)} />
      </At>
      <Pop at={at(0.45)} style={{position: 'absolute', left: 72, top: 396}}>
        <Label>The key</Label>
        <div style={{fontSize: 68, fontWeight: 800, lineHeight: 1.05, color: D.ink, letterSpacing: -2}}>Scheduling</div>
      </Pop>
      <Card at={at(0.6)} hl style={{position: 'absolute', left: 500, top: 388}} box={{width: 708, height: 148, padding: '14px 22px'}}>
        <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
          <Label color={D.mute}>People say</Label>
          <div style={{fontSize: 16, color: D.mute, textDecoration: 'line-through'}}>Code isn't top-tier</div>
          <div style={{fontSize: 16, color: D.mute, textDecoration: 'line-through'}}>Images aren't the best</div>
        </div>
        <div style={{marginTop: 10}}>
          <Label>Boss view</Label>
          <div style={{fontSize: 30, fontWeight: 800, lineHeight: 1.15, marginTop: 4}}>
            You don't need the best at everything. You need to orchestrate.
          </div>
        </div>
      </Card>
    </Slide>
  );
};

/* ---------- 06 · Shortcut setup ---------- */
const LaunchSetup: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const tiles = [D.blue, D.mint, D.yellow, D.violet, D.orange, D.pink, '#3B3B48', D.blue];
  const filled = Math.min(3, Math.max(0, Math.floor((frame - at(0.5)) / at(0.1))));
  return (
    <Slide
      n={n}
      vo={vo}
      bg="night"
      compact
      eyebrow="06 · Quick launch"
      head={
        <>
          Set it up <Em>once</Em>
        </>
      }
    >
      <Pop at={at(0.1)} style={{position: 'absolute', left: 72, top: 222}}>
        <Phone w={176} h={322} glow="rgba(91,140,255,0.3)">
          <div style={{padding: '34px 10px 10px'}}>
            <div style={{color: D.mute, fontSize: 11, fontWeight: 800, marginBottom: 8}}>SHORTCUTS</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7}}>
              {tiles.map((c, i) => (
                <div key={i} style={{height: 40, borderRadius: 9, background: c, opacity: i === 5 ? 1 : 0.55, boxShadow: i === 5 ? `0 0 0 2px #fff, 0 0 0 4px ${D.orange}` : 'none'}} />
              ))}
            </div>
            <div style={{marginTop: 10, background: D.pink, borderRadius: 10, padding: '8px 8px', color: '#fff', fontSize: 12, fontWeight: 800, lineHeight: 1.2}}>
              Start Voice Chat with Bot
            </div>
          </div>
        </Phone>
      </Pop>
      <At x={300} y={232} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {[
          ['check', 'Latest app version', false],
          ['check', 'iPhone with an Action button', false],
          ['bolt', 'Shortcut: Start Voice Chat', true],
        ].map(([k, t, hl], i) => (
          <Card key={t as string} at={at(0.2) + i * at(0.1)} hl={hl as boolean} box={{width: 460, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 14}}>
            <IconCard kind={k as string} size={46} />
            <div style={{fontSize: 25, fontWeight: 800, lineHeight: 1.15}}>{t as string}</div>
          </Card>
        ))}
      </At>
      <Card at={at(0.42)} hl style={{position: 'absolute', left: 790, top: 232}} box={{width: 418, height: 256}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <IconCard kind="mic" size={44} />
          <Label>Voice</Label>
        </div>
        <div style={{fontSize: 34, fontWeight: 800, marginTop: 10}}>Say “Hey Bot”</div>
        <div style={{display: 'flex', gap: 12, marginTop: 14}}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{width: 56, height: 56, borderRadius: 28, background: i < filled ? D.orange : '#262633', color: '#1A0E06', fontWeight: 800, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {i < filled ? '✓' : ''}
            </div>
          ))}
          <div style={{alignSelf: 'center', fontSize: 20, color: D.mute, fontWeight: 700}}>× 3</div>
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap'}}>
          {['Calendar', 'Reminders', 'Alarms'].map((c) => (
            <div key={c} style={{fontSize: 17, fontWeight: 700, padding: '4px 14px', borderRadius: 999, border: `1.5px solid ${D.line}`, color: D.ink}}>
              {c}
            </div>
          ))}
        </div>
      </Card>
    </Slide>
  );
};

/* ---------- Habit: shorten the chain ---------- */
export const Water: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const chain = ['Have an idea', 'Call it anywhere', 'Hand it off'];
  return (
    <Slide
      n={n}
      vo={vo}
      bg="dusk"
      compact
      eyebrow="Water theory"
      head={
        <>
          Shorten the <Em>chain</Em>
        </>
      }
    >
      <div style={{position: 'absolute', left: 1020, top: 130, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, #FFE2A8 0%, rgba(255,200,120,0) 70%)', opacity: 0.8}} />
      <At x={72} y={250} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        {chain.map((c, i) => (
          <React.Fragment key={c}>
            <Card at={at(0.15) + i * at(0.14)} hl={i === 2} box={{width: 250, height: 120, padding: '14px 20px'}}>
              <Label>{String(i + 1).padStart(2, '0')}</Label>
              <div style={{fontSize: 30, fontWeight: 800, marginTop: 6, lineHeight: 1.12}}>{c}</div>
            </Card>
            {i < chain.length - 1 && <Arrow at={at(0.2) + i * at(0.14)} />}
          </React.Fragment>
        ))}
      </At>
      <Pop at={at(0.55)} style={{position: 'absolute', left: 72, top: 410}}>
        <div style={{fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1.15, maxWidth: 900, whiteSpace: 'nowrap', textShadow: '0 2px 20px rgba(0,0,0,0.35)'}}>
          The smoother it feels, the more you use it.
        </div>
      </Pop>
      <At x={72} y={492} style={{display: 'flex', gap: 10}}>
        {['At your desk', 'On a business trip', 'On the beach'].map((c, i) => (
          <Chip key={c} at={at(0.7) + i * 8} size={21} hl={i === 2}>
            {c}
          </Chip>
        ))}
      </At>
      <Pop at={at(0.35)} style={{position: 'absolute', left: 1000, top: 225}}>
        <Phone w={178} h={318} glow="rgba(255,122,47,0.4)">
          <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, paddingTop: 20}}>
            <Mascot color={D.orange} size={84} />
            <div style={{background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 15, padding: '6px 14px', borderRadius: 999}}>Done ✓</div>
          </div>
        </Phone>
      </Pop>
    </Slide>
  );
};

const SCENES: Record<string, React.FC<P>> = {
  intro: Intro,
  what: What,
  install: Install,
  first: First,
  directory: Directory,
  devices: Devices,
  job: Job,
  handoff: Handoff,
  manager: Manager,
  work: Work,
  solo: Solo,
  personal: Personal,
  launch: Launch,
  launchsetup: LaunchSetup,
  pitfalls: Pitfalls,
  roi: Roi,
  after: After,
  water: Water,
  outro: Outro,
};

export const BotGuideFull: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: D.bg}}>
      <Audio
        src={staticFile('shared/sfx/bed.wav')}
        loop
        volume={(f) =>
          0.09 *
          interpolate(f, [0, 30, BOT_GUIDE_FULL_FRAMES - 90, BOT_GUIDE_FULL_FRAMES], [0, 1, 1, 0], clamp)
        }
      />
      {slides.map((s, i) => {
        const Comp = SCENES[s.id];
        const start = from;
        from += s.frames;
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`bot-guide-full/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Comp n={i + 1} vo={s.vo} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
