import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Phone} from '../../lib/Art';
import {mono} from '../../lib/Art';
import {Sfx, clamp, typed, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {Bot} from './BotMark';
import {
  Abs,
  AppIcon,
  AppWindow,
  Avatar,
  Card,
  Head,
  IconCheck,
  IconSearch,
  In,
  IconClock,
  InputPill,
  Label,
  PanelHeading,
  PanelRow,
  Pill,
  R,
  RSlide,
  SiteNav,
  VoiceChatBlock,
} from './ui';
import type {BotSpec, Thread} from './ui';

/* ---------- shared invented cast ---------- */
export const CAST = {
  chief: {name: 'Chief', shape: 'drop', color: R.white},
  writer: {name: 'Writer', shape: 'pillow', color: R.pink},
  editor: {name: 'Editor', shape: 'blob', color: R.orange},
  designer: {name: 'Designer', shape: 'circle', color: R.violet},
  publisher: {name: 'Publisher', shape: 'drop', color: R.teal},
  assets: {name: 'Assets', shape: 'blob', color: R.green},
  topics: {name: 'Topic Picker', shape: 'circle', color: R.red},
  translator: {name: 'Translator', shape: 'pillow', color: R.blue},
} satisfies Record<string, BotSpec>;

export const THREADS: Thread[] = [
  {name: 'Chief', prev: 'Morning brief is ready', shape: 'drop', color: R.white, unread: true},
  {name: 'Writer', prev: 'Draft two is in the doc', shape: 'pillow', color: R.pink},
  {name: 'Editor', prev: 'Cut finished, 4:12 long', shape: 'blob', color: R.orange},
  {name: 'Designer', prev: 'Covers exported in 3 sizes', shape: 'circle', color: R.violet},
  {name: 'Publisher', prev: 'Scheduled for 5:30 PM', shape: 'drop', color: R.teal},
  {name: 'Assets', prev: 'Found 12 new clips', shape: 'blob', color: R.green},
];

/* ===== Zero to one ===== */
export const ZeroR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const steps: [string, string, string][] = [
    ['Start', 'Zero-basics beginner', 'No code, no background'],
    ['Step 1', 'Watch this once', 'Start to finish, no rush'],
    ['Step 2', 'Follow along', 'Same screens, same clicks'],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Zero to one">
        From zero to a <span style={{color: R.pink}}>company of one</span>
      </Head>
      <Abs x={72} y={230} style={{display: 'flex', alignItems: 'center', gap: 14}}>
        {steps.map(([l, t, s], i) => (
          <React.Fragment key={t}>
            <Card at={at(0.14) + i * at(0.15)} box={{width: 300, height: 170}} hl={i === 2 ? R.pink : undefined}>
              <Label>{l}</Label>
              <div style={{fontSize: 31, fontWeight: 500, marginTop: 10, lineHeight: 1.12}}>{t}</div>
              <div style={{fontSize: 19, color: R.dim, marginTop: 10}}>{s}</div>
            </Card>
            {i < 2 && <div style={{fontSize: 34, color: R.dim}}>→</div>}
          </React.Fragment>
        ))}
      </Abs>
      <In at={at(0.6)} style={{position: 'absolute', left: 72, top: 450}}>
        <Pill kind="white" size={26}>
          You don't need to code
        </Pill>
      </In>
      <In at={at(0.5)} tick={false} style={{position: 'absolute', left: 1020, top: 90}}>
        <Bot shape="drop" color={R.white} size={170} />
      </In>
    </RSlide>
  );
};

