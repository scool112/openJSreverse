import requests
import json
from arg import get_arg
import os
import execjs


GATEWAY_SIGN = get_arg()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JsPath = os.path.join(BASE_DIR, '..', 'js', '36kr_2.js')
with open(JsPath, encoding="utf-8") as f:
    Js_code = f.read()
Js = execjs.compile(Js_code)
arg = Js.call(get_arg,GATEWAY_SIGN)

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://36kr.com",
    "Pragma": "no-cache",
    "Referer": "https://36kr.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "dnt": "1",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-gpc": "1"
}
cookies = {
    "sensorsdata2015jssdkcross": "你的sensorsdata",
    "_c_WBKFRo": "你的_c_WBKFRo",
    "_nb_ioWEgULi": ""
}
url = "https://gateway.36kr.com/api/mus/login/byMobilePassword"
params = {
    "sign": arg["sign"]
}
data = {
    "nonce": arg["nonce"],
    "krtoken": "",
    "partner_id": "web",
    "timestamp": arg["timestamp"],
    "param": {
        "countryCode": arg["countryCode"],
        "mobileNo": arg["mobileNo"],
        "password": arg["password"]
    }
}
data = json.dumps(data, separators=(',', ':'))

# print(params)
# print(" ")
# print(data)


response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)

















