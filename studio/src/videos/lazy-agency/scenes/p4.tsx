import React from 'react';
import {SHOTS, mkBubble, mkReal, mkRows, mkStatement, mkTiles, mkVerdict} from './common';
import {AgentWindows, ReviewReply, SearchRank} from './maps';
import {mkChat} from './chat';

/** Part 4 (lazy-agency/4-upsell). */
export const Hook4 = mkStatement({label: 'PART 4 · THE UPSELL', lines: ['The website is', 'the *door*'], sub: 'Not the product', bot: 'pillow'});

export const Ladder4 = mkRows({
  label: 'Offer 1 · Care plan',
  title: 'I look after your *site*',
  rows: [
    {ico: 'gear', t: 'I update the pages', c: '#9aa0ff'},
    {ico: 'globe', t: 'I keep it online'},
    {ico: 'shield', t: 'I make sure it never expires'},
    {ico: 'coin', t: 'Say $99 / month', s: 'A Bot does the work', c: '#ffd166'},
  ],
  shot: {...SHOTS.panel, crop: {x: 0, y: 0, w: 322, h: 195}, w: 340, x: 850, y: 200, hl: {x: 8, y: 30, w: 306, h: 60}, callout: 'Routines run on their own'},
});

export const Pricing4 = mkVerdict({
  label: 'Keep it simple',
  title: 'Two plans, *one minute* to decide',
  cards: [
    {ico: 'house', t: 'Build', s: 'One-off fee', ok: true},
    {ico: 'cal', t: 'Care', s: 'Small monthly fee', ok: true},
  ],
});

export const Seo4 = SearchRank;
export const Reviews4 = ReviewReply;

export const Keep4 = mkTiles({
  label: 'Stack them up',
  title: 'You keep *selling*',
  tiles: [
    {ico: 'globe', t: 'Website'},
    {ico: 'gear', t: 'Care'},
    {ico: 'search', t: 'SEO'},
    {ico: 'star', t: 'Reviews'},
    {ico: 'coin', t: 'Accounts', hl: true},
  ],
  big: <>Grok Bot does the <span style={{color: '#ff7a1a'}}>work</span></>,
  bigAt: 0.7,
});

export const Restaurants4 = mkChat({
  label: 'Foot in the door',
  title: 'A *free* gift that earns trust',
  active: 2,
  bot: 'Review Replier',
  ask: "Reply to this week's reviews for Rosa's Kitchen.",
  sendAt: 0.14,
  panelNote: 'Writing replies…',
  replies: [{at: 0.2, blocks: [
    {k: 'steps', items: ['Reading 6 new reviews', 'Drafting friendly replies'], gap: 26},
    {k: 'review', stars: 5, quote: 'Lovely food, quick service.', reply: 'Thank you! We are glad you enjoyed it. See you soon.'},
  ]}],
});

export const Agents4 = AgentWindows;

export const Test4 = mkReal({
  label: 'Before you sell',
  title: 'Always *test* first',
  shot: {...SHOTS.detail, crop: {x: 50, y: 340, w: 430, h: 165}, w: 520, x: 90, y: 200, hl: {x: 55, y: 352, w: 145, h: 150}, callout: 'Skills, routines, integrations'},
  rows: [
    {ico: 'doc', t: 'Run it on sample data', c: '#9aa0ff'},
    {ico: 'eye', t: 'Check the answers yourself'},
    {ico: 'people', t: 'Let the client review first'},
    {ico: 'check', t: 'Small and correct wins', c: '#37d67a'},
  ],
  rowsX: 680,
});

export const Foot4 = mkBubble({label: 'Foot in the door', title: 'The next yes is *easy*', text: 'It works. What else can you fix for me?', chips: ['A problem they feel every week']});

export const Recap4 = mkTiles({
  label: 'The whole path',
  title: 'Five *short* steps',
  tiles: [
    {ico: 'people', t: 'Niche you know'},
    {ico: 'search', t: 'Find the pain'},
    {ico: 'gear', t: 'One small offer'},
    {ico: 'coin', t: 'First sale'},
    {ico: 'up', t: 'Stack agents', hl: true},
  ],
});

export const Harder4 = mkStatement({label: 'NOT FEELING LAZY?', lines: ['A *full agency*', 'is a bigger project'], sub: 'Many agents, any business, a different video', bot: 'circle'});

export const Outro4 = mkStatement({label: 'THE QUICKEST START', lines: ['One *niche*', 'One page. One offer.'], sub: 'Let the Bots work. Keep selling.', bot: 'drop'});
