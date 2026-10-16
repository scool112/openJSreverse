var a = fetch("https://ec.minmetals.com.cn/open/homepage/public", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "cookie": "你的cookie(形如 __jsluid_s=...; SUNWAY-ESCM-COOKIE=...; JSESSIONID=...)",
        "Referer": "https://ec.minmetals.com.cn/open/home/purchase-info?tabIndex=5"
    },
    "body": null,
    "method": "POST"
});

console.log(a)