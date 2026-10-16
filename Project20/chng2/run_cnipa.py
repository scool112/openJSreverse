# -*- coding: utf-8 -*-
import ctypes
import json
import os
import sys
import threading
import time

sys.stdout.reconfigure(line_buffering=True)

SITE_URL    = "http://epub.cnipa.gov.cn/"
KW_INDEX    = "/Dxb/IndexQuery"
KW_PAGE     = "/Dxb/PageQuery"
OUT_FILE    = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cnipa_pagequery_result.html")

TEST_DIR = os.path.dirname(os.path.abspath(__file__))
DLL_PATH = os.path.join(os.path.dirname(TEST_DIR), "mb132_x64.dll")
os.add_dll_directory(os.path.dirname(DLL_PATH))
os.chdir(os.path.dirname(DLL_PATH))

lib = ctypes.WinDLL(DLL_PATH)

lib.mbInit.argtypes             = [ctypes.c_void_p]
lib.mbCreateWebWindow.argtypes  = [ctypes.c_int, ctypes.c_void_p, ctypes.c_int, ctypes.c_int, ctypes.c_int, ctypes.c_int]
lib.mbCreateWebWindow.restype   = ctypes.c_void_p
lib.mbShowWindow.argtypes       = [ctypes.c_void_p, ctypes.c_int]
lib.mbLoadURL.argtypes          = [ctypes.c_void_p, ctypes.c_char_p]
lib.mbOnTitleChanged.argtypes   = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p]
lib.mbOnLoadUrlBegin.argtypes   = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p]
lib.mbOnLoadUrlEnd.argtypes     = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p]
lib.mbNetHookRequest.argtypes   = [ctypes.c_void_p]
lib.mbWebFrameGetMainFrame.argtypes = [ctypes.c_void_p]
lib.mbWebFrameGetMainFrame.restype  = ctypes.c_void_p
lib.mbRunJs.argtypes            = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_char_p, ctypes.c_int,
                                   ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p]
lib.mbRunMessageLoop.argtypes   = []
lib.mbFireMouseEvent.argtypes   = [ctypes.c_void_p, ctypes.c_uint, ctypes.c_int, ctypes.c_int, ctypes.c_uint]
lib.mbFireMouseEvent.restype    = ctypes.c_int
lib.mbOnJsQuery.argtypes        = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p]
lib.mbResponseQuery.argtypes    = [ctypes.c_void_p, ctypes.c_int64, ctypes.c_int, ctypes.c_char_p]

TITLE_CB   = ctypes.WINFUNCTYPE(None, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_char_p)
LOADURL_CB = ctypes.WINFUNCTYPE(ctypes.c_int, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_char_p, ctypes.c_void_p)
LOADEND_CB = ctypes.WINFUNCTYPE(None, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_char_p,
                                ctypes.c_void_p, ctypes.c_void_p, ctypes.c_int)
JSQ_CB     = ctypes.WINFUNCTYPE(None, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p,
                                ctypes.c_int64, ctypes.c_int, ctypes.c_char_p)

state = {"form_sent": False, "watcher_sent": False}

def _on_jsq(web_view, param, es, query_id, custom_msg, request):
    try:
        d = json.loads(request.decode("utf-8"))
    except Exception:
        lib.mbResponseQuery(web_view, query_id, 0, b"ok")
        return
    x = int(d.get("x", 0)); y = int(d.get("y", 0))
    if d.get("down"):
        lib.mbFireMouseEvent(web_view, 0x0201, x, y, 0x01)
    elif d.get("up"):
        lib.mbFireMouseEvent(web_view, 0x0202, x, y, 0)
    else:
        lib.mbFireMouseEvent(web_view, 0x0200, x, y, 0)
    lib.mbResponseQuery(web_view, query_id, 0, b"ok")

jsq_cb = JSQ_CB(_on_jsq)

