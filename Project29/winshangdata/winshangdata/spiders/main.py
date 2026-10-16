import scrapy
from scrapy.http import HtmlResponse  # 导入response响应对象的类型
from scrapy import cmdline  # 导入运行指令的工具
import os
import json

class MainSpider(scrapy.Spider):
    name = 'main'

    def __init__(self, *a, **kw):
        super().__init__(*a, **kw)
        self.CatNum = 0
        self.pageNum = 1
        self.result = {}
        self.bashpath = os.path.dirname(os.path.abspath(__file__))
        self.Category  = [
                          "餐饮",
                          "儿童亲子",
                          "文体娱",
                          "零售",
                          "生活服务",
                          "其他类型"
                          ]
        self.url = 'http://www.winshangdata.com/wsapi/brand/getBigdataList3_4'
        self.url2 = 'http://www.winshangdata.com/wsapi/brand/getBigdataBrandExpandDemand'

    """ 发起 """
    def start_requests(self):
        yield from self.my_requests(self.url,self.Category[self.CatNum],self.pageNum,None,None)

    def my_requests(self,url:str,cat:str ,pageNum:int ,brandId,meta):
        if (url == self.url):
            yield from self.list_requests(url,cat,pageNum)
        if (url == self.url2):
            yield from self.data_requests(url,brandId,meta)

    def list_requests(self,url,cat:str ,pageNum:int):
        body = {
            "isHaveLink": "", "isTuozhan": "", "isXxPp": "", "kdfs": "", "key": "",
            "orderBy": "1", "pageNum": pageNum, "pageSize": 60, "pid": "",
            "qy_p": "", "qy_r": "", "xqMj": "", "ytlb1": cat, "ytlb2": "",
        }

        yield scrapy.Request(url=url,
                             method="POST",
                             body=json.dumps(body,ensure_ascii=False),
                             dont_filter=True,
                             )

    def data_requests(self,url,brandId,meta=None):
        body = {
            "brandId":brandId
        }
        yield scrapy.Request(
            url=url,
            method="POST",
            meta=meta or {},
            body=json.dumps(body, ensure_ascii=False),
            callback=self.parse_detail,
            dont_filter=True,
        )

    """ 数据处理 """
    def parse(self, response: HtmlResponse, **kwargs):
        if (response.url == "http://www.winshangdata.com/wsapi/brand/getBigdataList3_4"):
            if not isinstance(self.result.get(self.Category[self.CatNum]), list):
                self.result[self.Category[self.CatNum]] = []
            collet = response.json()['data']['list']
            colen = len(collet)
            if (colen == 0):
                if (self.CatNum < len(self.Category) - 1 ):
                    self.CatNum += 1
                    self.pageNum = 1
                    yield from self.my_requests(self.url, self.Category[self.CatNum], self.pageNum, None,None)
            else:
                for i in range(colen):
                    res = {'标题': collet[i]['brandName']}
                    self.result[self.Category[self.CatNum]].append(res)
                    yield from self.my_requests(self.url2, None, None, collet[i]['brandId'], {"item": res})  # 每条都发
                self.pageNum += 1
                yield from self.my_requests(self.url, self.Category[self.CatNum], self.pageNum, None, None)

    def parse_detail(self, response):
        collet = response.json()['data']
        res = response.meta["item"]
        res['创建时间'] = collet['createDate']
        res['开店方式'] = collet['kaiDianMode']
        res['面积要求'] = str(collet['mianJi_Min']) + " - " + str(collet['mianJi_Max'])
        res['合作期限'] = collet['qiXian_Min'] + "年" + " - " + collet['qiXian_Max'] + "年"

if __name__ == '__main__':
    # 使用scrapy框架自带的命令工具来启动爬虫脚本
    cmdline.execute('scrapy crawl main'.split())




