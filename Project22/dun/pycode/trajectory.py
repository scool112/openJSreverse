# -*- coding: utf-8 -*-
"""
文字点选（易盾 type=3）坐标 / 轨迹生成。

本文件只导出一个函数：
    TPmain(front) -> dict

    front: 形如 spider2 里 res.split('"front":"')[1].split('","')[0] 得到的目标字串，
           例如 "类验全"（按点击顺序）。

返回值（可直接 JSON 序列化，喂给 jscode/data.js）：
    {
      "Distance": [{"left": float, "top": float}, ...],   # 每次点击在 Background.jpg 内的坐标
      "jetlag":   [int, ...],                             # 每次点击相对起点(ms)
      "dot":      [[x, y, t, 0], ...],                    # 鼠标移动轨迹(全为 move, type=0)
      "chars":    [...], "boxes": [[x1,y1,x2,y2], ...]     # 调试信息：识别结果与命中框
    }

依赖：ddddocr(检测) + rapidocr_onnxruntime(单字识别) + opencv/numpy/PIL
"""
import os
import io
import json
import math
import random
import numpy as np
import cv2
import ddddocr
from PIL import Image, ImageDraw, ImageFont
from rapidocr_onnxruntime import RapidOCR

_BASE = os.path.dirname(os.path.abspath(__file__))
_IMG_DIR = os.path.join(_BASE, '..', 'image')
_BG = os.path.join(_IMG_DIR, 'Background.jpg')

_FONTS = [
    (r'C:\Windows\Fonts\simhei.ttf', 'simhei'),
    (r'C:\Windows\Fonts\simsun.ttc', 'simsun'),
    (r'C:\Windows\Fonts\msyh.ttc', 'msyh'),
    (r'C:\Windows\Fonts\simkai.ttf', 'simkai'),
    (r'C:\Windows\Fonts\simfang.ttf', 'simfang'),
]

_DROP = '\u3010\u3011[]()\uff08\uff09\u3001,\uff0c \u8bf7\u4f9d\u6b21\u70b9\u51fb\u5e76'   # 【】[]()（）、,， 请依次点击并

_det = None
_ocr = None


def _models():
    """惰性加载模型（只初始化一次）"""
    global _det, _ocr
    if _det is None:
        _det = ddddocr.DdddOcr(det=True, show_ad=False)
    if _ocr is None:
        _ocr = RapidOCR()
    return _det, _ocr


def _imread(path):
    """读图，兼容中文路径"""
    buf = np.frombuffer(open(path, 'rb').read(), dtype=np.uint8)
    return cv2.imdecode(buf, cv2.IMREAD_COLOR)


def _imwrite(path, img):
    ext = os.path.splitext(path)[1] or '.png'
    ok, buf = cv2.imencode(ext, img)
    if ok:
        buf.tofile(path)


def _front_chars(front):
    """从 front 串里取出目标汉字（去掉提示词/括号/标点）"""
    return [c for c in str(front) if c not in _DROP and not c.isspace()]


def _boxes(img):
    """检测画布上的候选字框（过滤边条噪声），返回 [[x1,y1,x2,y2], ...]"""
    det, _ = _models()
    ok, buf = cv2.imencode('.png', img)
    raw = det.detection(buf.tobytes())
    out = []
    for b in raw or []:
        x1, y1, x2, y2 = [int(v) for v in b[:4]]
        w, h = x2 - x1, y2 - y1
        if w < 14 or h < 14:
            continue
        if w > 130 or h > 130:
            continue
        out.append([x1, y1, x2, y2])
    out.sort(key=lambda b: b[0])
    return out


def _mask(crop):
    """按饱和度抠出纯色汉字 -> 黑字白底（去掉照片背景）"""
    hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
    s, v = hsv[:, :, 1].astype(int), hsv[:, :, 2].astype(int)
    m = ((s > 90) & (v > 60)).astype(np.uint8) * 255
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    return m


