
window = global
window.crypto = require('crypto-js');

var $, Y, B = [];
for ($ = "0".charCodeAt(0),
         Y = 0; Y <= 9; ++Y)
    B[$++] = Y;
for ($ = "a".charCodeAt(0),
         Y = 10; Y < 36; ++Y)
    B[$++] = Y;
for ($ = "A".charCodeAt(0),
         Y = 10; Y < 36; ++Y)
    B[$++] = Y;
function K(e, t) {
    var n = B[e.charCodeAt(t)];
    return null == n ? -1 : n
}

function R() {
    return new D(null)
}

function W(e) {
    var t = R();
    return t.fromInt(e),
        t
}

function a(e, t) {
    return e | t
}

function U(e) {
    var t, n = 1;
    return 0 != (t = e >>> 16) && (e = t,
        n += 16),
    0 != (t = e >> 8) && (e = t,
        n += 8),
    0 != (t = e >> 4) && (e = t,
        n += 4),
    0 != (t = e >> 2) && (e = t,
        n += 2),
    0 != (t = e >> 1) && (e = t,
        n += 1),
        n
}

H = function() {
    function e(e) {
        this.m = e,
            this.mp = e.invDigit(),
            this.mpl = 32767 & this.mp,
            this.mph = this.mp >> 15,
            this.um = (1 << e.DB - 15) - 1,
            this.mt2 = 2 * e.t
    }
    return e.prototype.convert = function(e) {
        var t = R();
        return e.abs().dlShiftTo(this.m.t, t),
            t.divRemTo(this.m, null, t),
        e.s < 0 && t.compareTo(D.ZERO) > 0 && this.m.subTo(t, t),
            t
    }
        ,
        e.prototype.revert = function(e) {
            var t = R();
            return e.copyTo(t),
                this.reduce(t),
                t
        }
        ,
        e.prototype.reduce = function(e) {
            while (e.t <= this.mt2)
                e[e.t++] = 0;
            for (var t = 0; t < this.m.t; ++t) {
                var n = 32767 & e[t]
                    , r = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
                n = t + this.m.t,
                    e[n] += this.m.am(0, r, e, t, 0, this.m.t);
                while (e[n] >= e.DV)
                    e[n] -= e.DV,
                        e[++n]++
            }
            e.clamp(),
                e.drShiftTo(this.m.t, e),
            e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
        }
        ,
        e.prototype.mulTo = function(e, t, n) {
            e.multiplyTo(t, n),
                this.reduce(n)
        }
        ,
        e.prototype.sqrTo = function(e, t) {
            e.squareTo(t),
                this.reduce(t)
        }
        ,
        e
}()

function o(n) { return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(n); }

