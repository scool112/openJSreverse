

window = global
window.loader;

NECaptchaSafeWindow = {}
document  = {
    "getElementById":function(s){
        if (s === "NECaptchaSafeWindow"){
            return NECaptchaSafeWindow
        }
    }
}

Arg = JSON.parse(process.argv[2])

window.token = Arg['token']
window.trajectory = Arg['trajectory']
window.slide = Arg['slide']

require("./dataArg.js")

var data  = {
    'd': window._0xa8a0c6(window._0x4a4a62['join'](':')),
     'm': '',
    'p': _0x15278a,
    'f': _0xa8a0c6(_0x564a9f(_0x319bb4, _0x4d98f2['join'](','))),
    'ext': _0xa8a0c6(_0x564a9f(_0x319bb4, 1 + ',' + window.trajectory['length']))
}


result = JSON["stringify"]({
    'data':data,
})

console.log(result)
