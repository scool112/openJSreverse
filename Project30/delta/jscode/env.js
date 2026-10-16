
window = globalThis


;(function () {
    var B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var LT = null;
    function initLT() { if (LT) return; LT = []; for (var i = 0; i < 256; i++) LT[i] = -1; for (var j = 0; j < B64.length; j++) LT[B64.charCodeAt(j)] = j; }
    function atob(s) {
        initLT(); s = String(s).replace(/[^A-Za-z0-9+/]/g, '');
        var out = [], buf = 0, bits = 0;
        for (var i = 0; i < s.length; i++) { var c = LT[s.charCodeAt(i)]; if (c < 0) continue; buf = (buf << 6) | c; bits += 6; if (bits >= 8) { bits -= 8; out.push((buf >> bits) & 0xff); } }
        var str = ''; for (var k = 0; k < out.length; k++) str += String.fromCharCode(out[k]); return str;
    }
    function btoa(s) {
        s = String(s); var out = ''; var i = 0;
        for (; i < s.length; i += 3) {
            var c1 = s.charCodeAt(i), c2 = s.charCodeAt(i + 1), c3 = s.charCodeAt(i + 2);
            if (c1 > 255) throw new Error("InvalidCharacterError");
            var e1 = c1 >> 2, e2 = ((c1 & 3) << 4) | (isNaN(c2) ? 0 : (c2 >> 4)),
                e3 = isNaN(c2) ? 64 : (((c2 & 15) << 2) | (isNaN(c3) ? 0 : (c3 >> 6))), e4 = isNaN(c3) ? 64 : (c3 & 63);
            out += B64.charAt(e1) + B64.charAt(e2) + (e3 === 64 ? '=' : B64.charAt(e3)) + (e4 === 64 ? '=' : B64.charAt(e4));
        }
        return out;
    }
    globalThis.atob = atob; globalThis.btoa = btoa;
    if (window) { window.atob = atob; window.btoa = btoa; }
})();

