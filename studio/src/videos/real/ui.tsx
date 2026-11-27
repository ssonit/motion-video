import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Pop} from '../../lib/Pop';
import {BOT_COLORS} from '../../lib/GrokBotMark';
import type {BotShape} from '../../lib/GrokBotMark';
import {inter, mono} from '../../lib/Art';
import {Captions, Sfx, clamp} from '../../lib/kit';
import {Bot} from './BotMark';

/**
 * "Real-look" UI kit: recreated from the Grok Bot screenshots + design tokens
 * (references/grok-bot-ui/README.md). Dark #0A0A0A page, #202020 cards, fully-rounded pills,
 * white primary button, GrokBotMark avatars. Fan-made, all text invented.
 */
export const R = {
  bg: '#0A0A0A',
  panel: '#111111',
  card: '#202020',
  card2: '#171717',
  line: 'rgba(255,255,255,0.09)',
  text: '#FFFFFF',
  mute: 'rgba(255,255,255,0.7)',
  dim: 'rgba(255,255,255,0.42)',
  user: '#E0398E',
  ...BOT_COLORS,
};

export type BotSpec = {name: string; shape: BotShape; color: string};

/** Page shell: dark bg, fade in/out, whoosh at start, captions. No footer. */
export const RSlide: React.FC<{
  vo: string;
  bg?: string;
  children?: React.ReactNode;
  captions?: boolean;
}> = ({vo, bg = R.bg, children, captions = true}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const o = interpolate(frame, [0, 8, durationInFrames - 8, durationInFrames], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{opacity: o, background: bg === R.bg ? `var(--op-bg, ${R.bg})` : bg, fontFamily: inter.fontFamily, color: `var(--op-text, ${R.text})`}}>
      <Sfx at={0} name="whoosh" vol={0.3} dur={30} />
      {children}
      <Footer />
      {captions && <Captions text={vo} />}
    </AbsoluteFill>
  );
};

export const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  x,
  y,
  w,
  h,
  children,
  style,
}) => <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>;

/** Pop-in with an optional tick sound. */
export const In: React.FC<{at: number; tick?: boolean; style?: React.CSSProperties; children: React.ReactNode}> = ({
  at,
  tick = true,
  style,
  children,
}) => (
  <>
    {tick && at >= 0 && <Sfx at={at} name={`tick${(((Math.round(at) % 3) + 3) % 3) + 1}`} vol={0.16} />}
    <Pop at={at} style={style}>
      {children}
    </Pop>
  </>
);

