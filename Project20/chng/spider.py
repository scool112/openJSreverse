
import requests
from lxml import html
import re
import os
import json as _json
import subprocess
import sys
from urllib.parse import quote

""" ========== 对应文件路径 ========== """
bashpath = os.path.dirname(os.path.abspath(__file__))
htmlpath = os.path.join(bashpath,'webpage.html')
vmppath = os.path.join(bashpath,'jsvmp.js')
sdenvpath = os.path.join(bashpath,'..','..','AiEeverseEnv','sdenv','index.js')

""" ========== session请求体 ========== """
sess = requests.session()
sess2 = requests.session()
sess3 = requests.session()

""" ========== 第一次请求 ========== """
def FirstSpider(locationhref,InterfaceUrl,headers,data,dictCookie,whichNum)->dict[str,str]:
    if (whichNum == 1):
        res1 = sess.post(InterfaceUrl, headers=headers, verify=False)
        NOh8RTWx6K2dS = 'NOh8RTWx6K2dS=' + sess.cookies.get_dict()['NOh8RTWx6K2dS']
        WEB = "WEB=" + sess.cookies.get_dict()['WEB']
        res1_text = res1.text
        return {
            "text":res1_text,
            "locationhref":locationhref,
            'InterfaceUrl':InterfaceUrl,
            "cookie":[
                WEB,NOh8RTWx6K2dS
            ],
            "endNum":3,
            'whichNum':whichNum,
        }

""" ========== 第一次请求的对应响应操作 ========== """
def firshProcess(Arg:dict)->dict:
    tree = html.fromstring(Arg['text'])
    linkstart = tree.xpath('//script[@type="text/javascript"]')[2].text  # 提取外链，让后面手动操作
    vmpurl = tree.xpath('//script[@type="text/javascript"]/@src')[0]
    res_text = re.sub(r'<script\b[^>]*\br=["\']m["\'][^>]*>\s*(_\$.*?)</script>', '', Arg['text'], flags=re.S)  # 删除对应外链
    # 写入文件
    with open(htmlpath, 'w', encoding='utf-8') as f:
        f.write(res_text)
    if (Arg['whichNum'] == 1):
        print("第一接口的第一次响应写入成功")
        result = {
            'locationhref': Arg['locationhref'],
            'InterfaceUrl': Arg['InterfaceUrl'],
            "vmppath": vmppath,
            "htmlpath": htmlpath,
            'sdenvpath': sdenvpath,
            "linkstart": linkstart,
            'vmpurl': vmpurl,
            'cookie': Arg['cookie'],
            "endNum": 3,
            "Whethermanual": "P1"
        }
        return result

""" ========== 第二次请求: vmp请求和处理（多次使用） ========== """
def SecondSpider(bashurl:str, vmpurl:str,headers,whichNum) -> None:
    if (whichNum == 1):
        res2 = sess.get(bashurl + vmpurl, headers=headers, verify=False).content
        with open(vmppath, 'wb') as f:
            f.write(res2)
            print('第二次请求成功，第一次jsvmp写入成功')
    if (whichNum == 2):
        res2 = sess2.get(bashurl + vmpurl, headers=headers, verify=False).content
        with open(vmppath, 'wb') as f:
            f.write(res2)
            print('第二个接口第一次请求成功，第一次jsvmp写入成功')

""" ========== 传递参数给js主程序,并输出结果 ========== """
def jsindex(jsarg:dict)->dict[str,str]:
    jsarg = _json.dumps(jsarg)
    process_reult =  subprocess.run(
            ["node", os.path.join(bashpath,"index.js"), jsarg],
            cwd=os.path.join(bashpath), capture_output=True, text=True, encoding="utf-8", timeout=90,
        )  # cwd 是执行的nodejs路径位置 , capture_output=True 是同意输出
    if process_reult.returncode != 0 or not process_reult.stdout.strip():
        print("node 失败:", process_reult.stderr[-1500:])   # 崩溃原因在这里，必须打出来
        print("node stdout:", process_reult.stdout[-3000:])  # 关键：诊断日志在 stdout
        sys.exit(1)
    print("js返回成功")
    return _json.loads(process_reult.stdout.strip().splitlines()[-1])

