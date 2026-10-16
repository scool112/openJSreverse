
import requests
from spider1 import spider1
from spider2 import spider2
from Trajectory_Processing import TPmain
import subprocess
import sys
import json as _json
import os

bashpath = os.path.dirname(os.path.abspath(__file__))

dt = spider2(0)
input = spider1(1,dt)
_ga = input['_ga']
tp = TPmain()
Arg = _json.dumps({
    "token": input['token'],
    "trajectory": tp['trajectory'],
    "slide": tp["slide"],
})

process_cb = subprocess.run(
    ["node", os.path.join(bashpath, "..", 'jscode', 'cb.js')],
    cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
)
if process_cb.returncode != 0 or not process_cb.stdout.strip():
    print("node 失败:", process_cb.stderr[-1500:])
    print("node stdout:", process_cb.stdout[-3000:])
    sys.exit(1)
cb = _json.loads(process_cb.stdout.strip().splitlines()[-1])

process_data = subprocess.run(
    ["node", os.path.join(bashpath, "..", 'jscode', 'data.js'),Arg],
    cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
)
if process_data.returncode != 0 or not process_data.stdout.strip():
    print("node 失败:", process_data.stderr[-1500:])
    print("node stdout:", process_data.stdout[-3000:])
    sys.exit(1)
data = _json.loads(process_data.stdout.strip().splitlines()[-1])

process_callback = subprocess.run(
    ["node", os.path.join(bashpath, "..", 'jscode', 'callback.js'), str(2)],
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
url = 'https://c.dun.163.com/api/v3/check'
params = {
    "referer": "https://dun.163.com/trial/jigsaw",
    "zoneId": "CN31",
    "dt": dt,
    "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
    "token": input['token'],
    "data":   _json.dumps(data['data'], ensure_ascii=False, separators=(',', ':')),
    "width": "320",
    "type": "2",
    "version": "2.28.5",
    "cb": cb,
    "user": "",
    "extraData": "",
    "bf": "0",
    "runEnv": "10",
    "sdkVersion": "",
    "loadVersion": "2.5.4",
    "iv": "4",
    "callback": callback
}


response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)





