# 新手小白的 JS 逆向实战合集（30 例）

一个 Web/小程序 JavaScript 逆向与协议还原的实战案例合集，涵盖：请求参数签名（MD5 / HMAC / RSA / 国密 SM2·SM4）、响应解密、Cookie 反爬、JSVMP、WASM、字体反爬、滑块 / 文字点选验证码、Akamai / 瑞数等风控。

每个案例都包含「Python 采集脚本 + 逆向出来的 JS 代码」，可直接对照阅读逆向过程。

---

## ⚠️ 免责声明

- 本项目**仅供网络安全技术学习、研究与交流**，所有代码都用于理解前端加密/风控原理。
- 请勿将本项目用于任何**商业用途**或**非法用途**；由此产生的一切后果由使用者自行承担。
- 所有被逆向的目标站点、商标、数据均归其各自权利人所有。若相关方认为内容侵权，请联系删除。
- 请遵守目标站点的 `robots.txt`、服务条款及当地法律法规，控制请求频率，不要对目标造成压力。

---

## 📁 目录结构

```
openJSreverse/
├─ Project1/              七麦数据        analysis 参数
├─ Project2/              MyToken         code / timestamp 参数
├─ Project3/              宝钢股份        请求头 HMAC-SHA1 签名
├─ Project4/              企查查          动态请求头签名
├─ Project5/              全国建筑市场监管   响应解密
├─ Project6/              数位观察        响应解密
├─ Project7/              中国观鸟记录      请求加密 + 响应解密
├─ Project8/              五矿集团        RSA 长加密 param
├─ Project9/              36Kr          登录签名 + 密码加密
├─ Project10/             山西政府采购    nsssjss / sign 头
├─ Project11/             凤凰云智        密码 RSA + 图形验证
├─ Project12/             国家医保服务平台  x-tif 签名 + 国密 SM2/SM4
├─ Project13/             scrape.center   WASM 签名
├─ Project14/             荔枝网          WASM 头签名
├─ Project15/             六六找房(小程序)  Authorization 签名
├─ Project16/             百达屋(小程序)    小程序 webpack 补环境签名
├─ Project17/             猫眼电影        字体反爬(w+ 风控已升级)
├─ Project18/             懂车帝          a_bogus (JSVMP)
├─ Project19/             中国华能        Cookie 瑞数 VMP
├─ Project20/             中国专利公布公告   Cookie 瑞数 VMP   ← 未完成
├─ Project21/             网易易盾 滑块     dt/token/cb/fp/data
├─ Project22/             网易易盾 文字点选  ddddocr + RapidOCR 识别
├─ Project23/             盼之代售        sign / WAF cookie   ← 未完成
├─ Project24/             欧冶           瑞数 RS_5
├─ Project25/             维普期刊        瑞数 JSVMP
├─ Project26/             欧贝商城        JSVMP
├─ Project27/             票星球          接口直取
├─ Project28/             京东联盟        h5st 签名
├─ Project29/             赢商大数据       接口直取(含 scrapy 版)
└─ Project30/             达美航空        Akamai sensor_data  ← 未完成
```

每个项目基本是 `站点名/js/`（逆向出的 JS）+ `站点名/py`（或 `pycode/`，采集脚本）两部分的组织方式。

---

## 🧩 30 个项目详解

> 「逆向点」= 需要还原的签名/加密字段；「思路」= 本项目实际采用的还原方法。

### Project1 七麦数据
- 站点：`https://www.qimai.cn/rank/offline` ｜ 接口：`https://api.qimai.cn/rank/offline`
- 逆向点：`analysis` 参数
- 思路：目标 JS 被混淆，`js/qimai.js` 中补环境执行其内部函数，导出 `get_analysis()` 生成 `analysis`；Python 侧用 `execjs` 调用，并携带登录 Cookie（**已脱敏**，需自行替换）。

### Project2 MyToken
- 站点：`https://www.mytokencap.com/` ｜ 接口：`https://api.mytoken.info/ticker/currencyranklist`
- 逆向点：`code`、`timestamp`
- 思路：`mytoken1.js` 导出 `get_code(page)`，返回随请求变化的 `code`/`timestamp`，Python 拼进 query。

