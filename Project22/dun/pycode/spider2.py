import requests
import subprocess
import sys
import json as _json
import os



def spider2(count:int,dt:str):
    """ 本文件路径  """
    bashpath = os.path.dirname(os.path.abspath(__file__))
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

    """  fp 参数   """
    process_fp = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'fp.js')],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_fp.returncode != 0 or not process_fp.stdout.strip():
        print("node 失败:", process_fp.stderr[-1500:])
        print("node stdout:", process_fp.stdout[-3000:])
        sys.exit(1)
    fp = _json.loads(process_fp.stdout.strip().splitlines()[-1])


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
        "dnt": "1",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-gpc": "1"
    }
    url = 'https://c.dun.163.com/api/v3/get'
    params = {
        "referer": "https://dun.163.com/trial/picture-click",
        "zoneId": "CN31",
        "dt": dt,
        "irToken": "YtWaBwmg91BEdgQQQFKIBLS395Tivvzl",
        "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
        "fp": fp,
        "https": "true",
        "type": "3",
        "version": "2.28.5",
        "dpr": "1.25",
        "dev": "1",
        "cb": cb,
        "ipv6": "false",
        "runEnv": "10",
        "group": "",
        "scene": "",
        "lang": "zh-CN",
        "sdkVersion": "",
        "loadVersion": "2.5.4",
        "iv": "4",
        "user": "",
        "width": "320",
        "audio": "false",
        "sizeType": "10",
        "smsVersion": "v3",
        "callback": callback
    }
    response = requests.get(url, headers=headers, params=params)
    res = response.text
    Output = {
        '_ga':response.cookies.get_dict()['_ga'],
        'token':res.split('"token":"')[1].split('","')[0],
        'front':res.split('"front":"')[1].split('","')[0]
    }
    jpg_url = res.split('"bg":["')[1].split('","')[0]
    jpg = requests.get(jpg_url, headers=headers).content
    with open(os.path.join(bashpath,'..','image','Background.jpg'),'wb') as f:
        f.write(jpg)
        print("背景图片写入成功")
    return Output


