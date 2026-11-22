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