### Project3 宝钢股份
- 站点：`https://www.baosteel.com/media/news` ｜ 接口：`https://cmsauth.baowugroup.com/v1/web/api/content/list`
- 逆向点：请求头 `Content-Md5`、`x-date`、`x-nonce`、`x-signature`、`x-user`
- 思路：把签名逻辑拆为 `arg_sum.js`（入口，负责拼串）+ `arg_HmacSHA1.js`（HMAC-SHA1）+ `arg_md5.js`（MD5）；`arg_sum(page)` 输出完整签名头。Python `execjs` 调用（先 `os.chdir` 到 js 目录）。

### Project4 企查查
- 站点：`https://www.qcc.com/` ｜ 接口：`https://www.qcc.com/api/search/searchMulti`
- 逆向点：动态请求头（header 的 **key/value 都不固定**）+ `x-pid`
- 思路：先去页面拿 `WindowPid`/`WindowTid`（`py/arg/qcc_arg.py`），再把 tid 等喂给 `js/arg.js` 的 `get_arg(WindowTid, name, page)`，得到本次请求要加的 `key: value` 头。Cookie 需登录态（**已脱敏**）。

### Project5 全国建筑市场监管公共服务平台
- 站点：`https://jzsc.mohurd.gov.cn/data/company` ｜ 接口：`.../APi/webApi/dataservice/query/comp/list`
- 逆向点：**响应处理**
- 思路：接口返回体需要经过 `js/mohurd1.js` 的 `get_res(data)` 才能还原成明文 JSON，Python 先取原文再交给 JS 解析。

### Project6 数位观察
- 站点：`https://www.swguancha.com/` ｜ 接口：`https://app.swguancha.com/client/v1/article/client/page`
- 逆向点：**响应解密**
- 思路：请求明文，响应是加密字符串；`js/swguancha1.js` 提供 `Get_result(response)` 解密为 JSON。

### Project7 中国观鸟记录中心
- 站点：`https://www.birdreport.cn/` ｜ 接口：`https://api.birdreport.cn/front/activity/search`
- 逆向点：`requestId`、`sign`、`timestamp`、`data`（请求加密）+ 响应解密
- 思路：`birdreport3_req.js` 的 `get_arg(page)` 生成请求头与加密后的 body；`birdreport3_res.js` 的 `get_res(data)` 解密响应。

### Project8 五矿集团（五矿电商）
- 站点：`https://ec.minmetals.com.cn/` ｜ 接口：`.../open/homepage/cgxj/by-lx-page`
- 逆向点：`param`（RSA 长加密）
- 思路：先取 Cookie（`logonAction.do`），再取 RSA 公钥（`/open/homepage/public`），用 `js/minmetals2.js` 的 `get_arg(page, publickey)` 做 `encryptLong` 生成 `param`。
- 该文件已整理为**单文件自包含**（`py/minmetals.py`，`subprocess + node`，不依赖自写模块）。

### Project9 36Kr
- 站点：`https://36kr.com/` ｜ 接口：`https://gateway.36kr.com/api/mus/login/byMobilePassword`
- 逆向点：`sign`、`nonce`、`timestamp`、`mobileNo`、`password`
- 思路：先请求首页拿到 `window.__GATEWAY_SIGN__`（`py/arg.py`），交给 `js/36kr_2.js` 的 `get_arg(sign)` 生成 `nonce`/`sign` 并加密手机号密码。Cookie 为个人追踪态（**已脱敏**）。

### Project10 山西省政府采购电子卖场
- 站点：`.../gpmall-main-web/basic/sxNotice` ｜ 接口：`.../gateway/gpmall-bpoc/notice/v1/ignore/getNoticeList`
- 逆向点：`nsssjss`、`sign`、`time`、`timestamp`
- 思路：`js/zfcgdzmcgov.js` 的 `get_arg()` 一次性生成全部签名头。其余为站点级配置参数（`siteCode`/`regionCode` 等）。

### Project11 凤凰云智（阿里 IDaaS 登录）
- 站点：`https://lark.yuekeyun.com/` ｜ 接口：`https://lark-acl.alibaba.com/idp/loginAccountAndPwd`
- 逆向点：`password`（RSA）、`captchaVerifyParam`、`sceneId`
- 思路：`js/yuekeyun.js` 用大整数 RSA 对密码加密；图形验证需自行用打码/识别得到 `captchaVerifyParam`。登录账号密码（**已脱敏**）。

