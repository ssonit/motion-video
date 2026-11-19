import React, {useId} from 'react';
import {useCurrentFrame} from 'remotion';

/** The glossy orb mascot. `acc` adds an accessory, `satellite` adds the floating ball. */
export const Mascot: React.FC<{
  color: string;
  size: number;
  phase?: number;
  satellite?: boolean;
  acc?: 'glasses' | 'headphones' | 'cap' | 'crown' | 'tie' | 'none';
}> = ({color, size, phase = 0, satellite = false, acc = 'none'}) => {
  const frame = useCurrentFrame();
  const t = frame + phase;
  const bob = Math.sin(t / 14) * 7;
  const blink = t % 100 < 4 ? 0.12 : 1;
  const look = Math.sin(t / 45) * 2;
  const sat = Math.sin(t / 10) * 4;
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{transform: `translateY(${bob}px)`, overflow: 'visible'}}
    >
      <defs>
        <radialGradient id={`glow${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={color} stopOpacity="0.28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`hi${id}`} cx="0.32" cy="0.25" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`sh${id}`} cx="0.68" cy="0.78" r="0.7">
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="55" r="78" fill={`url(#glow${id})`} />
      <ellipse cx="50" cy="96" rx="28" ry="4.5" fill="rgba(20,20,43,0.16)" />
      <circle cx="50" cy="52" r="42" fill={color} />
      <circle cx="50" cy="52" r="42" fill={`url(#sh${id})`} />
      <circle cx="50" cy="52" r="42" fill={`url(#hi${id})`} />
      <g style={{transformOrigin: '50px 46px', transform: `scaleY(${blink})`}}>
        <rect x={31 + look} y="36" width="12" height="19" rx="6" fill="#fff" />
        <rect x={57 + look} y="36" width="12" height="19" rx="6" fill="#fff" />
      </g>
      {acc === 'glasses' && (
        <g fill="none" stroke="#1A1B2E" strokeWidth="3">
          <circle cx="35" cy="46" r="13.5" />
          <circle cx="65" cy="46" r="13.5" />
          <line x1="48.5" y1="46" x2="51.5" y2="46" />
        </g>
      )}
      {acc === 'headphones' && (
        <g>
          <path d="M12 54 Q12 6 50 6 Q88 6 88 54" fill="none" stroke="#E6E6EE" strokeWidth="5" strokeLinecap="round" />
          <rect x="5" y="44" width="13" height="24" rx="6" fill="#E6E6EE" />
          <rect x="82" y="44" width="13" height="24" rx="6" fill="#E6E6EE" />
        </g>
      )}
      {acc === 'cap' && (
        <g fill="#fff">
          <path d="M14 30 Q50 -8 86 30 Z" />
          <path d="M62 28 Q94 26 99 37 L62 37 Z" opacity="0.92" />
        </g>
      )}
      {acc === 'crown' && <polygon points="30,18 34,1 44,12 50,-3 56,12 66,1 70,18" fill="#FFD34D" />}
      {acc === 'tie' && (
        <g fill="#fff">
          <polygon points="50,86 37,78 37,94" />
          <polygon points="50,86 63,78 63,94" />
        </g>
      )}
      {satellite && (
        <circle cx="104" cy={46 + sat} r="7" fill={color} />
      )}
    </svg>
  );
};
