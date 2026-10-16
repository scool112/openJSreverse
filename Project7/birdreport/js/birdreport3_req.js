

window = global

var MD5 = function(r) {
    function n(o) {
        if (t[o])
            return t[o].exports;
        var e = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return r[o].call(e.exports, e, e.exports, n),
            e.l = !0,
            e.exports
    }
    var t = {};
    return n.m = r,
        n.c = t,
        n.i = function(r) {
            return r
        }
        ,
        n.d = function(r, t, o) {
            n.o(r, t) || Object.defineProperty(r, t, {
                configurable: !1,
                enumerable: !0,
                get: o
            })
        }
        ,
        n.n = function(r) {
            var t = r && r.__esModule ? function() {
                        return r.default
                    }
                    : function() {
                        return r
                    }
            ;
            return n.d(t, "a", t),
                t
        }
        ,
        n.o = function(r, n) {
            return Object.prototype.hasOwnProperty.call(r, n)
        }
        ,
        n.p = "",
        n(n.s = 4)
}
([function(r, n) {
    var t = {
        utf8: {
            stringToBytes: function(r) {
                return t.bin.stringToBytes(unescape(encodeURIComponent(r)))
            },
            bytesToString: function(r) {
                return decodeURIComponent(escape(t.bin.bytesToString(r)))
            }
        },
        bin: {
            stringToBytes: function(r) {
                for (var n = [], t = 0; t < r.length; t++)
                    n.push(255 & r.charCodeAt(t));
                return n
            },
            bytesToString: function(r) {
                for (var n = [], t = 0; t < r.length; t++)
                    n.push(String.fromCharCode(r[t]));
                return n.join("")
            }
        }
    };
    r.exports = t
}
    , function(r, n, t) {
        !function() {
            var n = t(2)
                , o = t(0).utf8
                , e = t(3)
                , u = t(0).bin
                , i = function(r, t) {
                r.constructor == String ? r = t && "binary" === t.encoding ? u.stringToBytes(r) : o.stringToBytes(r) : e(r) ? r = Array.prototype.slice.call(r, 0) : Array.isArray(r) || (r = r.toString());
                for (var f = n.bytesToWords(r), s = 8 * r.length, c = 1732584193, a = -271733879, l = -1732584194, g = 271733878, h = 0; h < f.length; h++)
                    f[h] = 16711935 & (f[h] << 8 | f[h] >>> 24) | 4278255360 & (f[h] << 24 | f[h] >>> 8);
                f[s >>> 5] |= 128 << s % 32,
                    f[14 + (s + 64 >>> 9 << 4)] = s;
                for (var p = i._ff, y = i._gg, v = i._hh, d = i._ii, h = 0; h < f.length; h += 16) {
                    var b = c
                        , T = a
                        , x = l
                        , B = g;
                    c = p(c, a, l, g, f[h + 0], 7, -680876936),
                        g = p(g, c, a, l, f[h + 1], 12, -389564586),
                        l = p(l, g, c, a, f[h + 2], 17, 606105819),
                        a = p(a, l, g, c, f[h + 3], 22, -1044525330),
                        c = p(c, a, l, g, f[h + 4], 7, -176418897),
                        g = p(g, c, a, l, f[h + 5], 12, 1200080426),
                        l = p(l, g, c, a, f[h + 6], 17, -1473231341),
                        a = p(a, l, g, c, f[h + 7], 22, -45705983),
                        c = p(c, a, l, g, f[h + 8], 7, 1770035416),
                        g = p(g, c, a, l, f[h + 9], 12, -1958414417),
                        l = p(l, g, c, a, f[h + 10], 17, -42063),
                        a = p(a, l, g, c, f[h + 11], 22, -1990404162),
                        c = p(c, a, l, g, f[h + 12], 7, 1804603682),
                        g = p(g, c, a, l, f[h + 13], 12, -40341101),
                        l = p(l, g, c, a, f[h + 14], 17, -1502002290),
                        a = p(a, l, g, c, f[h + 15], 22, 1236535329),
                        c = y(c, a, l, g, f[h + 1], 5, -165796510),
                        g = y(g, c, a, l, f[h + 6], 9, -1069501632),
                        l = y(l, g, c, a, f[h + 11], 14, 643717713),
                        a = y(a, l, g, c, f[h + 0], 20, -373897302),
                        c = y(c, a, l, g, f[h + 5], 5, -701558691),
                        g = y(g, c, a, l, f[h + 10], 9, 38016083),
                        l = y(l, g, c, a, f[h + 15], 14, -660478335),
                        a = y(a, l, g, c, f[h + 4], 20, -405537848),
                        c = y(c, a, l, g, f[h + 9], 5, 568446438),
                        g = y(g, c, a, l, f[h + 14], 9, -1019803690),
                        l = y(l, g, c, a, f[h + 3], 14, -187363961),
                        a = y(a, l, g, c, f[h + 8], 20, 1163531501),
                        c = y(c, a, l, g, f[h + 13], 5, -1444681467),
                        g = y(g, c, a, l, f[h + 2], 9, -51403784),
                        l = y(l, g, c, a, f[h + 7], 14, 1735328473),
                        a = y(a, l, g, c, f[h + 12], 20, -1926607734),
                        c = v(c, a, l, g, f[h + 5], 4, -378558),
                        g = v(g, c, a, l, f[h + 8], 11, -2022574463),
                        l = v(l, g, c, a, f[h + 11], 16, 1839030562),
                        a = v(a, l, g, c, f[h + 14], 23, -35309556),
                        c = v(c, a, l, g, f[h + 1], 4, -1530992060),
                        g = v(g, c, a, l, f[h + 4], 11, 1272893353),
                        l = v(l, g, c, a, f[h + 7], 16, -155497632),
                        a = v(a, l, g, c, f[h + 10], 23, -1094730640),
                        c = v(c, a, l, g, f[h + 13], 4, 681279174),
                        g = v(g, c, a, l, f[h + 0], 11, -358537222),
                        l = v(l, g, c, a, f[h + 3], 16, -722521979),
                        a = v(a, l, g, c, f[h + 6], 23, 76029189),
                        c = v(c, a, l, g, f[h + 9], 4, -640364487),
                        g = v(g, c, a, l, f[h + 12], 11, -421815835),
                        l = v(l, g, c, a, f[h + 15], 16, 530742520),
                        a = v(a, l, g, c, f[h + 2], 23, -995338651),
                        c = d(c, a, l, g, f[h + 0], 6, -198630844),
                        g = d(g, c, a, l, f[h + 7], 10, 1126891415),
                        l = d(l, g, c, a, f[h + 14], 15, -1416354905),
                        a = d(a, l, g, c, f[h + 5], 21, -57434055),
                        c = d(c, a, l, g, f[h + 12], 6, 1700485571),
                        g = d(g, c, a, l, f[h + 3], 10, -1894986606),
                        l = d(l, g, c, a, f[h + 10], 15, -1051523),
                        a = d(a, l, g, c, f[h + 1], 21, -2054922799),
                        c = d(c, a, l, g, f[h + 8], 6, 1873313359),
                        g = d(g, c, a, l, f[h + 15], 10, -30611744),
                        l = d(l, g, c, a, f[h + 6], 15, -1560198380),
                        a = d(a, l, g, c, f[h + 13], 21, 1309151649),
                        c = d(c, a, l, g, f[h + 4], 6, -145523070),
                        g = d(g, c, a, l, f[h + 11], 10, -1120210379),
                        l = d(l, g, c, a, f[h + 2], 15, 718787259),
                        a = d(a, l, g, c, f[h + 9], 21, -343485551),
                        c = c + b >>> 0,
                        a = a + T >>> 0,
                        l = l + x >>> 0,
                        g = g + B >>> 0
                }
                return n.endian([c, a, l, g])
            };
            i._ff = function(r, n, t, o, e, u, i) {
                var f = r + (n & t | ~n & o) + (e >>> 0) + i;
                return (f << u | f >>> 32 - u) + n
            }
                ,
                i._gg = function(r, n, t, o, e, u, i) {
                    var f = r + (n & o | t & ~o) + (e >>> 0) + i;
                    return (f << u | f >>> 32 - u) + n
                }
                ,
                i._hh = function(r, n, t, o, e, u, i) {
                    var f = r + (n ^ t ^ o) + (e >>> 0) + i;
                    return (f << u | f >>> 32 - u) + n
                }
                ,
                i._ii = function(r, n, t, o, e, u, i) {
                    var f = r + (t ^ (n | ~o)) + (e >>> 0) + i;
                    return (f << u | f >>> 32 - u) + n
                }
                ,
                i._blocksize = 16,
                i._digestsize = 16,
                r.exports = function(r, t) {
                    if (void 0 === r || null === r)
                        throw new Error("Illegal argument " + r);
                    var o = n.wordsToBytes(i(r, t));
                    return t && t.asBytes ? o : t && t.asString ? u.bytesToString(o) : n.bytesToHex(o)
                }
        }()
    }
    , function(r, n) {
        !function() {
            var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
                , t = {
                rotl: function(r, n) {
                    return r << n | r >>> 32 - n
                },
                rotr: function(r, n) {
                    return r << 32 - n | r >>> n
                },
                endian: function(r) {
                    if (r.constructor == Number)
                        return 16711935 & t.rotl(r, 8) | 4278255360 & t.rotl(r, 24);
                    for (var n = 0; n < r.length; n++)
                        r[n] = t.endian(r[n]);
                    return r
                },
                randomBytes: function(r) {
                    for (var n = []; r > 0; r--)
                        n.push(Math.floor(256 * Math.random()));
                    return n
                },
                bytesToWords: function(r) {
                    for (var n = [], t = 0, o = 0; t < r.length; t++,
                        o += 8)
                        n[o >>> 5] |= r[t] << 24 - o % 32;
                    return n
                },
                wordsToBytes: function(r) {
                    for (var n = [], t = 0; t < 32 * r.length; t += 8)
                        n.push(r[t >>> 5] >>> 24 - t % 32 & 255);
                    return n
                },
                bytesToHex: function(r) {
                    for (var n = [], t = 0; t < r.length; t++)
                        n.push((r[t] >>> 4).toString(16)),
                            n.push((15 & r[t]).toString(16));
                    return n.join("")
                },
                hexToBytes: function(r) {
                    for (var n = [], t = 0; t < r.length; t += 2)
                        n.push(parseInt(r.substr(t, 2), 16));
                    return n
                },
                bytesToBase64: function(r) {
                    for (var t = [], o = 0; o < r.length; o += 3)
                        for (var e = r[o] << 16 | r[o + 1] << 8 | r[o + 2], u = 0; u < 4; u++)
                            8 * o + 6 * u <= 8 * r.length ? t.push(n.charAt(e >>> 6 * (3 - u) & 63)) : t.push("=");
                    return t.join("")
                },
                base64ToBytes: function(r) {
                    r = r.replace(/[^A-Z0-9+\/]/gi, "");
                    for (var t = [], o = 0, e = 0; o < r.length; e = ++o % 4)
                        0 != e && t.push((n.indexOf(r.charAt(o - 1)) & Math.pow(2, -2 * e + 8) - 1) << 2 * e | n.indexOf(r.charAt(o)) >>> 6 - 2 * e);
                    return t
                }
            };
            r.exports = t
        }()
    }
    , function(r, n) {
        function t(r) {
            return !!r.constructor && "function" == typeof r.constructor.isBuffer && r.constructor.isBuffer(r)
        }
        function o(r) {
            return "function" == typeof r.readFloatLE && "function" == typeof r.slice && t(r.slice(0, 0))
        }
        r.exports = function(r) {
            return null != r && (t(r) || o(r) || !!r._isBuffer)
        }
    }
    , function(r, n, t) {
        r.exports = t(1)
    }
]);

