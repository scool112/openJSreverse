/*
这些修改值
var _locationHref = 'https://example.com/';
var _locationProtocol = 'https:';
var _locationHost = 'example.com';
var _locationPath = '/';
var _locationSearch = '';
var _locationHash = '';
 */

function EventTarget() {}
Object.defineProperty(EventTarget, 'name', { value: 'EventTarget', configurable: true });

function Window() {}
Object.defineProperty(Window, 'name', { value: 'Window', configurable: true });
Object.setPrototypeOf(Window.prototype, EventTarget.prototype);

function Node() {}
Object.defineProperty(Node, 'name', { value: 'Node', configurable: true });
Object.setPrototypeOf(Node.prototype, EventTarget.prototype);
Object.defineProperty(Node.prototype, "appendChild", { value: function(s){
    console.log("document.appendChild : ",s)
    }, writable: true, enumerable: true, configurable: true });

function Document() {}
Object.defineProperty(Document, 'name', { value: 'Document', configurable: true });
Object.setPrototypeOf(Document.prototype, Node.prototype);

function HTMLDocument() {}
Object.defineProperty(HTMLDocument, 'name', { value: 'HTMLDocument', configurable: true });
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype);

function Location() {}
Object.defineProperty(Location, 'name', { value: 'Location', configurable: true });

function History() {}
Object.defineProperty(History, 'name', { value: 'History', configurable: true });

function Storage() {}
Object.defineProperty(Storage, 'name', { value: 'Storage', configurable: true });

function Navigator() {}
Object.defineProperty(Navigator, 'name', { value: 'Navigator', configurable: true });

function Performance() {}
Object.defineProperty(Performance, 'name', { value: 'Performance', configurable: true });

function Screen() {}
Object.defineProperty(Screen, 'name', { value: 'Screen', configurable: true });
Object.setPrototypeOf(Screen.prototype, EventTarget.prototype);

function CacheStorage() {}
Object.defineProperty(CacheStorage, 'name', { value: 'CacheStorage', configurable: true });

function Crypto() {}
Object.defineProperty(Crypto, 'name', { value: 'Crypto', configurable: true });

function IDBFactory() {}
Object.defineProperty(IDBFactory, 'name', { value: 'IDBFactory', configurable: true });

function Element() {}
Object.defineProperty(Element, 'name', { value: 'Element', configurable: true });
Object.setPrototypeOf(Element.prototype, Node.prototype);
Object.defineProperty(Element.prototype, "getElementsByTagName", { value: function(s){
    console.log("document.createElement('div').getElementsByTagName : ",s)
        if (s === "i"){
            return _i
        }
    }, writable: true, enumerable: true, configurable: true });

function HTMLElement() {}
Object.defineProperty(HTMLElement, 'name', { value: 'HTMLElement', configurable: true });
Object.setPrototypeOf(HTMLElement.prototype, Element.prototype);

function HTMLDivElement() {}
Object.defineProperty(HTMLDivElement, 'name', { value: 'HTMLDivElement', configurable: true });
Object.setPrototypeOf(HTMLDivElement.prototype, HTMLElement.prototype);

function HTMLHeadElement() {}
Object.defineProperty(HTMLHeadElement, 'name', { value: 'HTMLHeadElement', configurable: true });
Object.setPrototypeOf(HTMLHeadElement.prototype, HTMLElement.prototype);

function HTMLHtmlElement() {}
Object.defineProperty(HTMLHtmlElement, 'name', { value: 'HTMLHtmlElement', configurable: true });
Object.setPrototypeOf(HTMLHtmlElement.prototype, HTMLElement.prototype);

function HTMLMetaElement() {}
Object.defineProperty(HTMLMetaElement, 'name', { value: 'HTMLMetaElement', configurable: true });
Object.setPrototypeOf(HTMLMetaElement.prototype, HTMLElement.prototype);

function HTMLScriptElement() {}
Object.defineProperty(HTMLScriptElement, 'name', { value: 'HTMLScriptElement', configurable: true });
Object.setPrototypeOf(HTMLScriptElement.prototype, HTMLElement.prototype);

function HTMLStyleElement() {}
Object.defineProperty(HTMLStyleElement, 'name', { value: 'HTMLStyleElement', configurable: true });
Object.setPrototypeOf(HTMLStyleElement.prototype, HTMLElement.prototype);

function HTMLCanvasElement() {}
Object.defineProperty(HTMLCanvasElement, 'name', { value: 'HTMLCanvasElement', configurable: true });
Object.setPrototypeOf(HTMLCanvasElement.prototype, HTMLElement.prototype);

function HTMLBodyElement() {}
Object.defineProperty(HTMLBodyElement, 'name', { value: 'HTMLBodyElement', configurable: true });
Object.setPrototypeOf(HTMLBodyElement.prototype, HTMLElement.prototype);

function HTMLLinkElement() {}
Object.defineProperty(HTMLLinkElement, 'name', { value: 'HTMLLinkElement', configurable: true });
Object.setPrototypeOf(HTMLLinkElement.prototype, HTMLElement.prototype);

function HTMLTitleElement() {}
Object.defineProperty(HTMLTitleElement, 'name', { value: 'HTMLTitleElement', configurable: true });
Object.setPrototypeOf(HTMLTitleElement.prototype, HTMLElement.prototype);

function CanvasRenderingContext2D() {}
Object.defineProperty(CanvasRenderingContext2D, 'name', { value: 'CanvasRenderingContext2D', configurable: true });

function WebGLRenderingContext() {}
Object.defineProperty(WebGLRenderingContext, 'name', { value: 'WebGLRenderingContext', configurable: true });

function WebGL2RenderingContext() {}
Object.defineProperty(WebGL2RenderingContext, 'name', { value: 'WebGL2RenderingContext', configurable: true });

function GPUCanvasContext() {}
Object.defineProperty(GPUCanvasContext, 'name', { value: 'GPUCanvasContext', configurable: true });

function XMLHttpRequestEventTarget() {}
Object.defineProperty(XMLHttpRequestEventTarget, 'name', { value: 'XMLHttpRequestEventTarget', configurable: true });
Object.setPrototypeOf(XMLHttpRequestEventTarget.prototype, EventTarget.prototype);

XMLHttpRequest = function XMLHttpRequest() {};
Object.defineProperty(XMLHttpRequest, 'name', { value: 'XMLHttpRequest', configurable: true });
Object.setPrototypeOf(XMLHttpRequest.prototype, XMLHttpRequestEventTarget.prototype);

function HTMLCollection() {}

////////////////////
function HTMLBaseElement() {}
Object.defineProperty(HTMLBaseElement, 'name', { value: 'HTMLBaseElement', configurable: true });
Object.setPrototypeOf(HTMLBaseElement.prototype, HTMLElement.prototype);

function HTMLFormElement() {}
Object.defineProperty(HTMLFormElement, 'name', { value: 'HTMLFormElement', configurable: true });
Object.setPrototypeOf(HTMLFormElement.prototype, HTMLElement.prototype);

function HTMLInputElement() {}
Object.defineProperty(HTMLInputElement, 'name', { value: 'HTMLInputElement', configurable: true });
Object.setPrototypeOf(HTMLInputElement.prototype, HTMLElement.prototype);

////////////////////

/* ============================================================
 * 2. 原型层属性
 * ============================================================ */

