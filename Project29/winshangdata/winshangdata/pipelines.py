# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import json, os


class WinshangdataPipeline:
    def open_spider(self, spider):
        self.path = os.path.join(spider.bashpath, '..', '..', 'data', 'result.json')

    def close_spider(self, spider):
        # 1) 读已有数据（不存在 / 0 字节 / 坏 JSON 都当空字典）
        old = {}
        if os.path.exists(self.path) and os.path.getsize(self.path) > 0:
            try:
                with open(self.path, 'r', encoding='utf-8') as f:
                    old = json.load(f)
            except (json.JSONDecodeError, ValueError):
                old = {}

        # 2) 合并本次结果
        old.update(spider.result)      # 按分类合并：新分类加入，老分类用新数据替换

        # 3) 写回
        with open(self.path, 'w', encoding='utf-8') as f:
            json.dump(old, f, ensure_ascii=False, indent=2)