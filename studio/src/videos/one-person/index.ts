import type {Comp} from '../types';
import {OnePersonCompany, ONE_PERSON_FRAMES} from './overview';
import {OpPart1, OP_PART1_FRAMES, OpPart2, OP_PART2_FRAMES, OpPart3, OP_PART3_FRAMES, OpPart4, OP_PART4_FRAMES, OpPart5, OP_PART5_FRAMES, OpPart6, OP_PART6_FRAMES} from './parts';

/** "One person, a crew of Bots": 6 parts + the 4-minute overview. Add new parts here. */
export const onePersonCompositions: Comp[] = [
  {id: 'OnePersonCompany', component: OnePersonCompany, frames: ONE_PERSON_FRAMES},
  {id: 'OpPart1', component: OpPart1, frames: OP_PART1_FRAMES},
  {id: 'OpPart2', component: OpPart2, frames: OP_PART2_FRAMES},
  {id: 'OpPart3', component: OpPart3, frames: OP_PART3_FRAMES},
  {id: 'OpPart4', component: OpPart4, frames: OP_PART4_FRAMES},
  {id: 'OpPart5', component: OpPart5, frames: OP_PART5_FRAMES},
  {id: 'OpPart6', component: OpPart6, frames: OP_PART6_FRAMES},
];
