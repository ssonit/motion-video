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
import slides from '../../../content/grok-bot/guide/slides.json';
import {Arrow, Card, Chip, Em, Label, Slide, Sfx, clamp, typed, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {Mascot} from '../../lib/Mascot';
import {Pop} from '../../lib/Pop';
import {
  At,
  AppWindow,
  Bar,
  Beams,
  D,
  Dot,
  Float,
  Glow,
  IconCard,
  Laptop,
  Phone,
  inter,
  mono,
} from '../../lib/Art';

export const BOT_GUIDE_FRAMES = slides.reduce((a, s) => a + s.frames, 0);


/* ---------- 01 · Hero: bot at the desk ---------- */
export const Intro: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const chips = ['Install', 'Core idea', 'First Bot', 'Devices', 'Real work', 'Solo company'];
  const msg = typed('Set up my first Bot, step by step.', frame, 40, 22);
  return (
    <Slide
      n={n}
      vo={vo}
      bg="night"
      eyebrow="Beginner's guide"
      head={
        <>
          Your first AI
          <br />
          <Em>Bot employee</Em>
        </>
      }
    >
      <Glow x={900} y={290} r={380} c="#FF7A2F" o={0.22} />
      <Sfx at={40} name="typing" vol={0.3} dur={55} />
      <Pop at={10} style={{position: 'absolute', left: 690, top: 80}}>
        <Float amp={5} speed={22}>
          <AppWindow w={540} h={340} dark>
            <div style={{display: 'flex', height: '100%'}}>
              <div style={{width: 74, background: '#101016', padding: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
                <Dot c={D.orange} />
                <Dot c={D.blue} />
                <Dot c={D.mint} />
                <Dot c={D.pink} />
              </div>
              <div style={{flex: 1, padding: 18, display: 'flex', flexDirection: 'column', gap: 12}}>
                <div style={{alignSelf: 'flex-end', background: D.orange, color: '#1A0E06', fontSize: 17, fontWeight: 700, padding: '10px 16px', borderRadius: '16px 16px 4px 16px', minHeight: 20, opacity: msg ? 1 : 0}}>
                  {msg || '.'}
                </div>
                <Pop at={at(0.45)} style={{display: 'flex', gap: 10, alignItems: 'flex-start'}}>
                  <Dot c={D.orange} s={30} />
                  <div style={{display: 'flex', flexDirection: 'column', gap: 8, background: '#22222C', padding: 14, borderRadius: '4px 16px 16px 16px', width: 300}}>
                    <Bar w="90%" color="#4A4A58" />
                    <Bar w="70%" color="#4A4A58" />
                    <Bar w="40%" color={D.orange} />
                  </div>
                </Pop>
                <Pop at={at(0.6)} style={{display: 'flex', gap: 10}}>
                  <div style={{background: '#22222C', borderRadius: 12, padding: '8px 14px', color: D.mute, fontSize: 15}}>3 steps ready</div>
                  <div style={{background: D.soft, border: `1.5px solid ${D.orange}`, borderRadius: 12, padding: '8px 14px', color: D.orange, fontSize: 15, fontWeight: 700}}>Start</div>
                </Pop>
              </div>
            </div>
          </AppWindow>
        </Float>
      </Pop>
      <Pop at={at(0.2)} style={{position: 'absolute', left: 575, top: 318}}>
        <Mascot color={D.orange} size={165} satellite acc="headphones" />
      </Pop>
      <Pop at={at(0.3)} style={{position: 'absolute', left: 1130, top: 60}}>
        <Float phase={5}>
          <IconCard kind="calendar" size={74} />
        </Float>
      </Pop>
      <Pop at={at(0.36)} style={{position: 'absolute', left: 1160, top: 250}}>
        <Float phase={15}>
          <IconCard kind="chart" size={68} color={D.mint} />
        </Float>
      </Pop>
      <Pop at={at(0.42)} style={{position: 'absolute', left: 1120, top: 410}}>
        <Float phase={25}>
          <IconCard kind="doc" size={64} color={D.blue} />
        </Float>
      </Pop>
      <At x={72} y={482} style={{display: 'flex', gap: 10}}>
        {chips.map((c, i) => (
          <Card key={c} at={at(0.18) + i * 9} box={{padding: '10px 16px'}}>
            <div style={{fontFamily: mono.fontFamily, color: D.orange, fontSize: 14}}>{String(i + 1).padStart(2, '0')}</div>
            <div style={{fontSize: 20, fontWeight: 700}}>{c}</div>
          </Card>
        ))}
      </At>
    </Slide>
  );
};

/* ---------- 02 · Old tools vs smart assistant ---------- */
export const What: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const NoMark: React.FC = () => (
    <div style={{position: 'absolute', right: 12, top: 40, width: 40, height: 40, borderRadius: 20, background: '#E5484D', color: '#fff', fontWeight: 800, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2}}>✕</div>
  );
  return (
    <Slide
      n={n}
      vo={vo}
      eyebrow="What it is"
      head={
        <>
          Not a chat. Not a coder.
          <br />
          <Em>A smart assistant.</Em>
        </>
      }
    >
      <Pop at={at(0.18)} style={{position: 'absolute', left: 72, top: 300}}>
        <div style={{position: 'relative', opacity: 0.8}}>
          <NoMark />
          <AppWindow w={270} h={210} dark>
            <div style={{padding: 14, display: 'flex', flexDirection: 'column', gap: 10}}>
              <Bar w="70%" h={26} color="#2B2B35" />
              <Bar w="55%" h={26} color="#2B2B35" style={{alignSelf: 'flex-end'}} />
              <Bar w="80%" h={26} color="#2B2B35" />
              <Bar w="45%" h={26} color="#2B2B35" style={{alignSelf: 'flex-end'}} />
            </div>
          </AppWindow>
          <div style={{textAlign: 'center', color: D.mute, fontWeight: 700, fontSize: 22, marginTop: 8}}>Old chat box</div>
        </div>
      </Pop>
      <Pop at={at(0.3)} style={{position: 'absolute', left: 372, top: 300}}>
        <div style={{position: 'relative', opacity: 0.8}}>
          <NoMark />
          <AppWindow w={270} h={210} dark>
            <div style={{padding: 14, fontFamily: mono.fontFamily, fontSize: 14, display: 'flex', flexDirection: 'column', gap: 8}}>
              <div style={{color: D.blue}}>{'function run() {'}</div>
              <div style={{color: D.mint, paddingLeft: 14}}>{'const x = build();'}</div>
              <div style={{color: D.pink, paddingLeft: 14}}>{'deploy(x);'}</div>
              <div style={{color: D.blue}}>{'}'}</div>
              <div style={{color: '#5B5B68'}}>{'// terminal only'}</div>
            </div>
          </AppWindow>
          <div style={{textAlign: 'center', color: D.mute, fontWeight: 700, fontSize: 22, marginTop: 8}}>Coding agent</div>
        </div>
      </Pop>
      <Glow x={940} y={410} r={300} c="#FF7A2F" o={0.28} />
      <Sfx at={at(0.45)} name="ding" vol={0.28} dur={40} />
      <Card at={at(0.45)} hl style={{position: 'absolute', left: 676, top: 290}} box={{width: 500, height: 232, padding: 0, position: 'relative'}}>
        <div style={{position: 'absolute', left: 24, top: 20, width: 44, height: 44, borderRadius: 22, background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div>
        <div style={{position: 'absolute', left: 24, top: 150, fontSize: 34, fontWeight: 800, lineHeight: 1.1}}>
          A truly smart
          <br />
          assistant
        </div>
        <div style={{position: 'absolute', left: 250, top: 8}}>
          <Mascot color={D.orange} size={170} satellite acc="glasses" />
        </div>
        <Float amp={5} phase={4} style={{position: 'absolute', left: 190, top: 30}}>
          <IconCard kind="calendar" size={48} />
        </Float>
        <Float amp={5} phase={14} style={{position: 'absolute', left: 430, top: 24}}>
          <IconCard kind="doc" size={48} color={D.blue} />
        </Float>
        <Float amp={5} phase={24} style={{position: 'absolute', left: 420, top: 150}}>
          <IconCard kind="chart" size={48} color={D.mint} />
        </Float>
      </Card>
    </Slide>
  );
};

/* ---------- 03 · App screen: create the first Bot ---------- */
export const First: React.FC<P> = ({n, vo}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const f = frame / Dn;
  const step = f < 0.26 ? 0 : f < 0.5 ? 1 : f < 0.7 ? 2 : 3;
  const ink = '#1A1B2E';
  const mute = '#7A7D96';
  const pills = ['New', 'Avatar', 'Name', 'Rules'];
  const avatars = [D.orange, D.blue, D.mint, D.pink, D.violet, D.yellow, '#3B3B48', '#35C6F4'];
  const name = typed('Translator', frame, Math.round(Dn * 0.5), 9);
  const rule = typed('Translate everything I send into clear, natural English.', frame, Math.round(Dn * 0.72), 24);
  const bots = ['Writer', 'Designer', 'Planner'];
  const pulse = 1 + Math.sin(frame / 5) * 0.03;
  return (
    <Slide n={n} vo={vo} bg="screen" eyebrow="Step 03 · First Bot">
      <Sfx at={Math.round(Dn * 0.5)} name="typing" vol={0.3} dur={36} />
      <Sfx at={Math.round(Dn * 0.72)} name="typing" vol={0.3} dur={60} />
      <Sfx at={Math.round(Dn * 0.7)} name="ding" vol={0.28} dur={40} />
      <Pop at={4} style={{position: 'absolute', left: 170, top: 64}}>
        <AppWindow w={940} h={410}>
          <div style={{display: 'flex', height: '100%'}}>
            <div style={{width: 230, background: '#F6F7FC', borderRight: '1.5px solid #E3E4EE', padding: 18, display: 'flex', flexDirection: 'column', gap: 12}}>
              <div style={{fontSize: 14, fontWeight: 800, color: mute, letterSpacing: 2}}>MY BOTS</div>
              {bots.map((b, i) => (
                <div key={b} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 700, color: ink}}>
                  <Dot c={[D.blue, D.mint, D.pink][i]} s={30} />
                  {b}
                </div>
              ))}
              {step >= 3 && (
                <Pop at={Math.round(Dn * 0.7)} style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 20, fontWeight: 800, color: ink, background: '#FFE9DC', padding: '6px 8px', borderRadius: 12, marginLeft: -8}}>
                  <Dot c={D.pink} s={30} />
                  Translator
                </Pop>
              )}
            </div>
            <div style={{flex: 1, padding: '24px 34px', color: ink}}>
              <div style={{fontSize: 30, fontWeight: 800}}>Create a Bot</div>
              <div style={{fontSize: 18, color: mute, marginTop: 4}}>Step {step + 1} of 4 · {['Start', 'Pick an avatar', 'Name it', 'Set the rules'][step]}</div>
              <div style={{marginTop: 28}}>
                {step === 0 && (
                  <div style={{width: 260, height: 90, border: `3px dashed ${D.orange}`, borderRadius: 20, background: '#FFF3EB', color: D.orange, fontSize: 30, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pulse})`}}>
                    + New Bot
                  </div>
                )}
                {step === 1 && (
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 84px)', gap: 18}}>
                    {avatars.map((c, i) => (
                      <div key={i} style={{width: 84, height: 84, borderRadius: 42, background: c, boxShadow: i === 3 && f > 0.38 ? `0 0 0 6px #fff, 0 0 0 10px ${D.orange}` : 'none'}} />
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                      <Dot c={D.pink} s={64} />
                      <div style={{width: 400, border: `2.5px solid ${D.orange}`, borderRadius: 14, padding: '14px 18px', fontSize: 30, fontWeight: 700}}>
                        {name}
                        <span style={{opacity: Math.floor(frame / 8) % 2 ? 0 : 1}}>|</span>
                      </div>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div style={{width: 560, border: `2.5px solid ${D.orange}`, borderRadius: 14, padding: '16px 18px', fontSize: 24, fontWeight: 600, lineHeight: 1.4, minHeight: 110}}>
                    {rule}
                    <span style={{opacity: Math.floor(frame / 8) % 2 ? 0 : 1}}>|</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AppWindow>
      </Pop>
      <At x={0} y={490} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 14}}>
        {pills.map((p, i) => (
          <div
            key={p}
            style={{
              background: i === step ? D.orange : 'rgba(20,20,29,0.82)',
              color: i === step ? '#1A0E06' : '#fff',
              fontSize: 26,
              fontWeight: 800,
              padding: '8px 24px',
              borderRadius: 999,
              transform: `scale(${i === step ? 1.06 : 1})`,
            }}
          >
            {i + 1} · {p}
          </div>
        ))}
      </At>
    </Slide>
  );
};

