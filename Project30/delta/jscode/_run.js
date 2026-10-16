const fs = require('fs');
const { execFileSync } = require('child_process');
const akamai = require('../../delta/akamai-v3-sensor-data-helper');
const fc = fs.readFileSync(__dirname + '/jscode.js', 'utf8');

const out = execFileSync('node', [__dirname + '/index.js', 'bm_sz=X~Y~4408628~8'], { cwd: __dirname, encoding: 'utf8' });
const lines = out.trim().split(/\r?\n/);
console.log(lines.find(l => l.startsWith('behavior:')) || '(no behavior line)');
const sd = JSON.parse(lines[lines.length - 1]).sensor_data;
console.log('sensor_data len:', sd.length, '| header:', sd.split(';').slice(0, 7).join(' | '));
const r = akamai.decrypt(JSON.stringify({ sensor_data: sd }), fc);
if (!r.success) { console.log('DECRYPT FAIL:', r.message); process.exit(0); }
console.log('plain len:', r.data.length);
const o = r.parsedData;
for (const k of ['din', 'mst', 'ffs', 'inf', 'vev', 'kev', 'dme', 'mev', 'doe', 'pev', 'tev', 'pde', 'oev', 'if', 'sde', 'ajt']) {
  if (o[k] === undefined) continue;
  console.log(k.padEnd(6), (Array.isArray(o[k]) ? 'array' : typeof o[k]).padEnd(7), 'size=' + JSON.stringify(o[k]).length, JSON.stringify(o[k]).slice(0, 150));
}
