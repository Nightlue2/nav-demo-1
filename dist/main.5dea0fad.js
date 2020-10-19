// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var historyMap = JSON.parse(localStorage.getItem('historyMap'));
var hashMap = historyMap || [{
  imgUrl: "https://i.loli.net/2020/10/19/39JO16gPvhSEBZF.png",
  logoType: "image",
  url: "https://www.figma.com"
}, {
  imgUrl: "https://i.loli.net/2020/10/19/6sONMzgcVPbQleo.png",
  logoType: "image",
  url: "https://www.iconfont.cn"
}, {
  imgUrl: "https://i.loli.net/2020/10/19/fA87jRZbP92yhYm.png",
  logoType: "image",
  url: "https://www.bootcdn.cn"
}, {
  imgUrl: "https://i.loli.net/2020/10/19/WEQGv8RznqBHUhC.png",
  logoType: "image",
  url: "https://www.zhihu.com"
}, {
  imgUrl: "https://i.loli.net/2020/10/19/bZc5wN9xDAROQKH.png",
  logoType: "image",
  url: "https://github.com"
}];
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');

var removeHttp = function removeHttp(url) {
  if (!url) return;
  var tempUrl = url;
  var result = {
    url: "",
    capsLetter: ""
  };
  result.url = tempUrl.replace("https://", '').replace("http://", '').replace("www.", '').replace(/\/.*/, '');
  result.capsLetter = result.url[0].toUpperCase();
  return result;
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    if (node.logoType === 'image') {
      var node2 = removeHttp(node.url);
      var li = $("<li class=\"liMargin hvr-glow\">\n                <div class=\"site\">\n                    <div class=\"logo\"><img src=\"\" alt=''></div>\n                    <div class=\"link\">".concat(node2.url, "</div>\n                    <div class=\"close\">\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#icon-shanchu\"></use>\n                        </svg>\n                    </div>\n                </div>\n            </li>"));
      var site = li.find('.site');
      site.on('click', function () {
        window.open(node.url);
      });
      site.on('click', '.close', function (e) {
        e.stopPropagation();
        hashMap.splice(index, 1);
        render();
      });
      li.find("img").attr("alt", node2.capsLetter).attr("src", node.imgUrl);
      li.insertBefore($lastLi);
    } else {
      var _node = removeHttp(node.url);

      if (node.url.indexOf('http://') === -1 && node.url.indexOf('https://') === -1) {
        var _li = $("<li class=\"liMargin  hvr-glow\">\n                <div class=\"site\">\n                    <div class=\"logo\">".concat(_node.capsLetter, "</div>\n                    <div class=\"link\">").concat(_node.url, "</div>\n                    <div class=\"close\">\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#icon-shanchu\"></use>\n                        </svg>\n                    </div>\n                </div>\n            </li>"));

        node.url = "http://" + node.url;

        var _site = _li.find('.site');

        _site.on('click', function () {
          window.open(node.url);
        });

        _site.on('click', '.close', function (e) {
          e.stopPropagation();
          hashMap.splice(index, 1);
          render();
          console.log(hashMap);
        });

        _li.insertBefore($lastLi);
      } else {
        var _li2 = $("<li class=\"liMargin\">\n                    <div class=\"site\">\n                        <div class=\"logo\">".concat(_node.capsLetter, "</div>\n                        <div class=\"link\">").concat(_node.url, "</div>\n                        <div class=\"close\">\n                            <svg class=\"icon\">\n                                <use xlink:href=\"#icon-shanchu\"></use>\n                            </svg>\n                        </div>\n                    </div>\n                </li>"));

        var _site2 = _li2.find('.site');

        _site2.on('click', function () {
          window.open(node.url);
        });

        _site2.on('click', '.close', function (e) {
          e.stopPropagation();
          hashMap.splice(index, 1);
          render();
          console.log(hashMap);
        });

        _li2.insertBefore($lastLi);
      }
    }
  });
};

render();
$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].url.replace("http://", '').replace("https://", '').replace("www.", '')[0] === key) {
      window.open(hashMap[i].url);
    }
  }
});
$('.addSite').on('click', function () {
  var url = window.prompt('输入要添加的网址：');
  if (url === '') return window.alert('网址不能为空！');
  if (!url) return;
  hashMap.push({
    logoType: "text",
    url: url
  });
  render();
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
});

window.onbeforeunload = function () {
  localStorage.setItem('historyMap', JSON.stringify(historyMap));
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.5dea0fad.js.map