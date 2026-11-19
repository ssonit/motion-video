import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Mascot} from './BotMark';
import {Pop} from '../../lib/Pop';
import {AppWindow, At, Bar, Beams, D, Dot, Float, Glow, IconCard, Phone, mono} from '../../lib/Art';
import {Arrow, Card, Chip, Em, Label, Sfx, Slide, clamp, typed, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';

const ink = '#1A1B2E';
const mute = '#7A7D96';

/* ===== Zero to one ===== */
export const Zero: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const steps: [string, string, string, boolean][] = [
    ['Start', 'Zero-basics beginner', 'No code, no background', false],
    ['Step 1', 'Watch this once', 'Start to finish, no rush', false],
    ['Step 2', 'Follow along', 'Same screens, same clicks', true],
  ];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="Zero to one"
      head={
        <>
          From zero to a <Em>company of one</Em>
        </>
      }
    >
      <At x={72} y={250} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        {steps.map(([l, t, s, hl], i) => (
          <React.Fragment key={t}>
            <Card at={at(0.15) + i * at(0.16)} hl={hl} box={{width: 330, height: 170, padding: '18px 22px'}}>
              <Label>{l}</Label>
              <div style={{fontSize: 34, fontWeight: 800, marginTop: 8, lineHeight: 1.1}}>{t}</div>
              <div style={{fontSize: 21, color: D.mute, marginTop: 10}}>{s}</div>
            </Card>
            {i < steps.length - 1 && <Arrow at={at(0.2) + i * at(0.16)} />}
          </React.Fragment>
        ))}
      </At>
      <Pop at={at(0.6)} style={{position: 'absolute', left: 72, top: 450}}>
        <Chip at={at(0.6)} hl size={26}>
          You don't need to code
        </Chip>
      </Pop>
    </Slide>
  );
};

/* ===== How agents evolved ===== */
export const Evolve: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const labels: [string, string, string][] = [
    ['Before', 'Chat box', 'You ask, it answers'],
    ['Then', 'Coding agent', 'Powerful, high barrier'],
    ['Now', 'Personal agent', 'Works inside your business'],
  ];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="AI agents"
      head={
        <>
          How agents <Em>evolved</Em>
        </>
      }
    >
      <At x={72} y={225} style={{display: 'flex', gap: 62}}>
        <Pop at={at(0.1)}>
          <AppWindow w={330} h={215} dark>
            <div style={{padding: 16, display: 'flex', flexDirection: 'column', gap: 10}}>
              <Bar w="60%" h={22} color="#2B2B38" />
              <Bar w="50%" h={22} color="#2B2B38" style={{alignSelf: 'flex-end'}} />
              <Bar w="75%" h={22} color="#2B2B38" />
              <Bar w="40%" h={22} color="#2B2B38" style={{alignSelf: 'flex-end'}} />
            </div>
          </AppWindow>
        </Pop>
        <Pop at={at(0.24)}>
          <AppWindow w={330} h={215} dark>
            <div style={{padding: 16, fontFamily: mono.fontFamily, fontSize: 15, lineHeight: 1.7}}>
              <div style={{color: D.blue}}>{'const run = () => {'}</div>
              <div style={{color: D.mint, paddingLeft: 14}}>{'build(); test();'}</div>
              <div style={{color: D.pink, paddingLeft: 14}}>{'deploy();'}</div>
              <div style={{color: D.blue}}>{'}'}</div>
              <div style={{color: '#5B5B68'}}>{'// high barrier'}</div>
            </div>
          </AppWindow>
        </Pop>
        <Pop at={at(0.4)}>
          <div style={{width: 330, height: 215, borderRadius: 16, border: `2px solid ${D.orange}`, background: 'radial-gradient(circle at 50% 40%, rgba(255,122,47,0.35), #15151d 70%)', boxShadow: '0 0 60px rgba(255,122,47,0.35)', position: 'relative'}}>
            <div style={{position: 'absolute', left: 105, top: 40}}>
              <Mascot color={D.orange} size={120} satellite acc="headphones" />
            </div>
            <Float phase={4} style={{position: 'absolute', left: 22, top: 20}}>
              <IconCard kind="calendar" size={44} />
            </Float>
            <Float phase={14} style={{position: 'absolute', left: 262, top: 26}}>
              <IconCard kind="doc" size={44} color={D.blue} />
            </Float>
            <Float phase={24} style={{position: 'absolute', left: 262, top: 140}}>
              <IconCard kind="chart" size={44} color={D.mint} />
            </Float>
          </div>
        </Pop>
      </At>
      <At x={72} y={462} style={{display: 'flex', gap: 62}}>
        {labels.map(([l, t, s], i) => (
          <Card key={t} at={at(0.18) + i * at(0.15)} hl={i === 2} box={{width: 330, padding: '10px 18px'}}>
            <Label color={i === 2 ? D.orange : D.mute}>{l}</Label>
            <div style={{fontSize: 27, fontWeight: 800, lineHeight: 1.1}}>{t}</div>
            <div style={{fontSize: 17, color: D.mute}}>{s}</div>
          </Card>
        ))}
      </At>
    </Slide>
  );
};

