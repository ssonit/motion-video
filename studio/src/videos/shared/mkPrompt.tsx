import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Sfx, typed, useAt} from '../../lib/kit';
import type {P} from '../../lib/kit';
import {mono} from '../../lib/Art';
import {Abs, Card, In, Pill, R, RSlide, Head} from '../real/ui';
import {Bot} from '../real/BotMark';

const ACC = '#ff7a1a';

/** Typed-prompt scene factory (a title, a typed prompt and a few check chips). */
export const mkPrompt = (eyebrow: string, title: string, prompt: string, chips: string[]): React.FC<P> => ({vo}) => {
  const at = useAt();
  const f = useCurrentFrame();
  return (
    <RSlide vo={vo}>
      <Sfx at={at(0.1)} name="typing" vol={0.16} dur={120} />
      <Head label={eyebrow}>{title}</Head>
      <Card at={at(0.05)} style={{position: 'absolute', left: 110, top: 195}} box={{width: 1060}} hl={ACC}>
        <div style={{display: 'flex', gap: 16}}>
          <Bot shape="drop" color={R.white} size={46} />
          <div style={{fontFamily: mono.fontFamily, fontSize: 25, lineHeight: 1.45}}>
            {typed(prompt, f, at(0.1), 48)}
            <span style={{opacity: f % 20 < 10 ? 1 : 0}}>▌</span>
          </div>
        </div>
      </Card>
      <Abs x={110} y={420} style={{display: 'flex', gap: 12, flexWrap: 'wrap', width: 1060}}>
        {chips.map((c, i) => (
          <In key={c} at={at(0.62) + i * 7}><Pill kind="dark" size={22}>✓ {c}</Pill></In>
        ))}
      </Abs>
    </RSlide>
  );
};