rng_pptr = 0;
rng_pool = [];
var z = new Uint32Array(256);
window.crypto.getRandomValues(z);
for (t = 0; t < z.length; ++t) {
    rng_pool[rng_pptr++] = z[t] & 255
}

var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var rng_state;
var rng_psize = 256;
function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
        var v = x * this[i++] + w[j] + c;
        c = Math.floor(v / 67108864);
        w[j++] = v & 67108863
    }
    return c
}
var BI_RC = [];
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}

options = {}
options.data = {}


function getUuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1)
    }
    s[14] = "4";
    s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
    s[8] = s[13] = s[18] = s[23];
    var uuid = s.join("");
    return uuid
}
var decoder$1;
var Base64 = {
    decode: function(a) {
        var i;
        if (decoder$1 === undefined) {
            var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var ignore = "= \f\n\r\t \u2028\u2029";
            decoder$1 = Object.create(null);
            for (i = 0; i < 64; ++i) {
                decoder$1[b64.charAt(i)] = i
            }
            for (i = 0; i < ignore.length; ++i) {
                decoder$1[ignore.charAt(i)] = -1
            }
        }
        var out = [];
        var bits = 0;
        var char_count = 0;
        for (i = 0; i < a.length; ++i) {
            var c = a.charAt(i);
            if (c == "=") {
                break
            }
            c = decoder$1[c];
            if (c == -1) {
                continue
            }
            if (c === undefined) {
                throw new Error("Illegal character at offset " + i)
            }
            bits |= c;
            if (++char_count >= 4) {
                out[out.length] = bits >> 16;
                out[out.length] = bits >> 8 & 255;
                out[out.length] = bits & 255;
                bits = 0;
                char_count = 0
            } else {
                bits <<= 6
            }
        }
        switch (char_count) {
            case 1:
                throw new Error("Base64 encoding incomplete: at least 2 bits missing");
            case 2:
                out[out.length] = bits >> 10;
                break;
            case 3:
                out[out.length] = bits >> 16;
                out[out.length] = bits >> 8 & 255;
                break
        }
        return out
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(a) {
        var m = Base64.re.exec(a);
        if (m) {
            if (m[1]) {
                a = m[1]
            } else if (m[2]) {
                a = m[2]
            } else {
                throw new Error("RegExp out of sync")
            }
        }
        return Base64.decode(a)
    }
};
function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r
}

function int2char(n) {
    return BI_RM.charAt(n)
}
var b64pad = "=";
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63)
    }
    if (i + 1 == h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2)
    } else if (i + 2 == h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4)
    }
    while ((ret.length & 3) > 0) {
        ret += b64pad
    }
    return ret
}

function b64tohex(s) {
    var ret = "";
    var i;
    var k = 0;
    var slop = 0;
    for (i = 0; i < s.length; ++i) {
        if (s.charAt(i) == b64pad) {
            break
        }
        var v = b64map.indexOf(s.charAt(i));
        if (v < 0) {
            continue
        }
        if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1
        } else if (k == 1) {
            ret += int2char(slop << 2 | v >> 4);
            slop = v & 15;
            k = 2
        } else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3
        } else {
            ret += int2char(slop << 2 | v >> 4);
            ret += int2char(v & 15);
            k = 0
        }
    }
    if (k == 1) {
        ret += int2char(slop << 2)
    }
    return ret
}

var Arcfour = function() {
    function Arcfour() {
        this.i = 0;
        this.j = 0;
        this.S = []
    }
    Arcfour.prototype.init = function(key) {
        var i;
        var j;
        var t;
        for (i = 0; i < 256; ++i) {
            this.S[i] = i
        }
        j = 0;
        for (i = 0; i < 256; ++i) {
            j = j + this.S[i] + key[i % key.length] & 255;
            t = this.S[i];
            this.S[i] = this.S[j];
            this.S[j] = t
        }
        this.i = 0;
        this.j = 0
    }
    ;
    Arcfour.prototype.next = function() {
        var t;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        t = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t;
        return this.S[t + this.S[this.i] & 255]
    }
    ;
    return Arcfour
}();

function prng_newstate() {
    return new Arcfour
}

function rng_get_byte() {
    if (rng_state == null) {
        rng_state = prng_newstate();
        while (rng_pptr < rng_psize) {
            var random = Math.floor(65536 * Math.random());
            rng_pool[rng_pptr++] = random & 255
        }
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
            rng_pool[rng_pptr] = 0
        }
        rng_pptr = 0
    }
    return rng_state.next()
}

var SecureRandom = function() {
    function SecureRandom() {}
    SecureRandom.prototype.nextBytes = function(ba) {
        for (var i = 0; i < ba.length; ++i) {
            ba[i] = rng_get_byte()
        }
    }
    ;
    return SecureRandom
}();

function nbits(x) {
    var r = 1;
    var t;
    if ((t = x >>> 16) != 0) {
        x = t;
        r += 16
    }
    if ((t = x >> 8) != 0) {
        x = t;
        r += 8
    }
    if ((t = x >> 4) != 0) {
        x = t;
        r += 4
    }
    if ((t = x >> 2) != 0) {
        x = t;
        r += 2
    }
    if ((t = x >> 1) != 0) {
        x = t;
        r += 1
    }
    return r
}

function pkcs1pad2(s, n) {
    if (n < s.length + 11) {
        console.error("Message too long for RSA");
        return null
    }
    var ba = [];
    var i = s.length - 1;
    while (i >= 0 && n > 0) {
        var c = s.charCodeAt(i--);
        if (c < 128) {
            ba[--n] = c
        } else if (c > 127 && c < 2048) {
            ba[--n] = c & 63 | 128;
            ba[--n] = c >> 6 | 192
        } else {
            ba[--n] = c & 63 | 128;
            ba[--n] = c >> 6 & 63 | 128;
            ba[--n] = c >> 12 | 224
        }
    }
    ba[--n] = 0;
    var rng = new SecureRandom;
    var x = [];
    while (n > 2) {
        x[0] = 0;
        while (x[0] == 0) {
            rng.nextBytes(x)
        }
        ba[--n] = x[0]
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba)
}

function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return c == null ? -1 : c
}

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(d, b) {
            d.__proto__ = b
        }
        || function(d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]
        }
    ;
    return extendStatics(d, b)
};