/* ===== Chapter title card ===== */
export const ChapterCard: React.FC<P & {num: string; title: string}> = ({n, vo, num, title}) => {
  const f = useCurrentFrame();
  const rows = Array.from({length: 9});
  return (
    <Slide n={n} vo={vo} bg="ember" bare eyebrow="">
      <AbsoluteFill style={{overflow: 'hidden'}}>
        {rows.map((_, i) => (
          <div key={i} style={{position: 'absolute', left: -((f * 1.2 + i * 90) % 700), top: i * 84 - 20, whiteSpace: 'nowrap', fontSize: 78, fontWeight: 800, color: 'rgba(255,255,255,0.045)', letterSpacing: 4}}>
            {(title + '   ').repeat(8).toUpperCase()}
          </div>
        ))}
      </AbsoluteFill>
      <Pop at={4} style={{position: 'absolute', left: 90, top: 210}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 36}}>
          <div style={{fontSize: 210, fontWeight: 800, color: D.orange, lineHeight: 1, letterSpacing: -6}}>{num}</div>
          <div style={{fontSize: 92, fontWeight: 800, color: '#fff', lineHeight: 1.05, maxWidth: 760}}>{title}</div>
        </div>
      </Pop>
      <Pop at={12} style={{position: 'absolute', left: 96, top: 470}}>
        <div style={{width: 560, height: 6, borderRadius: 3, background: D.orange}} />
      </Pop>
    </Slide>
  );
};

/* ===== A fixed script on a Windows PC ===== */
export const ToolWin: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const frame = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const lines = ['> scanning desktop assets…', '> 12 clips found', '> cutting and merging…', '> rendering video…', '> done ✓'];
  const shown = Math.floor(interpolate(frame, [Dn * 0.25, Dn * 0.85], [0, lines.length], clamp));
  return (
    <Slide n={n} vo={vo} bg="screen" eyebrow="05 · Real work">
      <Sfx at={Math.round(Dn * 0.85)} name="ding" vol={0.25} dur={40} />
      <Pop at={at(0.08)} style={{position: 'absolute', left: 150, top: 80}}>
        <AppWindow w={980} h={420}>
          <div style={{display: 'flex', height: '100%'}}>
            <div style={{width: 360, padding: 22, borderRight: '1.5px solid #E3E4EE', background: '#F6F7FC'}}>
              <div style={{fontSize: 24, fontWeight: 800, color: ink}}>Video tool</div>
              <div style={{marginTop: 16, height: 190, border: `3px dashed ${D.orange}`, borderRadius: 18, background: '#FFF3EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                <div style={{fontSize: 46, color: D.orange}}>⬆</div>
                <div style={{fontSize: 21, fontWeight: 700, color: ink}}>Drop assets here</div>
              </div>
              <div style={{marginTop: 18, background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 22, padding: '10px 0', textAlign: 'center', borderRadius: 12}}>Start</div>
            </div>
            <div style={{flex: 1, background: '#0A0F0C', padding: 22, fontFamily: mono.fontFamily, fontSize: 22, color: '#3cffaa', lineHeight: 1.8}}>
              {lines.slice(0, shown).map((l) => (
                <div key={l}>{l}</div>
              ))}
              <span style={{opacity: Math.floor(frame / 8) % 2 ? 0 : 1}}>▌</span>
            </div>
          </div>
        </AppWindow>
      </Pop>
      <At x={150} y={20}>
        <Chip at={at(0.2)} hl size={20}>
          Windows · fixed script
        </Chip>
      </At>
      <At x={0} y={510} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 14}}>
        {['Cut', 'Publish', 'Fill links back'].map((c, i) => (
          <Chip key={c} at={at(0.55) + i * 10} size={24} hl={i === 0}>
            {i + 1} · {c}
          </Chip>
        ))}
      </At>
    </Slide>
  );
};

