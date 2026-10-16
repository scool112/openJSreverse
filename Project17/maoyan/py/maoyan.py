
import requests
from font.woff_req import woff_req
from font.font_parse import font_parse
import os
import execjs


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JsPath = os.path.join(BASE_DIR,'..','js','arg.js')
with open(JsPath, encoding="utf-8") as f:
    Js_code = f.read()
Js = execjs.compile(Js_code)
arg = Js.call("get_arg")

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "dnt": "1",
    "m-appkey": "fe_com.sankuai.movie.fe.ipro",
    "m-traceid": "-7281964861022031908",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://piaofang.maoyan.com/dashboard",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}
url = "https://piaofang.maoyan.com/i/api/dashboard-ajax"
params = {
    "orderType": "0",
    "timeStamp": arg,
    "index": "876",
    "channelId": "40009",
    "sVersion": "2",
    "yodaReady": "h5",
    "csecplatform": "4",
    "csecversion": "4.3.0"
}
response = requests.get(url, headers=headers, params=params).json()


fontStyle = response["fontStyle"]
woff_url = 'https:' + fontStyle.split('url("')[3].split('");}')[0]
FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'font')
WOFF_PATH = os.path.join(FONT_DIR, 'file.woff')
woff_req(woff_url, WOFF_PATH)
font_table = font_parse(WOFF_PATH, 'file.xml', 'image').run()
print(font_table)

for i in response['movieList']['data']['list']:
    num = i["splitBoxSplitUnit"]['num'].split(';')[0:-1]    # 最后一个不要
    new_num = ''
    for k in num:
        v = k.upper().replace("&#X","uni")
        if ("." in v):
            new_num += "."
            new_num += str(font_table[v.replace(".","")])
        else:
            new_num += str(font_table[v])
    i["splitBoxSplitUnit"]['num'] = new_num
    print(i["splitBoxSplitUnit"])