def _read_char(crop):
    """单字识别：多预处理 × 多尺度 × 旋转搜索，取最高分 -> (字, 分, 角度)"""
    _, ocr = _models()
    best = ('', -1.0, 0)
    srcs = [cv2.cvtColor(255 - _mask(crop), cv2.COLOR_GRAY2BGR), crop]
    for src0 in srcs:
        for sc in (1, 2):
            src = cv2.resize(src0, (src0.shape[1] * sc, src0.shape[0] * sc), interpolation=cv2.INTER_CUBIC)
            for ang in range(-60, 61, 15):
                img = src if ang == 0 else cv2.warpAffine(
                    src, cv2.getRotationMatrix2D((src.shape[1] / 2, src.shape[0] / 2), ang, 1.0),
                    (src.shape[1], src.shape[0]), borderValue=(255, 255, 255))
                try:
                    res, _ = ocr(img, use_det=False, use_cls=False, use_rec=True)
                except Exception:
                    continue
                if res:
                    it = res[0]
                    t, s = (it[1], it[2]) if len(it) == 3 else (it[0], it[1])
                    if t and float(s) > best[1]:
                        best = (t, float(s), ang)
    return best


def _render_fonts(chars, out_path):
    """把目标字用多种字体渲染成一张对照图（写到 image/ 下）"""
    cw, ch = 96, 112
    sheet = Image.new('RGB', (cw * max(len(chars), 1), ch * len(_FONTS)), 'white')
    d = ImageDraw.Draw(sheet)
    for r, (fp, name) in enumerate(_FONTS):
        for c, ch_ in enumerate(chars):
            try:
                f = ImageFont.truetype(fp, 72)
            except Exception:
                continue
            d.text((c * cw + 10, r * ch + 10), ch_, fill='black', font=f)
            d.text((c * cw + 4, r * ch + 92), name, fill=(200, 0, 0))
    sheet.save(out_path)


def _pick_point(box, mask_crop, box_crop_origin):
    """在框内随机生成一个点击点：优先落在笔画(掩码)上，否则框内缩进 20% 随机"""
    x1, y1, x2, y2 = box
    ys, xs = np.where(mask_crop > 0)
    if len(xs) > 8:
        k = random.randrange(len(xs))
        return float(x1 + xs[k]), float(y1 + ys[k])
    w, h = x2 - x1, y2 - y1
    return float(x1 + w * random.uniform(0.25, 0.75)), float(y1 + h * random.uniform(0.25, 0.75))


def _sample_dt():
    """dt(ms) 采样：对齐真实鼠标（0ms:3.6% / 1-2ms:64% / 3-5:20% / 6-10:7% / 11-50:3%）"""
    r = random.random()
    if r < 0.036:
        return 0
    if r < 0.675:
        return 1 if random.random() < 0.7 else 2
    if r < 0.88:
        return random.randint(3, 5)
    if r < 0.95:
        return random.randint(6, 10)
    return random.randint(11, 50)


def _clamp_pt(x, y):
    return min(max(x, 4.0), 316.0), min(max(y, 4.0), 156.0)