export const Pill: React.FC<{
  children: React.ReactNode;
  kind?: 'white' | 'dark' | 'active' | 'ghost';
  size?: number;
  style?: React.CSSProperties;
}> = ({children, kind = 'dark', size = 20, style}) => {
  const k = {
    white: {background: '#fff', color: R.bg},
    active: {background: '#fff', color: R.bg},
    dark: {background: `var(--op-pill, var(--op-card, ${R.card}))`, color: 'var(--op-pill-fg, #fff)'},
    ghost: {background: 'transparent', color: `var(--op-mute, ${R.mute})`, border: `1.5px solid var(--op-line, ${R.line})`},
  }[kind];
  return (
    <div
      style={{
        ...k,
        fontSize: size,
        fontWeight: 500,
        borderRadius: 9999,
        padding: `${Math.round(size * 0.42)}px ${Math.round(size * 1.05)}px`,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Label: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = `var(--op-dim, ${R.dim})`}) => (
  <div style={{fontFamily: mono.fontFamily, fontSize: 16, letterSpacing: 2, color, textTransform: 'uppercase'}}>{children}</div>
);

/** `*word*` inside a string headline = accent-coloured keyword (orange in the series theme). */
const kw = (c: React.ReactNode) =>
  typeof c === 'string'
    ? c.split(/\*([^*]+)\*/).map((part, i) =>
        i % 2 ? (
          <span key={i} style={{color: 'var(--op-accent, inherit)'}}>
            {part}
          </span>
        ) : (
          part
        ),
      )
    : c;

/** Footer text (set by a part wrapper), bottom-left like the reference. */
export const FooterCtx = React.createContext('');
const Footer: React.FC = () => {
  const t = React.useContext(FooterCtx);
  return t ? (
    <div style={{position: 'absolute', left: 44, bottom: 30, fontFamily: mono.fontFamily, fontSize: 13, letterSpacing: 2, color: 'var(--op-foot, rgba(255,255,255,0.35))'}}>{t}</div>
  ) : null;
};

/** Scene headline: small label + big title, top-left. */
export const Head: React.FC<{label: string; children: React.ReactNode; size?: number}> = ({label, children, size = 54}) => (
  <>
    <Pop at={2} style={{position: 'absolute', left: 72, top: 40}}>
      <Label color="var(--op-eyebrow, rgba(255,255,255,0.42))">{label}</Label>
    </Pop>
    <Pop at={6} style={{position: 'absolute', left: 72, top: 68}}>
      <div style={{fontSize: size, fontWeight: 'var(--op-hw, 500)' as unknown as number, lineHeight: 1.08, letterSpacing: -1.2}}>{kw(children)}</div>
    </Pop>
  </>
);

export const Card: React.FC<{
  at: number;
  style?: React.CSSProperties;
  box?: React.CSSProperties;
  children: React.ReactNode;
  hl?: string;
}> = ({at, style, box, children, hl}) => (
  <In at={at} style={style}>
    <div
      style={{
        background: `var(--op-card, ${R.card})`,
        borderRadius: 22,
        padding: '18px 22px',
        border: hl ? `2px solid ${hl}` : `1px solid var(--op-line, ${R.line})`,
        boxShadow: hl ? `0 0 44px ${hl}33` : 'var(--op-shadow, none)',
        ...box,
      }}
    >
      {children}
    </div>
  </In>
);

/** Round avatar with a bot mark (rail avatars). */
export const Avatar: React.FC<{bot: BotSpec; size?: number; ring?: boolean; phase?: number}> = ({bot, size = 56, ring, phase = 0}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: '#161616',
      boxShadow: ring ? `0 0 0 3px ${bot.color}` : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Bot shape={bot.shape} color={bot.color} size={size * 0.62} phase={phase} bob={2} />
  </div>
);

/* ---------- tiny icons ---------- */
export const IconSearch: React.FC<{s?: number}> = ({s = 18}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);
export const IconPlus: React.FC<{s?: number}> = ({s = 18}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconMic: React.FC<{s?: number; c?: string}> = ({s = 18, c = '#fff'}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round">
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0014 0M12 18v3" />
  </svg>
);
export const IconWave: React.FC<{s?: number; c?: string}> = ({s = 18, c = '#fff'}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.4} strokeLinecap="round">
    <path d="M5 10v4M9 6v12M13 9v6M17 4v16M21 10v4" />
  </svg>
);
export const IconCheck: React.FC<{s?: number; c?: string}> = ({s = 18, c = R.green}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);
export const IconClock: React.FC<{s?: number}> = ({s = 20}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
const Chev: React.FC<{d?: 'r' | 'd'}> = ({d = 'r'}) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2.6} strokeLinecap="round" transform={d === 'd' ? 'rotate(90)' : undefined}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

/** Round app icon tile (Connect Apps list). */
export const AppIcon: React.FC<{name: string; bg: string; fg?: string; size?: number}> = ({name, bg, fg = '#fff', size = 44}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.24, background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.5, fontWeight: 800, flexShrink: 0}}>
    {name}
  </div>
);

