
const https = require('https');
require("./tools.js")
const {Watch} =  require("./Watch.js")
function getEnv(proxy_array) {
    for (let i = 0; i < proxy_array.length; i++) {
        handler = `{
            get: function(target, property, receiver) {
                   console.log('方法：get','    对象：${proxy_array[i]}','    属性：',property,'    属性类型：',typeof property,'    属性值类型：',typeof target[property]);
                   return target[property];
            },
            set: function(target, property, value, receiver){
                    console.log('方法：set','    对象：${proxy_array[i]}','    属性：',property,'    属性类型：',typeof property,'    属性值类型：',typeof target[property]);
                    return Reflect.set(...arguments);
            }
        }`;
        eval(`
            try {
                ${proxy_array[i]};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]}, ${handler});
            } catch (e) {
                ${proxy_array[i]} = {};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]}, ${handler});
            }
        `);
    }
}
function get_enviroment(proxy_array, options = {}) {
    // ================= 内部状态（每次调用独立） =================
    const nativeFnToString = Function.prototype.toString;
    const proxyToRaw = new WeakMap();      // 代理 → 原对象（toString 反查 + thisArg 还原）
    let toStringPatched = false;

    // ================= Watch 融合①：原型链检测 =================
    // 属性不在 target 自有属性上 → 沿原型链向上找（跳过 Object.prototype）
    const checkPrototypeChain = (target, property, name) => {
        let current = Object.getPrototypeOf(target);
        while (current && current !== Object.prototype) {
            if (Object.prototype.hasOwnProperty.call(current, property)) {
                console.log(`原型链检测:true (对象: ${name}, 属性: ${String(property)})`);
                return true;
            }
            current = Object.getPrototypeOf(current);
        }
        return false;
    };

    // ================= Watch 融合②：描述符特殊检测 =================
    const checkDescriptor = (target, property, name) => {
        const descriptor = Object.getOwnPropertyDescriptor(target, property);
        if (descriptor) {
            if (descriptor.get || descriptor.set) {
                console.log(`特殊检测: 存在Getter/Setter (对象: ${name}, 属性: ${String(property)})`);
            }
            if (!descriptor.writable && !descriptor.get) {
                console.log(`特殊检测: 只读属性 (对象: ${name}, 属性: ${String(property)})`);
            }
            if (!descriptor.configurable) {
                console.log(`特殊检测: 不可配置属性 (对象: ${name}, 属性: ${String(property)})`);
            }
        }
    };

    // ================= 反检测：Function.prototype.toString =================
    function patchToString() {
        if (toStringPatched) return;
        toStringPatched = true;
        Function.prototype.toString = function (...args) {
            const raw = proxyToRaw.get(this);
            if (raw) return nativeFnToString.call(raw);      // 是代理 → 返回原函数源码
            return nativeFnToString.apply(this, args);       // 普通函数 → 原生逻辑
        };
    }

    // ================= 参数格式化（日志用，避免触发 trap 刷屏） =================
    function formatArg(a) {
        if (typeof a === 'string') return '"' + a + '"';
        if (typeof a === 'number' || typeof a === 'boolean') return String(a);
        if (a === null) return 'null';
        if (a === undefined) return 'undefined';
        // 拿真对象再读属性（proxyToRaw 反查），避免 formatArg 自己触发 trap 造成噪音
        const raw = proxyToRaw.get(a) || a;
        if (typeof a === 'function') {
            return '[function ' + (raw.name || 'anonymous') + ']';
        }
        if (typeof a === 'object') {
            try {
                if (Array.isArray(raw)) return '[Array(' + raw.length + ')]';
                const name = raw.constructor && raw.constructor.name ? raw.constructor.name : 'Object';
                if (name === 'Object') return '{...}';
                return '[' + name + ']';
            } catch (e) { return '[object]'; }
        }
        return String(a);
    }

    // ================= 递归包装器 =================
    function createEnvProxy(rootName, rootObj, options) {
        if (options.wrapFunction === true) patchToString();   // 开启函数链时同时启用反检测
        const cache = new WeakMap();                          // 对象 → Proxy（identity + 防循环）
        const depthLimit = options.depthLimit || 10;
        const wrapFunction = options.wrapFunction === true;   // 默认不包函数

        function wrap(target, name, depth) {
            if (target === null) return target;
            // Promise 不包装：原生 then/catch/finally 要求 this 是真实 Promise
            if (target instanceof Promise) return target;
            // 函数：默认不包（可配置 wrapFunction）——必须先于 object 判断
            if (typeof target === 'function') {
                return wrapFunction ? doWrapFunction(target, name, depth) : target;
            }
            // 原始值不包
            if (typeof target !== 'object') return target;
            return doWrap(target, name, depth);
        }

        /* 函数包装：默认关闭（wrapFunction: true 开启）。
         * 作用：让 document.createElement('canvas').classList.value 这种
         *      函数调用链也能被 hook —— apply trap 包装返回值。
         * 注意：包函数有检测风险（Function.prototype.toString 会暴露 Proxy），
         *      仅测试/观察阶段使用。 */
        function doWrapFunction(target, name, depth) {
            if (cache.has(target)) return cache.get(target);
            if (depth > depthLimit) return target;

            const proxy = new Proxy(target, {
                get(t, p, r) {
                    // 构造器恒等保护：prototype 属性返回真值（不包装）——
                    // 保证 Object.getPrototypeOf(x) === Ctor.prototype 恒等成立
                    if (p === 'prototype') {
                        return Reflect.get(t, p, r);
                    }
                    // Watch 融合：函数属性也可能在原型链上
                    if (!Object.prototype.hasOwnProperty.call(t, p)) {
                        checkPrototypeChain(t, p, name);
                    }
                    let rawVal;
                    try { rawVal = t[p]; } catch (e) { rawVal = undefined; }
                    console.log('方法：get', '    对象：' + name, '    属性：', p,
                        '    属性类型：', typeof p, '    属性值类型：', typeof rawVal);
                    // 递归包装：对象值 + 函数值（wrapFunction 时）都包 → 链式可继续追踪
                    let val = Reflect.get(t, p, r);
                    if (val && typeof val === 'object') {
                        val = wrap(val, name + '.' + String(p), depth + 1);
                    } else if (typeof val === 'function' && wrapFunction) {
                        val = wrap(val, name + '.' + String(p), depth + 1);
                    }
                    return val;
                },
                set(t, p, v, r) {
                    let rawVal;
                    try { rawVal = t[p]; } catch (e) { rawVal = undefined; }
                    console.log('方法：set', '    对象：' + name, '    属性：', p,
                        '    属性类型：', typeof p, '    属性值类型：', typeof rawVal);
                    return Reflect.set(t, p, v, t);
                },
                apply(t, thisArg, args) {
                    let argStr = '';
                    for (let i = 0; i < args.length; i++) argStr += '    参数值' + (i + 1) + '：' + formatArg(args[i]);
                    console.log('方法：apply', '    对象：' + name, '    参数个数：', args.length, argStr);
                    // thisArg 若是我们的代理 → 还原为原 target：
                    const rawThis = proxyToRaw.get(thisArg);
                    const r = Reflect.apply(t, rawThis || thisArg, args);
                    if (r !== null && (typeof r === 'object' || (typeof r === 'function' && wrapFunction))) {
                        return wrap(r, name + '()', depth + 1);
                    }
                    return r;
                },
                construct(t, args, newTarget) {
                    let argStr = '';
                    for (let i = 0; i < args.length; i++) argStr += '    参数值' + (i + 1) + '：' + formatArg(args[i]);
                    console.log('方法：construct', '    对象：' + name, '    参数个数：', args.length, argStr);
                    const r = Reflect.construct(t, args, newTarget);
                    if (r !== null && (typeof r === 'object' || (typeof r === 'function' && wrapFunction))) {
                        return wrap(r, 'new ' + name, depth + 1);
                    }
                    return r;
                }
            });

            cache.set(target, proxy);
            proxyToRaw.set(proxy, target);   // 供 Function.prototype.toString 反查
            return proxy;
        }

        /* 对象包装：get_enviroment 递归包装 + Watch 全部检测融合 */
        function doWrap(target, name, depth) {
            // identity：同一个对象只包一次（同时天然防循环引用）
            if (cache.has(target)) return cache.get(target);
            // 深度保护
            if (depth > depthLimit) return target;

            const proxy = new Proxy(target, {
                /* ---- get：get_enviroment 日志 + Watch 原型链检测 + 描述符特殊检测 ---- */
                get(t, p, r) {
                    // ① Watch：属性不在自有属性上 → 原型链检测
                    if (!Object.prototype.hasOwnProperty.call(t, p)) {
                        checkPrototypeChain(t, p, name);
                    }
                    // ② Watch：描述符特殊检测（Getter/Setter、只读、不可配置）
                    checkDescriptor(t, p, name);
                    // ③ get_enviroment：日志（原样不变）
                    let rawVal;
                    try { rawVal = t[p]; } catch (e) { rawVal = undefined; }
                    console.log('方法：get', '    对象：' + name, '    属性：', p,
                        '    属性类型：', typeof p, '    属性值类型：', typeof rawVal);
                    // ④ get_enviroment：递归包装返回值
                    let val = Reflect.get(t, p, r);
                    if (val && typeof val === 'object') {
                        val = wrap(val, name + '.' + String(p), depth + 1);
                    } else if (typeof val === 'function' && wrapFunction) {
                        val = wrap(val, name + '.' + String(p), depth + 1);
                    }
                    return val;
                },
                /* ---- set：get_enviroment 原样 ---- */
                set(t, p, v, r) {
                    let rawVal;
                    try { rawVal = t[p]; } catch (e) { rawVal = undefined; }
                    console.log('方法：set', '    对象：' + name, '    属性：', p,
                        '    属性类型：', typeof p, '    属性值类型：', typeof rawVal);
                    return Reflect.set(t, p, v, t);
                },
                /* ---- Watch：in 操作符 ---- */
                has(t, p) {
                    console.log(`对象 => ${name}, in 操作符检测属性: ${String(p)}`);
                    return Reflect.has(t, p);
                },
                /* ---- Watch：delete 操作符 ---- */
                deleteProperty(t, p) {
                    console.log(`对象 => ${name}, 删除属性: ${String(p)}`);
                    return Reflect.deleteProperty(t, p);
                },
                /* ---- Watch：Object.keys / values / entries / for...in 等 ----
                 * 都触发 ownKeys trap，但来源可区分（栈帧第 2 帧）：
                 *   Object.keys          → at Function.keys
                 *   Object.getOwnPropertyNames → at Function.getOwnPropertyNames
                 *   JSON.stringify       → at JSON.stringify
                 *   for...in             → 无中间函数帧（直接用户代码帧） */
                ownKeys(t) {
                    const caller = (new Error().stack || '').split('\n')[2] || '';
                    let kind = 'for...in/其他';
                    if (caller.includes('Function.keys')) kind = 'Object.keys';
                    else if (caller.includes('Function.getOwnPropertyNames')) kind = 'Object.getOwnPropertyNames';
                    else if (caller.includes('JSON.stringify')) kind = 'JSON.stringify';
                    else if (caller.includes('Function.values')) kind = 'Object.values';
                    else if (caller.includes('Function.entries')) kind = 'Object.entries';
                    console.log(`对象 => ${name}, 获取自身所有键 ← ${kind}`);
                    return Reflect.ownKeys(t);
                },
                /* ---- Watch：Object.defineProperty ---- */
                defineProperty(t, p, descriptor) {
                    console.log(`对象 => ${name}, 定义属性: ${String(p)}`);
                    return Reflect.defineProperty(t, p, descriptor);
                },
                /* ---- Watch：Object.setPrototypeOf ---- */
                setPrototypeOf(t, prototype) {
                    console.log(`特殊检测: setPrototypeOf 被调用 (对象: ${name})`);
                    return Reflect.setPrototypeOf(t, prototype);
                },
                /* ---- Watch：Object.getPrototypeOf / instanceof ----
                 * 两者都触发 getPrototypeOf trap，但调用来源可区分：
                 *   Object.getPrototypeOf(x) → 栈帧 at Function.getPrototypeOf
                 *   x instanceof Ctor         → 栈帧 at Function.[Symbol.hasInstance]
                 * 即使构造器没被 hook，instanceof 也必经默认 hasInstance 函数 */
                getPrototypeOf(t) {
                    const caller = (new Error().stack || '').split('\n')[2] || '';
                    let kind = 'for...in/其他';
                    if (caller.includes('[Symbol.hasInstance]')) kind = 'instanceof';
                    else if (caller.includes('Function.getPrototypeOf')) kind = 'Object.getPrototypeOf';
                    console.log(`特殊检测: getPrototypeOf 被调用 (对象: ${name}) ← ${kind}`);
                    return Reflect.getPrototypeOf(t);
                },
                /* ---- Watch：Object.getOwnPropertyDescriptor ---- */
                getOwnPropertyDescriptor(t, p) {
                    console.log(`特殊检测: getOwnPropertyDescriptor 被调用 (对象: ${name}, 属性: ${String(p)})`);
                    return Reflect.getOwnPropertyDescriptor(t, p);
                }
            });

            cache.set(target, proxy);
            proxyToRaw.set(proxy, target);   // 对象代理也注册：供 apply trap 还原 this
            return proxy;
        }

        return wrap(rootObj, rootName, 0);
    }

    // ================= 自检（hook 后抽查属性 + identity 检查） =================
    function selfCheck(name, proxy, options) {
        const maxProps = options.selfCheckCount || 4;
        // 收集属性用【真对象】操作（proxyToRaw 反向查），避免触发 ownKeys/
        // getOwnPropertyDescriptor/getPrototypeOf trap 造成误报日志
        const target = proxyToRaw.get(proxy) || proxy;
        const keys = new Set();
        const hardcoded = (options.selfCheckProps || {})[name];
        if (hardcoded) for (const k of hardcoded) keys.add(k);
        try { for (const k of Object.getOwnPropertyNames(target)) keys.add(k); } catch (e) {}
        // 原型链：手动遍历真对象的原型链
        try {
            let cur = Object.getPrototypeOf(target);
            while (cur && cur !== Object.prototype) {
                for (const k of Object.getOwnPropertyNames(cur)) keys.add(k);
                cur = Object.getPrototypeOf(cur);
            }
        } catch (e) {}

        const list = [...keys].slice(0, maxProps);
        if (list.length === 0) {
            console.log(`[selfCheck] ${name} 没有任何属性可自检`);
            return;
        }
        for (const p of list) {
            let v1, v2;
            try {
                v1 = proxy[p];                       // 第 1 次读（用 proxy → 保留 get trap 日志）
                // 对象值 → 深入一层（同样对真对象枚举，避免误报）
                if (v1 && typeof v1 === 'object') {
                    const raw = proxyToRaw.get(v1) || v1;
                    const sub = [];
                    try { for (const sk of Object.getOwnPropertyNames(raw)) sub.push(sk); } catch (e) {}
                    for (const sk of sub.slice(0, 2)) {
                        try { void v1[sk]; } catch (e) {}
                    }
                }
                v2 = proxy[p];                       // 第 2 次读 → identity 检查
                console.log(`identity: ${name}.${p} === ${name}.${p} → ${v1 === v2}`);
            } catch (e) {
                console.log(`自检 ${name}.${p} 失败: ${e.message.slice(0, 60)}`);
            }
        }
    }

    // ================= 主逻辑 =================
    for (const name of proxy_array) {
        // 点号路径/不存在的全局变量：静默跳过（
        // 点号路径已由递归包装自动覆盖；不存在是声明残留/拼写错误）
        if (name.includes('.')) continue;
        const root = globalThis[name];
        if (root === undefined) continue;
        globalThis[name] = createEnvProxy(name, root, options);
        selfCheck(name, globalThis[name], options);
    }
}


