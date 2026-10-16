import requests
import os
import execjs


def Spider(page:int):

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    JsPath = os.path.join(BASE_DIR,'..','js','birdreport3_req.js')
    JsResPath = os.path.join(BASE_DIR,'..','js','birdreport3_res.js')
    with open(JsPath, encoding="utf-8") as f:
        Js_code = f.read()
    with open(JsResPath, encoding="utf-8") as f:
        JsRes_code = f.read()
    Js = execjs.compile(Js_code)
    arg = Js.call("get_arg",page)
    JsRes = execjs.compile(JsRes_code)




    headers:dict[str,str] = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://www.birdreport.cn",
        "Pragma": "no-cache",
        "Referer": "https://www.birdreport.cn/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "dnt": "1",
        "requestId": arg["requestId"],
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-gpc": "1",
        "sign": arg["sign"],
        "timestamp": arg["timestamp"]
    }
    url:str = "https://api.birdreport.cn/front/activity/search"
    data:str = arg["data"]
    response:str = requests.post(url, headers=headers, data=data).text
    Data:str = response.split('"data":"')[1].split('","timestamp')[0]
    result:str = JsRes.call("get_res",Data)
    # rusult:str = JsArg("birdreport3_res.js","get_res",Data)
    print(result)


Spider(7)