/* ===== Open source ===== */
export const OpenSource: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="Open source"
      head={
        <>
          The design Skill is <Em>fully open source</Em>
        </>
      }
    >
      <At x={72} y={260} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <Card at={at(0.15)} box={{width: 360, height: 170}}>
          <Label>Skill</Label>
          <div style={{fontSize: 36, fontWeight: 800, marginTop: 8}}>Design Skill</div>
          <div style={{fontSize: 21, color: D.mute, marginTop: 8}}>Open source, free to use</div>
        </Card>
        <Arrow at={at(0.3)} />
        <Card at={at(0.4)} hl box={{width: 360, height: 170}}>
          <Label>Docs</Label>
          <div style={{fontSize: 36, fontWeight: 800, marginTop: 8}}>Beginner guide</div>
          <div style={{fontSize: 21, color: D.mute, marginTop: 8}}>Written to go with it</div>
        </Card>
      </At>
      <Pop at={at(0.5)} style={{position: 'absolute', left: 960, top: 230}}>
        <Float>
          <Mascot color={D.pink} size={190} acc="cap" satellite />
        </Float>
      </Pop>
    </Slide>
  );
};

/* ===== The key: scheduling ===== */
export const Key: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  return (
    <Slide n={n} vo={vo} bg="ember" bare eyebrow="">
      <Pop at={4} style={{position: 'absolute', left: 72, top: 90}}>
        <Label>The key</Label>
        <div style={{fontSize: 170, fontWeight: 800, color: D.ink, lineHeight: 1.02, letterSpacing: -6}}>Scheduling</div>
      </Pop>
      <Card at={at(0.3)} style={{position: 'absolute', left: 72, top: 340}} box={{width: 470, height: 190}}>
        <Label color={D.mute}>People say</Label>
        <div style={{fontSize: 28, color: D.mute, textDecoration: 'line-through', marginTop: 10}}>Its code isn't top-tier</div>
        <div style={{fontSize: 28, color: D.mute, textDecoration: 'line-through', marginTop: 6}}>Its images aren't the best</div>
      </Card>
      <Card at={at(0.55)} hl style={{position: 'absolute', left: 580, top: 340}} box={{width: 628, height: 190}}>
        <Label>Boss view</Label>
        <div style={{fontSize: 36, fontWeight: 800, lineHeight: 1.18, marginTop: 8}}>
          You don't need the best at everything. You need to <Em>orchestrate</Em>.
        </div>
      </Card>
    </Slide>
  );
};

/* ===== Neon panels ===== */
const NeonPanel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  c: string;
  label: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}> = ({x, y, w, h, c, label, title, sub, children}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 26,
      border: `3px solid ${c}`,
      background: `linear-gradient(160deg, ${c}33, rgba(6,10,30,0.9) 60%)`,
      boxShadow: `0 0 60px ${c}88, inset 0 0 50px ${c}33`,
      overflow: 'hidden',
    }}
  >
    <div style={{position: 'absolute', left: 26, top: 20}}>
      <Label color={c}>{label}</Label>
      <div style={{fontSize: 40, fontWeight: 800, color: '#fff', lineHeight: 1.05, marginTop: 6}}>{title}</div>
      {sub && <div style={{fontSize: 21, color: '#cfd6ff', marginTop: 8}}>{sub}</div>}
    </div>
    {children}
  </div>
);

