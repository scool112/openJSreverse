


import os
import requests
import execjs

# 第一次请求
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://ec.chng.com.cn",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "dnt": "1",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-gpc": "1"
}
url = 'https://ec.chng.com.cn/scm-uiaoauth-web/s/business/uiaouth/queryAnnouncementByTitle'
requests = requests.session()
response = requests.post(url, headers=headers).text
print(response)
jsbase = response.split("r='m'>")[3].split(';</script><script')[0]
mvppath = response.split('src="')[1].split('" r=')[0]

# 第二次请求得到 jsvmp
mvpcode = requests.get('https://ec.chng.com.cn' + mvppath,headers=headers).content

# 写入文件
BASE = os.path.dirname(os.path.abspath(__file__))
JsBytecode = os.path.join(BASE, '..', 'Jscode', 'JsBytecode.js')
JsMvp = os.path.join(BASE, '..', 'Jscode', 'JsMvp.js')
with open(JsBytecode,'w',encoding="utf-8") as f:
    f.write(jsbase)
    print("JsBytecode写入完成")
with open(JsMvp,'wb') as f:
    f.write(mvpcode)
    print("JsMvp写入完成")

# 得到js加密参数
Box = os.path.join(BASE, '..', 'Jscode', 'env2.js')
with open(Box, encoding='utf-8') as f:
    JsCode = f.read()

# execjs 通过 stdin 把代码喂给 node，相对路径 require('./xxx.js') 会失效（[stdin]），
# 所以把 require 的两行直接替换成对应文件内容，行为等价且不依赖运行目录。
for jsfile in (JsBytecode, JsMvp):
    with open(jsfile, encoding='utf-8') as f:
        content = f.read()
    JsCode = JsCode.replace("require('./%s')" % os.path.basename(jsfile), content)

Js = execjs.compile(JsCode)
Arg = Js.call('get_cookie')
print(Arg)

# 最终：得到数据的申请
data = '{"start":0,"limit":10,"type":"103","search":"","ifend":""}'.encode('utf-8', 'surrogateescape')
requests.cookies.set('S6J51OuUjLieP', Arg)

response = requests.post(url, headers=headers,data=data)
print(response.text)
print(response.status_code)
