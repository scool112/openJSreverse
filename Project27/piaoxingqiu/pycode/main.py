import json
import requests
import os
bashpath = os.path.dirname(os.path.abspath(__file__))

def spider(pageNum:int):
    result = []

    # pageNum = 3

    headers = {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "access-token;": "",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "dnt": "1",
        "front-trace-id": "你的front-trace-id",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://m.piaoxingqiu.com/list",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "src": "WEB",
        "terminal-src": "WEB",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "utc-offset": "480",
        "ver": "4.67.10"
    }
    url = 'https://m.piaoxingqiu.com/cyy_gatewayapi/home/pub/v3/show_list/search_by_front'
    params = {
        "bizFrontendCategoryId": "6abe4817177e0a0001b50db1",
        "cityId": "BL1277",
        "currency": "CNY",
        "ifComponent": "0",
        "lang": "zh",
        "length": "10",
        "offset": str(pageNum * 10),
        "pageType": "ALL_PAGE",
        "siteId": "6268b34c363f4f0a825430eb",
        "sortType": "RECOMMEND",
        "terminalSrc": "WEB",
        "utcOffset": "480",
        "ver": "4.67.10",
        "src": "WEB"
    }

    response = requests.get(url, headers=headers, params=params).json()
    # print(response)

    collect = response['data']['searchData']


    for i in collect:
        result.append({
            "showName":i['showName'],
            "showDate":i['showDate'],
            "yuanNum":i['minOriginalPriceVO']['yuanNum']
        })

    print(result)

    fileName = "result" + str(pageNum) + ".json"
    with open(os.path.join(bashpath,'..','data',fileName),'w',encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
        print( fileName + "写入完成完成")


if __name__ == "__main__":
    for i in range(1,4):
        spider(i)