

window = global
self = window

window.loader;
var loader;

const _st = global.setTimeout, _si = global.setInterval;
global.setTimeout = (fn, ms, ...a) => { const t = _st(fn, ms, ...a); t.unref && t.unref(); return t; };
global.setInterval = (fn, ms, ...a) => { const t = _si(fn, ms, ...a); t.unref && t.unref(); return t; };
global.getCurrentPages = () => [];
global.getApp = () => ({ globalData: {} });
global.requirePlugin = () => ({});
global.Component = (o) => o;
global.Behavior = (o) => o;
global.Page = (o) => o;
global.App = (o) => o;

const storage = {};
const DEVICE = { brand: 'microsoft', model: 'microsoft', system: 'Windows 11 x64', platform: 'windows' };
const WX_API_NAMES = ['getStorageSync','setStorageSync','removeStorageSync','clearStorageSync',
    'getStorage','setStorage','login','getSystemInfoSync','getSystemInfo','getDeviceInfo',
    'getWindowInfo','getAppBaseInfo','getNetworkType','onNetworkStatusChange','getAccountInfoSync',
    'request','uploadFile','showToast','showModal','showTabBar','hideTabBar','setNavigationBarTitle',
    'navigateTo','redirectTo','switchTab','navigateBack','reLaunch','canIUse','getUserInfo',
    'getSetting','openSetting','authorize','requestPayment','chooseImage','previewImage',
    'onAppShow','onAppHide','onError','setClipboardData','getClipboardData','makePhoneCall','scanCode',
    'getLocation','openLocation','getUpdateManager','getLaunchOptionsSync','getEnterOptionsSync',
    'setEnableDebug','setStorage','getBatteryInfoSync','getBatteryInfo','vibrateShort','vibrateLong',
    'onWindowResize','offWindowResize','onThemeChange','onUnhandledRejection','createSelectorQuery',
    'nextTick','getMenuButtonBoundingClientRect','getExtConfigSync','getExtConfig','getRealtimeLogManager'];
function callCb(o, cb, r){ if(o && typeof o === 'object' && typeof o[cb] === 'function') o[cb](r); return r; }
const realImpl = {
    getStorageSync: k => storage[k],
    setStorageSync: (k, v) => { storage[k] = v; },
    removeStorageSync: k => { delete storage[k]; },
    clearStorageSync: () => { for (const k in storage) delete storage[k]; },
    getStorage: o => callCb(o, 'success', { data: storage[o && o.key] }),
    setStorage: o => { storage[o && o.key] = o && o.data; callCb(o, 'success', {}); },
    login: o => callCb(o, 'success', { code: 'stub_login_code' }),
    getDeviceInfo: () => ({ ...DEVICE }),
    getSystemInfoSync: () => ({ ...DEVICE, SDKVersion: '3.5.6' }),
    getSystemInfo: o => callCb(o, 'success', { ...DEVICE }),
    getWindowInfo: () => ({ pixelRatio: 1, windowWidth: 1280, windowHeight: 720 }),
    getAppBaseInfo: () => ({ SDKVersion: '3.5.6', theme: 'light' }),
    getNetworkType: o => callCb(o, 'success', { networkType: 'wifi', isConnected: true }),
    onNetworkStatusChange: o => { if (typeof o === 'function') o({ isConnected: true, networkType: 'wifi' }); },
    getAccountInfoSync: () => ({ miniProgram: { appId: 'wx1b77d3569b2dd7fa', envVersion: 'release', version: '3.5.6' }
    }),
    showToast: o => callCb(o, 'success', {}), showModal: o => callCb(o, 'success', { confirm: true }),
    showTabBar: o => callCb(o, 'success', {}), hideTabBar: o => callCb(o, 'success', {}),
    request: o => callCb(o, 'success', { statusCode: 200, data: {}, header: {} }),
    cloud: { callFunction: o => callCb(o, 'success', { result: {} }) },
    uma: { setUnionid(){}, trackEvent(){}, setUserid(){}, track(){}, setPage(){}, setEvar(){}, identify(){} }
};
const target = {};
global.wx = new Proxy(target, {
    get(t, p) { if (typeof p === 'string' && p in realImpl) return realImpl[p]; if (typeof p === 'symbol') return
        t[p];
        return function(opts){ if (opts && typeof opts === 'object' && typeof opts.success === 'function')
            opts.success({}); }; },
    set(t, p, v) { t[p] = v; return true; },
    has(t, p) { return WX_API_NAMES.includes(p) || p in t; },
    ownKeys() { return Array.from(new Set(WX_API_NAMES)); },
    getOwnPropertyDescriptor(t, p) { if (WX_API_NAMES.includes(p)) return { enumerable: true, configurable: true,
        writable: true, value: t[p] };
        return Reflect.getOwnPropertyDescriptor(t, p); },
});
// ==== wx stub 结束 ====

