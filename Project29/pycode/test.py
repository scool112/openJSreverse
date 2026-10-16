import requests


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
cookies = {
    "_uab_collina": "你的_uab_collina",
    "winfanguser": "你的winfanguser",
    "eyeuser": "你的eyeuser"
}
url = 'http://www.winshangdata.com/wsapi/brand/getBigdataList3_4'
data = '{"isHaveLink":"","isTuozhan":"","isXxPp":"","kdfs":"","key":"","orderBy":"1","pageNum":2,"pageSize":60,"pid":"","qy_p":"","qy_r":"","xqMj":"","ytlb1":"零售","ytlb2":""}'.encode('utf-8', 'surrogateescape')
response = requests.post(url, headers=headers, cookies=cookies, data=data, verify=False)

print(response.text)
print(response)