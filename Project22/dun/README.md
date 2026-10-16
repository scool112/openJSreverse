# 网易易盾 文字点选逆向 

目标站点：`https://dun.163.com/trial/picture-click`（`zoneId=CN31`，`version=2.28.5`，`loadVersion=2.5.4`）

本文档说明完整执行流程、使用的 js 文件、离线识别/轨迹库，以及**其他人复制本项目后需要安装什么、改哪些写死的路径**。

---

## 0. 目录结构

```
dun/
├─ pycode/
│  ├─ spider1.py      ① getconf -> dt
│  ├─ spider2.py      ② get -> token / front / 背景图（并生成 cb/fp/callback）
│  ├─ trajectory.py   ③ 识别目标字 + 生成点击坐标与鼠标轨迹（TPmain）
│  ├─ spider3.py      ④ 生成 check 的 data 参数
│  └─ main.py         ⑤ 串联全流程
├─ jscode/
│  ├─ callback.js     生成 callback（JSONP 回调名）参数
│  ├─ cb.js           生成 cb 参数
│  ├─ fp.js           生成 fp 参数
│  └─ data.js         吃 {Distance, jetlag, dot, token} -> 吐出 check 的 data
└─ image/
   ├─ Background.jpg  每次 get 后被覆盖的验证码背景图（识别输入）
   ├─ fonts.png       trajectory 生成的字体对照图（调试）
   └─ result.png      trajectory 生成的识别框 + 点击点标注图（调试）
```

---

## 1. 执行流程（spider1 / spider2 / spider3 + 用到的 js）

### ① `spider1.py` — 拿 `dt`

1. 调用 `node jscode/callback.js <count>` 生成 JSONP 回调名 → `callback`
2. 请求 `https://c.dun.163.com/api/v2/getconf`，参数带 `callback=生成名`
3. 从 JSONP 响应文本里切出 `"dt":"..."` 返回

- **用到的 js：`callback.js`**
- 备注：spider1 的 getconf 里 `referer` 仍是 `trial/jigsaw`、`type=2`（沿用滑块脚本），仅用于取 `dt`，不影响点选主流程。

### ② `spider2.py` — 拿 `token` / `front` / 背景图

1. `node jscode/cb.js` → `cb`
2. `node jscode/fp.js` → `fp`
3. `node jscode/callback.js <count>` → `callback`
4. 请求 `https://c.dun.163.com/api/v3/get`
   （`referer=trial/picture-click`、`type=3`、`dt` 来自 spider1，带 `cb/fp/callback/id/zoneId/irToken/...`）
5. 从响应的 JSONP 里切出 `token`、`front`（**按点击顺序**的提示字，如 `"类验全"`），下载 `bg[0]` 写入 `image/Background.jpg`
6. 返回 `{'_ga': ..., 'token': ..., 'front': ...}`

- **用到的 js：`cb.js`、`fp.js`、`callback.js`**

### ③ `trajectory.py` — 识别 + 点击坐标 + 轨迹

核心导出**只有一个函数**：

```python
from trajectory import TPmain
out = TPmain(front)          # front: str，如 "类验全"
```

返回：

```python
{
  "Distance": [{"left": float, "top": float}, ...],  # 每次点击在 Background.jpg 内的坐标
  "jetlag":   [int, ...],                            # 每次点击相对轨迹起点的毫秒
  "dot":      [[x, y, t, 0], ...],                   # 鼠标轨迹点（type 全为 0 = move）
  "chars":    [...],                                 # 解析出的目标字
  "boxes":    [[x1,y1,x2,y2], ...],                  # 命中框（调试）
  "texts":    [...]                                  # 每个框识别出的字（调试）
}
```

内部步骤：

1. 读 `image/Background.jpg`
2. **检测**：`ddddocr(det=True)` 找出画布上所有候选字框（过滤太小/太大的噪声）
3. **识别**：对每个框做 颜色掩码 → 2× 放大 → 旋转搜索（-60°~+60°，步长 15°），取 `RapidOCR` 得分最高的字
4. **匹配**：按 `front` 顺序先精确命中，剩余位置按框从左到右补位
5. **取点**：在每个命中框的**笔画掩码上随机取一点**（取不到则框内缩进 20% 随机）
6. **轨迹**：生成 `dot` + `jetlag`（参数对齐真实采集，见下）
7. 落盘调试图 `image/fonts.png`、`image/result.png`

- **用到的 js：无（纯 Python）**

### ④ `spider3.py` — 生成 check 的 `data`

