/* indexSuffix2.js —— 原版 indexSuffix.js 的机制（定时器 stub、addEventListener 探针、轨迹、双喂…全部保留）
   只做两处安全改动：
     ① navigator.userAgent/platform 与 Python 请求头对齐（原版 sdenv 默认是 Mac Chrome/131，和请求头 Win Chrome/138 不一致）
     ② 结果提取按含 "OWNRL2Cu=" 的请求找，而不是死取 __captured[0]
   不改其它任何逻辑。 */

/* ============= 导入基本库 ============== */
const fs = require("fs");
const path = require("path");
const { path: gcPath } = require("ghost-cursor");
const implSymbol = require(path.join(__dirname, '..', '..', 'AiEeverseEnv', 'sdenv',
    'node_modules', 'sdenv-jsdom', 'lib', 'jsdom', 'living', 'generated', 'utils.js')).implSymbol;

/* ============= python 传递的参数 ============== */
Arg = JSON.parse(process.argv[2])

/* ============= 与请求头对齐的 UA ============== */
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

/* ============= 基本对象 ============== */
locationhref = Arg['locationhref']
InterfaceUrl = Arg['InterfaceUrl']
const BODY = Arg["data"]
html = fs.readFileSync(Arg['htmlpath'],"utf-8");
vmp = fs.readFileSync(Arg['vmppath'],"utf-8");

/* ============= 导入 sdenv ============== */
const sdenvpath =   Arg['sdenvpath']
const sdenv = require(sdenvpath);
const installRealChromeEnv = require('./env-patch');

/* ============= cookie存储 ============== */
const CookieJar =  sdenv.jsdom.CookieJar;
const jar = new CookieJar();
for (var i = 0;i<Arg['cookie'].length;i++){
    jar.setCookieSync(Arg['cookie'][i],InterfaceUrl)
}

/* ============= 本地拦截器 ================= */
const ResourceLoader = sdenv.jsdom.ResourceLoader;
class LocalLoader extends ResourceLoader {
    fetch(url, options) {
        if (url.includes(Arg['vmpurl'])) {
            return Promise.resolve(Buffer.from(vmp));
        }
        return Promise.resolve(Buffer.alloc(0));
    }
}

/* ============= 页面滑动坐标 ================= */
let __scrollY = 0;

/* ============= 创建window ================= */
const dom = sdenv.jsdomFromText(html, {
    url: locationhref,
    userAgent: UA,
    runScripts: "dangerously",
    resources: new LocalLoader(),
    cookieJar: jar,
    consoleConfig: { log: () => {}, info: () => {}, warn: () => {}, error: () => {}, table: () => {}, jsdomError: () => {} },
    beforeParse(window, sdenv) {
        /* ★ 环境补齐到真 Chrome（navigator / screen / 窗口尺寸 / plugins / webgl / canvas / audio） */
        installRealChromeEnv(window, sdenv);

        /* ========== 定时器等探针等函数 （原版保留） ================= */
        window.setTimeout = function () {};
        window.setInterval = function () {};
        window.clearTimeout = function () {};
        window.clearInterval = function () {};
        window.clearInterval.toString = function () {
            return "function clearInterval() { [native code] }";
        };

        /*   addEventListener 探针（原版保留） */
        window.__listeners = [];
        window.__mouseHandlers = [];
        const origAEL = window.EventTarget.prototype.addEventListener;
        window.EventTarget.prototype.addEventListener = function (type, fn, opts) {
            const targetName = this === window ? "window" : (this === window.document ? "document" : (this && this.tagName) || String(this).slice(0, 20));
            window.__listeners.push({ type: type, target: targetName });
            if (/^mouse/.test(String(type)) || String(type) === "click") {
                window.__mouseHandlers.push({ type: type, fn: fn, target: this });
            }
            return origAEL.call(this, type, fn, opts);
        };

        /* ===================  cookie 写入记录器 =================== */
        window.__cookieWrites = [];
        const cookieDesc = Object.getOwnPropertyDescriptor(window.Document.prototype, "cookie");
        Object.defineProperty(window.Document.prototype, "cookie", {
            get: cookieDesc.get,
            set: function (v) {
                window.__cookieWrites.push(String(v));
                cookieDesc.set.call(this, v);
            },
            configurable: true,
        });

        /* ==================== 屏幕参数 ========================== */
        Object.defineProperty(window, "innerWidth", {get: () => 1536, configurable: true});
        Object.defineProperty(window, "innerHeight", {get: () => 755, configurable: true});
        Object.defineProperty(window, "scrollX", {get: () => 0, configurable: true});
        Object.defineProperty(window, "pageXOffset", {get: () => 0, configurable: true});
        Object.defineProperty(window, "scrollY", {get: () => __scrollY, configurable: true});
        Object.defineProperty(window, "pageYOffset", {get: () => __scrollY, configurable: true});

        /* ============= 重写xhr和捕捉方案 （原版保留） ================= */
        window.__captured = [];
        const realOpen = window.XMLHttpRequest.prototype.open;
        const realHeader = window.XMLHttpRequest.prototype.setRequestHeader;
        const realSend = window.XMLHttpRequest.prototype.send;
        window.XMLHttpRequest.prototype.open = function (method, url) {
            this.__url = url;
            return realOpen.apply(this, arguments);
        };
        window.XMLHttpRequest.prototype.setRequestHeader = function (k, v) {
            this.__headers = this.__headers || {};
            this.__headers[k] = v;
            return realHeader.apply(this, arguments);
        };
        window.XMLHttpRequest.prototype.send = function (body) {
            window.__captured.push({ url: this.__url, body: body === undefined ? null : body , header:this.__headers });
        };
    }
});
const { window } = dom;

