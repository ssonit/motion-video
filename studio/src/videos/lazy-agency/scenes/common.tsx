import React from 'react';
import {Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Sfx, clamp, typed, useAt} from '../../../lib/kit';
import type {P} from '../../../lib/kit';
import {mono} from '../../../lib/Art';
import {BOT_COLORS} from '../../../lib/GrokBotMark';
import type {BotShape} from '../../../lib/GrokBotMark';
import {Abs, Card, Head, In, Pill, R, RSlide} from '../../real/ui';
import {Bot} from '../../real/BotMark';
import {RealShot} from '../../real/RealShot';
import {Pop} from '../../../lib/Pop';

export const ACC = '#ff7a1a';
export const DIM = 'var(--op-dim, rgba(21,21,28,0.58))';
/** Bot colours on the light look (white bots vanish on pastel). */
export const BC: Record<string, string> = {drop: BOT_COLORS.pink, blob: BOT_COLORS.green, circle: BOT_COLORS.blue, pillow: BOT_COLORS.violet};

/**
 * Real evidence images. Put the file in studio/public/lazy-agency/assets/ and set the path here;
 * while a key is empty the scene draws a code-made mock-up instead.
 */
export const ASSETS: Record<string, string | undefined> = {
  builder: undefined, // part 1 shot 3: no-code page builder
  maplisting: undefined, // part 1 shot 8 / part 3 shot 2: map listing without a website
  community: undefined, // part 2 shot 4
  grokleads: undefined, // part 2 shot 7
  grokbuild: undefined, // part 2 shot 11 / part 3 shot 8
  reviewreply: undefined, // part 4 shot 5
};

/* ---------- icons (simple stroked glyphs, no emoji) ---------- */
const PATHS: Record<string, React.ReactNode> = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  star: <polygon points="12,3 14.8,9 21,9.6 16.3,14 17.8,20.5 12,17 6.2,20.5 7.7,14 3,9.6 9.2,9" />,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M9 12h7M9 16h7" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" strokeDasharray="3 2.6" strokeWidth="3.4" /></>,
  coin: <><circle cx="12" cy="12" r="9" /><path d="M14.5 9.2c-.6-1-1.6-1.4-2.6-1.4-1.6 0-2.6.9-2.6 2 0 3 5.4 1.4 5.4 4.2 0 1.2-1.1 2-2.8 2-1.2 0-2.2-.5-2.8-1.5M12 6v2M12 16v2" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l6 6" /></>,
  cal: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  chart: <path d="M3 17l6-6 4 4 8-9" />,
  box: <><path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></>,
  house: <path d="M3 11l9-7 9 7v9H3z" />,
  check: <path d="M4 12l6 6L20 6" />,
  x: <path d="M5 5l14 14M19 5L5 19" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  leaf: <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8" />,
  wrench: <path d="M14 7a4 4 0 105 5l-9 9a2 2 0 01-3-3z" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  people: <><circle cx="9" cy="8" r="3.5" /><circle cx="17" cy="9" r="2.8" /><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5M17 14.5c3 0 5 1.6 5 4.5" /></>,
  camera: <><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-3h5L16 7" /></>,
  dumbbell: <path d="M2 12h20M5 7v10M8 5v14M16 5v14M19 7v10" />,
  window: <><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M12 4v16M4 12h16" /></>,
  fork: <path d="M7 3v8a2 2 0 004 0V3M9 11v10M17 3c-2 2-2 6 0 8v10" />,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  up: <path d="M12 20V5M5 12l7-7 7 7" />,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  link: <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />,
};
export type IcoName = keyof typeof PATHS;

export const Ico: React.FC<{n: IcoName; s?: number; c?: string}> = ({n, s = 26, c = '#fff'}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {PATHS[n]}
  </svg>
);

