import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BOT_COLORS, GrokBotMark} from '../../lib/GrokBotMark';
import type {BotShape} from '../../lib/GrokBotMark';
import {D} from '../../lib/Art';

const SHAPES: BotShape[] = ['drop', 'blob', 'circle', 'pillow'];

/** Map the old Rich palette onto the real Grok Bot palette. Orange (old house colour) = the default white bot. */
const MAP: Record<string, string> = {
  [D.orange]: BOT_COLORS.white,
  [D.mint]: BOT_COLORS.green,
  [D.pink]: BOT_COLORS.pink,
  [D.blue]: BOT_COLORS.blue,
  [D.violet]: BOT_COLORS.violet,
  [D.yellow]: BOT_COLORS.orange,
};

/**
 * Drop-in replacement for lib/Mascot used by the copied Rich scenes:
 * same props (accessories/satellite are ignored), renders the real GrokBotMark with a gentle bob.
 */
export const Mascot: React.FC<{
  color: string;
  size: number;
  phase?: number;
  satellite?: boolean;
  acc?: string;
}> = ({color, size, phase = 0}) => {
  const f = useCurrentFrame();
  const bob = Math.sin((f + phase) / 14) * 6;
  const shape = SHAPES[Math.floor(phase / 7) % SHAPES.length];
  return <GrokBotMark shape={shape} color={MAP[color] ?? color} size={size} style={{transform: `translateY(${bob}px)`}} />;
};

/** Bobbing real mark for the new real-look scenes. */
export const Bot: React.FC<{
  shape?: BotShape;
  color?: string;
  size?: number;
  phase?: number;
  bob?: number;
  style?: React.CSSProperties;
}> = ({shape = 'drop', color = BOT_COLORS.white, size = 120, phase = 0, bob = 5, style}) => {
  const f = useCurrentFrame();
  return (
    <GrokBotMark
      shape={shape}
      color={color}
      size={size}
      style={{transform: `translateY(${Math.sin((f + phase) / 14) * bob}px)`, flexShrink: 0, ...style}}
    />
  );
};
