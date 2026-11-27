import type {Comp} from '../types';
import {BotTeam1, BOT_TEAM1_FRAMES, BotTeam2, BOT_TEAM2_FRAMES, BotTeam3, BOT_TEAM3_FRAMES, BotTeamHook, BOT_TEAM_HOOK_FRAMES, BotTeamFull, BOT_TEAM_FULL_FRAMES} from './parts';

/** "Build a Grok Bot team that checks its own work": 3 parts (v2, ~6:45). */
export const botTeamCompositions: Comp[] = [
  {id: 'BotTeam1', component: BotTeam1, frames: BOT_TEAM1_FRAMES},
  {id: 'BotTeam2', component: BotTeam2, frames: BOT_TEAM2_FRAMES},
  {id: 'BotTeam3', component: BotTeam3, frames: BOT_TEAM3_FRAMES},
  {id: 'BotTeamHook', component: BotTeamHook, frames: BOT_TEAM_HOOK_FRAMES},
  {id: 'BotTeamFull', component: BotTeamFull, frames: BOT_TEAM_FULL_FRAMES},
];
