
import requests
from arg import Arg
import os
import execjs

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JsPath = os.path.join(BASE_DIR, '..', 'js', '66miniapp.js')
with open(JsPath, encoding="utf-8") as f:
    Js_code = f.read()
Js = execjs.compile(Js_code)
arg = Js.call('get_arg')


headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Authorization": arg,
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Pragma": "no-cache",
    "Referer": "https://servicewechat.com/wxa0545fcd02d93b5d/199/page-frame.html",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "Terminal": "windows",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541c1a) XWEB/25297",
    "xweb_xhr": "1"
}
url = "https://66miniapp-api.66zhizu.com/client/search/house"
params = {
    "sequence": Arg(),
    "city": "上海",
    "region": "",
    "distance": "",
    "longitude": "",
    "latitude": "",
    "stations": "",
    "bed_count": "",
    "rent_type": "",
    "sort": "",
    "cost1": "",
    "cost2": ""
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)