1. 把 `{Distance, jetlag, dot, token}` 序列化成 JSON，作为 `argv[2]` 传给 `node jscode/data.js`
2. `data.js` 用易盾 SDK 的 `aes` / `xorEncode` 组装出：

   | 字段 | 含义 | 组装方式 |
   |---|---|---|
   | `d` | 空 | `""` |
   | `m` | 轨迹 | `aes( sample( xorEncode(token, dot[i]) , 50 ).join(':') )` |
   | `p` | 点击坐标 | `aes( xorEncode(token, [round(left), round(top), jetlag[i]]).join(':') )` |
   | `ext` | 附加 | `aes( xorEncode(token, 3 + ',' + dot.length) )` |

3. 打印 data（JSON）。**真正的 `/v3/check` 请求目前在 spider3.py 里是注释状态**，需要时打开并接回 `cb.js` / `callback.js` 与实时 `dt/id/token`。

- **用到的 js：`data.js`**

### ⑤ `main.py` — 串联

```python
from spider1 import spider1
from spider2 import spider2
from spider3 import spider3
from trajectory import TPmain

Arg1 = spider2(1, spider1(0))            # dt -> get -> {token, front, _ga}
Arg2 = TPmain(Arg1['front'])             # 识别 + 轨迹 -> {Distance, jetlag, dot, ...}
spider3(Arg2['Distance'], Arg2['jetlag'], Arg2['dot'], Arg1['token'], 2)
```

> 注意：`TPmain()` 返回的**是 dict，不要再 `json.dumps`**（spider3 内部已自己 `json.dumps` 一次）。

### 数据流总览

```
callback.js ──> callback
                    │
                    ▼
spider1.py ── GET /api/v2/getconf ──> dt
                    │
   cb.js  ──> cb    │
   fp.js  ──> fp    ▼
spider2.py ─ GET /api/v3/get ──> token / front / Background.jpg
                    │
                    ▼
   trajectory.py (TPmain)  ddddocr 检测 + RapidOCR 识别
        └─> Distance / jetlag / dot
                    │
                    ▼
spider3.py ── node data.js ──> data{m,p,ext}   (再带 token/cb/callback 去 /api/v3/check)
```

### jscode 各文件职责

| 文件 | 输入 | 输出（stdout 最后一行 JSON） | 说明 |
|---|---|---|---|
| `callback.js` | `argv[2]` = count | `callback` 字符串 | 易盾 JSONP 回调名 `__JSONP_xxx_N` |
| `cb.js` | 无 | `cb` 字符串 | Node 侧补环境跑易盾 SDK 算 cb |
| `fp.js` | 无 | `fp` 字符串 | Node 侧补环境算设备指纹 fp |
| `data.js` | `argv[2]` = `{Distance,jetlag,dot,token}` | `{d,m,p,ext}` | 组装 check 的 data |

---

## 2. 用到的离线库清单

### 2.1 识别字体（检测 + 识别）

| 库 | 建议版本 | 用途 | 是否必需 |
|---|---|---|---|
| **ddddocr** | 1.5.6 | **文字检测**（`det=True`）：定位画布上每个候选字框 | 必需 |
| **rapidocr_onnxruntime** | 1.4.4 | **单字识别**（`use_rec=True`）：多预处理/多尺度/旋转搜索打分选字 | 必需 |
| **opencv-python-headless** | 4.11.0.86 | 读写图、HSV 颜色抠图、旋转、放大 | 必需 |
| **numpy** | 随环境 | 掩码像素运算 | 必需 |
| **Pillow** | 随环境 | 生成字体对照图 / 结果标注图（支持中文） | 必需 |
| pyclipper / Shapely / PyYAML / six | - | RapidOCR 的轻量依赖 | 必需（配合 `--no-deps` 装） |

> 识别链路：**ddddocr 负责"哪里有字"，RapidOCR 负责"是什么字"**。单字识别准确率实测约 **78%**，错的多是形近字（库↔金/全/来、类↔全/来）。

### 2.2 生成鼠标轨迹

| 实现 | 位置 | 说明 |
|---|---|---|
| **本项目自研（纯 Python）** | `trajectory.py` 的 `_sample_dt` / `_move` / `_dwell` / `_make_track` | 不依赖第三方轨迹库。参数对齐真实采集：dt 分布（0ms:3.6% / 1-2ms:64% / 3-5:20% / 6-10:7% / 11-50:3%）、步长≈dt 且 ≥1px（速度中位≈1 px/ms）、点间无原地重复、到达点精确=点击点、每次点击前有停留、末次点击后仍继续移动 |

> 结论：**离线库只用于"识别字体"，轨迹完全由本项目 Python 代码生成，无需下载任何轨迹相关的库。**

