import requests
import json


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    "gray-lease-code": "null",
    "gray-user-id": "null",
    "origin": "https://lark.yuekeyun.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://lark.yuekeyun.com/",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "sec-fetch-storage-access": "none",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}
url = "https://lark-acl.alibaba.com/idp/loginAccountAndPwd"
params = {
    "access_token": ""
}
data = {
    "loginId": "你的账号",
    "password": "你的密码(密文)",
    "captchaVerifyParam": "你的captchaVerifyParam",
    "sceneId": "1fz224se"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, params=params, data=data)

print(response.text)
print(response)