/* ===== How agents evolved ===== */
export const EvolveR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const labels: [string, string, string][] = [
    ['Before', 'Chat box', 'You ask, it answers'],
    ['Then', 'Coding agent', 'Powerful, high barrier'],
    ['Now', 'Personal agent', 'Works inside your business'],
  ];
  const bubble = (w: string, me?: boolean) => (
    <div style={{height: 22, width: w, borderRadius: me ? 9999 : 10, background: me ? R.user : '#262626', alignSelf: me ? 'flex-end' : 'flex-start'}} />
  );
  return (
    <RSlide vo={vo}>
      <Head label="AI agents" size={50}>
        How agents <span style={{color: R.teal}}>evolved</span>
      </Head>
      <Abs x={72} y={190} style={{display: 'flex', gap: 34}}>
        <In at={at(0.1)}>
          <div style={{width: 340, height: 190, borderRadius: 22, background: R.card2, border: `1px solid ${R.line}`, padding: 18, display: 'flex', flexDirection: 'column', gap: 10}}>
            {bubble('62%')}
            {bubble('50%', true)}
            {bubble('78%')}
            {bubble('42%', true)}
          </div>
        </In>
        <In at={at(0.24)}>
          <div style={{width: 340, height: 190, borderRadius: 22, background: '#0D0D0D', border: `1px solid ${R.line}`, padding: 18, fontFamily: mono.fontFamily, fontSize: 16, lineHeight: 1.7}}>
            <div style={{color: R.blue}}>{'$ agent run --deep'}</div>
            <div style={{color: R.green, paddingLeft: 12}}>{'build · test · lint'}</div>
            <div style={{color: R.pink, paddingLeft: 12}}>{'deploy --prod'}</div>
            <div style={{color: R.dim}}>{'# high barrier'}</div>
          </div>
        </In>
        <In at={at(0.4)}>
          <div style={{width: 340, height: 190, borderRadius: 22, background: R.card, border: `2px solid ${R.teal}`, boxShadow: `0 0 50px ${R.teal}33`, position: 'relative', overflow: 'hidden'}}>
            <Abs x={112} y={36}>
              <Bot shape="drop" color={R.white} size={116} />
            </Abs>
            {[
              [20, 20, R.pink],
              [286, 26, R.blue],
              [290, 130, R.green],
              [24, 132, R.orange],
            ].map(([x, y, c], i) => (
              <Abs key={i} x={x as number} y={(y as number) + Math.sin((f + i * 9) / 12) * 5}>
                <div style={{width: 32, height: 32, borderRadius: 10, background: c as string}} />
              </Abs>
            ))}
          </div>
        </In>
      </Abs>
      <Abs x={72} y={412} style={{display: 'flex', gap: 34}}>
        {labels.map(([l, t, s], i) => (
          <Card key={t} at={at(0.2) + i * at(0.14)} box={{width: 340, padding: '12px 20px'}} hl={i === 2 ? R.teal : undefined}>
            <Label color={i === 2 ? R.teal : R.dim}>{l}</Label>
            <div style={{fontSize: 27, fontWeight: 500, marginTop: 4}}>{t}</div>
            <div style={{fontSize: 17, color: R.dim, marginTop: 2}}>{s}</div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== Install: website download + sign in ===== */
export const InstallR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const prog = interpolate(f, [at(0.25), at(0.5)], [0, 100], clamp);
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.78)} name="ding" vol={0.25} dur={40} />
      <Abs x={90} y={34}>
        <In at={at(0.04)} tick={false}>
          <div style={{width: 1100, height: 500, borderRadius: 18, background: R.bg, border: `1.5px solid ${R.line}`, overflow: 'hidden', boxShadow: '0 30px 90px rgba(0,0,0,0.7)', position: 'relative'}}>
            <div style={{display: 'flex', gap: 8, padding: '10px 16px', background: '#141414', alignItems: 'center'}}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{width: 12, height: 12, borderRadius: 6, background: '#333'}} />
              ))}
              <div style={{marginLeft: 16, flex: 1, maxWidth: 420, height: 26, borderRadius: 13, background: '#222', color: R.dim, fontSize: 14, display: 'flex', alignItems: 'center', padding: '0 14px'}}>
                official-site.example/bot
              </div>
            </div>
            <SiteNav />
            <Abs x={50} y={130}>
              <div style={{fontSize: 62, fontWeight: 500, letterSpacing: -2, lineHeight: 1.05}}>
                Your Bot,
                <br />
                on your desktop.
              </div>
              <div style={{display: 'flex', gap: 12, marginTop: 28}}>
                <In at={at(0.14)}>
                  <Pill kind="white" size={24}>
                    Download ⌄
                  </Pill>
                </In>
                <Pill size={24}>Windows</Pill>
                <Pill size={24}>macOS</Pill>
              </div>
              <In at={at(0.25)} tick={false} style={{marginTop: 26, width: 420}}>
                <div style={{fontSize: 15, color: R.mute, display: 'flex', justifyContent: 'space-between'}}>
                  <span>Downloading installer…</span>
                  <span>{Math.round(prog)}%</span>
                </div>
                <div style={{height: 8, borderRadius: 4, background: R.card, marginTop: 8}}>
                  <div style={{width: `${prog}%`, height: '100%', borderRadius: 4, background: '#fff'}} />
                </div>
              </In>
            </Abs>
            <In at={at(0.55)} style={{position: 'absolute', left: 640, top: 190}}>
              <div style={{width: 360, borderRadius: 24, background: R.card, border: `1px solid ${R.line}`, padding: 26, boxShadow: '0 24px 70px rgba(0,0,0,0.6)'}}>
                <div style={{fontSize: 26, fontWeight: 500}}>Sign in</div>
                <div style={{marginTop: 14, height: 46, borderRadius: 12, background: R.bg, border: `1px solid ${R.line}`, color: R.mute, fontSize: 17, display: 'flex', alignItems: 'center', padding: '0 14px'}}>
                  {typed('you@example.com', f, at(0.6), 14)}
                  <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>▌</span>
                </div>
                <Pill kind="white" size={20} style={{marginTop: 16, width: '100%', justifyContent: 'center', boxSizing: 'border-box'}}>
                  Continue
                </Pill>
              </div>
            </In>
          </div>
        </In>
      </Abs>
    </RSlide>
  );
};