def jsindex_Suffix(jsarg:dict)->dict[str,str]:
    jsarg = _json.dumps(jsarg)
    process_reult =  subprocess.run(
            ["node", os.path.join(bashpath,"indexSuffix2.js"), jsarg],
            cwd=os.path.join(bashpath), capture_output=True, text=True, encoding="utf-8", timeout=90,
        )  # cwd 是执行的nodejs路径位置 , capture_output=True 是同意输出
    if process_reult.returncode != 0 or not process_reult.stdout.strip():
        print("node 失败:", process_reult.stderr[-1500:])   # 崩溃原因在这里，必须打出来
        print("node stdout:", process_reult.stdout[-3000:])  # 关键：诊断日志在 stdout
        sys.exit(1)
    print("js返回成功")
    print("suffix stdout:", process_reult.stdout[-2500:])
    return _json.loads(process_reult.stdout.strip().splitlines()[-1])
def ThirdSpider(NewCookiedict:dict,InterfaceUrl,headers):
    sess.cookies.set('NOh8RTWx6K2dT', NewCookiedict["NOh8RTWx6K2dT"])  # 填充 cookie
    res3 = sess.post(InterfaceUrl,headers=headers, verify=False)
    print("第一接口的 cookie : ", res3.cookies.get_dict())
    print("res3的cookie : ",res3.cookies)
    print("res3响应：",res3.status_code)
    return {
        "resp":res3,
        'NewCookiedict':NewCookiedict
    }

""" ========== 第三次请求的对应响应操作 ========== """
def thirdSProcess(resp,NewCookiedict:dict)->dict:
    with open(htmlpath,'w', encoding='utf-8') as f:
        f.write(resp.text)
        print('接口一的最终响应写入成功')
    tree = html.fromstring(resp.text)
    __RequestVerificationToken = tree.xpath('//input[@name="__RequestVerificationToken"]/@value')[0]
    vmpurl = tree.xpath('//script[@type="text/javascript"]/@src')[0]
    NewCookiedict['__RequestVerificationToken'] = __RequestVerificationToken
    NewCookiedict['.AspNetCore.Antiforgery.VJ9V3gR6RkM'] = resp.cookies.get_dict()['.AspNetCore.Antiforgery.VJ9V3gR6RkM']
    NewCookiedict['vmpurl'] = vmpurl
    return NewCookiedict

""" ========== 第一接口的总操作 ========== """
def FmainReq()->dict:
    locationhref = 'http://epub.cnipa.gov.cn/'
    InterfaceUrl = 'http://epub.cnipa.gov.cn/'
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Referer": "http://epub.cnipa.gov.cn/",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "dnt": "1",
        "sec-gpc": "1"
    }
    Arg = FirstSpider(locationhref,InterfaceUrl,headers,None,None,1)
    Arg = firshProcess(Arg)
    SecondSpider('http://epub.cnipa.gov.cn',Arg['vmpurl'],headers,1)
    NewCookiedict =  jsindex(Arg)
    Arg = ThirdSpider(NewCookiedict,InterfaceUrl,headers)
    result = thirdSProcess(Arg['resp'],Arg['NewCookiedict'])
    return result