### Project12 国家医保服务平台
- 站点：`https://fuwu.nhsa.gov.cn/` ｜ 接口：`.../ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital`
- 逆向点：`x-tif-nonce`、`x-tif-paasid`、`x-tif-signature`、`x-tif-timestamp`、`encData`、`appCode`、`signData`（**国密 SM2 签名 + SM4 加密**）
- 思路：`js/nationalHallSt_arg.js` 补环境（补 `navigator`/`screen`、吞掉异步 `unhandledRejection`、静音 console 以适配 `execjs`），`get_arg(page)` 生成请求头与 `encData`，`get_res("SM4", resp)` 解密响应。

### Project13 scrape.center（入门靶场）
- 站点：`https://spa14.scrape.center/page/3` ｜ 接口：`https://spa14.scrape.center/api/movie/`
- 逆向点：`offset`、`sign`（**WASM**）
- 思路：`get_wasm.py` 下载 `Wasm.wasm`，`js/scrape.js` 加载 wasm 调用其导出函数生成 `sign`/`offset`。

### Project14 荔枝网（广东广播电视台）
- 站点：`https://www.gdtv.cn/` ｜ 接口：`https://gdtv-api.gdtv.cn/api/channel/v1/news`
- 逆向点：`X-ITOUCHTV-CLIENT`、`X-ITOUCHTV-Ca-Key`、`X-ITOUCHTV-Ca-Signature`、`X-ITOUCHTV-Ca-Timestamp`、`X-ITOUCHTV-DEVICE-ID`（**WASM**）
- 思路：`js/main.js` 执行风控/签名逻辑后把结果写入 `sig.json`，`py/gdtv.py` 读取 `sig.json`（`main.js` 用 `path.join(__dirname,'sig.json')` 定位，避免写死路径）拼装请求头。

### Project15 六六找房（微信小程序）
- 站点：`66miniapp-api.66zhizu.com` ｜ 接口：`.../client/search/house`
- 逆向点：`timestamp`、`signature`、`secret` → 组装成 `Authorization`
- 思路：`js/66miniapp.js` 的 `get_arg()` 生成 `Authorization`；`py/arg.py` 的 `Arg()` 生成 `sequence`。小程序 UA/Referer 已带。

### Project16 百达屋（微信小程序）
- 站点：`https://www.betterwood.com` ｜ 接口：`https://api.betterwood.com/base/app/store/listV2`
- 逆向点：`messageid`、`signature`、`timestamp`
- 思路：小程序包被 webpack 分包（`chunk_*.js` + `loader.js`）；`js/betterwood2.js` 用一套 `wx` 桩补环境后 `require("./loader.js")` 加载分包，`get_arg(page)` 生成签名头。
- 注意：`betterwood2.js` 用相对 `require`，`execjs` 走 stdin 时**相对 require 按 cwd 解析**，因此 Python 需先 `os.chdir` 到 `js/`（`py/betterwood.py` 已处理）。

### Project17 猫眼电影（字体反爬）
- 站点：`https://piaofang.maoyan.com/dashboard` ｜ 接口：`https://piaofang.maoyan.com/i/api/dashboard-ajax`
- 逆向点：响应字体反爬（`splitBoxSplitUnit.num` 用自定义 woff 字形表示数字）
- 思路：下载 `fontStyle` 里的 woff，用 `fontTools` 解析 cmap + 与预存字形图片（`py/font/image/uniXXXX.png`）做像素比对，得到「字形码位 → 数字」映射，再替换响应里的数字。
- ⚠️ 现状：该接口已升级为美团风控（新增 `uuid`、base64 `User-Agent`、`signKey`、`mtgsig` 头），纯 `requests` 会返回 **403**。`signKey` 算法已还原（`md5("method=GET&timeStamp=..&User-Agent=..&index=..&channelId=..&sVersion=2&key=A013F70DB97834C0A5492378BD76C53A")`），但 `mtgsig` 为设备指纹绑定、需浏览器运行时生成，故纯请求版不可用。字体还原部分仍成立。

