import requests
import os
import sys
import subprocess
import json
import time

def spider(pageNum:int):
    bashpath = os.path.dirname(os.path.abspath(__file__))
    sess = requests.session()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:153.0) Gecko/20100101 Firefox/153.0",
        "Accept": "*/*",
        "Accept-Language": "zh",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        "Authorization": "null",
        "Eco-Code": "",
        "X-Requested-With": "XMLHttpRequest",
        "traceparent": "00-4b53a42cbc405021221143fa027a3c5f-221143fa027a3c5f-01",
        "Origin": "https://www.obei.com.cn",
        "Connection": "keep-alive",
        "Referer": "https://www.obei.com.cn/obei-web-ec-ego/ego/home/noticeList.html?noticeType=1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Priority": "u=0",
        "TE": "trailers"
    }
    # cookies = {
    #     "iEsNcXuxuNyHP": "0_7PEUNisXIA_VNh625IEJF6XbdhroEYSBe.imlLlE9Q72wt6G171h5JNWCmmz7ifz_sUiA7WymuApjgCVkHYSlQTDe_H2ILVnGqLqDADRlGEI7qCFMQhLdvXcSc2TM8BpTNIX8o2jfLb2IStZ6ZIC7kYzaTjE6.3vZe4mSyL.k8GMpB.IDFvkplLE3HGdnnjf6bIO1G5dxWj2B3ip5wOO5eUzQILgi5VjQ.iTP8wbDUHRXIy599xznbJJLrQD1mef.2Nt6TVbuOYwvej6iKQUPDndcVsfsdb4N3BbfVCausGE3MJuDaSqxBCd1Uo8rkfJBObx2kmvj8YZ363ZpCmQ2so4DSgT6ZIxpUhEKvFncYuFpK6XWzXmw6kOZfr8ygcmoXmrkrwsVtzB7fTfwTRuUhICSSbAJsT2H2HkU0PT5NIVT1aTU4Z4vdXpk24BIXp",
    #     "_gc_s_cs0_d0_sec0_part0": "rum=1&id=6bfe6555-0872-4da1-bdf1-67784921e718&created=1791119854855&expire=1791121342828",
    #     "_gc_usr_id_cs0_d0_sec0_part0": "78202697-e1f5-46bd-bbc5-9374e6b1d968",
    #     "Hm_lvt_4d17d88f6dd779ba4f331534b620ff84": "1791119856",
    #     "Hm_lpvt_4d17d88f6dd779ba4f331534b620ff84": "1791119856",
    #     "HMACCOUNT": "880441CCB12F0AE8"
    # }
    url = 'https://www.obei.com.cn/obei-gateway/pc-bff/n/elasticsearch/getNotice'
    # params = {
    #     "7w6qL5Ai": "0umIk6GlqWEMvnbRgLhCCnuElq_AXPCQ9dlP0Uq2Ino2hyLX3pnUZTFE6b3GUJgcylCXPSJRSI0cTsedTZGqkzzsG1cZVI5fLchUPwzDgvinTK6FCdk5_QUavGqmG0ZIMw1fSTpAXrINkGwyatC_HQZR3_DfrUZI2"
    # }
    body = '{"pageFlag":"addSelect","memo":"obei","noticeType":"1","rfqMethod":"","publicBiddingFlag":"","ouName":"","sidx":"issueDate","sord":"desc","registrationEndDateStartDate":"","registrationEndDateEndDate":"","quotationEndDateStartDate":"","quotationEndDateEndDate":"","province":"","extendUuCodes":"E21104700,E25711600,E27423800,U12626,UI0283","category":"","page":%d,"rows":10}' % pageNum
    # data = '{"pageFlag":"addSelect","memo":"obei","noticeType":"1","rfqMethod":"","publicBiddingFlag":"","ouName":"","sidx":"issueDate","sord":"desc","registrationEndDateStartDate":"","registrationEndDateEndDate":"","quotationEndDateStartDate":"","quotationEndDateEndDate":"","province":"","extendUuCodes":"E21104700,E25711600,E27423800,U12626,UI0283","category":"","page":3,"rows":10}'.encode('utf-8', 'surrogateescape')
    data = body.encode('utf-8', 'surrogateescape')
    response = sess.post(url, headers=headers,  data=data)
    res1 = response.text
    jsvmpUrl = res1.split('src="')[1].split('" r')[0]
    res2 = sess.get("https://www.obei.com.cn"+jsvmpUrl,headers=headers).content

    with open(os.path.join(bashpath,"..","html",'jsbyte.html'),'w') as f:
        f.write(res1)
        print("html 文件写入成功")
    with open(os.path.join(bashpath,'..','jscode','jsvmp.js'),'wb') as f:
        f.write(res2)
        print("jsvmp 写入成功")


    process_cookie = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'index.js')],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_cookie.returncode != 0 or not process_cookie.stdout.strip():
        print("node 失败:", process_cookie.stderr[-1500:])
        print("node stdout:", process_cookie.stdout[-3000:])
        sys.exit(1)
    COOKIE = json.loads(process_cookie.stdout.strip().splitlines()[-1])

    sess.cookies.set("iEsNcXuxuNyHP",COOKIE)

    res3 = sess.post(url=url,headers=headers,data=data).json()

    result  = []

    for i in res3['list']:
        res = {}
        res['标题'] = i['title']
        res['发布时间'] = i['issueDate']
        res['寻源方式'] = i['rfqMethod']
        result.append(res)
        print(res)

    fileName = "result" + str(pageNum) + ".json"

    with open(os.path.join(bashpath,'..','data',fileName),'w',encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
        print( fileName + "写入完成完成")


if __name__ == "__main__":
    for i in range(2,12):
        spider(i)
        time.sleep(5)