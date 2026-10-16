import requests
import json
import subprocess
import sys
import json as _json
import os


bashpath = os.path.dirname(os.path.abspath(__file__))

process_arg = subprocess.run(
    ["node", os.path.join(bashpath, "..", 'JS', 'arg.js')],
    cwd=os.path.join(bashpath, '..', 'JS'), capture_output=True, text=True, encoding="utf-8", timeout=90,
)
if process_arg.returncode != 0 or not process_arg.stdout.strip():
    print("node 失败:", process_arg.stderr[-1500:])
    print("node stdout:", process_arg.stdout[-3000:])
    sys.exit(1)
arg = _json.loads(process_arg.stdout.strip().splitlines()[-1])

headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "text/plain;charset=UTF-8",
    "origin": "https://www.dongchedi.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.dongchedi.com/",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-fetch-storage-access": "none",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}
url = "https://mssdk.bytedance.com/web/common"
params = {
    "aid": "1839",
    "app_name": "auto_web_pc",
    "keyword": "特斯拉",
    "offset": "110",
    "count": "24",
    "cur_tab": "1",
    "city_name": "深圳",
    "motor_source": "pc_new",
    "format": "json",
    "motor_search_type": "0",
    "msToken": "你的msToken",
}
data = {
    "magic": 538969122,
    "version": 1,
    "dataType": 8,
    "strData": "你的strData",
    "tspFromClient": 1786751197490,
    "ulr": 0
}

params["a_bogus"] = arg
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, params=params, data=data)

print(response.text)
print(response.status_code)