window = globalThis
self = window;
window.loader;

navigator = {
    userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
}

documentElement = {}
script = {}
cookies = {
    "__jdv": "你的__jdv",
    "shshshfpa": "你的shshshfpa",
    "shshshfpx": "你的shshshfpx",
    "mba_muid": "你的mba_muid",
    "3AB9D23F7A4B3C9B": "你的3AB9D23F7A4B3C9B",
    "_pst": "你的_pst",
    "logintype": "wx",
    "npin": "你的npin",
    "thor": "你的thor",
    "_tp": "你的_tp",
    "areaId": "22",
    "ipLoc-djd": "22-2022-43226-43452.9835446826",
    "shshshfpb": "你的shshshfpb",
    "3AB9D23F7A4B3CSS": "你的3AB9D23F7A4B3CSS",
    "__jdc": "209449046",
    "__jda": "你的__jda",
    "__jdb": "你的__jdb",
    "flash": "你的flash",
    "sdtoken": "你的sdtoken"
}
document = {
    "createElement":function(s){
        console.log("document.createElement : ",s)
        if (s === "script"){
            return script
        }
    },
    "documentElement" : documentElement,
    "cookie": Object.keys(cookies).map(function (k) {   // ← 改成 "cookie"
        return k + "=" + cookies[k];
    }).join("; ")

}

Element = function(s){
    console.log("Element : ",s)
}
setTimeout = function(s){
    console.log("setTimeout : ",s)
}