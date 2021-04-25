---
title: 关于transform带来的……
date: 2021-04-25 18:53:44
tags: [技术文章]
---

{% asset_img WX20210425-185649@2x.png %}

最近出现了这样一个问题，在table中，header在左右滑动的时候会闪动

审查元素时发现，元素位置是正确的但是没有渲染出来

这就引起了我的好奇，查阅资料之后做出如下总结

### 浏览器渲染

浏览器是如何渲染一个页面？

在从服务器中拿到数据后，浏览器会先做解析三类东西：

- 解析html,xhtml,svg这三类文档，形成dom树。
- 解析css，产生css rule tree。
- 解析js，js会通过api来操作dom tree和css rule tree。

解析完成之后，浏览器引擎会通过dom tree和css rule tree来构建rendering tree：

- rendering tree和dom tree并不完全相同，例如：<head></head>或display:none的东西就不会放在渲染树中。
- css rule tree主要是完成匹配，并把css rule附加给rendering tree的每个element。

在渲染树构建完成后，

- 浏览器会对这些元素进行定位和布局，这一步也叫做reflow或者layout。
- 浏览器绘制这些元素的样式，颜色，背景，大小及边框等，这一步也叫做repaint。
- 然后浏览器会将各层的信息发送给GPU，GPU会将各层合成；显示在屏幕上。

reflow => repaint => composite

浏览器渲染页面的任务由两个线程完成：主线程 和 排版线程

渲染过程：
 不同属性值引起的重新绘制有3种路径：

1. layout->paint->composite
2. paint->composite
3. composite
    CSS的属性也就此分为3大类：布局类（layout），绘制类（paint），合成类（composite）
    composite 属性目前只有两个：transform和opacity

### transform的机制和坑

#### 机制：

1. transform变换会在浏览器上单独创建一个绘画层并重新进行渲染
2. 在动画的每一帧中，浏览器都要执行布局、 绘制、 以及将新的位图提交给 GPU。我们知道，将位图加载到 GPU 的内存中是一个相对较慢的操作。浏览器需要做大量工作的原因在于每一帧中元素的内容都在不断改变。改变一个元素的高度可能导致需要同步改变它的子元素的大小，所以浏览器必须重新计算布局。布局完成后，主线程又必须重新生成该元素的位图。


#### 坑：

1.这样就产生了如图表格上的问题，表格的header过多的时候导致每次生成位图补不全或者不够时间完全传输到GPU，动画就会掉帧，表格的滚动本质上是监听scroll事件同步滚动的位置，，同时因为父元素还是在cpu计算，每次生成的时候还要频繁产生位图会卡顿并且动画掉帧

解决方案：为父元素添加transform:translate(0)

这样做的好处是，浏览器生成父元素以及headerItem的位图快照，之后位置就完全由GPU计算位置，不需要再和外部的header计算位移差，就节省了一大部分性能，然后就能顺滑的展示动画

2.当一个元素设置了transfiom属性之后，这块区域就会被提交给GPU来计算各种位置属性，这就带来了另一个问题，这块区域变成一个类似于独立窗口的区域，其中position:fixed时候，内部元素并不会以视窗作为定位了，而是以被设置部分作为窗口进行定位，所以在设置了transform的元素内部，应该避免使用position:fixed或者按照新的展示方式来使用position:fixed
