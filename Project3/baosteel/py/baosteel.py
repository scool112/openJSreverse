

import requests
import json
import os
import execjs

def Spider_baosteel(page:int):
    base_path  =  os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(base_path,"..","js","arg_sum.js")
    js_dir = os.path.dirname(js_path)
    os.chdir(js_dir)
    with open(js_path,encoding="utf-8") as f:
        js_code = f.read()
    js = execjs.compile(js_code)
    headrs_arg = js.call("arg_sum",page)
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Md5": headrs_arg['Content-Md5'],
        "Content-Type": "application/json;charset=UTF-8",
        "Origin": "https://www.baosteel.com",
        "Pragma": "no-cache",
        "Referer": "https://www.baosteel.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "dnt": "1",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-gpc": "1",
        "x-date": headrs_arg['x-date'],
        "x-nonce": headrs_arg['x-nonce'],
        "x-signature": headrs_arg['x-signature'],
        "x-user": headrs_arg['x-user']
    }
    url = "https://cmsauth.baowugroup.com/v1/web/api/content/list"
    params = {
        "domainId": "12"
    }
    data = {
        "pageNo": page - 1,
        "pageSize": 12,
        "condition": {
            "nodeId": 436
        }
    }
    data = json.dumps(data, separators=(',', ':'))
    print(headers)
    response = requests.post(url, headers=headers, params=params, data=data)

    print(response.text)
    print(response)

Spider_baosteel(3)










