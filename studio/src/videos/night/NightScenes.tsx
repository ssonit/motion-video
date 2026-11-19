import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {mono} from '../../lib/Art';
import type {BotShape} from '../../lib/GrokBotMark';
import {Sfx, clamp, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {Bot} from '../real/BotMark';
import {Abs, Card, Head, IconCheck, IconClock, In, Label, Pill, R, RSlide} from '../real/ui';

/** Night Studio cast: five role-bots (invented, generic). */
export const ROLES: {name: string; job: string; shape: BotShape; color: string}[] = [
  {name: 'Director', job: 'Plans the shots', shape: 'drop', color: R.teal},
  {name: 'Animator', job: 'Writes the code', shape: 'blob', color: R.orange},
  {name: 'Renderer', job: 'Makes the frames', shape: 'pillow', color: R.violet},
  {name: 'Critic', job: 'Scores the result', shape: 'circle', color: R.pink},
  {name: 'Courier', job: 'Delivers the file', shape: 'drop', color: R.blue},
];

const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 20, color = '#fff', style}) => (
  <div style={{fontFamily: mono.fontFamily, fontSize: size, color, ...style}}>{children}</div>
);

const Desk: React.FC<{w?: number; dashed?: boolean; label?: string}> = ({w = 150, dashed, label}) => (
  <svg width={w} height={w * 0.75} viewBox="0 0 160 120" fill="none" stroke={dashed ? 'rgba(255,255,255,0.35)' : '#fff'} strokeWidth={3} strokeLinecap="round">
    <rect x="48" y="14" width="64" height="44" rx="6" />
    <path d="M80 58v14M64 72h32" />
    <path d="M18 82h124M30 82v30M130 82v30" />
    {label ? <text x="80" y="42" fill="rgba(255,255,255,0.4)" stroke="none" fontSize="14" textAnchor="middle">{label}</text> : null}
  </svg>
);

