import React from 'react';
import {Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Pop} from '../../lib/Pop';
import {clamp} from '../../lib/kit';

/**
 * A real screenshot (studio/public/shared/real/*) in a rounded frame, with a slow push-in and
 * an orange numbered callout pill (like the screen-recording shots in the reference).
 */
export const RealShot: React.FC<{
  src: string;
  w: number;
  h: number;
  at?: number;
  zoomTo?: number;
  callout?: {n?: string; text: string; x: number; y: number; at: number};
  fit?: 'cover' | 'contain';
  pos?: string;
}> = ({src, w, h, at = 0, zoomTo = 1.06, callout, fit = 'cover', pos = 'center top'}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [at, at + 150], [1, zoomTo], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Pop at={at} style={{position: 'relative', width: w, height: h}}>
      <div style={{width: w, height: h, borderRadius: 22, overflow: 'hidden', boxShadow: '0 24px 70px rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.14)', background: '#111'}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: fit, objectPosition: pos, transform: `scale(${z})`, transformOrigin: 'center top'}} />
      </div>
      {callout && (
        <Pop at={callout.at} style={{position: 'absolute', left: callout.x, top: callout.y}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, background: '#ff7a1a', color: '#fff', fontWeight: 700, fontSize: 24, padding: '10px 20px', borderRadius: 14, boxShadow: '0 8px 30px rgba(255,122,26,0.5)', whiteSpace: 'nowrap'}}>
            {callout.n && <span style={{background: '#fff', color: '#ff7a1a', borderRadius: '50%', width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18}}>{callout.n}</span>}
            {callout.text}
          </div>
        </Pop>
      )}
    </Pop>
  );
};