/* ===== What it is: assistant, not a chat box ===== */
export const WhatR: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Abs x={72} y={30} style={{display: 'flex', gap: 12}}>
        <In at={at(0.12)}>
          <Pill size={22} style={{textDecoration: 'line-through', color: R.dim}}>
            Another chat box
          </Pill>
        </In>
        <In at={at(0.26)}>
          <Pill size={22} style={{textDecoration: 'line-through', color: R.dim}}>
            A coding agent
          </Pill>
        </In>
        <In at={at(0.42)}>
          <Pill kind="white" size={22}>
            ✓ A truly smart assistant
          </Pill>
        </In>
      </Abs>
      <Abs x={72} y={96}>
        <AppWindow
          h={430}
          threads={THREADS}
          active={0}
          bot={CAST.chief}
          msgs={[
            {who: 'me', text: 'Plan my week around the launch', at: at(0.1)},
            {who: 'bot', text: 'Done. I moved two meetings, blocked Thursday for the launch, and asked Writer for a first draft.', at: at(0.3)},
            {who: 'bot', text: 'Want a reminder on Wednesday evening to review it?', at: at(0.5)},
          ]}
          input={{placeholder: 'Message Chief'}}
          panel={
            <>
              <PanelHeading right="Hide">Suggested</PanelHeading>
              <PanelRow icon={<IconClock s={16} />} chevron>
                Create a routine
              </PanelRow>
              <PanelHeading>Computer</PanelHeading>
              <PanelRow>
                <div style={{fontSize: 14, fontWeight: 500}}>Bot's computer</div>
                <div style={{fontSize: 12, color: R.dim}}>Awake</div>
              </PanelRow>
              <VoiceChatBlock />
            </>
          }
        />
      </Abs>
    </RSlide>
  );
};

