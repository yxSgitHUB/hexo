---
title: TypeScript小课堂（2）
date: 2025-06-09 14:31:30
tags:
---

### 复杂场景下 TS 的使用

上一篇我们讲了 TS 的基础使用，这一篇我们来看看在复杂场景下的使用。

#### 1. 复杂场景下的使用

复杂场景，这里一般指需要做数据清洗，构造，或者是封装通用组件的场景。

##### 1.1 数据清洗

```TypeScript
type TreeItem = {
  title: string;
  key: string;
  parent: string | null;
};
const data: TreeItem[] = [
  {
    title: "Trunk 0",
    key: "0",
    parent: null,
  },
  {
    title: "Trunk 1",
    key: "1",
    parent: "0",
  },
  {
    title: "Trunk 2",
    key: "2",
    parent: "1",
  },
];
type TreeData<T> = {
  title: string;
  key: string;
  children?: TreeData<T>[];
};
const convertListToTree = (
  list: TreeItem[],
  parentKey: string | null = null,
): TreeData<TreeItem>[] => {
  const tree: TreeData<TreeItem>[] = list
    .filter((item) => item.parent === parentKey)
    .map((item) => {
      return {
        title: item.title,
        key: item.key,
        children: convertListToTree(list, item.key),
      };
    });
  return tree;
};
convertListToTree(data);
```

##### 1.2 组件封装

例如：设计一个 Select 组件，options 接受各种类型的 value，@change 的时候要返回准确的 value 类型。

```vue
<template>
  <select @change="handleChange" :value="value">
    <option v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>
<script
  setup
  lang="ts"
  generic="
  Value extends string | number ,
  Option extends { label: string; value: Value },
"
>
const { options, value } = defineProps<{
  options: Option[];
  value: Value;
}>();
const emit = defineEmits<{
  (e: "change", value: Value): void;
}>();
const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const newValue = target.value as Value;
  emit("change", newValue);
};
</script>
```

关于为什么要这么设计

1. 避免了类型转换的问题
2. 避免了类型不匹配的问题
3. 避免了类型推导的问题
4. 避免了类型检查的问题
   举例

```TypeScript
const option1 = [
  {
    label: "Option 1",
    value: 1,
  },
  {
    label: "Option 2",
    value: 2,
  },
] as const
const option2 = [
  {
    label: "Option 1",
    value: "Option 1",
  },
  {
    label: "Option 2",
    value: "Option 2",
  },
] as const
```