;(function () {
    var g = globalThis;

    // ---- 事件监听注册表 + 派发器 (让 sensor 脚本的 addEventListener 真正接住行为事件) ----
    var __L = {};
    function __addL(target, kind, fn) { if (typeof fn !== 'function') return; var a = __L[kind] || (__L[kind] = []); a.push({ t: target, f: fn }); }
    function __rmL(target, kind, fn) { var a = __L[kind]; if (!a) return; for (var i = a.length - 1; i >= 0; i--) if (a[i].f === fn) a.splice(i, 1); }
    function __mkEvent(kind, d) {
        d = d || {};
        var e = {}; for (var k in d) e[k] = d[k];
        e.type = kind; e.isTrusted = true; e.bubbles = true; e.cancelable = true; e.defaultPrevented = false;
        e.timeStamp = (typeof d.timeStamp === 'number') ? d.timeStamp : (g.performance && g.performance.now ? g.performance.now() : Date.now());
        e.target = d.target || g.document || null; e.currentTarget = e.target;
        e.preventDefault = function () { this.defaultPrevented = true; };
        e.stopPropagation = function () {}; e.stopImmediatePropagation = function () {};
        if (/^touch/.test(kind) && e.touches === undefined) { e.touches = []; e.changedTouches = []; }
        return e;
    }
    function __fire(kind, detail) {
        var ev = __mkEvent(kind, detail);
        var a = __L[kind];
        if (a) { var list = a.slice(); for (var i = 0; i < list.length; i++) { try { list[i].f.call(list[i].t, ev); } catch (err) {} } }
        var on = g['on' + kind]; if (typeof on === 'function') { try { on.call(g, ev); } catch (err) {} }
        return true;
    }
    g.__fire = __fire; g.__addL = __addL; g.__rmL = __rmL;

    // 真机指纹占位 —— 用真 Chrome 采集后替换 (见文末采集脚本)
    var __CAP = {
        canvasDataUrl: "data:image/png;base64,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",
        webglVendor: 'Google Inc. (NVIDIA)',
        webglRenderer: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 4050 Laptop GPU (0x000028E1) Direct3D11 vs_5_0 ps_5_0, D3D11)',
        audioSum: 0
    };

    // ===== 1. 自动化检测: 这些必须"不存在" =====
    var BOT_GLOBALS = '__driver_evaluate __webdriver_evaluate __selenium_evaluate __fxdriver_evaluate __driver_unwrapped __webdriver_unwrapped __selenium_unwrapped __fxdriver_unwrapped _Selenium_IDE_Recorder _selenium callSelenium _phantom callPhantom __nightmare _phantomjs __phantomas domAutomation domAutomationController $cdc_asdjflasutopfhvcZLmcfl_ __$webdriverAsyncExecutor __webdriver_script_fn __webdriver_script_func __webdriver_script_function __webdriverFuncgeb watirExpressionError watinExpressionResult awesomium geb spynner_additional_js_loaded fmget_targets InstallTrigger opera browser MSStream XDomainRequest ActiveXObject'.split(' ');
    var i;
    for (i = 0; i < BOT_GLOBALS.length; i++) { g[BOT_GLOBALS[i]] = undefined; }

    // ===== 2. navigator =====
    var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';
    function Plugin(name, desc, filename) { this.name = name; this.description = desc; this.filename = filename; this.length = 2; this[0] = makeMime('application/pdf', 'pdf', 'Portable Document Format'); this[1] = makeMime('text/pdf', 'pdf', 'Portable Document Format'); }
    function makeMime(type, suffixes, description) { return { type: type, suffixes: suffixes, description: description, enabledPlugin: null }; }
    var PLUGINS = [
        new Plugin('PDF Viewer', 'Portable Document Format', 'internal-pdf-viewer'),
        new Plugin('Chrome PDF Viewer', 'Portable Document Format', 'internal-pdf-viewer'),
        new Plugin('Chromium PDF Viewer', 'Portable Document Format', 'internal-pdf-viewer'),
        new Plugin('Microsoft Edge PDF Viewer', 'Portable Document Format', 'internal-pdf-viewer'),
        new Plugin('WebKit built-in PDF', 'Portable Document Format', 'internal-pdf-viewer')
    ];
    function PluginArray() {}
    PluginArray.prototype = [];
    var plugins = PLUGINS;
    plugins.item = function (idx) { return this[idx] || null; };
    plugins.namedItem = function (nm) { for (var j = 0; j < this.length; j++) if (this[j].name === nm) return this[j]; return null; };
    plugins.refresh = function () {};
    var mimes = [makeMime('application/pdf', 'pdf', 'Portable Document Format'), makeMime('text/pdf', 'pdf', 'Portable Document Format')];
    mimes.item = function (idx) { return this[idx] || null; };
    mimes.namedItem = function (nm) { for (var j = 0; j < this.length; j++) if (this[j].type === nm) return this[j]; return null; };

    function Navigator() {}
    var navigator = new Navigator();
    navigator.userAgent = UA;
    navigator.appCodeName = 'Mozilla';
    navigator.appName = 'Netscape';
    navigator.appVersion = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';
    navigator.platform = 'Win32';
    navigator.product = 'Gecko';
    navigator.productSub = '20030107';
    navigator.vendor = 'Google Inc.';
    navigator.vendorSub = '';
    navigator.language = 'zh-CN';
    navigator.languages = ['zh-CN', 'zh'];
    navigator.maxTouchPoints = 0;
    navigator.hardwareConcurrency = 16;
    navigator.deviceMemory = 8;
    navigator.cookieEnabled = true;
    navigator.onLine = true;
    navigator.webdriver = false;
    navigator.doNotTrack = null;
    navigator.pdfViewerEnabled = true;
                navigator.userAgentData = { brands: [{ brand: 'Not)A;Brand', version: '8' }, { brand: 'Chromium', version: '138' }, { brand: 'Google Chrome', version: '138' }], mobile: false, platform: 'Windows', getHighEntropyValues: function () { return { brands: this.brands, mobile: this.mobile, platform: this.platform, architecture: 'x86', bitness: '64', model: '', platformVersion: '10.0.0', uaFullVersion: '138.0.0.0', fullVersionList: this.brands }; } };
    navigator.javaEnabled = function () { return false; };
    navigator.plugins = plugins;
    navigator.mimeTypes = mimes;
    navigator.permissions = { query: function (p) { return { state: 'prompt', onchange: null, name: (p && p.name) || '' }; } };
    navigator.connection = { effectiveType: '4g', rtt: 50, downlink: 10, downlinkMax: Infinity, saveData: false, type: 'wifi', onchange: null };
    navigator.storage = { estimate: function () { return { quota: 200000000000, usage: 0 }; }, persisted: function () { return false; }, persist: function () { return true; } };
    navigator.credentials = {};
    navigator.mediaDevices = { enumerateDevices: function () { return []; }, getUserMedia: function () { return Promise.reject(new Error('NotAllowed')); } };
    navigator.serviceWorker = {};
    navigator.bluetooth = { getAvailability: function () { return Promise.resolve(false); } };
    navigator.getGamepads = function () { return [null, null, null, null]; };
    navigator.getBattery = function () { return { charging: true, chargingTime: 0, dischargingTime: Infinity, level: 1, addEventListener: function () {} }; };
    navigator.sendBeacon = function () { return true; };
    navigator.vibrate = function () { return true; };
    navigator.mediaSession = {};
    navigator.getStorageUpdates = function () {};
    navigator.registerProtocolHandler = function () {};
    navigator.requestMediaKeySystemAccess = function () { return Promise.reject(new Error('nope')); };
    navigator.requestWakeLock = function () { return Promise.reject(new Error('nope')); };
    Navigator.prototype = navigator;   // 脚本用 hasOwnProperty(Navigator.prototype, 'mediaDevices')

    // ===== 3. screen =====
    var screen = {
        width: 1536, height: 864, availWidth: 1536, availHeight: 816, availLeft: 0, availTop: 0,
        colorDepth: 24, pixelDepth: 24, orientation: { type: 'landscape-primary', angle: 0, onchange: null }
    };

    // ===== 4. window geometry =====
    var WIN = { innerWidth: 1042, innerHeight: 706, outerWidth: 1056, outerHeight: 800, devicePixelRatio: 1.25, screenX: 180, screenY: 88, scrollX: 0, scrollY: 0, pageXOffset: 0, pageYOffset: 0 };

    // ===== 5. location =====
    var location = { href: 'https://zh.delta.com/', origin: 'https://zh.delta.com', protocol: 'https:', host: 'zh.delta.com', hostname: 'zh.delta.com', port: '', pathname: '/', search: '', hash: '', ancestorOrigins: {}, toString: function () { return this.href; }, assign: function () {}, replace: function () {}, reload: function () {} };

    // ===== 6. history =====
    var history = { length: 2, state: null, scrollRestoration: 'auto', pushState: function () {}, replaceState: function () {}, go: function () {}, back: function () {}, forward: function () {} };

    // ===== 7. canvas 2d + webgl =====
    function Ctx2D(canvas) { this.canvas = canvas; this.fillStyle = '#000'; this.strokeStyle = '#000'; this.font = '10px sans-serif'; this.textBaseline = 'alphabetic'; this.globalAlpha = 1; this.lineWidth = 1; this.shadowBlur = 0; this.shadowColor = 'rgba(0,0,0,0)'; this.globalCompositeOperation = 'source-over'; }
    Ctx2D.prototype = {
        save: function () {}, restore: function () {}, scale: function () {}, rotate: function () {}, translate: function () {}, transform: function () {}, setTransform: function () {}, resetTransform: function () {},
        clearRect: function () {}, fillRect: function () {}, strokeRect: function () {}, beginPath: function () {}, closePath: function () {}, moveTo: function () {}, lineTo: function () {}, bezierCurveTo: function () {}, quadraticCurveTo: function () {}, arc: function () {}, arcTo: function () {}, rect: function () {}, fill: function () {}, stroke: function () {}, clip: function () {}, ellipse: function () {},
        fillText: function () {}, strokeText: function () {}, measureText: function (t) { t = String(t); return { width: t.length * 4.5, actualBoundingBoxAscent: 8, actualBoundingBoxDescent: 2, actualBoundingBoxLeft: 0, actualBoundingBoxRight: t.length * 4.5, fontBoundingBoxAscent: 10, fontBoundingBoxDescent: 3 }; },
        drawImage: function () {}, setLineDash: function () { return []; }, getLineDash: function () { return []; },
        createLinearGradient: function () { return { addColorStop: function () {} }; }, createRadialGradient: function () { return { addColorStop: function () {} }; }, createPattern: function () { return null; },
        getImageData: function (x, y, w, h) { return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }; },
        putImageData: function () {}, createImageData: function (w, h) { return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }; }
    };
    function WebGLRenderingContext(canvas) { this.canvas = canvas; this.drawingBufferWidth = canvas.width; this.drawingBufferHeight = canvas.height; }
    var GL_CONST = { VENDOR: 0x1F00, RENDERER: 0x1F01, VERSION: 0x1F02, SHADING_LANGUAGE_VERSION: 0x8B8C, MAX_TEXTURE_SIZE: 0x0D33, MAX_VIEWPORT_DIMS: 0x0D3A, UNMASKED_VENDOR_WEBGL: 0x9245, UNMASKED_RENDERER_WEBGL: 0x9246, MAX_TEXTURE_IMAGE_UNITS: 0x8872, MAX_VERTEX_ATTRIBS: 0x8869, MAX_VERTEX_UNIFORM_VECTORS: 0x8DFB, MAX_VARYING_VECTORS: 0x8DFC, MAX_FRAGMENT_UNIFORM_VECTORS: 0x8DFD, MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8B4D, MAX_CUBE_MAP_TEXTURE_SIZE: 0x851C, MAX_RENDERBUFFER_SIZE: 0x84E8, ALIASED_LINE_WIDTH_RANGE: 0x846E, ALIASED_POINT_SIZE_RANGE: 0x846D, MAX_VIEWPORT: 0x0D3A, DEPTH_BITS: 0x0D56, STENCIL_BITS: 0x0D57, RED_BITS: 0x0D52, GREEN_BITS: 0x0D53, BLUE_BITS: 0x0D54, ALPHA_BITS: 0x0D55, SUBPIXEL_BITS: 0x0D50, MAX_ELEMENT_INDEX: 0x8D6B };
    WebGLRenderingContext.prototype.getParameter = function (p) {
        var ext = this._ext || {};
        switch (p) {
            case GL_CONST.VENDOR: return 'WebKit';
            case GL_CONST.RENDERER: return 'WebKit WebGL';
            case GL_CONST.VERSION: return 'WebGL 1.0 (OpenGL ES 2.0 Chromium)';
            case GL_CONST.SHADING_LANGUAGE_VERSION: return 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)';
            case GL_CONST.UNMASKED_VENDOR_WEBGL: return __CAP.webglVendor;
            case GL_CONST.UNMASKED_RENDERER_WEBGL: return __CAP.webglRenderer;
            case GL_CONST.MAX_TEXTURE_SIZE: return 16384;
            case GL_CONST.MAX_VIEWPORT_DIMS: return new Int32Array([16384, 16384]);
            case GL_CONST.MAX_TEXTURE_IMAGE_UNITS: return 16;
            case GL_CONST.MAX_VERTEX_ATTRIBS: return 16;
            case GL_CONST.MAX_VERTEX_UNIFORM_VECTORS: return 4096;
            case GL_CONST.MAX_VARYING_VECTORS: return 30;
            case GL_CONST.MAX_FRAGMENT_UNIFORM_VECTORS: return 1024;
            case GL_CONST.MAX_COMBINED_TEXTURE_IMAGE_UNITS: return 32;
            case GL_CONST.MAX_CUBE_MAP_TEXTURE_SIZE: return 16384;
            case GL_CONST.MAX_RENDERBUFFER_SIZE: return 16384;
            case GL_CONST.ALIASED_LINE_WIDTH_RANGE: return new Float32Array([1, 1]);
            case GL_CONST.ALIASED_POINT_SIZE_RANGE: return new Float32Array([1, 1024]);
            case GL_CONST.DEPTH_BITS: return 24;
            case GL_CONST.STENCIL_BITS: return 8;
            case GL_CONST.RED_BITS: case GL_CONST.GREEN_BITS: case GL_CONST.BLUE_BITS: case GL_CONST.ALPHA_BITS: return 8;
            case GL_CONST.SUBPIXEL_BITS: return 4;
            case GL_CONST.MAX_ELEMENT_INDEX: return 4294967294;
            default: return 0;
        }
    };
    WebGLRenderingContext.prototype.getExtension = function (name) { if (name === 'WEBGL_debug_renderer_info') return { UNMASKED_VENDOR_WEBGL: GL_CONST.UNMASKED_VENDOR_WEBGL, UNMASKED_RENDERER_WEBGL: GL_CONST.UNMASKED_RENDERER_WEBGL }; return null; };
    WebGLRenderingContext.prototype.getSupportedExtensions = function () { return ['ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_clip_control', 'EXT_color_buffer_half_float', 'EXT_depth_clamp', 'EXT_disjoint_timer_query', 'EXT_float_blend', 'EXT_frag_depth', 'EXT_polygon_offset_clamp', 'EXT_shader_texture_lod', 'EXT_texture_compression_bptc', 'EXT_texture_filter_anisotropic', 'WEBGL_blend_func_extended', 'WEBGL_compressed_texture_s3tc', 'WEBGL_debug_renderer_info', 'WEBGL_debug_shaders', 'WEBGL_lose_context', 'OES_element_index_uint', 'OES_fbo_render_mipmap', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_vertex_array_object', 'WEBGL_depth_texture', 'WEBGL_draw_buffers', 'WEBGL_multi_draw']; };
    WebGLRenderingContext.prototype.getShaderPrecisionFormat = function () { return { rangeMin: 127, rangeMax: 127, precision: 23 }; };
    ['activeTexture', 'attachShader', 'bindBuffer', 'bufferData', 'clear', 'clearColor', 'compileShader', 'createBuffer', 'createProgram', 'createShader', 'disable', 'drawArrays', 'drawElements', 'enable', 'enableVertexAttribArray', 'getAttribLocation', 'getProgramParameter', 'getUniformLocation', 'linkProgram', 'shaderSource', 'uniformMatrix4fv', 'useProgram', 'vertexAttribPointer', 'viewport', 'createTexture', 'bindTexture', 'texImage2D', 'texParameteri', 'deleteBuffer', 'deleteProgram', 'deleteShader', 'getError'].forEach(function (m) { if (!WebGLRenderingContext.prototype[m]) WebGLRenderingContext.prototype[m] = function () { return null; }; });

    function Canvas(w, h) { this.width = w || 300; this.height = h || 150; this.tagName = 'CANVAS'; this.nodeName = 'CANVAS'; this.nodeType = 1; }
    Canvas.prototype.getContext = function (type) { if (type === '2d') return new Ctx2D(this); if (type === 'webgl' || type === 'experimental-webgl') return new WebGLRenderingContext(this); return null; };
    Canvas.prototype.toDataURL = function () { return __CAP.canvasDataUrl; };
    Canvas.prototype.toBlob = function (cb) { if (cb) cb(null); };
    Canvas.prototype.getAttribute = function () { return null; };
    Canvas.prototype.setAttribute = function () {};

    // ===== 8. elements =====
    function Element(tag) { this.tagName = String(tag || '').toUpperCase(); this.localName = String(tag || '').toLowerCase(); this.nodeName = this.tagName; this.nodeType = 1; this.childNodes = []; this.children = []; this.style = {}; this.dataset = {}; this.attributes = []; }
    Element.prototype.getAttribute = function (n) { return this['__a_' + n] !== undefined ? this['__a_' + n] : null; };
    Element.prototype.setAttribute = function (n, v) { this['__a_' + n] = String(v); };
    Element.prototype.removeAttribute = function (n) { delete this['__a_' + n]; };
    Element.prototype.hasAttribute = function (n) { return this['__a_' + n] !== undefined; };
    Element.prototype.appendChild = function (c) { this.childNodes.push(c); return c; };
    Element.prototype.removeChild = function (c) { return c; };
    Element.prototype.insertBefore = function (c) { return c; };
    Element.prototype.getElementsByTagName = function () { return []; };
    Element.prototype.getElementsByClassName = function () { return []; };
    Element.prototype.querySelector = function () { return null; };
    Element.prototype.querySelectorAll = function () { return []; };
    Element.prototype.addEventListener = function (kind, fn) { g.__addL(this, kind, fn); }; Element.prototype.removeEventListener = function (kind, fn) { g.__rmL(this, kind, fn); }; Element.prototype.dispatchEvent = function (ev) { if (ev && ev.type) g.__fire(ev.type, ev); return true; };
    Element.prototype.cloneNode = function () { return new Element(this.tagName); };
    Element.prototype.toString = function () { return '[object HTML' + this.tagName.charAt(0) + this.tagName.slice(1).toLowerCase() + 'Element]'; };
    Element.prototype.getBoundingClientRect = function () { return { x: 0, y: 0, top: 0, left: 0, right: 100, bottom: 20, width: 100, height: 20 }; };
    Element.prototype.offsetHeight = 20; Element.prototype.offsetWidth = 100;
    function makeEl(tag) {
        if (String(tag).toLowerCase() === 'canvas') return new Canvas();
        var e = new Element(tag);
        if (String(tag).toLowerCase() === 'input') { e.type = 'text'; e.value = ''; e.checked = false; e.name = ''; e.id = ''; e.maxLength = 524288; e.placeholder = ''; }
        return e;
    }
    var currentScript = makeEl('script');
    currentScript.src = 'https://zh.delta.com/mXsb/SVbE/j/dIn/knhZ0A/urp5bN3XuS1Qm6YtDu/OE1GanRlDQE/JwNZ/eklDfVI';

    // ===== 9. document (cookie 读+写) =====
    var _cookie = (typeof globalThis.__SEED_COOKIE === 'string') ? globalThis.__SEED_COOKIE : '';
    function Document() {}
    var document = new Document();
    document.nodeType = 9; document.readyState = 'complete'; document.title = ''; document.referrer = '';
    document.domain = 'zh.delta.com'; document.URL = location.href; document.documentURI = location.href;
    document.characterSet = 'UTF-8'; document.charset = 'UTF-8'; document.compatMode = 'CSS1Compat';
    document.visibilityState = 'visible'; document.hidden = false; document.activeElement = null;
    document.location = location; document.defaultView = null;
    document.createElement = function (t) { return makeEl(t); };
    document.createElementNS = function (ns, t) { return makeEl(t); };
    document.createTextNode = function (t) { return { nodeType: 3, data: String(t), textContent: String(t), length: String(t).length }; };
    document.createDocumentFragment = function () { return makeEl('fragment'); };
    document.getElementsByTagName = function (t) { return String(t).toLowerCase() === 'script' ? [currentScript] : []; };
    document.getElementsByTagNameNS = function () { return []; };
    document.getElementById = function () { return null; };
    document.getElementsByName = function () { return []; };
    document.getElementsByClassName = function () { return []; };
    document.querySelector = function () { return null; };
    document.querySelectorAll = function () { return []; };
    document.addEventListener = function (kind, fn) { g.__addL(document, kind, fn); }; document.removeEventListener = function (kind, fn) { g.__rmL(document, kind, fn); };
    document.dispatchEvent = function (ev) { if (ev && ev.type) g.__fire(ev.type, ev); return true; };
    document.head = makeEl('head'); document.body = makeEl('body'); document.documentElement = makeEl('html');
    document.scripts = [currentScript]; document.images = []; document.links = []; document.forms = []; document.embeds = [];
    document.currentScript = currentScript;
    document.write = function () {}; document.writeln = function () {};
    Object.defineProperty(document, 'cookie', {
        get: function () { return _cookie; },
        set: function (v) { v = String(v); _cookie = _cookie ? (_cookie + '; ' + v) : v; },
        configurable: true
    });
    document.querySelector = function () { return null; };
    document.createEvent = function () { return { initEvent: function () {}, initDeviceMotionEvent: function () {}, initCustomEvent: function () {} }; };

    // ---- 页面里的 input / form / button (脚本采 input 标签 -> ffs/inf; 键盘打在输入框上 -> kev) ----
    var _searchForm = makeEl('form');
    function __mkInput(name, type, box) {
        var el = makeEl('input');
        el.type = type || 'text'; el.name = name; el.id = name;
        el.setAttribute('name', name); el.setAttribute('id', name); el.setAttribute('type', el.type);
        el.offsetParent = document.body; el.form = _searchForm; el.disabled = false; el.readOnly = false;
        el.getBoundingClientRect = function () { return box; };
        return el;
    }
    var _boxInput = { x: 40, y: 120, top: 120, left: 40, right: 460, bottom: 156, width: 420, height: 36 };
    var _inputs = [
        __mkInput('origin', 'text', _boxInput), __mkInput('destination', 'search', _boxInput),
        __mkInput('departureDate', 'text', _boxInput), __mkInput('returnDate', 'text', _boxInput),
        __mkInput('paxCount', 'text', _boxInput), __mkInput('promoCode', 'text', _boxInput)
    ];
    var _boxBtn = { x: 480, y: 120, top: 120, left: 480, right: 620, bottom: 156, width: 140, height: 36 };
    var _submit = makeEl('button');
    _submit.type = 'submit'; _submit.name = 'search'; _submit.id = 'search-submit'; _submit.value = 'Search';
    _submit.offsetParent = document.body; _submit.getBoundingClientRect = function () { return _boxBtn; };
    _searchForm.appendChild && _searchForm.appendChild(_submit);
    _searchForm.querySelector = function () { return _submit; };
    _searchForm.getElementsByTagName = function () { return [_submit]; };
    document.getElementsByTagName = function (t) {
        t = String(t).toLowerCase();
        if (globalThis.__DBG) { try { console.log('GEBTN=' + t); } catch (e) {} }
        if (t === 'script') return [currentScript];
        if (t === 'input') return _inputs;
        if (t === 'button') return [_submit];
        if (t === 'form') return [_searchForm];
        return [];
    };
    document.getElementsByName = function (n) { var r = []; for (var ii = 0; ii < _inputs.length; ii++) if (_inputs[ii].name === n) r.push(_inputs[ii]); return r; };
    document.querySelector = function (sel) { return (String(sel).indexOf('button') >= 0) ? _submit : null; };

    // ===== 10. XMLHttpRequest (捕获 sensor_data) =====
    function XMLHttpRequest() {}
    XMLHttpRequest.prototype.open = function (m, u) { this._m = m; this._u = u; };
    XMLHttpRequest.prototype.send = function (b) { try { g.__sensor_data = b; } catch (e) {} };
    XMLHttpRequest.prototype.setRequestHeader = function () {}; XMLHttpRequest.prototype.getResponseHeader = function () { return null; }; XMLHttpRequest.prototype.getAllResponseHeaders = function () { return ''; }; XMLHttpRequest.prototype.addEventListener = function () {}; XMLHttpRequest.prototype.removeEventListener = function () {}; XMLHttpRequest.prototype.abort = function () {};

    // ===== 11. storage =====
    function Storage() {}
    Storage.prototype.getItem = function (k) { return this['__' + k] !== undefined ? this['__' + k] : null; };
    Storage.prototype.setItem = function (k, v) { this['__' + k] = String(v); };
    Storage.prototype.removeItem = function (k) { delete this['__' + k]; };
    Storage.prototype.clear = function () { var s = this; Object.keys(this).forEach(function (k) { if (k.indexOf('__') === 0) delete s[k]; }); };
    Storage.prototype.key = function (idx) { return Object.keys(this).filter(function (k) { return k.indexOf('__') === 0; })[idx] || null; };
    var local_storage = new Storage(); var session_storage = new Storage();

    // ===== 12. performance =====
    var __t0 = Date.now();
    var T = {};
    ['navigationStart', 'unloadEventStart', 'unloadEventEnd', 'redirectStart', 'redirectEnd', 'fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'secureConnectionStart', 'requestStart', 'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'].forEach(function (k, idx) { T[k] = __t0 + idx; });
    T.navigationStart = __t0; T.domLoading = __t0 + 30; T.domComplete = __t0 + 120; T.loadEventEnd = __t0 + 130;
    var performance = { now: function () { return (Date.now() - __t0) + Math.random(); }, timeOrigin: __t0, timing: T, navigation: { type: 0, redirectCount: 0 }, memory: { jsHeapSizeLimit: 2172649472, totalJSHeapSize: 30000000, usedJSHeapSize: 20000000 }, getEntries: function () { return []; }, mark: function () {}, measure: function () {} };

    // ===== 13. audio =====
    function AudioContext() { this.sampleRate = 44100; this.currentTime = 0; this.destination = {}; this.state = 'suspended'; }
    AudioContext.prototype.createOscillator = function () { return { type: 'sine', frequency: { value: 0, setValueAtTime: function () {} }, connect: function () {}, start: function () {}, stop: function () {} }; };
    AudioContext.prototype.createGain = function () { return { gain: { value: 1, setValueAtTime: function () {} }, connect: function () {} }; };
    AudioContext.prototype.createAnalyser = function () { return { getFloatFrequencyData: function (a) { for (var i = 0; i < a.length; i++) a[i] = -100; } }; };
    AudioContext.prototype.createScriptProcessor = function () { return { connect: function () {}, onaudioprocess: null }; };
    AudioContext.prototype.createDynamicsCompressor = function () { return { threshold: { value: -24 }, knee: { value: 30 }, ratio: { value: 12 }, attack: { value: 0.003 }, release: { value: 0.25 }, connect: function () {} }; };
    AudioContext.prototype.close = function () { return Promise.resolve(); };

    // ===== 14. 装配 =====
    g.window = g; g.self = g; g.top = g; g.parent = g; g.frames = g; g.globalThis = g;
    g.location = location; g.navigator = navigator; g.screen = screen; g.history = history; g.document = document;
    for (var kk in WIN) g[kk] = WIN[kk];
    g.Navigator = Navigator; g.HTMLDocument = Document; g.Document = Document;
    g.Element = Element; g.Node = Element; g.HTMLElement = Element; g.HTMLCanvasElement = Canvas; g.HTMLInputElement = Element; g.HTMLIFrameElement = function HTMLIFrameElement() {}; g.File = function File() {};
    g.EventTarget = function EventTarget() {};
    g.XMLHttpRequest = XMLHttpRequest;
    g.localStorage = local_storage; g.sessionStorage = session_storage; g.Storage = Storage;
    try { session_storage.setItem('ak_bm_tab_id', 'f3b0a2c1-9d4e-4b7a-8c2d-1e5f6a7b8c9d'); } catch (e) {}
    g.speechSynthesis = { getVoices: function () { return []; }, speak: function () {}, cancel: function () {}, pause: function () {}, resume: function () {}, onvoiceschanged: null, paused: false, pending: false, speaking: false };
    g.performance = performance;
    g.crypto = { getRandomValues: function (a) { for (var x = 0; x < a.length; x++) a[x] = Math.floor(Math.random() * 256); return a; }, randomUUID: function () { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }); } };
    g.AudioContext = AudioContext; g.webkitAudioContext = AudioContext; g.OfflineAudioContext = AudioContext; g.OfflineAudioContext.prototype.startRendering = function () { return Promise.resolve(this); }; g.OfflineAudioContext.prototype.getChannelData = function (ch) { var a = new Float32Array(44100); for (var x = 0; x < a.length; x++) a[x] = 0; return a; };
    g.CanvasRenderingContext2D = Ctx2D; g.WebGLRenderingContext = WebGLRenderingContext;
    g.chrome = { loadTimes: function () { return {}; }, csi: function () { return {}; }, app: { isInstalled: false, InstallState: {}, RunningState: {} } };
    g.RTCPeerConnection = function RTCPeerConnection() { this.createDataChannel = function () { return {}; }; this.createOffer = function () { return Promise.resolve({ type: 'offer', sdp: '' }); }; this.createAnswer = function () { return Promise.resolve({ type: 'answer', sdp: '' }); }; this.setLocalDescription = function () { return Promise.resolve(); }; this.setRemoteDescription = function () { return Promise.resolve(); }; this.close = function () {}; this.addEventListener = function () {}; };
    g.mozRTCPeerConnection = undefined;
    g.webkitRTCPeerConnection = g.RTCPeerConnection;

    // timers / events
    g.__q = [];
    if (typeof __setTimeout !== 'undefined') {
        // isolated-vm: use the host's real async timers (VMP needs genuine async ordering)
        g.setTimeout = function (fn, t) { try { __setTimeout.apply(undefined, [fn, t]); } catch (e) {} return 0; };
        g.setInterval = function (fn, t) { try { __setInterval.apply(undefined, [fn, t]); } catch (e) {} return 0; };
        g.clearTimeout = function () {}; g.clearInterval = function () {};
    } else if (!g.__REAL_TIMERS) {
        g.setTimeout = function (fn, t) { if (typeof fn === 'function') g.__q.push(fn); return g.__q.length; };
        g.setInterval = function (fn, t) { if (typeof fn === 'function') g.__q.push(fn); return g.__q.length; };
        g.clearTimeout = function () {}; g.clearInterval = function () {};
    }
    g.matchMedia = function (q) { return { matches: false, media: q || '', addListener: function () {}, removeListener: function () {}, addEventListener: function () {}, removeEventListener: function () {} }; };
    g.requestAnimationFrame = function (fn) { try { fn(Date.now()); } catch (e) {} return 0; }; g.cancelAnimationFrame = function () {};
    g.addEventListener = function (kind, fn) { g.__addL(g, kind, fn); }; g.removeEventListener = function (kind, fn) { g.__rmL(g, kind, fn); }; g.dispatchEvent = function (ev) { if (ev && ev.type) g.__fire(ev.type, ev); return true; };
    if (currentScript) { currentScript.addEventListener = function (kind, fn) { g.__addL(currentScript, kind, fn); }; }
})();
