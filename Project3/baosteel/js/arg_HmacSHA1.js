

/*
 ```javascript
   proto1_TT.cfg.__proto__.extend = function(t) { ... }
 ```

 proto1_TT.cfg.__proto__ 指向的是 Object.prototype，相当于在所有对象上都添加了一个可枚举的 extend 方法。当 mixIn 中的
 for (var e in t) 遍历参数 t 时，会沿着原型链上溯到 Object.prototype，枚举出 "extend"，所以你的断点中 e = "extend"。

 而在浏览器中，extend 和 mixIn 是定义在同一个 Base 原型对象上的，Object.prototype 上没有 extend，所以 e 正确为
 */


var proto3_LL = {}
var proto2_LL = Object.create(proto3_LL)
var proto1_LL = Object.create(proto2_LL)


var proto3_TT = {}
var proto2_TT = Object.create(proto3_TT)
proto2_TT._append = function(t) {
    h = OO
    "string" == typeof t && (t = h.parse(t)),
        this._data.concat(t),
        this._nDataBytes += t.sigBytes
}
proto2_TT._minBufferSize = 0
proto2_TT._process = function(e) {     // WenTiz
    var t = Math;
    var r = this._data
        , i = r.words
        , n = r.sigBytes
        , o = this.blockSize
        , s = 4 * o
        , a = n / s;
    a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0);
    var f = a * o
        , h = t.min(4 * f, n);
    if (f) {
        for (var u = 0; u < f; u += o)
            this._doProcessBlock(i, u);
        var l = i.splice(0, f);
        r.sigBytes -= h
    }
    return new CC.init(l,h)
}
var proto1_TT = Object.create(proto2_TT)
proto1_TT.cfg = {}
proto1_TT.reset = function() {
    UU.reset.call(this),
        this._doReset()
}
proto1_TT.update = function(t) {
    return this._append(t),
        this._process(),
        this
}
proto1_TT.finalize = function(t) {
    t && this._append(t);
    var e = this._doFinalize();
    return e
}
proto1_TT.blockSize = 16

var proto3_CC = {}
var proto2_CC = Object.create(proto3_CC)
var proto1_CC = Object.create(proto2_CC)
proto1_CC.extend = proto1_TT.cfg.extend = function(t) {
    var r = Object.create;
    var e = r(this);
    return t && e.mixIn(t),
    e.hasOwnProperty("init") && this.init !== e.init || (e.init = function() {
            e.$super.init.apply(this, arguments)   // 调用的是空
        }
    ),
        e.init.prototype = e,
        e.$super = this,
        e
}
proto1_CC.mixIn = function(t) {
    for (var e in t)
        t.hasOwnProperty(e) && (this[e] = t[e]);
    t.hasOwnProperty("toString") && (this.toString = t.toString)
}



AA = {
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

FF = {
    parse: function(t) {
        for (var e = t.length, r = [], i = 0; i < e; i++)
            r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
        return new CC.init(r,e)
    },
    stringify: function(t) {
        for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
            var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
            i.push(String.fromCharCode(o))
        }
        return i.join("")
    },
}

OO = {
    parse: function(t) {
        return FF.parse(unescape(encodeURIComponent(t)))
    },
    stringify: function(t) {
        try {
            return decodeURIComponent(escape(f.stringify(t)))
        } catch (e) {
            throw new Error("Malformed UTF-8 data")
        }
    },
}

OO_2 = {
    clone: function() {
        return this.init.prototype.extend(this)
    }
}

NN = function(t, r) {
    t = this.words = t || [],
        this.sigBytes = r != undefined ? r : 4 * t.length
}