/* ---------- 04 · One Bot, one job ---------- */
export const Job: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const feed = [
    ['news', 'Fresh news'],
    ['bolt', 'Trending topics'],
    ['doc', 'New posts'],
  ];
  const ideas = ['How AI builds videos', 'Bot teams, explained', 'One-person studio'];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="One Bot, one job"
      head={
        <>
          Every Bot has <Em>one job</Em>
        </>
      }
    >
      <Beams
        lines={[
          {x1: 340, y1: 302, x2: 500, y2: 385},
          {x1: 340, y1: 380, x2: 500, y2: 395},
          {x1: 340, y1: 458, x2: 500, y2: 405},
          {x1: 690, y1: 395, x2: 860, y2: 395, c: D.mint},
        ]}
      />
      {feed.map(([k, t], i) => (
        <Pop key={t} at={at(0.12) + i * 8} style={{position: 'absolute', left: 72, top: 268 + i * 78}}>
          <div style={{width: 268, height: 64, background: D.card, border: `2px solid ${D.line}`, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', color: D.ink, fontSize: 22, fontWeight: 700}}>
            <IconCard kind={k} size={40} />
            {t}
          </div>
        </Pop>
      ))}
      <Glow x={590} y={395} r={170} c="#FF7A2F" o={0.3} />
      <Pop at={at(0.25)} style={{position: 'absolute', left: 480, top: 285}}>
        <Mascot color={D.orange} size={220} acc="glasses" />
      </Pop>
      <At x={0} y={258} style={{width: 1280}}>
        <Pop at={at(0.3)} style={{marginLeft: 478}}>
          <Label>Topic picker</Label>
        </Pop>
      </At>
      <At x={528} y={500}>
        <Chip at={at(0.38)} hl size={22}>
          Job = Skill
        </Chip>
      </At>
      <Pop at={at(0.42)} style={{position: 'absolute', left: 860, top: 250}}>
        <Phone w={190} h={290} glow="rgba(255,122,47,0.25)">
          <div style={{padding: '30px 12px 10px', display: 'flex', flexDirection: 'column', gap: 9}}>
            <div style={{color: D.orange, fontSize: 13, fontWeight: 800, fontFamily: mono.fontFamily}}>TODAY'S BEST IDEAS</div>
            {ideas.map((t, i) => (
              <Pop key={t} at={at(0.55) + i * 14} style={{background: '#262633', borderRadius: 12, padding: '10px 10px', color: '#fff', fontSize: 14.5, fontWeight: 700, lineHeight: 1.2}}>
                <span style={{color: D.orange}}>{i + 1}. </span>
                {t}
              </Pop>
            ))}
          </div>
        </Phone>
      </Pop>
    </Slide>
  );
};

