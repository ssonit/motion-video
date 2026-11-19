import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {At, D, inter, mono, Phone} from '../../lib/Art';
import {Pop} from '../../lib/Pop';
import {Arrow, Card, Chip, clamp, Em, Sfx, Slide, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {Pip, Slot} from '../../lib/Slot';
import type {PipPos} from '../../lib/Slot';

/**
 * DATA-DRIVEN TEMPLATES learned from the Grok Bot reference (references/bot-guide-cn).
 * Each factory returns a normal shot component (React.FC<P>) so it drops into a SCENES map:
 *   const SCENES = { intro: textBuild({eyebrow:'ZERO TO ONE', head:<>…</>, flow:[…], pip:'br-circle'}), … }
 * `pip` = where the presenter footage overlay goes (null = none). Footage files come from footage.json via <Slot>.
 */

/* ------------------------------------------------------------------ 1. dark text slide that BUILDS UP */
export type FlowItem = {tag?: string; title: string; sub?: string; hl?: boolean};

export const textBuild =
  (cfg: {
    eyebrow: string;
    head: React.ReactNode;
    flow?: FlowItem[];
    chips?: string[];
    note?: React.ReactNode;
    pip?: PipPos | null;
  }): React.FC<P> =>
  ({n, vo}) => {
    const t = useAt();
    const flow = cfg.flow ?? [];
    return (
      <Slide n={n} vo={vo} eyebrow={cfg.eyebrow} head={cfg.head} compact bg="ember">
        <div style={{position: 'absolute', left: 72, top: 240, width: 880}}>
          {flow.length > 0 && (
            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
              {flow.map((it, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <Arrow at={t(0.12 + i * 0.14) - 4} />}
                  <Card
                    at={t(0.12 + i * 0.14)}
                    hl={it.hl ?? i === flow.length - 1}
                    box={{minWidth: 190, padding: '16px 20px'}}
                  >
                    {it.tag && (
                      <div style={{fontFamily: mono.fontFamily, fontSize: 14, color: D.mute, marginBottom: 6}}>
                        {it.tag}
                      </div>
                    )}
                    <div style={{fontSize: 28, fontWeight: 800}}>{it.title}</div>
                    {it.sub && <div style={{fontSize: 16, color: D.mute, marginTop: 6}}>{it.sub}</div>}
                  </Card>
                </React.Fragment>
              ))}
            </div>
          )}
          {cfg.chips && (
            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: flow.length ? 36 : 0}}>
              {cfg.chips.map((c, i) => (
                <Chip key={c} at={t(0.45 + i * 0.07)} hl={i === cfg.chips!.length - 1}>
                  {c}
                </Chip>
              ))}
            </div>
          )}
          {cfg.note && (
            <Pop at={t(0.7)} style={{marginTop: 34, fontSize: 30, fontWeight: 700, color: D.ink}}>
              {cfg.note}
            </Pop>
          )}
        </div>
        {cfg.pip !== null && <Pip pos={cfg.pip ?? 'br-circle'} />}
      </Slide>
    );
  };

