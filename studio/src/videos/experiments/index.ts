import type {Comp} from '../types';
import {Explainer30, FPS, DURATION} from './Explainer30';
import {NightStudio, NIGHT_STUDIO_FRAMES} from './NightStudio';
import {TemplateDemo, TEMPLATE_DEMO_FRAMES} from './TemplateDemo';

/** One-off experiments and demos (not part of the main workflow). */
export const experimentCompositions: Comp[] = [
  {id: 'Explainer30', component: Explainer30, frames: FPS * DURATION},
  {id: 'NightStudio', component: NightStudio, frames: NIGHT_STUDIO_FRAMES},
  {id: 'TemplateDemo', component: TemplateDemo, frames: TEMPLATE_DEMO_FRAMES},
];