const nativeFnToString = Function.prototype.toString;
const proxyToRaw = new WeakMap();
let toStringPatched = false;
function patchToString() {
    if (toStringPatched) return;
    toStringPatched = true;
    Function.prototype.toString = function (...args) {
        const raw = proxyToRaw.get(this);
        if (raw) return nativeFnToString.call(raw);      // 是代理 → 返回原函数源码
        return nativeFnToString.apply(this, args);       // 普通函数 → 原生逻辑
    };
}
function formatArg(a) {
    if (typeof a === 'string') return '"' + a + '"';
    if (typeof a === 'number' || typeof a === 'boolean') return String(a);
    if (a === null) return 'null';
    if (a === undefined) return 'undefined';
    if (typeof a === 'function') return '[function ' + (a.name || 'anonymous') + ']';
    if (typeof a === 'object') {
        try {
            if (Array.isArray(a)) return '[Array(' + a.length + ')]';
            const name = a.constructor && a.constructor.name ? a.constructor.name : 'Object';
            if (name === 'Object') return '{...}';
            return '[' + name + ']';
        } catch (e) { return '[object]'; }
    }
    return String(a);
}
function createEnvProxy(rootName, rootObj, options = {}) {
    if (options.wrapFunction === true) patchToString();   // 开启函数链时同时启用反检测
    const cache = new WeakMap();                    // 对象 → Proxy（identity + 防循环）
    const depthLimit = options.depthLimit || 10;
    const wrapFunction = options.wrapFunction === true;   // 默认不包函数

    function wrap(target, name, depth) {
        if (target === null) return target;
        // Promise 不包装：原生 then/catch/finally 要求 this 是真实 Promise，
        // 且 bdms 环境大量使用 Promise——包装会 TypeError + 递归崩溃
        if (target instanceof Promise) return target;
        // 函数：默认不包（可配置 wrapFunction）——必须先于 object 判断
        if (typeof target === 'function') {
            return wrapFunction ? doWrapFunction(target, name, depth) : target;
        }
        // 原始值（数字/字符串/boolean/undefined/symbol）不包
        if (typeof target !== 'object') return target;
        return doWrap(target, name, depth);
    }

    /* 函数包装：默认关闭（wrapFunction: true 开启）。
     * 作用：让 document.createElement('canvas').classList.value 这种
     *      函数调用链也能被 hook —— apply trap 包装返回值。
     * 注意：包函数有检测风险（Function.prototype.toString 会暴露 Proxy），
     *      仅测试/观察阶段使用。 */
    function doWrapFunction(target, name, depth) {
        if (cache.has(target)) return cache.get(target);
        if (depth > depthLimit) return target;

        const proxy = new Proxy(target, {
            get(t, p, r) {
                let rawVal;
                try { rawVal = t[p]; } catch (e) { rawVal = undefined; }
                console.log('方法：get', '    对象：' + name, '    属性：', p,
                    '    属性类型：', typeof p, '    属性值类型：', typeof rawVal);
                // 递归包装：对象值 + 函数值（wrapFunction 时）都包 → 链式可继续追踪
                let val = Reflect.get(t, p, r);
                if (val && typeof val === 'object') {
                    val = wrap(val, name + '.' + String(p), depth + 1);
                } else if (typeof val === 'function' && wrapFunction) {
                    val = wrap(val, name + '.' + String(p), depth + 1);
                }
                return val;
            },
            set(t, p, v, r) {
                let rawVal;
                try { rawVal = t[p]; } catch (e) { rawVal = undefined; }
                console.log('方法：set', '    对象：' + name, '    属性：', p,
                    '    属性类型：', typeof p, '    属性值类型：', typeof rawVal);
                return Reflect.set(t, p, v, r);
            },
            apply(t, thisArg, args) {
                let argStr = '';
                for (let i = 0; i < args.length; i++) argStr += '    参数值' + (i + 1) + '：' + formatArg(args[i]);
                console.log('方法：apply', '    对象：' + name, '    参数个数：', args.length, argStr);
                // thisArg 若是我们的代理 → 还原为原 target：
                // 内置方法（Promise.then / Array.push / Map.set…）要求真实 this，
                // 用代理 this 会抛 "incompatible receiver"
                const rawThis = proxyToRaw.get(thisArg);
                const r = Reflect.apply(t, rawThis || thisArg, args);
                // 返回值：对象 / 函数（wrapFunction 时）→ 递归包装 → 链式继续可查
                if (r !== null && (typeof r === 'object' || (typeof r === 'function' && wrapFunction))) {
                    return wrap(r, name + '()', depth + 1);
                }
                return r;
            },
            construct(t, args, newTarget) {
                let argStr = '';
                for (let i = 0; i < args.length; i++) argStr += '    参数值' + (i + 1) + '：' + formatArg(args[i]);
                console.log('方法：construct', '    对象：' + name, '    参数个数：', args.length, argStr);
                const r = Reflect.construct(t, args, newTarget);
                if (r !== null && (typeof r === 'object' || (typeof r === 'function' && wrapFunction))) {
                    return wrap(r, 'new ' + name, depth + 1);
                }
                return r;
            }
        });

        cache.set(target, proxy);
        proxyToRaw.set(proxy, target);   // 供 Function.prototype.toString 反查
        return proxy;
    }

    function doWrap(target, name, depth) {
        // identity：同一个对象只包一次（同时天然防循环引用）
        if (cache.has(target)) return cache.get(target);
        // 深度保护
        if (depth > depthLimit) return target;

        const proxy = new Proxy(target, {
            get(t, p, r) {
                // 读原值做日志（getter 可能抛错，不能让它搞崩 hook）
                let rawVal;
                try { rawVal = t[p]; } catch (e) { rawVal = undefined; }
                console.log('方法：get', '    对象：' + name, '    属性：', p,
                    '    属性类型：', typeof p, '    属性值类型：', typeof rawVal);
                // 返回值：对象 → 递归包装
                let val = Reflect.get(t, p, r);
                if (val && typeof val === 'object') {
                    val = wrap(val, name + '.' + String(p), depth + 1);
                } else if (typeof val === 'function' && wrapFunction) {
                    val = wrap(val, name + '.' + String(p), depth + 1);
                }
                return val;
            },
            set(t, p, v, r) {
                let rawVal;
                try { rawVal = t[p]; } catch (e) { rawVal = undefined; }
                console.log('方法：set', '    对象：' + name, '    属性：', p,
                    '    属性类型：', typeof p, '    属性值类型：', typeof rawVal);
                return Reflect.set(t, p, v, r);
            }
        });

        cache.set(target, proxy);
        proxyToRaw.set(proxy, target);   // 对象代理也注册：供 apply trap 还原 this
        return proxy;
    }

    return wrap(rootObj, rootName, 0);
}
function selfCheck(name, proxy, options) {
    const maxProps = options.selfCheckCount || 4;
    // 收集属性：硬编码重点 + 动态发现（own + 原型链）
    const keys = new Set();
    const hardcoded = (options.selfCheckProps || {})[name];
    if (hardcoded) for (const k of hardcoded) keys.add(k);
    try { for (const k of Object.getOwnPropertyNames(proxy)) keys.add(k); } catch (e) {}
    try { for (const k in proxy) keys.add(k); } catch (e) {}

    const list = [...keys].slice(0, maxProps);
    if (list.length === 0) {
        console.log(`[selfCheck] ${name} 没有任何属性可自检`);
        return;
    }
    console.log(`\n===== 自检 ${name}（发现 ${keys.size} 个属性，抽查前 ${list.length} 个） =====`);
    for (const p of list) {
        let v1, v2;
        try {
            v1 = proxy[p];                       // 第 1 次读 → 触发 get trap
            // 对象值 → 深入一层（子对象动态发现前 2 个属性，展示递归包装）
            if (v1 && typeof v1 === 'object') {
                const sub = [];
                try { for (const sk of Object.getOwnPropertyNames(v1)) sub.push(sk); } catch (e) {}
                for (const sk of sub.slice(0, 2)) {
                    try { void v1[sk]; } catch (e) {}
                }
            }
            v2 = proxy[p];                       // 第 2 次读 → identity 检查
            console.log(`identity: ${name}.${p} === ${name}.${p} → ${v1 === v2}`);
        } catch (e) {
            console.log(`自检 ${name}.${p} 失败: ${e.message.slice(0, 60)}`);
        }
    }
}
function getEnv2(proxy_array, options = {}) {
    console.log('===== 开始 hook =====');
    for (const name of proxy_array) {
        if (name.includes('.')) {
            console.log(`[getEnv2] "${name}" 是点号路径——递归包装已自动覆盖可达对象，无需显式声明，跳过`);
            continue;
        }
        const root = globalThis[name];
        if (root === undefined) {
            console.log(`[getEnv2] 全局变量 ${name} 不存在，跳过`);
            continue;
        }
        globalThis[name] = createEnvProxy(name, root, options);
        console.log(`[getEnv2] 已 hook 全局: ${name}`);
        selfCheck(name, globalThis[name], options);
    }
    console.log('\n===== hook 完成 =====');
}