export const NeonTwo: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const pulse = 0.55 + 0.45 * Math.sin(f / 6);
  return (
    <Slide n={n} vo={vo} bg="none" bare eyebrow="">
      <AbsoluteFill style={{background: 'radial-gradient(900px 500px at 50% 100%, #1b3a8a 0%, #070a1c 70%)'}} />
      <Glow x={640} y={640} r={420} c="#2b6bff" o={0.35} />
      <Pop at={4} style={{position: 'absolute', left: 0, right: 0, top: 36, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontSize: 56, fontWeight: 800, color: '#fff', padding: '8px 36px', border: '3px solid #59d9ff', borderRadius: 20, boxShadow: '0 0 40px #59d9ff88', letterSpacing: 2}}>
          TWO QUICK LAUNCHES
        </div>
      </Pop>
      <Pop at={at(0.2)}>
        <NeonPanel x={90} y={130} w={540} h={410} c="#59d9ff" label="Side button" title="Bind a shortcut" sub="One press and your Bot is listening.">
          <div style={{position: 'absolute', left: 190, top: 150}}>
            <Phone w={170} h={270} glow="rgba(89,217,255,0.5)">
              <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Mascot color={D.orange} size={80} />
              </div>
            </Phone>
          </div>
          <div style={{position: 'absolute', left: 356, top: 215, width: 10, height: 56, borderRadius: 5, background: D.orange, opacity: pulse, boxShadow: `0 0 20px ${D.orange}`}} />
          <div style={{position: 'absolute', left: 392, top: 232, fontSize: 36, color: D.orange}}>◀</div>
        </NeonPanel>
      </Pop>
      <Pop at={at(0.4)}>
        <NeonPanel x={650} y={130} w={540} h={410} c="#FF8A3D" label="Voice" title="Say “Hey Bot”" sub="Hands-free, from anywhere.">
          <div style={{position: 'absolute', left: 190, top: 150}}>
            <Phone w={170} h={270} glow="rgba(255,138,61,0.5)">
              <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Mascot color={D.orange} size={80} />
              </div>
            </Phone>
          </div>
          <div style={{position: 'absolute', left: 30, top: 250, display: 'flex', gap: 6, alignItems: 'center', height: 90}}>
            {Array.from({length: 7}).map((_, i) => (
              <div key={i} style={{width: 9, borderRadius: 5, background: D.orange, height: 14 + Math.abs(Math.sin(f / 5 + i * 0.8)) * 70}} />
            ))}
          </div>
          <div style={{position: 'absolute', right: 26, top: 250, display: 'flex', gap: 6, alignItems: 'center', height: 90}}>
            {Array.from({length: 7}).map((_, i) => (
              <div key={i} style={{width: 9, borderRadius: 5, background: D.orange, height: 14 + Math.abs(Math.sin(f / 5 + i * 0.8 + 2)) * 70}} />
            ))}
          </div>
        </NeonPanel>
      </Pop>
    </Slide>
  );
};

export const NeonReq: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const rise = (f % 40) / 40;
  return (
    <Slide n={n} vo={vo} bg="none" bare eyebrow="">
      <AbsoluteFill style={{background: 'radial-gradient(900px 500px at 50% 100%, #5a2a0a 0%, #0a0710 70%)'}} />
      <Glow x={640} y={640} r={420} c="#ff7a2f" o={0.3} />
      <Pop at={4} style={{position: 'absolute', left: 0, right: 0, top: 36, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontSize: 52, fontWeight: 800, color: '#fff', padding: '8px 36px', border: '3px solid #FF8A3D', borderRadius: 20, boxShadow: '0 0 40px #FF8A3D88', letterSpacing: 2}}>
          SIDE BUTTON: CHECK TWO THINGS
        </div>
      </Pop>
      <Pop at={at(0.2)}>
        <NeonPanel x={90} y={130} w={540} h={410} c="#59d9ff" label="1 · App" title="Latest version" sub="Update before you start.">
          <div style={{position: 'absolute', left: 190, top: 170}}>
            <Mascot color={D.orange} size={150} satellite />
          </div>
          {[0, 1].map((i) => (
            <div key={i} style={{position: 'absolute', left: 120 + i * 270, top: 330 - rise * 50 - i * 12, fontSize: 60, color: '#59d9ff', opacity: 1 - rise * 0.6}}>↑</div>
          ))}
        </NeonPanel>
      </Pop>
      <Pop at={at(0.4)}>
        <NeonPanel x={650} y={130} w={540} h={410} c="#FF8A3D" label="2 · Phone" title="An Action button" sub="Found on newer iPhones.">
          <div style={{position: 'absolute', left: 190, top: 150}}>
            <Phone w={170} h={270} glow="rgba(255,138,61,0.5)">
              <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Mascot color={D.orange} size={80} />
              </div>
            </Phone>
          </div>
          <div style={{position: 'absolute', left: 175, top: 200, width: 10, height: 50, borderRadius: 5, background: D.orange, boxShadow: `0 0 20px ${D.orange}`}} />
          <div style={{position: 'absolute', left: 26, bottom: 22}}>
            <Chip at={at(0.55)} hl size={20}>
              Action button
            </Chip>
          </div>
        </NeonPanel>
      </Pop>
    </Slide>
  );
};

