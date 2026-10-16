import requests
import json
import os
import execjs

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JsPath = os.path.join(BASE_DIR, '..', 'js', "nationalHallSt_arg.js")
with open(JsPath, encoding="utf-8") as f:
    Js_code = f.read()
Js = execjs.compile(Js_code)
arg = Js.call("get_arg",4)
headers = {
    "Accept": "application/json",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://fuwu.nhsa.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://fuwu.nhsa.gov.cn/nationalHallSt/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "channel": "web",
    "contentType": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-tif-nonce": arg["x-tif-nonce"],
    "x-tif-paasid": "undefined",
    "x-tif-signature": arg["x-tif-signature"],
    "x-tif-timestamp": arg['x-tif-timestamp']
}
url = "https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital"
data = {
    "data": {
        "data": {
            "encData": arg['encData']
        },
        "appCode": arg['appCode'],
        "version": "1.0.0",
        "encType": "SM4",
        "signType": "SM2",
        "timestamp": arg['timestamp'],
        "signData": arg['signData']
    }
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data).json()
res = Js.call("get_res","SM4",response)
print(res)