let _rafId = 0;
const _rafMap = new Map();
EventTarget = function(s){
    console.log("EventTarget",s)
}
EventTarget.prototype.addEventListener = function(s,t){
    console.log("addEventListener: ",s,t)
}   ////////
EventTarget.prototype.dispatchEvent = function(s){
    console.log("dispatchEvent: ",s)
}
EventTarget.prototype.removeEventListener = function(s){
    console.log("removeEventListener: ",s)
}
EventTarget.prototype.when = function(s){
    console.log("when: ",s)
}   /////////
// EventTarget = Watch(EventTarget,"EventTarget")
Node = function(s){
    console.log("Node",s)
}
// Node = Watch(Node,"Node")
Object.setPrototypeOf(Node.prototype, EventTarget.prototype);
HTMLAllCollection = function(s){
    console.log("HTMLAllCollection",s)
}
// HTMLAllCollection = Watch(HTMLAllCollection,"HTMLAllCollection")
HTMLSpanElement = function(s){
    console.log("HTMLSpanElement: ",s)
}
// HTMLSpanElement = Watch(HTMLSpanElement,"HTMLSpanElement")
DOMTokenList = function(s){
    console.log("DOMTokenList",s)
}
// DOMTokenList = Watch(DOMTokenList,"DOMTokenList")
requestAnimationFrame = function(callback){
    console.log("requestAnimationFrame: ",callback)
    const id = ++_rafId;
    const timer = setTimeout(function(){
        _rafMap.delete(id);
        callback(Date.now());       // 真浏览器传时间戳
    }, 16);
    _rafMap.set(id, timer);
    console.log("requestAnimationFrame res: ",id)
    return id;                      // ← 关键：返回数字
};
cancelAnimationFrame = function(id){
    const timer = _rafMap.get(id);
    if (timer !== undefined) {
        clearTimeout(timer);
        _rafMap.delete(id);
    }
};
function Storage(){
    // 不需要 _data，键直接存在实例上
}    //////
Storage.prototype.getItem = function(k){
    const v = Object.prototype.hasOwnProperty.call(this, k) ? this[k] : null;
    console.log('[localStorage.getItem]', JSON.stringify(k), '→', v === null ? '(null)' : String(v).slice(0, 25));
    return v;
};
Storage.prototype.setItem = function(k, v){
    console.log('[localStorage.setItem]', JSON.stringify(k), '=', String(v).slice(0, 25));
    this[k] = String(v);
};
Storage.prototype.removeItem = function(k){
    delete this[k];
};
Storage.prototype.clear = function(){
    for (const k of Object.keys(this)) delete this[k];
};
Storage.prototype.key = function(i){
    return Object.keys(this)[i] ?? null;
};
Object.defineProperty(Storage.prototype, 'length', {
    get: function(){ return Object.keys(this).length; }
});
// Storage = Watch(Storage,"Storage")    ///////
XMLHttpRequestEventTarget = function(s){
    console.log("XMLHttpRequestEventTarget: ",s)
}
// XMLHttpRequestEventTarget = Watch(XMLHttpRequestEventTarget,"XMLHttpRequestEventTarget")
Object.setPrototypeOf(XMLHttpRequestEventTarget.prototype, EventTarget.prototype);
XMLHttpRequest = function(s,t){
    console.log("XMLHttpRequest: ",s , t)
    this.readyState = 0;
    this.status = 0;
    this.responseText = '';
    this.response = null;
    this.onreadystatechange = this.onload = this.onerror = null;
    this._headers = {};
};   ////////////
XMLHttpRequest.prototype.open = function(method, url, async){
    console.log('[XHR open]', method, url);          // ← 看它请求哪个接口
    this._method = method; this._url = url;
    this.readyState = 1;
};
XMLHttpRequest.prototype.setRequestHeader = function(k, v){
    console.log('[XHR header]', k, v);
    this._headers[k] = v;
};
XMLHttpRequest.prototype.send = function(body){
    const that = this;
    console.log('[XHR send]', this._method, this._url);
    let u;
    try { u = new URL(this._url); } catch(e) { console.log('[XHR URL解析失败]', this._url); return; }
    const payload = typeof body === 'string' ? body : JSON.stringify(body);
    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
    };
    try { headers['Cookie'] = document.cookie; } catch(e) {}   // 带上 cookie（tt_webid 等）
    const req = https.request({
        hostname: u.hostname,
        port: 443,
        path: u.pathname + u.search,
        method: this._method,
        headers: headers
    }, res => {
        let data = '';
        const respHeaders = res.headers;                 // ← 捕获响应头！
        res.on('data', c => data += c);
        res.on('end', () => {
            that.status = res.statusCode;
            that.responseText = data;
            that.response = data;
            that.readyState = 4;
            that._respHeaders = respHeaders;
            console.log('[XHR 响应]', res.statusCode, String(data).slice(0, 120));
            console.log('[XHR X-Ms-Token]', respHeaders['x-ms-token'] || '(无)');
            // 把 Set-Cookie 的 msToken 写进 document.cookie（SDK 可能回头读 cookie）
            try {
                const sc = respHeaders['set-cookie'];
                if (sc) {
                    const m = (Array.isArray(sc) ? sc.join('; ') : String(sc)).match(/msToken=([^;]+)/);
                    if (m) { document.cookie = 'msToken=' + m[1] + '; path=/'; console.log('[已写入cookie msToken]', m[1].slice(0, 20) + '...'); window.localStorage.setItem('xmst', m[1]); console.log('[已更新localStorage.xmst]', m[1].slice(0, 20) + '...'); }
                }
            } catch(e) {}
            if (that.onreadystatechange) that.onreadystatechange();
            if (that.onload) that.onload();
        });
    });
    req.on('error', e => {
        console.log('[XHR 网络错误]', e.message);
        that.readyState = 4;
        if (that.onerror) that.onerror();
    });
    req.write(payload);
    req.end();
};
XMLHttpRequest.prototype.getAllResponseHeaders = function(){ return ''; };
XMLHttpRequest.prototype.getResponseHeader = function(k){
    const key = String(k).toLowerCase();
    const v = this._respHeaders ? this._respHeaders[key] : undefined;
    console.log('[XHR getResponseHeader]', String(k), '→', v === undefined ? '(无)' : String(v).slice(0, 30));
    if (!this._respHeaders) return null;
    return Array.isArray(v) ? v.join('; ') : (v ?? null);
};
XMLHttpRequest.prototype.getAllResponseHeaders = function(){
    if (!this._respHeaders) return '';
    return Object.entries(this._respHeaders)
        .map(([k, v]) => k + ': ' + (Array.isArray(v) ? v.join('; ') : v))
        .join('\r\n');
};
XMLHttpRequest.prototype.abort = function(){ this.readyState = 0; };    ///////
// XMLHttpRequest = Watch(XMLHttpRequest,"XMLHttpRequest")
Object.setPrototypeOf(XMLHttpRequest.prototype, XMLHttpRequestEventTarget.prototype);
EventSource = function(s,t){
    console.log("EventSource: ",s,t)
}
EventSource.prototype.CLOSED = 2  /////////
EventSource.prototype.CONNECTING = 0
EventSource.prototype.OPEN = 1     ///////
Object.setPrototypeOf(EventSource.prototype, EventTarget.prototype);
// EventSource = Watch(EventSource,"EventSource")
StorageManager = function(s){
    console.log("StorageManager：",s)
}
// StorageManager = Watch(StorageManager,"StorageManager")
PluginArray = function(s){
    console.log("PluginArray: ",s)
}
// PluginArray = Watch(PluginArray,"PluginArray")

