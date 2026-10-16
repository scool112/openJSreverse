

crypto = require('crypto').webcrypto

var a = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
var s = function (t) { return "string" == typeof t && a.test(t); };
var c = [];
for (var h = 0; h < 256; ++h) c.push((h + 256).toString(16).substr(1));   // ← 十六进制表


e = {}

var n, o = new Uint8Array(16);
function i() {
    if (!n && !(n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto)))
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return n(o)
}

var p = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
        , r = (c[t[e + 0]] + c[t[e + 1]] + c[t[e + 2]] + c[t[e + 3]] + "-" + c[t[e + 4]] + c[t[e + 5]] + "-" + c[t[e + 6]] + c[t[e + 7]] + "-" + c[t[e + 8]] + c[t[e + 9]] + "-" + c[t[e + 10]] + c[t[e + 11]] + c[t[e + 12]] + c[t[e + 13]] + c[t[e + 14]] + c[t[e + 15]]).toLowerCase();
    if (!s(r))
        throw TypeError("Stringified UUID is invalid");
    return r
};

e.a = function(t, e, r) {
    var n = (t = t || {}).random || (t.rng || i)();
    if (n[6] = 15 & n[6] | 64,
        n[8] = 63 & n[8] | 128,
        e) {
        r = r || 0;
        for (var o = 0; o < 16; ++o)
            e[r + o] = n[o];
        return e
    }
    return p(n)
}


track_uuid = e.a({},undefined,undefined).replace(/-/g, "")
new_track_uuid = e.a({},undefined,undefined).replace(/-/g, "")
track_time = JSON.stringify(Date.now())

result = {
    "track_uuid":track_uuid,
    "new_track_uuid":new_track_uuid,
    "track_time":track_time
}

console.log(JSON.stringify(result))


