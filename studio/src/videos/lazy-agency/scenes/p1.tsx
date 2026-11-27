import React from 'react';
import {SHOTS, mkBubble, mkBrowser, mkGrid, mkReal, mkRows, mkStatement, mkTable, mkVerdict} from './common';
import {Months, PhoneGallery, mkMap} from './maps';
import {mkChat} from './chat';

/** Part 1 (lazy-agency/1-niche). */
export const Hook1 = mkStatement({label: 'THE LAZY WAY · PART 1', lines: ['Make money', 'the *lazy* way'], sub: 'One small idea. A crew of Bots.', bot: 'blob'});

export const Lazy1 = mkReal({
  label: 'The shortest path',
  title: 'Start from *zero*',
  shot: {...SHOTS.top, crop: {x: 40, y: 85, w: 720, h: 245}, w: 700, x: 90, y: 195, hl: {x: 55, y: 232, w: 690, h: 92}, callout: 'A crew of Bots, ready to hire'},
  rows: [
    {ico: 'clock', t: 'From scratch', s: 'no team, no stack', c: '#9aa0ff'},
    {ico: 'bolt', t: 'Least effort', s: 'Bots do the heavy part'},
    {ico: 'coin', t: 'Money, fast', s: 'sell a service', c: '#37d67a'},
  ],
  rowsX: 830,
});

export const Step1 = mkBrowser({label: 'Step 1', title: 'Build a simple *landing page*', url: 'my-new-agency.com', blocks: ['nav', 'hero', 'cards', 'cta'], asset: 'builder', callout: 'One page. One promise.'});

export const Niche1 = mkGrid({
  label: 'Step 2 · Pick a niche',
  title: 'Any *niche* will do',
  items: [
    {ico: 'dumbbell', t: 'Gyms'},
    {ico: 'fork', t: 'Restaurants'},
    {ico: 'leaf', t: 'Gardeners'},
    {ico: 'window', t: 'Window cleaners'},
    {ico: 'wrench', t: 'Plumbers'},
    {ico: 'house', t: 'Landscapers'},
    {ico: 'camera', t: 'Photographers'},
    {ico: 'people', t: 'Clinics'},
  ],
});

export const Know1 = mkBubble({label: 'Pick one you know', big: 'Start where you have *intel*', text: 'My dad runs a landscaping company. I know how his day goes.', chips: ['What annoys them', 'What they would pay for', 'How the work flows']});

export const Pains1 = mkRows({
  label: 'Think inside their business',
  title: 'A landscaper\'s *pain points*',
  rows: [
    {ico: 'star', t: 'Time to reply to Google reviews?', s: 'No. He is cutting grass.', c: '#ffd166'},
    {ico: 'phone', t: 'Stops the mower to answer the phone', s: 'Every single call'},
    {ico: 'globe', t: 'Does he even have a website?'},
    {ico: 'search', t: 'Where do his customers come from?'},
  ],
  bot: 'drop',
});

export const Portfolio1 = PhoneGallery;

export const Plumber1 = mkMap({label: 'Same check, new niche', title: 'A plumber, ten *honest questions*', checks: ['No Google profile?', 'No website?', 'No ads?'], asset: 'maplisting', pins: 14, glow: 0.45});

export const Columns1 = mkTable({
  label: 'The blueprint',
  title: 'Figure out *3 things*',
  cols: ['Niche', 'Pain point', 'How you help'],
  rows: [
    ['Landscaper', 'No time for reviews or calls', 'A reply + phone agent'],
    ['Plumber', 'Paperwork at night', 'An invoicing agent'],
  ],
});

export const NotEvery1 = mkVerdict({
  label: 'The trap',
  title: 'Not every business needs *every* agent',
  cards: [
    {ico: 'star', t: 'Review replies', s: 'The plumber never asks for reviews', ok: false},
    {ico: 'doc', t: 'Invoices and accounts', s: 'Self-employed, buried in paperwork', ok: true},
  ],
});

export const Need1 = mkRows({
  label: 'Sell what they actually need',
  title: 'The real *need* wins',
  rows: [
    {ico: 'doc', t: 'Invoices go out late', s: 'Money waits in the van', c: '#9aa0ff'},
    {ico: 'coin', t: 'Accounts pile up', s: 'Every Sunday night'},
    {ico: 'check', t: 'Offer: a simple accounts agent', s: 'Fixes it once, keeps fixing it', c: '#37d67a'},
  ],
  bot: 'pillow',
});

export const Recurring1 = Months;

export const Bridge1 = mkChat({
  label: 'Next',
  title: 'How do you get *customers*?',
  active: 0,
  bot: 'Lead Hunter',
  ask: 'How do I find customers for my new agency?',
  sendAt: 0.2,
  replies: [{at: 0.3, blocks: [{k: 'text', t: 'Start local. Plenty of small businesses still have no website.'}, {k: 'steps', items: ['Searching local listings', 'Filtering: no website'], gap: 22}, {k: 'text', t: 'Want me to build the list?'}]}],
});