var Stream = function() {
    function Stream(enc, pos) {
        this.hexDigits = "0123456789ABCDEF";
        if (enc instanceof Stream) {
            this.enc = enc.enc;
            this.pos = enc.pos
        } else {
            this.enc = enc;
            this.pos = pos
        }
    }
    Stream.prototype.get = function(pos) {
        if (pos === undefined) {
            pos = this.pos++
        }
        if (pos >= this.enc.length) {
            throw new Error("Requesting byte offset " + pos + " on a stream of length " + this.enc.length)
        }
        return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos]
    }
    ;
    Stream.prototype.hexByte = function(b) {
        return this.hexDigits.charAt(b >> 4 & 15) + this.hexDigits.charAt(b & 15)
    }
    ;
    Stream.prototype.hexDump = function(start, end, raw) {
        var s = "";
        for (var i = start; i < end; ++i) {
            s += this.hexByte(this.get(i));
            if (raw !== true) {
                switch (i & 15) {
                    case 7:
                        s += "  ";
                        break;
                    case 15:
                        s += "\n";
                        break;
                    default:
                        s += " "
                }
            }
        }
        return s
    }
    ;
    Stream.prototype.isASCII = function(start, end) {
        for (var i = start; i < end; ++i) {
            var c = this.get(i);
            if (c < 32 || c > 176) {
                return false
            }
        }
        return true
    }
    ;
    Stream.prototype.parseStringISO = function(start, end) {
        var s = "";
        for (var i = start; i < end; ++i) {
            s += String.fromCharCode(this.get(i))
        }
        return s
    }
    ;
    Stream.prototype.parseStringUTF = function(start, end) {
        var s = "";
        for (var i = start; i < end; ) {
            var c = this.get(i++);
            if (c < 128) {
                s += String.fromCharCode(c)
            } else if (c > 191 && c < 224) {
                s += String.fromCharCode((c & 31) << 6 | this.get(i++) & 63)
            } else {
                s += String.fromCharCode((c & 15) << 12 | (this.get(i++) & 63) << 6 | this.get(i++) & 63)
            }
        }
        return s
    }
    ;
    Stream.prototype.parseStringBMP = function(start, end) {
        var str = "";
        var hi;
        var lo;
        for (var i = start; i < end; ) {
            hi = this.get(i++);
            lo = this.get(i++);
            str += String.fromCharCode(hi << 8 | lo)
        }
        return str
    }
    ;
    Stream.prototype.parseTime = function(start, end, shortYear) {
        var s = this.parseStringISO(start, end);
        var m = (shortYear ? reTimeS : reTimeL).exec(s);
        if (!m) {
            return "Unrecognized time: " + s
        }
        if (shortYear) {
            m[1] = +m[1];
            m[1] += +m[1] < 70 ? 2e3 : 1900
        }
        s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
        if (m[5]) {
            s += ":" + m[5];
            if (m[6]) {
                s += ":" + m[6];
                if (m[7]) {
                    s += "." + m[7]
                }
            }
        }
        if (m[8]) {
            s += " UTC";
            if (m[8] != "Z") {
                s += m[8];
                if (m[9]) {
                    s += ":" + m[9]
                }
            }
        }
        return s
    }
    ;
    Stream.prototype.parseInteger = function(start, end) {
        var v = this.get(start);
        var neg = v > 127;
        var pad = neg ? 255 : 0;
        var len;
        var s = "";
        while (v == pad && ++start < end) {
            v = this.get(start)
        }
        len = end - start;
        if (len === 0) {
            return neg ? -1 : 0
        }
        if (len > 4) {
            s = v;
            len <<= 3;
            while (((+s ^ pad) & 128) == 0) {
                s = +s << 1;
                --len
            }
            s = "(" + len + " bit)\n"
        }
        if (neg) {
            v = v - 256
        }
        var n = new Int10(v);
        for (var i = start + 1; i < end; ++i) {
            n.mulAdd(256, this.get(i))
        }
        return s + n.toString()
    }
    ;
    Stream.prototype.parseBitString = function(start, end, maxLength) {
        var unusedBit = this.get(start);
        var lenBit = (end - start - 1 << 3) - unusedBit;
        var intro = "(" + lenBit + " bit)\n";
        var s = "";
        for (var i = start + 1; i < end; ++i) {
            var b = this.get(i);
            var skip = i == end - 1 ? unusedBit : 0;
            for (var j = 7; j >= skip; --j) {
                s += b >> j & 1 ? "1" : "0"
            }
            if (s.length > maxLength) {
                return intro + stringCut(s, maxLength)
            }
        }
        return intro + s
    }
    ;
    Stream.prototype.parseOctetString = function(start, end, maxLength) {
        if (this.isASCII(start, end)) {
            return stringCut(this.parseStringISO(start, end), maxLength)
        }
        var len = end - start;
        var s = "(" + len + " byte)\n";
        maxLength /= 2;
        if (len > maxLength) {
            end = start + maxLength
        }
        for (var i = start; i < end; ++i) {
            s += this.hexByte(this.get(i))
        }
        if (len > maxLength) {
            s += ellipsis
        }
        return s
    }
    ;
    Stream.prototype.parseOID = function(start, end, maxLength) {
        var s = "";
        var n = new Int10;
        var bits = 0;
        for (var i = start; i < end; ++i) {
            var v = this.get(i);
            n.mulAdd(128, v & 127);
            bits += 7;
            if (!(v & 128)) {
                if (s === "") {
                    n = n.simplify();
                    if (n instanceof Int10) {
                        n.sub(80);
                        s = "2." + n.toString()
                    } else {
                        var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                        s = m + "." + (n - m * 40)
                    }
                } else {
                    s += "." + n.toString()
                }
                if (s.length > maxLength) {
                    return stringCut(s, maxLength)
                }
                n = new Int10;
                bits = 0
            }
        }
        if (bits > 0) {
            s += ".incomplete"
        }
        return s
    }
    ;
    return Stream
}();

function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype,
        new __)
}

var Montgomery = function() {
    function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << m.DB - 15) - 1;
        this.mt2 = 2 * m.t
    }
    Montgomery.prototype.convert = function(x) {
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            this.m.subTo(r, r)
        }
        return r
    }
    ;
    Montgomery.prototype.revert = function(x) {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r
    }
    ;
    Montgomery.prototype.reduce = function(x) {
        while (x.t <= this.mt2) {
            x[x.t++] = 0
        }
        for (var i = 0; i < this.m.t; ++i) {
            var j = x[i] & 32767;
            var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
            j = i + this.m.t;
            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
            while (x[j] >= x.DV) {
                x[j] -= x.DV;
                x[++j]++
            }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x)
        }
    }
    ;
    Montgomery.prototype.mulTo = function(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r)
    }
    ;
    Montgomery.prototype.sqrTo = function(x, r) {
        x.squareTo(r);
        this.reduce(r)
    }
    ;
    return Montgomery
}();

function nbi() {
    return new BigInteger(null)
}