/** Bottom input pill: + · placeholder/typed text · mic · coloured wave button. */
export const InputPill: React.FC<{text?: string; placeholder: string; color?: string; w?: number; cursor?: boolean; size?: number}> = ({
  text,
  placeholder,
  color = R.pink,
  w = 560,
  cursor,
  size = 17,
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        width: w,
        height: size * 2.6,
        borderRadius: 9999,
        background: R.card2,
        border: `1.5px solid ${R.line}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '0 10px 0 14px',
      }}
    >
      <IconPlus s={size + 2} />
      <div style={{flex: 1, fontSize: size, color: text ? '#fff' : R.dim, whiteSpace: 'nowrap', overflow: 'hidden'}}>
        {text ? text : placeholder}
        {cursor && <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>▌</span>}
      </div>
      <IconMic s={size + 1} c="rgba(255,255,255,0.75)" />
      <div style={{width: size * 1.9, height: size * 1.9, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <IconWave s={size} />
      </div>
    </div>
  );
};

/* ================= App window ================= */
export type Thread = {name: string; prev: string; shape: BotShape; color: string; unread?: boolean};
export type Msg = {who: 'bot' | 'me'; text: string; at: number; time?: string};

export const AppWindow: React.FC<{
  w?: number;
  h?: number;
  threads: Thread[];
  active: number;
  avatars?: BotSpec[];
  msgs: Msg[];
  bot: BotSpec;
  input?: {text?: string; placeholder?: string; cursor?: boolean};
  panel?: React.ReactNode;
  tab?: 'Activity' | 'Library';
  rail?: boolean;
  fs?: number;
  title?: string;
}> = ({w = 1136, h = 490, threads, active, avatars, msgs, bot, input, panel, tab = 'Activity', rail = true, fs = 16, title}) => {
  const frame = useCurrentFrame();
  const railW = rail ? 232 : 0;
  const panelW = panel ? 250 : 0;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 18,
        background: R.bg,
        border: `1.5px solid ${R.line}`,
        boxShadow: '0 30px 90px rgba(0,0,0,0.7), 0 0 0 1px #000',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {rail && (
        <div style={{width: railW, background: '#0D0D0D', borderRight: `1px solid ${R.line}`, padding: '14px 12px', display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
            {[<IconSearch key="s" s={15} />, <IconPlus key="p" s={15} />].map((ic, i) => (
              <div key={i} style={{width: 30, height: 30, borderRadius: '50%', background: R.card, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {ic}
              </div>
            ))}
          </div>
          {avatars && (
            <div style={{display: 'flex', gap: 14, justifyContent: 'center', margin: '10px 0 8px'}}>
              {avatars.map((a, i) => (
                <div key={a.name} style={{textAlign: 'center'}}>
                  <Avatar bot={a} size={50} phase={i * 9} />
                  <div style={{fontSize: 11, color: R.mute, marginTop: 4}}>{a.name}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden', marginTop: avatars ? 4 : 10}}>
            {threads.map((t, i) => (
              <div
                key={t.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 8px',
                  borderRadius: 12,
                  background: i === active ? R.card : 'transparent',
                }}
              >
                <Bot shape={t.shape} color={t.color} size={30} phase={i * 7} bob={1.5} />
                <div style={{minWidth: 0, flex: 1}}>
                  <div style={{fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{t.name}</div>
                  <div style={{fontSize: 12, color: R.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{t.prev}</div>
                </div>
                {t.unread && <div style={{width: 8, height: 8, borderRadius: 4, background: R.blue}} />}
              </div>
            ))}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <div style={{width: 30, height: 30, borderRadius: '50%', background: R.card, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>YO</div>
            <Pill size={13} style={{flex: 1, justifyContent: 'center'}}>
              Connect apps
            </Pill>
          </div>
        </div>
      )}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0 16px', minWidth: 0}}>
        {title && <div style={{fontSize: 13, color: R.dim, marginBottom: 6}}>{title}</div>}
        <div style={{flex: 1, width: Math.min(560, w - railW - panelW - 60), display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 12, overflow: 'hidden', paddingBottom: 12}}>
          {msgs
            .filter((m) => frame >= m.at)
            .map((m, i) => (
              <In key={i} at={m.at} style={{alignSelf: m.who === 'me' ? 'flex-end' : 'stretch'}}>
                {m.who === 'me' ? (
                  <div style={{background: R.user, borderRadius: 9999, padding: '9px 18px', fontSize: fs, fontWeight: 500, maxWidth: 400}}>{m.text}</div>
                ) : (
                  <div style={{background: '#161616', border: `1px solid ${R.line}`, borderRadius: 16, padding: '12px 16px', fontSize: fs, lineHeight: 1.4, color: 'rgba(255,255,255,0.92)'}}>{m.text}</div>
                )}
              </In>
            ))}
        </div>
        {input && <InputPill text={input.text} placeholder={input.placeholder ?? `Message ${bot.name}`} color={bot.color === R.white ? R.pink : bot.color} w={Math.min(560, w - railW - panelW - 60)} cursor={input.cursor} size={15} />}
      </div>
      {panel && (
        <div style={{width: panelW, borderLeft: `1px solid ${R.line}`, background: '#0D0D0D', padding: '16px 14px', display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Bot shape={bot.shape} color={bot.color} size={72} bob={3} />
            <div style={{fontSize: 18, fontWeight: 500, marginTop: 6}}>{bot.name}</div>
            <div style={{display: 'flex', gap: 6, marginTop: 10, fontSize: 13}}>
              <span style={{background: tab === 'Activity' ? R.card : 'transparent', color: tab === 'Activity' ? '#fff' : R.dim, borderRadius: 9999, padding: '4px 12px'}}>Activity</span>
              <span style={{background: tab === 'Library' ? R.card : 'transparent', color: tab === 'Library' ? '#fff' : R.dim, borderRadius: 9999, padding: '4px 12px'}}>Library</span>
            </div>
          </div>
          <div style={{marginTop: 14}}>{panel}</div>
        </div>
      )}
    </div>
  );
};

/* ---------- right-panel blocks (Suggested · Computer · Voice chat) ---------- */
export const PanelHeading: React.FC<{children: React.ReactNode; right?: string}> = ({children, right}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 13, color: R.mute, margin: '12px 2px 6px'}}>
    <span>{children}</span>
    <span style={{color: R.dim}}>{right}</span>
  </div>
);

export const PanelRow: React.FC<{children: React.ReactNode; icon?: React.ReactNode; chevron?: boolean}> = ({children, icon, chevron}) => (
  <div style={{background: R.card, borderRadius: 14, padding: '11px 12px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 14}}>
    {icon}
    <span style={{flex: 1}}>{children}</span>
    {chevron && <Chev />}
  </div>
);

export const VoiceChatBlock: React.FC<{voice?: string; lang?: string}> = ({voice = 'Liora 1.0x', lang = 'Auto-detect'}) => (
  <>
    <PanelHeading>Voice chat</PanelHeading>
    <div style={{background: R.card, borderRadius: 14, padding: '10px 12px', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10}}>
      {[
        ['Voice', voice],
        ['Language', lang],
      ].map(([k, v]) => (
        <div key={k} style={{display: 'flex', justifyContent: 'space-between'}}>
          <span>{k}</span>
          <span style={{color: R.mute}}>{v} ⌄</span>
        </div>
      ))}
    </div>
  </>
);

/** Browser-ish page frame (x.ai-style site), with a top nav. */
export const SiteNav: React.FC<{cta?: string}> = ({cta = 'Download'}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 26, fontSize: 17, color: R.mute, height: 56, padding: '0 28px'}}>
    <div style={{fontSize: 22, color: '#fff', fontWeight: 800, letterSpacing: -1, marginRight: 14}}>⟋ BOT</div>
    {['Products', 'Solutions', 'Developer', 'Pricing', 'News'].map((x) => (
      <span key={x}>{x}</span>
    ))}
    <div style={{flex: 1}} />
    <Pill size={15}>Contact</Pill>
    <Pill kind="white" size={15}>
      {cta}
    </Pill>
  </div>
);
