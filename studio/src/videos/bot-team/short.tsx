/**
 * Vertical 1080x1920 short for "bot-team" (storyboard: content/bot-team/short/storyboard.md).
 * The Colossus builds itself in fast-forward; one big keyword per shot instead of captions.
 */
import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {MUSIC_ON, Sfx, clamp, useAt} from '../../lib/kit';
import {inter, mono} from '../../lib/Art';
import {Bot} from '../real/BotMark';
import {GrokBotMark} from '../../lib/GrokBotMark';
import {Colossus, M, SHIELD, TEAM} from './scenes/robot';
import type {Member} from './scenes/robot';
import slidesJson from '../../../content/bot-team/short/slides.json';

type Row = {id: string; vo: string; frames: number};
const F = inter.fontFamily;
const MONO = mono.fontFamily;
const INK = '#15151c';
const RED = '#C9524C';
const PAPER = '#F7F7F8'; // one flat background for every light shot
const ACC = '#1E6FE0'; // the only accent colour
const HOLD = 45; // end-card hold after the last line

/* ---------- helpers ---------- */
const usePop = (at: number, damping = 11) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return f < at ? 0 : spring({frame: f - at, fps, config: {damping, stiffness: 170}});
};

const Pop: React.FC<{at: number; sfx?: string | false; vol?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({at, sfx = 'pop1', vol = 0.28, style, children}) => {
  const p = usePop(at);
  return (
    <>
      {sfx && <Sfx at={at} name={sfx} vol={vol} dur={30} />}
      <div style={{position: 'absolute', ...style, opacity: Math.min(1, p * 2), transform: `${style?.transform ?? ''} scale(${0.2 + 0.8 * p})`}}>{children}</div>
    </>
  );
};

/** Big keyword in the lower third: slams in from big + blurred. */
const Key: React.FC<{at: number; children: React.ReactNode; color?: string; y?: number; size?: number}> = ({at, children, color = INK, y = 1430, size = 120}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + 7], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  if (f < at) return null;
  return (
    <>
      <Sfx at={at} name="pop2" vol={0.32} dur={30} />
      <div style={{position: 'absolute', left: 40, right: 40, top: y, textAlign: 'center', fontFamily: F, fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: -3, color, opacity: t, transform: `scale(${1.7 - 0.7 * t})`, filter: `blur(${(1 - t) * 10}px)`}}>
        {children}
      </div>
    </>
  );
};

/** Shot wrapper: background, fade in, whoosh, small series label. */
const Shot: React.FC<{bg: string; dark?: boolean; children: React.ReactNode; shake?: number}> = ({bg, dark, children, shake = 0}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 4], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: bg, fontFamily: F, overflow: 'hidden', opacity: o, transform: `translateX(${shake}px)`}}>
      <Sfx at={0} name="whoosh" vol={0.26} dur={30} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 90, textAlign: 'center', fontFamily: MONO, fontSize: 30, letterSpacing: 6, color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(21,21,28,0.5)'}}>
        BOT TEAM · NO CODE
      </div>
      {children}
    </AbsoluteFill>
  );
};

const Card: React.FC<{style?: React.CSSProperties; dark?: boolean; children: React.ReactNode}> = ({style, dark, children}) => (
  <div style={{background: dark ? '#1b1b22' : '#fff', color: dark ? '#fff' : INK, borderRadius: 32, boxShadow: '0 8px 24px rgba(21,21,28,0.07)', border: '1px solid rgba(21,21,28,0.08)', padding: '26px 32px', ...style}}>{children}</div>
);

