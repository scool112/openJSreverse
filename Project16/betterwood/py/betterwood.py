import requests
import json
import os
import execjs


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JS_DIR = os.path.join(BASE_DIR, '..', 'js')
JsPath = os.path.join(JS_DIR, 'betterwood2.js')
with open(JsPath, encoding="utf-8") as f:
    Js_code = f.read()

os.chdir(JS_DIR)
Js = execjs.compile(Js_code)

page = 3
arg = Js.call("get_arg",page)
# arg = JsArg("betterwood2.js","get_arg",page)

headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "apptype": "2",
    "appversion": "3.5.6",
    "businesstype": "1",
    "cache-control": "no-cache",
    "channel": "bdw",
    "clienttype": "5",
    "content-type": "application/json",
    "devicemanufacture": "microsoft",
    "devicemodel": "microsoft",
    "messageid": arg["MessageId"],  #
    "osversion": "Windows 11 x64",
    "pageno": str(page),
    "pagesize": "20",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://servicewechat.com/wx1b77d3569b2dd7fa/277/page-frame.html",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "signature": arg["Signature"],  #
    "timestamp": str(arg["Timestamp"]),  #
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541c1a) XWEB/25297",
    "xweb_xhr": "1"
}
url = "https://api.betterwood.com/base/app/store/listV2"
data = {
    "querySource": 2,
    "channelType": 1,
    "sourceType": 10,
    "serviceType": [
        "3"
    ],
    "searchType": 0,
    "dateStartTime": 1785945600000,
    "dateEndTime": 1786032000000,
    "destination": "国内/国际"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)


# print(headers)