/* ---------- 05 · Hand-off line ---------- */
export const Handoff: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const st = [
    {t: 'Pick a topic', c: D.orange, acc: 'glasses' as const, g: 'bolt'},
    {t: 'Write', c: D.blue, acc: 'headphones' as const, g: 'doc'},
    {t: 'Design', c: D.mint, acc: 'cap' as const, g: 'image'},
    {t: 'Edit', c: D.pink, acc: 'tie' as const, g: 'play'},
  ];
  const xs = [200, 490, 780, 1070];
  const p = interpolate(frame, [Dn * 0.22, Dn * 0.78], [0, 3], clamp);
  const idx = Math.min(3, Math.round(p));
  const px = xs[0] + (xs[3] - xs[0]) * (p / 3);
  const rules = ['Use it first', 'Add rules', 'Add limits', 'Sharper every time'];
  return (
    <Slide
      n={n}
      vo={vo}
      bg="night"
      compact
      eyebrow="Teamwork"
      head={
        <>
          Jobs <Em>hand off</Em> to each other
        </>
      }
    >
      <Glow x={640} y={400} r={420} c="#5B8CFF" o={0.12} />
      {[1, 2, 3].map((i) => (
        <Sfx key={i} at={Dn * (0.22 + (0.56 * i) / 3)} name="pop1" vol={0.35} dur={20} />
      ))}
      {st.map((s, i) => (
        <React.Fragment key={s.t}>
          <At x={xs[i] - 110} y={236}>
            <Card at={at(0.08) + i * 8} box={{width: 220, padding: '8px 14px', textAlign: 'center'}}>
              <Label color={s.c}>{String(i + 1).padStart(2, '0')}</Label>
              <div style={{fontSize: 24, fontWeight: 800}}>{s.t}</div>
            </Card>
          </At>
          <Pop at={at(0.1) + i * 8} style={{position: 'absolute', left: xs[i] - 75, top: 296}}>
            <Mascot color={s.c} size={150} phase={i * 17} acc={s.acc} />
          </Pop>
          <At x={xs[i] - 100} y={444}>
            <div style={{width: 200, height: 12, borderRadius: 6, background: '#2B2B35'}} />
          </At>
        </React.Fragment>
      ))}
      <Beams
        lines={[
          {x1: 290, y1: 372, x2: 400, y2: 372, c: D.blue},
          {x1: 580, y1: 372, x2: 690, y2: 372, c: D.mint},
          {x1: 870, y1: 372, x2: 980, y2: 372, c: D.pink},
        ]}
      />
      <div style={{position: 'absolute', left: px - 26, top: 346, opacity: interpolate(frame, [Dn * 0.2, Dn * 0.25], [0, 1], clamp)}}>
        <IconCard kind={st[idx].g} size={54} color={st[idx].c} style={{background: 'rgba(14,14,20,0.9)'}} />
      </div>
      <At x={72} y={464}>
        <Pop at={at(0.45)}>
          <div style={{fontSize: 28, fontWeight: 800, color: D.ink}}>
            Each role = a mature <Em>Skill</Em> <span style={{color: D.mute, fontWeight: 500}}>· an employee handbook</span>
          </div>
        </Pop>
      </At>
      <At x={72} y={504} style={{display: 'flex', gap: 12}}>
        {rules.map((r, i) => (
          <Chip key={r} at={at(0.62) + i * at(0.07)} hl={i === 3} size={21}>
            {r}
          </Chip>
        ))}
      </At>
    </Slide>
  );
};

