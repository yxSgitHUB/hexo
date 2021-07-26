---
title: HTML中的META标签
date: 2021-07-19 21:06:50
tags:
---

最早碰到这个标签的时候也是大部分童鞋遇到meta标签都是这个场景

```html
 <meta name="viewport" content="width=device-width,initial-scale=1.0">
```

这个是个通用标识，用来调节在移动端渲染时候的viewport，在pc端不生效

最近突然看到，其实meta标签还有其他的作用

元数据（Metadata）是数据的数据信息。

`<meta>` 标签提供了 HTML 文档的元数据。元数据不会显示在客户端，但是会被浏览器解析。


META元素通常用于指定网页的描述，关键词，文件的最后修改时间，作者及其他元数据。

元数据可以被使用浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 Web 服务调用。



## 1. http-equiv 属性

`http-equiv`一般设置的都是与`http`请求头相关的信息，设置的值会关联到http头部。也就是说浏览器在请求服务器获取`html`的时候，服务器会将`html`中设置的`meta`放在响应头中返回给浏览器。常见的类型比如`content-type`, `expires`, `refresh`, `set-cookie`, `window-target`, `charset`， `pragma`等等。

#### 1. content-type

这样设置浏览器的头信息就会包含:content-type: text/html charset=utf8

```html
<meta http-equiv="content-type" content="text/html charset=utf8">
```

#### 2. expires

用于设置浏览器的过期时间, 其实就是响应头中的expires属性。

```html
<meta http-equiv="expires" content="31 Dec 2021">
```

#### 3. refresh

该种设定表示5秒自动刷新并且跳转到指定的网页。如果不设置url的值那么浏览器则刷新本网页。

```html
<meta http-equiv="refresh" content="5 url=http://www.zhiqianduan.com">
```

#### 4. window-target

强制页面在当前窗口以独立页面显示, 可以防止别人在框架中调用自己的页面。

```html
<meta http-equiv="window-target" content="_top'>
```

#### 5. pragma

禁止浏览器从本地计算机的缓存中访问页面的内容

```html
<meta http-equiv="pragma" content="no-cache">
```

## 2. name 属性

`name`属性主要用于描述网页，与对应的`content`中的内容主要是便于搜索引擎查找信息和分类信息用的, 用法与`http-equiv`相同，`name`设置属性名，`content`设置属性值。

#### 1. author

`author`用来标注网页的作者

```html
<meta name="author" content="aaa@mail.abc.com">
```

#### 2. description

`description`用来告诉搜素引擎当前网页的主要内容，是关于网站的一段描述信息。

```html
<meta name="description" content="这是我的HTML">
```

#### 3. keywords

`keywords`设置网页的关键字，来告诉浏览器关键字是什么。是一个经常被用到的名称。它为文档定义了一组关键字。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。

```html
<meta name="keywords" content="Hello world">
```

#### 4. generator

表示当前`html`是用什么工具编写生成的，并没有实际作用，一般是编辑器自动创建的。

```html
<meta name="generator" content="vscode">
```

#### 5. revised

指定页面的最新版本

```html
<meta name="revised" content="V2，2015/10/1">
```

#### 6. robots

告诉搜索引擎机器人抓取哪些页面，`all / none / index / noindex / follow / nofollow`。

```html
<meta name="robots" content="all">
```

`all`：文件将被检索，且页面上的链接可以被查询； `none`：文件将不被检索，且页面上的链接不可以被查询； `index`：文件将被检索； `follow`：页面上的链接可以被查询； `noindex`：文件将不被检索，但页面上的链接可以被查询； `nofollow`：文件将不被检索，页面上的链接可以被查询。



## 3. charset属性

定义文档的字符编码。

## 4. Scheme属性

HTML5不支持。 定义用于翻译 content 属性值的格式。

## 5.其他

```html
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
```

## 6.viewport补充

| 属性          |                                                              |
| ------------- | ------------------------------------------------------------ |
| width         | 设置***layout viewport*** 的宽度，为一个正整数，或字符串"width-device" |
| initial-scale | 设置页面的初始缩放值，为一个数字，可以带小数                 |
| minimum-scale | 允许用户的最小缩放值，为一个数字，可以带小数                 |
| maximum-scale | 允许用户的最大缩放值，为一个数字，可以带小数                 |
| height        | 设置***layout viewport*** 的高度，这个属性对我们并不重要，很少使用 |
| user-scalable | 是否允许用户进行缩放，值为 "no" 或 "yes", no 代表不允许，yes 代表允许 |
