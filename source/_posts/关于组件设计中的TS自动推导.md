---
title: 关于组件设计中的TS自动推导
date: 2021-06-28 14:18:43
tags:
---

### 实战

我们首先从select组件开始

组件：

```
import React from "react";

type Option ={ key: string , title: string }|{ key: number , title: string }
type SelectProps = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
}
export default class Select extends React.Component<SelectProps, SelectProps> {

  render() {
    const {value,onChange,options} = this.props;
    return <div>
      <select value={value} onChange={(e) => {
        const index = Number(e.target.value)
        onChange(options[index].key)
      }}>
        {options.map((v:Option,index) => {
          return <option key={v.key} value={index}>{v.title}</option>
        })}
      </select>
    </div>;
  }
}
```

调用

```
import React, { useState } from 'react';
import './App.css';
import Select from "./Select";

function App() {
  const [value, setValue] = useState<string|number>('0')
  const onChange = (key: string|number) => {
    setValue(key);
  }
  const options = [{key:'0',title:'0'},{key:'1',title:'1'},{key:'2',title:'2'},{key:'3',title:'3'}]
  return (
    <div className="App">
      <Select value={value} onChange={onChange} options={options}/>
    </div>
  );
}

export default App;
```

这里举了一个最简单的select的例子

onChange的时候返回的key的类型应该是options的key的类型，但这个地方没有自动推导

这样的话就产生了很多问题

实际上在业务上，key一般都是很确定的唯一值，不能推导的话就显得很呆

这样的话让我们来改造一下，通过自动推导的方式和业务自己指定类型

组件：

```
import React from "react";

type Option ={ key: string | number, title: string }
type SelectProps<O extends Option> = {
  options: O[];
  value: O['key'];
  onChange: (value:O['key']) => void;
}
export default class Select<O extends Option> extends React.Component<SelectProps<O>,SelectProps<O>> {
  render() {
    const { value, onChange, options } = this.props;
    const index = options.findIndex(v=>v.key===value)
    return <div>
      <select value={index} onChange={(e) => {
        const index = Number(e.target.value)
        onChange(options[index].key)
      }}>
        {options.map((v:Option,index) => {
          return <option key={v.key} value={index}>{v.title}</option>
        })}
      </select>
    </div>;
  }
}

```

调用

```
import React, { useState } from 'react';
import './App.css';
import Select from "./Select";

function App() {
  const [value, setValue] = useState<string>('0')
  const onChange = (key: string) => {
    setValue(key);
  }
  const options = [{key:'0',title:'0'},{key:'1',title:'1'},{key:'2',title:'2'},{key:'3',title:'3'}]
  return (
    <div className="App">
      <Select<{key:string,title:string}> value={value} onChange={onChange} options={options}/>
    </div>
  );
}

export default App;
```

通过这种形式，我们通过外部传入的Option类型来确认key的类型，这样就可以让类型更紧，更不容易出错，如果外部没有传入类型，也可进行自动推导，推导出option的类型

### 知识点

#### 组件泛型

组件是可以使用一个泛型来进行类型的控制，我们定义的类型可以作为泛型的的最大范围，在这种情况下，可以复用组件逻辑，而不必去关心组件内参数的不同，而不用调用方去使用更加宽泛的类型来适应组件

以此类推。当我们在使用联合类型时，就可以使用这种方式，通过指定和外部传入来控制具体类型，使得类型推断更加精简以及准确
