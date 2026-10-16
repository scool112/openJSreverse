import requests
import json
import os
import execjs

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JsPath = os.path.join(BASE_DIR, '..', 'js', 'zfcgdzmcgov.js')
with open(JsPath, encoding="utf-8") as f:
    Js_code = f.read()
Js = execjs.compile(Js_code)
arg = Js.call('get_arg')
# arg:dict[str,str] = JsArg("zfcgdzmcgov.js","get_arg")
headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "form-token": "d502cbd21715dc472875dddc20611dcf",
    "nsssjss": arg['nsssjss'], #
    "origin": "https://shanxisheng-zfcgdzmcgov.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://shanxisheng-zfcgdzmcgov.cn/gpmall-main-web/basic/sxNotice",
    "regioncode": "140001000",
    "regionguid": "140001",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sign": arg["sign"],  #
    "sitecode": "sxzfcg",
    "siteguid": "6883226032309207040",
    "time":  arg["time"],  #
    "timestamp": arg["timestamp"],  #
    "url": "/gateway/gpmall-bpoc/notice/v1/ignore/getNoticeList",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "webapp": "1"
}
cookies = {
    "webapp": "1",
    "siteCode": "sxzfcg",
    "siteGuid": "6883226032309207040",
    "regioncode": "140001000",
    "regionguid": "140001",
    "theme": "default",
    "regionpguid": "232",
    "rootregionguid": "232",
    "isOpenArea": "true",
    "tenantId": "ZF_GYS_000001",
    "regionname": "%E7%9C%81%E6%9C%AC%E7%BA%A7"
}
url = "https://shanxisheng-zfcgdzmcgov.cn/gateway/gpmall-bpoc/notice/v1/ignore/getNoticeList"
data = {
    "regionGuid": "232",
    "regionCode": "140000000",
    "webApp": "1",
    "pageSize": 10,
    "pageNum": 4,
    "noticeType": "0"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)