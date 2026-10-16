const fs = require("fs");
const path = require('path');

const sdenv = require(path.resolve(__dirname, '..', '..', '..' ,'..','AiEeverseEnv', 'sdenv', 'index.js'));

const jscode = fs.readFileSync(path.join(__dirname,'jscode.js'),"utf-8");
const html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>';
const loadMin = fs.readFileSync(path.join(__dirname, 'load.min.js'), 'utf-8');

// ==================== 可配置项 ====================
const CONFIG = {
    InterfaceUrl: 'https://c.dun.163.com/api/v3/get',
    locationhref:'https://dun.163.com/trial/jigsaw' ,
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
//  jar.setCookieSync(cookieStr, InterfaceUrl)  // 注意cookieStr是有 = 符号的
//  jar.getCookieStringSync(InterfaceUrl)  //  得到改 url 的 cookie

// ==================== 资源加载器（只保留一个 fetch）====================
const ALLOW_HOSTS = [
    'cstaticdun.126.net',
    'cstaticdun1.126.net',
    'c.dun.163.com',
    'c.dun.163yun.com',
    'c-v6.dun.163.com',
    'ir-sdk.dun.163.com',
    'ir-sdk.dun.163yun.com',
    'dun.163.com',
    'dun.163yun.com',
    'necaptcha.nosdn.127.net',
    'necaptcha-nosdn.126.net',
];
function hostAllowed(urlString) {
    let host = '';
    try {
        // 相对路径用页面地址补全后再取 host
        host = new URL(urlString, CONFIG.locationhref).hostname.toLowerCase();
    } catch (e) {
        return false;
    }
    return ALLOW_HOSTS.some((d) => host === d || host.endsWith('.' + d));
}
class LocalLoader extends sdenv.jsdom.ResourceLoader {
    fetch(url, options) {
        const urlString = typeof url === 'string' ? url : (url && url.href) || String(url);

        // data: / blob: 等内联资源直接交给父类
        if (/^(data|blob):/i.test(urlString)) {
            return super.fetch(urlString, options);
        }

        // 白名单内 -> 真实网络加载（保留你原来的 super.fetch）
        if (hostAllowed(urlString)) {
            return super.fetch(urlString, options);
        }

        // 白名单外 -> 返回空内容：脚本为空不执行、图片为空，但 onload 会正常触发
        if (CONFIG.logBlocked) console.log('[LocalLoader] blocked:', urlString);
        return Promise.resolve(Buffer.alloc(0));
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
    cookieJar: new sdenv.jsdom.CookieJar(),
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

        // ==================== 捕获 webpack require（锚点无关，不改源码）====================
        // webpack 的每个模块都是 modules[id].call(exports, module, exports, require) 执行的，
        // 第 4 个实参就是 require，它身上带 .m(模块表) / .c(缓存)。
        // 所以只 hook Function.prototype.call 就能拿到它 —— 不依赖任何源码文本，换版本也不会失效。
        const _fnCall = window.Function.prototype.call;
        window.Function.prototype.call = function () {
            if (!window.__req) {
                const maybeReq = arguments[3];
                if (typeof maybeReq === 'function' && maybeReq.m && maybeReq.c) window.__req = maybeReq;
            }
            return _fnCall.apply(this, arguments);
        };
        s.tools.setFuncNative(window.Function.prototype.call, 'call', 1);

        // ==================== JSONP / <script> 边界抓取 ====================
        window.__scriptUrls = [];   // 所有动态插入的 <script src>
        window.__jsonp = [];        // 所有 JSONP 回调收到的数据

        function onScriptInserted(node) {
            try {
                if (!node || String(node.tagName).toUpperCase() !== 'SCRIPT') return;
                const url = node.src || node.getAttribute('src');
                if (!url) return;
                const u = String(url);
                window.__scriptUrls.push(u);
                // 把 URL 里 callback=名字 对应的全局回调包一层，连响应一起抓。
                // 用访问器拦截：即使 loader 之后把它重写成 noop（超时清理），仍能抓到响应。
                const m = /[?&]callback=([^&]+)/.exec(u);
                if (m && !window.__jsonpNames) window.__jsonpNames = {};
                if (m) {
                    const name = decodeURIComponent(m[1]);
                    if (!window.__jsonpNames[name]) {
                        window.__jsonpNames[name] = true;
                        //  JSONP 的约定：SDK 在插 <script> 之前，必须先把回调注册成全局函数，服务端才能调用它
                        let cur = window[name];
                        //  rec 是服务端脚本执行 window[name](payload) 时被调用的 , arguments 就是 [payload]
                        const rec = function (payload) {
                            try { window.__jsonp.push({ url: u, payload: payload }); } catch (e) {}
                            return typeof cur === 'function' ? cur.apply(this, arguments) : undefined;
                        };
                        try {
                            //  这是把 window[name] 从一个普通属性（数据属性）改造成访问器属性
                            /* 服务端脚本读 window[name]	get()	返回 rec
                             谁写 window[name] = fn（如 loader 清理成 noop）	set(v)	cur = v  */
                            Object.defineProperty(window, name, {
                                configurable: true,
                                get() { return rec; },
                                set(v) { cur = v; },
                            });
                        } catch (e) {}
                    }
                }
            } catch (e) {}
        }

        /* const s = document.createElement('script');
           s.src = 'https://c.dun.163.com/api/v2/getconf?...&callback=__JSONP_x_0';  // 只是设属性，还没请求
           document.head.appendChild(s);   // ← 这一刻浏览器才去加载，执行回来的 __JSONP_x_0({...}) */

        const _appendChild = window.Node.prototype.appendChild;
        window.Node.prototype.appendChild = function (n) {
            const r = _appendChild.apply(this, arguments);
            onScriptInserted(n);
            return r;
        };
        const _insertBefore = window.Node.prototype.insertBefore;
        window.Node.prototype.insertBefore = function (n) {
            const r = _insertBefore.apply(this, arguments);
            onScriptInserted(n);
            return r;
        };
        /*  sdenv 提供的"把函数伪装成原生函数"的工具 : 第三参数 1 / 2 就是函数原生的 length（形参个数） */
        s.tools.setFuncNative(window.Node.prototype.appendChild, 'appendChild', 1);
        s.tools.setFuncNative(window.Node.prototype.insertBefore, 'insertBefore', 2);

        // ==================== 参数对象边界抓取 ====================
        // core 发请求前用 Object.assign 拼参数对象（get/refresh/check 都在里面，
        // cb 就是那一刻生成的）。hook 它，不用改 core 任何代码就能拿到 cb。
        window.__reqParams = [];
        const _assign = window.Object.assign;
        window.Object.assign = function () {
            const r = _assign.apply(this, arguments);
            try {
                if (r && typeof r === 'object' && r.cb && (r.fp !== undefined || r.data !== undefined || r.token !== undefined)) {
                    window.__reqParams.push(r);
                }
            } catch (e) {}
            return r;
        };
        s.tools.setFuncNative(window.Object.assign, 'assign', 2);

        // FP 是 SDK 自己写进 cookie 的，名字在 core 里是常量 'gdxidpyhxdE'
        window.__readFpCookie = function () {
            const m = /(?:^|;\s*)gdxidpyhxdE=([^;]*)/.exec(window.document.cookie || '');
            return m ? decodeURIComponent(m[1]) : null;
        };

    },
});
const { window } = dom;

