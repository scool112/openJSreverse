

/* ============= 导入基本库 ============== */
const fs = require("fs");
const path = require("path");
const { path: gcPath } = require("ghost-cursor");
const implSymbol = require(path.join(__dirname, '..', '..', 'AiEeverseEnv', 'sdenv',
    'node_modules', 'sdenv-jsdom', 'lib', 'jsdom', 'living', 'generated', 'utils.js')).implSymbol;

/* ============= python 传递的参数 ============== */
Arg = JSON.parse(process.argv[2])

/* ============= 与 Python 请求头对齐的 UA ============== */
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
        const isVmp = url.includes(Arg['vmpurl']);
        const el = options && options.element && options.element.tagName;
        console.log('[loader]', isVmp ? 'VMP' : (url.includes('z5gPWiiwO6ht') ? 'OTHER-VMP-URL' : 'EMPTY'), el ? ('<' + el + '>') : '', url);
        if (isVmp) {
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
    userAgent: UA,   // 注：jsdomFromText 的该选项无效，真正生效的是下面 beforeParse 里的 defineNav
    runScripts: "dangerously",
    resources: new LocalLoader(),
    cookieJar: jar,
    consoleConfig: { log: () => {}, info: () => {}, warn: () => {}, error: () => {}, table: () => {}, jsdomError: () => {} },
    beforeParse(window, sdenv) {
        /* ========== 定时器：不要再清空！清空会掐死瑞数 vmp 的异步调度 ================= */
        // 如需控制时间，用 handle（而不是把 setTimeout 换成空函数）：
        // sdenv.getHandle('timeout')({ time: 0, log: false });
        // sdenv.getHandle('interval')({ time: 0, log: false });

        /* ========== navigator 和请求头 UA 对齐 ================= */
        const defineNav = (k, v) => Object.defineProperty(window.navigator, k, { get: () => v, configurable: true });
        defineNav('userAgent', UA);
        defineNav('appVersion', UA.replace(/^Mozilla\//, ''));
        defineNav('platform', 'Win32');
        defineNav('vendor', 'Google Inc.');

        /* ★ 页面错误探针 */
        window.addEventListener('error', function (e) {
            console.log('[PAGE-ERROR]', e && e.message, '@', e && e.filename, (e && e.lineno) + ':' + (e && e.colno));
        });

        /*   addEventListener 探针：记录瑞数挂的监听器（类型/目标），保存鼠标/指针/触摸回调引用（直喂用）
             ★ 注意：sdenv 用 wrapFunc 覆盖了 window/document 自己的 addEventListener（own 属性），
                所以只 hook EventTarget.prototype 抓不到 document/window 的注册，必须连 own 属性也包一层 */
        window.__listeners = [];
        window.__mouseHandlers = [];
        const record = (type, fn, target, tname) => {
            window.__listeners.push({ type: type, target: tname });
            if (/^(mouse|pointer|touch)/.test(String(type)) || String(type) === "click") {
                window.__mouseHandlers.push({ type: String(type), fn: fn, target: target });
            }
        };
        const wrapOwnAEL = (target, tname) => {
            const orig = target.addEventListener;
            if (typeof orig !== 'function') return;
            target.addEventListener = function (type, fn, opts) {
                record(type, fn, target, tname);
                return orig.call(this, type, fn, opts);
            };
        };
        wrapOwnAEL(window, 'window');
        wrapOwnAEL(window.document, 'document');
        const origAEL = window.EventTarget.prototype.addEventListener;
        window.EventTarget.prototype.addEventListener = function (type, fn, opts) {
            const targetName = this === window ? "window" : (this === window.document ? "document" : (this && this.tagName) || String(this).slice(0, 20));
            record(type, fn, this, targetName);
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


        /* ============= 重写xhr和捕捉方案 ================= */
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
            window.__captured.push({ url: this.__url, body: body === undefined ? null : body , header:this.__headers });  // 把 请求的 url 和 body 填充到  window.__captured中
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
    const init = { clientX: x, clientY: y, screenX: x, screenY: y + 120, bubbles: true, cancelable: true, buttons: buttons || 0 };
    let Ctor = window.MouseEvent;
    if (/^pointer/.test(type) && window.PointerEvent) { Ctor = window.PointerEvent; init.pointerId = 1; init.pointerType = 'mouse'; init.isPrimary = true; }
    else if (/^touch/.test(type) && window.TouchEvent) { Ctor = window.TouchEvent; }
    const ev = new Ctor(type, init);
    try { ev[implSymbol].isTrusted = true; } catch (e) {}   // ★ 改 impl，别 defineProperty
    return ev;
}
function fire(type, x, y, buttons) {
    const ev = makeMouse(type, x, y, buttons);
    // ★ 只喂一次：直接调记录到的处理器；没有记录到的再退回 dispatch（去掉“直调 + dispatch”双喂）
    let hit = 0;
    for (const h of (window.__mouseHandlers || [])) {
        if (h.type === type) {
            try { h.fn.call(h.target, ev); hit++; }
            catch (e) {
                console.log('[handler-throw]', h.type, '=>', e && e.message);
                let vm = '?'; try { vm = window.eval('typeof Math'); } catch (_) { vm = 'eval-err'; }
                console.log('    page typeof Math =', vm, '| typeof window.Math =', typeof window.Math,
                    '| window.Math===Math =', (() => { try { return window.eval('window.Math===Math'); } catch (_) { return 'err'; } })());
            }
        }
    }
    if (hit === 0) { window.dispatchEvent(ev); window.document.dispatchEvent(ev); }
}
function fireScroll() {
    __scrollY = Math.max(0, Math.min(__scrollY, 883));
    // 只派发一次（bubbles 会从 document 冒到 window，避免 window/document 双喂）
    window.document.dispatchEvent(new window.Event("scroll", { bubbles: true }));
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
        if (Math.random() < 0.08) d += rnd(15, 70);   // ★ 速度不规律：8% 概率卡一下
        await sleep(d);
    }
}

/* ===== 等 VMP 就绪 → 跑轨迹 → 触发 → 输出 ===== */
/* 注：这页的外链 vmp 加载后【自己会启动】（页面内联 if($_ts.lcd)$_ts.lcd() 在 vmp 之前执行=空操作，
   启动由外链脚本负责）。所以这里【不要】再手动 call $_ts.lcd()，否则会重复初始化把指令表搞坏
   （表现为 _$bk[_$cd] is not a function / Math.random 相关的踩空）。 */
const t0 = Date.now();
const readyIv = setInterval(() => {
    if ((window.__mouseHandlers || []).length > 0 || Date.now() - t0 > 8000) {
        clearInterval(readyIv);
        console.log('VMP ready, mouseHandlers =', (window.__mouseHandlers || []).length);
        runHuman();
    }
}, 100);
async function runHuman() {
    try {
        console.log('listeners =', JSON.stringify((window.__listeners || []).map(x => x.type + '@' + x.target)));
        console.log('mouseHandlers =', JSON.stringify((window.__mouseHandlers || []).map(x => x.type)));
        const VW = 1536, VH = 755, MAX = 883;
        const BTN = { x: 1018, y: 246 }, SBX = VW - 6, PAGER = { x: 594, y: 555 };
        // 起点：查询按钮内随机一点
        let mx = Math.round(BTN.x + rnd(-45, 45)), my = Math.round(BTN.y + rnd(-12, 12));

        // ① 右移到滚动条附近（落点随机抖动）
        const sbEnd = { x: SBX + Math.round(rnd(-3, 3)), y: my + Math.round(rnd(-6, 6)) };
        await follow(route({ x: mx, y: my }, sbEnd, 4.5));

        // ② 沿滚动条下移到最底部附近（慢 + 同步滚动 0→MAX；落点随机 8~30px）
        const bottomEnd = { x: SBX + Math.round(rnd(-3, 3)), y: VH - Math.round(rnd(8, 30)) };
        await follow(route({ x: sbEnd.x, y: sbEnd.y }, bottomEnd, 3.2), { slow: true, scroll: [0, MAX] });

        // ③ 左下移动到分页按钮附近（随机一点，不是正中）
        const target = jit(PAGER, 8, 6);
        await follow(route({ x: bottomEnd.x, y: bottomEnd.y }, target, 4.5));

        // ④ 点击（按下时带小位移）
        fire("mousedown", target.x, target.y, 1); await sleep(35);
        fire("mousemove", target.x + 2, target.y + 1, 1); await sleep(35);
        fire("mouseup", target.x + 2, target.y + 1, 0);
        fire("click",   target.x + 2, target.y + 1, 0);
        console.log('轨迹/点击完成');

        await sleep(200);
        window.eval(`
          var xhr = new XMLHttpRequest();
          xhr.open('POST', ${JSON.stringify(InterfaceUrl)}, true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
          xhr.send(${JSON.stringify(BODY)});
        `);
        console.log('已触发 PageQuery');

        await sleep(700);
        var cookie =  jar.getCookieStringSync(InterfaceUrl);
        // ★ 不再取 [0]：页面可能先发别的 XHR，要按 OWNRL2Cu 找
        const cap = (window.__captured || []).find(c => c.url && c.url.includes('OWNRL2Cu='));
        if (!cap) console.log('未捕获到含 OWNRL2Cu 的请求, captured =', JSON.stringify(window.__captured));
        // console.log(cookie.split("; ")[4].split('=')[1])
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


