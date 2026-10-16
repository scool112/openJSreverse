const IVM = require("isolated-vm");
const fs = require("fs");
const path = require("path");

const ivm = new IVM.Isolate({ memoryLimit: 512 });
const context = ivm.createContextSync();

const proxy = fs.readFileSync(path.join(__dirname, "proxy.js"), "utf8");
const env = fs.readFileSync(path.join(__dirname, "env.js"), "utf8");
const proxylist = fs.readFileSync(path.join(__dirname, "proxylist.js"), "utf8");
const jscode = fs.readFileSync(path.join(__dirname, "jscode.js"), "utf8");
const loader = fs.readFileSync(path.join(__dirname, "loader.js"), "utf8");
const module1 = fs.readFileSync(path.join(__dirname, "module1.js"), "utf8");
const module2 = fs.readFileSync(path.join(__dirname, "module2.js"), "utf8");

// i = '{"funName":"getSkuByMaterialId","page":{"pageNo":2,"pageSize":60},"param":{"materialId":108,"secKillTimePeriod":16,"seckillTimeType":0,"requestScene":0,"requestExtFields":["shopInfo","orientations"]},"clientPageId":"jingfen_pc"}'
i = process.argv[2]

const hostLogs = [];
context.global.setSync("__hostLog", new IVM.Reference((...a) => {
    const line = a.map(x => (typeof x === "string") ? x : String(x)).join(" ");
    hostLogs.push(line);
    process.stderr.write(line + "\n");
}));
context.evalSync(`globalThis.__traceLogs = [];
var _S = String, _P = Array.prototype.push, _J = Array.prototype.join;
console = (function () {
    var _h = __hostLog;
    function mk(m) { return function (...a) {
        var args = a.map(function(x){ return _S(x); });
        var line = 'console.' + m + ': ' + _J.call(args, ' ');
        try { _P.call(globalThis.__traceLogs, line); } catch (e) {}
        _h.applySync(undefined, args);
    }; }
    return { log: mk('log'), info: mk('info'), warn: mk('warn'), error: mk('error'), debug: mk('debug'), trace: mk('trace') };
})();`);


context.evalSync(proxy)
context.evalSync(env)
context.evalSync(proxylist)

context.evalSync(loader)
context.evalSync(module1)
context.evalSync(module2)

context.evalSync(`
    F = function(){ return window.loader("36808"); };
    v = F().get("__jda");
    m = null == v ? void 0 : v.split(".")[1]
    b = {
        functionId: "unionSearchRecommend",
         appid: "unionpc",
         _: Date.now().toString(),
         loginType: "3",
         uuid: m,
        "x-api-eid-token": "你的x-api-eid-token"
    }
`)

context.evalSync(`Y = window.loader("52153");`)
context.evalSync(`
    w = {
    functionId: "unionSearchRecommend",
    appid: "unionpc",
    body: Y(${i}).toString()
    }
`)

context.evalSync(jscode)

context.evalSync(`
    x = new window.ParamsSign({
            appId: "586ae"
    })
`)
context.evalSync(`
     x.sign(w);
`)

const out1 = context.evalSync(`
    JSON.stringify(x.signSync(w));
`);
const out2 = JSON.parse(context.evalSync(`
       JSON.stringify(x.signSync(b));
`))
const y = JSON.parse(out1);
const h5st = encodeURI(y.h5st);
const result = JSON.stringify({
    "h5st":h5st,
    'functionId':out2['functionId'],
    'appid':out2['appid'],
    "_":out2["_"],
    'loginType':out2['loginType'],
    'uuid':out2['uuid'],
    'x-api-eid-token':out2['x-api-eid-token']
})
console.log(result)