""" ========== 第二接口的总操作 ========== """
def SecmainReq(NewCookiedict:dict)->dict:
    locationhref = 'http://epub.cnipa.gov.cn/Dxb/IndexQuery'
    InterfaceUrl = 'http://epub.cnipa.gov.cn/Dxb/IndexQuery'
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "http://epub.cnipa.gov.cn",
        "Pragma": "no-cache",
        "Referer": "http://epub.cnipa.gov.cn/",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "dnt": "1",
        "sec-gpc": "1"
    }
    data = (f'searchStr=%E7%94%B5%E5%AD%90&fmgb=true&fmsq=true&xxsq=true&wgsq=true&trsSql='
            f'&__RequestVerificationToken={NewCookiedict["__RequestVerificationToken"]}'
            f'&fmgb=false&fmsq=false&xxsq=false&wgsq=false')
    SecondSpider('http://epub.cnipa.gov.cn',NewCookiedict['vmpurl'],headers,2)
    Arg = {}
    Arg['locationhref'] = locationhref
    Arg['InterfaceUrl'] = InterfaceUrl
    Arg['data'] = data
    Arg['cookie'] = [
        'NOh8RTWx6K2dT=' + NewCookiedict['NOh8RTWx6K2dT'],
        "NOh8RTWx6K2dS=" + NewCookiedict['NOh8RTWx6K2dS'],
        ".AspNetCore.Antiforgery.VJ9V3gR6RkM=" + NewCookiedict['.AspNetCore.Antiforgery.VJ9V3gR6RkM'],
         "WEB="+NewCookiedict['WEB']
    ]
    Arg['vmppath'] = vmppath
    Arg["htmlpath"] = htmlpath
    Arg['sdenvpath'] = sdenvpath
    Arg['endNum'] = 4
    Arg['Whethermanual'] = "P2"
    Arg['vmpurl'] = NewCookiedict['vmpurl']
    print(Arg)
    NewCookiedict =  jsindex(Arg)
    print("第二个接口的 cookie 值： ",NewCookiedict)
    sess2.cookies.set("NOh8RTWx6K2dT",NewCookiedict['NOh8RTWx6K2dT'])
    sess2.cookies.set('NOh8RTWx6K2dS',NewCookiedict['NOh8RTWx6K2dS'])
    sess2.cookies.set('.AspNetCore.Antiforgery.VJ9V3gR6RkM',NewCookiedict['.AspNetCore.Antiforgery.VJ9V3gR6RkM'])
    sess2.cookies.set('WEB',NewCookiedict['WEB'])
    result = sess2.post(InterfaceUrl, headers=headers, data=data,verify=False)
    print("P2 status:", result.status_code)
    print("P2 resp headers:", dict(result.headers))
    print("P2 body head:", repr(result.text[:300]))
    print("第二接口的 cookie : ",result.cookies.get_dict())
    with open(htmlpath,'w', encoding='utf-8') as f:
        f.write(result.text)
        print("第二轮接口的最终响应数: ",result.status_code)
        print("第二轮接口的最终响应写入到了 webpage.html")
    tree = html.fromstring(result.text)
    __RequestVerificationToken = tree.xpath('//input[@name="__RequestVerificationToken"]/@value')[0]
    vmpurl = tree.xpath('//script[@type="text/javascript"]/@src')[0]
    # ★ 动态游标：翻到第 2 页时 searchAfter = 上一页最后一条的 (lastGgr;lastAn)（sortFiled=ggr_desc 用 lastGgr）
    _lastGgr = (tree.xpath('//input[@id="lastGgr"]/@value') or [''])[0]
    _lastAn = (tree.xpath('//input[@id="lastAn"]/@value') or [''])[0]
    _searchAfter = f'{_lastGgr};{_lastAn}'
    print("动态 searchAfter =", _searchAfter)
    SecondSpider('http://epub.cnipa.gov.cn', vmpurl, headers, 2)
    print("第二个接口的最终响应的 vmp 写入成功")
    res = {
        "cookie":[
            "NOh8RTWx6K2dT=" + NewCookiedict['NOh8RTWx6K2dT'],
            "NOh8RTWx6K2dS=" + NewCookiedict['NOh8RTWx6K2dS'],
            ".AspNetCore.Antiforgery.VJ9V3gR6RkM=" + NewCookiedict['.AspNetCore.Antiforgery.VJ9V3gR6RkM'],
            "WEB=" + NewCookiedict['WEB']
        ],
        "vmpurl":vmpurl,
        "data":f'searchCatalogInfo.Pubtype=1&searchCatalogInfo.Ggr_Begin=&searchCatalogInfo.Ggr_End=&searchCatalogInfo.Pd_Begin=&searchCatalogInfo.Pd_End=&searchCatalogInfo.An=&searchCatalogInfo.Pn=&searchCatalogInfo.Ad_Begin=&searchCatalogInfo.Ad_End=&searchCatalogInfo.E71_73=%E7%94%B5%E5%AD%90&searchCatalogInfo.E72=%E7%94%B5%E5%AD%90&searchCatalogInfo.Edz=%E7%94%B5%E5%AD%90&searchCatalogInfo.E51=&searchCatalogInfo.Ti=%E7%94%B5%E5%AD%90&searchCatalogInfo.Abs=%E7%94%B5%E5%AD%90&searchCatalogInfo.Edl=%E7%94%B5%E5%AD%90&searchCatalogInfo.E74=%E7%94%B5%E5%AD%90&searchCatalogInfo.E30=&searchCatalogInfo.E66=&searchCatalogInfo.E62=&searchCatalogInfo.E83=&searchCatalogInfo.E85=&searchCatalogInfo.E86=&searchCatalogInfo.E87=&pageModel.pageNum=2&pageModel.pageSize=3&sortFiled=ggr_desc&searchAfter={quote(_searchAfter, safe="")}&showModel=1&isOr=True&__RequestVerificationToken={__RequestVerificationToken}'
              #  searchCatalogInfo.Pubtype=1&searchCatalogInfo.Ggr_Begin=&searchCatalogInfo.Ggr_End=&searchCatalogInfo.Pd_Begin=&searchCatalogInfo.Pd_End=&searchCatalogInfo.An=&searchCatalogInfo.Pn=&searchCatalogInfo.Ad_Begin=&searchCatalogInfo.Ad_End=&searchCatalogInfo.E71_73=%E7%94%B5%E5%AD%90&searchCatalogInfo.E72=%E7%94%B5%E5%AD%90&searchCatalogInfo.Edz=%E7%94%B5%E5%AD%90&searchCatalogInfo.E51=&searchCatalogInfo.Ti=%E7%94%B5%E5%AD%90&searchCatalogInfo.Abs=%E7%94%B5%E5%AD%90&searchCatalogInfo.Edl=%E7%94%B5%E5%AD%90&searchCatalogInfo.E74=%E7%94%B5%E5%AD%90&searchCatalogInfo.E30=&searchCatalogInfo.E66=&searchCatalogInfo.E62=&searchCatalogInfo.E83=&searchCatalogInfo.E85=&searchCatalogInfo.E86=&searchCatalogInfo.E87=&pageModel.pageNum=2&pageModel.pageSize=3&sortFiled=ggr_desc&searchAfter=20260911%3B2024800036132&showModel=1&isOr=True&__RequestVerificationToken=CfDJ8Gmsyyy0KWpPkYr5SBQ5W_lxYpv_jKJ7-f-_5W7qLUhr-L7CLWaZfXnetR5ZZRk76x0FQZFu418eC2NfVH-22zYTmKej8Irx8S2yhbFDiqBFctQqBfOOQFNZlrnZ3lFUPEeGNtk0_1Hdmw8j02I3vc4'
    }
    return res

    # print("result.txt = ",result.text)