/* ---------- 06 · Manager and schedule ---------- */
export const Manager: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const w = [
    {t: 'Topic Bot', c: D.blue, x: 300, acc: 'glasses' as const},
    {t: 'Writer Bot', c: D.mint, x: 540, acc: 'headphones' as const},
    {t: 'Design Bot', c: D.pink, x: 780, acc: 'cap' as const},
    {t: 'Editor Bot', c: D.violet, x: 1020, acc: 'tie' as const},
  ];
  const sched = [
    ['09:00', 'Topic'],
    ['11:00', 'Write'],
    ['14:00', 'Design'],
    ['16:00', 'Edit'],
  ];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="Manager"
      head={
        <>
          Big departments get a <Em>manager</Em>
        </>
      }
    >
      <Beams lines={w.map((k, i) => ({x1: 640, y1: 356, x2: k.x, y2: 418, c: k.c, d: i * 0.2}))} />
      <Glow x={640} y={290} r={190} c="#FFD34D" o={0.2} />
      <Pop at={at(0.2)} style={{position: 'absolute', left: 572, top: 222}}>
        <Mascot color={D.orange} size={136} acc="crown" satellite />
      </Pop>
      <At x={560} y={358} style={{width: 160, textAlign: 'center'}}>
        <Pop at={at(0.28)}>
          <Label>Manager Bot</Label>
        </Pop>
      </At>
      <Card at={at(0.25)} style={{position: 'absolute', left: 72, top: 232}} box={{width: 330, padding: '14px 18px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8}}>
          <IconCard kind="calendar" size={38} />
          <Label>Schedule</Label>
        </div>
        {sched.map(([tm, t], i) => (
          <Pop key={tm} at={at(0.35) + i * 10} style={{display: 'flex', gap: 14, fontSize: 19, padding: '3px 0'}}>
            <span style={{fontFamily: mono.fontFamily, color: D.orange}}>{tm}</span>
            <span style={{fontWeight: 700}}>{t}</span>
          </Pop>
        ))}
      </Card>
      <Pop at={at(0.55)} style={{position: 'absolute', left: 880, top: 262}}>
        <div style={{width: 328, fontSize: 30, fontWeight: 800, color: D.ink, lineHeight: 1.2}}>
          You can't direct everyone yourself. <Em>Scheduling</Em> is the key.
        </div>
      </Pop>
      {w.map((k, i) => (
        <React.Fragment key={k.t}>
          <Pop at={at(0.4) + i * 8} style={{position: 'absolute', left: k.x - 48, top: 418}}>
            <Mascot color={k.c} size={96} phase={i * 13} acc={k.acc} />
          </Pop>
          <At x={k.x - 80} y={512} style={{width: 160, display: 'flex', justifyContent: 'center'}}>
            <Chip at={at(0.45) + i * 8} size={18}>
              {k.t}
            </Chip>
          </At>
        </React.Fragment>
      ))}
    </Slide>
  );
};

