/* Forense: commits des de les 18:00 + estat actual complet */
const fs = require('fs');
const src = fs.readFileSync('C:/Users/roser/midweek/config.js', 'utf8');
const tok = (src.match(/token\s*:\s*"([^"]+)"/) || [])[1];
const H = { 'User-Agent': 'appats-diag', Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + tok };
const T = t => t ? new Date(t).toLocaleString('ca-ES', { timeZone: 'Europe/Madrid' }) : '-';
(async () => {
  const g = await (await fetch('https://api.github.com/gists/fb5e8063724648390c0b02d62265e7ca', { headers: H })).json();
  const st = JSON.parse(g.files['midweek-state.json'].content);
  console.log('=== ESTAT ACTUAL ===');
  console.log('updated_at:', T(g.updated_at));
  console.log('lastEdit:', JSON.stringify(st.lastEdit || null));
  console.log('persones:', (st.people || []).map(p => p.name).join(', '));
  console.log('llistes:', (st.shoppingLists || []).map(l => l.name).join(', '));
  console.log('deletedLists:', (st.deletedLists || []).map(l => l.name + '@' + T(l.deletedAt)).join(', ') || '(buit)');
  console.log('_syncedAt:', T(st._syncedAt));
  const commits = await (await fetch('https://api.github.com/gists/fb5e8063724648390c0b02d62265e7ca/commits?per_page=20', { headers: H })).json();
  console.log('\n=== COMMITS (últims 20) ===');
  (commits || []).forEach((c, i) => {
    const t = new Date(c.committed_at).getTime();
    const mark = t > new Date('2026-10-01T16:00:00+02:00').getTime() ? ' ◄ DESPRÉS 16:00' : '';
    console.log(`${String(i + 1).padStart(2)} ${T(c.committed_at)}${mark}`);
  });
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
