---
title: 虚拟dom之操作
date: 2021-05-24 19:04:49
tags:
---

### 虚拟dom是什么

virtul DOM 也就是虚拟节点。通过JS的Object对象模拟DOM中的真实节点对象，再通过特定的render方法将其渲染成真实的DOM节点。

生成vNode---->渲染成真实节点 --------->挂载到页面--------->diff比较

也就是说虚拟dom是在内存中存在，并不在页面上

### React中的dom操作

```
export default class Input extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          count:1
      }
    this.myRef = React.createRef();
  }
  componentDidUpdate() {
    console.log("componentDidUpdate",this.myRef);
  }
  render() {
    console.log(this.myRef);
    return (
      <div>
        <div
          ref={this.myRef}
          onClick={() => {
              console.log(this.myRef);
              this.setState(state => {
                  state.count += 1;
                  return state
              })
          }}
        >
          111111
        </div>
      </div>
    );
  }
}
```

通常情况下我们用ref拿到reactNode，还可以使用document.getElement系列方法这里不展开。

通常ref是当节点渲染完成之后才能拿到的，也就是说，节点已经渲染到了页面上，这个时候再去操作dom就有些晚了，会造成页面的闪动



### hooks时代，这个问题有了新的解决方案

```
export default  function Index () {
    const ref = useRef();
    
    useEffect(() => {
        console.log("useEffect",ref)
        ref.current.style.transform = "translateY(300px)"
    }, []);
    return (
        <div className='animate'>
            <div ref={ref} className="square" onClick={() => {
                 console.log("onClick",ref)
                 ref.current.style.transform = "translateY(0px)"
            }}>square</div>
        </div>
    );
}
```

在hooks组件中执行有副作用的操作可以用useEffect来包裹，但是这样还是会有闪动的问题

但是在一次查看rc-overflow的源码时发现了一种新写法 useLayoutEffect

### useEffect和useLayoutEffect区别

摘抄了一点网上的说明：

#### useEffect

基本上90%的情况下,都应该用这个,这个是在render结束后,你的callback函数执行,但是不会block browser painting,算是某种异步的方式吧,但是class的componentDidMount 和componentDidUpdate是同步的,在render结束后就运行,useEffect在大部分场景下都比class的方式性能更好.

#### useLayoutEffect

这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.



也就是说useLayoutEffect会在虚拟dom在渲染成真实dom之前同步调用

这个方法可以相当于对虚拟dom进行操作

利用这个我们可以解决很多问题

```
export default  function Index () {
    const ref = useRef();
    
    useLayoutEffect(() => {
        console.log("useEffect",ref)
        ref.current.style.transform = "translateY(300px)"
    }, []);
    return (
        <div className='animate'>
            <div ref={ref} className="square" onClick={() => {
                 console.log("onClick",ref)
                 ref.current.style.transform = "translateY(0px)"
            }}>square</div>
        </div>
    );
}
```

这次的实现，就是文字直接出现到了目标位置

但是代价就是白屏稍微长了一些

### 总结

在react16.8之后提供了react-hooks

其中的useLayoutEffect可以帮助我们同步的对dom进行一些操作

这能帮助我们可以以部分性能为代价实现某些dom计算操作

