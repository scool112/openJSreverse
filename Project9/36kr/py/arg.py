import requests

def get_arg()->str:
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Referer": "https://36kr.com/",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    cookies = {
        "_c_WBKFRo": "你的_c_WBKFRo",
        "_nb_ioWEgULi": "",
        "SERVERID": "你的SERVERID",
        "_wafchallengeid": "你的_wafchallengeid",
        "_waftokenid": "你的_waftokenid"
    }
    url = "https://36kr.com/"
    response = requests.get(url, headers=headers, cookies=cookies).text
    print(response)
    res = response.split('<script async>window.__GATEWAY_SIGN__="')[1].split('"')[0]
    return res

