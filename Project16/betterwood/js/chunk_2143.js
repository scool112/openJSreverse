(window.webpackJsonp = window.webpackJsonp || []).push([[2143], {
    94115: function (e, t, n) {
        "use strict";
        var r = n(53483).default, i = "[UMENG] -- ", o = function () {
            var e = null, t = !1;

            function n() {
                this.setDebug = function (e) {
                    t = e
                }, this.d = function () {
                    if (t) try {
                        "string" == typeof arguments[0] && (arguments[0] = i + arguments[0])
                    } catch (e) {
                    }
                }, this.i = function () {
                    try {
                        if (t) try {
                            "string" == typeof arguments[0] && (arguments[0] = i + arguments[0])
                        } catch (e) {
                        }
                    } catch (e) {
                    }
                }, this.e = function () {
                    if (t) try {
                        "string" == typeof arguments[0] && (arguments[0] = i + arguments[0])
                    } catch (e) {
                    }
                }, this.w = function () {
                    if (t) try {
                        "string" == typeof arguments[0] && (arguments[0] = i + arguments[0])
                    } catch (e) {
                    }
                }, this.v = function () {
                    if (t) try {
                        "string" == typeof arguments[0] && (arguments[0] = i + arguments[0])
                    } catch (e) {
                    }
                }, this.t = function () {
                }, this.tip = function () {
                    try {
                        "string" == typeof arguments[0] && (arguments[0] = i + arguments[0])
                    } catch (e) {
                    }
                }, this.tip_w = function (e) {
                }, this.err = function () {
                    try {
                        "string" == typeof arguments[0] && (arguments[0] = i + arguments[0])
                    } catch (e) {
                    }
                }, this.repeat = function (e) {
                    for (var t = e; t.length < 86;) t += e;
                    return t
                }
            }

            return function () {
                return null === e && (e = new n), e
            }
        }(), a = function () {
            var e = null;

            function t() {
                var e = {};
                this.useOpenid = function () {
                    return !!e.useOpenid
                }, this.useSwanid = function () {
                    return !!e.useSwanid
                }, this.autoGetOpenid = function () {
                    return !!e.autoGetOpenid
                }, this.appKey = function () {
                    return e.appKey
                }, this.uploadUserInfo = function () {
                    return e.uploadUserInfo
                }, this.enableVerify = function () {
                    return e.enableVerify
                }, this.set = function (t) {
                    e = t
                }, this.get = function () {
                    return e
                }, this.setItem = function (t, n) {
                    e[t] = n
                }, this.getItem = function (t) {
                    return e[t]
                }
            }

            return function () {
                return e || (e = new t), e
            }
        }();

        function s() {
        }

        s.prototype = {
            on: function (e, t, n) {
                var r = this.e || (this.e = {});
                return (r[e] || (r[e] = [])).push({fn: t, ctx: n}), this
            }, once: function (e, t, n) {
                var r = this;

                function i() {
                    r.off(e, i), t.apply(n, arguments)
                }

                return i._ = t, this.on(e, i, n)
            }, emit: function (e) {
                for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), r = 0, i = n.length; r < i; r++) n[r].fn.apply(n[r].ctx, t);
                return this
            }, off: function (e, t) {
                var n = this.e || (this.e = {}), r = n[e], i = [];
                if (r && t) for (var o = 0, a = r.length; o < a; o++) r[o].fn !== t && r[o].fn._ !== t && i.push(r[o]);
                return i.length ? n[e] = i : delete n[e], this
            }
        };
        var u = new s;
        u.messageType = {CONFIG_LOADED: 0, UMA_LIB_INITED: 1};
        var c = new (function () {
            function e() {
            }

            return e.prototype.setStorage = function (e, t, n) {
                wx.setStorage({
                    key: e, data: t, success: function () {
                        "function" == typeof n && n(!0)
                    }, fail: function () {
                        "function" == typeof n && n(!1)
                    }
                })
            }, e.prototype.getStorage = function (e, t) {
                wx.getStorage({
                    key: e, success: function (e) {
                        "function" == typeof t && t(e.data)
                    }, fail: function (n) {
                        o().w(e + ": " + n.errMsg), "function" == typeof t && t()
                    }
                })
            }, e.prototype.removeStorage = function (e, t) {
                wx.removeStorage({
                    key: e, success: function () {
                        "function" == typeof t && t(!0)
                    }, fail: function () {
                        "function" == typeof t && t(!1)
                    }
                })
            }, e.prototype.getSystemInfo = function (e) {
                wx.getSystemInfo({
                    success: function (t) {
                        t.safeArea = t.safeArea || {};
                        var n = "";
                        t.host && "string" == typeof t.host.env && (n = t.host.env);
                        var r = {
                            model: t.model,
                            brand: t.brand,
                            pixelRatio: t.pixelRatio,
                            screenWidth: t.screenWidth,
                            screenHeight: t.screenHeight,
                            fontSizeSetting: t.fontSizeSetting,
                            platform: t.platform,
                            platformVersion: t.version,
                            platformSDKVersion: t.SDKVersion,
                            language: t.language,
                            deviceName: t.model,
                            OSVersion: t.system,
                            resolution: "",
                            theme: t.theme,
                            benchmarkLevel: t.benchmarkLevel,
                            safeArea: {
                                width: t.safeArea.width,
                                height: t.safeArea.height,
                                top: t.safeArea.top,
                                left: t.safeArea.left,
                                bottom: t.safeArea.bottom,
                                right: t.safeArea.right
                            },
                            statusBarHeight: t.statusBarHeight,
                            host: n
                        }, i = t.system.split(" ");
                        Array.isArray(i) && (r.OS = i[0]);
                        var o = Math.round(t.screenWidth * t.pixelRatio),
                            a = Math.round(t.screenHeight * t.pixelRatio);
                        r.resolution = o > a ? o + "*" + a : a + "*" + o, "function" == typeof e && e(r)
                    }, fail: function () {
                        "function" == typeof e && e()
                    }
                })
            }, e.prototype.getDeviceInfo = function (e) {
                "function" == typeof e && e("")
            }, e.prototype.checkNetworkAvailable = function (e) {
                wx.getNetworkType({
                    success: function (t) {
                        "function" == typeof e && e(t && "none" !== t.networkType)
                    }, fail: function () {
                        "function" == typeof e && e(!1)
                    }
                })
            }, e.prototype.getNetworkInfo = function (e) {
                wx.getNetworkType({
                    success: function (t) {
                        "function" == typeof e && e({
                            networkAvailable: "none" !== t.networkType,
                            networkType: t.networkType
                        })
                    }, fail: function () {
                        "function" == typeof e && e()
                    }
                })
            }, e.prototype.getDeviceId = function (e) {
                e("")
            }, e.prototype.getAdvertisingId = function (e) {
                "function" == typeof e && e("")
            }, e.prototype.onNetworkStatusChange = function (e) {
                wx.onNetworkStatusChange((function (t) {
                    "function" == typeof e && e(t.isConnected)
                }))
            }, e.prototype.request = function (e) {
                var t = e.success, n = e.fail, r = !1, i = null;
                e.success = function (e) {
                    r || (i && clearTimeout(i), "function" == typeof t && t(e))
                }, e.fail = function () {
                    r || (i && clearTimeout(i), "function" == typeof n && n(!1))
                }, wx.request(e), i = setTimeout((function () {
                    i && clearTimeout(i), r = !0, "function" == typeof n && n(r)
                }), e.timeout || 5e3)
            }, e.prototype.getSdkType = function () {
                return "wxmp"
            }, e.prototype.getPlatform = function () {
                return "wx"
            }, e.prototype.getUserInfo = function (e) {
                e()
            }, e.prototype.getAppInfoSync = function () {
                if (wx.getAccountInfoSync) {
                    var e = wx.getAccountInfoSync(), t = e && e.miniProgram ? e.miniProgram : {};
                    return {appId: t.appId, appEnv: t.envVersion, appVersion: t.version}
                }
                return {}
            }, e.prototype.onShareAppMessage = function (e) {
                wx.onShareAppMessage(e)
            }, e.prototype.shareAppMessage = function (e) {
                wx.shareAppMessage(e)
            }, e.prototype.getLaunchOptionsSync = function () {
                var e = null;
                if (e) return e;
                if (!wx.getLaunchOptionsSync) return {};
                try {
                    e = wx.getLaunchOptionsSync()
                } catch (t) {
                    e = null
                }
                return e || {}
            }, e
        }()), f = function (e, t) {
            return (f = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        };

        function p(e, t) {
            function n() {
                this.constructor = e
            }

            f(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }

        var l, d = {
            SESSION_INTERVAL: 3e4,
            LOG_URL: "/wxm_logs",
            GET_OPENID_URL: "/uminiprogram_logs/wx/getuut",
            USERINFO_URL: "/uminiprogram_logs/comm/uif",
            ENDPOINT: "https://umini.shujupie.com",
            ENDPOINTB: "https://ulogs.umeng.com",
            DEVICE_INFO_KEY: "device_info",
            ADVERTISING_ID: "mobile_ad_id",
            ANDROID_ID: "android_id",
            CURRENT_SESSION: "current_session",
            SESSION_PAUSE_TIME: "session_pause_time",
            EVENT_SEND_DEFAULT_INTERVAL: 15e3,
            EVENT_LAST_SEND_TIME: "last_send_time",
            MAX_EVENTID_LENGTH: 128,
            MAX_PROPERTY_KEY_LENGTH: 256,
            MAX_PROPERTY_KEYS_COUNT: 100,
            REPORT_POLICY: "report_policy",
            REPORT_INTERVAL_TIME: "report_interval_time",
            REPORT_POLICY_START_SEND: "1",
            REPORT_POLICY_INTERVAL: "6",
            IMPRINT: "imprint",
            SEED_VERSION: "1.0.0",
            IMPL_VERSION: "2.8.0",
            ALIPAY_AVAILABLE_VERSION: "10.1.52",
            SHARE_PATH: "um_share_path",
            SHARES: "shares",
            REQUESTS: "requests",
            UUID: "um_uuid",
            UUID_SUFFIX: "ud",
            OPENID: "um_od",
            UNIONID: "um_unid",
            ALIPAYID: "um_alipayid",
            USERID: "um_userid",
            PROVIDER: "um_provider",
            SWANID: "um_swanid",
            ANONYMOUSID: "um_anonymousid",
            LAUNCH_OPTIONS: "LAUNCH_OPTIONS",
            UM_SSRC: "_um_ssrc",
            USER_INFO: "user_info",
            IS_ALIYUN: !1
        }, h = function (e) {
            for (var t = "", n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], r = 0; r < Number(e); r++) t += n[Math.round(Math.random() * (n.length - 1))];
            return t
        }, _ = function (e) {
            return JSON.parse(JSON.stringify(e))
        }, v = function (e, t) {
            return !(!e || !t || 0 === t.length || t.length > e.length) && e.substr(0, t.length) === t
        }, g = function (e) {
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var t = Object(e), n = 1; n < arguments.length; n++) {
                var r = arguments[n];
                if (r) for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
            }
            return t
        }, m = function e(t, n) {
            if (t === n) return !0;
            if (t && "object" == r(t) && n && "object" == r(n)) {
                if (Object.keys(t).length !== Object.keys(n).length) return !1;
                for (var i in t) {
                    if (Object.prototype.hasOwnProperty.call(n, i)) return !1;
                    if (!e(t[i], n[i])) return !1
                }
                return !0
            }
            return !1
        }, y = function (e, t) {
            if (!e) return "";
            if ("string" == typeof t && t.length) {
                var n = new RegExp("^" + t + "*");
                e = e.replace(n, "")
            } else e = e.replace(/^s*/, "");
            return e
        }, b = function (e) {
            return "function" == typeof e
        }, w = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return p(t, e), t.prototype.getOpenIdAsync = function (e, t) {
                var n = this;
                wx.login({
                    success: function (r) {
                        r.code ? c.request({
                            url: d.ENDPOINT + d.GET_OPENID_URL,
                            method: "GET",
                            data: {key: e, code: r.code},
                            success: function (e) {
                                if (e && 200 === e.statusCode && e.data && e.data.data) {
                                    var r = e.data.data;
                                    return n.setOpenid(r.oid), n.setUnionid(r.uid), t && t(!0)
                                }
                                t && t()
                            },
                            fail: function (e) {
                                o().v("wx request failed...", e), t && t()
                            }
                        }) : t && t()
                    }, fail: function () {
                        t && t()
                    }
                })
            }, t
        }(function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._openid = "", t._unionid = "", t._useOpenid = !1, t
            }

            return p(t, e), t.prototype.initID = function (e) {
                var t = this;
                t._idType = t._useOpenid ? "openid" : "uuid", o().v("id type: ", t._idType), c.getStorage(d.UNIONID, (function (e) {
                    t._unionid = e
                })), this._useOpenid ? c.getStorage(d.OPENID, (function (n) {
                    t._openid = n, e && e()
                })) : e && e()
            }, t.prototype.setUseOpenid = function (e) {
                this._useOpenid = e
            }, t.prototype.setOpenid = function (e) {
                !this._openid && e && (this._openid = e, c.setStorage(d.OPENID, e))
            }, t.prototype.setUnionid = function (e) {
                !this._unionid && e && (this._unionid = e, c.setStorage(d.UNIONID, e))
            }, t.prototype.getIdTracking = function () {
                var t = e.prototype.getIdTracking.call(this);
                return this._openid && (t.openid = this._openid), this._unionid && (t.unionid = this._unionid), this._userid && (t.userid = this._userid), t
            }, t.prototype.getId = function () {
                return this._useOpenid ? this._openid : this._uuid
            }, t
        }(function () {
            function e() {
                this._uuid = "", this._userid = "", this._provider = "", this._idType = ""
            }

            return e.prototype.createUUID = function () {
                return h(10) + Date.now() + h(7) + d.UUID_SUFFIX
            }, e.prototype.initUUID = function (e) {
                var t = this;
                c.getStorage(d.UUID, (function (n) {
                    n ? t._uuid = n : (t._uuid = t.createUUID(), c.setStorage(d.UUID, t._uuid)), e && e(n)
                }))
            }, e.prototype.initUserid = function () {
                var e = this;
                c.getStorage(d.USERID, (function (t) {
                    !e._userid && t && (e._userid = t, o().v("userId is ", t))
                })), c.getStorage(d.PROVIDER, (function (t) {
                    !e._provider && t && (e._provider = t, o().v("provider is ", t))
                }))
            }, e.prototype.init = function (e) {
                var t = this;
                t.initUUID((function () {
                    t.initUserid(), t.initID(e)
                }))
            }, e.prototype.setUserid = function (e, t) {
                !this._userid && e && (this._userid = e, this._provider = t, c.setStorage(d.USERID, e), c.setStorage(d.PROVIDER, t))
            }, e.prototype.removeUserid = function () {
                this._userid = void 0, this._provider = void 0, c.removeStorageSync(d.USERID), c.removeStorageSync(d.PROVIDER)
            }, e.prototype.getUserId = function () {
                return this._userid
            }, e.prototype.getProvider = function () {
                return this._provider
            }, e.prototype.getIdType = function () {
                return this._idType
            }, e.prototype.getIdTracking = function () {
                var e = {};
                return this._uuid && (e.uuid = this._uuid), this._userid && (e.userid = this._userid), e
            }, e
        }())), S = (l = null, function () {
            return l || (l = new w), l
        }), k = function () {
            var e = null;

            function t() {
                var e = !1, t = null, n = [];
                this.addPageStart = function (n) {
                    n && !e && (t = {ts: Date.now(), path: n, page_name: n}, e = !0)
                }, this.addPageEnd = function (r) {
                    if (e && r && t && r === t.page_name) {
                        var i = Date.now() - t.ts;
                        t.duration = Math.abs(i), n.push(t), t = null, e = !1
                    }
                }, this.get = function () {
                    return n
                }, this.getCurrentPage = function () {
                    return t
                }, this.clear = function () {
                    n.length = 0
                }
            }

            return function () {
                return e || (e = new t), e
            }
        }(), I = {}, O = function () {
            var e = null, t = [], n = "";

            function r() {
                return {
                    add: function (e, r) {
                        o().v("share origin: %o", e);
                        var i = {
                            title: e && e.title,
                            path: e && e.path && e.path.split("?")[0],
                            _um_sts: Date.now()
                        };
                        i.path && i.path.length > 1 && v(i.path, "/") && (i.path = y(i.path, "/"));
                        var a = e.path || "", s = S().getId();
                        if (s) {
                            var u = n.split(","), c = (u = u.filter((function (e) {
                                return e.length > 0
                            }))).indexOf(s);
                            c >= 0 && (u = u.slice(0, c)), u.length < 3 && u.push(s);
                            var f = u.join(",");
                            -1 !== a.indexOf("?") ? a += "&_um_ssrc=" + f : a += "?_um_ssrc=" + f;
                            var p = Date.now();
                            if (a += "&_um_sts=" + p, r) {
                                var l = function (e) {
                                        var t = [];
                                        for (var n in e) "_um_ssrc" !== n && "_um_sts" !== n && t.push(n + "=" + e[n]);
                                        return t.join("&")
                                    }(I),
                                    d = l ? l + "&_um_ssrc=" + f + "&_um_sts=" + p : "_um_ssrc=" + f + "&_um_sts=" + p;
                                e.query = e.query ? e.query + "&_um_ssrc=" + f + "&_um_sts=" + p : d
                            } else e.path = a;
                            i._um_ssrc = f, i._um_sts = p
                        }
                        return t.push(i), o().v("share: %o", e), e
                    }, setShareSource: function (e) {
                        n = e
                    }, clear: function () {
                        t.length = 0
                    }, get: function () {
                        return t
                    }
                }
            }

            return function () {
                return e || (e = new r), e
            }
        }(), x = function (e) {
            if (e) try {
                return JSON.stringify(e)
            } catch (e) {
            }
            return ""
        }, T = function (e) {
            if (e) try {
                return JSON.parse(e)
            } catch (e) {
            }
            return null
        }, P = function () {
            var e = null, t = "", n = null, r = !1;

            function i() {
                this.load = function (e) {
                    n ? (c.removeStorage(t), e()) : (t = "um_cache_" + a().appKey(), c.getStorage(t, (function (i) {
                        n = T(i) || {}, r = !0, c.removeStorage(t), e()
                    })))
                }, this.save = function () {
                    n && c.setStorage(t, x(n))
                }, this.set = function (e, t) {
                    n && (n[e] = t)
                }, this.get = function (e) {
                    return (n || {})[e]
                }, this.remove = function (e) {
                    n && n[e] && delete n[e]
                }, this.getAll = function () {
                    return n
                }, this.clear = function () {
                    n = null
                }, this.has = function (e) {
                    return !!this.get(e)
                }, this.isLoaded = function () {
                    return r
                }
            }

            return function () {
                return e || (e = new i), e
            }
        }(), E = function () {
            var e, t, n = [], r = [];

            function i(e, n) {
                var r = (e = e || {})[t];
                return Array.isArray(r) && r.length ? e[t] = r.concat(n) : e[t] = [].concat(n), e
            }

            return function () {
                return e || (e = {
                    addEvent: function (e) {
                        t ? (n.unshift(e), n.length > 1 && (function () {
                            if (n.length) {
                                var e = P().get("ekvs");
                                (function (e) {
                                    var t = 0;
                                    for (var n in e) Array.isArray(e[n]) && (t += e[n].length);
                                    return t
                                })(e) + n.length <= 1e4 && (e = i(e, n), P().set("ekvs", e))
                            }
                        }(), n.length = 0)) : (o().w("session id is null: ", t), r.unshift(e))
                    }, setSessionId: function (e) {
                        if (t = e, o().v("setSessionId: ", t), Array.isArray(r) && r.length && t) {
                            for (var n = 0; n < r.length; n++) this.addEvent(r[n]);
                            r.length = 0
                        }
                    }, getEkvs: function () {
                        var e = P().get("ekvs");
                        return n && n.length && (e = i(e, n)), e
                    }, clear: function () {
                        P().remove("ekvs"), n.length = 0
                    }
                }), e
            }
        }(), A = "half_session", D = "close_session", C = ["access", "access_subtype"], $ = function () {
            var e = null;

            function t() {
                var e = !1, t = {};
                return {
                    init: function () {
                        !function (e) {
                            var n = P().get(d.IMPRINT);
                            n && (t.imprint = n), t.device_type = "Phone", t.sdk_version = d.IMPL_VERSION, t.appkey = a().appKey(), c.getDeviceInfo((function (e) {
                                t.device_info = e || ""
                            }));
                            var r = c.getAppInfoSync();
                            t.appid = r.appId, t.app_env = r.appEnv, t.app_version = r.appVersion, c.getSystemInfo((function (n) {
                                c.getNetworkInfo((function (r) {
                                    var i = function (e, t) {
                                        var n = {};
                                        (e = e || {}).safeArea = e.safeArea || {};
                                        var r = (t = t || {}).networkType;
                                        "none" === r && (r = "unknown");
                                        var i = e.model || "", o = e.platform || "", a = e.brand || "",
                                            s = a.toLowerCase();
                                        switch (n.sdk_type = c.getSdkType(), n.platform = c.getPlatform(), n.platform_sdk_version = e.platformSDKVersion, n.platform_version = e.platformVersion, n.resolution = e.resolution, n.pixel_ratio = e.pixelRatio, n.os = o, n.font_size_setting = e.fontSizeSetting, n.device_model = i, n.device_brand = a, n.device_manufacturer = s, n.device_manuid = i, n.device_name = i, n.os_version = e.OSVersion, n.language = e.language, n.theme = e.theme, n.benchmark_level = e.benchmarkLevel, n.status_bar_height = e.statusBarHeight, n.safe_area_top = e.safeArea.top, n.safe_area_left = e.safeArea.left, n.safe_area_right = e.safeArea.right, n.safe_area_bottom = e.safeArea.bottom, n.safe_area_height = e.safeArea.height, n.safe_area_width = e.safeArea.width, n.storage = e.storage, n.screen_width = e.screenWidth, n.screen_height = e.screenHeight, n.host = e.host, r = r ? r.toLowerCase() : "") {
                                            case"4g":
                                                n.access_subtype = "LTE", n.access = "4G";
                                                break;
                                            case"3g":
                                                n.access_subtype = "CDMA", n.access = "3G";
                                                break;
                                            case"2g":
                                                n.access_subtype = "GRPS", n.access = "2G";
                                                break;
                                            default:
                                                n.access = r, delete n.access_subtype
                                        }
                                        return n
                                    }(n, r);
                                    g(t, i), e && e()
                                }))
                            }))
                        }((function () {
                            e = !0
                        }))
                    }, isLoaded: function () {
                        return e
                    }, get: function () {
                        return t
                    }, getRealtimeFields: function () {
                        var e = {};
                        return C.forEach((function (n) {
                            e[n] = t[n]
                        })), e
                    }, setIdTracking: function (e) {
                        this.setItem("id_tracking", e)
                    }, setIdType: function (e) {
                        this.setItem("id_type", e)
                    }, setAppVersion: function (e) {
                        this.setItem("app_version", e)
                    }, setSuperProperty: function (e) {
                        t.sp || (t.sp = {}), t.sp.isv = e
                    }, getSuperProperty: function () {
                        return t && t.sp ? t.sp.isv : ""
                    }, setItem: function (e, n) {
                        t[e] = n
                    }, getItem: function (e) {
                        return t[e]
                    }
                }
            }

            return {
                instance: function () {
                    return e || (e = t()), e
                }
            }
        }(), N = function () {
            var e = null, t = null, n = null;
            return function () {
                return e || (e = {
                    resume: function (e) {
                        var r = !1;
                        n || (n = P().get(d.CURRENT_SESSION));
                        var i = new Date;
                        return t = i.getTime(), !n || !n.end_time || t - n.end_time > d.SESSION_INTERVAL ? (r = !0, function (e) {
                            try {
                                var t = (n || {}).options || {}, r = g({}, function (e) {
                                    var t = {};
                                    for (var n in e) 0 === n.indexOf("_um_") && (t[n] = e[n]);
                                    return o().v("query: ", e), o().v("_um_params: ", t), t
                                }(e.query));
                                r.path = e.path || t.path, "gaode" !== c.getPlatform() && (r.scene = e.scene ? c.getPlatform() + "_" + e.scene : t.scene);
                                var i = e.referrerInfo;
                                i && (r.referrerAppId = i.appId), o().v("session options: ", r);
                                var a = r[d.UM_SSRC];
                                a && O().setShareSource(a);
                                var s = Date.now();
                                n = {id: h(10) + s, start_time: s, options: r}
                            } catch (e) {
                                o().e("生成新session失败: ", e)
                            }
                        }(e), o().v("开始新的session(%s): ", n.id, n)) : o().v("延续上一次session(%s): %s ", n.id, i.toLocaleTimeString(), n), r
                    }, pause: function () {
                        !function () {
                            if (n) {
                                var e = new Date;
                                n.end_time = e.getTime(), "number" != typeof n.duration && (n.duration = 0), n.duration = n.end_time - t, P().set(d.CURRENT_SESSION, n), o().v("退出会话(%s): %s ", n.id, e.toLocaleTimeString(), n)
                            }
                        }()
                    }, getCurrentSessionId: function () {
                        return (n || {}).id
                    }, getCurrentSession: function () {
                        return n
                    }, cloneCurrentSession: function () {
                        return _(n)
                    }
                }), e
            }
        }();
        var R = {sessions: "sn", ekvs: "e", active_user: "active_user"}, q = {
            sdk_type: "sdt",
            access: "ac",
            access_subtype: "acs",
            device_model: "dm",
            language: "lang",
            device_type: "dt",
            device_manufacturer: "dmf",
            device_name: "dn",
            platform_version: "pv",
            id_type: "it",
            font_size_setting: "fss",
            os_version: "ov",
            device_manuid: "did",
            platform_sdk_version: "psv",
            device_brand: "db",
            appkey: "ak",
            _id: "id",
            id_tracking: "itr",
            imprint: "imp",
            sdk_version: "sv",
            resolution: "rl",
            testToken: "ttn",
            theme: "t5",
            benchmark_level: "bml",
            screen_width: "sw",
            screen_height: "sh",
            status_bar_height: "sbh",
            safe_area_top: "sat",
            safe_area_left: "sal",
            safe_area_right: "sar",
            safe_area_bottom: "sab",
            safe_area_height: "sah",
            safe_area_width: "saw",
            pixel_ratio: "pr",
            storage: "s7",
            host: "hs"
        }, U = {
            uuid: "ud",
            unionid: "und",
            openid: "od",
            anonymousid: "nd",
            alipay_id: "ad",
            device_id: "dd",
            userid: "puid"
        };

        function L(e, t) {
            var n = j(e, t);
            return e && e.id_tracking && (n[t.id_tracking || "id_tracking"] = j(e.id_tracking, U)), n
        }

        function j(e, t) {
            var n = {};
            for (var r in e) t[r] ? n[t[r]] = e[r] : n[r] = e[r];
            return n
        }

        function M(e, t) {
            var n = {};
            if (e) for (var r in e) e[r] && (n[t[r]] = e[r]);
            return n
        }

        var H = "";

        function F() {
            return H
        }

        var V = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", B = function (e) {
            for (var t = {}, n = 0, r = e.length; n < r; n++) t[e.charAt(n)] = n;
            return t
        }(V), K = String.fromCharCode, G = function (e) {
            if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? K(192 | t >>> 6) + K(128 | 63 & t) : K(224 | t >>> 12 & 15) + K(128 | t >>> 6 & 63) + K(128 | 63 & t);
            var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return K(240 | t >>> 18 & 7) + K(128 | t >>> 12 & 63) + K(128 | t >>> 6 & 63) + K(128 | 63 & t)
        }, z = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, J = function (e) {
            var t = [0, 2, 1][e.length % 3],
                n = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
            return [V.charAt(n >>> 18), V.charAt(n >>> 12 & 63), t >= 2 ? "=" : V.charAt(n >>> 6 & 63), t >= 1 ? "=" : V.charAt(63 & n)].join("")
        }, Y = function (e) {
            return function (e) {
                return e.replace(z, G)
            }(e).replace(/[\s\S]{1,3}/g, J)
        }, Z = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"), W = function (e) {
            switch (e.length) {
                case 4:
                    var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
                    return K(55296 + (t >>> 10)) + K(56320 + (1023 & t));
                case 3:
                    return K((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                default:
                    return K((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
            }
        }, X = function (e) {
            var t = e.length, n = t % 4,
                r = (t > 0 ? B[e.charAt(0)] << 18 : 0) | (t > 1 ? B[e.charAt(1)] << 12 : 0) | (t > 2 ? B[e.charAt(2)] << 6 : 0) | (t > 3 ? B[e.charAt(3)] : 0),
                i = [K(r >>> 16), K(r >>> 8 & 255), K(255 & r)];
            return i.length -= [0, 0, 2, 1][n], i.join("")
        }, Q = function (e) {
            return function (e) {
                return function (e) {
                    return e.replace(/[\s\S]{1,4}/g, X)
                }(e).replace(Z, W)
            }(String(e).replace(/[-_]/g, (function (e) {
                return "-" == e ? "+" : "/"
            })).replace(/[^A-Za-z0-9\+\/]/g, ""))
        }, ee = new function () {
            var e = "", t = this;
            this.set = function (t) {
                e = t
            }, this.get = function () {
                return e
            }, this.getImpObj = function () {
                return T(Q(e))
            }, this.getItem = function (e) {
                var n = t.getImpObj();
                return n && n[e] || ""
            }, this.load = function () {
                e = P().get(d.IMPRINT)
            }, this.save = function () {
                e && P().set(d.IMPRINT, e)
            }
        };

        function te(e) {
            var t = e, n = [];
            this.enqueue = function (e) {
                "number" == typeof t && this.size() >= t && this.dequeue(), n.push(e)
            }, this.dequeue = function () {
                return n.shift()
            }, this.front = function () {
                return n[0]
            }, this.isEmpty = function () {
                return 0 === n.length
            }, this.clear = function () {
                n.length = 0
            }, this.size = function () {
                return n.length
            }, this.items = function () {
                return n
            }, this.print = function () {
            }
        }

        var ne = function () {
            var e = null, t = !1, n = [], r = new te(50);

            function i(e, t, n) {
                if ($.instance().isLoaded()) {
                    t = t || {};
                    var o = function (e) {
                        var t = null;
                        switch (e) {
                            case A:
                                t = function () {
                                    var e = null, t = N().cloneCurrentSession();
                                    return t && (e = {header: {st: "1"}, analytics: {sessions: [t]}}), e
                                }();
                                break;
                            case D:
                                t = function () {
                                    var e = null, t = {}, n = N().cloneCurrentSession();
                                    if (n) {
                                        var r = k().get(), i = O().get();
                                        Array.isArray(r) && r.length && (n.pages = _(r)), Array.isArray(i) && i.length && (n.shares = _(i)), k().clear(), O().clear(), t.sessions = [n]
                                    }
                                    var o = E().getEkvs();
                                    return o && (t.ekvs = _(o), E().clear()), (t.sessions || t.ekvs) && (e = {analytics: t}), e
                                }();
                                break;
                            case"ekv":
                                t = function () {
                                    var e = null, t = E().getEkvs();
                                    return t && (e = {analytics: {ekvs: _(t)}}, E().clear()), e
                                }()
                        }
                        return t
                    }(e);
                    if (o) {
                        var a = $.instance().getRealtimeFields();
                        o.header = g({}, o.header, a), o.noCache = t.noCache, r.enqueue(o)
                    }
                    "function" == typeof n && n()
                } else setTimeout((function () {
                    i(e, t, n)
                }), 100)
            }

            function a(e) {
                var t = r.front();
                t ? function (e, t, n, r) {
                    $.instance().setIdType(S().getIdType()), $.instance().setIdTracking(S().getIdTracking());
                    var i = S().getUserId();
                    i && e.analytics && (e.analytics.active_user = {puid: i, provider: S().getProvider()});
                    var a = _($.instance().get());
                    e.header = g(a, e.header, {ts: Date.now(), testToken: F(), traceId: h(10) + Date.now() + h(9)});
                    var s = function (e) {
                        return {h: L(e.header, q), a: M(e.analytics, R)}
                    }(e), u = x(s), f = {
                        url: d.ENDPOINT + d.LOG_URL, method: "POST", data: s, success: function (r) {
                            var i = r.code || r.status || r.statusCode;
                            200 === i || 413 === i ? (o().i("数据发送成功: ", e, u), function (e) {
                                e && ($.instance().setItem(d.IMPRINT, e), ee.set(e), ee.save(), o().v("imprint: ", ee.getImpObj()), ee.getItem("ttn_invalid") && (H = ""))
                            }((r.data || {}).imprint), "function" == typeof t && t(r)) : (o().w("数据发送失败: ", u), "function" == typeof n && n())
                        }, fail: function (e) {
                            o().w("超时: ", u), "function" == typeof n && n()
                        }, complete: function () {
                            "function" == typeof r && r()
                        }
                    };
                    c.request(g(f, {header: {"Msg-Type": c.getSdkType() + "/json", "disable-base64": "Y"}}))
                }(t, (function () {
                    r.dequeue(), a(e)
                }), (function () {
                    var t = r.dequeue();
                    t && !t.noCache && n.push(t), a(e)
                })) : (n.forEach((function (e) {
                    r.enqueue(e)
                })), n.length = 0, e())
            }

            function s(e) {
                S().getId() ? t ? o().i("队列正在发送中") : (t = !0, a((function () {
                    t = !1, "function" == typeof e && e()
                }))) : (o().i("获取id标识失败，暂缓发送"), "function" == typeof e && e())
            }

            function u() {
                this.send = function (e, t, n) {
                    e ? this.add(e, t, (function () {
                        s(n)
                    })) : s(n)
                }, this.add = function (e, t, n) {
                    i(e, t, n)
                }, this.load = function () {
                    var e = P().get(d.REQUESTS);
                    e && e.length && e.forEach((function (e) {
                        r.enqueue(e)
                    })), P().remove(d.REQUESTS)
                }, this.save = function () {
                    P().set(d.REQUESTS, _(r.items())), r.clear()
                }
            }

            return function () {
                return e || (e = new u), e
            }
        }(), re = function () {
            var e = null, t = null;

            function n() {
                function e(e) {
                    if (e && "object" == r(e)) {
                        var t = P().get(d.USER_INFO);
                        return t && m(e, t) || function (e, t) {
                            var n = a().appKey(), r = c.getSdkType(), i = S().getId(), s = S().getIdType();
                            if (n && r && i && s) {
                                var u = {
                                    ak: a().appKey(),
                                    sdt: c.getSdkType(),
                                    uin: e.nickName,
                                    uia: e.avatar || e.avatarUrl,
                                    uig: e.gender,
                                    uit: e.country,
                                    uip: e.province,
                                    uic: e.city,
                                    uil: e.language,
                                    id: S().getId(),
                                    it: S().getIdType(),
                                    age: e.age,
                                    cln: e.constellation
                                }, f = JSON.stringify(u);
                                f = function (e, t) {
                                    return t ? Y(String(e)).replace(/[+\/]/g, (function (e) {
                                        return "+" == e ? "-" : "_"
                                    })).replace(/=/g, "") : Y(String(e))
                                }(f), c.request({
                                    url: d.ENDPOINT + d.USERINFO_URL,
                                    method: "POST",
                                    header: {"content-type": "application/x-www-form-urlencoded"},
                                    data: "ui=" + f,
                                    success: function (n) {
                                        o().v("用户信息上传成功: ", e), t && t(n && n.data && 200 === n.data.code)
                                    },
                                    fail: function () {
                                        o().e("用户信息上传失败: ", e), t && t(!1)
                                    }
                                })
                            }
                        }(e, (function (t) {
                            t && P().set(d.USER_INFO, e)
                        })), !0
                    }
                    return !1
                }

                this.setUserInfo = function (e) {
                    t = e
                }, this.update = function () {
                    e(t) || c.getUserInfo((function (t) {
                        e(t)
                    }))
                }
            }

            return function () {
                return e || (e = new n), e
            }
        }();

        function ie(e, t) {
            this.id = e, this.ts = Date.now();
            var n = r(t);
            if ("string" === n && t) this[e] = t; else if ("object" === n) for (var i in t) ({}).hasOwnProperty.call(t, i) && (this[i] = t[i])
        }

        function oe() {
            var e = !1, t = !1, n = 0;
            this.init = function (t) {
                o().v("sdk version: " + d.IMPL_VERSION), e ? o().v("Lib重复实例化") : P().load((function () {
                    o().v("cache初始化成功: ", P().getAll()), S().setUseOpenid && S().setUseOpenid(a().useOpenid()), S().init((function () {
                        $.instance().init(), o().v("Header初始化成功")
                    })), e = !0, "function" == typeof t && t(), o().tip("SDK集成成功")
                }))
            }, this.resume = function (n) {
                var r;
                e && !t && (o().v("showOptions: ", n), t = !0, a().enableVerify() && n && n.query && (r = n.query._ttn, H = r || H), this._resume(n))
            }, this._resume = function (e) {
                ne().load();
                var t = N().resume(e), n = N().getCurrentSessionId();
                E().setSessionId(n), t && ne().add(A, {}, (function () {
                    S().setUseOpenid && S().setUseOpenid(a().useOpenid()), a().useOpenid() && a().autoGetOpenid() && !S().getId() ? (o().v("get id async"), function e(t, n) {
                        S().getId() || t <= 0 || S().getOpenIdAsync(a().appKey(), (function (r) {
                            r ? (o().v("获取id成功"), ne().send()) : (o().v("获取openid失败,启动重试,剩余可用次数", t - 1), setTimeout((function () {
                                e(t - 1, n)
                            }), n))
                        }))
                    }(10, 3e3)) : (o().v("session auto send"), ne().send())
                }))
            }, this.pause = function (r) {
                e && (t = !1, n = 0, N().pause(), a().uploadUserInfo() && re().update(), ne().send(D, {}, (function () {
                    ne().save(), P().save(), o().v("cache save success"), "function" == typeof r && r()
                })))
            }, this.setOpenid = function (e) {
                o().v("setOpenId: %s", e), S().setOpenid(e), ne().send()
            }, this.setUnionid = function (e) {
                o().v("setUnionid: %s", e), S().setUnionid(e)
            }, this.setUserid = function (e, t) {
                o().v("setUserid: %s", e, t), S().setUserid(e, t)
            }, this.removeUserid = function () {
                o().v("removeUserid"), S().removeUserid()
            }, this.setUserInfo = function (e) {
                o().v("setUserInfo: %s", e), re().setUserInfo(e)
            }, this.setAnonymousid = function (e) {
                o().v("setAnonymousId: %s", e), S().setAnonymousid(e), ne().send()
            }, this.setAppVersion = function (e) {
                e && "string" != typeof e ? o().w("setAppVersion方法只接受字符串类型参数") : $.instance().setAppVersion(e)
            }, this.setAlipayUserid = function (e) {
                e && "string" != typeof e ? o().w("setAlipayUserid方法只接受字符串类型参数") : (o().v("setAlipayUserid: %s", e), S().setAlipayUserid(e))
            }, this.setDeviceId = function (e) {
                if ("string" == typeof e) return S().setDeviceId(e), e
            }, this.setSuperProperty = function (e) {
                if (e && "string" != typeof e) o().w("超级属性只支持字符串类型"); else {
                    var t = this;
                    $.instance().getSuperProperty() !== e && ($.instance().setSuperProperty(e), t.pause((function () {
                        t.resume()
                    })))
                }
            }, this.trackEvent = function (t, i) {
                if (e && (o().v("event: ", t, i), function (e, t) {
                    if (!e || "string" != typeof e) return o().e('please check trackEvent id. id should be "string" and not null'), !1;
                    var n = ["id", "ts", "du"], i = {};
                    if (n.forEach((function (e) {
                        i[e] = 1
                    })), i[e]) return o().e("eventId不能与以下保留字冲突: " + n.join(",")), !1;
                    if (e.length > d.MAX_EVENTID_LENGTH) return o().e("The maximum length of event id shall not exceed " + d.MAX_EVENTID_LENGTH), !1;
                    if (t && ("object" != r(t) || Array.isArray(t)) && "string" != typeof t) return o().e("please check trackEvent properties. properties should be string or object(not include Array)"), !1;
                    if ("object" == r(t)) {
                        var a = 0;
                        for (var s in t) if ({}.hasOwnProperty.call(t, s)) {
                            if (s.length > d.MAX_PROPERTY_KEY_LENGTH) return o().e("The maximum length of property key shall not exceed " + d.MAX_PROPERTY_KEY_LENGTH), !1;
                            if (a >= d.MAX_PROPERTY_KEYS_COUNT) return o().e("The maximum count of properties shall not exceed " + d.MAX_PROPERTY_KEYS_COUNT), !1;
                            if (i[s]) return o().e("属性中的key不能与以下保留字冲突: " + n.join(",")), !1;
                            a += 1
                        }
                    }
                    return !0
                }(t, i))) {
                    var a = new ie(t, i);
                    E().addEvent(a);
                    var s = !!F(), u = s ? 0 : d.EVENT_SEND_DEFAULT_INTERVAL, c = Date.now();
                    (function (e, t) {
                        return "number" != typeof n || "number" != typeof t || n <= 0 || e - n > t
                    })(c, u) && (n = c, ne().send("ekv", {noCache: s}, (function () {
                    })))
                }
            }, this.trackShare = function (t) {
                if (e) try {
                    c.getSdkType().indexOf("game") > -1 ? (t = O().add(t, !0), o().v("shareQuery: ", t)) : (t = O().add(t, !1), o().v("sharePath: ", t.path))
                } catch (e) {
                    o().v("shareAppMessage: ", e)
                }
                return t
            }, this.trackPageStart = function (t) {
                e && k().addPageStart(t)
            }, this.trackPageEnd = function (t) {
                e && k().addPageEnd(t)
            }, this.onShareAppMessage = function (e) {
                var t = this;
                c.onShareAppMessage((function () {
                    return t.trackShare(e())
                }))
            }, this.shareAppMessage = function (e) {
                this.trackShare(e), c.shareAppMessage(e)
            }
        }

        var ae = [];

        function se() {
        }

        se.prototype = {
            createMethod: function (e, t, n) {
                try {
                    e[t] = n && n[t] ? function () {
                        return n[t].apply(n, arguments)
                    } : function () {
                        ae.push([t, [].slice.call(arguments)])
                    }
                } catch (e) {
                    o().v("create method errror: ", e)
                }
            }, installApi: function (e, t) {
                try {
                    var n, r,
                        i = "resume,pause,trackEvent,trackPageStart,trackPageEnd,trackShare,setUserid,setOpenid,setUnionid,setSuperProperty,setUserInfo".split(",");
                    for (n = 0, r = i.length; n < r; n++) this.createMethod(e, i[n], t);
                    if (t) for (n = 0, r = ae.length; n < r; n++) {
                        var a = ae[n];
                        try {
                            t[a[0]].apply(t, a[1])
                        } catch (e) {
                            o().v("impl[v[0]].apply error: ", a[0], e)
                        }
                    }
                } catch (e) {
                    o().v("install api errror: ", e)
                }
            }
        };
        var ue = [d.ENDPOINT, d.ENDPOINTB];
        var ce = function (e) {
            d.ENDPOINTB && setTimeout((function () {
                !function e(t, n) {
                    var r, i;
                    if (0 === t || 1 === t && n ? r = d.ENDPOINT : 2 === t && n ? r = d.ENDPOINTB : n && (r = ue[t]), t >= ue.length || n) return n && (i = r, d.ENDPOINT = i), n && o().v("命中可用服务", r), !n && o().tip_w("未命中可用服务"), !1;
                    c.request({
                        url: d.ENDPOINT + "/uminiprogram_logs/ckdh", success: function (n) {
                            200 === (n.code || n.status || n.statusCode) && n.data && 200 === n.data.code ? e(t + 1, !0) : e(t + 1, !1)
                        }, fail: function () {
                            e(t + 1, !1)
                        }
                    })
                }(0, !1)
            }), e)
        }, fe = new se, pe = {
            _inited: !1, _log: o(), preinit: function (e) {
                if (e && "object" == r(e)) for (var t in e) d[t] = e[t];
                return d
            }, use: function (e, t) {
                return e && b(e.install) ? e.install(pe, t) : b(e) && e(pe, t), pe
            }, messager: u, init: function (e) {
                if (this._inited) o().v("已经实例过，请避免重复初始化"); else if (e) if (e.appKey) {
                    "boolean" != typeof e.useOpenid && (e.useOpenid = !0), a().set(e), o().setDebug(e.debug), this._inited = !0;
                    var t = this;
                    u.emit(u.messageType.CONFIG_LOADED, e);
                    try {
                        var n = new oe;
                        o().v("成功创建Lib对象"), n.init((function () {
                            o().v("Lib对象初始化成功"), fe.installApi(t, n), o().v("安装Lib接口成功"), u.emit(u.messageType.UMA_LIB_INITED, e)
                        })), ce(3e3)
                    } catch (e) {
                        o().w("创建Lib对象异常: " + e)
                    }
                } else o().err("请确保传入正确的appkey"); else o().err("请正确设置相关信息！")
            }
        };
        try {
            fe.installApi(pe, null)
        } catch (i) {
            o().w("uma赋值异常: ", i)
        }
        var le = {}, de = Array.isArray;
        le.isArray = de || function (e) {
            return "[object Array]" === toString.call(e)
        }, le.isObject = function (e) {
            return e === Object(e) && !le.isArray(e)
        }, le.isEmptyObject = function (e) {
            if (le.isObject(e)) {
                for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
                return !0
            }
            return !1
        }, le.isUndefined = function (e) {
            return void 0 === e
        }, le.isString = function (e) {
            return "[object String]" === toString.call(e)
        }, le.isDate = function (e) {
            return "[object Date]" === toString.call(e)
        }, le.isNumber = function (e) {
            return "[object Number]" === toString.call(e)
        }, le.each = function (e, t, n) {
            if (null != e) {
                var r = {}, i = Array.prototype.forEach;
                if (i && e.forEach === i) e.forEach(t, n); else if (e.length === +e.length) {
                    for (var o = 0, a = e.length; o < a; o++) if (o in e && t.call(n, e[o], o, e) === r) return
                } else for (var s in e) if (hasOwnProperty.call(e, s) && t.call(n, e[s], s, e) === r) return
            }
        }, le.buildQuery = function (e, t) {
            var n, r, i = [];
            return void 0 === t && (t = "&"), le.each(e, (function (e, t) {
                n = encodeURIComponent(e.toString()), r = encodeURIComponent(t), i[i.length] = r + "=" + n
            })), i.join(t)
        }, le.JSONDecode = function (e) {
            if (e) {
                try {
                    return JSON.parse(e)
                } catch (e) {
                }
                return null
            }
        }, le.JSONEncode = function (e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
            }
        };
        var he = Object.create(null);
        var _e = Object.create(null), ve = null, ge = !1, me = {minFetchIntervalSeconds: 43200};

        function ye(e) {
            e && le.each(e, (function (e) {
                _e[e.k] = e
            }))
        }

        function be() {
            var e = this;
            this.STORAGE_NAME = null, u.once(u.messageType.CONFIG_LOADED, (function (t) {
                o().v("云配初始化开始..."), e.init(t)
            }))
        }

        be.prototype = {
            setDefaultValues: function (e) {
                ge && le.isObject(e) && le.each(e, (function (e, t) {
                    _e[t] && _e[t].v || (_e[t] = {v: e})
                }))
            }, getValue: function (e) {
                o().v("从配置项中读取 value, 当前配置为: ", _e), o().v("待读取的 key : ", e);
                try {
                    if (!ge) return;
                    var t = _e[e] || {};
                    return o().v("读取相应配置ing..., 结果为: ", t), le.isNumber(t.e) && le.isNumber(t.g) && (o().v("读取到相应配置, 开始数据上报..."), function (e) {
                        var t = {
                            appkey: a().appKey(),
                            sdkType: c.getSdkType(),
                            expId: e && e.e,
                            groupId: e && e.g,
                            clientTs: Date.now(),
                            key: e && e.k,
                            value: e && e.v,
                            umid: S().getId()
                        };
                        try {
                            c.request({
                                url: "https://pslog.umeng.com/mini_ablog",
                                method: "POST",
                                data: [t],
                                success: function (e) {
                                    e && 200 === e.statusCode ? o().v("上传数据成功", t) : o().w("ablog 请求成功, 返回结果异常 ", e)
                                },
                                fail: function (e) {
                                    o().w("ablog 请求数据错误 ", t, e)
                                }
                            })
                        } catch (e) {
                            o().w("urequest 调用错误", e)
                        }
                    }(t)), t.v
                } catch (t) {
                    o().w("getValue error, key: ", e)
                }
            }, active: function (e) {
                try {
                    if (!ge) return;
                    var t, n;
                    e && e.params && (t = e.params), e && e.callback && (n = e.callback), o().v("激活配置项: ", t), t ? (o().v("本地已缓存的配置项: ", _e), ye(t), o().v("合并后的配置项: ", _e), n && n(_e), o().v("active 结束")) : (o().v("配置项为空!! 读取本地配置..."), c.getStorage(this.STORAGE_NAME, (function (e) {
                        e ? (ye((e = le.JSONDecode(e) || {}).params), o().v("当前本地配置项为: ", _e), n && n(_e), o().v("active 结束")) : o().v("当前本地配置项为空, 退出激活")
                    })))
                } catch (e) {
                    o().w("SDK active 错误", e)
                }
            }, init: function (e) {
                e.appKey && (ve = e.appKey, this.STORAGE_NAME = "um_remote_config_{{" + ve + "}}"), ve ? ge ? o().w("SDK 已经初始化, 请避免重复初始化") : (ge = !0, this.setOptions(e), this.active()) : o().err("请检查您的小程序 appKey, appKey 不能为空")
            }, setOptions: function (e) {
                if (le.isObject(e)) {
                    var t = e.minFetchIntervalSeconds;
                    le.isNumber(t) && (me.minFetchIntervalSeconds = Math.max(t, 5))
                }
            }, fetch: function (e) {
                if (ge && this.STORAGE_NAME) {
                    var t, n;
                    e && e.active && (t = e.active), e && e.callback && (n = e.callback);
                    var r = this;
                    c.getStorage(this.STORAGE_NAME, (function (e) {
                        o().v("开始读缓存 data is ", e), (e = le.JSONDecode(e) || {}).params && e.ts && Date.now() - e.ts < 1e3 * me.minFetchIntervalSeconds ? (o().v("缓存数据存在, 并且本次触发时间距离上次fetch触发时间未超过 fetch 时间间隔, 无需 fetch"), n && n(e.params)) : function (e) {
                            o().v("开始构建 fetch body"), c.getSystemInfo((function (t) {
                                c.getNetworkInfo((function (n) {
                                    var r = (n = n || {}).networkType;
                                    r = "none" === r ? "unknown" : r.toUpperCase(), he.access = r, function (e, t) {
                                        var n = e.brand || "";
                                        if (he.deviceType = "Phone", he.sdkVersion = "2.8.0", he.appkey = a().appKey(), he.sdkType = c.getSdkType(), he.umid = S().getId(), e) {
                                            he.language = e.language || "", he.os = e.OS, he.osVersion = e.OSVersion, he.deviceName = e.deviceName, he.platformVersion = e.platformVersion, he.platformSdkVersion = e.platformSDKVersion, he.deviceBrand = n;
                                            var r = e.resolution.split("*");
                                            le.isArray(r) && (he.resolutionHeight = Number(r[0]), he.resolutionWidth = Number(r[1]))
                                        }
                                        !function (e) {
                                            e && (he.installTime = e.install_datetime && Date.parse(e.install_datetime), he.scene = e.install_scene, he.channel = e.install_channel, he.campaign = e.install_campaign)
                                        }(ee.getImpObj()), t && t(he)
                                    }(t, e)
                                }))
                            }))
                        }((function (e) {
                            o().v("缓存数据不存在, 构建 fetch body :", e);
                            try {
                                c.request({
                                    url: "https://ucc.umeng.com/v1/mini/fetch",
                                    method: "POST",
                                    data: e,
                                    success: function (e) {
                                        if (e && 200 === e.statusCode && e.data && e.data.cc) {
                                            o().v("fetch 请求成功, 响应数据: ", e.data);
                                            var i = Object.create(null);
                                            le.each(e.data.cc, (function (e) {
                                                i[e.k] = e
                                            }));
                                            var a = {ts: Date.now(), params: i};
                                            o().v("开始缓存 fetch 请求的云配置结果..."), c.setStorage(r.STORAGE_NAME, le.JSONEncode(a), (function (e) {
                                                o().v("缓存云配置成功, 缓存数据为: ", a), o().v("缓存云配置成功, 成功消息为: ", e), o().v("云配拉取数据是否自动激活: ", t), e && t && (o().v("激活云配置..."), r.active({
                                                    params: i,
                                                    callback: n
                                                }))
                                            }))
                                        } else o().w("fetch 请求成功,返回结果异常 ", e.data), n && n()
                                    },
                                    fail: function (t) {
                                        o().w("fetch请求数据错误 ", e, t), n && n()
                                    }
                                })
                            } catch (e) {
                                o().w("urequest调用错误", e)
                            }
                        }))
                    }))
                }
            }
        };
        var we = {
            install: function (e, t) {
                return e.rc || (e.rc = new be), e.messager.once(e.messager.messageType.CONFIG_LOADED, (function () {
                    e._log.v("plugin rc installed")
                })), e.rc
            }
        }, Se = !1, ke = {
            install: function (e, t) {
                e.wxpluginwraper || (e.wxpluginwraper = function (t) {
                    Se || (t.onAppShow && t.onAppShow((function (t) {
                        e.resume(t)
                    })), t.onAppHide && t.onAppHide((function (t) {
                        e.pause(t)
                    })), Se = !0)
                })
            }
        }, Ie = "", Oe = {};

        function xe(e) {
            e && (Ie = e)
        }

        function Te(e, t) {
            if (e.onShareAppMessage) {
                var n = e.onShareAppMessage;
                e.onShareAppMessage = function (e) {
                    var r = n.call(this, e) || {}, i = function (e, t) {
                        if (!e) return "";
                        var n = [];
                        for (var r in t) "_um_ssrc" !== r && "_um_sts" !== r && n.push(r + "=" + t[r]);
                        var i = n.join("&");
                        return i ? e + "?" + i : e
                    }(Ie, Oe[Ie]);
                    !r.path && i && (r.path = i);
                    var o = t.trackShare.call(this, r);
                    return void 0 === o ? r : o
                }
            }
        }

        function Pe(e, t, n) {
            var r = e[t];
            e[t] = function (e) {
                n.call(this, e), r && r.call(this, e)
            }
        }

        function Ee(e) {
            try {
                pe.resume(e, !0)
            } catch (e) {
                o().v("onAppShow: ", e)
            }
        }

        function Ae() {
            try {
                pe.pause()
            } catch (e) {
                o().v("onAppHide: ", e)
            }
        }

        function De() {
            try {
                xe(this.route), pe.trackPageStart(this.route)
            } catch (e) {
                o().v("onPageShow: ", e)
            }
        }

        function Ce(e) {
            try {
                xe(this.route), e && (t = this.route, n = e, t && (Oe[t] = n)), o().v("Page onLoad: ", this.route, e)
            } catch (e) {
                o().v("onPageLoad: ", e)
            }
            var t, n
        }

        function $e() {
            try {
                pe.trackPageEnd(this.route)
            } catch (e) {
                o().v("onPageHide: ", e)
            }
        }

        try {
            var Ne = App;
            App = function (e) {
                Pe(e, "onLaunch", (function () {
                    !function (e) {
                        try {
                            pe.init(e)
                        } catch (e) {
                            o().v("onAppLaunch: ", e)
                        }
                    }(e.umengConfig)
                })), Pe(e, "onShow", Ee), Pe(e, "onHide", Ae), Ne(e)
            }
        } catch (i) {
            o().w("App重写异常")
        }
        try {
            var Re = Page;
            Page = function (e) {
                Pe(e, "onShow", De), Pe(e, "onHide", $e), Pe(e, "onUnload", $e), Pe(e, "onLoad", Ce), Te(e, pe), Re(e)
            }
        } catch (i) {
            o().w("Page重写异常")
        }
        try {
            var qe = Component;
            Component = function (e) {
                try {
                    e.methods = e.methods || {};
                    var t = e.methods;
                    Pe(t, "onShow", De), Pe(t, "onHide", $e), Pe(t, "onUnload", $e), Pe(t, "onLoad", Ce), Te(t, pe), qe(e)
                } catch (t) {
                    qe(e)
                }
            }
        } catch (i) {
            o().w("Component重写异常")
        }
        var Ue = pe.init;
        pe.init = function (e) {
            e && e.useOpenid && (o().tip_w(o().repeat("!")), o().tip_w("openid已开启，请确保使用setOpenid设置openid或通过设置autoGetOpenid为true，并在友盟后台设置secret由友盟帮您获取"), o().tip_w(o().repeat("!"))), Ue.call(pe, e)
        }, pe.use(we), pe.use(ke), wx.uma = pe, e.exports = pe
    }, 32387: function (e, t, n) {
        "use strict";
        n(28031), n(24287);
        var r = n(60539), i = n(44154), o = n(31121), a = n.n(o), s = n(12663), u = n(13283), c = n(18030),
            f = n(64226), p = n(4281), l = n(67777), d = n(27560), h = n(87811);
        h = h.default || h;
        var _ = {
            init: function () {
                var e = (0, u.Z)((0, s.Z)().mark((function e() {
                    return (0, s.Z)().wrap((function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if (!d.Nc) {
                                    e.next = 3;
                                    break
                                }
                                return a().getStorage({
                                    key: "openId", success: function (e) {
                                        _.identify(e.data)
                                    }, fail: function () {
                                    }
                                }), e.abrupt("return");
                            case 3:
                                return e.abrupt("return", new Promise((function (e) {
                                    a().login({
                                        success: function () {
                                            var t = (0, u.Z)((0, s.Z)().mark((function t(n) {
                                                var r, i;
                                                return (0, s.Z)().wrap((function (t) {
                                                    for (; ;) switch (t.prev = t.next) {
                                                        case 0:
                                                            if (!n.code) {
                                                                t.next = 6;
                                                                break
                                                            }
                                                            return t.next = 3, (0, l.BS)(n.code);
                                                        case 3:
                                                            r = t.sent, (i = r.unionid) && a().uma.setUnionid(i);
                                                        case 6:
                                                            e(!0);
                                                        case 7:
                                                        case"end":
                                                            return t.stop()
                                                    }
                                                }), t)
                                            })));
                                            return function (e) {
                                                return t.apply(this, arguments)
                                            }
                                        }(), fail: function () {
                                            e(!1)
                                        }
                                    })
                                })));
                            case 4:
                            case"end":
                                return e.stop()
                        }
                    }), e)
                })));
                return function () {
                    return e.apply(this, arguments)
                }
            }(), track: function (e, t) {
                t ? a().uma.trackEvent(e, t) : a().uma.trackEvent(e)
            }, pageView: function (e) {
                _.track("PageView", e)
            }, setEvar: function (e) {
                _.track("setEvar", e)
            }, setPage: function (e) {
                _.track("setPage", e)
            }, identify: function (e) {
                a().uma.setUnionid(e)
            }, getAnonymousID: function () {
                return h.getAnonymousID()
            }, login: function (e) {
                e && a().uma.setUserid(e)
            }, getDistinctID: function () {
                return h.getDistinctID()
            }, logout: function () {
                h.logout()
            }, setProfile: function (e) {
                h.setProfile(e)
            }, register: function (e) {
                h.registerApp(e)
            }, unRegister: function (e) {
                h.clearAppRegister([e])
            }, clearRegister: function () {
                h.clearAppRegister()
            }
        };
        Object.defineProperty(a(), "TrackSDK", {
            get: function () {
                return _
            }
        });
        var v = _, g = n(8235);
        var m = function (e, t) {
            return (m = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            })(e, t)
        };

        function y(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

            function n() {
                this.constructor = e
            }

            m(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }

        var b = function () {
            return (b = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        };

        function w(e, t) {
            var n = "function" == typeof Symbol && e[Symbol.iterator];
            if (!n) return e;
            var r, i, o = n.call(e), a = [];
            try {
                for (; (void 0 === t || t-- > 0) && !(r = o.next()).done;) a.push(r.value)
            } catch (e) {
                i = {error: e}
            } finally {
                try {
                    r && !r.done && (n = o.return) && n.call(o)
                } finally {
                    if (i) throw i.error
                }
            }
            return a
        }

        function S(e, t, n) {
            if (n || 2 === arguments.length) for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
            return e.concat(r || Array.prototype.slice.call(t))
        }

        var k = ["init", "start", "config", "beforeDestroy", "provide", "beforeReport", "report", "beforeBuild", "build", "beforeSend", "send", "beforeConfig"],
            I = function () {
                return {}
            };

        function O(e) {
            return e
        }

        function x(e) {
            return "object" == (0, g.Z)(e) && null !== e
        }

        var T = Object.prototype;

        function P(e) {
            if (x(e)) {
                if ("function" == typeof Object.getPrototypeOf) {
                    var t = Object.getPrototypeOf(e);
                    return t === T || null === t
                }
                return "[object Object]" === T.toString.call(e)
            }
            return !1
        }

        function E(e) {
            return "[object Array]" === T.toString.call(e)
        }

        function A(e) {
            return "function" == typeof e
        }

        function D(e) {
            return "number" == typeof e
        }

        function C(e) {
            return "string" == typeof e
        }

        function $(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }

        function N(e, t) {
            var n = b({}, e);
            for (var r in t) $(t, r) && void 0 !== t[r] && (x(t[r]) && P(t[r]) ? n[r] = N(x(e[r]) ? e[r] : {}, t[r]) : E(t[r]) && E(e[r]) ? n[r] = R(e[r], t[r]) : n[r] = t[r]);
            return n
        }

        function R(e, t) {
            var n = E(e) ? e : [], r = E(t) ? t : [];
            return Array.prototype.concat.call(n, r).map((function (e) {
                return e instanceof RegExp ? e : x(e) && P(e) ? N({}, e) : E(e) ? R([], e) : e
            }))
        }

        function q(e, t) {
            if (!E(e)) return !1;
            if (0 === e.length) return !1;
            for (var n = 0; n < e.length;) {
                if (e[n] === t) return !0;
                n++
            }
            return !1
        }

        function U(e) {
            return E(e) && e.length ? function (e) {
                for (var t = [], n = e.length, r = 0; r < n; r++) {
                    var i = e[r];
                    C(i) ? t.push(i.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")) : i && i.source && t.push(i.source)
                }
                return new RegExp(t.join("|"), "i")
            }(e) : null
        }

        function L(e) {
            try {
                return C(e) ? e : JSON.stringify(e)
            } catch (e) {
                return "[FAILED_TO_STRINGIFY]:" + String(e)
            }
        }

        var j = function (e) {
            return x(e) ? Object.keys(e).reduce((function (t, n) {
                return t + "&" + n + "=" + e[n]
            }), "").replace("&", "?") : ""
        }, M = function (e, t, n, r) {
            return void 0 === r && (r = !0), function () {
                for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
                if (!e) return I;
                var a = e[t], s = n.apply(void 0, S([a], w(i), !1)), u = s;
                return A(u) && r && (u = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    try {
                        return s.apply(this, e)
                    } catch (t) {
                        return A(a) && a.apply(this, e)
                    }
                }), e[t] = u, function (n) {
                    n || (u === e[t] ? e[t] = a : s = a)
                }
            }
        }, H = function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
        }, F = function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
        }, V = function (e) {
            return Math.random() < Number(e)
        }, B = function (e, t) {
            return e < Number(t)
        }, K = function (e) {
            return function (t) {
                for (var n = t, r = 0; r < e.length && n; r++) try {
                    n = e[r](n)
                } catch (e) {
                    H(e)
                }
                return n
            }
        };

        function G() {
            var e = function () {
                for (var e = new Array(16), t = 0, n = 0; n < 16; n++) 0 == (3 & n) && (t = 4294967296 * Math.random()), e[n] = t >>> ((3 & n) << 3) & 255;
                return e
            }();
            return e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, function (e) {
                for (var t = [], n = 0; n < 256; ++n) t[n] = (n + 256).toString(16).substr(1);
                var r = 0, i = t;
                return [i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]]].join("")
            }(e)
        }

        var z, J = function (e, t) {
            var n = e.common || {};
            return n.sample_rate = t, e.common = n, e
        }, Y = function (e, t, n, r, i) {
            return e ? (o = i(r, t), function () {
                return o
            }) : function () {
                return n(t)
            };
            var o
        }, Z = function e(t, n) {
            try {
                return "rule" === n.type ? function (e, t, n, r) {
                    var i = function (e, t, n) {
                        for (var r, i = w(t.split(".")), o = i[0], a = i.slice(1); e && a.length > 0;) e = e[o], o = (r = w(a))[0], a = r.slice(1);
                        if (e) return function (e, t) {
                            return e[t]
                        }(e, o)
                    }(e, t);
                    return void 0 !== i && function (e, t, n) {
                        switch (n) {
                            case"eq":
                                return q(t, e);
                            case"neq":
                                return !q(t, e);
                            case"gt":
                                return e > t[0];
                            case"gte":
                                return e >= t[0];
                            case"lt":
                                return e < t[0];
                            case"lte":
                                return e <= t[0];
                            case"regex":
                                return Boolean(e.match(new RegExp(t.join("|"))));
                            case"not_regex":
                                return !e.match(new RegExp(t.join("|")));
                            default:
                                return !1
                        }
                    }(i, function (e, t) {
                        return e.map((function (e) {
                            switch (t) {
                                case"number":
                                    return Number(e);
                                case"boolean":
                                    return "1" === e;
                                default:
                                    return String(e)
                            }
                        }))
                    }(r, "boolean" == typeof i ? "bool" : D(i) ? "number" : "string"), n)
                }(t, n.field, n.op, n.values) : "and" === n.type ? n.children.every((function (n) {
                    return e(t, n)
                })) : n.children.some((function (n) {
                    return e(t, n)
                }))
            } catch (t) {
                return !1
            }
        }, W = ["success", "fail", "complete"];
        !function (e) {
            e.onLaunch = "onLaunch", e.onShow = "onShow", e.onHide = "onHide", e.onError = "onError", e.onPageNotFound = "onPageNotFound", e.onUnhandledRejection = "onUnhandledRejection"
        }(z || (z = {}));
        var X = ["request", "downloadFile", "uploadFile"],
            Q = ["navigateTo", "redirectTo", "switchTab", "reLaunch"],
            ee = S(S([], w(Q), !1), ["navigateBack"], !1),
            te = S(S([], w([z.onLaunch, z.onShow, z.onHide]), !1), [z.onError, z.onPageNotFound, z.onUnhandledRejection], !1),
            ne = ["attached", "onInit"], re = ["onLoad", "onShow", "onReady", "onUnload", "onHide"],
            ie = function (e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            }, oe = function () {
                return Date.now()
            };

        function ae(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            if (!A(e)) return 0;
            var r = oe(), i = r;
            try {
                e.apply(this, t)
            } finally {
                i = oe()
            }
            return i - r
        }

        var se, ue = function () {
            }, ce = w((se = "tt", [function () {
                return se
            }, function (e) {
                return se = e
            }]), 2), fe = ce[0], pe = (ce[1], function (e, t) {
                function n(n) {
                    return t(n), e.call(this, n)
                }

                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                return n
            }), le = function (e, t, n) {
                var r = e[t];
                if (!r || !r.__HOOKED__) return Object.defineProperty(e, t, {
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                    value: function () {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        try {
                            var i = n.apply(this, e);
                            i && (e = i)
                        } catch (e) {
                            H(e)
                        }
                        return r.apply(this, e)
                    }
                }), e[t] && (e[t].__HOOKED__ = !0), function () {
                    e[t].__HOOKED__ = !1, n = ue
                }
            }, de = function () {
                var e = {instance: null};
                return e.instance || ("undefined" != typeof tt ? e = {
                    instance: tt,
                    platform: fe()
                } : "undefined" != typeof my ? e = {
                    instance: my,
                    platform: "my"
                } : "undefined" != typeof swan ? e = {
                    instance: swan,
                    platform: "swan"
                } : "undefined" != typeof wx && (e = {instance: wx, platform: "wx"})), e
            }, he = {
                app: {},
                page: {},
                route: {},
                http: {},
                component: {},
                setData: null,
                performance: null,
                instance: null
            }, _e = function (e, t) {
                void 0 === e && (e = {}), void 0 === t && (t = de().instance);
                var n = t ? t["__slardar__global__0.2.4"] || (t["__slardar__global__0.2.4"] = e) : e;
                return {
                    setGlobalValue: function (e, t) {
                        n[e] = t
                    }, mergeGlobalValue: function (e, t) {
                        n[e] = b(b({}, n[e]), t)
                    }, getGlobalValue: function (e) {
                        return n[e]
                    }, getGlobalEntirely: function () {
                        return n
                    }, destroy: function () {
                        n = b({}, he), t && (t["__slardar__global__0.2.4"] = n)
                    }
                }
            }(b({}, he)), ve = _e.setGlobalValue, ge = _e.mergeGlobalValue, me = _e.getGlobalValue,
            ye = function (e, t) {
                Object.keys(t).forEach((function (n) {
                    t[n].addTearDown((function () {
                        var t;
                        return ge(e, ((t = {})[n] = null, t))
                    }))
                }))
            }, be = function (e, t) {
                t.addTearDown((function () {
                    return ve(e, null)
                }))
            }, we = function (e) {
                return me("app")[e]
            }, Se = function (e) {
                return me("page")[e]
            }, ke = function (e) {
                return me("route")[e]
            }, Ie = function (e) {
                return !!me("route")[e]
            }, Oe = function (e, t) {
                void 0 === t && (t = ee), t.forEach((function (t) {
                    Ie(t) && ke(t).subscribe((function (n) {
                        return e(n, t)
                    }))
                }))
            }, xe = function (e) {
                return me("http")[e]
            }, Te = function (e) {
                return !!me("http")[e]
            }, Pe = function () {
                return me("setData")
            }, Ee = function () {
                return me("performance")
            }, Ae = function () {
                return !!me("performance")
            }, De = function (e) {
                return me("component")[e]
            }, Ce = function () {
                return me("instance")
            }, $e = function (e) {
                ve("instance", e)
            };

        function Ne(e) {
            return "function" == typeof e
        }

        function Re(e, t) {
            if (e) {
                var n = e.indexOf(t);
                0 <= n && e.splice(n, 1)
            }
        }

        function qe(e) {
            return e
        }

        function Ue(e) {
            return function (t) {
                if (function (e) {
                    return e && Ne(e.lift)
                }(t)) return t.lift((function (t) {
                    try {
                        return e(t, this)
                    } catch (e) {
                        this.error(e)
                    }
                }));
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }

        function Le(e) {
            return 0 === e.length ? qe : 1 === e.length ? e[0] : function (t) {
                return e.reduce((function (e, t) {
                    return t(e)
                }), t)
            }
        }

        var je = function (e) {
            Ne(e) ? e() : null == e || e.unsubscribe()
        }, Me = function () {
            function e(e) {
                this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null
            }

            return e.prototype.unsubscribe = function () {
                var e = this;
                if (!this.closed) {
                    this.closed = !0;
                    var t = this, n = t._parentage, r = t._finalizers, i = t.initialTeardown;
                    n && (this._parentage = null, n.forEach((function (t) {
                        return t.remove(e)
                    }))), Ne(i) && i(), r && (this._finalizers = null, r.forEach(je))
                }
            }, e.prototype.remove = function (t) {
                this._finalizers && Re(this._finalizers, t), t instanceof e && t._removeParent(this)
            }, e.prototype.add = function (t) {
                if (t && t !== this) if (this.closed) je(t); else {
                    if (t instanceof e) {
                        if (t.closed || t._hasParent(this)) return;
                        t._addParent(this)
                    }
                    var n = this._finalizers;
                    this._finalizers = n ? (n.push(t), n) : [t]
                }
            }, e.prototype._addParent = function (e) {
                var t = this._parentage;
                this._parentage = t ? (t.push(e), t) : [e]
            }, e.prototype._hasParent = function (e) {
                return this._parentage && ~this._parentage.indexOf(e)
            }, e.prototype._removeParent = function (e) {
                this._parentage && Re(this._parentage, e)
            }, e
        }(), He = function (e) {
            function t(t) {
                var n, r = e.call(this) || this;
                return r.isStopped = !1, r.destination = Ve(t) ? t : new Fe(!(n = t) || Ne(n) ? {next: null != n ? n : void 0} : n), r
            }

            return y(t, e), t.prototype.next = function (e) {
                this.isStopped || this.destination.next(e)
            }, t.prototype.error = function (e) {
                if (!this.isStopped) {
                    this.isStopped = !0;
                    try {
                        this.destination.error(e)
                    } finally {
                        this.unsubscribe()
                    }
                }
            }, t.prototype.complete = function () {
                this.isStopped || (this.isStopped = !0, this._complete())
            }, t.prototype.unsubscribe = function () {
                this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null)
            }, t.prototype._complete = function () {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }, t
        }(Me), Fe = function () {
            function e(e) {
                this.partialObserver = e
            }

            return e.prototype.next = function (e) {
                var t = this.partialObserver;
                if (t.next) try {
                    t.next(e)
                } catch (e) {
                }
            }, e.prototype.error = function (e) {
                var t = this.partialObserver;
                if (t.error) try {
                    t.error(e)
                } catch (e) {
                }
            }, e.prototype.complete = function () {
                var e = this.partialObserver;
                if (e.complete) try {
                    e.complete()
                } catch (e) {
                }
            }, e
        }();

        function Ve(e) {
            return e instanceof He || e && function (e) {
                return e && Ne(e.next) && Ne(e.error) && Ne(e.complete)
            }(e) && function (e) {
                return e instanceof Me || e && "closed" in e && Ne(e.remove) && Ne(e.add) && Ne(e.unsubscribe)
            }(e)
        }

        var Be = function () {
            function e(e) {
                e && (this._subscribe = e)
            }

            return e.prototype.subscribe = function (e) {
                var t = Ve(e) ? e : new He(e), n = this.operator, r = this.source;
                return t.add(n ? n.call(t, r) : this._trySubscribe(t)), t
            }, e.prototype.lift = function (t) {
                var n = new e;
                return n.source = this, n.operator = t, n
            }, e.prototype.pipe = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return Le(e)(this)
            }, e.prototype._subscribe = function (e) {
            }, e.prototype._trySubscribe = function (e) {
                try {
                    return this._subscribe(e)
                } catch (t) {
                    e.error(t)
                }
            }, e
        }(), Ke = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.closed = !1, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t
            }

            var n;
            return y(t, e), t.prototype.next = function (e) {
                this._throwIfClosed(), this.isStopped || this.observers.forEach((function (t) {
                    return t.next(e)
                }))
            }, t.prototype.commonJudgement = function (e) {
                this._throwIfClosed(), this.isStopped || (this.isStopped = !0, e())
            }, t.prototype.error = function (e) {
                var t = this;
                this.commonJudgement((function () {
                    var n = t.observers;
                    for (t.hasError = !0, t.thrownError = e; n.length;) n.shift().error(e)
                }))
            }, Object.defineProperty(t.prototype, "observed", {
                get: function () {
                    return this.observers && this.observers.length > 0
                }, enumerable: !1, configurable: !0
            }), t.prototype.complete = function () {
                var e = this;
                this.commonJudgement((function () {
                    for (var t = e.observers; t.length;) t.shift().complete()
                }))
            }, t.prototype.unsubscribe = function () {
                this.isStopped = this.closed = !0, this.observers = null
            }, t.prototype._throwIfClosed = function () {
                this.closed
            }, t.prototype._subscribe = function (e) {
                return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e)
            }, t.prototype._checkFinalizedStatuses = function (e) {
                var t = this, n = t.hasError, r = t.thrownError, i = t.isStopped;
                n ? e.error(r) : i && e.complete()
            }, t.prototype._innerSubscribe = function (e) {
                var n = this.isStopped, r = this.observers;
                return n ? t.EMPTY : (r.push(e), new Me((function () {
                    Re(r, e)
                })))
            }, t.EMPTY = ((n = new Me).closed = !0, n), t
        }(Be), Ge = new Be((function (e) {
            return e.complete()
        }));

        function ze(e) {
            return e <= 0 ? function () {
                return Ge
            } : Ue((function (t, n) {
                var r = 0;
                t.subscribe((function (t) {
                    ++r <= e && (n.next(t), e <= r && n.complete())
                }))
            }))
        }

        function Je(e, t) {
            return Ue((function (n, r) {
                var i = 0;
                n.subscribe((function (n) {
                    return e.call(t, n, i++) && r.next(n)
                }))
            }))
        }

        function Ye(e) {
            return Je((function (t, n) {
                return e <= n
            }))
        }

        var Ze, We = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.tearDownFns = [], t
            }

            return y(t, e), t.prototype.subscribe = function (t) {
                var n = this, r = e.prototype.subscribe.call(this, t), i = function () {
                    n.observed || n.unsubscribe()
                };
                Ce() && Ce()._subscriptions.push(r);
                var o = r.unsubscribe;
                return r.unsubscribe = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    o.apply(this, e), i()
                }, r
            }, t.prototype.unsubscribe = function () {
                e.prototype.unsubscribe.call(this), this.tearDownFns.forEach((function (e) {
                    return e()
                }))
            }, t.prototype.addTearDown = function (e) {
                this.tearDownFns.push(e)
            }, t
        }(Ke), Xe = function (e) {
            var t = e.reduce((function (e, t) {
                return e[t] = new We, e
            }), {});
            return {
                getSubject: function (e) {
                    return t[e]
                }, subjectMap: t
            }
        }, Qe = function (e) {
            return e.length > 1 ? e : e.length && e[0] || {}
        }, et = w((Ze = {}, [function (e) {
            if (!de().platform) throw Error("Not support current Mini Program");
            if (!Array.isArray(e) || !e.length) return null;
            var t = e.find((function (e) {
                return e.platform === de().platform
            }));
            return t && (Ze = t.adapterCtor())
        }, function () {
            return Ze
        }]), 2), nt = et[0], rt = et[1], it = function (e) {
            return "SLARDAR" + e
        }, ot = function (e) {
            return e.route || e.__route__ || e.url || e.path || ""
        }, at = function (e) {
            var t = ["attached"], n = e.filter((function (e) {
                return ~t.indexOf(e)
            })), r = function (e, t) {
                n.forEach((function (n) {
                    M(e, n, (function (e) {
                        return function () {
                            for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                            De(n).next({that: this, param: null, time: oe()});
                            var o = t[n];
                            if (A(o) && o.apply(this, r), A(e)) return e.apply(this, r)
                        }
                    }))()
                }))
            };
            try {
                Component = pe(Component, (function (e) {
                    x(e.lifetimes) ? r(e.lifetimes, e) : void 0 !== e.lifetimes && null !== e.lifetimes || (e.lifetimes = {}, r(e.lifetimes, e))
                }))
            } catch (e) {
            }
        }, st = function (e) {
            var t = {}, n = null, r = function () {
                t.navigate_name = t.navigate_name || "native", t.load_start = t.load_start || 0, t.dom_end = t.dom_end || 0, t.render_end = t.render_end || 0
            }, i = function () {
                t.navigate_start && (e(b({}, t)), t.navigate_name = "", t.navigate_start = 0, n = !0)
            };
            Oe((function (e, r) {
                "invoke" === e.param.name && (n = !1, t = {navigate_start: e.time, navigate_name: r})
            }), Q), Se("onLoad").pipe(Ye(1)).subscribe((function (e) {
                t.load_start = e.time
            })), Se("onShow").pipe(Ye(1)).subscribe((function (e) {
                t.dom_end = e.time
            })), Se("onReady").pipe(Ye(1)).subscribe((function (e) {
                t.render_end = e.time, r(), i()
            })), we(z.onHide).subscribe((function () {
                !1 === n && (r(), i())
            }))
        }, ut = function (e) {
            var t = ["downloadPackage", "evaluateScript", "fcp", "fp", "fr"];
            Ee().subscribe((function (n) {
                ~t.indexOf(n.name) && e(n)
            }))
        }, ct = function (e) {
            De("attached").subscribe((function (t) {
                var n = t.that;
                return e.call(n)
            }))
        }, ft = function (e) {
            return "android" === e.toLowerCase()
        }, pt = ["darwin", "macs", "mac"], lt = ["windows_nt", "windows", "window"], dt = function (e) {
            return ft(e) ? "Android" : function (e) {
                return "ios" === e.toLowerCase()
            }(e) ? "iOS" : function (e) {
                return ~pt.indexOf(e.toLowerCase())
            }(e) ? "Mac" : function (e) {
                return ~lt.indexOf(e.toLowerCase())
            }(e) ? "windows" : "unknown"
        }, ht = function (e) {
            var t = e.systemPlatform, n = e.pixelRatio, r = e.width, i = e.height;
            return t && ft(t) && n ? r / n + " * " + i / n : r + " * " + i
        }, _t = function () {
            var e = wx.getAccountInfoSync().miniProgram, t = wx.getSystemInfoSync(), n = t.model, r = t.brand,
                i = t.pixelRatio, o = t.screenHeight, a = t.screenWidth, s = t.windowHeight, u = t.windowWidth,
                c = t.language, f = t.version, p = t.system, l = t.platform, d = t.SDKVersion;
            return {
                model: n,
                brand: r,
                pixelRatio: i,
                screenArea: ht({width: a, height: o}),
                windowArea: ht({width: u, height: s}),
                language: c,
                osName: dt(l),
                osVersion: p,
                SDKVersion: d,
                appId: e.appId,
                miniEnv: e.envVersion,
                miniVersion: e.version,
                hostName: "wx",
                hostVersion: f,
                platform: "wx"
            }
        }, vt = function (e) {
            switch (e) {
                case"appLaunch":
                    return "appClick";
                case"firstRender":
                    return "fr";
                case"firstPaint":
                    return "fp";
                case"firstContentfulPaint":
                    return "fcp";
                case"largestContentfulPaint":
                    return "lcp";
                default:
                    return e
            }
        }, gt = {
            platform: "wx", adapterCtor: function () {
                return b(b({}, function (e) {
                    return void 0 === e && (e = de().instance), {
                        instance: e,
                        request: function (t) {
                            return e.request(t)
                        },
                        getStorage: function (t) {
                            return e.getStorageSync(t)
                        },
                        setStorage: function (t, n) {
                            return e.setStorageSync(t, n)
                        },
                        getCurrentPages: function (e) {
                            function t() {
                                return e.apply(this, arguments)
                            }

                            return t.toString = function () {
                                return e.toString()
                            }, t
                        }((function () {
                            return getCurrentPages()
                        })),
                        buildHttpPayload: function (e) {
                            return e
                        },
                        monitorNetworkType: function (t) {
                            e.getNetworkType({
                                success: function (e) {
                                    t && t({networkType: e.networkType})
                                }
                            }), e.onNetworkStatusChange((function (e) {
                                t && t({networkType: e.networkType})
                            }))
                        },
                        performanceSubscriber: I,
                        getSystemInfo: I,
                        buildRequestProfile: I,
                        componentSubject: I,
                        setDataSubject: I,
                        pagePerfSubscriber: I
                    }
                }()), {
                    miniPlatform: "wx", buildError: function (e) {
                        return C(e) ? function (e) {
                            var t = e.split("\n");
                            return {
                                name: w((t[2] && t[2].split(":") || []).map((function (e) {
                                    return e.trim()
                                })), 1)[0], message: t && t[1] && t[1].trim(), stack: t.slice(2).join("\n")
                            }
                        }(e) : function (e) {
                            return {name: "unknown_error_name", message: L(e)}
                        }(e)
                    }, getSystemInfo: _t, observePerformance: function (e) {
                        var t = wx.getPerformance && wx.getPerformance();
                        if (t) {
                            var n = t.createObserver((function (t) {
                                var n = t.getEntries().map((function (e) {
                                    return b(b({}, e), {name: vt(e.name)})
                                }));
                                e(n)
                            }));
                            return n.observe({entryTypes: n.supportedEntryTypes}), n
                        }
                    }, performanceSubscriber: ut, buildRequestProfile: function (e) {
                        return function (e) {
                            var t = function (e) {
                                return function (e) {
                                    var t = {};
                                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && null != e[n] && (t[n] = e[n]);
                                    return t
                                }({
                                    domainLookupStart: e.domainLookupStart,
                                    domainLookupEnd: e.domainLookupEnd,
                                    connectStart: e.connectStart,
                                    secureConnectionStart: e.SSLconnectionStart,
                                    connectEnd: e.connectEnd,
                                    requestStart: e.requestStart,
                                    requestEnd: e.requestEnd,
                                    responseStart: e.responseStart,
                                    responseEnd: e.responseEnd,
                                    socketReused: e.socketReused,
                                    redirectStart: e.redirectStart,
                                    redirectEnd: e.redirectEnd,
                                    fetchStart: e.fetchStart,
                                    sendBytesCount: e.sendBytesCount,
                                    throughputKbps: e.throughputKbps,
                                    receivedBytedCount: e.receivedBytedCount
                                })
                            }(e);
                            return e.protocol && (t.protocol = e.protocol), t
                        }(e)
                    }, componentSubject: at, pagePerfSubscriber: st, setDataSubject: ct
                })
            }
        }, mt = function (e, t) {
            return "uploadFile" === e ? "POST" : "downloadFile" === e ? "GET" : t || "GET"
        };

        function yt() {
            var e = ot(this), t = Pe(), n = le(this, "setData", (function () {
                for (var n = this, r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                var o = r[0], a = oe(), s = function () {
                    var i = r[1], s = oe() - a;
                    t.next({renderTime: s, url: e, data: o, startTime: a}), i && i.call(n)
                };
                return [o, s]
            }));
            n && t.addTearDown(n)
        }

        var bt = function (e) {
                e.on("init", (function () {
                    var e = rt();
                    if (e.observePerformance && !Ae()) {
                        var t = (0, Xe(["performance"]).getSubject)("performance");
                        !function (e) {
                            ve("performance", e), be("performance", e)
                        }(t);
                        var n = e.observePerformance((function (e) {
                            e.forEach((function (e) {
                                t.next(e)
                            }))
                        }));
                        n && n.disconnect && t.addTearDown((function () {
                            return n.disconnect()
                        }))
                    }
                }))
            }, wt = new RegExp("(cookie|auth|jwt|token|key|ticket|secret|credential|session|password)", "i"),
            St = new RegExp("(bearer|session)", "i"), kt = function (e) {
                return Object.keys(e).reduce((function (t, n) {
                    var r, i;
                    return r = n, i = e[n], r && i && (wt.test(r) || St.test(i)) || (t[n] = e[n]), t
                }), {})
            }, It = function () {
                return function (e, t) {
                    var n = e.hookRequest, r = e.hookDownloadFile, i = e.hookUploadFile, o = e.ignoreUrls,
                        a = e.collectBodyOnError, s = e.extraExtractor, u = function (e) {
                            if (!function (e, t) {
                                var n = U(e || []);
                                return !!n && n.test(t)
                            }(o, e.request.url)) {
                                var n = e.response, r = e.request, i = e.api, u = e.duration, c = e.failCallbackTime,
                                    f = e.successCallbackTime, p = e.completeCallbackTime;
                                r.headers = kt(r.headers || {}), n.headers = kt(n.headers || {});
                                var l = n.errMsg, d = function (e, t) {
                                    var n = {};
                                    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                                        var i = 0;
                                        for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                                    }
                                    return n
                                }(n, ["errMsg"]), h = b(b({}, d), {is_custom_error: !1});
                                l && (h.err_msg = l);
                                var _, v = {api: i, request: r, duration: u, cbTime: p + (c || 0) + (f || 0), response: h};
                                if (A(s)) {
                                    var g = s(n.body, v);
                                    g && (v.extra = g, v.response.is_custom_error = !0)
                                }
                                a && (0 === (_ = n.status) || _ >= 400) || (delete v.request.body, delete v.response.body), t({
                                    ev_type: "http",
                                    payload: v
                                })
                            }
                        };
                    n && xe("request").subscribe(u), r && xe("downloadFile").subscribe(u), i && xe("uploadFile").subscribe(u)
                }
            }, Ot = function (e, t, n, r) {
                void 0 === t && (t = {}), void 0 === r && (r = []);
                try {
                    var i = e.apply(void 0, S([], w(r), !1));
                    return i && i(t, n) || []
                } catch (e) {
                    return H("applyMonitor", e), []
                }
            };

        function xt(e, t, n) {
            var r;
            $e(e);
            var i = null === (r = e.config()) || void 0 === r ? void 0 : r.plugins[t];
            return x(i) ? b(b({}, n), i) : !!i && n
        }

        var Tt, Pt = {
            hookRequest: !0,
            hookDownloadFile: !0,
            hookUploadFile: !0,
            ignoreUrls: [],
            collectBodyOnError: !1
        }, Et = function (e) {
            e.on("init", (function () {
                var t = xt(e, "http", Pt);
                if (t) {
                    var n = t.hookRequest, r = t.hookDownloadFile, i = t.hookUploadFile, o = [];
                    n && o.push("request"), r && o.push("downloadFile"), i && o.push("uploadFile"), function (e, t) {
                        void 0 === t && (t = X), e.on("init", (function () {
                            !function (e, t) {
                                void 0 === t && (t = rt().instance);
                                var n = e.filter((function (e) {
                                    return !Te(e)
                                })), r = Xe(n).subjectMap;
                                !function (e) {
                                    ge("http", e), ye("http", e)
                                }(r), n.forEach((function (e) {
                                    var n = le(t, e, (function (t) {
                                        !function (e, t) {
                                            var n = t.url, r = t.method, i = t.data, o = t.header, a = t.headers,
                                                s = {
                                                    api: e,
                                                    request: {
                                                        url: n,
                                                        method: mt(e, r),
                                                        headers: o || a || {},
                                                        body: L(i),
                                                        timestamp: oe()
                                                    },
                                                    response: {}
                                                };
                                            M(t, "complete", (function (t) {
                                                return function (n) {
                                                    var r = s.response.timestamp || oe();
                                                    s.duration = r - s.request.timestamp, s.completeCallbackTime = ae(t, n);
                                                    var i, o, a, u = n.errMsg || n.errorMessage || n.error;
                                                    s.response = {
                                                        status: (i = n.status, o = n.statusCode, a = s.response.status, i >= 0 ? i : o >= 0 ? o : a),
                                                        timestamp: r,
                                                        headers: n.header || n.headers || {},
                                                        body: L(n.data),
                                                        errMsg: u,
                                                        timing: rt().buildRequestProfile(n.profile || {})
                                                    }, xe(e).next(s)
                                                }
                                            }))(), M(t, "success", (function (e) {
                                                return function (t) {
                                                    s.response.timestamp = oe(), s.response.status = 200, s.successCallbackTime = ae(e, t)
                                                }
                                            }))(), M(t, "fail", (function (e) {
                                                return function (t) {
                                                    s.response.timestamp = oe(), s.response.status = -1, s.failCallbackTime = ae(e, t)
                                                }
                                            }))()
                                        }(e, t)
                                    }));
                                    n && r[e].addTearDown(n)
                                }))
                            }(t)
                        }))
                    }(e, o), Ot(It, t, e.report.bind(e))
                }
            }))
        }, At = function (e, t) {
            return e && t && e === t
        }, Dt = function (e) {
            return void 0 === e && (e = rt()), function (t, n) {
                var r = t.ignoreErrors, i = t.hookOnError, o = t.hookOnUnhandledRejection, a = t.hookRouteError,
                    s = t.dedupe, u = U(r), c = function () {
                        var e;
                        return function (t) {
                            try {
                                if (function (e, t) {
                                    return !(!e || !t || !At(e.message, t.message) && !At(e.stack, t.stack))
                                }(t, e)) return void (e = t)
                            } catch (e) {
                            }
                            return e = t, t
                        }
                    }(), f = function (e, t, r) {
                        var i = s ? c(e) : e;
                        if (i) {
                            if (u && u.test(i.message)) return;
                            var o = {error: i};
                            t && (o.extra = t), r && (o.react = r), n(o)
                        }
                    };
                return i && we(z.onError).subscribe((function (t) {
                    var n = t.param, r = e.buildError(n);
                    u && u.test(r.message) || f(r)
                })), o && we(z.onUnhandledRejection).subscribe((function (e) {
                    var t = e.param || {}, n = t.promise, r = L(t.reason);
                    u && u.test(r) || n.catch(O).then((function (e) {
                        var t = {name: "UnhandledRejection", message: r};
                        e && e.stack && (t.stack = e.stack), f(t)
                    }))
                })), a && ~["tt", "wx", "lark"].indexOf(e.miniPlatform) && Oe((function (e) {
                    return function (e) {
                        "fail" === e.name && f({name: "RouteError", message: e.value.errMsg})
                    }(e.param)
                })), [f]
            }
        };
        !function (e) {
            e.history = "history", e.manual = "manual"
        }(Tt || (Tt = {}));
        var Ct = function () {
                return function (e, t) {
                    var n = e.extractPid, r = e.routeMode, i = w(function (e, t, n) {
                        var r = "", i = null, o = 0, a = "launch";
                        we(z.onShow).pipe(Ye(1)).subscribe((function () {
                            a = "show"
                        })), Oe((function () {
                            a = "history"
                        }));
                        var s = function (t, a) {
                            r = a, o = oe(), n(a, i = a + "_" + o), e(t, a)
                        };
                        return [s, function (e) {
                            e && (s(a, e), a = "history")
                        }, function (t) {
                            void 0 === t && (t = "hide"), i && (n(r, i), i = null, e(t, r, oe() - o))
                        }]
                    }((function (e, n, r) {
                        !function (e, n, r) {
                            t({ev_type: "pageview", payload: {pid: n, source: e, duration: r}})
                        }(e, n, r)
                    }), 0, e.setPidAndViewId), 3), o = i[0], a = i[1], s = i[2];
                    if (r !== Tt.manual) {
                        Se("onShow").subscribe((function (e) {
                            return function (e) {
                                var t, r = (t = ot(e), n ? n(t) : t);
                                a(r)
                            }(e.that)
                        })), Se("onUnload").subscribe(s.bind(null, "unload")), Se("onHide").subscribe(s.bind(null, "hide"))
                    }
                    return [o.bind(null, "user_set"), s]
                }
            }, $t = function () {
                return function (e) {
                    var t = w(function (e, t, n) {
                        void 0 === e && (e = 20), void 0 === t && (t = O), void 0 === n && (n = function (e, t) {
                            return e.slice(-t)
                        });
                        var r = [];
                        return [function () {
                            return r
                        }, function (i) {
                            if (t(i)) {
                                var o = b(b({}, i), {timestamp: i.timestamp || Date.now()});
                                r = e >= 0 && r.length + 1 > e ? n(S(S([], w(r), !1), [o], !1), e) : S(S([], w(r), !1), [o], !1)
                            }
                        }]
                    }(e.maxBreadcrumbs, e.onAddBreadcrumb, e.onMaxBreadcrumbs), 2), n = t[0], r = t[1];
                    return X.forEach((function (e) {
                        Te(e) && xe(e).subscribe((function (e) {
                            r({
                                type: "http",
                                category: e.api,
                                message: "",
                                data: {
                                    method: e.request.method,
                                    url: e.request.url,
                                    status_code: String(e.response.status)
                                },
                                timestamp: e.request.timestamp
                            })
                        }))
                    })), Oe((function (e, t) {
                        var n = e.param, i = e.time;
                        "complete" === n.name && r({
                            type: "route",
                            category: t,
                            message: n.value.errMsg || n.value.errorMessage || "",
                            timestamp: i,
                            data: {url: n.url || ""}
                        })
                    })), [n, r]
                }
            }, Nt = function () {
                return function (e, t) {
                    var n = e.isCalculateSize;
                    Pe().subscribe((function (e) {
                        var r, i = {duration: e.renderTime, start_time: e.startTime};
                        n && (i.size = (r = e.data, TextEncoder ? (new TextEncoder).encode(L(r)).length : 2 * L(r).length)), t({
                            ev_type: "set_data",
                            payload: i
                        })
                    }))
                }
            }, Rt = function () {
                return function (e, t) {
                    var n = {activate_start: 0, init_end: 0, page_load_start: 0, page_dom_end: 0, page_render_end: 0},
                        r = !1, i = function () {
                            t({ev_type: "app_launch_perf", payload: n}), r = !0
                        };
                    we(z.onLaunch).pipe(ze(1)).subscribe((function (e) {
                        n.activate_start = e.time
                    })), we(z.onShow).pipe(ze(1)).subscribe((function (e) {
                        n.init_end = e.time
                    })), Se("onLoad").pipe(ze(1)).subscribe((function (e) {
                        n.page_load_start = e.time
                    })), Se("onShow").pipe(ze(1)).subscribe((function (e) {
                        n.page_dom_end = e.time
                    }));
                    var o = Ae();
                    Se("onReady").pipe(ze(1)).subscribe((function (e) {
                        n.page_render_end = e.time, o && !n.trigger || i()
                    })), o && Ee().pipe(Je((function (e) {
                        return "appClick" === e.name
                    })), ze(1)).subscribe((function (e) {
                        n.trigger = e.startTime, n.page_render_end && i()
                    })), we(z.onHide).subscribe((function () {
                        r || i()
                    }))
                }
            }, qt = function () {
                return function (e, t) {
                    rt().pagePerfSubscriber((function (e) {
                        return t({ev_type: "page_perf", payload: e})
                    }))
                }
            }, Ut = function (e) {
                return void 0 === e && (e = rt()), function (t, n) {
                    if (Ae() && e.performanceSubscriber) {
                        var r, i = 0;
                        Se("onLoad").subscribe((function (e) {
                            r = e.time, i++
                        })), e.performanceSubscriber((function (e) {
                            var t = {is_custom: !1, name: e.name, value: e.startTime, type: "perf", count: i};
                            t.duration = e.duration || (r ? e.startTime - r : 0), t.is_support = t.duration >= 0, n({
                                ev_type: "performance",
                                payload: t
                            })
                        }))
                    }
                }
            }, Lt = {
                routeMode: Tt.history, setPidAndViewId: function (e, t) {
                }
            }, jt = {ignoreErrors: [], hookOnError: !0, hookOnUnhandledRejection: !0, hookRouteError: !0, dedupe: !0},
            Mt = {maxBreadcrumbs: 20, tap: !0}, Ht = function (e) {
                e.on("init", (function () {
                    e.provide("_subscriptions", []), $e(e), function (e) {
                        e.on("init", (function () {
                            (function (e) {
                                var t = e.filter((function (e) {
                                    return t = e, !me("app")[t];
                                    var t
                                }));
                                !function (e) {
                                    ge("app", e), ye("app", e)
                                }(Xe(t).subjectMap), App = pe(App, (function (e) {
                                    t.forEach((function (t) {
                                        var n = we(t), r = M(e, t, (function (e) {
                                            return function () {
                                                for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                                                n.next({that: this, param: Qe(t), time: oe()}), A(e) && e.apply(this, t)
                                            }
                                        }))();
                                        r && n.addTearDown(r)
                                    }))
                                }))
                            })(te), function (e, t) {
                                var n = e.filter((function (e) {
                                    return t = e, !me("page")[t];
                                    var t
                                }));
                                !function (e) {
                                    ge("page", e), ye("page", e)
                                }(Xe(n).subjectMap);
                                var r = function (e) {
                                    n.forEach((function (t) {
                                        var n = Se(t), r = M(e, t, (function (e) {
                                            return function () {
                                                for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                                                if (ot(this) && n.next({
                                                    that: this,
                                                    param: Qe(t),
                                                    time: oe()
                                                }), A(e)) return e.apply(this, t)
                                            }
                                        }))();
                                        r && n.addTearDown(r)
                                    }))
                                };
                                !function (e) {
                                    Page = pe(Page, e)
                                }(r), function (e) {
                                    var t = function (t) {
                                        ie(t.methods) ? e(t.methods) : void 0 !== t.methods && null !== t.methods || (t.methods = {}, e(t.methods))
                                    };
                                    try {
                                        Component = pe(Component, t), Behavior = pe(Behavior, t)
                                    } catch (e) {
                                    }
                                }(r)
                            }(re), function (e) {
                                var t = e.filter((function (e) {
                                    return t = e, !me("component")[t];
                                    var t
                                }));
                                !function (e) {
                                    ge("component", e), ye("component", e)
                                }(Xe(t).subjectMap), rt().componentSubject(t)
                            }(ne)
                        }))
                    }(e), function (e) {
                        e.on("init", (function () {
                            !function (e) {
                                var t = e.filter((function (e) {
                                    return !Ie(e)
                                })), n = Xe(t).subjectMap;
                                !function (e) {
                                    ge("route", e), ye("route", e)
                                }(n), t.forEach((function (e) {
                                    var t = le(rt().instance, e, (function (t) {
                                        void 0 === t && (t = {}), ke(e).next({
                                            that: this,
                                            param: {
                                                url: t.url,
                                                delta: t.delta,
                                                name: "invoke",
                                                value: {errMsg: "invoke"}
                                            },
                                            time: oe()
                                        }), W.forEach((function (n) {
                                            M(t, n, (function (r) {
                                                return function () {
                                                    for (var i = [], o = 0; o < arguments.length; o++) i[o] = arguments[o];
                                                    ke(e).next({
                                                        that: this,
                                                        param: {
                                                            url: t.url,
                                                            delta: t.delta,
                                                            name: n,
                                                            value: Qe(i) || {}
                                                        },
                                                        time: oe()
                                                    }), A(r) && r.apply(this, i)
                                                }
                                            }))()
                                        }))
                                    }));
                                    t && n[e].addTearDown(t)
                                }))
                            }(ee)
                        }))
                    }(e)
                })), e.on("beforeDestroy", (function () {
                    if (e._subscriptions) for (; e._subscriptions.length;) e._subscriptions.shift().unsubscribe();
                    for (var t in e) delete e[t]
                }))
            }, Ft = {isCalculateSize: !1}, Vt = function (e) {
                e.on("init", (function () {
                    var t = xt(e, "setData", Ft);
                    t && (function (e) {
                        e.on("init", (function () {
                            (function () {
                                var e;
                                me("setData") || (e = (0, Xe(["setData"]).getSubject)("setData"), ve("setData", e), be("setData", e))
                            })(), Se("onLoad").subscribe((function (e) {
                                var t = e.that;
                                yt.call(t)
                            })), rt().setDataSubject(yt)
                        }))
                    }(e), Ot(Nt, t, e.report.bind(e)))
                }))
            }, Bt = {}, Kt = {}, Gt = {}, zt = function (e, t, n) {
                void 0 === n && (n = rt());
                var r, i = t.url, o = t.data, a = t.success, s = void 0 === a ? I : a, u = t.fail,
                    c = void 0 === u ? I : u, f = t.header, p = {"Content-Type": "application/json"};
                ie(r = f) && 0 !== Object.keys(r).length && Object.assign(p, f), n.request({
                    method: e,
                    url: i,
                    data: o,
                    header: p,
                    headers: p,
                    success: function (e) {
                        s(e)
                    },
                    fail: function (e) {
                        var t = e.errMsg || "Network request failed";
                        c(new Error(t))
                    }
                })
            }, Jt = function (e) {
                return void 0 === e && (e = rt()), e ? {
                    get: function (t) {
                        return zt("GET", t, e)
                    }, post: function (t) {
                        return zt("POST", t, e)
                    }
                } : {get: I, post: I}
            }, Yt = {
                build: function (e) {
                    return {ev_type: e.ev_type, payload: e.payload, common: b(b({}, e.extra || {}), e.overrides || {})}
                }
            }, Zt = {sample_rate: 1, include_users: [], sample_granularity: "session", rules: {}},
            Wt = ["/monitor_mini/collect", "/settings/minipro"], Xt = function (e, t) {
                return void 0 === t && (t = "/settings/minipro"), (e && e.indexOf("//") >= 0 ? "" : "https://") + e + t
            };

        function Qt(e) {
            var t = function (e) {
                var t = function (e) {
                    try {
                        return rt().getStorage(e)
                    } catch (e) {
                        return
                    }
                }(it(String(e)));
                return t && t.userId && t.deviceId ? t : {userId: G(), deviceId: G()}
            }(e.aid);
            return {
                aid: 0,
                token: "",
                pid: "",
                viewId: ("_", "__" + Date.now()),
                userId: t.userId,
                deviceId: t.deviceId,
                sessionId: G(),
                domain: "apmplus.volces.com",
                plugins: {
                    breadcrumb: {},
                    pageview: {},
                    jsError: {},
                    http: {ignoreUrls: Wt},
                    setData: {},
                    appLaunchPerf: {},
                    pagePerf: {},
                    performance: {}
                },
                sample: Zt,
                sdkName: "APM_PLUS_MINI_PROGRAM",
                sdkVersion: "0.2.4"
            }
        }

        function en(e) {
            var t = e.plugins || {};
            for (var n in t) t[n] && !x(t[n]) && (t[n] = {});
            return b(b({}, e), {plugins: t})
        }

        function tn(e) {
            return x(e) && "aid" in e && "token" in e
        }

        function nn(e) {
            return b({}, e)
        }

        var rn = function (e) {
            var t, n, r = e, i = {}, o = void 0, a = I, s = I;
            return {
                getConfig: function () {
                    return r
                }, setConfig: function (e) {
                    var s, f, p;
                    return i = b(b({}, i), e || {}), u(), t || (t = e, r.useLocalConfig || !r.aid ? (n = {}, a()) : o ? c() : (s = r.domain, f = r.aid, p = function (e) {
                        o = e, c()
                    }, Jt().get({
                        url: Xt(s) + "?biz_id=" + f, success: function (e) {
                            p(e && e.data && e.data.data || {})
                        }, fail: function () {
                            p({sample: {sample_rate: .001}})
                        }
                    }))), r
                }, onChange: function (e) {
                    s = e
                }, onReady: function (e) {
                    a = function () {
                        (function (e) {
                            var t = e.aid, n = e.userId, r = e.deviceId;
                            !function (e, t) {
                                try {
                                    rt().setStorage(e, t)
                                } catch (e) {
                                }
                            }(it(String(t)), {userId: n, deviceId: r})
                        })(r), e()
                    }, n && a()
                }
            };

            function u() {
                var t = b(b(b({}, e), n || {}), i);
                t.plugins = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    for (var n = {}, r = 0; r < e.length;) n = N(n, e[r++]);
                    return n
                }(e.plugins, (null == n ? void 0 : n.plugins) || {}, i.plugins || {}), t.sample = on(on(e.sample, null == n ? void 0 : n.sample), i.sample), r = t, s()
            }

            function c() {
                var t, i;
                n = function (e) {
                    if (!e) return {};
                    var t = e.sample, n = e.user_id, r = e.timestamp, i = n ? {userId: n} : {};
                    if (!t) return i;
                    var o = t.sample_rate, a = t.sample_granularity, s = void 0 === a ? "session" : a,
                        u = t.include_users, c = t.rules, f = void 0 === c ? [] : c;
                    return b(b({}, i), {
                        sample: {
                            include_users: u,
                            sample_rate: o,
                            sample_granularity: s,
                            rules: f.reduce((function (e, t) {
                                var n = t.name, r = t.enable, i = t.sample_rate, o = t.conditional_sample_rules;
                                return e[n] = {enable: r, sample_rate: i, conditional_sample_rules: o}, e
                            }), {})
                        }, serverTimestamp: r
                    })
                }(o), t = String(r.aid), i = it(t), rt().getStorage(i) && (n.userId = e.userId), u(), a()
            }
        };

        function on(e, t) {
            if (!e || !t) return e || t;
            var n = b(b({}, e), t);
            return n.include_users = S(S([], w(e.include_users || []), !1), w(t.include_users || []), !1), n.rules = S(S([], w(Object.keys(e.rules || {})), !1), w(Object.keys(t.rules || {})), !1).reduce((function (n, r) {
                var i, o;
                return r in n || (r in (e.rules || {}) && r in (t.rules || {}) ? (n[r] = b(b({}, e.rules[r]), t.rules[r]), n[r].conditional_sample_rules = S(S([], w(e.rules[r].conditional_sample_rules || []), !1), w(t.rules[r].conditional_sample_rules || []), !1)) : n[r] = (null === (i = e.rules) || void 0 === i ? void 0 : i[r]) || (null === (o = t.rules) || void 0 === o ? void 0 : o[r])), n
            }), {}), n
        }

        var an = function (e) {
            if (!nt(e)) throw Error("Adapters imported incorrectly");
            var t = function (e) {
                var t, n, r = e.builder, i = e.createSender, o = e.createDefaultConfig, a = e.createConfigManager,
                    s = e.userConfigNormalizer, u = e.initConfigNormalizer, c = e.validateInitConfig, f = {};
                k.forEach((function (e) {
                    return f[e] = []
                }));
                var p, l, d, h = !1, _ = !1, v = !1, g = [], m = [], y = (p = {}, l = function (e) {
                    e.length && e.forEach((function (e) {
                        try {
                            e()
                        } catch (e) {
                        }
                    })), e.length = 0
                }, {
                    set: function (e, t, n) {
                        p[e] ? p[e].push([t, n]) : p[e] = [[t, n]]
                    }, remove: d = function (e) {
                        p[e] && p[e].forEach((function (e) {
                            l(e[1])
                        })), p[e] = void 0
                    }, removeByEvType: function (e) {
                        Object.keys(p).forEach((function (t) {
                            p[t] && p[t].forEach((function (t) {
                                t[0] === e && l(t[1])
                            }))
                        }))
                    }, clear: function () {
                        Object.keys(p).forEach((function (e) {
                            d(e)
                        }))
                    }
                }), b = {
                    getBuilder: function () {
                        return r
                    }, getSender: function () {
                        return t
                    }, getPreStartQueue: function () {
                        return g
                    }, init: function (e) {
                        if (h) F("already inited"); else {
                            if (!(e && x(e) && c(e))) throw new Error("invalid InitConfig, init failed");
                            var r = o(e);
                            if (!r) throw new Error("defaultConfig missing");
                            var s = u(e);
                            if ((n = a(r)).setConfig(s), n.onChange((function () {
                                I("config")
                            })), !(t = i(n.getConfig()))) throw new Error("sender missing");
                            h = !0, I("init", !0)
                        }
                    }, set: function (e) {
                        h && e && x(e) && (I("beforeConfig", !1, e), null == n || n.setConfig(e))
                    }, config: function (e) {
                        if (h) return e && x(e) && (I("beforeConfig", !1, e), null == n || n.setConfig(s(e))), null == n ? void 0 : n.getConfig()
                    }, provide: function (e, t) {
                        q(m, e) ? F("cannot provide " + e + ", reserved") : (b[e] = t, I("provide", !1, e))
                    }, start: function () {
                        var e = this;
                        h && (_ || null == n || n.onReady((function () {
                            _ = !0, I("start", !0), g.forEach((function (t) {
                                return e.build(t)
                            })), g = []
                        })))
                    }, report: function (e) {
                        if (e) {
                            var t = K(f.beforeReport)(e);
                            if (t) {
                                var n = K(f.report)(t);
                                n && (_ ? this.build(n) : g.push(n))
                            }
                        }
                    }, build: function (e) {
                        if (_) {
                            var t = K(f.beforeBuild)(e);
                            if (t) {
                                var n = r.build(t);
                                if (n) {
                                    var i = K(f.build)(n);
                                    i && this.send(i)
                                }
                            }
                        }
                    }, send: function (e) {
                        if (_) {
                            var n = K(f.beforeSend)(e);
                            n && (t.send(n), I("send", !1, n))
                        }
                    }, destroy: function () {
                        y.clear(), v = !0, I("beforeDestroy", !0)
                    }, on: function (e, t) {
                        "init" === e && h || "start" === e && _ || "beforeDestroy" === e && v ? t() : f[e] && f[e].push(t)
                    }, off: function (e, t) {
                        f[e] && (f[e] = function (e, t) {
                            if (!E(e)) return e;
                            var n = e.indexOf(t);
                            if (n >= 0) {
                                var r = e.slice();
                                return r.splice(n, 1), r
                            }
                            return e
                        }(f[e], t))
                    }, destroyAgent: y
                };
                return m = Object.keys(b), b;

                function I(e, t) {
                    void 0 === t && (t = !1);
                    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                    f[e].forEach((function (e) {
                        try {
                            e.apply(void 0, S([], w(n), !1))
                        } catch (e) {
                        }
                    })), t && (f[e].length = 0)
                }
            }({
                validateInitConfig: tn,
                initConfigNormalizer: en,
                userConfigNormalizer: nn,
                createSender: function (e) {
                    return function (e) {
                        return function (e) {
                            var t, n = e.transport, r = e.endpoint, i = e.size, o = void 0 === i ? 10 : i,
                                a = e.wait, s = void 0 === a ? 1e3 : a, u = [], c = 0;

                            function f() {
                                if (u.length) {
                                    var e = this.getBatchData();
                                    n.post({
                                        url: r, data: e, fail: function (n) {
                                            t && t(n, e)
                                        }
                                    }), u = []
                                }
                            }

                            return {
                                getSize: function () {
                                    return o
                                }, getWait: function () {
                                    return s
                                }, setSize: function (e) {
                                    o = e
                                }, setWait: function (e) {
                                    s = e
                                }, getEndpoint: function () {
                                    return r
                                }, setEndpoint: function (e) {
                                    r = e
                                }, send: function (e) {
                                    u.push(e), u.length >= o && f.call(this), clearTimeout(c), c = setTimeout(f.bind(this), s)
                                }, flush: function () {
                                    clearTimeout(c), f.call(this)
                                }, getBatchData: function () {
                                    return u.length ? (e = u, JSON.stringify({ev_type: "batch", list: e})) : "";
                                    var e
                                }, clear: function () {
                                    clearTimeout(c), u = []
                                }, fail: function (e) {
                                    t = e
                                }
                            }
                        }(e)
                    }({
                        size: 20,
                        endpoint: (t = e.domain, void 0 === n && (n = "/monitor_mini/collect"), (t && t.indexOf("//") >= 0 ? "" : "https://") + t + n),
                        transport: Jt()
                    });
                    var t, n
                },
                builder: Yt,
                createDefaultConfig: Qt,
                createConfigManager: rn
            });
            return function (e) {
                var t = function () {
                    var e = {}, t = {}, n = {
                        set: function (r, i) {
                            return e[r] = i, t[r] = L(i), n
                        }, merge: function (r) {
                            return e = b(b({}, e), r), Object.keys(r).forEach((function (e) {
                                t[e] = L(r[e])
                            })), n
                        }, delete: function (r) {
                            return delete e[r], delete t[r], n
                        }, clear: function () {
                            return e = {}, t = {}, n
                        }, get: function (e) {
                            return t[e]
                        }, toString: function () {
                            return b({}, t)
                        }
                    };
                    return n
                }();
                e.provide("context", t), e.on("report", (function (e) {
                    return e.extra || (e.extra = {}), e.extra.context = t.toString(), e
                }))
            }(t), function (e) {
                var t, n = !1;
                e.on("init", (function () {
                    t = oe(), e.on("config", (function () {
                        var r, i = null === (r = e.config()) || void 0 === r ? void 0 : r.serverTimestamp;
                        if (!(isNaN(i) || Number(i) <= 0 || n)) {
                            n = !0;
                            var o = oe();
                            if (o - t < 1e3 && i) {
                                var a = i - (o + t) / 2;
                                !isNaN(a) && e.set({offset: a})
                            }
                        }
                    }))
                }))
            }(t), function (e) {
                e.on("beforeBuild", (function (t) {
                    return function (e, t) {
                        var n, r = {};
                        return r.aid = t.aid, r.pid = t.pid, r.view_id = t.viewId, r.user_id = t.userId, r.network_type = t.networkType, b(b({}, e), {extra: b(b({}, r), null !== (n = e.extra) && void 0 !== n ? n : {})})
                    }(t, e.config())
                }))
            }(t), function (e) {
                e.on("report", (function (e) {
                    return function (e) {
                        var t, n, r = {
                            url: (n = rt().getCurrentPages().pop(), n ? (n ? ot(n) : "") + j(n.options) : ""),
                            timestamp: oe()
                        };
                        return b(b({}, e), {extra: b(b({}, r), null !== (t = e.extra) && void 0 !== t ? t : {})})
                    }(e)
                }))
            }(t), function (e) {
                e.on("start", (function () {
                    var t = e.config(), n = function (e, t, n, r) {
                        if (!t) return O;
                        var i = t.sample_rate, o = t.include_users, a = t.sample_granularity, s = t.rules, u = t.r,
                            c = void 0 === u ? Math.random() : u;
                        if (q(o, e)) return function (e) {
                            return J(e, 1)
                        };
                        var f = "session" === a, p = Y(f, i, n, c, r), l = function (e, t, n, r, i, o) {
                            var a = {};
                            return Object.keys(e).forEach((function (s) {
                                var u = e[s], c = u.enable, f = u.sample_rate, p = u.conditional_sample_rules;
                                c ? (a[s] = {
                                    enable: c,
                                    sample_rate: f,
                                    effectiveSampleRate: f * n,
                                    hit: Y(t, f, r, i, o)
                                }, p && (a[s].conditional_hit_rules = p.map((function (e) {
                                    var a = e.sample_rate, s = e.filter;
                                    return {
                                        sample_rate: a,
                                        hit: Y(t, a, r, i, o),
                                        effectiveSampleRate: a * n,
                                        filter: s
                                    }
                                })))) : a[s] = {
                                    enable: c, hit: function () {
                                        return !1
                                    }, sample_rate: 0, effectiveSampleRate: 0
                                }
                            })), a
                        }(s, f, i, n, c, r);
                        return function (e) {
                            if (!p()) return !1;
                            if (!(e.ev_type in l)) return J(e, i);
                            if (!l[e.ev_type].enable) return !1;
                            if (e.common && e.common.sample_rate) return e;
                            var t = l[e.ev_type], n = t.conditional_hit_rules;
                            if (n) for (var r = 0; r < n.length; r++) if (Z(e, n[r].filter)) return !!n[r].hit() && J(e, n[r].effectiveSampleRate);
                            return !!t.hit() && J(e, t.effectiveSampleRate)
                        }
                    }(t.userId, t.sample, V, B);
                    e.on("build", n)
                }))
            }(t), Ht(t), function (e) {
                e.on("init", (function () {
                    var t = [], n = e.config();
                    n && n.integrations && n.integrations.forEach((function (n) {
                        q(t, n.name) || (t.push(n.name), n.setup(e), n.tearDown && e.on("beforeDestroy", n.tearDown))
                    }))
                }))
            }(t), function (e) {
                e.on("init", (function () {
                    we(z.onHide).subscribe((function () {
                        var t = e.getSender();
                        t && t.flush()
                    }))
                }))
            }(t), function (e) {
                var t = !1, n = function (e) {
                    var t = "";
                    return function () {
                        var n = e.getSender();
                        t || (t = n.getEndpoint());
                        var r = e.config(), i = {
                            did: r.deviceId,
                            sid: r.sessionId,
                            sname: r.sdkName,
                            sver: r.sdkVersion,
                            soffset: r.offset || 0,
                            model: r.model,
                            brand: r.brand,
                            ratio: r.pixelRatio,
                            screen: r.screenArea,
                            window: r.windowArea,
                            lang: r.language,
                            osname: r.osName,
                            osver: r.osVersion,
                            libver: r.SDKVersion,
                            scene: r.scene || -1,
                            menv: r.miniEnv,
                            mver: r.miniVersion,
                            hostname: r.hostName,
                            hostver: r.hostVersion,
                            platform: r.platform,
                            biz_id: r.aid,
                            x_auth_token: r.token
                        };
                        n.setEndpoint(t + j(i))
                    }
                }(e), r = function (t) {
                    return void 0 === t && (t = rt().getSystemInfo()), e.set(b({}, t))
                }, i = function () {
                    r(), n()
                };
                e.on("start", (function () {
                    i(), t = !0
                })), e.on("init", (function () {
                    we(z.onLaunch).pipe(ze(1)).subscribe((function (e) {
                        var n = e.param.scene || -1;
                        r({scene: n}), t && i()
                    })), rt().monitorNetworkType((function (t) {
                        var n = t.networkType;
                        e.set({networkType: n})
                    }))
                }))
            }(t), t
        }, sn = (n(73061), function (e) {
            var t = an(e);
            if (t) return function (e) {
                e.provide("sendEvent", (function (t) {
                    var n = function (e) {
                        if (e && x(e) && e.name && C(e.name)) {
                            var t = {name: e.name, type: "event"};
                            if ("metrics" in e && x(e.metrics)) {
                                var n = e.metrics, r = {};
                                for (var i in n) D(n[i]) && (r[i] = n[i]);
                                t.metrics = r
                            }
                            if ("categories" in e && x(e.categories)) {
                                var o = e.categories, a = {};
                                for (var i in o) a[i] = L(o[i]);
                                t.categories = a
                            }
                            return t
                        }
                    }(t);
                    n && e.report({ev_type: "custom", payload: n, extra: {timestamp: Date.now()}})
                })), e.provide("sendLog", (function (t) {
                    var n = function (e) {
                        if (e && x(e) && e.content && C(e.content)) {
                            var t = {content: L(e.content), type: "log", level: "info"};
                            if ("level" in e && (t.level = e.level), "extra" in e && x(e.extra)) {
                                var n = e.extra, r = {}, i = {};
                                for (var o in n) D(n[o]) ? r[o] = n[o] : i[o] = L(n[o]);
                                t.metrics = r, t.categories = i
                            }
                            return t
                        }
                    }(t);
                    n && e.report({ev_type: "custom", payload: n, extra: {timestamp: Date.now()}})
                }))
            }(t), function (e) {
                e.on("init", (function () {
                    var t = xt(e, "pageview", Lt);
                    if (t) {
                        var n = w(Ot(Ct, b(b({}, t), {
                            setPidAndViewId: function (t, n) {
                                e.set({pid: t, viewId: n, actionId: void 0})
                            }
                        }), e.report.bind(e)), 2), r = n[0], i = n[1];
                        e.provide("sendPageview", r), e.provide("sendPageviewWithHide", i)
                    }
                }))
            }(t), function (e) {
                e.on("init", (function () {
                    var t = xt(e, "jsError", jt);
                    if (t) {
                        var n = function (e) {
                            return function (t) {
                                var n = e.getBreadcrumbs && e.getBreadcrumbs() || [];
                                e.report({ev_type: "js_error", payload: b(b({}, t), {breadcrumbs: n})})
                            }
                        }(e), r = w(Ot(Dt, t, n), 1)[0];
                        e.provide("captureException", r)
                    }
                }))
            }(t), Et(t), Vt(t), function (e) {
                e.on("init", (function () {
                    var t = xt(e, "breadcrumb", Mt);
                    if (t) {
                        var n = w(Ot($t, t, (function (e) {
                        })), 2), r = n[0], i = n[1];
                        e.provide("getBreadcrumbs", r), e.provide("addBreadcrumb", i)
                    }
                }))
            }(t), function (e) {
                e.on("init", (function () {
                    var t = xt(e, "appLaunchPerf", Bt);
                    t && (bt(e), Ot(Rt, t, e.report.bind(e)))
                }))
            }(t), function (e) {
                e.on("init", (function () {
                    var t = xt(e, "pagePerf", Kt);
                    t && Ot(qt, t, e.report.bind(e))
                }))
            }(t), function (e) {
                e.on("init", (function () {
                    var t = xt(e, "performance", Gt);
                    t && (bt(e), Ot(Ut, t, e.report.bind(e)))
                }))
            }(t), t
        }([gt]));
        sn.init({
            aid: 506098,
            token: "236e73deebf64bbe9af5963e71457c01",
            plugins: {
                http: {ignoreUrls: ["https://delongjituan.datasink.sensorsdata.cn"]},
                jsError: {hookOnUnhandledRejection: !1}
            }
        }), sn.start();
        var un = n(60779), cn = n(10598), fn = {
                install: function (e) {
                    var t = {
                        Overlay: function () {
                            return Promise.resolve().then((function () {
                                return (0, cn.Z)(n(51997))
                            }))
                        }, Popup: function () {
                            return Promise.resolve().then((function () {
                                return (0, cn.Z)(n(19680))
                            }))
                        }
                    };
                    Object.keys(t).forEach((function (n) {
                        e.component(n, t[n])
                    }))
                }
            }, pn = n(53134), ln = n(89958), dn = n(21890), hn = n(5679), _n = n(25762), vn = n(72473), gn = n(37318),
            mn = n(95501), yn = n(2324), bn = n(87360), wn = n(94115), Sn = n.n(wn), kn = {
                install: function (e) {
                    Sn().init({
                        appKey: "67b693e89a16fe6dcd4c8fc3",
                        useOpenid: !0,
                        autoGetOpenid: !0,
                        debug: !1,
                        uploadUserInfo: !0
                    }), e.config.globalProperties.uma = Sn(), Object.defineProperty(a(), "uma", {
                        get: function () {
                            return Sn()
                        }
                    })
                }
            };
        p.V.init(), v.init(), Promise.prototype.finally || (Promise.prototype.finally = function (e) {
            return this.then((function (t) {
                e && e(t)
            }), (function (t) {
                e && e(t)
            }))
        });
        var In = (0, f.ri)({
            onLaunch: function (e) {
                var t = this;
                [1001, 1005, 1006, 1026, 1104, 1106, 1027, 1089].includes(e.scene) && (0, c.Zi)().setChannel("H-002-01"), (0, dn.d)(function () {
                    var e = (0, u.Z)((0, s.Z)().mark((function e(n) {
                        return (0, s.Z)().wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    if (!n) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.next = 3, t._checkProtocol();
                                case 3:
                                case"end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function (t) {
                        return e.apply(this, arguments)
                    }
                }());
                var n = (0, c.LM)().getToken();
                if (n && (0, l.g$)(), d.Eb.includes(e.path) && (0, c.LM)().setIgnore403(!0), (0, hn.lH)(e, "onLaunch"), (0, ln.ux)(e), (0, hn.jl)(), d.Vj.includes(e.path) || (0, yn.H4)(e) || n) {
                    var r = (0, c.LM)(), i = r.setRealNameMark, o = r.setUserNew, f = r.setMemberType;
                    (0, r.setToken)(n);
                    var p = a().getStorageSync("userInfo");
                    if (!p) return;
                    i(p.idCardVerify), o(p.isNewMember), f(p.memberType), v.login(p.userId)
                } else (0, mn.a)((function (e) {
                    "error" === e && (0, c.LM)().removeToken()
                }), {showToast: !1}).wxLogin(!1);
                (0, ln.sB)()
            }, onShow: function (e) {
                var t;
                this._handleSubscriber(), (0, _n.IO)(null == e ? void 0 : e.query), setTimeout((function () {
                    var t, n;
                    return (0, gn.cH)(null === (t = e.query) || void 0 === t ? void 0 : t.templateId, null === (n = e.query) || void 0 === n ? void 0 : n.templateType)
                }));
                var n = (0, c.LM)().getToken();
                if (d.Vj.includes(e.path) || !(0, yn.H4)(e) || n) {
                    if (null !== (t = e.query) && void 0 !== t && t.scene) {
                        var r = (0, un.zh)(e.query.scene);
                        this._handleMemberDevelopment({channel: r.c, parentInfo: r.p})
                    } else this._handleMemberDevelopment(e.query);
                    (0, hn.dW)(e)
                } else (0, yn.Hc)(e)
            }, onPageNotFound: function (e) {
                var t, n = e.path, r = e.query, i = e.isEntryPage, o = {
                    "modules/member/my/index": "/modules/main/views/mine/index",
                    "modules/member/views/cardBag/index": "/modules/webview/views/H5Link?src=".concat(encodeURIComponent(d.Ch + "/#/catering-card-v3?buyListType=2")),
                    "modules/main/views/reserve/index": "/modules/main/views/bookHotel/BookHotel"
                };
                if (a().TrackSDK.track("noPage", {
                    path: n,
                    isEntryPage: i,
                    scene: (null == r ? void 0 : r.scene) || null,
                    channel: (null == r ? void 0 : r.channel) || null,
                    type: (null == r ? void 0 : r.type) || null
                }), o[n]) return "modules/member/views/cardBag/index" === n ? void a().redirectTo({url: "".concat(o[n])}) : ((0, bn.S)().setJumpParams(r || {}), void a().switchTab({
                    url: "".concat(o[n], "?").concat((0, un.Bl)(r || {})),
                    success: function () {
                        (0, bn.S)().clearJumpParams()
                    }
                }));
                if (null != r && null !== (t = r.type) && void 0 !== t && t.includes("imUdesk")) {
                    var s = r.channel;
                    a().navigateTo({url: "/modules/webview/views/H5Link?src=\n          ".concat(encodeURIComponent("https://h5.betterwood.com/#/imUdesk?purposeHotel=&purposeOrder=&hideShare=true")).concat(s ? "" : "&channel=" + s)})
                } else a().switchTab({url: "/modules/main/views/bookHotel/BookHotel"})
            }, data: function () {
                return {firstFlag: !0}
            }, methods: {
                _handleMemberDevelopment: function (e) {
                    var t = e.channel, n = e.parentInfo, r = e.modUcKey, i = e.kyKey, o = (0, c.Zi)(),
                        a = o.setChannel, s = o.setParentInfo, u = o.setKyKey, f = o.setModUcKey;
                    t && (a(t), n && s(n), r && f(r), i && u(i))
                }, _handleSubscriber: function () {
                    return (0, u.Z)((0, s.Z)().mark((function e() {
                        var t, n;
                        return (0, s.Z)().wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, (0, vn.w)();
                                case 2:
                                    200 === (null == (n = e.sent) || null === (t = n.data) || void 0 === t ? void 0 : t.code) && (0, c.BZ)().setTemplateIds(n.data.data || []);
                                case 4:
                                case"end":
                                    return e.stop()
                            }
                        }), e)
                    })))()
                }, _checkProtocol: function () {
                    var e = this;
                    return (0, u.Z)((0, s.Z)().mark((function t() {
                        var n;
                        return (0, s.Z)().wrap((function (t) {
                            for (; ;) switch (t.prev = t.next) {
                                case 0:
                                    if (e.firstFlag) {
                                        t.next = 2;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 2:
                                    return e.firstFlag = !1, t.next = 5, (0, l.Dw)();
                                case 5:
                                    n = t.sent, (0, c.LM)().setProtocolTips(!(null == n || !n.popFlag)), (0, c.LM)().setAgreeVoList((null == n ? void 0 : n.agreeVoList) || []);
                                case 8:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                }
            }
        });
        In.use(c.MR), In.use(kn), In.use(fn), In.use(pn.ZP);
        var On = In, xn = n(36238), Tn = {
            pages: ["modules/main/views/bookHotel/BookHotel", "modules/main/views/trip/index", "modules/main/views/service/Service", "modules/main/views/login-page/index", "modules/main/views/mine/index", "modules/main/views/middle-page/MiddlePage"],
            subPackages: [{
                root: "modules/webview",
                pages: ["views/H5Link", "views/transit-page/index"]
            }, {
                root: "modules/member/views",
                pages: ["timeValueDetail/timeValueDetail", "myInfo/certification", "myInfo/authSuccess", "myInfo/MyInfo", "myPrivilege/index", "order-detail/index", "add-invoice/index", "invoice-detail/index", "treasureBag/index", "treasureBag/treasureDetail", "treasureBag/overlayList", "treasureBag/storeCoupon", "treasureBag/treasureConvert", "corporateMember/index", "corporateMember/activate", "corporateMember/activateSuccess", "cardPack/index", "setup/index", "feedback/index", "payPage/index"]
            }, {
                root: "modules/hotel",
                pages: ["views/hotel-list/HotelList", "views/hotel-images/index", "views/hotelInfo/HotelInfo", "views/editInfo/EditInfo", "views/search/SearchHotel", "views/hotelOrder/HotelOrder", "views/all-orders/AllOrders", "views/all-orders/RefundList", "views/order-detail/OrderDetail", "views/hotel-coupons/HotelCoupons", "views/pay/index", "views/pay-complete/index", "views/order-confirm/OrderDetail", "views/trip-order/index", "views/codeCheckIn/index", "views/applyOrderCancle/ApplyOrderCancle"]
            }, {
                root: "modules/hotel-utils",
                pages: ["views/choose-origin/ChooseOrigin", "views/add-remark/index", "views/add-person-v2/index", "views/add-person-oversea/index", "views/calendar/index", "views/filterItems/index", "views/choose-city/ChooseCity", "views/hotel-collect/index", "views/offline-coupon/index", "views/continue-live/index"]
            }, {
                root: "modules/circle",
                pages: ["views/brandCircle/CircleDetail", "views/CircleImgDetail", "views/PersonalPage"]
            }, {
                root: "modules/rate",
                pages: ["views/hotelComment/index", "views/hotelComment/commentOk", "views/RateList", "views/RateDetail", "views/MyRate"]
            }, {
                root: "modules/service",
                pages: ["views/complete-service/CompleteService", "views/room-service/RoomService", "views/feedback-list/FeedbackList", "views/feedback/index", "views/progress-detail/ProgressDetail"]
            }, {
                root: "modules/yx-order",
                pages: ["views/after-sales/detail", "views/order-detail/index"]
            }, {root: "modules/script-murder", pages: ["views/order-detail/index"]}, {
                root: "modules/utils",
                pages: ["views/payment-page/index", "views/wifi-link/WifiLink", "views/img-page/index", "views/enterprise-invite/index", "views/preCheckInGuide/index"],
                plugins: {
                    linkBroad: {
                        version: "1.0.10",
                        provider: "wx682254712103d5f1",
                        export: "exports/exportsToLinkBroad.js"
                    }, interTouch: {version: "2.0.4", provider: "wx85f89bdbb389bee8"}
                }
            }],
            tabBar: {
                color: "#898989",
                selectedColor: "#020000",
                backgroundColor: "#fff",
                borderStyle: "white",
                list: [{
                    iconPath: "static/tabBar/home.png",
                    selectedIconPath: "static/tabBar/home-active.png",
                    pagePath: "modules/main/views/bookHotel/BookHotel",
                    text: "首页"
                }, {
                    iconPath: "static/tabBar/trip.png",
                    selectedIconPath: "static/tabBar/trip-active.png",
                    pagePath: "modules/main/views/trip/index",
                    text: "行程"
                }, {
                    iconPath: "static/tabBar/service.png",
                    selectedIconPath: "static/tabBar/service-active.png",
                    pagePath: "modules/main/views/service/Service",
                    text: "服务"
                }, {
                    iconPath: "static/tabBar/mine.png",
                    selectedIconPath: "static/tabBar/mine-active.png",
                    pagePath: "modules/main/views/mine/index",
                    text: "会员"
                }]
            },
            window: {
                backgroundTextStyle: "light",
                navigationBarBackgroundColor: "#fff",
                navigationBarTitleText: "",
                navigationBarTextStyle: "black",
                backgroundColor: "#efefef"
            },
            preloadRule: {
                "modules/main/views/bookHotel/BookHotel": {
                    network: "all",
                    packages: ["modules/hotel", "modules/webview"]
                },
                "modules/hotel/views/codeCheckIn/index": {network: "all", packages: ["modules/hotel-utils"]},
                "modules/hotel/views/hotelInfo/HotelInfo": {
                    network: "all",
                    packages: ["modules/rate", "modules/hotel-utils"]
                },
                "modules/hotel/views/hotelOrder/HotelOrder": {
                    network: "all",
                    packages: ["modules/utils", "modules/hotel-utils"]
                },
                "modules/main/views/service/Service": {
                    network: "all",
                    packages: ["modules/service", "modules/hotel"]
                },
                "modules/main/views/mine/index": {
                    network: "all",
                    packages: ["modules/member/views", "modules/rate"]
                },
                "modules/hotel/views/all-orders/AllOrders": {network: "all", packages: ["modules/rate"]},
                "modules/utils/views/payment-page/index": {network: "all", packages: ["modules/hotel"]},
                "modules/utils/views/wifi-link/WifiLink": {network: "all", packages: ["modules/webview"]}
            },
            requiredPrivateInfos: ["chooseLocation", "getLocation"],
            lazyCodeLoading: "requiredComponents",
            permission: {
                "scope.userLocation": {desc: "你的位置信息将用于地理位置展示与距离计算"},
                "scope.writePhotosAlbum": {desc: "保存图片到相册"}
            }
        };
        r.window.__taroAppConfig = Tn, App((0, i.rj)(On, xn.h, Tn)), (0, o.initPxTransform)({
            designWidth: function (e) {
                var t;
                return (null == e || null === (t = e.file) || void 0 === t ? void 0 : t.replace(/\\+/g, "/").indexOf("@nutui")) > -1 ? 375 : 750
            }, deviceRatio: {375: 2, 640: 1.17, 750: 1, 828: .905}
        })
    }, 87811: function (e, t, n) {
        "use strict";
        var r = n(57789).default, i = n(43182).default, o = n(8064).default, a = n(9466).default,
            s = n(54068).default, u = n(66280).default, c = n(65973).default, f = n(53483).default, p = {}, l = {
                name: "sensors",
                server_url: "",
                send_timeout: 1e3,
                show_log: !1,
                login_id_key: "$identity_login_id",
                allow_amend_share_path: !0,
                max_string_length: 500,
                datasend_timeout: 3e3,
                source_channel: [],
                autoTrack: {
                    appLaunch: !0,
                    appShow: !0,
                    appHide: !0,
                    pageShow: !0,
                    pageShare: !0,
                    mpClick: !1,
                    mpFavorite: !0,
                    pageLeave: !1
                },
                autotrack_exclude_page: {pageShow: [], pageLeave: []},
                is_persistent_save: {share: !1, utm: !1},
                preset_properties: {url_path: !0},
                preset_events: {moments_page: !1, defer_track: !1, share_info_use_string: !1},
                batch_send: !0,
                storage_store_key: "sensorsdata2015_wechat",
                storage_prepare_data_key: "sensors_mp_prepare_data"
            };

        function d() {
            if (l.show_log && "object" == ("undefined" == typeof console ? "undefined" : f(console)) && function () {
            }) try {
                return
            } catch (e) {
            }
        }

        var h = Array.isArray, _ = Object.prototype, v = Array.prototype, g = v.forEach, m = v.indexOf,
            y = _.toString, b = _.hasOwnProperty, w = v.slice;

        function S(e, t, n) {
            if (null == e) return !1;
            var r = {};
            if (g && e.forEach === g) e.forEach(t, n); else if (e.length === +e.length) {
                for (var i = 0, o = e.length; i < o; i++) if (i in e && t.call(n, e[i], i, e) === r) return !1
            } else for (var a in e) if (b.call(e, a) && t.call(n, e[a], a, e) === r) return !1
        }

        function k(e) {
            return null != e && "[object Object]" == y.call(e)
        }

        var I = function () {
            var e = (new Date).getTime();
            return function (t) {
                return Math.ceil((e = (9301 * e + 49297) % 233280) / 233280 * t)
            }
        }();

        function O() {
            if ("function" == typeof Uint32Array) {
                var e = "";
                if ("undefined" != typeof crypto ? e = crypto : "undefined" != typeof msCrypto && (e = msCrypto), k(e) && e.getRandomValues) {
                    var t = new Uint32Array(1);
                    return e.getRandomValues(t)[0] / Math.pow(2, 32)
                }
            }
            return I(1e19) / 1e19
        }

        function x(e) {
            return S(w.call(arguments, 1), (function (t) {
                for (var n in t) void 0 !== t[n] && (e[n] = t[n])
            })), e
        }

        function T(e) {
            return S(w.call(arguments, 1), (function (t) {
                for (var n in t) void 0 !== t[n] && null !== t[n] && (k(t[n]) && k(e[n]) ? x(e[n], t[n]) : e[n] = t[n])
            })), e
        }

        var P = h || function (e) {
            return "[object Array]" === y.call(e)
        };

        function E(e) {
            if (!e) return !1;
            var t = Object.prototype.toString.call(e);
            return "[object Function]" == t || "[object AsyncFunction]" == t
        }

        function A(e) {
            return !(!e || !b.call(e, "callee"))
        }

        function D(e) {
            var t = [];
            return null == e || S(e, (function (e) {
                t[t.length] = e
            })), t
        }

        function C(e, t) {
            var n = !1;
            return null == e ? n : m && e.indexOf === m ? -1 != e.indexOf(t) : (S(e, (function (e) {
                if (n || (n = e === t)) return {}
            })), n)
        }

        function $(e) {
            if (k(e)) {
                for (var t in e) if (b.call(e, t)) return !1;
                return !0
            }
            return !1
        }

        function N(e) {
            var t = {};
            return function e(t, n) {
                for (var r in n) {
                    var i = n[r];
                    P(i) ? (t[r] = [], e(t[r], i)) : k(i) ? (t[r] = {}, e(t[r], i)) : t[r] = i
                }
            }(t, e), t
        }

        function R(e) {
            return void 0 === e
        }

        function q(e) {
            return "[object String]" == y.call(e)
        }

        function U(e) {
            return "[object Date]" == y.call(e)
        }

        function L(e) {
            return "[object Boolean]" == y.call(e)
        }

        function j(e) {
            return "[object Number]" == y.call(e) && /[\d\\.]+/.test(String(e))
        }

        function M(e) {
            try {
                JSON.parse(e)
            } catch (e) {
                return !1
            }
            return !0
        }

        var H = Number.isInteger || function (e) {
                return "number" == typeof e && isFinite(e) && Math.floor(e) === e
            }, F = Number.isSafeInteger || function (e) {
                return H(e) && Math.abs(e) <= Math.pow(2, 53) - 1
            }, V = {
                ENC: {"+": "-", "/": "_", "=": "."}, DEC: {"-": "+", _: "/", ".": "="}, encode: function (e) {
                    return e.replace(/[+\/=]/g, (function (e) {
                        return V.ENC[e]
                    }))
                }, decode: function (e) {
                    return e.replace(/[-_.]/g, (function (e) {
                        return V.DEC[e]
                    }))
                }, trim: function (e) {
                    return e.replace(/[.=]{1,2}$/, "")
                }, isBase64: function (e) {
                    return /^[A-Za-z0-9+\/]*[=]{0,2}$/.test(e)
                }, isUrlSafeBase64: function (e) {
                    return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(e)
                }
            },
            B = ["$latest_utm_source", "$latest_utm_medium", "$latest_utm_campaign", "$latest_utm_content", "$latest_utm_term", "$latest_sa_utm"],
            K = ["$latest_share_distinct_id", "$latest_share_url_path", "$latest_share_depth", "$latest_share_method"],
            G = ["sensors_share_d", "sensors_share_p", "sensors_share_i", "sensors_share_m"], z = {
                data: 1,
                onLoad: 1,
                onShow: 1,
                onReady: 1,
                onPullDownRefresh: 1,
                onShareAppMessage: 1,
                onShareTimeline: 1,
                onReachBottom: 1,
                onPageScroll: 1,
                onResize: 1,
                onTabItemTap: 1,
                onHide: 1,
                onUnload: 1
            }, J = "$identity_email", Y = "$identity_mobile", Z = "$identity_login_id", W = "1.18.4", X = "MiniProgram",
            Q = {
                init_status: !1,
                life_state: {app_launched: !1},
                plugin: {init_list: [], uninitialized_list: []},
                privacy: {enable_data_collect: !1},
                initialState: {queue: [], isComplete: !1},
                preset_properties: {$lib: X, $lib_version: W},
                promise_list: [],
                query_share_depth: 0,
                page_show_time: Date.now(),
                mp_show_time: null,
                share_distinct_id: "",
                share_method: "",
                current_scene: "",
                is_first_launch: !1,
                wx_sdk_version: "",
                global_title: {},
                page_route_map: []
            };

        function ee() {
            if (wx.getAccountInfoSync) {
                var e = wx.getAccountInfoSync(), t = e && e.miniProgram ? e.miniProgram : {};
                return {appId: t.appId, appEnv: t.envVersion, appVersion: t.version}
            }
            return {}
        }

        function te() {
            var e = ee();
            return e && e.appId ? e.appId : ""
        }

        function ne() {
            var e = te(), t = "$identity_mp_openid";
            return e && (t = "$identity_mp_" + e + "_openid"), t
        }

        function re(e) {
            return ie(e = String(e), 113)
        }

        function ie(e, t) {
            t = "number" == typeof t ? t : 13;
            for (var n = (e = String(e)).split(""), r = 0, i = n.length; r < i; r++) n[r].charCodeAt(0) < 126 && (n[r] = String.fromCharCode((n[r].charCodeAt(0) + t) % 126));
            return n.join("")
        }

        var oe = Object.prototype.hasOwnProperty, ae = {
            storageInfo: null, store_queue: [], getUUID: function () {
                return Date.now() + "-" + Math.floor(1e7 * O()) + "-" + O().toString(16).replace(".", "") + "-" + String(31242 * O()).replace(".", "").slice(0, 8)
            }, getStorage: function () {
                return this.storageInfo || (this.storageInfo = p._.getStorageSync(l.storage_store_key) || ""), this.storageInfo
            }, _state: {}, mem: {
                mdata: [], getLength: function () {
                    return this.mdata.length
                }, add: function (e) {
                    this.mdata.push(e)
                }, clear: function (e) {
                    this.mdata.splice(0, e)
                }
            }, toState: function (e) {
                var t = null, n = this;

                function r() {
                    t.distinct_id ? n._state = t : n.set("distinct_id", n.getUUID())
                }

                M(e) ? (t = JSON.parse(e), r()) : k(e) ? (t = e, r()) : this.set("distinct_id", this.getUUID());
                var i = this._state._first_id || this._state.first_id,
                    o = this._state._distinct_id || this._state.distinct_id, a = this._state.openid,
                    s = (this._state.history_login_id ? this._state.history_login_id : {}).name;
                if (this._state.identities && q(this._state.identities)) {
                    var u = JSON.parse(re(this._state.identities));
                    this._state.identities = u
                }
                var c, f, p = ne();
                if (this._state.identities && k(this._state.identities) && !$(this._state.identities)) {
                    var l = (f = "$mp_openid", (c = te()) && (f = "$mp_" + c + "_openid"), f);
                    oe.call(this._state.identities, "$mp_id") && (this._state.identities.$identity_mp_id = this._state.identities.$mp_id, delete this._state.identities.$mp_id), oe.call(this._state.identities, "$mp_unionid") && (this._state.identities.$identity_mp_unionid = this._state.identities.$mp_unionid, delete this._state.identities.$mp_unionid), oe.call(this._state.identities, l) && (this._state.identities[p] = this._state.identities[l], delete this._state.identities[l])
                } else this._state.identities = {}, this._state.identities.$identity_mp_id = this.getUUID();

                function d(e) {
                    for (var t in ae._state.identities) oe.call(ae._state.identities, t) && "$identity_mp_id" !== t && t !== e && delete ae._state.identities[t]
                }

                a && (this._state.identities[p] = a), i ? s && oe.call(this._state.identities, s) ? this._state.identities[s] !== o && (this._state.identities[s] = o, d(s), this._state.history_login_id.value = o) : (this._state.identities[Z] = o, d(Z), this._state.history_login_id = {
                    name: Z,
                    value: o
                }) : this._state.history_login_id = {name: "", value: ""}, this.save()
            }, getFirstId: function () {
                return this._state._first_id || this._state.first_id
            }, getDistinctId: function () {
                return this.getLoginDistinctId() || this._state._distinct_id || this._state.distinct_id
            }, getUnionId: function () {
                var e = {}, t = this._state._first_id || this._state.first_id, n = this.getDistinctId();
                return t && n ? (e.login_id = n, e.anonymous_id = t) : e.anonymous_id = n, e
            }, getHistoryLoginId: function () {
                return k(this._state.history_login_id) ? this._state.history_login_id : null
            }, getLoginDistinctId: function () {
                var e = this.getHistoryLoginId();
                return k(e) && e.value ? e.name !== Z ? e.name + "+" + e.value : e.value : null
            }, getProps: function () {
                return this._state.props || {}
            }, setProps: function (e, t) {
                var n = this._state.props || {};
                t ? this.set("props", e) : (x(n, e), this.set("props", n))
            }, set: function (e, t) {
                var n = {};
                for (var r in "string" == typeof e ? n[e] = t : "object" == f(e) && (n = e), this._state = this._state || {}, n) this._state[r] = n[r], "first_id" === r ? delete this._state._first_id : "distinct_id" === r && (delete this._state._distinct_id, p.events.emit("changeDistinctId"));
                this.save()
            }, identitiesSet: function (e) {
                var t = {};
                switch (e.type) {
                    case"login":
                        t.$identity_mp_id = this._state.identities.$identity_mp_id, t[e.id_name] = e.id;
                        break;
                    case"logout":
                        t.$identity_mp_id = this._state.identities.$identity_mp_id
                }
                this.set("identities", t)
            }, change: function (e, t) {
                this._state["_" + e] = t
            }, encryptStorage: function () {
                var e = this.getStorage(), t = "data:enc;";
                k(e) ? e = t + ie(JSON.stringify(e)) : q(e) && -1 === e.indexOf(t) && (e = t + ie(e)), p._.setStorageSync(l.storage_store_key, e)
            }, save: function () {
                var e = N(this._state), t = ie(JSON.stringify(e.identities));
                e.identities = t, delete e._first_id, delete e._distinct_id, l.encrypt_storage && (e = "data:enc;" + ie(JSON.stringify(e))), p._.setStorageSync(l.storage_store_key, e)
            }, init: function () {
                var e = this.getStorage(), t = ae.getUUID();
                if (e) q(e) && -1 !== e.indexOf("data:enc;") && (e = e.substring(9), e = JSON.parse(re(e))), this.toState(e); else {
                    Q.is_first_launch = !0;
                    var n = new Date, r = n.getTime();
                    n.setHours(23), n.setMinutes(59), n.setSeconds(60), this.set({
                        distinct_id: t,
                        first_visit_time: r,
                        first_visit_day_time: n.getTime(),
                        identities: {$identity_mp_id: t},
                        history_login_id: {name: "", value: ""}
                    })
                }
                this.checkStoreInit()
            }, checkStoreInit: function () {
                Q.init_status && (this.store_queue.length > 0 && S(this.store_queue, (function (e) {
                    p[e.method].apply(p, w.call(e.params))
                })), this.store_queue = [])
            }
        };

        function se(e) {
            var t = "";
            try {
                t = decodeURIComponent(e)
            } catch (n) {
                t = e
            }
            return t
        }

        var ue = Object.prototype.hasOwnProperty, ce = se;

        function fe() {
            var e = App;
            App = function (t) {
                t[l.name] = p, e.apply(this, arguments)
            }
        }

        function pe() {
            var e = He(), t = Fe(),
                n = {$referrer: e.route, $referrer_title: e.title, $title: t.title, $url: t.url};
            return !0 === l.preset_properties.url_path && (n.$url_path = t.path), n
        }

        function le(e) {
            function t(e) {
                return e < 10 ? "0" + e : e
            }

            return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds())
        }

        function de(e) {
            (k(e) || P(e)) && S(e, (function (t, n) {
                k(t) || P(t) ? de(e[n]) : U(t) && (e[n] = le(t))
            }))
        }

        function he(e) {
            return e.length > l.max_string_length ? (d(), e.slice(0, l.max_string_length)) : e
        }

        function _e(e) {
            k(e) && S(e, (function (t, n) {
                k(t) ? _e(e[n]) : q(t) && (e[n] = he(t))
            }))
        }

        function ve(e) {
            k(e) && S(e, (function (t, n) {
                if (E(t)) try {
                    e[n] = t(), E(e[n]) && (d(), delete e[n])
                } catch (t) {
                    delete e[n], d()
                }
            }))
        }

        var ge = {
            checkKeyword: function (e) {
                return /^((?!^distinct_id$|^original_id$|^device_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_group|^user_tag)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i.test(e)
            }, checkIdLength: function (e) {
                return !(String(e).length > 255 && (d(), 1))
            }
        };

        function me(e) {
            return k(e) ? (S(e, (function (t, n) {
                if (P(t)) {
                    var r = [];
                    S(t, (function (e) {
                        if (q(e)) r.push(e); else if (R(e)) r.push("null"); else try {
                            r.push(JSON.stringify(e))
                        } catch (e) {
                            d()
                        }
                    })), e[n] = r
                }
                if (k(t)) try {
                    e[n] = JSON.stringify(t)
                } catch (r) {
                    delete e[n], d()
                } else q(t) || j(t) || U(t) || L(t) || P(t) || (d(), delete e[n])
            })), e) : e
        }

        function ye(e) {
            var t, n, r, i, o, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = 0,
                u = 0, c = "", f = [];
            if (!e) return e;
            e = function (e) {
                var t, n, r, i, o = "";
                for (t = n = 0, r = (e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, i = 0; i < r; i++) {
                    var a = e.charCodeAt(i), s = null;
                    a < 128 ? n++ : s = a > 127 && a < 2048 ? String.fromCharCode(a >> 6 | 192, 63 & a | 128) : String.fromCharCode(a >> 12 | 224, a >> 6 & 63 | 128, 63 & a | 128), null !== s && (n > t && (o += e.substring(t, n)), o += s, t = n = i + 1)
                }
                return n > t && (o += e.substring(t, e.length)), o
            }(e);
            do {
                t = (o = e.charCodeAt(s++) << 16 | e.charCodeAt(s++) << 8 | e.charCodeAt(s++)) >> 18 & 63, n = o >> 12 & 63, r = o >> 6 & 63, i = 63 & o, f[u++] = a.charAt(t) + a.charAt(n) + a.charAt(r) + a.charAt(i)
            } while (s < e.length);
            switch (c = f.join(""), e.length % 3) {
                case 1:
                    c = c.slice(0, -2) + "==";
                    break;
                case 2:
                    c = c.slice(0, -1) + "="
            }
            return c
        }

        function be(e) {
            for (var t, n, r, i, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a = "", s = 0, u = (e = String(e)).length % 3; s < e.length;) ((n = e.charCodeAt(s++)) > 255 || (r = e.charCodeAt(s++)) > 255 || (i = e.charCodeAt(s++)) > 255) && d(), a += o.charAt((t = n << 16 | r << 8 | i) >> 18 & 63) + o.charAt(t >> 12 & 63) + o.charAt(t >> 6 & 63) + o.charAt(63 & t);
            return u ? a.slice(0, u - 3) + "===".substring(u) : a
        }

        function we(e) {
            return be(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (function (e, t) {
                return String.fromCharCode("0x" + t)
            })))
        }

        function Se() {
            var e = {};
            try {
                var t = getCurrentPages();
                e = t[t.length - 1]
            } catch (e) {
                d()
            }
            return e
        }

        function ke() {
            var e = "未取到";
            try {
                var t = Se();
                e = t ? t.route : e
            } catch (e) {
                d()
            }
            return e
        }

        function Ie() {
            return !!("object" == f(ae._state) && j(ae._state.first_visit_day_time) && ae._state.first_visit_day_time > (new Date).getTime())
        }

        function Oe(e) {
            var t = ke(), n = "";
            return k(e) && e.sensors_mp_encode_url_query && (n = e.sensors_mp_encode_url_query), t ? n ? t + "?" + n : t : "未取到"
        }

        function xe(e) {
            return q(e) ? e.replace(/^\//, "") : "取值异常"
        }

        function Te(e, t, n, r) {
            if (!k(e)) return {};
            var i = {};
            if (e.sa_utm) for (var o in e) "sa_utm" !== o ? C(l.source_channel, o) && (i[n + o] = e[o]) : i[r + o] = e[o]; else for (var a in e) -1 === " utm_source utm_medium utm_campaign utm_content utm_term ".indexOf(" " + a + " ") ? C(l.source_channel, a) && (i[n + a] = e[a]) : i[t + a] = e[a];
            return i
        }

        function Pe(e) {
            var t = e.split("?"), n = [], r = {};
            return t && t[1] ? (S(t[1].split("&"), (function (e) {
                (n = e.split("="))[0] && n[1] && (r[n[0]] = n[1])
            })), r) : {}
        }

        function Ee(e) {
            return j(e) || q(e) && "" !== e ? e = "wx-" + String(e) : "未取到值"
        }

        function Ae(e, t) {
            if (!k(e)) return d(), "";
            var n = [];
            for (var r in e) if (ue.call(e, r)) {
                var i = e[r];
                void 0 === i ? n.push(r + "=") : (i = t ? encodeURIComponent(i) : i, n.push(r + "=" + i))
            }
            return n.join("&")
        }

        function De(e) {
            if (k(e)) for (var t = 0; t < G.length; t++) delete e[G[t]]; else d()
        }

        function Ce(e) {
            var t = {}, n = {};
            if (l.preset_events.share_info_use_string) {
                n = e.query;
                for (var r = 0; r < G.length; r++) {
                    if (!ue.call(n, G[r])) return {};
                    n[G[r]] = se(n[G[r]])
                }
                t = {
                    depth: Number(n.sensors_share_d),
                    path: n.sensors_share_p || "",
                    id: n.sensors_share_i || "",
                    method: n.sensors_share_m || ""
                }
            } else {
                if (!e.query.sampshare) return {};
                if (!M(n = se(e.query.sampshare))) return {};
                t = {depth: (n = JSON.parse(n)).d, path: n.p, id: n.i, method: n.m}
            }
            return t
        }

        function $e(e, t) {
            var n = {}, r = {}, i = ae.getDistinctId(), o = ae.getFirstId();
            if (e && k(e.query)) {
                if ($(n = Ce(e))) return {};
                var a = n.depth, s = n.path, u = n.id, c = n.method
            }
            "string" == typeof u ? (t.$share_distinct_id = u, Q.share_distinct_id = u, r.$latest_share_distinct_id = u) : t.$share_distinct_id = "取值异常", "number" == typeof a ? !Q.share_distinct_id || Q.share_distinct_id !== i && Q.share_distinct_id !== o ? !Q.share_distinct_id || Q.share_distinct_id === i && Q.share_distinct_id === o ? t.$share_depth = "-1" : (t.$share_depth = a + 1, Q.query_share_depth = a + 1, r.$latest_share_depth = a + 1) : (t.$share_depth = a, Q.query_share_depth = a, r.$latest_share_depth = a) : t.$share_depth = "-1", "string" == typeof s ? (t.$share_url_path = s, r.$latest_share_url_path = s) : t.$share_url_path = "取值异常", "string" == typeof c ? (t.$share_method = c, r.$latest_share_method = c) : t.$share_method = "取值异常", Ze(r)
        }

        function Ne() {
            if (l.preset_events.share_info_use_string) return Ae({
                sensors_share_i: ae.getDistinctId() || "取值异常",
                sensors_share_p: ke(),
                sensors_share_d: Q.query_share_depth,
                sensors_share_m: Q.share_method
            }, !0);
            var e = JSON.stringify({
                i: ae.getDistinctId() || "取值异常",
                p: ke(),
                d: Q.query_share_depth,
                m: Q.share_method
            });
            return "sampshare=" + encodeURIComponent(e)
        }

        function Re(e) {
            if (!e || !k(e.query)) return {};
            var t, n, r, i, o = {};
            return o.query = x({}, e.query), "string" == typeof o.query.scene && (t = o.query, n = ["utm_source", "utm_content", "utm_medium", "utm_campaign", "utm_term", "sa_utm"].concat(l.source_channel), r = new RegExp("(" + n.join("|") + ")%3D", "i"), 1 === (i = Object.keys(t)).length && "scene" === i[0] && r.test(t.scene)) && (o.scene = o.query.scene, delete o.query.scene), e.query.q && e.query.scancode_time && "101" === String(e.scene).slice(0, 3) && (o.q = String(o.query.q), delete o.query.q, delete o.query.scancode_time), o
        }

        function qe(e) {
            var t = Re(e), n = t.scene, r = t.q, i = t.query;
            for (var o in i) i[o] = se(i[o]);
            return n && x(i, Pe(n = -1 !== (n = se(n)).indexOf("?") ? "?" + n.replace(/\?/g, "") : "?" + n)), r && x(i, Pe(se(r))), i
        }

        function Ue(e, t) {
            var n = {}, r = qe(e), i = Te(r, "$", "_", "$"), o = Te(r, "$latest_", "_latest_", "$latest_");
            return n.pre1 = i, n.pre2 = o, x(t, i), n
        }

        function Le(e, t) {
            $(e.query) || e.query && e.query._sfs && (t.$sf_source = e.query._sfs, p.registerApp({$latest_sf_source: t.$sf_source}))
        }

        function je(e) {
            try {
                var t = Se(), n = N(t ? t.options : "");
                for (var r in n) n[r] = se(n[r]);
                !$(n) && n._sfs && (e.$sf_source = n._sfs)
            } catch (e) {
                d()
            }
        }

        function Me() {
            var e = {route: "直接打开", path: "直接打开", title: ""};
            try {
                var t = Se();
                if (t && t.route) {
                    var n = t.sensors_mp_url_query ? "?" + t.sensors_mp_url_query : "", r = t.route, i = Be(r);
                    e.route = r + n, e.path = r, e.title = i, Q.page_route_map.length >= 2 ? (Q.page_route_map.shift(), Q.page_route_map.push(e)) : Q.page_route_map.push(e)
                }
            } catch (e) {
                d()
            }
        }

        function He() {
            var e = {route: "直接打开", path: "直接打开", title: ""};
            return Q.page_route_map.length > 1 && (e.title = Q.page_route_map[0].title, e.route = Q.page_route_map[0].route, e.path = Q.page_route_map[0].path), e
        }

        function Fe() {
            var e = Se(), t = {title: "", url: "", path: "未取到"};
            if (e && e.route) {
                var n = e.sensors_mp_url_query ? "?" + e.sensors_mp_url_query : "";
                t.title = Be(e.route), t.url = e.route + n, t.path = e.route
            }
            return t
        }

        function Ve(e, t, n) {
            var r = He();
            k(e) && (t ? Q.page_route_map.length > 0 && t ? (n = n ? "?" + n : "", e.$referrer = xe(t) + n, e.$referrer_title = Be(t)) : (e.$referrer = "直接打开", e.$referrer_title = "") : (e.$referrer = r.route, e.$referrer_title = r.title))
        }

        function Be(e) {
            if ("未取到" === e || !e) return "";
            var t = "";
            try {
                if (__wxConfig) {
                    var n = __wxConfig, r = __wxConfig.page || {}, i = r[e] || r[e + ".html"], o = {}, a = {};
                    if (n.global && n.global.window && n.global.window.navigationBarTitleText && (o.titleVal = n.global.window.navigationBarTitleText), i && i.window && i.window.navigationBarTitleText && (a.titleVal = i.window.navigationBarTitleText), !a.titleVal && __wxAppCode__) {
                        var s = __wxAppCode__[e + ".json"];
                        s && s.navigationBarTitleText && (a.titleVal = s.navigationBarTitleText)
                    }
                    if (S(Q.global_title, (function (n, r) {
                        if (r === e) return t = n
                    })), 0 === t.length) {
                        var u = x(o, a);
                        t = u.titleVal || ""
                    }
                }
            } catch (e) {
                d()
            }
            return t
        }

        function Ke(e) {
            if (ze(Q.wx_sdk_version, "2.10.0") >= 0) e.timeout = l.datasend_timeout, wx.request(e); else {
                var t = wx.request(e);
                setTimeout((function () {
                    k(t) && E(t.abort) && t.abort()
                }), l.datasend_timeout)
            }
        }

        function Ge(e) {
            return "string" != typeof e && "number" != typeof e || "" === e ? (d(), !1) : "number" != typeof e || (e = String(e), /^\d+$/.test(e)) ? !!ge.checkIdLength(e) && e : (d(), !1)
        }

        function ze(e, t) {
            e = e.split("."), t = t.split(".");
            for (var n = Math.max(e.length, t.length); e.length < n;) e.push("0");
            for (; t.length < n;) t.push("0");
            for (var r = 0; r < n; r++) {
                var i = parseInt(e[r]), o = parseInt(t[r]);
                if (i > o) return 1;
                if (i < o) return -1
            }
            return 0
        }

        function Je(e) {
            return q(e) ? e.toLocaleUpperCase() : e
        }

        function Ye(e) {
            $(e) || (function (e, t) {
                var n = !1;
                for (var r in t) e[t[r]] && (n = !0);
                return n
            }(e, B) && (p.clearAppRegister(B), p.clearAllProps(B)), l.is_persistent_save.utm ? p.register(e) : p.registerApp(e))
        }

        function Ze(e) {
            (e.$latest_share_depth || e.$latest_share_distinct_id || e.$latest_share_url_path || e.$latest_share_method) && (p.clearAppRegister(K), p.clearAllProps(K), l.is_persistent_save.share ? p.register(e) : p.registerApp(e))
        }

        function We(e, t) {
            if (e && k(e) && !$(e)) {
                var n = [];
                return S(e, (function (e, r) {
                    "q" === r && q(e) && 0 === e.indexOf("http") || (t ? n.push(r + "=" + e) : n.push(r + "=" + se(e)))
                })), n.join("&")
            }
            return ""
        }

        function Xe() {
            try {
                var e = wx.setNavigationBarTitle;
                Object.defineProperty(wx, "setNavigationBarTitle", {
                    get: function () {
                        return function (t) {
                            var n = ke();
                            t = k(t) ? t : {}, Q.global_title[n] = t.title, e.call(this, t)
                        }
                    }
                })
            } catch (e) {
                d()
            }
        }

        function Qe() {
            var e = {};
            try {
                var t = N(Se().options);
                for (var n in t) t[n] = se(t[n]);
                e = Te(t, "$", "_", "$")
            } catch (e) {
                d()
            }
            return e
        }

        function et(e, t) {
            return e !== ae._state.history_login_id.name || ae._state.history_login_id.value !== t
        }

        function tt(e) {
            var t = ae.getFirstId(), n = ae.getDistinctId();
            return t ? e === t : e === n
        }

        function nt(e, t) {
            var n, r = ["$identity_anonymous_id"], i = c((P(t) && (r = r.concat(t)), r));
            try {
                for (i.s(); !(n = i.n()).done;) {
                    if (n.value === e) return !0
                }
            } catch (e) {
                i.e(e)
            } finally {
                i.f()
            }
            return !1
        }

        function rt(e) {
            var t = ye(e = JSON.stringify(e));
            return encodeURIComponent(t)
        }

        function it() {
            wx.onNetworkStatusChange((function (e) {
                p.registerApp({$network_type: e.networkType || ""})
            }))
        }

        function ot() {
            return new Promise((function (e, t) {
                wx.getNetworkType({
                    success: function (t) {
                        Q.preset_properties.$network_type = Je(t.networkType), e()
                    }, fail: function (e) {
                        d(), t()
                    }
                })
            }))
        }

        function at() {
            var e = Q.preset_properties;
            return new Promise((function (t) {
                wx.getSystemInfo({
                    success: function (n) {
                        var r, i;
                        e.$brand = Je(n.brand), e.$manufacturer = n.brand, e.$model = n.model, e.$screen_width = Number(n.screenWidth), e.$screen_height = Number(n.screenHeight), e.$os = "ios" === (i = (r = n.platform).toLowerCase()) ? "iOS" : "android" === i ? "Android" : r, e.$os_version = n.system.indexOf(" ") > -1 ? n.system.split(" ")[1] : n.system, Q.wx_sdk_version = n.SDKVersion, e.$mp_client_app_version = n.version, e.$mp_client_basic_library_version = Q.wx_sdk_version;
                        var o = (new Date).getTimezoneOffset(), a = ee();
                        j(o) && (e.$timezone_offset = o), a.appId && (e.$app_id = a.appId), a.appVersion && (e.$app_version = a.appVersion), t()
                    }
                })
            }))
        }

        var st = {currentProps: Q.preset_properties}, ut = {
            info: function () {
                if (l.show_log && "object" == ("undefined" == typeof console ? "undefined" : f(console)) && function () {
                }) try {
                    if (3 === arguments.length) return;
                    if (2 === arguments.length) return;
                    if (1 === arguments.length) return
                } catch (e) {
                }
            }
        };

        function ct(e) {
            return "function" == typeof e || !(!e || "object" != f(e)) && ct(e.listener)
        }

        var ft = function () {
            function e() {
                s(this, e), this._events = {}
            }

            return u(e, [{
                key: "on", value: function (e, t) {
                    if (!e || !t) return !1;
                    if (!ct(t)) throw new Error("listener must be a function");
                    this._events[e] = this._events[e] || [];
                    var n = "object" == f(t);
                    return this._events[e].push(n ? t : {listener: t, once: !1}), this
                }
            }, {
                key: "prepend", value: function (e, t) {
                    if (!e || !t) return !1;
                    if (!ct(t)) throw new Error("listener must be a function");
                    this._events[e] = this._events[e] || [];
                    var n = "object" == f(t);
                    return this._events[e].unshift(n ? t : {listener: t, once: !1}), this
                }
            }, {
                key: "prependOnce", value: function (e, t) {
                    return this.prepend(e, {listener: t, once: !0})
                }
            }, {
                key: "once", value: function (e, t) {
                    return this.on(e, {listener: t, once: !0})
                }
            }, {
                key: "off", value: function (e, t) {
                    var n = this._events[e];
                    if (!n) return !1;
                    if ("number" == typeof t) n.splice(t, 1); else if ("function" == typeof t) for (var r = 0, i = n.length; r < i; r++) n[r] && n[r].listener === t && n.splice(r, 1);
                    return this
                }
            }, {
                key: "emit", value: function (e, t) {
                    var n = this._events[e];
                    if (!n) return !1;
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r];
                        i && (i.listener.call(this, t || {}), i.once && this.off(e, r))
                    }
                    return this
                }
            }, {
                key: "removeAllListeners", value: function (e) {
                    e && this._events[e] ? this._events[e] = [] : this._events = {}
                }
            }, {
                key: "listeners", value: function (e) {
                    return e && "string" == typeof e ? this._events[e] : this._events
                }
            }]), e
        }(), pt = function (e) {
            o(n, e);
            var t = a(n);

            function n() {
                var e;
                return s(this, n), (e = t.call(this)).cacheEvents = [], e.maxLen = 20, e
            }

            return u(n, [{
                key: "replay", value: function (e, t) {
                    this.on(e, t), this.cacheEvents.length > 0 && this.cacheEvents.forEach((function (n) {
                        n.type === e && t.call(null, n.data)
                    }))
                }
            }, {
                key: "emit", value: function (e, t) {
                    r(i(n.prototype), "emit", this).apply(this, arguments), this.cacheEvents.push({
                        type: e,
                        data: t
                    }), this.cacheEvents.length > this.maxLen && this.cacheEvents.shift()
                }
            }]), n
        }(ft), lt = Object.freeze({
            __proto__: null,
            decodeURIComponent: ce,
            encodeDates: function e(t) {
                return S(t, (function (n, r) {
                    U(n) ? t[r] = le(n) : k(n) && (t[r] = e(n))
                })), t
            },
            formatDate: le,
            searchObjDate: de,
            formatString: he,
            searchObjString: _e,
            parseSuperProperties: ve,
            unique: function (e) {
                for (var t, n = [], r = {}, i = 0; i < e.length; i++) (t = e[i]) in r || (r[t] = !0, n.push(t));
                return n
            },
            check: ge,
            getUtmFromPage: Qe,
            setQuery: We,
            setLatestShare: Ze,
            setLatestChannel: Ye,
            setUpperCase: Je,
            compareSDKVersion: ze,
            validId: Ge,
            wxrequest: Ke,
            getPageTitle: Be,
            setPageRefData: Ve,
            getCurrentPageInfo: Fe,
            getRefPage: He,
            setRefPage: Me,
            setPageSfSource: je,
            setSfSource: Le,
            setUtm: Ue,
            getMixedQuery: qe,
            detectOptionQuery: Re,
            getShareInfo: Ne,
            setShareInfo: $e,
            shareInfoData: Ce,
            delObjectKey: De,
            objToParam: Ae,
            getMPScene: Ee,
            getStorageSync: function (e) {
                var t = "";
                try {
                    t = wx.getStorageSync(e)
                } catch (e) {
                    d()
                }
                return t
            },
            setStorageSync: function (e, t) {
                var n = function () {
                    wx.setStorageSync(e, t)
                };
                try {
                    n()
                } catch (e) {
                    d();
                    try {
                        n()
                    } catch (e) {
                        d()
                    }
                }
            },
            getObjFromQuery: Pe,
            getCustomUtmFromQuery: Te,
            getPath: xe,
            getCurrentUrl: Oe,
            getIsFirstDay: Ie,
            getCurrentPath: ke,
            getCurrentPage: Se,
            urlBase64Encode: we,
            btoa: be,
            base64Encode: ye,
            strip_empty_properties: function (e) {
                var t = {};
                return S(e, (function (e, n) {
                    null == e && void 0 === e || (t[n] = e)
                })), t
            },
            strip_sa_properties: me,
            setNavigationBarTitle: Xe,
            networkStatusChange: it,
            getNetworkType: ot,
            getSystemInfo: at,
            encodeTrackData: rt,
            initAppGlobalName: fe,
            getPublicPresetProperties: pe,
            setPublicProperties: function (e) {
                if (e && e.properties) {
                    var t = He(), n = Fe(),
                        r = {$referrer: t.route, $referrer_title: t.title, $title: n.title, $url: n.url};
                    for (var i in !0 === l.preset_properties.url_path && (r.$url_path = n.path), r) ue.call(e.properties, i) || (e.properties[i] = r[i])
                }
            },
            isPresetIdKeys: nt,
            isNewLoginId: et,
            isSameAndAnonymousID: tt,
            info: st,
            logger: ut,
            getAppId: te,
            getAppInfoSync: ee,
            getOpenidNameByAppid: ne,
            rot13defs: re,
            rot13obfs: ie,
            each: S,
            isObject: k,
            getRandom: O,
            extend: x,
            extend2Lev: T,
            coverExtend: function (e) {
                return S(w.call(arguments, 1), (function (t) {
                    for (var n in t) void 0 !== t[n] && void 0 === e[n] && (e[n] = t[n])
                })), e
            },
            isArray: P,
            isFunction: E,
            isArguments: A,
            toArray: function (e) {
                return e ? e.toArray ? e.toArray() : P(e) || A(e) ? w.call(e) : D(e) : []
            },
            values: D,
            include: C,
            trim: function (e) {
                return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            },
            isEmptyObject: $,
            deepCopy: N,
            isUndefined: R,
            isString: q,
            isDate: U,
            isBoolean: L,
            isNumber: j,
            isJSONString: M,
            isInteger: H,
            isSafeInteger: F,
            slice: w,
            urlSafeBase64: V,
            EventEmitterBase: ft,
            EventEmitterEx: pt,
            log: d
        });
        var dt = {
            getData: function (e) {
                wx.getStorage({
                    key: l.storage_prepare_data_key, complete: function (t) {
                        var n = t.data && P(t.data) ? t.data : [];
                        dt.deleteAesData(n), e && e()
                    }
                })
            }, deleteAesData: function (e) {
                var t = [], n = e.length;
                if (n > 0) {
                    for (var r = 0; r < n; r++) k(e[r]) && t.push(e[r]);
                    ae.mem.mdata = t.concat(ae.mem.mdata)
                }
            }
        };
        var ht = {
            processData: function (e) {
                return e
            }, onceTrackData: function (e) {
                return "data=" + rt(e)
            }, batchTrackData: function (e) {
                var t = Date.now();
                return e.forEach((function (e) {
                    e._flush_time = t
                })), "data_list=" + rt(e)
            }, onEventSend: function () {
                return {}
            }
        }, _t = {
            dataHasSend: !0, dataHasChange: !1, syncStorage: !1, failTime: 0, init: function () {
                this.sendHasInit = !0, dt.getData(_t.syncStorageState.bind(_t)), this.batchInterval(), this.onAppHide()
            }, syncStorageState: function () {
                this.syncStorage = !0
            }, onAppHide: function () {
                var e = this;
                wx.onAppHide((function () {
                    l.batch_send && e.batchSend()
                }))
            }, send: function (e) {
                this.dataHasChange = !0, ae.mem.getLength() >= 500 && (d(), ae.mem.mdata.shift()), (e = ht.processData(e)) && ae.mem.add(e), this.sendAsOver()
            }, sendAsOver: function () {
                this.sendHasInit && ae.mem.getLength() >= l.batch_send.max_length && this.batchSend()
            }, wxrequest: function (e) {
                if (P(e.data) && e.data.length > 0) {
                    var t = ht.batchTrackData(e.data);
                    p._.wxrequest({
                        url: l.server_url,
                        method: "POST",
                        dataType: "text",
                        data: t,
                        success: function () {
                            e.success(e.len)
                        },
                        fail: function () {
                            e.fail()
                        }
                    })
                } else e.success(e.len)
            }, batchSend: function () {
                if (this.dataHasSend) {
                    var e, t, n = ae.mem.mdata;
                    (t = (e = n.length >= 100 ? n.slice(0, 100) : n).length) > 0 && (this.dataHasSend = !1, this.wxrequest({
                        data: e,
                        len: t,
                        success: this.batchRemove.bind(this),
                        fail: this.sendFail.bind(this)
                    }))
                }
            }, sendFail: function () {
                this.dataHasSend = !0, this.failTime++
            }, batchRemove: function (e) {
                ae.mem.clear(e), this.dataHasSend = !0, this.dataHasChange = !0, this.batchWrite(), this.failTime = 0
            }, is_first_batch_write: !0, batchWrite: function () {
                this.dataHasChange && (this.dataHasChange = !1, this.syncStorage && p._.setStorageSync(l.storage_prepare_data_key, ae.mem.mdata))
            }, batchInterval: function () {
                var e = this;
                !function t() {
                    setTimeout((function () {
                        e.batchWrite(), t()
                    }), 500)
                }(), function t() {
                    setTimeout((function () {
                        e.batchSend(), t()
                    }), l.batch_send.send_timeout * Math.pow(2, e.failTime))
                }()
            }
        };

        function vt(e) {
            if (!l.server_url) return !1;
            if (Q.current_scene && 1154 === Q.current_scene && !p.para.preset_events.moments_page) return !1;
            var t = p._.deepCopy(e), n = function (e, t) {
                var n = {
                    distinct_id: p.store.getDistinctId(),
                    identities: p.store._state.identities,
                    lib: {$lib: X, $lib_method: "code", $lib_version: W},
                    properties: {}
                };
                return "track_id_unbind" === e.type && "$UnbindID" === e.event && (n.identities = N(e.unbind_value), delete e.unbind_value), k(t) || (t = {}), x(n, p.store.getUnionId(), e), k(e.properties) && !$(e.properties) && x(n.properties, e.properties), e.type && "profile" === e.type.slice(0, 7) || (n._track_id = Number(String(O()).slice(2, 5) + String(O()).slice(2, 4) + String(Date.now()).slice(-4)), n.properties = x({}, pe(), Q.preset_properties, p.store.getProps(), t, n.properties), "track" === e.type && (n.properties.$is_first_day = Ie())), n.properties.$time && U(n.properties.$time) ? (n.time = 1 * n.properties.$time, delete n.properties.$time) : n.time = 1 * new Date, p.ee.sdk.emit("createData", n), p.ee.sdk.emit("beforeBuildCheck", n), p.ee.data.emit("beforeBuildCheck", n), ve(n.properties), de(n), me(n.properties), _e(n), n
            }(e, ht.onEventSend(t));
            n ? (d(), p.events.emit("send", n), p.para.batch_send ? _t.send(n) : function (e) {
                e._flush_time = Date.now();
                var t = ht.onceTrackData(e), n = l.server_url + "?" + t;
                -1 !== l.server_url.indexOf("?") && (n = l.server_url + "&" + t), Ke({url: n, method: "GET"})
            }(n)) : d()
        }

        p.popupEmitter = {
            attached: function () {
                return !1
            }
        };

        function gt(e, t, n) {
            var r = p.autoTrackCustom[n];
            if (e[t]) {
                var i = e[t];
                e[t] = function () {
                    !p.para.autoTrackIsFirst || k(p.para.autoTrackIsFirst) && !p.para.autoTrackIsFirst[n] ? (i.apply(this, arguments), r.apply(this, arguments)) : (!0 === p.para.autoTrackIsFirst || k(p.para.autoTrackIsFirst) && p.para.autoTrackIsFirst[n]) && (r.apply(this, arguments), i.apply(this, arguments))
                }
            } else e[t] = function () {
                r.apply(this, arguments)
            }
        }

        function mt(e) {
            var t, n = {}, r = {}, i = e.currentTarget || {}, o = e.target || {};
            if (k(p.para.framework) && k(p.para.framework.taro) && !p.para.framework.taro.createApp && o.id && i.id && o.id !== i.id) return !1;
            var a = i.dataset || {};
            if (t = e.type, n.$element_id = i.id, n.$element_type = a.type, n.$element_content = a.content, n.$element_name = a.name, k(e.event_prop) && (r = e.event_prop), t && bt(t)) {
                if (p.para.preset_events && p.para.preset_events.collect_element && !1 === p.para.preset_events.collect_element(arguments[0])) return !1;
                n.$url_path = p._.getCurrentPath(), p._.setPageRefData(n), n = p._.extend(n, r), p.track("$MPClick", n)
            }
        }

        function yt(e, t) {
            var n = e[t];
            e[t] = function () {
                var e = n.apply(this, arguments), t = arguments[0];
                return k(t) && (p.para.preset_events.defer_track ? setTimeout((function () {
                    mt(t)
                }), 0) : mt(t)), e
            }
        }

        function bt(e) {
            return !!{tap: 1, longpress: 1, longtap: 1}[e]
        }

        function wt(e) {
            var t = [];
            if (p.para.autoTrack && p.para.autoTrack.mpClick) {
                t = function (e) {
                    var t = z, n = [];
                    for (var r in e) "function" != typeof e[r] || t[r] || n.push(r);
                    return n
                }(e), function (e) {
                    var t = e.onTabItemTap;
                    e.onTabItemTap = function (e) {
                        t && t.apply(this, arguments);
                        var n = {};
                        e && (n.$element_content = e.text), n.$element_type = "tabBar", n.$url_path = p._.getCurrentPath(), p._.setPageRefData(n), p.track("$MPClick", n)
                    }
                }(e);
                for (var n = t.length, r = 0; r < n; r++) yt(e, t[r])
            }
        }

        function St(e) {
            p.para.autoTrack && p.para.autoTrack.pageLeave && function (e) {
                var t = e.onHide;
                e.onHide = function () {
                    t && t.apply(this, arguments), p.sendPageLeave()
                };
                var n = e.onUnload;
                e.onUnload = function () {
                    n && n.apply(this, arguments), p.sendPageLeave()
                }
            }(e), gt(e, "onLoad", "pageLoad"), gt(e, "onShow", "pageShow"), gt(e, "onAddToFavorites", "pageAddFavorites"), "function" == typeof e.onShareAppMessage && p.autoTrackCustom.pageShare(e), "function" == typeof e.onShareTimeline && p.autoTrackCustom.pageShareTimeline(e)
        }

        var kt = function () {
            this.sub = []
        };
        kt.prototype = {
            add: function (e) {
                this.sub.push(e)
            }, emit: function (e, t) {
                this.sub.forEach((function (n) {
                    n.on(e, t)
                }))
            }
        };
        var It = function (e) {
            p.events.add(this), this._events = [], this.handle = e, this.ready = !1
        };
        It.prototype = {
            on: function (e, t) {
                if (this.ready) {
                    if (E(this.handle)) try {
                        this.handle(e, t)
                    } catch (e) {
                        d()
                    }
                } else this._events.push({event: e, data: t})
            }, isReady: function () {
                var e = this;
                e.ready = !0, e._events.forEach((function (t) {
                    if (E(e.handle)) try {
                        e.handle(t.event, t.data)
                    } catch (e) {
                        d()
                    }
                }))
            }
        };
        var Ot = {};

        function xt() {
            var e;
            return n.g && n.g.sensors_data_pre_config && (e = !!n.g.sensors_data_pre_config.is_compliance_enabled && n.g.sensors_data_pre_config.is_compliance_enabled), !e || !!Q.init_status || !!Q.privacy.enable_data_collect
        }

        Ot.sdk = new pt, Ot.data = new pt;
        var Tt = Object.prototype.hasOwnProperty;

        function Pt(e, t) {
            vt({type: "profile_set_once", properties: e})
        }

        function Et(e) {
            var t = Ge(e);
            t && Dt("$identity_mp_unionid", t)
        }

        function At(e) {
            var t = Ge(e);
            if (t) {
                if (Tt.call(ae._state.identities, "$identity_mp_unionid") && t === ae._state.identities.$identity_mp_unionid) {
                    var n = ne();
                    Tt.call(ae._state.identities, n) && (delete ae._state.identities[n], delete ae._state.openid, ae.save())
                }
                Ct("$identity_mp_unionid", t)
            }
        }

        function Dt(e, t) {
            if (j(t)) {
                if (H(t) && !1 === F(t)) return d(), !1;
                t = String(t)
            }
            if (!q(e)) return d(), !1;
            var n = ae.getHistoryLoginId(), r = n ? n.name : "";
            return !ge.checkKeyword(e) || nt(e, [Z, r, "$mp_id", "$identity_mp_id"]) ? (d(), !1) : t && "" !== t && q(t) ? !!ge.checkIdLength(t) && (ae._state.identities[e] = t, ae.save(), void vt({
                type: "track_id_bind",
                event: "$BindID"
            })) : (d(), !1)
        }

        function Ct(e, t) {
            if (j(t)) {
                if (H(t) && !1 === F(t)) return d(), !1;
                t = String(t)
            }
            if (!q(e)) return d(), !1;
            if (!p._.check.checkKeyword(e) || nt(e, [Z])) return d(), !1;
            if (!t || "" === t) return d(), !1;
            if (!q(t)) return d(), !1;
            if (!p._.check.checkIdLength(t)) return !1;
            Tt.call(ae._state.identities, e) && t === ae._state.identities[e] && ("$mp_id" !== e && "$identity_mp_id" !== e && delete ae._state.identities[e], ae.save());
            var n = ae.getDistinctId(), r = ae.getFirstId();
            n === e + "+" + t && (ae.set("first_id", ""), ae.set("distinct_id", r), ae.set("history_login_id", {
                name: "",
                value: ""
            }));
            var i = {};
            i[e] = t, vt({type: "track_id_unbind", event: "$UnbindID", unbind_value: i})
        }

        var $t = {
            trackCustom: function (e, t, n) {
                var r = l.autoTrack[e], i = "";
                l.autoTrack && r && ("function" == typeof r ? k(i = r()) && x(t, i) : k(r) && (x(t, r), l.autoTrack[e] = !0), p.track(n, t))
            }, appLaunch: function (e, t) {
                if (!xt()) return !1;
                if (!Q.initialState.isComplete) return Q.initialState.queue.push(["appLaunch", arguments]), Q.life_state.app_launched = !0, !1;
                Q.life_state.app_launched = !0;
                var n = {};
                if (e && e.scene ? (Q.current_scene = e.scene, n.$scene = Ee(e.scene)) : n.$scene = "未取到值", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, De(e.query)), e && e.path && (n.$url_path = xe(e.path), n.$title = Be(e.path), e.query && k(e.query))) {
                    var r = We(e.query);
                    r = r ? "?" + r : "", n.$url = n.$url_path + r
                }
                $e(e, n);
                var i = Ue(e, n);
                Q.is_first_launch ? (n.$is_first_time = !0, $(i.pre1) || p.setOnceProfile(i.pre1)) : n.$is_first_time = !1, Ye(i.pre2), Le(e, n), p.registerApp({$latest_scene: n.$scene}), n.$url_query = We(e.query), Ve(n), t ? (n = x(n, t), p.track("$MPLaunch", n)) : l.autoTrack && l.autoTrack.appLaunch && p.autoTrackCustom.trackCustom("appLaunch", n, "$MPLaunch")
            }, appShow: function (e, t) {
                var n = {};
                Q.mp_show_time = (new Date).getTime(), e && e.scene ? (Q.current_scene = e.scene, n.$scene = Ee(e.scene)) : n.$scene = "未取到值", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, De(e.query)), e && e.path && (n.$url_path = xe(e.path), n.$title = Be(e.path)), $e(e, n), Ye(Ue(e, n).pre2), Le(e, n), p.registerApp({$latest_scene: n.$scene}), n.$url_query = We(e.query), Ve(n, e.path, n.$url_query), e && e.path && (n.$url = e.path + (n.$url_query ? "?" + n.$url_query : "")), t ? (n = x(n, t), p.track("$MPShow", n)) : l.autoTrack && l.autoTrack.appShow && p.autoTrackCustom.trackCustom("appShow", n, "$MPShow")
            }, appHide: function (e) {
                var t = (new Date).getTime(), n = {};
                n.$url_path = ke(), Q.mp_show_time && t - Q.mp_show_time > 0 && (t - Q.mp_show_time) / 36e5 < 24 && (n.event_duration = (t - Q.mp_show_time) / 1e3), Ve(n), e ? (n = x(n, e), p.track("$MPHide", n)) : l.autoTrack && l.autoTrack.appHide && p.autoTrackCustom.trackCustom("appHide", n, "$MPHide")
            }, pageLoad: function (e) {
                Q.current_scene && 1010 === Q.current_scene && e && (e.sampshare && delete e.sampshare, De(e)), e && k(e) && (this.sensors_mp_url_query = We(e), this.sensors_mp_encode_url_query = We(e, !0))
            }, pageShow: function () {
                Q.page_show_time = Date.now();
                var e = {}, t = ke(), n = Be(t);
                Me(), e.$url_path = t, e.$url_query = this.sensors_mp_url_query ? this.sensors_mp_url_query : "", Ve(e = x(e, Qe())), je(e), n && (e.$title = n), l.onshow ? l.onshow(p, t, this) : -1 === l.autotrack_exclude_page.pageShow.indexOf(t) && p.autoTrackCustom.trackCustom("pageShow", e, "$MPViewScreen")
            }, pageShare: function (e) {
                var t = e.onShareAppMessage;
                e.onShareAppMessage = function () {
                    Q.share_method = "转发消息卡片";
                    var e, n = t.apply(this, arguments);
                    if (l.autoTrack && l.autoTrack.pageShare) {
                        var r = {$url_path: ke(), $share_depth: Q.query_share_depth, $share_method: Q.share_method};
                        Ve(r), p.autoTrackCustom.trackCustom("pageShare", r, "$MPShare")
                    }

                    function i(e) {
                        return k(e) || (e = {}), (R(e.path) || "" === e.path) && (e.path = Oe(this)), q(e.path) && (-1 === e.path.indexOf("?") ? e.path = e.path + "?" : "&" !== e.path.slice(-1) && (e.path = e.path + "&")), e.path = e.path + Ne(), e
                    }

                    if (p.para.allow_amend_share_path && k(n = i(n))) for (var o in n) if ((e = n[o]) && E(e.then) && E(e.catch)) try {
                        n[o] = n[o].then((function (e) {
                            return i(e)
                        }))
                    } catch (e) {
                        d()
                    }
                    return n
                }
            }, pageShareTimeline: function (e) {
                var t = e.onShareTimeline;
                e.onShareTimeline = function () {
                    Q.share_method = "朋友圈分享";
                    var e = t.apply(this, arguments);
                    if (l.autoTrack && l.autoTrack.pageShare) {
                        var n = {$url_path: ke(), $share_depth: Q.query_share_depth, $share_method: Q.share_method};
                        Ve(n), p.autoTrackCustom.trackCustom("pageShare", n, "$MPShare")
                    }
                    return l.allow_amend_share_path && ("object" != f(e) && (e = {}), "object" == f(e) && void 0 === e.query && (e.query = ""), "object" == f(e) && "string" == typeof e.query && "" !== e.query && "&" !== e.query.slice(-1) && (e.query = e.query + "&"), e.query = e.query + Ne()), e
                }
            }, pageAddFavorites: function () {
                var e = {};
                e.$url_path = ke(), l.autoTrack && l.autoTrack.mpFavorite && p.autoTrackCustom.trackCustom("mpFavorite", e, "$MPAddFavorites")
            }
        };
        var Nt = {
            getRequest: function (e) {
                wx.login({
                    success: function (t) {
                        t.code && l.appid && l.openid_url ? Ke({
                            url: l.openid_url + "&code=" + t.code + "&appid=" + l.appid,
                            method: "GET",
                            complete: function (t) {
                                k(t) && k(t.data) && t.data.openid ? e(t.data.openid) : e()
                            }
                        }) : e()
                    }
                })
            }, getWXStorage: function () {
                var e = ae.getStorage();
                if (e && k(e)) return e.openid
            }, getOpenid: function (e) {
                if (!l.appid) return e(), !1;
                var t = this.getWXStorage();
                t ? e(t) : this.getRequest(e)
            }
        }, Rt = Object.freeze({
            __proto__: null,
            setProfile: function (e, t) {
                vt({type: "profile_set", properties: e})
            },
            setOnceProfile: Pt,
            appendProfile: function (e, t) {
                if (!k(e)) return !1;
                S(e, (function (t, n) {
                    q(t) ? e[n] = [t] : P(t) ? e[n] = t : (delete e[n], d())
                })), vt({type: "profile_append", properties: e})
            },
            incrementProfile: function (e, t) {
                if (!k(e)) return !1;
                var n = e;
                q(e) && ((e = {})[n] = 1), vt({type: "profile_increment", properties: e})
            },
            track: function (e, t, n) {
                vt({type: "track", event: e, properties: t})
            },
            identify: function (e, t) {
                if (!xt()) return !1;
                if (!Q.init_status) return ae.store_queue.push({method: "identify", params: arguments}), !1;
                if (e = Ge(e)) {
                    var n = ae.getFirstId();
                    !0 === t ? n ? ae.set("first_id", e) : ae.set("distinct_id", e) : n ? ae.change("first_id", e) : ae.change("distinct_id", e)
                }
            },
            trackSignup: function (e, t, n, r) {
                var i, o, a, s;
                k(e) ? (i = e.id, o = e.event_name, a = e.id_name) : (i = e, o = t), ae.set("distinct_id", i), s = a && a !== Z ? a + "+" + i : i, vt({
                    original_id: ae.getFirstId() || ae.getDistinctId(),
                    distinct_id: s,
                    login_id: s,
                    type: "track_signup",
                    event: o,
                    properties: n
                })
            },
            login: function (e) {
                if (!(e = Ge(e))) return !1;
                if (tt(e)) return !1;
                var t = ae.getFirstId(), n = ae.getDistinctId(), r = Z;
                et(r, e) && (ae._state.identities[r] = e, ae.set("history_login_id", {
                    name: r,
                    value: e
                }), t || ae.set("first_id", n), p.trackSignup({
                    id: e,
                    event_name: "$SignUp"
                }), ae.identitiesSet({type: "login", id: e, id_name: r}))
            },
            loginWithKey: function (e, t) {
                if (!q(e)) return d(), !1;
                if (!ge.checkKeyword(e) && e.length > 100) d(); else if (!ge.checkKeyword(e)) return d(), !1;
                if (nt(e, ["$mp_openid", "$identity_mp_openid", "$identity_mp_unionid", "$mp_unionid", "$mp_id", "$identity_mp_id"])) return d(), !1;
                if (!(t = Ge(t))) return !1;
                if (tt(t)) return !1;
                var n = ae.getFirstId(), r = ae.getDistinctId();
                et(e, t) && (ae._state.identities[e] = t, ae.set("history_login_id", {
                    name: e,
                    value: t
                }), n || ae.set("first_id", r), p.trackSignup({
                    id: t,
                    event_name: "$SignUp",
                    id_name: e
                }), ae.identitiesSet({type: "login", id: t, id_name: e}))
            },
            getAnonymousID: function () {
                if (!$(ae._state)) return ae._state._first_id || ae._state.first_id || ae._state._distinct_id || ae._state.distinct_id;
                d()
            },
            getIdentities: function () {
                return $(ae._state) ? (d(), null) : ae._state.identities || null
            },
            logout: function (e) {
                var t = ae.getFirstId();
                ae.identitiesSet({type: "logout"}), ae.set("history_login_id", {
                    name: "",
                    value: ""
                }), t ? (ae.set("first_id", ""), !0 === e ? ae.set("distinct_id", ae.getUUID()) : ae.set("distinct_id", t)) : d()
            },
            getPresetProperties: function () {
                if (Q.preset_properties && Q.preset_properties.$lib) {
                    var e = {};
                    S(Q.preset_properties, (function (t, n) {
                        0 === n.indexOf("$") && (e[n] = t)
                    }));
                    var t = {$url_path: ke(), $is_first_day: Ie(), $is_first_time: Q.is_first_launch},
                        n = x(e, t, Q.preset_properties, ae.getProps());
                    return delete n.$lib, n
                }
                return {}
            },
            setOpenid: function (e, t) {
                if (d(), !(e = Ge(e))) return !1;
                if (!xt()) return !1;
                if (!Q.init_status) return ae.store_queue.push({method: "setOpenid", params: arguments}), !1;
                t && d(), ae.set("openid", e), p.identify(e, !0);
                var n = ne();
                ae._state.identities[n] = e, ae.save()
            },
            unsetOpenid: function (e) {
                d();
                var t = Ge(e);
                if (!t) return !1;
                var n = ae._state.openid;
                n === t && ae.set("openid", "");
                var r = ne();
                if (Tt.call(ae._state.identities, r) && t === ae._state.identities[r]) {
                    delete ae._state.identities[r];
                    var i = ae.getFirstId(), o = ae.getDistinctId(),
                        a = ae._state && ae._state.identities && ae._state.identities.$identity_mp_id;
                    i && i === n && a && ae.change("first_id", a), o && o === n && a && ae.change("distinct_id", a), ae.save()
                }
            },
            bindOpenid: function (e) {
                if (!(e = Ge(e))) return !1;
                var t = ne();
                this.bind(t, e)
            },
            unbindOpenid: function (e) {
                if (!Ge(e)) return !1;
                var t = ne();
                this.unbind(t, e)
            },
            setUnionid: Et,
            unsetUnionid: At,
            bindUnionid: Et,
            unbindUnionid: At,
            initWithOpenid: function (e, t) {
                (e = e || {}).appid && (l.appid = e.appid), p.openid.getOpenid((function (n) {
                    n && p.setOpenid(n, e.isCoverLogin), t && E(t) && t(n), p.init(e)
                }))
            },
            bind: Dt,
            unbind: Ct,
            setWebViewUrl: function (e, t) {
                if (d(), !q(e) || "" === e) return d(), !1;
                if (!/^http(s)?:\/\//.test(e)) return d(), !1;
                var n = /([^?#]+)(\?[^#]*)?(#.*)?/.exec(e);
                if (!n) return !1;
                var r, i = n[1] || "", o = n[2] || "", a = n[3] || "", s = "", u = ae.getDistinctId() || "",
                    c = ae.getFirstId() || "";
                V && V.encode ? u = u ? V.trim(V.encode(we(u))) : "" : ie && (u = u ? ie(u) : ""), u = encodeURIComponent(u);
                var f = c ? "f" + u : "d" + u;
                return t ? (r = a.indexOf("_sasdk"), s = a.indexOf("?") > -1 ? r > -1 ? i + o + "#" + a.substring(1, r) + "_sasdk=" + f : i + o + "#" + a.substring(1) + "&_sasdk=" + f : i + o + "#" + a.substring(1) + "?_sasdk=" + f) : (r = o.indexOf("_sasdk"), s = /^\?(\w)+/.test(o) ? r > -1 ? i + o.replace(/(_sasdk=)([^&]*)/gi, "_sasdk=" + f) + a : i + "?" + o.substring(1) + "&_sasdk=" + f + a : i + "?" + o.substring(1) + "_sasdk=" + f + a), s
            },
            quick: function () {
                var e = arguments[0], t = arguments[1], n = arguments[2], r = k(n) ? n : {};
                if ("getAnonymousID" === e) {
                    if (!$(ae._state)) return ae._state._first_id || ae._state.first_id || ae._state._distinct_id || ae._state.distinct_id;
                    d()
                } else "appLaunch" === e || "appShow" === e ? t ? p.autoTrackCustom[e](t, r) : d() : "appHide" === e && (r = k(t) ? t : {}, p.autoTrackCustom[e](r))
            },
            appLaunch: function (e, t) {
                var n = {};
                e && e.scene ? (Q.current_scene = e.scene, n.$scene = Ee(e.scene)) : n.$scene = "未取到值", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, De(e.query)), e && e.path && (n.$url_path = xe(e.path), n.$title = Be(e.path)), $e(e, n);
                var r = Ue(e, n);
                Q.is_first_launch ? (n.$is_first_time = !0, $(r.pre1) || p.setOnceProfile(r.pre1)) : n.$is_first_time = !1, Ye(r.pre2), Le(e, n), p.registerApp({$latest_scene: n.$scene}), n.$url_query = We(e.query), n.$url = e.path + (n.$url_query ? "?" + n.$url_query : ""), Ve(t), k(t) && (n = x(n, t)), p.track("$MPLaunch", n)
            },
            appShow: function (e, t) {
                var n = {};
                Q.mp_show_time = (new Date).getTime(), e && e.scene ? (Q.current_scene = e.scene, n.$scene = Ee(e.scene)) : n.$scene = "未取到值", e && e.scene && 1010 === e.scene && e.query && (e.query.sampshare && delete e.query.sampshare, De(e.query)), e && e.path && (n.$url_path = xe(e.path), n.$title = Be(e.path)), $e(e, n), Ye(Ue(e, n).pre2), Le(e, n), p.registerApp({$latest_scene: n.$scene}), n.$url_query = We(e.query), e && e.path && (n.$url = e.path + (n.$url_query ? "?" + n.$url_query : "")), Ve(n, e.path, n.$url_query), k(t) && (n = x(n, t)), p.track("$MPShow", n)
            },
            appHide: function (e) {
                var t = (new Date).getTime(), n = {};
                n.$url_path = ke(), Q.mp_show_time && t - Q.mp_show_time > 0 && (t - Q.mp_show_time) / 36e5 < 24 && (n.event_duration = (t - Q.mp_show_time) / 1e3), Ve(n), k(e) && (n = x(n, e)), p.track("$MPHide", n), p.sendStrategy.onAppHide()
            },
            pageShow: function (e) {
                var t = {}, n = ke(), r = Be(n), i = Se();
                Me(), r && (t.$title = r), t.$url_path = n, t.$url_query = i.sensors_mp_url_query ? i.sensors_mp_url_query : "", je(t = x(t, Qe())), Ve(t), k(e) && (t = x(t, e)), p.track("$MPViewScreen", t)
            },
            setPara: function (e) {
                p.para = T(l, e);
                var t = [];
                if (P(l.source_channel)) for (var n = l.source_channel.length, r = 0; r < n; r++) -1 === " utm_source utm_medium utm_campaign utm_content utm_term sa_utm ".indexOf(" " + l.source_channel[r] + " ") && t.push(l.source_channel[r]);
                l.source_channel = t, k(l.register) && x(Q.preset_properties, l.register), l.openid_url || (l.openid_url = l.server_url.replace(/([^\\\/])\/(sa)(\.gif){0,1}/, "$1/mp_login")), "number" != typeof l.send_timeout && (l.send_timeout = 1e3);
                var i = {send_timeout: 6e3, max_length: 6};
                e && e.datasend_timeout || l.batch_send && (l.datasend_timeout = 1e4), !0 === l.batch_send ? l.batch_send = x({}, i) : k(l.batch_send) && (l.batch_send = x({}, i, l.batch_send));
                var o = {share: !1, utm: !1};
                !0 === l.is_persistent_save ? (l.is_persistent_save = x({}, o), l.is_persistent_save.utm = !0) : k(l.is_persistent_save) && (l.is_persistent_save = x({}, o, l.is_persistent_save)), l.server_url ? (l.preset_properties = k(l.preset_properties) ? l.preset_properties : {}, k(l.autotrack_exclude_page) || (l.autotrack_exclude_page = {
                    pageShow: [],
                    pageLeave: []
                }), P(l.autotrack_exclude_page.pageShow) || (l.autotrack_exclude_page.pageShow = []), P(l.autotrack_exclude_page.pageLeave) || (l.autotrack_exclude_page.pageLeave = [])) : d()
            },
            getServerUrl: function () {
                return l.server_url
            },
            sendPageLeave: function () {
                var e = {}, t = "";
                try {
                    t = (e = Se()) ? e.route : ""
                } catch (e) {
                    d()
                }
                if (Q.page_show_time >= 0 && "" !== t) {
                    var n = {}, r = Be(t), i = (Date.now() - Q.page_show_time) / 1e3;
                    (isNaN(i) || i < 0) && (i = 0), n.$url_query = e.sensors_mp_url_query ? e.sensors_mp_url_query : "", n.$url_path = t, n.$title = r, n.event_duration = i, -1 === l.autotrack_exclude_page.pageLeave.indexOf(t) && p.track("$MPPageLeave", n), Q.page_show_time = -1
                }
            },
            openid: Nt,
            autoTrackCustom: $t,
            registerApp: function (e) {
                k(e) && !$(e) && (Q.preset_properties = x(Q.preset_properties, e))
            },
            register: function (e) {
                k(e) && !$(e) && ae.setProps(e)
            },
            clearAllRegister: function () {
                ae.setProps({}, !0)
            },
            clearAppRegister: function (e) {
                P(e) && S(Q.preset_properties, (function (t, n) {
                    C(e, n) && delete Q.preset_properties[n]
                }))
            },
            clearAllProps: function (e) {
                var t = ae.getProps(), n = {};
                P(e) && (S(t, (function (t, r) {
                    C(e, r) || (n[r] = t)
                })), ae.setProps(n, !0))
            }
        });
        p._ = lt, p.modules = {}, p.meta = Q, p.kit = ht, p.mergeStorageData = dt, p.dataStage = vt, p.sendStrategy = _t, p.store = ae, p.usePlugin = function (e, t) {
            if (e && e.info && "miniprogram_abtesting" === e.info.lib_plugin_name) return "function" == typeof e.init && (e.init(p, t), d()), !1;
            if (k(e) && q(e.name) && e.name && (p.modules[e.name] ? e = p.modules[e.name] : p.modules[e.name] = e), Q.init_status) "function" == typeof e.init && (e.init(p, t), d(e.name)); else {
                var n = {target: e, para: t};
                Q.plugin.uninitialized_list.push(n)
            }
        }, p.checkPluginInitStatus = function () {
            if (Q.plugin.uninitialized_list.length > 0) {
                for (var e in Q.plugin.uninitialized_list) {
                    var t = Q.plugin.uninitialized_list[e];
                    t && t.target && "function" == typeof t.target.init && (t.target.init(p, t.para), k(t.target) && q(t.target.name) && t.target.name && d(t.target.name))
                }
                Q.plugin.uninitialized_list = []
            }
        }, p.eventSub = It, p.events = new kt, p.ee = Ot, p.initialState = Q.initialState, p.IDENTITY_KEY = {
            EMAIL: J,
            MOBILE: Y
        }, function (e) {
            for (var t in Rt) e[t] = Rt[t]
        }(p), S(["setProfile", "setOnceProfile", "track", "quick", "incrementProfile", "appendProfile", "login", "logout", "registerApp", "register", "clearAllRegister", "clearAllProps", "clearAppRegister", "bind", "unbind", "unsetOpenid", "setUnionid", "unsetUnionid", "bindOpenid", "unbindOpenid", "bindUnionid", "unbindUnionid"], (function (e) {
            var t = p[e];
            p[e] = function () {
                return !!xt() && (!E(p.getDisabled) || !p.getDisabled()) && void (Q.initialState.isComplete ? t.apply(p, arguments) : Q.initialState.queue.push([e, arguments]))
            }
        })), Xe(), it(), fe(), wx.onAppShow((function (e) {
            if (!Q.life_state.app_launched) {
                var t = wx.getLaunchOptionsSync() || {};
                p.autoTrackCustom.appLaunch(t)
            }
            p.autoTrackCustom.appShow(e)
        })), wx.onAppHide((function () {
            p.autoTrackCustom.appHide()
        })), function () {
            var e = Page;
            Page = function (t) {
                try {
                    t || (t = {}), wt(t), St(t), e.apply(this, arguments)
                } catch (t) {
                    e.apply(this, arguments)
                }
            };
            var t = Component;
            Component = function (e) {
                try {
                    e || (e = {}), e.methods || (e.methods = {}), wt(e.methods), St(e.methods), t.apply(this, arguments)
                } catch (e) {
                    t.apply(this, arguments)
                }
            }
        }(), p.init = function (e) {
            if (!0 === Q.init_status) return !1;

            function t() {
                Q.initialState.isComplete = !0, Q.initialState.queue.length > 0 && (S(Q.initialState.queue, (function (e) {
                    "appLaunch" === e[0] ? p.autoTrackCustom.appLaunch.apply(p.autoTrackCustom, w.call(e[1])) : p[e[0]].apply(p, w.call(e[1]))
                })), Q.initialState.queue = []), function () {
                    if (!Q.life_state.app_launched) {
                        var e = wx.getLaunchOptionsSync() || {};
                        p.autoTrackCustom.appLaunch(e)
                    }
                }(), p.ee.sdk.emit("ready")
            }

            Q.init_status = !0, p.ee.sdk.emit("beforeInit"), e && k(e) && p.setPara(e), p.ee.sdk.emit("initPara"), p.ee.sdk.emit("afterInitPara"), p.store.init(), Q.is_first_launch && Pt({$first_visit_time: new Date}), p.checkPluginInitStatus(), p.para.batch_send && _t.init();
            var n = [ot(), at()].concat(Q.promise_list);
            Promise.all(n).then((function () {
                t()
            })).catch((function () {
                t()
            }))
        };
        p.usePlugin({
            init: function (e) {
                e.disableSDK = this.disableSDK.bind(this), e.enableSDK = this.enableSDK.bind(this), e.getDisabled = this.getDisabled.bind(this)
            }, name: "DisableSDK", disabled: !1, disableSDK: function () {
                this.disabled = !0
            }, enableSDK: function () {
                this.disabled = !1
            }, getDisabled: function () {
                return this.disabled
            }
        }), e.exports = p
    }, 37878: function (e) {
        e.exports = function (e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }, e.exports.__esModule = !0, e.exports.default = e.exports
    }, 9466: function (e, t, n) {
        var r = n(43182), i = n(31077), o = n(86681);
        e.exports = function (e) {
            var t = i();
            return function () {
                var n, i = r(e);
                if (t) {
                    var a = r(this).constructor;
                    n = Reflect.construct(i, arguments, a)
                } else n = i.apply(this, arguments);
                return o(this, n)
            }
        }, e.exports.__esModule = !0, e.exports.default = e.exports
    }, 57789: function (e, t, n) {
        var r = n(84514);

        function i() {
            return "undefined" != typeof Reflect && Reflect.get ? (e.exports = i = Reflect.get.bind(), e.exports.__esModule = !0, e.exports.default = e.exports) : (e.exports = i = function (e, t, n) {
                var i = r(e, t);
                if (i) {
                    var o = Object.getOwnPropertyDescriptor(i, t);
                    return o.get ? o.get.call(arguments.length < 3 ? e : n) : o.value
                }
            }, e.exports.__esModule = !0, e.exports.default = e.exports), i.apply(this, arguments)
        }

        e.exports = i, e.exports.__esModule = !0, e.exports.default = e.exports
    }, 43182: function (e) {
        function t(n) {
            return e.exports = t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n)
        }

        e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
    }, 8064: function (e, t, n) {
        var r = n(59982);
        e.exports = function (e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {writable: !1}), t && r(e, t)
        }, e.exports.__esModule = !0, e.exports.default = e.exports
    }, 31077: function (e) {
        e.exports = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
                }))), !0
            } catch (e) {
                return !1
            }
        }, e.exports.__esModule = !0, e.exports.default = e.exports
    }, 86681: function (e, t, n) {
        var r = n(53483).default, i = n(37878);
        e.exports = function (e, t) {
            if (t && ("object" === r(t) || "function" == typeof t)) return t;
            if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
            return i(e)
        }, e.exports.__esModule = !0, e.exports.default = e.exports
    }, 59982: function (e) {
        function t(n, r) {
            return e.exports = t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n, r)
        }

        e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
    }, 84514: function (e, t, n) {
        var r = n(43182);
        e.exports = function (e, t) {
            for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = r(e));) ;
            return e
        }, e.exports.__esModule = !0, e.exports.default = e.exports
    }
}, function (e) {
    e.O(0, [4437, 8739, 160, 2107, 1216, 8592], (function () {
        return function (t) {
            return e(e.s = t)
        }(32387)
    })), e.O()
}]);