// ==================== js注入 ====================
// jscode.js 原文照跑（不做任何字符串替换）。
// webpack 的 require 已在 beforeParse 里通过 hook Function.prototype.call 捕获到 window.__req，
// 所以可以像调用内部模块一样用：0xa = aes, 0x3 = util。
window.eval(jscode);
window.eval(loadMin);

// cb = AES( uuid32 在 [1,10,12,13,26,31] 位置写入 'vfnv46' )
// 常量来自 core 的 _0x62692：suffix/code/pos（a0_0x1e60(0x56b/0x56c/0x56d)）
function cbFromSdk() {
    try {
        const aes = window.__req(0xa)['aes'];
        const util = window.__req(0x3);
        const arr = util['uuid'](0x20).split('');
        const code = 'vfnv46';
        const pos = [1, 10, 12, 13, 26, 31];
        for (let i = 0; i < pos.length; i++) arr[pos[i]] = code.charAt(i);
        return aes(arr.join(''));
    } catch (e) {
        return null;
    }
}

// callback 名是我们自己构造请求时随便定的（格式跟 SDK 一致即可）
let __cbSeq = process.argv[2]
function makeCallback() {
    return '__JSONP_' + Math.random().toString(36).slice(2, 9) + '_' + (__cbSeq++);
}

// 给验证码一个容器（sdenv 里 document.body 可能是 null，兜底用 documentElement）
const holder = window.document.createElement('div');
holder.id = 'cap';
(window.document.body || window.document.documentElement).appendChild(holder);

