# imgColor

* [目录](#)
    * [html](#html) 
    * [uniapp](#uniapp)
    * [php](#php)

## 类型

### <span id="html">html</span>

框架: vue + iview <br />
可以已直接file协议打开文件dist目录下的文件<br />

#### bug:
> 1.移动端浏览器限制, 暂只支持chrome浏览器, 无法下载文件

#### Project setup
```
npm install
```

### <span id="uniapp">uniapp</span>

框架: vue + colorUi<br />
暂时只测试了 h5、微信小程序、5+app的android

#### bug:
> 1.h5 浏览器限制，无法下载文件<br />
> 2.微信小程序 限制，canvas无法使用字体<br />
> 3.android中 uniapp框架bug，导致canvas出现模糊


### <span id="php">php</span>

暂时只实现了 图片转ascii<br />
php 图片转换效率低于html, 耗时略长，需要大量内存开销