const logged = new Proxy(global.wx, {
    get(t, p, r) { console.log("[wx访问]", String(p)); return Reflect.get(t, p, r); }
});
global.wx = logged;


require("./loader.js")


loader = window.loader

var RR = loader(96949)

GG = loader(18030)
r = loader(96949)
__taro = loader(31121)
f = __taro && __taro.__esModule ? function () { return __taro.default } : function () { return __taro }
m = loader(60779)    // m.uJ / m.o$
o = loader(52050)    // o.v.hotel
T = { weapp: "5", alipay: "8" }
b = null

function ZZ(n, t) {
    var e, u = (0,
        GG.LM)().getToken(), i = (null === (e = (0,
        GG.LM)().state) || void 0 === e ? void 0 : e.openId) || f().getStorageSync("openId"), c = b || (b = function() {
        var n, t;
        return (null === (n = f().getDeviceInfo) || void 0 === n ? void 0 : n.call(f())) || (null === (t = f().getSystemInfoSync) || void 0 === t ? void 0 : t.call(f())) || {}
    }()), a = c.brand, s = c.model, d = c.system, l = (0,
        m.uJ)(i);
    u && (n.Authorization = "Bearer " + u,
        n.type = o.v.hotel);
    var p = n = (0,
        r.Z)((0,
        r.Z)({}, n), {}, {
        MessageId: l,
        ClientType: T.weapp,
        OsVersion: d || "IOS 15.0.2",
        DeviceManufacture: a || "IPHONE",
        DeviceModel: s || "IPhone X"
    })
        , v = p.OsVersion
        , h = p.DeviceManufacture
        , y = p.DeviceModel
        , I = p.ClientType
        , w = p.AppVersion
        , Z = p.Channel
        , _ = p.MessageId
        , k = p.Authorization;
    return n.Timestamp = Date.now(),
        n.Signature = (0,
            m.o$)(n.Timestamp, v, h, y, I, w, Z, _, k, encodeURIComponent(t.split("betterwood.com")[1].split("?")[0])),
        n
}

function NN_PP (n) {
    return n.header = ZZ(n.header, n.url),
        n
}


function get_arg(page){
    page = page * 10
    TT = {
        "header": {
            "pageNo": page,
            "pageSize": 20,
            "content-type": "application/json",
            "Channel": "bdw",
            "AppVersion": "3.5.6",
            "BusinessType": 1,
            "AppType": 2
        },
        "url": "https://api.betterwood.com/base/app/store/listV2",
        "data": {
            "querySource": 2,
            "channelType": 1,
            "sourceType": 10,
            "serviceType": [
                "3"
            ],
            "searchType": 0,
            "dateStartTime": 1785945600000,
            "dateEndTime": 1786032000000,
            "destination": "国内/国际"
        },
        "method": "POST",
        "dataType": "json"
    }
    t = (0, RR.Z)((0, RR.Z)({}, TT), NN_PP(TT))
    li = {}
    li["MessageId"] = t.header.MessageId
    li["Timestamp"] = t.header.Timestamp
    li["Signature"] = t.header.Signature
    return li
}

// console.log(get_arg(2))

//process.exit(0);