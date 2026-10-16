import os
import sys
import json
import subprocess
import requests

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ---------------- 配置 ----------------
params = {"beginScore": "0", "channelId": "108", "pageSize": "11"}
url = "https://gdtv-api.gdtv.cn/api/channel/v1/news"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JS_DIR = os.path.join(BASE_DIR, "..", "js")
SIG_FILE = os.path.join(JS_DIR, "sig.json")

# ---------------- 1. 调 Node 生成签名 ----------------
proc = subprocess.run(
    ["node", "main.js", url, json.dumps(params, ensure_ascii=False)],
    cwd=JS_DIR,
    capture_output=True,
    text=True,
    timeout=60,
)
if proc.returncode != 0:
    print("=== Node 退出码:", proc.returncode, "===")
    print("stdout:", proc.stdout)
    print("stderr:", proc.stderr)
    raise SystemExit("Node 生成签名失败")

with open(SIG_FILE, encoding="utf-8") as f:
    sig = json.load(f)
print("=== 生成的签名头 ===")
print(json.dumps(sig, indent=2, ensure_ascii=False))

# ---------------- 2. 组装请求头 ----------------
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://www.gdtv.cn",
    "Pragma": "no-cache",
    "Referer": "https://www.gdtv.cn/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
}
headers.update({k: str(v) for k, v in sig.items()})  # 头值必须是 str（Ca-Timestamp 是数字）

# ---------------- 3. 发请求 ----------------
resp = requests.get(url, headers=headers, params=params, timeout=15)
print("=== HTTP", resp.status_code, "===")
try:
    data = resp.json()
    print(json.dumps(data, indent=2, ensure_ascii=False)[:3000])
except Exception:
    print(resp.text[:3000])