### Project18 懂车帝
- 站点：`https://www.dongchedi.com/` ｜ 接口：`https://mssdk.bytedance.com/web/common`
- 逆向点：`a_bogus`（**JSVMP：抖音 webmssdk**）
- 思路：`JS/arg.js` 补浏览器环境后执行字节跳动 `webmssdk` 的 VMP 解释器，导出 `a_bogus`。`JS/` 下另有 `env.js`、`tools.js`、`Watch.js`、`Webpack.js` 辅助补环境。
- 请求头/参数里 `msToken`、`strData`（**已脱敏**）。

### Project19 中国华能
- 站点：`https://ec.chng.com.cn/` ｜ 接口：`.../scm-uiaoauth-web/s/business/uiaouth/queryAnnouncementByTitle`
- 逆向点：Cookie（**瑞数 VMP**，`$_ts`）
- 思路：`spider/main.py` 首次请求拿到挑战页中的 JS 字节码与 JSVMP 外链，分别写入 `Jscode/JsBytecode.js`、`Jscode/JsMvp.js`，再用 `Jscode/env2.js`（补环境）执行 `get_cookie()` 得到 Cookie `S6J51OuUjLieP`，带上后二次请求。
- 说明：为规避 `execjs` stdin 下相对 `require` 失效，`main.py` 把 `require('./xxx.js')` 直接内联为文件内容。

### Project20 中国专利公布公告 —— ⚠️ 未完成
- 站点：`http://epub.cnipa.gov.cn/` ｜ 接口：`/Dxb/IndexQuery`、`/Dxb/PageQuery`
- 逆向点：Cookie（**瑞数 VMP**，`NOh8RTWx6K2dT` / `NOh8RTWx6K2dS` / `.AspNetCore.Antiforgery.*` / `WEB`）
- 当前进度：
  - `chng/spider.py`：配合 `sdenv` 补环境执行 VMP 拿 Cookie、组装分段请求（分 P1/P2/P3 阶段）。
  - `chng2/run_cnipa.py`：改用 **miniblink（`mb132_x64.dll`）** 加载真实页面 + 模拟鼠标轨迹点击翻页，尝试绕过瑞数。
- 状态：**挑战/翻页未稳定通过，未拿到最终数据**。详见 `Project20/chng2/run_cnipa.py`。

### Project21 网易易盾 滑块验证码（两套实现）
- 站点：`https://dun.163.com/trial/jigsaw` ｜ 接口：`https://c.dun.163.com/api/v3/get`、`/api/v3/check`
- 逆向点：`dt`、`token`、`data`、`cb`、`fp`、`callback`
- 思路：
  - `dun/`：`jscode/index.js` 补环境执行易盾 SDK 生成 `cb`/`fp`/`callback`，`jscode/_data.js` 生成 check 的 `data`；缺口距离与轨迹由 `pycode/Trajectory_Processing.py` 计算。
  - `dun2/`：把参数拆成 `callback.js`/`cb.js`/`dataArg.js`/`fp.js` 分别生成，`pycode/main.py` 串联。
- 验证码 Cookie（`wyy_uid`/`_qddaz`/`P_INFO`）**已脱敏**。

### Project22 网易易盾 文字点选验证码
- 站点：`https://dun.163.com/trial/picture-click` ｜ 接口：`https://c.dun.163.com/api/v2/getconf`、`/api/v3/get`、`/api/v3/check`
- 逆向点：提示字识别 + 点击坐标 + 轨迹 → `data{d,m,p,ext}`
- 思路：**ddddocr 检测字框**（哪里是字）+ **RapidOCR 识别**（是什么字，含颜色掩码、放大、旋转搜索打分）；`pycode/trajectory.py` 生成点击坐标与拟真鼠标轨迹；`jscode/data.js` 按易盾 SDK 的 `aes`/`xorEncode` 组装 check 的 `data`。
- 该项目自带完整 `README.md`（识别链路、依赖、参数说明）。

