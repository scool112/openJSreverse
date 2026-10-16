const fs = require("fs");

async function get_arg(page){
    var n = (page - 1) * 10
    var t = parseInt(Math.round((new Date).getTime() / 1e3).toString())
    const wasmCode = fs.readFileSync('Wasm.wasm');
    WebAssembly.instantiate(wasmCode, {
        "env": {},
        "wasi_snapshot_preview1": {}
    }).then(data=>{
        const sign = data.instance.exports.encrypt(n,t)
        offset = n
        li = {}
        li["offset"] = n
        li["sign"] = sign
        console.log(JSON.stringify(li))
    })
}

async function run(page){
    const data = await get_arg(page)
    console.log(JSON.stringify(data))
}

run(parseInt(process.argv[2]))