# ---- JS①：首页表单提交器（已验证） ----
FORM_SUBMIT_JS = (
    "(function(){"
    "if(window.__formSent){return;} window.__formSent=1;"
    "var tries=0;"
    "(function wait(){"
    "tries++;"
    "var ti=document.querySelector('input[name=\"__RequestVerificationToken\"]');"
    "if(!ti){ if(tries<60){ setTimeout(wait,500); } else { document.title='ERR1|no-token'; } return; }"
    "setTimeout(function(){"
    "try{"
    "var f=document.createElement('form');"
    "f.method='POST'; f.action='/Dxb/IndexQuery'; f.style.display='none';"
    "function add(n,v){var i=document.createElement('input');i.type='hidden';i.name=n;i.value=v;f.appendChild(i);}"
    "add('indexSearchModel.searchStr','电子');"
    "add('indexSearchModel.fmgb','true'); add('indexSearchModel.fmsq','true');"
    "add('indexSearchModel.xxsq','true'); add('indexSearchModel.wgsq','true');"
    "add('__RequestVerificationToken', ti.value);"
    "add('indexSearchModel.fmgb','false'); add('indexSearchModel.fmsq','false');"
    "add('indexSearchModel.xxsq','false'); add('indexSearchModel.wgsq','false');"
    "document.body.appendChild(f); f.submit();"
    "}catch(e){ document.title='ERR1|'+e.message; }"
    "},1500);"
    "})();"
    "})()"
).encode("utf-8")

# ---- JS②：按钮重合轨迹 + 物理点击 + 单请求守卫 ----
WATCHER5_JS = r"""
(function(){
if(window.__tpw5){return;} window.__tpw5=1;

// 单请求守卫：包装 send 记录 PageQuery 是否已发出
var _origSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
    window.__pqFired = 1;
    return _origSend.apply(this, arguments);
};

var tries = 0;
(function waitFn() {
    tries++;
    var cands = [];
    function push(el) {
        if (!el || cands.length >= 6) return;
        var r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0 || r.width > 200 || r.height > 120) return;
        cands.push({ el: el,
                     x: Math.round(r.left + r.width / 2),
                     y: Math.round(r.top + r.height / 2),
                     txt: (el.textContent || '').trim().slice(0, 10) });
    }
    var box = document.querySelector('.topage');
    if (box) {
        var kids = box.querySelectorAll('a,span,div,li,b');
        for (var i = 0; i < kids.length; i++) {
            var tt = (kids[i].textContent || '').trim();
            if (/^\d+$/.test(tt) && tt !== '1') push(kids[i]);
        }
    }
    if (cands.length === 0) {
        var as = document.querySelectorAll('a,span,div');
        for (var i = 0; i < as.length; i++) {
            var oc = (as[i].getAttribute('onclick') || '');
            var hr = (as[i].getAttribute && as[i].getAttribute('href')) || '';
            if (/to_page\(\s*2\s*\)/.test(oc) || /to_page\(\s*2\s*\)/.test(hr)) push(as[i]);
        }
    }

    if (cands.length === 0) {
        if (tries > 60) {
            var box2 = document.querySelector('.topage');
            document.title = 'ERR2|无翻页控件|topage=' + (box2 ? ('存在,子元素' + box2.children.length) : '不存在');
            return;
        }
        setTimeout(waitFn, 500); return;
    }

    var t = cands[0];
    for (var i = 0; i < cands.length; i++) { if (cands[i].txt === '2') { t = cands[i]; break; } }
    var o = null;
    for (var i = 0; i < cands.length; i++) { if (cands[i] !== t) { o = cands[i]; break; } }

    // 先滚动入视口，再统一取坐标
    var rr0 = t.el.getBoundingClientRect();
    if (rr0.top < 0 || rr0.bottom > window.innerHeight)
        window.scrollTo(0, window.pageYOffset + rr0.top - 300);
    var rr = t.el.getBoundingClientRect();
    var c2 = [Math.round(rr.left + rr.width / 2), Math.round(rr.top + rr.height / 2)];
    var c1 = o ? [o.x, o.y] : [c2[0] - 130, c2[1] - 25];
    // 邻居坐标钳制到视口内
    if (c1[1] < 10 || c1[1] > window.innerHeight - 10) c1 = [c2[0] - 130, Math.max(60, c2[1] - 60)];

    document.title = 'LINKS|' + cands.length + '个|目标txt=' + t.txt + '|(' + c2[0] + ',' + c2[1] + ')';

    var x0 = 640, y0 = 420, pts = [];
    function seg(xa, ya, xb, yb, n) {
        for (var i = 1; i <= n; i++) {
            var t = i / n, e = (t < 0.5) ? (2 * t * t) : (1 - Math.pow(-2 * t + 2, 2) / 2);
            pts.push([Math.round(xa + (xb - xa) * e + (Math.random() - 0.5) * 7),
                      Math.round(ya + (yb - ya) * e + (Math.random() - 0.5) * 7)]);
        }
    }
    seg(x0, y0, c1[0], c1[1], 70);
    for (var i = 0; i < 12; i++) pts.push([c1[0], c1[1]]);
    seg(c1[0], c1[1], c2[0], c2[1], 45);
    for (var i = 0; i < 30; i++) pts.push([c2[0], c2[1]]);

    document.title = 'MOVE-START|' + pts.length + '点|途经(' + c1[0] + ',' + c1[1] + ')|目标(' + c2[0] + ',' + c2[1] + ')';

    var i = 0;
    var iv = setInterval(function() {
        if (i < pts.length) {
            window.mbQuery(1000 + i, JSON.stringify({ x: pts[i][0], y: pts[i][1] }), null);
            i++;
        } else {
            clearInterval(iv);
            window.mbQuery(1, JSON.stringify({ x: c2[0], y: c2[1], down: 1 }), null);
            setTimeout(function() {
                window.mbQuery(2, JSON.stringify({ x: c2[0], y: c2[1], up: 1 }), null);
                document.title = 'CLICK-SENT|txt=' + t.txt;
                // 单请求守卫：点击 3 秒内没产生 PageQuery 就用页面自己的 to_page(2) 补发
                setTimeout(function() {
                    if (!window.__pqFired) {
                        try { to_page(2); document.title = 'FALLBACK|to_page(2)已补发'; }
                        catch (e) { document.title = 'ERR2|' + e.message; }
                    }
                }, 3000);
            }, 120);
        }
    }, 16);
})();
})();
""".encode("utf-8")