/* ---------- 07 · Every device ---------- */
export const Devices: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const msg = typed("Edit today's video draft", frame, at(0.5), 16);
  const apps = [D.blue, D.mint, D.pink, D.yellow];
  return (
    <Slide
      n={n}
      vo={vo}
      bg="night"
      compact
      eyebrow="Devices"
      head={
        <>
          One Bot, <Em>every device</Em>
        </>
      }
    >
      <Beams
        lines={[
          {x1: 400, y1: 400, x2: 580, y2: 410, c: D.blue},
          {x1: 520, y1: 318, x2: 610, y2: 372, c: D.mint},
          {x1: 880, y1: 390, x2: 702, y2: 410, c: D.orange},
          {x1: 1030, y1: 410, x2: 706, y2: 428, c: D.pink},
        ]}
      />
      <Glow x={640} y={410} r={190} c="#FF7A2F" o={0.35} />
      <Sfx at={at(0.5)} name="typing" vol={0.3} dur={50} />
      <Sfx at={at(0.75)} name="ding" vol={0.25} dur={40} />
      <Pop at={at(0.1)} style={{position: 'absolute', left: 72, top: 296}}>
        <Float amp={4} speed={20}>
          <Laptop w={320} h={200}>
            <div style={{padding: 14, display: 'flex', flexDirection: 'column', gap: 10}}>
              <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                <Dot c={D.orange} s={24} />
                <Bar w="60%" color="#3A3A47" />
              </div>
              <Bar w="90%" color="#2B2B35" h={14} />
              <Bar w="75%" color="#2B2B35" h={14} />
              <Bar w="50%" color={D.orange} h={14} />
            </div>
          </Laptop>
        </Float>
      </Pop>
      <At x={436} y={236} style={{display: 'grid', gridTemplateColumns: '58px 58px', gap: 10}}>
        {apps.map((c, i) => (
          <Pop key={i} at={at(0.2) + i * 6}>
            <div style={{width: 58, height: 58, borderRadius: 16, background: c, opacity: 0.95}} />
          </Pop>
        ))}
      </At>
      <Pop at={at(0.3)} style={{position: 'absolute', left: 575, top: 345}}>
        <Mascot color={D.orange} size={130} satellite acc="headphones" />
      </Pop>
      <Pop at={at(0.25)} style={{position: 'absolute', left: 880, top: 262}}>
        <Float amp={6} phase={10}>
          <Phone w={140} h={250} glow="rgba(255,122,47,0.3)">
            <div style={{padding: '30px 10px 10px', display: 'flex', flexDirection: 'column', gap: 8}}>
              <div style={{alignSelf: 'flex-end', background: D.orange, color: '#1A0E06', fontSize: 13, fontWeight: 700, padding: '8px 10px', borderRadius: '12px 12px 3px 12px', minHeight: 18, opacity: msg ? 1 : 0}}>
                {msg || '.'}
              </div>
              <Pop at={at(0.75)} style={{background: '#262633', borderRadius: '3px 12px 12px 12px', padding: 9, display: 'flex', flexDirection: 'column', gap: 6}}>
                <Bar w="90%" color="#4A4A58" h={8} />
                <Bar w="60%" color={D.orange} h={8} />
              </Pop>
            </div>
          </Phone>
        </Float>
      </Pop>
      <Pop at={at(0.35)} style={{position: 'absolute', left: 1040, top: 350}}>
        <Float amp={5} phase={20}>
          <div style={{width: 180, height: 130, borderRadius: 16, background: '#07070B', border: '3px solid #3A3A47', padding: 6, boxShadow: '0 20px 50px rgba(0,0,0,0.45)'}}>
            <div style={{width: '100%', height: '100%', borderRadius: 9, background: 'linear-gradient(180deg,#1B1B26,#101018)', padding: 10, display: 'flex', flexDirection: 'column', gap: 8}}>
              <Dot c={D.pink} s={22} />
              <Bar w="85%" color="#3A3A47" />
              <Bar w="55%" color="#3A3A47" />
            </div>
          </div>
        </Float>
      </Pop>
    </Slide>
  );
};