var BigInteger = function() {
    function BigInteger(a, b, c) {
        if (a != null) {
            if ("number" == typeof a) {
                this.fromNumber(a, b, c)
            } else if (b == null && "string" != typeof a) {
                this.fromString(a, 256)
            } else {
                this.fromString(a, b)
            }
        }
    }

    BigInteger.prototype.toString = function(b) {
        if (this.s < 0) {
            return "-" + this.negate().toString(b)
        }
        var k;
        if (b == 16) {
            k = 4
        } else if (b == 8) {
            k = 3
        } else if (b == 2) {
            k = 1
        } else if (b == 32) {
            k = 5
        } else if (b == 4) {
            k = 2
        } else {
            return this.toRadix(b)
        }
        var km = (1 << k) - 1;
        var d;
        var m = false;
        var r = "";
        var i = this.t;
        var p = this.DB - i * this.DB % k;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) > 0) {
                m = true;
                r = int2char(d)
            }
            while (i >= 0) {
                if (p < k) {
                    d = (this[i] & (1 << p) - 1) << k - p;
                    d |= this[--i] >> (p += this.DB - k)
                } else {
                    d = this[i] >> (p -= k) & km;
                    if (p <= 0) {
                        p += this.DB;
                        --i
                    }
                }
                if (d > 0) {
                    m = true
                }
                if (m) {
                    r += int2char(d)
                }
            }
        }
        return m ? r : "0"
    }
    ;
    BigInteger.prototype.negate = function() {
        var r = nbi();
        BigInteger.ZERO.subTo(this, r);
        return r
    }
    ;
    BigInteger.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this
    }
    ;
    BigInteger.prototype.compareTo = function(a) {
        var r = this.s - a.s;
        if (r != 0) {
            return r
        }
        var i = this.t;
        r = i - a.t;
        if (r != 0) {
            return this.s < 0 ? -r : r
        }
        while (--i >= 0) {
            if ((r = this[i] - a[i]) != 0) {
                return r
            }
        }
        return 0
    }
    ;
    BigInteger.prototype.bitLength = function() {
        if (this.t <= 0) {
            return 0
        }
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
    }
    ;
    BigInteger.prototype.mod = function(a) {
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            a.subTo(r, r)
        }
        return r
    }
    ;
    BigInteger.prototype.modPowInt = function(e, m) {
        var z;
        if (e < 256 || m.isEven()) {
            z = new Classic(m)
        } else {
            z = new Montgomery(m)
        }
        return this.exp(e, z)
    }
    ;
    BigInteger.prototype.clone = function() {
        var r = nbi();
        this.copyTo(r);
        return r
    }
    ;
    BigInteger.prototype.intValue = function() {
        if (this.s < 0) {
            if (this.t == 1) {
                return this[0] - this.DV
            } else if (this.t == 0) {
                return -1
            }
        } else if (this.t == 1) {
            return this[0]
        } else if (this.t == 0) {
            return 0
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }
    ;
    BigInteger.prototype.byteValue = function() {
        return this.t == 0 ? this.s : this[0] << 24 >> 24
    }
    ;
    BigInteger.prototype.shortValue = function() {
        return this.t == 0 ? this.s : this[0] << 16 >> 16
    }
    ;
    BigInteger.prototype.signum = function() {
        if (this.s < 0) {
            return -1
        } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
            return 0
        } else {
            return 1
        }
    }
    ;
    BigInteger.prototype.toByteArray = function() {
        var i = this.t;
        var r = [];
        r[0] = this.s;
        var p = this.DB - i * this.DB % 8;
        var d;
        var k = 0;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
                r[k++] = d | this.s << this.DB - p
            }
            while (i >= 0) {
                if (p < 8) {
                    d = (this[i] & (1 << p) - 1) << 8 - p;
                    d |= this[--i] >> (p += this.DB - 8)
                } else {
                    d = this[i] >> (p -= 8) & 255;
                    if (p <= 0) {
                        p += this.DB;
                        --i
                    }
                }
                if ((d & 128) != 0) {
                    d |= -256
                }
                if (k == 0 && (this.s & 128) != (d & 128)) {
                    ++k
                }
                if (k > 0 || d != this.s) {
                    r[k++] = d
                }
            }
        }
        return r
    }
    ;
    BigInteger.prototype.equals = function(a) {
        return this.compareTo(a) == 0
    }
    ;
    BigInteger.prototype.min = function(a) {
        return this.compareTo(a) < 0 ? this : a
    }
    ;
    BigInteger.prototype.max = function(a) {
        return this.compareTo(a) > 0 ? this : a
    }
    ;
    BigInteger.prototype.and = function(a) {
        var r = nbi();
        this.bitwiseTo(a, op_and, r);
        return r
    }
    ;
    BigInteger.prototype.or = function(a) {
        var r = nbi();
        this.bitwiseTo(a, op_or, r);
        return r
    }
    ;
    BigInteger.prototype.xor = function(a) {
        var r = nbi();
        this.bitwiseTo(a, op_xor, r);
        return r
    }
    ;
    BigInteger.prototype.andNot = function(a) {
        var r = nbi();
        this.bitwiseTo(a, op_andnot, r);
        return r
    }
    ;
    BigInteger.prototype.not = function() {
        var r = nbi();
        for (var i = 0; i < this.t; ++i) {
            r[i] = this.DM & ~this[i]
        }
        r.t = this.t;
        r.s = ~this.s;
        return r
    }
    ;
    BigInteger.prototype.shiftLeft = function(n) {
        var r = nbi();
        if (n < 0) {
            this.rShiftTo(-n, r)
        } else {
            this.lShiftTo(n, r)
        }
        return r
    }
    ;
    BigInteger.prototype.shiftRight = function(n) {
        var r = nbi();
        if (n < 0) {
            this.lShiftTo(-n, r)
        } else {
            this.rShiftTo(n, r)
        }
        return r
    }
    ;
    BigInteger.prototype.getLowestSetBit = function() {
        for (var i = 0; i < this.t; ++i) {
            if (this[i] != 0) {
                return i * this.DB + lbit(this[i])
            }
        }
        if (this.s < 0) {
            return this.t * this.DB
        }
        return -1
    }
    ;
    BigInteger.prototype.bitCount = function() {
        var r = 0;
        var x = this.s & this.DM;
        for (var i = 0; i < this.t; ++i) {
            r += cbit(this[i] ^ x)
        }
        return r
    }
    ;
    BigInteger.prototype.testBit = function(n) {
        var j = Math.floor(n / this.DB);
        if (j >= this.t) {
            return this.s != 0
        }
        return (this[j] & 1 << n % this.DB) != 0
    }
    ;
    BigInteger.prototype.setBit = function(n) {
        return this.changeBit(n, op_or)
    }
    ;
    BigInteger.prototype.clearBit = function(n) {
        return this.changeBit(n, op_andnot)
    }
    ;
    BigInteger.prototype.flipBit = function(n) {
        return this.changeBit(n, op_xor)
    }
    ;
    BigInteger.prototype.add = function(a) {
        var r = nbi();
        this.addTo(a, r);
        return r
    }
    ;
    BigInteger.prototype.subtract = function(a) {
        var r = nbi();
        this.subTo(a, r);
        return r
    }
    ;
    BigInteger.prototype.multiply = function(a) {
        var r = nbi();
        this.multiplyTo(a, r);
        return r
    }
    ;
    BigInteger.prototype.divide = function(a) {
        var r = nbi();
        this.divRemTo(a, r, null);
        return r
    }
    ;
    BigInteger.prototype.remainder = function(a) {
        var r = nbi();
        this.divRemTo(a, null, r);
        return r
    }
    ;
    BigInteger.prototype.divideAndRemainder = function(a) {
        var q = nbi();
        var r = nbi();
        this.divRemTo(a, q, r);
        return [q, r]
    }
    ;
    BigInteger.prototype.modPow = function(e, m) {
        var i = e.bitLength();
        var k;
        var r = nbv(1);
        var z;
        if (i <= 0) {
            return r
        } else if (i < 18) {
            k = 1
        } else if (i < 48) {
            k = 3
        } else if (i < 144) {
            k = 4
        } else if (i < 768) {
            k = 5
        } else {
            k = 6
        }
        if (i < 8) {
            z = new Classic(m)
        } else if (m.isEven()) {
            z = new Barrett(m)
        } else {
            z = new Montgomery(m)
        }
        var g = [];
        var n = 3;
        var k1 = k - 1;
        var km = (1 << k) - 1;
        g[1] = z.convert(this);
        if (k > 1) {
            var g2 = nbi();
            z.sqrTo(g[1], g2);
            while (n <= km) {
                g[n] = nbi();
                z.mulTo(g2, g[n - 2], g[n]);
                n += 2
            }
        }
        var j = e.t - 1;
        var w;
        var is1 = true;
        var r2 = nbi();
        var t;
        i = nbits(e[j]) - 1;
        while (j >= 0) {
            if (i >= k1) {
                w = e[j] >> i - k1 & km
            } else {
                w = (e[j] & (1 << i + 1) - 1) << k1 - i;
                if (j > 0) {
                    w |= e[j - 1] >> this.DB + i - k1
                }
            }
            n = k;
            while ((w & 1) == 0) {
                w >>= 1;
                --n
            }
            if ((i -= n) < 0) {
                i += this.DB;
                --j
            }
            if (is1) {
                g[w].copyTo(r);
                is1 = false
            } else {
                while (n > 1) {
                    z.sqrTo(r, r2);
                    z.sqrTo(r2, r);
                    n -= 2
                }
                if (n > 0) {
                    z.sqrTo(r, r2)
                } else {
                    t = r;
                    r = r2;
                    r2 = t
                }
                z.mulTo(r2, g[w], r)
            }
            while (j >= 0 && (e[j] & 1 << i) == 0) {
                z.sqrTo(r, r2);
                t = r;
                r = r2;
                r2 = t;
                if (--i < 0) {
                    i = this.DB - 1;
                    --j
                }
            }
        }
        return z.revert(r)
    }
    ;
    BigInteger.prototype.modInverse = function(m) {
        var ac = m.isEven();
        if (this.isEven() && ac || m.signum() == 0) {
            return BigInteger.ZERO
        }
        var u = m.clone();
        var v = this.clone();
        var a = nbv(1);
        var b = nbv(0);
        var c = nbv(0);
        var d = nbv(1);
        while (u.signum() != 0) {
            while (u.isEven()) {
                u.rShiftTo(1, u);
                if (ac) {
                    if (!a.isEven() || !b.isEven()) {
                        a.addTo(this, a);
                        b.subTo(m, b)
                    }
                    a.rShiftTo(1, a)
                } else if (!b.isEven()) {
                    b.subTo(m, b)
                }
                b.rShiftTo(1, b)
            }
            while (v.isEven()) {
                v.rShiftTo(1, v);
                if (ac) {
                    if (!c.isEven() || !d.isEven()) {
                        c.addTo(this, c);
                        d.subTo(m, d)
                    }
                    c.rShiftTo(1, c)
                } else if (!d.isEven()) {
                    d.subTo(m, d)
                }
                d.rShiftTo(1, d)
            }
            if (u.compareTo(v) >= 0) {
                u.subTo(v, u);
                if (ac) {
                    a.subTo(c, a)
                }
                b.subTo(d, b)
            } else {
                v.subTo(u, v);
                if (ac) {
                    c.subTo(a, c)
                }
                d.subTo(b, d)
            }
        }
        if (v.compareTo(BigInteger.ONE) != 0) {
            return BigInteger.ZERO
        }
        if (d.compareTo(m) >= 0) {
            return d.subtract(m)
        }
        if (d.signum() < 0) {
            d.addTo(m, d)
        } else {
            return d
        }
        if (d.signum() < 0) {
            return d.add(m)
        } else {
            return d
        }
    }
    ;
    BigInteger.prototype.pow = function(e) {
        return this.exp(e, new NullExp)
    }
    ;
    BigInteger.prototype.gcd = function(a) {
        var x = this.s < 0 ? this.negate() : this.clone();
        var y = a.s < 0 ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
            var t = x;
            x = y;
            y = t
        }
        var i = x.getLowestSetBit();
        var g = y.getLowestSetBit();
        if (g < 0) {
            return x
        }
        if (i < g) {
            g = i
        }
        if (g > 0) {
            x.rShiftTo(g, x);
            y.rShiftTo(g, y)
        }
        while (x.signum() > 0) {
            if ((i = x.getLowestSetBit()) > 0) {
                x.rShiftTo(i, x)
            }
            if ((i = y.getLowestSetBit()) > 0) {
                y.rShiftTo(i, y)
            }
            if (x.compareTo(y) >= 0) {
                x.subTo(y, x);
                x.rShiftTo(1, x)
            } else {
                y.subTo(x, y);
                y.rShiftTo(1, y)
            }
        }
        if (g > 0) {
            y.lShiftTo(g, y)
        }
        return y
    }
    ;
    BigInteger.prototype.isProbablePrime = function(t) {
        var i;
        var x = this.abs();
        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
            for (i = 0; i < lowprimes.length; ++i) {
                if (x[0] == lowprimes[i]) {
                    return true
                }
            }
            return false
        }
        if (x.isEven()) {
            return false
        }
        i = 1;
        while (i < lowprimes.length) {
            var m = lowprimes[i];
            var j = i + 1;
            while (j < lowprimes.length && m < lplim) {
                m *= lowprimes[j++]
            }
            m = x.modInt(m);
            while (i < j) {
                if (m % lowprimes[i++] == 0) {
                    return false
                }
            }
        }
        return x.millerRabin(t)
    }
    ;
    BigInteger.prototype.copyTo = function(r) {
        for (var i = this.t - 1; i >= 0; --i) {
            r[i] = this[i]
        }
        r.t = this.t;
        r.s = this.s
    }
    ;
    BigInteger.prototype.fromInt = function(x) {
        this.t = 1;
        this.s = x < 0 ? -1 : 0;
        if (x > 0) {
            this[0] = x
        } else if (x < -1) {
            this[0] = x + this.DV
        } else {
            this.t = 0
        }
    }
    ;
    BigInteger.prototype.fromString = function(s, b) {
        var k;
        if (b == 16) {
            k = 4
        } else if (b == 8) {
            k = 3
        } else if (b == 256) {
            k = 8
        } else if (b == 2) {
            k = 1
        } else if (b == 32) {
            k = 5
        } else if (b == 4) {
            k = 2
        } else {
            this.fromRadix(s, b);
            return
        }
        this.t = 0;
        this.s = 0;
        var i = s.length;
        var mi = false;
        var sh = 0;
        while (--i >= 0) {
            var x = k == 8 ? +s[i] & 255 : intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-") {
                    mi = true
                }
                continue
            }
            mi = false;
            if (sh == 0) {
                this[this.t++] = x
            } else if (sh + k > this.DB) {
                this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
                this[this.t++] = x >> this.DB - sh
            } else {
                this[this.t - 1] |= x << sh
            }
            sh += k;
            if (sh >= this.DB) {
                sh -= this.DB
            }
        }
        if (k == 8 && (+s[0] & 128) != 0) {
            this.s = -1;
            if (sh > 0) {
                this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh
            }
        }
        this.clamp();
        if (mi) {
            BigInteger.ZERO.subTo(this, this)
        }
    }
    ;
    BigInteger.prototype.clamp = function() {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c) {
            --this.t
        }
    }
    ;
    BigInteger.prototype.dlShiftTo = function(n, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i) {
            r[i + n] = this[i]
        }
        for (i = n - 1; i >= 0; --i) {
            r[i] = 0
        }
        r.t = this.t + n;
        r.s = this.s
    }
    ;
    BigInteger.prototype.drShiftTo = function(n, r) {
        for (var i = n; i < this.t; ++i) {
            r[i - n] = this[i]
        }
        r.t = Math.max(this.t - n, 0);
        r.s = this.s
    }
    ;
    BigInteger.prototype.lShiftTo = function(n, r) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB);
        var c = this.s << bs & this.DM;
        for (var i = this.t - 1; i >= 0; --i) {
            r[i + ds + 1] = this[i] >> cbs | c;
            c = (this[i] & bm) << bs
        }
        for (var i = ds - 1; i >= 0; --i) {
            r[i] = 0
        }
        r[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp()
    }
    ;
    BigInteger.prototype.rShiftTo = function(n, r) {
        r.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
            r.t = 0;
            return
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
            r[i - ds - 1] |= (this[i] & bm) << cbs;
            r[i - ds] = this[i] >> bs
        }
        if (bs > 0) {
            r[this.t - ds - 1] |= (this.s & bm) << cbs
        }
        r.t = this.t - ds;
        r.clamp()
    }
    ;
    BigInteger.prototype.subTo = function(a, r) {
        var i = 0;
        var c = 0;
        var m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] - a[i];
            r[i++] = c & this.DM;
            c >>= this.DB
        }
        if (a.t < this.t) {
            c -= a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB
            }
            c += this.s
        } else {
            c += this.s;
            while (i < a.t) {
                c -= a[i];
                r[i++] = c & this.DM;
                c >>= this.DB
            }
            c -= a.s
        }
        r.s = c < 0 ? -1 : 0;
        if (c < -1) {
            r[i++] = this.DV + c
        } else if (c > 0) {
            r[i++] = c
        }
        r.t = i;
        r.clamp()
    }
    ;
    BigInteger.prototype.multiplyTo = function(a, r) {
        var x = this.abs();
        var y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) {
            r[i] = 0
        }
        for (i = 0; i < y.t; ++i) {
            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t)
        }
        r.s = 0;
        r.clamp();
        if (this.s != a.s) {
            BigInteger.ZERO.subTo(r, r)
        }
    }
    ;
    BigInteger.prototype.squareTo = function(r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0) {
            r[i] = 0
        }
        for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x[i], r, 2 * i, 0, 1);
            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                r[i + x.t] -= x.DV;
                r[i + x.t + 1] = 1
            }
        }
        if (r.t > 0) {
            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1)
        }
        r.s = 0;
        r.clamp()
    }
    ;
    BigInteger.prototype.divRemTo = function(m, q, r) {
        var pm = m.abs();
        if (pm.t <= 0) {
            return
        }
        var pt = this.abs();
        if (pt.t < pm.t) {
            if (q != null) {
                q.fromInt(0)
            }
            if (r != null) {
                this.copyTo(r)
            }
            return
        }
        if (r == null) {
            r = nbi()
        }
        var y = nbi();
        var ts = this.s;
        var ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
            pm.lShiftTo(nsh, y);
            pt.lShiftTo(nsh, r)
        } else {
            pm.copyTo(y);
            pt.copyTo(r)
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) {
            return
        }
        var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt;
        var d2 = (1 << this.F1) / yt;
        var e = 1 << this.F2;
        var i = r.t;
        var j = i - ys;
        var t = q == null ? nbi() : q;
        y.dlShiftTo(j, t);
        if (r.compareTo(t) >= 0) {
            r[r.t++] = 1;
            r.subTo(t, r)
        }
        BigInteger.ONE.dlShiftTo(ys, t);
        t.subTo(y, y);
        while (y.t < ys) {
            y[y.t++] = 0
        }
        while (--j >= 0) {
            var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
                y.dlShiftTo(j, t);
                r.subTo(t, r);
                while (r[i] < --qd) {
                    r.subTo(t, r)
                }
            }
        }
        if (q != null) {
            r.drShiftTo(ys, q);
            if (ts != ms) {
                BigInteger.ZERO.subTo(q, q)
            }
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) {
            r.rShiftTo(nsh, r)
        }
        if (ts < 0) {
            BigInteger.ZERO.subTo(r, r)
        }
    }
    ;
    BigInteger.prototype.invDigit = function() {
        if (this.t < 1) {
            return 0
        }
        var x = this[0];
        if ((x & 1) == 0) {
            return 0
        }
        var y = x & 3;
        y = y * (2 - (x & 15) * y) & 15;
        y = y * (2 - (x & 255) * y) & 255;
        y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
        y = y * (2 - x * y % this.DV) % this.DV;
        return y > 0 ? this.DV - y : -y
    }
    ;
    BigInteger.prototype.isEven = function() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0
    }
    ;
    BigInteger.prototype.exp = function(e, z) {
        if (e > 4294967295 || e < 1) {
            return BigInteger.ONE
        }
        var r = nbi();
        var r2 = nbi();
        var g = z.convert(this);
        var i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
            z.sqrTo(r, r2);
            if ((e & 1 << i) > 0) {
                z.mulTo(r2, g, r)
            } else {
                var t = r;
                r = r2;
                r2 = t
            }
        }
        return z.revert(r)
    }
    ;
    BigInteger.prototype.chunkSize = function(r) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r))
    }
    ;
    BigInteger.prototype.toRadix = function(b) {
        if (b == null) {
            b = 10
        }
        if (this.signum() == 0 || b < 2 || b > 36) {
            return "0"
        }
        var cs = this.chunkSize(b);
        var a = Math.pow(b, cs);
        var d = nbv(a);
        var y = nbi();
        var z = nbi();
        var r = "";
        this.divRemTo(d, y, z);
        while (y.signum() > 0) {
            r = (a + z.intValue()).toString(b).substr(1) + r;
            y.divRemTo(d, y, z)
        }
        return z.intValue().toString(b) + r
    }
    ;
    BigInteger.prototype.fromRadix = function(s, b) {
        this.fromInt(0);
        if (b == null) {
            b = 10
        }
        var cs = this.chunkSize(b);
        var d = Math.pow(b, cs);
        var mi = false;
        var j = 0;
        var w = 0;
        for (var i = 0; i < s.length; ++i) {
            var x = intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-" && this.signum() == 0) {
                    mi = true
                }
                continue
            }
            w = b * w + x;
            if (++j >= cs) {
                this.dMultiply(d);
                this.dAddOffset(w, 0);
                j = 0;
                w = 0
            }
        }
        if (j > 0) {
            this.dMultiply(Math.pow(b, j));
            this.dAddOffset(w, 0)
        }
        if (mi) {
            BigInteger.ZERO.subTo(this, this)
        }
    }
    ;
    BigInteger.prototype.fromNumber = function(a, b, c) {
        if ("number" == typeof b) {
            if (a < 2) {
                this.fromInt(1)
            } else {
                this.fromNumber(a, c);
                if (!this.testBit(a - 1)) {
                    this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this)
                }
                if (this.isEven()) {
                    this.dAddOffset(1, 0)
                }
                while (!this.isProbablePrime(b)) {
                    this.dAddOffset(2, 0);
                    if (this.bitLength() > a) {
                        this.subTo(BigInteger.ONE.shiftLeft(a - 1), this)
                    }
                }
            }
        } else {
            var x = [];
            var t = a & 7;
            x.length = (a >> 3) + 1;
            b.nextBytes(x);
            if (t > 0) {
                x[0] &= (1 << t) - 1
            } else {
                x[0] = 0
            }
            this.fromString(x, 256)
        }
    }
    ;
    BigInteger.prototype.bitwiseTo = function(a, op, r) {
        var i;
        var f;
        var m = Math.min(a.t, this.t);
        for (i = 0; i < m; ++i) {
            r[i] = op(this[i], a[i])
        }
        if (a.t < this.t) {
            f = a.s & this.DM;
            for (i = m; i < this.t; ++i) {
                r[i] = op(this[i], f)
            }
            r.t = this.t
        } else {
            f = this.s & this.DM;
            for (i = m; i < a.t; ++i) {
                r[i] = op(f, a[i])
            }
            r.t = a.t
        }
        r.s = op(this.s, a.s);
        r.clamp()
    }
    ;
    BigInteger.prototype.changeBit = function(n, op) {
        var r = BigInteger.ONE.shiftLeft(n);
        this.bitwiseTo(r, op, r);
        return r
    }
    ;
    BigInteger.prototype.addTo = function(a, r) {
        var i = 0;
        var c = 0;
        var m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] + a[i];
            r[i++] = c & this.DM;
            c >>= this.DB
        }
        if (a.t < this.t) {
            c += a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB
            }
            c += this.s
        } else {
            c += this.s;
            while (i < a.t) {
                c += a[i];
                r[i++] = c & this.DM;
                c >>= this.DB
            }
            c += a.s
        }
        r.s = c < 0 ? -1 : 0;
        if (c > 0) {
            r[i++] = c
        } else if (c < -1) {
            r[i++] = this.DV + c
        }
        r.t = i;
        r.clamp()
    }
    ;
    BigInteger.prototype.dMultiply = function(n) {
        this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp()
    }
    ;
    BigInteger.prototype.dAddOffset = function(n, w) {
        if (n == 0) {
            return
        }
        while (this.t <= w) {
            this[this.t++] = 0
        }
        this[w] += n;
        while (this[w] >= this.DV) {
            this[w] -= this.DV;
            if (++w >= this.t) {
                this[this.t++] = 0
            }
            ++this[w]
        }
    }
    ;
    BigInteger.prototype.multiplyLowerTo = function(a, n, r) {
        var i = Math.min(this.t + a.t, n);
        r.s = 0;
        r.t = i;
        while (i > 0) {
            r[--i] = 0
        }
        for (var j = r.t - this.t; i < j; ++i) {
            r[i + this.t] = this.am(0, a[i], r, i, 0, this.t)
        }
        for (var j = Math.min(a.t, n); i < j; ++i) {
            this.am(0, a[i], r, i, 0, n - i)
        }
        r.clamp()
    }
    ;
    BigInteger.prototype.multiplyUpperTo = function(a, n, r) {
        --n;
        var i = r.t = this.t + a.t - n;
        r.s = 0;
        while (--i >= 0) {
            r[i] = 0
        }
        for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
            r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n)
        }
        r.clamp();
        r.drShiftTo(1, r)
    }
    ;
    BigInteger.prototype.modInt = function(n) {
        if (n <= 0) {
            return 0
        }
        var d = this.DV % n;
        var r = this.s < 0 ? n - 1 : 0;
        if (this.t > 0) {
            if (d == 0) {
                r = this[0] % n
            } else {
                for (var i = this.t - 1; i >= 0; --i) {
                    r = (d * r + this[i]) % n
                }
            }
        }
        return r
    }
    ;
    BigInteger.prototype.millerRabin = function(t) {
        var n1 = this.subtract(BigInteger.ONE);
        var k = n1.getLowestSetBit();
        if (k <= 0) {
            return false
        }
        var r = n1.shiftRight(k);
        t = t + 1 >> 1;
        if (t > lowprimes.length) {
            t = lowprimes.length
        }
        var a = nbi();
        for (var i = 0; i < t; ++i) {
            a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
            var y = a.modPow(r, this);
            if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
                var j = 1;
                while (j++ < k && y.compareTo(n1) != 0) {
                    y = y.modPowInt(2, this);
                    if (y.compareTo(BigInteger.ONE) == 0) {
                        return false
                    }
                }
                if (y.compareTo(n1) != 0) {
                    return false
                }
            }
        }
        return true
    }
    ;
    BigInteger.prototype.square = function() {
        var r = nbi();
        this.squareTo(r);
        return r
    }
    ;
    BigInteger.prototype.gcda = function(a, callback) {
        var x = this.s < 0 ? this.negate() : this.clone();
        var y = a.s < 0 ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
            var t = x;
            x = y;
            y = t
        }
        var i = x.getLowestSetBit();
        var g = y.getLowestSetBit();
        if (g < 0) {
            callback(x);
            return
        }
        if (i < g) {
            g = i
        }
        if (g > 0) {
            x.rShiftTo(g, x);
            y.rShiftTo(g, y)
        }
        var gcda1 = function() {
            if ((i = x.getLowestSetBit()) > 0) {
                x.rShiftTo(i, x)
            }
            if ((i = y.getLowestSetBit()) > 0) {
                y.rShiftTo(i, y)
            }
            if (x.compareTo(y) >= 0) {
                x.subTo(y, x);
                x.rShiftTo(1, x)
            } else {
                y.subTo(x, y);
                y.rShiftTo(1, y)
            }
            if (!(x.signum() > 0)) {
                if (g > 0) {
                    y.lShiftTo(g, y)
                }
                setTimeout(function() {
                    callback(y)
                }, 0)
            } else {
                setTimeout(gcda1, 0)
            }
        };
        setTimeout(gcda1, 10)
    }
    ;
    BigInteger.prototype.fromNumberAsync = function(a, b, c, callback) {
        if ("number" == typeof b) {
            if (a < 2) {
                this.fromInt(1)
            } else {
                this.fromNumber(a, c);
                if (!this.testBit(a - 1)) {
                    this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this)
                }
                if (this.isEven()) {
                    this.dAddOffset(1, 0)
                }
                var bnp_1 = this;
                var bnpfn1_1 = function() {
                    bnp_1.dAddOffset(2, 0);
                    if (bnp_1.bitLength() > a) {
                        bnp_1.subTo(BigInteger.ONE.shiftLeft(a - 1), bnp_1)
                    }
                    if (bnp_1.isProbablePrime(b)) {
                        setTimeout(function() {
                            callback()
                        }, 0)
                    } else {
                        setTimeout(bnpfn1_1, 0)
                    }
                };
                setTimeout(bnpfn1_1, 0)
            }
        } else {
            var x = [];
            var t = a & 7;
            x.length = (a >> 3) + 1;
            b.nextBytes(x);
            if (t > 0) {
                x[0] &= (1 << t) - 1
            } else {
                x[0] = 0
            }
            this.fromString(x, 256)
        }
    }
    ;
    return BigInteger
}();
BigInteger.ONE = nbv(1);
var canary = 0xdeadbeefcafe;
var j_lm = (canary & 16777215) == 15715070;
var dbits;
if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = am2;
    dbits = 30
} else if (j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = am1;
    dbits = 26
} else {
    BigInteger.prototype.am = am3;
    dbits = 28
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;


var RSAKey = function() {
    function RSAKey() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null
    }
    RSAKey.prototype.doPublic = function(x) {
        return x.modPowInt(this.e, this.n)
    }
    ;
    RSAKey.prototype.doPrivate = function(x) {
        if (this.p == null || this.q == null) {
            return x.modPow(this.d, this.n)
        }
        var xp = x.mod(this.p).modPow(this.dmp1, this.p);
        var xq = x.mod(this.q).modPow(this.dmq1, this.q);
        while (xp.compareTo(xq) < 0) {
            xp = xp.add(this.p)
        }
        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq)
    }
    ;
    RSAKey.prototype.setPublic = function(N, E) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16)
        } else {
            console.error("Invalid RSA public key")
        }
    }
    ;
    RSAKey.prototype.encrypt = function(text) {
        var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);
        if (m == null) {
            return null
        }
        var c = this.doPublic(m);
        if (c == null) {
            return null
        }
        var h = c.toString(16);
        if ((h.length & 1) == 0) {
            return h
        } else {
            return "0" + h
        }
    }
    ;
    RSAKey.prototype.encryptLong = function(text) {
        var _this = this;
        var maxLength = (this.n.bitLength() + 7 >> 3) - 11;
            var ct_1 = "";
            if (text.length > maxLength) {
                var lt = text.match(/.{1,117}/g);
                lt.forEach(function(entry){
                    var t1 = _this.encrypt(entry);
                    ct_1 += t1
                });
                return hex2b64(ct_1)
            }
            var t = this.encrypt(text);
            var y = hex2b64(t);
            return y

    }
    ;
    RSAKey.prototype.decryptLong = function(text) {
        var _this = this;
        var maxLength = this.n.bitLength() + 7 >> 3;
        text = b64tohex(text);
        try {
            if (text.length > maxLength) {
                var ct_2 = "";
                var lt = text.match(/.{1,256}/g);
                lt.forEach(function(entry) {
                    var t1 = _this.decrypt(entry);
                    ct_2 += t1
                });
                return ct_2
            }
            var y = this.decrypt(text);
            return y
        } catch (ex) {
            return false
        }
    }
    ;
    RSAKey.prototype.setPrivate = function(N, E, D) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16)
        } else {
            console.error("Invalid RSA private key")
        }
    }
    ;
    RSAKey.prototype.setPrivateEx = function(N, E, D, P, Q, DP, DQ, C) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
            this.p = parseBigInt(P, 16);
            this.q = parseBigInt(Q, 16);
            this.dmp1 = parseBigInt(DP, 16);
            this.dmq1 = parseBigInt(DQ, 16);
            this.coeff = parseBigInt(C, 16)
        } else {
            console.error("Invalid RSA private key")
        }
    }
    ;
    RSAKey.prototype.generate = function(B, E) {
        var rng = new SecureRandom;
        var qs = B >> 1;
        this.e = parseInt(E, 16);
        var ee = new BigInteger(E,16);
        for (; ; ) {
            for (; ; ) {
                this.p = new BigInteger(B - qs,1,rng);
                if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                    break
                }
            }
            for (; ; ) {
                this.q = new BigInteger(qs,1,rng);
                if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                    break
                }
            }
            if (this.p.compareTo(this.q) <= 0) {
                var t = this.p;
                this.p = this.q;
                this.q = t
            }
            var p1 = this.p.subtract(BigInteger.ONE);
            var q1 = this.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);
            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                this.n = this.p.multiply(this.q);
                this.d = ee.modInverse(phi);
                this.dmp1 = this.d.mod(p1);
                this.dmq1 = this.d.mod(q1);
                this.coeff = this.q.modInverse(this.p);
                break
            }
        }
    }
    ;
    RSAKey.prototype.decrypt = function(ctext) {
        var c = parseBigInt(ctext, 16);
        var m = this.doPrivate(c);
        if (m == null) {
            return null
        }
        return pkcs1unpad2(m, this.n.bitLength() + 7 >> 3)
    }
    ;
    RSAKey.prototype.generateAsync = function(B, E, callback) {
        var rng = new SecureRandom;
        var qs = B >> 1;
        this.e = parseInt(E, 16);
        var ee = new BigInteger(E,16);
        var rsa = this;
        var loop1 = function() {
            var loop4 = function() {
                if (rsa.p.compareTo(rsa.q) <= 0) {
                    var t = rsa.p;
                    rsa.p = rsa.q;
                    rsa.q = t
                }
                var p1 = rsa.p.subtract(BigInteger.ONE);
                var q1 = rsa.q.subtract(BigInteger.ONE);
                var phi = p1.multiply(q1);
                if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                    rsa.n = rsa.p.multiply(rsa.q);
                    rsa.d = ee.modInverse(phi);
                    rsa.dmp1 = rsa.d.mod(p1);
                    rsa.dmq1 = rsa.d.mod(q1);
                    rsa.coeff = rsa.q.modInverse(rsa.p);
                    setTimeout(function() {
                        callback()
                    }, 0)
                } else {
                    setTimeout(loop1, 0)
                }
            };
            var loop3 = function() {
                rsa.q = nbi();
                rsa.q.fromNumberAsync(qs, 1, rng, function() {
                    rsa.q.subtract(BigInteger.ONE).gcda(ee, function(r) {
                        if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                            setTimeout(loop4, 0)
                        } else {
                            setTimeout(loop3, 0)
                        }
                    })
                })
            };
            var loop2 = function() {
                rsa.p = nbi();
                rsa.p.fromNumberAsync(B - qs, 1, rng, function() {
                    rsa.p.subtract(BigInteger.ONE).gcda(ee, function(r) {
                        if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                            setTimeout(loop3, 0)
                        } else {
                            setTimeout(loop2, 0)
                        }
                    })
                })
            };
            setTimeout(loop2, 0)
        };
        setTimeout(loop1, 0)
    }
    ;
    RSAKey.prototype.sign = function(text, digestMethod, digestName) {
        var header = getDigestHeader(digestName);
        var digest = header + digestMethod(text).toString();
        var m = pkcs1pad1(digest, this.n.bitLength() / 4);
        if (m == null) {
            return null
        }
        var c = this.doPrivate(m);
        if (c == null) {
            return null
        }
        var h = c.toString(16);
        if ((h.length & 1) == 0) {
            return h
        } else {
            return "0" + h
        }
    }
    ;
    RSAKey.prototype.verify = function(text, signature, digestMethod) {
        var c = parseBigInt(signature, 16);
        var m = this.doPublic(c);
        if (m == null) {
            return null
        }
        var unpadded = m.toString(16).replace(/^1f+00/, "");
        var digest = removeDigestHeader(unpadded);
        return digest == digestMethod(text).toString()
    }
    ;
    return RSAKey
}();

