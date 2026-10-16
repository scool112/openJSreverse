import requests
import json
from arg.qcc_arg import qcc_arg
import os
import execjs
from urllib.parse import quote
from typing import Union,Any

def Spider(Name:str,Page:int)-> None:
    name:str = Name
    pageIn:int = Page
    header_refererNa:str = quote(name,encoding="utf-8")
    header_referer:str = "https://www.qcc.com/web/search?key=" + header_refererNa + "&p=2" if pageIn == 1 else "https://www.qcc.com/web/search?key=" + header_refererNa
    arg:dict = qcc_arg(name)
    WindowPid:str = arg["WindowPid"]
    WindowTid:str = arg["WindowTid"]

    base_path:str = os.path.dirname(os.path.abspath(__file__))
    js_path:str = os.path.join(base_path,"..","js","arg.js")
    js_dir:str = os.path.dirname(js_path)
    os.chdir(js_dir)

    with open(js_path,encoding="utf-8") as f:
        js_code:str = f.read()
    js:Any = execjs.compile(js_code)
    hea_arg:dict[str,str] = js.call("get_arg",WindowTid,name,pageIn)
    key:str = hea_arg["key"]
    value:str = hea_arg["value"]

    headers:dict[str,str] = {
        "Content-Type": "application/json",
         key: value,
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "dnt": "1",
        "origin": "https://www.qcc.com",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": header_referer,
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "x-pid": WindowPid,
        "x-requested-with": "XMLHttpRequest"
    }
    cookie:dict[str,str] = {
        "qcc_did": "你的qcc_did",
        "_c_WBKFRo": "你的_c_WBKFRo",
        "QCCSESSID": "你的QCCSESSID"
    }
    url:str = "https://www.qcc.com/api/search/searchMulti"
    Data:[str, Union[str, int]] = {
        "searchKey": Name,
        "pageIndex": pageIn,
        "pageSize": 20
    }
    data:str = json.dumps(Data, separators=(',', ':'))
    response:requests.Response = requests.post(url, headers=headers, cookies=cookie, data=data)
    print(response.text)
    print(response.status_code)
    # print(headers)
    # print("---------------")
    # print(data)
    # print(response.text)


Spider("vivo",2)

# print(response.text)
# print(response)