

import requests
import json
import time

url = 'http://www.winshangdata.com/wsapi/brand/getBigdataList3_4'
url2 = 'http://www.winshangdata.com/wsapi/brand/getBigdataBrandExpandDemand'

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "http://www.winshangdata.com",
    "Pragma": "no-cache",
    "Referer": "http://www.winshangdata.com/brandList",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "appType": "bigdata",
    "dnt": "1",
    "platform": "pc",
    "pwd": "mobile_regist",
    "sec-gpc": "1",
    "uid": "你的uid",
    "uuid": "123456"
}

# data = '{"isHaveLink":"","isTuozhan":"","isXxPp":"","kdfs":"","key":"","orderBy":"1","pageNum":1,"pageSize":60,"pid":"","qy_p":"","qy_r":"","xqMj":"","ytlb1":"餐饮","ytlb2":""}'.encode('utf-8', 'surrogateescape')
searchName = "餐饮"
data = json.dumps({
    "isHaveLink": "", "isTuozhan": "", "isXxPp": "", "kdfs": "", "key": "",
    "orderBy": "1", "pageNum": 1, "pageSize": 60, "pid": "",
    "qy_p": "", "qy_r": "", "xqMj": "",
    "ytlb1": searchName,
    "ytlb2": ""
}, ensure_ascii=False).encode('utf-8', 'surrogateescape')



response = requests.post(url, headers=headers, data=data, verify=False)

collet = response.json()['data']['list']

result = []
for i in collet:
    res = {}
    res['brandId'] = i['brandId']
    res['标题'] = i['brandName']
    result.append(res)

for i in range(0,len(result)):
    time.sleep(10)
    data2 = json.dumps({"brandId":result[i]["brandId"]},ensure_ascii=False).encode('utf-8', 'surrogateescape')
    response2 = requests.post(url2, headers=headers, data=data2, verify=False)
    collet2 = response2.json()['data']
    result[i]['创建时间'] = collet2['createDate']
    result[i]['开店方式'] = collet2['kaiDianMode']
    result[i]['面积要求'] = str(collet2['mianJi_Min']) + " - " + str(collet2['mianJi_Max'])
    result[i]['合作期限'] = collet2['qiXian_Min'] + "年" + " - " + collet2['qiXian_Max'] + "年"
    del result[i]['brandId']
    print(result)

print("=========  最终的 ============= ")
print(result)
