delete __dirname
delete __filename

// window
window = global;
self = top = window;
window.ActiveXObject = undefined;  // 补环境的巨大的坑点, 有检测
window.addEventListener = function () {
}
window.attachEvent = function () {
}

// document
div = {
    getElementsByTagName(tag_name) {
        console.log("div getElementsByTagName 获取的标签为:", tag_name);
        return []
    }
}
head = {
    removeChild() {
    }
}
script = {
    getAttribute(attr) {
        console.log("script getAttribute 获取的属性为:", attr);
        if (attr === 'r') {
            return 'm'
        }
    },
    parentElement: head
}
var content = 'meta_content';  // content在页面中是动态的, 需要通过python的replace替换
meta = {
    content: content,
    r: 'm',
    getAttribute(attr) {
        console.log("meta getAttribute 获取的属性为:", attr);
    }
}
document = {
    createElement(tag_name) {
        console.log("document createElement 创建的标签为:", tag_name);
        if (tag_name === 'div') {
            return div
        }
        if (tag_name === 'form') {
            return {}
        }
    },
    removeChild(node) {
        console.log("document removeChild 删除的节点为:", node);
    },
    getElementsByTagName(tag_name) {
        console.log("document getElementsByTagName 获取的标签为:", tag_name);
        if (tag_name === 'script') {
            return [script, script, script, script, script, script]
        }
        if (tag_name === 'meta') {
            return [meta, meta]
        }
        if (tag_name === 'base') {
            return []
        }
    },
    getElementById(id) {
        console.log("document getElementById 获取的id为:", id);
        if (id === 'root-hammerhead-shadow-ui') {
            return {}
        }
    },
}

// location
location = {
    "ancestorOrigins": {},
    "href": "https://ec.chng.com.cn/channel/home/#/purchase?top=0",
    "origin": "https://ec.chng.com.cn",
    "protocol": "https:",
    "host": "ec.chng.com.cn",
    "hostname": "ec.chng.com.cn",
    "port": "",
    "pathname": "/channel/home/",
    "search": "",
    "hash": "#/purchase?top=0"
}

// navigator
navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64'
}

// 定时器
setInterval = function () {
}
setTimeout = function () {
}

// 源码区域
require('./JsBytecode.js')
require('./JsMvp.js')


// 获取cookie
function get_cookie() {
    return document.cookie.split('; path=')[0].split('=')[1]
}

 // console.log(get_cookie())