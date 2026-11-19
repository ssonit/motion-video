// Paste into the browser console on https://x.ai/bot/marketplace to list every distinct Grok Bot head shape.
// Prints JSON [{h: headPath, e: [eyePath, eyePath], fill: '#rrggbb' of the first bot using it}].
(() => {
  const hex = (c) => '#' + (c.match(/\d+/g) || []).slice(0, 3).map((n) => (+n).toString(16).padStart(2, '0')).join('');
  const seen = {};
  const out = [];
  document.querySelectorAll('svg.grok-bot-mark').forEach((s) => {
    const h = s.querySelector('.grok-bot-mark__head');
    const k = h.getAttribute('d').slice(0, 60);
    if (seen[k]) return;
    seen[k] = 1;
    out.push({
      h: h.getAttribute('d'),
      e: [...s.querySelectorAll('.grok-bot-mark__eye')].map((x) => x.getAttribute('d')),
      fill: hex(getComputedStyle(h).fill),
    });
  });
  console.log(JSON.stringify(out));
  return out.length + ' shapes';
})();