D = function() {
    function e(e, t, n) {
        null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
    }
    return e.prototype.toString = function(e) {
        if (this.s < 0)
            return "-" + this.negate().toString(e);
        var t;
        if (16 == e)
            t = 4;
        else if (8 == e)
            t = 3;
        else if (2 == e)
            t = 1;
        else if (32 == e)
            t = 5;
        else {
            if (4 != e)
                return this.toRadix(e);
            t = 2
        }
        var n, r = (1 << t) - 1, i = !1, a = "", s = this.t, l = this.DB - s * this.DB % t;
        if (s-- > 0) {
            l < this.DB && (n = this[s] >> l) > 0 && (i = !0,
                a = o(n));
            while (s >= 0)
                l < t ? (n = (this[s] & (1 << l) - 1) << t - l,
                    n |= this[--s] >> (l += this.DB - t)) : (n = this[s] >> (l -= t) & r,
                l <= 0 && (l += this.DB,
                    --s)),
                n > 0 && (i = !0),
                i && (a += o(n))
        }
        return i ? a : "0"
    }
        ,
        e.prototype.negate = function() {
            var t = R();
            return e.ZERO.subTo(this, t),
                t
        }
        ,
        e.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this
        }
        ,
        e.prototype.compareTo = function(e) {
            var t = this.s - e.s;
            if (0 != t)
                return t;
            var n = this.t;
            if (t = n - e.t,
            0 != t)
                return this.s < 0 ? -t : t;
            while (--n >= 0)
                if (0 != (t = this[n] - e[n]))
                    return t;
            return 0
        }
        ,
        e.prototype.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + U(this[this.t - 1] ^ this.s & this.DM)
        }
        ,
        e.prototype.mod = function(t) {
            var n = R();
            return this.abs().divRemTo(t, null, n),
            this.s < 0 && n.compareTo(e.ZERO) > 0 && t.subTo(n, n),
                n
        }
        ,
        e.prototype.modPowInt = function(e, t) {
            var n;
            return n = e < 256 || t.isEven() ? new A(t) : new H(t),
                this.exp(e, n)
        }
        ,
        e.prototype.clone = function() {
            var e = R();
            return this.copyTo(e),
                e
        }
        ,
        e.prototype.intValue = function() {
            if (this.s < 0) {
                if (1 == this.t)
                    return this[0] - this.DV;
                if (0 == this.t)
                    return -1
            } else {
                if (1 == this.t)
                    return this[0];
                if (0 == this.t)
                    return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }
        ,
        e.prototype.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
        }
        ,
        e.prototype.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
        }
        ,
        e.prototype.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }
        ,
        e.prototype.toByteArray = function() {
            var e = this.t
                , t = [];
            t[0] = this.s;
            var n, r = this.DB - e * this.DB % 8, o = 0;
            if (e-- > 0) {
                r < this.DB && (n = this[e] >> r) != (this.s & this.DM) >> r && (t[o++] = n | this.s << this.DB - r);
                while (e >= 0)
                    r < 8 ? (n = (this[e] & (1 << r) - 1) << 8 - r,
                        n |= this[--e] >> (r += this.DB - 8)) : (n = this[e] >> (r -= 8) & 255,
                    r <= 0 && (r += this.DB,
                        --e)),
                    0 != (128 & n) && (n |= -256),
                    0 == o && (128 & this.s) != (128 & n) && ++o,
                    (o > 0 || n != this.s) && (t[o++] = n)
            }
            return t
        }
        ,
        e.prototype.equals = function(e) {
            return 0 == this.compareTo(e)
        }
        ,
        e.prototype.min = function(e) {
            return this.compareTo(e) < 0 ? this : e
        }
        ,
        e.prototype.max = function(e) {
            return this.compareTo(e) > 0 ? this : e
        }
        ,
        e.prototype.and = function(e) {
            var t = R();
            return this.bitwiseTo(e, i, t),
                t
        }
        ,
        e.prototype.or = function(e) {
            var t = R();
            return this.bitwiseTo(e, a, t),
                t
        }
        ,
        e.prototype.xor = function(e) {
            var t = R();
            return this.bitwiseTo(e, s, t),
                t
        }
        ,
        e.prototype.andNot = function(e) {
            var t = R();
            return this.bitwiseTo(e, l, t),
                t
        }
        ,
        e.prototype.not = function() {
            for (var e = R(), t = 0; t < this.t; ++t)
                e[t] = this.DM & ~this[t];
            return e.t = this.t,
                e.s = ~this.s,
                e
        }
        ,
        e.prototype.shiftLeft = function(e) {
            var t = R();
            return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t),
                t
        }
        ,
        e.prototype.shiftRight = function(e) {
            var t = R();
            return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t),
                t
        }
        ,
        e.prototype.getLowestSetBit = function() {
            for (var e = 0; e < this.t; ++e)
                if (0 != this[e])
                    return e * this.DB + c(this[e]);
            return this.s < 0 ? this.t * this.DB : -1
        }
        ,
        e.prototype.bitCount = function() {
            for (var e = 0, t = this.s & this.DM, n = 0; n < this.t; ++n)
                e += u(this[n] ^ t);
            return e
        }
        ,
        e.prototype.testBit = function(e) {
            var t = Math.floor(e / this.DB);
            return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
        }
        ,
        e.prototype.setBit = function(e) {
            return this.changeBit(e, a)
        }
        ,
        e.prototype.clearBit = function(e) {
            return this.changeBit(e, l)
        }
        ,
        e.prototype.flipBit = function(e) {
            return this.changeBit(e, s)
        }
        ,
        e.prototype.add = function(e) {
            var t = R();
            return this.addTo(e, t),
                t
        }
        ,
        e.prototype.subtract = function(e) {
            var t = R();
            return this.subTo(e, t),
                t
        }
        ,
        e.prototype.multiply = function(e) {
            var t = R();
            return this.multiplyTo(e, t),
                t
        }
        ,
        e.prototype.divide = function(e) {
            var t = R();
            return this.divRemTo(e, t, null),
                t
        }
        ,
        e.prototype.remainder = function(e) {
            var t = R();
            return this.divRemTo(e, null, t),
                t
        }
        ,
        e.prototype.divideAndRemainder = function(e) {
            var t = R()
                , n = R();
            return this.divRemTo(e, t, n),
                [t, n]
        }
        ,
        e.prototype.modPow = function(e, t) {
            var n, r, o = e.bitLength(), i = W(1);
            if (o <= 0)
                return i;
            n = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6,
                r = o < 8 ? new A(t) : t.isEven() ? new V(t) : new H(t);
            var a = []
                , s = 3
                , l = n - 1
                , c = (1 << n) - 1;
            if (a[1] = r.convert(this),
            n > 1) {
                var u = R();
                r.sqrTo(a[1], u);
                while (s <= c)
                    a[s] = R(),
                        r.mulTo(u, a[s - 2], a[s]),
                        s += 2
            }
            var d, f, h = e.t - 1, p = !0, m = R();
            o = U(e[h]) - 1;
            while (h >= 0) {
                o >= l ? d = e[h] >> o - l & c : (d = (e[h] & (1 << o + 1) - 1) << l - o,
                h > 0 && (d |= e[h - 1] >> this.DB + o - l)),
                    s = n;
                while (0 == (1 & d))
                    d >>= 1,
                        --s;
                if ((o -= s) < 0 && (o += this.DB,
                    --h),
                    p)
                    a[d].copyTo(i),
                        p = !1;
                else {
                    while (s > 1)
                        r.sqrTo(i, m),
                            r.sqrTo(m, i),
                            s -= 2;
                    s > 0 ? r.sqrTo(i, m) : (f = i,
                        i = m,
                        m = f),
                        r.mulTo(m, a[d], i)
                }
                while (h >= 0 && 0 == (e[h] & 1 << o))
                    r.sqrTo(i, m),
                        f = i,
                        i = m,
                        m = f,
                    --o < 0 && (o = this.DB - 1,
                        --h)
            }
            return r.revert(i)
        }
        ,
        e.prototype.modInverse = function(t) {
            var n = t.isEven();
            if (this.isEven() && n || 0 == t.signum())
                return e.ZERO;
            var r = t.clone()
                , o = this.clone()
                , i = W(1)
                , a = W(0)
                , s = W(0)
                , l = W(1);
            while (0 != r.signum()) {
                while (r.isEven())
                    r.rShiftTo(1, r),
                        n ? (i.isEven() && a.isEven() || (i.addTo(this, i),
                            a.subTo(t, a)),
                            i.rShiftTo(1, i)) : a.isEven() || a.subTo(t, a),
                        a.rShiftTo(1, a);
                while (o.isEven())
                    o.rShiftTo(1, o),
                        n ? (s.isEven() && l.isEven() || (s.addTo(this, s),
                            l.subTo(t, l)),
                            s.rShiftTo(1, s)) : l.isEven() || l.subTo(t, l),
                        l.rShiftTo(1, l);
                r.compareTo(o) >= 0 ? (r.subTo(o, r),
                n && i.subTo(s, i),
                    a.subTo(l, a)) : (o.subTo(r, o),
                n && s.subTo(i, s),
                    l.subTo(a, l))
            }
            return 0 != o.compareTo(e.ONE) ? e.ZERO : l.compareTo(t) >= 0 ? l.subtract(t) : l.signum() < 0 ? (l.addTo(t, l),
                l.signum() < 0 ? l.add(t) : l) : l
        }
        ,
        e.prototype.pow = function(e) {
            return this.exp(e, new E)
        }
        ,
        e.prototype.gcd = function(e) {
            var t = this.s < 0 ? this.negate() : this.clone()
                , n = e.s < 0 ? e.negate() : e.clone();
            if (t.compareTo(n) < 0) {
                var r = t;
                t = n,
                    n = r
            }
            var o = t.getLowestSetBit()
                , i = n.getLowestSetBit();
            if (i < 0)
                return t;
            o < i && (i = o),
            i > 0 && (t.rShiftTo(i, t),
                n.rShiftTo(i, n));
            while (t.signum() > 0)
                (o = t.getLowestSetBit()) > 0 && t.rShiftTo(o, t),
                (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                    t.compareTo(n) >= 0 ? (t.subTo(n, t),
                        t.rShiftTo(1, t)) : (n.subTo(t, n),
                        n.rShiftTo(1, n));
            return i > 0 && n.lShiftTo(i, n),
                n
        }
        ,
        e.prototype.isProbablePrime = function(e) {
            var t, n = this.abs();
            if (1 == n.t && n[0] <= L[L.length - 1]) {
                for (t = 0; t < L.length; ++t)
                    if (n[0] == L[t])
                        return !0;
                return !1
            }
            if (n.isEven())
                return !1;
            t = 1;
            while (t < L.length) {
                var r = L[t]
                    , o = t + 1;
                while (o < L.length && r < z)
                    r *= L[o++];
                r = n.modInt(r);
                while (t < o)
                    if (r % L[t++] == 0)
                        return !1
            }
            return n.millerRabin(e)
        }
        ,
        e.prototype.copyTo = function(e) {
            for (var t = this.t - 1; t >= 0; --t)
                e[t] = this[t];
            e.t = this.t,
                e.s = this.s
        }
        ,
        e.prototype.fromInt = function(e) {
            this.t = 1,
                this.s = e < 0 ? -1 : 0,
                e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
        }
        ,
        e.prototype.fromString = function(t, n) {
            var r;
            if (16 == n)
                r = 4;
            else if (8 == n)
                r = 3;
            else if (256 == n)
                r = 8;
            else if (2 == n)
                r = 1;
            else if (32 == n)
                r = 5;
            else {
                if (4 != n)
                    return void this.fromRadix(t, n);
                r = 2
            }
            this.t = 0,
                this.s = 0;
            var o = t.length
                , i = !1
                , a = 0;
            while (--o >= 0) {
                var s = 8 == r ? 255 & +t[o] : K(t, o);
                s < 0 ? "-" == t.charAt(o) && (i = !0) : (i = !1,
                    0 == a ? this[this.t++] = s : a + r > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a,
                        this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a,
                    a += r,
                a >= this.DB && (a -= this.DB))
            }
            8 == r && 0 != (128 & +t[0]) && (this.s = -1,
            a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
                this.clamp(),
            i && e.ZERO.subTo(this, this)
        }
        ,
        e.prototype.clamp = function() {
            var e = this.s & this.DM;
            while (this.t > 0 && this[this.t - 1] == e)
                --this.t
        }
        ,
        e.prototype.dlShiftTo = function(e, t) {
            var n;
            for (n = this.t - 1; n >= 0; --n)
                t[n + e] = this[n];
            for (n = e - 1; n >= 0; --n)
                t[n] = 0;
            t.t = this.t + e,
                t.s = this.s
        }
        ,
        e.prototype.drShiftTo = function(e, t) {
            for (var n = e; n < this.t; ++n)
                t[n - e] = this[n];
            t.t = Math.max(this.t - e, 0),
                t.s = this.s
        }
        ,
        e.prototype.lShiftTo = function(e, t) {
            for (var n = e % this.DB, r = this.DB - n, o = (1 << r) - 1, i = Math.floor(e / this.DB), a = this.s << n & this.DM, s = this.t - 1; s >= 0; --s)
                t[s + i + 1] = this[s] >> r | a,
                    a = (this[s] & o) << n;
            for (s = i - 1; s >= 0; --s)
                t[s] = 0;
            t[i] = a,
                t.t = this.t + i + 1,
                t.s = this.s,
                t.clamp()
        }
        ,
        e.prototype.rShiftTo = function(e, t) {
            t.s = this.s;
            var n = Math.floor(e / this.DB);
            if (n >= this.t)
                t.t = 0;
            else {
                var r = e % this.DB
                    , o = this.DB - r
                    , i = (1 << r) - 1;
                t[0] = this[n] >> r;
                for (var a = n + 1; a < this.t; ++a)
                    t[a - n - 1] |= (this[a] & i) << o,
                        t[a - n] = this[a] >> r;
                r > 0 && (t[this.t - n - 1] |= (this.s & i) << o),
                    t.t = this.t - n,
                    t.clamp()
            }
        }
        ,
        e.prototype.subTo = function(e, t) {
            var n = 0
                , r = 0
                , o = Math.min(e.t, this.t);
            while (n < o)
                r += this[n] - e[n],
                    t[n++] = r & this.DM,
                    r >>= this.DB;
            if (e.t < this.t) {
                r -= e.s;
                while (n < this.t)
                    r += this[n],
                        t[n++] = r & this.DM,
                        r >>= this.DB;
                r += this.s
            } else {
                r += this.s;
                while (n < e.t)
                    r -= e[n],
                        t[n++] = r & this.DM,
                        r >>= this.DB;
                r -= e.s
            }
            t.s = r < 0 ? -1 : 0,
                r < -1 ? t[n++] = this.DV + r : r > 0 && (t[n++] = r),
                t.t = n,
                t.clamp()
        }
        ,
        e.prototype.multiplyTo = function(t, n) {
            var r = this.abs()
                , o = t.abs()
                , i = r.t;
            n.t = i + o.t;
            while (--i >= 0)
                n[i] = 0;
            for (i = 0; i < o.t; ++i)
                n[i + r.t] = r.am(0, o[i], n, i, 0, r.t);
            n.s = 0,
                n.clamp(),
            this.s != t.s && e.ZERO.subTo(n, n)
        }
        ,
        e.prototype.squareTo = function(e) {
            var t = this.abs()
                , n = e.t = 2 * t.t;
            while (--n >= 0)
                e[n] = 0;
            for (n = 0; n < t.t - 1; ++n) {
                var r = t.am(n, t[n], e, 2 * n, 0, 1);
                (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV,
                    e[n + t.t + 1] = 1)
            }
            e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
                e.s = 0,
                e.clamp()
        }
        ,
        e.prototype.divRemTo = function(t, n, r) {
            var o = t.abs();
            if (!(o.t <= 0)) {
                var i = this.abs();
                if (i.t < o.t)
                    return null != n && n.fromInt(0),
                        void (null != r && this.copyTo(r));
                null == r && (r = R());
                var a = R()
                    , s = this.s
                    , l = t.s
                    , c = this.DB - U(o[o.t - 1]);
                c > 0 ? (o.lShiftTo(c, a),
                    i.lShiftTo(c, r)) : (o.copyTo(a),
                    i.copyTo(r));
                var u = a.t
                    , d = a[u - 1];
                if (0 != d) {
                    var f = d * (1 << this.F1) + (u > 1 ? a[u - 2] >> this.F2 : 0)
                        , h = this.FV / f
                        , p = (1 << this.F1) / f
                        , m = 1 << this.F2
                        , v = r.t
                        , g = v - u
                        , b = null == n ? R() : n;
                    a.dlShiftTo(g, b),
                    r.compareTo(b) >= 0 && (r[r.t++] = 1,
                        r.subTo(b, r)),
                        e.ONE.dlShiftTo(u, b),
                        b.subTo(a, a);
                    while (a.t < u)
                        a[a.t++] = 0;
                    while (--g >= 0) {
                        var y = r[--v] == d ? this.DM : Math.floor(r[v] * h + (r[v - 1] + m) * p);
                        if ((r[v] += a.am(0, y, r, g, 0, u)) < y) {
                            a.dlShiftTo(g, b),
                                r.subTo(b, r);
                            while (r[v] < --y)
                                r.subTo(b, r)
                        }
                    }
                    null != n && (r.drShiftTo(u, n),
                    s != l && e.ZERO.subTo(n, n)),
                        r.t = u,
                        r.clamp(),
                    c > 0 && r.rShiftTo(c, r),
                    s < 0 && e.ZERO.subTo(r, r)
                }
            }
        }
        ,
        e.prototype.invDigit = function() {
            if (this.t < 1)
                return 0;
            var e = this[0];
            if (0 == (1 & e))
                return 0;
            var t = 3 & e;
            return t = t * (2 - (15 & e) * t) & 15,
                t = t * (2 - (255 & e) * t) & 255,
                t = t * (2 - ((65535 & e) * t & 65535)) & 65535,
                t = t * (2 - e * t % this.DV) % this.DV,
                t > 0 ? this.DV - t : -t
        }
        ,
        e.prototype.isEven = function() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
        }
        ,
        e.prototype.exp = function(t, n) {
            if (t > 4294967295 || t < 1)
                return e.ONE;
            var r = R()
                , o = R()
                , i = n.convert(this)
                , a = U(t) - 1;
            i.copyTo(r);
            while (--a >= 0)
                if (n.sqrTo(r, o),
                (t & 1 << a) > 0)
                    n.mulTo(o, i, r);
                else {
                    var s = r;
                    r = o,
                        o = s
                }
            return n.revert(r)
        }
        ,
        e.prototype.chunkSize = function(e) {
            return Math.floor(Math.LN2 * this.DB / Math.log(e))
        }
        ,
        e.prototype.toRadix = function(e) {
            if (null == e && (e = 10),
            0 == this.signum() || e < 2 || e > 36)
                return "0";
            var t = this.chunkSize(e)
                , n = Math.pow(e, t)
                , r = W(n)
                , o = R()
                , i = R()
                , a = "";
            this.divRemTo(r, o, i);
            while (o.signum() > 0)
                a = (n + i.intValue()).toString(e).substr(1) + a,
                    o.divRemTo(r, o, i);
            return i.intValue().toString(e) + a
        }
        ,
        e.prototype.fromRadix = function(t, n) {
            this.fromInt(0),
            null == n && (n = 10);
            for (var r = this.chunkSize(n), o = Math.pow(n, r), i = !1, a = 0, s = 0, l = 0; l < t.length; ++l) {
                var c = K(t, l);
                c < 0 ? "-" == t.charAt(l) && 0 == this.signum() && (i = !0) : (s = n * s + c,
                ++a >= r && (this.dMultiply(o),
                    this.dAddOffset(s, 0),
                    a = 0,
                    s = 0))
            }
            a > 0 && (this.dMultiply(Math.pow(n, a)),
                this.dAddOffset(s, 0)),
            i && e.ZERO.subTo(this, this)
        }
        ,
        e.prototype.fromNumber = function(t, n, r) {
            if ("number" == typeof n)
                if (t < 2)
                    this.fromInt(1);
                else {
                    this.fromNumber(t, r),
                    this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), a, this),
                    this.isEven() && this.dAddOffset(1, 0);
                    while (!this.isProbablePrime(n))
                        this.dAddOffset(2, 0),
                        this.bitLength() > t && this.subTo(e.ONE.shiftLeft(t - 1), this)
                }
            else {
                var o = []
                    , i = 7 & t;
                o.length = 1 + (t >> 3),
                    n.nextBytes(o),
                    i > 0 ? o[0] &= (1 << i) - 1 : o[0] = 0,
                    this.fromString(o, 256)
            }
        }
        ,
        e.prototype.bitwiseTo = function(e, t, n) {
            var r, o, i = Math.min(e.t, this.t);
            for (r = 0; r < i; ++r)
                n[r] = t(this[r], e[r]);
            if (e.t < this.t) {
                for (o = e.s & this.DM,
                         r = i; r < this.t; ++r)
                    n[r] = t(this[r], o);
                n.t = this.t
            } else {
                for (o = this.s & this.DM,
                         r = i; r < e.t; ++r)
                    n[r] = t(o, e[r]);
                n.t = e.t
            }
            n.s = t(this.s, e.s),
                n.clamp()
        }
        ,
        e.prototype.changeBit = function(t, n) {
            var r = e.ONE.shiftLeft(t);
            return this.bitwiseTo(r, n, r),
                r
        }
        ,
        e.prototype.addTo = function(e, t) {
            var n = 0
                , r = 0
                , o = Math.min(e.t, this.t);
            while (n < o)
                r += this[n] + e[n],
                    t[n++] = r & this.DM,
                    r >>= this.DB;
            if (e.t < this.t) {
                r += e.s;
                while (n < this.t)
                    r += this[n],
                        t[n++] = r & this.DM,
                        r >>= this.DB;
                r += this.s
            } else {
                r += this.s;
                while (n < e.t)
                    r += e[n],
                        t[n++] = r & this.DM,
                        r >>= this.DB;
                r += e.s
            }
            t.s = r < 0 ? -1 : 0,
                r > 0 ? t[n++] = r : r < -1 && (t[n++] = this.DV + r),
                t.t = n,
                t.clamp()
        }
        ,
        e.prototype.dMultiply = function(e) {
            this[this.t] = this.am(0, e - 1, this, 0, 0, this.t),
                ++this.t,
                this.clamp()
        }
        ,
        e.prototype.dAddOffset = function(e, t) {
            if (0 != e) {
                while (this.t <= t)
                    this[this.t++] = 0;
                this[t] += e;
                while (this[t] >= this.DV)
                    this[t] -= this.DV,
                    ++t >= this.t && (this[this.t++] = 0),
                        ++this[t]
            }
        }
        ,
        e.prototype.multiplyLowerTo = function(e, t, n) {
            var r = Math.min(this.t + e.t, t);
            n.s = 0,
                n.t = r;
            while (r > 0)
                n[--r] = 0;
            for (var o = n.t - this.t; r < o; ++r)
                n[r + this.t] = this.am(0, e[r], n, r, 0, this.t);
            for (o = Math.min(e.t, t); r < o; ++r)
                this.am(0, e[r], n, r, 0, t - r);
            n.clamp()
        }
        ,
        e.prototype.multiplyUpperTo = function(e, t, n) {
            --t;
            var r = n.t = this.t + e.t - t;
            n.s = 0;
            while (--r >= 0)
                n[r] = 0;
            for (r = Math.max(t - this.t, 0); r < e.t; ++r)
                n[this.t + r - t] = this.am(t - r, e[r], n, 0, 0, this.t + r - t);
            n.clamp(),
                n.drShiftTo(1, n)
        }
        ,
        e.prototype.modInt = function(e) {
            if (e <= 0)
                return 0;
            var t = this.DV % e
                , n = this.s < 0 ? e - 1 : 0;
            if (this.t > 0)
                if (0 == t)
                    n = this[0] % e;
                else
                    for (var r = this.t - 1; r >= 0; --r)
                        n = (t * n + this[r]) % e;
            return n
        }
        ,
        e.prototype.millerRabin = function(t) {
            var n = this.subtract(e.ONE)
                , r = n.getLowestSetBit();
            if (r <= 0)
                return !1;
            var o = n.shiftRight(r);
            t = t + 1 >> 1,
            t > L.length && (t = L.length);
            for (var i = R(), a = 0; a < t; ++a) {
                i.fromInt(L[Math.floor(Math.random() * L.length)]);
                var s = i.modPow(o, this);
                if (0 != s.compareTo(e.ONE) && 0 != s.compareTo(n)) {
                    var l = 1;
                    while (l++ < r && 0 != s.compareTo(n))
                        if (s = s.modPowInt(2, this),
                        0 == s.compareTo(e.ONE))
                            return !1;
                    if (0 != s.compareTo(n))
                        return !1
                }
            }
            return !0
        }
        ,
        e.prototype.square = function() {
            var e = R();
            return this.squareTo(e),
                e
        }
        ,
        e.prototype.gcda = function(e, t) {
            var n = this.s < 0 ? this.negate() : this.clone()
                , r = e.s < 0 ? e.negate() : e.clone();
            if (n.compareTo(r) < 0) {
                var o = n;
                n = r,
                    r = o
            }
            var i = n.getLowestSetBit()
                , a = r.getLowestSetBit();
            if (a < 0)
                t(n);
            else {
                i < a && (a = i),
                a > 0 && (n.rShiftTo(a, n),
                    r.rShiftTo(a, r));
                var s = function() {
                    (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
                    (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                        n.compareTo(r) >= 0 ? (n.subTo(r, n),
                            n.rShiftTo(1, n)) : (r.subTo(n, r),
                            r.rShiftTo(1, r)),
                        n.signum() > 0 ? setTimeout(s, 0) : (a > 0 && r.lShiftTo(a, r),
                            setTimeout((function() {
                                    t(r)
                                }
                            ), 0))
                };
                setTimeout(s, 10)
            }
        }
        ,
        e.prototype.fromNumberAsync = function(t, n, r, o) {
            if ("number" == typeof n)
                if (t < 2)
                    this.fromInt(1);
                else {
                    this.fromNumber(t, r),
                    this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), a, this),
                    this.isEven() && this.dAddOffset(1, 0);
                    var i = this
                        , s = function() {
                        i.dAddOffset(2, 0),
                        i.bitLength() > t && i.subTo(e.ONE.shiftLeft(t - 1), i),
                            i.isProbablePrime(n) ? setTimeout((function() {
                                    o()
                                }
                            ), 0) : setTimeout(s, 0)
                    };
                    setTimeout(s, 0)
                }
            else {
                var l = []
                    , c = 7 & t;
                l.length = 1 + (t >> 3),
                    n.nextBytes(l),
                    c > 0 ? l[0] &= (1 << c) - 1 : l[0] = 0,
                    this.fromString(l, 256)
            }
        }
        ,
        e
}()
D.ONE = W(1);
D.prototype.DB = 28
D.prototype.DM = 268435455
D.prototype.DV = 268435456
D.prototype.F1 = 24
D.prototype.F2 = 24
D.prototype.FV = 4503599627370496
D.prototype.am = function(e, t, n, r, o, i) {
    var a = 16383 & t
        , s = t >> 14;
    while (--i >= 0) {
        var l = 16383 & this[e]
            , c = this[e++] >> 14
            , u = s * l + c * a;
        l = a * l + ((16383 & u) << 14) + n[r] + o,
            o = (l >> 28) + (u >> 14) + s * c,
            n[r++] = 268435455 & l
    }
    return o
}
D.ZERO = W(0)
D.ONE = W(1);