/* ===== First bot in four steps ===== */
export const FirstR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const steps = ['New', 'Pick an avatar', 'Give it a name', 'Set its rules'];
  const cur = f < at(0.22) ? 0 : f < at(0.42) ? 1 : f < at(0.62) ? 2 : 3;
  const grid: [BotSpec['shape'], string][] = [
    ['drop', R.white],
    ['blob', R.pink],
    ['circle', R.blue],
    ['pillow', R.orange],
    ['drop', R.green],
    ['blob', R.violet],
    ['circle', R.teal],
    ['pillow', R.red],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Your first Bot" size={50}>
        Four <span style={{color: R.blue}}>steps</span>
      </Head>
      <Abs x={72} y={190} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        {steps.map((s, i) => (
          <In key={s} at={at(0.1) + i * at(0.06)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, width: 360, padding: '12px 18px', borderRadius: 9999, background: i === cur ? '#fff' : R.card, color: i === cur ? R.bg : i < cur ? R.mute : '#fff', fontSize: 23, fontWeight: 500}}>
              <div style={{width: 34, height: 34, borderRadius: 17, background: i === cur ? R.bg : '#2d2d2d', color: i === cur ? '#fff' : R.mute, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18}}>
                {i < cur ? '✓' : i + 1}
              </div>
              {s}
            </div>
          </In>
        ))}
      </Abs>
      <In at={at(0.1)} style={{position: 'absolute', left: 520, top: 60}}>
        <div style={{width: 690, height: 440, borderRadius: 28, background: '#161616', border: `1px solid ${R.line}`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)', overflow: 'hidden', position: 'relative'}}>
          <div style={{height: 150, background: 'linear-gradient(135deg,#1d1d1d,#2a2030)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Bot shape={cur >= 1 ? 'blob' : 'drop'} color={cur >= 1 ? R.blue : R.white} size={110} />
          </div>
          <div style={{padding: '22px 34px'}}>
            {cur === 0 && (
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: 30, fontWeight: 500}}>Create a new Bot</div>
                <div style={{fontSize: 19, color: R.dim, marginTop: 8}}>A teammate with one job.</div>
                <Pill kind="white" size={22} style={{marginTop: 22}}>
                  + New Bot
                </Pill>
              </div>
            )}
            {cur === 1 && (
              <div>
                <div style={{fontSize: 22, color: R.mute, marginBottom: 12}}>Choose an avatar</div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12}}>
                  {grid.map(([s, c], i) => (
                    <div key={i} style={{height: 84, borderRadius: 18, background: R.card, border: i === 1 ? `2px solid #fff` : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <Bot shape={s} color={c} size={54} bob={0} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cur === 2 && (
              <div>
                <div style={{fontSize: 22, color: R.mute, marginBottom: 12}}>Name</div>
                <div style={{height: 60, borderRadius: 16, background: R.bg, border: `1.5px solid ${R.line}`, fontSize: 28, display: 'flex', alignItems: 'center', padding: '0 20px'}}>
                  {typed('Translator', f, at(0.44), 7)}
                  <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>▌</span>
                </div>
                <Sfx at={at(0.44)} name="typing" vol={0.25} dur={60} />
              </div>
            )}
            {cur === 3 && (
              <div>
                <div style={{fontSize: 22, color: R.mute, marginBottom: 12}}>Rules</div>
                {['Translate everything into plain English', 'Keep names and numbers untouched', 'Ask me before sending anything out'].map((r, i) => (
                  <In key={r} at={at(0.64) + i * 8}>
                    <div style={{display: 'flex', gap: 12, alignItems: 'center', background: R.card, borderRadius: 14, padding: '10px 16px', marginBottom: 8, fontSize: 19}}>
                      <IconCheck s={20} c="#fff" />
                      {r}
                    </div>
                  </In>
                ))}
              </div>
            )}
          </div>
        </div>
      </In>
      <Sfx at={at(0.86)} name="ding" vol={0.25} dur={40} />
    </RSlide>
  );
};

/* ===== Marketplace ===== */
const MARKET_FEATURED: {n: string; by: string; shape: BotSpec['shape']; c: string}[] = [
  {n: 'Launch Planner', by: 'Ana Rowe', shape: 'drop', c: R.red},
  {n: 'Overheard', by: 'Sam Weiss', shape: 'blob', c: R.orange},
  {n: 'Tidy Notes', by: 'Mia Chen', shape: 'pillow', c: R.violet},
  {n: 'Projects Manager', by: 'Leo Park', shape: 'circle', c: R.pink},
];
export const DirectoryR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const cats = ['All', 'Engineering', 'Sales', 'Marketing', 'Design', 'Personal', 'Recruiting', 'Operations'];
  const rows: [string, string, BotSpec['shape'], string][] = [
    ['Outbound Helper', 'Finds prospects that match your ideal customer', 'blob', R.pink],
    ['SEO Desk', 'Turns keywords into briefs your writers can use', 'drop', R.green],
    ['Haggle Bot', 'Checks your subscriptions and finds savings', 'circle', R.grey],
    ['Hiring Coordinator', 'Schedules interview loops, preps your notes', 'pillow', R.red],
  ];
  const added = f > at(0.72);
  return (
    <RSlide vo={vo}>
      <Abs x={72} y={22}>
        <In at={3} tick={false}>
          <div style={{fontSize: 44, fontWeight: 500, letterSpacing: -1.2}}>Marketplace</div>
        </In>
      </Abs>
      <Abs x={72} y={84} style={{display: 'flex', gap: 10}}>
        {cats.map((c, i) => (
          <In key={c} at={at(0.04) + i * 3} tick={i === 0}>
            <Pill kind={i === 0 ? 'white' : 'dark'} size={17}>
              {c}
            </Pill>
          </In>
        ))}
      </Abs>
      <Abs x={72} y={142} style={{display: 'flex', gap: 22}}>
        {MARKET_FEATURED.map((b, i) => (
          <In key={b.n} at={at(0.12) + i * at(0.06)}>
            <div style={{width: 256, height: 200, borderRadius: 24, background: R.card2, border: `1px solid ${R.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <Bot shape={b.shape} color={b.c} size={100} phase={i * 11} />
              <div style={{color: b.c, fontWeight: 500, fontSize: 20, marginTop: 10}}>{b.n}</div>
              <div style={{color: R.dim, fontSize: 14, marginTop: 2}}>by {b.by}</div>
            </div>
          </In>
        ))}
      </Abs>
      <Abs x={72} y={358}>
        <In at={at(0.3)} tick={false}>
          <div style={{fontSize: 22, fontWeight: 500}}>From the Bot team</div>
        </In>
      </Abs>
      <Abs x={72} y={394} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40, rowGap: 12, width: 1136}}>
        {rows.map(([n, d, s, c], i) => (
          <In key={n} at={at(0.34) + i * at(0.05)}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, height: 52}}>
              <Bot shape={s} color={c} size={42} bob={0} />
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 18, fontWeight: 500}}>{n}</div>
                <div style={{fontSize: 14, color: R.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{d}</div>
              </div>
              <Pill kind={i === 0 && added ? 'white' : 'dark'} size={16}>
                {i === 0 && added ? '✓ Added' : 'Add'}
              </Pill>
            </div>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== Connect Apps dialog over the app ===== */
export const ConnectR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const apps: [string, string, string, string, boolean][] = [
    ['Notion', 'N', '#FFFFFF', R.bg, true],
    ['Calendar', '31', '#3B82F6', '#fff', false],
    ['Mail', '✉', '#E0398E', '#fff', false],
    ['Sheets', '▦', '#0F9D58', '#fff', false],
    ['Drive', '△', '#F4B400', R.bg, false],
    ['Chat', '#', '#4A154B', '#fff', false],
  ];
  const doneIdx = f > at(0.55) ? 1 : -1;
  const cats = ['All', 'Productivity', 'Communication', 'Design', 'Code', 'More ⌄'];
  return (
    <RSlide vo={vo}>
      <Abs x={72} y={30} style={{filter: 'blur(2px) brightness(0.45)'}}>
        <AppWindow h={490} threads={THREADS} active={1} bot={CAST.writer} msgs={[]} input={{}} />
      </Abs>
      <In at={at(0.06)} tick={false} style={{position: 'absolute', left: 250, top: 28}}>
        <div style={{width: 780, height: 440, borderRadius: 26, background: '#1A1A1A', border: `1px solid ${R.line}`, boxShadow: '0 40px 100px rgba(0,0,0,0.8)', padding: '24px 32px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontSize: 28, fontWeight: 500}}>Connect Apps</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, color: R.mute, fontSize: 16}}>
              <div style={{display: 'flex'}}>
                {[R.pink, R.blue, R.green].map((c, i) => (
                  <div key={i} style={{width: 26, height: 26, borderRadius: 13, background: c, marginLeft: i ? -8 : 0, border: '2px solid #1A1A1A'}} />
                ))}
              </div>
              {doneIdx >= 0 ? 8 : 7} connected ›
            </div>
          </div>
          <div style={{display: 'flex', gap: 12, marginTop: 16}}>
            <div style={{flex: 1, height: 44, borderRadius: 9999, background: R.bg, border: `1px solid ${R.line}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', color: R.dim, fontSize: 17}}>
              <IconSearch s={17} />
              Search across apps and skills
            </div>
            <Pill size={16}>Bot templates ↗</Pill>
          </div>
          <div style={{display: 'flex', gap: 8, marginTop: 14}}>
            {cats.map((c, i) => (
              <Pill key={c} kind={i === 0 ? 'white' : 'dark'} size={15}>
                {c}
              </Pill>
            ))}
          </div>
          <div style={{fontSize: 18, fontWeight: 500, marginTop: 20}}>Recommended for you</div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 44, rowGap: 12, marginTop: 14}}>
            {apps.map(([n, ic, bg, fg, on], i) => {
              const connected = on || i === doneIdx;
              return (
                <In key={n} at={at(0.14) + i * at(0.05)}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 14, height: 48}}>
                    <AppIcon name={ic} bg={bg} fg={fg} size={44} />
                    <div style={{flex: 1, fontSize: 18, fontWeight: 500}}>{n}</div>
                    {connected ? (
                      <div style={{color: R.mute, fontSize: 15, display: 'flex', gap: 6, alignItems: 'center'}}>
                        <IconCheck s={15} /> Connected
                      </div>
                    ) : (
                      <Pill size={15}>Connect</Pill>
                    )}
                  </div>
                </In>
              );
            })}
          </div>
        </div>
      </In>
      <Sfx at={at(0.55)} name="ding" vol={0.22} dur={40} />
    </RSlide>
  );
};

/* ===== Same bot on laptop + phone ===== */
export const DevicesR: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Abs x={50} y={50}>
        <In at={at(0.05)} tick={false}>
          <AppWindow
            w={760}
            h={400}
            threads={THREADS.slice(0, 5)}
            active={0}
            bot={CAST.chief}
            fs={14}
            msgs={[
              {who: 'me', text: 'Remind me to send the invoice', at: at(0.4)},
              {who: 'bot', text: 'Done. Friday, 9:00.', at: at(0.5)},
            ]}
            input={{}}
          />
        </In>
      </Abs>
      <Abs x={880} y={24}>
        <In at={at(0.2)} tick={false}>
          <Phone w={250} h={480} glow="rgba(255,255,255,0.18)">
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', padding: '44px 12px 14px', gap: 10, justifyContent: 'flex-end'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, position: 'absolute', top: 40, left: 14}}>
                <Bot shape="drop" color={R.white} size={30} bob={1} />
                <div style={{fontSize: 16, fontWeight: 500}}>Chief</div>
              </div>
              <In at={at(0.34)}>
                <div style={{alignSelf: 'flex-end', background: R.user, borderRadius: 9999, padding: '8px 14px', fontSize: 14, marginLeft: 40}}>Remind me to send the invoice</div>
              </In>
              <In at={at(0.44)}>
                <div style={{background: '#161616', borderRadius: 14, padding: '10px 12px', fontSize: 14}}>Done. Friday, 9:00.</div>
              </In>
              <InputPill placeholder="Message Chief" w={222} size={12} />
            </div>
          </Phone>
        </In>
      </Abs>
      <In at={at(0.55)} style={{position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center'}}>
        <Pill kind="white" size={22}>
          ⟷ Same Bot, every device
        </Pill>
      </In>
    </RSlide>
  );
};

/* ===== Chapter card ===== */
export const ChapterR: React.FC<P & {num: string; title: string; color: string; shape: BotSpec['shape']}> = ({vo, num, title, color, shape}) => {
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <AbsoluteFill style={{overflow: 'hidden'}}>
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: -((f * 1.1 + i * 130) % 800), top: i * 92 - 20, whiteSpace: 'nowrap', fontSize: 80, fontWeight: 500, color: 'rgba(255,255,255,0.035)', letterSpacing: 2}}>
            {(title + '   ').repeat(8).toUpperCase()}
          </div>
        ))}
      </AbsoluteFill>
      <In at={4} tick={false} style={{position: 'absolute', left: 90, top: 190}}>
        <div style={{fontSize: 220, fontWeight: 500, color, lineHeight: 1, letterSpacing: -8}}>{num}</div>
        <div style={{fontSize: 88, fontWeight: 500, lineHeight: 1.05, letterSpacing: -2, marginTop: 4, maxWidth: 700}}>{title}</div>
      </In>
      <In at={8} tick={false} style={{position: 'absolute', left: 820, top: 110}}>
        <Bot shape={shape} color={color} size={330} bob={10} />
      </In>
    </RSlide>
  );
};