var ASN1 = function() {
    function ASN1(stream, header, length, tag, sub) {
        if (!(tag instanceof ASN1Tag)) {
            throw new Error("Invalid tag value.")
        }
        this.stream = stream;
        this.header = header;
        this.length = length;
        this.tag = tag;
        this.sub = sub
    }
    ASN1.prototype.typeName = function() {
        switch (this.tag.tagClass) {
            case 0:
                switch (this.tag.tagNumber) {
                    case 0:
                        return "EOC";
                    case 1:
                        return "BOOLEAN";
                    case 2:
                        return "INTEGER";
                    case 3:
                        return "BIT_STRING";
                    case 4:
                        return "OCTET_STRING";
                    case 5:
                        return "NULL";
                    case 6:
                        return "OBJECT_IDENTIFIER";
                    case 7:
                        return "ObjectDescriptor";
                    case 8:
                        return "EXTERNAL";
                    case 9:
                        return "REAL";
                    case 10:
                        return "ENUMERATED";
                    case 11:
                        return "EMBEDDED_PDV";
                    case 12:
                        return "UTF8String";
                    case 16:
                        return "SEQUENCE";
                    case 17:
                        return "SET";
                    case 18:
                        return "NumericString";
                    case 19:
                        return "PrintableString";
                    case 20:
                        return "TeletexString";
                    case 21:
                        return "VideotexString";
                    case 22:
                        return "IA5String";
                    case 23:
                        return "UTCTime";
                    case 24:
                        return "GeneralizedTime";
                    case 25:
                        return "GraphicString";
                    case 26:
                        return "VisibleString";
                    case 27:
                        return "GeneralString";
                    case 28:
                        return "UniversalString";
                    case 30:
                        return "BMPString"
                }
                return "Universal_" + this.tag.tagNumber.toString();
            case 1:
                return "Application_" + this.tag.tagNumber.toString();
            case 2:
                return "[" + this.tag.tagNumber.toString() + "]";
            case 3:
                return "Private_" + this.tag.tagNumber.toString()
        }
    }
    ;
    ASN1.prototype.content = function(maxLength) {
        if (this.tag === undefined) {
            return null
        }
        if (maxLength === undefined) {
            maxLength = Infinity
        }
        var content = this.posContent();
        var len = Math.abs(this.length);
        if (!this.tag.isUniversal()) {
            if (this.sub !== null) {
                return "(" + this.sub.length + " elem)"
            }
            return this.stream.parseOctetString(content, content + len, maxLength)
        }
        switch (this.tag.tagNumber) {
            case 1:
                return this.stream.get(content) === 0 ? "false" : "true";
            case 2:
                return this.stream.parseInteger(content, content + len);
            case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);
            case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
            case 6:
                return this.stream.parseOID(content, content + len, maxLength);
            case 16:
            case 17:
                if (this.sub !== null) {
                    return "(" + this.sub.length + " elem)"
                } else {
                    return "(no elem)"
                }
            case 12:
                return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
                return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
            case 30:
                return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
            case 23:
            case 24:
                return this.stream.parseTime(content, content + len, this.tag.tagNumber == 23)
        }
        return null
    }
    ;
    ASN1.prototype.toString = function() {
        return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]"
    }
    ;
    ASN1.prototype.toPrettyString = function(indent) {
        if (indent === undefined) {
            indent = ""
        }
        var s = indent + this.typeName() + " @" + this.stream.pos;
        if (this.length >= 0) {
            s += "+"
        }
        s += this.length;
        if (this.tag.tagConstructed) {
            s += " (constructed)"
        } else if (this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null) {
            s += " (encapsulates)"
        }
        s += "\n";
        if (this.sub !== null) {
            indent += "  ";
            for (var i = 0, max = this.sub.length; i < max; ++i) {
                s += this.sub[i].toPrettyString(indent)
            }
        }
        return s
    }
    ;
    ASN1.prototype.posStart = function() {
        return this.stream.pos
    }
    ;
    ASN1.prototype.posContent = function() {
        return this.stream.pos + this.header
    }
    ;
    ASN1.prototype.posEnd = function() {
        return this.stream.pos + this.header + Math.abs(this.length)
    }
    ;
    ASN1.prototype.toHexString = function() {
        return this.stream.hexDump(this.posStart(), this.posEnd(), true)
    }
    ;
    ASN1.decodeLength = function(stream) {
        var buf = stream.get();
        var len = buf & 127;
        if (len == buf) {
            return len
        }
        if (len > 6) {
            throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1))
        }
        if (len === 0) {
            return null
        }
        buf = 0;
        for (var i = 0; i < len; ++i) {
            buf = buf * 256 + stream.get()
        }
        return buf
    }
    ;
    ASN1.prototype.getHexStringValue = function() {
        var hexString = this.toHexString();
        var offset = this.header * 2;
        var length = this.length * 2;
        return hexString.substr(offset, length)
    }
    ;
    ASN1.decode = function(str) {
        var stream;
        if (!(str instanceof Stream)) {
            stream = new Stream(str,0)
        } else {
            stream = str
        }
        var streamStart = new Stream(stream);
        var tag = new ASN1Tag(stream);
        var len = ASN1.decodeLength(stream);
        var start = stream.pos;
        var header = start - streamStart.pos;
        var sub = null;
        var getSub = function() {
            var ret = [];
            if (len !== null) {
                var end = start + len;
                while (stream.pos < end) {
                    ret[ret.length] = ASN1.decode(stream)
                }
                if (stream.pos != end) {
                    throw new Error("Content size is not correct for container starting at offset " + start)
                }
            } else {
                    for (; ; ) {
                        var s = ASN1.decode(stream);
                        if (s.tag.isEOC()) {
                            break
                        }
                        ret[ret.length] = s
                    }
                    len = start - stream.pos

            }
            return ret
        };
        if (tag.tagConstructed) {
            sub = getSub()
        } else if (tag.isUniversal() && (tag.tagNumber == 3 || tag.tagNumber == 4)) {
                if (tag.tagNumber == 3) {
                    if (stream.get() != 0) {
                        throw new Error("BIT STRINGs with unused bits cannot encapsulate.")
                    }
                }
                sub = getSub();
                for (var i = 0; i < sub.length; ++i) {
                    if (sub[i].tag.isEOC()) {
                        throw new Error("EOC is not supposed to be actual content.")
                    }
                }

        }
        if (sub === null) {
            if (len === null) {
                throw new Error("We can't skip over an invalid tag with undefined length at offset " + start)
            }
            stream.pos = start + Math.abs(len)
        }
        return new ASN1(streamStart,header,len,tag,sub)
    }
    ;
    return ASN1
}();