var me = function() {
    var e = function(t, n) {
        return e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            ,
            e(t, n)
    };
    return function(t, n) {
        if ("function" !== typeof n && null !== n)
            throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
        function r() {
            this.constructor = t
        }
        e(t, n),
            t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype,
                new r)
    }
}()

var q = function() {
    function e() {
        this.i = 0,
            this.j = 0,
            this.S = []
    }
    return e.prototype.init = function(e) {
        var t, n, r;
        for (t = 0; t < 256; ++t)
            this.S[t] = t;
        for (n = 0,
                 t = 0; t < 256; ++t)
            n = n + this.S[t] + e[t % e.length] & 255,
                r = this.S[t],
                this.S[t] = this.S[n],
                this.S[n] = r;
        this.i = 0,
            this.j = 0
    }
        ,
        e.prototype.next = function() {
            var e;
            return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                e = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = e,
                this.S[e + this.S[this.i] & 255]
        }
        ,
        e
}();

function G() {
    return new q
}

function se(e, t) {
    if (t < e.length + 11)
        return console.error("Message too long for RSA"),
            null;
    var n = []
        , r = e.length - 1;
    while (r >= 0 && t > 0) {
        var o = e.charCodeAt(r--);
        o < 128 ? n[--t] = o : o > 127 && o < 2048 ? (n[--t] = 63 & o | 128,
            n[--t] = o >> 6 | 192) : (n[--t] = 63 & o | 128,
            n[--t] = o >> 6 & 63 | 128,
            n[--t] = o >> 12 | 224)
    }
    n[--t] = 0;
    var i = new ie
        , a = [];
    while (t > 2) {
        a[0] = 0;
        while (0 == a[0])
            i.nextBytes(a);
        n[--t] = a[0]
    }
    return n[--t] = 2,
        n[--t] = 0,
        new D(n)
}