### Project23 盼之代售 —— ⚠️ 未完成
- 站点：`https://www.pzds.com/` ｜ 接口：`https://api.pzds.com/api/auth/oauth2/token`、`.../api/web-client/v2/public/goodsPublic/page`
- 逆向点：`sign`、`pztimestamp`、`random`、WAF Cookie（`_c_WBKFRo`、`ssxmod_itna` 等）
- 当前进度：`jscode/cookie1.js`/`cookie2.js` 生成 WAF/`_c_WBKFRo` Cookie，`jscode/params.js` 与 `pycode/pz_sign.py` 计算 `sign`。
- 状态：**登录态（token）与风控校验未打通，未稳定拿到商品数据**。账号密码/`authorization`/`deviceid` 等**已脱敏**。

### Project24 欧冶
- 站点：`https://www.ouyeel.com/` ｜ 接口：`https://www.ouyeel.com/search-ng/commoditySearch/queryCommodityResult`
- 逆向点：Cookie（**瑞数**，`RS_5`）
- 思路：`ouyeel.js` 是瑞数混淆脚本，Python 从页面取回调/变量后执行 `RS_5()` 生成 Cookie，再带 Cookie 请求。

### Project25 维普期刊
- 站点：`https://qikan.cqvip.com/` ｜ 接口：`.../Search/SearchList`、`.../Qikan/Journal/Summary` 等
- 逆向点：Cookie（**瑞数 JSVMP**）
- 思路：`html/jsbyte.html` 保存挑战页；`jscode/jsvmp.js` + `jscode/index.js` 补环境执行字节码解释器拿到 Cookie。

### Project26 欧贝商城
- 站点：`https://www.obei.com.cn/` ｜ 接口：`.../obei-gateway/pc-bff/n/elasticsearch/getNotice`
- 逆向点：**JSVMP**（Cookie/参数）
- 思路：`html/jsbyte.html` + `jscode/jsvmp.js` + `jscode/index.js` 补环境执行 VMP。

### Project27 票星球
- 站点：`https://m.piaoxingqiu.com/list` ｜ 接口：`.../cyy_gatewayapi/home/pub/v3/show_list/search_by_front`
- 逆向点：无（接口直取）
- 思路：按 `WEB` 终端拼请求头（`src`/`terminal-src`/`ver` 等）后直接解析 `data.searchData`。`front-trace-id` **已脱敏**。

### Project28 京东联盟
- 站点：`https://union.jd.com/` ｜ 接口：`https://api.m.jd.com/api`
- 逆向点：`h5st`、`x-api-eid-token`、`uuid`、`appid`、`_`、`loginType`
- 思路：`jscode/index.js` 补环境执行京东 `h5st` 签名（`loader.js` 加载 `module1.js`/`module2.js`，`proxy.js`/`proxylist.js`/`env.js` 做环境代理），`pycode/main.py` 取签名后拼请求。
- **本项目泄露风险最高**：原含京东完整登录态（`thor`/`_pst`/`npin`/`sdtoken`/设备指纹）。已全部替换为占位符，使用前需填自己的。

### Project29 赢商大数据
- 站点：`http://www.winshangdata.com/` ｜ 接口：`.../wsapi/brand/getBigdataList3_4`、`.../getBigdataBrandExpandDemand`
- 逆向点：无（接口直取，但需登录态 `uid`）
- 思路：带上登录 Cookie/Header 直取；`winshangdata/` 是一个 scrapy 版本实现。
- 登录 Cookie（`winfanguser`/`eyeuser`，内含 uid 与密码 MD5）与 `uid` **已脱敏**。

### Project30 达美航空（Delta）—— ⚠️ 未完成
- 站点：`https://www.delta.com` ｜ 接口：`.../flightsearch/search-results`、`https://offer-api-prd.delta.com/prd/rm-offer-gql`
- 逆向点：**Akamai**（`_abck`、`bm_sz`、`sensor_data`）
- 当前进度：`jscode/index.js` 补环境（`behavior.js`/`env.js`/`proxy.js`/`proxylist.js` + `akamai-v3-sensor-data-helper`）生成 `sensor_data`；`pycode/main.py` 用 `curl_cffi` 多轮请求验证 `_abck`。
- 状态：**`_abck` 校验未稳定通过，未拿到最终业务数据**。
- 依赖：`jscode/_run.js` 引用了 `../../delta/akamai-v3-sensor-data-helper`（该 helper 需另行准备）。

---

## 🔐 敏感信息脱敏说明（重要）

