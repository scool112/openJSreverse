


var cryptoJS = require('crypto-js');


function Get_result(Data){
    u = cryptoJS
    var l = "QV1f3nHn2qm7i3xrj3Y9K9imDdGTjTu9"
    var t = {
        data:Data
    }
    var n = u.enc.Utf8.parse(l)
    var r = u.AES.decrypt(t.data, n, {
        mode: u.mode.ECB,
        padding: u.pad.Pkcs7
    })
    i = r.toString(u.enc.Utf8)
    s = JSON.parse(i);
    return s.data.data
}