/* ---------- 08 · Quick launch ---------- */
export const Launch: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const pulse = 0.55 + 0.45 * Math.sin(frame / 6);
  return (
    <Slide
      n={n}
      vo={vo}
      bg="night"
      compact
      eyebrow="Quick launch"
      head={
        <>
          Two ways to <Em>call it</Em>
        </>
      }
    >
      <Beams
        lines={[
          {x1: 440, y1: 300, x2: 548, y2: 300, c: D.blue},
          {x1: 742, y1: 285, x2: 850, y2: 285, c: D.orange},
        ]}
      />
      <Glow x={640} y={340} r={260} c="#5B8CFF" o={0.2} />
      <Sfx at={at(0.3)} name="pop2" vol={0.35} dur={20} />
      <Sfx at={at(0.5)} name="ding" vol={0.25} dur={40} />
      <Pop at={at(0.15)} style={{position: 'absolute', left: 545, top: 150}}>
        <Float amp={4} speed={24}>
          <Phone w={190} h={380} glow="rgba(91,140,255,0.4)">
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
              {[0, 1, 2].map((i) => {
                const t = ((frame / 40 + i / 3) % 1);
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 60 + t * 130,
                      height: 60 + t * 130,
                      borderRadius: '50%',
                      border: `2px solid ${D.orange}`,
                      opacity: (1 - t) * 0.7,
                    }}
                  />
                );
              })}
              <Mascot color={D.orange} size={78} />
            </div>
          </Phone>
        </Float>
      </Pop>
      <div style={{position: 'absolute', left: 735 + 2, top: 250, width: 7, height: 64, borderRadius: 4, background: D.orange, opacity: pulse, boxShadow: `0 0 24px ${D.orange}`}} />
      <Card at={at(0.3)} style={{position: 'absolute', left: 90, top: 230}} box={{width: 350, height: 150}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <IconCard kind="mic" size={44} color={D.blue} />
          <Label color={D.blue}>Voice</Label>
        </div>
        <div style={{fontSize: 34, fontWeight: 800, marginTop: 10}}>Say “Hey Bot”</div>
        <div style={{display: 'flex', gap: 5, marginTop: 10, alignItems: 'center', height: 30}}>
          {Array.from({length: 18}).map((_, i) => (
            <div key={i} style={{width: 7, borderRadius: 4, background: D.blue, height: 6 + Math.abs(Math.sin(frame / 5 + i * 0.7)) * 24}} />
          ))}
        </div>
      </Card>
      <Card at={at(0.5)} hl style={{position: 'absolute', left: 850, top: 230}} box={{width: 350, height: 150}}>
        <Label>Side button</Label>
        <div style={{fontSize: 34, fontWeight: 800, marginTop: 10}}>Bind a shortcut</div>
        <div style={{fontSize: 21, color: D.mute, marginTop: 8}}>Press once to start.</div>
      </Card>
    </Slide>
  );
};

