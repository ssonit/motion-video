import type {Comp} from '../types';
import {BotBasics, BOT_BASICS_FRAMES} from './BotBasics';
import {BotFeedbackLoop, BOT_FEEDBACK_LOOP_FRAMES} from './BotFeedbackLoop';
import {BotGuide, BOT_GUIDE_FRAMES} from './BotGuide';
import {BotGuideFull, BOT_GUIDE_FULL_FRAMES} from './BotGuideFull';
import {BotGuideReal, BOT_GUIDE_REAL_FRAMES} from './BotGuideReal';
import {BotGuideRich, BOT_GUIDE_RICH_FRAMES} from './BotGuideRich';

/** Grok Bot guides. BotGuideReal is the approved standard look (see CLAUDE.md). */
export const grokBotCompositions: Comp[] = [
  {id: 'BotGuide', component: BotGuide, frames: BOT_GUIDE_FRAMES},
  {id: 'BotGuideFull', component: BotGuideFull, frames: BOT_GUIDE_FULL_FRAMES},
  {id: 'BotGuideRich', component: BotGuideRich, frames: BOT_GUIDE_RICH_FRAMES},
  {id: 'BotGuideReal', component: BotGuideReal, frames: BOT_GUIDE_REAL_FRAMES},
  {id: 'BotFeedbackLoop', component: BotFeedbackLoop, frames: BOT_FEEDBACK_LOOP_FRAMES},
  {id: 'BotBasics', component: BotBasics, frames: BOT_BASICS_FRAMES},
];
