import requests
import execjs


with open("qimai.js",encoding="utf-8") as f:
    js_code = f.read()

js = execjs.compile(js_code)

analysis = js.call("get_analysis")

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://www.qimai.cn",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "dnt": "1",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-gpc": "1"
}
cookies = {
    "PHPSESSID": "你的PHPSESSID",
    "qm_check": "你的qm_check",
    "USERINFO": "你的USERINFO",
    "AUTHKEY": "你的AUTHKEY",
    "synct": "你的synct",
    "syncd": "-700"
}
url = "https://api.qimai.cn/rank/offline"
params = {
    "analysis": analysis,
    "option": "4",
    "sdate": "",
    "edate": ""
}
print(params)
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)


#     "analysis": "eCRbWihbVghUX1xMCwdfWgwIAihbSEgHBwZUUVcMAlRUJ0tL",