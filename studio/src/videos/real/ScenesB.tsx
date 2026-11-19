import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {mono} from '../../lib/Art';
import {Sfx, clamp, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {Bot} from './BotMark';
import {
  Abs,
  AppWindow,
  Card,
  Head,
  IconCheck,
  IconClock,
  IconWave,
  In,
  InputPill,
  Label,
  PanelHeading,
  PanelRow,
  Pill,
  R,
  RSlide,
} from './ui';
import type {BotSpec} from './ui';
import {CAST} from './ScenesA';

/* ===== Manager bot org chart ===== */
export const ManagerR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const kids: [BotSpec, string][] = [
    [CAST.writer, 'Content'],
    [CAST.designer, 'Design'],
    [CAST.publisher, 'Publishing'],
  ];
  const xs = [240, 640, 1040];
  return (
    <RSlide vo={vo}>
      <Head label="Departments" size={48}>
        A <span style={{color: R.violet}}>manager Bot</span> for big departments
      </Head>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        {xs.map((x, i) => (
          <path key={i} d={`M640 262 C640 300 ${x} 290 ${x} 330`} stroke="rgba(255,255,255,0.35)" strokeWidth={2.5} fill="none" strokeDasharray="6 6" />
        ))}
      </svg>
      <In at={at(0.12)} style={{position: 'absolute', left: 540, top: 150}}>
        <div style={{width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Bot shape="pillow" color={R.violet} size={96} />
          <Pill kind="white" size={17} style={{marginTop: 4}}>
            Manager
          </Pill>
        </div>
      </In>
      {kids.map(([b, t], i) => (
        <In key={b.name} at={at(0.26) + i * at(0.1)} style={{position: 'absolute', left: xs[i] - 150, top: 330}}>
          <div style={{width: 300, borderRadius: 24, background: R.card, border: `1px solid ${R.line}`, padding: '16px 0 18px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Label>{t}</Label>
            <Bot shape={b.shape} color={b.color} size={72} phase={i * 13} />
            <div style={{display: 'flex', gap: 8, marginTop: 6}}>
              {[0, 1, 2].map((k) => (
                <Bot key={k} shape={(['drop', 'blob', 'circle'] as const)[k]} color={b.color} size={30} phase={k * 8 + i * 5} bob={2} style={{opacity: 0.8}} />
              ))}
            </div>
          </div>
        </In>
      ))}
      <In at={at(0.62)} style={{position: 'absolute', left: 72, top: 508}}>
        <div style={{fontSize: 22, color: R.mute}}>
          You can't direct every employee yourself. <span style={{color: '#fff'}}>Scheduling is the key.</span>
        </div>
      </In>
    </RSlide>
  );
};

/* ===== Bot's computer: fixed script on a Windows PC ===== */
export const ComputerR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const {durationInFrames: Dn} = useVideoConfig();
  const lines = ['$ scan desktop/assets', '  12 clips found', '$ cut --merge', '  rendering 4:12 …', '$ publish --links', '  done'];
  const shown = Math.floor(interpolate(f, [Dn * 0.22, Dn * 0.85], [0, lines.length], clamp));
  return (
    <RSlide vo={vo}>
      <Sfx at={Math.round(Dn * 0.85)} name="ding" vol={0.25} dur={40} />
      <In at={at(0.06)} tick={false} style={{position: 'absolute', left: 120, top: 36}}>
        <div style={{width: 1040, height: 470, borderRadius: 20, background: '#101010', border: `1.5px solid ${R.line}`, overflow: 'hidden', boxShadow: '0 30px 90px rgba(0,0,0,0.7)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: '#181818', borderBottom: `1px solid ${R.line}`}}>
            <Bot shape="blob" color={R.green} size={30} bob={1} />
            <div style={{fontSize: 20, fontWeight: 500}}>Bot's computer</div>
            <div style={{fontSize: 15, color: R.green}}>● Awake</div>
            <div style={{flex: 1}} />
            <Pill size={15}>Windows PC</Pill>
          </div>
          <div style={{display: 'flex', height: 410}}>
            <div style={{width: 300, padding: 22, borderRight: `1px solid ${R.line}`}}>
              <Label>Fixed script</Label>
              <div style={{fontSize: 28, fontWeight: 500, marginTop: 8}}>Video tool</div>
              <div style={{marginTop: 18, height: 130, borderRadius: 18, border: '2px dashed rgba(255,255,255,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: R.mute, fontSize: 18}}>
                <div style={{fontSize: 34}}>⬆</div>
                Drop assets here
              </div>
              <Pill kind="white" size={20} style={{marginTop: 18, width: '100%', justifyContent: 'center', boxSizing: 'border-box'}}>
                Start
              </Pill>
            </div>
            <div style={{flex: 1, padding: '22px 26px', fontFamily: mono.fontFamily, fontSize: 21, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)'}}>
              {lines.slice(0, shown).map((l) => (
                <div key={l} style={{color: l.startsWith('$') ? '#fff' : R.green}}>
                  {l}
                </div>
              ))}
              <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>▌</span>
            </div>
          </div>
        </div>
      </In>
    </RSlide>
  );
};

/* ===== Routine: every day at 5:30 ===== */
export const RoutineR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const steps = ['Cut the video from desktop assets', 'Publish it', 'Fill the links back in'];
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.85)} name="ding" vol={0.25} dur={40} />
      <Head label="Routines" size={48}>
        <span style={{color: R.teal}}>Every day</span> at 5:30
      </Head>
      <In at={at(0.08)} style={{position: 'absolute', left: 72, top: 180}}>
        <div style={{width: 380, height: 300, borderRadius: 30, background: R.card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4}}>
          <IconClock s={54} />
          <div style={{fontSize: 108, fontWeight: 500, letterSpacing: -4, lineHeight: 1}}>5:30</div>
          <div style={{fontSize: 24, color: R.mute}}>PM · every day</div>
        </div>
      </In>
      <Abs x={500} y={180} style={{display: 'flex', flexDirection: 'column', gap: 14, width: 700}}>
        <In at={at(0.2)}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: R.mute}}>
            <Bot shape="drop" color={R.teal} size={40} bob={1} />
            Routine · Daily publish
            <Pill size={16} style={{marginLeft: 'auto'}}>
              ⟳ Active
            </Pill>
          </div>
        </In>
        {steps.map((s, i) => (
          <Card key={s} at={at(0.3) + i * at(0.12)} box={{display: 'flex', alignItems: 'center', gap: 16, padding: '16px 22px'}}>
            <div style={{width: 40, height: 40, borderRadius: 20, background: '#fff', color: R.bg, fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
            <div style={{fontSize: 27, fontWeight: 500, flex: 1}}>{s}</div>
            <IconCheck s={26} />
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== One-person company ===== */
export const SoloR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const jobs: [string, string][] = [
    ['Editor', 'Video cut'],
    ['Copywriter', 'Captions written'],
    ['Publisher', 'Posted on schedule'],
    ['Assets', 'Library tidied'],
  ];
  const threads = [
    {name: 'Chief Bot', prev: 'All jobs reported back', shape: 'drop' as const, color: R.white, unread: true},
    {name: 'Editor', prev: 'Cut finished', shape: 'blob' as const, color: R.orange},
    {name: 'Copywriter', prev: 'Captions are ready', shape: 'pillow' as const, color: R.pink},
    {name: 'Publisher', prev: 'Scheduled', shape: 'drop' as const, color: R.teal},
    {name: 'Assets', prev: 'Found 12 clips', shape: 'circle' as const, color: R.green},
  ];
  return (
    <RSlide vo={vo}>
      <Abs x={72} y={34}>
        <AppWindow
          h={490}
          threads={threads}
          active={0}
          bot={CAST.chief}
          tab="Activity"
          msgs={[
            {who: 'me', text: "How did today go?", at: at(0.08)},
            {who: 'bot', text: 'Everything is done. Editor, Copywriter, Publisher and Assets each reported back.', at: at(0.2)},
          ]}
          input={{}}
          panel={
            <>
              <PanelHeading right="today">Reports</PanelHeading>
              <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                {jobs.map(([n, d], i) => (
                  <In key={n} at={at(0.3) + i * at(0.1)}>
                    <PanelRow icon={<IconCheck s={16} />}>
                      <div style={{fontSize: 14, fontWeight: 500}}>{n}</div>
                      <div style={{fontSize: 12, color: R.dim}}>{d}</div>
                    </PanelRow>
                  </In>
                ))}
              </div>
            </>
          }
        />
      </Abs>
    </RSlide>
  );
};

/* ===== Key: scheduling ===== */
export const KeyR: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <In at={4} tick={false} style={{position: 'absolute', left: 72, top: 50}}>
        <Label>The key</Label>
        <div style={{fontSize: 178, fontWeight: 500, lineHeight: 1.0, letterSpacing: -8, marginTop: 6}}>Scheduling</div>
      </In>
      <In at={at(0.3)} tick={false} style={{position: 'absolute', left: 1010, top: 30}}>
        <Bot shape="circle" color={R.pink} size={190} bob={8} />
      </In>
      <Abs x={72} y={300} style={{display: 'flex', gap: 24}}>
        <Card at={at(0.3)} box={{width: 440, height: 190}}>
          <Label>People say</Label>
          <div style={{fontSize: 26, color: R.dim, textDecoration: 'line-through', marginTop: 12}}>Its code isn't top-tier</div>
          <div style={{fontSize: 26, color: R.dim, textDecoration: 'line-through', marginTop: 8}}>Its images aren't the best</div>
        </Card>
        <Card at={at(0.55)} hl={R.pink} box={{width: 640, height: 190}}>
          <Label color={R.pink}>Boss view</Label>
          <div style={{fontSize: 36, fontWeight: 500, lineHeight: 1.2, marginTop: 10}}>
            You don't need the best at everything. You need to <span style={{color: R.pink}}>orchestrate</span>.
          </div>
        </Card>
      </Abs>
    </RSlide>
  );
};

/* ===== Side button: two requirements ===== */
export const ReqR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const rise = (f % 40) / 40;
  return (
    <RSlide vo={vo}>
      <Head label="Side button" size={50}>
        Check <span style={{color: R.orange}}>two things</span>
      </Head>
      <Card at={at(0.14)} style={{position: 'absolute', left: 72, top: 190}} box={{width: 540, height: 300, position: 'relative', overflow: 'hidden'}}>
        <Label>1 · App</Label>
        <div style={{fontSize: 38, fontWeight: 500, marginTop: 8}}>Latest version</div>
        <div style={{fontSize: 20, color: R.dim, marginTop: 6}}>Update before you start.</div>
        <Abs x={330} y={110}>
          <Bot shape="drop" color={R.white} size={130} />
        </Abs>
        {[0, 1].map((i) => (
          <Abs key={i} x={60 + i * 110} y={200 - rise * 50 - i * 14} style={{fontSize: 56, color: R.blue, opacity: 1 - rise * 0.6}}>
            ↑
          </Abs>
        ))}
      </Card>
      <Card at={at(0.34)} hl={R.orange} style={{position: 'absolute', left: 660, top: 190}} box={{width: 548, height: 300, position: 'relative'}}>
        <Label color={R.orange}>2 · Phone</Label>
        <div style={{fontSize: 38, fontWeight: 500, marginTop: 8}}>An Action button</div>
        <div style={{fontSize: 20, color: R.dim, marginTop: 6}}>Found on newer iPhones.</div>
        <svg width={170} height={230} viewBox="0 0 170 230" style={{position: 'absolute', right: 40, top: 40}}>
          <rect x={22} y={6} width={126} height={218} rx={26} fill="#161616" stroke="#fff" strokeWidth={3} />
          <rect x={10} y={56} width={8} height={36} rx={4} fill={R.orange} opacity={0.6 + 0.4 * Math.sin(f / 5)} />
          <rect x={34} y={20} width={102} height={190} rx={16} fill={R.bg} />
        </svg>
        <Abs x={30} y={225}>
          <Pill kind="white" size={19}>
            Action button
          </Pill>
        </Abs>
      </Card>
    </RSlide>
  );
};

/* ===== Back tap: settings list ===== */
export const BackTapR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const path = ['Accessibility', 'Touch', 'Back Tap'];
  const rows: [string, string, boolean][] = [
    ['Double Tap', 'Start Voice Chat', true],
    ['Triple Tap', 'None', false],
  ];
  return (
    <RSlide vo={vo}>
      <Head label="Quick launch" size={48}>
        Prefer <span style={{color: R.teal}}>taps</span>?
      </Head>
      <Abs x={72} y={170} style={{display: 'flex', alignItems: 'center', gap: 12}}>
        {path.map((p, i) => (
          <React.Fragment key={p}>
            <In at={at(0.12) + i * at(0.12)}>
              <Pill kind={i === 2 ? 'white' : 'dark'} size={26}>
                {p}
              </Pill>
            </In>
            {i < 2 && <div style={{fontSize: 28, color: R.dim}}>›</div>}
          </React.Fragment>
        ))}
      </Abs>
      <In at={at(0.5)} style={{position: 'absolute', left: 72, top: 270}}>
        <div style={{width: 760, borderRadius: 26, background: R.card, overflow: 'hidden'}}>
          <div style={{padding: '16px 28px', fontSize: 15, color: R.dim, letterSpacing: 1.5, fontFamily: mono.fontFamily}}>BACK TAP</div>
          {rows.map(([a, b, on], i) => (
            <div key={a} style={{display: 'flex', alignItems: 'center', padding: '20px 28px', borderTop: `1px solid ${R.line}`, fontSize: 28}}>
              <div style={{flex: 1, fontWeight: 500}}>{a}</div>
              <div style={{color: on ? '#fff' : R.dim, display: 'flex', alignItems: 'center', gap: 10}}>
                {on && <IconCheck s={24} c="#fff" />}
                {b} ›
              </div>
            </div>
          ))}
        </div>
      </In>
      <In at={at(0.62)} style={{position: 'absolute', left: 900, top: 255}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
          <Bot shape="blob" color={R.teal} size={140} bob={7} />
          <div style={{fontSize: 21, color: R.mute, textAlign: 'center', width: 260}}>Tap the back of your phone to call the Bot.</div>
        </div>
      </In>
    </RSlide>
  );
};

/* ===== Hey Bot: voice chat panel ===== */
export const HeyR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const filled = Math.min(3, Math.max(0, Math.floor((f - at(0.25)) / at(0.12))));
  const perms = ['Calendar', 'Reminders', 'Alarms'];
  return (
    <RSlide vo={vo}>
      <In at={at(0.06)} tick={false} style={{position: 'absolute', left: 90, top: 40}}>
        <div style={{width: 470, height: 480, borderRadius: 30, background: '#0D0D0D', border: `1.5px solid ${R.line}`, position: 'relative', overflow: 'hidden', boxShadow: '0 30px 90px rgba(0,0,0,0.7)'}}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{position: 'absolute', left: 235 - (90 + i * 46), top: 150 - (90 + i * 46) + 90, width: 180 + i * 92, height: 180 + i * 92, borderRadius: '50%', border: `2px solid ${R.pink}`, opacity: 0.28 - i * 0.07 + 0.08 * Math.sin(f / 6 + i)}} />
          ))}
          <Abs x={150} y={92}>
            <Bot shape="drop" color={R.pink} size={170} bob={4} />
          </Abs>
          <Abs x={0} y={300} style={{width: 470, textAlign: 'center', fontSize: 30, fontWeight: 500}}>
            Say “Hey Bot”
          </Abs>
          <Abs x={0} y={348} style={{width: 470, display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center', height: 44}}>
            {Array.from({length: 18}).map((_, i) => (
              <div key={i} style={{width: 6, borderRadius: 3, background: '#fff', height: 8 + Math.abs(Math.sin(f / 5 + i * 0.7)) * 34}} />
            ))}
          </Abs>
          <Abs x={0} y={420} style={{width: 470, display: 'flex', justifyContent: 'center', gap: 12}}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{width: 18, height: 18, borderRadius: 9, background: i < filled ? R.pink : '#333'}} />
            ))}
          </Abs>
        </div>
      </In>
      <Abs x={620} y={44}>
        <In at={at(0.2)}>
          <div style={{fontSize: 46, fontWeight: 500, lineHeight: 1.1, letterSpacing: -1}}>
            Say it <span style={{color: R.pink}}>three times</span>
          </div>
          <div style={{fontSize: 21, color: R.mute, marginTop: 8}}>The phone records your voice.</div>
        </In>
      </Abs>
      <Abs x={620} y={190} style={{display: 'flex', flexDirection: 'column', gap: 12, width: 560}}>
        {perms.map((p, i) => (
          <Card key={p} at={at(0.4) + i * at(0.1)} box={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px'}}>
            <IconWave s={24} c={R.mute} />
            <div style={{flex: 1, fontSize: 28, fontWeight: 500}}>{p}</div>
            <div style={{width: 62, height: 34, borderRadius: 17, background: R.green, position: 'relative'}}>
              <div style={{position: 'absolute', right: 4, top: 4, width: 26, height: 26, borderRadius: 13, background: '#fff'}} />
            </div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== Issue 1: over-correction diff ===== */
export const Issue1R: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const old = ['The launch is planned for Friday.', 'Please review the draft before then.', 'We will publish at five thirty.', 'Links go in the description.'];
  const changed = f > at(0.45);
  return (
    <RSlide vo={vo}>
      <In at={at(0.05)} tick={false} style={{position: 'absolute', left: 72, top: 30}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Bot shape="blob" color={R.red} size={52} bob={2} />
          <div style={{fontSize: 40, fontWeight: 500, letterSpacing: -1}}>
            It tends to <span style={{color: R.red}}>over-correct</span>
          </div>
        </div>
      </In>
      <In at={at(0.1)} style={{position: 'absolute', left: 72, top: 118}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Pill size={19} style={{background: R.user}}>
            Fix the typo in line 2
          </Pill>
        </div>
      </In>
      <In at={at(0.15)} tick={false} style={{position: 'absolute', left: 72, top: 186}}>
        <div style={{width: 1136, height: 270, borderRadius: 18, background: '#0F0F0F', border: `1.5px solid ${R.line}`, overflow: 'hidden', fontFamily: mono.fontFamily, fontSize: 21}}>
          <div style={{padding: '8px 20px', background: '#181818', fontSize: 15, color: R.dim, borderBottom: `1px solid ${R.line}`}}>script.md · diff</div>
          {old.map((l, i) => {
            const hit = changed && i > 1;
            return (
              <div key={i} style={{display: 'flex', padding: '9px 20px', background: hit ? 'rgba(224,33,53,0.16)' : i === 1 && changed ? 'rgba(0,153,87,0.18)' : 'transparent', color: hit ? '#ff8a96' : '#fff', transition: 'none'}}>
                <span style={{width: 40, color: R.dim}}>{i + 1}</span>
                <span style={{textDecoration: hit ? 'line-through' : 'none'}}>{l}</span>
                {changed && i === 1 && <span style={{marginLeft: 20, color: R.green}}>+ whole paragraph rewritten</span>}
              </div>
            );
          })}
        </div>
      </In>
      <Sfx at={at(0.45)} name="pop1" vol={0.25} dur={30} />
      <In at={at(0.7)} style={{position: 'absolute', left: 72, top: 476}}>
        <div style={{fontSize: 25, color: R.mute}}>
          <span style={{color: '#fff'}}>My fix:</span> hand code changes to a coding tool, or use a script I've tuned.
        </div>
      </In>
    </RSlide>
  );
};

/* ===== Issue 2: no window per bot ===== */
export const Issue2R: React.FC<P> = ({vo}) => {
  const at = useAt();
  const bots: BotSpec[] = [CAST.writer, CAST.editor, CAST.designer];
  return (
    <RSlide vo={vo}>
      <Head label="Issue 02" size={48}>
        No window per Bot <span style={{color: R.orange}}>yet</span>
      </Head>
      <Card at={at(0.12)} style={{position: 'absolute', left: 72, top: 190}} box={{width: 420, height: 250, padding: 18}}>
        <Label>Now</Label>
        <div style={{fontSize: 26, fontWeight: 500, marginTop: 6}}>All Bots share one chat</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14}}>
          {bots.map((b, i) => (
            <div key={b.name} style={{display: 'flex', alignItems: 'center', gap: 10, marginLeft: i * 34}}>
              <Bot shape={b.shape} color={b.color} size={30} bob={1} />
              <div style={{height: 12, width: 160 + (i % 2) * 40, borderRadius: 6, background: '#2f2f2f'}} />
            </div>
          ))}
        </div>
      </Card>
      <In at={at(0.3)} tick={false} style={{position: 'absolute', left: 520, top: 290}}>
        <div style={{fontSize: 40, color: R.dim}}>→</div>
      </In>
      <Abs x={600} y={190} style={{display: 'flex', gap: 14}}>
        {bots.map((b, i) => (
          <In key={b.name} at={at(0.38) + i * at(0.07)}>
            <div style={{width: 188, height: 250, borderRadius: 18, background: R.card2, border: `2px solid ${b.color}`, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
              <div style={{height: 22, background: '#1b1b1b', display: 'flex', gap: 5, alignItems: 'center', padding: '0 8px'}}>
                {[0, 1, 2].map((k) => (
                  <div key={k} style={{width: 7, height: 7, borderRadius: 4, background: '#3a3a3a'}} />
                ))}
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
                <Bot shape={b.shape} color={b.color} size={70} phase={i * 11} />
                <div style={{fontSize: 17, fontWeight: 500}}>{b.name}</div>
              </div>
            </div>
          </In>
        ))}
      </Abs>
      <In at={at(0.66)} style={{position: 'absolute', left: 72, top: 470}}>
        <div style={{fontSize: 26, color: R.mute}}>
          Feedback sent. <span style={{color: '#fff'}}>Hoping it ships soon.</span>
        </div>
      </In>
    </RSlide>
  );
};

/* ===== ROI: cost vs return ===== */
export const RoiR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const g = (a: number, b: number) => interpolate(f, [at(a), at(b)], [0, 1], clamp);
  return (
    <RSlide vo={vo}>
      <Head label="Do the math" size={50}>
        Be rational. <span style={{color: R.green}}>Count first.</span>
      </Head>
      <Abs x={90} y={190} style={{display: 'flex', alignItems: 'flex-end', gap: 30, height: 300}}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: 130, height: 110 * g(0.2, 0.4), borderRadius: '16px 16px 4px 4px', background: R.grey}} />
          <div style={{fontSize: 20, color: R.mute, marginTop: 8}}>Invest</div>
        </div>
        <div style={{textAlign: 'center'}}>
          <div style={{width: 130, height: 250 * g(0.45, 0.7), borderRadius: '16px 16px 4px 4px', background: R.green}} />
          <div style={{fontSize: 20, color: '#fff', marginTop: 8}}>Return</div>
        </div>
      </Abs>
      <Abs x={470} y={196} style={{display: 'flex', flexDirection: 'column', gap: 14, width: 740}}>
        <Card at={at(0.2)} box={{padding: '16px 24px'}}>
          <Label>You put in</Label>
          <div style={{fontSize: 30, fontWeight: 500, marginTop: 6}}>A subscription + some setup time</div>
        </Card>
        <Card at={at(0.45)} hl={R.green} box={{padding: '16px 24px'}}>
          <Label color={R.green}>You get back</Label>
          <div style={{fontSize: 30, fontWeight: 500, marginTop: 6}}>Saved time + real results</div>
        </Card>
        <In at={at(0.72)}>
          <Pill kind="white" size={22}>
            Otherwise, it's meaningless
          </Pill>
        </In>
      </Abs>
    </RSlide>
  );
};

/* ===== After: minimal ===== */
export const AfterR: React.FC<P> = ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <In at={at(0.06)} tick={false} style={{position: 'absolute', left: 540, top: 70}}>
        <Bot shape="drop" color={R.white} size={200} bob={6} />
      </In>
      <In at={at(0.16)} tick={false} style={{position: 'absolute', left: 0, right: 0, top: 290, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontSize: 58, fontWeight: 500, letterSpacing: -2}}>Now it's minimal.</div>
      </In>
      <In at={at(0.28)} style={{position: 'absolute', left: 290, top: 375}}>
        <InputPill placeholder="Message Bot" w={700} size={22} color={R.white} />
      </In>
      <Abs x={0} y={470} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 12}}>
        {['Simple interaction', 'A digital company', 'Driven by real business'].map((t, i) => (
          <In key={t} at={at(0.5) + i * at(0.08)}>
            <Pill size={21}>{t}</Pill>
          </In>
        ))}
      </Abs>
    </RSlide>
  );
};

