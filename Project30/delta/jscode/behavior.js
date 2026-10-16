// ======================================================================
//  behavior.js  —  port of proofofbots/web-re-toolkit
//  builds a human-like stream and drives the page's own sensor script.
//  __buildBehavior(opts) -> [[kind, detail, atMs], ...]  (JSON-safe)
//  __playBehavior(opts)  -> fire them all synchronously (fallback)
// ======================================================================
;(function () {
    function tidy(v) { return Math.round(v * 1000) / 1000; }
    function minimumJerk(t) { t = Math.max(0, Math.min(1, t)); return 10 * t * t * t - 15 * t * t * t * t + 6 * t * t * t * t * t; }
    function mulberry32(a) { a = a >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

    var DEFAULT_SHAPE = { step_px: 6.0, sample_ms: 8.0, jitter_px: 1.2, overshoot: 0.06, dwell_ms: 85.0, flight_ms: 120.0, pause_ms: 220.0 };

    function Stream(seed, start, shape) {
        this.rng = mulberry32((seed >>> 0) ^ 0x5DEECE66);
        this.shape = shape || DEFAULT_SHAPE;
        this.clock = 0; this.at = start || { x: 0, y: 0 }; this.events = [];
    }
    Stream.prototype.spread = function (scale) { return (this.rng() - 0.5) * 2 * scale; };
    Stream.prototype.advance = function (base) { var step = Math.max(base * (1 + this.spread(0.35)), 1); this.clock = tidy(this.clock + step); return this.clock; };
    Stream.prototype.wait = function (ms) { this.clock = tidy(this.clock + Math.max(0, ms)); return this; };
    Stream.prototype.pause = function () { this.advance(this.shape.pause_ms); return this; };
    Stream.prototype.moveTo = function (target) {
        var from = this.at, dx = target.x - from.x, dy = target.y - from.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 0.5) { this.at = { x: target.x, y: target.y }; return this; }
        var step = this.shape.step_px > 0.5 ? this.shape.step_px : 6;
        var steps = Math.max(4, Math.min(220, Math.ceil(distance / step)));
        var overshoot = this.shape.overshoot;
        var lift = { x: target.x + dx * overshoot, y: target.y + dy * overshoot };
        for (var s = 1; s <= steps; s++) {
            var progress = s / steps, eased = minimumJerk(progress);
            var aim = progress > 0.82 ? target : lift;
            var jitter = this.shape.jitter_px * (1 - progress);
            var x = tidy(from.x + (aim.x - from.x) * eased + this.spread(jitter));
            var y = tidy(from.y + (aim.y - from.y) * eased + this.spread(jitter));
            var at = this.advance(this.shape.sample_ms);
            this.events.push({ type: 'pointer-move', at: at, x: x, y: y, dx: tidy(x - this.at.x), dy: tidy(y - this.at.y), buttons: 0 });
            this.at = { x: x, y: y };
        }
        var at2 = this.advance(this.shape.sample_ms);
        this.events.push({ type: 'pointer-move', at: at2, x: target.x, y: target.y, dx: tidy(target.x - this.at.x), dy: tidy(target.y - this.at.y), buttons: 0 });
        this.at = { x: target.x, y: target.y };
        return this;
    };
    Stream.prototype.click = function () {
        var p = this.at;
        var down = this.advance(this.shape.flight_ms);
        this.events.push({ type: 'pointer-down', at: down, x: p.x, y: p.y, button: 0 });
        var up = this.advance(this.shape.dwell_ms);
        this.events.push({ type: 'pointer-up', at: up, x: p.x, y: p.y, button: 0 });
        return this;
    };
    Stream.prototype.clickAt = function (t) { this.moveTo(t); return this.click(); };
    Stream.prototype.typeText = function (text) {
        text = String(text);
        for (var i = 0; i < text.length; i++) {
            var ch = text.charAt(i);
            var d = this.advance(this.shape.flight_ms);
            this.events.push({ type: 'key-down', at: d, key: ch });
            var u = this.advance(this.shape.dwell_ms);
            this.events.push({ type: 'key-up', at: u, key: ch });
        }
        return this;
    };
    Stream.prototype.scrollBy = function (dx, dy, steps) {
        steps = Math.max(1, steps | 0);
        for (var s = 1; s <= steps; s++) {
            var progress = minimumJerk(s / steps);
            var at = this.advance(this.shape.sample_ms * 2);
            this.events.push({ type: 'scroll', at: at, x: tidy(dx * progress), y: tidy(dy * progress) });
        }
        return this;
    };
    Stream.prototype.tap = function (target) {
        var start = this.advance(this.shape.flight_ms);
        this.events.push({ type: 'touch-start', at: start, x: target.x, y: target.y });
        var drift = this.shape.jitter_px;
        var x = tidy(target.x + this.spread(drift)), y = tidy(target.y + this.spread(drift));
        var mid = this.advance(this.shape.sample_ms);
        this.events.push({ type: 'touch-move', at: mid, x: x, y: y });
        var end = this.advance(this.shape.dwell_ms);
        this.events.push({ type: 'touch-end', at: end, x: x, y: y });
        this.at = { x: target.x, y: target.y };
        return this;
    };

    function codeFor(key) {
        if (key === ' ') return 'Space';
        var c = key.toUpperCase();
        if (c >= 'A' && c <= 'Z') return 'Key' + c;
        if (c >= '0' && c <= '9') return 'Digit' + c;
        if (key === '\n') return 'Enter';
        return 'Unidentified';
    }
    function keyCode(key) { if (key.length !== 1) return 0; var k = key.toUpperCase().charCodeAt(0); return (k >= 32 && k <= 126) ? k : 0; }
    function printable(key) { return key.length === 1 ? key.charCodeAt(0) : null; }

    function expand(ev, screen) {
        var hasPoint = (ev.x !== undefined);
        var base = hasPoint ? {
            clientX: Math.round(ev.x), clientY: Math.round(ev.y),
            pageX: Math.round(ev.x), pageY: Math.round(ev.y),
            screenX: Math.round(ev.x + (screen ? screen[0] : 0)),
            screenY: Math.round(ev.y + (screen ? screen[1] : 0))
        } : {};
        function with_(extra) { var o = {}; for (var k in base) o[k] = base[k]; for (var k2 in extra) o[k2] = extra[k2]; return o; }
        switch (ev.type) {
            case 'pointer-move': return [
                ['pointermove', with_({ pointerType: 'mouse', isPrimary: true, movementX: Math.round(ev.dx || 0), movementY: Math.round(ev.dy || 0) })],
                ['mousemove', with_({ buttons: 0, movementX: Math.round(ev.dx || 0), movementY: Math.round(ev.dy || 0) })]
            ];
            case 'pointer-down': return [['pointerdown', with_({ pointerType: 'mouse', isPrimary: true, button: ev.button, buttons: 1, pressure: 0.5, movementX: 0, movementY: 0 })], ['mousedown', with_({ button: ev.button, buttons: 1, movementX: 0, movementY: 0 })]];
            case 'pointer-up': return [['pointerup', with_({ pointerType: 'mouse', isPrimary: true, button: ev.button, buttons: 0, movementX: 0, movementY: 0 })], ['mouseup', with_({ button: ev.button, buttons: 0, movementX: 0, movementY: 0 })], ['click', with_({ button: ev.button, detail: 1, movementX: 0, movementY: 0 })]];
            case 'touch-start': return [['touchstart', with_({})]];
            case 'touch-move': return [['touchmove', with_({})]];
            case 'touch-end': return [['touchend', with_({})]];
            case 'key-down': {
                var out = [['keydown', { key: ev.key, code: codeFor(ev.key), keyCode: keyCode(ev.key), which: keyCode(ev.key) }]];
                var p = printable(ev.key);
                if (p !== null) out.push(['keypress', { key: ev.key, code: codeFor(ev.key), charCode: p }]);
                return out;
            }
            case 'key-up': return [['keyup', { key: ev.key, code: codeFor(ev.key), keyCode: keyCode(ev.key), which: keyCode(ev.key) }]];
            case 'scroll': return [['scroll', { target: 'window' }]];
        }
        return [];
    }

    function centreOf(el) {
        if (!el || !el.getBoundingClientRect) return null;
        try { var b = el.getBoundingClientRect(); if (!b || (!b.width && !b.height)) return null; return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; } catch (e) { return null; }
    }
    function findInput() {
        try {
            var f = globalThis.document.getElementsByTagName('input');
            for (var i = 0; i < f.length; i++) { var t = f[i].type; if (!t || t === 'text' || t === 'search' || t === 'email') { var c = centreOf(f[i]); if (c) return { el: f[i], c: c }; } }
        } catch (e) {}
        return null;
    }
    function findSubmit() {
        try {
            var b = globalThis.document.getElementsByTagName('button');
            if (b && b.length) { var c = centreOf(b[0]); if (c) return { el: b[0], c: c }; }
            var inp = globalThis.document.getElementsByTagName('input');
            for (var i = 0; i < inp.length; i++) if (inp[i].type === 'submit' || inp[i].type === 'button') { var c2 = centreOf(inp[i]); if (c2) return { el: inp[i], c: c2 }; }
        } catch (e) {}
        return null;
    }

    function randomText(seed) {
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        var st = (seed >>> 0) | 1, out = '';
        var n = 4 + ((seed >>> 13) % 3);
        for (var i = 0; i < n; i++) { st = (Math.imul(st, 1664525) + 1013904223) >>> 0; out += letters[(st >>> 8) % 26]; }
        return out;
    }

    // JSON-safe timeline: [[kind, detail, atMs], ...]
    function build(opts) {
        opts = opts || {};
        var screen = [opts.screenX || 180, opts.screenY || 88];
        var seq = [];
        function push(kind, detail, at) { seq.push([kind, detail || {}, at]); }

        push('readystatechange', { target: 'document' }, 0);
        push('DOMContentLoaded', { target: 'document' }, 1);
        try { if (globalThis.document) globalThis.document.readyState = 'complete'; } catch (e) {}
        push('load', { target: 'window' }, 2);
        push('focus', { target: 'window' }, 3);
        push('focusin', { target: 'window' }, 4);

        var field = findInput();
        var submit = findSubmit();
        var tgt = (field && field.c) || { x: 260, y: 138 };
        var sub = (submit && submit.c) || { x: 550, y: 138 };

        var seed = opts.seed || (Date.now() & 0x7fffffff);
        var s = new Stream(seed, { x: 60, y: 220 }, DEFAULT_SHAPE);
        s.pause();
        s.moveTo(tgt);
        s.click();
        s.typeText(opts.text || randomText(seed));
        s.pause();
        s.moveTo(sub);
        s.click();
        s.scrollBy(0, 120, 5);
        s.tap({ x: 300, y: 420 });

        var evs = s.events, base = 10;
        for (var i = 0; i < evs.length; i++) {
            var list = expand(evs[i], screen);
            for (var j = 0; j < list.length; j++) push(list[j][0], list[j][1], base + evs[i].at);
        }
        var lastAt = base + (evs.length ? evs[evs.length - 1].at : 0);
        push('input', { target: 'input' }, lastAt + 20);
        push('change', { target: 'input' }, lastAt + 40);
        push('blur', { target: 'window' }, lastAt + 80);
        push('submit', { target: 'form' }, lastAt + 120);

        var devAt = lastAt + 160;
        for (var d = 0; d < 3; d++) {
            devAt += 140; push('deviceorientation', { alpha: 0, beta: 0, gamma: 0, absolute: false }, devAt);
            devAt += 70; push('devicemotion', { acceleration: { x: 0, y: 0, z: 0 }, accelerationIncludingGravity: { x: 0, y: 0, z: 9.8 }, rotationRate: { alpha: 0, beta: 0, gamma: 0 }, interval: 16 }, devAt);
        }
        return seq;
    }

    globalThis.__buildBehavior = build;
    globalThis.__playBehavior = function (opts) {
        var seq = build(opts), fired = 0;
        for (var i = 0; i < seq.length; i++) {
            try { if (typeof globalThis.__fire === 'function') { globalThis.__fire(seq[i][0], seq[i][1]); fired++; } } catch (e) {}
        }
        return { fired: fired, motions: seq.length };
    };
})();
