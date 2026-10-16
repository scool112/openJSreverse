/* ============= 导入基本库 ============== */
const fs = require("fs");
const path = require("path");

/* ============= 传递的参数 ============== */
Arg = JSON.parse(process.argv[2])

/* ============= 基本对象 ============== */
locationhref = Arg['locationhref']
InterfaceUrl = Arg['InterfaceUrl']
html = fs.readFileSync(Arg['htmlpath'],"utf-8");
vmp = fs.readFileSync(Arg['vmppath'],"utf-8");

/* ============= 导入 sdenv ============== */
const sdenvpath =  Arg['sdenvpath']
const sdenv = require(sdenvpath);

/* ============= cookie存储 ============== */
const CookieJar =  sdenv.jsdom.CookieJar;
const jar = new CookieJar();
for (var i = 0;i<Arg['cookie'].length;i++){
    jar.setCookieSync(Arg['cookie'][i],InterfaceUrl)
}
const benchcookie = jar.getCookieStringSync(InterfaceUrl);


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

/* ============= 创建window ================= */
const dom = sdenv.jsdomFromText(html, {
    url: locationhref,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
    runScripts: "dangerously",
    resources: new LocalLoader(),
    cookieJar: jar,
    consoleConfig: { log: () => {}, info: () => {}, warn: () => {}, error: () => {}, table: () => {}, jsdomError: () => {} },
});
const { window } = dom;

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
window.eval(`
  var xhr = new XMLHttpRequest();
  xhr.open('GET', ${JSON.stringify(InterfaceUrl)}, true);
  xhr.setRequestHeader("Content-Type", 'application/json, text/plain, */*');
  xhr.send(${JSON.stringify(Arg["data"])});
`);


/* ============= 轮询 cookie是否生成 ================= */
const hasNewCookie = function(cookie,endNum){
    if (Arg['Whethermanual'] === "P1"){
        if (cookie.split("; ").length === endNum){
            return true
        }
        else{
            return false
        }
    }
    if (Arg['Whethermanual'] === "P2"){
        if (cookie.split("; ")[0].split('=')[1] != Arg['cookie'][0]){
            return true
        }
        else{
            return false
        }
    }
}
const timestamp = Date.now();
const polling = setInterval(() => {
    const cookie = jar.getCookieStringSync(InterfaceUrl);
    if (hasNewCookie(cookie,Arg['endNum'])) {          // 有任何变化（新 cookie / 值变了）
        clearInterval(polling);
        result = {}
        for (var i=0;i<cookie.split('; ').length;i++){
            key = cookie.split('; ')[i].split('=')[0]
            value = cookie.split('; ')[i].split('=')[1]
            result[key] = value
        }
        // console.log(cookie);
        console.log(JSON.stringify(result));
        process.exit(0);
    }
    if (Date.now() - timestamp > 15000) {      // 加超时，别死等
        clearInterval(polling);
        console.error('超时，未产出 cookie');
        process.exit(1);
    }
}, 300);

/* ============= 手动启动 vmp ================= */
(function(){
    if (Arg['Whethermanual'] === "P1"){
        const vmpStart = setInterval(() => {
            if (typeof window[Arg['linkstart'].split('()')[0]] === 'function') {
                clearInterval(vmpStart);
                console.log("启动 vmp ")
                try { window.eval(Arg['linkstart']); } catch (e) { console.error(e); }
            }
        }, 50);
    }
    if (Arg['Whethermanual'] === "P2"){
        const vmpStart = setInterval(() => {
            let t;
            try { t = window.eval('typeof $_ts !== "undefined" ? typeof $_ts.lcd : "none"'); }
            catch (e) { t = 'err'; }
            if (t === 'function') {                 // 说明外链 VMP 已加载并挂上了 $_ts.lcd
                clearInterval(vmpStart);
                console.log('启动 vmp: $_ts.lcd()');
                try { window.eval('$_ts.lcd()'); } catch (e) { console.error('启动异常', e); }
            }
        }, 50);
        setTimeout(() => clearInterval(vmpStart), 10000);   // 防死等
    }
}())