/* ===== Bot detail page: a job description is a skill ===== */
export const JobR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const tabs = ['Memories', 'Skills', 'Routines', 'Integrations'];
  const skill = 'Every morning at 8:00, collect the five best story ideas from my feeds, rank them by reach, and send me the top pick with a one-line reason.';
  return (
    <RSlide vo={vo}>
      <Abs x={72} y={26}>
        <div style={{fontSize: 17, color: R.dim}}>‹ Back to Bot Marketplace</div>
      </Abs>
      <In at={at(0.05)} style={{position: 'absolute', left: 72, top: 80}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div style={{position: 'relative'}}>
            <Bot shape="circle" color={R.red} size={130} />
            <div style={{position: 'absolute', right: -6, bottom: 8, width: 38, height: 38, borderRadius: 19, background: R.card, border: `3px solid ${R.bg}`}} />
          </div>
          <div>
            <div style={{fontSize: 44, fontWeight: 500, letterSpacing: -1}}>Topic Picker</div>
            <div style={{fontSize: 18, color: R.mute, marginTop: 4}}>
              By You <span style={{color: R.blue}}>✓</span> · Sends the best ideas every morning
            </div>
          </div>
          <Pill kind="white" size={20} style={{marginLeft: 40}}>
            Import Bot
          </Pill>
        </div>
      </In>
      <Abs x={72} y={250} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {tabs.map((t, i) => (
          <In key={t} at={at(0.2) + i * 5}>
            <div style={{width: 240, padding: '11px 20px', borderRadius: 9999, fontSize: 21, background: i === 1 ? R.card : 'transparent', color: i === 1 ? '#fff' : R.dim, fontWeight: 500}}>{t}</div>
          </In>
        ))}
      </Abs>
      <In at={at(0.3)} style={{position: 'absolute', left: 360, top: 250}}>
        <div style={{width: 830, height: 270, borderRadius: 26, background: R.card, padding: '24px 30px', boxSizing: 'border-box'}}>
          <Label>Skill · job description</Label>
          <div style={{fontSize: 29, lineHeight: 1.35, marginTop: 14}}>
            {typed(skill, f, at(0.36), 46)}
            <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>▌</span>
          </div>
          <Sfx at={at(0.36)} name="typing" vol={0.22} dur={90} />
        </div>
      </In>
    </RSlide>
  );
};