/*  ============= 屏幕信息 (建完后 documentElement/body（判空）) ================= */
(function () {
    const de = window.document.documentElement;
    if (de) {
        Object.defineProperty(de, "clientWidth", {get: () => 1536, configurable: true});
        Object.defineProperty(de, "clientHeight", {get: () => 755, configurable: true});
        Object.defineProperty(de, "scrollTop", {get: () => __scrollY, configurable: true});
    }
    const bd = window.document.body || window.document.getElementsByTagName("body")[0];
    if (bd) Object.defineProperty(bd, "scrollTop", {get: () => __scrollY, configurable: true});
}())


/* ============= 轨迹工具（ghost-cursor） ============= */
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);
const jit = (p, rx, ry) => ({ x: Math.round(p.x + rnd(-rx, rx)), y: Math.round(p.y + rnd(-ry, ry)) });
function makeMouse(type, x, y, buttons) {
    const ev = new window.MouseEvent(type, { clientX: x, clientY: y, screenX: x, screenY: y + 120, bubbles: true, cancelable: true, buttons: buttons || 0 });
    try { ev[implSymbol].isTrusted = true; } catch (e) {}
    return ev;
}
function fire(type, x, y, buttons) {
    const FEED = process.env.FEED || 'both';   // both(原版) | direct(只直调) | dispatch(只派发)
    const ev = makeMouse(type, x, y, buttons);
    if (FEED === 'direct' || FEED === 'both') {
        for (const h of (window.__mouseHandlers || [])) { if (h.type === type) { try { h.fn.call(h.target, ev); } catch (e) {} } }
    }
    if (FEED === 'dispatch') {
        try { window.document.dispatchEvent(ev); } catch (e) {}
    } else if (FEED === 'both') {
        window.dispatchEvent(ev); window.document.dispatchEvent(ev);
    }
}
function fireScroll() {
    __scrollY = Math.max(0, Math.min(__scrollY, 883));
    const se = new window.Event("scroll");
    for (const h of (window.__mouseHandlers || [])) if (h.type === "scroll") { try { h.fn.call(h.target, se); } catch (e) {} }
    window.dispatchEvent(se); window.document.dispatchEvent(new window.Event("scroll", { bubbles: true }));
}
function route(from, to, speed, maxPts) {
    maxPts = maxPts || 45;
    const pts = gcPath({ x: from.x, y: from.y }, { x: to.x, y: to.y }, { useTimestamps: true, moveSpeed: speed || undefined });
    const step = Math.max(1, Math.ceil(pts.length / maxPts));
    const sel = []; for (let i = 0; i < pts.length; i += step) sel.push(pts[i]);
    if (sel[sel.length - 1] !== pts[pts.length - 1]) sel.push(pts[pts.length - 1]);
    const out = []; for (let i = 1; i < sel.length; i++) out.push({ x: Math.round(sel[i].x), y: Math.round(sel[i].y), dt: Math.max(4, Math.min(30, Math.round(sel[i].timestamp - sel[i - 1].timestamp))) });
    return out;
}
async function follow(pts, opt) {
    opt = opt || {};
    for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (opt.scroll) { const k = (i + 1) / pts.length; __scrollY = Math.round(opt.scroll[0] + (opt.scroll[1] - opt.scroll[0]) * k); fireScroll(); }
        fire("mousemove", p.x, p.y, 0);
        let d = p.dt * (opt.slow ? 1.4 : 1);
        if (Math.random() < 0.08) d += rnd(15, 70);
        await sleep(d);
    }
}

