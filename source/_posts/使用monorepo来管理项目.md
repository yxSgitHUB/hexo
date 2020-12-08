---
title: 使用monorepo来管理项目
date: 2020-12-07 20:06:28
tags: webpack包
categories: [ 工具分享 , 插件分享 ]
---
### monorepo 是什么
menorepo是一个项目管理模式

```
.
├── README.md
├── config
│   ├── env.js
│   ├── getHttpsConfig.js
│   ├── modules.js
│   ├── paths.js
│   ├── pnpTs.js
│   ├── setupProxy.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src
│   ├── App
│   │   ├── App.css
│   │   ├── App.test.tsx
│   │   └── App.tsx
│   ├── Axios
│   │   └── index.ts
│   ├── Declear
│   │   └── index.d.ts
│   ├── FrameWork
│   │   ├── Layout
│   │   └── Sidebar
│   ├── Index
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── Mock
│   │   └── index.ts
│   ├── Page
│   │   ├── Home
│   │   └── Login
│   ├── Redux
│   │   ├── Action
│   │   ├── Reducer
│   │   └── Store
│   └── Router
│       └── Router.tsx
├── tsconfig.json
└── yarn.lock

```

这是一个使用create-react-app jest之后的react项目 属于我们自己的代码大概只有几十k的样子，但是node_modules却有几十M上百M，实际应用中，我们的h5宣传页或者某些展示性的页面其实并不需要这样的大的node_modules，很多项目共用一个框架即可，这样有带来一个问题，很多情况下公司内部都是维护了一个项目模板，大家用的时候都是互相拷来拷去，后期维护极为困难，而yarn就提供了一个方案来解决这个问题（lerna也可以）

### monorepo的使用

首先先创建一个项目

```
.
└── package.json
```

新建一个packages文件夹作为子项目的路径

```
.
├── packages
└── package.json
```

Package.json中对项目进行设置，通过这种方式我们可以将项目设置为monorepo模式

```
{
    ...
    private: true,
    workspaces: [
      "packages/*"
    ]
}
```

之后我们利用create-react-app在packages文件夹下创建两个项目

```
.
├── package.json
├── packages
│   ├── project1
│   │   ├── README.md
│   │   ├── config
│   │   │   ├── env.js
│   │   │   ├── getHttpsConfig.js
│   │   │   ├── jest
│   │   │   │   ├── cssTransform.js
│   │   │   │   └── fileTransform.js
│   │   │   ├── modules.js
│   │   │   ├── paths.js
│   │   │   ├── pnpTs.js
│   │   │   ├── webpack.config.js
│   │   │   └── webpackDevServer.config.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   ├── index.html
│   │   │   ├── logo192.png
│   │   │   ├── logo512.png
│   │   │   ├── manifest.json
│   │   │   └── robots.txt
│   │   ├── scripts
│   │   │   ├── build.js
│   │   │   ├── start.js
│   │   │   └── test.js
│   │   └── src
│   │       ├── App.css
│   │       ├── App.js
│   │       ├── App.test.js
│   │       ├── index.css
│   │       ├── index.js
│   │       ├── logo.svg
│   │       ├── reportWebVitals.js
│   │       └── setupTests.js
│   └── project2
│       ├── README.md
│       ├── config
│       │   ├── env.js
│       │   ├── getHttpsConfig.js
│       │   ├── jest
│       │   │   ├── cssTransform.js
│       │   │   └── fileTransform.js
│       │   ├── modules.js
│       │   ├── paths.js
│       │   ├── pnpTs.js
│       │   ├── webpack.config.js
│       │   └── webpackDevServer.config.js
│       ├── package-lock.json
│       ├── package.json
│       ├── public
│       │   ├── favicon.ico
│       │   ├── index.html
│       │   ├── logo192.png
│       │   ├── logo512.png
│       │   ├── manifest.json
│       │   └── robots.txt
│       ├── scripts
│       │   ├── build.js
│       │   ├── start.js
│       │   └── test.js
│       └── src
│           ├── App.css
│           ├── App.js
│           ├── App.test.js
│           ├── index.css
│           ├── index.js
│           ├── logo.svg
│           ├── reportWebVitals.js
│           └── setupTests.js
└── yarn.lock
```

这之后我们的项目路径就变成了这样，使用下面的命令来删除node_modules

```
yarn workspaces run rimraf node_modules
```

之后重新下载

```
yarn install
```

这之后就会发现，项目目录下只有部分的node_modules,其中大部分公用的包在根路径下的node_modules。

如果运行或者构建子项目，只需要在子项目的 package.json 里面这么配置。

```
"start": "node ../../scripts/start.js",
"build": "node ../../scripts/build.js",
"test": "node ../../scripts/test.js"
```

之后安装几个缺失的包就可以直接跑起来了

```
yarn workspace project1 run start
```



### menorepo解决的一些问题

#### 复用代码和配置困难

一旦项目多起来，就会遇到一些更复杂的情况。比如一些独立的 h5 活动页面，这些页面往往是不相关的，不方便部署到一起，需要独立部署到不同域名。

除此之外，这些页面可能会有很多共同之处，比如同样的错误处理、同样的多语言文案、同样的 eslint 和 prettier 处理等等。

如果有脚手架倒也还好，直接创建一个新项目就行了。但很多团队也没有维护脚手架，每次新开一个项目就是把原来项目的配置给复制粘贴过去，做一些修改，这样效率非常低下。

#### 资源浪费

同时，每次有一个新的页面就去创建一个项目，这些项目也会过于分散，不便管理。

还会白白浪费资源，比如它们可能都会安装 React、React-dom 等包，不小心就造成了杯具（一个 node_module 有多大心里没数吗）。

#### 调试麻烦

如果你想在本地项目进行调试，但这个项目依赖了另一个项目，那么你只能用 `npm link` 的方式将它 link 到需要调试的项目里面。

一旦 link 的项目多了，手动去管理这些 link 操作就容易心累，进一步就会发展到摔键盘、砸显示器。

[github链接 monoreopTest](https://github.com/yxSgitHUB/monoreopTest)

