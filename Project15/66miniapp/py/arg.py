import os
import execjs
import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JS_DIR = os.path.join(BASE_DIR, '..', 'js')


def Arg():
    cwd = os.getcwd()
    os.chdir(JS_DIR)
    try:
        with open(os.path.join(JS_DIR, "66miniapp.js"), encoding="utf-8") as f:
            arg = execjs.compile(f.read()).call("get_arg")
    finally:
        os.chdir(cwd)
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
        "sequence": "",
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
    response = requests.get(url, headers=headers, params=params).json()
    sequence:str = response['result']['sequence']
    return sequence



#  1785724417.795;1786002366.000