def _move(dot, src, dst, t, arc=None, pauses=None):
    """
    从 src 沿弧线移动到 dst，对齐真实鼠标：
      - 每一步挪约 step≈dt 像素（速度中位≈1 px/ms），且 step>=1px（不会原地重复）
      - 途中插入 1~2 次 60~300ms 的短停顿
      - 末点精确等于 dst（点击时鼠标就在点击坐标上）
    """
    x0, y0 = src
    x1, y1 = dst
    dist = math.hypot(x1 - x0, y1 - y0)
    if dist < 0.8:
        dot.append([int(round(x1)), int(round(y1)), int(t), 0])
        return t
    if arc is None:
        arc = random.uniform(-0.15, 0.15) * dist
    nx, ny = -(y1 - y0) / dist, (x1 - x0) / dist
    cx, cy = (x0 + x1) / 2 + nx * arc, (y0 + y1) / 2 + ny * arc
    if pauses is None:
        pauses = random.choice((1, 2))
    stop_at = sorted(random.sample(range(10, 90), k=pauses)) if pauses else []

    # 每次前进约 1px（真实数据步长中位=1px、均值≈1.5px）
    px, py = x0, y0
    while dist > 0.6:
        dt = _sample_dt()
        step = dt if dt > 0 else random.uniform(0.9, 1.5)
        step = max(1.0, step * random.uniform(0.85, 1.2))
        if random.random() < 0.03:
            step *= random.uniform(2.0, 4.0)          # 偶尔"快甩"一截
        step = min(step, dist)
        r = step / max(math.hypot(x1 - px, y1 - py), 1e-6)
        r = min(r, 1.0)
        px = px + (x1 - px) * r + random.uniform(-0.2, 0.2)
        py = py + (y1 - py) * r + random.uniform(-0.2, 0.2)
        px, py = _clamp_pt(px, py)
        t += dt
        p = 1 - math.hypot(x1 - px, y1 - py) / dist if dist else 1
        if stop_at and p * 100 >= stop_at[0]:
            t += random.randint(60, 300)
            stop_at.pop(0)
        ix, iy = int(round(px)), int(round(py))
        if dot and ix == dot[-1][0] and iy == dot[-1][1]:      # 真实数据几乎无原地重复点
            if abs(x1 - px) >= abs(y1 - py):
                ix += 1 if x1 >= px else -1
            else:
                iy += 1 if y1 >= py else -1
        dot.append([ix, iy, int(t), 0])
        dist = math.hypot(x1 - px, y1 - py)
    dot.append([int(round(x1)), int(round(y1)), int(t), 0])
    return t


def _dwell(dot, pt, t, hold=None):
    """在点击点停留（含一次 200~750ms 的大间隔），返回 (停留开始t, 停留结束t)"""
    lo = t
    if hold is None:
        hold = random.randint(300, 800)
    x0, y0 = pt
    spent, jumped = 0, False
    while spent < hold:
        dt = _sample_dt()
        spent += dt
        if not jumped and spent > hold * 0.3:
            dt += random.randint(200, 750)
            jumped = True
        t += dt
        px, py = _clamp_pt(x0 + random.choice((-1, 0, 0, 0, 1)), y0 + random.choice((-1, 0, 0, 0, 1)))
        ix, iy = int(round(px)), int(round(py))
        if dot and ix == dot[-1][0] and iy == dot[-1][1]:
            ix += random.choice((-1, 1))
        dot.append([ix, iy, int(t), 0])
    return lo, t


def _make_track(points):
    """
    根据点击点序列生成 (dot, jetlag)。

    对齐真实采集的时序相位：
      - dot[0] 就是第一次点击点（beginTime 在第一次点击时建立）
      - jetlag[0] ≈ 0（小值），且所有 dot 时间 ≥ jetlag[0]
      - 每次到达点精确等于点击坐标；点击发生在该点的"停留期"内
      - 末次点击之后仍继续移动
    """
    dot, jetlag = [], []
    t = random.randint(320, 700)                      # 轨迹时间起点(>=jetlag[0])
    p0 = points[0]
    dot.append([int(round(p0[0])), int(round(p0[1])), int(t), 0])     # 首点 = 第一次点击点
    jetlag.append(random.randint(5, 20))              # 第一次点击 ≈ 起点

    for i in range(1, len(points)):
        t = _move(dot, points[i - 1], points[i], t)   # 移动到第 i 个点击点
        lo, hi = _dwell(dot, points[i], t)            # 停留
        jetlag.append(random.randint(lo, hi))         # 点击发生在停留期内
        t = hi

    # 末次点击之后：鼠标继续移动一段（真实采集末尾还有几十个点）
    a, b = points[-2], points[-1]
    dx, dy = b[0] - a[0], b[1] - a[1]
    n = math.hypot(dx, dy) or 1.0
    dr = (b[0] + dx / n * random.uniform(40, 120) + random.uniform(-30, 30),
          b[1] + dy / n * random.uniform(40, 120) + random.uniform(-30, 30))
    _move(dot, b, _clamp_pt(*dr), t, arc=random.uniform(-0.1, 0.1))
    return dot, jetlag


