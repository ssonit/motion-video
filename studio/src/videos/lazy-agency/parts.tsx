import React from 'react';
import type {P} from '../../lib/kit';
import slides1 from '../../../content/lazy-agency/1-niche/slides.json';
import slides2 from '../../../content/lazy-agency/2-lazy/slides.json';
import slides3 from '../../../content/lazy-agency/3-website/slides.json';
import slides4 from '../../../content/lazy-agency/4-upsell/slides.json';
import * as S1 from './scenes/p1';
import * as S2 from './scenes/p2';
import * as S3 from './scenes/p3';
import * as S4 from './scenes/p4';
import {makePart as mk} from '../shared/makePart';
import type {Slide} from '../shared/makePart';
import {LIGHT_THEME, lightTone} from '../shared/themes';

/** Series wrapper: fixed label, total and ember theme. */
const makePart = (slug: string, n: number, slides: Slide[], scenes: Record<string, React.FC<P>>) =>
  mk({slug, n, total: 4, label: 'THE LAZY WAY', slides, scenes, theme: LIGHT_THEME, sceneTheme: lightTone});

const p1 = makePart('lazy-agency/1-niche', 1, slides1 as Slide[], {
  hook: S1.Hook1, lazy: S1.Lazy1, step1: S1.Step1, niche: S1.Niche1, know: S1.Know1, pains: S1.Pains1, portfolio: S1.Portfolio1,
  plumber: S1.Plumber1, columns: S1.Columns1, 'not-every': S1.NotEvery1, need: S1.Need1, recurring: S1.Recurring1, bridge: S1.Bridge1,
});
export const LazyPart1 = p1.Comp;
export const LAZY_PART1_FRAMES = p1.frames;

const p2 = makePart('lazy-agency/2-lazy', 2, slides2 as Slide[], {
  hook: S2.Hook2, easy: S2.Easy2, ways: S2.Ways2, proof: S2.Proof2, ask: S2.Ask2, setup: S2.Setup2, leads: S2.Leads2,
  complicated: S2.Complicated2, price: S2.Price2, anyniche: S2.AnyNiche2, code: S2.Code2, rules: S2.Rules2, bridge: S2.Bridge2,
});
export const LazyPart2 = p2.Comp;
export const LAZY_PART2_FRAMES = p2.frames;

const p3 = makePart('lazy-agency/3-website', 3, slides3 as Slide[], {
  hook: S3.Hook3, scrape: S3.Scrape3, filter: S3.Filter3, choice: S3.Choice3, email: S3.Email3, trick: S3.Trick3, reply: S3.Reply3,
  build: S3.Build3, fear: S3.Fear3, math: S3.Math3, work: S3.Work3, saturated: S3.Saturated3, goal: S3.Goal3,
});
export const LazyPart3 = p3.Comp;
export const LAZY_PART3_FRAMES = p3.frames;

const p4 = makePart('lazy-agency/4-upsell', 4, slides4 as Slide[], {
  hook: S4.Hook4, ladder: S4.Ladder4, pricing: S4.Pricing4, seo: S4.Seo4, reviews: S4.Reviews4, keep: S4.Keep4, restaurants: S4.Restaurants4,
  agents: S4.Agents4, test: S4.Test4, foot: S4.Foot4, recap: S4.Recap4, harder: S4.Harder4, outro: S4.Outro4,
});
export const LazyPart4 = p4.Comp;
export const LAZY_PART4_FRAMES = p4.frames;