export const IcoBox: React.FC<{n: IcoName; s?: number; c?: string}> = ({n, s = 46, c = ACC}) => (
  <div style={{width: s, height: s, borderRadius: s * 0.28, background: `${c}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <Ico n={n} s={s * 0.56} c={c} />
  </div>
);

/* ---------- builders ---------- */
export type Row = {ico: IcoName; t: string; s?: string; c?: string};

/* ---------- real Grok Bot screenshots (studio/public/shared/real) ---------- */
export type Crop = {x: number; y: number; w: number; h: number};
export type ShotSpec = {src: string; sw: number; sh: number; crop: Crop; w: number; x?: number; y?: number; hl?: Crop; callout?: string};
export const SHOTS = {
  top: {src: 'shared/real/marketplace-top.jpg', sw: 800, sh: 505},
  cats: {src: 'shared/real/marketplace-cats.jpg', sw: 800, sh: 404},
  connect: {src: 'shared/real/connect-apps.png', sw: 895, sh: 690},
  panel: {src: 'shared/real/side-panel.png', sw: 322, sh: 330},
  detail: {src: 'shared/real/bot-detail.jpg', sw: 800, sh: 505},
  chat: {src: 'shared/real/app-chat.jpg', sw: 2000, sh: 1081},
};

/** Real screenshot cropped to a region (source pixels), slow push-in, optional orange highlight ring + callout pill. */
export const Real: React.FC<{spec: ShotSpec; at: number}> = ({spec, at}) => {
  const f = useCurrentFrame();
  const {src, sw, crop, w, hl, callout} = spec;
  const k = w / crop.w;
  const h = Math.round(crop.h * k);
  const z = interpolate(f, [at, at + 200], [1, 1.04], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Pop at={at} style={{position: 'absolute', left: spec.x ?? (1280 - w) / 2, top: spec.y ?? 195, width: w, height: h}}>
      <div style={{width: w, height: h, borderRadius: 20, overflow: 'hidden', position: 'relative', boxShadow: '0 24px 70px rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.16)', background: '#0a0a0a'}}>
        <div style={{position: 'absolute', inset: 0, transform: `scale(${z})`, transformOrigin: 'center'}}>
          <Img src={staticFile(src)} style={{position: 'absolute', left: -crop.x * k, top: -crop.y * k, width: sw * k, maxWidth: 'none'}} />
          {hl && (
            <Pop at={at + 24} style={{position: 'absolute', left: (hl.x - crop.x) * k, top: (hl.y - crop.y) * k, width: hl.w * k, height: hl.h * k}}>
              <div style={{width: '100%', height: '100%', borderRadius: 14, border: `3px solid ${ACC}`, boxShadow: `0 0 28px ${ACC}88`, boxSizing: 'border-box'}} />
            </Pop>
          )}
        </div>
      </div>
      {callout && (
        <Pop at={at + 34} style={{position: 'absolute', left: 14, top: h + 12}}>
          <div style={{display: 'inline-block', background: ACC, color: '#fff', fontWeight: 700, fontSize: 21, padding: '8px 18px', borderRadius: 12, boxShadow: `0 8px 26px ${ACC}77`, whiteSpace: 'nowrap'}}>{callout}</div>
        </Pop>
      )}
    </Pop>
  );
};

/** A real-screenshot scene: shot left/centre, optional rows on the right, optional chips below. */
export const mkReal = (o: {label: string; title: string; shot: ShotSpec; rows?: Row[]; rowsX?: number; chips?: string[]; chipsY?: number}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const rx = o.rowsX ?? 850;
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      <Real spec={o.shot} at={at(0.04)} />
      {o.rows?.map((r, i) => (
        <Card key={r.t} at={at(0.25) + i * at(0.13)} style={{position: 'absolute', left: rx, top: 200 + i * 78}} box={{width: 1210 - rx, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 14}}>
          <IcoBox n={r.ico} s={40} c={r.c ?? ACC} />
          <div><div style={{fontSize: 22, fontWeight: 600}}>{r.t}</div>{r.s && <div style={{fontSize: 15, color: DIM}}>{r.s}</div>}</div>
        </Card>
      ))}
      {o.chips && (
        <Abs x={110} y={o.chipsY ?? 480} style={{display: 'flex', gap: 12, flexWrap: 'wrap', width: 1060}}>
          {o.chips.map((c, i) => <In key={c} at={at(0.6) + i * 8}><Pill kind="dark" size={21}>{c}</Pill></In>)}
        </Abs>
      )}
    </RSlide>
  );
};

/** Title + rows that pop one by one; optional Bot on the right, optional footer line. */
export const mkRows = (o: {label: string; title: string; rows: Row[]; bot?: BotShape; shot?: ShotSpec; foot?: string; from?: number; to?: number; w?: number; x?: number}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const n = o.rows.length;
  const gap = Math.min(80, 330 / n);
  const a = o.from ?? 0.12;
  const b = o.to ?? 0.8;
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      {o.rows.map((r, i) => (
        <Card key={r.t} at={at(a + ((b - a) * i) / Math.max(1, n))} style={{position: 'absolute', left: o.x ?? 110, top: 195 + i * gap}} box={{width: o.w ?? 640, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 16}}>
          <IcoBox n={r.ico} s={44} c={r.c ?? ACC} />
          <div>
            <div style={{fontSize: 25, fontWeight: 600}}>{r.t}</div>
            {r.s && <div style={{fontSize: 16, color: DIM}}>{r.s}</div>}
          </div>
        </Card>
      ))}
      {o.shot && <Real spec={o.shot} at={at(0.3)} />}
      {o.bot && <Abs x={900} y={230} style={{}}><In at={at(0.1)}><Bot shape={o.bot} color={BC[o.bot]} size={190} /></In></Abs>}
      {o.foot && <In at={at(0.86)} style={{position: 'absolute', left: o.x ?? 110, top: 195 + n * gap + 8}}><Pill kind="ghost" size={21}>{o.foot}</Pill></In>}
    </RSlide>
  );
};

type Tile = {ico: IcoName; t: string; s?: string; hl?: boolean};
/** Row of tiles joined by arrows, optional big line + chips below. */
export const mkTiles = (o: {label: string; title: string; tiles: Tile[]; big?: React.ReactNode; bigAt?: number; chips?: string[]; arrows?: boolean; y?: number}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const n = o.tiles.length;
  const w = Math.min(230, Math.floor(1100 / n) - 44);
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      <Abs x={0} y={o.y ?? 215} style={{width: 1280, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18}}>
        {o.tiles.map((t, i) => (
          <React.Fragment key={t.t}>
            <Card at={at(0.1) + i * at(0.12)} hl={t.hl ? ACC : undefined} box={{width: w, textAlign: 'center', padding: '20px 12px'}}>
              <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}><IcoBox n={t.ico} s={60} c={t.hl ? ACC : '#9aa0ff'} /></div>
              <div style={{fontSize: 24, fontWeight: 600}}>{t.t}</div>
              {t.s && <div style={{fontSize: 16, color: DIM, marginTop: 4}}>{t.s}</div>}
            </Card>
            {o.arrows !== false && i < n - 1 && <In at={at(0.1) + i * at(0.12) + 8} tick={false}><div style={{fontSize: 34, color: DIM}}>→</div></In>}
          </React.Fragment>
        ))}
      </Abs>
      {o.big && <Sfx at={at(o.bigAt ?? 0.7)} name="ding" vol={0.25} dur={40} />}
      {o.big && <In at={at(o.bigAt ?? 0.7)} tick={false} style={{position: 'absolute', left: 0, width: 1280, top: 400, textAlign: 'center', fontSize: 70, fontWeight: 800, letterSpacing: -2}}>{o.big}</In>}
      {o.chips && (
        <Abs x={0} y={o.big ? 490 : 420} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 12}}>
          {o.chips.map((c, i) => <In key={c} at={at(0.55) + i * 8}><Pill kind="dark" size={21}>{c}</Pill></In>)}
        </Abs>
      )}
    </RSlide>
  );
};

/** Bot + typed speech bubble, optional chips. */
export const mkBubble = (o: {label: string; title?: string; text: string; shape?: BotShape; chips?: string[]; big?: string}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="typing" vol={0.15} dur={100} />
      <Head label={o.label}>{o.title ?? o.big ?? ''}</Head>
      <Abs x={110} y={240}><In at={at(0.04)}><Bot shape={o.shape ?? 'drop'} color={BC[o.shape ?? 'drop']} size={170} /></In></Abs>
      <Card at={at(0.08)} style={{position: 'absolute', left: 340, top: 225}} box={{width: 800, borderRadius: 30, padding: '26px 30px'}} hl={ACC}>
        <div style={{fontSize: 34, fontWeight: 600, lineHeight: 1.3, minHeight: 90}}>{typed(o.text, f, at(0.12), 34)}<span style={{opacity: f % 20 < 10 ? 1 : 0, color: ACC}}>▌</span></div>
      </Card>
      {o.chips && (
        <Abs x={340} y={400} style={{display: 'flex', gap: 12, flexWrap: 'wrap', width: 800}}>
          {o.chips.map((c, i) => <In key={c} at={at(0.55) + i * 8}><Pill kind="dark" size={21}>{c}</Pill></In>)}
        </Abs>
      )}
    </RSlide>
  );
};

/** Mock browser window; blocks build one by one. A real screenshot replaces it when ASSETS[asset] is set. */
export const mkBrowser = (o: {label: string; title: string; url: string; blocks?: ('nav' | 'hero' | 'cards' | 'text' | 'cta' | 'gallery')[]; asset?: string; callout?: string; x?: number; w?: number; side?: ShotSpec}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const real = o.asset ? ASSETS[o.asset] : undefined;
  const W = o.w ?? 860;
  const X = o.x ?? (1280 - W) / 2;
  const bl = o.blocks ?? ['nav', 'hero', 'cards', 'cta'];
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      {real ? (
        <Abs x={X} y={190}><RealShot src={real} w={W} h={340} callout={o.callout ? {text: o.callout, x: 30, y: 270, at: at(0.5)} : undefined} /></Abs>
      ) : (
        <Card at={at(0.04)} style={{position: 'absolute', left: X, top: 190}} box={{width: W, height: 340, padding: 0, overflow: 'hidden', background: '#1a1a1d', color: '#fff'}}>
          <div style={{height: 38, background: '#111', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px'}}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => <div key={c} style={{width: 11, height: 11, borderRadius: 6, background: c}} />)}
            <div style={{marginLeft: 14, flex: 1, height: 22, borderRadius: 11, background: 'rgba(255,255,255,0.08)', fontSize: 14, color: 'rgba(255,255,255,0.55)', fontFamily: mono.fontFamily, padding: '0 12px', lineHeight: '22px'}}>{o.url}</div>
          </div>
          <div style={{padding: 18}}>
            {bl.map((b, i) => (
              <In key={b + i} at={at(0.14) + i * at(0.13)} style={{marginBottom: 10}}>
                {b === 'nav' && <div style={{display: 'flex', gap: 10, alignItems: 'center'}}><div style={{width: 60, height: 14, borderRadius: 7, background: ACC}} />{[0, 1, 2].map((k) => <div key={k} style={{width: 50, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.2)'}} />)}</div>}
                {b === 'hero' && <div style={{height: 92, borderRadius: 14, background: 'linear-gradient(120deg,#2d6a3a,#1c3a2a)', padding: 16}}><div style={{width: 300, height: 18, borderRadius: 9, background: 'rgba(255,255,255,0.85)'}} /><div style={{width: 200, height: 11, borderRadius: 6, background: 'rgba(255,255,255,0.4)', marginTop: 10}} /></div>}
                {b === 'cards' && <div style={{display: 'flex', gap: 12}}>{[0, 1, 2].map((k) => <div key={k} style={{flex: 1, height: 58, borderRadius: 12, background: 'rgba(255,255,255,0.1)'}} />)}</div>}
                {b === 'text' && <div><div style={{width: '70%', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.3)', marginBottom: 8}} /><div style={{width: '50%', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.2)'}} /></div>}
                {b === 'cta' && <div style={{width: 170, height: 34, borderRadius: 17, background: ACC, textAlign: 'center', lineHeight: '34px', fontSize: 16, fontWeight: 700}}>Call now</div>}
                {b === 'gallery' && <div style={{display: 'flex', gap: 8}}>{[0, 1, 2, 3, 4].map((k) => <div key={k} style={{flex: 1, height: 52, borderRadius: 8, background: `hsl(${120 + k * 8},35%,${26 + k * 3}%)`}} />)}</div>}
              </In>
            ))}
          </div>
        </Card>
      )}
      {o.side && <Real spec={o.side} at={at(0.5)} />}
      {o.callout && !real && <In at={at(0.6)} style={{position: 'absolute', left: X + W - 300, top: 500}}><Pill kind="white" size={22}>{o.callout}</Pill></In>}
    </RSlide>
  );
};

/** 3-column table that fills row by row; last column highlighted. */
export const mkTable = (o: {label: string; title: string; cols: string[]; rows: string[][]}): React.FC<P> => ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      <Abs x={110} y={195} style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 12, width: 1060}}>
        {o.cols.map((c, i) => <In key={c} at={at(0.04) + i * 5} tick={false}><div style={{fontFamily: mono.fontFamily, fontSize: 18, letterSpacing: 2, color: i === 2 ? ACC : DIM, textTransform: 'uppercase'}}>{c}</div></In>)}
        {o.rows.map((r, ri) => r.map((cell, ci) => (
          <Card key={`${ri}-${ci}`} at={at(0.14) + ri * at(0.16) + ci * 5} hl={ci === 2 ? ACC : undefined} box={{padding: '16px 18px', fontSize: 24, fontWeight: 600, minHeight: 56}}>{cell}</Card>
        )))}
      </Abs>
    </RSlide>
  );
};

/** Two or three big cards with a verdict pill each. */
export const mkVerdict = (o: {label: string; title: string; cards: {ico: IcoName; t: string; s: string; ok: boolean}[]}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const n = o.cards.length;
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      <Abs x={0} y={200} style={{width: 1280, display: 'flex', justifyContent: 'center', gap: 28}}>
        {o.cards.map((c, i) => (
          <Card key={c.t} at={at(0.1) + i * at(0.2)} hl={c.ok ? R.green : undefined} box={{width: n === 2 ? 420 : 320, textAlign: 'center', padding: '26px 20px', opacity: c.ok ? 1 : 0.9}}>
            <div style={{display: 'flex', justifyContent: 'center'}}><IcoBox n={c.ico} s={74} c={c.ok ? R.green : '#ff5a6e'} /></div>
            <div style={{fontSize: 28, fontWeight: 700, marginTop: 12}}>{c.t}</div>
            <div style={{fontSize: 19, color: DIM, marginTop: 6, marginBottom: 14}}>{c.s}</div>
            <In at={at(0.3) + i * at(0.2)}><Pill kind={c.ok ? 'white' : 'ghost'} size={20}>{c.ok ? 'Worth selling' : 'Wasted on them'}</Pill></In>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/** Horizontal bars that grow. */
export const mkBars = (o: {label: string; title: string; bars: {t: string; v: number; max: number; unit: string; c?: string}[]; note?: string}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      {o.bars.map((b, i) => {
        const p = interpolate(f, [at(0.15 + i * 0.2), at(0.45 + i * 0.2)], [0, b.v / b.max], {...clamp, easing: Easing.out(Easing.cubic)});
        return (
          <Abs key={b.t} x={110} y={215 + i * 120} style={{width: 1060}}>
            <div style={{fontSize: 24, fontWeight: 600, marginBottom: 8}}>{b.t} <span style={{color: DIM, fontWeight: 400}}>· {Math.round(p * b.max)} {b.unit}</span></div>
            <div style={{height: 38, borderRadius: 19, background: 'rgba(21,21,28,0.10)'}}><div style={{width: `${p * 100}%`, height: '100%', borderRadius: 19, background: b.c ?? ACC}} /></div>
          </Abs>
        );
      })}
      {o.note && <In at={at(0.8)} style={{position: 'absolute', left: 110, top: 215 + o.bars.length * 120}}><Pill kind="ghost" size={22}>{o.note}</Pill></In>}
    </RSlide>
  );
};

/** Grid of icon cards, lit one after another by a beam of orange. */
export const mkGrid = (o: {label: string; title: string; items: {ico: IcoName; t: string}[]}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const n = o.items.length;
  const lit = Math.min(n - 1, Math.max(0, Math.floor(((f - at(0.3)) / (at(0.9) - at(0.3))) * n)));
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      <Abs x={110} y={200} style={{display: 'grid', gridTemplateColumns: 'repeat(4, 255px)', gap: 16}}>
        {o.items.map((it, i) => (
          <Card key={it.t} at={at(0.05) + i * 4} hl={i === lit && f > at(0.3) ? ACC : undefined} box={{display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px'}}>
            <IcoBox n={it.ico} s={44} c={i === lit && f > at(0.3) ? ACC : '#9aa0ff'} />
            <div style={{fontSize: 22, fontWeight: 600}}>{it.t}</div>
          </Card>
        ))}
      </Abs>
    </RSlide>
  );
};

/** Big statement lines with an optional Bot. */
export const mkStatement = (o: {label: string; lines: string[]; sub?: string; bot?: BotShape; bg?: string}): React.FC<P> => ({vo}) => {
  const at = useAt();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.12)} name="ding" vol={0.22} dur={40} />
      <Abs x={0} y={150} style={{width: 1280, textAlign: 'center', fontFamily: mono.fontFamily, color: ACC, fontSize: 22, letterSpacing: 4}}>{o.label}</Abs>
      {o.lines.map((l, i) => (
        <In key={l} at={at(0.06) + i * at(0.14)} tick={false} style={{position: 'absolute', left: 0, width: 1280, top: 205 + i * 92, textAlign: 'center', fontSize: 76, fontWeight: 800, letterSpacing: -2}}>
          {l.split(/\*([^*]+)\*/).map((p, k) => (k % 2 ? <span key={k} style={{color: ACC}}>{p}</span> : p))}
        </In>
      ))}
      {o.sub && <In at={at(0.6)} style={{position: 'absolute', left: 0, width: 1280, top: 205 + o.lines.length * 92 + 14, textAlign: 'center'}}><Pill kind="ghost" size={24}>{o.sub}</Pill></In>}
      {o.bot && <Abs x={1010} y={380}><In at={at(0.3)}><Bot shape={o.bot} color={BC[o.bot]} size={150} /></In></Abs>}
    </RSlide>
  );
};

/** Progress bar with a big count. */
export const mkProgress = (o: {label: string; title: string; to: number; unit: string; marks: number[]; sub?: string}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const v = interpolate(f, [at(0.1), at(0.7)], [0, o.to], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <RSlide vo={vo}>
      <Head label={o.label}>{o.title}</Head>
      <Abs x={110} y={215} style={{width: 1060}}>
        <div style={{fontSize: 110, fontWeight: 800, letterSpacing: -4}}>{Math.round(v)}<span style={{fontSize: 36, color: DIM, fontWeight: 500}}> {o.unit}</span></div>
        <div style={{position: 'relative', height: 34, borderRadius: 17, background: 'rgba(21,21,28,0.10)', marginTop: 14}}>
          <div style={{width: `${(v / (o.marks[o.marks.length - 1] * 1.1)) * 100}%`, height: '100%', borderRadius: 17, background: ACC}} />
          {o.marks.map((m) => <div key={m} style={{position: 'absolute', left: `${(m / (o.marks[o.marks.length - 1] * 1.1)) * 100}%`, top: -6, height: 46, width: 3, background: '#1d1d26'}} />)}
        </div>
        <div style={{position: 'relative', height: 30, marginTop: 8}}>
          {o.marks.map((m) => <div key={m} style={{position: 'absolute', left: `${(m / (o.marks[o.marks.length - 1] * 1.1)) * 100}%`, transform: 'translateX(-50%)', fontFamily: mono.fontFamily, fontSize: 20, color: DIM}}>{m}</div>)}
        </div>
        {o.sub && <In at={at(0.78)}><Pill kind="ghost" size={22}>{o.sub}</Pill></In>}
      </Abs>
      <Sfx at={at(0.7)} name="ding" vol={0.22} dur={40} />
    </RSlide>
  );
};
