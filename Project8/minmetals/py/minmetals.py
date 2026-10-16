import json
import os
import subprocess

import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JS_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "js"))

LOGON_URL = "https://ec.minmetals.com.cn/logonAction.do"
PUBLIC_KEY_URL = "https://ec.minmetals.com.cn/open/homepage/public"
LIST_URL = "https://ec.minmetals.com.cn/open/homepage/cgxj/by-lx-page"

NODE_RUNNER = r"""
const fs = require('fs');
const vm = require('vm');
const nodeCrypto = require('crypto');
const jsPath = process.env.JS_PATH;
const fnName = process.env.FN_NAME;
const args = JSON.parse(process.env.FN_ARGS);
const source = fs.readFileSync(jsPath, 'utf-8');
const ctx = {
    require: function (name) { return name === 'crypto-js' ? nodeCrypto : require(name); },
    console: console,
    module: module,
    process: process,
    Buffer: Buffer,
};
ctx.window = ctx;
ctx.global = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(source, ctx, { filename: jsPath });
const result = ctx[fnName].apply(null, args);
process.stdout.write(JSON.stringify(result));
"""


def Device() -> dict:
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-platform": "\"Windows\"",
    }


def get_cookie() -> dict:
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
    }
    response = requests.get(LOGON_URL, headers=headers)
    return {
        "__jsluid_s": response.cookies["__jsluid_s"],
        "JSESSIONID": response.cookies["JSESSIONID"],
        "SUNWAY-ESCM-COOKIE": response.cookies["SUNWAY-ESCM-COOKIE"],
    }


def get_publicKey(cookie: dict) -> str:
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": "0",
        "Origin": "https://ec.minmetals.com.cn",
        "Pragma": "no-cache",
        "Referer": "https://ec.minmetals.com.cn/logonAction.do",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
    }
    cookies = {
        "SUNWAY-ESCM-COOKIE": cookie["SUNWAY-ESCM-COOKIE"],
        "JSESSIONID": cookie["JSESSIONID"],
        "__jsluid_s": cookie["__jsluid_s"],
    }
    return requests.post(PUBLIC_KEY_URL, headers=headers, cookies=cookies).text


def run_js(js_name: str, func_name: str, *args) -> dict:
    js_path = os.path.abspath(os.path.join(JS_DIR, js_name))
    env = os.environ.copy()
    env["JS_PATH"] = js_path
    env["FN_NAME"] = func_name
    env["FN_ARGS"] = json.dumps(list(args), ensure_ascii=True)
    proc = subprocess.run(
        ["node", "-e", NODE_RUNNER],
        capture_output=True,
        text=True,
        encoding="utf-8",
        env=env,
    )
    if proc.returncode != 0:
        raise RuntimeError("Node 执行失败:\n" + (proc.stderr or proc.stdout))
    return json.loads(proc.stdout)


def Summary_arg(page: int) -> dict:
    device = Device()
    cookie = get_cookie()
    publickey = get_publicKey(cookie)
    js_arg = run_js("minmetals2.js", "get_arg", page, publickey)

    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Origin": "https://ec.minmetals.com.cn",
        "Pragma": "no-cache",
        "Referer": "https://ec.minmetals.com.cn/open/home/purchase-info?tabIndex=5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": device["User-Agent"],
        "dnt": "1",
        "sec-ch-ua": device["sec-ch-ua"],
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": device["sec-ch-ua-platform"],
        "sec-gpc": "1",
    }
    return {
        "url": LIST_URL,
        "headers": headers,
        "data": {"param": js_arg["param"]},
        "cookies": {
            "SUNWAY-ESCM-COOKIE": cookie["SUNWAY-ESCM-COOKIE"],
            "JSESSIONID": cookie["JSESSIONID"],
            "__jsluid_s": cookie["__jsluid_s"],
        },
    }


def run(req: dict) -> None:
    print(req)
    response = requests.post(
        url=req["url"],
        headers=req["headers"],
        json=req["data"],
        cookies=req["cookies"],
    ).text
    print(response)


if __name__ == "__main__":
    run(Summary_arg(1))