""" ========== 第三接口的总操作 ========== """
def ThirdReq(Arg:dict)->None:
    import re as _re
    locationhref = "http://epub.cnipa.gov.cn/Dxb/IndexQuery"
    InterfaceUrl = "http://epub.cnipa.gov.cn/Dxb/PageQuery"
    UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    headers = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "http://epub.cnipa.gov.cn",
        "Pragma": "no-cache",
        "Referer": "http://epub.cnipa.gov.cn/Dxb/IndexQuery",
        "User-Agent": UA,
        "X-Requested-With": "XMLHttpRequest",
        "dnt": "1",
        "sec-gpc": "1"
    }

    # ---- 从 P2 结果页(webpage.html)抽第三段素材 ----
    with open(htmlpath, 'r', encoding='utf-8') as f:
        webpage3 = f.read()
    m_meta = _re.search(r'<meta[^>]*id="[A-Za-z0-9]{8,}"[^>]*content="([^"]+)"', webpage3) or \
             _re.search(r'<meta[^>]*content="([^"]+)"[^>]*id="[A-Za-z0-9]{8,}"', webpage3)
    meta3 = m_meta.group(1) if m_meta else ""
    ts_block3 = ""
    for s in _re.findall(r"<script(?![^>]*src=)[^>]*>([\s\S]*?)</script>", webpage3):
        if "$_ts" in s and len(s) > len(ts_block3):
            ts_block3 = s
    m_tok = _re.search(r'name="__RequestVerificationToken"[^>]*value="([^"]*)"', webpage3)
    token2 = m_tok.group(1) if m_tok else ""
    m_an = _re.search(r'id="lastAn"[^>]*value="([^"]*)"', webpage3)
    m_ggr = _re.search(r'id="lastGgr"[^>]*value="([^"]*)"', webpage3)
    last_an = m_an.group(1) if m_an else ""
    last_ggr = m_ggr.group(1) if m_ggr else ""
    search_after = (last_ggr + "%3B" + last_an) if (last_ggr and last_an) else ""
    print("[P3素材] meta=%d $_ts块=%d token2=%s searchAfter=%s" % (len(meta3), len(ts_block3), token2[:20], search_after))

    body3 = ('searchCatalogInfo.Pubtype=1&searchCatalogInfo.Ggr_Begin=&searchCatalogInfo.Ggr_End='
             '&searchCatalogInfo.Pd_Begin=&searchCatalogInfo.Pd_End=&searchCatalogInfo.An=&searchCatalogInfo.Pn='
             '&searchCatalogInfo.Ad_Begin=&searchCatalogInfo.Ad_End=&searchCatalogInfo.E71_73=%E7%94%B5%E5%AD%90'
             '&searchCatalogInfo.E72=%E7%94%B5%E5%AD%90&searchCatalogInfo.Edz=%E7%94%B5%E5%AD%90'
             '&searchCatalogInfo.E51=&searchCatalogInfo.Ti=%E7%94%B5%E5%AD%90&searchCatalogInfo.Abs=%E7%94%B5%E5%AD%90'
             '&searchCatalogInfo.Edl=%E7%94%B5%E5%AD%90&searchCatalogInfo.E74=%E7%94%B5%E5%AD%90'
             '&searchCatalogInfo.E30=&searchCatalogInfo.E66=&searchCatalogInfo.E62=&searchCatalogInfo.E83='
             '&searchCatalogInfo.E85=&searchCatalogInfo.E86=&searchCatalogInfo.E87='
             '&pageModel.pageNum=2&pageModel.pageSize=3&sortFiled=ggr_desc'
             '&searchAfter=' + search_after +
             '&showModel=1&isOr=True&__RequestVerificationToken=' + token2)

    jsbyte3path = os.path.join(bashpath, 'jsbyte3.js')
    with open(jsbyte3path, 'w', encoding='utf-8') as f:
        f.write(ts_block3)

    cookie_list = [c for c in Arg['cookie'] if '=' in c]   # ["name=value", ...]
    Arg3 = {
        "sdenvpath": sdenvpath, "UA": UA,
        "locationhref": locationhref, "InterfaceUrl": InterfaceUrl,
        "Body": body3, "Cookies": cookie_list, "CookieUrl": InterfaceUrl,
        "MetaContent": meta3, "jsbytepath": jsbyte3path, "vmpcodepath": vmppath,
    }
    p = subprocess.run(
        ["node", os.path.join(bashpath, "indexP3.js"), _json.dumps(Arg3)],
        cwd=bashpath, capture_output=True, text=True, encoding="utf-8", timeout=120,
    )
    if p.returncode != 0 or not p.stdout.strip():
        print("indexP3 失败:", (p.stderr or "")[-1500:])
        print("indexP3 stdout:", (p.stdout or "")[-800:])
        sys.exit(1)
    print("indexP3 stderr:", (p.stderr or "")[-300:])
    res3 = _json.loads(p.stdout.strip().splitlines()[-1])
    final_url = res3["finalUrl"]
    cookie_parts = res3.get("cookieParts", [])
    print("[P3] finalUrl:", final_url[:130], "...")
    print("[P3] cookieParts:", cookie_parts)

    # 组装 cookie：VMP 写入的（权威）+ 原有全量
    for pair in cookie_parts:
        k, _, v = pair.partition('=')
        if k:
            sess3.cookies.set(k, v)
    for c in cookie_list:
        k, _, v = c.partition('=')
        if k:
            sess3.cookies.set(k, v)
    print("[P3] 发送时 cookie:", sess3.cookies.get_dict())

    Result = sess3.post(final_url, headers=headers, data=body3.encode('utf-8'), verify=False)
    print("============================= 最终成品 ============================")
    print(Result.status_code)
    print(Result.text[:1500])


""" ========== 总操作 ========== """
def main():
    dictCookies = FmainReq()
    Arg = SecmainReq(dictCookies)
    ThirdReq(Arg)


if __name__ == "__main__":
    main()
