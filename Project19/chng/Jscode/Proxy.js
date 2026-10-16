function __safe(x) { try { return String(x); } catch (e) { return '[?]'; } }
function get_env(proxy_array, options) {
    options = options || {};
    var noShell = {};
    (options.noShell || []).forEach(function (k) { noShell[k] = 1; });
    function mkProxy(obj, path, cache) {
        if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) return obj;   // 对象+函数都包
        cache = cache || new Map();
        if (cache.has(obj)) return cache.get(obj);   // 防环: 返回已包装的 Proxy(拦截链不断!)
        var proxy = new Proxy(obj, {
            get: function (t, p, r) {
                var key = __safe(p);
                var v = t[p];
                console.log("方法:", "get  ", "对象:", '"' + path + '"', "  属性:", key, "  属性类型:", typeof key, "  属性值类型:", typeof v);
                if (noShell[key]) return v;               // 白名单: 原样返回
                var _d = Object.getOwnPropertyDescriptor(t, p);
                if (_d && _d.configurable === false) return v;   // Proxy不变量: 非可配置属性必须返回原始值(否则 TypeError)
                if (v === undefined) {
                    if (options.shell) return mkProxy({}, path + '.' + key + '[undef]', cache);  // 空壳(可选)
                    return v;                             // 默认: 语义保真
                }
                if (v !== null && (typeof v === 'object' || typeof v === 'function')) return mkProxy(v, path + '.' + key, cache);  // 递归包(含函数!)
                return v;
            },
            set: function (t, p, v, r) {
                var key = __safe(p);
                console.log("方法:", "set  ", "对象:", '"' + path + '"', "  属性:", key, "  属性类型:", typeof key, "  属性值类型:", typeof v);
                return Reflect.set(t, p, v, r);
            },
            apply: function (t, thisArg, args) {   // 函数调用转发(不打日志, 避免刷屏)
                return Reflect.apply(t, thisArg, args);
            },
            construct: function (t, args, newTarget) {  // new 调用转发
                return Reflect.construct(t, args, newTarget);
            }
        });
        cache.set(obj, proxy);
        return proxy;
    }
    for (var i = 0; i < proxy_array.length; i++) {
        var name = proxy_array[i];
        try {
            var obj = globalThis[name];
            if (obj === undefined) throw new Error('undefined');
            globalThis[name] = mkProxy(obj, name);
        } catch (e) {
            globalThis[name] = mkProxy({}, name);
        }
    }
}