import React from 'react';
import {Sfx, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {mono} from '../../lib/Art';
import {Abs, In, RSlide} from '../real/ui';
import {useCurrentFrame} from 'remotion';

const ACC = '#ff7a1a';

/**
 * Big chapter card: drifting faint word in the background, small kicker, huge number, title.
 * `t` = when (fraction of the scene) the ding / number / title appear.
 */
export const mkChapter = (o: {kicker: string; num: string; title: string; bgWord: string; t?: {sfx: number; num: number; title: number}}): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  const drift = (f * 0.4) % 80;
  const t = o.t ?? {sfx: 0.1, num: 0.08, title: 0.2};
  const line = Array.from({length: 6}).map(() => o.bgWord).join(' · ');
  return (
    <RSlide vo={vo}>
      <Sfx at={at(t.sfx)} name="ding" vol={0.25} dur={40} />
      <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.12}}>
        {Array.from({length: 9}).map((_, i) => (
          <div key={i} style={{fontSize: 70, fontWeight: 800, letterSpacing: 6, whiteSpace: 'nowrap', transform: `translateX(${(i % 2 ? -1 : 1) * drift - 200}px)`, lineHeight: '80px'}}>{line}</div>
        ))}
      </div>
      <Abs x={0} y={120} style={{width: 1280, textAlign: 'center', fontFamily: mono.fontFamily, color: ACC, fontSize: 24, letterSpacing: 4}}>{o.kicker}</Abs>
      <In at={at(t.num)} tick={false} style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontSize: 230, fontWeight: 800, letterSpacing: -8, lineHeight: 1}}>
        <span style={{color: ACC}}>{o.num}</span>
      </In>
      <In at={at(t.title)} style={{position: 'absolute', left: 0, right: 0, top: 390, textAlign: 'center', fontSize: 64, fontWeight: 700}}>{o.title}</In>
    </RSlide>
  );
};
