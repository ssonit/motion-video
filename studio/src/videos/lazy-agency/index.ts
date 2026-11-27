import type {Comp} from '../types';
import {LazyPart1, LAZY_PART1_FRAMES, LazyPart2, LAZY_PART2_FRAMES, LazyPart3, LAZY_PART3_FRAMES, LazyPart4, LAZY_PART4_FRAMES} from './parts';

/** "The lazy way to make money with Grok Bot": 4 parts. */
export const lazyAgencyCompositions: Comp[] = [
  {id: 'LazyPart1', component: LazyPart1, frames: LAZY_PART1_FRAMES},
  {id: 'LazyPart2', component: LazyPart2, frames: LAZY_PART2_FRAMES},
  {id: 'LazyPart3', component: LazyPart3, frames: LAZY_PART3_FRAMES},
  {id: 'LazyPart4', component: LazyPart4, frames: LAZY_PART4_FRAMES},
];
