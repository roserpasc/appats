/* Vigilant: cada 15s mira el head del gist; loggeja canvis. 12 minuts. */
const fs = require('fs');
const src = fs.readFileSync('C:/Users/roser/midweek/config.js', 'utf8');
const tok = (src.match(/token\s*:\s*"([^"]+)"/) || [])[1];
const H = { 'User-Agent': 'appats-watch', Authorization: 'Bearer ' + tok };
let last = null;
const t0 = Date.now();
const log = m => console.log(new Date().toLocaleTimeString('ca-ES') + ' ' + m);
log('vigilant 12 minuts...');
const iv = setInterval(async () => {
  if (Date.now() - t0 > 12 * 60 * 1000) { clearInterval(iv); log('FI'); return; }
  try {
    const r = await fetch('https://api.github.com/gists/fb5e8063724648390c0b02d62265e7ca/commits?per_page=1', { headers: H });
    const h = (await r.json())[0];
    if (!h) return;
    if (last && h.version !== last) {
      log('*** NOU COMMIT *** ' + h.committed_at + ' ver=' + h.version.slice(0, 8));
      const g = await (await fetch('https://api.github.com/gists/fb5e8063724648390c0b02d62265e7ca', { headers: H })).json();
      try {
        const st = JSON.parse(g.files['midweek-state.json'].content);
        log('  lastEdit=' + JSON.stringify(st.lastEdit));
        log('  persones=' + (st.people || []).map(p => p.name).join(','));
        log('  llistes=' + (st.shoppingLists || []).map(l => l.name).join(','));
      } catch (e) {}
    } else if (!last) { last = h.version; log('base ver=' + h.version.slice(0, 8) + ' @' + h.committed_at); }
    last = h.version;
  } catch (e) { log('ERR ' + e.message); }
}, 15000);