/* window */
Window = function(s){
    console.log("Window",s)
}
Object.setPrototypeOf(Window.prototype, EventTarget.prototype);
window = new Window();
window.a_bogus;
window.requestAnimationFrame = requestAnimationFrame;
window.cancelAnimationFrame = cancelAnimationFrame;
window.bdms;
window.Storage = new Storage()
window.localStorage = new Storage()

globalThis.localStorage = window.localStorage;       // 裸全局指向同一实例   /////////////////////
globalThis.sessionStorage = window.sessionStorage;
window.localStorage.setItem('xmst', '你的msToken');  // 替换成你捕获到的真实 msToken      //////////////////

window.sessionStorage = new Storage()    //////////////////
window._sdkGlueVersionMap = {
    "sdkGlueVersion": "1.0.0.66",
    "bdmsVersion": "1.0.1.20",
    "captchaVersion": "4.0.10"
}
window.__ac_referer = 'https://www.dongchedi.com/login-required?redirect=%2Fauto%2Flibrary%2Fx-1-x-x-x-x-x-x-x-x-x'
window.fetch = function(url, opts){
    console.log('[fetch 出口]', url);   // a_bogus 如果出现就在这里
    console.log("url: ",url)
    console.log("opts: ",opts)
    return Promise.resolve({
        status: 200,
        json:  () => Promise.resolve({}),
        text:  () => Promise.resolve(''),
        headers: { entries: () => [] }
    });
};
window.EventSource = EventSource
window.self = window
window.top = window
window.outerWidth = 1536
window.outerHeight = 816
window.innerWidth = 1536
window.innerHeight = 150
window.parent = window
window.screenX = 0;
window.screenY = 0;
window.pageYOffset = 0;
window.devicePixelRatio = 1.25;
window.OfflineAudioContext = function(numCh, len, rate) {
    this.numberOfChannels = numCh; this.length = len; this.sampleRate = rate || 44100;
    this.state = 'running'; this.destination = {}; this.currentTime = 0;
    this.startRendering = function(){ return Promise.resolve({
        length: 4410, numberOfChannels: 1, sampleRate: 44100,
        getChannelData: function(){ return new Float32Array(4410); }
    }); };
    this.createOscillator = function(){ return { connect(){}, start(){}, stop(){}, type: 'sine', frequency: { setValueAtTime(){} } }; };
    this.createDynamicsCompressor = function(){ return { connect(){}, threshold: { setValueAtTime(){} }, knee: {}, ratio: {}, attack: {}, release: {} }; };
    this.createGain = function(){ return { connect(){}, gain: { setValueAtTime(){} } }; };
};
window.AudioContext = window.OfflineAudioContext;
// window = Watch(window,"window")


