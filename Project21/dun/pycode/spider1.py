import requests
import subprocess
import sys
import json as _json
import os


def spider1(arg:int):
    """ 本文件路径  """
    bashpath = os.path.dirname(os.path.abspath(__file__))
    """  cb 参数 """
    process_arg = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'index.js'),str(arg)],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_arg.returncode != 0 or not process_arg.stdout.strip():
        print("node 失败:", process_arg.stderr[-1500:])
        print("node stdout:", process_arg.stdout[-3000:])
        sys.exit(1)
    Arg = _json.loads(process_arg.stdout.strip().splitlines()[-1])


    """  图片地址请求 """
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
    cookies = {
        "__root_domain_v": ".163.com",
        "_qddaz": "你的_qddaz",
        "wyy_uid": "你的wyy_uid",
        "locale": "zh_CN",
        "P_INFO": "你的P_INFO"
    }
    url = 'https://c.dun.163.com/api/v3/get'
    params = {
        "referer": "https://dun.163.com/trial/jigsaw",
        "zoneId": "CN31",
        "dt": Arg['dt'],
        "irToken": Arg['irToken'],
        "id": Arg['id'],
        "fp": Arg['fp'],
         "https": "true",
        "type": "2",
        "version": "2.28.5",
        "dpr": "1.25",
        "dev": "1",
        "cb": Arg['cb'],
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
        "callback": Arg['callback']
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    res = response.text
    #输出
    Output = {
        '_ga':response.cookies.get_dict()['_ga'],
        'token':res.split('"token":"')[1].split('","')[0],
        'dt':Arg['dt']
    }
    jpg1_url = res.split('"bg":["')[1].split('","')[0]
    jpg2_url = res.split('"front":["')[1].split('","')[0]

    """"  得到图片请求  """
    headers = {
        "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "i",
        "referer": "https://dun.163.com/",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "cross-site",
        "sec-fetch-storage-access": "none",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    }
    jpg1 = requests.get(jpg1_url, headers=headers).content
    jpg2 = requests.get(jpg2_url, headers=headers).content
    with open(os.path.join(bashpath,'..','image','Background.jpg'),'wb') as f:
        f.write(jpg1)
        print("背景图片写入成功")
    with open(os.path.join(bashpath,'..','image','Slider.png'),'wb') as f:
        f.write(jpg2)
        print("滑块图片写入成功")
    return Output


if __name__ == "__main__":
    print(spider1(1))



