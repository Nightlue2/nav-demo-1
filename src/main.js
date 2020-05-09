const tempX = localStorage.getItem('x')
const x = JSON.parse(tempX)
const hashMap = x || [{ imgUrl: "../img/figma.png", logoType: "image", url: "https://www.figma.com" },
{ imgUrl: "../img/iconfont.png", logoType: "image", url: "https://www.iconfont.cn" },
{ imgUrl: "../img/bootcdn.png", logoType: "image", url: "https://www.bootcdn.cn" },
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
            let li = $(`<li>
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
            li.on('click', () => {
                window.open(node.url)
            })
            li.on('click', '.close', (e) => {
                e.stopPropagation()
                hashMap.splice(index, 1)
                render()
            })
            li.find("img").attr("alt", node2.capsLetter).attr("src", node.imgUrl)
            li.insertBefore($lastLi)
        } else {
            let node2 = removeHttp(node.url)
            if (node.url.indexOf('http://') === -1 && node.url.indexOf('https://') === -1) {
                let li = $(`<li>
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
                li.on('click', () => {
                    window.open(node.url)
                })
                li.on('click', '.close', (e) => {
                    e.stopPropagation() //阻止冒泡
                    hashMap.splice(index, 1)
                    render()
                })
                li.insertBefore($lastLi)
            }
            else {
                $(`<li>
                <a href="${node.url}">
                    <div class="site">
                        <div class="logo">${node2.capsLetter}</div>
                        <div class="link">${node2.url}</div>
                    </div>
                </a>
            </li>`).insertBefore($lastLi)
            }
        }
    })
}

render()

$('.addSite')
    .on('click', () => {
        let url = window.prompt('输入要添加的网址：')
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
/*window.onbeforeunload = () => {
    let string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}*/