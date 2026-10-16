/*
YYY = Object.create(XXX)
YYY对象继承来自XXX

ceil 等 使用 Math

 */



var proto3 = {}
proto3._append = function(t) {
    "string" == typeof t && (t = h.parse(t)),
        this._data.concat(t),
        this._nDataBytes += t.sigBytes
}
proto3._process = function(e) {
    var r = this._data
        , i = r.words
        , n = r.sigBytes
        , o = this.blockSize
        , s = 4 * o
        , a = n / s;
    a = e ? Math.ceil(a) : Math.max((0 | a) - this._minBufferSize, 0);
    var f = a * o
        , h = Math.min(4 * f, n);
    if (f) {
        for (var u = 0; u < f; u += o)
            this._doProcessBlock(i, u);
        var l = i.splice(0, f);
        r.sigBytes -= h
    }
    return new c.init(l,h)
}
proto3._minBufferSize = 0
proto2 = Object.create(proto3)
proto2.cfg =  {
    $super:{},
    init : function() {
        e.$super.init.apply(this, arguments)
    }
};
proto2.cfg.__proto__.extend = function(t) {
    var e = Object.create(this);
    return t && e.mixIn(t),
    e.hasOwnProperty("init") && this.init !== e.init || (e.init = function() {
            e.$super.init.apply(this, arguments)
        }
    ),
        e.init.prototype = e,
        e.$super = this,
        e
}
proto2.reset = function() {
    u.reset.call(this),
        this._doReset()
};
proto2.__proto__.extend = function(t) {
    var r = Object.create;
    var e = r(this);
    return t && e.mixIn(t),
    e.hasOwnProperty("init") && this.init !== e.init || (e.init = function() {
            e.$super.init.apply(this, arguments)
        }
    ),
        e.init.prototype = e,
        e.$super = this,
        e
}
proto2.blockSize = 16
var proto1 = Object.create(proto2)
proto1._doReset =  function() {
    this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
}
proto1.finalize = function(t) {
    t && this._append(t);
    var e = this._doFinalize();
    return e
}
proto1._doFinalize = function() {
    var t = this._data
        , e = t.words
        , r = 8 * this._nDataBytes
        , i = 8 * t.sigBytes;
    e[i >>> 5] |= 128 << 24 - i % 32;
    e[15 + (i + 64 >>> 9 << 4)] = ((Math.floor(r / 4294967296) << 8 | Math.floor(r / 4294967296) >>> 24) & 16711935)
        |
        ((Math.floor(r / 4294967296) << 24 | Math.floor(r / 4294967296) >>> 8) & 4278255360);
    e[14 + (i + 64 >>> 9 << 4)] = ((r << 8 | r >>> 24) & 16711935) | ((r << 24 | r >>> 8) & 4278255360);
    t.sigBytes = 4 * e.length;
    this._process();
    var H = this._hash.words;
    for (var hi = 0; hi < 4; hi++) {
        var H_i = H[hi];
        H[hi] = ((H_i << 8 | H_i >>> 24) & 16711935) | ((H_i << 24 | H_i >>> 8) & 4278255360);
    }
    return this._hash
}

function s_t(){
    var s = []
    var EE = Object.create(Math);
    EE.E = 2.718281828459045;
    EE.LN2 = 0.6931471805599453;
    EE.LN10 = 2.302585092994046;
    EE.LOG2E = 1.4426950408889634;
    EE.LOG10E = 0.4342944819032518;
    EE.PI = 3.141592653589793;
    EE.SQRT1_2 = 0.7071067811865476;
    EE.SQRT2 = 1.4142135623730951;
    for (var TT = 0; TT < 64; TT++) {
        s[TT] = 4294967296 * EE.abs(EE.sin(TT + 1)) | 0
    }
    return s
}

