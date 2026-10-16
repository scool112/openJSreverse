import json

from curl_cffi import requests
import subprocess
import sys
import json as _json
import os
from pz_sign import make_sign, _js_json_dumps

sess = requests.Session()
bashpath = os.path.dirname(os.path.abspath(__file__))

def spider1()->str:
    process_cookie1 = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'cookie1.js')],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_cookie1.returncode != 0 or not process_cookie1.stdout.strip():
        print("node 失败:", process_cookie1.stderr[-1500:])
        print("node stdout:", process_cookie1.stdout[-3000:])
        sys.exit(1)
    cookie1 = _json.loads(process_cookie1.stdout.strip().splitlines()[-1])

    process_cookie2 = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'cookie2.js')],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_cookie2.returncode != 0 or not process_cookie2.stdout.strip():
        print("node 失败:", process_cookie2.stderr[-1500:])
        print("node stdout:", process_cookie2.stdout[-3000:])
        sys.exit(1)
    cookie2 = _json.loads(process_cookie2.stdout.strip().splitlines()[-1])

    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "dnt": "1",
        "pragma": "no-cache",
        "priority": "u=0, i",
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
    cookies = {
        "_c_WBKFRo": cookie1['_c_WBKFRo'],
        "pzfrom": "null",
        "bd_vid": "null",
        "qhclickid": "null",
        "sourceid": "null",
        "uctrackid": "null",
        "markId": "null",
        "keyword": "null",
        "new_track_uuid": cookie2['new_track_uuid'],
        "track_uuid": cookie2['track_uuid'],
        "track_time": cookie2['track_time'],
        "ssxmod_itna": cookie1['ssxmod_itna'],
        "ssxmod_itna2": cookie1['ssxmod_itna2']
    }
    url = 'https://www.pzds.com/goodsList/7/6'


    response = sess.get(url, headers=headers, cookies=cookies,impersonate="chrome110")
    acw_tc = response.cookies.get_dict()['acw_tc']
    return acw_tc

def spider2():
    headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "authorization": "你的authorization",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "deviceid": "你的deviceid",
        "dnt": "1",
        "origin": "https://www.pzds.com",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "pzos": "windows",
        "pzplatform": "pc",
        "pztimestamp": "1791937819243",
        "pzversion": "26.1013.1015",
        "pzversioncode": "1",
        "random": "492349",
        "referer": "https://www.pzds.com/login?redirect=%2F",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sec-gpc": "1",
        "sign": "2e853501bac590de14f548f31d3a9013",
        "token": "null",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "x-oss-forbid-overwrite": "true"
    }
    url = 'https://api.pzds.com/api/auth/oauth2/token'
    data = {
        "username": "你的手机号",
        "password": "你的密码(密文)",
        "scope": "openid",
        "grant_type": "password"
    }
    response = sess.post(url, headers=headers, json=data)
    return {
        "_waf_bd8ce2ce37" : response.text.split('"_waf_bd8ce2ce37":"')[1].split('"}<')[0],
        "_waf_3d7faf79" : response.text.split('"_waf_3d7faf79":"')[1].split('","')[0]
    }

def spider3():

    Arg = spider2()

    pageNum = 3

    body = {"order":"ASC","sort":None,"page":pageNum,"pageSize":10,"action":{"gameId":"7","merchantMark":None,"keywords":[],"searchWords":[],"searchPropertyIds":[],"recommendSearchConfigIds":[],"unionGameIds":[],"goodsSearchActions":[],"goodsCatalogueId":6,"goodsSubCatalogueIds":[],"countFlag":False,"conditionSearch":False}}
    s = make_sign(body)
    headers = {
        "accept": "application/json, text/plain, */*",
        "content-type": "application/json",
        "x-oss-forbid-overwrite": "true",
        "channelinfo": "{\"channelCode\":null,\"tag\":null,\"channelType\":null,\"searchWord\":\"null\",\"adExtras\":\"\",\"urlParam\":\"\"}",
        "globalid": "你的globalid",
        "pzplatform": "pc",
        "deviceid": "你的deviceid",
        "pzos": "windows",
        "pzversion": "26.1013.1015",
        "pzversioncode": "1",
        "skey": "CLIENT",
        "sign": s["sign"],
        "pztimestamp": s["pztimestamp"],
        "random": s["random"],
        "x-sign-version": "v18",
        "token": "你的token",
        "pzid": "你的pzid",
    }

    Arg['globalid'] = headers['globalid']
    Arg['deviceid'] = headers['deviceid']
    Arg['sign'] = headers['sign']
    Arg['pztimestamp'] = headers['pztimestamp']
    Arg['Random'] = headers['random']
    Arg['pageNum'] = pageNum
    Arg['token'] = headers['token']
    Arg['pzid'] = headers['pzid']

    process_cookie = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'cookie1.js'),Arg['_waf_3d7faf79']],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_cookie.returncode != 0 or not process_cookie.stdout.strip():
        print("node 失败:", process_cookie.stderr[-1500:])
        print("node stdout:", process_cookie.stdout[-3000:])
        sys.exit(1)
    cookie = _json.loads(process_cookie.stdout.strip().splitlines()[-1])

    process_params = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'params.js'),json.dumps(Arg)],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_params.returncode != 0 or not process_params.stdout.strip():
        print("node 失败:", process_params.stderr[-1500:])
        print("node stdout:", process_params.stdout[-3000:])
        sys.exit(1)
    params_d =  _json.loads(process_params.stdout.strip().splitlines()[-1])

    acw_tc = spider1()


    cookies = {
        "_c_WBKFRo": cookie['_c_WBKFRo'],
        "acw_tc": acw_tc,
        "ssxmod_itna": cookie['ssxmod_itna'],
        "ssxmod_itna2": cookie['ssxmod_itna2'],
    }
    params = {
        "decode__1174":params_d
    }
    url = 'https://api.pzds.com/api/web-client/v2/public/goodsPublic/page'

    data = _js_json_dumps(body).encode('utf-8', 'surrogateescape')

    response = sess.post(url, headers=headers, cookies=cookies, params=params,data=data,impersonate="chrome110")

    print(response.text)
    print(response)


if __name__ == "__main__":
    spider3()