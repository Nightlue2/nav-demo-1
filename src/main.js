const tempX = localStorage.getItem('x')
const x = JSON.parse(tempX)
const hashMap = x || [{ imgUrl: "https://i0.hdslb.com/bfs/album/a3a4f04d7d00b78692b4cbd778708ecab740e17e.png", logoType: "image", url: "https://www.figma.com" },
{ imgUrl: "https://i0.hdslb.com/bfs/album/0dd6ff67d3a5fe7ac8af5e7559f6c39d06427f4f.png", logoType: "image", url: "https://www.iconfont.cn" },
{ imgUrl: "https://i0.hdslb.com/bfs/album/a4e4bb50f97cdac284bcac63b6cb680059e31883.png", logoType: "image", url: "https://www.bootcdn.cn" },
]
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const removeHttp = (url) => {
    let tempUrl = url
    let result = { url: "", capsLetter: "" }
    // if (tempUrl.indexOf('http://') === -1 && tempUrl.indexOf('https://') === -1) { //没有http的情况
    //     (tempUrl.indexOf('www.') === -1) ? result = { capsLetter: tempUrl[0].toUpperCase(), url: url } : result = { capsLetter: tempUrl[4].toUpperCase(), url: tempUrl.substring(4) }
    //     return result
    // } else {
    //     (tempUrl.indexOf('www.') === -1) ? result = { capsLetter: tempUrl[tempUrl.indexOf('/') + 2].toUpperCase(), url: url.substring(tempUrl.indexOf('/') + 2) } : result = { capsLetter: tempUrl[tempUrl.indexOf('.') + 1].toUpperCase(), url: url.substring(tempUrl.indexOf('.') + 1) }
    //     return result
    // }
    result.url = tempUrl.replace("https://", '').replace("http://", '').replace("www.", '').replace(/\/.*/, '')
    result.capsLetter = result.url[0].toUpperCase()
    return result
}



const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        if (node.logoType === 'image') {
            let node2 = removeHttp(node.url)
            let li = $(`<li class="liMargin">
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
                console.log(hashMap)
            })
            li.find("img").attr("alt", node2.capsLetter).attr("src", node.imgUrl)
            li.insertBefore($lastLi)
        } else {
            let node2 = removeHttp(node.url)
            if (node.url.indexOf('http://') === -1 && node.url.indexOf('https://') === -1) {
                let li = $(`<li class="liMargin">
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
                    console.log(hashMap)
                })
                li.insertBefore($lastLi)
            }
            else {
                let li = $(`<li class="liMargin">
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
                    console.log(hashMap)
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
        if(!url) return window.alert('网址不能为空！');
        hashMap.push({ logoType: "text", url: url })
        render()
        /*if (url1.indexOf('http://') != 0 && url1.indexOf('https://') != 0) { //判断用户加没加http前缀
            url2 = 'http://' + url1
            console.log('happy birthday')
            let tempLetter = url1[0]
            const capsLetter = tempLetter.toUpperCase()
            const $li = $(`<li>
                <a href="${url2}">
                    <div class="site">
                        <div class="logo">${capsLetter}</div>
                        <div class="link">${url1}</div>
                    </div>
                </a>
            </li>
            `).insertBefore($lastLi)
        } else {
            let index = url1.indexOf('/') + 2
            let tempLetter = url1[index]
            console.log(tempLetter)
            const capsLetter = tempLetter.toUpperCase()
            const $li = $(`<li>
                <a href="${url1}">
                    <div class="site">
                        <div class="logo">${capsLetter}</div>
                        <div class="link">${url1}</div>
                    </div>
                </a>
            </li>
            `).insertBefore($lastLi)
        }*/
    })
window.onbeforeunload = function () {
    let string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}