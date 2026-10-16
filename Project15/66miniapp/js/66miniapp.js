var RR = function() {
    return Math.round((new Date).getTime() / 1e3)
};
var NN = RR()

function VX(n, r) {
    return function(n, r) {
        var t, e, o = a(n), u = [], i = [];
        for (u[15] = i[15] = void 0,
             o.length > 16 && (o = c(o, 8 * n.length)),
                 t = 0; t < 16; t += 1)
            u[t] = 909522486 ^ o[t],
                i[t] = 1549556828 ^ o[t];
        return e = c(u.concat(a(r)), 512 + 8 * r.length),
            f(c(i.concat(e), 640))
    }(h(n), h(r))
}

function IX(n) {
    var r, t, e = "";
    for (t = 0; t < n.length; t += 1)
        r = n.charCodeAt(t),
            e += "0123456789abcdef".charAt(r >>> 4 & 15) + "0123456789abcdef".charAt(15 & r);
    return e
}

function HX(n) {
    return unescape(encodeURIComponent(n))
}

function AX(n) {
    var r, t = [];
    for (t[(n.length >> 2) - 1] = void 0,
             r = 0; r < t.length; r += 1)
        t[r] = 0;
    var e = 8 * n.length;
    for (r = 0; r < e; r += 8)
        t[r >> 5] |= (255 & n.charCodeAt(r / 8)) << r % 32;
    return t
}

function n(n, r) {
    var t = (65535 & n) + (65535 & r);
    return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t
}

function r(r, t, e, o, u, c) {
    return n((f = n(n(t, r), n(o, c))) << (a = u) | f >>> 32 - a, e);
    var f, a
}

function t(n, t, e, o, u, c, f) {
    return r(t & e | ~t & o, n, t, u, c, f)
}

function e(n, t, e, o, u, c, f) {
    return r(t & o | e & ~o, n, t, u, c, f)
}

function o(n, t, e, o, u, c, f) {
    return r(t ^ e ^ o, n, t, u, c, f)
}

function u(n, t, e, o, u, c, f) {
    return r(e ^ (t | ~o), n, t, u, c, f)
}


