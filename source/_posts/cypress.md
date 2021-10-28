---
title: cypress
date: 2021-10-28 11:01:18
tags:
---

## cypress简介

cypressjs是一个非常强大的测试工具，之前分享过使用jest来进行测试，与jest不同的是cypress可以不侵入代码进行测试

以往我们写单元测试的时候，需要直接侵入代码，通过调用组件等形式进行组件级别的测试，但是通过使用cypress，我们可以通过一种模拟测试人员行为的方案来进行测试，甚至在离开项目源代码的基础上进行测试

## cypress使用

在这里我们采取独立新建测试项目的方式来进行测试

```
mkdir cypressdemo
npm init
cnpm install cypress --save-dev
```

这样我们就有了一个基础的cypress项目

执行

```
cypress open
```

就可以启动cypress的图形化界面，如图

{% asset_img WX20211028-111230.png %}

选择对应的脚本，就会自动打开浏览器进行测试

## cypress控件指北

在”/cypress/support/index.js“中，我们可以声明一些自定义的命令以及第三方封装好的命令

```js
import "./commands";
import "cypress-xpath";
import "cypress-wait-until";
```

其中自定义命令为

```js
Cypress.Commands.add("login", () => {
  const config = Cypress.config();
  cy.setCookie("connect.sid", config.userCookie);
  cy.visit("/dashboard");
  cy.viewport(1920, 1080);
});

```

这样我们就添加了一个自定义的登录命令

在测试脚本中

```javascript
 cy.login();
```

产生的效果就是每次测试之前先注入用户的cookie

cypress-xpath的功能是帮助我们选择页面上的元素，右键元素选择复制xpath路径即可，使用方式如下

```
 cy.xpath('//nav[contains(@class,"nav-column")]').trigger("mouseover");
```

cypress-wait-until则是一个等待工具，扩展了cypress的等待功能

可以等待接口返回之后进行下一步骤的操作

也可以等待固定时间

## cypress结果查询

cypress有自己的结果平台

在dashboard.cypress.io的网址下可以看到自己项目的一些情况，当然需要自己手动选择上报

```
cypress run --record --key xxxxxxxxxxxx
```

