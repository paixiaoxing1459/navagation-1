//测试jQuery是否引入成功
// console.log(jQuery)
//或者
// console.log($)

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
// parse 将字符串变成对象

const hashMap = xObject || [
    {
        logo: 'A', url: 'https://www.acfun.cn'
    },
    {
        logo: 'B', url: 'https://www.bilibili.com'
    },
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除 URL .com 后面 / 开头的内容 ， 正则表达式删除 《三十分钟入门正则表达式》
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        console.log(index)
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon" >
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            console.log(hashMap)
            hashMap.splice(index, 1)
            render()
        })
    });
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是：')
        // console.log(url)
        if (url.indexOf('http') !== 0) {
            // indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
            // alert('请输入以http开头的网址')
            url = 'https://' + url
            // 纠正用户输入错误的网址
        }

        hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), logoType: 'text', url: url });
        // toUpperCase 可以将小写字母变大写
        // 在 css logo 中写 text-transform: uppercase 有相同效果
        render()
    })

// window.onbeforeunload = () => {
//     const string = JSON.stringify(hashMap)
//     // stringify 将对象变成字符串
//     localStorage.setItem('x', string)
// }

// 监听键盘事件
$(document).on('keypress', (e) => {
    const { key } = e // const key = e.key
    console.log(key)
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) { // toLowerCase 大写变小写
            window.open(hashMap[i].url)
        }
    }
})