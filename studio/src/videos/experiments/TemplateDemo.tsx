import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import footage from '../../../content/experiments/template-demo/footage.json';
import {FootageProvider} from '../../lib/Slot';
import type {FootageEntry} from '../../lib/Slot';
import type {P} from '../../lib/kit';
import {HeroDesk, TeamDesks} from '../rich/Illustrations';
import {
  bigWord,
  chatPanel,
  closer,
  phoneRec,
  posterStack,
  realCase,
  screenRec,
  textBuild,
  withPip,
} from '../rich/Templates';

/**
 * Reference sheet + smoke test for every template. Also the copy-paste example of how a clone uses them:
 *   SCENES (id -> template)  +  footage.json (id -> {pip, main})  +  slides.json (id -> vo, frames).
 * No audio here: it only shows the layouts (footage slots show placeholders unless footage.json maps a file).
 */
const SHOTS: {id: string; Comp: React.FC<P>; vo: string}[] = [
  {
    id: 't_text',
    vo: 'Text slide that builds up. Presenter circle at the bottom right.',
    Comp: textBuild({
      eyebrow: 'ZERO TO ONE',
      head: <>Even a beginner can build a <span style={{color: '#FF7A2F'}}>one-person company</span></>,
      flow: [
        {tag: 'START', title: 'Total beginner', sub: 'no code needed'},
        {tag: 'STEP 1', title: 'Watch this video'},
        {tag: 'STEP 2', title: 'Follow along'},
      ],
      chips: ['Ops Bot', 'Design Bot', 'Edit Bot'],
      note: <>Your own team, <span style={{color: '#FF7A2F'}}>built step by step</span></>,
    }),
  },
  {id: 't_big', vo: 'One giant word with a struck-out list.', Comp: bigWord({eyebrow: 'THE KEY', word: 'Dispatch', strike: ['coding is not the strongest', 'image gen is not either']})},
  {id: 't_screen', vo: 'A real screen recording on the colourful wallpaper, with step pills.', Comp: screenRec({pills: ['① New', '② Pick a look', '③ Name it', '④ Set rules'], callout: 'right-click here'})},
  {id: 't_phone', vo: 'A phone screen recording, big faded word behind it.', Comp: phoneRec({chapter: '06 · quick launch', bgWord: 'QUICK LAUNCH', callout: 'Action → Touch'})},
  {id: 't_illus', vo: 'Any illustration with the presenter on top.', Comp: withPip(HeroDesk, 'tr-round')},
  {id: 't_team', vo: 'The same, bottom right.', Comp: withPip(TeamDesks, 'bl-round')},
  {id: 't_posters', vo: 'Stacked covers with arrows.', Comp: posterStack({titles: ['Storm King', 'Quiet Mountain', 'Delivered', 'Wild Rider']})},
  {id: 't_chat', vo: 'A contacts panel for the team.', Comp: chatPanel({title: 'Comic promotion dept', chapter: '05 Real business', rows: [{name: 'Chief', msg: 'Sent 1 video'}, {name: 'Editor', msg: 'Replied, forwarded'}, {name: 'Writer', msg: 'Sent 8 drafts'}, {name: 'Publisher', msg: 'Pending'}]})},
  {id: 't_case', vo: 'Real case: app window with a numbered list.', Comp: realCase({eyebrow: 'REAL CASE', head: <>Let the Bot <span style={{color: '#FF7A2F'}}>make me money</span></>, tag: 'Windows script', items: ['Edit video', 'Post video', 'Backfill links']})},
  {id: 't_close', vo: 'Closing card.', Comp: closer({word: 'Go', sub: 'JUST DO IT'})},
];

export const TEMPLATE_FRAMES_EACH = 90;
export const TEMPLATE_DEMO_FRAMES = SHOTS.length * TEMPLATE_FRAMES_EACH;

export const TemplateDemo: React.FC = () => (
  <AbsoluteFill style={{background: '#0E0E11'}}>
    {SHOTS.map((s, i) => (
      <Sequence key={s.id} from={i * TEMPLATE_FRAMES_EACH} durationInFrames={TEMPLATE_FRAMES_EACH}>
        <FootageProvider slug="experiments/template-demo" entry={(footage as Record<string, FootageEntry>)[s.id]}>
          <s.Comp n={i + 1} vo={s.vo} />
        </FootageProvider>
      </Sequence>
    ))}
  </AbsoluteFill>
);
