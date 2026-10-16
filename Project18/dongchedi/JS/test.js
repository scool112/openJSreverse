
/* ============================================================
 * test.js — a_bogus 字段敏感性测试
 * 用法: node test.js
 * 原理: 每个用例清 require 缓存 → 重载 env.js + Webpack.js
 *       → 变异一个字段 → init → fetch → 读 window.a_bogus 长度
 * ============================================================ */
const BASE = __dirname;

function clearCache() {
    for (const k of Object.keys(require.cache)) {
        if (k.startsWith(BASE)) delete require.cache[k];
    }
}

function runCase(name, mutate) {
    clearCache();
    require('./env.js');
    if (mutate) mutate();                    // 变异必须在 Webpack 加载前（nWID 在 init 时采集）
    require('./Webpack.js');
    window.bdms.init({ aid: 1839, paths: ['/motor/pc/car/brand/select_series_v2'], pageId: 1 });
    window.fetch('/motor/pc/car/brand/select_series_v2?aid=1839&app_name=auto_web_pc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-real-ip': '' },
        body: 'series_type=1&sort_new=hot_desc&city_name=%E5%8D%97%E5%85%85&limit=30&page=4',
        rawRes: true,
        signal: {}
    });
    const ab = window.a_bogus || '';
    return { name, len: window.a_bogus_len || ab.length || 0, head: ab.slice(0, 16) };
}

const cases = [
    ['基线（不动）', null],
    ['screen 全部清空', () => { for (const k of Object.keys(screen)) delete screen[k]; }],
    ['screen 只留 height/width', () => { for (const k of Object.keys(screen)) if (k !== 'height' && k !== 'width') delete screen[k]; }],
    ['删 screen.availWidth', () => { delete screen.availWidth; }],
    ['删 screen.pixelDepth', () => { delete screen.pixelDepth; }],
    ['删 navigator.userAgent', () => { delete Navigator.prototype.userAgent; }],
    ['navigator.languages 改空', () => { Navigator.prototype.languages = []; }],
    ['navigator.plugins 清空', () => { Navigator.prototype.plugins = []; }],
    ['删 navigator.deviceMemory', () => { delete Navigator.prototype.deviceMemory; }],
    ['navigator.hardwareConcurrency 改 2', () => { Navigator.prototype.hardwareConcurrency = 2; }],
    ['canvas 移除（createElement 只支持 span）', () => {
        document.createElement = function (s) { if (s === 'span') return new HTMLSpanElement(); return null; };
    }],
    ['OfflineAudioContext/AudioContext 删除', () => {
        delete window.OfflineAudioContext; delete window.AudioContext;
    }],
    ['document.title 删', () => { delete document.title; }],
    ['location.href 改', () => { location.href = 'https://www.dongchedi.com/auto/library/x-1-x-x-x-x-x-x-x-x-x'; }],
];

console.log('===== 逐用例结果 =====');
const results = [];
for (const [name, mutate] of cases) {
    try {
        const r = runCase(name, mutate);
        results.push(r);
        console.log(`[${r.name}] 长度=${r.len}  内容头16=${r.head}`);
    } catch (e) {
        console.log(`[${name}] ❌ ${e.message.slice(0, 100)}`);
    }
}

console.log('\n===== 与基线对比（长度差 = 该字段对 a_bogus 的贡献） =====');
const base = results[0];
for (const r of results.slice(1)) {
    const d = r.len - base.len;
    const same = r.head === base.head;
    console.log(`${r.name.padEnd(40)} ${d > 0 ? '+' : ''}${d} 字符 (${base.len}→${r.len})${same ? '  内容相同!' : ''}`);
}
process.exit(0);
