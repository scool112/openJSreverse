

import sys
import json
import subprocess
import requests
import os
import urllib.parse
from lxml import html
import time

sess = requests.session()
bashpath = os.path.dirname(os.path.abspath(__file__))

def spider(pageNum:int):
    headers = {
        "accept": "text/html, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "dnt": "1",
        "origin": "https://qikan.cqvip.com",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://qikan.cqvip.com/Qikan/Journal/JournalGuid?from=index",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest"
    }
    # cookies = {
    #     "6HZbKHDjIEcgS": "60AdNbLw.hHgkYf70bgq4kJCn4YrA2Mnz1UWT8CKen5SGVePOUiyVFbxmmzhZiKFYGMQbZ0fg6vbulwRiXAo5Iza",
    #     "6HZbKHDjIEcgT": "0p2XwSSsSD9tmCYKXCNNA2GexwSVuNDM84EwU6uJwEU3AENM1cSLK.OkW0DnYUvgEC5FNRfSdW91XmU0aDcBFOiMuIxTTcyBvQIZi7fdsJi_H16UsXgqMKMpbdJyFEW_oEI5XLJc_Zfq54yV9VKAoCbdNRa9n4Nh1JKiFPnsWo.Cx4Dz98Nz3h1EkdFTg6Rl3ONFeHVmrV3TFOFOVk5XWLQTwGhVxpc5WiM0VXJ98RxShO1VEmQMpD7RcNwZGE03nAacotLs0.r.yD236qdSYlH8pvSv_87T5t2h.lbzINk8Y8BARjOwHF7k9okzBK9rCpFRRxE8aT1ceo7tlVkOUhoz5XtfB8gStBjQzYkpsJ51dlHItXsJEpmI5hvEBb5VS3gkxzCjuzkSlPzNolBD2I3VEyJbiBXYDBVoOKwktE0pNQnYckkDHkTn2xhf6Xcu1ORxaZF2vIpyDrmwqJ9pWF1gFtxOveO9rHgt.Rxh1qlXe4OQS9n3mJs0GEAOcvsva"
    # }
    url = 'https://qikan.cqvip.com/Search/SearchList'
    model = {
        "ObjectType": 7,
        "SearchKeyList": [],          # 关键词检索放这里，如 ["人工智能"]
        "SearchExpression": None,
        "ClusterFilter": "ZY=316#世界经济",  # 聚类检索用这个
        "ClusterUseType": "Article",
        "Sort": "1",
        "PageNum": pageNum,                 # ← 页码
        "PageSize": 20,               # ← 每页条数
        "ShowTotalCount": 200,
    }
    data = urllib.parse.urlencode({"searchParamModel": json.dumps(model, ensure_ascii=False)})
    # data = 'searchParamModel=%7B%22ObjectType%22%3A7%2C%22SearchKeyList%22%3A%5B%5D%2C%22SearchExpression%22%3Anull%2C%22BeginYear%22%3Anull%2C%22EndYear%22%3Anull%2C%22UpdateTimeType%22%3Anull%2C%22JournalRange%22%3Anull%2C%22DomainRange%22%3Anull%2C%22ClusterFilter%22%3A%22ZY%3D316%23%E4%B8%96%E7%95%8C%E7%BB%8F%E6%B5%8E%22%2C%22ClusterLimit%22%3A0%2C%22ClusterUseType%22%3A%22Article%22%2C%22UrlParam%22%3A%22%22%2C%22Sort%22%3A%221%22%2C%22SortField%22%3Anull%2C%22UserID%22%3A%220%22%2C%22PageNum%22%3A2%2C%22PageSize%22%3A20%2C%22SType%22%3Anull%2C%22StrIds%22%3Anull%2C%22IsRefOrBy%22%3A0%2C%22ShowRules%22%3A%22%22%2C%22IsNoteHistory%22%3A0%2C%22AdvShowTitle%22%3Anull%2C%22ObjectId%22%3Anull%2C%22ObjectSearchType%22%3A0%2C%22ChineseEnglishExtend%22%3A0%2C%22SynonymExtend%22%3A0%2C%22ShowTotalCount%22%3A200%2C%22AdvTabGuid%22%3A%22%22%7D'.encode('utf-8', 'surrogateescape')
    response = sess.post(url, headers=headers, data=data)
    cookie1 = response.cookies.get_dict()['6HZbKHDjIEcgS']

    res1 = response.text
    jsvmpUrl = res1.split('src="')[1].split('" r')[0]
    vmpStart = res1.split("r='m'>")[5].split('();')[0]

    with open(os.path.join(bashpath,'..','html','jsbyte.html'),'w') as f:
        f.write(res1)
        print('html 写入成功')

    jsvmp = sess.get('https://qikan.cqvip.com' + jsvmpUrl,headers=headers).content
    with open(os.path.join(bashpath,'..','jscode','jsvmp.js'),'wb') as f:
        f.write(jsvmp)
        print("jsvmp 写入成功")

    Arg = {
        "cookie1":"6HZbKHDjIEcgS=" + cookie1,
        "vmpStart":vmpStart
    }

    process_arg = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'index.js'), json.dumps(Arg)],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_arg.returncode != 0 or not process_arg.stdout.strip():
        print("node 失败:", process_arg.stderr[-1500:])
        print("node stdout:", process_arg.stdout[-3000:])
        sys.exit(1)
    cookie2 = json.loads(process_arg.stdout.strip().splitlines()[-1])

    sess.cookies.set('6HZbKHDjIEcgT',cookie2)

    result = sess.post(url, headers=headers, data=data)

    collect = []
    doc = html.fromstring(result.content)
    for a in doc.xpath('//div[@id="list"]//tbody//tr//td[@class="title"]/a'):
        href = a.get('href')
        text = a.text_content().strip().encode('latin-1').decode('utf-8')
        collect.append({text:href.split('gch=')[1]})

    print(collect)

    url2 = 'https://qikan.cqvip.com/Qikan/Journal/Detail'
    headers2 = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "dnt": "1",
            "pragma": "no-cache",
            "priority": "u=0, i",
            "referer": "",
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

    for item in collect:
        (name, gch), = item.items()
        headers2["referer"] = "https://qikan.cqvip.com/Qikan/Journal/Summary?kind=1&gch=" + gch
        process_arg = subprocess.run(
            ["node", os.path.join(bashpath, "..", 'jscode', 'index.js'), json.dumps(Arg)],
            cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
        )
        if process_arg.returncode != 0 or not process_arg.stdout.strip():
            print("node 失败:", process_arg.stderr[-1500:])
            print("node stdout:", process_arg.stdout[-3000:])
            sys.exit(1)
        cookie2_2 = json.loads(process_arg.stdout.strip().splitlines()[-1])
        sess.cookies.set('6HZbKHDjIEcgT',cookie2_2)
        params2 = {
            "kind": "0",
            "id": gch,
            "from": "Qikan_Journal_Summary"
        }
        result2 = sess.post(url=url2,headers=headers2,params=params2)

        parser = html.HTMLParser(encoding='utf-8')
        doc = html.fromstring(result2.content, parser=parser)
        info = {}
        for li in doc.xpath('//div[contains(@class,"info-list") and contains(@class,"l1")]//ul/li'):
            span = li.xpath('./span[@class="label"]')
            if not span:
                continue
            label = span[0].text_content().strip()          # 主管单位 / 主办单位 / ...
            full  = li.text_content().strip()               # 字段名+值
            value = full[len(label):].strip()               # 去掉字段名，剩下就是值
            info[label] = value

        item[name] = info
        print(collect)
        time.sleep(5)

    print(" ================================================================= ")
    print(collect)

    with open(os.path.join(bashpath,'..','data','result.json'),'w',encoding='utf-8') as f:
        json.dump(collect, f, ensure_ascii=False, indent=2)
        print("写入完成完成")

if __name__ == "__main__":
    spider(3)