/* ===== Phone walkthroughs ===== */
const PhoneTag: React.FC<{text: string}> = ({text}) => (
  <Pop at={3} style={{position: 'absolute', left: 40, top: 26}}>
    <div style={{fontFamily: mono.fontFamily, fontSize: 18, letterSpacing: 2, color: D.orange}}>{text}</div>
  </Pop>
);

const PatternBg: React.FC<{word: string}> = ({word}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>
    {Array.from({length: 9}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: -40 - (i % 2) * 120, top: i * 84 - 10, whiteSpace: 'nowrap', fontSize: 72, fontWeight: 800, color: 'rgba(255,255,255,0.04)', letterSpacing: 6}}>
        {(word + '  ').repeat(10).toUpperCase()}
      </div>
    ))}
  </AbsoluteFill>
);

export const Shortcut: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const tiles = [D.blue, D.mint, D.yellow, D.violet, '#3B3B48', D.orange, D.blue, D.mint];
  const steps = ['Open Shortcuts', 'Create “Start Voice Chat”', 'Select the Bot you just made'];
  return (
    <Slide n={n} vo={vo} bg="ember" bare eyebrow="">
      <PatternBg word="Quick launch" />
      <PhoneTag text="06 · QUICK LAUNCH · 1/3" />
      <Pop at={at(0.08)} style={{position: 'absolute', left: 170, top: 80}}>
        <Phone w={240} h={450} glow="rgba(255,122,47,0.35)">
          <div style={{padding: '40px 14px 12px'}}>
            <div style={{color: D.mute, fontSize: 13, fontWeight: 800, marginBottom: 10}}>SHORTCUTS</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
              {tiles.map((c, i) => (
                <div key={i} style={{height: 62, borderRadius: 12, background: c, opacity: 0.5}} />
              ))}
            </div>
            <div style={{marginTop: 14, background: D.pink, borderRadius: 14, padding: '14px 12px', color: '#fff', fontSize: 17, fontWeight: 800, boxShadow: `0 0 0 3px #fff, 0 0 0 7px ${D.orange}`}}>
              Start Voice Chat with Bot
            </div>
          </div>
        </Phone>
      </Pop>
      <At x={540} y={110} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {steps.map((s, i) => (
          <Card key={s} at={at(0.2) + i * at(0.15)} hl={i === 2} box={{width: 640, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 18}}>
            <div style={{width: 50, height: 50, borderRadius: 25, background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
            <div style={{fontSize: 32, fontWeight: 800}}>{s}</div>
          </Card>
        ))}
      </At>
      <Pop at={at(0.65)} style={{position: 'absolute', left: 540, top: 440}}>
        <div style={{background: D.orange, color: '#1A0E06', fontWeight: 800, fontSize: 28, padding: '12px 24px', borderRadius: 14, width: 640}}>
          Pick the Bot you just created.
        </div>
      </Pop>
    </Slide>
  );
};

export const BackTap: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const rows = ['General', 'Display', 'Accessibility', 'Touch', 'Back Tap', 'Voice'];
  const path = ['Accessibility', 'Touch', 'Back Tap'];
  return (
    <Slide n={n} vo={vo} bg="ember" bare eyebrow="">
      <PatternBg word="Back tap" />
      <PhoneTag text="06 · QUICK LAUNCH · 2/3" />
      <At x={90} y={150} style={{display: 'flex', alignItems: 'center', gap: 10, width: 720}}>
        {path.map((p, i) => (
          <React.Fragment key={p}>
            <Chip at={at(0.15) + i * at(0.15)} hl={i === 2} size={28}>
              {p}
            </Chip>
            {i < path.length - 1 && <Arrow at={at(0.2) + i * at(0.15)} />}
          </React.Fragment>
        ))}
      </At>
      <Card at={at(0.55)} style={{position: 'absolute', left: 90, top: 300}} box={{width: 560, padding: '20px 26px'}}>
        <Label>Then choose</Label>
        <div style={{fontSize: 44, fontWeight: 800, marginTop: 8}}>Double or triple tap</div>
        <div style={{fontSize: 22, color: D.mute, marginTop: 8}}>Tap the back of your iPhone to call the Bot.</div>
      </Card>
      <Pop at={at(0.1)} style={{position: 'absolute', left: 810, top: 80}}>
        <Phone w={250} h={450} glow="rgba(255,122,47,0.35)">
          <div style={{padding: '42px 12px 12px', display: 'flex', flexDirection: 'column', gap: 8}}>
            {rows.map((r, i) => (
              <div key={r} style={{padding: '10px 12px', borderRadius: 10, fontSize: 16, fontWeight: 700, color: '#fff', background: i >= 2 && i <= 4 ? 'rgba(255,122,47,0.25)' : '#22222C', border: i === 4 ? `2px solid ${D.orange}` : '2px solid transparent'}}>
                {r}
              </div>
            ))}
          </div>
        </Phone>
      </Pop>
    </Slide>
  );
};