proto1._doProcessBlock = function(t, e) {
    var s = s_t();
    for (var RR = 0; RR < 16; RR++) {
        var i = e + RR
            , n = t[i];
        t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8)
    }
    var o = this._hash.words
        , c = t[e + 0]
        , a = t[e + 1]
        , d = t[e + 2]
        , p = t[e + 3]
        , v = t[e + 4]
        , _ = t[e + 5]
        , y = t[e + 6]
        , g = t[e + 7]
        , b = t[e + 8]
        , B = t[e + 9]
        , w = t[e + 10]
        , k = t[e + 11]
        , x = t[e + 12]
        , S = t[e + 13]
        , m = t[e + 14]
        , H = t[e + 15]
        , A = o[0]
        , z = o[1]
        , C = o[2]
        , D = o[3];

    A = FF(A, z, C, D, c, 7, s[0]),
        D = FF(D, A, z, C, a, 12, s[1]),
        C = FF(C, D, A, z, d, 17, s[2]),
        z = FF(z, C, D, A, p, 22, s[3]),
        A = FF(A, z, C, D, v, 7, s[4]),
        D = FF(D, A, z, C, _, 12, s[5]),
        C = FF(C, D, A, z, y, 17, s[6]),
        z = FF(z, C, D, A, g, 22, s[7]),
        A = FF(A, z, C, D, b, 7, s[8]),
        D = FF(D, A, z, C, B, 12, s[9]),
        C = FF(C, D, A, z, w, 17, s[10]),
        z = FF(z, C, D, A, k, 22, s[11]),
        A = FF(A, z, C, D, x, 7, s[12]),
        D = FF(D, A, z, C, S, 12, s[13]),
        C = FF(C, D, A, z, m, 17, s[14]),
        z = FF(z, C, D, A, H, 22, s[15]),
        A = HH(A, z, C, D, a, 5, s[16]),
        D = HH(D, A, z, C, y, 9, s[17]),
        C = HH(C, D, A, z, k, 14, s[18]),
        z = HH(z, C, D, A, c, 20, s[19]),
        A = HH(A, z, C, D, _, 5, s[20]),
        D = HH(D, A, z, C, w, 9, s[21]),
        C = HH(C, D, A, z, H, 14, s[22]),
        z = HH(z, C, D, A, v, 20, s[23]),
        A = HH(A, z, C, D, B, 5, s[24]),
        D = HH(D, A, z, C, m, 9, s[25]),
        C = HH(C, D, A, z, p, 14, s[26]),
        z = HH(z, C, D, A, b, 20, s[27]),
        A = HH(A, z, C, D, S, 5, s[28]),
        D = HH(D, A, z, C, d, 9, s[29]),
        C = HH(C, D, A, z, g, 14, s[30]),
        z = HH(z, C, D, A, x, 20, s[31]),
        A = UU(A, z, C, D, _, 4, s[32]),
        D = UU(D, A, z, C, b, 11, s[33]),
        C = UU(C, D, A, z, k, 16, s[34]),
        z = UU(z, C, D, A, m, 23, s[35]),
        A = UU(A, z, C, D, a, 4, s[36]),
        D = UU(D, A, z, C, v, 11, s[37]),
        C = UU(C, D, A, z, g, 16, s[38]),
        z = UU(z, C, D, A, w, 23, s[39]),
        A = UU(A, z, C, D, S, 4, s[40]),
        D = UU(D, A, z, C, c, 11, s[41]),
        C = UU(C, D, A, z, p, 16, s[42]),
        z = UU(z, C, D, A, y, 23, s[43]),
        A = UU(A, z, C, D, B, 4, s[44]),
        D = UU(D, A, z, C, x, 11, s[45]),
        C = UU(C, D, A, z, H, 16, s[46]),
        z = UU(z, C, D, A, d, 23, s[47]),
        A = LL(A, z, C, D, c, 6, s[48]),
        D = LL(D, A, z, C, g, 10, s[49]),
        C = LL(C, D, A, z, m, 15, s[50]),
        z = LL(z, C, D, A, _, 21, s[51]),
        A = LL(A, z, C, D, x, 6, s[52]),
        D = LL(D, A, z, C, p, 10, s[53]),
        C = LL(C, D, A, z, w, 15, s[54]),
        z = LL(z, C, D, A, a, 21, s[55]),
        A = LL(A, z, C, D, b, 6, s[56]),
        D = LL(D, A, z, C, H, 10, s[57]),
        C = LL(C, D, A, z, y, 15, s[58]),
        z = LL(z, C, D, A, S, 21, s[59]),
        A = LL(A, z, C, D, v, 6, s[60]),
        D = LL(D, A, z, C, k, 10, s[61]),
        C = LL(C, D, A, z, d, 15, s[62]),
        z = LL(z, C, D, A, B, 21, s[63]),
        o[0] = o[0] + A | 0,
        o[1] = o[1] + z | 0,
        o[2] = o[2] + C | 0,
        o[3] = o[3] + D | 0
}
T1 = Object.create(proto1)
T1._data = {
    "words": [],
    "sigBytes": 0
}
T1._data.__proto__.concat = function(t) {
    var e = this.words
        , r = t.words
        , i = this.sigBytes
        , n = t.sigBytes;
    if (this.clamp(),
    i % 4)
        for (var o = 0; o < n; o++) {
            var c = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
            e[i + o >>> 2] |= c << 24 - (i + o) % 4 * 8
        }
    else
        for (o = 0; o < n; o += 4)
            e[i + o >>> 2] = r[o >>> 2];
    return this.sigBytes += n,
        this
}
T1._data.__proto__.clamp =  function() {
    var e = this.words
        , r = this.sigBytes;
    e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8,
        e.length = Math.ceil(r / 4)
}
T1._data.__proto__.toString = function(t) {
    return (t || a).stringify(this)
}


