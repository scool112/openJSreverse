import requests
import subprocess
import sys
import json as _json
import os

def spider1(count)->str:
    bashpath = os.path.dirname(os.path.abspath(__file__))
    """  callback 参数 """
    process_callback = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'callback.js'),str(count)],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_callback.returncode != 0 or not process_callback.stdout.strip():
        print("node 失败:", process_callback.stderr[-1500:])
        print("node stdout:", process_callback.stdout[-3000:])
        sys.exit(1)
    callback = _json.loads(process_callback.stdout.strip().splitlines()[-1])
    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Referer": "https://dun.163.com/",
        "Sec-Fetch-Dest": "script",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    cookies = {
        "__root_domain_v": ".163.com",
        "_qddaz": "你的_qddaz",
        "wyy_uid": "你的wyy_uid",
        "locale": "zh_CN",
        "P_INFO": "你的P_INFO",
    }
    url = 'https://c.dun.163.com/api/v2/getconf'
    params = {
        "referer": "https://dun.163.com/trial/jigsaw",
        "zoneId": "",
        "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
        "ipv6": "false",
        "runEnv": "10",
        "iv": "5",
        "type": "2",
        "loadVersion": "2.5.4",
        "callback": callback
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params).text
    dt = response.split('"dt":"')[1].split('","')[0]
    return dt

if __name__ == "__main__":
    print(spider1(0))

