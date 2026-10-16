
const fs = require("fs");
const path = require('path');

Arg = JSON.parse(process.argv[2])

const sdenvpath = path.resolve(__dirname, '..','..','..',"..",'AiEeverseEnv','sdenv','index.js');
const sdenv = require(sdenvpath);


// ==================== 可配置项 ====================
const CONFIG = {
    InterfaceUrl: 'https://qikan.cqvip.com/Search/SearchList',
    locationhref: "https://qikan.cqvip.com/Qikan/Journal/JournalGuid?from=index",
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    platform: 'Win32',
    vendor: 'Google Inc.',
    silentConsole: true,
    logHandles: false,
    intercept: [],
    fakeFetchResponse: {body: '{}', status: 200, statusText: 'OK', contentType: 'application/json'},
};

// ==================== 创建 cookie 存储容器====================
const CookieJar =  sdenv.jsdom.CookieJar;
const jar = new CookieJar();
jar.setCookieSync(Arg['cookie1'], CONFIG.InterfaceUrl)  // 注意cookieStr是有 = 符号的
 // jar.getCookieStringSync(InterfaceUrl)  //  得到改 url 的 cookie

// ==================== 资源加载器（只保留一个 fetch）====================
vmp = fs.readFileSync(path.join(__dirname,'jsvmp.js'));
class LocalLoader extends sdenv.jsdom.ResourceLoader {
    fetch(url) {
        console.log("url是：",url)
        return Promise.resolve(vmp);
    }
}

// ==================== MessageChannel ====================
function installMessageChannel(window, sdenvIns) {
    const nativeTimeout = (sdenvIns.memory && sdenvIns.memory.setTimeout) || window.setTimeout;
    const PORT_TOKEN = Symbol('MessagePort');

    class MessagePort extends window.EventTarget {
        constructor(token) {
            if (token !== PORT_TOKEN) throw new TypeError('Illegal constructor');
            super();
            this._other = null; this._started = false; this._closed = false;
            this._queue = []; this._onmessage = null; this._onmessageerror = null;
        }
        get onmessage() { return this._onmessage; }
        set onmessage(fn) { this._onmessage = typeof fn === 'function' ? fn : null; this.start(); }
        get onmessageerror() { return this._onmessageerror; }
        set onmessageerror(fn) { this._onmessageerror = typeof fn === 'function' ? fn : null; }
        postMessage(message) {
            if (this._closed || !this._other || this._other._closed) return;
            this._other._enqueue(message);
        }
        _enqueue(message) {
            if (this._started) nativeTimeout(() => this._deliver(message), 0);
            else this._queue.push(message);
        }
        _deliver(message) {
            if (this._closed) return;
            const ev = new window.MessageEvent('message', { data: message, origin: '', lastEventId: '', source: null, ports: [] });
            if (this._onmessage) this._onmessage(ev);
            this.dispatchEvent(ev);
        }
        start() {
            if (this._started || this._closed) return;
            this._started = true;
            while (this._queue.length) this._deliver(this._queue.shift());
        }
        close() { this._closed = true; this._queue.length = 0; }
    }

    class MessageChannel {
        constructor() {
            const p1 = new MessagePort(PORT_TOKEN);
            const p2 = new MessagePort(PORT_TOKEN);
            p1._other = p2; p2._other = p1;
            Object.defineProperty(this, '_ports', { value: [p1, p2] });
        }
        get port1() { return this._ports[0]; }
        get port2() { return this._ports[1]; }
    }

    sdenvIns.tools.setFuncNative(MessageChannel, 'MessageChannel', 0);
    sdenvIns.tools.setFuncNative(MessagePort, 'MessagePort', 0);
    sdenvIns.tools.setObjName(MessageChannel.prototype, 'MessageChannel');
    sdenvIns.tools.setObjName(MessagePort.prototype, 'MessagePort');
    window.MessageChannel = MessageChannel;
    window.MessagePort = MessagePort;
}

// ==================== 隐藏属性（WeakMap + 原型访问器）====================
function makeHideProp() {
    const store = new WeakMap();
    const installed = new WeakMap();
    function ensure(obj, key) {
        const proto = Object.getPrototypeOf(obj);
        if (!proto || proto === Object.prototype) {
            if (!Object.getOwnPropertyDescriptor(obj, key)) {
                let v;
                Object.defineProperty(obj, key, {
                    configurable: true, enumerable: false,
                    get() { return v; }, set(x) { v = x; },
                });
            }
            return;
        }
        let set = installed.get(proto); if (!set) { set = new Set(); installed.set(proto, set); }
        if (set.has(key)) return;
        set.add(key);
        Object.defineProperty(proto, key, {
            configurable: true, enumerable: false,
            get() { const m = store.get(this); return m ? m.get(key) : undefined; },
            set(v) { let m = store.get(this); if (!m) { m = new Map(); store.set(this, m); } m.set(key, v); },
        });
    }
    return {
        setHideProp(obj, key, val) {
            let m = store.get(obj); if (!m) { m = new Map(); store.set(obj, m); }
            m.set(key, val); ensure(obj, key); return obj;
        },
        getHideProp(obj, key) { const m = store.get(obj); return m ? m.get(key) : undefined; },
    };
}