/* ===== 1. Hook: 21:00 -> 08:00 ===== */
export const HookN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const mins = interpolate(f, [Dn * 0.18, Dn * 0.82], [21 * 60, 32 * 60], clamp);
  const h = Math.floor(mins / 60) % 24;
  const m = Math.floor(mins % 60);
  const done = f > Dn * 0.82;
  return (
    <RSlide vo={vo} bg="#0A0D24">
      <Sfx at={Math.round(Dn * 0.82)} name="ding" vol={0.28} dur={40} />
      <In at={at(0.04)} tick={false} style={{position: 'absolute', left: 0, right: 0, top: 36, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
          <IconClock s={64} />
          <div style={{fontFamily: mono.fontFamily, fontSize: 150, fontWeight: 700, letterSpacing: -4, color: done ? '#FFD479' : '#fff'}}>
            {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}
          </div>
        </div>
      </In>
      <Abs x={0} y={214} style={{width: 1280, textAlign: 'center', fontSize: 34, color: R.mute}}>
        {done ? 'Final cut ready ☀' : 'Everyone is asleep… except the bots'}
      </Abs>
      <Abs x={0} y={300} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 40}}>
        {ROLES.map((r, i) => (
          <In key={r.name} at={at(0.22) + i * 8} style={{width: 190, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            <Bot shape={r.shape} color={r.color} size={96} phase={i * 11} />
            <Pill size={20}>{r.name}</Pill>
            <div style={{fontSize: 17, color: R.dim}}>{r.job}</div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== 2. The render that never finishes ===== */
export const StallN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const pct = interpolate(f, [Dn * 0.1, Dn * 0.5], [0, 90], clamp);
  const stuck = f > Dn * 0.5;
  const wob = stuck ? Math.sin(f / 3) * 2 : 0;
  return (
    <RSlide vo={vo} bg="#14100D">
      <Head label="The wall">
        Where most projects <span style={{color: R.red}}>die</span>
      </Head>
      <In at={at(0.06)} tick={false} style={{position: 'absolute', left: 90, top: 190}}>
        <div style={{width: 640, height: 330, borderRadius: 22, background: '#1B1B1B', border: `1.5px solid ${R.line}`, padding: 26, boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
          <Mono size={20} color={R.mute}>$ render --all-scenes</Mono>
          <div style={{marginTop: 30, fontSize: 28, fontWeight: 500}}>Rendering scene 14 of 15…</div>
          <div style={{marginTop: 22, height: 26, borderRadius: 13, background: '#2A2A2A', overflow: 'hidden'}}>
            <div style={{width: `${pct}%`, height: '100%', background: stuck ? R.red : R.orange, borderRadius: 13}} />
          </div>
          <div style={{marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 22, color: R.mute}}>
            <Mono size={22}>{Math.round(pct)}%</Mono>
            <span>{stuck ? 'no progress for 40 min' : 'estimated time: unknown'}</span>
          </div>
          <div style={{marginTop: 26, fontSize: 70, textAlign: 'center', transform: `translateX(${wob}px)`}}>{stuck ? '🐌' : '⏳'}</div>
        </div>
      </In>
      <Abs x={790} y={200} style={{display: 'flex', flexDirection: 'column', gap: 16, width: 420}}>
        {['Good idea', 'Good script', 'Frames crawl', 'Project abandoned'].map((t, i) => (
          <Card key={t} at={at(0.25) + i * at(0.1)} hl={i === 3 ? R.red : undefined} box={{padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14}}>
            {i < 2 ? <IconCheck s={24} /> : <span style={{color: R.red, fontSize: 24, fontWeight: 800}}>✕</span>}
            <div style={{fontSize: 26, fontWeight: 500}}>{t}</div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== 3. Missing: a studio ===== */
export const MissingN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const desks = [
    ['Planner', 'No one to plan'],
    ['Judge', 'No one to judge'],
    ['Render queue', 'Nothing in line'],
  ];
  return (
    <RSlide vo={vo} bg="#101214">
      <Head label="The gap">
        Not a smarter model. <span style={{color: R.teal}}>A studio.</span>
      </Head>
      <Abs x={72} y={200} style={{display: 'flex', gap: 34}}>
        {desks.map(([t, s], i) => (
          <In key={t} at={at(0.18) + i * at(0.14)}>
            <div style={{width: 340, height: 300, borderRadius: 26, border: '2.5px dashed rgba(255,255,255,0.28)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
              <Desk dashed w={190} />
              <div style={{fontSize: 30, fontWeight: 500, color: 'rgba(255,255,255,0.55)'}}>{t}</div>
              <Label>{s}</Label>
            </div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== 4. Crew at night ===== */
const STARS = Array.from({length: 46}, (_, i) => ({x: (i * 277) % 1280, y: (i * 131) % 330, r: 1 + (i % 3) * 0.8, o: 0.3 + ((i * 7) % 10) / 14}));
export const CrewN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo} bg="linear-gradient(#070A22,#141A4A)">
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o * (0.7 + 0.3 * Math.sin((f + i * 9) / 12))} />
        ))}
        <circle cx={1150} cy={90} r={38} fill="#FFE9A8" />
        <circle cx={1166} cy={80} r={34} fill="#0A0D2A" />
      </svg>
      <Head label="The crew">
        Five bots, <span style={{color: '#FFD479'}}>five jobs</span>
      </Head>
      <Abs x={30} y={200} style={{display: 'flex', gap: 14}}>
        {ROLES.map((r, i) => (
          <In key={r.name} at={at(0.14) + i * at(0.12)} style={{width: 238, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Bot shape={r.shape} color={r.color} size={104} phase={i * 9} />
            <div style={{marginTop: -6, width: 220, borderRadius: 22, background: R.card, border: `2px solid ${r.color}`, padding: '12px 0 14px', textAlign: 'center'}}>
              <div style={{fontSize: 26, fontWeight: 600}}>{r.name}</div>
              <div style={{fontSize: 17, color: R.mute, marginTop: 4}}>{r.job}</div>
            </div>
            <Desk w={150} />
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== 5. No model picker ===== */
export const NoPickerN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const row = (label: string, w: number) => (
    <div style={{marginTop: 16}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 18, color: R.mute, marginBottom: 8}}>
        <span>{label}</span>
        <span style={{color: R.red}}>not available</span>
      </div>
      <div style={{position: 'relative', height: 50, borderRadius: 14, background: '#1A1A1A', border: `1.5px dashed ${R.red}`}}>
        <div style={{position: 'absolute', left: 14, right: 14, top: 24, height: 3, background: R.red, transform: `scaleX(${w})`, transformOrigin: 'left'}} />
      </div>
    </div>
  );
  return (
    <RSlide vo={vo} bg="#0B1410">
      <Head label="Heads up">
        No model menu. No effort dial.
      </Head>
      <In at={at(0.1)} tick={false} style={{position: 'absolute', left: 72, top: 190}}>
        <div style={{width: 520, borderRadius: 22, background: '#141414', border: `1.5px solid ${R.line}`, padding: '20px 24px 28px'}}>
          <Label>Settings</Label>
          {row('Model picker', 1)}
          {row('Effort', 1)}
          <div style={{marginTop: 22, display: 'flex', alignItems: 'center', gap: 12, background: R.card, borderRadius: 9999, padding: '10px 18px'}}>
            <Bot shape="drop" color={R.white} size={34} bob={1} />
            <div style={{fontSize: 20}}>The bot picks per task</div>
          </div>
        </div>
      </In>
      <Abs x={650} y={190} style={{width: 560}}>
        <In at={at(0.4)}>
          <div style={{fontSize: 24, color: R.mute, marginBottom: 14}}>So where is your leverage?</div>
        </In>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {[
            ['Spec', 'Say exactly what “done” means', R.teal],
            ['Gate', 'Nothing starts without approval', R.orange],
            ['Critic', 'A second bot checks the work', R.pink],
          ].map(([t, d, c], i) => (
            <Card key={t} at={at(0.5) + i * at(0.1)} hl={c} box={{padding: '14px 22px'}}>
              <div style={{fontSize: 28, fontWeight: 600, color: c}}>{t}</div>
              <div style={{fontSize: 20, color: R.mute}}>{d}</div>
            </Card>
          ))}
        </div>
      </Abs>
    </RSlide>
  );
};

/* ===== 6. Laptop can sleep ===== */
export const LaptopN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const n = Math.floor(interpolate(f, [Dn * 0.3, Dn * 0.9], [0, 12], clamp));
  return (
    <RSlide vo={vo} bg="#0C1620">
      <Head label="Always on">
        Close the lid. <span style={{color: R.blue}}>Work continues.</span>
      </Head>
      <In at={at(0.08)} tick={false} style={{position: 'absolute', left: 72, top: 220}}>
        <div style={{width: 380, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{fontSize: 52, color: R.blue, fontWeight: 700, alignSelf: 'flex-end', marginRight: 40, opacity: 0.5 + 0.5 * Math.sin(f / 10)}}>z z</div>
          <div style={{width: 340, height: 18, borderRadius: 9, background: '#3A3A3A'}} />
          <div style={{width: 400, height: 10, borderRadius: 5, background: '#555'}} />
          <Pill kind="dark" size={20} style={{marginTop: 22}}>🔒 Lid closed</Pill>
        </div>
      </In>
      <In at={at(0.22)} style={{position: 'absolute', left: 520, top: 190}}>
        <div style={{width: 690, borderRadius: 22, background: '#101010', border: `1.5px solid ${R.line}`, padding: 22}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, fontWeight: 500}}>
            ☁ Cloud computer <span style={{color: R.green, fontSize: 17}}>● always on</span>
            <div style={{flex: 1}} />
            <Pill size={15}>shared by 5 bots</Pill>
          </div>
          <div style={{marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 6}}>
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} style={{height: 34, borderRadius: 8, background: i < n ? R.blue : '#222'}} />
            ))}
          </div>
          <div style={{marginTop: 18, display: 'flex', gap: 14}}>
            {ROLES.map((r, i) => (
              <Bot key={r.name} shape={r.shape} color={r.color} size={46} phase={i * 9} bob={2} />
            ))}
          </div>
        </div>
      </In>
    </RSlide>
  );
};

/* ===== 7. No GPU ===== */
export const NoGpuN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const spec: [string, string, string?][] = [
    ['CPU', 'shared cores'],
    ['RAM', 'limited'],
    ['GPU', 'none', R.red],
    ['Disk', 'plenty'],
  ];
  const opts: [string, string, boolean][] = [
    ['HTML + CSS', 'Draws text and layout', true],
    ['SVG + Canvas', 'Shapes, paths, charts', true],
    ['3D engine', 'Needs a graphics card', false],
  ];
  return (
    <RSlide vo={vo} bg="#0F1018">
      <Head label="Know your machine">
        No GPU <span style={{color: R.violet}}>changes the toolkit</span>
      </Head>
      <In at={at(0.08)} style={{position: 'absolute', left: 72, top: 190}}>
        <div style={{width: 380, borderRadius: 20, background: '#0C0C0C', border: `1.5px solid ${R.line}`, padding: '20px 24px'}}>
          <Mono size={17} color={R.dim}>cloud-computer · specs</Mono>
          {spec.map(([k, v, c]) => (
            <div key={k} style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, padding: '6px 10px', borderRadius: 8, background: c ? 'rgba(224,33,53,0.22)' : 'transparent'}}>
              <Mono size={22} color={R.dim}>{k}</Mono>
              <Mono size={22} color={c ?? '#fff'}>{v}</Mono>
            </div>
          ))}
        </div>
      </In>
      <Abs x={500} y={190} style={{display: 'flex', gap: 22}}>
        {opts.map(([t, d, ok], i) => (
          <Card key={t} at={at(0.3) + i * at(0.13)} hl={ok ? R.green : R.red} box={{width: 200, height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 10, opacity: ok ? 1 : 0.8}}>
            <div style={{width: 64, height: 64, borderRadius: 32, background: ok ? R.green : R.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 800}}>{ok ? '✓' : '✕'}</div>
            <div style={{fontSize: 26, fontWeight: 600}}>{t}</div>
            <div style={{fontSize: 17, color: R.mute}}>{d}</div>
            <div style={{fontSize: 18, fontWeight: 700, color: ok ? R.green : R.red}}>{ok ? 'Runs fine' : 'Skip it'}</div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== 8. Folder + bootstrap ===== */
export const FolderN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const lines = ['$ bash setup.sh', '  installing video tools … ok', '  installing browser … ok', '  project folders … ok', '  ready in 58s'];
  const shown = Math.floor(interpolate(f, [Dn * 0.35, Dn * 0.85], [0, lines.length], clamp));
  return (
    <RSlide vo={vo} bg="#0B1512">
      <Sfx at={Math.round(Dn * 0.85)} name="ding" vol={0.25} dur={40} />
      <Head label="Home base">
        One folder. One <span style={{color: R.green}}>setup script.</span>
      </Head>
      <In at={at(0.08)} style={{position: 'absolute', left: 72, top: 190}}>
        <div style={{width: 400, borderRadius: 22, background: '#0F1F19', border: `2px solid ${R.green}`, padding: '20px 24px', boxShadow: `0 0 40px ${R.green}33`}}>
          <div style={{fontSize: 24, fontWeight: 600}}>📁 workspace/</div>
          {['projects/', 'studio/', 'setup.sh', 'house-style.md'].map((x, i) => (
            <In key={x} at={at(0.16) + i * 7} tick={false} style={{marginLeft: 26, marginTop: 12, fontFamily: mono.fontFamily, fontSize: 21, color: 'rgba(255,255,255,0.85)'}}>
              {x.endsWith('/') ? '📁' : '📄'} {x}
            </In>
          ))}
          <Pill size={16} style={{marginTop: 20, background: R.green}}>survives a reset</Pill>
        </div>
      </In>
      <In at={at(0.28)} tick={false} style={{position: 'absolute', left: 520, top: 190}}>
        <div style={{width: 690, height: 300, borderRadius: 20, background: '#0C0C0C', border: `1.5px solid ${R.line}`, padding: '20px 26px'}}>
          {lines.slice(0, shown).map((l) => (
            <Mono key={l} size={23} color={l.startsWith('$') ? '#fff' : R.green} style={{lineHeight: 1.75}}>
              {l}
            </Mono>
          ))}
          <Mono size={23}>{Math.floor(f / 8) % 2 ? ' ' : '▌'}</Mono>
        </div>
      </In>
    </RSlide>
  );
};

/* ===== 9. Shared skill ===== */
export const SkillN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const pos = [
    [150, 200],
    [150, 410],
    [1010, 200],
    [1010, 410],
  ];
  return (
    <RSlide vo={vo} bg="#150F26">
      <Head label="One rulebook">
        Write the rules <span style={{color: R.violet}}>once</span>
      </Head>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        {pos.map(([x, y], i) => (
          <path key={i} d={`M${x + 60} ${y + 60} L640 330`} stroke="rgba(255,255,255,0.28)" strokeWidth={2.5} strokeDasharray="6 6" fill="none" />
        ))}
      </svg>
      <In at={at(0.12)} style={{position: 'absolute', left: 390, top: 190}}>
        <div style={{width: 500, borderRadius: 24, background: R.card, border: `2px solid ${R.violet}`, padding: '20px 26px', boxShadow: `0 0 50px ${R.violet}44`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{fontSize: 30, fontWeight: 600}}>house-style</div>
            <Pill size={14} style={{background: R.violet}}>SKILL</Pill>
          </div>
          {['Every frame is a function of time', 'Fonts load from local files', 'Something new every 2–4 seconds'].map((t, i) => (
            <In key={t} at={at(0.3) + i * at(0.1)} style={{marginTop: 14, display: 'flex', gap: 12, alignItems: 'center', fontSize: 21, color: R.mute}}>
              <IconCheck s={20} c={R.violet} />
              {t}
            </In>
          ))}
        </div>
      </In>
      {pos.map(([x, y], i) => (
        <In key={i} at={at(0.5) + i * 7} style={{position: 'absolute', left: x, top: y}}>
          <Bot shape={ROLES[[0, 1, 2, 3][i]].shape} color={ROLES[i].color} size={120} phase={i * 10} />
        </In>
      ))}
      <In at={at(0.75)} style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center'}}>
        <Pill size={22}>Same rulebook · same look</Pill>
      </In>
    </RSlide>
  );
};

/* ===== 10. Banned list ===== */
export const BannedN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const items: [string, React.ReactNode][] = [
    ['Centered title on a gradient', <div key="a" style={{height: 90, borderRadius: 12, background: 'linear-gradient(135deg,#8E54E9,#4776E6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 80, height: 12, borderRadius: 6, background: '#fff'}} /></div>],
    ['Everything fades in at once', <div key="b" style={{height: 90, borderRadius: 12, background: '#2A2A2A', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, padding: 8}}>{[R.teal, R.orange, R.pink, R.blue, R.violet, R.green].map((c) => <div key={c} style={{background: c, borderRadius: 6, opacity: 0.6}} />)}</div>],
    ['Confetti bursts', <div key="c" style={{height: 90, borderRadius: 12, background: '#101018', position: 'relative', overflow: 'hidden'}}>{Array.from({length: 14}).map((_, i) => <div key={i} style={{position: 'absolute', left: 60 + Math.cos(i) * 44, top: 40 + Math.sin(i * 2) * 32, width: 8, height: 8, borderRadius: 4, background: [R.pink, R.orange, R.teal][i % 3]}} />)}</div>],
    ['Rubber-band bounce', <div key="d" style={{height: 90, borderRadius: 12, background: '#2A2A2A', position: 'relative'}}><div style={{position: 'absolute', left: 60, top: 14, width: 44, height: 44, borderRadius: 10, background: R.orange}} /><div style={{position: 'absolute', left: 54, top: 70, width: 56, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.3)'}} /></div>],
    ['Dead air', <div key="e" style={{height: 90, borderRadius: 12, background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: R.dim, fontSize: 20}}>… nothing …</div>],
  ];
  return (
    <RSlide vo={vo} bg="#160B0E">
      <Head label="The banned list">
        What <span style={{color: R.red}}>never</span> ships
      </Head>
      <Abs x={36} y={200} style={{display: 'flex', gap: 16}}>
        {items.map(([t, prev], i) => (
          <In key={t} at={at(0.12) + i * at(0.11)} style={{width: 228}}>
            <div style={{position: 'relative', borderRadius: 20, background: R.card, border: `2px solid ${R.red}`, padding: 14}}>
              {prev}
              <div style={{position: 'absolute', left: 30, top: 38, padding: '4px 14px', border: `3px solid ${R.red}`, borderRadius: 8, color: R.red, fontWeight: 800, fontSize: 24, transform: 'rotate(-12deg)', background: 'rgba(20,8,10,0.75)', letterSpacing: 2}}>BANNED</div>
              <div style={{marginTop: 14, fontSize: 21, fontWeight: 600, lineHeight: 1.2, height: 52}}>{t}</div>
            </div>
          </In>
        ))}
      </Abs>
      <In at={at(0.72)} style={{position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center'}}>
        <Pill kind="white" size={24}>+ add one line each time a bad habit appears</Pill>
      </In>
    </RSlide>
  );
};

/* ===== 11. Files = states ===== */
export const StatesN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const nodes: [string, string, string][] = [
    ['brief.md', 'Director', R.teal],
    ['shotlist.md', 'Director', R.teal],
    ['APPROVED', 'You', R.white],
    ['index.html', 'Animator', R.orange],
    ['final.mp4', 'Renderer', R.violet],
    ['DELIVERED', 'Courier', R.blue],
  ];
  const prog = interpolate(f, [Dn * 0.2, Dn * 0.8], [0, 4], clamp);
  const xs = nodes.map((_, i) => 110 + i * 212);
  return (
    <RSlide vo={vo} bg="#0E1116">
      <Head label="Memory in files">
        A folder that <span style={{color: R.orange}}>knows where it is</span>
      </Head>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <line x1={xs[0]} y1={330} x2={xs[5]} y2={330} stroke="rgba(255,255,255,0.2)" strokeWidth={5} />
        <line x1={xs[0]} y1={330} x2={xs[0] + (xs[5] - xs[0]) * (prog / 5)} y2={330} stroke={R.orange} strokeWidth={5} />
      </svg>
      {nodes.map(([file, who, c], i) => {
        const reached = prog >= i;
        const here = Math.floor(prog) === i && prog < 5;
        return (
          <In key={file} at={at(0.1) + i * 6} tick={false} style={{position: 'absolute', left: xs[i] - 90, top: i % 2 ? 350 : 215, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
            <div style={{fontFamily: mono.fontFamily, fontSize: 19, padding: '8px 12px', borderRadius: 10, background: reached ? R.card : '#151515', border: `2px solid ${here ? '#fff' : reached ? c : R.line}`, color: reached ? '#fff' : R.dim}}>{file}</div>
            <div style={{fontSize: 16, color: c}}>{who}</div>
          </In>
        );
      })}
      {nodes.map(([, , c], i) => (
        <div key={i} style={{position: 'absolute', left: xs[i] - 13, top: 317, width: 26, height: 26, borderRadius: 13, background: prog >= i ? c : '#222', border: '3px solid #0E1116'}} />
      ))}
      <Abs x={Math.min(xs[0] + (xs[5] - xs[0]) * (prog / 5), xs[5]) - 20} y={304} style={{fontSize: 34}}>📁</Abs>
      <In at={at(0.82)} style={{position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center'}}>
        <Pill size={23}>Bots forget · chats scroll · files stay</Pill>
      </In>
    </RSlide>
  );
};

/* ===== 12. Shot list + approve ===== */
export const ShotlistN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const shots = ['Title slam', 'Logo wipe', 'Chart grows', 'Stat counter', 'Phone mock', 'Quote card', 'Timeline', 'Outro'];
  const approved = f > Dn * 0.78;
  return (
    <RSlide vo={vo} bg="#0D1020">
      <Sfx at={Math.round(Dn * 0.78)} name="pop2" vol={0.3} dur={30} />
      <Head label="Plan first">
        Shot list <span style={{color: R.orange}}>before</span> code
      </Head>
      <In at={at(0.08)} style={{position: 'absolute', left: 72, top: 190}}>
        <div style={{width: 760, borderRadius: 22, background: R.card, padding: '18px 22px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{fontFamily: mono.fontFamily, fontSize: 22, fontWeight: 600}}>shotlist.md</div>
            <Pill size={14} style={{background: R.orange}}>by Animator</Pill>
            <div style={{flex: 1}} />
            <Mono size={16} color={R.dim}>120 bpm · 8 shots</Mono>
          </div>
          <div style={{marginTop: 14, display: 'flex', gap: 4}}>
            {Array.from({length: 32}).map((_, i) => (
              <div key={i} style={{flex: 1, height: i % 4 === 0 ? 20 : 11, background: 'rgba(255,255,255,0.35)', borderRadius: 2, alignSelf: 'flex-end'}} />
            ))}
          </div>
          <div style={{marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
            {shots.map((s, i) => (
              <In key={s} at={at(0.2) + i * 6} tick={i % 2 === 0} style={{display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', borderRadius: 12, background: '#2A2A2A', fontSize: 20}}>
                <Mono size={16} color={R.dim}>{String(i + 1).padStart(2, '0')}</Mono>
                {s}
              </In>
            ))}
          </div>
        </div>
      </In>
      <Abs x={880} y={230} style={{width: 330, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
        <In at={at(0.5)}>
          <Pill size={28} style={{background: approved ? R.green : '#fff', color: approved ? '#fff' : R.bg, transform: approved ? 'scale(1.06)' : 'none'}}>
            {approved ? '✓ Approved' : 'Approve'}
          </Pill>
        </In>
        <In at={at(0.58)}>
          <div style={{textAlign: 'center', fontSize: 22, color: R.mute, lineHeight: 1.35}}>
            {approved ? 'Animator may start coding' : '🔒 Animator is locked until you approve'}
          </div>
        </In>
      </Abs>
    </RSlide>
  );
};

/* ===== 13. Frame-by-frame render ===== */
export const RenderN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const t = interpolate(f, [Dn * 0.15, Dn * 0.8], [0, 1], clamp);
  const k = Math.floor(t * 9);
  return (
    <RSlide vo={vo} bg="#0A1220">
      <Head label="Rendering">
        Each frame, <span style={{color: R.blue}}>painted alone</span>
      </Head>
      <In at={at(0.06)} tick={false} style={{position: 'absolute', left: 72, top: 190}}>
        <div style={{width: 430, borderRadius: 20, background: '#141414', border: `1.5px solid ${R.line}`, overflow: 'hidden'}}>
          <div style={{height: 200, background: '#EDEDED', position: 'relative'}}>
            <div style={{position: 'absolute', left: 30 + t * 330, top: 80, width: 50, height: 50, borderRadius: 25, background: R.orange}} />
          </div>
          <div style={{padding: '14px 20px'}}>
            <Mono size={20}>seek(t = {(t * 4).toFixed(2)})</Mono>
            <div style={{marginTop: 12, height: 8, borderRadius: 4, background: '#333', position: 'relative'}}>
              <div style={{position: 'absolute', left: `${t * 100}%`, top: -7, width: 22, height: 22, borderRadius: 11, background: '#fff', transform: 'translateX(-11px)'}} />
            </div>
          </div>
        </div>
      </In>
      <In at={at(0.3)} style={{position: 'absolute', left: 540, top: 215}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,56px)', gap: 8}}>
            {Array.from({length: 9}).map((_, i) => (
              <div key={i} style={{width: 56, height: 40, borderRadius: 8, background: i <= k ? R.blue : '#222', border: i === k ? '2px solid #fff' : '2px solid transparent', opacity: i <= k ? 1 : 0.6}} />
            ))}
          </div>
          <div style={{fontSize: 38, color: R.mute}}>→</div>
          <div style={{width: 130, height: 130, borderRadius: 22, background: R.card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4}}>
            <div style={{fontSize: 36}}>⚙</div>
            <Mono size={20}>ffmpeg</Mono>
          </div>
          <div style={{fontSize: 38, color: R.mute}}>→</div>
          <div style={{width: 120, height: 130, borderRadius: 18, background: '#fff', color: R.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4}}>
            <div style={{fontSize: 36}}>🎞</div>
            <Mono size={18} color={R.bg}>video.mp4</Mono>
          </div>
        </div>
      </In>
      <In at={at(0.62)} style={{position: 'absolute', left: 540, top: 400}}>
        <div style={{width: 640, borderRadius: 18, background: R.card, padding: '16px 22px', fontSize: 23, lineHeight: 1.4, color: R.mute}}>
          Slow frame? <span style={{color: '#fff'}}>It just takes longer.</span> Nothing is skipped, nothing drops.
        </div>
      </In>
    </RSlide>
  );
};

/* ===== 14. Motion blur ===== */
export const BlurN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const sq = (x: number, o = 1, c = '#fff') => <div style={{position: 'absolute', left: x, top: 22, width: 42, height: 42, borderRadius: 10, background: c, opacity: o}} />;
  return (
    <RSlide vo={vo} bg="#101A24">
      <Head label="Smooth motion">
        Four moments, <span style={{color: R.teal}}>one blended frame</span>
      </Head>
      <Abs x={72} y={200} style={{display: 'flex', alignItems: 'center', gap: 22}}>
        {[0, 1, 2, 3].map((i) => (
          <In key={i} at={at(0.12) + i * at(0.08)}>
            <div style={{width: 150}}>
              <div style={{position: 'relative', width: 150, height: 86, borderRadius: 14, background: '#E8E8E8', overflow: 'hidden'}}>
                {sq(14 + i * 28, 0.25, '#555')}
                {sq(14 + i * 28 + 0, 1, '#111')}
              </div>
              <div style={{marginTop: 8, textAlign: 'center', fontSize: 17, color: R.mute}}>moment {i + 1}</div>
            </div>
          </In>
        ))}
        <In at={at(0.5)}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Pill size={20}>average</Pill>
            <div style={{fontSize: 34, color: R.mute}}>→</div>
            <div style={{width: 190, height: 108, borderRadius: 16, background: '#E8E8E8', position: 'relative', boxShadow: `0 0 0 3px ${R.teal}`, overflow: 'hidden'}}>
              {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: 26 + i * 30, top: 32, width: 50, height: 50, borderRadius: 12, background: '#111', opacity: 0.28}} />)}
            </div>
          </div>
        </In>
      </Abs>
      <In at={at(0.7)} style={{position: 'absolute', left: 72, top: 400}}>
        <div style={{width: 760, borderRadius: 18, background: R.card, padding: '18px 24px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 20, color: R.mute}}>
            <span>Draft</span><span>Final with blur</span>
          </div>
          <div style={{marginTop: 10, display: 'flex', gap: 8}}>
            <div style={{width: 140, height: 18, borderRadius: 9, background: R.blue}} />
            <div style={{width: 540, height: 18, borderRadius: 9, background: R.orange}} />
          </div>
          <div style={{marginTop: 10, fontSize: 19, color: R.dim}}>Longer on a weak machine, but it always finishes.</div>
        </div>
      </In>
    </RSlide>
  );
};

/* ===== 15. Beats ===== */
export const BeatsN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const head = interpolate(f, [Dn * 0.15, Dn * 0.9], [0, 1], clamp);
  const N = 64;
  const colors = [R.teal, R.orange, R.violet, R.pink, R.blue];
  return (
    <RSlide vo={vo} bg="#120B1E">
      <Head label="Rhythm">
        Every change lands <span style={{color: R.pink}}>on a beat</span>
      </Head>
      <In at={at(0.08)} tick={false} style={{position: 'absolute', left: 72, top: 190}}>
        <div style={{width: 1136, height: 300, borderRadius: 22, background: '#1A1228', border: `1.5px solid ${R.line}`, padding: '18px 22px', position: 'relative'}}>
          <Mono size={16} color={R.dim}>song.mp3 · 120 bpm</Mono>
          <div style={{display: 'flex', alignItems: 'center', gap: 4, height: 100, marginTop: 8}}>
            {Array.from({length: N}).map((_, i) => (
              <div key={i} style={{flex: 1, height: 14 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 84, background: i / N < head ? R.pink : 'rgba(255,255,255,0.35)', borderRadius: 3}} />
            ))}
          </div>
          <div style={{position: 'absolute', left: 22 + head * 1092, top: 40, width: 3, height: 140, background: '#fff'}} />
          <div style={{marginTop: 16, display: 'flex', gap: 6}}>
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} style={{flex: 1, height: 44, borderRadius: 8, background: colors[i % 5], opacity: i / 16 < head ? 1 : 0.3}} />
            ))}
          </div>
          <div style={{marginTop: 14, display: 'flex', gap: 22}}>
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} style={{flex: 1, height: 18, borderLeft: '3px solid rgba(255,255,255,0.7)'}} />
            ))}
          </div>
        </div>
      </In>
      <In at={at(0.6)} style={{position: 'absolute', left: 72, top: 500}}>
        <Pill size={21}>🎧 Click track to check by ear</Pill>
      </In>
    </RSlide>
  );
};

/* ===== 16. Critic scores ===== */
export const CriticN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const scores: [string, number][] = [
    ['Opening hook', 8],
    ['Small-screen legibility', 9],
    ['Motion quality', 8],
    ['Variety', 7],
    ['Composition', 9],
    ['Brand fit', 8],
  ];
  return (
    <RSlide vo={vo} bg="#160E1C">
      <Head label="Quality gate">
        Six scores. <span style={{color: R.pink}}>All eight or better.</span>
      </Head>
      <In at={at(0.08)} tick={false} style={{position: 'absolute', left: 72, top: 190}}>
        <div style={{width: 360, borderRadius: 20, background: R.card, padding: 16}}>
          <Mono size={15} color={R.dim}>contact-sheet.png</Mono>
          <div style={{marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6}}>
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} style={{height: 42, borderRadius: 6, background: ['#2A3F66', '#5A3A66', '#66503A', '#3A6655'][i % 4]}} />
            ))}
          </div>
          <div style={{marginTop: 12, fontSize: 17, color: R.mute}}>Key frames, laid out in a grid</div>
        </div>
      </In>
      <Abs x={470} y={190} style={{width: 740}}>
        <div style={{position: 'relative'}}>
          {scores.map(([n, v], i) => (
            <In key={n} at={at(0.25) + i * at(0.09)} style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14}}>
              <div style={{width: 260, fontSize: 22}}>{n}</div>
              <div style={{flex: 1, height: 16, borderRadius: 8, background: '#2A2A2A', overflow: 'hidden'}}>
                <div style={{width: `${v * 10}%`, height: '100%', background: v >= 8 ? R.green : R.red, borderRadius: 8}} />
              </div>
              <div style={{width: 36, fontSize: 26, fontWeight: 700, color: v >= 8 ? R.green : R.red}}>{v}</div>
            </In>
          ))}
          <div style={{position: 'absolute', left: 276 + 0.8 * 366, top: -8, height: 296, borderLeft: '2px dashed rgba(255,255,255,0.6)'}} />
        </div>
      </Abs>
    </RSlide>
  );
};

/* ===== 17. Fix loop ===== */
export const LoopN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const round = Math.min(3, 1 + Math.floor(interpolate(f, [Dn * 0.15, Dn * 0.75], [0, 3], clamp)));
  const stop = f > Dn * 0.78;
  const nodes = [
    {x: 500, y: 190, r: ROLES[3]},
    {x: 760, y: 330, r: ROLES[1]},
    {x: 500, y: 400, r: ROLES[2]},
  ];
  return (
    <RSlide vo={vo} bg="#12121C">
      <Sfx at={Math.round(Dn * 0.78)} name="pop1" vol={0.3} dur={30} />
      <Head label="Fix loop">
        Three rounds, <span style={{color: R.orange}}>then ask you</span>
      </Head>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <path d="M600 250 Q720 250 760 320" stroke="rgba(255,255,255,0.4)" strokeWidth={3} fill="none" strokeDasharray="8 6" />
        <path d="M760 400 Q700 450 620 440" stroke="rgba(255,255,255,0.4)" strokeWidth={3} fill="none" strokeDasharray="8 6" />
        <path d="M480 400 Q400 330 470 262" stroke="rgba(255,255,255,0.4)" strokeWidth={3} fill="none" strokeDasharray="8 6" />
      </svg>
      {nodes.map((n, i) => (
        <In key={i} at={at(0.1) + i * 7} style={{position: 'absolute', left: n.x - 60, top: n.y - 20, width: 130, textAlign: 'center'}}>
          <Bot shape={n.r.shape} color={n.r.color} size={86} phase={i * 10} />
          <div style={{fontSize: 20, fontWeight: 600}}>{n.r.name}</div>
          <div style={{fontSize: 15, color: R.dim}}>{['3 issues found', 'fix the code', 're-render'][i]}</div>
        </In>
      ))}
      <In at={at(0.12)} style={{position: 'absolute', left: 72, top: 210}}>
        <div style={{width: 300, borderRadius: 22, background: R.card, padding: '18px 22px'}}>
          <Label>Review round</Label>
          <div style={{fontSize: 80, fontWeight: 600, lineHeight: 1.1}}>{round} <span style={{fontSize: 30, color: R.dim}}>/ 3</span></div>
          <div style={{display: 'flex', gap: 10, marginTop: 8}}>
            {[1, 2, 3].map((k) => (
              <div key={k} style={{width: 18, height: 18, borderRadius: 9, background: k <= round ? R.orange : '#333'}} />
            ))}
          </div>
        </div>
      </In>
      {stop && (
        <In at={Math.round(Dn * 0.78)} style={{position: 'absolute', left: 900, top: 230}}>
          <div style={{width: 300, borderRadius: 22, background: '#241616', border: `2px solid ${R.red}`, padding: '18px 22px', textAlign: 'center'}}>
            <div style={{fontSize: 46}}>⏸</div>
            <div style={{fontSize: 24, fontWeight: 600}}>Stopped</div>
            <div style={{fontSize: 19, color: R.mute}}>Over to you</div>
          </div>
        </In>
      )}
    </RSlide>
  );
};

/* ===== 18. The night ===== */
export const NightN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const p = interpolate(f, [Dn * 0.12, Dn * 0.82], [0, 1], clamp);
  const marks = ['21:00', '00:00', '03:00', '06:00', '08:00'];
  const hours = Math.floor(p * 11);
  return (
    <RSlide vo={vo} bg="linear-gradient(90deg,#060818 0%,#12184A 45%,#E58A5B 85%,#FFD38A 100%)">
      <Sfx at={Math.round(Dn * 0.84)} name="ding" vol={0.28} dur={40} />
      <Head label="One night">
        Approve at nine. <span style={{color: '#FFE08A'}}>Collect at eight.</span>
      </Head>
      <div style={{position: 'absolute', left: 90, right: 90, top: 330, height: 6, background: 'rgba(255,255,255,0.35)', borderRadius: 3}} />
      <div style={{position: 'absolute', left: 90, width: 1100 * p, top: 330, height: 6, background: '#fff', borderRadius: 3}} />
      {marks.map((m, i) => (
        <React.Fragment key={m}>
          <div style={{position: 'absolute', left: 90 + i * 275 - 2, top: 320, width: 4, height: 26, background: '#fff'}} />
          <Mono size={22} style={{position: 'absolute', left: 90 + i * 275 - 34, top: 358}}>{m}</Mono>
        </React.Fragment>
      ))}
      <div style={{position: 'absolute', left: 90 + 1100 * p - 26, top: 268, fontSize: 48}}>{p < 0.62 ? '🌙' : '☀️'}</div>
      <Abs x={90} y={200} style={{width: 1100, display: 'flex', justifyContent: 'space-between'}}>
        <In at={at(0.1)}><Pill kind="white" size={20}>✓ You approve the shot list</Pill></In>
      </Abs>
      <In at={at(0.3)} style={{position: 'absolute', left: 330, top: 430, display: 'flex', alignItems: 'center', gap: 14}}>
        <Bot shape="pillow" color={R.violet} size={64} />
        <div style={{background: 'rgba(0,0,0,0.5)', borderRadius: 16, padding: '10px 18px', fontSize: 21}}>Renderer checks the queue every hour · <span style={{color: R.green}}>{hours}×</span></div>
      </In>
      <In at={at(0.8)} style={{position: 'absolute', left: 700, top: 150, display: 'flex', alignItems: 'center', gap: 14}}>
        <Bot shape="drop" color={R.blue} size={64} />
        <div style={{background: '#fff', color: R.bg, borderRadius: 16, padding: '10px 18px', fontSize: 22, fontWeight: 600}}>final.mp4 delivered 🎞</div>
      </In>
    </RSlide>
  );
};

/* ===== 19. Risks ===== */
export const RisksN: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const cards: [string, string, string, React.ReactNode][] = [
    ['Usage runs out', 'Top up, or wait for the reset', '⚡', <div key="a" style={{height: 18, borderRadius: 9, background: '#2A2A2A'}}><div style={{width: '3%', height: '100%', background: R.red, borderRadius: 9}} /></div>],
    ['Render times out', 'Resume from last frame', '⏱', <Mono key="b" size={17} color={R.red}>✕ timed out at 58%</Mono>],
    ['Routine paused', 'Switch it back on in one click', '⏸', <div key="c" style={{width: 60, height: 30, borderRadius: 15, background: '#333', position: 'relative'}}><div style={{position: 'absolute', left: 4, top: 4, width: 22, height: 22, borderRadius: 11, background: '#aaa'}} /></div>],
  ];
  return (
    <RSlide vo={vo} bg="#1A100A">
      <Head label="Weak spots">
        Plan a <span style={{color: R.orange}}>fallback</span> for each
      </Head>
      <Abs x={72} y={190} style={{display: 'flex', gap: 24}}>
        {cards.map(([t, fb, ic, vis], i) => (
          <Card key={t} at={at(0.14) + i * at(0.14)} hl={R.orange} box={{width: 350, height: 300, padding: '22px 24px'}}>
            <div style={{fontSize: 44}}>{ic}</div>
            <div style={{fontSize: 28, fontWeight: 600, marginTop: 6}}>{t}</div>
            <div style={{marginTop: 16}}>{vis}</div>
            <div style={{marginTop: 22, borderTop: `1px solid ${R.line}`, paddingTop: 14}}>
              <Label color={R.green}>Fallback</Label>
              <div style={{fontSize: 20, color: R.mute, marginTop: 6, opacity: f > at(0.5) + i * 8 ? 1 : 0.2}}>{fb}</div>
            </div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== 20. Outro ===== */
export const OutroN: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo} bg="linear-gradient(#0A0D24,#1C1A3A)">
      <Sfx at={at(0.3)} name="ding" vol={0.25} dur={40} />
      <Abs x={0} y={70} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 34}}>
        {ROLES.map((r, i) => (
          <In key={r.name} at={at(0.05) + i * 6} tick={false}>
            <Bot shape={r.shape} color={r.color} size={110} phase={i * 10} />
          </In>
        ))}
      </Abs>
      <In at={at(0.2)} tick={false} style={{position: 'absolute', left: 0, right: 0, top: 262, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontSize: 76, fontWeight: 500, letterSpacing: -3}}>A studio that works while you sleep</div>
      </In>
      <In at={at(0.4)} style={{position: 'absolute', left: 0, right: 0, top: 392, display: 'flex', justifyContent: 'center'}}>
        <Pill kind="white" size={28}>Tonight: one bot, one shot list</Pill>
      </In>
    </RSlide>
  );
};
