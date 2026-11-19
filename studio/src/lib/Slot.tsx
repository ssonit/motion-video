import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {D, inter, mono} from './Art';

/**
 * REAL-FOOTAGE SLOTS
 * The reference videos mix motion graphics with real footage: a talking-head presenter (picture-in-picture)
 * and real screen recordings. A <Slot> is a hole for the user's own footage:
 *   - file present  -> plays it (video or image, cover-fit, muted: our TTS carries the narration)
 *   - file missing  -> striped placeholder labelled "YOUR FOOTAGE" so layouts can be reviewed before filming.
 * Which file goes where is declared per shot in content/<slug>/footage.json  (see FootageProvider below):
 *   { "intro": {"pip": "my/face-01.mp4"}, "install": {"main": "my/screen-mac.mp4", "pip": "my/face-02.mp4"} }
 * Paths are relative to studio/public/<slug>/ ; <FootageProvider> prefixes the slug for you.
 */
export type FootageEntry = {pip?: string; main?: string; start?: number};

const Ctx = createContext<{entry: FootageEntry; slug: string}>({entry: {}, slug: ''});

export const FootageProvider: React.FC<{slug: string; entry?: FootageEntry; children: React.ReactNode}> = ({
  slug,
  entry,
  children,
}) => <Ctx.Provider value={{entry: entry ?? {}, slug}}>{children}</Ctx.Provider>;

const isImage = (p: string) => /\.(png|jpe?g|webp|gif)$/i.test(p);

export const Slot: React.FC<{
  /** 'pip' = presenter overlay, 'main' = the big footage (screen recording, b-roll). */
  role?: 'pip' | 'main';
  /** override the manifest with an explicit public/ path */
  src?: string;
  label?: string;
  w?: number | string;
  h?: number | string;
  radius?: number | string;
  /** seconds into the clip to start from (manifest `start` is used otherwise) */
  start?: number;
  fit?: 'cover' | 'contain';
  style?: React.CSSProperties;
}> = ({role = 'main', src, label, w = '100%', h = '100%', radius = 0, start, fit = 'cover', style}) => {
  const {entry, slug} = useContext(Ctx);
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const file = src ?? (role === 'pip' ? entry.pip : entry.main);
  const path = file ? (file.startsWith('/') || file.includes(':') ? file : `${slug}/${file}`) : undefined;
  const base: React.CSSProperties = {
    width: w,
    height: h,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'relative',
    background: '#111118',
    ...style,
  };
  if (path) {
    const url = staticFile(path);
    return (
      <div style={base}>
        {isImage(path) ? (
          <Img src={url} style={{width: '100%', height: '100%', objectFit: fit}} />
        ) : (
          <OffthreadVideo
            src={url}
            muted
            startFrom={Math.round((start ?? entry.start ?? 0) * fps)}
            style={{width: '100%', height: '100%', objectFit: fit}}
          />
        )}
      </div>
    );
  }
  const slide = (frame * 0.6) % 40;
  return (
    <div style={base}>
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, #1B1B24 0 20px, #15151C 20px 40px)`,
          backgroundPosition: `${slide}px 0`,
        }}
      />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6}}>
        <div style={{fontSize: role === 'pip' ? 54 : 64, opacity: 0.5}}>{role === 'pip' ? '🙂' : '🎬'}</div>
        <div
          style={{
            fontFamily: mono.fontFamily,
            fontSize: role === 'pip' ? 12 : 18,
            letterSpacing: 2,
            color: D.orange,
            textAlign: 'center',
          }}
        >
          YOUR FOOTAGE{label ? ` · ${label}` : ''}
        </div>
      </AbsoluteFill>
    </div>
  );
};

/** Presenter picture-in-picture, in the positions the reference uses. */
export type PipPos = 'br-circle' | 'bl-circle' | 'tl-round' | 'tr-round' | 'bl-round' | 'br-round';

const PIP_STYLE: Record<PipPos, {box: React.CSSProperties; size: number; radius: string}> = {
  'br-circle': {box: {right: 44, bottom: 150}, size: 190, radius: '50%'}, // dark text slides
  'bl-circle': {box: {left: 44, bottom: 150}, size: 190, radius: '50%'},
  'tl-round': {box: {left: 26, top: 26}, size: 170, radius: '28%'}, // over illustrations
  'tr-round': {box: {right: 26, top: 26}, size: 170, radius: '28%'}, // over screen recordings
  'bl-round': {box: {left: 26, bottom: 130}, size: 170, radius: '28%'},
  'br-round': {box: {right: 26, bottom: 130}, size: 170, radius: '28%'},
};

export const Pip: React.FC<{pos?: PipPos; size?: number}> = ({pos = 'br-circle', size}) => {
  const s = PIP_STYLE[pos];
  const px = size ?? s.size;
  return (
    <div
      style={{
        position: 'absolute',
        ...s.box,
        width: px,
        height: px,
        borderRadius: s.radius,
        overflow: 'hidden',
        border: '3px solid rgba(255,255,255,0.14)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 6px rgba(0,0,0,0.25)',
        fontFamily: inter.fontFamily,
      }}
    >
      <Slot role="pip" w={px} h={px} />
    </div>
  );
};
