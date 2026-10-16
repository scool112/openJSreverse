
var Md5 = require("./arg_md5");
var Hmac = require("./arg_HmacSHA1")

function arg_sum(page){
    var page_tru = page - 1;
    function l(e) {
        for (var n = [], t = Array.of("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"), a = 0; a < e; a++) {
            var c = Math.floor(10 * Math.random());
            n[a] = t[c]
        }
        return n.join("")
    }
    function s() {
        return parseInt((new Date).getTime() / 1e3)
    }
    var e = {
        "transformRequest": {},
        "transformResponse": {},
        "timeout": 20000,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "headers": {
            "common": {
                "Accept": "application/json, text/plain, */*"
            },
            "delete": {},
            "get": {},
            "head": {},
            "post": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "put": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "patch": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        },
        "method": "post",
        "baseURL": "https://cmsauth.baowugroup.com",
        "url": "/v1/web/api/content/list?domainId=12",
        "data": {
            "pageNo": page_tru,
            "pageSize": 12,
            "condition": {
                "nodeId": 436
            }
        }
    }
    var n = l(10)
        , t = s()
        , a = Md5.Md5(e.data)
        , c = ""
        , o = "0/56f5cff3cad14853a44782c2c689ab2a"
        , i = "13ade1de1eff43ffb821735f352a4148";
    e.headers["x-user"] = o,
        e.headers["x-nonce"] = n,
        e.headers["x-date"] = t,
        e.headers["Content-Md5"] = a,
        c = "".concat(e.method.toUpperCase(), "\n").concat(e.url.replace(e.baseURL, ""), "\nx-user:").concat(o, "\nx-nonce:").concat(n, "\nx-date:").concat(t, "\nContent-Md5:").concat(a, "\n");
    var u = Hmac.hmac(c,i)
    e.headers["x-signature"] = u
    e.headers["x-date"] = e.headers["x-date"].toString();
    // console.log(e.headers)
    return e.headers
}

 // console.log(arg_sum(2))

