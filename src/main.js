const historyMap = JSON.parse(localStorage.getItem('historyMap'))
const hashMap = historyMap || [
    { imgUrl: "https://i.loli.net/2020/10/19/39JO16gPvhSEBZF.png", logoType: "image", url: "https://www.figma.com" },
    { imgUrl: "https://i.loli.net/2020/10/19/6sONMzgcVPbQleo.png", logoType: "image", url: "https://www.iconfont.cn" },
    { imgUrl: "https://i.loli.net/2020/10/27/AnqCXgFKjdU2MJh.png", logoType: "image", url: "https://www.bootcdn.cn" },
    { imgUrl: "https://i.loli.net/2020/10/19/WEQGv8RznqBHUhC.png", logoType: "image", url: "https://www.zhihu.com" },
    { imgUrl: "https://i.loli.net/2020/10/19/bZc5wN9xDAROQKH.png", logoType: "image", url: "https://github.com" },
]
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const removeHttp = (url) => {
    if (!url) return;
    let tempUrl = url
    let result = { url: "", capsLetter: "" }
    result.url = tempUrl.replace("https://", '').replace("http://", '').replace("www.", '').replace(/\/.*/, '')
    result.capsLetter = result.url[0].toUpperCase()
    return result
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        if (node.logoType === 'image') {
            let node2 = removeHttp(node.url)
            let li = $(`<li class="liMargin hvr-glow">
                <div class="site">
                    <div class="logo"><img src="" alt=''></div>
                    <div class="link">${node2.url}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-shanchu"></use>
                        </svg>
                    </div>
                </div>
            </li>`)
            let site = li.find('.site')
            site.on('click', function () {
                window.open(node.url)
            })
            site.on('click', '.close', (e) => {
                e.stopPropagation()
                hashMap.splice(index, 1)
                render()
            })
            li.find("img").attr("alt", node2.capsLetter).attr("src", node.imgUrl)
            li.insertBefore($lastLi)
        } else {
            let node2 = removeHttp(node.url)
            if (node.url.indexOf('http://') === -1 && node.url.indexOf('https://') === -1) {
                let li = $(`<li class="liMargin hvr-glow">
                <div class="site">
                    <div class="logo">${node2.capsLetter}</div>
                    <div class="link">${node2.url}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-shanchu"></use>
                        </svg>
                    </div>
                </div>
            </li>`)
                node.url = "http://" + node.url
                let site = li.find('.site')
                site.on('click', function () {
                    window.open(node.url)
                })
                site.on('click', '.close', (e) => {
                    e.stopPropagation()
                    hashMap.splice(index, 1)
                    render()
                })
                li.insertBefore($lastLi)
            }
            else {
                let li = $(`<li class="liMargin  hvr-glow">
                    <div class="site">
                        <div class="logo">${node2.capsLetter}</div>
                        <div class="link">${node2.url}</div>
                        <div class="close">
                            <svg class="icon">
                                <use xlink:href="#icon-shanchu"></use>
                            </svg>
                        </div>
                    </div>
                </li>`)
                let site = li.find('.site')
                site.on('click', function () {
                    window.open(node.url)
                })
                site.on('click', '.close', (e) => {
                    e.stopPropagation()
                    hashMap.splice(index, 1)
                    render()
                })
                li.insertBefore($lastLi)
            }
        }
    })
}

render()
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].url.replace("http://", '').replace("https://", '').replace("www.", '')[0] === key) {
            window.open(hashMap[i].url)
        }
    }
})

$('.addSite')
    .on('click', () => {
        let url = window.prompt('输入要添加的网址：')
        if (url === '') return window.alert('网址不能为空！');
        if (!url) return;
        hashMap.push({ logoType: "text", url: url })
        render()
    })
window.onbeforeunload = () => {
    localStorage.setItem('historyMap', JSON.stringify(historyMap))
}