span = new HTMLSpanElement();
span.classList = new DOMTokenList();

/* document */
Document = function(s){
    console.log("Document",s)
}
Document.prototype.all = new HTMLAllCollection()
Document.prototype.cookie = 'tt_webid=7673874621381559832; tt_web_version=new; is_dev=false; is_boe=false; gfkadpd=1839,45203; Hm_lvt_3e79ab9e4da287b5752d8048743b95e6=1786713182; HMACCOUNT=C7373170AA2F3BE1; x-web-secsdk-uid=96283fbb-3d4f-47c3-a78e-994b0e53ce0f; s_v_web_id=verify_mssywb6r_lAY3q5sD_kfFr_4wwb_BuUE_AeRDKRMK1qLw; _gid=GA1.2.1804363421.1786713183; city_name=%E5%8D%97%E5%85%85; passport_csrf_token=c4fe1c9839cac5d6d2f42710d150d5af; passport_csrf_token_default=c4fe1c9839cac5d6d2f42710d150d5af; user_data=%7B%22gender%22%3A0%2C%22name%22%3A%22%E7%81%BF%E7%83%82%E9%9D%92%E5%B1%B1NWBerLC%22%2C%22screen_name%22%3A%22%E7%81%BF%E7%83%82%E9%9D%92%E5%B1%B1NWBerLC%22%2C%22user_id%22%3A1043881024559036%2C%22avatar_url%22%3A%22https%3A%2F%2Fp3-passport.byteacctimg.com%2Fobj%2Fuser-avatar%2Fassets%2Fb5131d737557df4fa5ee79caba759ee5_300_300.jpeg%22%2C%22mobile%22%3A%22198******18%22%7D; Hm_lpvt_3e79ab9e4da287b5752d8048743b95e6=1786784680; _ga_YB3EWSDTGF=GS2.1.s1786783710$o6$g1$t1786784836$j60$l0$h0; _ga=GA1.1.4146942.1786713183'
;(function(){
    const store = {};
    const init = 'tt_webid=7673874621381559832; msToken=_xp3MoBEG9F4lgBp7MhCNPp2S79uuQAlydJvAG8-BbU5T1SPG21uZn_W-9XK66DJ8t4HbukOIGZPlDUohlnTZUHaR1PJzhIyILLy1wgUbj2Wq5h_jz8RQrkAIfcpVH4kuTEf4PpD_vI2VaUDq0af8MYZE9Qc2N6sXfyn-ckJUMnPoOLeoBPK8Q==; tt_web_version=new; is_dev=false; is_boe=false; gfkadpd=1839,45203; Hm_lvt_3e79ab9e4da287b5752d8048743b95e6=1786713182; HMACCOUNT=C7373170AA2F3BE1; x-web-secsdk-uid=96283fbb-3d4f-47c3-a78e-994b0e53ce0f; s_v_web_id=verify_mssywb6r_lAY3q5sD_kfFr_4wwb_BuUE_AeRDKRMK1qLw; _gid=GA1.2.1804363421.1786713183; city_name=%E5%8D%97%E5%85%85; passport_csrf_token=c4fe1c9839cac5d6d2f42710d150d5af; passport_csrf_token_default=c4fe1c9839cac5d6d2f42710d150d5af; user_data=%7B%22gender%22%3A0%2C%22name%22%3A%22%E7%81%BF%E7%83%82%E9%9D%92%E5%B1%B1NWBerLC%22%2C%22screen_name%22%3A%22%E7%81%BF%E7%83%82%E9%9D%92%E5%B1%B1NWBerLC%22%2C%22user_id%22%3A1043881024559036%2C%22avatar_url%22%3A%22https%3A%2F%2Fp3-passport.byteacctimg.com%2Fobj%2Fuser-avatar%2Fassets%2Fb5131d737557df4fa5ee79caba759ee5_300_300.jpeg%22%2C%22mobile%22%3A%22198******18%22%7D; Hm_lpvt_3e79ab9e4da287b5752d8048743b95e6=1786784680; _ga_YB3EWSDTGF=GS2.1.s1786783710$o6$g1$t1786784836$j60$l0$h0; _ga=GA1.1.4146942.1786713183';
    init.split(';').forEach(p => {
        const i = p.indexOf('=');
        if (i > 0) store[p.slice(0, i).trim()] = p.slice(i + 1);
    });
    Object.defineProperty(Document.prototype, 'cookie', {
        get: function(){
            return Object.keys(store).map(k => k + '=' + store[k]).join('; ');
        },
        set: function(str){
            const parts = str.split(';').map(s => s.trim());
            const i = parts[0].indexOf('=');
            if (i <= 0) return;
            const k = parts[0].slice(0, i), v = parts[0].slice(i + 1);
            if (parts.some(p => /^expires=/i.test(p))) delete store[k];  // 过期删除
            else store[k] = v;
        },
        configurable: true
    });
})();     ///////////////////////
Document.prototype.characterSet = 'UTF-8';
Document.prototype.compatMode = 'CSS1Compat';
Document.prototype.images = [];    ///////////////////////
Object.setPrototypeOf(Document.prototype, Node.prototype);
HTMLDocument = function(s){
    console.log("HTMLDocument",s)
}
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype);
document = new HTMLDocument()
document.createElement = function(s){
    if (s === 'span') {
        // res = Watch(res, 'span');
        return span  // classList 第一次被读时自动包成 span.classList
    }
    if (s === 'canvas') {
        const c = _makeCanvas();
        // c = Watch(c, 'canvas');
        return c
    }
    return null;
};
document.documentElement = function(s){
    console.log("documentElement: ",s)
}
document.createEvent = function(s){
    console.log("createEvent: ",s)
}