var X;
var Count = 0
var J, Z = 256
Q = []
var ee = void 0;
if (true) {
    var JJJ = 0
    var te = new Uint32Array(256);
    for (window.crypto.getRandomValues(te),
             ee = 0; ee < te.length; ++ee)
        Q[JJJ++] = 255 & te[ee]
}
function oe() {
    if (Count === 0){
        X = null
        Count++
    }
    if (null == X) {
        X = G();
        while (J < Z) {
            var e = Math.floor(65536 * Math.random());
            Q[J++] = 255 & e
        }
        for (X.init(Q),
                 J = 0; J < Q.length; ++J)
            Q[J] = 0;
        J = 0
    }
    return X.next()
}

var ie = function() {
    function e() {}
    return e.prototype.nextBytes = function(e) {
        for (var t = 0; t < e.length; ++t)
            e[t] = oe()
    }
        ,
        e
}();

var le = function() {
    function e() {
        this.n = null,
            this.e = 0,
            this.d = null,
            this.p = null,
            this.q = null,
            this.dmp1 = null,
            this.dmq1 = null,
            this.coeff = null
    }
    return e.prototype.doPublic = function(e) {
        return e.modPowInt(this.e, this.n)
    }
        ,
        e.prototype.doPrivate = function(e) {
            if (null == this.p || null == this.q)
                return e.modPow(this.d, this.n);
            var t = e.mod(this.p).modPow(this.dmp1, this.p)
                , n = e.mod(this.q).modPow(this.dmq1, this.q);
            while (t.compareTo(n) < 0)
                t = t.add(this.p);
            return t.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
        }
        ,
        e.prototype.setPublic = function(e, t) {
            null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = I(e, 16),
                this.e = parseInt(t, 16)) : console.error("Invalid RSA public key")
        }
        ,
        e.prototype.encrypt = function(e) {
            var t = this.n.bitLength() + 7 >> 3
                , n = se(e, t);
            if (null == n)
                return null;
            var r = this.doPublic(n);
            if (null == r)
                return null;
            for (var o = r.toString(16), i = o.length, a = 0; a < 2 * t - i; a++)
                o = "0" + o;
            return o
        }
        ,
        e.prototype.setPrivate = function(e, t, n) {
            null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = I(e, 16),
                this.e = parseInt(t, 16),
                this.d = I(n, 16)) : console.error("Invalid RSA private key")
        }
        ,
        e.prototype.setPrivateEx = function(e, t, n, r, o, i, a, s) {
            null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = I(e, 16),
                this.e = parseInt(t, 16),
                this.d = I(n, 16),
                this.p = I(r, 16),
                this.q = I(o, 16),
                this.dmp1 = I(i, 16),
                this.dmq1 = I(a, 16),
                this.coeff = I(s, 16)) : console.error("Invalid RSA private key")
        }
        ,
        e.prototype.generate = function(e, t) {
            var n = new ie
                , r = e >> 1;
            this.e = parseInt(t, 16);
            for (var o = new D(t,16); ; ) {
                for (; ; )
                    if (this.p = new D(e - r,1,n),
                    0 == this.p.subtract(D.ONE).gcd(o).compareTo(D.ONE) && this.p.isProbablePrime(10))
                        break;
                for (; ; )
                    if (this.q = new D(r,1,n),
                    0 == this.q.subtract(D.ONE).gcd(o).compareTo(D.ONE) && this.q.isProbablePrime(10))
                        break;
                if (this.p.compareTo(this.q) <= 0) {
                    var i = this.p;
                    this.p = this.q,
                        this.q = i
                }
                var a = this.p.subtract(D.ONE)
                    , s = this.q.subtract(D.ONE)
                    , l = a.multiply(s);
                if (0 == l.gcd(o).compareTo(D.ONE)) {
                    this.n = this.p.multiply(this.q),
                        this.d = o.modInverse(l),
                        this.dmp1 = this.d.mod(a),
                        this.dmq1 = this.d.mod(s),
                        this.coeff = this.q.modInverse(this.p);
                    break
                }
            }
        }
        ,
        e.prototype.decrypt = function(e) {
            var t = I(e, 16)
                , n = this.doPrivate(t);
            return null == n ? null : ce(n, this.n.bitLength() + 7 >> 3)
        }
        ,
        e.prototype.generateAsync = function(e, t, n) {
            var r = new ie
                , o = e >> 1;
            this.e = parseInt(t, 16);
            var i = new D(t,16)
                , a = this
                , s = function() {
                var t = function() {
                    if (a.p.compareTo(a.q) <= 0) {
                        var e = a.p;
                        a.p = a.q,
                            a.q = e
                    }
                    var t = a.p.subtract(D.ONE)
                        , r = a.q.subtract(D.ONE)
                        , o = t.multiply(r);
                    0 == o.gcd(i).compareTo(D.ONE) ? (a.n = a.p.multiply(a.q),
                        a.d = i.modInverse(o),
                        a.dmp1 = a.d.mod(t),
                        a.dmq1 = a.d.mod(r),
                        a.coeff = a.q.modInverse(a.p),
                        setTimeout((function() {
                                n()
                            }
                        ), 0)) : setTimeout(s, 0)
                }
                    , l = function() {
                    a.q = R(),
                        a.q.fromNumberAsync(o, 1, r, (function() {
                                a.q.subtract(D.ONE).gcda(i, (function(e) {
                                        0 == e.compareTo(D.ONE) && a.q.isProbablePrime(10) ? setTimeout(t, 0) : setTimeout(l, 0)
                                    }
                                ))
                            }
                        ))
                }
                    , c = function() {
                    a.p = R(),
                        a.p.fromNumberAsync(e - o, 1, r, (function() {
                                a.p.subtract(D.ONE).gcda(i, (function(e) {
                                        0 == e.compareTo(D.ONE) && a.p.isProbablePrime(10) ? setTimeout(l, 0) : setTimeout(c, 0)
                                    }
                                ))
                            }
                        ))
                };
                setTimeout(c, 0)
            };
            setTimeout(s, 0)
        }
        ,
        e.prototype.sign = function(e, t, n) {
            var r = de(n)
                , o = r + t(e).toString()
                , i = ae(o, this.n.bitLength() / 4);
            if (null == i)
                return null;
            var a = this.doPrivate(i);
            if (null == a)
                return null;
            var s = a.toString(16);
            return 0 == (1 & s.length) ? s : "0" + s
        }
        ,
        e.prototype.verify = function(e, t, n) {
            var r = I(t, 16)
                , o = this.doPublic(r);
            if (null == o)
                return null;
            var i = o.toString(16).replace(/^1f+00/, "")
                , a = fe(i);
            return a == n(e).toString()
        }
        ,
        e
}();

