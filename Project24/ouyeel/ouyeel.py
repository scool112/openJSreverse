import requests
from lxml import etree
import execjs
import json
import os
import time


bashpath = os.path.dirname(os.path.abspath(__file__))

url = "https://www.ouyeel.com/search-ng/commoditySearch/queryCommodityResult"

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.ouyeel.com",
    "Pragma": "no-cache",
    "Referer": "https://www.ouyeel.com/search-ng/queryResource/index?pageIndex=0&pageSize=50",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "X-Tingyun-Id": "你的X-Tingyun-Id",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}



requests = requests.session()  # 携带响应的cookie


def first_request():
    response = requests.get(url, headers=headers)
    obj_html = etree.HTML(response.text)
    content_data = obj_html.xpath('//meta[2]/@content')[0]
    func_code = obj_html.xpath('//script[1]/text()')[0]
    return content_data, func_code


def two_request(content_data, func_code,pageNum:int):
    with open('ouyeel.js', encoding='utf-8')as f:
        js_code = f.read().replace('!"sz_fun"', func_code)
    open('test.js', 'w', encoding='utf-8').write(js_code)
    js = execjs.compile(js_code)
    cookie = js.call('RS_5')
    cookies = {
        cookie['name']: cookie['value']
    }
    body = {"pageIndex":pageNum,"pageSize":50,"industryComponent":None,"channel":None,"productType":None,"sort":None,"warehouseCode":None,"key_search":None,"is_central":None,"searchField":None,"companyCode":None,"inquiryCategory":None,"inquirySpec":None,"provider":None,"packCodes":None,"shopCode":None,"steelFactory":None,"resourceIds":None,"jsonParam":{},"excludeShowSoldOut":None}
    # data = {
    #     "criteriaJson": "{\"pageIndex\":2,\"pageSize\":50,\"industryComponent\":null,\"channel\":null,\"productType\":null,\"sort\":null,\"warehouseCode\":null,\"key_search\":null,\"is_central\":null,\"searchField\":null,\"companyCode\":null,\"inquiryCategory\":null,\"inquirySpec\":null,\"provider\":null,\"packCodes\":null,\"shopCode\":null,\"steelFactory\":null,\"resourceIds\":null,\"jsonParam\":{},\"excludeShowSoldOut\":null}"
    # }
    data = {
        "criteriaJson":json.dumps(body, separators=(',', ':'))
    }
    res = requests.post(url, headers=headers, cookies=cookies,data=data).json()
    resultList = json.loads(res['resultList'])

    result = []

    for i in resultList:
        obj = i.get('resourceObj') or i
        result.append({
            '标题': obj.get('manufactureName'),
            '价格': obj.get('publishPrice'),
            '地点': obj.get('warehouseName'),
            '供应商产品名称': obj.get('providerProductName'),
        })
    print(result)
    fileName = 'result' + str(pageNum) + '.json'
    with open(os.path.join(bashpath,"data",fileName),'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(fileName + " 写入成功")
    print(" ")

if __name__ == "__main__":
    content_data, func_code = first_request()
    for i in range(2,12):
        two_request(content_data, func_code,i)
        time.sleep(10)