/* ===== Canvas / WebGL / Audio 指纹 mock ===== */
function _make2DContext() {
    const ctx = {
        fillStyle: '#000000', strokeStyle: '#000000', font: '10px sans-serif',
        textBaseline: 'alphabetic', textAlign: 'start', lineWidth: 1, globalAlpha: 1,
        shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0,
        globalCompositeOperation: 'source-over',
        fillRect(){}, strokeRect(){}, clearRect(){}, fillText(){}, strokeText(){},
        measureText(t){ return { width: String(t).length * 7 }; },
        beginPath(){}, closePath(){}, moveTo(){}, lineTo(){}, arc(){}, rect(){}, ellipse(){},
        stroke(){}, fill(){}, clip(){}, save(){}, restore(){}, translate(){}, scale(){},
        rotate(){}, setTransform(){}, transform(){}, drawImage(){}, setLineDash(){}, getLineDash(){ return []; },
        createLinearGradient(){ return { addColorStop(){} }; },
        createRadialGradient(){ return { addColorStop(){} }; },
        createPattern(){ return {}; },
        getImageData(x, y, w, h){ return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }; },
        putImageData(){}, isPointInPath(){ return false; }
    };
    return ctx;
}
function _makeWebGLContext() {
    const gl = {};
    ['getParameter','getExtension','getContextAttributes','createBuffer','createTexture','createProgram','createShader','shaderSource','compileShader','attachShader','linkProgram','useProgram','bindBuffer','bufferData','getShaderParameter','getProgramParameter','getUniformLocation','uniform1f','uniform2f','uniform3f','uniform4f','uniform1i','vertexAttribPointer','enableVertexAttribArray','disableVertexAttribArray','drawArrays','drawElements','clearColor','clear','viewport','getError','getString','getSupportedExtensions','activeTexture','bindTexture','texImage2D','texParameteri','pixelStorei','deleteBuffer','deleteTexture','deleteProgram','deleteShader','flush','finish','readPixels'].forEach(m => {
        gl[m] = function(){
            if (m === 'getParameter' || m === 'getString') return 'WebKit WebGL';
            if (m === 'getError') return 0;
            if (m === 'getExtension') return null;
            if (m === 'getSupportedExtensions') return [];
            if (m === 'getContextAttributes') return {};
            if (m === 'createBuffer' || m === 'createTexture' || m === 'createProgram' || m === 'createShader') return {};
            if (m === 'getShaderParameter' || m === 'getProgramParameter') return true;
            if (m === 'getUniformLocation') return {};
            if (m === 'readPixels') return new Uint8Array(4);
            return undefined;
        };
    });
    return gl;
}
function _makeCanvas() {
    const c = {};
    c._w = 300; c._h = 150;
    Object.defineProperty(c, 'width',  { get(){ return this._w; }, set(v){ this._w = v; }, configurable: true });
    Object.defineProperty(c, 'height', { get(){ return this._h; }, set(v){ this._h = v; }, configurable: true });
    c.getContext = function(type) {
        if (type === '2d') return _make2DContext();
        if (type === 'webgl' || type === 'experimental-webgl' || type === 'webgl2') return _makeWebGLContext();
        return null;
    };
    c.toDataURL = function() {
        // 真实浏览器 300x150 PNG toDataURL = 2550 字符
        const head = 'iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XS';
        return 'data:image/png;base64,' + head + 'A'.repeat(2550 - 22 - head.length);
    };
    c.toBlob = function(cb){ try{ cb(new Blob([''], { type: 'image/png' })); }catch(e){} };
    return c;
}
Document.prototype.body = { children: [], innerText: '', tagName: 'BODY', appendChild(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return true; }, getBoundingClientRect(){ return { top: 0, left: 0, width: 1536, height: 816 }; } };
document.body.children = [];
document.title = 'SUV车型报价及图片_懂车帝';
document.referrer = 'https://www.dongchedi.com/login-required?redirect=%2Fauto%2Flibrary%2Fx-1-x-x-x-x-x-x-x-x-x'
// document = Watch(document,"document")