var CCount = 0;
var VVV;
var b = {
    decode: function(e) {
        var t;
        if (CCount === 0){
            VVV = undefined
            CCount++;
        }
        if (void 0 === VVV) {
            var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
                , r = "= \f\n\r\t \u2028\u2029";
            for (VVV = Object.create(null),
                     t = 0; t < 64; ++t)
                VVV[n.charAt(t)] = t;
            for (VVV["-"] = 62,
                     VVV["_"] = 63,
                     t = 0; t < r.length; ++t)
                VVV[r.charAt(t)] = -1
        }
        var o = []
            , i = 0
            , a = 0;
        for (t = 0; t < e.length; ++t) {
            var s = e.charAt(t);
            if ("=" == s)
                break;
            if (s = VVV[s],
            -1 != s) {
                if (void 0 === s)
                    throw new Error("Illegal character at offset " + t);
                i |= s,
                    ++a >= 4 ? (o[o.length] = i >> 16,
                        o[o.length] = i >> 8 & 255,
                        o[o.length] = 255 & i,
                        i = 0,
                        a = 0) : i <<= 6
            }
        }
        switch (a) {
            case 1:
                throw new Error("Base64 encoding incomplete: at least 2 bits missing");
            case 2:
                o[o.length] = i >> 10;
                break;
            case 3:
                o[o.length] = i >> 16,
                    o[o.length] = i >> 8 & 255;
                break
        }
        return o
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(e) {
        var t = b.re.exec(e);
        if (t)
            if (t[1])
                e = t[1];
            else {
                if (!t[2])
                    throw new Error("RegExp out of sync");
                e = t[2]
            }
        return b.decode(e)
    }
}

k = function() {
    function e(t, n) {
        this.hexDigits = "0123456789ABCDEF",
            t instanceof e ? (this.enc = t.enc,
                this.pos = t.pos) : (this.enc = t,
                this.pos = n)
    }
    return e.prototype.get = function(e) {
        if (void 0 === e && (e = this.pos++),
        e >= this.enc.length)
            throw new Error("Requesting byte offset " + e + " on a stream of length " + this.enc.length);
        return "string" === typeof this.enc ? this.enc.charCodeAt(e) : this.enc[e]
    }
        ,
        e.prototype.hexByte = function(e) {
            return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(15 & e)
        }
        ,
        e.prototype.hexDump = function(e, t, n) {
            for (var r = "", o = e; o < t; ++o)
                if (r += this.hexByte(this.get(o)),
                !0 !== n)
                    switch (15 & o) {
                        case 7:
                            r += "  ";
                            break;
                        case 15:
                            r += "\n";
                            break;
                        default:
                            r += " "
                    }
            return r
        }
        ,
        e.prototype.isASCII = function(e, t) {
            for (var n = e; n < t; ++n) {
                var r = this.get(n);
                if (r < 32 || r > 176)
                    return !1
            }
            return !0
        }
        ,
        e.prototype.parseStringISO = function(e, t) {
            for (var n = "", r = e; r < t; ++r)
                n += String.fromCharCode(this.get(r));
            return n
        }
        ,
        e.prototype.parseStringUTF = function(e, t) {
            for (var n = "", r = e; r < t; ) {
                var o = this.get(r++);
                n += o < 128 ? String.fromCharCode(o) : o > 191 && o < 224 ? String.fromCharCode((31 & o) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & o) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
            }
            return n
        }
        ,
        e.prototype.parseStringBMP = function(e, t) {
            for (var n, r, o = "", i = e; i < t; )
                n = this.get(i++),
                    r = this.get(i++),
                    o += String.fromCharCode(n << 8 | r);
            return o
        }
        ,
        e.prototype.parseTime = function(e, t, n) {
            var r = this.parseStringISO(e, t)
                , o = (n ? w : C).exec(r);
            return o ? (n && (o[1] = +o[1],
                o[1] += +o[1] < 70 ? 2e3 : 1900),
                r = o[1] + "-" + o[2] + "-" + o[3] + " " + o[4],
            o[5] && (r += ":" + o[5],
            o[6] && (r += ":" + o[6],
            o[7] && (r += "." + o[7]))),
            o[8] && (r += " UTC",
            "Z" != o[8] && (r += o[8],
            o[9] && (r += ":" + o[9]))),
                r) : "Unrecognized time: " + r
        }
        ,
        e.prototype.parseInteger = function(e, t) {
            var n, r = this.get(e), o = r > 127, i = o ? 255 : 0, a = "";
            while (r == i && ++e < t)
                r = this.get(e);
            if (n = t - e,
            0 === n)
                return o ? -1 : 0;
            if (n > 4) {
                a = r,
                    n <<= 3;
                while (0 == (128 & (+a ^ i)))
                    a = +a << 1,
                        --n;
                a = "(" + n + " bit)\n"
            }
            o && (r -= 256);
            for (var s = new _(r), l = e + 1; l < t; ++l)
                s.mulAdd(256, this.get(l));
            return a + s.toString()
        }
        ,
        e.prototype.parseBitString = function(e, t, n) {
            for (var r = this.get(e), o = (t - e - 1 << 3) - r, i = "(" + o + " bit)\n", a = "", s = e + 1; s < t; ++s) {
                for (var l = this.get(s), c = s == t - 1 ? r : 0, u = 7; u >= c; --u)
                    a += l >> u & 1 ? "1" : "0";
                if (a.length > n)
                    return i + S(a, n)
            }
            return i + a
        }
        ,
        e.prototype.parseOctetString = function(e, t, n) {
            if (this.isASCII(e, t))
                return S(this.parseStringISO(e, t), n);
            var r = t - e
                , o = "(" + r + " byte)\n";
            n /= 2,
            r > n && (t = e + n);
            for (var i = e; i < t; ++i)
                o += this.hexByte(this.get(i));
            return r > n && (o += x),
                o
        }
        ,
        e.prototype.parseOID = function(e, t, n) {
            for (var r = "", o = new _, i = 0, a = e; a < t; ++a) {
                var s = this.get(a);
                if (o.mulAdd(128, 127 & s),
                    i += 7,
                    !(128 & s)) {
                    if ("" === r)
                        if (o = o.simplify(),
                        o instanceof _)
                            o.sub(80),
                                r = "2." + o.toString();
                        else {
                            var l = o < 80 ? o < 40 ? 0 : 1 : 2;
                            r = l + "." + (o - 40 * l)
                        }
                    else
                        r += "." + o.toString();
                    if (r.length > n)
                        return S(r, n);
                    o = new _,
                        i = 0
                }
            }
            return i > 0 && (r += ".incomplete"),
                r
        }
        ,
        e
}()

M = function() {
    function e(e) {
        var t = e.get();
        if (this.tagClass = t >> 6,
            this.tagConstructed = 0 !== (32 & t),
            this.tagNumber = 31 & t,
        31 == this.tagNumber) {
            var n = new _;
            do {
                t = e.get(),
                    n.mulAdd(128, 127 & t)
            } while (128 & t);
            this.tagNumber = n.simplify()
        }
    }
    return e.prototype.isUniversal = function() {
        return 0 === this.tagClass
    }
        ,
        e.prototype.isEOC = function() {
            return 0 === this.tagClass && 0 === this.tagNumber
        }
        ,
        e
}()

O = function() {
    function e(e, t, n, r, o) {
        if (!(r instanceof M))
            throw new Error("Invalid tag value.");
        this.stream = e,
            this.header = t,
            this.length = n,
            this.tag = r,
            this.sub = o
    }
    return e.prototype.typeName = function() {
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
        ,
        e.prototype.content = function(e) {
            if (void 0 === this.tag)
                return null;
            void 0 === e && (e = 1 / 0);
            var t = this.posContent()
                , n = Math.abs(this.length);
            if (!this.tag.isUniversal())
                return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + n, e);
            switch (this.tag.tagNumber) {
                case 1:
                    return 0 === this.stream.get(t) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(t, t + n);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(t, t + n, e);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + n, e);
                case 6:
                    return this.stream.parseOID(t, t + n, e);
                case 16:
                case 17:
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                case 12:
                    return S(this.stream.parseStringUTF(t, t + n), e);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return S(this.stream.parseStringISO(t, t + n), e);
                case 30:
                    return S(this.stream.parseStringBMP(t, t + n), e);
                case 23:
                case 24:
                    return this.stream.parseTime(t, t + n, 23 == this.tag.tagNumber)
            }
            return null
        }
        ,
        e.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
        }
        ,
        e.prototype.toPrettyString = function(e) {
            void 0 === e && (e = "");
            var t = e + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0 && (t += "+"),
                t += this.length,
                this.tag.tagConstructed ? t += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (t += " (encapsulates)"),
                t += "\n",
            null !== this.sub) {
                e += "  ";
                for (var n = 0, r = this.sub.length; n < r; ++n)
                    t += this.sub[n].toPrettyString(e)
            }
            return t
        }
        ,
        e.prototype.posStart = function() {
            return this.stream.pos
        }
        ,
        e.prototype.posContent = function() {
            return this.stream.pos + this.header
        }
        ,
        e.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length)
        }
        ,
        e.prototype.toHexString = function() {
            return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
        }
        ,
        e.decodeLength = function(e) {
            var t = e.get()
                , n = 127 & t;
            if (n == t)
                return n;
            if (n > 6)
                throw new Error("Length over 48 bits not supported at position " + (e.pos - 1));
            if (0 === n)
                return null;
            t = 0;
            for (var r = 0; r < n; ++r)
                t = 256 * t + e.get();
            return t
        }
        ,
        e.prototype.getHexStringValue = function() {
            var e = this.toHexString()
                , t = 2 * this.header
                , n = 2 * this.length;
            return e.substr(t, n)
        }
        ,
        e.decode = function(t) {
            var n;
            n = t instanceof k ? t : new k(t,0);
            var r = new k(n)
                , o = new M(n)
                , i = e.decodeLength(n)
                , a = n.pos
                , s = a - r.pos
                , l = null
                , c = function() {
                var t = [];
                if (null !== i) {
                    var r = a + i;
                    while (n.pos < r)
                        t[t.length] = e.decode(n);
                    if (n.pos != r)
                        throw new Error("Content size is not correct for container starting at offset " + a)
                } else
                        for (; ; ) {
                            var o = e.decode(n);
                            if (o.tag.isEOC())
                                break;
                            t[t.length] = o
                        }
                        i = a - n.pos
                return t
            };
            if (o.tagConstructed)
                l = c();
            else if (o.isUniversal() && (3 == o.tagNumber || 4 == o.tagNumber)){
                if (3 == o.tagNumber && 0 != n.get())
                    throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                l = c();
                for (var u = 0; u < l.length; ++u)
                    if (l[u].tag.isEOC())
                        throw new Error("EOC is not supposed to be actual content.")
            }
            if (null === l) {
                if (null === i)
                    throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
                n.pos = a + Math.abs(i)
            }
            return new e(r,s,i,o,l)
        }
        ,
        e
}()

