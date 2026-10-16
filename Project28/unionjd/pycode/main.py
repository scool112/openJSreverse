from curl_cffi import requests
import sys
import os
import subprocess
import json
import time

bashpath = os.path.dirname(os.path.abspath(__file__))
headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "dnt": "1",
    "origin": "https://union.jd.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://union.jd.com/",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "x-referer-page": "https://union.jd.com/proManager/index",
    "x-rp-client": "h5_2.6.0"
}
cookies = {
    "__jdv": "你的__jdv",
    "shshshfpa": "你的shshshfpa",
    "shshshfpx": "你的shshshfpx",
    "mba_muid": "你的mba_muid",
    "3AB9D23F7A4B3C9B": "你的3AB9D23F7A4B3C9B",
    "_pst": "你的_pst",
    "logintype": "wx",
    "npin": "你的npin",
    "thor": "你的thor",
    "_tp": "你的_tp",
    "areaId": "22",
    "ipLoc-djd": "22-2022-43226-43452.9835446826",
    "shshshfpb": "你的shshshfpb",
    "3AB9D23F7A4B3CSS": "你的3AB9D23F7A4B3CSS",
    "__jdc": "209449046",
    "__jda": "你的__jda",
    "__jdb": "你的__jdb",
    "flash": "你的flash",
    "sdtoken": "你的sdtoken"
}
url = 'https://api.m.jd.com/api'
params = {
    "functionId": "",
    "appid": "",
    "_": "",
    "loginType": "",
    "uuid": "",
    "x-api-eid-token": "你的x-api-eid-token",
    "h5st": "",
    "body":""
    # "body": '{"funName":"getSkuByMaterialId","page":{"pageNo":3,"pageSize":60},"param":{"materialId":108,"secKillTimePeriod":16,"seckillTimeType":0,"requestScene":0,"requestExtFields":["shopInfo","orientations"]},"clientPageId":"jingfen_pc"}'
}

def spider(pageNum:int):
    body = '{"funName":"getSkuByMaterialId","page":{"pageNo":%d,"pageSize":60},"param":{"materialId":108,"secKillTimePeriod":16,"seckillTimeType":0,"requestScene":0,"requestExtFields":["shopInfo","orientations"]},"clientPageId":"jingfen_pc"}' %pageNum
    params['body'] = body
    process_params = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'index.js'), json.dumps(params["body"])],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_params.returncode != 0 or not process_params.stdout.strip():
        print("node 失败:", process_params.stderr[-1500:])
        print("node stdout:", process_params.stdout[-3000:])
        sys.exit(1)
    Arg = json.loads(process_params.stdout.strip().splitlines()[-1])

    params['functionId'] = Arg['functionId']
    params['appid'] = Arg['appid']
    params['_'] = Arg['_']
    params['loginType'] = Arg['loginType']
    params['uuid'] = Arg['uuid']
    params['x-api-eid-token'] = Arg['x-api-eid-token']
    params['h5st'] = Arg['h5st']

    response = requests.get(url, headers=headers, cookies=cookies, params=params).json()

    goodsSynopsisList = response['result']['goodsSynopsisList']

    result = []

    for i in goodsSynopsisList:
        res = {}
        res['标题'] = i['skuName']
        res['价格'] = i['purchasePriceInfo']['purchasePrice']
        res['店铺'] = i['venderName']
        res['好评数'] = i["goodComments"]
        result.append(res)
        print(res)

    fileName = "result" + str(pageNum) + ".json"
    with open(os.path.join(bashpath, '..', 'data', fileName), 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
        print(fileName + "写入完成完成")

if __name__ == "__main__":
    for i in range(1,4):
        spider(i)
        time.sleep(20)
