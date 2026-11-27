import type React from 'react';

/** Ember look (tiktok-7706 reference): charcoal + orange glow. Read as CSS vars by real/ui.tsx and scene files. */
export const EMBER_THEME = {
  '--op-bg':
    'radial-gradient(760px 480px at 90% -10%, rgba(255,110,20,0.30), transparent 62%), radial-gradient(520px 340px at -5% 108%, rgba(255,90,0,0.14), transparent 62%), #121214',
  '--op-bg-solid': '#121214',
  '--op-card': '#27272c',
  '--op-card2': '#18181b',
  '--op-panel': '#151518',
  '--op-dim': 'rgba(255,255,255,0.58)',
  '--op-eyebrow': '#ff7a1a',
  '--op-accent': '#ff7a1a',
  '--op-hw': '700',
} as React.CSSProperties;

/** Light, airy look (savetik-7695 / tiktok-7706 references): pastel backgrounds, white cards, ink text, orange accent. */
const blob = (c: string) =>
  `radial-gradient(420px 300px at 88% 0%, rgba(255,255,255,0.9), transparent 65%), radial-gradient(360px 260px at 2% 102%, rgba(255,255,255,0.7), transparent 65%), radial-gradient(90px 90px at 70% 88%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(60px 60px at 14% 22%, rgba(255,255,255,0.5), transparent 70%), ${c}`;
export const LIGHT_TONES = ['#dff3ea', '#e1eafc', '#fdf1de', '#ece6fb', '#fde6dd'];
export const lightTone = (i: number) => ({'--op-bg': blob(LIGHT_TONES[i % LIGHT_TONES.length])} as React.CSSProperties);
export const LIGHT_THEME = {
  '--op-bg': blob(LIGHT_TONES[0]),
  '--op-bg-solid': '#e8f1ee',
  '--op-card': '#ffffff',
  '--op-card2': '#f4f6fb',
  '--op-panel': '#ffffff',
  '--op-text': '#15151c',
  '--op-dim': 'rgba(21,21,28,0.58)',
  '--op-mute': 'rgba(21,21,28,0.7)',
  '--op-line': 'rgba(21,21,28,0.10)',
  '--op-pill': '#1d1d26',
  '--op-pill-fg': '#ffffff',
  '--op-foot': 'rgba(21,21,28,0.38)',
  '--op-shadow': '0 10px 28px rgba(40,50,90,0.12)',
  '--op-eyebrow': '#ee6a10',
  '--op-accent': '#f0690a',
  '--op-hw': '800',
  background: '#e8f1ee',
} as React.CSSProperties;

/** Paper look (user, 2026-11-27: one consistent look, no per-scene colours): one flat paper background for every
 * scene, white cards with one soft shadow, ink text, one muted orange accent. Used by bot-team (long + short). */
export const PAPER = '#F7F7F8';
export const PAPER_ACCENT = '#1E6FE0';
export const PAPER_THEME = {
  ...LIGHT_THEME,
  '--op-bg': PAPER,
  '--op-bg-solid': PAPER,
  '--op-shadow': '0 8px 24px rgba(21,21,28,0.07)',
  '--op-eyebrow': PAPER_ACCENT,
  '--op-accent': PAPER_ACCENT,
  // Grok Bot windows (real/ui R tokens) turn light: white window, pale grey panels, ink text
  '--r-bg': '#ffffff',
  '--r-panel': '#F7F7F8',
  '--r-card': '#EEEEF2',
  '--r-card2': '#F4F4F6',
  '--r-line': 'rgba(21,21,28,0.09)',
  '--r-text': '#15151c',
  '--r-mute': 'rgba(21,21,28,0.7)',
  '--r-dim': 'rgba(21,21,28,0.45)',
  '--r-user': PAPER_ACCENT,
  '--r-shadow': '0 8px 24px rgba(21,21,28,0.07), 0 0 0 1px rgba(21,21,28,0.06)',
  background: PAPER,
} as React.CSSProperties;
