---
title: JavaScript事件机制
date: 2021-03-24 18:51:32
tags: [技术文章]
---
###  前言

事件在1997年的HTML4.0中被加入，之后就成为了web技术的核心部分。而js则是通过了事件来对用户的行为进行反应，然后执行 一段代码来实现想要的功能。

### JS事件模型

#### 原始事件模型

```
<button onclick="click()">点我</button>

const btn = document.getElementById('btn')
btn.onclick = function(){
    //do something
}
//解除事件
btn.onclick = null
```

这种事件是直接在dom节点上直接绑定，单个dom节点上只能绑定一个，再次绑定会覆盖之前的事件

这种事件只会冒泡传递

####DOM2事件模型 

{% asset_img img.png %}
「从网上扒了一张图」
如图所示1,2,3为捕获，5,6,7为冒泡，也就是说事件流分为三个阶段：
DOM2 级事件模型共有三个阶段：

事件捕获阶段：事件从 document 向下传播到目标元素，依次检查所有节点是否绑定了监听事件，如果有则执行。
事件处理阶段：事件在达到目标元素时，触发监听事件。
事件冒泡阶段：事件从目标元素冒泡到 document，并且一次检查各个节点是否绑定了监听函数，如果有则执行。

绑定事件的方法

```jsx
btn.addEventListener('click',function(){
    console.log('btn')
},true)
box.addEventListener('click',function(){
    console.log('box')
},false)
```

addEventListener有三个参数 事件名称、事件回调、捕获/冒泡

### React事件模型（16.8.0）

React会将所有的事件都绑定在最外层(document)，使用统一的事件监听，并在冒泡阶段处理事件，当挂载或者卸载组件时，只需要在通过的在统一的事件监听位置增加或者删除对象，因此可以提高效率。并且React并没有使用原生的浏览器事件，而是在基于Virtual DOM的基础上实现了合成事件(SyntheticEvent)，事件处理程序接收到的是SyntheticEvent的实例。SyntheticEvent完全符合W3C的标准，因此在事件层次上具有浏览器兼容性，与原生的浏览器事件一样拥有同样的接口，可以通过stopPropagation()和preventDefault()相应的中断。如果需要访问当原生的事件对象，可以通过引用nativeEvent获得。

由于React内部维护了一个自己的事件池，所以在事件的行为看起来与原始事件模型蕾丝，React在内部维护了合成事件，抹平了事件之间的差异，因此也带来了一些坑点。

由于React只设计了冒泡模式，所有的事件都统一实现了冒泡的效果，所以当react事件与原生事件混用会有些问题

#### onScroll事件

onScroll事件是个非常特殊的事件，在浏览器中他是没有冒泡的，在react中，react为了实现一致性 ，利用事件捕获实现了事件的传递

{% asset_img img.png %}

也就是说React的onScroll事件如果调用stopPropagation()，会导致事件在图中1号位置就结束了事件传递，这个时候所有的用原生方式添加的onscroll事件都会失去作用，因为事件从document捕获的时候就已经结束了，就没有办法再继续触发了

同时，因为JS是单线程的，页面是只有一条事件传递路线的，react将所有事件委托到document，如果在document上阻止了捕获事件，

就会导致整个页面其他需要捕获传递的事件全部失效

### 总结 

总的来说，js是事件驱动的，各种情况下事件传递略有不同，但还是离不开几个事件模型，如果对于事件模型有比较好的理解，就能解决很多事件上的bug