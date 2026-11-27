import React from 'react';
import {SHOTS, mkBars, mkBrowser, mkProgress, mkRows, mkTiles} from './common';
import {Chat, Composer, mkEnvelopes, mkMap} from './maps';
import {mkChat} from './chat';
import {mkChapter} from '../../shared/ChapterCard';

/** Part 3 (lazy-agency/3-website). */
export const Hook3 = mkChapter({kicker: 'THE SIMPLEST VERSION', num: '03', title: 'The website play', bgWord: 'WEBSITE'});

export const Scrape3 = mkMap({label: 'Step 1', title: 'Scrape businesses with *no website*', pins: 24, glow: 0.4, counter: {to: 600, text: 'local companies, no site'}, asset: 'maplisting'});

export const Filter3 = mkRows({
  label: 'A smarter list',
  title: 'Keep the *real* ones',
  rows: [
    {ico: 'phone', t: 'Has a phone number', c: '#9aa0ff'},
    {ico: 'star', t: 'Has a few reviews', c: '#ffd166'},
    {ico: 'clock', t: 'Has opening hours'},
    {ico: 'x', t: 'Still no website', s: 'Busy, real, easy to help', c: '#ff7a1a'},
  ],
  bot: 'circle',
});

export const Choice3 = mkBars({
  label: 'Calling or emailing',
  title: 'Email them *all in a day*',
  bars: [
    {t: 'Phone every one', v: 2, max: 2, unit: 'days', c: '#ff5a6e'},
    {t: 'Email every one', v: 1, max: 2, unit: 'day', c: '#37d67a'},
  ],
  note: 'Send yourself, or let a Bot send',
});

export const Email3 = Composer;

export const Trick3 = mkEnvelopes({label: 'The trick', title: 'You have *not built it yet*', lit: 3, foot: 'Build only when someone replies'});

export const Reply3 = Chat;

export const Build3 = mkChat({
  label: 'After a yes',
  title: 'Grok Bot builds *one* page',
  active: 1,
  bot: 'Site Builder',
  ask: 'Oak Lane Plumbing replied. Build her a simple page.',
  sendAt: 0.12,
  panelNote: 'Building the page…',
  replies: [{at: 0.18, blocks: [
    {k: 'steps', items: ['Reading her reply', 'Writing the copy', 'Building the page'], gap: 26},
    {k: 'site', name: 'Oak Lane Plumbing', lines: ['Fast, friendly, fair price', 'Call now']},
    {k: 'text', t: 'Ready to send. Want me to email it?'},
  ]}],
});

export const Fear3 = mkEnvelopes({label: 'People panic', title: 'Not *500* websites', lit: 4, foot: 'Only replies get a site', thumbs: true});

export const Math3 = mkTiles({
  label: 'Example numbers',
  title: 'Do the *math*',
  tiles: [
    {ico: 'mail', t: '500 emails'},
    {ico: 'user', t: '40-50 replies'},
    {ico: 'check', t: '20 buy', hl: true},
  ],
  big: <>20 × $500 = <span style={{color: '#ff7a1a'}}>$10,000</span></>,
  bigAt: 0.68,
  chips: ['Example only, not a promise'],
});

export const Work3 = mkMap({label: 'It repeats', title: 'Every town *you can reach*', pins: 30, glow: 0.3, checks: ['Uses credits', 'Takes real work at first', 'Repeatable']});

export const Saturated3 = mkRows({
  label: 'A fair warning',
  title: 'Websites are *crowded*',
  rows: [
    {ico: 'people', t: 'Plenty of people sell them', c: '#9aa0ff'},
    {ico: 'x', t: 'You may hear a lot of no', c: '#ff5a6e'},
    {ico: 'chart', t: 'Treat each no as data', s: 'Then keep sending', c: '#37d67a'},
  ],
});

export const Goal3 = mkProgress({label: 'Your goal', title: 'Not 500. *Twenty or thirty*', to: 25, unit: 'sold', marks: [10, 20, 30], sub: 'That is when things open up'});