export const Hey: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const filled = Math.min(3, Math.max(0, Math.floor((f - at(0.25)) / at(0.12))));
  const perms = ['Calendar', 'Reminders', 'Alarms'];
  return (
    <Slide n={n} vo={vo} bg="ember" bare eyebrow="">
      <PatternBg word="Hey Bot" />
      <PhoneTag text="06 · QUICK LAUNCH · 3/3" />
      <Pop at={at(0.08)} style={{position: 'absolute', left: 150, top: 80}}>
        <Phone w={250} h={450} glow="rgba(255,122,47,0.35)">
          <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, paddingTop: 20}}>
            <div style={{fontSize: 24, fontWeight: 800, color: '#fff'}}>Say “Hey Bot”</div>
            <Mascot color={D.orange} size={90} />
            <div style={{display: 'flex', gap: 12}}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{width: 16, height: 16, borderRadius: 8, background: i < filled ? D.orange : '#3A3A47'}} />
              ))}
            </div>
            <div style={{display: 'flex', gap: 5, height: 40, alignItems: 'center'}}>
              {Array.from({length: 14}).map((_, i) => (
                <div key={i} style={{width: 5, borderRadius: 3, background: D.orange, height: 6 + Math.abs(Math.sin(f / 5 + i * 0.7)) * 30}} />
              ))}
            </div>
          </div>
        </Phone>
      </Pop>
      <At x={500} y={110}>
        <Pop at={at(0.2)}>
          <div style={{fontSize: 50, fontWeight: 800, color: D.ink, lineHeight: 1.1}}>
            Say it <Em>three times</Em>
          </div>
          <div style={{fontSize: 24, color: D.mute, marginTop: 8}}>The phone records your voice.</div>
        </Pop>
      </At>
      <At x={500} y={290} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {perms.map((p, i) => (
          <Card key={p} at={at(0.4) + i * at(0.1)} box={{width: 560, padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 16}}>
            <IconCard kind={['calendar', 'check', 'clock'][i]} size={46} />
            <div style={{flex: 1, fontSize: 30, fontWeight: 800}}>{p}</div>
            <div style={{width: 64, height: 34, borderRadius: 17, background: D.mint, position: 'relative'}}>
              <div style={{position: 'absolute', right: 4, top: 4, width: 26, height: 26, borderRadius: 13, background: '#fff'}} />
            </div>
          </Card>
        ))}
      </At>
    </Slide>
  );
};

/* ===== Pitfalls ===== */
export const Issue1: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="Issue 01"
      head={
        <>
          It tends to <Em>over-correct</Em>
        </>
      }
    >
      <At x={72} y={240} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <Card at={at(0.12)} box={{width: 420, height: 160}}>
          <Label>At first</Label>
          <div style={{fontSize: 30, fontWeight: 800, marginTop: 6}}>Big gaps between sentences</div>
          <div style={{display: 'flex', gap: 80, marginTop: 14}}>
            <Bar w={90} h={12} color="#fff" />
            <Bar w={90} h={12} color="#fff" />
          </div>
        </Card>
        <Arrow at={at(0.3)} />
        <Card at={at(0.4)} hl box={{width: 420, height: 160}}>
          <Label>One request</Label>
          <div style={{fontSize: 30, fontWeight: 800, marginTop: 6}}>Tiny edit, whole line gone</div>
          <div style={{display: 'flex', gap: 8, marginTop: 14}}>
            <Bar w={190} h={12} color="#fff" />
            <Bar w={190} h={12} color="#fff" />
          </div>
        </Card>
      </At>
      <At x={72} y={438}>
        <Pop at={at(0.62)}>
          <div style={{fontSize: 28, fontWeight: 700, color: D.ink}}>
            <span style={{color: D.orange}}>My fix:</span> hand code changes to a coding tool, or use a tuned script.
          </div>
        </Pop>
      </At>
    </Slide>
  );
};

