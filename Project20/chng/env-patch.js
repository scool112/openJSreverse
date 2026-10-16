/**
 * env-patch.js —— 把 sdenv 环境补齐到"真 Chrome"（针对瑞数指纹）
 * 用法：installRealChromeEnv(window, sdenv)
 * 对标真机（Chrome/138 Win, screen 1536x864, dpr 1）的值。
 */

function installRealChromeEnv(window, sdenv) {
  const tools = sdenv.tools;
  const D = (o, k, v, en) => Object.defineProperty(o, k, { get: () => v, configurable: true, enumerable: en !== false });
  const V = (o, k, v) => Object.defineProperty(o, k, { value: v, configurable: true, writable: true });

  const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";
  const APP = UA.replace(/^Mozilla\//, '');

  /* ---------------- navigator ---------------- */
  const nav = window.navigator;
  D(nav, 'userAgent', UA); D(nav, 'appVersion', APP); D(nav, 'platform', 'Win32');
  D(nav, 'vendor', 'Google Inc.'); D(nav, 'product', 'Gecko'); D(nav, 'productSub', '20030107');
  D(nav, 'appName', 'Netscape'); D(nav, 'appCodeName', 'Mozilla');
  D(nav, 'language', 'zh-CN'); D(nav, 'languages', ['zh-CN', 'zh']);
  D(nav, 'hardwareConcurrency', 16); D(nav, 'maxTouchPoints', 0);
  D(nav, 'pdfViewerEnabled', true); D(nav, 'webdriver', false); D(nav, 'onLine', true);
  D(nav, 'doNotTrack', null); D(nav, 'cookieEnabled', true);

  /* ---------------- screen ---------------- */
  const scr = window.screen;
  D(scr, 'width', 1536); D(scr, 'height', 864);
  D(scr, 'availWidth', 1536); D(scr, 'availHeight', 816);
  D(scr, 'colorDepth', 24); D(scr, 'pixelDepth', 24);
  D(scr, 'availLeft', 0); D(scr, 'availTop', 0);
  try { D(scr, 'orientation', { type: 'landscape-primary', angle: 0 }); } catch (e) {}

  /* ---------------- window 尺寸 ---------------- */
  D(window, 'innerWidth', 1536); D(window, 'innerHeight', 755);
  D(window, 'outerWidth', 1536); D(window, 'outerHeight', 824);
  D(window, 'devicePixelRatio', 1);
  D(window, 'screenX', 0); D(window, 'screenY', 0);
  D(window, 'screenLeft', 0); D(window, 'screenTop', 0);
  try { const de = window.document.documentElement; if (de) { D(de, 'clientWidth', 1536); D(de, 'clientHeight', 755); } } catch (e) {}

  /* ---------------- plugins / mimeTypes ---------------- */
  try {
    const PluginProto = window.Plugin && window.Plugin.prototype;
    const MimeTypeProto = window.MimeType && window.MimeType.prototype;
    const pArrProto = Object.getPrototypeOf(nav.plugins);
    const mArrProto = Object.getPrototypeOf(nav.mimeTypes);
    const defVal = (o, k, v, en) => Object.defineProperty(o, k, { value: v, configurable: true, enumerable: !!en, writable: true });
    const mkMime = (type, sfx, desc) => { const m = MimeTypeProto ? Object.create(MimeTypeProto) : {}; defVal(m, 'type', type, 1); defVal(m, 'suffixes', sfx, 1); defVal(m, 'description', desc, 1); defVal(m, 'enabledPlugin', null, 1); return m; };
    const mkPlugin = (name, fn, desc, mimes) => {
      const p = PluginProto ? Object.create(PluginProto) : {};
      defVal(p, 'name', name, 1); defVal(p, 'filename', fn, 1); defVal(p, 'description', desc, 1);
      defVal(p, 'length', mimes.length, 0);
      mimes.forEach((m, i) => defVal(p, i, m, 1)); mimes.forEach((m) => defVal(m, 'enabledPlugin', p, 1));
      return p;
    };
    const mkArr = (proto, items, tag) => { const a = Object.create(proto); items.forEach((it, i) => defVal(a, i, it, 1)); items.forEach((it) => { const n = it.type || it.name; if (n) defVal(a, n, it, 0); }); defVal(a, 'length', items.length, 0); defVal(a, 'item', (i) => a[i] || null, 0); defVal(a, 'namedItem', (n) => (a[n] === undefined ? null : a[n]), 0); if (tag) { try { defVal(a, Symbol.toStringTag, tag, 0); } catch (e) {} } return a; };
    const pdf1 = mkMime('application/pdf', 'pdf', 'Portable Document Format');
    const pdf2 = mkMime('text/pdf', 'pdf', 'Portable Document Format');
    const names = ['PDF Viewer', 'Chrome PDF Viewer', 'Chromium PDF Viewer', 'Microsoft Edge PDF Viewer', 'WebKit built-in PDF'];
    const plugins = mkArr(pArrProto, [mkPlugin(names[0], 'internal-pdf-viewer', 'Portable Document Format', [pdf1, pdf2]), mkPlugin(names[1], 'internal-pdf-viewer', 'Portable Document Format', []), mkPlugin(names[2], 'internal-pdf-viewer', 'Portable Document Format', []), mkPlugin(names[3], 'internal-pdf-viewer', 'Portable Document Format', []), mkPlugin(names[4], 'internal-pdf-viewer', 'Portable Document Format', [])], 'PluginArray');
    const mimes = mkArr(mArrProto, [pdf1, pdf2], 'MimeTypeArray');
    Object.defineProperty(nav, 'plugins', { configurable: true, enumerable: true, get: () => plugins });
    Object.defineProperty(nav, 'mimeTypes', { configurable: true, enumerable: true, get: () => mimes });
  } catch (e) {}

  /* ---------------- canvas（sdenv 把 toDataURL 改空了，这里给固定值） ---------------- */
  try {
    let dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAYAAAAAMgSgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADdSURBVHhe7dExAQAADMOg+TfdmcgLlEBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4G8HzQAAAV0aGV3AAAAAElFTkSuQmCC';
    try {
      const path = require('path');
      let createCanvas = null;
      for (const p of ['canvas', path.resolve(__dirname, '..', '..', 'AiEeverseEnv', 'sdenv', 'node_modules', 'canvas')]) {
        try { createCanvas = require(p).createCanvas; if (createCanvas) break; } catch (e) {}
      }
      if (createCanvas) {
        const cnv = createCanvas(200, 40);
        const ctx = cnv.getContext('2d');
        ctx.textBaseline = 'top'; ctx.font = '14px Arial';
        ctx.fillStyle = '#f60'; ctx.fillRect(0, 0, 100, 20);
        ctx.fillStyle = '#069'; ctx.fillText('fingerprint', 2, 2);
        dataUrl = cnv.toDataURL();
      }
    } catch (e) {}
    const proto = window.HTMLCanvasElement && window.HTMLCanvasElement.prototype;
    if (proto) {
      V(proto, 'toDataURL', function toDataURL() { return dataUrl; });
      tools.setFuncNative(proto.toDataURL, 'toDataURL', 0);
    }
  } catch (e) {}

  /* ---------------- WebGL（真机是 NVIDIA，sdenv 是 null） ---------------- */
  try {
    if (typeof window.WebGLRenderingContext === 'undefined') {
      const P = {
        7936: 'WebKit', 7937: 'WebKit WebGL',
        7938: 'WebGL 1.0 (OpenGL ES 2.0 Chromium)',
        35724: 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)',
        37445: 'Google Inc. (NVIDIA)',
        37446: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 4050 Laptop GPU (0x000028E1) Direct3D11 vs_5_0 ps_5_0, D3D11)',
        3379: 16384, 34076: 16384, 34930: 16, 35660: 16, 35661: 32, 3386: [32767, 32767],
      };
      const EXTS = { WEBGL_debug_renderer_info: { UNMASKED_VENDOR_WEBGL: 37445, UNMASKED_RENDERER_WEBGL: 37446 } };
      function mkCtx(canvas) {
        const ctx = Object.create(WebGLRenderingContext.prototype);
        ctx.canvas = canvas;
        ctx.getParameter = (p) => (p in P ? P[p] : 0);
        ctx.getExtension = (n) => (EXTS[n] ? EXTS[n] : null);
        ctx.getSupportedExtensions = () => Object.keys(EXTS);
        ctx.getShaderPrecisionFormat = () => ({ rangeMin: 127, rangeMax: 127, precision: 23 });
        ctx.getContextAttributes = () => ({ alpha: true, depth: true, stencil: false, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: 'default', failIfMajorPerformanceCaveat: false });
        ctx.getError = () => 0; ctx.isContextLost = () => false;
        ctx.createBuffer = () => ({}); ctx.bindBuffer = () => {}; ctx.bufferData = () => {};
        ctx.createProgram = () => ({}); ctx.createShader = () => ({}); ctx.shaderSource = () => {}; ctx.compileShader = () => {};
        ctx.getShaderParameter = () => true; ctx.getProgramParameter = () => true; ctx.attachShader = () => {}; ctx.linkProgram = () => {}; ctx.useProgram = () => {};
        ctx.getAttribLocation = () => 0; ctx.getUniformLocation = () => ({}); ctx.enableVertexAttribArray = () => {}; ctx.vertexAttribPointer = () => {};
        ctx.clearColor = () => {}; ctx.clear = () => {}; ctx.viewport = () => {}; ctx.drawArrays = () => {}; ctx.uniformMatrix4fv = () => {};
        return ctx;
      }
      function WebGLRenderingContext() { throw new TypeError('Illegal constructor'); }
      WebGLRenderingContext.prototype.getParameter = function () { return 0; };
      tools.setFuncNative(WebGLRenderingContext, 'WebGLRenderingContext', 0);
      tools.setObjName(WebGLRenderingContext.prototype, 'WebGLRenderingContext');
      window.WebGLRenderingContext = WebGLRenderingContext;
      const proto = window.HTMLCanvasElement.prototype;
      const origGet = proto.getContext;
      V(proto, 'getContext', function getContext(type) {
        if (type === 'webgl' || type === 'experimental-webgl' || type === 'webgl2') return mkCtx(this);
        return origGet.apply(this, arguments);
      });
      tools.setFuncNative(proto.getContext, 'getContext', 1);
    }
  } catch (e) {}

  /* ---------------- AudioContext（最小可用） ---------------- */
  try {
    if (typeof window.AudioContext === 'undefined') {
      function AudioContext() {
        this.sampleRate = 44100; this.destination = {}; this.state = 'suspended';
        this.currentTime = 0; this.baseLatency = 0.01;
      }
      AudioContext.prototype.createOscillator = function () { return { type: 'sine', frequency: { value: 0, setValueAtTime() {} }, connect() {}, start() {}, stop() {}, disconnect() {} }; };
      AudioContext.prototype.createGain = function () { return { gain: { value: 1 }, connect() {}, disconnect() {} }; };
      AudioContext.prototype.createAnalyser = function () { return { fftSize: 2048, frequencyBinCount: 1024, getFloatFrequencyData() {}, getByteFrequencyData() {}, connect() {}, disconnect() {} }; };
      AudioContext.prototype.createDynamicsCompressor = function () { return { threshold: { value: -24 }, connect() {}, disconnect() {} }; };
      AudioContext.prototype.createScriptProcessor = function () { return { connect() {}, disconnect() {}, onaudioprocess: null }; };
      AudioContext.prototype.createBuffer = function (c, l, r) { return { numberOfChannels: c, length: l, sampleRate: r, getChannelData: () => new Float32Array(l) }; };
      AudioContext.prototype.createBufferSource = function () { return { buffer: null, connect() {}, start() {}, disconnect() {} }; };
      AudioContext.prototype.close = function () { return Promise.resolve(); };
      AudioContext.prototype.resume = function () { return Promise.resolve(); };
      AudioContext.prototype.suspend = function () { return Promise.resolve(); };
      tools.setFuncNative(AudioContext, 'AudioContext', 0);
      tools.setObjName(AudioContext.prototype, 'AudioContext');
      window.AudioContext = AudioContext;
      window.webkitAudioContext = AudioContext;
      // OfflineAudioContext（瑞数常用它做音频指纹）
      function OfflineAudioContext(c, l, r) { AudioContext.call(this); this.length = l; }
      OfflineAudioContext.prototype = Object.create(AudioContext.prototype);
      OfflineAudioContext.prototype.startRendering = function () { const self = this; return Promise.resolve({ numberOfChannels: self._c || 1, length: self.length, sampleRate: self.sampleRate, getChannelData: () => new Float32Array(self.length || 1) }); };
      tools.setFuncNative(OfflineAudioContext, 'OfflineAudioContext', 3);
      window.OfflineAudioContext = OfflineAudioContext;
      window.webkitOfflineAudioContext = OfflineAudioContext;
    }
    if (typeof window.BaseAudioContext !== 'undefined' && typeof window.AnalyserNode === 'undefined') { window.AnalyserNode = function AnalyserNode() { throw new TypeError('Illegal constructor'); }; }
  } catch (e) {}

  return window;
}

module.exports = installRealChromeEnv;
