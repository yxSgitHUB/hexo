---
title: 如何基于node写一些小脚本以及脚本工具
date: 2021-09-26 19:57:01
tags:
---

### 前言

在日常开发过程中有很多重复性的操作，而且比较容易出错的操作可以通过脚本来实现

ps：通常情况下前端同学的脚本sh能力都比较弱，能够用js来执行一些想要的操作是比较理想的

而node就提供了这一能力

前提：node可以将一个js文件作为脚本进行运行

```
node ./xx.js
```

就可以直接执行代码

### 简单的一个小需求

今天写博客的时候突然发现自己有点呆

生成一篇新博客的命令是

```
hexo new post XXX
```

这个xxx我写死为1，生成之后将1改成我想要的名字

#### 拆分需求

我希望一个脚本就能解决问题，不需要每次都采取文件名修改的方式

1 这个脚本应该可以询问我 博客标题

2 利用我输入的标题进行博客创建

```javascript
prompt.get(["postName"], function (err, result) {
  //
  // Log the results.
  //
	console.log(result.postName)
});
```

这个命令行交互采用了 [prompt](https://gitee.com/mirrors/node-prompt#usage)

这个有很多极客的用法，比如选择，输入，密码等等一系列小黑框常见的交互，这里简单的采取了输入的方式

利用这个库我们可以拿到之前想要的输入 ，这个可以有多个，看需求



处理脚本的话采用node自带的 [child_process](http://nodejs.cn/api/child_process.html)子进程来进行处理

```javascript
var exec = require("child_process").exec;

exec("hexo new post " + result.postName, function (error, stdout, stderr) {
    // 获取命令执行的输出
});
```



这样的话我们就能完成一个比较简单的脚本，运行之后输入一个名字，就能自动创建一篇空白博客

同理，我们自动触发构建镜像的git打tag操作也是这么做的，打完tag直接删除不留痕迹

用户只需要执行tag-push的命令，选择要构建的环境然后输入一点点描述即可