/* ------------------------------------------------------------------ 2. one giant word, optional strike-through lines */
export const bigWord =
  (cfg: {eyebrow: string; word: string; strike?: string[]; pip?: PipPos | null}): React.FC<P> =>
  ({n, vo}) => {
    const t = useAt();
    const f = useCurrentFrame();
    const grow = interpolate(f, [0, 20], [0.9, 1], clamp);
    return (
      <Slide n={n} vo={vo} eyebrow={cfg.eyebrow} head={null} bare bg="ember">
        <Sfx at={4} name="ding" vol={0.25} />
        <At x={72} y={70}>
          <div style={{fontFamily: mono.fontFamily, fontSize: 17, letterSpacing: 2, color: D.orange}}>
            {cfg.eyebrow}
          </div>
        </At>
        <At x={72} y={150} style={{transform: `scale(${grow})`, transformOrigin: 'left center'}}>
          <div style={{fontSize: 190, fontWeight: 800, color: D.ink, letterSpacing: -4, lineHeight: 1}}>
            {cfg.word}
          </div>
        </At>
        {cfg.strike && (
          <At x={760} y={110}>
            <Pop at={t(0.3)}>
              <div
                style={{
                  background: D.card,
                  border: `2px solid ${D.line}`,
                  borderRadius: 16,
                  padding: '14px 20px',
                  color: D.mute,
                  fontSize: 22,
                  textDecoration: 'line-through',
                }}
              >
                {cfg.strike.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </div>
            </Pop>
          </At>
        )}
        {cfg.pip !== null && <Pip pos={cfg.pip ?? 'br-circle'} />}
      </Slide>
    );
  };

/* ------------------------------------------------------------------ 3. real screen recording on a colourful wallpaper */
export const screenRec =
  (cfg: {
    label?: string;
    pills?: string[];
    pip?: PipPos | null;
    /** orange callout box pointing at something (reference: "action → touch") */
    callout?: string;
  }): React.FC<P> =>
  ({n, vo}) => {
    const t = useAt();
    return (
      <Slide n={n} vo={vo} eyebrow="" bare bg="screen">
        <At x={170} y={26}>
          <Pop at={4}>
            <div
              style={{
                width: 940,
                height: 440,
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
                border: '1.5px solid rgba(255,255,255,0.5)',
              }}
            >
              <Slot role="main" label={cfg.label ?? 'screen recording'} />
            </div>
          </Pop>
        </At>
        {cfg.callout && (
          <At x={90} y={190}>
            <Pop at={t(0.35)}>
              <div
                style={{
                  background: D.orange,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 22,
                  padding: '10px 18px',
                  borderRadius: 12,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                }}
              >
                {cfg.callout}
              </div>
            </Pop>
          </At>
        )}
        {cfg.pills && (
          <At x={0} y={486} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 12}}>
            {cfg.pills.map((p, i) => (
              <Chip key={p} at={t(0.15 + i * 0.12)} hl={i === cfg.pills!.length - 1}>
                {p}
              </Chip>
            ))}
          </At>
        )}
        {cfg.pip !== null && <Pip pos={cfg.pip ?? 'tr-round'} />}
      </Slide>
    );
  };

/* ------------------------------------------------------------------ 4. phone screen recording, big faded word behind */
export const phoneRec =
  (cfg: {
    chapter: string; // "06 · quick launch"
    bgWord: string; // repeated faint wallpaper text
    label?: string;
    callout?: string;
    pip?: PipPos | null;
  }): React.FC<P> =>
  ({n, vo}) => {
    const t = useAt();
    const f = useCurrentFrame();
    return (
      <Slide n={n} vo={vo} eyebrow="" bare bg="none">
        <AbsoluteFill style={{overflow: 'hidden', opacity: 0.1}}>
          {Array.from({length: 7}).map((_, r) => (
            <div
              key={r}
              style={{
                whiteSpace: 'nowrap',
                fontSize: 78,
                fontWeight: 800,
                color: D.orange,
                transform: `translateX(${((r % 2 ? 1 : -1) * f) / 2 - 200}px)`,
                lineHeight: 1.15,
              }}
            >
              {Array.from({length: 9}).map(() => cfg.bgWord).join('  ')}
            </div>
          ))}
        </AbsoluteFill>
        <At x={28} y={20}>
          <div style={{fontFamily: inter.fontFamily, fontSize: 19, fontWeight: 800, color: D.ink}}>
            <span style={{color: D.orange}}>{cfg.chapter.split('·')[0]}</span>
            {cfg.chapter.includes('·') ? ' ' + cfg.chapter.split('·')[1] : ''}
          </div>
        </At>
        <At x={485} y={12}>
          <Pop at={4}>
            <Phone w={310} h={530} glow="rgba(255,122,47,0.25)">
              <Slot role="main" label={cfg.label ?? 'phone recording'} />
            </Phone>
          </Pop>
        </At>
        {cfg.callout && (
          <At x={150} y={150}>
            <Pop at={t(0.3)}>
              <div
                style={{
                  background: D.orange,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 22,
                  padding: '10px 18px',
                  borderRadius: 10,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                }}
              >
                {cfg.callout}
              </div>
            </Pop>
          </At>
        )}
        {cfg.pip !== null && <Pip pos={cfg.pip ?? 'br-circle'} />}
      </Slide>
    );
  };

