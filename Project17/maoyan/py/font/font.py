
# 导入字体处理文件
from fontTools.ttLib import TTFont

def font()->None:
    # 加载字体问题
    font = TTFont("file.woff")
    # 转化成 xml 文件
    font.saveXML("file.xml")
    print("转换成 file.xml 文件")


