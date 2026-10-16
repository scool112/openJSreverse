

var cryptoJS = require('crypto-js');


function get_res(Data){
    var d = {
        a:cryptoJS
    };
    function BB(t) {
        f = d.a.enc.Utf8.parse("Dt8j9wGw%6HbxfFn");
        m = d.a.enc.Utf8.parse("0123456789ABCDEF");
        var e = d.a.enc.Hex.parse(t)
            , n = d.a.enc.Base64.stringify(e)
        var a = d.a.AES.decrypt(n, f, {
            iv: m,
            mode: d.a.mode.CBC,
            padding: d.a.pad.Pkcs7
        })
            , r = a.toString(d.a.enc.Utf8);
        return r.toString()
    }
    TT = {
        data:Data
    }
    var EE = JSON.parse(BB(TT.data));
    list = []
    for (var i = 0;i<EE.data.list.length;i++){
        list[i] = EE.data.list[i]
    }
    return list
}