CC = {
    init : function(t) {
        if (t instanceof ArrayBuffer && (t = new Uint8Array(t)),
        (t instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),
        t instanceof Uint8Array) {
            for (var e = t.byteLength, r = [], i = 0; i < e; i++)
                r[i >>> 2] |= t[i] << 24 - i % 4 * 8;
            NN.call(this, r, e)
        } else
            NN.apply(this, arguments)
    },
}
CC.init.prototype = Object.create(proto1_CC)  // 图片4
CC.init.prototype.clamp = function() {
    var t = Math;
    var e = this.words
        , r = this.sigBytes;
    e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8,
        e.length = t.ceil(r / 4)
}
CC.init.prototype.clone = function() {
    var t = OO_2.clone.call(this);
    return t.words = this.words.slice(0),
        t
}
CC.init.prototype.init = CC.init;
CC.init.prototype.concat = function(t) {
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
CC.init.prototype.toString = function(t) {
    return (t || AA).stringify(this)
}

UU = {
    reset: function() {
        this._data = new CC.init,
            this._nDataBytes = 0
    }
}


TT = {
    init : function() {
        EE.$super.init.apply(this, arguments)
    },
    $super:{
        init: function(t) {
            this.cfg = this.cfg.extend(t),
                this.reset()
        }
    },

}
TT.init.prototype = Object.create(proto1_TT)     // 图片2
TT.init.prototype._doReset = function() {
    this._hash = new CC.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
}
TT.init.prototype._doFinalize =  function() {
    var t = this._data
        , e = t.words
        , r = 8 * this._nDataBytes
        , i = 8 * t.sigBytes;
    return e[i >>> 5] |= 128 << 24 - i % 32,
        e[14 + (i + 64 >>> 9 << 4)] = Math.floor(r / 4294967296),
        e[15 + (i + 64 >>> 9 << 4)] = r,
        t.sigBytes = 4 * e.length,
        this._process(),
        this._hash
}
TT.init.prototype._doProcessBlock = function(t, e) {
    var c = [];
    for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], f = 0; f < 80; f++) {
        if (f < 16)
            c[f] = 0 | t[e + f];
        else {
            var h = c[f - 3] ^ c[f - 8] ^ c[f - 14] ^ c[f - 16];
            c[f] = h << 1 | h >>> 31
        }
        var u = (i << 5 | i >>> 27) + a + c[f];
        u += f < 20 ? 1518500249 + (n & o | ~n & s) : f < 40 ? 1859775393 + (n ^ o ^ s) : f < 60 ? (n & o | n & s | o & s) - 1894007588 : (n ^ o ^ s) - 899497514,
            a = s,
            s = o,
            o = n << 30 | n >>> 2,
            n = i,
            i = u
    }
    r[0] = r[0] + i | 0,
        r[1] = r[1] + n | 0,
        r[2] = r[2] + o | 0,
        r[3] = r[3] + s | 0,
        r[4] = r[4] + a | 0
}
EE = TT

LL = {
    HMAC:{
        init: function(t, e) {
            TT = this._hasher = new TT.init,
            "string" == typeof e && (e = OO.parse(e));
            var r = TT.blockSize
                , i = 4 * r;
            e.sigBytes > i && (e = TT.finalize(e)),
                e.clamp();       ///////
            for (var n = this._oKey = e.clone(), c = this._iKey = e.clone(), s = n.words, a = c.words, f = 0; f < r; f++)
                s[f] ^= 1549556828,
                    a[f] ^= 909522486;
            n.sigBytes = c.sigBytes = i,
                this.reset()    //////// 无
        },
    }
}
LL.HMAC.init.prototype = Object.create(proto1_LL)    // 图片1
LL.HMAC.init.prototype.reset = function() {
    var t = this._hasher;
    t.reset(),
        t.update(this._iKey)
}
LL.HMAC.init.prototype.finalize = function(t) {
    var e = this._hasher
        , r = e.finalize(t);
    e.reset();
    var i = e.finalize(this._oKey.clone().concat(r));
    return i
}


RR = {
    HmacSHA1:function(e, r) {
        return new LL.HMAC.init(TT,r).finalize(e)
    }
}

function Hmac_my(c,i){
    var u = RR.HmacSHA1(c, i).toString().toUpperCase();
    return u
}

module.exports = {
    hmac:Hmac_my
}

// console.log(Hmac_my("POST\n" +
//     "/v1/web/api/content/list?domainId=12\n" +
//     "x-user:0/56f5cff3cad14853a44782c2c689ab2a\n" +
//     "x-nonce:3552214493\n" +
//     "x-date:1784356789\n" +
//     "Content-Md5:2fab58aaa35544d9c44bd789aa6af1cb\n","13ade1de1eff43ffb821735f352a4148"))