var ASN1Tag = function() {
    function ASN1Tag(stream) {
        var buf = stream.get();
        this.tagClass = buf >> 6;
        this.tagConstructed = (buf & 32) !== 0;
        this.tagNumber = buf & 31;
        if (this.tagNumber == 31) {
            var n = new Int10;
            do {
                buf = stream.get();
                n.mulAdd(128, buf & 127)
            } while (buf & 128);
            this.tagNumber = n.simplify()
        }
    }
    ASN1Tag.prototype.isUniversal = function() {
        return this.tagClass === 0
    }
    ;
    ASN1Tag.prototype.isEOC = function() {
        return this.tagClass === 0 && this.tagNumber === 0
    }
    ;
    return ASN1Tag
}();

function parseBigInt(str, r) {
    return new BigInteger(str,r)
}

var JSEncryptRSAKey = function(_super) {
    __extends(JSEncryptRSAKey, _super);
    function JSEncryptRSAKey(key) {
        var _this = _super.call(this) || this;
        if (key) {
            if (typeof key === "string") {
                _this.parseKey(key)
            } else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) || JSEncryptRSAKey.hasPublicKeyProperty(key)) {
                _this.parsePropertiesFrom(key)
            }
        }
        return _this
    }
    JSEncryptRSAKey.prototype.parseKey = function(pem) {
            var modulus = 0;
            var public_exponent = 0;
            var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
            var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
            var asn1 = ASN1.decode(der);
            if (asn1.sub.length === 3) {
                asn1 = asn1.sub[2].sub[0]
            }
            if (asn1.sub.length === 9) {
                modulus = asn1.sub[1].getHexStringValue();
                this.n = parseBigInt(modulus, 16);
                public_exponent = asn1.sub[2].getHexStringValue();
                this.e = parseInt(public_exponent, 16);
                var private_exponent = asn1.sub[3].getHexStringValue();
                this.d = parseBigInt(private_exponent, 16);
                var prime1 = asn1.sub[4].getHexStringValue();
                this.p = parseBigInt(prime1, 16);
                var prime2 = asn1.sub[5].getHexStringValue();
                this.q = parseBigInt(prime2, 16);
                var exponent1 = asn1.sub[6].getHexStringValue();
                this.dmp1 = parseBigInt(exponent1, 16);
                var exponent2 = asn1.sub[7].getHexStringValue();
                this.dmq1 = parseBigInt(exponent2, 16);
                var coefficient = asn1.sub[8].getHexStringValue();
                this.coeff = parseBigInt(coefficient, 16)
            } else if (asn1.sub.length === 2) {
                var bit_string = asn1.sub[1];
                var sequence = bit_string.sub[0];
                modulus = sequence.sub[0].getHexStringValue();
                this.n = parseBigInt(modulus, 16);
                public_exponent = sequence.sub[1].getHexStringValue();
                this.e = parseInt(public_exponent, 16)
            } else {
                return false
            }
            return true
    }
    ;
    JSEncryptRSAKey.prototype.getPrivateBaseKey = function() {
        var options = {
            array: [new KJUR.asn1.DERInteger({
                int: 0
            }), new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                int: this.e
            }), new KJUR.asn1.DERInteger({
                bigint: this.d
            }), new KJUR.asn1.DERInteger({
                bigint: this.p
            }), new KJUR.asn1.DERInteger({
                bigint: this.q
            }), new KJUR.asn1.DERInteger({
                bigint: this.dmp1
            }), new KJUR.asn1.DERInteger({
                bigint: this.dmq1
            }), new KJUR.asn1.DERInteger({
                bigint: this.coeff
            })]
        };
        var seq = new KJUR.asn1.DERSequence(options);
        return seq.getEncodedHex()
    }
    ;
    JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function() {
        return hex2b64(this.getPrivateBaseKey())
    }
    ;
    JSEncryptRSAKey.prototype.getPublicBaseKey = function() {
        var first_sequence = new KJUR.asn1.DERSequence({
            array: [new KJUR.asn1.DERObjectIdentifier({
                oid: "1.2.840.113549.1.1.1"
            }), new KJUR.asn1.DERNull]
        });
        var second_sequence = new KJUR.asn1.DERSequence({
            array: [new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                int: this.e
            })]
        });
        var bit_string = new KJUR.asn1.DERBitString({
            hex: "00" + second_sequence.getEncodedHex()
        });
        var seq = new KJUR.asn1.DERSequence({
            array: [first_sequence, bit_string]
        });
        return seq.getEncodedHex()
    }
    ;
    JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function() {
        return hex2b64(this.getPublicBaseKey())
    }
    ;
    JSEncryptRSAKey.wordwrap = function(str, width) {
        width = width || 64;
        if (!str) {
            return str
        }
        var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
        return str.match(RegExp(regex, "g")).join("\n")
    }
    ;
    JSEncryptRSAKey.prototype.getPrivateKey = function() {
        var key = "-----BEGIN RSA PRIVATE KEY-----\n";
        key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
        key += "-----END RSA PRIVATE KEY-----";
        return key
    }
    ;
    JSEncryptRSAKey.prototype.getPublicKey = function() {
        var key = "-----BEGIN PUBLIC KEY-----\n";
        key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
        key += "-----END PUBLIC KEY-----";
        return key
    }
    ;
    JSEncryptRSAKey.hasPublicKeyProperty = function(obj) {
        obj = obj || {};
        return obj.hasOwnProperty("n") && obj.hasOwnProperty("e")
    }
    ;
    JSEncryptRSAKey.hasPrivateKeyProperty = function(obj) {
        obj = obj || {};
        return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff")
    }
    ;
    JSEncryptRSAKey.prototype.parsePropertiesFrom = function(obj) {
        this.n = obj.n;
        this.e = obj.e;
        if (obj.hasOwnProperty("d")) {
            this.d = obj.d;
            this.p = obj.p;
            this.q = obj.q;
            this.dmp1 = obj.dmp1;
            this.dmq1 = obj.dmq1;
            this.coeff = obj.coeff
        }
    }
    ;
    return JSEncryptRSAKey
}(RSAKey);