function I(e, t) {
    return new D(e,t)
}

ve = function(e) {
    function t(n) {
        var r = e.call(this) || this;
        return n && ("string" === typeof n ? r.parseKey(n) : (t.hasPrivateKeyProperty(n) || t.hasPublicKeyProperty(n)) && r.parsePropertiesFrom(n)),
            r
    }
    return me(t, e),
        t.prototype.parseKey = function(e) {
                var t = 0
                    , n = 0
                    , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
                    , o = r.test(e) ? g.decode(e) : b.unarmor(e)
                    , i = O.decode(o);
                if (3 === i.sub.length && (i = i.sub[2].sub[0]),
                9 === i.sub.length) {
                    t = i.sub[1].getHexStringValue(),
                        this.n = I(t, 16),
                        n = i.sub[2].getHexStringValue(),
                        this.e = parseInt(n, 16);
                    var a = i.sub[3].getHexStringValue();
                    this.d = I(a, 16);
                    var s = i.sub[4].getHexStringValue();
                    this.p = I(s, 16);
                    var l = i.sub[5].getHexStringValue();
                    this.q = I(l, 16);
                    var c = i.sub[6].getHexStringValue();
                    this.dmp1 = I(c, 16);
                    var u = i.sub[7].getHexStringValue();
                    this.dmq1 = I(u, 16);
                    var d = i.sub[8].getHexStringValue();
                    this.coeff = I(d, 16)
                } else {
                    if (2 !== i.sub.length){
                        return !1;
                    }
                    var f = i.sub[1]
                        , h = f.sub[0];
                    t = h.sub[0].getHexStringValue(),
                        this.n = I(t, 16),
                        n = h.sub[1].getHexStringValue(),
                        this.e = parseInt(n, 16)
                }
                return !0
        }
        ,
        t.prototype.getPrivateBaseKey = function() {
            var e = {
                array: [new pe.asn1.DERInteger({
                    int: 0
                }), new pe.asn1.DERInteger({
                    bigint: this.n
                }), new pe.asn1.DERInteger({
                    int: this.e
                }), new pe.asn1.DERInteger({
                    bigint: this.d
                }), new pe.asn1.DERInteger({
                    bigint: this.p
                }), new pe.asn1.DERInteger({
                    bigint: this.q
                }), new pe.asn1.DERInteger({
                    bigint: this.dmp1
                }), new pe.asn1.DERInteger({
                    bigint: this.dmq1
                }), new pe.asn1.DERInteger({
                    bigint: this.coeff
                })]
            }
                , t = new pe.asn1.DERSequence(e);
            return t.getEncodedHex()
        }
        ,
        t.prototype.getPrivateBaseKeyB64 = function() {
            return p(this.getPrivateBaseKey())
        }
        ,
        t.prototype.getPublicBaseKey = function() {
            var e = new pe.asn1.DERSequence({
                array: [new pe.asn1.DERObjectIdentifier({
                    oid: "1.2.840.113549.1.1.1"
                }), new pe.asn1.DERNull]
            })
                , t = new pe.asn1.DERSequence({
                array: [new pe.asn1.DERInteger({
                    bigint: this.n
                }), new pe.asn1.DERInteger({
                    int: this.e
                })]
            })
                , n = new pe.asn1.DERBitString({
                hex: "00" + t.getEncodedHex()
            })
                , r = new pe.asn1.DERSequence({
                array: [e, n]
            });
            return r.getEncodedHex()
        }
        ,
        t.prototype.getPublicBaseKeyB64 = function() {
            return p(this.getPublicBaseKey())
        }
        ,
        t.wordwrap = function(e, t) {
            if (t = t || 64,
                !e)
                return e;
            var n = "(.{1," + t + "})( +|$\n?)|(.{1," + t + "})";
            return e.match(RegExp(n, "g")).join("\n")
        }
        ,
        t.prototype.getPrivateKey = function() {
            var e = "-----BEGIN RSA PRIVATE KEY-----\n";
            return e += t.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                e += "-----END RSA PRIVATE KEY-----",
                e
        }
        ,
        t.prototype.getPublicKey = function() {
            var e = "-----BEGIN PUBLIC KEY-----\n";
            return e += t.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                e += "-----END PUBLIC KEY-----",
                e
        }
        ,
        t.hasPublicKeyProperty = function(e) {
            return e = e || {},
            e.hasOwnProperty("n") && e.hasOwnProperty("e")
        }
        ,
        t.hasPrivateKeyProperty = function(e) {
            return e = e || {},
            e.hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty("q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff")
        }
        ,
        t.prototype.parsePropertiesFrom = function(e) {
            this.n = e.n,
                this.e = e.e,
            e.hasOwnProperty("d") && (this.d = e.d,
                this.p = e.p,
                this.q = e.q,
                this.dmp1 = e.dmp1,
                this.dmq1 = e.dmq1,
                this.coeff = e.coeff)
        }
        ,
        t
}(le)

function w(A) {
    var e, t, n = "", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = "=";
    for (e = 0; e + 3 <= A.length; e += 3)
        t = parseInt(A.substring(e, e + 3), 16),
            n += r.charAt(t >> 6) + r.charAt(63 & t);
    e + 1 == A.length ? (t = parseInt(A.substring(e, e + 1), 16),
        n += r.charAt(t << 2)) : e + 2 == A.length && (t = parseInt(A.substring(e, e + 2), 16),
        n += r.charAt(t >> 2) + r.charAt((3 & t) << 4));
    while ((3 & n.length) > 0)
        n += a;
    return n
}

EEE = function() {
    function e(e) {
        void 0 === e && (e = {}),
            e = e || {},
            this.default_key_size = e.default_key_size ? parseInt(e.default_key_size, 10) : 1024,
            this.default_public_exponent = e.default_public_exponent || "010001",
            this.log = e.log || !1,
            this.key = null
    }
    return e.prototype.setKey = function(e) {
        this.log && this.key && console.warn("A key was already set, overriding existing."),
            this.key = new ve(e)
    }
        ,
        e.prototype.setPrivateKey = function(e) {
            this.setKey(e)
        }
        ,
        e.prototype.setPublicKey = function(e) {
            this.setKey(e)
        }
        ,
        e.prototype.decrypt = function(e) {
                return this.getKey().decrypt(m(e))

        }
        ,
        e.prototype.encrypt = function(e) {
                return p(this.getKey().encrypt(e))
        }
        ,
        e.prototype.sign = function(e, t, n) {
                return p(this.getKey().sign(e, t, n))
        }
        ,
        e.prototype.verify = function(e, t, n) {
                return this.getKey().verify(e, m(t), n)
        }
        ,
        e.prototype.getKey = function(e) {
            if (!this.key) {
                if (this.key = new ve,
                e && "[object Function]" === {}.toString.call(e))
                    return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, e);
                this.key.generate(this.default_key_size, this.default_public_exponent)
            }
            return this.key
        }
        ,
        e.prototype.getPrivateKey = function() {
            return this.getKey().getPrivateKey()
        }
        ,
        e.prototype.getPrivateKeyB64 = function() {
            return this.getKey().getPrivateBaseKeyB64()
        }
        ,
        e.prototype.getPublicKey = function() {
            return this.getKey().getPublicKey()
        }
        ,
        e.prototype.getPublicKeyB64 = function() {
            return this.getKey().getPublicBaseKeyB64()
        }
        ,
        e.prototype.encryptLong = function(A) {
            var e = this.getKey()
                , t = (e.n.bitLength() + 7 >> 3) - 11;
                var n = ""
                    , r = "";
                if (A.length > t)
                    return n = A.match(/.{1,50}/g),
                        n.forEach((function(A) {
                                var t = e.encrypt(A);
                                r += t
                            }
                        )),
                        w(r);
                var a = e.encrypt(A)
                    , s = w(a);
                return s
        }
        ,
        e.prototype.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + U(this[this.t - 1] ^ this.s & this.DM)
        }
        ,
        e.version = "3.2.1"
        ,
        e
}();



