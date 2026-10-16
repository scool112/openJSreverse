/* indexP3.js —— 第三段：触发 PageQuery 让 VMP 追加 OWNRL2Cu（移植 cnipa2/Jscode/index3.js）
   思路：
     ① 用 meta + $_ts 内联块 + VMP，在【最小壳】里 eval 运行（不加载服务器整页 HTML）
     ② 记录 VMP 写入的 cookie（document.cookie setter -> __cookieWrites）
     ③ 发一个 PageQuery 的 XHR（不真发），VMP 会把 OWNRL2Cu 追加到 URL
     ④ stdout 末行输出 { finalUrl, cookieParts }
   Arg: { sdenvpath, UA, locationhref, InterfaceUrl, Body, Cookies:[name=value...], CookieUrl, MetaContent, jsbytepath, vmpcodepath } */
const fs = require("fs");
const Arg = JSON.parse(process.argv[2]);

const sdenv = require(Arg["sdenvpath"]);
const CookieJar = sdenv.jsdom.CookieJar;
const jar = new CookieJar();

const jsbyte = fs.readFileSync(Arg["jsbytepath"], "utf-8");   // $_ts 内联块
const vmpCode = fs.readFileSync(Arg["vmpcodepath"], "utf-8"); // VMP 代码
const metaContent = Arg["MetaContent"] || "";
const shell = '<!DOCTYPE html><html><head><meta id="K5MK4FPPNWrv" content="' + metaContent + '" r="m"></head><body></body></html>';

const dom = sdenv.jsdomFromText(shell, {
  url: Arg["locationhref"],
  userAgent: Arg["UA"],
  runScripts: "dangerously",
  cookieJar: jar,
  consoleConfig: { log(){}, info(){}, warn(){}, error(){}, table(){}, jsdomError(){} },
  beforeParse(window) {
    for (const name of ["setTimeout", "setInterval", "clearInterval", "clearTimeout"]) {
      const fn = window[name];
      if (typeof fn === "function") {
        Object.defineProperty(fn, "toString", { enumerable: false, configurable: true, writable: true, value: function () { return "function " + name + "() { [native code] }"; } });
      }
    }
    // 记录 VMP 写入的 cookie
    window.__cookieWrites = [];
    const cd = Object.getOwnPropertyDescriptor(window.Document.prototype, "cookie");
    Object.defineProperty(window.Document.prototype, "cookie", {
      get: cd.get,
      set: function (v) { window.__cookieWrites.push(String(v)); cd.set.call(this, v); },
      configurable: true,
    });
    // XHR open 捕获（不真发）
    window.__captured = [];
    const ro = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function (m, u) { this.__url = u; return ro.apply(this, arguments); };
    window.XMLHttpRequest.prototype.send = function (body) { window.__captured.push({ url: this.__url, body: body === undefined ? null : body }); };
  },
});
const { window } = dom;

// 灌入 IndexQuery 后的全量 cookie
for (const c of (Arg["Cookies"] || [])) { try { jar.setCookieSync(c, Arg["CookieUrl"]); } catch (e) {} }

// eval $_ts 块 + VMP（在干净窗口里跑，VMP 会 hook XHR）
window.eval(jsbyte);
window.eval(vmpCode);

// 触发 PageQuery（VMP 追加 OWNRL2Cu 到 URL）
window.eval(`
    var xhr = new XMLHttpRequest();
    xhr.open('POST', ${JSON.stringify(Arg["InterfaceUrl"])}, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(${JSON.stringify(Arg["Body"])});
`);

const cap = window.__captured[0];
if (!cap || !cap.url) {
  console.error("未捕获到 PageQuery 最终 URL（VMP 未 hook 或未追加）; captured=" + JSON.stringify(window.__captured));
  process.exit(1);
}
const cookieParts = [];
for (const line of (window.__cookieWrites || [])) {
  const semi = line.indexOf(";");
  const pair = (semi === -1 ? line : line.slice(0, semi)).trim();
  if (pair.indexOf("=") !== -1) cookieParts.push(pair);
}
console.log(JSON.stringify({ finalUrl: cap.url, cookieParts: cookieParts }));
process.exit(0);