/* 1 ===== hook: five Bots working at night, checking each other ===== */
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const swap = at(0.62);
  const ring = TEAM.map((t, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return {t, x: 540 + 330 * Math.cos(a), y: 800 + 330 * Math.sin(a)};
  });
  const st = interpolate(f, [swap, swap + 16], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const from = ring[1], to = ring[3];
  return (
    <Shot bg={PAPER}>
      {/* stars + moon */}
      {Array.from({length: 40}).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: (i * 263) % 1080, top: 160 + ((i * 137) % 1100), width: 4, height: 4, borderRadius: 2, background: INK, opacity: 0.08 + 0.12 * Math.abs(Math.sin(f / 9 + i))}} />
      ))}
      <div style={{position: 'absolute', left: 800, top: 190, width: 130, height: 130, borderRadius: 65, background: '#fff', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', border: '1px solid rgba(21,21,28,0.08)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 210, textAlign: 'center'}}>
        <span style={{fontFamily: MONO, fontSize: 64, color: INK, background: '#fff', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', border: '1px solid rgba(21,21,28,0.08)', borderRadius: 24, padding: '10px 34px'}}>3:12 AM</span>
      </div>
      {ring.map(({t, x, y}, i) => {
        const pa = at(0.03 + i * 0.07);
        const prog = interpolate(f, [pa + 8, pa + 70], [0, 1], clamp);
        return (
          <Pop key={t.key} at={pa} sfx={i % 2 ? 'pop2' : 'pop1'} style={{left: x - 110, top: y - 110, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <Bot shape={t.shape} color={t.color} size={i === 0 ? 190 : 160} phase={i * 7} bob={4} />
            <div style={{width: 170, height: 14, borderRadius: 7, background: 'rgba(21,21,28,0.1)', overflow: 'hidden'}}>
              <div style={{width: `${prog * 100}%`, height: '100%', background: t.color}} />
            </div>
          </Pop>
        );
      })}
      {/* the ✓ handed from Store Bot to Content Bot */}
      {f >= swap && (
        <>
          <Sfx at={swap + 16} name="ding" vol={0.3} dur={40} />
          <div style={{position: 'absolute', left: from.x + (to.x - from.x) * st - 45, top: from.y + (to.y - from.y) * st - 45 - Math.sin(st * Math.PI) * 160, width: 90, height: 90, borderRadius: 45, background: '#2E9E62', color: '#0b2a17', fontSize: 60, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div>
        </>
      )}
      <Key at={at(0.3)}>WHILE I SLEEP</Key>
      <Key at={swap + 10} color="rgba(21,21,28,0.5)" y={1580} size={70}>…and they check each other</Key>
    </Shot>
  );
};

/* 2 ===== glue: you run between separate chats, faster and faster ===== */
const Glue: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const tiles = [
    {name: 'Store chat', c: M.larm.color, x: 120, y: 330},
    {name: 'Content chat', c: M.chest.color, x: 600, y: 560},
    {name: 'Client chat', c: M.rarm.color, x: 140, y: 880},
  ];
  const t = Math.pow(Math.max(0, f - 12) / 30, 1.7) * 1.4; // speeds up
  const k = Math.floor(t) % 3;
  const u = Easing.inOut(Easing.cubic)(t % 1);
  const a = tiles[k], b = tiles[(k + 1) % 3];
  const px = a.x + 160 + (b.x + 160 - a.x - 160) * u;
  const py = a.y + 230 + (b.y - a.y) * u;
  const crack = interpolate(f, [at(0.78), at(0.88)], [0, 1], clamp);
  return (
    <Shot bg={PAPER}>
      {tiles.map((tl, i) => (
        <Pop key={i} at={i * 5 + 2} sfx="tick1" style={{left: tl.x, top: tl.y}}>
          <Card style={{width: 340, height: 220, borderTop: `14px solid ${tl.c}`}}>
            <div style={{fontSize: 34, fontWeight: 800}}>{tl.name}</div>
            {[0.8, 0.6, 0.7].map((w, j) => <div key={j} style={{marginTop: 18, height: 16, width: `${w * 100}%`, borderRadius: 8, background: 'rgba(21,21,28,0.12)'}} />)}
          </Card>
        </Pop>
      ))}
      {/* dashed "no link" lines that crack */}
      <svg width={1080} height={1400} style={{position: 'absolute', left: 0, top: 0}}>
        {[[0, 1], [1, 2], [2, 0]].map(([i, j], n) => (
          <line key={n} x1={tiles[i].x + 170} y1={tiles[i].y + 110} x2={tiles[j].x + 170} y2={tiles[j].y + 110} stroke={RED} strokeWidth={6} strokeDasharray="18 16" opacity={crack} />
        ))}
        {crack > 0 && [[0, 1], [1, 2], [2, 0]].map(([i, j], n) => {
          const mx = (tiles[i].x + tiles[j].x) / 2 + 170, my = (tiles[i].y + tiles[j].y) / 2 + 110;
          return <text key={'x' + n} x={mx} y={my + 22} textAnchor="middle" fontSize={64 * crack} fontWeight={900} fill={RED} fontFamily={F}>✕</text>;
        })}
      </svg>
      {/* you, carrying a card */}
      <div style={{position: 'absolute', left: px - 50, top: py - 60 + Math.abs(Math.sin(f / 2.5)) * -14}}>
        <svg width={100} height={150} viewBox="0 0 100 150">
          <circle cx={50} cy={28} r={24} fill={ACC} />
          <rect x={22} y={58} width={56} height={70} rx={24} fill={ACC} />
          <rect x={58} y={70} width={38} height={28} rx={6} fill="#fff" stroke={INK} strokeWidth={3} />
        </svg>
      </div>
      <Sfx at={at(0.3)} name="whoosh" vol={0.18} dur={20} />
      <Sfx at={at(0.5)} name="whoosh" vol={0.2} dur={20} />
      <Key at={at(0.6)}>YOU = <span style={{color: ACC}}>GLUE</span></Key>
    </Shot>
  );
};

/* 3 ===== head: the Chief drops into the empty robot, the others report up ===== */
const Head: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const land = at(0.2);
  const others = TEAM.slice(1);
  const beam = interpolate(f, [at(0.6), at(0.8)], [0, 1], clamp);
  return (
    <Shot bg={PAPER}>
      <Sfx at={land + 8} name="ding" vol={0.3} dur={40} />
      <div style={{position: 'absolute', left: 540 - 300, top: 230}}>
        <Colossus h={840} parts={{head: land}} />
      </div>
      <svg width={1080} height={1400} style={{position: 'absolute', left: 0, top: 0}}>
        {others.map((t, i) => (
          <line key={t.key} x1={180 + i * 240} y1={1260} x2={180 + i * 240 + (540 - 180 - i * 240) * beam} y2={1260 + (330 - 1260) * beam} stroke={t.color} strokeWidth={6} strokeLinecap="round" opacity={beam > 0 ? 0.85 : 0} />
        ))}
      </svg>
      {others.map((t, i) => (
        <Pop key={t.key} at={at(0.55) + i * 3} sfx="tick2" vol={0.18} style={{left: 180 + i * 240 - 55, top: 1205}}>
          <Bot shape={t.shape} color={t.color} size={110} phase={i * 5} bob={3} />
        </Pop>
      ))}
      <Key at={land + 4}>HEAD FIRST</Key>
    </Shot>
  );
};

/* 4 ===== body: one job per Bot, four parts snap on beat ===== */
const Body: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const beats = [0.3, 0.44, 0.58, 0.72].map(at);
  const parts: Member[] = [M.larm, M.rarm, M.chest, M.legs];
  const words = ['STORE', 'CLIENTS', 'CONTENT', 'LEADS'];
  const cur = beats.filter((b) => f >= b).length - 1;
  return (
    <Shot bg={PAPER}>
      <div style={{position: 'absolute', left: 540 - 300, top: 230}}>
        <Colossus h={840} parts={{head: -60, larm: beats[0], rarm: beats[1], chest: beats[2], legs: beats[3]}} />
      </div>
      {beats.map((b, i) => <Sfx key={i} at={b + 6} name={i % 2 ? 'pop2' : 'pop1'} vol={0.3} dur={25} />)}
      {cur < 0 ? (
        <Key at={2}>ONE JOB EACH</Key>
      ) : (
        <div key={cur} style={{position: 'absolute', left: 0, right: 0, top: 1400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
          <Pop at={beats[cur]} sfx={false} style={{position: 'relative'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
              <Bot shape={parts[cur].shape} color={parts[cur].color} size={130} bob={3} />
              <span style={{fontSize: 132, fontWeight: 900, letterSpacing: -3, color: INK}}>{words[cur]}</span>
            </div>
          </Pop>
        </div>
      )}
    </Shot>
  );
};

/* 5 ===== shield: closes around the robot; sending waits for your OK ===== */
const ShieldShot: React.FC = () => {
  const at = useAt();
  return (
    <Shot bg={PAPER}>
      <Sfx at={at(0.12) + 6} name="ding" vol={0.28} dur={40} />
      <div style={{position: 'absolute', left: 540 - 225, top: 220}}>
        <Colossus h={630} parts={{head: -60, larm: -60, rarm: -60, chest: -60, legs: -60, shield: at(0.12)}} />
      </div>
      <Pop at={at(0.42)} sfx="tick3" style={{left: 140, top: 950}}>
        <Card style={{width: 800, display: 'flex', alignItems: 'center', gap: 26}}>
          <div style={{flex: 1}}>
            <div style={{fontSize: 26, color: 'rgba(21,21,28,0.55)', fontFamily: MONO}}>TO: customer</div>
            <div style={{fontSize: 36, fontWeight: 800, marginTop: 6}}>Your order update…</div>
          </div>
          <div style={{position: 'relative', background: 'rgba(21,21,28,0.12)', color: 'rgba(21,21,28,0.45)', borderRadius: 9999, padding: '16px 30px', fontSize: 32, fontWeight: 800}}>
            Send
            <div style={{position: 'absolute', right: -26, top: -30, fontSize: 56}}>🔒</div>
          </div>
        </Card>
      </Pop>
      <Pop at={at(0.6)} sfx="pop1" style={{left: 0, right: 0, top: 1170, display: 'flex', justifyContent: 'center'}}>
        <div style={{background: INK, color: '#fff', borderRadius: 9999, padding: '14px 34px', fontSize: 34, fontWeight: 800}}>Waiting for your OK</div>
      </Pop>
      <Key at={at(0.55)}>YOUR OK FIRST</Key>
    </Shot>
  );
};

/* 6 ===== catch: one group chat; Content Bot reacts to Store Bot on its own ===== */
const Msg: React.FC<{m: Member; text: string; at: number; tone: 'warn' | 'fix'}> = ({m, text, at, tone}) => {
  const c = tone === 'warn' ? '#ffaa28' : '#E02A88';
  return (
    <Pop at={at} sfx={tone === 'warn' ? 'pop1' : 'ding'} vol={0.3} style={{position: 'relative'}}>
      <div style={{display: 'flex', gap: 20, alignItems: 'flex-start'}}>
        <Bot shape={m.shape} color={m.color} size={84} bob={1} />
        <div style={{flex: 1, background: PAPER, borderLeft: `8px solid ${c}`, borderRadius: 24, padding: '18px 26px'}}>
          <div style={{fontSize: 30, fontWeight: 800, color: m.color === M.rarm.color ? '#5aa2f0' : m.color}}>{m.name}</div>
          <div style={{fontSize: 42, lineHeight: 1.25, color: INK, marginTop: 4}}>{text}</div>
        </div>
      </div>
    </Pop>
  );
};
const Catch: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const stamp = at(0.82);
  const sp = usePop(stamp, 9);
  return (
    <Shot bg={PAPER}>
      <div style={{position: 'absolute', left: 50, top: 180, width: 980, height: 1180, borderRadius: 32, background: '#fff', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', border: '1px solid rgba(21,21,28,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '30px 36px', borderBottom: '1px solid rgba(21,21,28,0.08)', color: INK}}>
          <span style={{fontSize: 40, fontWeight: 800}}># colossus</span>
          <span style={{fontSize: 28, color: 'rgba(21,21,28,0.5)'}}>5 Bots</span>
          <div style={{flex: 1}} />
          {TEAM.map((t, i) => (
            <div key={t.key} style={{marginLeft: -10, width: 56, height: 56, borderRadius: 28, background: PAPER, border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: f >= 4 + i * 5 ? 1 : 0.2}}>
              <Bot shape={t.shape} color={t.color} size={38} bob={0} phase={i} />
            </div>
          ))}
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 30, padding: '30px 36px 40px'}}>
          {TEAM.map((t, i) => f >= 4 + i * 5 && (
            <div key={t.key} style={{alignSelf: 'center', fontFamily: MONO, fontSize: 26, color: 'rgba(21,21,28,0.45)', display: 'flex', alignItems: 'center', gap: 10}}>
              <Bot shape={t.shape} color={t.color} size={30} bob={0} /> {t.name} joined
            </div>
          ))}
          {f >= at(0.36) && <Msg m={M.larm} at={at(0.36)} tone="warn" text="Hiking packs: only 9 left. Restock Friday." />}
          {f >= at(0.62) && <Msg m={M.chest} at={at(0.62)} tone="fix" text="Saw that. Holding the pack video until Friday." />}
        </div>
      </div>
      {f >= stamp && (
        <>
          <Sfx at={stamp} name="pop2" vol={0.32} dur={30} />
          <div style={{position: 'absolute', left: 250, top: 300, transform: `rotate(-12deg) scale(${2 - sp})`, opacity: Math.min(1, sp * 2), border: '8px solid #2E9E62', color: '#2E9E62', borderRadius: 24, padding: '10px 30px', fontSize: 76, fontWeight: 900, background: '#fff'}}>✓ CAUGHT</div>
        </>
      )}
      <Key at={at(0.66)} size={104}>NOBODY TOLD IT</Key>
    </Shot>
  );
};

/* 7 ===== morning: sunrise, 8:00, the plan waits; tap Yes ===== */
const Morning: React.FC = () => {
  const f = useCurrentFrame();
  const at = useAt();
  const sky = interpolate(f, [0, at(0.3)], [0, 1], clamp);
  const tap = at(0.68);
  const yes = f >= tap + 4;
  const thumbY = interpolate(f, [at(0.45), tap, tap + 10], [1500, 830, 855], clamp);
  return (
    <Shot bg={PAPER}>
      <div style={{position: 'absolute', left: 770, top: 175, width: 110, height: 110, borderRadius: 55, background: '#F2C14E', opacity: sky, transform: `translateY(${(1 - sky) * 40}px)`}} />
      <Sfx at={at(0.15)} name="tick2" vol={0.3} dur={20} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: MONO, fontSize: 92, fontWeight: 700, color: INK}}>{f < at(0.15) ? '7:59' : '8:00'}</div>
      <div style={{position: 'absolute', left: 540 - 300, top: 330, width: 600, height: 1000, borderRadius: 70, background: '#111', padding: 22, boxShadow: '0 16px 40px rgba(21,21,28,0.18)'}}>
        <div style={{width: '100%', height: '100%', borderRadius: 52, background: PAPER, padding: '90px 26px 0'}}>
          <Pop at={at(0.2)} sfx="ding" style={{position: 'relative'}}>
            <Card style={{padding: '24px 26px', borderRadius: 30}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <GrokBotMark shape="drop" color={M.head.color} size={56} />
                <div>
                  <div style={{fontSize: 24, color: 'rgba(21,21,28,0.55)'}}>Chief Brain · now</div>
                  <div style={{fontSize: 32, fontWeight: 800}}>Today's plan is ready</div>
                </div>
              </div>
              {['Reorder hiking packs', 'Send 6 report cards', 'Hold pack video', 'Reply to 3 hot leads', 'Post Tuesday reel'].map((r, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 26, opacity: interpolate(f, [at(0.25) + i * 3, at(0.25) + i * 3 + 6], [0, 1], clamp)}}>
                  <span style={{width: 34, height: 34, borderRadius: 17, background: yes ? '#2E9E62' : 'rgba(21,21,28,0.1)', color: '#fff', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900}}>{yes ? '✓' : i + 1}</span>
                  {r}
                </div>
              ))}
              <div style={{display: 'flex', gap: 16, marginTop: 24}}>
                <div style={{flex: 1, textAlign: 'center', borderRadius: 9999, padding: '16px 0', fontSize: 32, fontWeight: 800, background: yes ? '#2E9E62' : INK, color: '#fff', transform: `scale(${f >= tap && f < tap + 6 ? 0.92 : 1})`}}>{yes ? 'Approved ✓' : 'Yes'}</div>
                <div style={{width: 160, textAlign: 'center', borderRadius: 9999, padding: '16px 0', fontSize: 32, fontWeight: 700, background: 'rgba(21,21,28,0.08)'}}>No</div>
              </div>
            </Card>
          </Pop>
        </div>
      </div>
      {/* thumb */}
      {f >= at(0.45) && <div style={{position: 'absolute', left: 400, top: thumbY, width: 110, height: 150, borderRadius: '55px 55px 40px 40px', background: '#F2B48C', border: '4px solid #D98F66', opacity: interpolate(f, [tap + 12, tap + 20], [1, 0], clamp)}} />}
      <Sfx at={tap} name="tick1" vol={0.3} dur={20} />
      <Sfx at={tap + 4} name="ding" vol={0.32} dur={40} />
      <Key at={tap + 2} y={1450}>JUST SAY YES</Key>
    </Shot>
  );
};