/* ===== 等 VMP 就绪 → 跑轨迹 → 触发 → 输出 ===== */
const t0 = Date.now();
const readyIv = setInterval(() => {
    if ((window.__mouseHandlers || []).length > 0 || Date.now() - t0 > 5000) {
        clearInterval(readyIv);
        console.log('VMP ready, mouseHandlers =', (window.__mouseHandlers || []).length);
        runHuman();
    }
}, 100);
async function runHuman() {
    try {
        const VW = 1536, VH = 755, MAX = 883;
        const BTN = { x: 1018, y: 246 }, SBX = VW - 6, PAGER = { x: 594, y: 555 };
        let mx = Math.round(BTN.x + rnd(-45, 45)), my = Math.round(BTN.y + rnd(-12, 12));

        const sbEnd = { x: SBX + Math.round(rnd(-3, 3)), y: my + Math.round(rnd(-6, 6)) };
        await follow(route({ x: mx, y: my }, sbEnd, 4.5));

        const bottomEnd = { x: SBX + Math.round(rnd(-3, 3)), y: VH - Math.round(rnd(8, 30)) };
        await follow(route({ x: sbEnd.x, y: sbEnd.y }, bottomEnd, 3.2), { slow: true, scroll: [0, MAX] });

        const target = jit(PAGER, 8, 6);
        await follow(route({ x: bottomEnd.x, y: bottomEnd.y }, target, 4.5));

        fire("mousedown", target.x, target.y, 1); await sleep(35);
        fire("mousemove", target.x + 2, target.y + 1, 1); await sleep(35);
        fire("mouseup", target.x + 2, target.y + 1, 0);
        fire("click",   target.x + 2, target.y + 1, 0);
        console.log('轨迹/点击完成');

        await sleep(200);
        const _path = new URL(InterfaceUrl).pathname;   // ★ 用相对路径，和真机 jQuery 一致
        window.eval(`
          var xhr = new XMLHttpRequest();
          xhr.open('POST', ${JSON.stringify(_path)}, true);
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          xhr.setRequestHeader("Accept", "*/*");
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
          xhr.send(${JSON.stringify(BODY)});
        `);
        console.log('已触发 PageQuery');

        await sleep(700);
        var cookie =  jar.getCookieStringSync(InterfaceUrl);
        // ② 按含 OWNRL2Cu 的请求找（不再死取 [0]）
        const cap = (window.__captured || []).find(c => c.url && c.url.includes('OWNRL2Cu='));
        if (!cap) console.log('未捕获到含 OWNRL2Cu 的请求, captured =', JSON.stringify(window.__captured));
        var result = {
            "cookie":cookie,
            'OWNRL2Cu': cap ? cap.url.split("OWNRL2Cu=")[1] : null
        }
        console.log(JSON.stringify(result))
        process.exit(0);
    } catch (e) {
        console.log('runHuman 出错:', e && e.stack || e);
        process.exit(2);
    }
}


/* ===== 兜底超时（防卡死） ===== */
setTimeout(() => { console.log(JSON.stringify({ timeout: true, captured: window.__captured })); process.exit(1); }, 40000);
