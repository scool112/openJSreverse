# -*- coding: utf-8 -*-
import json
import time
import random
import hashlib
from urllib.parse import quote

ACCESS_KEY = "3qXyB7uf"


def _encode_uri_component(s: str) -> str:
    # 等价 JS encodeURIComponent：保留 A-Za-z0-9 - _ . ! ~ * ' ( )
    return quote(s, safe="!'()*-._~")


def _js_json_dumps(obj) -> str:
    # 等价 JSON.stringify：无空格、不转义非 ASCII、保留插入顺序
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


def make_sign(body_obj, ts=None, rnd=None):
    """返回 {'pztimestamp': str, 'random': str, 'sign': md5}"""
    ts = str(ts if ts is not None else int(time.time() * 1000))
    rnd = str(rnd if rnd is not None else random.randint(100000, 999999))
    raw = "PZTimestamp=%s&Random=%s&2147483647=%s&accessKey=%s" % (
        ts, rnd, _encode_uri_component(_js_json_dumps(body_obj)), ACCESS_KEY,
    )
    for a, b in (("(", "%28"), (")", "%29"), ("'", "%27"), ("*", "%2A"),
                 ("~", "%7E"), ("!", "%21"), ("！", "%21")):
        raw = raw.replace(a, b)
    return {"pztimestamp": ts, "random": rnd, "sign": hashlib.md5(raw.encode("utf-8")).hexdigest()}


if __name__ == "__main__":
    r = make_sign({"action": {"gameId": 7}}, ts="1790241023504", rnd="523364")
    assert r["sign"] == "8b001661fd1ee33108d7fbc3497efcc0", r
    print("OK", r)