var blocks = [];
var buffer8;
var buffer = new ArrayBuffer(68);
buffer8 = new Uint8Array(buffer),
    blocks = new Uint32Array(buffer)

ARRAY_BUFFER = true

EXTRA = [128, 32768, 8388608, -2147483648]

HEX_CHARS = "0123456789abcdef"

function Md5(e) {
    if (e)
        blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0,
            this.blocks = blocks,
            this.buffer8 = buffer8;
    else if (ARRAY_BUFFER) {
        var t = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(t),
            this.blocks = new Uint32Array(t)
    } else
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0,
        this.finalized = this.hashed = !1,
        this.first = !0
}
Md5.prototype.update = function(e) {
    if (!this.finalized) {
        var t, n = typeof e;
        if ("string" !== n) {
            if ("object" !== n)
                throw ERROR;
            if (null === e)
                throw ERROR;
            if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
            else if (!Array.isArray(e) && (!ARRAY_BUFFER || !ArrayBuffer.isView(e)))
                throw ERROR;
            t = !0
        }
        var r, o, i = 0, a = e.length, s = this.blocks, l = this.buffer8;
        while (i < a) {
            if (this.hashed && (this.hashed = !1,
                s[0] = s[16],
                s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0),
                t)
                if (ARRAY_BUFFER)
                    for (o = this.start; i < a && o < 64; ++i)
                        l[o++] = e[i];
                else
                    for (o = this.start; i < a && o < 64; ++i)
                        s[o >> 2] |= e[i] << SHIFT[3 & o++];
            else if (ARRAY_BUFFER)
                for (o = this.start; i < a && o < 64; ++i)
                    r = e.charCodeAt(i),
                        r < 128 ? l[o++] = r : r < 2048 ? (l[o++] = 192 | r >> 6,
                            l[o++] = 128 | 63 & r) : r < 55296 || r >= 57344 ? (l[o++] = 224 | r >> 12,
                            l[o++] = 128 | r >> 6 & 63,
                            l[o++] = 128 | 63 & r) : (r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(++i)),
                            l[o++] = 240 | r >> 18,
                            l[o++] = 128 | r >> 12 & 63,
                            l[o++] = 128 | r >> 6 & 63,
                            l[o++] = 128 | 63 & r);
            else
                for (o = this.start; i < a && o < 64; ++i)
                    r = e.charCodeAt(i),
                        r < 128 ? s[o >> 2] |= r << SHIFT[3 & o++] : r < 2048 ? (s[o >> 2] |= (192 | r >> 6) << SHIFT[3 & o++],
                            s[o >> 2] |= (128 | 63 & r) << SHIFT[3 & o++]) : r < 55296 || r >= 57344 ? (s[o >> 2] |= (224 | r >> 12) << SHIFT[3 & o++],
                            s[o >> 2] |= (128 | r >> 6 & 63) << SHIFT[3 & o++],
                            s[o >> 2] |= (128 | 63 & r) << SHIFT[3 & o++]) : (r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(++i)),
                            s[o >> 2] |= (240 | r >> 18) << SHIFT[3 & o++],
                            s[o >> 2] |= (128 | r >> 12 & 63) << SHIFT[3 & o++],
                            s[o >> 2] |= (128 | r >> 6 & 63) << SHIFT[3 & o++],
                            s[o >> 2] |= (128 | 63 & r) << SHIFT[3 & o++]);
            this.lastByteIndex = o,
                this.bytes += o - this.start,
                o >= 64 ? (this.start = o - 64,
                    this.hash(),
                    this.hashed = !0) : this.start = o
        }
        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0,
            this.bytes = this.bytes % 4294967296),
            this
    }
}
    ,
    Md5.prototype.finalize = function() {
        if (!this.finalized) {
            this.finalized = !0;
            var e = this.blocks
                , t = this.lastByteIndex;
            e[t >> 2] |= EXTRA[3 & t],
            t >= 56 && (this.hashed || this.hash(),
                e[0] = e[16],
                e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0),
                e[14] = this.bytes << 3,
                e[15] = this.hBytes << 3 | this.bytes >>> 29,
                this.hash()
        }
    }
    ,
    Md5.prototype.hash = function() {
        var e, t, n, r, o, i, a = this.blocks;
        this.first ? (e = a[0] - 680876937,
            e = (e << 7 | e >>> 25) - 271733879 << 0,
            r = (-1732584194 ^ 2004318071 & e) + a[1] - 117830708,
            r = (r << 12 | r >>> 20) + e << 0,
            n = (-271733879 ^ r & (-271733879 ^ e)) + a[2] - 1126478375,
            n = (n << 17 | n >>> 15) + r << 0,
            t = (e ^ n & (r ^ e)) + a[3] - 1316259209,
            t = (t << 22 | t >>> 10) + n << 0) : (e = this.h0,
            t = this.h1,
            n = this.h2,
            r = this.h3,
            e += (r ^ t & (n ^ r)) + a[0] - 680876936,
            e = (e << 7 | e >>> 25) + t << 0,
            r += (n ^ e & (t ^ n)) + a[1] - 389564586,
            r = (r << 12 | r >>> 20) + e << 0,
            n += (t ^ r & (e ^ t)) + a[2] + 606105819,
            n = (n << 17 | n >>> 15) + r << 0,
            t += (e ^ n & (r ^ e)) + a[3] - 1044525330,
            t = (t << 22 | t >>> 10) + n << 0),
            e += (r ^ t & (n ^ r)) + a[4] - 176418897,
            e = (e << 7 | e >>> 25) + t << 0,
            r += (n ^ e & (t ^ n)) + a[5] + 1200080426,
            r = (r << 12 | r >>> 20) + e << 0,
            n += (t ^ r & (e ^ t)) + a[6] - 1473231341,
            n = (n << 17 | n >>> 15) + r << 0,
            t += (e ^ n & (r ^ e)) + a[7] - 45705983,
            t = (t << 22 | t >>> 10) + n << 0,
            e += (r ^ t & (n ^ r)) + a[8] + 1770035416,
            e = (e << 7 | e >>> 25) + t << 0,
            r += (n ^ e & (t ^ n)) + a[9] - 1958414417,
            r = (r << 12 | r >>> 20) + e << 0,
            n += (t ^ r & (e ^ t)) + a[10] - 42063,
            n = (n << 17 | n >>> 15) + r << 0,
            t += (e ^ n & (r ^ e)) + a[11] - 1990404162,
            t = (t << 22 | t >>> 10) + n << 0,
            e += (r ^ t & (n ^ r)) + a[12] + 1804603682,
            e = (e << 7 | e >>> 25) + t << 0,
            r += (n ^ e & (t ^ n)) + a[13] - 40341101,
            r = (r << 12 | r >>> 20) + e << 0,
            n += (t ^ r & (e ^ t)) + a[14] - 1502002290,
            n = (n << 17 | n >>> 15) + r << 0,
            t += (e ^ n & (r ^ e)) + a[15] + 1236535329,
            t = (t << 22 | t >>> 10) + n << 0,
            e += (n ^ r & (t ^ n)) + a[1] - 165796510,
            e = (e << 5 | e >>> 27) + t << 0,
            r += (t ^ n & (e ^ t)) + a[6] - 1069501632,
            r = (r << 9 | r >>> 23) + e << 0,
            n += (e ^ t & (r ^ e)) + a[11] + 643717713,
            n = (n << 14 | n >>> 18) + r << 0,
            t += (r ^ e & (n ^ r)) + a[0] - 373897302,
            t = (t << 20 | t >>> 12) + n << 0,
            e += (n ^ r & (t ^ n)) + a[5] - 701558691,
            e = (e << 5 | e >>> 27) + t << 0,
            r += (t ^ n & (e ^ t)) + a[10] + 38016083,
            r = (r << 9 | r >>> 23) + e << 0,
            n += (e ^ t & (r ^ e)) + a[15] - 660478335,
            n = (n << 14 | n >>> 18) + r << 0,
            t += (r ^ e & (n ^ r)) + a[4] - 405537848,
            t = (t << 20 | t >>> 12) + n << 0,
            e += (n ^ r & (t ^ n)) + a[9] + 568446438,
            e = (e << 5 | e >>> 27) + t << 0,
            r += (t ^ n & (e ^ t)) + a[14] - 1019803690,
            r = (r << 9 | r >>> 23) + e << 0,
            n += (e ^ t & (r ^ e)) + a[3] - 187363961,
            n = (n << 14 | n >>> 18) + r << 0,
            t += (r ^ e & (n ^ r)) + a[8] + 1163531501,
            t = (t << 20 | t >>> 12) + n << 0,
            e += (n ^ r & (t ^ n)) + a[13] - 1444681467,
            e = (e << 5 | e >>> 27) + t << 0,
            r += (t ^ n & (e ^ t)) + a[2] - 51403784,
            r = (r << 9 | r >>> 23) + e << 0,
            n += (e ^ t & (r ^ e)) + a[7] + 1735328473,
            n = (n << 14 | n >>> 18) + r << 0,
            t += (r ^ e & (n ^ r)) + a[12] - 1926607734,
            t = (t << 20 | t >>> 12) + n << 0,
            o = t ^ n,
            e += (o ^ r) + a[5] - 378558,
            e = (e << 4 | e >>> 28) + t << 0,
            r += (o ^ e) + a[8] - 2022574463,
            r = (r << 11 | r >>> 21) + e << 0,
            i = r ^ e,
            n += (i ^ t) + a[11] + 1839030562,
            n = (n << 16 | n >>> 16) + r << 0,
            t += (i ^ n) + a[14] - 35309556,
            t = (t << 23 | t >>> 9) + n << 0,
            o = t ^ n,
            e += (o ^ r) + a[1] - 1530992060,
            e = (e << 4 | e >>> 28) + t << 0,
            r += (o ^ e) + a[4] + 1272893353,
            r = (r << 11 | r >>> 21) + e << 0,
            i = r ^ e,
            n += (i ^ t) + a[7] - 155497632,
            n = (n << 16 | n >>> 16) + r << 0,
            t += (i ^ n) + a[10] - 1094730640,
            t = (t << 23 | t >>> 9) + n << 0,
            o = t ^ n,
            e += (o ^ r) + a[13] + 681279174,
            e = (e << 4 | e >>> 28) + t << 0,
            r += (o ^ e) + a[0] - 358537222,
            r = (r << 11 | r >>> 21) + e << 0,
            i = r ^ e,
            n += (i ^ t) + a[3] - 722521979,
            n = (n << 16 | n >>> 16) + r << 0,
            t += (i ^ n) + a[6] + 76029189,
            t = (t << 23 | t >>> 9) + n << 0,
            o = t ^ n,
            e += (o ^ r) + a[9] - 640364487,
            e = (e << 4 | e >>> 28) + t << 0,
            r += (o ^ e) + a[12] - 421815835,
            r = (r << 11 | r >>> 21) + e << 0,
            i = r ^ e,
            n += (i ^ t) + a[15] + 530742520,
            n = (n << 16 | n >>> 16) + r << 0,
            t += (i ^ n) + a[2] - 995338651,
            t = (t << 23 | t >>> 9) + n << 0,
            e += (n ^ (t | ~r)) + a[0] - 198630844,
            e = (e << 6 | e >>> 26) + t << 0,
            r += (t ^ (e | ~n)) + a[7] + 1126891415,
            r = (r << 10 | r >>> 22) + e << 0,
        n += (e ^ (r | ~t)) + a[14] - 1416354905,
        n = (n << 15 | n >>> 17) + r << 0,
        t += (r ^ (n | ~e)) + a[5] - 57434055,
        t = (t << 21 | t >>> 11) + n << 0,
        e += (n ^ (t | ~r)) + a[12] + 1700485571,
        e = (e << 6 | e >>> 26) + t << 0,
        r += (t ^ (e | ~n)) + a[3] - 1894986606,
        r = (r << 10 | r >>> 22) + e << 0,
        n += (e ^ (r | ~t)) + a[10] - 1051523,
        n = (n << 15 | n >>> 17) + r << 0,
        t += (r ^ (n | ~e)) + a[1] - 2054922799,
        t = (t << 21 | t >>> 11) + n << 0,
        e += (n ^ (t | ~r)) + a[8] + 1873313359,
        e = (e << 6 | e >>> 26) + t << 0,
        r += (t ^ (e | ~n)) + a[15] - 30611744,
        r = (r << 10 | r >>> 22) + e << 0,
        n += (e ^ (r | ~t)) + a[6] - 1560198380,
        n = (n << 15 | n >>> 17) + r << 0,
        t += (r ^ (n | ~e)) + a[13] + 1309151649,
        t = (t << 21 | t >>> 11) + n << 0,
        e += (n ^ (t | ~r)) + a[4] - 145523070,
        e = (e << 6 | e >>> 26) + t << 0,
        r += (t ^ (e | ~n)) + a[11] - 1120210379,
        r = (r << 10 | r >>> 22) + e << 0,
        n += (e ^ (r | ~t)) + a[2] + 718787259,
        n = (n << 15 | n >>> 17) + r << 0,
        t += (r ^ (n | ~e)) + a[9] - 343485551,
        t = (t << 21 | t >>> 11) + n << 0,
        this.first ? (this.h0 = e + 1732584193 << 0,
            this.h1 = t - 271733879 << 0,
            this.h2 = n - 1732584194 << 0,
            this.h3 = r + 271733878 << 0,
            this.first = !1) : (this.h0 = this.h0 + e << 0,
            this.h1 = this.h1 + t << 0,
            this.h2 = this.h2 + n << 0,
            this.h3 = this.h3 + r << 0)
    }
    ,
    Md5.prototype.hex = function() {
        this.finalize();
        var e = this.h0
            , t = this.h1
            , n = this.h2
            , r = this.h3;
        return HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15]
    }
    ,
    Md5.prototype.toString = Md5.prototype.hex,
    Md5.prototype.digest = function() {
        this.finalize();
        var e = this.h0
            , t = this.h1
            , n = this.h2
            , r = this.h3;
        return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255]
    }
    ,
    Md5.prototype.array = Md5.prototype.digest,
    Md5.prototype.arrayBuffer = function() {
        this.finalize();
        var e = new ArrayBuffer(16)
            , t = new Uint32Array(e);
        return t[0] = this.h0,
            t[1] = this.h1,
            t[2] = this.h2,
            t[3] = this.h3,
            e
    }
    ,
    Md5.prototype.buffer = Md5.prototype.arrayBuffer,
    Md5.prototype.base64 = function() {
        for (var e, t, n, r = "", o = this.array(), i = 0; i < 15; )
            e = o[i++],
                t = o[i++],
                n = o[i++],
                r += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[63 & (e << 4 | t >>> 4)] + BASE64_ENCODE_CHAR[63 & (t << 2 | n >>> 6)] + BASE64_ENCODE_CHAR[63 & n];
        return e = o[i],
            r += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[e << 4 & 63] + "==",
            r
    }