/* ===== Shorten the chain ===== */
export const ChainR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const before = ['Idea', 'Open laptop', 'Find the app', 'Log in', 'Write it up', 'Send'];
  const now: [string, boolean][] = [
    ['Idea', false],
    ['Call your Bot', true],
    ['Hand it off', true],
  ];
  const gone = f > at(0.45);
  return (
    <RSlide vo={vo}>
      <Head label="Habits" size={48}>
        Shorten the <span style={{color: R.teal}}>chain</span>
      </Head>
      <Abs x={72} y={170}>
        <Label>Before</Label>
        <div style={{display: 'flex', gap: 8, marginTop: 10, alignItems: 'center', opacity: gone ? 0.28 : 1}}>
          {before.map((b, i) => (
            <React.Fragment key={b}>
              <In at={at(0.06) + i * 4} tick={false}>
                <Pill size={19} style={{textDecoration: gone && i > 0 ? 'line-through' : 'none'}}>
                  {b}
                </Pill>
              </In>
              {i < before.length - 1 && <span style={{color: R.dim}}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </Abs>
      <Abs x={72} y={300}>
        <Label color={R.teal}>Now</Label>
        <div style={{display: 'flex', gap: 14, marginTop: 12, alignItems: 'center'}}>
          {now.map(([n, hl], i) => (
            <React.Fragment key={n}>
              <In at={at(0.5) + i * at(0.1)}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 26px', borderRadius: 9999, background: hl ? '#fff' : R.card, color: hl ? R.bg : '#fff', fontSize: 30, fontWeight: 500}}>
                  {i === 1 && <Bot shape="blob" color={R.teal} size={38} bob={1} />}
                  {n}
                </div>
              </In>
              {i < 2 && <span style={{fontSize: 34, color: '#fff'}}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </Abs>
      <In at={at(0.82)} style={{position: 'absolute', left: 72, top: 450}}>
        <div style={{fontSize: 26, color: R.mute}}>The smoother it feels, the more you use it.</div>
      </In>
    </RSlide>
  );
};

/* ===== Outro ===== */
export const OutroR: React.FC<P> = ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const all: [BotSpec['shape'], string][] = [
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
      <Sfx at={at(0.3)} name="ding" vol={0.25} dur={40} />
      <In at={at(0.06)} tick={false} style={{position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center'}}>
        <Bot shape="drop" color={R.white} size={210} bob={7} />
      </In>
      <In at={at(0.14)} tick={false} style={{position: 'absolute', left: 0, right: 0, top: 262, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontSize: 80, fontWeight: 500, letterSpacing: -3}}>One Bot. One real task.</div>
      </In>
      <In at={at(0.3)} style={{position: 'absolute', left: 0, right: 0, top: 392, display: 'flex', justifyContent: 'center'}}>
        <Pill kind="white" size={28}>
          Start small
        </Pill>
      </In>
      <Abs x={0} y={470} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 22}}>
        {all.map(([s, c], i) => (
          <Bot key={i} shape={s} color={c} size={54} phase={i * 8} bob={4 + Math.abs(Math.sin((f + i * 5) / 30)) * 2} style={{opacity: 0.95}} />
        ))}
      </Abs>
    </RSlide>
  );
};