var JSEncrypt = function() {
    function JSEncrypt(options) {
        options = options || {};
        this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
        this.default_public_exponent = options.default_public_exponent || "010001";
        this.log = options.log || false;
        this.key = null
    }
    JSEncrypt.prototype.setKey = function(key) {
        if (this.log && this.key) {
            console.warn("A key was already set, overriding existing.")
        }
        this.key = new JSEncryptRSAKey(key)
    }
    ;
    JSEncrypt.prototype.setPrivateKey = function(privkey) {
        this.setKey(privkey)
    }
    ;
    JSEncrypt.prototype.setPublicKey = function(pubkey) {
        this.setKey(pubkey)
    }
    ;
    JSEncrypt.prototype.decrypt = function(str) {
            return this.getKey().decrypt(b64tohex(str))
    }
    ;
    JSEncrypt.prototype.encrypt = function(str) {
            return hex2b64(this.getKey().encrypt(str))
    }
    ;
    JSEncrypt.prototype.encryptLong = function(str) {
            var encrypted = this.getKey().encryptLong(str) || "";
            var uncrypted = this.getKey().decryptLong(encrypted) || "";
            var count = 0;
            var reg = /null$/g;
            while (reg.test(uncrypted)) {
                count++;
                encrypted = this.getKey().encryptLong(str) || "";
                uncrypted = this.getKey().decryptLong(encrypted) || "";
                if (count > 10) {
                    break
                }
            }
            return encrypted
    }
    ;
    JSEncrypt.prototype.decryptLong = function(str) {
            return this.getKey().decryptLong(str)
    }
    ;
    JSEncrypt.prototype.sign = function(str, digestMethod, digestName) {
            return hex2b64(this.getKey().sign(str, digestMethod, digestName))
    }
    ;
    JSEncrypt.prototype.verify = function(str, signature, digestMethod) {
            return this.getKey().verify(str, b64tohex(signature), digestMethod)
    }
    ;
    JSEncrypt.prototype.getKey = function(cb) {
        if (!this.key) {
            this.key = new JSEncryptRSAKey;
            if (cb && {}.toString.call(cb) === "[object Function]") {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
                return
            }
            this.key.generate(this.default_key_size, this.default_public_exponent)
        }
        return this.key
    }
    ;
    JSEncrypt.prototype.getPrivateKey = function() {
        return this.getKey().getPrivateKey()
    }
    ;
    JSEncrypt.prototype.getPrivateKeyB64 = function() {
        return this.getKey().getPrivateBaseKeyB64()
    }
    ;
    JSEncrypt.prototype.getPublicKey = function() {
        return this.getKey().getPublicKey()
    }
    ;
    JSEncrypt.prototype.getPublicKeyB64 = function() {
        return this.getKey().getPublicBaseKeyB64()
    }
    ;
    JSEncrypt.version = "3.1.2";
    return JSEncrypt
}();

var encrypt = new JSEncrypt;
var paramPublicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvxXa98E1uWXnBzXkS2yHUfnBM6n3PCwLdfIox03T91joBvjtoDqiQ5x3tTOfpHs3LtiqMMEafls6b0YWtgB1dse1W5m+FpeusVkCOkQxB4SZDH6tuerIknnmB/Hsq5wgEkIvO5Pff9biig6AyoAkdWpSek/1/B7zYIepYY0lxKQIDAQAB";
encrypt.setPublicKey(paramPublicKey);

function get_arg(page){
    var res = {}
    var timestamp = Date.parse(new Date);
    var requestId = getUuid();
    var data =  '{"limit":"20","page":"'  + page.toString() +   '"}'
    options.data = encrypt.encryptLong(data)
    var sign = MD5(data + requestId + timestamp);
    res["timestamp"] = timestamp.toString()
    res["requestId"] = requestId
    res["data"] = options.data
    res["sign"] = sign
    return res
}


console.log(get_arg(4))