def inject(web_view, js):
    fid = lib.mbWebFrameGetMainFrame(web_view)
    lib.mbRunJs(web_view, fid, js, 0, None, None, None)

@TITLE_CB
def on_title(web_view, param, title):
    t = title.decode("utf-8", "replace")
    print("[title]", t[:70])
    if not state["form_sent"] and t and t != "__pending__":
        state["form_sent"] = True
        print("[注入1] 首页就绪，提交检索表单...")
        inject(web_view, FORM_SUBMIT_JS)
    elif state["form_sent"] and not state["watcher_sent"] and t:
        state["watcher_sent"] = True
        print("[注入2] 结果页就绪，启动按钮重合轨迹...")
        inject(web_view, WATCHER5_JS)

@LOADURL_CB
def on_url_begin(web_view, param, url, job):
    u = url.decode("utf-8", "replace")
    if KW_PAGE in u or KW_INDEX in u:
        print("[请求]", u[:160])
        lib.mbNetHookRequest(job)
    return 0

@LOADEND_CB
def on_url_end(web_view, param, url, job, buf, length):
    u = url.decode("utf-8", "replace")
    if not (buf and length > 0):
        return
    body = ctypes.string_at(buf, length).decode("utf-8", "replace")

    if KW_INDEX in u:
        ok = "to_page" in body
        chal = ("$_ts" in body)
        print("[IndexQuery]", length, "字节 |",
              "结果页正常(含to_page)" if ok else ("挑战页!" if chal else "内容异常"))
        return

    if KW_PAGE in u:
        chal = ("$_ts" in body) or ("r='m'" in body)
        print("\n[PageQuery]", length, "字节 |", "被瑞数挑战!" if chal else "非挑战响应")
        if not chal and len(body) > 500:
            with open(OUT_FILE, "w", encoding="utf-8") as f:
                f.write(body)
            print("\n[拿到数据] 已保存 ->", OUT_FILE)
            print(body)
            threading.Thread(target=lambda: (time.sleep(0.5), os._exit(0)), daemon=True).start()
        else:
            print("[最终汇报] PageQuery 空响应/被挑战。本次预算已用，停止。")
            print("  body repr:", repr(body))
            threading.Thread(target=lambda: (time.sleep(0.5), os._exit(2)), daemon=True).start()

def main():
    lib.mbInit(ctypes.create_string_buffer(512))
    wv = lib.mbCreateWebWindow(0, None, 100, 100, 1280, 800)
    lib.mbShowWindow(wv, 1)
    lib.mbOnTitleChanged(wv, on_title, None)
    lib.mbOnLoadUrlBegin(wv, on_url_begin, None)
    lib.mbOnLoadUrlEnd(wv, on_url_end, None)
    lib.mbOnJsQuery(wv, jsq_cb, None)
    lib.mbLoadURL(wv, SITE_URL.encode())

    threading.Thread(target=lambda: (time.sleep(150), os._exit(2)), daemon=True).start()
    lib.mbRunMessageLoop()

if __name__ == "__main__":
    main()