/* ------------------------------------------------------------------ 5. any illustration + presenter PiP on top */
export const withPip =
  (Comp: React.FC<P>, pos: PipPos = 'tl-round'): React.FC<P> =>
  (props) => (
    <>
      <Comp {...props} />
      <Pip pos={pos} />
    </>
  );

/* ------------------------------------------------------------------ 6. stacked posters / covers with arrows */
export const posterStack =
  (cfg: {titles: string[]; pip?: PipPos | null; label?: string}): React.FC<P> =>
  ({n, vo}) => {
    const t = useAt();
    const hues = [D.pink, D.blue, D.violet, D.orange];
    return (
      <Slide n={n} vo={vo} eyebrow="" bare bg="dusk">
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 18, paddingBottom: 270}}>
          {cfg.titles.map((title, i) => (
            <React.Fragment key={title}>
              {i > 0 && <Arrow at={t(0.12 + i * 0.16) - 4} />}
              <Pop at={t(0.1 + i * 0.16)}>
                <div
                  style={{
                    width: 230,
                    height: 300,
                    borderRadius: 18,
                    transform: `rotate(${(i % 2 ? 1 : -1) * 2}deg)`,
                    background: `linear-gradient(160deg, ${hues[i % 4]}, #14102A)`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 40px ${hues[i % 4]}55`,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 18,
                    fontSize: 34,
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1.1,
                    fontFamily: inter.fontFamily,
                  }}
                >
                  {title}
                </div>
              </Pop>
            </React.Fragment>
          ))}
        </AbsoluteFill>
        {cfg.pip !== null && <Pip pos={cfg.pip ?? 'bl-round'} />}
      </Slide>
    );
  };

/* ------------------------------------------------------------------ 7. white chat/contacts panel on a dark pattern */
export const chatPanel =
  (cfg: {title: string; rows: {name: string; msg: string}[]; pip?: PipPos | null; chapter?: string}): React.FC<P> =>
  ({n, vo}) => {
    const t = useAt();
    const cols = [D.violet, D.orange, D.pink, D.blue, D.mint];
    return (
      <Slide n={n} vo={vo} eyebrow="" bare bg="none">
        <AbsoluteFill style={{opacity: 0.07, fontSize: 70, fontWeight: 800, color: '#fff', lineHeight: 1.2}}>
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} style={{whiteSpace: 'nowrap', marginLeft: i % 2 ? -120 : 0}}>
              {Array.from({length: 8}).map(() => cfg.title).join('   ')}
            </div>
          ))}
        </AbsoluteFill>
        {cfg.chapter && (
          <At x={28} y={20}>
            <div style={{fontSize: 22, fontWeight: 800, color: D.ink}}>
              <span style={{color: D.orange}}>{cfg.chapter}</span>
            </div>
          </At>
        )}
        <At x={330} y={24}>
          <Pop at={4}>
            <div
              style={{
                width: 560,
                background: '#fff',
                borderRadius: 22,
                padding: '16px 20px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                fontFamily: inter.fontFamily,
              }}
            >
              <div style={{fontSize: 18, fontWeight: 700, color: '#555', textAlign: 'center', marginBottom: 8}}>
                {cfg.title}
              </div>
              {cfg.rows.map((r, i) => (
                <Pop key={r.name} at={t(0.12 + i * 0.1)}>
                  <div style={{display: 'flex', gap: 14, alignItems: 'center', padding: '9px 0', borderTop: '1px solid #EEE'}}>
                    <div style={{width: 44, height: 44, borderRadius: 22, background: cols[i % 5]}} />
                    <div style={{flex: 1}}>
                      <div style={{fontSize: 20, fontWeight: 800, color: '#1A1A22'}}>{r.name}</div>
                      <div style={{fontSize: 16, color: '#7A7A88'}}>{r.msg}</div>
                    </div>
                    <div style={{width: 10, height: 10, borderRadius: 5, background: D.blue}} />
                  </div>
                </Pop>
              ))}
            </div>
          </Pop>
        </At>
        {cfg.pip !== null && <Pip pos={cfg.pip ?? 'br-circle'} />}
      </Slide>
    );
  };

/* ------------------------------------------------------------------ 8. "real case": app window (footage) + numbered list */
export const realCase =
  (cfg: {eyebrow: string; head: React.ReactNode; items: string[]; tag?: string; pip?: PipPos | null}): React.FC<P> =>
  ({n, vo}) => {
    const t = useAt();
    return (
      <Slide n={n} vo={vo} eyebrow={cfg.eyebrow} head={cfg.head} compact bg="ember">
        <At x={72} y={190}>
          <Pop at={t(0.1)}>
            <div style={{width: 560, height: 310, borderRadius: 16, overflow: 'hidden', border: `2px solid ${D.line}`}}>
              <Slot role="main" label="app / screen" />
            </div>
          </Pop>
        </At>
        {cfg.tag && (
          <At x={100} y={166}>
            <Chip at={t(0.2)} hl size={18}>
              {cfg.tag}
            </Chip>
          </At>
        )}
        <At x={660} y={190} style={{width: 300}}>
          {cfg.items.map((it, i) => (
            <Card
              key={it}
              at={t(0.3 + i * 0.12)}
              hl={i === cfg.items.length - 1}
              style={{marginBottom: 14}}
              box={{padding: '14px 20px'}}
            >
              <span style={{fontFamily: mono.fontFamily, fontSize: 14, color: D.mute}}>0{i + 1}</span>
              <div style={{fontSize: 26, fontWeight: 800}}>{it}</div>
            </Card>
          ))}
        </At>
        {cfg.pip !== null && <Pip pos={cfg.pip ?? 'br-circle'} />}
      </Slide>
    );
  };

/* ------------------------------------------------------------------ 9. closing card: brush word + light beams */
export const closer =
  (cfg: {word: string; sub?: string}): React.FC<P> =>
  ({n, vo}) => {
    const f = useCurrentFrame();
    const o = interpolate(f, [10, 40], [0, 1], clamp);
    return (
      <Slide n={n} vo={vo} eyebrow="" bare bg="none">
        <AbsoluteFill
          style={{
            background:
              'conic-gradient(from 200deg at 12% -10%, transparent 0 8%, rgba(255,255,255,0.14) 12%, transparent 18%, rgba(255,255,255,0.08) 26%, transparent 34%)',
          }}
        />
        <AbsoluteFill style={{background: 'radial-gradient(500px 300px at 100% 100%, rgba(255,122,47,0.35), transparent)'}} />
        <Sfx at={10} name="ding" vol={0.3} />
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: o, paddingBottom: 90}}>
          <div
            style={{
              fontSize: 190,
              fontWeight: 800,
              color: '#E9E9EE',
              letterSpacing: -6,
              fontStyle: 'italic',
              textShadow: '0 0 40px rgba(255,255,255,0.25)',
            }}
          >
            {cfg.word}
          </div>
          {cfg.sub && (
            <div style={{fontFamily: mono.fontFamily, fontSize: 24, letterSpacing: 14, color: '#D33'}}>{cfg.sub}</div>
          )}
        </AbsoluteFill>
      </Slide>
    );
  };

export {Em};