/* ---- EventTarget.prototype ---- */
Object.defineProperty(EventTarget.prototype, "addEventListener", { value: function(s){ console.log("window.addEventListener : ", s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(EventTarget.prototype, "dispatchEvent", { value: function(s){ console.log("window.dispatchEvent : ", s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(EventTarget.prototype, "removeEventListener", { value: function(s){ console.log("window.removeEventListener : ", s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(EventTarget.prototype, "when", { value: function(s){ console.log("window.when : ", s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(EventTarget.prototype, Symbol.toStringTag, { value: "EventTarget", writable: false, enumerable: false, configurable: true });

/* ---- Window.prototype ---- */
Object.defineProperty(Window.prototype, "TEMPORARY", { value: 0, writable: false, enumerable: true, configurable: false });
Object.defineProperty(Window.prototype, "PERSISTENT", { value: 1, writable: false, enumerable: true, configurable: false });
Object.defineProperty(Window.prototype, Symbol.toStringTag, { value: "Window", writable: false, enumerable: false, configurable: true });
/* 高频方法（真实浏览器核对） */
/* ===== atob/btoa：真实边界行为（非法字符抛 InvalidCharacterError、无填充自动补 =、>0xFF 抛错） ===== */
function _domError(name, message) {
    var e = new Error(message);
    e.name = name;
    return e;
}
Object.defineProperty(Window.prototype, "atob", { value: function (s) {
        s = String(s).replace(/[\t\n\f\r ]/g, '');           /* 真实 atob 忽略 ASCII 空白 */
        if (!s) return '';
        s = s.replace(/=+$/, '');                             /* 去尾部填充 */
        if (s.length % 4 === 1 || /[^A-Za-z0-9+/]/.test(s)) {
            throw _domError('InvalidCharacterError', "The string to be decoded is not correctly encoded.");
        }
        while (s.length % 4 !== 0) s += '=';                  /* 无填充自动补 = */
        var map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var out = '', i, b1,b2,b3, e1,e2,e3,e4;
        for (i = 0; i < s.length; i += 4) {
            e1 = map.indexOf(s.charAt(i)); e2 = map.indexOf(s.charAt(i+1));
            e3 = s.charAt(i+2) === '=' ? 0 : map.indexOf(s.charAt(i+2));
            e4 = s.charAt(i+3) === '=' ? 0 : map.indexOf(s.charAt(i+3));
            b1 = (e1 << 2) | (e2 >> 4); b2 = ((e2 & 15) << 4) | (e3 >> 2); b3 = ((e3 & 3) << 6) | e4;
            out += String.fromCharCode(b1);
            if (s.charAt(i+2) !== '=') out += String.fromCharCode(b2);
            if (s.charAt(i+3) !== '=') out += String.fromCharCode(b3);
        }
        return out;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "btoa", { value: function (s) {
        s = String(s);
        var map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var out = [], i, b1,b2,b3, e1,e2,e3,e4;
        for (i = 0; i < s.length; i++) {
            if (s.charCodeAt(i) > 0xFF) throw _domError('InvalidCharacterError', "The string to be encoded contains characters outside of the Latin1 range.");
        }
        for (i = 0; i < s.length; i += 3) {
            b1 = s.charCodeAt(i) & 0xff;
            b2 = i+1 < s.length ? s.charCodeAt(i+1) & 0xff : NaN;
            b3 = i+2 < s.length ? s.charCodeAt(i+2) & 0xff : NaN;
            e1 = b1 >> 2; e2 = ((b1 & 3) << 4) | (b2 >> 4);
            e3 = isNaN(b2) ? 64 : ((b2 & 15) << 2) | (b3 >> 6);
            e4 = isNaN(b3) ? 64 : (b3 & 63);
            out.push(map.charAt(e1), map.charAt(e2), e3 === 64 ? '=' : map.charAt(e3), e4 === 64 ? '=' : map.charAt(e4));
        }
        return out.join('');
    }, writable: true, enumerable: true, configurable: true });
/* ===== 网络/二进制 构造器：最小可用 + 形态正确 ===== */
function Blob(parts, opts) {
    if (!(this instanceof Blob)) return new Blob(parts, opts);
    parts = parts || []; opts = opts || {};
    this._parts = [];
    var size = 0;
    for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        if (typeof p === 'string') { this._parts.push(p); size += p.length; }
        else if (p instanceof Blob) { this._parts.push(p); size += p.size; }
        else if (ArrayBuffer.isView(p)) { this._parts.push(p); size += p.byteLength; }
        else if (p instanceof ArrayBuffer) { this._parts.push(p); size += p.byteLength; }
    }
    this.size = size;
    this.type = String(opts.type || '');
}
Blob.prototype.slice = function (start, end, contentType) { return new Blob([this], { type: contentType || this.type }); };
Blob.prototype.text = function () { var s = ''; for (var i = 0; i < this._parts.length; i++) s += (typeof this._parts[i] === 'string' ? this._parts[i] : ''); return Promise.resolve(s); };
Blob.prototype.arrayBuffer = function () { return Promise.resolve(new ArrayBuffer(0)); };
Blob.prototype.stream = function () { return {}; };
Object.defineProperty(Blob.prototype, Symbol.toStringTag, { value: 'Blob', configurable: true });

function FormData() {
    if (!(this instanceof FormData)) return new FormData();
    this._entries = [];
}
FormData.prototype.append = function (k, v) { this._entries.push([String(k), v === undefined ? 'undefined' : String(v)]); };
FormData.prototype.get = function (k) { var f = this._entries.filter(function (e) { return e[0] === k; }); return f.length ? f[0][1] : null; };
FormData.prototype.getAll = function (k) { return this._entries.filter(function (e) { return e[0] === k; }).map(function (e) { return e[1]; }); };
FormData.prototype.has = function (k) { return this._entries.some(function (e) { return e[0] === k; }); };
FormData.prototype.delete = function (k) { this._entries = this._entries.filter(function (e) { return e[0] !== k; }); };
FormData.prototype.set = function (k, v) { this.delete(k); this.append(k, v); };
FormData.prototype.forEach = function (cb, thisArg) { this._entries.forEach(function (e) { cb.call(thisArg, e[1], e[0], this); }, this); };
FormData.prototype[Symbol.iterator] = function* () { for (var i = 0; i < this._entries.length; i++) yield this._entries[i]; };
FormData.prototype.entries = function () { return this[Symbol.iterator](); };
FormData.prototype.keys = function* () { for (var i = 0; i < this._entries.length; i++) yield this._entries[i][0]; };
FormData.prototype.values = function* () { for (var i = 0; i < this._entries.length; i++) yield this._entries[i][1]; };
Object.defineProperty(FormData.prototype, Symbol.toStringTag, { value: 'FormData', configurable: true });

function FileReader() {
    if (!(this instanceof FileReader)) return new FileReader();
    this.readyState = 0; this.result = null; this.error = null;
    this.onload = null; this.onerror = null; this.onloadstart = null; this.onloadend = null; this.onprogress = null; this.onabort = null;
}
FileReader.EMPTY = 0; FileReader.LOADING = 1; FileReader.DONE = 2;
FileReader.prototype._read = function () {
    this.readyState = 1;
    var self = this;
    Promise.resolve().then(function () { self.readyState = 2; self.result = ''; if (self.onload) self.onload({ target: self, type: 'load' }); if (self.onloadend) self.onloadend({ target: self, type: 'loadend' }); });
};
FileReader.prototype.readAsText = function () { this._read(); };
FileReader.prototype.readAsDataURL = function () { this._read(); };
FileReader.prototype.readAsArrayBuffer = function () { this._read(); };
FileReader.prototype.readAsBinaryString = function () { this._read(); };
FileReader.prototype.abort = function () {
    console.log(" FileReader.prototype.abort调用 ")
};
Object.defineProperty(FileReader.prototype, Symbol.toStringTag, { value: 'FileReader', configurable: true });

function WebSocket(url, protocols) {
    if (!(this instanceof WebSocket)) return new WebSocket(url, protocols);
    this.url = String(url);
    this.readyState = 0; this.bufferedAmount = 0; this.extensions = ''; this.protocol = '';
    this.binaryType = 'blob';
    this.onopen = null; this.onmessage = null; this.onerror = null; this.onclose = null;
}
WebSocket.CONNECTING = 0; WebSocket.OPEN = 1; WebSocket.CLOSING = 2; WebSocket.CLOSED = 3;
WebSocket.prototype.send = function (data) { console.log("WebSocket.send : ", data); };
WebSocket.prototype.close = function () { this.readyState = 3; };
WebSocket.prototype.addEventListener = function () {
    console.log(" WebSocket.prototype.addEventListener调用 ")
}; WebSocket.prototype.removeEventListener = function () {
    console.log(" WebSocket.prototype.removeEventListener调用 ")
};
Object.defineProperty(WebSocket.prototype, Symbol.toStringTag, { value: 'WebSocket', configurable: true });

function Image(w, h) {
    if (!(this instanceof Image)) return new Image(w, h);
    this.width = w || 0; this.height = h || 0;
    this.src = ''; this.alt = ''; this.complete = false; this.naturalWidth = 0; this.naturalHeight = 0;
    this.onload = null; this.onerror = null; this.onabort = null;
}
Object.defineProperty(Image.prototype, Symbol.toStringTag, { value: 'HTMLImageElement', configurable: true });

function ImageData(a, b, c) {
    if (!(this instanceof ImageData)) return new ImageData(a, b, c);
    if (a instanceof Uint8ClampedArray) { this.data = a; this.width = b; this.height = c; }
    else { this.width = a; this.height = b; this.data = new Uint8ClampedArray(a * b * 4); }
}
Object.defineProperty(ImageData.prototype, Symbol.toStringTag, { value: 'ImageData', configurable: true });

function Audio(src) {
    if (!(this instanceof Audio)) return new Audio(src);
    this.src = src || ''; this.onload = null; this.onerror = null;
    this.currentTime = 0; this.duration = NaN; this.paused = true; this.volume = 1;
}
Audio.prototype.play = function () { return Promise.resolve(); };
Audio.prototype.pause = function () {
    console.log(" Audio.prototype.pause调用 ")
};
Audio.prototype.load = function () {
    console.log(" Audio.prototype.load调用 ")
};
Audio.prototype.addEventListener = function () {
    console.log(" Audio.prototype.addEventListener调用 ")
};
Object.defineProperty(Audio.prototype, Symbol.toStringTag, { value: 'HTMLAudioElement', configurable: true });

function AudioContext() {
    if (!(this instanceof AudioContext)) return new AudioContext();
    this.currentTime = 0; this.sampleRate = 44100; this.state = 'running'; this.onstatechange = null;
    this.destination = { channelCount: 2, sampleRate: 44100 };
    this.listener = { dopplerFactor: 1, speedOfSound: 343.3, positionX: { value: 0 }, positionY: { value: 0 }, positionZ: { value: 0 }, forwardX: { value: 0 }, forwardY: { value: 0 }, forwardZ: { value: -1 }, upX: { value: 0 }, upY: { value: 1 }, upZ: { value: 0 } };
}
function _audioNode() { return { connect: function () {
        console.log(" _audioNode.connect调用 ")
    }, disconnect: function () {
        console.log(" _audioNode.disconnect调用 ")
    }, addEventListener: function () {
        console.log(" _audioNode.addEventListener调用 ")
    } }; }
AudioContext.prototype.createOscillator = function () { var o = _audioNode(); o.type = 'sine'; o.frequency = { value: 0 }; o.detune = { value: 0 }; o.start = function () {}; o.stop = function () {}; return o; };
AudioContext.prototype.createGain = function () { var g = _audioNode(); g.gain = { value: 1 }; return g; };
AudioContext.prototype.createDynamicsCompressor = function () { var c = _audioNode(); c.threshold = { value: -24 }; c.knee = { value: 30 }; c.ratio = { value: 12 }; c.attack = { value: 0.003 }; c.release = { value: 0.25 }; return c; };
AudioContext.prototype.createAnalyser = function () { var a = _audioNode(); a.getFloatFrequencyData = function () {
    console.log(" AudioContext.prototype.createAnalyser调用 ")
}; a.getByteFrequencyData = function () {
    console.log(" AudioContext.prototype.createAnalyser调用 ")
}; a.frequencyBinCount = 1024; a.fftSize = 2048; return a; };
AudioContext.prototype.createBuffer = function (ch, len, rate) { var b = { length: len, sampleRate: rate, numberOfChannels: ch, getChannelData: function () { return new Float32Array(len); } }; return b; };
AudioContext.prototype.decodeAudioData = function (buf, cb) { if (cb) cb({}); };
AudioContext.prototype.createBufferSource = function () { var s = _audioNode(); s.buffer = null; s.loop = false; s.start = function () {
    console.log(" AudioContext.prototype.createBufferSource调用 ")
}; s.stop = function () {
    console.log(" AudioContext.prototype.createBufferSource调用 ")
}; return s; };
AudioContext.prototype.createConvolver = function () { return _audioNode(); };
AudioContext.prototype.createBiquadFilter = function () { var f = _audioNode(); f.frequency = { value: 350 }; f.Q = { value: 1 }; f.type = 'lowpass'; return f; };
AudioContext.prototype.createScriptProcessor = function () { var s = _audioNode(); s.onaudioprocess = null; return s; };
AudioContext.prototype.close = function () { return Promise.resolve(); };
AudioContext.prototype.resume = function () { return Promise.resolve(); };
AudioContext.prototype.suspend = function () { return Promise.resolve(); };
Object.defineProperty(AudioContext.prototype, Symbol.toStringTag, { value: 'AudioContext', configurable: true });

function OfflineAudioContext(channels, length, rate) {
    if (!(this instanceof OfflineAudioContext)) return new OfflineAudioContext(channels, length, rate);
    this.currentTime = 0; this.sampleRate = rate || 44100; this.length = length || 0; this.state = 'suspended';
    this.destination = {}; this.onstatechange = null;
    this.createOscillator = AudioContext.prototype.createOscillator;
    this.createGain = AudioContext.prototype.createGain;
    this.createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor;
    this.createAnalyser = AudioContext.prototype.createAnalyser;
    this.createBuffer = AudioContext.prototype.createBuffer;
}
OfflineAudioContext.prototype.startRendering = function () {
    var len = this.length, rate = this.sampleRate;
    return Promise.resolve({ length: len, sampleRate: rate, numberOfChannels: 1, getChannelData: function () { return new Float32Array(len); } });
};
OfflineAudioContext.prototype.suspend = function () { return Promise.resolve(); };
OfflineAudioContext.prototype.resume = function () { return Promise.resolve(); };
Object.defineProperty(OfflineAudioContext.prototype, Symbol.toStringTag, { value: 'OfflineAudioContext', configurable: true });

/* ===== URL / URLSearchParams：真实完整实现 ===== */
function _resolveUrl(input, base) {
    input = String(input).trim();
    if (/^[a-z][a-z0-9+.-]*:/i.test(input)) return input;
    if (/^\/\//.test(input)) {
        var b0 = /^(?:([a-z][a-z0-9+.-]*):)?\/\//i.exec(base || '');
        return (b0 && b0[1] ? b0[1] + ':' : '') + input;
    }
    if (!base) return input;
    var bm = /^([a-z][a-z0-9+.-]*:)?(\/\/[^\/?#]*)?([^?#]*)/i.exec(base);
    var prefix = (bm[1] || '') + (bm[2] || '');
    if (/^\//.test(input)) return prefix + input;
    var dir = bm[3] || '';
    var baseDir = dir.replace(/[^\/]*$/, '');
    var joined = (baseDir || prefix + '/') + input;
    var out = [], segs = joined.split('/');
    for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if (seg === '' ) { if (out.length === 0) out.push(''); continue; }
        if (seg === '.') continue;
        if (seg === '..') { if (out.length > 1) out.pop(); else if (out.length === 0) out.push('..'); continue; }
        out.push(seg);
    }
    return out.join('/');
}
function URL(url, base) {
    if (!(this instanceof URL)) return new URL(url, base);
    var href = _resolveUrl(url, base || '');
    this.href = href;
    var m = /^([a-z][a-z0-9+.-]*:)?(\/\/([^\/?#]*))?([^?#]*)(\?[^#]*)?(#.*)?$/i.exec(href);
    this.protocol = m[1] || '';
    var host = m[3] || '';
    var at = host.lastIndexOf('@');
    this.username = ''; this.password = '';
    if (at >= 0) { var cred = host.slice(0, at); this.username = cred.split(':')[0]; this.password = cred.split(':')[1] || ''; host = host.slice(at + 1); }
    this.host = host;
    this.hostname = host.split(':')[0];
    this.port = host.indexOf(':') >= 0 ? host.split(':')[1] : '';
    this.pathname = m[4] || '/';
    this.search = m[5] || '';
    this.hash = m[6] || '';
    this.origin = (this.protocol && this.host) ? this.protocol + '//' + this.host : 'null';
}
URL.prototype.toString = function () { return this.href; };
URL.prototype.toJSON = function () { return this.href; };
URL.prototype[Symbol.toStringTag] = 'URL';

function URLSearchParams(init) {
    if (!(this instanceof URLSearchParams)) return new URLSearchParams(init);
    this._params = [];
    if (typeof init === 'string') {
        var s = init.charAt(0) === '?' ? init.slice(1) : init;
        if (s) s.split('&').forEach(function (kv) {
            if (!kv) return;
            var eq = kv.indexOf('=');
            var k = eq >= 0 ? kv.slice(0, eq) : kv;
            var v = eq >= 0 ? kv.slice(eq + 1) : '';
            this.append(decodeURIComponent(k.replace(/\+/g, ' ')), decodeURIComponent(v.replace(/\+/g, ' ')));
        }, this);
    } else if (init && typeof init === 'object') {
        if (Array.isArray(init)) init.forEach(function (p) { this.append(p[0], p[1]); }, this);
        else if (typeof init.append === 'function') { var self = this; init.forEach(function (v, k) { self.append(k, v); }); }
        else Object.keys(init).forEach(function (k) { this.append(k, init[k]); }, this);
    }
}
URLSearchParams.prototype.append = function (k, v) { this._params.push([String(k), String(v)]); };
URLSearchParams.prototype.delete = function (k) { this._params = this._params.filter(function (p) { return p[0] !== k; }); };
URLSearchParams.prototype.get = function (k) { var f = this._params.filter(function (p) { return p[0] === k; }); return f.length ? f[0][1] : null; };
URLSearchParams.prototype.getAll = function (k) { return this._params.filter(function (p) { return p[0] === k; }).map(function (p) { return p[1]; }); };
URLSearchParams.prototype.has = function (k) { return this._params.some(function (p) { return p[0] === k; }); };
URLSearchParams.prototype.set = function (k, v) { this.delete(k); this.append(k, v); };
URLSearchParams.prototype.toString = function () {
    return this._params.map(function (p) {
        return encodeURIComponent(p[0]).replace(/%20/g, '+') + '=' + encodeURIComponent(p[1]).replace(/%20/g, '+');
    }).join('&');
};
URLSearchParams.prototype.forEach = function (cb, thisArg) { this._params.forEach(function (p) { cb.call(thisArg, p[1], p[0], this); }, this); };
URLSearchParams.prototype[Symbol.iterator] = function* () { for (var i = 0; i < this._params.length; i++) yield this._params[i]; };
URLSearchParams.prototype.entries = function () { return this[Symbol.iterator](); };
URLSearchParams.prototype.keys = function* () { for (var i = 0; i < this._params.length; i++) yield this._params[i][0]; };
URLSearchParams.prototype.values = function* () { for (var i = 0; i < this._params.length; i++) yield this._params[i][1]; };
Object.defineProperty(URLSearchParams.prototype, Symbol.toStringTag, { value: 'URLSearchParams', configurable: true });

/* fetch：真实返回 Promise（resolve 最小 Response） */
Object.defineProperty(Window.prototype, "fetch", { value: function (url, opts) {
        console.log("window.fetch : ", url, opts);
        return Promise.resolve({
            ok: true, status: 200, statusText: 'OK', redirected: false, type: 'basic', url: String(url),
            headers: { get: function () { return null; }, has: function () { return false; }, forEach: function () {} },
            json: function () { return Promise.resolve({}); },
            text: function () { return Promise.resolve(''); },
            arrayBuffer: function () { return Promise.resolve(new ArrayBuffer(0)); },
            blob: function () { return Promise.resolve(new Blob()); },
            clone: function () { return this; }
        });
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "XMLHttpRequest", { value: function(){ console.log("new window.XMLHttpRequest()") ;
        return xhr
    }, writable: true, enumerable: true, configurable: true });
var _rafId = 0;
Object.defineProperty(Window.prototype, "requestAnimationFrame", { value: function (cb) {
        var id = ++_rafId;
        Promise.resolve().then(function () { if (typeof cb === 'function') cb(performance.now()); });
        return id;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "cancelAnimationFrame", { value: function(){ console.log("window.cancelAnimationFrame") }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "requestIdleCallback", { value: function(cb){ console.log("window.requestIdleCallback : ", cb) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "getComputedStyle", { value: function (el, pseudo) {
        return new Proxy({}, {
            get: function (t, k) {
                if (k === 'getPropertyValue' || k === 'getPropertyPriority') return function () { return ''; };
                if (k === 'setProperty') return function () {};
                if (k === 'removeProperty') return function () { return ''; };
                if (k === 'item' || k === 'namedItem') return function () { return null; };
                if (k === 'cssText') return '';
                if (k === 'length') return 0;
                if (k === Symbol.toStringTag) return 'CSSStyleDeclaration';
                if (k === 'toString') return function () { return '[object CSSStyleDeclaration]'; };
                if (typeof k === 'string') return '';
                return undefined;
            }, set: function () { return true; }
        });
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "getSelection", { value: function(){ return { toString: function(){ return ''; }, anchorNode: null, focusNode: null }; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "postMessage", { value: function(msg, origin){ console.log("window.postMessage : ", msg, origin) }, writable: true, enumerable: true, configurable: true });
/* matchMedia 的媒体查询求值器（按 window/screen 真实尺寸计算） */
function _evalMediaQuery(q) {
    q = String(q || '').trim().toLowerCase();
    var m;
    if (q === 'screen' || q === 'all' || q === '') return true;
    if (q === 'print' || q === 'speech' || q === 'not all') return false;
    if (q.indexOf(',') >= 0) {
        var alts = q.split(',');
        for (var j = 0; j < alts.length; j++) if (_evalMediaQuery(alts[j])) return true;
        return false;
    }
    if (q.indexOf(' and ') >= 0) {
        var parts = q.split(' and ');
        for (var i = 0; i < parts.length; i++) if (!_evalMediaQuery(parts[i])) return false;
        return true;
    }
    var W = window.innerWidth, H = window.innerHeight, dpr = window.devicePixelRatio || 1;
    if ((m = /\(?min-width:\s*(\d+(?:\.\d+)?)px\)?/.exec(q))) return W >= parseFloat(m[1]);
    if ((m = /\(?max-width:\s*(\d+(?:\.\d+)?)px\)?/.exec(q))) return W <= parseFloat(m[1]);
    if ((m = /\(?width:\s*(\d+(?:\.\d+)?)px\)?/.exec(q))) return W === parseFloat(m[1]);
    if ((m = /\(?min-height:\s*(\d+(?:\.\d+)?)px\)?/.exec(q))) return H >= parseFloat(m[1]);
    if ((m = /\(?max-height:\s*(\d+(?:\.\d+)?)px\)?/.exec(q))) return H <= parseFloat(m[1]);
    if ((m = /\(?height:\s*(\d+(?:\.\d+)?)px\)?/.exec(q))) return H === parseFloat(m[1]);
    if ((m = /\(?orientation:\s*(portrait|landscape)\)?/.exec(q))) return m[1] === 'landscape' ? W >= H : H > W;
    if ((m = /\(?min-resolution:\s*(\d+(?:\.\d+)?)dppx\)?/.exec(q))) return dpr >= parseFloat(m[1]);
    if ((m = /\(?max-resolution:\s*(\d+(?:\.\d+)?)dppx\)?/.exec(q))) return dpr <= parseFloat(m[1]);
    if ((m = /\(?resolution:\s*(\d+(?:\.\d+)?)dppx\)?/.exec(q))) return dpr === parseFloat(m[1]);
    if ((m = /\(?hover:\s*(hover|none)\)?/.exec(q))) return m[1] === 'hover';
    if ((m = /\(?any-hover:\s*(hover|none)\)?/.exec(q))) return m[1] === 'hover';
    if ((m = /\(?pointer:\s*(fine|coarse|none)\)?/.exec(q))) return m[1] === 'fine';
    if ((m = /\(?any-pointer:\s*(fine|coarse|none)\)?/.exec(q))) return m[1] === 'fine';
    /* Chrome 的 color 媒体特性按每通道 bit 计（8），不是 colorDepth(24) */
    if ((m = /\(?min-color:\s*(\d+)\)?/.exec(q))) return 8 >= parseInt(m[1], 10);
    if ((m = /\(?color:\s*(\d+)\)?/.exec(q))) return 8 === parseInt(m[1], 10);
    if ((m = /\(?min-monochrome:\s*(\d+)\)?/.exec(q))) return parseInt(m[1], 10) <= 0;
    if ((m = /\(?monochrome:\s*(\d+)\)?/.exec(q))) return parseInt(m[1], 10) === 0;
    /* prefers-*（实测本机：浅色、reduce 开启、forced-colors:none） */
    if ((m = /\(?prefers-color-scheme:\s*(light|dark)\)?/.exec(q))) return m[1] === 'light';
    if ((m = /\(?prefers-reduced-motion:\s*(reduce|no-preference)\)?/.exec(q))) return m[1] === 'reduce';
    if ((m = /\(?prefers-reduced-transparency:\s*(reduce|no-preference)\)?/.exec(q))) return m[1] === 'no-preference';
    if ((m = /\(?prefers-contrast:\s*(no-preference|more|less|custom)\)?/.exec(q))) return m[1] === 'no-preference';
    if ((m = /\(?forced-colors:\s*(none|active)\)?/.exec(q))) return m[1] === 'none';
    if ((m = /\(?inverted-colors:\s*(none|inverted)\)?/.exec(q))) return m[1] === 'none';
    if ((m = /\(?dynamic-range:\s*(standard|high)\)?/.exec(q))) return m[1] === 'standard';
    if ((m = /\(?color-gamut:\s*(srgb|p3|rec2020)\)?/.exec(q))) return true;
    return false;
}
Object.defineProperty(Window.prototype, "matchMedia", { value: function (query) {
        console.log("window.matchMedia : ", query);
        var o = { matches: _evalMediaQuery(query), media: String(query), onchange: null,
            addEventListener: function(){}, removeEventListener: function(){},
            addListener: function(){}, removeListener: function(){}, dispatchEvent: function(){} };
        Object.defineProperty(o, Symbol.toStringTag, { value: 'MediaQueryList', configurable: true });
        return o;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "open", { value: function(u, t){ console.log("window.open : ", u, t) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "close", { value: function(){ console.log("window.close") }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "queueMicrotask", { value: function (cb) { Promise.resolve().then(function () { if (typeof cb === 'function') cb(); }); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "structuredClone", { value: function (v) {
        return (function _clone(x, seen) {
            if (x === null || typeof x !== 'object') {
                if (typeof x === 'function' || typeof x === 'symbol') throw _domError('DataCloneError', 'could not be cloned.');
                return x;
            }
            seen = seen || [];
            for (var si = 0; si < seen.length; si++) if (seen[si][0] === x) return seen[si][1];
            if (x instanceof Date) return new Date(x.getTime());
            if (x instanceof ArrayBuffer) return x.slice(0);
            if (ArrayBuffer.isView(x)) return new x.constructor(x);
            if (Array.isArray(x)) {
                var a = new Array(x.length);
                seen.push([x, a]);
                for (var i = 0; i < x.length; i++) a[i] = _clone(x[i], seen);
                return a;
            }
            var o = {};
            seen.push([x, o]);
            var keys = Object.keys(x);
            for (var j = 0; j < keys.length; j++) o[keys[j]] = _clone(x[keys[j]], seen);
            return o;
        })(v);
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "DOMParser", { value: function(){ console.log("new window.DOMParser()") }, writable: true, enumerable: true, configurable: true });
var _cssSingleton = null;
Object.defineProperty(Window.prototype, "CSS", { get: function(){
        if (_cssSingleton) return _cssSingleton;
        var _cssProps = ("background background-attachment background-color background-image background-position background-repeat background-size " +
            "border border-bottom border-color border-image border-left border-radius border-right border-style border-top border-width " +
            "bottom box-shadow box-sizing clear clip color content cursor direction display float font font-family font-feature-settings " +
            "font-kerning font-size font-size-adjust font-stretch font-style font-variant font-weight grid grid-area grid-auto-columns " +
            "grid-auto-flow grid-auto-rows grid-column grid-column-end grid-column-gap grid-column-start grid-gap grid-row grid-row-end " +
            "grid-row-gap grid-row-start grid-template grid-template-areas grid-template-columns grid-template-rows height hyphens left " +
            "letter-spacing line-height list-style list-style-image list-style-position list-style-type margin margin-bottom margin-left " +
            "margin-right margin-top max-height max-width min-height min-width object-fit object-position opacity order outline outline-color " +
            "outline-offset outline-style outline-width overflow overflow-x overflow-y padding padding-bottom padding-left padding-right " +
            "padding-top perspective pointer-events position quotes right text-align text-decoration text-decoration-color " +
            "text-decoration-line text-decoration-style text-indent text-overflow text-shadow text-transform top transform transform-origin " +
            "transform-style transition transition-delay transition-duration transition-property transition-timing-function user-select " +
            "vertical-align visibility white-space width word-break word-spacing word-wrap writing-mode z-index align-content align-items " +
            "align-self animation animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count " +
            "animation-name animation-play-state animation-timing-function backface-visibility background-blend-mode background-clip " +
            "background-origin border-collapse border-spacing column-gap flex flex-basis flex-direction flex-flow flex-grow flex-shrink " +
            "flex-wrap gap mask overflow-wrap place-content place-items place-self row-gap tab-size text-rendering will-change isolation " +
            "mix-blend-mode filter backdrop-filter contain content-visibility appearance aspect-ratio clip-path column-count column-fill " +
            "column-rule column-rule-color column-rule-style column-rule-width column-span column-width columns margin-block margin-inline " +
            "padding-block padding-inline scroll-behavior scroll-snap-type touch-action inset outline-offset").split(/\s+/);
        _cssSingleton = {
            supports: function (prop, val) {
                var p = String(prop || '').trim().toLowerCase();
                var v = String(val == null ? '' : val).trim().toLowerCase();
                if (!p || p.indexOf(':') >= 0 || p.indexOf(';') >= 0) return false;
                if (!v || /[;{}]/.test(v)) return false;
                if (p === 'display') return ['flex', 'inline-flex', 'grid', 'inline-grid', 'block', 'inline-block', 'none', 'table', 'table-cell', 'flow-root'].indexOf(v) >= 0;
                if (p === 'position') return ['absolute', 'relative', 'fixed', 'static', 'sticky'].indexOf(v) >= 0;
                if (p === 'flex-direction') return ['row', 'column', 'row-reverse', 'column-reverse'].indexOf(v) >= 0;
                if (p === 'align-items' || p === 'justify-content') return ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly'].indexOf(v) >= 0;
                if (p === 'color' || p === 'background-color') return /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|[a-z]+|transparent|currentcolor|inherit|initial|unset)$/.test(v);
                return _cssProps.indexOf(p) >= 0;
            },
            escape: function (str) {
                var string = String(str);
                var length = string.length;
                var index = -1;
                var codeUnit, firstCodeUnit = string.charCodeAt(0);
                var result = '';
                while (++index < length) {
                    codeUnit = string.charCodeAt(index);
                    if (codeUnit === 0x0000) { result += '\uFFFD'; continue; }
                    if ((codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit === 0x007F ||
                        (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
                        (index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002D)) {
                        result += '\\' + codeUnit.toString(16) + ' ';
                        continue;
                    }
                    if (index === 0 && length === 1 && codeUnit === 0x002D) { result += '\\' + string.charAt(index); continue; }
                    if (codeUnit >= 0x0080 || codeUnit === 0x002D ||
                        (codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
                        (codeUnit >= 0x0041 && codeUnit <= 0x005A) ||
                        (codeUnit >= 0x0061 && codeUnit <= 0x007A)) {
                        result += string.charAt(index);
                        continue;
                    }
                    result += '\\' + string.charAt(index);
                }
                return result;
            }
        };
        return _cssSingleton;
    }, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "origin", { get: function(){ return location.origin; }, enumerable: true, configurable: true });
Object.defineProperty(Window.prototype, "isSecureContext", { get: function(){ return true; }, enumerable: true, configurable: true });

/* ---- Node.prototype ---- */
Object.defineProperty(Node.prototype, "parentElement", { get: function(){
        console.log("parentElement被调用")
        return null; }, enumerable: true, configurable: true });
Object.defineProperty(Node.prototype, "parentNode", { get: function(){
        console.log("parentNode被调用")
        return null; }, enumerable: true, configurable: true });
Object.defineProperty(Node.prototype, "removeChild", { value: function(s){ console.log('document.createElement("XXX").removeChild : ', s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Node.prototype, "nodeType", { get: function(){ return 9; }, enumerable: true, configurable: true });
Object.defineProperty(Node.prototype, Symbol.toStringTag, { value: "Node", writable: false, enumerable: false, configurable: true });

/* ---- Document.prototype ---- */
Object.defineProperty(Document.prototype, "body", { get: function(){ return body; }, set: function(){}, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "head", { get: function(){ return head; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "documentElement", { get: function(){ return html; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "readyState", { get: function(){ return 'complete'; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "visibilityState", { get: function(){ return 'visible'; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "compatMode", { get: function(){ return 'CSS1Compat'; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "referrer", { get: function(){ return ''; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "characterSet", { get: function(){ return 'UTF-8'; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "charset", { get: function(){ return 'UTF-8'; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "URL", { get: function(){ return location.href; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "documentURI", { get: function(){ return location.href; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "domain", { get: function(){ return location.hostname; }, enumerable: true, configurable: true });
var _docCookie = {};
Object.defineProperty(Document.prototype, "cookie", { get: function(){
        return Object.keys(_docCookie).map(function (k) { return k + '=' + _docCookie[k]; }).join('; ');
    }, set: function (s) {
        console.log("document.cookie = ", s);
        /* 真实浏览器：cookie 赋值只取第一段 name=value（合并语义），path/expires/domain 等属性忽略 */
        var first = String(s).split(';')[0];
        var eq = first.indexOf('=');
        if (eq > 0) {
            var name = first.substring(0, eq).trim();
            var value = first.substring(eq + 1).trim();
            if (name) _docCookie[name] = value;
        }
    }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "title", { get: function(){ return ''; }, set: function(){}, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "currentScript", { get: function(){ return null; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "hidden", { get: function(){ return false; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "all", { get: function(){ return _docAll; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "images", { get: function(){ return _emptyColl; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "forms", { get: function(){ return _emptyColl; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "scripts", { get: function(){ return _emptyColl; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "links", { get: function(){ return _emptyColl; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "plugins", { get: function(){ return _emptyColl; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "embeds", { get: function(){ return _emptyColl; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "styleSheets", { get: function(){ return []; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "activeElement", { get: function(){ return body; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "scrollingElement", { get: function(){ return html; }, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "elementFromPoint", { value: function(x, y){ console.log("document.elementFromPoint : ", x, y); return html; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "getElementById", { value: function(s){ console.log("document.getElementById : ", s) }, writable: true, enumerable: true, configurable: true });
////////////////////////////////////
Object.defineProperty(Document.prototype, "getElementsByTagName", { value: function(s){
        console.log(" 特别注意对照 document.getElementsByTagName : ", s)
        if (s === "div") return _div;
        if (s === "head") return _head;
        if (s === "html") return _html;
        if (s === "meta") return _meta;
        if (s === "script") return _script;
        if (s === "canvas") return _canvas;
        if (s === "body") return _body;
        if (s === "link") return _link;
        if (s === "style") return _style;
        if (s === "title") return _title;
        if (s === "base") return _base;
        if (s === "form") return _form;
        if (s === "input") return _input;
        else{
            console.log("document.getElementsByTagName 参数不匹配 : ", s)
            return []
        }
    }, writable: true, enumerable: true, configurable: true });
///////////////////////////////////
Object.defineProperty(Document.prototype, "getElementsByClassName", { value: function(s){ console.log("document.getElementsByClassName : ", s); return _emptyColl; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "getElementsByName", { value: function(s){ console.log("document.getElementsByName : ", s); return _emptyColl; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "querySelector", { value: function(s){ console.log("document.querySelector : ", s); return null; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "querySelectorAll", { value: function(s){ console.log("document.querySelectorAll : ", s); return _emptyColl; }, writable: true, enumerable: true, configurable: true });
///////////////////////////////
Object.defineProperty(Document.prototype, "createElement", { value: function(s){
        console.log("document.createElement : ", s)
        if (s === "div") return div;
        if (s === "head") return head;
        if (s === "html") return html;
        if (s === "meta") return meta;
        if (s === "script") return script;
        if (s === "canvas") return canvas;
        if (s === "body") return body;
        if (s === "link") return link;
        if (s === "style") return style;
        if (s === "title") return title;
        if (s === "base") return base;
        if (s === "form") return form;
        if (s === "input") return input;
        else{
            console.log("document.createElement 参数不是预设值 : ", s)
            return {}
        }
    }, writable: true, enumerable: true, configurable: true });
////////////////////////////
Object.defineProperty(Document.prototype, "createTextNode", { value: function(s){ console.log("document.createTextNode : ", s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "createComment", { value: function(s){ console.log("document.createComment : ", s); return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "createDocumentFragment", { value: function(s){ console.log("document.createDocumentFragment : ", s); return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, "createEvent", { value: function(s){ console.log("document.createEvent : ", s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Document.prototype, Symbol.toStringTag, { value: "Document", writable: false, enumerable: false, configurable: true });

/* ---- HTMLDocument.prototype ---- */
Object.defineProperty(HTMLDocument.prototype, Symbol.toStringTag, { value: "HTMLDocument", writable: false, enumerable: false, configurable: true });

/* ---- Document.prototype 符号属性 ---- */
Object.defineProperty(Document.prototype, Symbol.toStringTag, { value: "Document", writable: false, enumerable: false, configurable: true });
Object.defineProperty(Document.prototype, Symbol.unscopables, { value: {}, writable: false, enumerable: false, configurable: true });

/* ---- Location.prototype ---- */
var _locationHref = "https://ec.chng.com.cn/channel/home/?SlJfApAfmEBp=1786961057144#/purchase?top=0";
var _locationProtocol = "https:";
var _locationHost = "ec.chng.com.cn";
var _locationPath = "/channel/home/";
var _locationSearch = "?SlJfApAfmEBp=1786961057144";
var _locationHash = "#/purchase?top=0";
/* ---- 上面要修改值 ---- */

/* href 设置时解析（完整/相对 URL），同步全部组件 —— 真实浏览器 location.href='...' 后 origin/pathname/search/hash 全部更新 */
function _locationParseHref(href) {
    href = String(href == null ? '' : href).trim();
    var cur = _locationHref;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(href)) {
        var cm, cq, cd, dir, parts, segs, i, s;
        if (/^\/\//.test(href)) {
            cm = /^([a-z][a-z0-9+.-]*:)/i.exec(cur);
            href = (cm ? cm[1] : '') + href;
        } else if (/^\//.test(href)) {
            cm = /^([a-z][a-z0-9+.-]*:)?(\/\/[^\/?#]*)/i.exec(cur);
            href = (cm[1] || '') + (cm[2] || '') + href;
        } else if (/^[?#]/.test(href)) {
            cq = /^([a-z][a-z0-9+.-]*:)?(\/\/[^\/?#]*)?([^?#]*)/i.exec(cur);
            href = (cq[1] || '') + (cq[2] || '') + (cq[3] || '/') + href;
        } else {
            cd = /^([a-z][a-z0-9+.-]*:)?(\/\/[^\/?#]*)?([^?#]*)/i.exec(cur);
            dir = (cd[3] || '').replace(/[^\/]*$/, '');
            href = (cd[1] || '') + (cd[2] || '') + (dir || '/') + href;
            parts = []; segs = href.split('/');
            for (i = 0; i < segs.length; i++) {
                s = segs[i];
                if (s === '.' ) continue;
                if (s === '..') { if (parts.length > 1) parts.pop(); continue; }
                parts.push(s);
            }
            href = parts.join('/');
        }
    }
    var m = /^([a-z][a-z0-9+.-]*:)?(\/\/[^\/?#]*)?([^?#]*)(\?[^#]*)?(#.*)?$/i.exec(href);
    _locationProtocol = m[1] || '';
    _locationHost = (m[2] || '').replace(/^\/\//, '');
    _locationPath = m[3] || '';
    _locationSearch = m[4] || '';
    _locationHash = m[5] || '';
    if (_locationHost && !_locationPath) _locationPath = '/';
    _locationHref = (m[1] || '') + (m[2] || '') + _locationPath + _locationSearch + _locationHash;
}

/* 组件设置后重建 href（protocol/host/pathname/search/hash 与 href 双向一致） */
function _locationRebuildHref() {
    _locationHref = _locationProtocol + (_locationHost ? '//' + _locationHost : '') + _locationPath + _locationSearch + _locationHash;
}

Object.defineProperty(Location.prototype, "href", { get: function(){ return _locationHref; }, set: function(v){ _locationParseHref(v); }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "origin", { get: function(){ return _locationProtocol + '//' + _locationHost; }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "protocol", { get: function(){ return _locationProtocol; }, set: function(v){ _locationProtocol = String(v); _locationRebuildHref(); }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "host", { get: function(){ return _locationHost; }, set: function(v){ _locationHost = String(v); _locationRebuildHref(); }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "hostname", { get: function(){ return _locationHost.split(':')[0]; }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "port", { get: function(){ return _locationHost.indexOf(':') >= 0 ? _locationHost.split(':')[1] : ''; }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "pathname", { get: function(){ return _locationPath; }, set: function(v){ _locationPath = String(v); _locationRebuildHref(); }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "search", { get: function(){ return _locationSearch; }, set: function(v){ _locationSearch = String(v); _locationRebuildHref(); }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "hash", { get: function(){ return _locationHash; }, set: function(v){ _locationHash = String(v); _locationRebuildHref(); }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "ancestorOrigins", { get: function(){ return []; }, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "assign", { value: function(u){ console.log("location.assign : ", u) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "reload", { value: function(){ console.log("location.reload") }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "replace", { value: function(u){ console.log("location.replace : ", u) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, "toString", { value: function(){ return _locationHref; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Location.prototype, Symbol.toStringTag, { value: "Location", writable: false, enumerable: false, configurable: true });


/* ---- History.prototype ---- */
Object.defineProperty(History.prototype, "length", { get: function(){ return 1; }, enumerable: true, configurable: true });
Object.defineProperty(History.prototype, "state", { get: function(){ return null; }, enumerable: true, configurable: true });
Object.defineProperty(History.prototype, "scrollRestoration", { get: function(){ return 'auto'; }, set: function(){}, enumerable: true, configurable: true });
Object.defineProperty(History.prototype, "back", { value: function(){ console.log("history.back") }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(History.prototype, "forward", { value: function(){ console.log("history.forward") }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(History.prototype, "go", { value: function(n){ console.log("history.go : ", n) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(History.prototype, "pushState", { value: function(a, b, c){ console.log("history.pushState : ", a, b, c) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(History.prototype, "replaceState", { value: function(a, b, c){ console.log("history.replaceState : ", a, b, c) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(History.prototype, Symbol.toStringTag, { value: "History", writable: false, enumerable: false, configurable: true });


/* ---- Storage.prototype ---- */
Object.defineProperty(Storage.prototype, "setItem", { value: function(k, v){ this[k] = v }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Storage.prototype, "getItem", { value: function(k){ return (k in this) ? this[k] : null; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Storage.prototype, "removeItem", { value: function(k){ delete this[k] }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Storage.prototype, "key", { value: function(i){ return Object.keys(this)[i] || null; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Storage.prototype, "clear", { value: function(){ var keys = Object.keys(this); for (var i = 0; i < keys.length; i++) delete this[keys[i]]; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Storage.prototype, "length", { get: function(){ return Object.keys(this).length; }, enumerable: true, configurable: true });
Object.defineProperty(Storage.prototype, Symbol.toStringTag, { value: "Storage", writable: false, enumerable: false, configurable: true });


/* ---- Navigator.prototype ---- */
Object.defineProperty(Navigator.prototype, "userAgent", { get: function(){ return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "platform", { get: function(){ return 'Win32'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "language", { get: function(){ return 'zh-CN'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "languages", { get: function(){ return ['zh-CN', 'zh']; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "cookieEnabled", { get: function(){ return true; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "onLine", { get: function(){ return true; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "hardwareConcurrency", { get: function(){ return 16; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "deviceMemory", { get: function(){ return 8; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "webdriver", { get: function(){ return false; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "appCodeName", { get: function(){ return 'Mozilla'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "appName", { get: function(){ return 'Netscape'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "appVersion", { get: function(){ return '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "product", { get: function(){ return 'Gecko'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "productSub", { get: function(){ return '20030107'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "vendor", { get: function(){ return 'Google Inc.'; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "vendorSub", { get: function(){ return ''; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "maxTouchPoints", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "pdfViewerEnabled", { get: function(){ return true; }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "userAgentData", { get: function(){
        return {
            brands: [{ brand: "Not)A;Brand", version: "8" }, { brand: "Chromium", version: "138" }, { brand: "Google Chrome", version: "138" }],
            mobile: false,
            platform: "Windows",
            getHighEntropyValues: function(hints){ return Promise.resolve({ architecture: "x86", bitness: "64", model: "", platformVersion: "15.0.0", uaFullVersion: "138.0.0.0", fullVersionList: [{ brand: "Not)A;Brand", version: "8.0.0.0" }, { brand: "Chromium", version: "138.0.0.0" }, { brand: "Google Chrome", version: "138.0.0.0" }], wow64: false }); },
            toJSON: function(){ return { brands: this.brands, mobile: this.mobile, platform: this.platform }; }
        };
    }, enumerable: true, configurable: true });
/* PluginArray / MimeTypeArray：真实是类数组对象（Array.isArray=false），有 item/namedItem/refresh */
var _PluginArrayProto = { item: function (i) { return this[i] || null; }, namedItem: function (n) { return this[n] || null; }, refresh: function () {} };
var _PluginProto = { item: function (i) { return this[i] || null; }, namedItem: function (n) { return this[n] || null; } };
function _makePlugin(name, filename, description, mimeTypes) {
    var p = Object.create(_PluginProto);
    p.name = name; p.filename = filename; p.description = description;
    p.length = mimeTypes.length;
    for (var i = 0; i < mimeTypes.length; i++) { p[i] = mimeTypes[i]; p[mimeTypes[i].type] = mimeTypes[i]; }
    Object.defineProperty(p, Symbol.toStringTag, { value: "Plugin", configurable: true });
    return p;
}
function _makeMimeType(type, suffixes, description) {
    var m = { type: type, suffixes: suffixes, description: description, enabledPlugin: null };
    Object.defineProperty(m, Symbol.toStringTag, { value: "MimeType", configurable: true });
    return m;
}
var _pdfMime = _makeMimeType('application/pdf', 'pdf', 'Portable Document Format');
var _pdfPlugin = _makePlugin('PDF Viewer', 'internal-pdf-viewer', 'Portable Document Format', [_pdfMime]);
Object.defineProperty(Navigator.prototype, "plugins", { get: function(){
        var arr = Object.create(_PluginArrayProto);
        arr.length = 1; arr[0] = _pdfPlugin;
        arr['PDF Viewer'] = _pdfPlugin;
        Object.defineProperty(arr, Symbol.toStringTag, { value: "PluginArray", configurable: true });
        return arr;
    }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "mimeTypes", { get: function(){
        var arr = Object.create(_PluginArrayProto);
        arr.length = 1; arr[0] = _pdfMime;
        arr['application/pdf'] = _pdfMime;
        Object.defineProperty(arr, Symbol.toStringTag, { value: "MimeTypeArray", configurable: true });
        return arr;
    }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "connection", { get: function(){
        return { effectiveType: "4g", rtt: 50, downlink: 10, saveData: false, onchange: null, addEventListener: function(){}, removeEventListener: function(){} };
    }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "permissions", { get: function(){
        return { query: function(p){ console.log("navigator.permissions.query : ", p); return Promise.resolve({ state: "granted", name: p && p.name }); } };
    }, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "sendBeacon", { value: function(u, d){ console.log("navigator.sendBeacon : ", u, d); return true; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "getBattery", { value: function(){
        return Promise.resolve({ charging: true, chargingTime: 0, dischargingTime: Infinity, level: 1, onchargingchange: null, onchargingtimechange: null, ondischargingtimechange: null, onlevelchange: null });
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "getGamepads", { value: function(){ return []; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, "javaEnabled", { value: function(s){ console.log("navigator.javaEnabled : ", s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Navigator.prototype, Symbol.toStringTag, { value: "Navigator", writable: false, enumerable: false, configurable: true });


/* ---- Performance.prototype ---- */
var _perfStart = Math.round((Date.now() + Math.random()) * 10) / 10; /* 高精度 timeOrigin：整数毫秒+0.1精度小数（真实浏览器带小数） */
var _perfNow = 0;
var _perfLastTs = Date.now();
var _perfMarks = [];
var _perfTiming = (function () {
    var b = Math.floor(_perfStart); /* navigationStart 是整数毫秒（真实与 timeOrigin 差小数部分） */
    return {
        navigationStart: b, unloadEventStart: 0, unloadEventEnd: 0,
        redirectStart: 0, redirectEnd: 0,
        fetchStart: b + 1, domainLookupStart: b + 5, domainLookupEnd: b + 17,
        connectStart: b + 17, secureConnectionStart: b + 268, connectEnd: b + 514,
        requestStart: b + 514, responseStart: b + 774, responseEnd: b + 775,
        domLoading: b + 781, domInteractive: b + 858,
        domContentLoadedEventStart: b + 858, domContentLoadedEventEnd: b + 858,
        domComplete: b + 979, loadEventStart: b + 979, loadEventEnd: b + 979
    };
})();
var _perfNavigation = { type: 0, redirectCount: 0 };
Object.defineProperty(Performance.prototype, "now", { value: function(){
        var t = Date.now();
        _perfNow += Math.max(0.005, (t - _perfLastTs) + Math.random() * 0.1);
        _perfLastTs = t;
        return _perfNow;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "timeOrigin", { get: function(){ return _perfStart; }, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "timing", { get: function(){
        return _perfTiming;
    }, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "navigation", { get: function(){ return _perfNavigation; }, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "memory", { get: function(){
        /* 真实浏览器：连续两次读相同、随时间缓慢增长（非每次随机） */
        var grow = Math.floor((Date.now() - _perfStart) / 1000) * 3;
        return { jsHeapSizeLimit: 4294705152, totalJSHeapSize: 15573672 + grow, usedJSHeapSize: 11267836 + grow };
    }, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "getEntries", { value: function(){
        var url = (typeof location !== 'undefined' && location.href) ? location.href : '';
        return [
            { name: url, entryType: "navigation", startTime: 0, duration: 979.6,
                initiatorType: "navigation", transferSize: 618, encodedBodySize: 318, decodedBodySize: 559 },
            { name: "hidden", entryType: "visibility-state", startTime: 0, duration: 0 },
            { name: "visible", entryType: "visibility-state", startTime: 977.8, duration: 0 },
            { name: "first-paint", entryType: "paint", startTime: 992, duration: 0 },
            { name: "first-contentful-paint", entryType: "paint", startTime: 992, duration: 0 }
        ].concat(_perfMarks);
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "getEntriesByType", { value: function(type){
        if (type === "navigation") return [this.getEntries()[0]];
        if (type === "paint") return this.getEntries().filter(function(e){ return e.entryType === "paint"; });
        if (type === "mark") return _perfMarks.filter(function(e){ return e.entryType === "mark"; });
        if (type === "visibility-state") return this.getEntries().filter(function(e){ return e.entryType === "visibility-state"; });
        return [];
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "getEntriesByName", { value: function (name, type) {
        name = String(name);
        var all = this.getEntries();
        var out = [];
        for (var i = 0; i < all.length; i++) {
            if (all[i].name === name && (!type || all[i].entryType === type)) out.push(all[i]);
        }
        return out;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "mark", { value: function(name){
        _perfMarks.push({ name: name, entryType: "mark", startTime: performance.now(), duration: 0 });
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, "measure", { value: function(s){ console.log("performance.measure: ", s) }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Performance.prototype, Symbol.toStringTag, { value: "Performance", writable: false, enumerable: false, configurable: true });


/* ---- Screen.prototype ---- */
Object.defineProperty(Screen.prototype, "width", { get: function(){ return 1536; }, enumerable: true, configurable: true });
Object.defineProperty(Screen.prototype, "height", { get: function(){ return 864; }, enumerable: true, configurable: true });
Object.defineProperty(Screen.prototype, "availWidth", { get: function(){ return 1536; }, enumerable: true, configurable: true });
Object.defineProperty(Screen.prototype, "availHeight", { get: function(){ return 816; }, enumerable: true, configurable: true });
Object.defineProperty(Screen.prototype, "colorDepth", { get: function(){ return 24; }, enumerable: true, configurable: true });
Object.defineProperty(Screen.prototype, "pixelDepth", { get: function(){ return 24; }, enumerable: true, configurable: true });
Object.defineProperty(Screen.prototype, "orientation", { get: function(){
        var o = { type: 'landscape-primary', angle: 0, onchange: null, addEventListener: function(){}, removeEventListener: function(){} };
        Object.defineProperty(o, Symbol.toStringTag, { value: 'ScreenOrientation', configurable: true });
        return o;
    }, enumerable: true, configurable: true });
Object.defineProperty(Screen.prototype, Symbol.toStringTag, { value: "Screen", writable: false, enumerable: false, configurable: true });


/* ---- CacheStorage.prototype / Crypto.prototype / IDBFactory.prototype ---- */
Object.defineProperty(Crypto.prototype, "getRandomValues", { value: function(arr){
        for (var i = 0; i < arr.length; i++) arr[i] = (Math.random() * 256) | 0;
        return arr;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Crypto.prototype, "randomUUID", { value: function () {
        var b = new Uint8Array(16);
        for (var i = 0; i < 16; i++) b[i] = (Math.random() * 256) | 0;
        b[6] = (b[6] & 0x0f) | 0x40;
        b[8] = (b[8] & 0x3f) | 0x80;
        var hex = [];
        for (var j = 0; j < 16; j++) hex.push((b[j] < 16 ? '0' : '') + b[j].toString(16));
        return hex[0] + hex[1] + hex[2] + hex[3] + '-' + hex[4] + hex[5] + '-' + hex[6] + hex[7] + '-' +
            hex[8] + hex[9] + '-' + hex[10] + hex[11] + hex[12] + hex[13] + hex[14] + hex[15];
    }, writable: true, enumerable: true, configurable: true });
/* crypto.subtle：纯 JS 实现 SHA-256 digest（Promise<ArrayBuffer>）。
 * 完整 WebCrypto（RSA 签名等）请在宿主侧注入 Node 的 require('crypto').webcrypto */
function _utf8Bytes(str) {
    var out = [], i, c, c2, c3;
    for (i = 0; i < str.length; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) out.push(c);
        else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
        else if (c >= 0xD800 && c <= 0xDBFF) {
            c2 = str.charCodeAt(++i);
            c3 = ((c & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
            out.push(0xf0 | (c3 >> 18), 0x80 | ((c3 >> 12) & 63), 0x80 | ((c3 >> 6) & 63), 0x80 | (c3 & 63));
        } else out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return new Uint8Array(out);
}
function _sha256Bytes(bytes) {
    var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
        0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
        0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
        0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
        0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
        0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
        0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
        0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    var l = bytes.length;
    var bitLenHi = (l / 0x20000000) | 0;
    var bitLenLo = (l << 3) >>> 0;
    var padLen = (((l + 8) >> 6) + 1) << 6;
    var w = new Array(padLen >>> 2);
    var i, j;
    for (i = 0; i < w.length; i++) w[i] = 0;
    for (i = 0; i < l; i++) w[i >>> 2] |= bytes[i] << (24 - (i & 3) * 8);
    w[l >>> 2] |= 0x80 << (24 - (l & 3) * 8);
    w[w.length - 1] = bitLenLo >>> 0;
    w[w.length - 2] = bitLenHi >>> 0;
    var h0=H[0],h1=H[1],h2=H[2],h3=H[3],h4=H[4],h5=H[5],h6=H[6],h7=H[7];
    var a,b,c,d,e,f,g,h,S0,S1,ch,t1,t2,w15,w2,s0,s1,W;
    for (i = 0; i < w.length; i += 16) {
        W = new Array(64);
        for (j = 0; j < 16; j++) W[j] = w[i + j];
        for (j = 16; j < 64; j++) {
            w15 = W[j - 15]; w2 = W[j - 2];
            s0 = ((w15 >>> 7) | (w15 << 25)) ^ ((w15 >>> 18) | (w15 << 14)) ^ (w15 >>> 3);
            s1 = ((w2 >>> 17) | (w2 << 15)) ^ ((w2 >>> 19) | (w2 << 13)) ^ (w2 >>> 10);
            W[j] = (W[j - 16] + s0 + W[j - 7] + s1) | 0;
        }
        a = h0; b = h1; c = h2; d = h3; e = h4; f = h5; g = h6; h = h7;
        for (j = 0; j < 64; j++) {
            S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
            ch = (e & f) ^ (~e & g);
            t1 = (h + S1 + ch + K[j] + W[j]) | 0;
            S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
            t2 = (S0 + (((a & b) ^ (a & c) ^ (b & c)))) | 0;
            h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
        }
        h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0;
        h4 = (h4 + e) | 0; h5 = (h5 + f) | 0; h6 = (h6 + g) | 0; h7 = (h7 + h) | 0;
    }
    return new Uint8Array([
        (h0>>>24)&255,(h0>>>16)&255,(h0>>>8)&255,h0&255,
        (h1>>>24)&255,(h1>>>16)&255,(h1>>>8)&255,h1&255,
        (h2>>>24)&255,(h2>>>16)&255,(h2>>>8)&255,h2&255,
        (h3>>>24)&255,(h3>>>16)&255,(h3>>>8)&255,h3&255,
        (h4>>>24)&255,(h4>>>16)&255,(h4>>>8)&255,h4&255,
        (h5>>>24)&255,(h5>>>16)&255,(h5>>>8)&255,h5&255,
        (h6>>>24)&255,(h6>>>16)&255,(h6>>>8)&255,h6&255,
        (h7>>>24)&255,(h7>>>16)&255,(h7>>>8)&255,h7&255]);
}
function _SubtleCrypto() {}
_SubtleCrypto.prototype.digest = function (algorithm, data) {
    var algo = typeof algorithm === 'string' ? algorithm : (algorithm && algorithm.name);
    return Promise.resolve().then(function () {
        var bytes;
        if (typeof data === 'string') bytes = _utf8Bytes(data);
        else if (data instanceof ArrayBuffer) bytes = new Uint8Array(data);
        else if (ArrayBuffer.isView(data)) bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        else bytes = new Uint8Array(0);
        if (algo === 'SHA-256') return _sha256Bytes(bytes).buffer;
        throw new Error('[env] crypto.subtle.digest 不支持的算法: ' + algo + '（完整 WebCrypto 请在宿主注入 Node webcrypto）');
    });
};
['importKey', 'generateKey', 'sign', 'verify', 'encrypt', 'decrypt', 'deriveBits', 'deriveKey', 'exportKey', 'wrapKey', 'unwrapKey'].forEach(function (m) {
    _SubtleCrypto.prototype[m] = function () {
        return Promise.reject(new Error('[env] crypto.subtle.' + m + ' 未实现，请在宿主侧注入 Node require("crypto").webcrypto'));
    };
});
var _subtle = new _SubtleCrypto();
Object.defineProperty(Crypto.prototype, "subtle", { get: function () { return _subtle; }, enumerable: true, configurable: true });
Object.defineProperty(Crypto.prototype, Symbol.toStringTag, { value: "Crypto", writable: false, enumerable: false, configurable: true });


/* ---- Element.prototype ---- */
Object.defineProperty(Element.prototype, "getAttribute", { value: function (name) {
        console.log('document.createElement("XXX").getAttribute : ', name);
        return this['_' + name] !== undefined ? String(this['_' + name]) : null;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "nodeType", { get: function(){ return 1; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "tagName", { get: function(){ return this._tagName || 'DIV'; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "nodeName", { get: function(){ return this._tagName || 'DIV'; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "id", { get: function(){ return this._id || ''; }, set: function(v){ this._id = String(v); }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "className", { get: function(){ return this._className || ''; }, set: function(v){ this._className = String(v); }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "innerHTML", { get: function(){ return this._innerHTML || ''; }, set: function(v){ this._innerHTML = String(v); }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "outerHTML", { get: function(){ var t = this._tagName || 'DIV'; return '<' + t + '></' + t + '>'; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "textContent", { get: function(){ return this._textContent || ''; }, set: function(v){ this._textContent = String(v); }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "attributes", { get: function(){ return []; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "children", { get: function(){ return []; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "childNodes", { get: function(){ return []; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "firstChild", { get: function(){ return null; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "lastChild", { get: function(){ return null; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "style", { get: function () {
        var el = this;
        if (!el._styleData) el._styleData = {};
        return new Proxy(el._styleData, {
            get: function (t, k) {
                if (k === 'setProperty') return function (name, val, prio) { t[name] = String(val); };
                if (k === 'getPropertyValue') return function (name) { return t[name] !== undefined ? t[name] : ''; };
                if (k === 'getPropertyPriority') return function () { return ''; };
                if (k === 'removeProperty') return function (name) { var v = t[name]; delete t[name]; return v !== undefined ? v : ''; };
                if (k === 'item') return function (i) { return Object.keys(t)[i] || null; };
                if (k === 'namedItem') return function (n) { return t[n] !== undefined ? t[n] : null; };
                if (k === 'cssText') return Object.keys(t).map(function (n) { return n + ': ' + t[n] + ';'; }).join(' ');
                if (k === 'length') return Object.keys(t).length;
                if (k === Symbol.toStringTag) return 'CSSStyleDeclaration';
                if (k === 'toString') return function () { return '[object CSSStyleDeclaration]'; };
                if (typeof k === 'string') return t[k] !== undefined ? t[k] : '';
                return t[k];
            },
            set: function (t, k, v) { t[k] = String(v); return true; }
        });
    }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "dataset", { get: function(){
        var o = {};
        Object.defineProperty(o, Symbol.toStringTag, { value: 'DOMStringMap', configurable: true });
        return o;
    }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "setAttribute", { value: function(k, v){ console.log('document.createElement("XXX").setAttribute : ', k, v); this['_' + k] = v; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "removeAttribute", { value: function(k){ console.log('document.createElement("XXX").removeAttribute : ', k); delete this['_' + k]; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "hasAttribute", { value: function(k){ return this['_' + k] !== undefined; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "hasChildNodes", { value: function(){ return false; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "contains", { value: function(){ return false; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "cloneNode", { value: function(){ return this; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "appendChild", { value: function(c){ console.log('document.createElement("XXX").appendChild : ', c); return c; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "insertBefore", { value: function(c){ console.log('document.createElement("XXX").insertBefore : ', c); return c; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "querySelector", { value: function(s){ console.log('document.createElement("XXX").querySelector : ', s); return null; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "querySelectorAll", { value: function(s){ console.log('document.createElement("XXX").querySelectorAll : ', s); return []; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "getBoundingClientRect", { value: function(){ return { x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 }; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "getClientRects", { value: function(){ return []; }, writable: true, enumerable: true, configurable: true });
/* Element 高频属性补充（真实浏览器核对） */
Object.defineProperty(Element.prototype, "classList", { get: function(){
        var el = this;
        if (!el._classList) {
            el._classList = {
                add: function () { var a = el._classList._set || (el._classList._set = {}); for (var i = 0; i < arguments.length; i++) a[arguments[i]] = true; },
                remove: function () { var a = el._classList._set || (el._classList._set = {}); for (var i = 0; i < arguments.length; i++) delete a[arguments[i]]; },
                contains: function (c) { return !!(el._classList._set && el._classList._set[c]); },
                toggle: function (c, force) { var has = this.contains(c); var want = force === undefined ? !has : !!force; if (want !== has) { if (want) this.add(c); else this.remove(c); } return want; },
                item: function (i) { return Object.keys(el._classList._set || {})[i] || null; },
                replace: function (a, b) { this.remove(a); this.add(b); },
                get length() { return Object.keys(el._classList._set || {}).length; }
            };
        }
        return el._classList;
    }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "namespaceURI", { get: function(){ return 'http://www.w3.org/1999/xhtml'; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "localName", { get: function(){ return (this._tagName || 'DIV').toLowerCase(); }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "prefix", { get: function(){ return null; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "shadowRoot", { get: function(){ return null; }, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, "slot", { get: function(){ return ''; }, set: function(){}, enumerable: true, configurable: true });
Object.defineProperty(Element.prototype, Symbol.toStringTag, { value: "Element", writable: false, enumerable: false, configurable: true });

/* ---- HTMLElement.prototype（高频：尺寸/布局/事件处理器，真实默认值） ---- */
Object.defineProperty(HTMLElement.prototype, "offsetWidth", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "offsetHeight", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "offsetTop", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "offsetLeft", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "offsetParent", { get: function(){ return null; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "clientWidth", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "clientHeight", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "clientTop", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "clientLeft", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "scrollWidth", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "scrollHeight", { get: function(){ return 0; }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "title", { get: function(){ return ''; }, set: function(){}, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "lang", { get: function(){ return ''; }, set: function(){}, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "dir", { get: function(){ return ''; }, set: function(){}, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "hidden", { get: function(){ return false; }, set: function(){}, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "innerText", { get: function(){ return this._innerText || ''; }, set: function(v){ this._innerText = String(v); }, enumerable: true, configurable: true });
Object.defineProperty(HTMLElement.prototype, "outerText", { get: function(){ return this._innerText || ''; }, set: function(v){ this._innerText = String(v); }, enumerable: true, configurable: true });
['onclick','onload','onerror','onmousedown','onmouseup','onmousemove','onmouseover','onmouseout','onmouseenter','onmouseleave',
    'onkeydown','onkeyup','onkeypress','onchange','oninput','onsubmit','onreset','onfocus','onblur','ondblclick','oncontextmenu',
    'onwheel','onscroll','onresize','onloadstart','onloadend','onprogress','onabort','onplaying','onplay','onpause','oncanplay',
    'oncanplaythrough','ontimeupdate','onvolumechange','onended','onwaiting','onseeking','onseeked','onstalled','onsuspend',
    'onloadeddata','onloadedmetadata','onbeforeunload','onbeforecopy','onbeforecut','onbeforepaste','oncopy','oncut','onpaste',
    'onselectstart','onselectionchange','onauxclick','ongotpointercapture','onlostpointercapture','onpointerdown','onpointermove',
    'onpointerup','onpointercancel','onpointerover','onpointerout','onpointerenter','onpointerleave','onpointerrawupdate',
    'ondrag','ondragstart','ondragend','ondragenter','ondragover','ondragleave','ondrop','onfocusin','onfocusout',
    'onwebkitanimationstart','onwebkitanimationiteration','onwebkitanimationend','onwebkittransitionend','onanimationstart',
    'onanimationiteration','onanimationend','ontransitionrun','ontransitionstart','ontransitionend','ontransitioncancel',
    'onvisibilitychange','onfullscreenchange','onfullscreenerror','ontoggle','onclose','onopen','onmessage'].forEach(function (n) {
    Object.defineProperty(HTMLElement.prototype, n, { get: function(){ return this['_' + n] || null; }, set: function(v){ this['_' + n] = v; }, enumerable: true, configurable: true });
});
Object.defineProperty(HTMLElement.prototype, Symbol.toStringTag, { value: "HTMLElement", writable: false, enumerable: false, configurable: true });

/* HTMLDivElement 等子元素目前无独立属性 */

/* ---- HTMLCanvasElement.prototype（含指纹 toDataURL/toBlob） ---- */
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { value: function(s){
        console.log('document.createElement("canvas").getContext : ', s)
        if (s === "2d") return _2d;
        if (s === "webgl") return webgl;
        if (s === "webgl2") return webgl2;
        if (s === "webgpu") return webgpu;
    }, writable: true, enumerable: true, configurable: true });
/* 真实采集：200x30 指纹画布 toDataURL()（PNG，指纹哈希稳定） */
var PNG_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAeCAYAAABpP1GsAAAAAXNSR0IArs4c6QAABdhJREFUeF7tWj3IHVUQPSkNWCmCjYIg2CghYBVFREGxUIkQITFpLFQQFEEQLNRCEfxBQTAKNv5WtiGNRVBBESxsFARFG/GvUqz9TrhHToa7d/fd9/Z9vuy86n3f7t5758ycmTOz7wDykwgkAoMIHEhsEoFEYBiBJEhGRyLQQKBGkIMAXgXwkD13CsB7+4DkSQDvln0fAMC/Hwfw3QbOch2A18p6vwN4H8DzAD7bwNpxiWfKP55bc+3LNnTOTa2zpjnNx28CQJ8/AeCfDW/kvm/GUiQIH/ygBI4IITC/ALCug1exU0Rl4M4RtEmQ+RLCKn4eundOgkw+nxNEAfl5pVoomJ4C8DAAv4fZ8UpjOgnFTPw0gEcB/ArgUKlIXwM4AeD+vRM+W05Zq04i5Z3lnrcAnAbwolWQeI+vw0pzxR6xbgfANW4uJONZte/LAK4PFYRJQNe5p2cvOuxTQ/ZsyXB/lsp2A4BLrfL6ebyCCOer7Xl3WKzgjwC4t1Lp+AwxZpblGfih3UfKuZ8cwJ4Z05Oe7HV7uJZjFa/pvLVMzLXfKMmUe0Xc5Ita4uW9rxcFw8TIz9DeEaejAI6VfWuKwLG5ytTDjaZS3A/nz+kEmVp2uNE15SA1Z9PI28p1gnx3IQXBEugKHt4bnaxDxgpSy/gfFjILbP0tKUYyqoQ6kbkHZSTB4T0ClP9XwPn9h4vjtF50rqSgnC9H634R5KWy7y+NajzlnExA3wa5FfES1rUzyd6fCpmEh87lwUR5E/+OPvKE6ZmfuLl/Y4y1qvhYBZmKk9THEEGixLog4TtBWsHqzKJRXITVgR86ix9JIV77xDI2r0maxT1itqllUq3rYDKwlSmlT33tu8L1muYek1hjCcOrQgyguJ/ulX1DUrWGh5MtZkau+0NJEu4XVpTY97hCOFPpZdyG+yr4um/8e7RdZ/rYKoFLZE+wqlRUIH8B+DvEylAPUvNnC6dYXb2COEF4tuNelXsI4k68vFQLOokfAi95VXNSzAq9BKFEc+LxuwdIJMiYFGDguSzgekOkYo/GzMgP5QmDfQpBWpJSAReDXHYNDRNitlblVuCJPFpfpKGtcSjhNlxSrlOeShYPNbMx0QhHkVky2Ukl3Bxnfne52KogU/zZsq9GEPXfj3nP2yOxHHwZ/RWABwF8BODWPS3+SrkQs9iuEuSPMrwgMbyfEUmnEIRZ8m0ALzQmcasSxBMMk4Yq97oEUVV2nT/WC1Bm/WiTJ5FsbDKoRMSe0SXxNgkSJfp/ZJ7apMdsysPfU1Z5p2h4AvE9gC+NgXMRZNsSi/up74rZeGoFEZniUMMz66oSS0SgNLm26H017OtIrDhWHRsLK0FQJn1TJF9r6OM2u/z0YU+LID2SudWDDPpklTGvGjqCp3L0W2hqvSGX81wKbaqCqHy3mvTYozhAPFOtSV+laeX7mVUklnAYzFZWdRUoQ+f0rKwpkcsWYe/+8B6N11sSJPYgY/2p4sErLPeIw4pImtqZ5NOxJr3lz5/DMESYy79xinVB3+Hsrb0ojONT3h9HsTLUpzG1ScdcFcRHldK4ccwbCaKgUS8Qx6fUzucAvFkA8jFvHClyDep7ATs2FKjhwHGmSwr5pTbmvcWGIjGwh7K7siLHybGXqD1TCzi9LB7rQ1qja3/Z67FUe+dWa7Sj9IrVpza2Z3w4aSkPKW/vKFM7EUSvLfyluNZnPJ3ZpZ+a1PS5g3Wxfh+z2987SV7VqvfFio/sGps6dtm/SwQZK/NdAPzPHqpl9rGfqfh7p5q23+avH/YTzjkIcnBXCBJfMO6nI+beO755jr1FlGJDb+THiDW3Hdtefw6CYFcIsm2wc79E4DwCSZAMhESggUASJMMjEUiCZAwkAn0IZAXpwy2fWggCSZCFODrN7EMgCdKHWz61EASSIAtxdJrZh0ASpA+3fGohCCRBFuLoNLMPgSRIH2751EIQSIIsxNFpZh8CSZA+3PKphSCQBFmIo9PMPgT+BdOwnlr5XatxAAAAAElFTkSuQmCC";
Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", { value: function(type, quality){ console.log("HTMLCanvasElement.toDataURL : ", type, quality); return PNG_DATA_URL; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", { value: function(cb, type, quality){ console.log("HTMLCanvasElement.toBlob : ", type, quality); cb({ type: type || 'image/png', size: PNG_DATA_URL.length, slice: function(){ return null; } }); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(HTMLCanvasElement.prototype, Symbol.toStringTag, { value: "HTMLCanvasElement", writable: false, enumerable: false, configurable: true });

/* ---- CanvasRenderingContext2D.prototype（2D 指纹伪造） ---- */
var CTX_PROPS = [
    ['font', '10px sans-serif'], ['textAlign', 'start'], ['textBaseline', 'alphabetic'],
    ['direction', 'inherit'], ['globalCompositeOperation', 'source-over'],
    ['globalAlpha', 1], ['imageSmoothingEnabled', true], ['imageSmoothingQuality', 'low'],
    ['strokeStyle', '#000000'], ['fillStyle', '#000000'],
    ['shadowBlur', 0], ['shadowColor', 'rgba(0, 0, 0, 0)'], ['shadowOffsetX', 0], ['shadowOffsetY', 0],
    ['lineCap', 'butt'], ['lineDashOffset', 0], ['lineJoin', 'miter'], ['lineWidth', 1], ['miterLimit', 10]
];
CTX_PROPS.forEach(function (p) {
    Object.defineProperty(CanvasRenderingContext2D.prototype, p[0], {
        get: function () { return this['_' + p[0]] === undefined ? p[1] : this['_' + p[0]]; },
        set: function (v) { this['_' + p[0]] = v; },
        enumerable: true, configurable: true
    });
});
Object.defineProperty(CanvasRenderingContext2D.prototype, "canvas", { get: function(){ return this._canvas || undefined; }, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "measureText", { value: function (text) {
        text = String(text);
        var size = 10, m = /(\d+(?:\.\d+)?)px/.exec(this._font || '10px sans-serif');
        if (m) size = parseFloat(m[1]);
        var w = 0, i, c;
        for (i = 0; i < text.length; i++) {
            c = text.charCodeAt(i);
            w += (c >= 0x2E80) ? size : (c >= 0x20 ? size * 0.55 : 0);
        }
        return {
            width: w,
            actualBoundingBoxLeft: 0, actualBoundingBoxRight: w,
            actualBoundingBoxAscent: size * 0.8, actualBoundingBoxDescent: size * 0.2,
            fontBoundingBoxAscent: size * 0.8, fontBoundingBoxDescent: size * 0.2,
            alphabeticBaseline: 0, emHeightAscent: size * 0.8, emHeightDescent: size * 0.2,
            hangingBaseline: 0, ideographicBaseline: 0
        };
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "getImageData", { value: function (x, y, w, h) {
        x = x | 0; y = y | 0; w = w | 0; h = h | 0;
        var data = new Uint8ClampedArray(w * h * 4);
        var seed = (this._seed === undefined ? 0 : this._seed) | 0;
        var i, px, cx, cy;
        for (i = 0, px = 0; i < data.length; i += 4, px++) {
            cx = (px % w) + x; cy = ((px / w) | 0) + y;
            data[i] = (cx * 7 + cy * 13 + seed + 50) & 255;
            data[i + 1] = (cx * 11 + cy * 17 + seed * 2 + 60) & 255;
            data[i + 2] = (cx * 19 + cy * 23 + seed * 3 + 90) & 255;
            data[i + 3] = 255;
        }
        return { width: w, height: h, data: data };
    }, writable: true, enumerable: true, configurable: true });
function _ctxGradient() { return { addColorStop: function (offset, color) { console.log("ctx.addColorStop : ", offset, color); } }; }
function _ctxMatrix() { return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, m11: 1, m12: 0, m21: 0, m22: 1, m41: 0, m42: 0 }; }
Object.defineProperty(CanvasRenderingContext2D.prototype, "createLinearGradient", { value: function (x0, y0, x1, y1) { console.log("ctx.createLinearGradient"); return _ctxGradient(); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "createRadialGradient", { value: function () { console.log("ctx.createRadialGradient"); return _ctxGradient(); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "createConicGradient", { value: function () { console.log("ctx.createConicGradient"); return _ctxGradient(); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "createPattern", { value: function (img, rep) { console.log("ctx.createPattern"); return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "getTransform", { value: function () { return _ctxMatrix(); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "getLineDash", { value: function () { return []; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "setLineDash", { value: function (d) { console.log("ctx.setLineDash"); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "isPointInPath", { value: function () { return false; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "isPointInStroke", { value: function () { return false; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "isContextLost", { value: function () { return false; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, "getContextAttributes", { value: function () { return { alpha: true, desynchronized: false, colorSpace: 'srgb' }; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(CanvasRenderingContext2D.prototype, Symbol.toStringTag, { value: "CanvasRenderingContext2D", writable: false, enumerable: false, configurable: true });
var CTX_DRAW = ["fillText", "strokeText", "fillRect", "strokeRect", "clearRect", "beginPath", "closePath",
    "moveTo", "lineTo", "rect", "arc", "arcTo", "ellipse", "quadraticCurveTo", "bezierCurveTo",
    "fill", "stroke", "clip", "save", "restore", "translate", "rotate", "scale", "transform", "setTransform",
    "resetTransform", "drawImage", "putImageData", "drawFocusIfNeeded", "roundRect", "reset", "filter"];
CTX_DRAW.forEach(function (n) {
    Object.defineProperty(CanvasRenderingContext2D.prototype, n, { value: function (a, b, c, d, e, f) { console.log("ctx." + n); }, writable: true, enumerable: true, configurable: true });
});

/* ---- WebGLRenderingContext.prototype（WebGL1 指纹伪造） ---- */
var WEBGL_UNMASKED_VENDOR = "Google Inc. (NVIDIA)";
var WEBGL_UNMASKED_RENDERER = "ANGLE (NVIDIA, NVIDIA GeForce RTX 4050 Laptop GPU (0x000028E1) Direct3D11 vs_5_0 ps_5_0, D3D11)";
var WEBGL1_CONSTS = {
    "VERSION": 0x1F02, "VENDOR": 0x1F00, "RENDERER": 0x1F01, "SHADING_LANGUAGE_VERSION": 0x8B8C,
    "NO_ERROR": 0, "INVALID_ENUM": 0x0500, "INVALID_VALUE": 0x0501, "INVALID_OPERATION": 0x0502,
    "INVALID_FRAMEBUFFER_OPERATION": 0x0506, "OUT_OF_MEMORY": 0x0505,
    "BYTE": 0x1400, "UNSIGNED_BYTE": 0x1401, "SHORT": 0x1402, "UNSIGNED_SHORT": 0x1403,
    "INT": 0x1404, "UNSIGNED_INT": 0x1405, "FLOAT": 0x1406,
    "BOOL": 0x8B56, "BOOL_VEC2": 0x8B57, "BOOL_VEC3": 0x8B58, "BOOL_VEC4": 0x8B59,
    "INT_VEC2": 0x8B53, "INT_VEC3": 0x8B54, "INT_VEC4": 0x8B55,
    "FLOAT_VEC2": 0x8B50, "FLOAT_VEC3": 0x8B51, "FLOAT_VEC4": 0x8B52,
    "FLOAT_MAT2": 0x8B5A, "FLOAT_MAT3": 0x8B5B, "FLOAT_MAT4": 0x8B5C,
    "FLOAT_MAT2x3": 0x8B65, "FLOAT_MAT2x4": 0x8B66, "FLOAT_MAT3x2": 0x8B67,
    "FLOAT_MAT3x4": 0x8B68, "FLOAT_MAT4x2": 0x8B69, "FLOAT_MAT4x3": 0x8B6A,
    "SAMPLER_2D": 0x8B5E, "SAMPLER_CUBE": 0x8B60,
    "LOW_FLOAT": 0x1406, "MEDIUM_FLOAT": 0x1406, "HIGH_FLOAT": 0x1406,
    "LOW_INT": 0x1404, "MEDIUM_INT": 0x1404, "HIGH_INT": 0x1404,
    "ARRAY_BUFFER": 0x8892, "ELEMENT_ARRAY_BUFFER": 0x8893,
    "ARRAY_BUFFER_BINDING": 0x8894, "ELEMENT_ARRAY_BUFFER_BINDING": 0x8895,
    "STATIC_DRAW": 0x88E4, "DYNAMIC_DRAW": 0x88E8, "STREAM_DRAW": 0x88E0,
    "BUFFER_SIZE": 0x8764, "BUFFER_USAGE": 0x8765,
    "TEXTURE_2D": 0x0DE1, "TEXTURE_CUBE_MAP": 0x8513,
    "TEXTURE_CUBE_MAP_POSITIVE_X": 0x8515, "TEXTURE_CUBE_MAP_NEGATIVE_X": 0x8516,
    "TEXTURE_CUBE_MAP_POSITIVE_Y": 0x8517, "TEXTURE_CUBE_MAP_NEGATIVE_Y": 0x8518,
    "TEXTURE_CUBE_MAP_POSITIVE_Z": 0x8519, "TEXTURE_CUBE_MAP_NEGATIVE_Z": 0x851A,
    "TEXTURE_MIN_FILTER": 0x2801, "TEXTURE_MAG_FILTER": 0x2800,
    "TEXTURE_WRAP_S": 0x2802, "TEXTURE_WRAP_T": 0x2803,
    "TEXTURE0": 0x84C0, "TEXTURE1": 0x84C1, "TEXTURE2": 0x84C2, "TEXTURE3": 0x84C3,
    "TEXTURE4": 0x84C4, "TEXTURE5": 0x84C5, "TEXTURE6": 0x84C6, "TEXTURE7": 0x84C7,
    "ACTIVE_TEXTURE": 0x84E0,
    "NEAREST": 0x2600, "LINEAR": 0x2601,
    "NEAREST_MIPMAP_NEAREST": 0x2700, "LINEAR_MIPMAP_NEAREST": 0x2701,
    "NEAREST_MIPMAP_LINEAR": 0x2702, "LINEAR_MIPMAP_LINEAR": 0x2703,
    "REPEAT": 0x2901, "CLAMP_TO_EDGE": 0x812F, "MIRRORED_REPEAT": 0x8370,
    "TEXTURE_BINDING_2D": 0x8069, "TEXTURE_BINDING_CUBE_MAP": 0x8514,
    "COMPRESSED_TEXTURE_FORMATS": 0x86A3,
    "RGBA": 0x1908, "RGB": 0x1907, "LUMINANCE": 0x1909, "LUMINANCE_ALPHA": 0x190A,
    "RGBA4": 0x8056, "RGB5_A1": 0x8057, "RGB565": 0x8D62, "DEPTH_COMPONENT16": 0x81A5,
    "UNSIGNED_SHORT_4_4_4_4": 0x8033, "UNSIGNED_SHORT_5_5_5_1": 0x8034, "UNSIGNED_SHORT_5_6_5": 0x8363,
    "IMPLEMENTATION_COLOR_READ_FORMAT": 0x8B9B, "IMPLEMENTATION_COLOR_READ_TYPE": 0x8B9A,
    "POINTS": 0x0000, "LINES": 0x0001, "LINE_LOOP": 0x0002, "LINE_STRIP": 0x0003,
    "TRIANGLES": 0x0004, "TRIANGLE_STRIP": 0x0005, "TRIANGLE_FAN": 0x0006,
    "BLEND": 0x0BE2, "CULL_FACE": 0x0B44, "DEPTH_TEST": 0x0B71, "DITHER": 0x0BD0,
    "POLYGON_OFFSET_FILL": 0x8037, "SAMPLE_ALPHA_TO_COVERAGE": 0x809E,
    "SAMPLE_COVERAGE": 0x80A0, "SCISSOR_TEST": 0x0C11,
    "FRONT": 0x0404, "BACK": 0x0405, "FRONT_AND_BACK": 0x0408, "CW": 0x0900, "CCW": 0x0901,
    "NEVER": 0x0200, "LESS": 0x0201, "EQUAL": 0x0202, "LEQUAL": 0x0203, "GREATER": 0x0204,
    "NOTEQUAL": 0x0205, "GEQUAL": 0x0206, "ALWAYS": 0x0207,
    "KEEP": 0x1E00, "REPLACE": 0x1E01, "INCR": 0x1E02, "DECR": 0x1E03, "INVERT": 0x150A,
    "INCR_WRAP": 0x1E07, "DECR_WRAP": 0x1E05,
    "ZERO": 0, "ONE": 1, "SRC_COLOR": 0x0300, "ONE_MINUS_SRC_COLOR": 0x0301,
    "SRC_ALPHA": 0x0302, "ONE_MINUS_SRC_ALPHA": 0x0303, "DST_ALPHA": 0x0304,
    "ONE_MINUS_DST_ALPHA": 0x0305, "DST_COLOR": 0x0306, "ONE_MINUS_DST_COLOR": 0x0307,
    "SRC_ALPHA_SATURATE": 0x0308, "CONSTANT_COLOR": 0x8001, "ONE_MINUS_CONSTANT_COLOR": 0x8002,
    "CONSTANT_ALPHA": 0x8003, "ONE_MINUS_CONSTANT_ALPHA": 0x8004,
    "FUNC_ADD": 0x8006, "FUNC_SUBTRACT": 0x800A, "FUNC_REVERSE_SUBTRACT": 0x800B,
    "BLEND_EQUATION": 0x8009, "BLEND_EQUATION_RGB": 0x8009, "BLEND_EQUATION_ALPHA": 0x883D,
    "BLEND_DST_RGB": 0x80C8, "BLEND_SRC_RGB": 0x80C9, "BLEND_DST_ALPHA": 0x80CA, "BLEND_SRC_ALPHA": 0x80CB,
    "VERTEX_SHADER": 0x8B31, "FRAGMENT_SHADER": 0x8B30,
    "COMPILE_STATUS": 0x8B81, "LINK_STATUS": 0x8B82, "VALIDATE_STATUS": 0x8B83,
    "DELETE_STATUS": 0x8B80, "SHADER_TYPE": 0x8B4F, "SHADER_SOURCE_LENGTH": 0x8B88,
    "ACTIVE_UNIFORMS": 0x8B86, "ACTIVE_ATTRIBUTES": 0x8B89, "CURRENT_PROGRAM": 0x8B8D,
    "FRAMEBUFFER": 0x8D40, "RENDERBUFFER": 0x8D41,
    "FRAMEBUFFER_BINDING": 0x8CA6, "RENDERBUFFER_BINDING": 0x8CA7,
    "COLOR_ATTACHMENT0": 0x8CE0, "DEPTH_ATTACHMENT": 0x8D00, "STENCIL_ATTACHMENT": 0x8D20,
    "DEPTH_STENCIL_ATTACHMENT": 0x821A,
    "FRAMEBUFFER_COMPLETE": 0x8CD5, "FRAMEBUFFER_INCOMPLETE_ATTACHMENT": 0x8CD6,
    "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT": 0x8CD7,
    "FRAMEBUFFER_INCOMPLETE_DIMENSIONS": 0x8CD9, "FRAMEBUFFER_UNSUPPORTED": 0x8CDD,
    "VERTEX_ATTRIB_ARRAY_ENABLED": 0x8622, "VERTEX_ATTRIB_ARRAY_SIZE": 0x8623,
    "VERTEX_ATTRIB_ARRAY_STRIDE": 0x8624, "VERTEX_ATTRIB_ARRAY_TYPE": 0x8625,
    "VERTEX_ATTRIB_ARRAY_NORMALIZED": 0x886A, "VERTEX_ATTRIB_ARRAY_POINTER": 0x8645,
    "CURRENT_VERTEX_ATTRIB": 0x8626,
    "VIEWPORT": 0x0BA2, "SCISSOR_BOX": 0x0C10, "COLOR_CLEAR_VALUE": 0x0C22,
    "COLOR_WRITEMASK": 0x0C23, "DEPTH_RANGE": 0x0B70, "DEPTH_CLEAR_VALUE": 0x0B73,
    "DEPTH_FUNC": 0x0B74, "DEPTH_WRITEMASK": 0x0B72, "STENCIL_CLEAR_VALUE": 0x0B91,
    "STENCIL_FUNC": 0x0B92, "STENCIL_REF": 0x0B97, "STENCIL_VALUE_MASK": 0x0B93,
    "STENCIL_FAIL": 0x0B94, "STENCIL_PASS_DEPTH_FAIL": 0x0B95, "STENCIL_PASS_DEPTH_PASS": 0x0B96,
    "STENCIL_TEST": 0x0B90, "STENCIL_WRITEMASK": 0x0B98, "LINE_WIDTH": 0x0B21,
    "POLYGON_OFFSET_FACTOR": 0x8038, "POLYGON_OFFSET_UNITS": 0x2A00,
    "GENERATE_MIPMAP_HINT": 0x8192, "PACK_ALIGNMENT": 0x0D05, "UNPACK_ALIGNMENT": 0x0CF5,
    "CULL_FACE_MODE": 0x0B45, "FRONT_FACE": 0x0B46,
    "COLOR_BUFFER_BIT": 0x00004000, "DEPTH_BUFFER_BIT": 0x00000100, "STENCIL_BUFFER_BIT": 0x00000400,
    "MAX_TEXTURE_SIZE": 0x0D33, "MAX_CUBE_MAP_TEXTURE_SIZE": 0x851C, "MAX_RENDERBUFFER_SIZE": 0x84E8,
    "MAX_VIEWPORT_DIMS": 0x0D3A, "MAX_VERTEX_ATTRIBS": 0x8869, "MAX_TEXTURE_IMAGE_UNITS": 0x8872,
    "MAX_VERTEX_TEXTURE_IMAGE_UNITS": 0x8B4C, "MAX_COMBINED_TEXTURE_IMAGE_UNITS": 0x8B4D,
    "MAX_VERTEX_UNIFORM_VECTORS": 0x8DFB, "MAX_FRAGMENT_UNIFORM_VECTORS": 0x8DFD,
    "MAX_VARYING_VECTORS": 0x8DFC, "SUBPIXEL_BITS": 0x0D50, "RED_BITS": 0x0D52, "GREEN_BITS": 0x0D53,
    "BLUE_BITS": 0x0D54, "ALPHA_BITS": 0x0D55, "DEPTH_BITS": 0x0D56, "STENCIL_BITS": 0x0D57,
    "SAMPLE_BUFFERS": 0x80A8, "SAMPLES": 0x80A9, "SAMPLE_COVERAGE_VALUE": 0x80AA,
    "SAMPLE_COVERAGE_INVERT": 0x80AB, "ALIASED_POINT_SIZE_RANGE": 0x846D,
    "ALIASED_LINE_WIDTH_RANGE": 0x846E, "SHADER_COMPILER": 0x8DFA,
    "BROWSER_DEFAULT_WEBGL": 0x9244, "CONTEXT_LOST_WEBGL": 0x9242,
    "UNPACK_FLIP_Y_WEBGL": 0x9240, "UNPACK_PREMULTIPLY_ALPHA_WEBGL": 0x9241,
    "UNPACK_COLORSPACE_CONVERSION_WEBGL": 0x9243
};
Object.keys(WEBGL1_CONSTS).forEach(function (k) {
    Object.defineProperty(WebGLRenderingContext.prototype, k, { value: WEBGL1_CONSTS[k], writable: false, enumerable: true, configurable: true });
});
var WEBGL1_INFO = {
    "0x1F00": "WebKit",
    "0x1F01": "WebKit WebGL",
    "0x1F02": "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
    "0x8B8C": "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
    "0x9245": WEBGL_UNMASKED_VENDOR,
    "0x9246": WEBGL_UNMASKED_RENDERER,
    "0x0D33": 16384, "0x851C": 16384, "0x84E8": 16384,
    "0x0D3A": [32767, 32767], "0x8869": 16, "0x8872": 16, "0x8B4C": 16, "0x8B4D": 32,
    "0x8DFB": 4095, "0x8DFD": 1024, "0x8DFC": 30,
    "0x0D52": 8, "0x0D53": 8, "0x0D54": 8, "0x0D55": 8, "0x0D56": 24, "0x0D57": 8, "0x0D50": 0,
    "0x80A8": 0, "0x80A9": 0, "0x80AA": 0.5, "0x80AB": false,
    "0x846D": [1, 1024], "0x846E": [1, 1024],
    "0x8B9B": 0x1908, "0x8B9A": 0x1401,
    "0x86A3": [], "0x8DFA": true,
    "0x8B8D": null
};
var WEBGL1_EXT_LIST = ["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_clip_control","EXT_color_buffer_half_float",
    "EXT_depth_clamp","EXT_disjoint_timer_query","EXT_float_blend","EXT_frag_depth","EXT_polygon_offset_clamp",
    "EXT_shader_texture_lod","EXT_texture_compression_bptc","EXT_texture_compression_rgtc",
    "EXT_texture_filter_anisotropic","EXT_texture_mirror_clamp_to_edge","EXT_sRGB","KHR_parallel_shader_compile",
    "OES_element_index_uint","OES_fbo_render_mipmap","OES_standard_derivatives","OES_texture_float",
    "OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object",
    "WEBGL_blend_func_extended","WEBGL_color_buffer_float","WEBGL_compressed_texture_s3tc",
    "WEBGL_compressed_texture_s3tc_srgb","WEBGL_debug_renderer_info","WEBGL_debug_shaders",
    "WEBGL_depth_texture","WEBGL_draw_buffers","WEBGL_lose_context","WEBGL_multi_draw","WEBGL_polygon_mode"];
function _webglPrecision(shaderType, precisionType) {
    var p = precisionType === 0x1406 ? { rangeMin: 127, rangeMax: 127, precision: 23 } : { rangeMin: 31, rangeMax: 30, precision: 0 };
    return { rangeMin: p.rangeMin, rangeMax: p.rangeMax, precision: p.precision };
}
function _webglLookup(map, pname) {
    var n = Number(pname);
    for (var k in map) if (parseInt(k, 16) === n) return map[k];
    return null;
}
Object.defineProperty(WebGLRenderingContext.prototype, "getParameter", { value: function (pname) {
        var v = _webglLookup(WEBGL1_INFO, pname);
        return v === null ? null : v;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getExtension", { value: function (name) {
        if (name === 'WEBGL_debug_renderer_info') return { UNMASKED_VENDOR_WEBGL: 0x9245, UNMASKED_RENDERER_WEBGL: 0x9246 };
        if (WEBGL1_EXT_LIST.indexOf(name) >= 0) return {};
        return null;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getSupportedExtensions", { value: function () { return WEBGL1_EXT_LIST.slice(); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getShaderPrecisionFormat", { value: function (shaderType, precisionType) { return _webglPrecision(shaderType, precisionType); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getContextAttributes", { value: function () {
        return { alpha: true, antialias: true, depth: true, stencil: false, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: 'default', failIfMajorPerformanceCaveat: false };
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getError", { value: function () { return 0; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getProgramParameter", { value: function (p, k) { return true; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getShaderParameter", { value: function (s, k) { return true; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getAttribLocation", { value: function (p, n) { return -1; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "getUniformLocation", { value: function (p, n) { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "createShader", { value: function (t) { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "createProgram", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "createBuffer", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "createTexture", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "createFramebuffer", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "createRenderbuffer", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, "createVertexArrayOES", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGLRenderingContext.prototype, Symbol.toStringTag, { value: "WebGLRenderingContext", writable: false, enumerable: false, configurable: true });

var GL1_METHODS = ["shaderSource","compileShader","attachShader","linkProgram","useProgram","validateProgram",
    "deleteShader","deleteProgram","deleteBuffer","deleteTexture","deleteFramebuffer","deleteRenderbuffer",
    "bindBuffer","bufferData","bufferSubData","bindTexture","activeTexture","texImage2D","texSubImage2D",
    "texParameteri","texParameterf","generateMipmap","framebufferTexture2D","framebufferRenderbuffer",
    "bindFramebuffer","bindRenderbuffer","renderbufferStorage","viewport","scissor","clearColor","clearDepth",
    "clearStencil","clear","drawArrays","drawElements","enable","disable","enableVertexAttribArray",
    "disableVertexAttribArray","vertexAttribPointer","vertexAttrib1f","vertexAttrib2f","vertexAttrib3f",
    "vertexAttrib4f","uniform1f","uniform2f","uniform3f","uniform4f","uniform1i","uniform2i","uniform3i",
    "uniform4i","uniformMatrix2fv","uniformMatrix3fv","uniformMatrix4fv","colorMask","depthMask","stencilMask",
    "depthFunc","blendFunc","blendFuncSeparate","blendEquation","blendColor","frontFace","cullFace","hint",
    "lineWidth","polygonOffset","sampleCoverage","pixelStorei","readPixels","readBuffer","flush","finish",
    "getProgramInfoLog","getShaderInfoLog","getShaderSource","getActiveAttrib","getActiveUniform",
    "getBufferParameter","getFramebufferAttachmentParameter","getRenderbufferParameter","getTexParameter",
    "getUniform","getVertexAttrib","getVertexAttribOffset","drawBuffersWEBGL","vertexAttribDivisorANGLE",
    "drawArraysInstancedANGLE","drawElementsInstancedANGLE","invalidateFramebuffer"];
GL1_METHODS.forEach(function (n) {
    Object.defineProperty(WebGLRenderingContext.prototype, n, { value: function () { console.log("gl." + n); }, writable: true, enumerable: true, configurable: true });
});

/* ---- WebGL2RenderingContext.prototype（WebGL2 指纹伪造） ---- */
Object.keys(WEBGL1_CONSTS).forEach(function (k) {
    Object.defineProperty(WebGL2RenderingContext.prototype, k, { value: WEBGL1_CONSTS[k], writable: false, enumerable: true, configurable: true });
});
var WEBGL2_CONSTS = {
    "TEXTURE_3D": 0x806F, "TEXTURE_2D_ARRAY": 0x8C1A, "TEXTURE_WRAP_R": 0x8072,
    "SAMPLER_3D": 0x8B5F, "SAMPLER_2D_ARRAY": 0x8DC1,
    "UNIFORM_BUFFER": 0x8A11, "UNIFORM_BUFFER_BINDING": 0x8A28, "UNIFORM_BUFFER_START": 0x8A29,
    "UNIFORM_BUFFER_SIZE": 0x8A2A, "COPY_READ_BUFFER": 0x8F36, "COPY_WRITE_BUFFER": 0x8F37,
    "PIXEL_PACK_BUFFER": 0x88EB, "PIXEL_UNPACK_BUFFER": 0x88EC,
    "VERTEX_ARRAY_BINDING": 0x85B5, "DRAW_FRAMEBUFFER": 0x8CA9, "READ_FRAMEBUFFER": 0x8CA8,
    "DRAW_FRAMEBUFFER_BINDING": 0x8CA6, "READ_FRAMEBUFFER_BINDING": 0x8CAA,
    "R8": 0x8229, "R8I": 0x8231, "R8UI": 0x8232, "R16UI": 0x8234, "R32UI": 0x8236,
    "RG8": 0x822B, "RG16UI": 0x8238, "RG32UI": 0x823A, "RGBA8": 0x8058, "RGBA8UI": 0x8D7C,
    "RGBA16UI": 0x823C, "RGBA32UI": 0x823E,
    "RGB9_E5": 0x8C3D, "R11F_G11F_B10F": 0x8C3A,
    "DEPTH24_STENCIL8": 0x88F0, "DEPTH32F_STENCIL8": 0x8CAD, "DEPTH_COMPONENT24": 0x81A6,
    "DEPTH_COMPONENT32F": 0x8CAC, "UNSIGNED_INT_24_8": 0x84FA, "UNSIGNED_INT_5_9_9_9_REV": 0x8C3E,
    "FLOAT_32_UNSIGNED_INT_24_8_REV": 0x8DAD,
    "MAX_3D_TEXTURE_SIZE": 0x8073, "MAX_ARRAY_TEXTURE_LAYERS": 0x88FF,
    "MAX_DRAW_BUFFERS": 0x8824, "MAX_COLOR_ATTACHMENTS": 0x8CDF,
    "MAX_UNIFORM_BUFFER_BINDINGS": 0x8A2F, "MAX_UNIFORM_BLOCK_SIZE": 0x8A30,
    "UNIFORM_BUFFER_OFFSET_ALIGNMENT": 0x8A34, "MAX_TEXTURE_LOD_BIAS": 0x84FD,
    "MAX_VERTEX_UNIFORM_BLOCKS": 0x8A2B, "MAX_FRAGMENT_UNIFORM_BLOCKS": 0x8A2D,
    "MAX_COMBINED_UNIFORM_BLOCKS": 0x8A2E, "MAX_VERTEX_OUTPUT_COMPONENTS": 0x9122,
    "MAX_FRAGMENT_INPUT_COMPONENTS": 0x9125,
    "FUNC_MIN": 0x8007, "FUNC_MAX": 0x8008,
    "READ_BUFFER": 0x0C02, "COLOR_ATTACHMENT1": 0x8CE1, "COLOR_ATTACHMENT2": 0x8CE2,
    "COLOR_ATTACHMENT3": 0x8CE3, "COLOR_ATTACHMENT4": 0x8CE4, "COLOR_ATTACHMENT5": 0x8CE5,
    "COLOR_ATTACHMENT6": 0x8CE6, "COLOR_ATTACHMENT7": 0x8CE7,
    "VERTEX_ATTRIB_ARRAY_DIVISOR": 0x88FE
};
Object.keys(WEBGL2_CONSTS).forEach(function (k) {
    Object.defineProperty(WebGL2RenderingContext.prototype, k, { value: WEBGL2_CONSTS[k], writable: false, enumerable: true, configurable: true });
});
var WEBGL2_INFO = {
    "0x1F02": "WebGL 2.0 (OpenGL ES 3.0 Chromium)",
    "0x8B8C": "WebGL GLSL ES 3.00 (OpenGL ES GLSL ES 3.0 Chromium)",
    "0x9245": WEBGL_UNMASKED_VENDOR,
    "0x9246": WEBGL_UNMASKED_RENDERER,
    "0x0D33": 16384, "0x8073": 2048, "0x88FF": 256, "0x8A2F": 24, "0x8A30": 16384,
    "0x8A34": 256, "0x8CDF": 8, "0x8824": 8, "0x8A2B": 14, "0x8A2D": 14, "0x8A2E": 48,
    "0x9122": 128, "0x9125": 128, "0x84FD": 31, "0x8869": 16, "0x8B4D": 32, "0x0D3A": [32767, 32767]
};
var WEBGL2_EXT_LIST = ["EXT_clip_control","EXT_color_buffer_float","EXT_color_buffer_half_float",
    "EXT_conservative_depth","EXT_depth_clamp","EXT_disjoint_timer_query_webgl2","EXT_float_blend",
    "EXT_polygon_offset_clamp","EXT_render_snorm","EXT_texture_compression_bptc","EXT_texture_compression_rgtc",
    "EXT_texture_filter_anisotropic","EXT_texture_mirror_clamp_to_edge","EXT_texture_norm16",
    "KHR_parallel_shader_compile","NV_shader_noperspective_interpolation","OES_draw_buffers_indexed",
    "OES_sample_variables","OES_shader_multisample_interpolation","OES_texture_float_linear","OVR_multiview2",
    "WEBGL_blend_func_extended","WEBGL_clip_cull_distance","WEBGL_compressed_texture_s3tc",
    "WEBGL_compressed_texture_s3tc_srgb","WEBGL_debug_renderer_info","WEBGL_debug_shaders",
    "WEBGL_lose_context","WEBGL_multi_draw","WEBGL_polygon_mode","WEBGL_provoking_vertex","WEBGL_stencil_texturing"];
Object.defineProperty(WebGL2RenderingContext.prototype, "getParameter", { value: function (pname) {
        var v = _webglLookup(WEBGL2_INFO, pname);
        if (v !== null) return v;
        v = _webglLookup(WEBGL1_INFO, pname);
        return v === null ? null : v;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getExtension", { value: function (name) {
        if (name === 'WEBGL_debug_renderer_info') return { UNMASKED_VENDOR_WEBGL: 0x9245, UNMASKED_RENDERER_WEBGL: 0x9246 };
        if (WEBGL2_EXT_LIST.indexOf(name) >= 0) return {};
        return null;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getSupportedExtensions", { value: function () { return WEBGL2_EXT_LIST.slice(); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getShaderPrecisionFormat", { value: function (a, b) { return _webglPrecision(a, b); }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getContextAttributes", { value: function () {
        return { alpha: true, antialias: true, depth: true, stencil: false, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: 'default', failIfMajorPerformanceCaveat: false };
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getError", { value: function () { return 0; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getProgramParameter", { value: function (p, k) { return true; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getShaderParameter", { value: function (s, k) { return true; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getAttribLocation", { value: function (p, n) { return -1; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "getUniformLocation", { value: function (p, n) { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "createShader", { value: function (t) { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "createProgram", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "createBuffer", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "createTexture", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, "createVertexArray", { value: function () { return {}; }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(WebGL2RenderingContext.prototype, Symbol.toStringTag, { value: "WebGL2RenderingContext", writable: false, enumerable: false, configurable: true });
GL1_METHODS.concat(["bindVertexArray","texStorage2D","texStorage3D","texImage3D","texSubImage3D","copyTexSubImage3D",
    "compressedTexImage2D","compressedTexImage3D","drawArraysInstanced","drawElementsInstanced","drawRangeElements",
    "blitFramebuffer","readPixels","bufferData","invalidateSubFramebuffer","fenceSync","clientWaitSync","waitSync",
    "deleteSync","getSyncParameter","createQuery","deleteQuery","beginQuery","endQuery","getQuery","getQueryParameter",
    "createSampler","deleteSampler","bindSampler","samplerParameteri","getSamplerParameter",
    "createTransformFeedback","deleteTransformFeedback","bindTransformFeedback","beginTransformFeedback",
    "endTransformFeedback","transformFeedbackVaryings","getTransformFeedbackVarying","pauseTransformFeedback",
    "resumeTransformFeedback","bindBufferBase","bindBufferRange","getIndexedParameter","getActiveUniformBlock",
    "getActiveUniformBlockParameter","getActiveUniformBlockName","uniformBlockBinding","vertexAttribDivisor"]).forEach(function (n) {
    Object.defineProperty(WebGL2RenderingContext.prototype, n, { value: function () { console.log("gl2." + n); }, writable: true, enumerable: true, configurable: true });
});

/* ---- GPUCanvasContext.prototype（WebGPU 最小桩） ---- */
["configure", "getCurrentTexture", "unconfigure"].forEach(function (n) {
    Object.defineProperty(GPUCanvasContext.prototype, n, { value: function () { console.log("webgpu." + n); }, writable: true, enumerable: true, configurable: true });
});

/* ---- HTMLCollection.prototype ---- */
Object.defineProperty(HTMLCollection.prototype, "item", { value: function (i) {
        return this[i] !== undefined ? this[i] : null;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(HTMLCollection.prototype, "namedItem", { value: function (n) {
        n = String(n == null ? '' : n);
        if (this[n] !== undefined) return this[n];
        var lower = n.toLowerCase();
        if (this[lower] !== undefined) return this[lower];
        return null;
    }, writable: true, enumerable: true, configurable: true });
Object.defineProperty(HTMLCollection.prototype, Symbol.toStringTag, { value: "HTMLCollection", writable: false, enumerable: false, configurable: true });

/* ---- 内置全局工具：TextEncoder / TextDecoder（ivm 沙箱默认没有，真实浏览器有；宿主注入了就保留） ---- */
if (typeof globalThis.TextEncoder === 'undefined') {
    globalThis.TextEncoder = function TextEncoder() {};
    Object.defineProperty(globalThis.TextEncoder.prototype, 'encoding', { get: function () { return 'utf-8'; }, enumerable: true, configurable: true });
    Object.defineProperty(globalThis.TextEncoder.prototype, 'encode', { value: function (str) { return _utf8Bytes(String(str)); }, writable: true, enumerable: true, configurable: true });
    Object.defineProperty(globalThis.TextEncoder.prototype, 'encodeInto', { value: function (str, dest) {
            var b = _utf8Bytes(String(str));
            var n = Math.min(dest.length, b.length);
            for (var i = 0; i < n; i++) dest[i] = b[i];
            return { read: n, written: n };
        }, writable: true, enumerable: true, configurable: true });
}
if (typeof globalThis.TextDecoder === 'undefined') {
    globalThis.TextDecoder = function TextDecoder() {};
    Object.defineProperty(globalThis.TextDecoder.prototype, 'encoding', { get: function () { return 'utf-8'; }, enumerable: true, configurable: true });
    Object.defineProperty(globalThis.TextDecoder.prototype, 'decode', { value: function (input) {
            var bytes = (input instanceof Uint8Array) ? input : new Uint8Array(input || 0);
            var out = '', i = 0, b1, b2, b3, b4, cp;
            while (i < bytes.length) {
                b1 = bytes[i++];
                if (b1 < 0x80) out += String.fromCharCode(b1);
                else if (b1 < 0xE0) { b2 = bytes[i++]; out += String.fromCharCode(((b1 & 0x1F) << 6) | (b2 & 0x3F)); }
                else if (b1 < 0xF0) { b2 = bytes[i++]; b3 = bytes[i++]; out += String.fromCharCode(((b1 & 0x0F) << 12) | ((b2 & 0x3F) << 6) | (b3 & 0x3F)); }
                else { b2 = bytes[i++]; b3 = bytes[i++]; b4 = bytes[i++]; cp = ((b1 & 0x07) << 18) | ((b2 & 0x3F) << 12) | ((b3 & 0x3F) << 6) | (b4 & 0x3F); out += String.fromCodePoint(cp); }
            }
            return out;
        }, writable: true, enumerable: true, configurable: true });
}


/* ============================================================
 * 3. 元素实例桩 + canvas 上下文实例
 * ============================================================ */

/* 元素桩：div/head/html/meta/script/body/link/style/title/canvas + 对应集合 _xxx */
div = {}
_div = []
Object.setPrototypeOf(div, HTMLDivElement.prototype);
Object.setPrototypeOf(_div, HTMLCollection.prototype);

head = {}
_head = []
Object.setPrototypeOf(head, HTMLHeadElement.prototype);
Object.setPrototypeOf(_head, HTMLCollection.prototype);

html = {}
_html = []
Object.setPrototypeOf(html, HTMLHtmlElement.prototype);
Object.setPrototypeOf(_html, HTMLCollection.prototype);

meta = {}
_meta = [meta,meta,meta,meta,meta]
Object.setPrototypeOf(meta, HTMLMetaElement.prototype);
Object.setPrototypeOf(_meta, HTMLCollection.prototype);

script = {}
_script = [script]
Object.setPrototypeOf(script, HTMLScriptElement.prototype);
Object.setPrototypeOf(_script, HTMLCollection.prototype);

body = {}
_body = []
Object.setPrototypeOf(body, HTMLBodyElement.prototype);
Object.setPrototypeOf(_body, HTMLCollection.prototype);

link = {}
_link = []
Object.setPrototypeOf(link, HTMLLinkElement.prototype);
Object.setPrototypeOf(_link, HTMLCollection.prototype);

style = {}
_style = []
Object.setPrototypeOf(style, HTMLStyleElement.prototype);
Object.setPrototypeOf(_style, HTMLCollection.prototype);

title = {}
_title = []
Object.setPrototypeOf(title, HTMLTitleElement.prototype);
Object.setPrototypeOf(_title, HTMLCollection.prototype);

canvas = {}
_canvas = []
Object.setPrototypeOf(canvas, HTMLCanvasElement.prototype);
Object.setPrototypeOf(_canvas, HTMLCollection.prototype);

//////////////////////
base = {}
_base = []
Object.setPrototypeOf(base, HTMLBaseElement.prototype);
Object.setPrototypeOf(_base, HTMLCollection.prototype);

form = {}
_form = []
Object.setPrototypeOf(form, HTMLFormElement.prototype);
Object.setPrototypeOf(_form, HTMLCollection.prototype);

input = {}
_input = []
Object.setPrototypeOf(input, HTMLInputElement.prototype);
Object.setPrototypeOf(_input, HTMLCollection.prototype);

//////////////////////

/* 每个元素桩的标签名（tagName/nodeName 取这里） */
div._tagName = 'DIV';
head._tagName = 'HEAD';
html._tagName = 'HTML';
meta._tagName = 'META';
script._tagName = 'SCRIPT';
body._tagName = 'BODY';
link._tagName = 'LINK';
style._tagName = 'STYLE';
title._tagName = 'TITLE';
canvas._tagName = 'CANVAS';

/* document.images/forms/scripts/... 复用的空集合 */
_emptyColl = []
Object.setPrototypeOf(_emptyColl, HTMLCollection.prototype);

/* document.all：单独对象（HTMLAllCollection 形态），不复用 _emptyColl */
_docAll = {
    length: 0,
    item: function (i) { return this[i] !== undefined ? this[i] : null; },
    namedItem: function (n) { return this[n] || null; }
};
Object.defineProperty(_docAll, Symbol.toStringTag, { value: 'HTMLAllCollection', configurable: true });

/* canvas 上下文实例 */
_2d = {}
Object.setPrototypeOf(_2d, CanvasRenderingContext2D.prototype);

webgl = {}
Object.setPrototypeOf(webgl, WebGLRenderingContext.prototype);

webgl2 = {}
Object.setPrototypeOf(webgl2, WebGL2RenderingContext.prototype);

webgpu = {}
Object.setPrototypeOf(webgpu, GPUCanvasContext.prototype);

_2d._canvas = canvas;
_2d._seed = 0;


/* ============================================================
 * 4. 全局对象装配
 * ============================================================ */

Object.setPrototypeOf(globalThis, Window.prototype);
window = globalThis;
/* 真实浏览器：atob/fetch/getComputedStyle 等都是 window 的自有属性（hasOwnProperty=true），
 * Window.prototype 只有 TEMPORARY/PERSISTENT/toStringTag。把原型上的高频成员移到 window 自身 */
Object.getOwnPropertyNames(Window.prototype).forEach(function (k) {
    if (k === 'TEMPORARY' || k === 'PERSISTENT') return;
    Object.defineProperty(window, k, Object.getOwnPropertyDescriptor(Window.prototype, k));
    delete Window.prototype[k];
});
window.window = window;
window.top = window;
window.self = window;
/* IE 专属 API：真实 Chrome 里 'execScript' in window 为 false，用 delete 让属性彻底不存在 */
delete window.execScript;
delete window.CollectGarbage;
delete window.ActiveXObject;
/* 定时器：优先保留宿主注入的真实定时器（isolated-vm 注入的是 ivm.Reference，typeof 是 'object' 且不能直接调用，
 * 需要包一层用 .apply 转发；未注入时用微任务兜底，保证 setTimeout(fn,0) 初始化回调能执行） */
var _timerId = 0;
function _timerFallbackSet(fn, ms) {
    _timerId++;
    var id = _timerId;
    Promise.resolve().then(function () { if (typeof fn === 'function') fn(); });
    return id;
}
function _wrapHostTimer(host, fallback) {
    if (host === undefined || host === null) return fallback;
    return function (fn, ms) {
        try {
            if (typeof host === 'function') return host(fn, ms);      /* 真实函数直接调 */
            return host.apply(undefined, [fn, ms]);                    /* ivm.Reference 用 apply 转发 */
        } catch (e) {
            return fallback(fn, ms);
        }
    };
}
window.setTimeout = _wrapHostTimer(globalThis.setTimeout, _timerFallbackSet);
window.setInterval = _wrapHostTimer(globalThis.setInterval, _timerFallbackSet);
window.clearTimeout = _wrapHostTimer(globalThis.clearTimeout, function () {});
window.clearInterval = _wrapHostTimer(globalThis.clearInterval, function () {});
window.innerWidth = 1536;
window.innerHeight = 816;
window.devicePixelRatio = 1.25;
window.screenX = 0;
window.screenY = 0;
window.scrollX = 0;
window.pageXOffset = 0;
window.scrollY = 0;
window.pageYOffset = 0;
window.outerWidth = 1536;
window.outerHeight = 864;
window.name = '';
window.opener = null;
window.parent = window;
window.frames = window;
window.length = 0;

document = {}
Object.setPrototypeOf(document, HTMLDocument.prototype);
/* 真实浏览器：document.location === location（自有、可枚举） */
Object.defineProperty(document, 'location', { get: function(){ return location; }, enumerable: true, configurable: true });

location = {}
Object.setPrototypeOf(location, Location.prototype);

history = {}
Object.setPrototypeOf(history, History.prototype);

localStorage = {}
Object.setPrototypeOf(localStorage, Storage.prototype);

navigator = {}
Object.setPrototypeOf(navigator, Navigator.prototype);

performance = {}
Object.setPrototypeOf(performance, Performance.prototype);

screen = {}
Object.setPrototypeOf(screen, Screen.prototype);

sessionStorage = {}
Object.setPrototypeOf(sessionStorage, Storage.prototype);

caches = {}
Object.setPrototypeOf(caches, CacheStorage.prototype);

xhr = {}
Object.setPrototypeOf(xhr, XMLHttpRequest.prototype);


if (globalThis.crypto !== undefined && globalThis.crypto !== null) {
    crypto = globalThis.crypto;
} else {
    crypto = {}
    Object.setPrototypeOf(crypto, Crypto.prototype);
}

indexedDB = {}
Object.setPrototypeOf(indexedDB, IDBFactory.prototype);

_i = []
Object.setPrototypeOf(_i, HTMLCollection.prototype);


/*
这些修改值
var _locationHref = 'https://example.com/';
var _locationProtocol = 'https:';
var _locationHost = 'example.com';
var _locationPath = '/';
var _locationSearch = '';
var _locationHash = '';

jail.setSync('setTimeout', new ivm.Reference((fn, ms) => setTimeout(() => fn.applyIgnored?.(undefined, []), ms)));
jail.setSync('crypto', new ivm.Reference(require('crypto').webcrypto));

 */