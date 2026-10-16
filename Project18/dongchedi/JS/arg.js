


require("./env.js")
require("./Webpack.js")

window.bdms.init({ aid: 1839, paths: ['/motor/pc/car/brand/select_series_v2'], pageId: 1 })

function send(){
    window.fetch("/motor/pc/car/brand/select_series_v2?aid=1839&app_name=auto_web_pc",{
        "method": "POST",
        "headers": { "Content-Type": "application/x-www-form-urlencoded", "x-real-ip": "" },
        "body": "series_type=1&sort_new=hot_desc&city_name=%E5%8D%97%E5%85%85&limit=30&page=4",
        "rawRes": true,
        "signal": {}
    });
}

send();                                   // 第一次（token 未到，预期 168）
setTimeout(() => {                        // token 到手后
    send();
    console.log(JSON.stringify(window.a_bogus))
    process.exit(0);
}, 1500);


//   node --inspect-brk arg.js