/* ===== Handoff pipeline ===== */
export const HandoffR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const roles: [BotSpec, string][] = [
    [CAST.topics, 'Picks a topic'],
    [CAST.writer, 'Writes the script'],
    [CAST.designer, 'Designs the cover'],
    [CAST.editor, 'Edits the video'],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Handoff" size={48}>
        Jobs hand work to <span style={{color: R.orange}}>each other</span>
      </Head>
      <Abs x={72} y={170} style={{display: 'flex', alignItems: 'center', gap: 10}}>
        {roles.map(([b, t], i) => (
          <React.Fragment key={b.name}>
            <Card at={at(0.1) + i * at(0.12)} box={{width: 230, height: 190, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 10px'}}>
              <Bot shape={b.shape} color={b.color} size={90} phase={i * 14} />
              <div style={{fontSize: 21, fontWeight: 500, marginTop: 8}}>{b.name}</div>
              <div style={{fontSize: 15, color: R.dim, marginTop: 2}}>{t}</div>
            </Card>
            {i < 3 && (
              <In at={at(0.16) + i * at(0.12)} tick={false}>
                <div style={{fontSize: 36, color: '#fff'}}>→</div>
              </In>
            )}
          </React.Fragment>
        ))}
      </Abs>
      <Abs x={72} y={400}>
        <In at={at(0.58)}>
          <div style={{fontSize: 26, color: R.mute}}>Each role is a mature skill, like an employee handbook:</div>
        </In>
      </Abs>
      <Abs x={72} y={446} style={{display: 'flex', gap: 12}}>
        {['Use it first', '+ Add rules', '+ Add limits', 'Sharper every time'].map((t, i) => (
          <In key={t} at={at(0.64) + i * at(0.07)}>
            <Pill kind={i === 3 ? 'white' : 'dark'} size={22}>
              {t}
            </Pill>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== Open source repo page ===== */
export const OpenSourceR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const files: [string, string][] = [
    ['SKILL.md', 'The design Skill'],
    ['examples/', 'Cover layouts, every size'],
    ['docs/beginner-guide.md', 'Written to go with it'],
    ['LICENSE', 'Open source, free to use'],
  ];
  return (
    <RSlide vo={vo}>
      <In at={at(0.06)} style={{position: 'absolute', left: 130, top: 40}}>
        <div style={{width: 1020, height: 480, borderRadius: 22, background: '#0F0F0F', border: `1.5px solid ${R.line}`, boxShadow: '0 30px 90px rgba(0,0,0,0.7)', padding: '28px 36px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Bot shape="pillow" color={R.violet} size={64} />
            <div style={{fontSize: 36, fontWeight: 500, letterSpacing: -0.8}}>design-skill</div>
            <Pill kind="ghost" size={16}>
              Public
            </Pill>
            <div style={{flex: 1}} />
            <Pill size={18}>★ Star</Pill>
            <Pill kind="white" size={18}>
              Use this skill
            </Pill>
          </div>
          <div style={{fontSize: 20, color: R.mute, marginTop: 14}}>A designer Bot's handbook. Fully open source.</div>
          <div style={{marginTop: 22, borderRadius: 16, border: `1px solid ${R.line}`, overflow: 'hidden'}}>
            {files.map(([n, d], i) => (
              <In key={n} at={at(0.2) + i * at(0.08)}>
                <div style={{display: 'flex', gap: 20, padding: '14px 20px', fontSize: 20, borderTop: i ? `1px solid ${R.line}` : 'none', background: i === 2 ? 'rgba(128,78,224,0.16)' : 'transparent'}}>
                  <div style={{width: 340, fontFamily: mono.fontFamily, fontSize: 18}}>{n}</div>
                  <div style={{color: R.mute}}>{d}</div>
                </div>
              </In>
            ))}
          </div>
        </div>
      </In>
    </RSlide>
  );
};