### 2.3 已评估但未采用

| 库/方案 | 结论 |
|---|---|
| **Text_select_captcha**（YOLO + Siamese） | 已克隆在 `D:\JSreverse\AiEeverseEnv\Text_select_captcha`；**检测可用、匹配不可用**（Siamese 区分不了形近字），本项目未使用 |
| AntiCAP | 实测失败，已卸载并清理模型 |
| 纯 CV IoU 模板匹配 | 无法区分同画布上的形近字，已放弃 |

---

## 3. 部署指南（其他人怎么跑起来）

### 3.1 需要安装什么

1. **Python**（建议 3.9；ddddocr 1.5.6 最高只支持到 3.9 系，1.6.x 需要 py≥3.10）
2. **Node.js**（运行 `jscode/` 下 4 个 js）
3. pip 包（建议在独立 conda 环境）：

```bash
pip install ddddocr==1.5.6
pip install rapidocr_onnxruntime==1.4.4 --no-deps
pip install pyclipper Shapely PyYAML six
pip install opencv-python-headless==4.11.0.86 numpy Pillow
```

> RapidOCR 一定用 `--no-deps`，避免被拉进 torch 等重依赖；再手动补它的轻依赖。

### 3.2 `pycode/trajectory.py` 里**写死的路径**要改

| 位置 | 内容 | 需要怎么改 |
|---|---|---|
| `trajectory.py:36-42` `_FONTS` | `C:\Windows\Fonts\simhei.ttf / simsun.ttc / msyh.ttc / simkai.ttf / simfang.ttf` | **只在 Windows 默认字体目录可用**。换平台或字体缺失时改成自己的字体路径；缺失会被 `try/except` 跳过（仅影响 `fonts.png` 对照图，不影响识别/轨迹） |
| `trajectory.py:32-34` `_BASE / _IMG_DIR / _BG` | 相对本文件定位 `../image/Background.jpg` | 一般**不用改**（自动跟随文件位置）；但要保证 **`image/Background.jpg` 已由 spider2 生成**，否则报 `FileNotFoundError` |
| `trajectory.py:365-378` `__main__` 自动模式 | `from spider1 / spider2` | 需要 `spider1.py`、`spider2.py` 与其同目录（本项目自带，一般不用改） |

> 也就是说：把项目放到别的盘/别的目录没问题（路径是相对 `__file__` 定位的），**唯一需要按环境改的就是 `_FONTS` 的字体目录**。

### 3.3 其他必须替换的参数（都是账号/会话相关，跑久了会失效）

| 位置 | 参数 | 说明 |
|---|---|---|
| `spider1.py:41-51` | `id`、`zoneId`、`type`、`callback` | getconf 请求参数；`id` 为验证码 id，换站点要改 |
| `spider1.py:34-40` | `cookies`（`wyy_uid`、`_qddaz`、`_ga` 等） | 会话 cookie，失效会导致 getconf 失败 |
| `spider2.py:64-92` | `id`、`zoneId`、`irToken`、`dt`、`referer` | `dt` 由 spider1 传入；`irToken`/`id` 换站点要改 |
| `spider2.py:29-32` / `spider1.py:29-32` | `User-Agent`、`sec-ch-ua` | 客户端指纹，建议与真实浏览器一致 |
| `data.js:797` | 写死的点击次数 `3`（`3 + ',' + dot.length`） | 应为**实际点击次数**（本项目 3 个目标字）；换了目标字数量要同步改 |
| `main.py:12` | 第 5 个参数 `2` | 传给 spider3 的 `count`，目前未被使用（callback 计数）；保持与生成 callback 时一致即可 |

### 3.4 运行时生成的中间文件

- `image/Background.jpg`：由 `spider2.py` 每次覆盖写入（识别输入）
- `image/fonts.png`、`image/result.png`：由 `trajectory.py` 每次覆盖写入（调试用，可忽略）
- 根目录 `成功执行.png`：验证通过的效果截图（保留）

---

## 4. 快速验证

```bash
# 完整链路（取 dt -> get -> 识别+轨迹 -> data）
python pycode/main.py

# 只验证识别 + 轨迹（不传参自动抓新图）
python pycode/trajectory.py
# 或指定提示字
python pycode/trajectory.py 类验全
```

`main.py` 正常输出类似：

```
背景图片写入成功
{'d': '', 'm': '...', 'p': '...', 'ext': '...'}
```

拿到 `data` 后，配合 `token / cb / callback / dt` 请求 `https://c.dun.163.com/api/v3/check` 即完成一次文字点选验证。