为便于开源，仓库内所有**个人凭据 / 会话 / 隐私信息**都已替换为占位符，形如 `"你的xxx"`。**这些不是真实值，直接运行会失败，请替换为你自己的。** 涉及的字段包括：

| 类别 | 涉及项目 / 字段 |
|---|---|
| 网站登录 Cookie / 会话 | Project1 `PHPSESSID`/`qm_check`/`USERINFO`/`AUTHKEY`；Project4 `qcc_did`/`_c_WBKFRo`/`QCCSESSID`/`acw_tc`；Project9 `sensorsdata`/`_c_WBKFRo`/`SERVERID`/`_wafchallengeid`/`_waftokenid`；Project18 `msToken`/`strData`；Project21/22 网易 `wyy_uid`/`_qddaz`/`P_INFO`；Project29 `winfanguser`/`eyeuser`/`uid`/`_uab_collina` |
| 账号 / 密码 | Project11 `loginId`/`password`；Project23 `username`/`password`；Project29 `winfanguser(含密码MD5)` |
| 京东登录态（最敏感） | Project28 `thor`/`_tp`/`_pst`/`npin`/`sdtoken`/`__jda`/`__jdb`/`flash`/`shshshfp*`/`3AB9D23F*`/`x-api-eid-token` |
| 手机号 / 设备 / 追踪 | Project21/22 `P_INFO`(手机号)；Project23 `deviceid`；Project24 `X-Tingyun-Id`；Project27 `front-trace-id` |
| 第三方验证码 token | Project11 `captchaVerifyParam` |
| **JS 文件里写死的会话 / 账号** | Project8 `js/arg.js` 会话 cookie；Project9 `js/36kr_2.js` 手机号 + 密码（**明文**）；Project14 `js/main.js` 设备 cookie；Project18 `JS/env.js` `msToken`；Project28 `jscode/env.js`、`jscode/index.js` 京东登录态 |

> 替换后各文件 Python/JS 语法均已通过 `py_compile` / `node --check` 校验，代码逻辑保持完整，只是运行需你补上自己的凭据。
>
> 说明：JSON/py 与 **JS 文件** 里的个人凭据都已清理，占位符统一为 `你的xxx`。而各站点 JS 里自带的**站点级公开常量**（如友盟 `appKey`、接口 `appId`、`zoneId`、`sceneId` 等）不是你的隐私，按原样保留。

---

## 🛠️ 需要你自行准备的东西

仓库为**纯代码开源**，以下第三方 / 私有依赖未包含，请自行安装或准备。

### A. JS 侧（Node 运行时）

本项目的 JS 部分大量使用**补环境**，核心是两个开源项目（都不是我写的，需自行获取）：

1. **`sdenv`** —— 开源补环境框架：<https://github.com/pysunday/sdenv>（配套 `sdenv-jsdom` / `sdenv-extend`）。
   - 用于 `Project20`、`Project21`、`Project25`、`Project26` 等瑞数 VMP / 验证码场景（把浏览器环境补出来，直接跑站点 JS 生成 Cookie / 参数）。
   - **分平台编译**：`npm i sdenv` 会用 **node-gyp 现场编译原生插件（canvas 等）**，所以 Windows 和 Linux 都需要 **C/C++ 编译环境 + Python**：
     - **Windows**：安装 **Visual Studio**，安装时务必勾选 **“使用 C++ 的桌面开发”**；
     - **Linux**：`gcc/g++/make` + `python3`；
     - 然后 `npm i -g node-gyp`。canvas 会从 GitHub 拉预编译包，网络差时先挂代理或换国内源。
   - **不想本地编译**：作者提供 Docker 镜像 `pysunday/sdenv-[arm64 或 x86_64]`（`uname -a` 看架构），也支持 `npx sdenv` / `npm i -g sdenv`。
   - **Node 版本支持**（作者实测，源自其 README；本项目 JS 里写死了 `AiEeverseEnv/sdenv` 路径，需改成你自己的安装位置或 `require('sdenv')`）：

     | Node 版本 | 是否支持 |
     |---|---|
     | **20**（须为最新，≥ 20.19.5） | ✅ |
     | **21** | ❌ 不支持 |
     | **22** | ✅ |
     | **23** | ✅ |
     | **24** | ✅ |

     > 即：**支持 20 / 22 / 23 / 24，唯独 21 不行**（作者开发用 `v20.19.5`；v20 因 jsdom 27 需要 ESM，必须用最新小版本）。
   - 相关配套：`rs-reverse`（瑞数纯算逆向）、`sdenv-jsdom`（专用 jsdom 分支）。

