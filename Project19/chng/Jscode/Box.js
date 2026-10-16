const IVM = require("isolated-vm");
const path = require("path");
const fs = require("fs");

/*  文件路径函数 */
function _findBoxDir() {
    function hasBox(dir) {
        try { return fs.existsSync(path.join(dir, 'Box.js')); } catch (e) { return false; }
    }
    var starts = [];
    try { starts.push(path.resolve(__dirname)); } catch (e) {}   // subprocess: 就是 Jscode
    try { starts.push(process.cwd()); } catch (e) {}             // execjs: resolve('.') = cwd
    for (var s = 0; s < starts.length; s++) {
        var dir = starts[s];
        while (true) {
            if (hasBox(dir)) return dir;                         // 本级有 Box.js
            try {                                                // 本级的一级子目录里找
                var subs = fs.readdirSync(dir);
                for (var i = 0; i < subs.length; i++) {
                    var sub = path.join(dir, subs[i]);
                    try { if (fs.statSync(sub).isDirectory() && hasBox(sub)) return sub; } catch (e) {}
                }
            } catch (e) {}
            var parent = path.dirname(dir);
            if (parent === dir) break;
            dir = parent;
        }
    }
    return null;
}
var BOX_DIR = _findBoxDir() || path.dirname(process.argv[1] || process.cwd());
function _findFile(name) { return path.join(BOX_DIR, name); }

/* 加载文件路径 */
const _Proxy = fs.readFileSync(_findFile("Proxy.js"), 'utf8');
const _ProxyList = fs.readFileSync(_findFile("ProxyList.js"), 'utf8');
const env = fs.readFileSync(_findFile("env.js"), 'utf8');
const JsBytecode = fs.readFileSync(_findFile("JsBytecode.js"), 'utf8');
const JsMvp = fs.readFileSync(_findFile("JsMvp.js"), 'utf8');

/* 创建沙箱 */
const ivm = new IVM.Isolate({ memoryLimit: 512 });
const context = ivm.createContextSync();

/*  加载沙箱需要的对应函数，模块 */
/* __hostLog：用 process.stderr.write + String 转换，避免 console.log 对 Symbol/对象抛错
 * （execjs 环境下 console.log 被其 print 覆盖，更易出问题） */
context.global.setSync('__hostLog', new IVM.Reference((...a) => process.stderr.write(a.map(String).join(" ") + "\n")));
context.global.setSync('setTimeout', new IVM.Reference((fn, ms) => setTimeout(fn, ms)));
const _wc = require('crypto').webcrypto;
const _subtle = _wc.subtle;
context.global.setSync('__hostBridge', new IVM.Reference({
    getRandomValues: _wc.getRandomValues.bind(_wc),
    randomUUID: _wc.randomUUID.bind(_wc),
    subtle: {
        digest: _subtle.digest.bind(_subtle),
        importKey: _subtle.importKey.bind(_subtle),
        generateKey: _subtle.generateKey.bind(_subtle),
        sign: _subtle.sign.bind(_subtle),
        verify: _subtle.verify.bind(_subtle),
        encrypt: _subtle.encrypt.bind(_subtle),
        decrypt: _subtle.decrypt.bind(_subtle),
        exportKey: _subtle.exportKey.bind(_subtle),
        deriveBits: _subtle.deriveBits.bind(_subtle),
        deriveKey: _subtle.deriveKey.bind(_subtle)
    }
}));
context.evalSync(`
    console = { log: function (...a) {
        __hostLog.apply(undefined, a.map(function (x) {
            return (typeof x === 'symbol' || typeof x === 'function' || typeof x === 'object')
                ? String(x) : x;
        }));
    } };
`);
context.evalSync(`
    (function () {
        var H = globalThis.__hostBridge;
        function pathRef(path) {
            var r = H;
            for (var i = 0; i < path.length; i++) r = r.getSync(path[i], { reference: true });
            return r;
        }
        function call(path, args, opts) { return pathRef(path).apply(undefined, args, opts); }
        function callSync(path, args, opts) { return pathRef(path).applySync(undefined, args, opts); }
        function SubtleCrypto() {}
        var subtle = new SubtleCrypto();
        subtle.digest = function (alg, data) {
            return call(['subtle', 'digest'], [alg, data], { arguments: { copy: true } }).then(function (ref) { return ref.copySync(); });
        };
        subtle.importKey = function () { return call(['subtle', 'importKey'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        subtle.generateKey = function () { return call(['subtle', 'generateKey'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        subtle.sign = function () { return call(['subtle', 'sign'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        subtle.verify = function () { return call(['subtle', 'verify'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        subtle.encrypt = function () { return call(['subtle', 'encrypt'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        subtle.decrypt = function () { return call(['subtle', 'decrypt'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        subtle.exportKey = function () { return call(['subtle', 'exportKey'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        subtle.deriveBits = function () { return call(['subtle', 'deriveBits'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        subtle.deriveKey = function () { return call(['subtle', 'deriveKey'], Array.prototype.slice.call(arguments), { arguments: { copy: true } }); };
        globalThis.crypto = {
            getRandomValues: function (arr) {
                var ret = callSync(['getRandomValues'], [arr], { arguments: { copy: true }, result: { copy: true } });
                if (ret) { for (var i = 0; i < arr.length; i++) arr[i] = ret[i]; }
                return arr;
            },
            randomUUID: function () { return callSync(['randomUUID'], [], { result: { copy: true } }); },
            subtle: subtle
        };
    })();
`);

