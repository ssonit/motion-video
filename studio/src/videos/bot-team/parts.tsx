import React from 'react';
import {Series} from 'remotion';
import type {P} from '../../lib/kit';
import slides1 from '../../../content/bot-team/1-why/slides.json';
import slides2 from '../../../content/bot-team/2-build/slides.json';
import slides3 from '../../../content/bot-team/3-run/slides.json';
import slidesHook from '../../../content/bot-team/hook-v3/slides.json';
import * as H from './scenes/hookv3';
import * as S1 from './scenes/p1';
import * as S2 from './scenes/p2';
import * as A from './scenes/v2a';
import * as B from './scenes/v2b';
import * as C from './scenes/v2c';
import {mkStatement} from '../lazy-agency/scenes/common';
import {makePart as mk} from '../shared/makePart';
import type {Slide} from '../shared/makePart';
import {LIGHT_THEME, lightTone} from '../shared/themes';

/** "Build a Grok Bot team that checks its own work" (ref: references/yt-C2llc614D2M). Light look, 3 parts. */
const makePart = (slug: string, n: number, slides: Slide[], scenes: Record<string, React.FC<P>>) =>
  mk({slug, n, total: 3, label: 'THE BOT TEAM', slides, scenes, theme: LIGHT_THEME, sceneTheme: lightTone});

/** Placeholder for v2 shots not built yet (storyboard v2): shows the shot id. */
const todo = (id: string) => mkStatement({label: 'TODO · v2 shot', lines: [id]});
const fill = (slides: Slide[], scenes: Record<string, React.FC<P>>) =>
  Object.fromEntries(slides.map((s) => [s.id, scenes[s.id] ?? todo(s.id)]));

/** Hook v3 (TOC-montage pattern, references/yt-q1IwR88mhaA §8): opens Part 1 since 2026-11-27. */
const HOOK_V3: Record<string, React.FC<P>> = {
  'hook-cold': H.HookCold, 'hook-title': H.HookTitle, 'hook-you': H.HookYou, 'hook-split': H.HookSplit, 'hook-check': H.HookCheck,
  'hook-toc1': H.HookToc1, 'hook-toc2': H.HookToc2, 'hook-toc3': H.HookToc3, 'hook-toc4': H.HookToc4, 'hook-toc5': H.HookToc5,
  'hook-anchor': H.HookAnchor, 'hook-nocode': H.HookNoCode, 'hook-team': H.HookTeam, 'hook-handoff': H.HookHandoff,
  'hook-catch': H.HookCatch, 'hook-loop3': H.HookLoop3, 'hook-go': H.HookGo,
};

const p1 = makePart('bot-team/1-why', 1, slides1 as Slide[], fill(slides1 as Slide[], {
  ...HOOK_V3,
  'glue-cost': A.GlueCost, memory: A.Memory, teach: A.Teach,
  team: S1.Team, promise: S1.Promise, problem: S1.Problem, glue: S1.Glue, computer: S1.Computer, talk: S1.Talk,
  jobs: S1.Jobs, order: S1.Order,
}));
export const BotTeam1 = p1.Comp;
export const BOT_TEAM1_FRAMES = p1.frames;

const p2 = makePart('bot-team/2-build', 2, slides2 as Slide[], fill(slides2 as Slide[], {
  head: S1.HeadPiece, create: S1.Create, message: S1.Message, board: S1.Board, brief: S1.Brief, leftarm: S1.LeftArm, store: S1.Store,
  storeroutine: S1.StoreRoutine, system: S1.System, rightarm: S1.RightArm, cards: S1.Cards, chest: S2.Chest, plan: S2.Plan,
  nopost: S2.NoPost, legs: S2.Legs, leads: S2.Leads, drafts: S2.Drafts, shield: S2.ShieldPiece, approve: S2.Approve, rule: S2.Rule,
  test: B.Test, 'chief-check': B.ChiefCheck, 'store-msg': B.StoreMsg, sellers: B.Sellers, 'client-msg': B.ClientMsg, keywords: B.Keywords,
  'content-msg': B.ContentMsg, ideas: B.Ideas, 'lead-msg': B.LeadMsg, pipeline: B.Pipeline, rules: B.Rules, built: B.Built,
}));
export const BotTeam2 = p2.Comp;
export const BOT_TEAM2_FRAMES = p2.frames;

const p3 = makePart('bot-team/3-run', 3, slides3 as Slide[], fill(slides3 as Slide[], {
  moment: S2.Moment, onemsg: S2.OneMsg, replies: S2.Replies, correct: S2.Correct, why: S2.Why, oldnew: S2.OldNew, boss: S2.Boss,
  tips: S2.Tips, tip1: S2.Tip1, tip2: S2.Tip2, tip3: S2.Tip3, outro: S2.Outro,
  'chief-plan': C.ChiefPlan, morning: C.Morning, week: C.Week, hours: C.Hours, cta: C.Cta,
}));
export const BotTeam3 = p3.Comp;
export const BOT_TEAM3_FRAMES = p3.frames;

/* Hook v3: test of the TOC-montage hook pattern (references/yt-q1IwR88mhaA §8). */
const ph = mk({
  slug: 'bot-team/hook-v3', n: 1, total: 1, label: 'THE BOT TEAM', slides: slidesHook as Slide[], theme: LIGHT_THEME,
  scenes: HOOK_V3,
});
export const BotTeamHook = ph.Comp;
export const BOT_TEAM_HOOK_FRAMES = ph.frames;

/** The whole video: Part 1 → 2 → 3 back to back (one render, one loudnorm). */
export const BOT_TEAM_FULL_FRAMES = p1.frames + p2.frames + p3.frames;
export const BotTeamFull: React.FC = () => (
  <Series>
    <Series.Sequence durationInFrames={p1.frames}><p1.Comp /></Series.Sequence>
    <Series.Sequence durationInFrames={p2.frames}><p2.Comp /></Series.Sequence>
    <Series.Sequence durationInFrames={p3.frames}><p3.Comp /></Series.Sequence>
  </Series>
);
