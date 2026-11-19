import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

/** Springy "pop in" wrapper: fades, rises and scales in at frame `at` of the current sequence. */
export const Pop: React.FC<{
  at: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({at, children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - at, fps, config: {damping: 14, stiffness: 120}});
  return (
    <div
      style={{
        opacity: Math.min(1, p * 1.4),
        transform: `translateY(${(1 - p) * 36}px) scale(${0.92 + 0.08 * p})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