/* 8 ===== loop: one switch breaks it all → tip 3 locked → full video ===== */
const Loop: React.FC = () => {
  const f = useCurrentFrame();
  const flip = 34;
  const on = interpolate(f, [flip, flip + 5], [0, 1], clamp);
  const flash = interpolate(f, [flip + 4, flip + 8, flip + 26], [0, 0.3, 0], clamp);
  const crack = interpolate(f, [flip + 4, flip + 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const shake = f >= flip + 4 && f < flip + 16 ? Math.sin(f * 2.7) * 12 : 0;
  const tip = 62;
  const end = 100;
  const sw = interpolate(f, [tip - 6, tip], [1, 0], clamp);
  return (
    <Shot bg={PAPER} shake={shake}>
      {/* the switch */}
      <div style={{position: 'absolute', left: 540 - 220, top: 480, opacity: sw, transform: `scale(${0.8 + 0.2 * sw})`}}>
        <Pop at={2} sfx="tick1" style={{position: 'relative'}}>
          <div style={{width: 440, height: 220, borderRadius: 110, background: on > 0.5 ? RED : 'rgba(21,21,28,0.15)', position: 'relative'}}>
            <div style={{position: 'absolute', top: 20, left: 20 + on * 220, width: 180, height: 180, borderRadius: 90, background: '#fff', boxShadow: '0 4px 12px rgba(21,21,28,0.15)'}} />
          </div>
          <div style={{textAlign: 'center', marginTop: 40, fontSize: 48, fontWeight: 800, color: INK, filter: 'blur(8px)'}}>Something on day one</div>
        </Pop>
      </div>
      <Sfx at={flip} name="tick2" vol={0.35} dur={20} />
      <Sfx at={flip + 4} name="whoosh" vol={0.35} dur={30} />
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: sw}}>
        <polyline points="120,300 380,560 320,700 640,860 600,980 900,1200 1000,1500" fill="none" stroke={INK} strokeWidth={7} strokeDasharray={2000} strokeDashoffset={2000 * (1 - crack)} strokeLinejoin="round" />
      </svg>
      <AbsoluteFill style={{background: RED, opacity: flash, mixBlendMode: 'screen'}} />
      {/* tip 3, locked */}
      <Pop at={tip} sfx="pop2" style={{left: 140, top: 360}}>
        <div style={{width: 800, height: 620, borderRadius: 32, background: '#fff', boxShadow: '0 8px 24px rgba(21,21,28,0.07)', border: '1px solid rgba(21,21,28,0.08)', padding: '44px 50px', color: INK, position: 'relative', overflow: 'hidden'}}>
          <div style={{fontSize: 36, letterSpacing: 5, color: ACC, fontWeight: 800}}>TIP 3</div>
          <div style={{fontSize: 54, fontWeight: 800, marginTop: 10}}>The one that breaks it</div>
          <div style={{marginTop: 40, display: 'flex', flexDirection: 'column', gap: 22, filter: 'blur(9px)'}}>
            {[0.9, 0.7, 0.8].map((w, i) => <div key={i} style={{height: 30, width: `${w * 100}%`, background: 'rgba(21,21,28,0.1)', borderRadius: 15}} />)}
          </div>
          <svg width={170} height={210} viewBox="0 0 120 150" style={{position: 'absolute', right: 50, bottom: 40, transform: `rotate(${f > tip + 8 && f < tip + 22 ? Math.sin(f * 1.6) * 10 : 0}deg)`}}>
            <path d="M30 70 V45 a30 30 0 0 1 60 0 V70" fill="none" stroke={ACC} strokeWidth={12} strokeLinecap="round" />
            <rect x={12} y={66} width={96} height={78} rx={16} fill={ACC} />
            <text x={60} y={124} textAnchor="middle" fontFamily={F} fontWeight={800} fontSize={48} fill="#fff">?</text>
          </svg>
        </div>
      </Pop>
      {/* end card */}
      <Pop at={end} sfx="ding" style={{left: 0, right: 0, top: 1190, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        <div style={{background: ACC, color: '#fff', borderRadius: 9999, padding: '26px 56px', fontSize: 64, fontWeight: 900}}>Full video · 6:43 →</div>
        <div style={{display: 'flex', gap: 14}}>
          {TEAM.map((t, i) => <Bot key={t.key} shape={t.shape} color={t.color} size={70} phase={i * 6} bob={3} />)}
        </div>
      </Pop>
      {f < end && <Key at={flip + 6} color={RED} y={1260}>IT BREAKS</Key>}
    </Shot>
  );
};

/* ---------- assembly ---------- */
const slides = (slidesJson as Row[]).map((s, i, a) => ({...s, frames: s.frames + (i === a.length - 1 ? HOLD : 0)}));
const SCENES: Record<string, React.FC> = {hook: Hook, glue: Glue, head: Head, body: Body, shield: ShieldShot, catch: Catch, morning: Morning, loop: Loop};
export const BOT_TEAM_SHORT_FRAMES = slides.reduce((a, s) => a + s.frames, 0);

export const BotTeamShort: React.FC = () => {
  const total = BOT_TEAM_SHORT_FRAMES;
  let start = 0;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {MUSIC_ON && <Audio src={staticFile('shared/sfx/bed.wav')} loop volume={(f) => 0.13 * interpolate(f, [0, 15, total - 40, total], [0, 1, 1, 0], clamp)} />}
      {slides.map((s, i) => {
        const from = start;
        start += s.frames;
        const Scene = SCENES[s.id];
        return (
          <Sequence key={s.id} from={from} durationInFrames={s.frames}>
            <Audio src={staticFile(`bot-team/short/vo/${String(i + 1).padStart(2, '0')}.mp3`)} />
            <Scene />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
