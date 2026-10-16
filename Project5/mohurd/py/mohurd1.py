import requests
import os
import execjs
from typing import Union,Any

def js_fun(data:str)->list[dict[str,Union[str,int]]]:
    base_path:str = os.path.dirname(os.path.abspath(__file__))
    js_file:str = os.path.join(base_path,"..","js","mohurd1.js")
    js_dir:str = os.path.dirname(js_file)
    os.chdir(js_dir)
    with open(js_file,encoding="utf-8") as f:
        js_code = f.read()
    js:Any = execjs.compile(js_code)
    res:list[dict[str,Union[str,int]]] = js.call("get_res",data)
    return res

def Spider(page:str)->str:
    headers:dict[str,str] = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Referer": "https://jzsc.mohurd.gov.cn/data/company",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "accessToken;": "",
        "dnt": "1",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-gpc": "1",
        "timeout": "30000",
        "v": "231012"
    }
    url:str = "https://jzsc.mohurd.gov.cn/APi/webApi/dataservice/query/comp/list"
    params:dict[str,str] = {
        "pg": page,
        "pgsz": "15",
        "total": "450"
    }
    response:str = requests.get(url, headers=headers, params=params).text
    return response

def main(page:int):
    Data:str = Spider(str(page))
    res:list[dict[str,Union[str,int]]] = js_fun(Data)
    print(res)

if __name__ == "__main__":
    main(2)