/* location  */
Location = function(s){
    console.log("Location",s)
}
location = new Location()
location.href = 'https://www.dongchedi.com/auto/library/x-1-x-x-x-x-x-x-x-x-x?is_new_connect=0&is_new_user=0'
// location = Watch(location,"location")

/* navigator */
Navigator = function(s){
    console.log("Navigator",s)
}
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
Navigator.prototype.platform = 'Win32'
Navigator.prototype.storage = new StorageManager()
Navigator.prototype.vendor = 'Google Inc.'
Navigator.prototype.cookieEnabled = true
Navigator.prototype.plugins = (function(){
    function pdfPlugin(name) {
        return {
            name: name,
            filename: 'internal-pdf-viewer',
            description: 'Portable Document Format',
            length: 2,
            0: { type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format' },
            1: { type: 'text/pdf', suffixes: 'pdf', description: 'Portable Document Format' }
        };
    }
    return [
        pdfPlugin('PDF Viewer'),
        pdfPlugin('Chrome PDF Viewer'),
        pdfPlugin('Chromium PDF Viewer'),
        pdfPlugin('Microsoft Edge PDF Viewer'),
        pdfPlugin('WebKit built-in PDF')
    ];
})();
Navigator.prototype.mimeTypes = [
    { type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format' },
    { type: 'text/pdf', suffixes: 'pdf', description: 'Portable Document Format' }
];
Navigator.prototype.userAgentData = {
    brands: [
        { brand: 'Not)A;Brand', version: '8' },
        { brand: 'Chromium', version: '138' },
        { brand: 'Google Chrome', version: '138' }
    ],
    mobile: false,
    platform: 'Windows',
    getHighEntropyValues: function(){ return Promise.resolve({}); }
};
Navigator.prototype.doNotTrack = null;
Navigator.prototype.onLine = true;
Navigator.prototype.pdfViewerEnabled = true;
Navigator.prototype.hardwareConcurrency = 16
Navigator.prototype.appCodeName = 'Mozilla';
Navigator.prototype.appName = 'Netscape';
Navigator.prototype.appVersion = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';
Navigator.prototype.language = 'zh-CN';
Navigator.prototype.languages = ['zh-CN', 'zh', 'en', 'en-US'];
Navigator.prototype.deviceMemory = 8;
Navigator.prototype.maxTouchPoints = 0;
Navigator.prototype.product = 'Gecko';
Navigator.prototype.productSub = '20030107';
Navigator.prototype.vendorSub = '';
Navigator.prototype.webdriver = false;
Navigator.prototype.vibrate = function(){ return true; };
Navigator.prototype.getBattery = function(){
    return Promise.resolve({ charging: true, chargingTime: 0, dischargingTime: Infinity, level: 1 });
};
Navigator.prototype.requestMediaKeySystemAccess = function(){
    return Promise.reject(new Error('not supported'));
};
Navigator.prototype.credentials = { get: function(){ return Promise.resolve(null); } };
/* storage 必须是 StorageManager 实例（不能是对象字面量），
 * 否则原型链上没有 StorageManager.prototype，setTag 不生效 */
StorageManager.prototype.estimate = function(){ return Promise.resolve({ quota: 42947051520, usage: 0 }); };
StorageManager.prototype.persist = function(){ return Promise.resolve(false); };
Navigator.prototype.storage = new StorageManager();
Navigator.prototype.bluetooth = {
    getAvailability: function(){ return Promise.resolve(false); },
    requestDevice:   function(){ return Promise.reject(new Error('not available')); }
};
navigator = new Navigator()
// navigator = Watch(navigator,"navigator")

/* history */
History = function(s){
    console.log("History",s)
}
history = new History()
// history = Watch(history,"history")

/* Screen */
Screen = function(s){
    console.log("Screen",s)
}
Screen.availHeight = 816
Screen.availLeft = 0
Screen.availTop = 0
Screen.availWidth = 1536
Screen.colorDepth = 24
Screen.height = 864
Screen.isExtended = false
Screen.onchange = null
Screen.orientation = {
    angle: 0,
    onchange: null,
    type: "landscape-primary"
}
Screen.pixelDepth = 24
Screen.width = 1536
Object.setPrototypeOf(Screen.prototype, EventTarget.prototype);
screen = new Screen()
/* 属性必须放实例上（SDK 用 Object.keys 枚举 own keys） */
screen.availHeight = 816
screen.availLeft = 0
screen.availTop = 0
screen.availWidth = 1536
screen.colorDepth = 24
screen.height = 864
screen.isExtended = false
screen.onchange = null
screen.orientation = {
    angle: 0,
    onchange: null,
    type: "landscape-primary"
}
screen.pixelDepth = 24
screen.width = 1536
window.screen = screen;
// screen = Watch(screen, "screen")


function setTag(proto, tag) {
    Object.defineProperty(proto, Symbol.toStringTag, {
        value: tag, writable: false, enumerable: false, configurable: true
    });
}
setTag(HTMLDocument.prototype, 'HTMLDocument');
setTag(Window.prototype, 'Window');
setTag(Navigator.prototype, 'Navigator');
setTag(Location.prototype, 'Location');
setTag(Screen.prototype, 'Screen');
setTag(History.prototype, 'History');
setTag(XMLHttpRequest.prototype, 'XMLHttpRequest');
setTag(HTMLAllCollection.prototype, 'HTMLAllCollection');
setTag(StorageManager.prototype,"StorageManager")

proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen',"all","HTMLCanvasElement", "HTMLSpanElement","Screen","HTMLAllCollection","EventTarget"
    ,"span","span.classList","Document.prototype.all","screen.availWidth","Screen.colorDepth","XXXXX"
]
proxy_array2 = ['window', 'document', 'location', 'navigator', 'history', 'screen']
// getEnv(proxy_array);
get_enviroment(proxy_array2)
// getEnv2(proxy_array2,{ wrapFunction: true })

/*
https://www.dongchedi.com/motor/pc/car/brand/select_series_v2?aid=1839&app_name=auto_web_pc&msToken=_uBWNj-HF9FL9T893V74-jjbbDnlxIIGMBn8DVtcJokcj20TRZW1bF3JZJBMVfgx0BeWXsy8WvxDeRjVQaXHrsQvguAACPjY6ZU7ADTog3QHJtl4_S3uSM1BWetLTowTySYuCCF6A8q8D6UefiOsK0S_5fIFx9EFMV-OrcH_DJ2GXgt3Yah0Vw%3D%3D&a_bogus=xj4jDztJYoQjCpAb8OVwH51lRW9%2FNP8y6XT%2FRPfpSNzhyh0YDfNX5EX2cPFrh6PQ5bB9oe37TE0ybxncZd1dRI9komZDSF0fRT2cIh0L%2FqwhTU4%2FLNRmeu8FKwse0OiNlACRilsR1s0N2VxR9NVDABZGy5z9QcjgSNpnp2S9GDS0psLTVx%2F5CcwWghg%3D

 */