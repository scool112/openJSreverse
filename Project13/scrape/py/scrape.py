import requests
import subprocess, json

out = subprocess.check_output(["node", "../js/scrape.js", "5"],cwd="../js").split('undefined\n')[1].split('\n')[0]
result = json.loads(out)

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://spa14.scrape.center/page/3",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://spa14.scrape.center/api/movie/"
params = {
    "limit": "10",
    "offset": result['offset'],
    "sign": result['sign']
}
print(params)
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)