import React from 'react';
import {SHOTS, mkBars, mkBrowser, mkBubble, mkReal, mkRows, mkStatement, mkTiles} from './common';
import {mkMap} from './maps';
import {mkChat} from './chat';
import {mkCreateBot} from './createbot';

/** Part 2 (lazy-agency/2-lazy). */
export const Hook2 = mkBubble({label: 'Part 2 · The lazy part', title: 'How do you *sell* it?', text: 'Okay, but how do I actually sell this?', chips: ['Fair question', 'Much less scary than it sounds']});

export const Easy2 = mkStatement({label: 'THE GOOD NEWS', lines: ['Selling is the', '*easy* part'], sub: 'The product genuinely helps people', bot: 'drop'});

export const Ways2 = mkTiles({
  label: 'Routes people use',
  title: 'Four ways to *reach* them',
  tiles: [
    {ico: 'phone', t: 'Cold calls'},
    {ico: 'mail', t: 'Emails'},
    {ico: 'chart', t: 'Ads'},
    {ico: 'house', t: 'Walk in'},
  ],
  arrows: false,
  big: <>All of them <span style={{color: '#ff7a1a'}}>ask</span></>,
  bigAt: 0.62,
});

export const Proof2 = mkRows({
  label: 'Learn from others',
  title: 'People are *already* doing it',
  rows: [
    {ico: 'people', t: 'Built with Grok Bot + a page builder', s: 'Earning from local businesses', c: '#9aa0ff'},
    {ico: 'user', t: 'Ask how they sell', s: 'Read the answers, copy what works'},
    {ico: 'check', t: 'You never invent the method alone', c: '#37d67a'},
  ],
  bot: 'circle',
});

export const Ask2 = mkBubble({label: 'The whole trick', title: 'Just *ask*', text: 'I have this. Do you want it?', chips: ['Most people never get a yes', 'Because they never ask']});

export const Setup2 = mkCreateBot({
  label: 'Why it is the laziest route',
  title: 'Set up in *3-4 hours*',
  name: 'Lead Hunter',
  rows: [
    {ico: 'bolt', t: 'An AI agent', c: '#7a6cf0'},
    {ico: 'globe', t: 'A simple website'},
    {ico: 'camera', t: 'Facebook + Instagram', c: '#e0398e'},
  ],
});

export const Leads2 = mkChat({
  label: 'Customers',
  title: 'A Bot finds the *leads*',
  active: 0,
  bot: 'Lead Hunter',
  ask: 'Find landscapers near me with no website. Save their emails.',
  sendAt: 0.14,
  panelNote: 'Searching listings…',
  replies: [{at: 0.2, blocks: [
    {k: 'steps', items: ['Searching local listings', 'Found 612 landscapers', '548 have no website', 'Saved to your leads sheet'], gap: 26},
    {k: 'leads', rows: [['Green Stripe Lawns', '555-0148', 'no site'], ['Oak Hill Gardens', '555-0162', 'no site'], ['Mowers & Sons', '555-0107', 'no site']]},
  ]}],
});

export const Complicated2 = mkBars({
  label: 'Why we never start',
  title: 'We make it *complicated*',
  bars: [
    {t: 'What it feels like', v: 90, max: 100, unit: '% hard', c: '#ff5a6e'},
    {t: 'What the steps really are', v: 20, max: 100, unit: '% hard', c: '#37d67a'},
  ],
  note: 'The hard part is beginning',
});

export const Price2 = mkRows({
  label: 'You set the price',
  title: 'A *monthly* fee, your call',
  rows: [
    {ico: 'coin', t: 'Start low', s: 'Learn what people say', c: '#ffd166'},
    {ico: 'up', t: 'Raise it later', s: 'When the work earns it'},
    {ico: 'cal', t: 'Keep it monthly', s: 'Recurring beats one-off', c: '#37d67a'},
  ],
});

export const AnyNiche2 = mkReal({
  label: 'Any niche',
  title: 'A Bot for almost *any job*',
  shot: {...SHOTS.top, crop: {x: 40, y: 85, w: 720, h: 240}, w: 700, x: 290, y: 195, hl: {x: 50, y: 124, w: 645, h: 30}, callout: 'Sales, marketing, engineering and more'},
});

export const Code2 = mkChat({
  label: 'A useful skill',
  title: 'It builds a *website* for you',
  active: 1,
  bot: 'Site Builder',
  ask: 'Build a one-page site for Green Stripe Lawns.',
  sendAt: 0.14,
  panelNote: 'Building the page…',
  replies: [{at: 0.2, blocks: [
    {k: 'steps', items: ['Writing the copy', 'Building hero and gallery', 'Adding a call button', 'Checking it on mobile'], gap: 26},
    {k: 'site', name: 'Green Stripe Lawns', lines: ['Perfect stripes, every week', 'Call now']},
  ]}],
});

export const Rules2 = mkRows({
  label: 'One honest note',
  title: 'Lazy does not mean *careless*',
  rows: [
    {ico: 'mail', t: 'Use real business addresses', c: '#9aa0ff'},
    {ico: 'user', t: 'Say clearly who you are'},
    {ico: 'shield', t: 'Always include an easy opt-out', s: 'Rules differ by country', c: '#37d67a'},
  ],
  bot: 'blob',
});

export const Bridge2 = mkMap({label: 'Next', title: 'The *website play*', pins: 18, glow: 0.4, counter: {to: 500, text: 'local businesses with no site'}});