/* 启动流程： JSONP 请求   (易盾独有)
参数1 : 配置对象；内部会先和默认值 {protocol, timeout:6000, runEnv:10} 合并，captchaId 必填
参数2 : 成功回调，收到核心实例（facade：popUp/verify/refresh/close/destroy）
参数3 : 失败回调，收到 Error

① window.initNECaptcha(cfg, onload, onerror)
     └─ loader 决定去发 getconf

② loader 按 JSONP 契约「先注册回调」
     window['__JSONP_x_0'] = function (data) { ...继续流程... }

③ loader 创建节点（我们没 hook）
     const s = document.createElement('script')
     s.src = 'https://c.dun.163.com/api/v2/getconf?...&callback=__JSONP_x_0'

④ loader 把节点插入 DOM  ← ★ 撞上我们的 hook
     document.head.appendChild(s)      // 或 parent.insertBefore(s, ref)
        ↓ 我们的包装函数先调用原方法（真的把 s 插进去）
        ↓ 然后 onScriptInserted(s)

⑤ onScriptInserted(s) —— 全是「请求侧」的准备，没有任何响应数据
     · 读 s.src → 记进 window.__scriptUrls             （拿到请求参数）
     · 正则 /[?&]callback=([^&]+)/ 从 URL 里抠出 name   ← 名字来自「请求 URL」
     · 把 window['__JSONP_x_0'] 换成访问器：
           get() → rec      （以后读到的永远是我们的函数）
           set(v) → cur=v   （以后被改写也覆盖不掉）
       rec：先 push 到 __jsonp，再转发给 SDK 原回调

⑥ 浏览器（jsdom）去下载这段 script → 服务端返回文本：
       __JSONP_x_0({"data":{"dt":"...","zoneId":"CN31",...},"error":0,"msg":"ok"});
     浏览器执行它 → 调用 window['__JSONP_x_0'](payload)
        ↓ 命中我们访问器的 get → 拿到 rec
        ↓ rec 把 payload 存进 window.__jsonp      ← ★ 响应在这一刻才被"抓"
        ↓ 再 cur.apply(...) 转发给 loader 的原回调（SDK 流程继续）

 */
window.initNECaptcha({
    element: '#cap',
    captchaId: '07e2387ab53a4d6f930b8d9a9be71bdf',
    width: '320px',
    mode: 'popup',
    timeout: 30000,
}, function onload(instance) {
    console.log('initNECaptcha onload')
    try { instance.popUp() } catch (e) { console.log('popUp threw:', e && e.message) }
}, function onerror(err) {
    console.log('initNECaptcha onerror:', err && (err.message || err))
})

// 等请求发出后再取值，不要立刻 exit
setTimeout(function () {
    const urls = window.__scriptUrls || []
    const sdkGetUrl = urls.filter((u) => u.indexOf('/api/v3/get') !== -1)[0] || null

    // getconf 的 JSONP 响应里什么都有：dt / zoneId / 资源版本 / ac ...
    const gc = (window.__jsonp || []).map((x) => x.payload).filter((p) => p && p.data && p.data.dt)[0]
    const data = gc ? gc.data : {}
    const m = /^\/(\d+(?:\.\d+)+)\//.exec((data.resources || [])[0] || '')
    const ver = m ? m[1] : '2.28.5'

    // ==================== 整段 params ====================
    // 三个动态项都不依赖"往 core 里插桩"：
    //   fp       <- SDK 自己写的 cookie
    //   cb       <- cbFromSdk()（用 SDK 内部 AES 模块算，加载时捕获的 require）
    //   callback <- 自己生成（请求由我们构造）
    const fpFromCookie = typeof window.__readFpCookie === 'function' ? window.__readFpCookie() : null
    const reqs = window.__reqParams || []
    const lastReq = reqs[reqs.length - 1] || null          // 若 core 跑起来了，这里就是完整参数对象
    const cbBoundary = lastReq ? lastReq.cb : null
    const cbSdk = cbFromSdk()
    const cbPatched = window.cb ? window.cb() : null
    const cb = cbSdk || cbBoundary || cbPatched
    const callback = makeCallback()

    const params = {
        referer: 'https://dun.163.com/trial/jigsaw',
        zoneId: data.zoneId || 'CN31',
        dt: data.dt,
        irToken: '',                       // 风控 token（由 IR SDK 产生，按需填）
        id: (data.ac && data.ac.bid) || '07e2387ab53a4d6f930b8d9a9be71bdf',
        fp: fpFromCookie || window.fp,
        https: 'true',
        type: '2',
        version: ver,
        dpr: String(window.devicePixelRatio || 1),
        dev: '1',
        cb: cb,
        ipv6: 'false',
        runEnv: '10',
        group: '',
        scene: '',
        lang: 'zh-CN',
        sdkVersion: '',
        loadVersion: (window.initNECaptcha && window.initNECaptcha.VERSION) || '2.5.4',
        iv: '4',
        user: '',
        width: '320',
        audio: 'false',
        sizeType: '10',
        smsVersion: 'v3',
        callback: callback,
    }
    const qs = Object.keys(params)
        .map((k) => k + '=' + encodeURIComponent(params[k] == null ? '' : params[k]))
        .join('&')
    const getUrl = 'https://c.dun.163.com/api/v3/get?' + qs
    console.log(JSON.stringify(params))
    process.exit(0)
}, 1000)