export const Issue2: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const cols = [D.blue, D.mint, D.pink, D.violet, D.yellow];
  return (
    <Slide
      n={n}
      vo={vo}
      compact
      eyebrow="Issue 02"
      head={
        <>
          No window per Bot <Em>yet</Em>
        </>
      }
    >
      <At x={72} y={240} style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <Card at={at(0.12)} box={{width: 420, height: 190}}>
          <Label>Now</Label>
          <div style={{fontSize: 28, fontWeight: 800, marginTop: 4}}>All Bots share one chat</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10}}>
            {cols.slice(0, 3).map((c, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 8, marginLeft: i * 40}}>
                <Dot c={c} s={20} />
                <Bar w={120 + (i % 2) * 40} h={9} color="#4A4A58" />
              </div>
            ))}
          </div>
        </Card>
        <Arrow at={at(0.3)} />
        <Card at={at(0.4)} hl box={{width: 420, height: 190}}>
          <Label>Wish</Label>
          <div style={{fontSize: 28, fontWeight: 800, marginTop: 4}}>One Bot, one window</div>
          <div style={{display: 'flex', gap: 10, marginTop: 12}}>
            {cols.slice(0, 3).map((c, i) => (
              <div key={i} style={{width: 112, height: 70, borderRadius: 10, background: '#1D1D26', border: `2px solid ${c}`, padding: 8}}>
                <Dot c={c} s={18} />
              </div>
            ))}
          </div>
        </Card>
      </At>
      <At x={72} y={462}>
        <Pop at={at(0.62)}>
          <div style={{fontSize: 28, fontWeight: 700, color: D.ink}}>
            Feedback sent. <span style={{color: D.orange}}>Hoping it ships soon.</span>
          </div>
        </Pop>
      </At>
    </Slide>
  );
};

/* ===== Usage heat map (light screen) ===== */
export const Tokens: React.FC<P> = ({n, vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const cols = 30;
  const rows = 7;
  const shades = ['#dfe6f3', '#b7ccf3', '#7ea5ec', '#4a7fe0', '#2554b8', '#16337a'];
  return (
    <Slide n={n} vo={vo} bg="none" bare eyebrow="">
      <AbsoluteFill style={{background: 'linear-gradient(180deg,#eceef3 0%,#d9dce6 100%)'}} />
      <Pop at={4} style={{position: 'absolute', left: 72, top: 54}}>
        <div style={{fontFamily: mono.fontFamily, fontSize: 18, letterSpacing: 2, color: '#6a6f86'}}>WHY I LOVE IT · USAGE (ILLUSTRATIVE)</div>
        <div style={{fontSize: 56, fontWeight: 800, color: ink, marginTop: 6, lineHeight: 1.05}}>
          Usage adds up <span style={{color: D.orange}}>fast</span>
        </div>
      </Pop>
      <Pop at={at(0.1)} style={{position: 'absolute', left: 72, top: 220}}>
        <div style={{background: '#fff', borderRadius: 22, padding: 28, boxShadow: '0 20px 60px rgba(30,40,80,0.2)'}}>
          <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 28px)`, gridTemplateRows: `repeat(${rows}, 28px)`, gridAutoFlow: 'column', gap: 6}}>
            {Array.from({length: cols * rows}).map((_, i) => {
              const c = Math.floor(i / rows);
              const r = i % rows;
              const base = (Math.sin(c * 0.5 + r) + 1) / 2;
              const grow = c / cols;
              const lvl = Math.min(5, Math.floor((base * 0.6 + grow * 0.7) * 6));
              const reveal = interpolate(f, [at(0.15) + c * 2, at(0.15) + c * 2 + 12], [0, 1], clamp);
              return <div key={i} style={{borderRadius: 6, background: shades[lvl], opacity: reveal}} />;
            })}
          </div>
          <div style={{display: 'flex', gap: 56, marginTop: 14, fontFamily: mono.fontFamily, fontSize: 15, color: '#6a6f86'}}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((m) => (
              <div key={m}>{m}</div>
            ))}
          </div>
        </div>
      </Pop>
    </Slide>
  );
};

