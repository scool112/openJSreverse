(window.webpackJsonp = window.webpackJsonp || []).push([[160], {
    15092: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var o = n(36238), l = n(84298), i = n(64226), a = ["open-type", "scope", "app-parameter"];
        var r = n(60779), s = {
            name: "BaseBtn",
            props: {
                text: {type: String, default: "确认"},
                customStyle: {type: String, default: ""},
                color: {type: String, default: ""},
                size: {type: String, default: "s26"},
                border: {type: String, default: "default"},
                level: {type: Number, default: 1},
                width: {type: String, default: ""},
                height: {type: String, default: ""},
                background: {type: String, default: ""},
                disabled: {type: Boolean, default: !1},
                greyDisabled: {type: Boolean, default: !1},
                openType: {type: String, default: ""},
                scope: {type: String, default: ""},
                appParameter: {type: String, default: ""},
                radius: {type: String, default: ""}
            },
            emits: ["onClick", "getPhone", "getAvatar", "getAuthorize"],
            computed: {
                levelClass: function () {
                    return "level_".concat(this.level, " border_").concat(this.border, " size_").concat(this.size)
                }, btnStyle: function () {
                    var e = "";
                    if (this.width) {
                        var t = this.width.includes("%") || this.width.includes("px") ? this.width : this.width + "rpx";
                        e += "width: ".concat(t, ";")
                    }
                    if (this.height) {
                        var n = this.height.includes("%") || this.height.includes("px") ? this.height : this.height + "rpx";
                        e += "height: ".concat(n, ";")
                    }
                    if (this.radius) {
                        var o = this.radius.includes("%") || this.radius.includes("px") ? this.radius : this.radius + "rpx";
                        e += "border-radius: ".concat(o, ";")
                    }
                    return this.background && (e += "background: ".concat(this.background, ";")), this.color && (e += "color: ".concat(this.color, ";")), e + this.customStyle
                }
            },
            methods: {
                onClick: (0, r.Ds)((function () {
                    this.disabled || this.openType || this.greyDisabled || this.$emit("onClick")
                }), 1e3, !0), onGetPhone: (0, r.Ds)((function (e) {
                    this.$emit("getPhone", e)
                }), 1e3, !0), onGetAvatar: (0, r.Ds)((function (e) {
                    this.$emit("getAvatar", e)
                }), 1e3, !0), onGetAuthorize: (0, r.Ds)((function (e) {
                    this.$emit("getAuthorize", e)
                }), 1e3, !0), launchError: (0, r.Ds)((function (e) {
                    this.$emit("error", e)
                }), 1e3, !0)
            }
        };
        const c = {$style: {btn_wrapper: "RDQrg"}};
        var u = (0, n(403).Z)(s, [["render", function (e, t, n, r, s, c) {
            return (0, o.wg)(), (0, o.iD)("view", {class: (0, l.C_)(e.$style.btn_wrapper)}, [(0, o._)("button", {
                class: (0, l.C_)(["base_btn", [c.levelClass, {
                    disabled: n.disabled,
                    "grey-disabled": n.greyDisabled
                }]]),
                style: (0, l.j5)(c.btnStyle),
                "open-type": n.openType,
                scope: n.scope,
                "app-parameter": n.appParameter,
                "on:getPhoneNumber": t[0] || (t[0] = function () {
                    return c.onGetPhone && c.onGetPhone.apply(c, arguments)
                }),
                "on:chooseAvatar": t[1] || (t[1] = function () {
                    return c.onGetAvatar && c.onGetAvatar.apply(c, arguments)
                }),
                "on:getAuthorize": t[2] || (t[2] = function () {
                    return c.onGetAuthorize && c.onGetAuthorize.apply(c, arguments)
                }),
                onTap: t[3] || (t[3] = (0, i.iM)((function () {
                    return c.onClick && c.onClick.apply(c, arguments)
                }), ["stop"])),
                onError: t[4] || (t[4] = function () {
                    return c.launchError && c.launchError.apply(c, arguments)
                })
            }, (0, l.zw)(n.text), 47, a)], 2)
        }], ["__cssModules", c]])
    }, 37782: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return p
            }
        });
        var o = n(19680), l = n(15092), i = n(36238), a = n(84298), r = {key: 0, class: "guide_modal_title"},
            s = {key: 0, class: "guide_modal_content"};
        var c = {
            name: "BaseGuideModal",
            components: {BaseBtn: l.Z},
            props: {
                show: {type: Boolean, default: !1, required: !0},
                haveBg: {type: Boolean, default: !1},
                title: {type: String, default: ""},
                content: {type: String, default: ""},
                confirmText: {type: String, default: "确认"},
                cancelText: {type: String, default: "取消"},
                confirmOpenType: {type: String, default: ""},
                cancelOpenType: {type: String, default: ""},
                direction: {type: String, default: "row"},
                hideLevel: {type: Number, default: 0},
                overlayStyle: {
                    type: Object, default: function () {
                        return {backgroundColor: "rgba(0, 0, 0, 0.45)"}
                    }
                },
                closeOnClickOverlay: {type: Boolean, default: !0}
            },
            emits: ["update:show", "clickCancel", "clickConfirm"],
            methods: {
                onClose: function () {
                    this.$emit("update:show", !1)
                }, onClickCancel: function () {
                    this.$emit("clickCancel"), this.onClose()
                }, onClickConfirm: function () {
                    this.$emit("clickConfirm")
                }
            }
        };
        const u = {$style: {base_guide_modal: "lwObp"}};
        var p = (0, n(403).Z)(c, [["render", function (e, t, n, c, u, p) {
            var d = l.Z, h = o.default;
            return (0, i.wg)(), (0, i.j4)(h, {
                show: n.show,
                onClose: p.onClose,
                "custom-style": {background: "transparent"},
                "overlay-style": n.overlayStyle,
                "close-on-click-overlay": n.closeOnClickOverlay
            }, {
                default: (0, i.w5)((function () {
                    return [(0, i._)("view", {class: (0, a.C_)(e.$style.base_guide_modal)}, [n.haveBg ? (0, i.WI)(e.$slots, "bg", {key: 0}) : (0, i.kq)("", !0), (0, i._)("view", {class: (0, a.C_)(["modal_wrap", {have_bg: n.haveBg}])}, [(0, i.WI)(e.$slots, "title", {}, (function () {
                        return [n.title ? ((0, i.wg)(), (0, i.iD)("view", r, (0, a.zw)(n.title), 1)) : (0, i.kq)("", !0)]
                    })), (0, i.WI)(e.$slots, "content", {}, (function () {
                        return [n.content ? ((0, i.wg)(), (0, i.iD)("view", s, (0, a.zw)(n.content), 1)) : (0, i.kq)("", !0)]
                    })), (0, i._)("view", {class: (0, a.C_)(["btn_wrap", {column_style: "column" === n.direction}])}, [3 !== n.hideLevel ? ((0, i.wg)(), (0, i.j4)(d, {
                        key: 0,
                        class: "btn_item",
                        text: n.cancelText,
                        level: 3,
                        size: "m40",
                        width: "column" === n.direction ? "100%" : "228",
                        border: "none",
                        color: "#898989",
                        background: "#fff",
                        "open-type": n.cancelOpenType,
                        onOnClick: p.onClickCancel
                    }, null, 8, ["text", "width", "open-type", "onOnClick"])) : (0, i.kq)("", !0), 1 !== n.hideLevel ? ((0, i.wg)(), (0, i.j4)(d, {
                        key: 1,
                        class: "btn_item",
                        text: n.confirmText,
                        size: "m40",
                        "open-type": n.confirmOpenType,
                        width: "column" === n.direction ? "100%" : "228",
                        onOnClick: p.onClickConfirm
                    }, null, 8, ["text", "open-type", "width", "onOnClick"])) : (0, i.kq)("", !0)], 2)], 2)], 2)]
                })), _: 3
            }, 8, ["show", "onClose", "overlay-style", "close-on-click-overlay"])
        }], ["__cssModules", u]])
    }, 10446: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return _
            }
        });
        var o = n(19680), l = n(1902), i = n(36238), a = n(84298), r = n(64226), s = ["open-type", "scope"],
            c = ["open-type", "scope"];
        var u = n(60779), p = {
            name: "BaseModalBtn",
            props: {
                rightText: {type: String, default: "确认"},
                leftText: {type: String, default: "取消"},
                leftOpenType: {type: String, default: ""},
                rightOpenType: {type: String, default: ""},
                leftScope: {type: String, default: ""},
                rightScope: {type: String, default: ""},
                hideType: {type: String, default: ""}
            },
            emits: ["clickLeft", "clickRight", "getPhone", "getAvatar", "getAuthorize"],
            methods: {
                onClickLeft: (0, u.Ds)((function () {
                    this.$emit("clickLeft")
                }), 1500, !0), onClickRight: (0, u.Ds)((function () {
                    this.$emit("clickRight")
                }), 1e3, !0), onGetPhone: (0, u.Ds)((function (e) {
                    this.$emit("getPhone", e)
                }), 1e3, !0), onGetAvatar: (0, u.Ds)((function (e) {
                    this.$emit("getAvatar", e)
                }), 1e3, !0), onGetAuthorize: (0, u.Ds)((function (e) {
                    this.$emit("getAuthorize", e)
                }), 1e3, !0)
            }
        }, d = n(403);
        const h = {
            $style: {
                base_modal_btn: "NFAjB",
                btn_wrap: "slFT7",
                btn: "Wf36c",
                left: "Kmreo",
                no_border: "CN8lR",
                one_btn: "fIg26"
            }
        };
        var f = (0, d.Z)(p, [["render", function (e, t, n, o, u, p) {
            var d, h, f;
            return (0, i.wg)(), (0, i.iD)("view", {class: (0, a.C_)((d = {}, (0, l.Z)(d, e.$style.base_modal_btn, !0), (0, l.Z)(d, e.$style.one_btn, n.hideType), d))}, ["left" !== n.hideType ? ((0, i.wg)(), (0, i.iD)("view", {
                key: 0,
                class: (0, a.C_)((h = {}, (0, l.Z)(h, e.$style.btn_wrap, !0), (0, l.Z)(h, e.$style.left, !0), (0, l.Z)(h, e.$style.no_border, "right" === n.hideType), h))
            }, [(0, i._)("button", {
                class: (0, a.C_)(e.$style.btn),
                "open-type": n.leftOpenType,
                scope: n.leftScope,
                onTap: t[0] || (t[0] = (0, r.iM)((function () {
                    return p.onClickLeft && p.onClickLeft.apply(p, arguments)
                }), ["stop"])),
                "on:getPhoneNumber": t[1] || (t[1] = function () {
                    return p.onGetPhone && p.onGetPhone.apply(p, arguments)
                }),
                "on:chooseAvatar": t[2] || (t[2] = function () {
                    return p.onGetAvatar && p.onGetAvatar.apply(p, arguments)
                }),
                "on:getAuthorize": t[3] || (t[3] = function () {
                    return p.onGetAuthorize && p.onGetAuthorize.apply(p, arguments)
                })
            }, (0, a.zw)(n.leftText), 43, s)], 2)) : (0, i.kq)("", !0), "right" !== n.hideType ? ((0, i.wg)(), (0, i.iD)("view", {
                key: 1,
                class: (0, a.C_)((f = {}, (0, l.Z)(f, e.$style.btn_wrap, !0), (0, l.Z)(f, e.$style.right, !0), f))
            }, [(0, i._)("button", {
                class: (0, a.C_)(e.$style.btn),
                "open-type": n.rightOpenType,
                scope: n.rightScope,
                onTap: t[4] || (t[4] = (0, r.iM)((function () {
                    return p.onClickRight && p.onClickRight.apply(p, arguments)
                }), ["stop"])),
                "on:getPhoneNumber": t[5] || (t[5] = function () {
                    return p.onGetPhone && p.onGetPhone.apply(p, arguments)
                }),
                "on:chooseAvatar": t[6] || (t[6] = function () {
                    return p.onGetAvatar && p.onGetAvatar.apply(p, arguments)
                }),
                "on:getAuthorize": t[7] || (t[7] = function () {
                    return p.onGetAuthorize && p.onGetAuthorize.apply(p, arguments)
                })
            }, (0, a.zw)(n.rightText), 43, c)], 2)) : (0, i.kq)("", !0)], 2)
        }], ["__cssModules", h]]), y = ["src"];
        var g = {
            name: "BaseTipModal",
            components: {TheModalBtn: f},
            props: {
                show: {type: Boolean, default: !1, required: !0},
                icon: {type: String, default: ""},
                title: {type: String, default: ""},
                titleStyle: {
                    type: Object, default: function () {
                        return {}
                    }
                },
                content: {type: String, default: "标题&内容弹窗的提示语"},
                rightText: {type: String, default: "确认"},
                leftText: {type: String, default: "取消"},
                leftOpenType: {type: String, default: ""},
                rightOpenType: {type: String, default: ""},
                leftScope: {type: String, default: ""},
                rightScope: {type: String, default: ""},
                hideType: {type: String, default: ""},
                closeOnClickOverlay: {type: Boolean, default: !0},
                overlayStyle: {
                    type: Object, default: function () {
                        return {backgroundColor: "rgba(0, 0, 0, 0.45)"}
                    }
                },
                zIndex: {type: Number, default: 1e3}
            },
            emits: ["update:show", "clickLeft", "clickRight", "getPhone", "getAvatar", "getAuthorize", "onClose"],
            methods: {
                onClose: function () {
                    this.$emit("onClose"), this.$emit("update:show", !1)
                }, onClickLeft: function () {
                    this.$emit("clickLeft"), this.onClose()
                }, onClickRight: function () {
                    this.$emit("clickRight")
                }, onGetPhone: function (e) {
                    this.$emit("getPhone", e)
                }, onGetAvatar: function (e) {
                    this.$emit("getAvatar", e)
                }, onGetAuthorize: function (e) {
                    this.$emit("getAuthorize", e)
                }
            }
        };
        const m = {
            $style: {
                base_tip_modal: "nczc4",
                modal_wrap: "TMpuv",
                tip_modal_title: "DGYfb",
                tip_modal_content: "khEib"
            }
        };
        var _ = (0, d.Z)(g, [["render", function (e, t, n, l, r, s) {
            var c = f, u = o.default;
            return (0, i.wg)(), (0, i.j4)(u, {
                show: n.show,
                "custom-style": {background: "transparent"},
                "overlay-style": n.overlayStyle,
                "z-index": n.zIndex,
                onClose: s.onClose,
                "close-on-click-overlay": n.closeOnClickOverlay
            }, {
                default: (0, i.w5)((function () {
                    return [(0, i._)("view", {class: (0, a.C_)(e.$style.base_tip_modal)}, [(0, i._)("view", {class: (0, a.C_)(e.$style.modal_wrap)}, [(0, i.WI)(e.$slots, "icon", {}, (function () {
                        return [n.icon ? ((0, i.wg)(), (0, i.iD)("image", {
                            key: 0,
                            class: (0, a.C_)(e.$style.icon_modal_icon),
                            src: n.icon
                        }, null, 10, y)) : (0, i.kq)("", !0)]
                    })), (0, i.WI)(e.$slots, "title", {}, (function () {
                        return [n.title ? ((0, i.wg)(), (0, i.iD)("view", {
                            key: 0,
                            class: (0, a.C_)(e.$style.tip_modal_title),
                            style: (0, a.j5)(n.titleStyle)
                        }, (0, a.zw)(n.title), 7)) : (0, i.kq)("", !0)]
                    })), (0, i.WI)(e.$slots, "content", {}, (function () {
                        return [(0, i._)("view", {class: (0, a.C_)(e.$style.tip_modal_content)}, (0, a.zw)(n.content), 3)]
                    }))], 2), "all" === n.hideType ? (0, i.WI)(e.$slots, "btn", {key: 0}) : (0, i.kq)("", !0), "all" !== n.hideType ? ((0, i.wg)(), (0, i.j4)(c, {
                        key: 1,
                        "right-text": n.rightText,
                        "left-text": n.leftText,
                        "left-open-type": n.leftOpenType,
                        "right-open-type": n.rightOpenType,
                        "left-scope": n.leftScope,
                        "right-scope": n.rightScope,
                        "hide-type": n.icon ? "left" : n.hideType,
                        onClickLeft: s.onClickLeft,
                        onClickRight: s.onClickRight,
                        onGetPhone: s.onGetPhone,
                        onGetAvatar: s.onGetAvatar,
                        onGetAuthorize: s.onGetAuthorize
                    }, null, 8, ["right-text", "left-text", "left-open-type", "right-open-type", "left-scope", "right-scope", "hide-type", "onClickLeft", "onClickRight", "onGetPhone", "onGetAvatar", "onGetAuthorize"])) : (0, i.kq)("", !0)], 2)]
                })), _: 3
            }, 8, ["show", "overlay-style", "z-index", "onClose", "close-on-click-overlay"])
        }], ["__cssModules", m]])
    }, 78087: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return a
            }
        });
        var o = n(36238),
            l = ["value", "autoHeight", "maxlength", "show-count", "placeholder", "placeholder-style", "cursor", "focus"],
            i = (0, o.aZ)({
                __name: "index",
                props: {
                    modelValue: {},
                    placeholderStyle: {},
                    maxlength: {},
                    showCount: {type: Boolean},
                    placeholder: {},
                    autoHeight: {type: Boolean},
                    cursor: {},
                    focus: {type: Boolean}
                },
                emits: ["update:modelValue", "blur"],
                setup: function (e, t) {
                    var n = t.emit, i = function (e) {
                        var t;
                        n("update:modelValue", (null == e || null === (t = e.detail) || void 0 === t || null === (t = t.value) || void 0 === t ? void 0 : t.trim()) || "")
                    }, a = function (e) {
                        n("blur", e)
                    };
                    return function (e, t) {
                        return (0, o.wg)(), (0, o.iD)("textarea", {
                            value: e.modelValue,
                            autoHeight: e.autoHeight,
                            maxlength: e.maxlength,
                            "show-count": e.showCount,
                            placeholder: e.placeholder,
                            "placeholder-style": e.placeholderStyle,
                            cursor: e.cursor,
                            focus: e.focus,
                            onInput: i,
                            onBlur: a
                        }, null, 40, l)
                    }
                }
            });
        var a = i
    }, 10212: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var o = n(76289), l = (n(38283), n(1902)), i = n(36238), a = n(84298), r = n(64226);
        var s = {
            name: "DialogWrap",
            props: {
                show: {type: Boolean, default: !1},
                overlay: {type: Boolean, default: !1},
                customStyle: {type: String || Object, default: {background: "transparent"}},
                alphaType: {type: String, default: "normal"},
                stopPropagation: {type: Boolean, default: !1}
            },
            emits: ["close", "click-overlay"],
            data: function () {
                return {}
            },
            methods: {
                onTouchMove: function () {
                }, close: function () {
                    this.$emit("close")
                }, handleOverlayClick: function () {
                    this.$emit("close"), this.$emit("click-overlay")
                }
            }
        };
        const c = {$style: {popup_overlay: "uzg3I", dark: "dWXTb", light: "Lpo75", wrapper: "Nq5l5"}};
        var u = (0, n(403).Z)(s, [["render", function (e, t, n, s, c, u) {
            var p = o.G;
            return (0, i.wg)(), (0, i.j4)(p, {
                visible: n.show,
                style: (0, a.j5)(n.customStyle),
                overlay: !1,
                "z-index": 1e3,
                onClose: u.close,
                onClickOverlay: t[2] || (t[2] = function (t) {
                    return e.$emit("click-overlay")
                })
            }, {
                default: (0, i.w5)((function () {
                    var o;
                    return [(0, i._)("view", {
                        class: (0, a.C_)((o = {}, (0, l.Z)(o, e.$style.popup_overlay, !0), (0, l.Z)(o, e.$style.dark, "dark" === n.alphaType), (0, l.Z)(o, e.$style.light, "light" === n.alphaType), o)),
                        "catch-move": !0,
                        onClick: t[1] || (t[1] = function () {
                            return u.handleOverlayClick && u.handleOverlayClick.apply(u, arguments)
                        })
                    }, [n.stopPropagation ? ((0, i.wg)(), (0, i.iD)("view", {
                        key: 0,
                        class: (0, a.C_)(e.$style.wrapper),
                        onClick: t[0] || (t[0] = (0, r.iM)((function () {
                        }), ["stop"]))
                    }, [(0, i.WI)(e.$slots, "default")], 2)) : ((0, i.wg)(), (0, i.iD)("view", {
                        key: 1,
                        class: (0, a.C_)(e.$style.wrapper)
                    }, [(0, i.WI)(e.$slots, "default")], 2))], 2)]
                })), _: 3
            }, 8, ["visible", "style", "onClose"])
        }], ["__cssModules", c]])
    }, 58510: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return m
            }
        });
        var o = n(36238), l = n(41530), i = n(84298), a = ["src"], r = ["src"],
            s = (0, o._)("text", null, "问一问", -1);
        var c = n(27560), u = n(60779), p = n(31121), d = n.n(p), h = n(18030), f = {
            props: {
                styleType: {type: Number, default: 1},
                purposeHotel: {type: String, default: ""},
                purposeOrder: {type: String, default: ""},
                className: {type: String, default: ""}
            }, data: function () {
                return {BDW_IMG_URL: c.jZ}
            }, methods: {
                onClick: function () {
                    if (1154 !== d().getLaunchOptionsSync().scene) {
                        if ((0, h.LM)().getToken()) {
                            var e = "/#/imUdesk?purposeHotel=".concat(this.purposeHotel, "&purposeOrder=").concat(this.purposeOrder);
                            (0, u.C4)(e, !1, !0)
                        }
                        this.$emit("click")
                    } else d().showToast({title: "请前往小程序使用完整服务", icon: "none"})
                }, loginStatus: function () {
                }
            }
        };
        const y = {$style: {im_service_box: "BepDP"}};
        var g = (0, n(403).Z)(f, [["render", function (e, t, n, l, c, u) {
            return (0, o.wg)(), (0, o.iD)("view", {class: (0, i.C_)([e.$style.im_service_box, n.className])}, [1 === n.styleType ? ((0, o.wg)(), (0, o.iD)("view", {
                key: 0,
                class: "style_1",
                onClick: t[0] || (t[0] = function () {
                    return u.onClick && u.onClick.apply(u, arguments)
                })
            }, [(0, o._)("image", {
                src: "".concat(c.BDW_IMG_URL, "/minapp/hotel/common/im_service_orange.png"),
                mode: "widthFix"
            }, null, 8, a)])) : (0, o.kq)("", !0), 2 === n.styleType ? ((0, o.wg)(), (0, o.iD)("view", {
                key: 1,
                class: "style_2",
                onClick: t[1] || (t[1] = function () {
                    return u.onClick && u.onClick.apply(u, arguments)
                })
            }, [(0, o._)("image", {
                src: "".concat(c.BDW_IMG_URL, "/minapp/hotel/common/im_service_black.png"),
                mode: "widthFix"
            }, null, 8, r), s])) : (0, o.kq)("", !0)], 2)
        }], ["__cssModules", y]]);
        var m = (0, o.aZ)({
            __name: "ImServiceWrapper",
            props: {
                styleType: {default: 1},
                purposeHotel: {default: ""},
                purposeOrder: {default: ""},
                className: {default: ""}
            },
            emits: ["click"],
            setup: function (e) {
                var t = (0, h.GS)();
                return function (e, n) {
                    var i;
                    return (0, o.wg)(), (0, o.iD)("view", null, [null !== (i = (0, l.SU)(t).state) && void 0 !== i && i.isClientOpen ? ((0, o.wg)(), (0, o.j4)(g, {
                        key: 0,
                        "style-type": e.styleType,
                        "class-name": e.className,
                        "purpose-hotel": e.purposeHotel,
                        "purpose-order": e.purposeOrder,
                        onClick: n[0] || (n[0] = function (t) {
                            return e.$emit("click")
                        })
                    }, null, 8, ["style-type", "class-name", "purpose-hotel", "purpose-order"])) : (0, o.kq)("", !0)])
                }
            }
        })
    }, 7435: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return i
            }
        });
        var o = n(36238), l = n(41530);
        var i = (0, o.aZ)({
            __name: "LazyComponent", props: {delay: {default: 200}}, setup: function (e) {
                var t = e, n = (0, l.iH)(!1);
                return (0, o.bv)((function () {
                    var e = setTimeout((function () {
                        n.value = !0, clearTimeout(e)
                    }), t.delay)
                })), function (e, t) {
                    return (0, o.wg)(), (0, o.iD)("custom-wrapper", null, [n.value ? (0, o.WI)(e.$slots, "default", {key: 0}) : (0, o.kq)("", !0)])
                }
            }
        })
    }, 56762: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return g
            }
        });
        var o = n(61344), l = n(12663), i = n(13283), a = n(36238), r = n(84298), s = n(41530), c = n(64226),
            u = n(27560), p = n(18030), d = n(67777), h = (0, a._)("view", {class: "text"}, "福利到期", -1),
            f = (0, a.aZ)({
                __name: "index", props: {selected: {}}, setup: function (e) {
                    var t = e, n = (0, a.Fl)((function () {
                        return (0, p.Rq)().showExpirationTips || !1
                    })), f = (0, a.Fl)((function () {
                        return (0, p.Rq)().hasTabbar
                    })), y = (0, a.Fl)((function () {
                        return (0, p.LM)().getToken()
                    })), g = function () {
                        var e = (0, i.Z)((0, l.Z)().mark((function e() {
                            var t, n;
                            return (0, l.Z)().wrap((function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, (0, d.bi)();
                                    case 2:
                                        n = e.sent, (0, p.Rq)().setShowExpirationTips(null == n || null === (t = n.data) || void 0 === t || null === (t = t.data) || void 0 === t ? void 0 : t.showExpirationTips);
                                    case 4:
                                    case"end":
                                        return e.stop()
                                }
                            }), e)
                        })));
                        return function () {
                            return e.apply(this, arguments)
                        }
                    }();
                    return (0, a.YP)([function () {
                        return t.selected
                    }, function () {
                        return y.value
                    }], (function () {
                        !n.value && y.value && g()
                    }), {immediate: !0}), function (e, t) {
                        var l = o.Z;
                        return (0, a.wy)(((0, a.wg)(), (0, a.iD)("view", {class: (0, r.C_)(e.$style.overtime_tip)}, [h, (0, a.Wm)(l, {
                            class: "image",
                            mode: "aspectFill",
                            src: "".concat((0, s.SU)(u.jZ), "/minapp/business/mine/overtime.png")
                        }, null, 8, ["src"])], 2)), [[c.F8, n.value && f.value]])
                    }
                }
            });
        const y = {$style: {overtime_tip: "zeUT5"}};
        var g = (0, n(403).Z)(f, [["__cssModules", y]])
    }, 51997: function (e, t, n) {
        n.r(t), n.d(t, {
            default: function () {
                return i
            }
        });
        var o = n(10877), l = (n(4271), n(36238));
        var i = (0, l.aZ)({
            __name: "Overlay",
            props: {
                show: {type: Boolean},
                overlayStyle: {},
                overlayClass: {},
                zIndex: {default: 2e3},
                lockScroll: {type: Boolean, default: !0},
                closeOnClickOverlay: {type: Boolean, default: !0},
                duration: {default: .3}
            },
            emits: ["click"],
            setup: function (e) {
                return function (e, t) {
                    var n = o.a;
                    return (0, l.wg)(), (0, l.j4)(n, {
                        visible: e.show,
                        "z-index": e.zIndex,
                        "overlay-class": e.overlayClass,
                        duration: e.duration,
                        "lock-scroll": e.lockScroll,
                        "close-on-click-overlay": e.closeOnClickOverlay,
                        "overlay-style": e.overlayStyle,
                        onClick: t[0] || (t[0] = function (t) {
                            return e.$emit("click")
                        })
                    }, {
                        default: (0, l.w5)((function () {
                            return [(0, l.WI)(e.$slots, "default")]
                        })), _: 3
                    }, 8, ["visible", "z-index", "overlay-class", "duration", "lock-scroll", "close-on-click-overlay", "overlay-style"])
                }
            }
        })
    }, 19680: function (e, t, n) {
        n.r(t), n.d(t, {
            default: function () {
                return d
            }
        });
        var o = n(76289), l = (n(38283), n(1902)), i = n(36238), a = n(84298), r = n(41530), s = n(74772),
            c = n(86003), u = (0, i.aZ)({
                __name: "Popup",
                props: {
                    show: {type: Boolean},
                    position: {},
                    customStyle: {},
                    overlayStyle: {},
                    round: {type: Boolean, default: !1},
                    overlayClass: {},
                    popClass: {},
                    overlay: {type: Boolean, default: !0},
                    zIndex: {default: 1e3},
                    closeOnClickOverlay: {type: Boolean, default: !0},
                    safeAreaInsetBottom: {type: Boolean},
                    disableScroll: {type: Boolean, default: !1},
                    closeable: {type: Boolean, default: !1},
                    closeClass: {},
                    destroyOnClose: {type: Boolean, default: !0},
                    closeType: {default: "close"},
                    closeSize: {default: "large"},
                    closeIconType: {default: "gray"}
                },
                emits: ["close", "open", "opened", "closed", "click-overlay"],
                setup: function (e) {
                    var t = e, n = (0, r.iH)(t.show);
                    return (0, i.YP)((function () {
                        return t.show
                    }), (function (e) {
                        n.value = e
                    })), function (e, t) {
                        var r = o.G;
                        return (0, i.wg)(), (0, i.j4)(r, {
                            visible: n.value,
                            "onUpdate:visible": t[1] || (t[1] = function (e) {
                                return n.value = e
                            }),
                            position: e.position,
                            style: (0, a.j5)(e.customStyle),
                            "overlay-style": e.overlayStyle,
                            round: e.round,
                            "pop-class": e.popClass,
                            "overlay-class": e.overlayClass,
                            "lock-scroll": e.disableScroll,
                            "disable-scroll": e.disableScroll,
                            onClose: t[2] || (t[2] = function (t) {
                                return e.$emit("close")
                            }),
                            onOpen: t[3] || (t[3] = function (t) {
                                return e.$emit("open")
                            }),
                            onOpened: t[4] || (t[4] = function (t) {
                                return e.$emit("opened")
                            }),
                            onClosed: t[5] || (t[5] = function (t) {
                                return e.$emit("closed")
                            }),
                            onClickOverlay: t[6] || (t[6] = function (t) {
                                return e.$emit("click-overlay")
                            }),
                            closeable: !1,
                            overlay: e.overlay,
                            "z-index": e.zIndex,
                            "safe-area-inset-bottom": e.safeAreaInsetBottom,
                            "close-on-click-overlay": e.closeOnClickOverlay
                        }, {
                            default: (0, i.w5)((function () {
                                var n;
                                return [e.closeable ? ((0, i.wg)(), (0, i.iD)("view", {
                                    key: 0,
                                    class: (0, a.C_)((n = {}, (0, l.Z)(n, e.$style.popClose, "close" === e.closeType), (0, l.Z)(n, e.$style.popBack, "back" === e.closeType), (0, l.Z)(n, e.closeClass, !0), n)),
                                    onTap: t[0] || (t[0] = function (t) {
                                        return e.$emit("close")
                                    })
                                }, ["close" === e.closeType ? ((0, i.wg)(), (0, i.j4)(s.Z, {
                                    key: 0,
                                    size: e.closeSize,
                                    type: e.closeIconType
                                }, null, 8, ["size", "type"])) : ((0, i.wg)(), (0, i.j4)(c.Z, {
                                    key: 1,
                                    type: "grey"
                                }))], 34)) : (0, i.kq)("", !0), (0, i.WI)(e.$slots, "default")]
                            })), _: 3
                        }, 8, ["visible", "position", "style", "overlay-style", "round", "pop-class", "overlay-class", "lock-scroll", "disable-scroll", "overlay", "z-index", "safe-area-inset-bottom", "close-on-click-overlay"])
                    }
                }
            });
        const p = {$style: {popClose: "uKOTA", popBack: "VfNpc"}};
        var d = (0, n(403).Z)(u, [["__cssModules", p]])
    }, 76572: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return m
            }
        });
        var o = n(12663), l = n(13283), i = n(36238), a = n(41530), r = n(84298), s = n(31121), c = n.n(s),
            u = n(60779), p = n(10446), d = n(67777), h = n(51185), f = ["onTap"], y = (0, i.aZ)({
                __name: "index",
                props: {show: {type: Boolean, default: !1}},
                emits: ["update:show", "onClose"],
                setup: function (e, t) {
                    var n = t.emit, s = (0, h.L)(), y = (0, i.Fl)((function () {
                        return (0, h.L)().state.agreeVoList
                    })), g = function () {
                        var e = (0, l.Z)((0, o.Z)().mark((function e() {
                            var t, n, l, i, a, r, u;
                            return (0, o.Z)().wrap((function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.prev = 0, e.next = 3, (0, d.PT)();
                                    case 3:
                                        t = e.sent, n = t.data, l = n.code, i = n.data, 200 === l && i ? (a = s.setProtocolTips, r = s.state, u = s.setProtocolCallback, a(!1), r.protocolCallback && (r.protocolCallback(), u(null)), v()) : c().showToast({
                                            title: "协议签署失败~",
                                            icon: "none",
                                            duration: 2e3
                                        }), e.next = 10;
                                        break;
                                    case 8:
                                        e.prev = 8, e.t0 = e.catch(0);
                                    case 10:
                                    case"end":
                                        return e.stop()
                                }
                            }), e, null, [[0, 8]])
                        })));
                        return function () {
                            return e.apply(this, arguments)
                        }
                    }(), m = (0, u.Ds)((0, l.Z)((0, o.Z)().mark((function e() {
                        return (0, o.Z)().wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, g();
                                case 2:
                                case"end":
                                    return e.stop()
                            }
                        }), e)
                    }))), 2e3, !0), _ = function () {
                        n("update:show", !1), c().exitMiniProgram()
                    }, v = function () {
                        n("onClose"), n("update:show", !1)
                    };
                    return function (e, t) {
                        return (0, i.wg)(), (0, i.j4)(p.Z, {
                            show: e.show,
                            title: "服务协议更新提示",
                            content: "未成年人入住酒店需监护人陪同或同意",
                            "left-text": "不同意",
                            "right-text": "同意并继续",
                            "z-index": 3e3,
                            "close-on-click-overlay": !1,
                            onClickRight: (0, a.SU)(m),
                            onClickLeft: _
                        }, {
                            content: (0, i.w5)((function () {
                                return [(0, i._)("view", {class: (0, r.C_)(e.$style.tip_modal_content)}, [(0, i.Uk)(" 感谢您信任并使用百达屋的产品及服务，为了更好地维护您的合法权益，我们对 "), ((0, i.wg)(!0), (0, i.iD)(i.HY, null, (0, i.Ko)(y.value, (function (t) {
                                    return (0, i.wg)(), (0, i.iD)("text", {
                                        class: (0, r.C_)(e.$style.height_line),
                                        key: t.id,
                                        onTap: function (e) {
                                            return function (e) {
                                                (0, u.C4)(e.popUrl)
                                            }(t)
                                        }
                                    }, " 《" + (0, r.zw)(t.agreeName) + "》 ", 43, f)
                                })), 128)), (0, i.Uk)(" 进行了更新，请您认真阅读并同意相关条款 ")], 2)]
                            })), _: 1
                        }, 8, ["show", "onClickRight"])
                    }
                }
            });
        const g = {$style: {tip_modal_content: "IjYu3", height_line: "zQBo9"}};
        var m = (0, n(403).Z)(y, [["__cssModules", g]])
    }, 32940: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return f
            }
        });
        var o = n(19680), l = n(61344), i = n(36238), a = n(84298), r = n(73061), s = n(18030),
            c = {class: "title"}, u = {class: "content"}, p = {class: "bottom"}, d = (0, i.aZ)({
                __name: "index",
                props: {
                    show: {type: Boolean, default: !1},
                    title: {default: "您的账号有风险"},
                    content: {default: "将会【处罚规则】，直到【风控结束时间】，若您有异议，请联系客服申诉"}
                },
                emits: ["update:show", "onClose", "onConfirm"],
                setup: function (e, t) {
                    var n = t.emit, d = e, h = function () {
                        n("update:show", !1), n("onConfirm")
                    }, f = function () {
                        n("update:show", !1), n("onClose")
                    };
                    (0, i.YP)((function () {
                        return d.show
                    }), (function (e) {
                        y(e)
                    }));
                    var y = function (e) {
                        var t = (0, r.Sh)();
                        if ("modules/main/views/bookHotel/BookHotel".includes(t)) if (e) (0, s.Rq)().setHasTabbar(!1); else var n = setTimeout((function () {
                            clearTimeout(n), (0, s.Rq)().setHasTabbar(!0)
                        }), 100)
                    };
                    return function (e, t) {
                        var n = l.Z, r = o.default;
                        return (0, i.wg)(), (0, i.j4)(r, {
                            "custom-style": {background: "transparent"},
                            "overlay-style": {background: "rgba($color: #000000, $alpha: 0.8)"},
                            show: e.show,
                            onClose: f,
                            "close-on-click-overlay": !1
                        }, {
                            default: (0, i.w5)((function () {
                                return [(0, i._)("view", {class: (0, a.C_)(e.$style.dialog_content)}, [(0, i.Wm)(n, {
                                    class: "pic",
                                    src: "https://img.betterwood.com/minapp/hotel/home/safe-control.png",
                                    "scale-x": 580,
                                    "scale-y": 232
                                }), (0, i._)("view", c, (0, a.zw)(e.title), 1), (0, i._)("view", u, (0, a.zw)(e.content), 1), (0, i._)("view", p, [(0, i._)("view", {
                                    class: "btn confirm",
                                    onTap: h
                                }, "确定", 32)])], 2)]
                            })), _: 1
                        }, 8, ["overlay-style", "show"])
                    }
                }
            });
        const h = {$style: {dialog_content: "F3MhE"}};
        var f = (0, n(403).Z)(d, [["__cssModules", h]])
    }, 61344: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var o = n(36238), l = n(84298), i = ["src", "lazy-load", "mode", "show-menu-by-longpress"];
        var a = n(96949), r = n(4281);

        function s(e) {
            if (function (e) {
                return null != e
            }(e)) return function (e) {
                return "number" == typeof e || /^\d+(\.\d+)?$/.test(e)
            }(e) ? "".concat(e, "rpx") : String(e)
        }

        var c = {
            name: "tiny-image",
            props: {
                src: {type: String, required: !0, default: ""},
                width: {type: Number, required: !1, default: 0},
                height: {type: Number, required: !1, default: 0},
                lazyLoad: {type: Boolean, default: !0},
                radius: {type: [Number, String], default: 0},
                scaleX: {type: Number, required: !1, default: 0},
                scaleY: {type: Number, required: !1, default: 0},
                mode: {
                    type: String, default: "aspectFill", validator: function (e) {
                        return "true" !== e
                    }
                },
                showMenuByLongpress: {type: Boolean, default: !1},
                defaultOptions: {
                    type: Object, default: function () {
                        return {}
                    }
                }
            },
            emits: ["longPressCallback", "onLoad", "clickCallback"],
            computed: {
                tinyUrl: function () {
                    var e = Object.create(null);
                    return this.scaleX > 0 && (e.width = this.scaleX), this.scaleY > 0 && (e.height = this.scaleY), r.V.tinyUrl(this.src || "", (0, a.Z)((0, a.Z)({}, this.defaultOptions), e))
                }, computedMode: function () {
                    return "https://img.betterwood.com/default.png" === this.tinyUrl ? "scaleToFill" : "true" === this.mode || "" === this.mode ? "aspectFill" : this.mode
                }, computedRadius: function () {
                    return this.radius ? s(this.radius) : null
                }, computedWidth: function () {
                    if (0 !== this.width) return s(this.width)
                }, computedHeight: function () {
                    if (0 !== this.height) return s(this.height)
                }, imageStyle: function () {
                    return {
                        width: this.computedWidth,
                        height: this.computedHeight,
                        borderRadius: this.computedRadius || null,
                        verticalAlign: "middle"
                    }
                }
            },
            methods: {
                emitEvent: function () {
                    this.$emit("clickCallback")
                }, onload: function (e) {
                    this.$emit("onLoad", e)
                }, emitLongPress: function () {
                    this.$emit("longPressCallback")
                }
            }
        };
        var u = (0, n(403).Z)(c, [["render", function (e, t, n, a, r, s) {
            return (0, o.wg)(), (0, o.iD)("image", {
                src: s.tinyUrl,
                style: (0, l.j5)(s.imageStyle),
                "lazy-load": n.lazyLoad,
                mode: s.computedMode,
                "show-menu-by-longpress": n.showMenuByLongpress,
                webp: "",
                "fade-in": "",
                onTap: t[0] || (t[0] = function () {
                    return s.emitEvent && s.emitEvent.apply(s, arguments)
                }),
                onLoad: t[1] || (t[1] = function () {
                    return s.onload && s.onload.apply(s, arguments)
                }),
                onLongpress: t[2] || (t[2] = function () {
                    return s.emitLongPress && s.emitLongPress.apply(s, arguments)
                })
            }, null, 44, i)
        }]])
    }, 71363: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return c
            }
        });
        var o = n(36238), l = n(84298), i = n(41530), a = {key: 0, class: "toast_container"},
            r = {class: "toast_content"}, s = (0, o.aZ)({
                __name: "index", props: {duration: {}}, setup: function (e, t) {
                    var n = t.expose, s = e, c = null, u = (0, i.iH)(!1), p = (0, i.iH)("");
                    return (0, o.Jd)((function () {
                        u.value = !1, c && clearTimeout(c)
                    })), n({
                        showToast: function (e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1500;
                            p.value = e, clearTimeout(c), u.value = !0, c = setTimeout((function () {
                                u.value = !1
                            }), s.duration || t)
                        }
                    }), function (e, t) {
                        return u.value ? ((0, o.wg)(), (0, o.iD)("view", a, [(0, o._)("view", r, (0, l.zw)(p.value), 1)])) : (0, o.kq)("", !0)
                    }
                }
            });
        var c = s
    }, 75749: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return y
            }
        });
        var o = n(1902), l = n(36238), i = n(41530), a = n(84298), r = n(52050), s = n(17274), c = n(56707),
            u = n(51309), p = n(91287), d = n(31121), h = (0, l.aZ)({
                __name: "ZeroBar", props: {direction: {default: "up"}}, setup: function (e) {
                    var t = (0, s.F)(), n = t.calendarType, h = t.setCalendarType, f = (0, u.H)().isZeroTime,
                        y = (0, l.Fl)((function () {
                            return (0, p.Qu)((0, c.H)(!1).dates[0])
                        }));
                    return (0, d.useLoad)((function (e) {
                        h(Number(e.leaseType) === r.kj.hour ? "single" : "range")
                    })), function (e, t) {
                        var r;
                        return (0, i.SU)(f) && "range" === (0, i.SU)(n) ? ((0, l.wg)(), (0, l.iD)("view", {
                            key: 0,
                            class: (0, a.C_)((r = {}, (0, o.Z)(r, e.$style.barWrapper, !0), (0, o.Z)(r, e.$style.upward, "up" === e.direction), (0, o.Z)(r, e.$style.downward, "down" === e.direction), r))
                        }, [(0, l._)("text", null, " 当前已过0点，" + (0, a.zw)(y.value ? "已" : "可") + "选择凌晨6点前入住 ", 1)], 2)) : (0, l.kq)("", !0)
                    }
                }
            });
        const f = {$style: {barWrapper: "RxbQ4", upward: "jdEl_", downward: "lrRMa"}};
        var y = (0, n(403).Z)(h, [["__cssModules", f]])
    }, 66741: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return g
            }
        });
        var o = n(86003), l = n(36238), i = n(84298), a = {key: 0, class: "nav-title"}, r = {class: "custom_body"};
        var s = n(96949), c = n(18030), u = n(55924), p = n(27560), d = n(31121), h = n.n(d), f = {
            name: "Custom",
            components: {BdwArrowBack: o.Z},
            props: {
                arrowBackType: {type: String, default: "arrowBlack"},
                isBack: {type: Boolean, default: !0},
                returnType: {type: String, default: "back"},
                needBackIcon: {type: Boolean, default: !0},
                noBackSlot: {type: Boolean, default: !1},
                globalFixed: {type: Boolean, default: !0},
                round: {type: Boolean, default: !1},
                bgColor: {type: String, default: "#fff"},
                seatColor: {type: String, default: "#efefef"},
                bgImage: {type: String, default: ""},
                fontColor: {type: String, default: "#000"},
                heightSize: {type: String, default: ""},
                showBody: {type: Boolean, default: !1},
                needSeat: {type: Boolean, default: !0},
                backLastPage: {type: Boolean, default: !0},
                titlePosition: {type: String, default: "center"},
                navTitle: {type: String, default: ""},
                needBottomLine: {type: Boolean, default: !1},
                showOverflow: {type: Boolean, default: !1}
            },
            emits: ["back"],
            data: function () {
                return {isAlipay: p.Nc}
            },
            computed: (0, s.Z)((0, s.Z)({}, (0, u.rn)(c.m2, {
                customBar: function (e) {
                    return e.titleBarInfo.customBar
                }, statusBar: function (e) {
                    return e.titleBarInfo.statusBar
                }, alipayBackIconRight: function (e) {
                    return e.alipayBackIconRight < 30 ? 36 : e.alipayBackIconRight
                }, right: function (e) {
                    return p.Nc && e.alipayMenuLeft ? "calc(100vw - ".concat(e.alipayMenuLeft, "px + 10px)") : "220rpx"
                }
            })), {}, {
                contentAreaStyle: function () {
                    return this.titlePosition ? {textAlign: "center"} : {textAlign: "left", paddingLeft: "80rpx"}
                }
            }),
            created: function () {
                var e, t;
                null === (e = h().hideHomeButton) || void 0 === e || e.call(h()), null === (t = h().hideBackHome) || void 0 === t || t.call(h())
            },
            methods: {
                goBack: function () {
                    this.backLastPage ? this.$globalGoBack() : this.$emit("back")
                }
            }
        };
        const y = {$style: {custom_bar: "QlyI4"}};
        var g = (0, n(403).Z)(f, [["render", function (e, t, n, s, c, u) {
            var p = o.Z;
            return (0, l.wg)(), (0, l.iD)("view", {class: (0, i.C_)(e.$style.custom_bar)}, [n.needSeat ? ((0, l.wg)(), (0, l.iD)("view", {
                key: 0,
                style: (0, i.j5)({
                    height: n.heightSize ? n.heightSize : e.customBar + "px",
                    background: n.seatColor
                })
            }, null, 4)) : (0, l.kq)("", !0), (0, l._)("view", {
                class: (0, i.C_)(["custom", {
                    is_fixed: n.globalFixed,
                    round: n.round,
                    bottom_line: n.needBottomLine
                }]),
                style: (0, i.j5)({
                    height: n.heightSize ? n.heightSize : e.customBar + "px",
                    paddingTop: e.statusBar + "px",
                    backgroundColor: n.bgColor,
                    backgroundImage: n.bgImage,
                    color: n.fontColor
                })
            }, [n.isBack ? ((0, l.wg)(), (0, l.iD)("view", {
                key: 0,
                class: "custom_bar_back",
                style: (0, i.j5)({
                    height: e.customBar - e.statusBar + "px",
                    top: e.statusBar + "px",
                    left: c.isAlipay ? e.alipayBackIconRight + "px" : "home" === n.returnType ? "28rpx" : "16rpx",
                    right: n.noBackSlot ? "" : e.right,
                    overflow: n.showOverflow ? "visible" : "hidden"
                })
            }, [!c.isAlipay && n.needBackIcon ? ((0, l.wg)(), (0, l.j4)(p, {
                key: 0,
                type: n.arrowBackType,
                "return-type": n.returnType,
                style: (0, i.j5)({
                    fontWeight: 600,
                    zIndex: 9,
                    display: "inline-block",
                    lineHeight: e.customBar - e.statusBar + "px"
                }),
                onTap: u.goBack
            }, null, 8, ["type", "return-type", "style", "onTap"])) : (0, l.kq)("", !0), n.noBackSlot ? (0, l.kq)("", !0) : (0, l.WI)(e.$slots, "back", {key: 1})], 4)) : (0, l.kq)("", !0), (0, l._)("view", {
                class: "content",
                style: (0, i.j5)({height: e.customBar + "px", paddingTop: e.statusBar + "px"})
            }, [(0, l._)("view", {
                class: "content-area",
                style: (0, i.j5)(u.contentAreaStyle)
            }, [n.navTitle ? ((0, l.wg)(), (0, l.iD)("view", a, (0, i.zw)(n.navTitle), 1)) : (0, l.WI)(e.$slots, "content", {key: 1})], 4)], 4), (0, l._)("view", r, [(0, l.WI)(e.$slots, "body")])], 6)], 2)
        }], ["__cssModules", y]])
    }, 72565: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return m
            }
        });
        var o = n(12663), l = n(13283), i = n(36238), a = n(84298), r = n(31121), s = n.n(r), c = n(18030),
            u = n(51997), p = n(61344), d = n(89013), h = n(60779), f = (0, i._)("text", null, "折", -1),
            y = (0, i.aZ)({
                __name: "index",
                props: {show: {type: Boolean, default: !1}, from: {default: ""}},
                emits: ["update:show", "onClose", "getCardComplete"],
                setup: function (e, t) {
                    var n = t.emit, r = e;
                    (0, i.YP)((function () {
                        return r.show
                    }), (function () {
                        r.show && s().TrackSDK.pageView({pageType_var: "我的", pageName_var: "实名认证弹窗"})
                    }));
                    var y = (0, i.Fl)((function () {
                        return (0, c.LM)().state.popCardData
                    })), g = function () {
                        n("update:show", !1)
                    }, m = function () {
                        var e = (0, l.Z)((0, o.Z)().mark((function e() {
                            var t, l, i, a;
                            return (0, o.Z)().wrap((function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        if (0 !== y.value.openFlag) {
                                            e.next = 5;
                                            break
                                        }
                                        return t = {
                                            cardId: y.value.cardId,
                                            channelType: "1",
                                            platformType: "5",
                                            carInviterUserId: y.value.carInviterUserId
                                        }, "codeCheck" === r.from && (t.salesId = (0, c.Zi)().getSalesInfo().salesId, t.orderSaleChannel = 1), e.next = 5, (0, d.mC)(t);
                                    case 5:
                                        if ("codeCheck" !== r.from) {
                                            e.next = 9;
                                            break
                                        }
                                        s().showToast({
                                            title: "领取成功",
                                            icon: "none",
                                            duration: 2e3
                                        }), e.next = 16;
                                        break;
                                    case 9:
                                        if (l = y.value.cardId, y.value.cardId) {
                                            e.next = 15;
                                            break
                                        }
                                        return e.next = 13, (0, d.EA)();
                                    case 13:
                                        a = e.sent, l = null !== (i = a.cardId) && void 0 !== i ? i : "";
                                    case 15:
                                        (0, h.C4)("/#/enterprise-card?cardId=".concat(l, "&screen=full"), !1);
                                    case 16:
                                        n("getCardComplete"), g();
                                    case 18:
                                    case"end":
                                        return e.stop()
                                }
                            }), e)
                        })));
                        return function () {
                            return e.apply(this, arguments)
                        }
                    }();
                    return function (e, t) {
                        return (0, i.wg)(), (0, i.j4)(u.default, {
                            class: (0, a.C_)(e.$style.overlay),
                            show: e.show,
                            "close-on-click-overlay": !0,
                            duration: 0,
                            onClick: g
                        }, {
                            default: (0, i.w5)((function () {
                                return [(0, i._)("view", {class: (0, a.C_)(e.$style.popup)}, [(0, i._)("view", {class: (0, a.C_)(e.$style.card_info)}, [(0, i.Wm)(p.Z, {
                                    class: (0, a.C_)(e.$style.img),
                                    src: y.value.popCardImg
                                }, null, 8, ["class", "src"])], 2), (0, i._)("view", {class: (0, a.C_)(e.$style.bttomCon)}, [(0, i._)("view", {class: (0, a.C_)(e.$style.desc)}, [(0, i._)("text", null, " 领取专属" + (0, a.zw)(y.value.companyCardTypeName) + " ，享订房 ", 1), (0, i._)("text", {class: (0, a.C_)(e.$style.bold)}, (0, a.zw)(y.value.discount), 3), f], 2), (0, i._)("view", {
                                    class: (0, a.C_)(e.$style.btn),
                                    onTap: m
                                }, "立即领取", 34)], 2)], 2)]
                            })), _: 1
                        }, 8, ["class", "show"])
                    }
                }
            });
        const g = {
            $style: {
                overlay: "Z0X5U",
                popup: "iz4Pd",
                card_info: "pi86X",
                img: "hamt3",
                companyname: "sczWS",
                bttomCon: "cCV2U",
                title: "dSMwo",
                desc: "VQiEu",
                bold: "n3FVp",
                btn: "VxpBE"
            }
        };
        var m = (0, n(403).Z)(y, [["__cssModules", g]])
    }, 86003: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return p
            }
        });
        var o = n(61344), l = n(1902), i = n(36238), a = n(84298), r = n(41530), s = n(27560), c = (0, i.aZ)({
            __name: "BdwArrowBack",
            props: {type: {default: "white"}, returnType: {default: "back"}},
            setup: function (e) {
                var t = {
                    white: "arrowback_line_32_white_1-1.png",
                    black: "arrowback_line_32_black_1-1.png",
                    grey: "arrowback_line_32_grey_1-1.png",
                    fillCircleWhite: "arrowback_fillcircle_32_white_1-1.png",
                    homeBlack: "arrowhome_line_24_back_1-1.png",
                    arrowBlack: "arrowback_head_32_black_1-1.png",
                    arrowWhite: "arrowback_head_32_white_1-1.png"
                };
                return function (e, n) {
                    var c, u = o.Z;
                    return (0, i.wg)(), (0, i.j4)(u, {
                        class: (0, a.C_)((c = {}, (0, l.Z)(c, e.$style.back, "back" === e.returnType), (0, l.Z)(c, e.$style.home, "home" === e.returnType), c)),
                        "scale-x": 500,
                        src: "".concat((0, r.SU)(s.Um), "/common/arrow/").concat(t[e.type])
                    }, null, 8, ["class", "src"])
                }
            }
        });
        const u = {$style: {back: "YzTNZ", home: "fJpqr"}};
        var p = (0, n(403).Z)(c, [["__cssModules", u]])
    }, 31022: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var o = n(61344), l = n(36238), i = n(84298), a = n(41530), r = n(27560), s = (0, l.aZ)({
            __name: "BdwArrowLine",
            props: {size: {default: "small"}, type: {default: "white"}},
            setup: function (e) {
                var t = {
                    white_small: "small_16_white_1-2.png",
                    yellow_small: "small_16_ffdba`3_1-2.png",
                    orange_small: "small_16_orange_1-2.png",
                    blue_small: "small_16_007aff_1-2.png",
                    newGray_small: "small_16_80808f_1-1.png",
                    gray_small: "small_16_848494_1-2.png",
                    gray89_small: "small_16_898989_1-1.png",
                    red_small: "small_16_b62a36.png",
                    black_small: "small_16_000028_1-2.png",
                    white_medium: "medium_16_white_1-3.png",
                    orange_medium: "medium_16_d2642d_1-1.png",
                    gray_medium: "medium_16_848494_1-3.png"
                };
                return function (e, n) {
                    var s = o.Z;
                    return (0, l.wg)(), (0, l.j4)(s, {
                        class: (0, i.C_)(e.$style.line),
                        "scale-x": 500,
                        src: "".concat((0, a.SU)(r.Um), "/common/arrow/arrowline_").concat(t[e.type + "_" + e.size])
                    }, null, 8, ["class", "src"])
                }
            }
        });
        const c = {$style: {line: "e_UC1"}};
        var u = (0, n(403).Z)(s, [["__cssModules", c]])
    }, 74772: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var o = n(61344), l = n(36238), i = n(84298), a = n(41530), r = n(27560), s = (0, l.aZ)({
            __name: "BdwClose",
            props: {size: {default: "large"}, type: {default: "white"}},
            setup: function (e) {
                var t = {
                    fillCircleBlack_large: "fillcircle_32_000028_2.png",
                    fillCircleGray_large: "fillcircle_32_6c6c6c_1.png",
                    fillCircleGray_small: "fillcircle_16_grey_1.png",
                    gray_large: "line_32_848494_2.png",
                    gray_medium: "line_48_848494_1.png",
                    white_large: "line_32_white_2.png",
                    white_small: "line_16_white_2.png",
                    gray_small: "line_16_848494_2.png",
                    largeWhite_large: "large_32_white_2.png",
                    lineCircleWhite_big: "linecircle_28_white_2.png"
                };
                return function (e, n) {
                    var s = o.Z;
                    return (0, l.wg)(), (0, l.j4)(s, {
                        class: (0, i.C_)(e.$style[e.size]),
                        "scale-x": 500,
                        src: "".concat((0, a.SU)(r.Um), "/common/close/close_").concat(t[e.type + "_" + e.size])
                    }, null, 8, ["class", "src"])
                }
            }
        });
        const c = {$style: {large: "ASr07", small: "VGIAK", big: "tiMVc", medium: "Ion4d"}};
        var u = (0, n(403).Z)(s, [["__cssModules", c]])
    }, 92242: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return u
            }
        });
        var o = n(61344), l = n(36238), i = n(84298), a = n(41530), r = n(27560), s = (0, l.aZ)({
            __name: "BdwQuestion",
            props: {size: {default: "small"}, type: {default: "white"}},
            setup: function (e) {
                var t = {
                    tipBlack_small: "questiontip_small_16_000028_6.png",
                    tipGray_small: "questiontip_small_16_999999_6.png",
                    tipOrange_small: "questiontip_small_16_orange_6.png",
                    tipRed_medium: "questiontip_medium_20_e64d4d_1.png",
                    white_large: "question_large_28_white_6.png",
                    black_large: "question_large_32_black_6.png",
                    white_medium: "question_medium_16_white_6.png",
                    gray_medium: "question_medium_16_848494_6.png",
                    grayLight_medium: "question_medium_16_898989.png",
                    black_medium: "question_medium_16_000028_6.png",
                    orange_medium: "question_medium_16_d2642d_6.png",
                    white_small: "question_small_16_white_6.png",
                    black_small: "question_small_16_000028_6.png",
                    green_tiny: "question_tiny_12_green_1.png"
                };
                return function (e, n) {
                    var s = o.Z;
                    return (0, l.wg)(), (0, l.j4)(s, {
                        class: (0, i.C_)(e.$style[e.size]),
                        "scale-x": 500,
                        src: "".concat((0, a.SU)(r.Um), "/common/question/").concat(t[e.type + "_" + e.size])
                    }, null, 8, ["class", "src"])
                }
            }
        });
        const c = {$style: {large: "KtQkK", medium: "xfd9m", small: "DE3IG"}};
        var u = (0, n(403).Z)(s, [["__cssModules", c]])
    }, 81730: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return D
            }
        });
        var o = n(19680), l = n(1902), i = n(36238), a = n(84298), r = n(64226), s = (0, i._)("image", {
                class: "logo_icon",
                src: "https://img.betterwood.com/minapp/common/logo/logo_en.png"
            }, null, -1), c = (0, i._)("view", {class: "bigtitle"}, "欢迎加入百达屋", -1),
            u = (0, i._)("view", {class: "subtitle"}, "加入后享会员专属权益", -1), p = ["scope", "open-type"],
            d = {key: 0, class: "tip"}, h = {key: 0, class: "no_choose_icon"}, f = {
                key: 1,
                class: "choose_icon",
                src: "https://img.betterwood.com/minapp/common/select/selectconfirm_orange.png"
            }, y = (0, i._)("view", {class: "text"}, "我已阅读并同意", -1),
            g = (0, i._)("view", {class: "text"}, "和", -1);
        var m = n(31121), _ = n.n(m), v = n(60779), w = n(27560), k = {
            name: "TheLoginRole",
            props: {show: {type: Boolean, default: !1}, closeOnClickOverlay: {type: Boolean, default: !0}},
            emits: ["login", "close", "update:show", "checkAuth"],
            data: function () {
                return {checked: !1, isAliPay: w.Nc, showShake: !1, timer: null, showTip: !1}
            },
            watch: {
                show: {
                    handler: function (e) {
                        var t = this;
                        try {
                            e ? this.timer = setTimeout((function () {
                                t.showTip = !0
                            }), 2e3) : (this.showTip = !1, this.checked = !1)
                        } catch (e) {
                        }
                    }
                }, checked: {
                    handler: function (e) {
                        var t = this;
                        e ? (clearTimeout(this.timer), this.showTip = !1) : this.timer = setTimeout((function () {
                            t.showTip = !0
                        }), 2e3)
                    }
                }
            },
            methods: {
                toCheckAuth: function () {
                    this.checked = !this.checked, this.$emit("checkAuth", this.checked)
                }, lookPrivacy: function () {
                    (0, v.C4)("/#/privacy", !1)
                }, lookClause: function () {
                    (0, v.C4)("/#/service", !1)
                }, toLogin: function () {
                    var e = this;
                    this.checked || (this.showShake = !0, setTimeout((function () {
                        e.showShake = !1
                    }), 1e3))
                }, onClose: function () {
                    this.$emit("close"), this.$emit("update:show", !1)
                }, onConfirm: function (e) {
                    var t = this;
                    if (this.isAliPay) if (e.detail) {
                        var n = {encryptedData: e.detail.encryptedData, sign: e.detail.sign};
                        this.$emit("getPhoneSuccess", n)
                    } else _().showToast({
                        title: "授权手机号失败，请重试",
                        icon: "none",
                        duration: 2e3,
                        complete: function () {
                            t.$emit("close")
                        }
                    }); else if ("getPhoneNumber:ok" === e.detail.errMsg) {
                        var o = {encryptedData: e.detail.encryptedData, iv: e.detail.iv};
                        this.$emit("getPhoneSuccess", o)
                    } else "getPhoneNumber:fail user deny" === e.detail.errMsg ? this.$emit("close") : _().showToast({
                        title: "授权手机号失败，请重试",
                        icon: "none",
                        duration: 2e3,
                        complete: function () {
                            t.$emit("close")
                        }
                    })
                }
            }
        }, b = n(403);
        const C = {$style: {popup: "drb15", xShake: "UxAq2", "x-shake": "phcMe"}};
        var S = (0, b.Z)(k, [["render", function (e, t, n, m, _, v) {
            var w = o.default;
            return (0, i.wg)(), (0, i.j4)(w, {
                show: n.show,
                round: "",
                onClose: v.onClose,
                "close-on-click-overlay": n.closeOnClickOverlay,
                position: "bottom",
                "pop-class": e.$style.popup
            }, {
                default: (0, i.w5)((function () {
                    return [s, c, u, (0, i._)("button", {
                        class: "login_btn",
                        onClick: t[0] || (t[0] = function () {
                            return v.toLogin && v.toLogin.apply(v, arguments)
                        }),
                        "on:getPhoneNumber": t[1] || (t[1] = function () {
                            return v.onConfirm && v.onConfirm.apply(v, arguments)
                        }),
                        scope: _.checked && _.isAliPay ? "phoneNumber" : "",
                        "open-type": _.checked ? e.isAlipay ? "getAuthorize" : "getPhoneNumber" : ""
                    }, " 手机号快捷登录 ", 40, p), (0, i._)("view", {
                        class: "jump",
                        onClick: t[2] || (t[2] = function () {
                            return v.onClose && v.onClose.apply(v, arguments)
                        })
                    }, "暂时跳过"), (0, i._)("view", {
                        class: "user_auth", onClick: t[5] || (t[5] = function () {
                            return v.toCheckAuth && v.toCheckAuth.apply(v, arguments)
                        })
                    }, [_.showTip ? ((0, i.wg)(), (0, i.iD)("view", d, "请阅读并同意协议")) : (0, i.kq)("", !0), (0, i._)("view", {class: (0, a.C_)(["text-line", (0, l.Z)({}, e.$style.xShake, _.showShake)])}, [_.checked ? ((0, i.wg)(), (0, i.iD)("image", f)) : ((0, i.wg)(), (0, i.iD)("view", h)), y, (0, i._)("view", {
                        class: "text high_light",
                        onTap: t[3] || (t[3] = (0, r.iM)((function () {
                            return v.lookPrivacy && v.lookPrivacy.apply(v, arguments)
                        }), ["stop"]))
                    }, " 《隐私政策》 ", 32), g, (0, i._)("view", {
                        class: "text high_light",
                        onTap: t[4] || (t[4] = (0, r.iM)((function () {
                            return v.lookClause && v.lookClause.apply(v, arguments)
                        }), ["stop"]))
                    }, "《服务条款》", 32)], 2)])]
                })), _: 1
            }, 8, ["show", "onClose", "close-on-click-overlay", "pop-class"])
        }], ["__cssModules", C]]);
        var $ = n(12663), T = n(13283), x = n(95501), B = n(18030), Z = {
            name: "MyLogin",
            components: {TheLoginRole: S},
            props: {
                needLogin: {type: Boolean, required: !0, default: !1},
                isWalkIn: {type: Boolean, default: !1},
                channel: {type: String, default: ""},
                activitySource: {type: String, default: ""},
                sourceType: {type: String, default: ""},
                salesInfo: {
                    type: Object, default: function () {
                    }
                },
                jumpHotelFlag: {type: Boolean, default: !1},
                canShowModal: {type: Boolean, default: !0},
                closeOnClickOverlay: {type: Boolean, default: !0},
                closeOnAsync: {type: Boolean, default: !0}
            },
            emits: ["loginStatus", "close", "update:needLogin", "showRole"],
            expose: ["getPhone", "toLogin", "wxLogin"],
            data: function () {
                return {rawData: "", signature: "", userInfo: null, showRole: !1, hasAddVip: !1, show: !1}
            },
            watch: {
                needLogin: {
                    handler: function (e) {
                        e && this.wxLogin()
                    }, immediate: !0
                }, showRole: {
                    handler: function (e) {
                        var t = this;
                        if (e) (0, B.Rq)().setHasTabbar(!1), this.$emit("showRole", !0), setTimeout((function () {
                            t.show = !0
                        }), 100); else {
                            this.show = !1;
                            var n = setTimeout((function () {
                                clearTimeout(n), (0, B.Rq)().setHasTabbar(!0)
                            }), 100)
                        }
                    }
                }, show: {
                    handler: function (e) {
                        var t = this;
                        e || setTimeout((function () {
                            t.showRole = !1
                        }), 100)
                    }
                }
            },
            methods: {
                cancelAuth: function () {
                    var e = this;
                    if (this.closeOnAsync) var t = setTimeout((function () {
                        e.$emit("close"), clearTimeout(t)
                    }), 500); else this.$emit("close")
                }, wxLogin: function () {
                    var e = this;
                    (0, x.a)((function (t) {
                        e.$emit("loginStatus", t)
                    }), {showToast: !0, jumpHotelFlag: this.jumpHotelFlag}, this).wxLogin(!1)
                }, toLogin: function () {
                    var e = this;
                    return (0, T.Z)((0, $.Z)().mark((function t() {
                        return (0, $.Z)().wrap((function (t) {
                            for (; ;) switch (t.prev = t.next) {
                                case 0:
                                    return t.abrupt("return", new Promise((function (t) {
                                        e.showRole = !0, t(!0)
                                    })));
                                case 1:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                }, getPhone: function (e) {
                    var t = this;
                    w.Nc && (this.signature = e.sign), this.showRole = !1, (0, x.a)((function (e) {
                        t.$emit("loginStatus", e)
                    }), {showToast: !0, jumpHotelFlag: this.jumpHotelFlag}, this).addVipInfo(e)
                }
            }
        };
        const z = {$style: {login: "LdyvE"}};
        var D = (0, b.Z)(Z, [["render", function (e, t, n, o, l, r) {
            var s = S;
            return n.canShowModal ? ((0, i.wg)(), (0, i.iD)("view", {
                key: 0,
                class: (0, a.C_)(e.$style.login)
            }, [l.showRole ? ((0, i.wg)(), (0, i.j4)(s, {
                key: 0,
                show: l.show,
                "onUpdate:show": t[0] || (t[0] = function (e) {
                    return l.show = e
                }),
                "close-on-click-overlay": n.closeOnClickOverlay,
                onCheckAuth: r.toLogin,
                onClose: r.cancelAuth,
                onGetPhoneSuccess: r.getPhone
            }, null, 8, ["show", "close-on-click-overlay", "onCheckAuth", "onClose", "onGetPhoneSuccess"])) : (0, i.kq)("", !0)], 2)) : (0, i.kq)("", !0)
        }], ["__cssModules", z]])
    }, 59804: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return $
            }
        });
        var o = n(82690), l = n(36238), i = n(84298), a = n(64226), r = n(41530), s = ["current"], c = (0, l.aZ)({
            __name: "SwiperDot", props: {brandCurrent: {default: 0}, listLen: {default: 6}}, setup: function (e) {
                var t = e, n = (0, r.iH)(0), c = (0, r.iH)((0, o.Z)(Array(8).keys())),
                    u = ["scale_hide", "scale_small", "scale_medium", "active", "normal", "scale_medium", "scale_small", "scale_hide"],
                    p = ["scale_hide", "scale_small", "scale_medium", "normal", "active", "scale_medium", "scale_small", "scale_hide"],
                    d = (0, r.iH)([].concat(u));
                (0, l.YP)((function () {
                    return t.brandCurrent
                }), (function (e, n) {
                    var o = e - n;
                    return 0 === e && n === t.listLen - 1 ? (d.value = [].concat(p), void y()) : 0 === n && e === t.listLen - 1 ? (d.value = [].concat(u), void g()) : void (o > 0 ? (d.value = [].concat(p), y()) : (d.value = [].concat(u), g()))
                }));
                var h = (0, l.Fl)((function () {
                    return f(d.value, n.value)
                })), f = function (e, t) {
                    var n = t % e.length;
                    return e.slice(-n).concat(e.slice(0, -n))
                }, y = function () {
                    n.value !== c.value.length - 1 ? n.value++ : n.value = 0
                }, g = function () {
                    0 !== n.value ? n.value-- : n.value = c.value.length - 1
                };
                return function (e, t) {
                    return (0, l.wg)(), (0, l.iD)("view", {
                        class: (0, i.C_)(e.$style.swiper_dot),
                        onTouchmove: t[0] || (t[0] = (0, a.iM)((function () {
                        }), ["stop"]))
                    }, [(0, l._)("swiper", {
                        class: "dot_swiper",
                        autoplay: !1,
                        circular: !0,
                        current: n.value
                    }, [((0, l.wg)(!0), (0, l.iD)(l.HY, null, (0, l.Ko)(c.value, (function (e, t) {
                        return (0, l.wg)(), (0, l.iD)("swiper-item", {
                            class: "dot_item",
                            key: t
                        }, [(0, l._)("view", {class: (0, i.C_)(["dot", [h.value[t]]])}, null, 2)])
                    })), 128))], 8, s)], 34)
                }
            }
        }), u = n(403);
        const p = {$style: {swiper_dot: "Zkttl"}};
        var d = (0, u.Z)(c, [["__cssModules", p]]), h = n(66612),
            f = ["autoplay", "current", "interval", "circular"], y = ["onClick"], g = ["src"],
            m = {key: 0, class: "shadow"}, _ = {key: 1}, v = {key: 1}, w = {class: "swiper_length"},
            k = (0, l._)("image", {class: "tag-photo", src: h}, null, -1);
        var b = n(4281), C = {
            name: "MySwiper",
            components: {SwiperDot: d},
            props: {
                needSlot: {type: Boolean, default: !1},
                images: {
                    type: Array, default: function () {
                        return []
                    }
                },
                customStyle: {type: String, default: ""},
                swiperHeight: {type: String, default: "914rpx"},
                swiperWidth: {type: String, default: "100vw"},
                current: {type: Number, default: 0},
                circular: {type: Boolean, default: !0},
                interval: {type: Number, default: 3e3},
                radius: {type: String, default: ""},
                isAuto: {type: Boolean, default: !0},
                showDots: {type: Boolean, default: !0},
                showLength: {type: Boolean, default: !1},
                dotPosition: {type: String, default: "center"},
                dotPadding: {type: String, default: "24rpx"},
                bottomLength: {type: String, default: "40rpx"},
                dotSize: {
                    type: String,
                    default: "width: 20rpx; height: 20rpx;margin-right: 14rpx;background-color: #999;border-radius: 100%;"
                },
                activeDotSize: {
                    type: String,
                    default: "width: 40rpx;height: 20rpx;margin-right: 14rpx;background-color: #fff;border-radius: 72rpx;"
                },
                isNeedScale: {type: Boolean, default: !1},
                showShadow: {type: Boolean, default: !1},
                showStyleDots: {type: Boolean, default: !1}
            },
            data: function () {
                return {defaultDot: 0}
            },
            methods: {
                tinyUrl: b.l, clickSwiperItem: function (e) {
                    this.$emit("clickSwiperItem", e)
                }, swiperChange: function (e) {
                    this.defaultDot = e.detail.current, this.$emit("update:current", e.detail.current), this.$emit("swiperChange", e.detail.current)
                }
            }
        };
        const S = {$style: {my_swiper: "qhzeX"}};
        var $ = (0, u.Z)(C, [["render", function (e, t, n, o, a, r) {
            var s = d;
            return (0, l.wg)(), (0, l.iD)("custom-wrapper", null, [(0, l._)("view", {
                class: (0, i.C_)(e.$style.my_swiper),
                style: (0, i.j5)({
                    boxSizing: "border-box",
                    margin: "0 auto",
                    width: n.swiperWidth,
                    height: n.swiperHeight
                })
            }, [(0, l._)("swiper", {
                autoplay: n.isAuto,
                current: n.current,
                interval: n.interval,
                circular: n.circular,
                style: (0, i.j5)(n.customStyle),
                class: "swiper_wrap",
                onChange: t[0] || (t[0] = function () {
                    return r.swiperChange && r.swiperChange.apply(r, arguments)
                })
            }, [((0, l.wg)(!0), (0, l.iD)(l.HY, null, (0, l.Ko)(n.images, (function (t, o) {
                return (0, l.wg)(), (0, l.iD)("swiper-item", {
                    key: o,
                    class: "swiper_item"
                }, [(0, l._)("view", {
                    style: {height: "100%"}, onClick: function (e) {
                        return r.clickSwiperItem(o)
                    }
                }, [n.needSlot ? (0, l.WI)(e.$slots, "item", {
                    key: 0,
                    data: t
                }) : ((0, l.wg)(), (0, l.iD)("image", {
                    key: 1,
                    style: (0, i.j5)({borderRadius: n.radius}),
                    class: (0, i.C_)([{"scale-swiper": n.isNeedScale && 0 === o}, "item_img"]),
                    src: r.tinyUrl((null == t ? void 0 : t.split("?")[0]) || "", {width: void 0}),
                    "scale-x": 750,
                    mode: "aspectFill",
                    "lazy-load": !1,
                    "fade-in": !0,
                    webp: !0
                }, null, 14, g))], 8, y), n.showShadow ? ((0, l.wg)(), (0, l.iD)("view", m)) : (0, l.kq)("", !0)])
            })), 128))], 44, f), n.showDots ? ((0, l.wg)(), (0, l.iD)("view", {
                key: 0,
                class: (0, i.C_)(["swiper_dots", [n.dotPosition]]),
                style: (0, i.j5)({
                    paddingLeft: "left" === n.dotPosition ? n.dotPadding : "0",
                    paddingRight: "right" === n.dotPosition ? n.dotPadding : "0",
                    bottom: n.bottomLength
                })
            }, [(0, l.WI)(e.$slots, "dot", {images: n.images, current: a.defaultDot}, (function () {
                return [n.showStyleDots ? ((0, l.wg)(), (0, l.j4)(s, {
                    key: 0,
                    "brand-current": a.defaultDot,
                    "list-len": n.images.length
                }, null, 8, ["brand-current", "list-len"])) : ((0, l.wg)(), (0, l.iD)("block", _, [((0, l.wg)(!0), (0, l.iD)(l.HY, null, (0, l.Ko)(n.images, (function (e, t) {
                    return (0, l.wg)(), (0, l.iD)("block", {key: t}, [(0, l._)("view", {
                        class: "swiper_dot",
                        style: (0, i.j5)(a.defaultDot === t ? n.activeDotSize : n.dotSize)
                    }, null, 4)])
                })), 128))]))]
            }))], 6)) : (0, l.kq)("", !0), n.showLength && n.images.length ? ((0, l.wg)(), (0, l.iD)("view", v, [(0, l.WI)(e.$slots, "count", {
                length: n.images.length,
                index: n.current
            }, (function () {
                return [(0, l._)("view", w, [k, (0, l.Uk)(" " + (0, i.zw)(n.images.length), 1)])]
            }))])) : (0, l.kq)("", !0)], 6)])
        }], ["__cssModules", S]])
    }, 11836: function (e, t, n) {
        n.d(t, {
            Z: function () {
                return f
            }
        });
        var o = n(36238), l = n(84298), i = n(41530), a = n(31121), r = n.n(a), s = n(51997), c = n(61344),
            u = n(27560), p = n(74772), d = (0, o.aZ)({
                __name: "AuthPop",
                props: {show: {type: Boolean, default: !1}},
                emits: ["update:show"],
                setup: function (e, t) {
                    var n = t.emit, a = e;
                    (0, o.YP)((function () {
                        return a.show
                    }), (function () {
                        a.show && r().TrackSDK.pageView({pageType_var: "我的", pageName_var: "实名认证弹窗"})
                    }));
                    var d = function () {
                        n("update:show", !1)
                    }, h = function () {
                        d(), r().TrackSDK.track("pageClick", {
                            pageName_var: "实名认证弹窗",
                            pageType_var: "实名认证弹窗",
                            moduleName_var: "实名弹窗",
                            modulePosition_var: 1,
                            pitName_var: "立即认证",
                            pitPosition_var: 1
                        }), r().navigateTo({url: "/modules/member/views/myInfo/certification?from=truename"})
                    };
                    return function (e, t) {
                        return (0, o.wg)(), (0, o.j4)(s.default, {
                            class: (0, l.C_)(e.$style.overlay),
                            show: e.show,
                            "close-on-click-overlay": !1,
                            duration: 0
                        }, {
                            default: (0, o.w5)((function () {
                                return [(0, o._)("view", {class: (0, l.C_)(e.$style.popup)}, [(0, o.Wm)(c.Z, {
                                    class: (0, l.C_)(e.$style.img),
                                    src: "".concat((0, i.SU)(u.Um), "/business/mine/auth_img_2.png"),
                                    onTap: h
                                }, null, 8, ["class", "src"]), (0, o.Wm)(p.Z, {
                                    type: "lineCircleWhite",
                                    size: "big",
                                    onTap: d
                                })], 2)]
                            })), _: 1
                        }, 8, ["class", "show"])
                    }
                }
            });
        const h = {$style: {overlay: "pzEwb", popup: "vXnsK", img: "Guw0r"}};
        var f = (0, n(403).Z)(d, [["__cssModules", h]])
    }
}]);