// ==================== 检测补丁（8 项，内联）====================
function installSdenvPatches(window, sdenvIns, opts = {}) {
    const fixes = new Set(opts.fixes || ['stack', 'alert', 'proto', 'location', 'hideset', 'lockproto', 'plugins', 'documentall']);
    const tools = sdenvIns.tools;

    if (fixes.has('stack')) {
        try {
            window.Error.prepareStackTrace = function prepareStackTrace() { return 'Error\n    at <anonymous>:1:1'; };
            tools.setFuncNative(window.Error.prepareStackTrace, 'prepareStackTrace', 2);
        } catch (e) {}
    }
    if (fixes.has('alert')) {
        try {
            window.alert = function alert() {};
            tools.setFuncNative(window.alert, 'alert', 0);
            window.alert.prototype = undefined;
        } catch (e) {}
    }
    if (fixes.has('proto')) {
        ['fetch', 'addEventListener', 'removeEventListener', 'dispatchEvent', 'atob', 'btoa'].forEach((name) => {
            try { const fn = window[name]; if (typeof fn === 'function') fn.prototype = undefined; } catch (e) {}
        });
    }
    if (fixes.has('location')) {
        try {
            let href = window.location.href;
            Object.defineProperty(window.location, 'href', {
                configurable: true, enumerable: true,
                get() { return href; }, set(v) { href = String(v); },
            });
        } catch (e) {}
    }
    if (fixes.has('hideset')) {
        const HIDDEN = new Set([
            '_sdGlobalObject', '_globalProxy', '_proxyWindowEventsToWindow', '_initGlobalEvents',
            '_getEventHandlerTarget', '_getEventHandlerFor', '_setEventHandlerFor', '_globalEventChanged',
            '_registeredHandlers', '_eventHandlers', '_resourceLoader', '_document', '_origin',
            '_sessionHistory', '_virtualConsole', '_runScripts', '_top', '_parent', '_frameElement',
            '_length', '_currentEvent', '_pretendToBeVisual', '_storageQuota', '_commonForOrigin',
            '_currentOriginData', '_localStorage', '_sessionStorage', '_selection', '_customElementRegistry',
            'loadTextSync',
        ]);
        const origGOPN = window.Object.getOwnPropertyNames;
        const origROK = window.Reflect.ownKeys;
        const origGOPD = window.Object.getOwnPropertyDescriptor;
        const isHidden = (obj, k) => obj === window && typeof k === 'string' && HIDDEN.has(k);
        window.Object.getOwnPropertyNames = function getOwnPropertyNames(obj) {
            const arr = origGOPN.call(this, obj);
            return obj === window ? arr.filter((k) => !HIDDEN.has(k)) : arr;
        };
        window.Reflect.ownKeys = function ownKeys(obj) {
            const arr = origROK.call(this, obj);
            return obj === window ? arr.filter((k) => !isHidden(obj, k)) : arr;
        };
        window.Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(obj, k) {
            if (isHidden(obj, k)) return undefined;
            return origGOPD.call(this, obj, k);
        };
        tools.setFuncNative(window.Object.getOwnPropertyNames, 'getOwnPropertyNames', 1);
        tools.setFuncNative(window.Reflect.ownKeys, 'ownKeys', 1);
        tools.setFuncNative(window.Object.getOwnPropertyDescriptor, 'getOwnPropertyDescriptor', 2);
    }
    if (fixes.has('lockproto')) {
        const origSPO = window.Object.setPrototypeOf;
        const origRSPO = window.Reflect.setPrototypeOf;
        const lock = (orig) => function setPrototypeOf(obj, proto) {
            if (obj === window) throw new TypeError('Cannot set prototype of window');
            return orig.call(this, obj, proto);
        };
        window.Object.setPrototypeOf = lock(origSPO);
        window.Reflect.setPrototypeOf = lock(origRSPO);
        tools.setFuncNative(window.Object.setPrototypeOf, 'setPrototypeOf', 2);
        tools.setFuncNative(window.Reflect.setPrototypeOf, 'setPrototypeOf', 2);
    }
    if (fixes.has('plugins')) {
        try {
            const nav = window.navigator;
            const PluginProto = window.Plugin && window.Plugin.prototype;
            const MimeTypeProto = window.MimeType && window.MimeType.prototype;
            const pluginArrayProto = Object.getPrototypeOf(nav.plugins);
            const mimeTypeArrayProto = Object.getPrototypeOf(nav.mimeTypes);
            const def = (o, k, v, enumerable) => Object.defineProperty(o, k, { value: v, configurable: true, enumerable: !!enumerable, writable: true });
            const mkMime = (type, suffixes, description) => {
                const m = MimeTypeProto ? Object.create(MimeTypeProto) : {};
                def(m, 'type', type, true); def(m, 'suffixes', suffixes, true);
                def(m, 'description', description, true); def(m, 'enabledPlugin', null, true);
                return m;
            };
            const mkPlugin = (name, filename, description, mimes) => {
                const p = PluginProto ? Object.create(PluginProto) : {};
                def(p, 'name', name, true); def(p, 'filename', filename, true); def(p, 'description', description, true);
                def(p, 'length', mimes.length, false);
                mimes.forEach((m, i) => def(p, i, m, true));
                mimes.forEach((m) => def(m, 'enabledPlugin', p, true));
                def(p, 'item', (i) => p[i] || null, false);
                def(p, 'namedItem', (n) => (p[n] !== undefined ? p[n] : null), false);
                return p;
            };
            const mkArray = (proto, items, tagName) => {
                const a = Object.create(proto);
                items.forEach((it, i) => def(a, i, it, true));
                items.forEach((it) => { const n = it.type || it.name; if (n) def(a, n, it, false); });
                def(a, 'length', items.length, false);
                def(a, 'item', (i) => a[i] || null, false);
                def(a, 'namedItem', (n) => (a[n] !== undefined ? a[n] : null), false);
                if (tagName) { try { def(a, Symbol.toStringTag, tagName, false); } catch (e) {} }
                return a;
            };
            const pdfMime = mkMime('application/pdf', 'pdf', 'Portable Document Format');
            const pdfMime2 = mkMime('text/pdf', 'pdf', 'Portable Document Format');
            const names = ['PDF Viewer', 'Chrome PDF Viewer', 'Chromium PDF Viewer', 'Microsoft Edge PDF Viewer', 'WebKit built-in PDF'];
            const mkPdf = (name, mimes) => mkPlugin(name, 'internal-pdf-viewer', 'Portable Document Format', mimes);
            const plugins = mkArray(pluginArrayProto, [mkPdf(names[0], [pdfMime, pdfMime2]), mkPdf(names[1], []), mkPdf(names[2], []), mkPdf(names[3], []), mkPdf(names[4], [])], 'PluginArray');
            const mimeTypes = mkArray(mimeTypeArrayProto, [pdfMime, pdfMime2], 'MimeTypeArray');
            Object.defineProperty(nav, 'plugins', { configurable: true, enumerable: true, get: () => plugins });
            Object.defineProperty(nav, 'mimeTypes', { configurable: true, enumerable: true, get: () => mimeTypes });
        } catch (e) {}
    }
    if (fixes.has('documentall')) {
        try {
            const doc = window.document;
            const all = doc.all;
            if (all !== undefined) {                 // undetectable 对象 ToBoolean=false，必须 !== undefined
                Object.defineProperty(all, '0', { configurable: true, enumerable: true, get: () => doc.body || doc.documentElement });
                Object.defineProperty(all, '1', { configurable: true, enumerable: true, get: () => doc.documentElement });
                Object.defineProperty(all, 'length', { value: 2, configurable: true, writable: true, enumerable: false });
                Object.defineProperty(all, Symbol.toStringTag, { value: 'HTMLAllCollection', configurable: true });
                if (typeof all.item !== 'function') Object.defineProperty(all, 'item', { value: (i) => (all[i] === undefined ? null : all[i]), configurable: true });
                if (typeof all.namedItem !== 'function') Object.defineProperty(all, 'namedItem', { value: (n) => (all[n] === undefined ? null : all[n]), configurable: true });
            }
        } catch (e) {}
    }
}

