import requests
import json
import os
import execjs




def Spider(page:int)->None:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    JsPath = os.path.join(BASE_DIR,'..','js','swguancha1.js')
    with open(JsPath, encoding="utf-8") as f:
        Js_code = f.read()
    Js = execjs.compile(Js_code)
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        "Origin": "https://www.swguancha.com",
        "Pragma": "no-cache",
        "Referer": "https://www.swguancha.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "deviceType": "1",
        "dnt": "1",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-gpc": "1"
    }
    url = "https://app.swguancha.com/client/v1/article/client/page"
    data = {
        "queryType": 3,
        "current": page,
        "size": 20
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data).text
    res = Js.call("Get_result",response)
    print(res)


Spider(2)