/* ---------- 09 · Pitfalls ---------- */
export const Pitfalls: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const nodes: [number, number][] = [
    [40, 20],
    [120, 14],
    [200, 24],
    [70, 62],
    [160, 66],
    [240, 60],
    [130, 100],
  ];
  const links = [[0, 2], [0, 4], [1, 3], [1, 5], [2, 6], [3, 5], [4, 6], [0, 6], [1, 4], [3, 2], [5, 0]];
  const swap = interpolate(frame, [at(0.32), at(0.4)], [0, 1], clamp);
  const cards = [
    {l: 'Issue 01', t: 'It over-corrects', s: 'A small fix becomes a rewrite.', f: 0.2, hl: false},
    {l: 'Issue 02', t: 'No window per Bot', s: 'Every Bot shares one chat.', f: 0.34, hl: false},
    {l: 'Issue 03', t: 'Over-designing roles', s: 'The biggest trap of all.', f: 0.6, hl: true},
  ];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="Pitfalls"
      head={
        <>
          Watch out for <Em>these</Em>
        </>
      }
    >
      {cards.map((c, i) => (
        <Card key={c.l} at={at(c.f)} hl={c.hl} style={{position: 'absolute', left: 72 + i * 384, top: 232}} box={{width: 360, height: 300, padding: 0, position: 'relative'}}>
          {c.hl && (
            <div style={{position: 'absolute', right: 14, top: 14, background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 14, fontFamily: mono.fontFamily, letterSpacing: 1.5, padding: '4px 10px', borderRadius: 999}}>
              BIGGEST TRAP
            </div>
          )}
          <div style={{height: 128, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1.5px solid ${D.line}`}}>
            {i === 0 && (
              <div style={{display: 'flex', flexDirection: 'column', gap: 10, width: 200}}>
                <Bar w="100%" color="#3A3A47" />
                <div style={{position: 'relative'}}>
                  <Bar w="85%" color={swap < 1 ? '#3A3A47' : '#E5484D'} style={{opacity: 1 - swap * 0.55}} />
                  <div style={{position: 'absolute', left: -6, right: 20, top: 3, height: 3, background: '#E5484D', opacity: swap, transform: `scaleX(${swap})`, transformOrigin: 'left'}} />
                </div>
                <Bar w="100%" color={D.orange} style={{opacity: swap}} />
                <Bar w="60%" color="#3A3A47" />
              </div>
            )}
            {i === 1 && (
              <div style={{position: 'relative', width: 230, height: 100}}>
                {[D.blue, D.mint, D.pink, D.violet, D.yellow].map((col, k) => (
                  <div key={k} style={{position: 'absolute', left: k * 34, top: (k % 2) * 34, display: 'flex', alignItems: 'center', gap: 6, background: '#262633', borderRadius: 14, padding: '6px 10px 6px 6px'}}>
                    <Dot c={col} s={24} />
                    <Bar w={34 + (k % 3) * 8} h={8} color="#4A4A58" />
                  </div>
                ))}
              </div>
            )}
            {i === 2 && (
              <svg width="280" height="120" viewBox="0 0 280 120">
                {links.map(([a, b], k) => (
                  <line key={k} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={D.orange} strokeOpacity={0.6} strokeWidth={2} />
                ))}
                {nodes.map(([x, y], k) => (
                  <circle key={k} cx={x} cy={y} r={9} fill={k === 6 ? D.orange : '#3A3A47'} stroke={D.orange} strokeWidth={2} />
                ))}
              </svg>
            )}
          </div>
          <div style={{padding: '14px 22px'}}>
            <Label>{c.l}</Label>
            <div style={{fontSize: 30, fontWeight: 800, marginTop: 6, lineHeight: 1.12}}>{c.t}</div>
            <div style={{fontSize: 20, color: D.mute, marginTop: 6}}>{c.s}</div>
          </div>
        </Card>
      ))}
    </Slide>
  );
};

/* ---------- 10 · ROI ---------- */
export const Roi: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const vals = [30, 55, 80, 105, 135];
  const hrs = interpolate(frame, [at(0.55), at(0.85)], [0, 6], clamp);
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="ROI"
      head={
        <>
          Do the <Em>math</Em> first
        </>
      }
    >
      <Sfx at={at(0.85)} name="ding" vol={0.3} dur={40} />
      <Card at={at(0.2)} style={{position: 'absolute', left: 72, top: 232}} box={{width: 340, height: 300}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <IconCard kind="clock" size={50} color={D.mute} />
          <Label color={D.mute}>Invest</Label>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24}}>
          {['Setup time', 'Subscription'].map((t) => (
            <div key={t} style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 800}}>
              <Dot c="#3A3A47" s={14} />
              {t}
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', left: 22, bottom: 20}}>
          <Chip at={at(0.78)} hl size={21}>
            No return, no role.
          </Chip>
        </div>
      </Card>
      <At x={420} y={350}>
        <Arrow at={at(0.4)} />
      </At>
      <Card at={at(0.45)} hl style={{position: 'absolute', left: 490, top: 232}} box={{width: 718, height: 300, padding: 0, position: 'relative'}}>
        <div style={{position: 'absolute', left: 24, top: 18}}>
          <Label>Return · illustrative example</Label>
        </div>
        <div style={{position: 'absolute', left: 28, top: 80, display: 'flex', alignItems: 'flex-end', gap: 18, height: 150}}>
          {days.map((d, i) => {
            const h = interpolate(frame, [at(0.5) + i * 8, at(0.5) + i * 8 + 24], [0, vals[i]], clamp);
            return (
              <div key={d} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
                <div style={{width: 50, height: h, borderRadius: '10px 10px 4px 4px', background: i === 4 ? D.orange : 'rgba(255,122,47,0.45)'}} />
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', left: 28, top: 242, display: 'flex', gap: 18}}>
          {days.map((d) => (
            <div key={d} style={{width: 50, textAlign: 'center', fontFamily: mono.fontFamily, fontSize: 15, color: D.mute}}>
              {d}
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', right: 34, top: 78, textAlign: 'right'}}>
          <div style={{fontSize: 110, fontWeight: 800, color: D.orange, lineHeight: 1}}>+{Math.round(hrs)}h</div>
          <div style={{fontSize: 26, color: D.ink, fontWeight: 700}}>time saved per week</div>
          <div style={{fontSize: 20, color: D.mute, marginTop: 4}}>+ real results</div>
        </div>
      </Card>
    </Slide>
  );
};

/* ---------- 11 · Before / After ---------- */
export const After: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const clutter = [
    {x: 10, y: 10, r: -6, c: D.blue},
    {x: 150, y: 40, r: 5, c: D.pink},
    {x: 300, y: 8, r: -3, c: D.mint},
    {x: 60, y: 110, r: 4, c: D.yellow},
    {x: 230, y: 120, r: -7, c: D.violet},
    {x: 360, y: 90, r: 6, c: D.orange},
  ];
  const steps = ['Simple interaction', 'Digital company structure', 'Driven by real business'];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="Before → After"
      head={
        <>
          From bloated to <Em>minimal</Em>
        </>
      }
    >
      <At x={72} y={226} style={{width: 540, height: 250}}>
        <Pop at={at(0.1)}>
          <Label color={D.mute}>Before · powerful but bloated</Label>
        </Pop>
        <div style={{position: 'relative', marginTop: 14, filter: 'saturate(0.35)'}}>
          {clutter.map((w, i) => (
            <Pop key={i} at={at(0.14) + i * 5} style={{position: 'absolute', left: w.x, top: w.y}}>
              <div style={{transform: `rotate(${w.r + Math.sin((frame + i * 9) / 14) * 1.5}deg)`}}>
                <AppWindow w={170} h={96} dark>
                  <div style={{padding: 10, display: 'flex', flexDirection: 'column', gap: 6}}>
                    <Bar w="80%" h={8} color={w.c} />
                    <Bar w="60%" h={8} color="#3A3A47" />
                    <Bar w="70%" h={8} color="#3A3A47" />
                  </div>
                </AppWindow>
              </div>
            </Pop>
          ))}
        </div>
      </At>
      <At x={668} y={226} style={{width: 540}}>
        <Pop at={at(0.36)}>
          <Label>After · minimal</Label>
        </Pop>
        <Glow x={270} y={150} r={200} c="#FF7A2F" o={0.2} />
        <Pop at={at(0.4)} style={{marginTop: 14}}>
          <AppWindow w={420} h={200} dark style={{marginLeft: 60}}>
            <div style={{display: 'flex', gap: 14, padding: 18, alignItems: 'center'}}>
              <Mascot color={D.orange} size={90} acc="headphones" />
              <div style={{display: 'flex', flexDirection: 'column', gap: 10, flex: 1}}>
                <div style={{background: D.orange, color: '#1A0E06', fontWeight: 700, fontSize: 17, padding: '10px 14px', borderRadius: 14}}>One chat. One Bot.</div>
                <Bar w="70%" color="#3A3A47" />
              </div>
            </div>
          </AppWindow>
        </Pop>
      </At>
      <At x={72} y={496} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <Chip at={at(0.5) + i * at(0.1)} hl={i === 2} size={21}>
              {String(i + 1).padStart(2, '0')} · {s}
            </Chip>
            {i < steps.length - 1 && <Arrow at={at(0.53) + i * at(0.1)} />}
          </React.Fragment>
        ))}
      </At>
    </Slide>
  );
};

/* ---------- 12 · Sunrise outro ---------- */
export const Outro: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frameNow = useCurrentFrame();
  const crew = [
    {c: D.blue, acc: 'glasses' as const, x: 160, s: 96},
    {c: D.mint, acc: 'headphones' as const, x: 330, s: 100},
    {c: D.orange, acc: 'crown' as const, x: 560, s: 150},
    {c: D.pink, acc: 'cap' as const, x: 800, s: 100},
    {c: D.violet, acc: 'tie' as const, x: 970, s: 96},
  ];
  return (
    <Slide
      n={n}
      vo={vo}
      bg="dusk"
      eyebrow="Takeaway"
      head={
        <>
          Build around your
          <br />
          <Em>real business</Em>
        </>
      }
    >
      <svg width="1280" height="720" viewBox="0 0 1280 720" style={{position: 'absolute', left: 0, top: 0}}>
        <circle cx="1040" cy="330" r="120" fill="#FFD9A0" opacity="0.55" />
        <path
          d="M0 560 L0 470 L70 470 L70 420 L130 420 L130 480 L200 480 L200 400 L250 400 L250 450 L330 450 L330 380 L380 380 L380 470 L470 470 L470 430 L540 430 L540 490 L1280 490 L1280 440 L1180 440 L1180 390 L1130 390 L1130 450 L1060 450 L1060 410 L1000 410 L1000 490 L900 490 L900 450 L840 450 L840 500 L700 500 L700 470 L1280 470 L1280 720 L0 720 Z"
          fill="#1A0F33"
          opacity="0.92"
        />
        <rect x="0" y="560" width="1280" height="160" fill="#120A26" />
      </svg>
      <Sfx at={at(0.5)} name="ding" vol={0.3} dur={40} />
      <At x={72} y={286}>
        <Chip at={at(0.5)} hl size={26}>
          Start with one Bot, one real task.
        </Chip>
      </At>
      {crew.map((k, i) => (
        <Pop key={i} at={at(0.15) + i * 9} style={{position: 'absolute', left: k.x, top: 520 - k.s}}>
          <Mascot color={k.c} size={k.s} phase={i * 19} acc={k.acc} />
        </Pop>
      ))}
      <At x={1090} y={300}>
        <Pop at={at(0.3)}>
          <div style={{position: 'relative', width: 120, height: 220}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 5, height: 220, background: '#2A1A4A'}} />
            <div style={{position: 'absolute', left: 5, top: 8, width: 104, height: 64, background: D.orange, borderRadius: '2px 10px 10px 2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A0E06', fontWeight: 800, fontSize: 24, transform: `skewY(${Math.sin(frameNow / 10) * 4}deg)`}}>
              BOT
            </div>
          </div>
        </Pop>
      </At>
    </Slide>
  );
};

const SLIDE_COMPONENTS: Record<string, React.FC<P>> = {
  intro: Intro,
  what: What,
  first: First,
  job: Job,
  handoff: Handoff,
  manager: Manager,
  devices: Devices,
  launch: Launch,
  pitfalls: Pitfalls,
  roi: Roi,
  after: After,
  outro: Outro,
};

export const BotGuide: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: D.bg}}>
      <Audio
        src={staticFile('shared/sfx/bed.wav')}
        loop
        volume={(f) =>
          0.09 *
          interpolate(f, [0, 30, BOT_GUIDE_FRAMES - 90, BOT_GUIDE_FRAMES], [0, 1, 1, 0], clamp)
        }
      />
      {slides.map((s, i) => {
        const Comp = SLIDE_COMPONENTS[s.id];
        const start = from;
        from += s.frames;
        return (
          <Sequence key={s.id} from={start} durationInFrames={s.frames}>
            <Audio src={staticFile(`grok-bot/guide/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Comp n={i + 1} vo={s.vo} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