function CX(r, c) {
    var f, a, i, h, l;
    r[c >> 5] |= 128 << c % 32,
        r[14 + (c + 64 >>> 9 << 4)] = c;
    var v = 1732584193
        , d = -271733879
        , g = -1732584194
        , s = 271733878;
    for (f = 0; f < r.length; f += 16)
        a = v,
            i = d,
            h = g,
            l = s,
            v = t(v, d, g, s, r[f], 7, -680876936),
            s = t(s, v, d, g, r[f + 1], 12, -389564586),
            g = t(g, s, v, d, r[f + 2], 17, 606105819),
            d = t(d, g, s, v, r[f + 3], 22, -1044525330),
            v = t(v, d, g, s, r[f + 4], 7, -176418897),
            s = t(s, v, d, g, r[f + 5], 12, 1200080426),
            g = t(g, s, v, d, r[f + 6], 17, -1473231341),
            d = t(d, g, s, v, r[f + 7], 22, -45705983),
            v = t(v, d, g, s, r[f + 8], 7, 1770035416),
            s = t(s, v, d, g, r[f + 9], 12, -1958414417),
            g = t(g, s, v, d, r[f + 10], 17, -42063),
            d = t(d, g, s, v, r[f + 11], 22, -1990404162),
            v = t(v, d, g, s, r[f + 12], 7, 1804603682),
            s = t(s, v, d, g, r[f + 13], 12, -40341101),
            g = t(g, s, v, d, r[f + 14], 17, -1502002290),
            v = e(v, d = t(d, g, s, v, r[f + 15], 22, 1236535329), g, s, r[f + 1], 5, -165796510),
            s = e(s, v, d, g, r[f + 6], 9, -1069501632),
            g = e(g, s, v, d, r[f + 11], 14, 643717713),
            d = e(d, g, s, v, r[f], 20, -373897302),
            v = e(v, d, g, s, r[f + 5], 5, -701558691),
            s = e(s, v, d, g, r[f + 10], 9, 38016083),
            g = e(g, s, v, d, r[f + 15], 14, -660478335),
            d = e(d, g, s, v, r[f + 4], 20, -405537848),
            v = e(v, d, g, s, r[f + 9], 5, 568446438),
            s = e(s, v, d, g, r[f + 14], 9, -1019803690),
            g = e(g, s, v, d, r[f + 3], 14, -187363961),
            d = e(d, g, s, v, r[f + 8], 20, 1163531501),
            v = e(v, d, g, s, r[f + 13], 5, -1444681467),
            s = e(s, v, d, g, r[f + 2], 9, -51403784),
            g = e(g, s, v, d, r[f + 7], 14, 1735328473),
            v = o(v, d = e(d, g, s, v, r[f + 12], 20, -1926607734), g, s, r[f + 5], 4, -378558),
            s = o(s, v, d, g, r[f + 8], 11, -2022574463),
            g = o(g, s, v, d, r[f + 11], 16, 1839030562),
            d = o(d, g, s, v, r[f + 14], 23, -35309556),
            v = o(v, d, g, s, r[f + 1], 4, -1530992060),
            s = o(s, v, d, g, r[f + 4], 11, 1272893353),
            g = o(g, s, v, d, r[f + 7], 16, -155497632),
            d = o(d, g, s, v, r[f + 10], 23, -1094730640),
            v = o(v, d, g, s, r[f + 13], 4, 681279174),
            s = o(s, v, d, g, r[f], 11, -358537222),
            g = o(g, s, v, d, r[f + 3], 16, -722521979),
            d = o(d, g, s, v, r[f + 6], 23, 76029189),
            v = o(v, d, g, s, r[f + 9], 4, -640364487),
            s = o(s, v, d, g, r[f + 12], 11, -421815835),
            g = o(g, s, v, d, r[f + 15], 16, 530742520),
            v = u(v, d = o(d, g, s, v, r[f + 2], 23, -995338651), g, s, r[f], 6, -198630844),
            s = u(s, v, d, g, r[f + 7], 10, 1126891415),
            g = u(g, s, v, d, r[f + 14], 15, -1416354905),
            d = u(d, g, s, v, r[f + 5], 21, -57434055),
            v = u(v, d, g, s, r[f + 12], 6, 1700485571),
            s = u(s, v, d, g, r[f + 3], 10, -1894986606),
            g = u(g, s, v, d, r[f + 10], 15, -1051523),
            d = u(d, g, s, v, r[f + 1], 21, -2054922799),
            v = u(v, d, g, s, r[f + 8], 6, 1873313359),
            s = u(s, v, d, g, r[f + 15], 10, -30611744),
            g = u(g, s, v, d, r[f + 6], 15, -1560198380),
            d = u(d, g, s, v, r[f + 13], 21, 1309151649),
            v = u(v, d, g, s, r[f + 4], 6, -145523070),
            s = u(s, v, d, g, r[f + 11], 10, -1120210379),
            g = u(g, s, v, d, r[f + 2], 15, 718787259),
            d = u(d, g, s, v, r[f + 9], 21, -343485551),
            v = n(v, a),
            d = n(d, i),
            g = n(g, h),
            s = n(s, l);
    return [v, d, g, s]
}

function FX(n) {
    var r, t = "", e = 32 * n.length;
    for (r = 0; r < e; r += 8)
        t += String.fromCharCode(n[r >> 5] >>> r % 32 & 255);
    return t
}

function LX(n) {
    return function(n) {
        return FX(CX(AX(n), 8 * n.length))
    }(HX(n))
}

var OOX = {
    default:function(n, r, t) {
        return r ? t ? VX(r, n) : IX(VX(r, n)) : t ? LX(n) : IX(LX(n))
    }
}

AA = (0, OOX.default)(NN)

SS = (0, OOX.default)(NN)

UU = "request_url=".concat("client/search/house", "&content=").concat(NN, "&request_method=").concat("get", "&timestamp=").concat(NN, "&secret=").concat(AA)
LLL = (0, OOX.default)(UU);



function get_arg(){
    var Result = "timestamp=".concat(NN, ";oauth2=").concat(SS, ";signature=").concat(LLL, ";secret=").concat(AA)
    return Result
}

// console.log(get_arg())



