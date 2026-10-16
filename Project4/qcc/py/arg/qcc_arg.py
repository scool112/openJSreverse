import requests


def qcc_arg(name:str)-> dict[str,str]:
    headers:dict[str,str] = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "dnt": "1",
        "pragma": "no-cache",
        "priority": "u=0, i",
        "referer": "https://www.qcc.com/",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    }
    cookies:dict[str,str] = {
        "qcc_did": "你的qcc_did",
        "_c_WBKFRo": "你的_c_WBKFRo",
        "QCCSESSID": "你的QCCSESSID",
        "acw_tc": "你的acw_tc"
    }
    url:str = "https://www.qcc.com/web/search"
    params:dict[str,str] = {
        "key": name,
        "p": "2"
    }
    response:requests.Response = requests.get(url, headers=headers, cookies=cookies, params=params)

    result:str = response.text
    WindowPid:str = result.split("<script>window.pid='")[1].split("'")[0]
    WindowTid:str = result.split("<script>window.pid='")[1].split("='")[1].split("';")[0]
    WindowVersion:str = result.split("'</script>")[0].split("window.version='")[1]
    res:dict[str,str] = {
        "WindowPid":WindowPid,
        "WindowTid":WindowTid,
        "WindowVersion":WindowVersion
    }
    return res