// ==================== 主流程 ====================
const html = fs.readFileSync(path.join(__dirname,'..','html','jsbyte.html'),"utf-8");
const consoleConfig = CONFIG.silentConsole ? {
    log() {
    }, info() {
    }, warn() {
    }, error() {
    }, table() {
    }, jsdomError() {
    }
} : {};
const dom = sdenv.jsdomFromText(html, {
    url: CONFIG.locationhref,
    runScripts: 'dangerously',
    resources: new LocalLoader(),
    cookieJar: jar,
    consoleConfig,
    beforeParse(window, s) {
        // 1) handle（全部在 beforeParse 内、页面脚本之前）
        s.getHandle('func')({log: false});
        s.getHandle('eval')({log: false});
        s.getHandle('timeout')({log: false});
        s.getHandle('interval')({log: false});
        s.getHandle('cookie')({log: CONFIG.logHandles});
        s.getHandle('event')({log: CONFIG.logHandles, runLog: false});

        // 2) navigator（从 CONFIG 取）
        const defineNav = (key, val) => Object.defineProperty(window.navigator, key, {
            get: () => val,
            configurable: true
        });
        defineNav('userAgent', CONFIG.ua);
        defineNav('appVersion', CONFIG.ua.replace(/^Mozilla\//, ''));
        defineNav('platform', CONFIG.platform);
        defineNav('vendor', CONFIG.vendor);

        // 3) 删除非跨源隔离环境不该有的 V8 全局
        try {
            delete window.SharedArrayBuffer;
        } catch (e) {
        }
        try {
            delete window.Atomics;
        } catch (e) {
        }

        // 4) window 代理配置（对 vm.runInContext 路径有效）
        s.getConfig('window')({
            windowGetterErrorKeys: ['process'],
            windowGetterUndefinedKeys: ['_runScripts', '_length'],
            windowGetterWinKeys: ['window', 'top', 'self', 'frames', 'globalThis'],
        });

        // 5) MessageChannel
        installMessageChannel(window, s);

        // 6) 检测补丁
        installSdenvPatches(window, s);

        // 7) hideProp
        const hp = makeHideProp();
        window.setHideProp = hp.setHideProp;
        window.getHideProp = hp.getHideProp;

        // 8) 请求捕获（保留真实调用，只记录）
        window.__captured = [];
        const XHR = window.XMLHttpRequest;
        const realOpen = XHR.prototype.open;
        const realSetHeader = XHR.prototype.setRequestHeader;
        const realSend = XHR.prototype.send;
        XHR.prototype.open = function (method, url) {
            this.__method = method;
            this.__url = url;
            return realOpen.apply(this, arguments);
        };
        XHR.prototype.setRequestHeader = function (k, v) {
            (this.__headers = this.__headers || {})[k] = v;
            return realSetHeader.apply(this, arguments);
        };
        XHR.prototype.send = function (body) {
            window.__captured.push({
                type: 'xhr',
                method: this.__method,
                url: this.__url,
                headers: this.__headers || {},
                body: body === undefined ? null : body
            });
            return realSend.apply(this, arguments);
        };
        window.fetch = function fetch(input, init) {
            init = init || {};
            const url = typeof input === 'string' ? input : (input && input.url);
            window.__captured.push({
                type: 'fetch',
                method: init.method || (input && input.method) || 'GET',
                url,
                headers: init.headers || (input && input.headers) || {},
                body: init.body != null ? init.body : null
            });
            const r = CONFIG.fakeFetchResponse;
            return Promise.resolve({
                ok: r.status >= 200 && r.status < 300, status: r.status, statusText: r.statusText,
                headers: {get: (k) => (String(k).toLowerCase() === 'content-type' ? r.contentType : null)},
                text: () => Promise.resolve(r.body),
                json: () => Promise.resolve(JSON.parse(r.body)),
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            });
        };
        s.tools.setFuncNative(window.fetch, 'fetch', 2);
        window.fetch.prototype = undefined;

    },
});
const { window } = dom;


//  ==================   把被锁成只读的 Function.prototype.toString 重新改成可写  ===============
/*
window.eval(`
  Object.defineProperty(Function.prototype, 'toString', {
    writable: true, configurable: true, enumerable: false,
    value: Function.prototype.toString
  });
`);
 */


/* ============= 轮询 异步加密参数 ( cookie )是否生成 (可选) ================= */
const hasNewCookie = function (cookie) {
    const m = cookie.match(/6HZbKHDjIEcgT=([^;\s]+)/);
    if (m && m[1].length > 50) {        // 最终值是长串；中间态是 01
        return true;                     // 触发 clearInterval + process.exit(0)
    }
    return false;
};
const timestamp = Date.now();
const polling = setInterval(() => {
    // 提取加密参数或者cookie 等加密参数
    const cookie = jar.getCookieStringSync(CONFIG.InterfaceUrl);
    if (hasNewCookie(cookie)) {          // 有任何变化（新 cookie / 值变了）
        clearInterval(polling);
        console.log(JSON.stringify(cookie.split('6HZbKHDjIEcgT=')[1]))
        process.exit(0);
    }
    if (Date.now() - timestamp > 15000) {      // 加超时，别死等
        clearInterval(polling);
        console.error('超时，未产出 cookie');
        process.exit(1);
    }
}, 300);


/* ============= 手动启动 vmp (手动)  ================= */
(function () {
    const vmpStart = setInterval(() => {
        if (typeof window[Arg['vmpStart']] === 'function') {
            clearInterval(vmpStart);
            console.log("启动 vmp ")
            try {
                window.eval(Arg['vmpStart'] + "()");
            } catch (e) {
                console.error(e);
            }
        }
    }, 50);
}())