def TPmain(front):
    """
    输入 front（spider2 里的目标顺序字串），输出 Distance / jetlag / dot。

    :param front: str  例如 "类验全"
    :return: dict
    """
    chars = _front_chars(front)
    if not chars:
        raise ValueError('front 里没有解析出目标汉字: %r' % (front,))

    img = _imread(_BG)
    if img is None:
        raise FileNotFoundError('读不到背景图: %s' % _BG)

    # 1) 检测 + 逐框识别
    boxes = _boxes(img)
    texts = []
    for b in boxes:
        x1, y1, x2, y2 = b
        crop = img[y1:y2, x1:x2]
        t, s, ang = _read_char(crop)
        texts.append({'text': t, 'score': s, 'box': b, 'mask': _mask(crop)})

    # 2) 按 front 顺序匹配（先精确命中，剩余的按从左到右补位）
    used = [False] * len(texts)
    picked = []
    for ch in chars:
        best_i, best_s = -1, -1.0
        for i, it in enumerate(texts):
            if used[i]:
                continue
            if it['text'] == ch and it['score'] > best_s:
                best_i, best_s = i, it['score']
        if best_i >= 0:
            used[best_i] = True
            picked.append(best_i)
        else:
            picked.append(None)
    left_boxes = [i for i in range(len(texts)) if not used[i]]
    for k, idx in enumerate(picked):
        if idx is None and left_boxes:
            picked[k] = left_boxes.pop(0)
    if any(i is None for i in picked):
        raise RuntimeError('可用字框不足，无法为 front=%r 生成坐标' % (front,))

    # 3) 每个目标字：在框内随机取点
    points = []
    for i, ti in enumerate(picked):
        it = texts[ti]
        x1, y1, x2, y2 = it['box']
        left, top = _pick_point(it['box'], it['mask'], (x1, y1))
        points.append((left, top))

    # 4) 轨迹 + jetlag
    dot, jetlag = _make_track(points)

    # 5) 落盘：字体对照图 + 标注结果图（写到 image/ 下）
    try:
        _render_fonts(chars, os.path.join(_IMG_DIR, 'fonts.png'))
        pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)).convert('RGB')
        dr = ImageDraw.Draw(pil)
        try:
            fnt = ImageFont.truetype(_FONTS[0][0], 12)
        except Exception:
            fnt = None
        for k, (ti, pt) in enumerate(zip(picked, points)):
            b = texts[ti]['box']
            dr.rectangle([b[0], b[1], b[2], b[3]], outline=(255, 0, 0), width=1)
            dr.ellipse([pt[0] - 2, pt[1] - 2, pt[0] + 2, pt[1] + 2], fill=(0, 255, 0))
            dr.text((b[0], max(0, b[1] - 13)), '%d:%s' % (k + 1, chars[k]), fill=(255, 0, 0), font=fnt)
        pil.save(os.path.join(_IMG_DIR, 'result.png'))
    except Exception:
        pass

    return {
        'Distance': [{'left': round(p[0], 1), 'top': round(p[1], 1)} for p in points],
        'jetlag': jetlag,
        'dot': dot,
        'chars': chars,
        'boxes': [texts[i]['box'] for i in picked],
        'texts': [texts[i]['text'] for i in picked],
    }


if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        _front = sys.argv[1]
    else:
        # 不传参数：自动走一遍 get，抓新图并取 front
        _here = os.path.dirname(os.path.abspath(__file__))
        if _here not in sys.path:
            sys.path.insert(0, _here)
        from spider1 import spider1
        from spider2 import spider2
        _front = spider2(1, spider1(0))['front']
        print('front = ' + _front)
    print(json.dumps(TPmain(_front), ensure_ascii=False))