function FF(t, e, r, i, n, o, c) {
    var s = t + (e & r | ~e & i) + n + c;
    return (s << o | s >>> 32 - o) + e
}

function HH(t, e, r, i, n, o, c) {
    var s = t + (e & i | r & ~i) + n + c;
    return (s << o | s >>> 32 - o) + e
}

function UU(t, e, r, i, n, o, c) {
    var s = t + (e ^ r ^ i) + n + c;
    return (s << o | s >>> 32 - o) + e
}

function LL(t, e, r, i, n, o, c) {
    var s = t + (r ^ (e | ~i)) + n + c;
    return (s << o | s >>> 32 - o) + e
}


h = {
    parse: function(t) {
        return f.parse(unescape(encodeURIComponent(t)))
    }
}

f = {
    parse: function(t) {
        for (var e = t.length, r = [], i = 0; i < e; i++)
            r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
        return new c.init(r,e)
    }
}

n = function(t, r) {
    t = this.words = t || [],
        this.sigBytes = r != undefined ? r : 4 * t.length
}

c = {
    init:function(t) {
        if (t instanceof ArrayBuffer && (t = new Uint8Array(t)),
        (t instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),
        t instanceof Uint8Array) {
            for (var e = t.byteLength, r = [], i = 0; i < e; i++)
                r[i >>> 2] |= t[i] << 24 - i % 4 * 8;
            n.call(this, r, e)
        } else
            n.apply(this, arguments)
    },

}

u = {
    reset: function() {
        this._data = new c.init,
            this._nDataBytes = 0
    }
}

e = {
    "transformRequest": {},
    "transformResponse": {},
    "timeout": 20000,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "headers": {
        "common": {
            "Accept": "application/json, text/plain, */*"
        },
        "delete": {},
        "get": {},
        "head": {},
        "post": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "put": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "patch": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    },
    "method": "post",
    "baseURL": "https://cmsauth.baowugroup.com",
    "url": "/v1/web/api/content/list?domainId=12",
    "data": {
        "pageNo": 1,
        "pageSize": 12,
        "condition": {
            "nodeId": 436
        }
    },
    $super:{
        init: function(t) {
            this.cfg = this.cfg.extend(t),
                this.reset()
        }
    }
}

t = {
    init:function() {
        e.$super.init.apply(this, arguments);
        return this               //  返回 this
    }
}

t.init.prototype = Object.create(proto1);

r = {
    MD5:function(e, r) {
        return t.init.call(T1,r).finalize(e)
        // return new t.init(r).finalize(e)
    },
    enc:{
        Hex:{
            parse: function(t) {
                for (var e = t.length, r = [], i = 0; i < e; i += 2)
                    r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
                return new c.init(r,e / 2)
            },
            stringify: function(t) {
                for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                    var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                    i.push((o >>> 4).toString(16)),
                        i.push((15 & o).toString(16))
                }
                return i.join("")
            },
        }
    }
}

function MD5_my(Data){
    var md5 = r.MD5(JSON.stringify(Data ? Data : "")).toString(r.enc.Hex)
    return md5
}

module.exports = {
    Md5:MD5_my
}

// console.log(MD5_my(e.data))


