

import os
import random
import ddddocr
import json as _json


# ---------------------------------------------------------------------------
# 路径
# ---------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PICTURE_DIR = os.path.join(BASE_DIR, "..", "picture")
BACKGROUND_IMG = os.path.join(PICTURE_DIR, "Background.jpg")
SLIDER_IMG = os.path.join(PICTURE_DIR, "Slider.png")


# ---------------------------------------------------------------------------
# 可调参数
# ---------------------------------------------------------------------------
GAP_OFFSET = 0            # 缺口识别相对真实落点的偏移(px)。老差几像素就改这里
PX_PER_EVENT = 1.0        # 每个事件的位移(px)：真实样本约 1px/事件
SPEED_PX_PER_MS = 0.42    # 主拖速度(px/ms)：成功样本主段约 0.42
FIRST_MOVE_X = (3, 5)     # 按下后第一帧已移动的 px（样本首点 x=4）
FIRST_MOVE_T = (35, 90)   # 按下到首个 move 的延迟 ms（样本首点 t=82）
OVERSHOOT_RATIO = (0.04, 0.08)   # 超调峰值 / 距离（成功样本 242/228 ≈ 1.06）
UNDERSHOOT_RATIO = (0.01, 0.03)  # 回拉过冲 / 距离
Y_ARC_RATIO = (0.05, 0.09)       # 纵向弧幅 / 距离（样本 17/228 ≈ 0.075）
PAUSE_PEAK_MS = (150, 260)       # 峰值后停顿（样本 ~220ms）
PAUSE_PULL_MS = (120, 260)       # 回拉后停顿（样本 ~217ms）
PAUSE_RELEASE_MS = (250, 500)    # 松手前停顿（样本 ~405ms）
FLAG = 1                  # 事件可信标志: 1=可信, 2=不可信, 0=未知


def find_gap(background_path=BACKGROUND_IMG,
             slider_path=SLIDER_IMG,
             simple_target=False):
    if not os.path.exists(background_path) or not os.path.exists(slider_path):
        raise FileNotFoundError("找不到图片: %s / %s" % (background_path, slider_path))

    with open(background_path, "rb") as f:
        bg = f.read()
    with open(slider_path, "rb") as f:
        slider = f.read()

    det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    res = det.slide_match(slider, bg, simple_target=simple_target)
    detail = res

    box = res.get("target")
    if isinstance(box, (list, tuple)) and len(box) >= 2:
        gap_x = box[0]
    else:
        gap_x = res.get("target_x", 0)

    return int(gap_x) + GAP_OFFSET, detail


# ---------------------------------------------------------------------------
# 2) 轨迹生成
# ---------------------------------------------------------------------------
def gen_track(distance, flag=FLAG, seed=None):
    rng = random.Random(seed)
    D = int(distance)
    if D <= 0:
        return [[0, 0, 0, flag]]

    x_start = rng.uniform(*FIRST_MOVE_X)
    x_peak = D + rng.uniform(*OVERSHOOT_RATIO) * D
    x_under = D - rng.uniform(*UNDERSHOOT_RATIO) * D
    y_sign = rng.choice([-1, 1])
    y_amp = rng.uniform(*Y_ARC_RATIO) * D
    ms_ev = PX_PER_EVENT / SPEED_PX_PER_MS

    pts = []
    t = rng.randint(*FIRST_MOVE_T)
    x = x_start
    y = 0.0
    pts.append([int(round(x)), 0, t, flag])

    def emit(x_to, y_to, dt_scale=1.0, pause_chance=0.0):
        nonlocal x, y, t
        x_from, y_from = x, y
        span = x_to - x_from
        if abs(span) < 1e-6:
            return
        sign = 1.0 if span > 0 else -1.0
        while (x - x_to) * sign < -1e-6:
            x += sign * max(0.4, rng.gauss(PX_PER_EVENT, 0.35))
            if (x - x_to) * sign > 0:
                x = x_to
            y = y_from + (y_to - y_from) * ((x - x_from) / span)
            dt = max(1, int(round(rng.gauss(ms_ev * dt_scale, 0.6))))
            if pause_chance and rng.random() < pause_chance:
                dt += rng.randint(30, 90)
            pts.append([int(round(x)), int(round(y)), t, flag])
            t += dt
    emit(x_peak, y_sign * y_amp, dt_scale=1.0, pause_chance=0.010)
    t += rng.randint(*PAUSE_PEAK_MS)
    pts.append([int(round(x_peak)), int(round(y_sign * y_amp)), t, flag])
    emit(x_under, y_sign * y_amp * 0.25, dt_scale=4.0, pause_chance=0.03)
    t += rng.randint(*PAUSE_PULL_MS)
    pts.append([int(round(x_under)), int(round(y_sign * y_amp * 0.25)), t, flag])
    emit(D, 0.0, dt_scale=3.0, pause_chance=0.05)
    t += rng.randint(*PAUSE_RELEASE_MS)
    pts.append([D, 0, t, flag])

    pts[-1][0] = D
    return pts


def visual_hint(distance, detail, save_path=None):
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print("未安装 Pillow, 跳过可视化")
        return None
    box = detail.get("target")
    if not (isinstance(box, (list, tuple)) and len(box) == 4):
        print("返回里没有 4 元素 target 框, 跳过可视化")
        return None
    img = Image.open(BACKGROUND_IMG).convert("RGB")
    d = ImageDraw.Draw(img)
    d.rectangle(box, outline=(255, 0, 0), width=2)
    save_path = save_path or os.path.join(PICTURE_DIR, "gap_marked.png")
    img.save(save_path)
    print("已保存缺口框标注图:", save_path)
    return save_path


def TPmain(seed=None):
    distance, detail = find_gap()
    track = gen_track(distance, seed=seed)
    return {"slide": distance, "trajectory": track}

# ---------------------------------------------------------------------------
# 自测
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    print(TPmain())
    # 想肉眼确认缺口框就打开下面这行
    # visual_hint(distance, detail)
