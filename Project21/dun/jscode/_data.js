// 用 SDK 自己的模块（经 window.__req 拿到）计算 check 的 data —— 不改任何源码
const path = require('path');
const fs = require('fs');
const sdenv = require(path.resolve(__dirname, '..', '..', '..' ,'..','AiEeverseEnv', 'sdenv', 'index.js'));

const jscode = fs.readFileSync(path.join(__dirname, 'jscode.js'), 'utf-8');
const loadMin = fs.readFileSync(path.join(__dirname, 'load.min.js'), 'utf-8');
const PAGE = 'https://dun.163.com/trial/jigsaw';
const html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';

const dom = sdenv.jsdomFromText(html, {
    url: PAGE, runScripts: 'dangerously', resources: new sdenv.jsdom.ResourceLoader(),
    consoleConfig: { log() {}, info() {}, warn() {}, error() {}, jsdomError() {} },
    beforeParse(window, s) {
        s.getHandle('func')({ log: false }); s.getHandle('eval')({ log: false });
        s.getHandle('timeout')({ log: false }); s.getHandle('interval')({ log: false });
        const origCall = window.Function.prototype.call;
        window.Function.prototype.call = function () {
            if (!window.__req) { const a = arguments[3]; if (typeof a === 'function' && a.m && a.c) window.__req = a; }
            return origCall.apply(this, arguments);
        };
        s.tools.setFuncNative(window.Function.prototype.call, 'call', 1);
    },
});
const { window } = dom;
window.eval(jscode);
window.eval(loadMin);

const M = window.__req(0xa);   // { aes, xorEncode, xorDecode }
const U = window.__req(0x3);   // util: sample / unique2DArray
const C = window.__req(0x5);   // 常量: SAMPLE_NUM
const T = window.__req(0x38);  // 轨迹特征提取

const arg = JSON.parse(process.argv[2]);
const token = arg.token;
const trajectory = arg.trajectory;
const slide = arg.slide;
const width = arg.width || 320;
const mouseDownCounts = arg.mouseDownCounts == null ? 1 : arg.mouseDownCounts;

const traceData = trajectory;        // ext 的 length 用
const atomTraceData = trajectory;    // f 用

// d：逐点 xorEncode(token, point+'')，再 sample(50)，再 join(':')（对齐 dun2 已验证的公式）
const encPoints = traceData.map(function (p) { return M.xorEncode(token, p + ''); });

const data = {
    d: M.aes(U.sample(encPoints, C.SAMPLE_NUM).join(':')),
    m: '',
    p: M.aes(M.xorEncode(token, slide / width * 100 + '')),
    f: M.aes(M.xorEncode(token, T(U.unique2DArray(atomTraceData, 2)).join(','))),
    ext: M.aes(M.xorEncode(token, mouseDownCounts + ',' + traceData.length)),
};
console.log(JSON.stringify({ data: data }));
process.exit(0);
