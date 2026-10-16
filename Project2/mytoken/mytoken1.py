import requests
import execjs


def Spider_mytoken(page:int):
    page_i = str(page)
    with open("mytoken1.js",encoding="utf-8") as f:
        js_code = f.read()

    js = execjs.compile(js_code)

    arg = js.call("get_code",page_i)
    code = arg["code"]
    timestamp = arg["timestamp"]

    headers = {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "dnt": "1",
        "origin": "https://www.mytokencap.com",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://www.mytokencap.com/",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "sec-gpc": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    }
    url = "https://api.mytoken.info/ticker/currencyranklist"
    params = {
        "pages": "2,1",
        "sizes": "100,100",
        "subject": "market_cap",
        "language": "zh_CN",
        "legal_currency": "USD",
        "code": code,
        "timestamp": timestamp,
        "platform": "web_pc",
        "v": "0.1.0",
        "mytoken": ""
    }
    print(params)
    response = requests.get(url, headers=headers, params=params)

    print(response.text)
    print(response)

Spider_mytoken(4)