2. **`isolated-vm`** —— V8 Isolate 沙箱：<https://www.npmjs.com/package/isolated-vm>（`npm i isolated-vm`），用于在完全隔离的 V8 环境里执行站点 JS / VMP。
   - **版本必须和 Node 对齐**：Node 22 → `isolated-vm` 4.x / 5.x；Node 24 → 5.x / 6.x；Node 26 → 7.x。（`5.0.3` 在 Node 24 上会编译失败，要用 6.x）
   - 安装同样依赖 **node-gyp 编译**；Windows 若不想装 VS，可直接到 [releases](https://github.com/laverdet/isolated-vm/releases) 下载预编译包 `isolated-vm-vX-node-vXXX-win32-x64.tar.gz`，解压后把里面的 `out/` 拷进 `node_modules/isolated-vm`。
   - **Node ≥ 20 运行时需加参数 `--no-node-snapshot`**。

> 说明：仓库里 `Project20/21/25/26` 的 JS 中出现 `AiEeverseEnv/sdenv` 只是我本机的目录写法，别人装好 `sdenv` 后把该路径改成自己的即可。

### B. Python 侧

3. **基础环境**：Python（建议 3.9+）、Node.js；`pip install requests execjs`。
4. **无自写工具模块依赖**：仓库内**没有任何项目依赖 `utils` / `utils2`**。原先几处 `from utils import JsArg` 已处理干净——`Project7`、`Project10`、`Project15/66miniapp.py` 里的是**死导入（从未被调用，已删除）**；`Project15/66miniapp/py/arg.py` 里真正用到的 `JsArg()` 已**就地内联**为 `execjs` 直调。可直接运行，无需额外准备。
5. **`curl_cffi`**（TLS/JA3 指纹伪装，模拟 Chrome）：`Project23`、`Project28`、`Project30` 使用，`pip install curl_cffi`。
6. **验证码识别库**（`Project21`、`Project22` 网易易盾滑块 / 文字点选）：
   - 文字检测 `ddddocr==1.5.6`、单字识别 `rapidocr_onnxruntime==1.4.4 --no-deps`；
   - 图像处理 `opencv-python-headless==4.11.0.86`、`numpy`、`Pillow`；
   - 再手动补 RapidOCR 的轻依赖 `pyclipper Shapely PyYAML six`。
   - 装机提示：RapidOCR 一定用 `--no-deps`，避免被拉进 torch 等重依赖。
7. **爬虫框架**（`Project29/winshangdata`）：`Scrapy`，`pip install scrapy`。
8. **miniblink DLL**（`Project20/chng2`）：`mb132_x64.dll`，需自行准备并放到脚本头部 `DLL_PATH` 期望的目录。
9. **Akamai helper**（`Project30`）：`akamai-v3-sensor-data-helper`，需自行准备。
10. **各站点账号凭据**：见上一节「脱敏说明」，凡 `"你的xxx"` 处都要填你自己的 Cookie / 账号 / 密码 / token。

---

## 🚧 三个未完成的项目

| 项目 | 站点 | 卡点 |
|---|---|---|
| **Project20** | 中国专利公布公告 `epub.cnipa.gov.cn` | 瑞数 VMP / 翻页挑战未稳定通过（`sdenv` 方案与 `miniblink` 方案都未拿到最终数据） |
| **Project23** | 盼之代售 `pzds.com` | 登录态 `token` + WAF 风控未打通，未稳定取到商品数据 |
| **Project30** | 达美航空 `delta.com` | Akamai `_abck` 校验未稳定通过 |

这三个记录的是**探索过程与已定位的难点**，欢迎有兴趣的同学补全。

---

## 🪪 开源协议

本项目采用 **MIT License**，详见 [LICENSE](./LICENSE)。

---

## Star / 交流

如果这些案例对你有帮助，欢迎 Star ⭐。一起学习，请务必**合法合规**使用。
