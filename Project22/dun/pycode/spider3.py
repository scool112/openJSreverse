import requests
import subprocess
import sys
import json as _json
import os


def spider3(Distance:list,jetlag:list,dot:list,token:str,dt:str,count:int):
    bashpath = os.path.dirname(os.path.abspath(__file__))
    Arg = {
        'Distance':Distance,
        'jetlag':jetlag,
        'dot':dot,
        'token':token
    }
    """  data 参数 """
    process_data = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'data.js'), _json.dumps(Arg)],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_data.returncode != 0 or not process_data.stdout.strip():
        print("node 失败:", process_data.stderr[-1500:])
        print("node stdout:", process_data.stdout[-3000:])
        sys.exit(1)
    data = _json.loads(process_data.stdout.strip().splitlines()[-1])

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

    """  cb 参数 """
    process_cb = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'cb.js')],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_cb.returncode != 0 or not process_cb.stdout.strip():
        print("node 失败:", process_cb.stderr[-1500:])
        print("node stdout:", process_cb.stdout[-3000:])
        sys.exit(1)
    cb = _json.loads(process_cb.stdout.strip().splitlines()[-1])

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
        "dnt": "1",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-gpc": "1"
    }
    url = 'https://c.dun.163.com/api/v3/check'
    params = {
        "referer": "https://dun.163.com/trial/picture-click",
        "zoneId": "CN31",
        "dt": dt,
        "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
        "token": token,
        "data": _json.dumps(data, ensure_ascii=False, separators=(',', ':')),
        "width": "320",
        "type": "3",
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
    response = requests.get(url, headers=headers, params=params)
    print(response.text)
    print(response)





















