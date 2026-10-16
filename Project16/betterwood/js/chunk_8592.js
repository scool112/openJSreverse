(window.webpackJsonp = window.webpackJsonp || []).push([[8592], {
    3420: function (n, t, e) {
        e.r(t), e.d(t, {
            BAIDU_PUT_ACTION_TYPE: function () {
                return d
            }, registerReport: function () {
                return l
            }, commitOrderReport: function () {
                return p
            }, payReport: function () {
                return v
            }, reportEnterMini: function () {
                return h
            }, reportProductView: function () {
                return m
            }, reportProductReservation: function () {
                return g
            }
        });
        var r = e(12663), o = e(13283), u = e(27560), i = e(18030), c = e(5679), a = e(73061), s = e(31121),
            f = e.n(s), d = {
                REGISTER: 49,
                COMPLETE_ORDER: 45,
                PAY_ORDER: 90,
                PRODUCT_VIEW: 20,
                RESERVATION: 7,
                ENTER_MINI: 112
            };

        function l() {
            y(d.REGISTER)
        }

        function p(n) {
            y(d.COMPLETE_ORDER), v(n)
        }

        function v(n) {
            y(d.PAY_ORDER, n)
        }

        function h() {
            y(d.ENTER_MINI)
        }

        function m() {
            y(d.PRODUCT_VIEW)
        }

        function g() {
            y(d.RESERVATION)
        }

        var y = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n(t, e) {
                var o, s;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            if (o = (0, c.Hy)().bd_vid || "", !(0, c.SI)(o)) {
                                n.next = 6;
                                break
                            }
                            return s = {
                                logidUrl: "".concat((0, a.Sh)(), "?bd_vid=").concat(o),
                                newType: t,
                                convertTime: ~~(Date.now() / 1e3)
                            }, e && (s.convertValue = e), f().TrackSDK.track("baiduAdReport", {
                                action_type: "".concat(t) || "",
                                appid: u.AF || "_",
                                openid: (0, i.LM)().state.openId || "_",
                                platform: "悦选商城小程序",
                                ad_type: 1,
                                bd_vid: o,
                                convertValue: e || 0
                            }), n.abrupt("return", new Promise((function (n, t) {
                                f().request({
                                    url: "https://ocpc.baidu.com/ocpcapi/api/uploadConvertData",
                                    method: "POST",
                                    header: {"content-type": "application/json"},
                                    data: {
                                        token: "oqZlGvZkZszWebevUt0V7Fbb4mKwpkch@aLqfdXSE7amdv3bbeLIFOdMftuKgYQd0",
                                        conversionTypes: [s]
                                    },
                                    success: function (t) {
                                        n(t)
                                    },
                                    fail: function (n) {
                                        t(n)
                                    }
                                })
                            })));
                        case 6:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t, e) {
                return n.apply(this, arguments)
            }
        }()
    }, 75093: function (n, t, e) {
        e.d(t, {
            Ov: function () {
                return _
            }, er: function () {
                return Z
            }, xH: function () {
                return C
            }, Yi: function () {
                return k
            }
        });
        var r = {};
        e.r(r), e.d(r, {
            commitOrderReport: function () {
                return l
            }, registerReport: function () {
                return d
            }
        });
        var o = {};
        e.r(o), e.d(o, {
            WEIXIN_PUT_ACTION_TYPE: function () {
                return h
            }, commitOrderReport: function () {
                return g
            }, registerReport: function () {
                return m
            }, reportProductPurchase: function () {
                return T
            }, reportProductReservation: function () {
                return I
            }, reportProductView: function () {
                return y
            }
        });
        var u = e(12663), i = e(13283), c = e(31121), a = e.n(c), s = e(5679), f = e(18030);

        function d() {
            p("active_register")
        }

        function l(n) {
            p("active_pay", n)
        }

        var p = function () {
            var n = (0, i.Z)((0, u.Z)().mark((function n(t, e) {
                var r;
                return (0, u.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            r = (0, s.Hy)().clue_token || "", (0, s.SI)("clue_token") && a().TrackSDK.track("douyinAdReport", {
                                action_type: "".concat(t) || "",
                                openid: (0, f.LM)().state.openId || "_",
                                convertValue: e || "_",
                                clue_token: r
                            });
                        case 2:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t, e) {
                return n.apply(this, arguments)
            }
        }(), v = e(27560), h = {
            REGISTER: "REGISTER",
            COMPLETE_ORDER: "COMPLETE_ORDER",
            PRODUCT_VIEW: "PRODUCT_VIEW",
            RESERVATION: "RESERVATION",
            PURCHASE: "PURCHASE"
        };

        function m() {
            b(h.REGISTER)
        }

        function g(n) {
            b(h.COMPLETE_ORDER, n)
        }

        function y() {
            b(h.PRODUCT_VIEW)
        }

        function I() {
            b(h.RESERVATION)
        }

        function T(n) {
            b(h.PURCHASE, n)
        }

        var b = function () {
            var n = (0, i.Z)((0, u.Z)().mark((function n(t, e) {
                var r, o, i, c, d, l, p, h, m, g;
                return (0, u.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            if (r = (0, s.Hy)() || {}, o = r.gdt_vid, i = void 0 === o ? "" : o, c = r.qz_gdt, d = void 0 === c ? "" : c, l = r.weixinadinfo, p = void 0 === l ? "" : l, h = i || d, !(0, s.SI)(h)) {
                                n.next = 8;
                                break
                            }
                            return m = (0, f.LM)().state.openId, g = {
                                action_time: ~~(Date.now() / 1e3),
                                user_id: {wechat_openid: m, wechat_app_id: v.AF},
                                action_type: t,
                                trace: {click_id: h},
                                action_param: {}
                            }, e && (g.action_param.value = e), a().TrackSDK.track("adReport", {
                                gdt_vid: i,
                                qz_gdt: d,
                                action_type: t || "_",
                                appid: v.AF || "_",
                                openid: m || "_",
                                convertValue: e || "",
                                click_id: h || "_",
                                weixinadinfo: p
                            }), n.abrupt("return", new Promise((function (n, t) {
                                a().request({
                                    url: "https://tracking.e.qq.com/conv",
                                    method: "POST",
                                    header: {"content-type": "application/json"},
                                    data: {actions: [g]},
                                    success: function (t) {
                                        n(t)
                                    },
                                    fail: function (n) {
                                        t(n)
                                    }
                                })
                            })));
                        case 8:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t, e) {
                return n.apply(this, arguments)
            }
        }(), w = {douyinPut: r, weixinPut: o, baiduPut: e(3420)}, Z = function () {
            var n, t;
            return null === (n = w["".concat((0, s.Hy)().adType, "Put")]) || void 0 === n || null === (t = n.registerReport) || void 0 === t ? void 0 : t.call(n)
        }, _ = function (n) {
            var t, e;
            return null === (t = w["".concat((0, s.Hy)().adType, "Put")]) || void 0 === t || null === (e = t.commitOrderReport) || void 0 === e ? void 0 : e.call(t, n)
        }, k = function () {
            var n, t;
            return null === (n = w["".concat((0, s.Hy)().adType, "Put")]) || void 0 === n || null === (t = n.reportProductView) || void 0 === t ? void 0 : t.call(n)
        }, C = function () {
            var n, t;
            return null === (n = w["".concat((0, s.Hy)().adType, "Put")]) || void 0 === n || null === (t = n.reportProductReservation) || void 0 === t ? void 0 : t.call(n)
        }
    }, 67777: function (n, t, e) {
        e.d(t, {
            g$: function () {
                return l
            }, VU: function () {
                return p
            }, yh: function () {
                return v
            }, v1: function () {
                return m
            }, GT: function () {
                return y
            }, MM: function () {
                return I
            }, IT: function () {
                return b
            }, Up: function () {
                return w
            }, bi: function () {
                return Z
            }, $d: function () {
                return _
            }, HK: function () {
                return k
            }, yN: function () {
                return C
            }, rx: function () {
                return S
            }, c$: function () {
                return E
            }, BS: function () {
                return D
            }, zI: function () {
                return H
            }, S2: function () {
                return N
            }, n4: function () {
                return R
            }, fW: function () {
                return M
            }, xW: function () {
                return O
            }, Vf: function () {
                return A
            }, Dw: function () {
                return P
            }, PT: function () {
                return x
            }, R5: function () {
                return B
            }, fX: function () {
                return V
            }
        });
        var r = e(96949), o = e(12663), u = e(10598), i = e(13283), c = e(43461), a = e(27560), s = e(31121),
            f = e.n(s), d = function () {
                var n;
                return (0, i.Z)((0, o.Z)().mark((function t() {
                    var r, i;
                    return (0, o.Z)().wrap((function (t) {
                        for (; ;) switch (t.prev = t.next) {
                            case 0:
                                if (!n) {
                                    t.next = 2;
                                    break
                                }
                                return t.abrupt("return", n);
                            case 2:
                                return t.next = 4, Promise.resolve().then((function () {
                                    return (0, u.Z)(e(36045))
                                }));
                            case 4:
                                return r = t.sent, i = r.JSEncrypt, n = new i, t.abrupt("return", n);
                            case 8:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                })))
            }();

        function l() {
            return c.Z.post("/auth/refresh")
        }

        function p() {
            return c.Z.get("".concat(a.s4, "/user/user_login/getAreaCode"))
        }

        function v(n) {
            return h.apply(this, arguments)
        }

        function h() {
            return (h = (0, i.Z)((0, o.Z)().mark((function n(t) {
                var e, r, u;
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, d();
                        case 2:
                            return (e = n.sent).setPublicKey(a.rO), (r = f().getStorageSync("parentInfo")) && (t.parentInfo = r), u = e.encryptLong(encodeURIComponent(JSON.stringify(t))), n.abrupt("return", c.Z.post("".concat(a.s4, "/auth/v2/login"), {param: u}).then((function (n) {
                                if (200 === n.data.code) {
                                    e.setPrivateKey(a.sd);
                                    var t = JSON.parse(decodeURIComponent(e.decryptLong(n.data.data.result)));
                                    return n.data.data = t, n
                                }
                            })));
                        case 8:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })))).apply(this, arguments)
        }

        function m() {
            return g.apply(this, arguments)
        }

        function g() {
            return (g = (0, i.Z)((0, o.Z)().mark((function n() {
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.abrupt("return", c.Z.delete("".concat(a.s4, "/bdw-auth/v1/logout")));
                        case 1:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })))).apply(this, arguments)
        }

        function y(n) {
            var t = {loginType: n.loginType, openId: n.openId};
            return c.Z.get("".concat(a.Ii, "/user_info/v1/query/open_id"), t)
        }

        function I(n) {
            return T.apply(this, arguments)
        }

        function T() {
            return (T = (0, i.Z)((0, o.Z)().mark((function n(t) {
                var e, r;
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, d();
                        case 2:
                            return (e = n.sent).setPublicKey(a.rO), r = e.encryptLong(encodeURIComponent(JSON.stringify(t))), n.abrupt("return", c.Z.post("".concat(a.s4, "/auth/v2/register"), {param: r}).then((function (n) {
                                if (200 === n.data.code) {
                                    e.setPrivateKey(a.sd);
                                    var t = JSON.parse(decodeURIComponent(e.decryptLong(n.data.data.result)));
                                    return n.data.data = t, n
                                }
                                return n
                            })));
                        case 6:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })))).apply(this, arguments)
        }

        function b(n) {
            return c.Z.post("".concat(a.Ii, "/user_info/v1/update"), (0, r.Z)({}, n))
        }

        function w() {
            return c.Z.get("".concat(a.s4, "/user/user_info/user_author"))
        }

        function Z() {
            return c.Z.get("".concat(a.s4, "/cms/voucher/showExpirationTips"))
        }

        function _(n) {
            return c.Z.post("".concat(a.FX, "/suggestionFeedback/submitSuggestionFeedback"), n)
        }

        function k() {
            return c.Z.get("".concat(a.FX, "/index/getHolidayCalendar"))
        }

        function C(n) {
            return c.Z.get("".concat(a.s4, "/hotel/order_invoice_info/getBasicInfo"), n)
        }

        function S(n) {
            return c.Z.get("".concat(a.s4, "/hotel/bdw_order_invoice/getBasicInfo"), n)
        }

        function E(n) {
            return L.apply(this, arguments)
        }

        function L() {
            return (L = (0, i.Z)((0, o.Z)().mark((function n(t) {
                var e, r, u, i;
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return e = t ? "?userId=".concat(t) : "", n.prev = 1, n.next = 4, c.Z.get("".concat(a.Ii, "/user_info/judge_is_employee").concat(e));
                        case 4:
                            return r = n.sent, u = r.data, i = (void 0 === u ? {} : u).data, n.abrupt("return", {isEmployee: i});
                        case 11:
                            return n.prev = 11, n.t0 = n.catch(1), n.abrupt("return", {isEmployee: !1});
                        case 14:
                        case"end":
                            return n.stop()
                    }
                }), n, null, [[1, 11]])
            })))).apply(this, arguments)
        }

        var D = function () {
            var n = (0, i.Z)((0, o.Z)().mark((function n(t) {
                var e, r;
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.prev = 0, n.next = 3, c.Z.get("".concat(a.s4, "/weixin/wx/user/wx1b77d3569b2dd7fa/login?code=").concat(t));
                        case 3:
                            return e = n.sent, r = e.data, n.abrupt("return", r);
                        case 8:
                            return n.prev = 8, n.t0 = n.catch(0), n.abrupt("return", {unionid: "", openid: ""});
                        case 11:
                        case"end":
                            return n.stop()
                    }
                }), n, null, [[0, 8]])
            })));
            return function (t) {
                return n.apply(this, arguments)
            }
        }(), H = function () {
            var n = (0, i.Z)((0, o.Z)().mark((function n() {
                var t, e;
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.prev = 0, n.next = 3, c.Z.post("".concat(a.s4, "/hotel/tower/hotel/morningTime"));
                        case 3:
                            return t = n.sent, e = t.data, n.abrupt("return", e.data);
                        case 8:
                            return n.prev = 8, n.t0 = n.catch(0), n.abrupt("return", {
                                isMorning: !1,
                                currentTime: Date.now() + ""
                            });
                        case 11:
                        case"end":
                            return n.stop()
                    }
                }), n, null, [[0, 8]])
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), N = function (n) {
            return c.Z.post("".concat(a.s4, "/base/search_word/list_hot_key"), n)
        }, R = function () {
            return c.Z.post("".concat(a.s4, "/member/memberUpgradePopups/check"))
        }, M = function () {
            return c.Z.get("".concat(a.s4, "/user/user_info/v1/upgrade_pop"))
        }, O = function (n) {
            return n[n.other = 0] = "other", n[n.normal = 1] = "normal", n[n.expired = 2] = "expired", n
        }({}), A = function (n) {
            return c.Z.post("".concat(a.Gm, "/remote/card/wxMiniAppQrCode/getInfo"), {wxMiniAppQrCodeId: n})
        }, P = function () {
            var n = (0, i.Z)((0, o.Z)().mark((function n() {
                var t, e;
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, c.Z.get("".concat(a.s4, "/member/agreement/sign-pop"));
                        case 2:
                            if (t = n.sent, 200 !== (e = t.data).code || !e.data) {
                                n.next = 6;
                                break
                            }
                            return n.abrupt("return", e.data);
                        case 6:
                            return n.abrupt("return", null);
                        case 7:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), x = function () {
            return c.Z.get("".concat(a.s4, "/member/agreement/sign"))
        }, B = function (n) {
            return c.Z.post("".concat(a.s4, "/bdw-hotel/tower/hotel/price/calLowPriceList"), n)
        }, V = function () {
            return c.Z.get("".concat(a.s4, "/user/favourite/favouritePage"), {}, {
                header: {
                    pageSize: 1e3,
                    pageNum: 1
                }
            })
        }
    }, 89013: function (n, t, e) {
        e.d(t, {
            al: function () {
                return c
            }, LE: function () {
                return a
            }, M8: function () {
                return s
            }, kr: function () {
                return f
            }, F0: function () {
                return d
            }, u_: function () {
                return l
            }, GT: function () {
                return p
            }, EA: function () {
                return v
            }, mC: function () {
                return h
            }, OQ: function () {
                return m
            }, $w: function () {
                return g
            }, AU: function () {
                return y
            }, p6: function () {
                return I
            }, SX: function () {
                return T
            }, GW: function () {
                return b
            }, Jd: function () {
                return w
            }, tb: function () {
                return Z
            }, Z9: function () {
                return _
            }, PH: function () {
                return k
            }, xY: function () {
                return C
            }
        });
        var r = e(12663), o = e(13283), u = e(27560), i = e(43461), c = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n() {
                var t, e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, i.Z.post("".concat(u.Gm, "/coupon/queryUserRightsInfo"));
                        case 2:
                            if (200 !== (null == (e = n.sent) || null === (t = e.data) || void 0 === t ? void 0 : t.code)) {
                                n.next = 5;
                                break
                            }
                            return n.abrupt("return", e.data.data);
                        case 5:
                            return n.abrupt("return", null);
                        case 6:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), a = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n() {
                var t, e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, i.Z.get("".concat(u.Gm, "/member_magic/query"));
                        case 2:
                            if (200 !== (null == (e = n.sent) || null === (t = e.data) || void 0 === t ? void 0 : t.code)) {
                                n.next = 5;
                                break
                            }
                            return n.abrupt("return", e.data.data);
                        case 5:
                            return n.abrupt("return", null);
                        case 6:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), s = function () {
            return i.Z.get("".concat(u.s4, "/member/memberTimeConsumeTimesScoreLevel/queryMemberTimeConsumeTimesScoreAndAllLevel"), {})
        }, f = function () {
            return i.Z.get("".concat(u.s4, "/user/user_info/v1/page_dynamic_info"), {}).then((function (n) {
                return 200 === n.data.code ? n.data.data : []
            }))
        };

        function d() {
            return i.Z.get("".concat(u.s4, "/bdw-user-center/user_info/v1/remind_idcard_verify"), {}).then((function (n) {
                return 200 === n.data.code ? n.data.data : {}
            }))
        }

        var l = function () {
            return i.Z.get("".concat(u.s4, "/cms/carMemberCard/popInLogin")).then((function (n) {
                return 200 === n.data.code ? n.data.data : {}
            }))
        }, p = function (n) {
            return i.Z.post("".concat(u.s4, "/cms/carMemberCard/mobileApply"), n).then((function (n) {
                return n
            }))
        }, v = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n() {
                var t, e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, i.Z.get("".concat(u.s4, "/cms/carMemberCard/getUserCompanyCardId"));
                        case 2:
                            if (200 !== (null == (e = n.sent) || null === (t = e.data) || void 0 === t ? void 0 : t.code)) {
                                n.next = 5;
                                break
                            }
                            return n.abrupt("return", e.data.data);
                        case 5:
                            return n.abrupt("return", {});
                        case 6:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), h = function (n) {
            return i.Z.post("".concat(u.s4, "/cms/carMemberCard/send"), n).then((function (n) {
                return n
            }))
        }, m = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                var e, o;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, i.Z.get("".concat(u.s4, "/cms/carMemberCard/popByInvite"), {cardId: t});
                        case 2:
                            if (200 !== (null == (o = n.sent) || null === (e = o.data) || void 0 === e ? void 0 : e.code)) {
                                n.next = 5;
                                break
                            }
                            return n.abrupt("return", o.data.data);
                        case 5:
                            return n.abrupt("return", {});
                        case 6:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t) {
                return n.apply(this, arguments)
            }
        }(), g = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                var e, o;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, i.Z.get("".concat(u.s4, "/cms/carMemberCard/inviteQrCode"), {cardId: t});
                        case 2:
                            if (200 !== (null == (o = n.sent) || null === (e = o.data) || void 0 === e ? void 0 : e.code)) {
                                n.next = 5;
                                break
                            }
                            return n.abrupt("return", o.data.data);
                        case 5:
                            return n.abrupt("return", {});
                        case 6:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t) {
                return n.apply(this, arguments)
            }
        }(), y = function () {
            return i.Z.get("".concat(u.s4, "/cms/memberFusion/showQueryWelfareButton"))
        }, I = function () {
            return i.Z.post("".concat(u.s4, "/member/company/member/bind_company_user"), {})
        }, T = function (n) {
            return i.Z.post("".concat(u.s4, "/member/time_value/getUrlInfo"), {urlId: n})
        }, b = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n() {
                var t, e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, i.Z.get("".concat(u.s4, "/member/company/member/find/company/logo"));
                        case 2:
                            if (200 !== (null == (e = n.sent) || null === (t = e.data) || void 0 === t ? void 0 : t.code)) {
                                n.next = 5;
                                break
                            }
                            return n.abrupt("return", e.data.data);
                        case 5:
                            return n.abrupt("return", {});
                        case 6:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), w = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n() {
                var t, e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, i.Z.post("".concat(u.Gm, "/user_magic_send/treasureBag/queryFilterBar"), {});
                        case 2:
                            return t = n.sent, e = t.data, n.abrupt("return", e);
                        case 5:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), Z = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                var e, o, c, a, s, f, d, l, p, v, h;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return e = t.pageNum, o = void 0 === e ? 1 : e, c = t.pageSize, a = void 0 === c ? 20 : c, s = t.category, f = t.status, n.next = 3, i.Z.post("".concat(u.Gm, "/user_magic_send/treasureBag/page"), {
                                category: s,
                                status: f
                            }, {header: {pageNum: o, pageSize: a}});
                        case 3:
                            return d = n.sent, l = d.data, v = (p = void 0 === l ? {} : l).data, h = p.code, n.abrupt("return", 200 === h ? v : null);
                        case 9:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t) {
                return n.apply(this, arguments)
            }
        }(), _ = function () {
            return i.Z.post("".concat(u.s4, "/cms/hotelVoucher/queryPopUp"))
        }, k = function () {
            return i.Z.get("".concat(u.s4, "/cms/cateCard/userValidCardCheck"))
        }, C = function (n) {
            return i.Z.post("".concat(u.s4, "/cms/cateCard/claimCateCard"), n)
        }
    }, 29321: function (n, t, e) {
        e.d(t, {
            nL: function () {
                return i
            }, S0: function () {
                return c
            }, tc: function () {
                return a
            }, QL: function () {
                return s
            }, kV: function () {
                return f
            }, oG: function () {
                return d
            }, U0: function () {
                return l
            }, n8: function () {
                return p
            }, t0: function () {
                return v
            }, iA: function () {
                return h
            }, rP: function () {
                return m
            }
        });
        var r = e(96949), o = e(43461), u = e(27560);

        function i(n) {
            return o.Z.post("".concat(u.FH, "/content/hotel/comment/hotel/detail/get"), n)
        }

        function c(n) {
            return o.Z.post("".concat(u.FH, "/bdw-content/comment/comment/reply/add"), n)
        }

        function a(n) {
            return o.Z.post("".concat(u.ks, "/main/content/add"), n)
        }

        function s(n) {
            return o.Z.post("".concat(u.ks, "/main/content/additional/add"), n)
        }

        function f() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            return o.Z.post("".concat(u.ks, "/comment/tags/list"), {orderChannel: n}, {header: {noLoading: 1}})
        }

        var d = function (n) {
            return o.Z.post("".concat(u.s4, "/content/hotel/comment/hotel/filter/get"), n)
        }, l = function (n) {
            return o.Z.post("".concat(u.s4, "/content/comment/comment/like/change"), n)
        }, p = function (n, t, e) {
            return o.Z.post("".concat(u.s4, "/content/hotel/comment/hotel/list"), n, {
                header: {
                    pageSize: t,
                    pageNum: e
                }
            })
        }, v = function (n) {
            return o.Z.post("".concat(u.s4, "/content/hotel/comment/hotel/info/get"), n)
        }, h = function (n) {
            return o.Z.get("".concat(u.s4, "/content/my_comment/query_comment_info"), {}, {header: (0, r.Z)({}, n)}).then((function (n) {
                return n.data
            }))
        }, m = function (n, t) {
            return o.Z.post("".concat(u.s4, "/content/my_comment/update_comment_visible_status"), {
                commentId: n,
                visibleStatus: t
            }).then((function (n) {
                return n.data
            }))
        }
    }, 98526: function (n, t, e) {
        e.d(t, {
            QC: function () {
                return a
            }, wh: function () {
                return s
            }, gS: function () {
                return f
            }, Eo: function () {
                return d
            }, mw: function () {
                return l
            }, M8: function () {
                return p
            }, Uz: function () {
                return v
            }, RX: function () {
                return h
            }, d: function () {
                return m
            }, y$: function () {
                return g
            }, yQ: function () {
                return y
            }, EX: function () {
                return I
            }, j3: function () {
                return T
            }, US: function () {
                return b
            }, JA: function () {
                return w
            }, y4: function () {
                return Z
            }, $Y: function () {
                return _
            }
        });
        var r = e(12663), o = e(13283), u = e(96949), i = e(43461), c = e(27560);

        function a(n) {
            return n.ifReserveEts = n.ifReserveEts || 0, n.channel = n.channel || 1, i.Z.get("".concat(c.FX, "/index/brand/list"), n)
        }

        function s(n, t) {
            return i.Z.post("".concat(c.FX, "/index/recommend/shop/list/new"), {
                source: n.source,
                city: n.city || ""
            }, {header: (0, u.Z)({}, t)})
        }

        function f(n) {
            return i.Z.get("".concat(c.s4, "/bdw-hotel/brand/page/detail/shop_list"), {brandId: n})
        }

        function d(n) {
            return i.Z.get("".concat(c.s4, "/bdw-hotel/brand/page/detail_v2"), {brandId: n})
        }

        function l(n) {
            return i.Z.post("".concat(c.s4, "/hotel/focus/brand"), {brandId: n})
        }

        var p = function () {
            return i.Z.get("".concat(c.s4, "/member/memberTimeConsumeTimesScoreLevel/queryMemberTimeConsumeTimesScoreAndAllLevel"))
        }, v = function (n) {
            return n[n.SWIPER = 1] = "SWIPER", n[n.HOME_DIALOG = 2] = "HOME_DIALOG", n[n.ACTIVITY_LIST = 3] = "ACTIVITY_LIST", n[n.WAREHOUSE = 4] = "WAREHOUSE", n[n.HOME_BANNERS = 5] = "HOME_BANNERS", n[n.HOME_NAV_SECTION = 6] = "HOME_NAV_SECTION", n[n.ORDER_DETAIL_WX = 7] = "ORDER_DETAIL_WX", n[n.HOME_HEADER_NAV = 8] = "HOME_HEADER_NAV", n[n.HOME_FLOAT = 9] = "HOME_FLOAT", n[n.PAY_COMPLETE_PAGE = 10] = "PAY_COMPLETE_PAGE", n
        }({}), h = function (n) {
            return Object.keys(n).includes("application") || Object.assign(n, {application: c.cW}), i.Z.post("".concat(c.s4, "/cms/app/index/resource/state"), n)
        }, m = function (n) {
            return n.isHome || (n.isHome = 0), i.Z.post("".concat(c.s4, "/hotel/order_main/risk_info"), n)
        }, g = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n() {
                var t, e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.prev = 0, n.next = 3, i.Z.get("".concat(c.s4, "/hotel/brand/museum/list"));
                        case 3:
                            if (200 !== (null == (e = n.sent) ? void 0 : e.data.code) || null === (t = e.data) || void 0 === t || null === (t = t.data) || void 0 === t || !t.brandHotelNumString) {
                                n.next = 6;
                                break
                            }
                            return n.abrupt("return", e.data.data);
                        case 6:
                            return n.abrupt("return", null);
                        case 9:
                            return n.prev = 9, n.t0 = n.catch(0), n.abrupt("return", null);
                        case 12:
                        case"end":
                            return n.stop()
                    }
                }), n, null, [[0, 9]])
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), y = function () {
            return i.Z.get("".concat(c.s4, "/base/app/index/getHomeUserInfo"))
        }, I = function () {
            return i.Z.get("".concat(c.s4, "/user/user_info/v1/note_show"))
        }, T = function () {
            return i.Z.get("".concat(c.s4, "/user/user_info/v1/note_stop"))
        }, b = function () {
            return i.Z.get("".concat(c.s4, "/base/app/index/home/v3"))
        }, w = function () {
            return i.Z.get("".concat(c.s4, "/cms/cateCard/getIndexCardInfoList"))
        }, Z = function () {
            return i.Z.post("".concat(c.s4, "/base/app/service_page/home_page_trip_order_list"))
        }, _ = function (n, t) {
            return i.Z.post("".concat(c.s4, "/base/app/store/listV2"), n, {
                header: {
                    pageNo: t.pageNum,
                    pageSize: t.pageSize
                }
            })
        }
    }, 90693: function (n, t, e) {
        e.d(t, {
            db: function () {
                return a
            }, lK: function () {
                return s
            }, DY: function () {
                return f
            }, X9: function () {
                return d
            }, Nw: function () {
                return l
            }, YQ: function () {
                return p
            }, Zm: function () {
                return v
            }, eL: function () {
                return h
            }, _p: function () {
                return m
            }, yD: function () {
                return g
            }, $9: function () {
                return y
            }, _x: function () {
                return I
            }, H0: function () {
                return T
            }, Ye: function () {
                return b
            }, Nc: function () {
                return w
            }, Sg: function () {
                return Z
            }, nX: function () {
                return _
            }, fS: function () {
                return k
            }, rw: function () {
                return C
            }, l7: function () {
                return S
            }, cW: function () {
                return E
            }, Ni: function () {
                return L
            }, g6: function () {
                return D
            }, Rk: function () {
                return H
            }
        });
        var r = e(12663), o = e(13283), u = e(43461), i = e(27560), c = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                var e, o, c, a = arguments;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return e = a.length > 1 && void 0 !== a[1] ? a[1] : void 0, n.prev = 1, n.next = 4, u.Z.post("".concat(i.E0).concat(t), e);
                        case 4:
                            if (o = n.sent, 200 !== (c = o.data).code || !c.data) {
                                n.next = 8;
                                break
                            }
                            return n.abrupt("return", {successData: c.data, failData: null});
                        case 8:
                            return n.abrupt("return", {successData: null, failData: {msg: c.msg || c.errorDesc}});
                        case 11:
                            return n.prev = 11, n.t0 = n.catch(1), n.abrupt("return", null);
                        case 14:
                        case"end":
                            return n.stop()
                    }
                }), n, null, [[1, 11]])
            })));
            return function (t) {
                return n.apply(this, arguments)
            }
        }();

        function a(n) {
            return u.Z.post("".concat(i.FX, "/store/listV2"), n, {
                header: {
                    noLoading: 1,
                    pageSize: n.pageSize,
                    pageNum: n.pageNum
                }
            })
        }

        function s(n, t) {
            return u.Z.post("".concat(i.FX, "/store/search_word_search"), n, {
                header: {
                    noLoading: 1,
                    pageNum: t,
                    pageSize: 40
                }
            })
        }

        function f(n) {
            var t = n.id, e = n.hourRoomType, r = void 0 === e ? 0 : e, o = n.dateStart, c = {
                hotelId: t,
                hourRoomType: r,
                userLongitude: n.userLongitude || "",
                userLatitude: n.userLatitude || ""
            };
            return o && (c.dateStart = o), u.Z.get("".concat(i.s4, "/bdw-hotel/tower/hotel/detail/hotel_info"), c, {header: {noLoading: 1}})
        }

        function d(n) {
            return u.Z.post("".concat(i.s4, "/bdw-hotel/tower/hotel/detail/room_type_price_v3"), n, {header: {noLoading: 1}})
        }

        function l(n) {
            return u.Z.get("".concat(i.E0, "/person/list"), n)
        }

        function p(n) {
            var t = n.email, e = n.nickName, r = n.idNo, o = n.idType, c = n.isDefault, a = n.phone,
                s = n.idTypeValue, f = n.isInPerson, d = n.firstName, l = n.lastName, p = n.phoneAreaCode;
            return u.Z.post("".concat(i.E0, "/person/addV2"), {
                email: t,
                nickName: e,
                idNo: r,
                idType: o,
                isDefault: c,
                phone: a,
                idTypeValue: s,
                type: 0,
                isInPerson: f,
                firstName: d,
                lastName: l,
                phoneAreaCode: p
            })
        }

        function v(n) {
            return u.Z.post("".concat(i.E0, "/order_main/default_person"), n)
        }

        function h(n) {
            return u.Z.get("".concat(i.E0, "/person/remove"), {ids: n})
        }

        function m(n) {
            var t = n.id, e = n.email, r = n.nickName, o = n.idNo, c = n.idType, a = n.isDefault, s = n.phone,
                f = n.phoneAreaCode, d = n.idTypeValue, l = n.isInPerson, p = n.firstName, v = n.lastName;
            return u.Z.post("".concat(i.E0, "/person/editV2"), {
                id: t,
                email: e,
                nickName: r,
                idNo: o,
                idType: c,
                idTypeValue: d,
                isDefault: a,
                phone: s,
                isInPerson: l,
                firstName: p,
                lastName: v,
                phoneAreaCode: f
            })
        }

        var g = function () {
            return u.Z.get("".concat(i.E0, "/order_main/list_service_card"))
        }, y = function (n) {
            return u.Z.get("".concat(i.s4, "/hotel/tower/hotel/getHotelInfoByHotelId?hotelId=").concat(n))
        }, I = function (n) {
            return u.Z.get("".concat(i.s4, "/hotel/hotel_image/list_all_hotel_image?hotelId=").concat(n))
        }, T = function (n) {
            return u.Z.post("".concat(i.E0, "/tower/hotel/hour/timeSlot"), n)
        }, b = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.abrupt("return", c("/suggest/tentoone", t));
                        case 1:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t) {
                return n.apply(this, arguments)
            }
        }(), w = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.abrupt("return", c("/want/live", t));
                        case 1:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t) {
                return n.apply(this, arguments)
            }
        }(), Z = function (n) {
            return c("/order_main/payInfo", n)
        }, _ = function (n) {
            return u.Z.get("/cms/cateCard/cateCardActivityInfo", n)
        }, k = function (n) {
            return u.Z.post("".concat(i.s4, "/hotel/order_main/discountInfo"), n)
        }, C = function (n) {
            return u.Z.post("".concat(i.s4, "/bdw-hotel/tower/hotel/detail/listPriceFilterParam"), n)
        }, S = function (n) {
            return u.Z.post("".concat(i.s4, "/user/favourite/favouriteHotel"), n)
        }, E = function () {
            return u.Z.get("".concat(i.s4, "/base/app/store/searchTagList"))
        }, L = function (n) {
            return u.Z.post("".concat(i.s4, "/hotel/tower/hotel/getHotelNavigateBarAndSimpleInfos"), n)
        }, D = function (n) {
            return u.Z.get("/bdw-hotel/tower/hotel/detail/roomTypeInfo", n)
        };

        function H(n) {
            return u.Z.post("".concat(i.E0, "/order_main/cancel_order_detail"), n)
        }
    }, 34724: function (n, t, e) {
        e.d(t, {
            KhA: function () {
                return r.Kh
            }, ygP: function () {
                return v.yg
            }, Emu: function () {
                return r.Em
            }, UzJ: function () {
                return h.Uz
            }, Ues: function () {
                return v.Ue
            }, o8K: function () {
                return L
            }, YQU: function () {
                return o.YQ
            }, H65: function () {
                return v.H6
            }, Vky: function () {
                return v.Vk
            }, QnZ: function () {
                return v.Qn
            }, C9D: function () {
                return f
            }, RkY: function () {
                return o.Rk
            }, U07: function () {
                return m.U0
            }, PTC: function () {
                return v.PT
            }, Kd3: function () {
                return v.Kd
            }, j33: function () {
                return h.j3
            }, l7W: function () {
                return o.l7
            }, S0p: function () {
                return m.S0
            }, iGJ: function () {
                return r.iG
            }, kaP: function () {
                return r.k
            }, ZmR: function () {
                return o.Zm
            }, yvK: function () {
                return D
            }, Wv4: function () {
                return v.Wv
            }, nyn: function () {
                return v.ny
            }, k0$: function () {
                return v.k0
            }, eLK: function () {
                return o.eL
            }, qDF: function () {
                return r.qD
            }, yDm: function () {
                return o.yD
            }, G4S: function () {
                return c
            }, bXZ: function () {
                return v.bX
            }, PV4: function () {
                return r.PV
            }, iCO: function () {
                return v.iC
            }, ZLJ: function () {
                return v.ZL
            }, Z$b: function () {
                return O
            }, $9G: function () {
                return v.$9
            }, _1M: function () {
                return p
            }, Eov: function () {
                return h.Eo
            }, gSj: function () {
                return h.gS
            }, nXH: function () {
                return o.nX
            }, vJq: function () {
                return C
            }, hqG: function () {
                return Z
            }, H3J: function () {
                return b
            }, B7i: function () {
                return w
            }, pzH: function () {
                return r.pz
            }, nYR: function () {
                return M
            }, KV2: function () {
                return l
            }, D0Q: function () {
                return T
            }, hIA: function () {
                return r.hI
            }, oGn: function () {
                return m.oG
            }, qp7: function () {
                return x
            }, USZ: function () {
                return h.US
            }, y4k: function () {
                return h.y4
            }, yQp: function () {
                return h.yQ
            }, _xy: function () {
                return o._x
            }, y$5: function () {
                return h.y$
            }, QCK: function () {
                return h.QC
            }, nLg: function () {
                return m.nL
            }, n8h: function () {
                return m.n8
            }, t0t: function () {
                return m.t0
            }, rwn: function () {
                return o.rw
            }, $9v: function () {
                return o.$9
            }, DY8: function () {
                return o.DY
            }, dbR: function () {
                return o.db
            }, Nwz: function () {
                return o.Nw
            }, H0L: function () {
                return o.H0
            }, e$o: function () {
                return v.e$
            }, JAC: function () {
                return h.JA
            }, yIk: function () {
                return H
            }, lKu: function () {
                return o.lK
            }, XYv: function () {
                return A
            }, BPC: function () {
                return N
            }, $YQ: function () {
                return h.$Y
            }, M8G: function () {
                return h.M8
            }, Ni7: function () {
                return o.Ni
            }, tZO: function () {
                return r.tZ
            }, JEI: function () {
                return r.JE
            }, dzB: function () {
                return v.dz
            }, k6_: function () {
                return r.k6
            }, Tv2: function () {
                return a
            }, nIh: function () {
                return v.nI
            }, anp: function () {
                return r.an
            }, sg_: function () {
                return R
            }, wh5: function () {
                return h.wh
            }, RXT: function () {
                return h.RX
            }, oWm: function () {
                return r.oW
            }, X9w: function () {
                return o.X9
            }, cWw: function () {
                return o.cW
            }, HsA: function () {
                return S
            }, PIL: function () {
                return P
            }, Isc: function () {
                return r.Is
            }, ZS2: function () {
                return v.ZS
            }, EX9: function () {
                return h.EX
            }, oQV: function () {
                return r.oQ
            }, Rec: function () {
                return r.Re
            }, _1R: function () {
                return r._1
            }, pLn: function () {
                return v.pL
            }, mwq: function () {
                return h.mw
            }, YeR: function () {
                return o.Ye
            }, WOG: function () {
                return E
            }, v22: function () {
                return r.v2
            }, Sgh: function () {
                return o.Sg
            }, WYr: function () {
                return r.WY
            }, sPo: function () {
                return _
            }, doL: function () {
                return k
            }, iNC: function () {
                return V
            }, iAI: function () {
                return m.iA
            }, EHS: function () {
                return B
            }, VjH: function () {
                return v.Vj
            }, uPP: function () {
                return v.uP
            }, WC0: function () {
                return v.WC
            }, phe: function () {
                return r.ph
            }, vr5: function () {
                return d
            }, xe3: function () {
                return s
            }, rPz: function () {
                return m.rP
            }, _pl: function () {
                return o._p
            }
        });
        var r = e(86410), o = e(90693), u = e(43461), i = e(27560);

        function c() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, e = {ifReserveEts: t};
            return n && (e.couponId = n), u.Z.get("".concat(i.FX, "/index/city/list"), e)
        }

        function a(n) {
            return u.Z.post("".concat(i.E0, "/PaymentInfo/bdwpay"), n)
        }

        function s(n, t) {
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            return u.Z.get("".concat(i.E0, "/order_main/confirmPay?orderNo=").concat(n, "&orderType=").concat(t, "&combinedOrderNo=").concat(e))
        }

        function f(n) {
            return u.Z.post("".concat(i.s4, "/bdw-hotel/order_main/cancel_order"), {combinedOrderNo: n})
        }

        function d(n) {
            return u.Z.post("".concat(i.s4, "/pay/bdwpay/V2/trade-query"), n)
        }

        function l(n) {
            return u.Z.post("".concat(i.E0, "/coupon/list"), n)
        }

        function p(n) {
            return u.Z.post("".concat(i.E0, "/coupon/optimal"), n)
        }

        var v = e(37600), h = e(98526), m = e(29321), g = e(96949), y = e(31121), I = e.n(y);

        function T(n) {
            return u.Z.get("".concat(i.s4, "/content/moment/brand/info"), {brandId: n})
        }

        function b(n) {
            return u.Z.get("".concat(i.s4, "/content/moment/feature/list"), {brandId: n})
        }

        function w(n) {
            var t = n.brandId || "", e = n.id || "", r = n.momentsFeatureName || "", o = n.userId || "",
                c = n.tagIds || "";
            return u.Z.get("".concat(i.s4, "/content/moment/page?brandId=").concat(t, "&momentsFeatureId=").concat(e, "&publishPersonId=").concat(o, "&tagIds=").concat(c, "&momentsFeatureName=").concat(r), {}, {
                header: {
                    pageSize: n.pageSize,
                    pageNum: n.pageNum
                }
            })
        }

        function Z(n) {
            return u.Z.get("".concat(i.s4, "/content/moment/detail"), {id: n})
        }

        function _(n, t) {
            return u.Z.post("".concat(i.s4, "/content/moment/like"), {id: n, source: t})
        }

        function k(n) {
            return u.Z.get("".concat(i.s4, "/content/moment/trans/count"), {id: n})
        }

        var C = function (n, t) {
            return u.Z.post("".concat(i.s4, "/content/moment/comment"), n, {header: (0, g.Z)({}, t)}).then((function (n) {
                if (200 === n.data.code) return n.data.data
            }))
        }, S = function (n, t) {
            return u.Z.post("".concat(i.s4, "/content/moment/second/comment"), n, {header: (0, g.Z)({}, t)}).then((function (n) {
                if (200 === n.data.code) return n.data.data
            }))
        }, E = function (n, t) {
            return u.Z.post("".concat(i.s4, "/content/moment/like"), {id: n, source: t})
        }, L = function (n) {
            return u.Z.post("".concat(i.s4, "/content/moment/add/comment"), (0, g.Z)({}, n)).then((function (t) {
                var e = "1" === n.type ? "评论" : "回复";
                return 200 === t.data.code ? I().showToast({
                    title: "".concat(e, "成功"),
                    icon: "none",
                    duration: 2e3
                }) : I().showToast({
                    title: t.data.errorDesc || "".concat(e, "失败"),
                    icon: "none",
                    duration: 2e3
                }), t.data.data
            }))
        }, D = function (n) {
            return u.Z.post("".concat(i.s4, "/content/moment/delete/comment"), {
                commentId: n,
                sortType: 0
            }).then((function (n) {
                return 200 === n.data.code ? I().showToast({
                    title: n.data.msg || "删除成功",
                    icon: "none",
                    duration: 2e3
                }) : I().showToast({
                    title: n.data.errorDesc || "删除失败",
                    icon: "none",
                    duration: 2e3
                }), n.data.code
            }))
        };

        function H() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "1",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return u.Z.get("".concat(i.FX, "/model/openModel"), {oprType: n, relationId: t})
        }

        function N(n) {
            return u.Z.get("".concat(i.s4, "/content/moment/lead/v3"), {momentsId: n})
        }

        function R(n) {
            return u.Z.get("".concat(i.s4, "/content/moment/person/info"), {publishPersonId: n})
        }

        function M(n) {
            return u.Z.post("".concat(i.s4, "/cms/magic/center/send"), {magicIds: n, source: 16})
        }

        function O() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2;
            return u.Z.get("".concat(i.Gm, "/app/index/getBannerAndPromo"), {channel: i.cW, scene: n})
        }

        function A(n, t) {
            return u.Z.post("".concat(i.Gm, "/brand_gift/list"), {}, {header: {pageNo: n, pageSize: t}})
        }

        function P() {
            return u.Z.get("".concat(i.bk, "/time_value/secretOrder/getUrl"))
        }

        function x() {
            return u.Z.get("".concat(i.Ii, "/user_info/v1/getGreeting"))
        }

        function B(n) {
            return u.Z.post("".concat(i.Gm, "/cateCard/queryRecommendedCard"), n)
        }

        var V = function (n) {
            return u.Z.post("".concat(i.E0, "/coupon/addPurchaseCardList"), n)
        }
    }, 37600: function (n, t, e) {
        e.d(t, {
            pL: function () {
                return u
            }, dz: function () {
                return i
            }, ZL: function () {
                return c
            }, Vk: function () {
                return a
            }, yg: function () {
                return s
            }, Ue: function () {
                return f
            }, Vj: function () {
                return d
            }, H6: function () {
                return l
            }, uP: function () {
                return p
            }, $9: function () {
                return v
            }, e$: function () {
                return h
            }, WC: function () {
                return m
            }, k0: function () {
                return g
            }, ny: function () {
                return y
            }, Qn: function () {
                return I
            }, bX: function () {
                return T
            }, _z: function () {
                return b
            }, Wv: function () {
                return w
            }, PT: function () {
                return Z
            }, Kd: function () {
                return _
            }, nI: function () {
                return k
            }, iC: function () {
                return C
            }, U0: function () {
                return S
            }, M9: function () {
                return E
            }, ZS: function () {
                return L
            }
        });
        var r = e(43461), o = e(27560);

        function u(n) {
            return Object.assign(n, {channelType: o.zW}), r.Z.post("".concat(o.E0, "/order_main/create_order"), n)
        }

        function i(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return r.Z.get("".concat(o.E0, "/order_main/get/order_info"), {
                orderId: n,
                channelType: 1,
                combinedOrderNo: t
            })
        }

        function c(n) {
            return r.Z.post("".concat(o.E0, "/cate/detail"), {orderMainNo: n})
        }

        function a(n) {
            return r.Z.get("".concat(o.s4, "/hotel/bdw_order_invoice/autoTitleQuery"), n)
        }

        var s = function (n) {
            return n[n.BdCard = 0] = "BdCard", n[n.HouseCoupon = 1] = "HouseCoupon", n
        }({});

        function f(n) {
            return r.Z.post("".concat(o.E0, "/order_invoice_info/addInvoiceInfo"), n)
        }

        function d(n) {
            return r.Z.post("".concat(o.E0, "/order_invoice_info/updateInvoiceInfo"), n)
        }

        function l(n) {
            return r.Z.post("".concat(o.E0, "/bdw_order_invoice/addInvoiceInfo"), n)
        }

        function p(n) {
            return r.Z.post("".concat(o.E0, "/bdw_order_invoice/updateInvoiceInfo"), n)
        }

        function v(n) {
            return r.Z.post("".concat(o.E0, "/order_invoice_info/getInvoiceInfo"), {orderInvoiceInfoId: n})
        }

        function h(n) {
            return r.Z.post("".concat(o.E0, "/bdw_order_invoice/getInvoiceInfo"), {bdwOrderInvoiceId: n})
        }

        function m(n) {
            var t = n.orderInvoiceInfoId, e = n.email;
            return r.Z.post("".concat(o.E0, "/order_invoice_info/resendEmail"), {orderInvoiceInfoId: t, email: e})
        }

        function g(n) {
            return r.Z.post("".concat(o.E0, "/order_main/cancel_order"), {mainOrderId: n})
        }

        function y(n) {
            return r.Z.post("".concat(o.E0, "/cate/del_order"), {orderMainNo: n})
        }

        function I(n) {
            return r.Z.post("".concat(o.E0, "/cate/cancel_order"), {orderMainNo: n})
        }

        function T(n) {
            var t = "".concat(o.s4, "/base/app/order/list/v5");
            return n.contentStatus && (n.orderStatus = 2), r.Z.post(t, n, {
                header: {
                    pageNum: n.pageNum,
                    pageSize: n.pageSize
                }
            })
        }

        function b(n) {
            var t = "".concat(o.E0, "/order_main/page");
            return (n.status || 0 === n.status) && (t = "".concat(o.E0, "/order_main/page?status=").concat(n.status)), n.contentStatus && (t = "".concat(o.E0, "/order_main/page?status=2&contentStatus=").concat(n.contentStatus)), r.Z.post(t, null, {
                header: {
                    pageNum: n.pageNum,
                    pageSize: n.pageSize
                }
            })
        }

        function w(n) {
            return r.Z.post("".concat(o.E0, "/order_main/del_order"), {orderMainNo: n})
        }

        function Z(n) {
            return Object.assign(n, {channelType: 1}), r.Z.post("".concat(o.E0, "/order_main/update_order"), n)
        }

        function _(n, t) {
            return r.Z.post("".concat(o.E0, "/order_main/check_cancel_modify_goods_order"), {orderNo: n, type: t})
        }

        function k(n, t) {
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            return r.Z.get("".concat(o.E0, "/PaymentInfo/getPaymentChannel"), {
                hotelCode: n,
                orderMainNo: t,
                combinedOrderNo: e
            })
        }

        function C(n) {
            return r.Z.post("".concat(o.FX, "/order/count/v3"), {params: n})
        }

        function S() {
            return r.Z.get("".concat(o.s4, "/hotel/bookingCommonInfo/getOtherBookingIconList"))
        }

        function E() {
            return r.Z.get("".concat(o.s4, "/hotel/bookingCommonInfo/getOtherBookingImageAndPop"))
        }

        function L(n) {
            return r.Z.post("".concat(o.E0, "/order_main/getSimpleOrderInfo"), n)
        }
    }, 86410: function (n, t, e) {
        e.d(t, {
            PV: function () {
                return i
            }, WY: function () {
                return c
            }, pz: function () {
                return a
            }, oQ: function () {
                return s
            }, tZ: function () {
                return f
            }, k: function () {
                return d
            }, k6: function () {
                return l
            }, JE: function () {
                return p
            }, v2: function () {
                return v
            }, an: function () {
                return h
            }, Is: function () {
                return m
            }, ph: function () {
                return g
            }, hI: function () {
                return y
            }, qD: function () {
                return I
            }, Em: function () {
                return T
            }, Kh: function () {
                return b
            }, Re: function () {
                return w
            }, iG: function () {
                return Z
            }, _1: function () {
                return _
            }, oW: function () {
                return k
            }
        });
        var r = e(96949), o = e(43461), u = e(27560), i = function (n) {
            return o.Z.get("".concat(u.E0, "/roomService/listDeliveryAndServiceType?companyId=").concat(n.companyId))
        }, c = function (n) {
            return o.Z.post("".concat(u.E0, "/roomService/saveRoomService"), n)
        }, a = function (n) {
            return o.Z.get("".concat(u.E0, "/roomService/listFinishedByPhone"), {
                hotelId: n.hotelId,
                roomNum: n.roomNum,
                startTime: n.startTime
            })
        };

        function s(n) {
            return o.Z.get("".concat(u.s4, "/base/app/service_page/trip_order"), n)
        }

        function f(n) {
            return o.Z.post("".concat(u.s4, "/cms/voucher/queryLiveInOfflineVipMagic"), n)
        }

        function d(n) {
            return o.Z.post("".concat(u.E0, "/order_main/confirmUserInfo"), n)
        }

        function l(n) {
            return o.Z.get("".concat(u.s4, "/content/opinion/getOrderOpinionInfo?orderId=").concat(n.orderId, "&roomOrderId=").concat(n.roomOrderId, "&channel=").concat(n.channel, "&hotelCode=").concat(n.hotelCode))
        }

        function p() {
            return o.Z.get("".concat(u.ks, "/opinion/userType/getList"))
        }

        function v(n) {
            return o.Z.post("".concat(u.ks, "/opinion/add"), (0, r.Z)({}, n))
        }

        function h() {
            return o.Z.get("".concat(u.ks, "/opinion/getPicture"))
        }

        function m(n) {
            return o.Z.post("".concat(u.s4, "/base/app/service_page/service_records"), n, {
                header: {
                    pageNum: n.pageNum,
                    pageSize: n.pageSize
                }
            })
        }

        function g() {
            return o.Z.get("".concat(u.ks, "/opinion/wx/showOpinionModel"))
        }

        var y = function (n) {
            return o.Z.get("".concat(u.ks, "/opinion/pageInfoLog"), {opinionId: n})
        }, I = function (n) {
            return o.Z.post("".concat(u.ks, "/opinion/editInfoSatis"), n)
        }, T = function (n) {
            return n[n.pendingPay = 0] = "pendingPay", n[n.reserveOrder = 1] = "reserveOrder", n[n.finishOrder = 2] = "finishOrder", n[n.cancelledOrder = 3] = "cancelledOrder", n[n.checkInOrder = 4] = "checkInOrder", n[n.unusedOrder = 5] = "unusedOrder", n
        }({}), b = function (n) {
            return n[n.BookPeople = 0] = "BookPeople", n[n.CheckInPeople = 1] = "CheckInPeople", n[n.Other = 2] = "Other", n
        }({}), w = function (n) {
            return o.Z.get("".concat(u.E0, "/order_main/getTripInfo"), n)
        }, Z = function (n) {
            return o.Z.post("".concat(u.E0, "/order_main/confirmTripInfo"), n)
        }, _ = function (n) {
            return o.Z.get("".concat(u.s4, "/weixin/wx/miniApp/queryShandsShareParam"), {sceneCode: n})
        }, k = function (n) {
            return o.Z.get("".concat(u.E0, "/roomService/listDeliveryAndServiceTypeV2"), {hotelCode: n})
        }
    }, 44865: function (n, t, e) {
        e.d(t, {
            xN: function () {
                return c
            }, z2: function () {
                return a
            }, Yi: function () {
                return s
            }, Lq: function () {
                return f
            }, re: function () {
                return d
            }, FY: function () {
                return l
            }, in: function () {
                return p
            }, es: function () {
                return v
            }
        });
        var r, o = e(1902), u = e(43461), i = e(27560);

        function c() {
            return u.Z.get("".concat(i.s4, "/base/app/service_page/queryTripOrderFilterBar"))
        }

        var a = function (n) {
            return n.READ_BEFORE_CHECK_IN = "READ_BEFORE_CHECK_IN", n.NAVIGATE_TO_HOTEL = "NAVIGATE_TO_HOTEL", n.CONTACT_HOTEL = "CONTACT_HOTEL", n.CONTACT_MOBILE = "CONTACT_MOBILE", n.PAY_NOW = "PAY_NOW", n.CONFIRM_NOW = "CONFIRM_NOW", n.BLUETOOTH_UNLOCK = "BLUETOOTH_UNLOCK", n.STAY_SERVICE = "STAY_SERVICE", n.RENEW_STAY = "RENEW_STAY", n.DELETE_TRIP = "DELETE_TRIP", n.BOOK_AGAIN = "BOOK_AGAIN", n.FEEDBACK = "FEEDBACK", n.JOIN_COMMUNITY = "JOIN_COMMUNITY", n.HOTEL_MANAGER = "HOTEL_MANAGER", n.INVOICE = "INVOICE", n.INVOICE_DETAIL = "INVOICE_DETAIL", n.PRE_CHECK_IN = "PRE_CHECK_IN", n.UPDATE_PRE_CHECK_IN = "UPDATE_PRE_CHECK_IN", n
        }({});

        function s(n) {
            return u.Z.post("".concat(i.s4, "/base/app/service_page/v2/trip_order"), n)
        }

        function f(n) {
            return u.Z.post("".concat(i.s4, "/base/app/service_page/queryHotelCheckInInstructions"), n)
        }

        function d(n) {
            return u.Z.post("".concat(i.s4, "/base/app/service_page/removeTripOrderRecordInfo"), n)
        }

        function l(n) {
            return u.Z.post("".concat(i.s4, "/base/app/service_page/queryHotelCheckInOfflineVipMagic"), n)
        }

        function p(n) {
            return u.Z.get("".concat(i.s4, "/content/opinion/queryOpinionPopup"), n)
        }

        function v(n) {
            return u.Z.post("".concat(i.s4, "/content/opinion/add"), n)
        }

        r = {}, (0, o.Z)(r, a.READ_BEFORE_CHECK_IN, "住前必读"), (0, o.Z)(r, a.NAVIGATE_TO_HOTEL, "酒店导航"), (0, o.Z)(r, a.CONTACT_HOTEL, "联系酒店"), (0, o.Z)(r, a.CONTACT_MOBILE, "联系电话"), (0, o.Z)(r, a.PAY_NOW, "立即支付"), (0, o.Z)(r, a.CONFIRM_NOW, "立即确认"), (0, o.Z)(r, a.BLUETOOTH_UNLOCK, "蓝牙开锁"), (0, o.Z)(r, a.STAY_SERVICE, "住中服务"), (0, o.Z)(r, a.RENEW_STAY, "一键续住"), (0, o.Z)(r, a.DELETE_TRIP, "删除行程"), (0, o.Z)(r, a.BOOK_AGAIN, "再次预订"), (0, o.Z)(r, a.FEEDBACK, "体验反馈"), (0, o.Z)(r, a.JOIN_COMMUNITY, "加入社群"), (0, o.Z)(r, a.HOTEL_MANAGER, "酒店管家"), (0, o.Z)(r, a.PRE_CHECK_IN, "自助选房"), (0, o.Z)(r, a.UPDATE_PRE_CHECK_IN, "修改选房")
    }, 72473: function (n, t, e) {
        e.d(t, {
            w: function () {
                return u
            }, X: function () {
                return i
            }
        });
        var r = e(43461), o = e(27560);

        function u() {
            return r.Z.get("".concat(o.FH, "/unimsg/wx/minProgram/getLocationTypeTemplateIds"))
        }

        function i(n) {
            return r.Z.post("".concat(o.FH, "/unimsg/wx/minProgram/saveWxMaSubscribeInfo"), n)
        }
    }, 52050: function (n, t, e) {
        e.d(t, {
            v: function () {
                return u
            }, dV: function () {
                return i
            }, XA: function () {
                return c
            }, gn: function () {
                return a
            }, rH: function () {
                return s
            }, GV: function () {
                return f
            }, kj: function () {
                return d
            }, Qj: function () {
                return l
            }, AY: function () {
                return p
            }, Py: function () {
                return v
            }, ye: function () {
                return h
            }, PW: function () {
                return m
            }, _$: function () {
                return g
            }, gR: function () {
                return y
            }, pR: function () {
                return I
            }, ey: function () {
                return T
            }, kS: function () {
                return b
            }, Bz: function () {
                return w
            }, KV: function () {
                return Z
            }, ZT: function () {
                return _
            }, HV: function () {
                return k
            }, zJ: function () {
                return C
            }, Hj: function () {
                return S
            }, fb: function () {
                return E
            }, YE: function () {
                return L
            }, E6: function () {
                return D
            }
        });
        var r, o = e(1902), u = function (n) {
                return n[n.member = 0] = "member", n[n.longteng = 1] = "longteng", n[n.jbkill = 2] = "jbkill", n[n.hotel = 3] = "hotel", n
            }({}), i = function (n) {
                return n.rest = "1", n.jbkill = "2", n.hotel = "3", n.maiFei = "4", n
            }({}), c = function (n) {
                return n[n["个人法宝"] = 1] = "个人法宝", n[n["企业法宝"] = 2] = "企业法宝", n[n["通用法宝"] = 3] = "通用法宝", n
            }({}), a = function (n) {
                return n[n.CONPON = 0] = "CONPON", n[n.STATUS = 1] = "STATUS", n
            }({}), s = function (n) {
                return n[n.ALMOSTEXPIRED = 1] = "ALMOSTEXPIRED", n[n.AVAILABLE = 2] = "AVAILABLE", n[n.INUSE = 3] = "INUSE", n[n.ALREADYUSE = 4] = "ALREADYUSE", n[n.EXPIRED = 5] = "EXPIRED", n
            }({}), f = function (n) {
                return n.WALK_IN = "WKI_CLIENT", n
            }({}), d = function (n) {
                return n[n.calendar = 0] = "calendar", n[n.hour = 1] = "hour", n
            }({}), l = {0: "待支付", 1: "待入住", 2: "已离店", 3: "已取消", 4: "已入住", 5: "未使用"},
            p = {notOpen: "NO"}, v = function (n) {
                return n[n.BDX = 0] = "BDX", n
            }({}), h = function (n) {
                return n[n.ALL = 0] = "ALL", n[n.LOUNGE = 1] = "LOUNGE", n[n.JBKILL = 2] = "JBKILL", n[n.HOTEL = 3] = "HOTEL", n[n.YX = 4] = "YX", n[n.CARD = 5] = "CARD", n
            }({}), m = function (n) {
                return n[n.All = 0] = "All", n[n.ToPay = 1] = "ToPay", n[n.ToUse = 2] = "ToUse", n[n.Completed = 3] = "Completed", n[n.ToDeliver = 5] = "ToDeliver", n[n.ToReceive = 6] = "ToReceive", n[n.Refund = 7] = "Refund", n[n.ToReserve = 2] = "ToReserve", n[n.Canceled = 4] = "Canceled", n.ToEvaluate = "evaluate", n
            }({}), g = function (n) {
                return n[n.story = 2] = "story", n[n.hotel = 3] = "hotel", n[n.yxStore = 4] = "yxStore", n[n.shop = 5] = "shop", n[n.card = 7] = "card", n
            }({}), y = function (n) {
                return n[n.weapp = 2] = "weapp", n[n.alipay = 4] = "alipay", n[n.common = 0] = "common", n
            }({}), I = function (n) {
                return n.weapp = "微信", n.alipay = "支付宝", n
            }({}), T = function (n) {
                return n.weapp = "H-002-04", n.alipay = "H-03SC-ZFB", n
            }({}), b = function (n) {
                return n[n.weapp = 1] = "weapp", n[n.alipay = 12] = "alipay", n
            }({}), w = function (n) {
                return n.weapp = "BDW_WECHAT_APPLET", n.alipay = "BDW_ALI_APPLET", n
            }({}), Z = function (n) {
                return n.Alipay = "alipay", n.Wechat = "wxpay", n
            }({}), _ = function (n) {
                return n.WaitToPay = "0", n.HasBooked = "1", n.HasCompleted = "2", n.HasCanceled = "3", n.HasCheckIn = "4", n.NotUsed = "5", n
            }({}), k = function (n) {
                return n.hotelInfo = "1", n.scriptInfo = "2", n.feedback = "6", n.coupon = "9", n.activity = "12", n.card = "13", n
            }({}), C = function (n) {
                return n.scanCode = "1", n
            }({}), S = function (n) {
                return n[n.rights = 2] = "rights", n[n.chto = 3] = "chto", n[n.mini = 4] = "mini", n
            }({}), E = function (n) {
                return n[n.chto = 1] = "chto", n[n.houseCoupon = 2] = "houseCoupon", n
            }({}), L = function (n) {
                return n[n.PendingPayment = 0] = "PendingPayment", n[n.PendingConfirmation = 1] = "PendingConfirmation", n[n.PendingCheckIn = 2] = "PendingCheckIn", n[n.InProgress = 3] = "InProgress", n[n.Completed = 4] = "Completed", n
            }({}),
            D = (r = {}, (0, o.Z)(r, L.PendingPayment, "待支付"), (0, o.Z)(r, L.PendingConfirmation, "待确认"), (0, o.Z)(r, L.PendingCheckIn, "待入住"), (0, o.Z)(r, L.InProgress, "入住中"), (0, o.Z)(r, L.Completed, "已完成"), r)
    }, 27560: function (n, t, e) {
        e.d(t, {
            Ch: function () {
                return c
            }, yy: function () {
                return a
            }, Gm: function () {
                return h
            }, bk: function () {
                return m
            }, Um: function () {
                return y
            }, FH: function () {
                return i
            }, s4: function () {
                return f
            }, E0: function () {
                return d
            }, Ii: function () {
                return p
            }, FX: function () {
                return l
            }, ks: function () {
                return v
            }, xk: function () {
                return s
            }, jZ: function () {
                return g
            }, rO: function () {
                return I
            }, sd: function () {
                return T
            }, PQ: function () {
                return b
            }, iO: function () {
                return w
            }, e_: function () {
                return k
            }, iC: function () {
                return C
            }, cW: function () {
                return S
            }, iB: function () {
                return E
            }, Ez: function () {
                return L
            }, Eb: function () {
                return Z
            }, Vj: function () {
                return _
            }, Nc: function () {
                return D
            }, AF: function () {
                return H
            }, zW: function () {
                return N
            }, Ji: function () {
                return R
            }
        });
        var r = e(31121), o = e.n(r), u = e(52050), i = "".concat("https://api.betterwood.com"),
            c = "https://h5.betterwood.com", a = "https://chat.bwagent.net", s = "".concat(c, "/#/hotel-detail"),
            f = "".concat(i), d = "".concat(i, "/hotel"), l = "".concat(i, "/base/app"),
            p = ("".concat(i, "/cms/app"), "".concat(i, "/user")), v = "".concat(i, "/content"),
            h = "".concat(i, "/cms"), m = "".concat(i, "/member"), g = "https://img.betterwood.com",
            y = "https://img.betterwood.com/minapp",
            I = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9cZhaIyhGhqFuXYD/sGGXxyYT1J3uYccgVqHratrWO4gsn4CjhkEk3/eO9uQCU5KD/R+ia99rJq3hRlQa9QWeI0hlteUlp0nsSbSjNA1UY+jGH5JBdpxGfh3fOuqE9fS3XnofHqMr3vbFgROlmsqxglkWnmp8sTNTSQdVKbrtcwIDAQAB",
            T = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALQhkRvkncYkscSHCzYGHb/DTgGKjM6BN9bJfhKe/fX+jNT7vC6CU8n0GoRBOy16ghWxtDX5BX67h1Ig7fdCB6ewDLsJ8w+DeYSBugZnYUkPHB3ZigadHesaKiwm2ZGGdN0mCBzTuOwdrAygBm6DoZ9bspEw1gnGJ56rB85RfzS3AgMBAAECgYEAlz8oDHelUl41NYL+ktoH2KAwu3KOUEaHkD2XMiN1sjuOHLdShuq/V+8y5KGxArq+x2BypG73gjYLpZYouVgj++p8GLXbCHlMFm7UN1/Vk85UhsP+TaELybkUcLqmcC96AyjQ8GUMM2VO6reB2HIL1r2obvfkO/MVOBaHaHQQcgECQQDt/HyF10nDs4R1u5/3lSjBvUbSIotybr2WroWv41RixdzVfnHn1UrizBy2RBLScdQdKl4z+uBq6Q+aGD19Vw3BAkEAwcQCEN2u1xssakDN62RY2sIE7ybwRjy4ql16JJqFnISw/bqCiANy2Z1pMYMDrGcmsvh2bJYkgLLBZ2Tqv5vQdwJBAL0zC7REEeq530bSITztondUCOeqev5AuA0BNls8+auE7in02o2a7mwcJX9p4yTXRfDh6/6bJqsYGkVBnDD3coECQC5lDEmViuOecggO9D9Ei7H1etD4ddebemvwbeqNxSgw7WATZGXEzZ8lfaaJRDvnhvCbZV+io6LdKknjdAHlAQkCQQComMq6sdheHnEb8oVHCpeYqqikdIH+sdYeLVEUARSYqIvahU5D6hoq+zfMRVT38H3v3JC0X5NZkg8qERLKzVkO",
            b = "/modules/main/views/middle-page/MiddlePage",
            w = ["high-lounge", "lucky-draw-v2", "brand-zone", "magic"],
            Z = ["modules/hotel/views/codeCheckIn/index"], _ = ["modules/hotel/views/codeCheckIn/index"],
            k = ["/modules/main/views/bookHotel/BookHotel", "/modules/main/views/service/Service", "/modules/main/views/mine/index", "/modules/main/views/reserve/index"],
            C = u.pR.weapp, S = u.gR.weapp, E = u.ey.weapp, L = u.Bz.weapp,
            D = o().getEnv() === o().ENV_TYPE.ALIPAY, H = D ? "2021003191682096" : "wx1b77d3569b2dd7fa",
            N = u.kS.weapp, R = "3.5.6"
    }, 45788: function (n, t, e) {
        e.d(t, {
            GX: function () {
                return w
            }, bi: function () {
                return Z
            }, $P: function () {
                return _
            }, QS: function () {
                return C
            }, YO: function () {
                return S
            }
        });
        var r = e(12663), o = e(13283), u = e(96949), i = e(18030), c = e(31121), a = e.n(c), s = e(41530),
            f = e(36238), d = e(9200), l = e.n(d), p = e(91287), v = e(51309), h = e(75577), m = e(67777),
            g = (0, s.iH)(""), y = (0, s.iH)(""), I = (0, s.iH)(p.ZP.getDay(0)), T = function (n) {
                g.value = n[0], y.value = n[1]
            }, b = (0, s.iH)([]), w = function (n, t) {
                var e = (0, i.aR)(), r = (0, i.M2)(), o = (0, h.f)(), c = (0, f.Fl)((function () {
                    var n = e.state.coupon;
                    return n && !n.isOnline ? n : null
                })), s = (0, f.Fl)((function () {
                    if ("edit" === t) {
                        var n = r.date, u = (new Date).setHours(0, 0, 0, 0) - ((0, v.H)().isZeroTime.value ? 864e5 : 0),
                            i = n;
                        return n[0] < u && (i = [u, u + 864e5], r.setDate([u, u + 864e5])), i.map((function (n) {
                            return l()(n).format("YYYY-MM-DD")
                        }))
                    }
                    return "independent" === t ? o.date.map((function (n) {
                        return l()(n).format("YYYY-MM-DD")
                    })) : e.state.date.map((function (n) {
                        return l()(n).format("YYYY-MM-DD")
                    }))
                })), d = function (n) {
                    for (var t = n[0]; t < n[1]; t += 864e5) {
                        var e, r, o = new Date(t).getDay() || 7;
                        if (null === (e = c.value) || void 0 === e || !e.validatyRule.includes(o + "") || null === (r = c.value) || void 0 === r || !r.reserveValidatyRule.includes(o + "")) return !1
                    }
                    return !0
                };
                return (0, f.m0)((function () {
                    T(s.value)
                })), {
                    date: s, handleSelectSuccess: function (i, s, f) {
                        if (null != i && i[1] && (!f || f(i, s))) {
                            if (c.value) {
                                var l, p;
                                if (!d(i)) return a().showToast({
                                    title: "当前日期暂无房价，请您更换日期",
                                    icon: "none",
                                    duration: 2e3
                                });
                                if (c.value.thresholdNight && s !== c.value.thresholdNight) return a().showToast({
                                    title: "该".concat(null !== (l = c.value) && void 0 !== l && l.isRights ? "权益" : "法宝", "仅支持预订").concat(null === (p = c.value) || void 0 === p ? void 0 : p.thresholdNight, "晚"),
                                    icon: "none",
                                    duration: 2e3
                                });
                                e.setCoupon((0, u.Z)((0, u.Z)({}, c.value), {}, {canUse: !0})), "independent" === t ? o.setDate(i) : (e.setDate(i), "edit" === t && r.setDate(i))
                            } else e.setDate(i), "independent" === t ? o.setDate(i) : "edit" === t && r.setDate(i);
                            setTimeout((function () {
                                n()
                            }), 500)
                        }
                    }
                }
            }, Z = function (n, t) {
                var e = (0, i.aR)(), r = (0, i.M2)(), o = (0, h.f)(), u = (0, f.Fl)((function () {
                    var n = "independent" === t ? o.date[0] : "edit" === t ? r.date[0] : e.state.date[0];
                    return l()((0, p.Qu)(n) ? Date.now() : n).format("YYYY-MM-DD")
                }));
                (0, f.m0)((function () {
                    T([u.value])
                }));
                return {
                    date: u, handleSelectSuccess: function (u) {
                        if (u) {
                            var i = [u, u + 864e5];
                            "independent" === t ? o.setDate(i) : (e.setDate(i), "edit" === t && r.setDate(i)), setTimeout((function () {
                                n()
                            }), 500)
                        }
                    }
                }
            }, _ = function () {
                var n = (0, f.Fl)((function () {
                    return g.value && y.value ? (l()(y.value).valueOf() - l()(g.value).valueOf()) / 864e5 : 0
                }));
                return {lowPriceList: b, firstDate: g, secondDate: y, totalNights: n, setDates: T}
            }, k = function () {
                I.value = p.ZP.getDay(0)
            }, C = function () {
                return {today: I, setToday: k}
            }, S = function () {
                return {lowPriceList: b, refreshPrice: E}
            };

        function E(n) {
            return L.apply(this, arguments)
        }

        function L() {
            return (L = (0, o.Z)((0, r.Z)().mark((function n(t) {
                var e, o;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2, (0, m.R5)((0, u.Z)((0, u.Z)({}, t), {}, {dateStart: g.value}));
                        case 2:
                            e = n.sent, 200 === (o = e.data).code && o.data ? b.value = (o.data || []).map((function (n) {
                                return {rsvDate: l()(Number(n.rsvDate)).format("YYYY-MM-DD"), rate: n.rate}
                            })) : o.errorDesc && a().showToast({title: o.errorDesc, icon: "none"});
                        case 5:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })))).apply(this, arguments)
        }
    }, 17274: function (n, t, e) {
        e.d(t, {
            t: function () {
                return l
            }, F: function () {
                return p
            }
        });
        var r = e(78629), o = e(45788), u = e(18030), i = e(91287), c = e(9200), a = e.n(c), s = e(41530),
            f = e(36238), d = (0, s.iH)("range"), l = function (n) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                    e = new Date(n).setHours(0, 0, 0, 0), r = e - (new Date).setHours(0, 0, 0, 0);
                return 0 === r ? "今天" : t && 864e5 === r ? "明天" : ""
            }, p = function () {
                var n = (0, u.aR)(), t = (0, o.QS)().today, e = (0, f.Fl)((function () {
                    var e = n.state.date[0];
                    if (!e) return {dateStr: "未知日期", dayTip: ""};
                    var r = new Date(t.value).setHours(0, 0, 0, 0) > e, o = "range" === d.value, u = r ? e + 864e5 : e,
                        c = a()(u);
                    return {
                        dateStr: c.format("MM月DD日"),
                        dayTip: r && o ? "凌晨" : l(u, !1) || "周".concat(i.Dm[c.day()]),
                        isZero: r,
                        weekTip: "周".concat(i.Dm[c.day()])
                    }
                })), c = (0, f.Fl)((function () {
                    var t = n.state.date[1];
                    if (!t) return {dateStr: "未知日期", dayTip: ""};
                    var e = a()(t);
                    return {
                        dateStr: e.format("MM月DD日"),
                        dayTip: new Date(t).setHours(0, 0, 0, 0) < Date.now() ? "中午" : l(t) || "周".concat(i.Dm[e.day()]),
                        weekTip: "周".concat(i.Dm[e.day()])
                    }
                })), s = (0, f.Fl)((function () {
                    var t = (0, r.Z)(n.state.date, 2), e = t[0], o = t[1], u = new Date(e).setHours(0, 0, 0, 0),
                        i = new Date(o).setHours(0, 0, 0, 0);
                    return parseInt("".concat((i - u) / 864e5), 10)
                })), p = (new Date).setHours(0, 0, 0, 0), v = (new Date).setHours(0, 0, 0, 0) + 864e5;
                return {
                    firstDateInfo: e, secondDateInfo: c, nights: s, setCalendarType: function (n) {
                        d.value = n
                    }, calendarType: d, todayStartTime: p, todayEndTime: v
                }
            }
    }, 56707: function (n, t, e) {
        e.d(t, {
            H: function () {
                return u
            }
        });
        var r = e(18030), o = e(91287), u = function () {
            var n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = (0, r.aR)(), e = t.state,
                u = e.date;
            if (n) {
                var i = (0, o.Qu)(u[0]) ? Date.now() : u[0];
                return {dates: [i, i + 864e5]}
            }
            return {dates: u}
        }
    }, 43175: function (n, t, e) {
        e.d(t, {
            x: function () {
                return r
            }
        });
        var r = function () {
            var n = 11, t = function (t) {
                n = t
            };
            return function () {
                return {oneLineMaxLen: n, updateOneLineMax: t}
            }
        }()
    }, 96764: function (n, t, e) {
        e.d(t, {
            s: function () {
                return s
            }
        });
        var r = e(31121), o = e.n(r), u = e(60779), i = e(27560), c = e(25648), a = {
            toAuth: "/modules/member/views/myInfo/certification",
            toTimeValueRecords: "/modules/member/views/timeValueDetail/timeValueDetail",
            toTreasureBag: "/modules/member/views/treasureBag/index",
            toCircleDetail: "/modules/circle/views/brandCircle/CircleDetail"
        }, s = function () {
            var n = function (n) {
                var t, e, r = (0, c.eg)(n.linkAppId),
                    u = null !== (t = n.link) && void 0 !== t && t.includes("|") ? (null === (e = n.link) || void 0 === e || null === (e = e.split("|")) || void 0 === e ? void 0 : e[1]) || "" : n.link;
                r && (0, c.pt)(r, u), r || "酒店小程序" !== n.linkAppId || (i.e_.includes(u) ? o().switchTab({url: u}) : o().navigateTo({url: u}))
            };
            return {
                navigateToPage: function (n, t) {
                    var e = a[n];
                    if (e) {
                        if (t) {
                            var r = e.includes("?") ? "&".concat(t) : "?".concat(t);
                            e = "".concat(e).concat(r)
                        }
                        o().navigateTo({url: e})
                    }
                }, toMyPrivilege: function () {
                }, navigateH5: u.C4, navigateToLink: function (t) {
                    if ("weixin" === t.linkType) n(t); else if ("h5" === t.linkType) {
                        var e = !!t.link.includes("//");
                        (0, u.C4)(t.link, e)
                    }
                }
            }
        }
    }, 21890: function (n, t, e) {
        e.d(t, {
            d: function () {
                return u
            }
        });
        var r = e(18030), o = e(36238), u = function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], e = (0, o.Fl)((function () {
                return (0, r.LM)().state.token
            }));
            return n && (0, o.YP)(e, (function (t) {
                n(t)
            }), {immediate: t}), {token: e}
        }
    }, 95501: function (n, t, e) {
        e.d(t, {
            a: function () {
                return y
            }
        });
        var r = e(12663), o = e(13283), u = e(96949), i = e(31121), c = e.n(i), a = e(41530), s = e(36238),
            f = e(18030), d = e(27560), l = e(67777), p = e(5679), v = e(73061), h = e(75093), m = e(52050),
            g = e(53134), y = function (n) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        showToast: !0,
                        jumpHotelFlag: !1
                    }, e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, g = t.showToast,
                    y = t.jumpHotelFlag, T = (0, a.iH)("");

                function w() {
                    var n = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    c().removeStorageSync(m.GV.WALK_IN), c().login({
                        success: function (t) {
                            t.code && Z(t.code, n)
                        }, fail: function () {
                            T.value = "error"
                        }
                    })
                }

                function Z(n, t) {
                    var r, o = e.channel || (0, f.Zi)().getChannel(),
                        i = null !== (r = e.salesInfo) && void 0 !== r && r.salesId ? e.salesInfo : (0, f.Zi)().getSalesInfo(),
                        a = {
                            loginType: d.Ez,
                            code: n,
                            channel: o,
                            appId: d.AF,
                            switchAccounts: (0, f.LM)().getLogout()
                        };
                    null != i && i.salesId && Object.assign(a, (0, u.Z)({}, i)), (0, l.yh)(a).then((function (n) {
                        var r = n.data, u = r.code, i = r.data, a = r.msg, s = r.errorDesc;
                        if (e.isWalkIn) return (0, f.LM)().setOpenId(i.openId), void (e.showRole = !0);
                        if (200 === u && i) {
                            if ((0, f.LM)().setHandleType(i.handleType), 0 === i.handleType) (0, f.LM)().setToken(i.token), (0, f.LM)().setOpenId(i.openId), _(), y && b(i.hotelId, i.activateMessage); else if ((0, f.LM)().setOpenId(i.openId), !1 === e.showRole) {
                                if ("ELS_NEW_MEMBER" === o) return void (e.showRole = !0);
                                e.showRole = !0
                            } else T.value = "error", t && (0, v.jp)((function () {
                            }), "?onlyRegistry=true");
                            d.Nc && c().TrackSDK.identify(i.openId)
                        } else T.value = "error", g && c().showToast({
                            title: a || s || "用户登录失败",
                            icon: "none",
                            duration: 2e3
                        }), (0, v.jp)((function () {
                        }), "?onlyRegistry=true")
                    })).catch((function () {
                        T.value = "error", g && c().showToast({
                            title: "用户登录失败",
                            icon: "none",
                            duration: 2e3
                        }), (0, v.jp)((function () {
                        }), "?onlyRegistry=true")
                    })).finally((function () {
                        e.$emit && e.$emit("update:needLogin", !1)
                    }))
                }

                function _() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        t = (0, f.LM)().getOpenId() || "", r = {loginType: d.Ez, openId: t};
                    (0, l.GT)((0, u.Z)({}, r)).then((function (t) {
                        var r = t.data, o = r.code, i = r.data;
                        if (200 === o && i) {
                            e.userInfo = i, e.showRole = !1, c().TrackSDK.login(i.userId), c().TrackSDK.track("newMember", {userType_var: n});
                            var a = (0, u.Z)({
                                userName: i.chineseName,
                                phone: i.mobile,
                                avatarUrl: i.photoUrl,
                                job: i.position,
                                gender: i.sex,
                                id: i.userId,
                                nickName: i.nickname
                            }, i);
                            c().setStorageSync("userInfo", a), c().setStorageSync("user_id", a.id), c().setStorageSync("phone", a.phone), c().setStorageSync("areaCode", a.areaCode);
                            var s = (0, f.LM)(), d = s.setRealNameMark, l = s.setUserNew, p = s.setMemberType;
                            d(i.idCardVerify), l(i.isNewMember), p(i.memberType);
                            var v = e.channel || (0, f.Zi)().getChannel(), h = "";
                            "ELS_NEW_MEMBER" !== v || e.hasAddVip ? "ELS_NEW_MEMBER" === v && e.hasAddVip && (h = "恭喜您成功加入百达屋!") : h = "欢迎回到百达屋", h && g && c().showToast({
                                title: h,
                                icon: "none"
                            })
                        }
                    })).catch((function () {
                        g && c().showToast({title: "获取用户信息失败", icon: "none", duration: 2e3})
                    })).finally((function () {
                        var n = (0, f.LM)().getToken() || "error";
                        T.value = n
                    }))
                }

                function k(n) {
                    var t = function () {
                        var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                            a = c().getStorageSync("invitationId"), s = e.activitySource || c().getStorageSync("aId"),
                            m = e.sourceType || c().getStorageSync("sId"), w = e.channel || (0, f.Zi)().getChannel(),
                            Z = (0, f.Zi)().getParentInfo(), k = (0, f.Zi)().getModUcKey(), C = (0, f.Zi)().getKyKey(),
                            S = null !== (t = e.salesInfo) && void 0 !== t && t.salesId ? e.salesInfo : (0, f.Zi)().getSalesInfo(),
                            E = (0, p.Hy)(), L = {
                                appId: d.AF,
                                loginType: d.Ez,
                                loginAccount: (0, f.LM)().getOpenId(),
                                channel: w,
                                code: i,
                                encryptedData: n.encryptedData,
                                iv: n.iv || "",
                                signature: e.signature,
                                rawData: e.rawData
                            };
                        a && (L.parentId = a), m && (L.sourceType = m), s && (L.activitySource = s), Z && (L.parentInfo = Z), k && (L.modUcKey = k), C && (L.kyKey = C), null != S && S.salesId && Object.assign(L, (0, u.Z)({}, S)), E.adType === p.oT.hongshu && Object.assign(L, {
                            clickId: E.click_id,
                            clickSource: "1"
                        }), (0, l.MM)((0, u.Z)({}, L)).then(function () {
                            var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                                var o, u, i, a, s;
                                return (0, r.Z)().wrap((function (n) {
                                    for (; ;) switch (n.prev = n.next) {
                                        case 0:
                                            if (o = t.data, u = o.code, i = o.data, a = o.msg, s = o.errorDesc, 200 !== u) {
                                                n.next = 17;
                                                break
                                            }
                                            return e.hasAddVip = !0, (0, f.LM)().setHandleType(i.handleType), (0, f.LM)().setToken(i.token), (0, f.LM)().setLogout(!1), i.openId && (0, f.LM)().setOpenId(i.openId), n.next = 9, I(e.isWalkIn);
                                        case 9:
                                            if (n.sent) {
                                                n.next = 11;
                                                break
                                            }
                                            return n.abrupt("return");
                                        case 11:
                                            _(1), y && b(i.hotelId, i.activateMessage), (0, p.lH)({
                                                query: {
                                                    channel: w,
                                                    parentInfo: Z
                                                }, path: (0, v.Sh)(), scene: 0
                                            }, "register"), (0, h.er)(), n.next = 18;
                                            break;
                                        case 17:
                                            g && c().showToast({
                                                title: a || s || "注册失败",
                                                icon: "none",
                                                duration: 2e3
                                            });
                                        case 18:
                                        case"end":
                                            return n.stop()
                                    }
                                }), n)
                            })));
                            return function (t) {
                                return n.apply(this, arguments)
                            }
                        }()).catch((function () {
                            T.value = "error", g && c().showToast({title: "注册失败", icon: "none", duration: 2e3})
                        }))
                    };
                    (0, f.LM)().getOpenId() ? t() : c().login({
                        success: function (n) {
                            n.code && t(n.code)
                        }, fail: function () {
                            T.value = "error"
                        }
                    })
                }

                return (0, s.YP)(T, (function () {
                    n && n(T.value), i.eventCenter.trigger("loginStatus", T.value)
                })), {wxLogin: w, vipLoginV2: Z, getVipInfo: _, addVipInfo: k}
            };

        function I(n) {
            return T.apply(this, arguments)
        }

        function T() {
            return (T = (0, o.Z)((0, r.Z)().mark((function n(t) {
                var e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            if (!t) {
                                n.next = 10;
                                break
                            }
                            return n.next = 3, (0, l.c$)();
                        case 3:
                            if (e = n.sent, e.isEmployee) {
                                n.next = 9;
                                break
                            }
                            return c().showToast({
                                title: "该账号暂无代客下单权限",
                                icon: "none",
                                duration: 2e3
                            }), (0, f.LM)().removeToken(), n.abrupt("return", !1);
                        case 9:
                            c().setStorageSync(m.GV.WALK_IN, !0);
                        case 10:
                            return n.abrupt("return", !0);
                        case 11:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })))).apply(this, arguments)
        }

        function b(n, t) {
            if (n) var e = setTimeout((function () {
                g.R5.to("/modules/hotel/views/hotelInfo/HotelInfo?id=".concat(n, "&toastMsg=").concat(t)), clearTimeout(e)
            }), 500)
        }
    }, 51309: function (n, t, e) {
        e.d(t, {
            H: function () {
                return i
            }
        });
        var r = e(67777), o = e(91287), u = e(41530), i = function () {
            var n = (0, u.iH)(!1), t = function () {
                return (0, r.zI)().then((function (t) {
                    n.value = !(null == t || !t.isMorning) && (0, o.F5)() && new Date(1e3 * Number(t.currentTime)).setHours(0, 0, 0, 0) === (new Date).setHours(0, 0, 0, 0)
                }))
            }, e = function (t) {
                n.value = t
            };
            return function () {
                return t(), {isZeroTime: n, updateIsZeroTime: t, setIsZeroTime: e}
            }
        }()
    }, 88951: function (n, t, e) {
        e.d(t, {
            x: function () {
                return s
            }
        });
        var r = e(41530), o = e(98526), u = (0, r.iH)(!1), i = (0, r.iH)(""), c = function (n) {
            return new Promise((function (t) {
                (0, o.d)(n).then((function (n) {
                    if (200 === n.data.code && n.data.data) {
                        var e = n.data.data, r = e.information, o = void 0 === r ? "" : r, c = e.isDisplay,
                            a = void 0 === c ? 0 : c;
                        return i.value = o, u.value = !!a, void t(!!a && o)
                    }
                    t(!1)
                })).catch((function () {
                    t(!1)
                }))
            }))
        }, a = function () {
            return new Promise((function (n) {
                (0, o.d)({isHome: 1, riskPunishRuleCode: 1}).then((function (t) {
                    if (200 === t.data.code && t.data.data) return i.value = t.data.data.information || "", u.value = !!t.data.data.isDisplay, void (u.value ? n(i.value) : n(!1));
                    n(!1)
                })).catch((function () {
                    n(!1)
                }))
            }))
        }, s = function () {
            return {checkRiskControlHome: a, checkMemberIsRiskControl: c, isDisplay: u, information: i}
        }
    }, 82273: function (n, t, e) {
        e.d(t, {
            k: function () {
                return c
            }
        });
        var r = e(31121), o = e.n(r), u = e(27560), i = e(25648), c = function (n) {
            "weixin" === n.linkType ? a(n) : "h5" === n.linkType && o().navigateTo({url: "/modules/webview/views/H5Link?src=".concat(encodeURIComponent(n.link))})
        }, a = function (n) {
            var t, e, r = (0, i.eg)(n.linkAppId),
                c = null !== (t = n.link) && void 0 !== t && t.includes("|") ? (null === (e = n.link) || void 0 === e || null === (e = e.split("|")) || void 0 === e ? void 0 : e[1]) || "" : n.link;
            r && (0, i.pt)(r, c), r || "酒店小程序" !== n.linkAppId || (u.e_.includes(c) ? o().switchTab({url: c}) : o().navigateTo({url: c}))
        }
    }, 23179: function (n, t, e) {
        e.d(t, {
            Vh: function () {
                return u
            }, kH: function () {
                return i
            }, ES: function () {
                return c
            }, SL: function () {
                return a
            }, wQ: function () {
                return s
            }, tL: function () {
                return f
            }, bs: function () {
                return d
            }, IB: function () {
                return l
            }, V5: function () {
                return p
            }
        });
        var r = e(43461), o = e(27560);

        function u(n) {
            return r.Z.post("".concat(o.FH, "/bdw-cms/cateCard/cateCardActive"), {fromOrderNo: n}).then((function (n) {
                return n.data
            }))
        }

        function i(n) {
            var t = n.magicId, e = n.voucherNo, u = n.pageNo, i = n.pageSize;
            return r.Z.post("".concat(o.FH, "/bdw-cms/magic_goods/goodsSecondList"), {
                magicId: t,
                voucherNo: e
            }, {header: {pageNum: u, pageSize: i}}).then((function (n) {
                if (200 === n.data.code) return n.data.data
            }))
        }

        function c(n) {
            var t = n.magicId, e = n.voucherNo, u = n.userLongitude, i = n.userLatitude,
                c = n.needApplicableHotelInfo, a = n.orderMainNo, s = n.orderInfoNo, f = n.fromScene;
            return r.Z.post("".concat(o.FH, "/bdw-cms/magic_goods/goodDetail"), {
                magicId: t,
                voucherNo: e,
                userLongitude: u,
                userLatitude: i,
                needApplicableHotelInfo: c,
                channelType: 1,
                orderMainNo: a,
                orderInfoNo: s,
                fromScene: f
            })
        }

        function a(n) {
            var t = n.voucherNum, e = n.orderMainNo, u = n.orderInfoNo;
            return r.Z.post("".concat(o.FH, "/cms/voucher/bookLiveInVipMagic"), {
                voucherNum: t,
                orderMainNo: e,
                orderInfoNo: u,
                channelType: 1
            })
        }

        function s(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "1";
            return r.Z.get("".concat(o.FH, "/bdw-cms/magic_goods/gift_received"), {
                voucherNo: n,
                source: t
            }).then((function (n) {
                return n.data
            }))
        }

        function f(n) {
            return r.Z.get("".concat(o.FH, "/cms/magic_goods/get/userId"), {voucherNo: n}).then((function (n) {
                return n.data
            }))
        }

        function d(n) {
            return r.Z.get("".concat(o.FH, "/cms/magic_goods/gift_giving"), {voucherNo: n}).then((function (n) {
                return n.data
            }))
        }

        function l(n) {
            return r.Z.post("".concat(o.FH, "/cms/exchange/magic/code"), {code: n}).then((function (n) {
                return n.data
            }))
        }

        function p(n) {
            var t = n.pageNum, e = n.pageSize, u = n.orderId;
            return r.Z.post("".concat(o.FH, "/base/app/order/mall/findCouponsByOrderId"), {orderId: u}, {
                header: {
                    pageNum: t,
                    pageSize: e
                }
            }).then((function (n) {
                if (200 === n.data.code) return n.data.data
            }))
        }
    }, 53134: function (n, t, e) {
        e.d(t, {
            lP: function () {
                return d
            }, R5: function () {
                return p
            }
        });
        var r = e(8235), o = e(31121), u = e.n(o), i = e(9200), c = e.n(i), a = e(18030), s = e(27560),
            f = e(73061), d = function (n, t) {
                var e = ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "未知日期"],
                    r = new Date(Number(n[0])).setHours(0, 0, 0, 0), o = new Date(Number(n[1])).setHours(0, 0, 0, 0),
                    u = parseInt("".concat((o - r) / 864e5), 10), i = new Date, c = new Date(r), a = new Date(o),
                    s = i.getMonth(), f = c.getMonth(), d = a.getMonth(), l = i.getDate(), p = c.getDate(),
                    v = a.getDate(), h = c.getDay(), m = a.getDay(), g = "";
                g = f === s && p === l ? "今天" : e[h];
                var y = "";
                return y = d === s && v - l == 1 ? "明天" : e[m], "week" === t && (g = e[h], y = e[m]), {
                    count: u,
                    inTip: g,
                    outTip: y
                }
            }, l = {
                to: "navigateTo",
                back: "navigateBack",
                redirect: "redirectTo",
                reLaunch: "reLaunch",
                switchTab: "switchTab",
                preload: "preloadPage"
            }, p = {
                handleRestDate: d, to: function n(t) {
                    var e, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "to", i = (0, a.LM)(),
                        c = i.state, d = i.setProtocolCallback;
                    c.showProtocolTips && s.e_.includes((0, f.Sh)()) ? d(n.bind(null, t, o)) : ("object" === (0, r.Z)(t) ? e = t : "back" === t ? (o = "back", e = {delta: -1}) : e = "back" === o ? {delta: t} : {
                        url: t,
                        fail: function () {
                            u()[l.redirect]({url: t})
                        }
                    }, u()[l[o]](e))
                }, globalGoBack: function () {
                    1 === u().getCurrentPages().length ? u().reLaunch({url: "/modules/main/views/bookHotel/BookHotel"}) : u().navigateBack({delta: 1})
                }, day: c()
            };
        t.ZP = {
            install: function (n) {
                Object.keys(p).forEach((function (t) {
                    n.config.globalProperties["$".concat(t)] = p[t]
                }))
            }
        }
    }, 43461: function (n, t, e) {
        e.d(t, {
            Z: function () {
                return _
            }
        });
        var r = e(96949), o = e(52050), u = e(1273), i = e(35759), c = e(1902), a = e(27560), s = e(31121),
            f = e.n(s), d = Symbol("config"), l = Symbol("isCompleteURL"), p = Symbol("requestBefore"),
            v = Symbol("requestAfter"), h = function () {
                function n() {
                    (0, u.Z)(this, n), (0, c.Z)(this, d, {
                        url: "",
                        header: {
                            "content-type": "application/json",
                            Channel: "bdw",
                            AppVersion: a.Ji,
                            BusinessType: 1,
                            AppType: 2
                        },
                        method: "GET",
                        dataType: "json",
                        responseType: "text"
                    }), (0, c.Z)(this, "interceptors", {
                        request: function (t) {
                            n[p] = t || function (n) {
                                return n
                            }
                        }, response: function (t) {
                            n[v] = t || function (n) {
                                return n
                            }
                        }
                    })
                }

                return (0, i.Z)(n, [{
                    key: "request", value: function (n) {
                        function t(t) {
                            return n.apply(this, arguments)
                        }

                        return t.toString = function () {
                            return n.toString()
                        }, t
                    }((function (t) {
                        var e = t.baseURL || a.FH;
                        return t.url = n[l](t.url) ? t.url : e + t.url, t.method = t.method || this[d].method, t.dataType = t.dataType || this[d].dataType, t.header = (0, r.Z)((0, r.Z)({}, t.header), this[d].header), t = (0, r.Z)((0, r.Z)({}, t), n[p](t)), new Promise((function (e, r) {
                            t.success = function (t) {
                                e(n[v](t))
                            }, t.fail = function (t) {
                                r(n[v](t))
                            }, f().request(t)
                        }))
                    }))
                }, {
                    key: "get", value: function (n) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        return this.request((0, r.Z)((0, r.Z)({}, e), {}, {url: n, data: t, method: "GET"}))
                    }
                }, {
                    key: "post", value: function (n) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        return this.request((0, r.Z)((0, r.Z)({}, e), {}, {url: n, data: t, method: "POST"}))
                    }
                }, {
                    key: "put", value: function (n) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        return this.request((0, r.Z)((0, r.Z)({}, e), {}, {url: n, data: t, method: "PUT"}))
                    }
                }, {
                    key: "delete", value: function (n) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        return this.request((0, r.Z)((0, r.Z)({}, e), {}, {url: n, data: t, method: "DELETE"}))
                    }
                }, {
                    key: "getConfig", value: function () {
                        return this[d]
                    }
                }, {
                    key: "setConfig", value: function (n) {
                        this[d] = n(this[d])
                    }
                }], [{
                    key: p, value: function (n) {
                        return n
                    }
                }, {
                    key: v, value: function (n) {
                        return n
                    }
                }, {
                    key: l, value: function (n) {
                        return /(http|https):\/\/([\w.]+\/?)\S*/.test(n)
                    }
                }]), n
            }(), m = e(60779), g = e(18030), y = e(2935), I = e(95501), T = function (n) {
                return n.weapp = "5", n.alipay = "8", n
            }(T || {}), b = null, w = new h;

        function Z(n, t) {
            var e, u = (0, g.LM)().getToken(),
                i = (null === (e = (0, g.LM)().state) || void 0 === e ? void 0 : e.openId) || f().getStorageSync("openId"),
                c = b || (b = function () {
                    var n, t;
                    return (null === (n = f().getDeviceInfo) || void 0 === n ? void 0 : n.call(f())) || (null === (t = f().getSystemInfoSync) || void 0 === t ? void 0 : t.call(f())) || {}
                }()), a = c.brand, s = c.model, d = c.system, l = (0, m.uJ)(i);
            u && (n.Authorization = "Bearer " + u, n.type = o.v.hotel);
            var p = n = (0, r.Z)((0, r.Z)({}, n), {}, {
                    MessageId: l,
                    ClientType: T.weapp,
                    OsVersion: d || "IOS 15.0.2",
                    DeviceManufacture: a || "IPHONE",
                    DeviceModel: s || "IPhone X"
                }), v = p.OsVersion, h = p.DeviceManufacture, y = p.DeviceModel, I = p.ClientType, w = p.AppVersion,
                Z = p.Channel, _ = p.MessageId, k = p.Authorization;
            return n.Timestamp = Date.now(), n.Signature = (0, m.o$)(n.Timestamp, v, h, y, I, w, Z, _, k, encodeURIComponent(t.split("betterwood.com")[1].split("?")[0])), n
        }

        w.interceptors.request((function (n) {
            return n.header = Z(n.header, n.url), n
        })), w.interceptors.response((function (n) {
            var t, e;
            if (403 === (null == n || null === (t = n.data) || void 0 === t ? void 0 : t.code)) {
                (0, y.q)(), n.data.msg = "登录已过期，请重新登录";
                var r = (0, g.LM)(), o = r.state, u = r.setLockLogin;
                !o.lockLogin && !o.ignore403 && (0, I.a)((function () {
                    u(!1)
                }), {showToast: !0}).wxLogin(!0), u(!0)
            }
            return 1 === (null == n || null === (e = n.data) || void 0 === e ? void 0 : e.code) && (n.data.code = 200), n
        }));
        var _ = w
    }, 18030: function (n, t, e) {
        e.d(t, {
            MR: function () {
                return R
            }, BQ: function () {
                return Z
            }, _k: function () {
                return T
            }, ce: function () {
                return d
            }, GS: function () {
                return D
            }, M2: function () {
                return h
            }, CN: function () {
                return s
            }, ok: function () {
                return S
            }, xF: function () {
                return b.x
            }, fc: function () {
                return m.f
            }, aR: function () {
                return v
            }, Zi: function () {
                return N
            }, HP: function () {
                return g
            }, BZ: function () {
                return w
            }, m2: function () {
                return f.m
            }, Rq: function () {
                return L
            }, cY: function () {
                return I
            }, LM: function () {
                return y.L
            }, Bf: function () {
                return E
            }
        });
        var r = e(55924), o = e(41530), u = e(67777), i = e(91287), c = e(60779), a = {1: "active"},
            s = (0, r.Q_)("holiday", (function () {
                var n = (0, o.iH)({}), t = (0, o.iH)({}), e = {}, r = {}, s = function () {
                    (0, u.HK)().then((function (o) {
                        var u;
                        null == o || null === (u = o.data) || void 0 === u || null === (u = u.data) || void 0 === u || u.forEach((function (n) {
                            e[n.date] = n.paperwork, r[n.date] = a[n.status]
                        })), n.value = e, t.value = r
                    }))
                };
                return s(), {
                    contextHeight: [],
                    holidayMap: n,
                    initHoliday: s,
                    restMap: t,
                    initDate: function (n, t) {
                        var e = [], r = n.year, o = n.month, u = t.year, a = t.month - o + 1;
                        u - r > 0 && (a += 12 * (u - r)), a <= 0 && (a = 1);
                        for (var s = i.ZP.getAllMonthDaysList(r); a > 1;) {
                            var f = i.ZP.getMonthPreDay(r, o) % 7, d = s[o],
                                l = (0, c.uV)(108 * Math.ceil((f + d) / 7) + 20 + 78), p = {
                                    pre: f,
                                    daysNum: d,
                                    year: r,
                                    month: o,
                                    curHeight: l,
                                    curTotalHeight: 0 === e.length ? l : l + e[e.length - 1].curTotalHeight,
                                    preTotalHeight: 0 === e.length ? 0 : e[e.length - 1].curTotalHeight
                                };
                            e.push(p), 0 === (o %= 12) ? (o = 1, r += 1, s = i.ZP.getAllMonthDaysList(r)) : o++, a--
                        }
                        var v = i.ZP.getMonthPreDay(r, o) % 7, h = s[o],
                            m = (0, c.uV)(108 * Math.ceil((v + h) / 7) + 20 + 78), g = {
                                pre: v,
                                daysNum: h,
                                year: r,
                                month: o,
                                curHeight: m,
                                curTotalHeight: 0 === e.length ? m : m + e[e.length - 1].curTotalHeight,
                                preTotalHeight: 0 === e.length ? 0 : e[e.length - 1].curTotalHeight
                            };
                        return e.push(g), e
                    }
                }
            })), f = e(69782), d = (0, r.Q_)("city", (function () {
                var n = (0, o.qj)({
                    city: "请开启定位",
                    cities: [],
                    couponCities: [],
                    hotCities: [],
                    myAddress: "",
                    reacquirePosition: !1
                });
                return {
                    cityInfo: n, setCouponCities: function (t) {
                        n.couponCities = t
                    }, setCity: function (t) {
                        n.city = t
                    }, setCities: function (t) {
                        n.cities = t
                    }, setHotCities: function (t) {
                        n.hotCities = t
                    }, setMyAddress: function (t) {
                        n.myAddress = t
                    }, setReacquirePosition: function (t) {
                        n.reacquirePosition = t
                    }
                }
            })), l = e(31121), p = e.n(l), v = (0, r.Q_)("list", (function () {
                var n = (0, o.qj)({
                    date: [(new Date).setHours(0, 0, 0, 0), (new Date).setHours(0, 0, 0, 0) + 864e5],
                    city: "国内/国际",
                    keyWord: "",
                    searchBarKeyword: "",
                    brands: [],
                    couponBrands: [],
                    coupon: null,
                    searchType: "搜索框",
                    searchHistory: p().getStorageSync("searchHistory") || [],
                    landMarkCoordinate: {lat: 0, lng: 0}
                }), t = function (t) {
                    n.date = t
                };
                return {
                    state: n, setDate: t, setCoordinate: function (t) {
                        n.landMarkCoordinate = t
                    }, setSearchBarKeyword: function (t) {
                        n.searchBarKeyword = t
                    }, setSearchHistory: function (t) {
                        n.searchHistory = t
                    }, setSearchType: function (t) {
                        n.searchType = t
                    }, setCouponBrands: function (t) {
                        n.couponBrands = t
                    }, setBrands: function (t) {
                        n.brands = t
                    }, setKeyWord: function (t) {
                        n.keyWord = t
                    }, setCoupon: function (t) {
                        n.coupon = t
                    }, setCity: function (t) {
                        n.city = t
                    }, initDate: function () {
                        t([(new Date).setHours(0, 0, 0, 0), (new Date).setHours(0, 0, 0, 0) + 864e5])
                    }
                }
            })), h = (0, r.Q_)("edit", (function () {
                var n = (0, o.iH)([]);
                return {
                    date: n, setDate: function (t) {
                        n.value = t
                    }
                }
            })), m = e(75577), g = (0, r.Q_)("service", (function () {
                var n = (0, o.qj)({
                    roomId: "",
                    hotelId: "",
                    hotelName: "",
                    startTime: "",
                    continueRoom: null,
                    oldOrderInfo: null,
                    couponInfo: null
                });
                return {
                    state: n, setRoomId: function (t) {
                        n.roomId = t
                    }, setHotelId: function (t) {
                        n.hotelId = t
                    }, setStartTime: function (t) {
                        n.startTime = t
                    }, setContinueRoom: function (t) {
                        n.continueRoom = t
                    }, setOldOrderInfo: function (t) {
                        n.oldOrderInfo = t
                    }, setCouponInfo: function (t) {
                        n.couponInfo = t
                    }, setHotelName: function (t) {
                        n.hotelName = t
                    }
                }
            })), y = e(51185), I = (0, r.Q_)("upload", (function () {
                function n(n) {
                    return (0, l.getStorageSync)("".concat(n, "-oss")) || null
                }

                function t(n) {
                    return (0, l.getStorageSync)("".concat(n, "-cos")) || null
                }

                return {
                    setOssKey: function (n, t) {
                        (0, l.setStorageSync)("".concat(n, "-oss"), t)
                    }, getOssKey: n, isOssKeyValid: function (t) {
                        var e = n(t), r = e && Number(e.expiration) > Date.now() + 3e4;
                        return r || (0, l.removeStorageSync)("".concat(t, "-oss")), r
                    }, setCosKey: function (n, t) {
                        (0, l.setStorageSync)("".concat(n, "-cos"), t)
                    }, getCosKey: t, isCosKeyValid: function (n) {
                        var e = t(n), r = e && Number(e.expiredTime) > Date.now() + 3e4;
                        return r || (0, l.removeStorageSync)("".concat(n, "-cos")), r
                    }
                }
            })), T = (0, r.Q_)("circle", (function () {
                var n = (0, o.qj)({
                    circleList: null,
                    brandShareImageUrl: "",
                    closeGuide: !1,
                    placeholderText: "快留下你的评论~"
                });
                return {
                    state: n, setCircleList: function (t) {
                        n.circleList = t
                    }, setBrandShareImageUrl: function (t) {
                        n.brandShareImageUrl = t
                    }, setCloseGuide: function (t) {
                        n.closeGuide = t
                    }, setPlaceholderText: function (t) {
                        n.placeholderText = t
                    }
                }
            })), b = e(64546), w = (0, r.Q_)("subscriber", (function () {
                var n = (0, o.iH)({});
                return {
                    setTemplateIds: function (t) {
                        t.forEach((function (t) {
                            n.value[t.locationType] = t.templateIds
                        }))
                    }, getTemplateIds: function (t) {
                        return n.value[t] || []
                    }
                }
            })), Z = ((0, r.Q_)("officialAccount", (function () {
                var n = (0, o.qj)({officialAccountCountDown: 0});
                return {
                    state: n, setOfficialAccountCountDown: function (t) {
                        n.officialAccountCountDown = t;
                        var e = setInterval((function () {
                            n.officialAccountCountDown--, n.officialAccountCountDown <= 0 && clearInterval(e)
                        }), 1e3)
                    }
                }
            })), (0, r.Q_)("AddCard", (function () {
                var n = (0, o.qj)({
                    bestDefaultCardId: "",
                    bestDefaultrRductionAmount: 0,
                    couponCount: 0,
                    isChangeCoupon: !1,
                    voucherTemplateId: ""
                });
                return {
                    state: n, setState: function (t) {
                        Object.assign(n, JSON.parse(JSON.stringify(t)))
                    }, resetCardInfo: function () {
                        n.bestDefaultCardId = "", n.bestDefaultrRductionAmount = 0, n.voucherTemplateId = ""
                    }
                }
            }))), _ = e(12663), k = e(13283), C = e(34724), S = (0, r.Q_)("HomeStore", (function () {
                var n = (0, o.iH)([]), t = (0, o.iH)([{name: "国内/国际", link: ""}]), e = (0, o.iH)([]),
                    r = (0, o.iH)([]), u = (0, o.iH)([]), i = function () {
                        var n = (0, k.Z)((0, _.Z)().mark((function n() {
                            var t, e, r, o;
                            return (0, _.Z)().wrap((function (n) {
                                for (; ;) switch (n.prev = n.next) {
                                    case 0:
                                        return n.next = 2, (0, C.USZ)();
                                    case 2:
                                        t = n.sent, e = t.data, r = e.code, o = e.data, 200 === r && a(o);
                                    case 7:
                                    case"end":
                                        return n.stop()
                                }
                            }), n)
                        })));
                        return function () {
                            return n.apply(this, arguments)
                        }
                    }(), c = function () {
                        var n = (0, k.Z)((0, _.Z)().mark((function n() {
                            var t, e, r, o, u;
                            return (0, _.Z)().wrap((function (n) {
                                for (; ;) switch (n.prev = n.next) {
                                    case 0:
                                        return t = {
                                            application: 2,
                                            platform: 5,
                                            type: C.UzJ.HOME_BANNERS
                                        }, n.next = 3, (0, C.RXT)(t);
                                    case 3:
                                        e = n.sent, r = e.data, o = r.code, u = r.data, 200 === o && s(u.banner);
                                    case 8:
                                    case"end":
                                        return n.stop()
                                }
                            }), n)
                        })));
                        return function () {
                            return n.apply(this, arguments)
                        }
                    }(), a = function (r) {
                        n.value = r.searchBoxInfo.searchBackgroundVoList, r.searchBoxInfo.searchDescriptionVoList.length && (t.value = r.searchBoxInfo.searchDescriptionVoList), e.value = r.searchBoxInfo.landingPageDescriptionVoList, u.value = r.destinationBoxInfo.recommendAreaList
                    }, s = function (n) {
                        r.value = n
                    };
                return {
                    searchBackgroundVoList: n,
                    searchDescriptionVoList: t,
                    landingPageDescriptionVoList: e,
                    midBannerList: r,
                    recommendAreaList: u,
                    fetchHomeResourceList: i,
                    updateResourceList: a,
                    updateMidBannerList: s,
                    fetchResource: c
                }
            })), E = (0, r.Q_)("video", (function () {
                var n = (0, o.iH)(!0), t = function (t) {
                    n.value = t
                };
                return {
                    muted: n, toggleMuted: function () {
                        t(!n.value)
                    }, setMuted: t
                }
            })), L = (0, r.Q_)("tabbar", (function () {
                var n = (0, o.iH)(!0), t = (0, o.iH)(!1), e = (0, o.iH)(!1);
                return {
                    isOpen: n, showExpirationTips: e, hasTabbar: t, setIsOpen: function (t) {
                        n.value = t
                    }, setShowExpirationTips: function (n) {
                        e.value = n
                    }, setHasTabbar: function (n) {
                        return new Promise((function (e, r) {
                            n ? p().showTabBar({
                                success: function (r) {
                                    t.value = n, e(r)
                                }, fail: function (n) {
                                    r(n)
                                }
                            }) : p().hideTabBar({
                                success: function (r) {
                                    t.value = n, e(r)
                                }, fail: function (n) {
                                    r(n)
                                }
                            })
                        }))
                    }
                }
            })), D = (0, r.Q_)("customerService", (function () {
                var n = (0, o.XI)(), t = function (t) {
                    n.value = t
                }, e = function () {
                    var n = (0, k.Z)((0, _.Z)().mark((function n() {
                        var e, r;
                        return (0, _.Z)().wrap((function (n) {
                            for (; ;) switch (n.prev = n.next) {
                                case 0:
                                    return n.next = 2, (0, C.yIk)();
                                case 2:
                                    200 === (e = n.sent).data.code && t(null === (r = e.data) || void 0 === r ? void 0 : r.data);
                                case 4:
                                case"end":
                                    return n.stop()
                            }
                        }), n)
                    })));
                    return function () {
                        return n.apply(this, arguments)
                    }
                }();
                return e(), {state: n, init: e}
            })), H = e(27560), N = (0, r.Q_)("member", (function () {
                var n = "channel", t = "parentInfo", e = "kyKey", r = "modUcKey", u = "scancode_time", i = "sourceType",
                    c = (0, o.Um)({channel: H.iB}), a = function (n, t) {
                        c[n] = t, p().setStorage({key: n, data: t})
                    }, s = function (n) {
                        return c[n] || p().getStorageSync(n)
                    };
                return {
                    state: c, setParentInfo: function (n) {
                        return a(t, n)
                    }, setChannel: function (t) {
                        return a(n, t)
                    }, setKyKey: function (n) {
                        return a(e, n)
                    }, setModUcKey: function (n) {
                        return a(r, n)
                    }, setSalesInfo: function (n) {
                        c.salesId = n.salesId || "", c.eventType = n.eventType || "", c.eventId = n.eventId || ""
                    }, getChannel: function () {
                        return s(n) || H.iB
                    }, getParentInfo: function () {
                        return s(t)
                    }, getKyKey: function () {
                        return s(e)
                    }, getModUcKey: function () {
                        return s(r)
                    }, getSalesInfo: function () {
                        return {salesId: c.salesId || "", eventType: c.eventType || "", eventId: c.eventId || ""}
                    }, setScanCodeTime: function (n) {
                        return a(u, n)
                    }, getScanCodeTime: function () {
                        return s(u)
                    }, setSourceType: function (n) {
                        return a(i, n)
                    }, getSourceType: function () {
                        return s(i)
                    }
                }
            })), R = (0, r.WB)()
    }, 64546: function (n, t, e) {
        e.d(t, {
            x: function () {
                return i
            }
        });
        var r = e(1902), o = e(55924), u = e(41530), i = (0, o.Q_)("hotel", (function () {
            var n = (0, u.qj)({
                hotelId: "",
                canRefresh: !0,
                hotelTelephone: "",
                showTabbar: !0,
                orderId: "",
                isValidCard: !0,
                hotelShowShare: !1,
                isMyRoom: !1,
                liftCode: "",
                couponInfo: null,
                selectUser: null,
                orderInfo: null,
                holidayList: null,
                isHotelFilterChanged: !1,
                isHotelFilterByList: !1,
                backSource: "",
                hotelFilters: [],
                calendarType: "range",
                selectedFilters: [],
                detailFilters: [],
                queryFilterParams: {
                    checkInTypeList: [],
                    roomTypeCodeList: [],
                    bedTypeList: [],
                    activityTypeList: []
                }
            }), t = function () {
                n.queryFilterParams = {
                    checkInTypeList: [],
                    roomTypeCodeList: [],
                    bedTypeList: [],
                    activityTypeList: []
                }
            };
            return {
                state: n, setHotelPhone: function (t) {
                    n.hotelTelephone = t
                }, setHotelId: function (t) {
                    n.hotelId = t
                }, setCanRefresh: function (t) {
                    n.canRefresh = t
                }, setTabbar: function (t) {
                    if (t) var e = setTimeout((function () {
                        clearTimeout(e), n.showTabbar = t
                    }), 100); else n.showTabbar = !1
                }, setOrderId: function (t) {
                    n.orderId = t
                }, setValidCard: function (t) {
                    n.isValidCard = t
                }, setSelectUser: function (t) {
                    n.selectUser = t
                }, setOrderInfo: function (t) {
                    n.orderInfo = t
                }, setHolidayList: function (t) {
                    n.holidayList = t
                }, setShareLog: function (t) {
                    n.hotelShowShare = t
                }, setLiftCode: function (t) {
                    n.liftCode = t
                }, setIsMyRoom: function (t) {
                    n.isMyRoom = t
                }, setState: function (t, e) {
                    Object.assign(n, (0, r.Z)({}, t, JSON.parse(JSON.stringify(e))))
                }, getQueryFilterParams: function (n, t) {
                    var e = {checkInTypeList: [], roomTypeCodeList: [], bedTypeList: [], activityTypeList: []};
                    return n.forEach((function (n) {
                        n.categoryValues.forEach((function (r) {
                            t.forEach((function (t) {
                                if (r.id === t.id) switch (n.id) {
                                    case 1:
                                        e.checkInTypeList.push(r.id);
                                        break;
                                    case 2:
                                        e.roomTypeCodeList.push(r.id);
                                        break;
                                    case 3:
                                        e.bedTypeList.push(r.id);
                                        break;
                                    case 4:
                                        e.activityTypeList.push(r.id)
                                }
                            }))
                        }))
                    })), e
                }, resetQueryFilterParams: t, setFilterParamsOnRoomList: function (t) {
                    var e = {checkInTypeList: [], roomTypeCodeList: [], bedTypeList: [], activityTypeList: []};
                    t.forEach((function (n) {
                        switch (n.detailLabelType) {
                            case 1:
                                e.checkInTypeList.push(n.detailLabelCode);
                                break;
                            case 2:
                                e.roomTypeCodeList.push(n.detailLabelCode);
                                break;
                            case 3:
                                e.bedTypeList.push(n.detailLabelCode);
                                break;
                            case 4:
                                e.activityTypeList.push(n.detailLabelCode)
                        }
                    }));
                    var r = t.map((function (n) {
                        return {id: n.detailLabelCode, showInDetail: 1, subCategoryName: n.desc}
                    }));
                    n.queryFilterParams = e, n.selectedFilters = r, n.isHotelFilterByList = !0
                }, setHourRoomFilterParams: function (t) {
                    if (t) {
                        var e = n.queryFilterParams;
                        e.checkInTypeList.includes("hour_room") || (e.checkInTypeList.push("hour_room"), n.queryFilterParams = e)
                    }
                }, resetFiltersState: function () {
                    n.isHotelFilterChanged = !1, n.backSource = "", n.selectedFilters = [], t()
                }
            }
        }))
    }, 75577: function (n, t, e) {
        e.d(t, {
            f: function () {
                return u
            }
        });
        var r = e(55924), o = e(41530), u = (0, r.Q_)("independent", (function () {
            var n = (0, o.iH)([]);
            return {
                date: n, setDate: function (t) {
                    n.value = t
                }
            }
        }))
    }, 87360: function (n, t, e) {
        e.d(t, {
            S: function () {
                return u
            }
        });
        var r = e(55924), o = e(41530), u = (0, r.Q_)("officialAccount", (function () {
            var n = (0, o.qj)({jumpParams: null});
            return {
                state: n, setJumpParams: function (t) {
                    n.jumpParams = t
                }, clearJumpParams: function () {
                    n.jumpParams = null
                }
            }
        }))
    }, 69782: function (n, t, e) {
        e.d(t, {
            m: function () {
                return c
            }
        });
        var r = e(31121), o = e.n(r), u = e(55924), i = e(41530), c = (0, u.Q_)("system", (function () {
            var n, t = (0, i.iH)({statusBar: 0, titleBarHeight: 0, customBar: 0, pageContentTop: 0}),
                e = (0, i.iH)({brand: "", model: "", system: "", platform: ""}), r = (0, i.iH)({
                    screenWidth: 0,
                    screenHeight: 0,
                    windowWidth: 0,
                    windowHeight: 0,
                    statusBarHeight: 0
                }), u = (0, i.iH)(20), c = (0, i.iH)(260), a = (0, i.iH)(0), s = (0, i.iH)(""), f = function () {
                    var t;
                    return n || (n = (null === (t = o().getSystemInfoSync) || void 0 === t ? void 0 : t.call(o())) || {})
                }, d = function () {
                    var n, e, u = o().getMenuButtonBoundingClientRect(), i = u.top, c = u.height,
                        a = (null === (n = r.value) || void 0 === n ? void 0 : n.statusBarHeight) || ((null === (e = o().getWindowInfo) || void 0 === e ? void 0 : e.call(o())) || f()).statusBarHeight || 44,
                        s = 2 * (i - a) + c,
                        d = {statusBar: a, titleBarHeight: s, customBar: s + a, pageContentTop: i + c};
                    t.value = d
                }, l = function () {
                    var n, t = (null === (n = o().getDeviceInfo) || void 0 === n ? void 0 : n.call(o())) || f(),
                        r = {brand: t.brand, model: t.model, system: t.system, platform: t.platform};
                    e.value = r
                }, p = function () {
                    var n, t = (null === (n = o().getWindowInfo) || void 0 === n ? void 0 : n.call(o())) || f(), e = {
                        screenWidth: t.screenWidth,
                        screenHeight: t.screenHeight,
                        windowWidth: t.windowWidth,
                        windowHeight: t.windowHeight,
                        statusBarHeight: t.statusBarHeight || 44
                    };
                    r.value = e
                };
            if (null !== o() && void 0 !== o() && o().canIUse("getLeftButtonsBoundingClientRect")) {
                var v = o().getLeftButtonsBoundingClientRect().backButtonIcon;
                u.value = v.right
            }
            if (null !== o() && void 0 !== o() && o().canIUse("getMenuButtonBoundingClientRect")) {
                var h = o().getMenuButtonBoundingClientRect().optionMenuLeft;
                h && (c.value = h)
            }
            return {
                h5Link: s, setH5Link: function (n) {
                    s.value = n
                }, alipayBackIconRight: u, alipayMenuLeft: c, wechatMenuLeft: (a.value || function () {
                    var n = o().getMenuButtonBoundingClientRect(), t = n.right, e = n.width,
                        r = t && e ? t - e : 281;
                    a.value = r
                }(), a.value), titleBarInfo: function () {
                    var n = t.value, e = n.statusBar, r = n.customBar, o = n.titleBarHeight;
                    return e && r && o || d(), t.value
                }(), getWindowInfo: function () {
                    var n = r.value, t = n.screenWidth, e = n.screenHeight, o = n.windowWidth, u = n.windowHeight;
                    return t && e && o && u || p(), r.value
                }, getDeviceInfo: function () {
                    var n = e.value, t = n.brand, r = n.platform, o = n.model, u = n.system;
                    return t && r && o && u || l(), e.value
                }
            }
        }))
    }, 51185: function (n, t, e) {
        e.d(t, {
            L: function () {
                return f
            }
        });
        var r = e(12663), o = e(13283), u = e(31121), i = e.n(u), c = e(55924), a = e(41530), s = e(34724),
            f = (0, c.Q_)("user", (function () {
                var n = (0, a.qj)({
                    idCardVerify: 0,
                    isNewMember: 0,
                    memberType: 0,
                    canUseTime: 0,
                    openId: "",
                    token: "",
                    handleType: 0,
                    currentLevel: 1,
                    timeValue: 0,
                    lockLogin: !1,
                    showExpirationTips: !1,
                    logout: !1,
                    showProtocolTips: !1,
                    protocolCallback: null,
                    agreeVoList: [],
                    ignore403: !1,
                    popCardData: {},
                    userName: "",
                    magicNum: 0,
                    magicCategory: 0,
                    hasIdCardVerify: !1,
                    couponNumber: 0,
                    couponCategory: 0,
                    memberLevel: 0,
                    memberLevelName: "",
                    remainTimeValue: ""
                }), t = function () {
                    return n.openId || i().getStorageSync("openId")
                }, e = function () {
                    return n.token || i().getStorageSync("token")
                }, u = function () {
                    var t = (0, o.Z)((0, r.Z)().mark((function t() {
                        var e, o, u, i;
                        return (0, r.Z)().wrap((function (t) {
                            for (; ;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, (0, s.yQp)();
                                case 2:
                                    e = t.sent, o = e.data, u = o.code, i = o.data, 200 === u && i && (n.userName = i.userName, n.magicNum = i.magicNum, n.remainTimeValue = i.remainTimeValue, n.timeValue = Number(i.remainTimeValue), n.hasIdCardVerify = i.hasIdCardVerify, n.couponNumber = i.couponNumber, n.couponCategory = i.couponCategory, n.memberLevel = i.memberLevel, n.memberLevelName = i.memberLevelName);
                                case 7:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    })));
                    return function () {
                        return t.apply(this, arguments)
                    }
                }();
                return {
                    state: n, setRealNameMark: function (t) {
                        n.idCardVerify = t
                    }, setCanUseTime: function (t) {
                        n.canUseTime = t
                    }, setUserNew: function (t) {
                        n.isNewMember = t
                    }, setMemberType: function (t) {
                        n.memberType = t
                    }, setOpenId: function (t) {
                        n.openId = t, i().setStorage({key: "openId", data: t})
                    }, removeOpenId: function () {
                        t() && (n.openId = "", i().removeStorageSync("openId"))
                    }, setToken: function (t) {
                        n.token = t, i().setStorage({key: "token", data: t})
                    }, removeToken: function () {
                        e() && (n.token = "", i().removeStorageSync("token"))
                    }, setHandleType: function (t) {
                        n.handleType = t
                    }, getOpenId: t, getToken: e, setCurrentLevel: function (t) {
                        n.currentLevel = t
                    }, setTimeValue: function (t) {
                        n.timeValue = t
                    }, setLockLogin: function (t) {
                        n.lockLogin = t
                    }, setLogout: function (t) {
                        n.logout = t
                    }, getLogout: function () {
                        return n.logout
                    }, setProtocolTips: function (t) {
                        n.showProtocolTips = t
                    }, setAgreeVoList: function (t) {
                        n.agreeVoList = t
                    }, setProtocolCallback: function (t) {
                        n.protocolCallback = t
                    }, setIgnore403: function (t) {
                        n.ignore403 = t
                    }, setPopCardInfo: function (t) {
                        n.popCardData = t
                    }, fetchUserInfo: u
                }
            }))
    }, 4281: function (n, t, e) {
        e.d(t, {
            V: function () {
                return p
            }, l: function () {
                return d
            }
        });
        var r, o = e(12663), u = e(13283), i = e(96949), c = e(31121), a = e.n(c);

        function s() {
            var n = a().getSystemInfoSync(), t = n.platform, e = n.system, r = t.toLowerCase(),
                o = /[0-9.]*$/.exec(e), u = o ? o[0] : "", i = "ios" === r && !!u && function (n, t) {
                    var e = n.split("."), r = t.split("."), o = Math.max(e.length, r.length);
                    for (; e.length < o;) e.push("0");
                    for (; r.length < o;) r.push("0");
                    for (var u = 0; u < o; u++) {
                        var i = parseInt(e[u], 10), c = parseInt(r[u], 10);
                        if (i > c) return 1;
                        if (i < c) return -1
                    }
                    return 0
                }(u, "14.0") >= 0;
            if (e.includes("HarmonyOS")) return !0;
            var c = "windows" === r || /windows/i.test(e), s = "mac" === r || "macos" === r || /mac\s*os/i.test(e);
            return "devtools" === r || "android" === r || i || (c || s || "pc" === r)
        }

        var f = {quality: 90, width: 750};

        function d(n, t) {
            return !n || "" === n || n.includes("null") ? "https://img.betterwood.com/minapp/common/default/bdw_home.png" : n = function (n, t) {
                if (n.includes("data:image/png;base64,")) return n;
                if (!n.includes("?")) {
                    var e = t ? (0, i.Z)((0, i.Z)({}, f), t) : f, o = "";
                    null != e && e.width && null != e && e.height ? o = "/thumbnail/!".concat(null == e ? void 0 : e.width, "x").concat(null == e ? void 0 : e.height, ">") : null != e && e.width ? o = "/thumbnail/".concat(null == e ? void 0 : e.width, "x") : null != e && e.height && (o = "/thumbnail/x".concat(null == e ? void 0 : e.height)), n.includes(".gif") ? n += "?imageMogr2".concat(o) : n += "?imageMogr2/quality/".concat(e.quality).concat(o, "/format/").concat(r.isSupportWebp ? "webp" : "jpg"), n += "/ignore-error/1"
                }
                return n
            }(n = function (n) {
                return n.includes("http://") && (n = n.replace("http://", "https://")), n
            }(n = function (n) {
                return n.includes("upload.shands.cn") && ((n = n.replace("upload.shands.cn", "img.betterwood.com")).includes("https") || (n = n.replace("http", "https"))), n
            }(n = function (n) {
                return n.includes("oss.kaiyuanhotels.com") && ((n = n.replace("oss.kaiyuanhotels.com", "img.betterwood.com")).includes("https") || (n = n.replace("http", "https"))), n
            }(n))), t)
        }

        function l() {
            return (l = (0, u.Z)((0, o.Z)().mark((function n() {
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            (r = a()).isSupportWebp = s();
                        case 2:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })))).apply(this, arguments)
        }

        var p = {
            init: function () {
                return l.apply(this, arguments)
            }, tinyUrl: d, setQuality: function (n) {
                f.quality = n
            }
        }
    }, 32197: function (n, t, e) {
        e.d(t, {
            oT: function () {
                return f
            }, oB: function () {
                return D
            }, l8: function () {
                return L
            }, rC: function () {
                return E
            }, Hy: function () {
                return d
            }, MH: function () {
                return p
            }, G3: function () {
                return v
            }, Qq: function () {
                return _
            }, Bn: function () {
                return k
            }, w1: function () {
                return Z
            }, jl: function () {
                return l
            }, Yb: function () {
                return H
            }
        });
        var r = e(96949), o = e(31121), u = e.n(o), i = e(5679), c = e(18030), a = e(3420), s = e(43461),
            f = function (n) {
                return n.douyin = "douyin", n.baidu = "baidu", n.weixin = "weixin", n.hongshu = "hongshu", n
            }({}), d = function () {
                var n = u().getEnterOptionsSync(), t = n.query, e = n.referrerInfo, r = n.scene, o = t.gdt_vid,
                    c = void 0 === o ? "" : o, a = t.qz_gdt, s = void 0 === a ? "" : a, d = t.bd_vid,
                    l = void 0 === d ? "" : d, p = t.clue_token, v = void 0 === p ? "" : p, h = t.weixinadinfo,
                    m = void 0 === h ? "" : h, g = t.click_id, y = void 0 === g ? "" : g, I = "";
                return (0, i.SI)(c || s) && (I = f.weixin), (0, i.SI)(l) && (I = f.baidu), (0, i.SI)(y) && (I = f.hongshu), (0, i.SI)(v) && (I = f.douyin), {
                    adType: I,
                    weixinadinfo: m,
                    extra_appId: (null == e ? void 0 : e.appId) || "",
                    scene: r,
                    gdt_vid: c,
                    qz_gdt: s,
                    bd_vid: l,
                    clue_token: v,
                    click_id: y
                }
            }, l = function () {
                var n = setTimeout((function () {
                    var t = d();
                    t.adType && (u().TrackSDK.track("openMiniByAd", (0, r.Z)((0, r.Z)({}, t), {}, {openid: (0, c.LM)().state.openId})), t.adType === f.baidu && (0, a.reportEnterMini)(), t.adType === f.hongshu && ((0, c.Zi)().setSalesInfo({
                        salesId: "XHSBDW",
                        eventType: "124",
                        eventId: ""
                    }), function (n) {
                        s.Z.post("/bdw-auth/wechat/visit", {clickId: n, clickSource: "1"})
                    }(t.click_id)), clearTimeout(n))
                }), 300)
            }, p = function (n, t, e, r) {
                if (t * e <= r) return n.reduce((function (n, e) {
                    return n + e.price * t
                }), 0);
                var o = Math.floor(r / e), u = r % e;
                return (o ? n.reduce((function (n, t) {
                    return n + t.price * o
                }), 0) : 0) + (u ? n.reduce((function (n, t, e) {
                    return e <= u - 1 ? n + t.price : n
                }), 0) : 0)
            }, v = function (n) {
                var t = [];
                return null == n || n.forEach((function (n) {
                    var e = {};
                    n.priceFinalAndCountList.forEach((function (n) {
                        e[n.originPrice] ? e[n.originPrice].count += +n.count : e[n.originPrice] = n
                    })), Object.values(e).forEach((function (e) {
                        t.push((0, r.Z)({date: n.date}, e))
                    }))
                })), t
            }, h = e(12663), m = e(13283), g = e(34724), y = e(31627), I = e(9200), T = e.n(I),
            b = function (n, t, e, r) {
                var o, u = e.find((function (t) {
                    return t.roomTypeId === n.roomTypeId
                }));
                return n.priceItemList.length >= 2 ? !u || (null == u ? void 0 : u.isFold) : (null === (o = n.priceItemList) || void 0 === o ? void 0 : o[0].length) > 1 ? u ? null == u ? void 0 : u.isFold : !!t : "hotelInfo" !== r && 0 !== t
            }, w = function (n) {
                var t, e, r;
                if (n.priceItemList.length < 2) return (null === (r = n.priceItemList) || void 0 === r ? void 0 : r[0].length) > 1;
                var o = null === (t = n.priceRightsItemList) || void 0 === t || null === (t = t[0]) || void 0 === t ? void 0 : t.minPriceItem;
                return !(0, y.kV)(o).chto && !(0, y.KQ)(null == o ? void 0 : o.minStock, null == o ? void 0 : o.unavailableType).isFull && (null === (e = n.priceItemList) || void 0 === e ? void 0 : e[0].length) > 1
            }, Z = function (n) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                    e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
                    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "hotelInfo",
                    o = n.map((function (n, o) {
                        var u, i,
                            c = null === (u = n.priceRightsItemList) || void 0 === u ? void 0 : u.map((function (n) {
                                return n.priceItemList
                            }));
                        n.priceItemList = c || [], n.isFold || (n.isFold = b(n, o, t, r)), n.minPriceItem.productCode += "&_&".concat((null === (i = n.minPriceItem) || void 0 === i || null === (i = i.rightsVo) || void 0 === i ? void 0 : i.rightsId) || "");
                        var a = !0, s = !1, f = !1;
                        return n.priceItemList.forEach((function (t, r) {
                            var o, u, i, c = (null === (o = e.find((function (t) {
                                return t.index === n.roomTypeId + r
                            }))) || void 0 === o ? void 0 : o.isShow) || !r && w(n);
                            t.isShow = c, null != n && null !== (u = n.priceRightsItemList) && void 0 !== u && null !== (u = u[r]) && void 0 !== u && u.minPriceItem && (n.priceRightsItemList[r].minPriceItem.productCode += "&_&".concat((null === (i = n.priceRightsItemList[r]) || void 0 === i || null === (i = i.minPriceItem) || void 0 === i || null === (i = i.rightsVo) || void 0 === i ? void 0 : i.rightsId) || "")), t.forEach((function (n) {
                                var t;
                                n.productCode += "&_&".concat((null == n || null === (t = n.rightsVo) || void 0 === t ? void 0 : t.rightsId) || ""), n.minStock <= 0 || (a = !1), 1 === n.activeType && (s = !0), 2 === n.activeType && (f = !0)
                            }))
                        })), n.isFull = a, n._isActiveType = s, n._isHouseCoupon = f, n
                    }));
                return o
            }, _ = function () {
                var n = (0, m.Z)((0, h.Z)().mark((function n(t) {
                    var e, r, o, i, c, a, s, f, d, l, p, v;
                    return (0, h.Z)().wrap((function (n) {
                        for (; ;) switch (n.prev = n.next) {
                            case 0:
                                return o = [], i = "", c = "", t.defaultFoldStatus || (t.defaultFoldStatus = []), t.rightsFoldStatus || (t.rightsFoldStatus = []), n.next = 7, k({
                                    id: t.hotelId,
                                    dateStart: T()(t.date[0]).format("YYYY-MM-DD"),
                                    dateEnd: T()(t.date[1]).format("YYYY-MM-DD"),
                                    hourRoomType: t.leaseType,
                                    isWalkIn: !1,
                                    coupon: null,
                                    sourceOrderNo: t.sourceOrderNo,
                                    isModify: t.isModify,
                                    sourceType: t.sourceType,
                                    checkInTypeList: t.leaseType ? ["hour_room"] : [],
                                    roomTypeCodeList: [],
                                    bedTypeList: [],
                                    activityTypeList: []
                                }).finally((function () {
                                    u().hideLoading({noConflict: !0})
                                }));
                            case 7:
                                if (a = n.sent, s = a.data, f = s.code, d = s.data, l = s.msg, p = s.errorDesc, v = s.errorCode, 200 === f && d) {
                                    n.next = 15;
                                    break
                                }
                                return o = [], i = "", c = "", (l || p || v) && ("HOT-HOT-0141" === v ? u().reLaunch({url: "/modules/main/views/service/Service?hotelId=".concat(t.hotelId)}) : u().showToast({
                                    title: l || p,
                                    icon: "none",
                                    duration: 2e3
                                })), n.abrupt("return", {
                                    roomList: o,
                                    hotelCancelReserveReason: i,
                                    occupationReason: c
                                });
                            case 15:
                                if (i = d.cancelReserveReason || "", c = (null === (e = d.hotelInfo) || void 0 === e ? void 0 : e.occupationReason) || "", null !== (r = d.hotelRoomTypeItemList) && void 0 !== r && r.length) {
                                    n.next = 20;
                                    break
                                }
                                return o = [], n.abrupt("return", {
                                    roomList: o,
                                    hotelCancelReserveReason: i,
                                    occupationReason: c
                                });
                            case 20:
                                return o = Z(d.hotelRoomTypeItemList, t.defaultFoldStatus, t.rightsFoldStatus, "codeCheckIn"), n.abrupt("return", {
                                    roomList: o,
                                    hotelCancelReserveReason: i,
                                    occupationReason: c
                                });
                            case 22:
                            case"end":
                                return n.stop()
                        }
                    }), n)
                })));
                return function (t) {
                    return n.apply(this, arguments)
                }
            }(), k = function (n) {
                var t = {
                    hotelId: n.id,
                    hotelCode: n.hotelCode,
                    dateStart: n.dateStart,
                    dateEnd: n.dateEnd,
                    hourRoomType: n.hourRoomType,
                    checkInTypeList: n.checkInTypeList,
                    roomTypeCodeList: n.roomTypeCodeList,
                    bedTypeList: n.bedTypeList,
                    activityTypeList: n.activityTypeList,
                    ifReserveEts: 0,
                    couponId: "",
                    isModify: 0,
                    channelType: 1,
                    rightsId: ""
                };
                return n.coupon && (t.couponId = n.coupon.couponId, n.coupon.isRights ? (t.ifReserveEts = 2, t.rightsId = n.coupon.rightsId) : t.ifReserveEts = 1), t.isGetBestEts = 1, n.sourceOrderNo && (t.sourceOrderNo = n.sourceOrderNo), void 0 !== n.isModify && (t.isModify = n.isModify), n.sourceType && (t.sourceType = n.sourceType), t.hotelCode || delete t.hotelCode, (0, g.X9w)(t)
            }, C = (e(25762), e(51309)), S = e(60779), E = function (n, t) {
                var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], o = !0,
                    i = n.validatyRule ? n.validatyRule.split(",") : ["1", "2", "3", "4", "5", "6", "7"],
                    a = n.reserveValidatyRule ? n.reserveValidatyRule.split(",") : ["1", "2", "3", "4", "5", "6", "7"],
                    s = new Date, f = s.setHours(0, 0, 0, 0),
                    d = n.useStartTime ? new Date(n.useStartTime).setHours(0, 0, 0, 0) : 0,
                    l = n.useEndTime ? new Date(n.useEndTime).setHours(0, 0, 0, 0) : 0,
                    p = n.validComeStartDate ? new Date(n.validComeStartDate).setHours(0, 0, 0, 0) : 0,
                    v = n.validOldEndDate ? new Date(n.validOldEndDate).setHours(0, 0, 0, 0) : 0, h = 864e5,
                    m = f - ((0, C.H)().isZeroTime.value ? h : 0), g = [p, v + h];
                if ((f < d || f > l) && !n.isOnline) return u().showToast({
                    title: "该法宝不在使用日期内",
                    icon: "none"
                });
                g[0] = Math.max(m, g[0]), g[1] = Math.max(m + h, g[1]);
                var y = [g[0], g[0] + h], I = s.getDay() || 7, T = new Date(y[0]).getDay() || 7;
                if ((a || i) && (a.includes(T + "") && i.includes(I + "") || (o = !1)), n.thresholdNight && n.thresholdNight > 1) {
                    y[1] = y[0] + h * n.thresholdNight;
                    for (var b = 1; b <= n.thresholdNight - 1; b++) {
                        var w = new Date(y[0] + h * b).getDay() || 7;
                        (a || i) && (a.includes(w + "") && i.includes(w + "") || (o = !1))
                    }
                }
                var Z = (0, c.aR)(), _ = Z.setDate, k = Z.setCoupon, S = Z.setKeyWord;
                _(y), k((0, r.Z)((0, r.Z)({}, n), {}, {
                    canUse: o,
                    isOnline: n.isOnline,
                    id: n.id,
                    couponName: n.couponName,
                    couponType: n.couponType,
                    discountNum: n.discountNum,
                    reductionAmount: n.reductionAmount,
                    scenesType: n.scenesType,
                    sourceType: n.sourceType,
                    dateArr: g,
                    reserveValidatyRule: a,
                    validatyRule: i,
                    couponId: n.couponId,
                    thresholdHour: n.thresholdHour,
                    thresholdMoney: n.thresholdMoney,
                    thresholdNight: n.thresholdNight,
                    thresholdPerson: n.thresholdPerson,
                    thresholdNone: n.thresholdNone,
                    thresholdRoomNum: n.thresholdRoomNum,
                    highestDiscount: n.highestDiscount,
                    isRights: 1 === n.ifInterest,
                    isNormalCoupon: 0 === n.ifInterest,
                    normalCouponId: 0 === n.ifInterest ? n.couponId : "",
                    rightsId: 1 === n.ifInterest ? n.couponId : ""
                })), S(""), e || u().navigateTo({url: "/modules/hotel/views/hotel-list/HotelList"})
            }, L = function (n) {
                var t, e,
                    r = 1 !== (null == n || null === (t = n.applicableCardIds) || void 0 === t ? void 0 : t.length) ? "/#/catering-card-v3" : "#/catering-card-v3?cardId=".concat(null === (e = n.applicableCardIds) || void 0 === e ? void 0 : e[0]);
                r += "".concat(r.includes("?") ? "&" : "?", "voucherNum=").concat(n.id), (0, S.C4)(r, r.startsWith("https"))
            }, D = function (n) {
                var t = n.scenesType, e = n.thresholdPerson, r = n.thresholdMoney, o = n.thresholdHour;
                return "1" === t && o && o > 0 ? "满".concat(o, "小时可用") : "2" === t && e && e > 0 ? "满".concat(e, "人可用") : ["3", "4", "5", "6", "7"].includes(t) && r && r > 0 ? "满".concat((0, S.kJ)(r), "元可用") : "无门槛"
            }, H = function (n) {
                if (!n || 1 === n.resType) return "";
                var t = n.resNum, e = void 0 === t ? 0 : t, r = n.resCycleType, o = void 0 === r ? 0 : r,
                    u = n.resSurplusNum, i = void 0 === u ? 0 : u, c = n.resCycleNum, a = void 0 === c ? 0 : c;
                return e > 0 && 3 === o ? "待使用".concat(i, "次 | 每天限").concat(a, "次") : e > 0 && 2 === o ? "待使用".concat(i, "次 | 每餐次限").concat(a, "次") : e > 0 && 1 === o ? "待使用".concat(i || 0, "次") : 0 === e && 3 === o ? "不限次数 ｜ 每天限".concat(a || 0, "次") : 0 === e && 2 === o ? "不限次数 ｜ 每餐次限".concat(a || 0, "次") : 0 === e && 1 === o ? "不限次数" : ""
            }
    }, 25762: function (n, t, e) {
        e.d(t, {
            IO: function () {
                return i
            }, FT: function () {
                return c
            }
        });
        var r = e(31121), o = e.n(r), u = e(2324), i = function (n) {
            n && n.eventType === u.FR.outSideLink && o().setStorageSync("actSalesParams", {
                data: {
                    actSalesId: n.salesId || "",
                    actId: n.actId || "",
                    actIdentity: n.actIdentity || ""
                }, expireTime: (new Date).getTime() + 864e5
            })
        }, c = function () {
            var n = o().getStorageSync("actSalesParams");
            if (n) {
                var t = n.expireTime, e = n.data, r = (new Date).getTime();
                if (t && r <= Number(t)) return e;
                o().removeStorageSync("actSalesParams")
            }
        }
    }, 2935: function (n, t, e) {
        e.d(t, {
            q: function () {
                return i
            }, y: function () {
                return c
            }
        });
        var r = e(18030), o = e(31121), u = e.n(o), i = function () {
            (0, (0, r.LM)().removeToken)(), u().removeStorageSync("userInfo")
        }, c = function () {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2e3;
            (0, r.LM)().setLockLogin(!0);
            var t = setTimeout((function () {
                (0, r.LM)().setLockLogin(!1), clearTimeout(t)
            }), n)
        }
    }, 91287: function (n, t, e) {
        e.d(t, {
            Dm: function () {
                return f
            }, CX: function () {
                return d
            }, Qu: function () {
                return l
            }, F5: function () {
                return p
            }, Ju: function () {
                return v
            }, F1: function () {
                return h
            }
        });
        var r = e(9200), o = e.n(r), u = e(57558), i = e.n(u), c = e(17120), a = e.n(c);
        o().extend(i()), o().extend(a());
        var s = {
            isLeapYear: function (n) {
                return n % 4 == 0 && n % 100 != 0 || n % 400 == 0
            }, getMonthPreDay: function (n, t) {
                var e = new Date(n + "/" + t + "/01").getDay();
                return 0 === e && (e = 7), e
            }, getAllMonthDaysList: function (n) {
                return [0, 31, this.isLeapYear(Number(n)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }, getMonthDays: function (n, t) {
                return /^0/.test(t) && (t = t.split("")[1]), s.getAllMonthDaysList(n)[t]
            }, getNumTwoBit: function (n) {
                return ((n = Number(n)) > 9 ? "" : "0") + n
            }, date2Str: function (n, t) {
                return t = t || "-", [n.getFullYear(), this.getNumTwoBit(n.getMonth() + 1), this.getNumTwoBit(n.getDate())].join(t)
            }, getDay: function (n) {
                n = n || 0;
                var t = new Date, e = 864e5 * n;
                return t = new Date(t.getTime() + e), this.date2Str(t)
            }, isEqual: function (n, t) {
                return new Date(n).getTime() === new Date(t).getTime()
            }, diff: function (n, t) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "[)",
                    r = o()(t).diff(n, "day");
                return "[)" === e ? r : "()" === e ? r - 1 : r + 1
            }, getRemainingTime: function (n) {
                var t = Math.floor(n / 1e3 % 60).toString(), e = Math.floor(n / 6e4 % 60).toString(),
                    r = Math.floor(n / 36e5 % 24).toString();
                return {days: Math.floor(n / 864e5).toString(), hours: r, minutes: e, seconds: t}
            }
        };
        t.ZP = s;
        var f = ["日", "一", "二", "三", "四", "五", "六"], d = function (n) {
            var t = (new Date).setHours(0, 0, 0, 0);
            return t - n > 0 ? t : n
        }, l = function (n) {
            return (new Date).setHours(0, 0, 0, 0) - n > 0
        }, p = function () {
            return (new Date).setHours(0, 0, 0, 0) <= Date.now() && (new Date).setHours(6, 0, 0, 0) >= Date.now()
        }, v = function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY-MM-DD";
            return o()(n || Date.now()).format(t)
        };

        function h(n, t) {
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "MM月DD日";
            if (!n) return "";
            if (!t) return o()(n).format(e);
            var r = null == t ? void 0 : t.match(/^UTC([+-])(\d{1,2})(?::(\d{2}))?$/i);
            if (!r) throw new Error("Invalid timezone offset format: ".concat(t));
            var u = "+" === r[1] ? 1 : -1, i = parseInt(r[2], 10), c = r[3] ? parseInt(r[3], 10) : 0,
                a = u * (60 * i + c), s = o()(n).tz("Asia/Shanghai");
            return s.utcOffset(a).format(e)
        }
    }, 5679: function (n, t, e) {
        e.d(t, {
            oT: function () {
                return c.oT
            }, oB: function () {
                return c.oB
            }, Hy: function () {
                return c.Hy
            }, MH: function () {
                return c.MH
            }, G3: function () {
                return c.G3
            }, Qq: function () {
                return c.Qq
            }, jl: function () {
                return c.jl
            }, Yb: function () {
                return c.Yb
            }, ME: function () {
                return a
            }, SI: function () {
                return s
            }, lH: function () {
                return f
            }, dW: function () {
                return d
            }, Bf: function () {
                return l
            }
        });
        var r = e(31121), o = e.n(r), u = e(60779), i = e(27560), c = e(32197), a = function (n) {
            var t = n.data, e = n.on, u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return o().navigateTo({
                url: "/modules/hotel-utils/views/add-remark/index?isScript=".concat(u),
                success: function () {
                    r.eventCenter.once("getRemark", e), setTimeout((function () {
                        r.eventCenter.trigger("toInitRemark", t)
                    }), 500)
                }
            })
        }, s = function (n) {
            return !!n && "string" == typeof n && "undefined" !== n && "null" !== n
        }, f = function (n, t) {
            var e = (null == n ? void 0 : n.query) || {}, r = e.parentInfo, u = void 0 === r ? "" : r,
                i = e.channel, c = void 0 === i ? "" : i;
            (c || u) && o().TrackSDK.track("trackChannel", {
                path: (null == n ? void 0 : n.path) || "",
                channel: c,
                parentInfo: u,
                scene: (null == n ? void 0 : n.scene) || "",
                source: t
            })
        }, d = function (n) {
            var t, e, r = null !== (t = n.query) && void 0 !== t && t.h5Link ? n.query.h5Link : "";
            if (null !== (e = n.query) && void 0 !== e && e.scene) {
                var o, c, a = (0, u.zh)(n.query.scene);
                "rightCard" === (null == a ? void 0 : a.type) && (r = "".concat(i.Ch, "/#/catering-card-v3?cardId=").concat(null !== (o = a.cId) && void 0 !== o ? o : "", "&inviteId=").concat(null !== (c = a.iId) && void 0 !== c ? c : "")), (0, u.XI)(r)
            }
        }, l = function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
                e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e3, r = Date.now();
            return new Promise((function (o, u) {
                !function i() {
                    n.exec((function (n) {
                        var c = n[0];
                        Date.now() - r > e ? u(new Error("query time out")) : null === c || Array.isArray(c) && 0 === c.length ? setTimeout(i, t) : o(c)
                    }))
                }()
            }))
        }
    }, 2324: function (n, t, e) {
        e.d(t, {
            FR: function () {
                return c
            }, Hc: function () {
                return a
            }, H4: function () {
                return f
            }
        });
        var r = e(18030), o = e(73061), u = e(31121), i = e.n(u),
            c = {videoStore: "122", outSideLink: "107", scanCode: "130"}, a = function (n) {
                var t = s(n).salesInfo;
                return (0, o.jp)((function () {
                    i().showToast({title: "登录已过期，请重新登录", icon: "none", duration: 2e3})
                }), "?salesId=".concat(t.salesId, "&eventId=").concat(t.eventId, "&eventType=").concat(t.eventType)), !0
            };

        function s(n) {
            var t = n.query || {}, e = n.path || "";
            return "10032" === t.situation && (t.eventType = c.videoStore, (0, r.Zi)().setChannel("H-002-01")), {
                salesInfo: {
                    salesId: t.salesId || "",
                    eventId: t.eventId || "",
                    eventType: t.eventType || ""
                }, path: e
            }
        }

        function f(n) {
            var t = s(n), e = t.salesInfo, o = t.path;
            return !![c.outSideLink, c.videoStore].includes(e.eventType) && !!e.salesId && ((0, r.Zi)().setSalesInfo(e), e.eventType !== c.outSideLink || !o.includes("modules/webview/views/H5Link"))
        }
    }, 89958: function (n, t, e) {
        e.d(t, {
            Dr: function () {
                return v
            }, kO: function () {
                return p
            }, eJ: function () {
                return l
            }, ux: function () {
                return h
            }, sB: function () {
                return T
            }
        });
        var r = e(12663), o = e(13283), u = e(34724), i = {}, c = {}, a = function (n) {
                delete c[n], delete i[n]
            }, s = function (n, t) {
                return i[n] ? (t(i[n]), setTimeout((function () {
                    a(n)
                }), 0)) : c[n] = t, Object.keys(i).includes(n)
            }, f = function (n, t) {
                i[n] = null, t().then((function (t) {
                    var e, r = (null == t ? void 0 : t.data) || t;
                    (function (n, t) {
                        i[n] = t
                    })(n, r), c[n] && (null === (e = c[n]) || void 0 === e || e.call(c, r), a(n))
                }))
            }, d = function () {
                var n = {application: 2, platform: 5, type: u.UzJ.HOME_BANNERS};
                return (0, u.RXT)(n)
            }, l = function () {
                var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                    var e, o;
                    return (0, r.Z)().wrap((function (n) {
                        for (; ;) switch (n.prev = n.next) {
                            case 0:
                                if (!(e = s("getResource", t))) {
                                    n.next = 3;
                                    break
                                }
                                return n.abrupt("return", e);
                            case 3:
                                return n.next = 5, d();
                            case 5:
                                return o = n.sent, t(null == o ? void 0 : o.data), n.abrupt("return", !1);
                            case 8:
                            case"end":
                                return n.stop()
                        }
                    }), n)
                })));
                return function (t) {
                    return n.apply(this, arguments)
                }
            }(), p = function () {
                var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                    var e, o;
                    return (0, r.Z)().wrap((function (n) {
                        for (; ;) switch (n.prev = n.next) {
                            case 0:
                                if (!(e = s("getHotelBrandList", t))) {
                                    n.next = 3;
                                    break
                                }
                                return n.abrupt("return", e);
                            case 3:
                                return n.next = 5, (0, u.y$5)();
                            case 5:
                                return o = n.sent, t(o), n.abrupt("return", !1);
                            case 8:
                            case"end":
                                return n.stop()
                        }
                    }), n)
                })));
                return function (t) {
                    return n.apply(this, arguments)
                }
            }(), v = function () {
                var n = (0, o.Z)((0, r.Z)().mark((function n(t) {
                    var e, o;
                    return (0, r.Z)().wrap((function (n) {
                        for (; ;) switch (n.prev = n.next) {
                            case 0:
                                if (!(e = s("getHomeResourceList", t))) {
                                    n.next = 3;
                                    break
                                }
                                return n.abrupt("return", e);
                            case 3:
                                return n.next = 5, (0, u.USZ)();
                            case 5:
                                return o = n.sent, t(null == o ? void 0 : o.data), n.abrupt("return", !1);
                            case 8:
                            case"end":
                                return n.stop()
                        }
                    }), n)
                })));
                return function (t) {
                    return n.apply(this, arguments)
                }
            }(), h = function (n) {
                var t = n.path, e = n.query;
                "modules/main/views/bookHotel/BookHotel" !== t || e.h5Link || (f("getHomeResourceList", u.USZ), f("getHotelBrandList", u.y$5))
            }, m = e(27560), g = e(31121), y = e.n(g),
            I = ["".concat(m.Um, "/member/V3/member_bg_v4_level_1.png?imageMogr2/quality/100/format/webp/ignore-error/1"), "".concat(m.Um, "/member/V3/member_bg_v4_level_2.png?imageMogr2/quality/100/format/webp/ignore-error/1"), "".concat(m.Um, "/member/V3/member_bg_v4_level_3.png?imageMogr2/quality/100/format/webp/ignore-error/1"), "".concat(m.Um, "/member/V3/member_bg_v4_level_4.png?imageMogr2/quality/100/format/webp/ignore-error/1"), "".concat(m.Um, "/member/V3/member_bg_v4_level_5.png?imageMogr2/quality/100/format/webp/ignore-error/1")],
            T = function () {
                setTimeout((function () {
                    var n = I.map((function (n) {
                        return {src: n, type: "image"}
                    }));
                    y().preloadAssets({
                        data: n, success: function () {
                        }, fail: function (n) {
                        }, complete: function () {
                        }
                    })
                }), 800)
            }
    }, 31627: function (n, t, e) {
        e.d(t, {
            jb: function () {
                return o
            }, tz: function () {
                return u
            }, Kr: function () {
                return i
            }, OB: function () {
                return c
            }, t: function () {
                return a
            }, kV: function () {
                return s
            }, KQ: function () {
                return f
            }
        });
        var r = e(52050), o = function (n, t) {
            return t ? (n ? n === t ? t : n + "-" + t : t) + "m²" : ""
        }, u = function (n) {
            return n ? "0" === n ? "无早餐" : "".concat(n, "份早餐") : "无早餐"
        }, i = function (n) {
            return n ? "0" !== n ? "房价包含早餐×".concat(n) : null : "无早餐"
        }, c = function (n) {
            return -1 === n ? "不限次" : n + "次"
        }, a = function (n, t) {
            return function (n) {
                return null === n || n <= 0
            }(n) || 2 === t
        }, s = function (n) {
            var t = {chto: !1, houseCoupon: !1, noActive: !1};
            switch (n) {
                case r.fb.chto:
                    t.chto = !0;
                    break;
                case r.fb.houseCoupon:
                    t.houseCoupon = !0;
                    break;
                default:
                    t.noActive = !0
            }
            return t
        }, f = function (n, t) {
            var e = {rights: !1, chto: !1, mini: !1, isFull: !1, isAvailable: !1};
            switch ((null === n || n <= 0) && (e.isFull = !0), t) {
                case r.Hj.chto:
                    e.chto = !0;
                    break;
                case r.Hj.rights:
                    e.rights = !0;
                    break;
                case r.Hj.mini:
                    e.mini = !0;
                    break;
                default:
                    e.isFull || (e.isAvailable = !0)
            }
            return e
        }
    }, 31352: function (n, t, e) {
        e.d(t, {
            b: function () {
                return c
            }, c: function () {
                return a
            }
        });
        var r = e(12663), o = e(13283), u = e(31121), i = e.n(u), c = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n() {
                var t, e, o, u, c, a = arguments;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return e = a.length > 0 && void 0 !== a[0] ? a[0] : "", o = a.length > 1 && void 0 !== a[1] ? a[1] : "国内/国际", n.next = 4, i().request({
                                url: "https://restapi.amap.com/v5/place/text?parameters",
                                method: "GET",
                                data: {
                                    key: "58ee0cfa37e237afc560f3f0ea3f7ef9",
                                    keywords: e,
                                    region: "国内/国际" === o ? "" : o
                                }
                            });
                        case 4:
                            return u = n.sent, c = (null === (t = u.data) || void 0 === t ? void 0 : t.pois) || [], n.abrupt("return", c.map((function (n) {
                                var t,
                                    e = (null === (t = n.location) || void 0 === t ? void 0 : t.split(",")) || [];
                                return {
                                    ad_info: {adcode: Number(n.adcode)},
                                    location: {lat: Number(e[1]), lng: Number(e[0])},
                                    title: n.name,
                                    addressList: ["".concat(n.cityname || "").concat(n.adname || "").concat(n.address)]
                                }
                            })));
                        case 7:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function () {
                return n.apply(this, arguments)
            }
        }(), a = function () {
            var n = (0, o.Z)((0, r.Z)().mark((function n(t, e) {
                var o, u, c, a, s, f, d;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return o = "", u = "", n.prev = 2, n.next = 5, i().request({
                                url: "https://restapi.amap.com/v3/geocode/regeo?parameters",
                                method: "GET",
                                data: {
                                    extensions: "all",
                                    key: "58ee0cfa37e237afc560f3f0ea3f7ef9",
                                    location: "".concat(Number(e).toFixed(6), ",").concat(Number(t).toFixed(6))
                                }
                            });
                        case 5:
                            f = n.sent, d = f.data, o = null != d && null !== (c = d.regeocode) && void 0 !== c && null !== (c = c.addressComponent) && void 0 !== c && null !== (c = c.city) && void 0 !== c && c.length ? null == d || null === (a = d.regeocode) || void 0 === a || null === (a = a.addressComponent) || void 0 === a ? void 0 : a.city : "", u = (null == d || null === (s = d.regeocode) || void 0 === s || null === (s = s.pois) || void 0 === s || null === (s = s[0]) || void 0 === s ? void 0 : s.name) || "", n.next = 13;
                            break;
                        case 11:
                            n.prev = 11, n.t0 = n.catch(2);
                        case 13:
                            return n.abrupt("return", {city: o, address: u});
                        case 14:
                        case"end":
                            return n.stop()
                    }
                }), n, null, [[2, 11]])
            })));
            return function (t, e) {
                return n.apply(this, arguments)
            }
        }()
    }, 73061: function (n, t, e) {
        e.d(t, {
            Ee: function () {
                return c
            }, jN: function () {
                return a
            }, Sh: function () {
                return s
            }, I9: function () {
                return f
            }, iI: function () {
                return d
            }, nn: function () {
                return l
            }, Fp: function () {
                return p
            }, WK: function () {
                return v
            }, yE: function () {
                return h
            }, jp: function () {
                return m
            }, Dv: function () {
                return g
            }
        });
        var r = e(31121), o = e.n(r), u = e(27560), i = e(60779), c = function () {
            u.Nc && my.setNavigationBar({frontColor: "#000000", backgroundColor: "#FFFFFF"})
        }, a = function () {
            var n, t = (null === (n = o().getCurrentPages) || void 0 === n ? void 0 : n.call(o())) || [],
                e = t[t.length - 1] || {};
            return e.options || e.$taroParams || {}
        }, s = function () {
            var n,
                t = null === (n = o().getCurrentInstance) || void 0 === n || null === (n = n.call(o())) || void 0 === n ? void 0 : n.page,
                e = (null == t ? void 0 : t.route) || (null == t ? void 0 : t.$taroPath) || "";
            return e.includes("?") ? e.split("?")[0] : e
        }, f = function () {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ["compressed"],
                e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ["album"];
            return new Promise((function (r, i) {
                u.Nc ? o().chooseImage({
                    count: n, sizeType: t, sourceType: e, success: function (n) {
                        r(n)
                    }, fail: function (n) {
                        i(n)
                    }
                }) : o().chooseMedia({
                    count: n,
                    mediaType: ["image"],
                    sourceType: e,
                    sizeType: t,
                    success: function (n) {
                        r(n)
                    },
                    fail: function (n) {
                        i(n)
                    }
                })
            }))
        }, d = function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            u.Nc ? my.previewImage({urls: n, current: t}) : o().previewMedia({sources: n, current: t})
        }, l = function () {
            o().switchTab({url: "/modules/main/views/mine/index"})
        }, p = function () {
            o().switchTab({url: "/modules/main/views/bookHotel/BookHotel"})
        }, v = function (n) {
            o().navigateTo({url: "/modules/hotel/views/hotelInfo/HotelInfo?id=".concat(n)})
        }, h = function () {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            o().navigateBack({delta: n}).catch((function () {
                return p()
            }))
        }, m = (0, i.Ds)((function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            "modules/main/views/login-page/index" !== s() && o().navigateTo({
                url: "/modules/main/views/login-page/index".concat(t),
                success: function () {
                    null == n || n()
                }
            })
        }), 500, !0), g = function () {
        }
    }, 37318: function (n, t, e) {
        e.d(t, {
            rV: function () {
                return d
            }, cH: function () {
                return p
            }
        });
        var r = e(12663), o = e(13283), u = e(31121), i = e.n(u), c = e(72473), a = e(18030);

        function s(n) {
            return f.apply(this, arguments)
        }

        function f() {
            return (f = (0, o.Z)((0, r.Z)().mark((function n(t) {
                var e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return e = (0, a.BZ)().getTemplateIds(t), n.abrupt("return", new Promise((function (n, t) {
                                e.length ? i().requestSubscribeMessage({
                                    tmplIds: e, success: function (t) {
                                        var e = [], r = [];
                                        return Object.keys(t).forEach((function (n) {
                                            "accept" === t[n] ? e.push(n) : "reject" === t[n] && r.push(n)
                                        })), n({accept: e, reject: r, errMsg: t.errMsg})
                                    }, fail: function (n) {
                                        return t(n)
                                    }
                                }) : n({accept: [], reject: [], errMsg: "ok"})
                            })));
                        case 2:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })))).apply(this, arguments)
        }

        function d(n) {
            return l.apply(this, arguments)
        }

        function l() {
            return (l = (0, o.Z)((0, r.Z)().mark((function n(t) {
                var e;
                return (0, r.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            n.next = 2;
                            break;
                        case 2:
                            if ((0, a.LM)().getToken()) {
                                n.next = 4;
                                break
                            }
                            return n.abrupt("return");
                        case 4:
                            return n.prev = 4, n.next = 7, s(t);
                        case 7:
                            (e = n.sent).accept.length && (0, c.X)({templateIds: e.accept}), n.next = 13;
                            break;
                        case 11:
                            n.prev = 11, n.t0 = n.catch(4);
                        case 13:
                        case"end":
                            return n.stop()
                    }
                }), n, null, [[4, 11]])
            })))).apply(this, arguments)
        }

        function p(n, t) {
            n && t && i().TrackSDK.track("templateId", {templateId_var: t, templateSource_var: n})
        }
    }, 25648: function (n, t, e) {
        e.d(t, {
            eg: function () {
                return i
            }, pt: function () {
                return a
            }, HN: function () {
                return s
            }
        });
        var r = e(52050), o = e(31121), u = e.n(o), i = function (n) {
            var t;
            switch (n) {
                case"剧本杀小程序":
                    t = 2;
                    break;
                case"百达星系悦选商城":
                    t = 5
            }
            return t
        }, c = [{
            name: "百达屋酒店",
            businessType: r._$.hotel,
            appId: "wx1b77d3569b2dd7fa",
            page: "/modules/main/views/bookHotel/BookHotel",
            envVersion: "release"
        }, {
            name: "悦选商城",
            businessType: r._$.yxStore,
            appId: "wx70d0e8823ee96ce9",
            page: "/pages/index/index",
            envVersion: "release"
        }, {
            name: "悦选商城",
            businessType: r._$.shop,
            appId: "wx70d0e8823ee96ce9",
            page: "/pages/index/index",
            envVersion: "release"
        }], a = function (n, t) {
            var e = c.find((function (t) {
                return t.businessType === n
            })), r = t || "".concat(e.page, "?from=hotel&").concat(e.params);
            u().navigateToMiniProgram({
                appId: e.appId, path: r, envVersion: e.envVersion, success: function (n) {
                }
            })
        };

        function s(n) {
            n = n.includes("?") ? "".concat(n, "&channelType=bdxx") : "".concat(n, "?channelType=bdxx"), a(r._$.yxStore, n)
        }
    }, 60779: function (n, t, e) {
        e.d(t, {
            Mn: function () {
                return p
            }, Jh: function () {
                return v
            }, Wf: function () {
                return h
            }, P2: function () {
                return m
            }, Ds: function () {
                return g
            }, tj: function () {
                return y
            }, Qk: function () {
                return I
            }, ZI: function () {
                return T
            }, zh: function () {
                return b
            }, Qo: function () {
                return w
            }, kJ: function () {
                return Z
            }, F_: function () {
                return _
            }, cn: function () {
                return k
            }, Vu: function () {
                return C
            }, S5: function () {
                return S
            }, cd: function () {
                return E
            }, Zw: function () {
                return L
            }, NX: function () {
                return H
            }, uJ: function () {
                return N
            }, o$: function () {
                return M
            }, nv: function () {
                return O
            }, YP: function () {
                return A
            }, y7: function () {
                return P
            }, Bl: function () {
                return x
            }, QP: function () {
                return B
            }, m2: function () {
                return V
            }, E2: function () {
                return U
            }, BP: function () {
                return F
            }, Xq: function () {
                return q
            }, U7: function () {
                return Y
            }, X5: function () {
                return W
            }, C4: function () {
                return K
            }, DU: function () {
                return Q
            }, XI: function () {
                return G
            }, uV: function () {
                return j
            }, NT: function () {
                return z
            }, fl: function () {
                return X
            }, xb: function () {
                return J
            }, Vn: function () {
                return $
            }, wm: function () {
                return nn
            }
        });
        var r = e(8235), o = e(12663), u = e(13283), i = e(10368), c = e.n(i), a = e(4281), s = e(27560),
            f = e(18030), d = e(31121), l = e.n(d), p = function (n) {
                return /^1[123456789]\d{9}$/.test(n)
            }, v = function (n) {
                return /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(n)
            }, h = function (n) {
                var t = {lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"', ldquo: "“", rdquo: "”", mdash: "—"};
                return n.replace(/&(lt|gt|nbsp|amp|quot|ldquo|rdquo|mdash);/gi, (function (n, e) {
                    return t[e]
                })).replace("<section", "<div").replace("<img", '<img style="max-width:100%;height:auto" ').replace("blob:", "")
            };

        function m(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500, e = null;
            return function () {
                for (var r = this, o = arguments.length, u = new Array(o), i = 0; i < o; i++) u[i] = arguments[i];
                e || (e = setTimeout((function () {
                    n.call(r, u), e = null
                }), t))
            }
        }

        function g(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
                e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = null, o = !0;
            return e ? function () {
                if (clearTimeout(r), o) {
                    for (var e = arguments.length, u = new Array(e), i = 0; i < e; i++) u[i] = arguments[i];
                    n.apply(this, u), o = !1
                }
                r = setTimeout((function () {
                    o = !0
                }), t)
            } : function () {
                for (var e = this, o = arguments.length, u = new Array(o), i = 0; i < o; i++) u[i] = arguments[i];
                clearTimeout(r), r = setTimeout((function () {
                    n.apply(e, u)
                }), t)
            }
        }

        function y(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
                e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], r = 0, o = function () {
                    var o = (new Date).getTime();
                    e || r || (r = o);
                    var u = t - (o - r);
                    if (u <= 0) {
                        for (var i = arguments.length, c = new Array(i), a = 0; a < i; a++) c[a] = arguments[a];
                        n.apply(this, c), r = o
                    }
                };
            return o
        }

        var I = function (n) {
            return {0: "周日", 1: "周一", 2: "周二", 3: "周三", 4: "周四", 5: "周五", 6: "周六"}[n]
        }, T = function (n) {
            return n.toLocaleString("en-US")
        }, b = function (n, t) {
            for (var e = {}, r = (t ? H(n, t) : decodeURIComponent(n)).split("&"), o = 0; o < r.length; o++) {
                var u = r[o].split("=");
                e[u[0]] = u[1]
            }
            return e
        }, w = function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "round", e = parseFloat(n);
            if (isNaN(e)) return !1;
            var r = (e = "floor" === t ? Math.floor(100 * Number(n)) / 100 : Math.round(100 * Number(n)) / 100).toString(),
                o = r.indexOf(".");
            for (o < 0 && (o = r.length, r += "."); r.length <= o + 2;) r += "0";
            return r
        }, Z = function (n) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                e = arguments.length > 2 ? arguments[2] : void 0, r = .01 * n + "",
                o = r.indexOf(".") > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
            r = r.replace(o, "$1");
            var u = Number(w(r, e));
            t && u < 0 && (u = 0);
            var i = u.toString();
            return i.indexOf(".") >= 0 && i.split(".")[1].length < 2 && (u = i + "0"), u
        }, _ = function (n) {
            return /^[0-9]{17}[0-9X]$|^\d{15}$/.test(n)
        }, k = function (n) {
            return /^[0-9A-Za-z]*$/.test(n)
        }, C = function (n) {
            return /^[H|M][0-9]{8}$/.test(n)
        }, S = function (n) {
            return /^8[123]0000(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(n)
        }, E = function (n) {
            return /^[0-9]{8}$/.test(n)
        }, L = function (n) {
            return /^[A-Z]{3}[0-9]{12}$|^9\d{17}$/.test(n)
        }, D = function (n) {
            return n.url = "/", n.scene = "=", n
        }(D || {}), H = function (n, t) {
            return function e(r) {
                (n = decodeURIComponent(r)).includes(D[t]) || e(n)
            }(n), n
        }, N = function () {
            for (var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = [], e = "0123456789abcdef", r = 0; r < 36; r++) {
                var o = Math.floor(16 * Math.random());
                t[r] = e.substring(o, o + 1)
            }
            t[14] = "4";
            var u = 3 & Number(t[19]) | 8;
            t[19] = e.substring(u, u + 1), t[8] = t[13] = t[18] = t[23] = "-";
            var i = t.join(""), a = R(c()(i + (new Date).getTime() + n));
            return a
        }, R = function (n) {
            for (var t = [8, 13, 18, 23], e = 0; e < t.length; e++) n = n.slice(0, t[e]) + "-" + n.slice(t[e]);
            return n
        }, M = function (n, t, e, r, o, u, i, a, s, f) {
            var d = "987EBBF8450544D7A52D5539DF9A92A2", l = "";
            return l = s ? "AppVersion=".concat(u, "Authorization=").concat(s, "Channel=").concat(i, "ClientType=").concat(o, "DeviceManufacture=").concat(e, "DeviceModel=").concat(r, "MessageId=").concat(a, "OsVersion=").concat(t, "Timestamp=").concat(n, "AppKey=").concat(d, "Url=").concat(f) : "AppVersion=".concat(u, "Channel=").concat(i, "ClientType=").concat(o, "DeviceManufacture=").concat(e, "DeviceModel=").concat(r, "MessageId=").concat(a, "OsVersion=").concat(t, "Timestamp=").concat(n, "AppKey=").concat(d, "Url=").concat(f), l = c()(l.replace(/\s*/g, "")).substring(4, 28).toLocaleUpperCase()
        }, O = function (n) {
            var t, e;
            return null !== (t = n) && void 0 !== t && t.includes("#") && 9 === (null === (e = n) || void 0 === e ? void 0 : e.length) ? (n = (n = n.replace("#", "")).substring(2, 8) + n.substring(0, 2), "#".concat(n)) : n
        }, A = function (n) {
            return new Promise((function (t) {
                l().getImageInfo({
                    src: n, success: function (n) {
                        var e, r, o, u, i = n.width, c = n.height, a = 5 * c / 4;
                        if (i === a) e = n.height, r = n.width, o = 0, u = 0; else if (i > a) e = n.height, r = a, o = (i - a) / 2, u = 0; else if (i < a) {
                            var s = 4 * i / 5;
                            e = s, r = n.width, o = 0, u = (c - s) / 2
                        }
                        t({h: Math.floor(e), w: Math.floor(r), x: Math.floor(o), y: Math.floor(u)})
                    }
                })
            }))
        };

        function P(n) {
            var t, e = (null == n || null === (t = n.split("?")) || void 0 === t ? void 0 : t[1]) || "";
            if (!e) return {};
            for (var r = /([^=&\s]+)[=\s]*([^=&\s]*)/g, o = {}; r.exec(e);) o[RegExp.$1] = RegExp.$2;
            return o
        }

        var x = function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], e = "";
            return Object.keys(n).forEach((function (t) {
                e += "".concat(t, "=").concat(n[t], "&")
            })), e = e.slice(0, e.length - 1), t ? encodeURIComponent(e) : e
        }, B = function () {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            if (!n) return "00:00";
            var t = Math.round(n), e = Math.floor(t / 60).toString();
            Number(e) < 10 && (e = "0" + e);
            var r = (t % 60).toString();
            return Number(r) < 10 && (r = "0" + r), e + ":" + r
        }, V = function () {
            var n = (0, u.Z)((0, o.Z)().mark((function n(t, e) {
                var r, u, i, c, f, d, p, v, h, m, g, y, I, T, b;
                return (0, o.Z)().wrap((function (n) {
                    for (; ;) switch (n.prev = n.next) {
                        case 0:
                            return (r = e.includes(s.jZ.replace("https://", ""))) && (e = a.V.tinyUrl(e.split("?")[0]).split("/format")[0]), n.next = 4, new Promise((function (n) {
                                l().getImageInfo({
                                    src: e, success: function (t) {
                                        n(t)
                                    }
                                })
                            }));
                        case 4:
                            if (u = n.sent, i = u.width, c = u.height, f = parseFloat(t.split(":")[0]), d = parseFloat(t.split(":")[1]), p = f / d, v = 0, h = 0, m = 0, g = 0, i > c ? (h = c, m = (i - (v = c * p)) / 2) : (v = i, g = (c - (h = i / p)) / 2), !r) {
                                n.next = 18;
                                break
                            }
                            return y = "".concat(e, "/cut/").concat(Math.floor(v), "x").concat(Math.floor(h), "x").concat(Math.floor(m), "x").concat(Math.floor(g)), n.abrupt("return", y);
                        case 18:
                            return I = l().createOffscreenCanvas({
                                type: "2d",
                                width: i,
                                height: c
                            }), T = I.getContext("2d"), b = I.createImage(), n.next = 23, new Promise((function (n) {
                                b.onload = n, b.src = e
                            }));
                        case 23:
                            return T.clearRect(0, 0, i, c), T.drawImage(b, m, g, v, h, 0, 0, v, h), n.abrupt("return", new Promise((function (n) {
                                l().canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: v,
                                    height: h,
                                    destWidth: v,
                                    destHeight: h,
                                    canvas: I,
                                    success: function (t) {
                                        n(t.tempFilePath)
                                    },
                                    fail: function () {
                                        n("")
                                    }
                                })
                            })));
                        case 26:
                        case"end":
                            return n.stop()
                    }
                }), n)
            })));
            return function (t, e) {
                return n.apply(this, arguments)
            }
        }(), U = function (n, t) {
            if (!n) return n;
            var e = t, r = n.includes("?");
            if (r) {
                e = {};
                var o = P(n);
                Object.keys(t).filter((function (n) {
                    return !o[n]
                })).forEach((function (n) {
                    e[n] = t[n]
                }))
            }
            return "".concat(n).concat(r ? "&" : "?").concat(x(e))
        };

        function F(n) {
            var t = (0, r.Z)(n);
            return null !== n && ("object" === t || "function" === t)
        }

        var q = function (n) {
            return null != n
        };

        function Y(n) {
            return setTimeout((function () {
                n()
            }), 1e3 / 30)
        }

        var W = function (n) {
            return n / 750 * (0, f.m2)().getWindowInfo().windowWidth
        }, K = function (n) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (n) {
                t || (n = s.Ch + n);
                var r = "/modules/webview/views/H5Link?src=".concat(encodeURIComponent(n));
                return e && (r += "&hideShare=true"), new Promise((function (n, t) {
                    l().navigateTo({
                        url: r, complete: function () {
                            n()
                        }, fail: function () {
                            t()
                        }
                    })
                }))
            }
        }, Q = function (n) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (n) {
                t || (n = s.yy + n);
                var r = "/modules/webview/views/H5Link?src=".concat(encodeURIComponent(n));
                return e && (r += "&hideShare=true"), new Promise((function (n, t) {
                    l().navigateTo({
                        url: r, complete: function () {
                            n()
                        }, fail: function () {
                            t()
                        }
                    })
                }))
            }
        }, G = function (n) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (n) {
                t || (n = s.Ch + n);
                var r = "/modules/webview/views/H5Link?src=".concat(encodeURIComponent(n));
                return e && (r += "&hideShare=true"), new Promise((function (n, t) {
                    l().redirectTo({
                        url: r, complete: function () {
                            n()
                        }, fail: function () {
                            t()
                        }
                    })
                }))
            }
        }, j = function (n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "floor", e = (0, f.m2)(),
                r = e.getWindowInfo(), o = r.screenWidth;
            return Math[t](n * o / 750)
        }, z = function (n) {
            return 750 * n / (0, f.m2)().getWindowInfo().screenWidth
        }, X = function (n, t, e) {
            return t.split(".").reduce((function (n, t) {
                return n && n[t] ? n[t] : e
            }), n)
        }, J = function (n) {
            return null == n || (Array.isArray(n) || "string" == typeof n ? 0 === n.length : "object" === (0, r.Z)(n) && 0 === Object.keys(n).length)
        }, $ = function (n) {
            return [null, void 0, !1, 0, ""].includes(n)
        }, nn = function () {
            return Math.random().toString(36).substr(2, 10)
        }
    }, 66612: function (n, t, e) {
        n.exports = e.p + "static/common/tag-photo.png"
    }
}]);