function get_arg(page,publickey){
    r = publickey

    TT = new EEE()
    TT.setPublicKey(r)

    EE = {
        "businessClassfication": "",
        "dwmc": "",
        "inviteMethod": "",
        "lx": "CGGG",
        "mc": "",
        "pageIndex": page
    }

    function v(A, e) {
        var t = Object.keys(A);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(A);
            e && (n = n.filter((function(e) {
                    return Object.getOwnPropertyDescriptor(A, e).enumerable
                }
            ))),
                t.push.apply(t, n)
        }
        return t
    }

    function bbX(A, e, t) {
        return e in A ? Object.defineProperty(A, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : A[e] = t,
            A
    }

    function AAAAA (t) {
        var e = "hex"
        return new Md5(!0).update(t)[e]()
    }

    function BBB () {
        return AAAAA
    }

    function mmm(A) {
        for (var e = 1; e < arguments.length; e++) {
            var t = null != arguments[e] ? arguments[e] : {};
            e % 2 ? v(Object(t), !0).forEach((function(e) {
                    bbX(A, e, t[e])
                }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : v(Object(t)).forEach((function(e) {
                    Object.defineProperty(A, e, Object.getOwnPropertyDescriptor(t, e))
                }
            ))
        }
        return A
    }

    AAA = mmm(mmm({}, EE), {}, {
        sign: BBB()(JSON.stringify(EE)),
        timeStamp: +new Date
    })

    s = TT.encryptLong(JSON.stringify(AAA))

    return {"param":s}
}

//console.log(get_arg(4,"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEXphy9xhAbt2GJuZgHc8+xLo5FEmVVdDUtIELe/3rlY1x0HIak6hnRs7vUvjgmu+k6u0QYf6lBLXibp5uD4fbvaulKQqoXFP/AAJ+9DfHRAYT2K26YKs1defiK57O5gib8wplSE+BlCgOck+2jgUjpRrwYMYefC5WR2gJzVkbwQIDAQAB"))

/*

ZiGBlPwwS7+4lkgGoKS74R8ExqDCCaruqSd9zrHCG1lB4KVsKgyU8BdhE/G4uo+LRGtNAE3K0dxMU/L0NoMNZaoDJN7/Gqs1JiQHWDBdiXRxuZKrbrqNI3aawQK2KZuxp0FCWcMmoYYRejYLiwgMerYsAyckUwghF/iciXKugN9mIAPZvIo57+bB0qRJtO8Y/KNEKpS32C4K0lUx6wzIvdkccftj/Txj1ZJNVV1k1eKVKrfxwjubOX0ewxeUVYbgj88JRawqPLzheSMFG/7fMfvvousiewJw4yGJ0Qw2GAsq6zfCA3vjyoe0Ya0P5eStIStP6Bz6u61om4lyuM0wHmniA+RLOKTeRxagTAEkXP6PppC1xP/QzhrD5yj3GCr2/X23vSVTuFpofakj6doEbvtxNh6mAtCWEiPRDsV76fxn6asPS4uR3KhLNJaub6C4HF5UV7/SqZXOVzf2sl1jYutGBazkRh3qOX1szmoJOCmFUsih0EO7hyd/Cj0tqKdrM9FGkyHNbpK7lwW236gPZF6d6GJ6yLr3TfRMQjadL5lEkbxI7rP/S7co+im5v84gHmHvMiTjZCaLwA3EiG5LFEYmIhgDOGdp5/r+99R7Oy9+CKrR+rpTSSAH8ATO/uuw6o5TBNKUvMGS2GGjOW2UrYAVrsCFGkDF9M3nNv/kjxs=

"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/6M5m7hH4UMP1c6BaW03wNbzAuF+om8zX+cExl6UwyeF+9WlI1XBO1rrozE5sPNcXPBiGah0Ipr8RR5BTyJ50v8N0ojmLUK9/NPyITgtX32k1ci6MyJenTgasmR6PFomUopXEEpcnnvEmI2GPF7kuM4wi4yD1VO8VVRnIxc63VQIDAQAB"
 */