/* 填充到沙箱中 */
context.evalSync(_Proxy)
context.evalSync(env)
context.evalSync(_ProxyList)
// js加密参数部分
context.evalSync(JsBytecode)
try {
    context.evalSync(JsMvp);
} catch (e) {
    console.error('JsMvp 崩:', e.message);
    setTimeout(() => process.exit(1), 300);
}
context.evalSync(`
function get_arg(){
    return document.cookie
}
function get_kbf(url, body){
    /* 触发 fetch，瑞数 hook 会注入 kbfJdf1e 到请求 URL/头 */
    globalThis.__kbf = { url: null, kbf: null, err: null };
    try {
        fetch(location.origin + url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        }).then(function(res){
            /* 瑞数把 kbfJdf1e 追加到 res.url */
            globalThis.__kbf.url = res.url;
            var m = String(res.url).match(/[?&]kbfJdf1e=([^&]+)/);
            globalThis.__kbf.kbf = m ? m[1] : null;
        }).catch(function(e){
            globalThis.__kbf.err = String(e && e.message || e);
        });
    } catch (e) { globalThis.__kbf.err = String(e && e.message || e); }
}`)

function get_arg(url, body){
  /* 触发 fetch 拿 kbfJdf1e（瑞数动态参数，412 拦截需要） */
  if (url) {
    context.evalSync(`get_kbf(${JSON.stringify(url)}, ${JSON.stringify(body)})`);
    /* 宿主忙等（沙箱微任务在宿主等待时仍会执行，已验证），轮询 __kbf 直到就绪 */
    var deadline = Date.now() + 4000;
    var kbf = null;
    while (Date.now() < deadline) {
      var st = context.evalSync(`JSON.stringify(globalThis.__kbf || null)`, { copy: true, timeout: 2000 });
      var parsed = JSON.parse(st);
      if (parsed && (parsed.url || parsed.err)) { kbf = parsed; break; }
    }
  }
  res = context.evalSync(`get_arg()`, { copy: true, timeout: 10000 })
  result = {
    'S6J51OuUjLieP': String(res).split("S6J51OuUjLieP=")[1]
  }
  if (kbf && kbf.kbf) result['kbfJdf1e'] = kbf.kbf;
  return result
}

/* execjs 通过 Js.call('get_arg', url, body) 调用；顶层不打印不阻塞 */
global.get_arg = get_arg;






