import matplotlib
matplotlib.use('TkAgg')  # 或 'Qt5Agg'，具体取决于您安装的支持包

import ddddocr
import matplotlib.pyplot as plt
# 处理字体文件库
from fontTools.ttLib import TTFont
# # 加载字体文件
from lxml import etree
import os

class font_parse():
    def __init__(self, woff:str,xmlfile:str,imadir:str):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))  # font_parse.py 所在目录 = ...\py\font
        self.imadir = os.path.join(self.base_dir, imadir)
        os.makedirs(self.imadir, exist_ok=True)
        self.xmlfile = os.path.join(self.base_dir, xmlfile)
        self.font = TTFont(os.path.join(self.base_dir, woff))
        self.font.saveXML(self.xmlfile)

    # 绘制图案的函数
    def paint(self, xy_list, TTGlyph_name):
        plt.figure(figsize=(10, 10))
        # 遍历每个图案
        for shape in xy_list:
            # 提取 x 和 y 坐标
            x, y = zip(*[(int(point[0]), int(point[1])) for point in shape])

            # 绘制多边形
            plt.plot(x, y, marker='o')  # 连接点的多边形
            plt.fill(x, y, alpha=0.3)  # 填充多边形
        plt.xticks([])  # 隐藏x轴刻度标签
        plt.yticks([])
        # 设置绘图属性
        plt.axis('equal')  # 坐标轴比例一致
        plt.grid(True)
        # plt.show()
        plt.savefig(os.path.join(self.imadir, TTGlyph_name[0] + ".png"))

    #使用ddddocr识别手写体数字（针对字体反爬设计）
    def pic_ocr(self, TTGlyph_name):
        ocr = ddddocr.DdddOcr(show_ad=False)

        with open(os.path.join(self.imadir, TTGlyph_name[0] + ".png"), 'rb') as f:     # 设置图片的文件夹
            image = f.read()

        res = 0 if ocr.classification(image) == "D" else ocr.classification(image)
        return res

    #使用lxml解析XML中的<contour>和<pt>节点
    def parse_font(self, tt):
        if tt.xpath('./contour[1]'):
            xy_list = []
            TTGlyph_name = tt.xpath('./@name')
            # TTGlyph_xy = [(x,y) for x,y in zip(tt.xpath('./contour/pt/@x'), tt.xpath('./contour/pt/@y'))]
            contour_list = tt.xpath('./contour')
            for contour in contour_list:
                TTGlyph_xy = [(x,y) for x,y in zip(contour.xpath('./pt/@x'), contour.xpath('./pt/@y'))]
                TTGlyph_xy.append(TTGlyph_xy[0])
                xy_list.append(TTGlyph_xy)

            self.paint(xy_list, TTGlyph_name)
            res = self.pic_ocr(TTGlyph_name)

            # print(res)
            # print(for i in xy_list)
            # print(xy_list)
            return  (TTGlyph_name[0], res)

    def run(self):
        ziti = {}
        xml_data = open(self.xmlfile).read().encode('utf-8')
        root = etree.fromstring(xml_data)
        TTGlyph_list = root.xpath('//glyf/TTGlyph')
        for tt in TTGlyph_list[1:-1]:
            key, value = self.parse_font(tt)
            ziti[key] = int(value)
        return ziti



if __name__ == '__main__':
    zt = font_parse('file.woff','file.xml','image')      #  输入字体文件名   可改
    print(zt.run())







