---
title: TypeScript小课堂（1）
date: 2025-06-09 10:34:11
tags: ["TypeScript"]
---

## 我们为什么要使用 TS

### 提升代码可读性与理解效率

#### 类型注解提供明确指引：在团队开发中，TypeScript 的类型注解为代码添加了清晰的文档说明。当其他成员阅读代码时，无需花费大量时间猜测变量、函数参数或返回值的类型，例如，function getUserInfo(userId: string): UserInfo ，明确指出该函数接收字符串类型的 userId 参数并返回 UserInfo 类型，有助于快速理解代码逻辑与数据流。

#### 避免类型误解的错误解读 ：没有类型定义的代码可能因开发者对数据类型的误解导致错误，阻碍团队协作。TypeScript 的类型检查在代码编写阶段就避免这类问题，减少团队成员之间因理解不一致产生的沟通成本和协作障碍。

### 强有力的代码检查与安全性

#### 提前发现潜在错误：通过静态类型检查，TypeScript 在编译阶段就能发现许多在 JavaScript 中需要等到运行时才能暴露的问题。例如，将字符串类型的值赋给预期为数字的变量，或调用函数时传递了错误类型的参数，开发团队能够在代码整合之前就修复这些错误，避免上线后因这些低级错误导致系统崩溃或功能异常影响用户体验，提升团队开发效率和项目质量。

#### 维护项目稳定性 ：随着项目规模扩大和团队成员增多，代码的修改和扩展频繁。TypeScript 的类型系统保障了代码的稳定性，当修改代码时，编译器会检查修改是否影响了依赖于原有类型定义的其他部分，确保改动在安全范围内，降低团队协作中因代码变更引发的隐藏风险。

### 便于代码维护与拓展

#### 简化代码重构过程 ：在团队长期维护项目过程中，经常需要对代码进行重构以优化性能、提升可读性或添加新功能。TypeScript 的类型定义使得重构更为安全高效，开发者可以放心地重命名变量、修改函数签名或调整类结构，编译器会实时提示相关错误，避免因重构导致大量难以追踪的运行时错误，提高团队对遗留代码的维护信心和效率。

#### 支持灵活的项目扩展 ：当团队需要为项目添加新功能模块或与其他系统集成时，TypeScript 的类型系统提供了清晰的接口规范。新成员能够依据这些接口快速开发和整合代码，减少因不了解项目原有数据结构和业务逻辑而产生的错误，同时原有代码的类型安全保障了新功能与旧代码的顺利融合。

### 增强团队协作与沟通

#### 统一团队开发标准与规范 ：TypeScript 的引入促使团队制定统一的类型定义规范、代码风格和项目结构，减少因个人开发习惯差异带来的混乱。例如，规定接口命名规则、类型声明格式等，使团队成员在协作开发时能够按照一致的标准编写和审核代码，提高代码质量和团队协作的流畅性。

#### 促进跨团队交流与共享 ：在大型项目中，不同团队可能负责不同模块的开发。TypeScript 的类型定义文件（.d.ts）便于团队之间共享类型信息，当一个团队开发的库或组件被其他团队使用时，类型定义文件确保其他团队成员能够正确理解和使用该库，避免因类型不明确导致的使用错误，促进团队间的协作和代码复用。

### 强大的工具支持与开发效率提升

#### 智能代码补全与提示 ：TypeScript 搭配现代 IDE（如 Visual Studio Code）能够提供智能的代码补全、参数提示和类型信息显示功能。在团队协作编写代码时，成员可以快速获取可用的属性、方法和类型信息，减少因记忆模糊或不熟悉代码库而花费的时间，提高编码速度和准确性，提升团队整体开发效率。

#### 代码导航与重构工具 ：借助 TypeScript 的高级工具支持，如代码导航（跳转到定义、查找引用）、批量重命名等，团队成员能够轻松地在大型代码库中定位和修改代码。这些工具在团队协作开发过程中，特别是在进行跨文件、跨模块的代码变更时，显著节省时间，提高团队对代码的掌控力和开发协同性。

## TS 基础

### 网上 TS 教程有很多，这里就不再赘述

有的同学在写 TS 会担心，说我不会类型体操，也不会泛型，不写 any 就报错，那我如何去写 TS 呢？

```TypeScript
export interface InternalSelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<RcSelectProps<ValueType, OptionType>, 'mode'> {
  rootClassName?: string;
  prefix?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  disabled?: boolean;
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE' | 'combobox';
  /** @deprecated Use `variant` instead. */
  bordered?: boolean;
  /**
   * @deprecated `showArrow` is deprecated which will be removed in next major version. It will be a
   *   default behavior, you can hide it by setting `suffixIcon` to null.
   */
  showArrow?: boolean;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  styles?: Partial<Record<SemanticName, React.CSSProperties>> & {
    popup?: Partial<Record<PopupSemantic, React.CSSProperties>>;
  };
  classNames?: Partial<Record<SemanticName, string>> & {
    popup?: Partial<Record<PopupSemantic, string>>;
  };
}
```

### 如何去写

首先 一口气吃不成胖子，先把基础类型定义搞清楚你就学会了一半了。
TS 的能力在我看来是用来约束，js 的特性就是灵活，而 ts 则是约束这份灵活，让你在写代码的时候，能够更安全，更方便。
所以我们在写代码的时候先要确定哪些是比较固定的，不由我们的意志为转移的

#### 接口类型

不论是第三方接口还是后端接口，在除开开发阶段的时候，大部分都是比较稳定的，开发阶段也可以提前约定来进行 TS 类型的声明

```TypeScript
type UserInfo = {
  name: string;
  age: number;
  gender: string;
}
type UserPermission = {
    role: string;
    permission: number[];
}
type UserStore = {
  userInfo: UserInfo;
  userPermission: UserPermission;
}
```

在这个阶段中，返回类型通常是固定的，所以可以尽量写的紧一些

```TypeScript
type UserInfo = {
  name: string;
  age: number;
  gender: 'male' | 'female';
}
type PermissionCode = 10001｜10002｜10003
type UserPermission = {
    role: "admin" | "user";
    permission: PermissionCode[];
}
type UserStore = {
  userInfo: UserInfo;
  userPermission: UserPermission;
}
```

再进一步 抽出常量

```TypeScript
const PERMISSION_CODE = {
  10001: '查看',
  10002: '编辑',
  10003: '删除',
} as const
type PermissionCode = keyof typeof PERMISSION_CODE
type UserInfo = {
  name: string;
  age: number;
  gender: 'male' | 'female';
}
type UserPermission = {
    role: "admin" | "user";
    permission: PermissionCode[];
}
type UserStore = {
  userInfo: UserInfo;
  userPermission: UserPermission;
}
```

做到这种程度我觉得基本数据定义已经没什么问题了
然后我们就可以开始通过数据来构造我们的页面了
但是问题又来了

```TypeScript
type Filter = {
  field: string;
  operator: "="  | "!=";
  value: string | number | boolean;
}|{
  field: string;
  operator: ">" | "<" | ">=" | "<=";
  value: number;
}
type Logic = {
  logic:"or" | "and"
  filter: Filter[]
}
```

我们通常会遇到一些比较复杂的数据
比如 如何判断一个节点是逻辑节点还是叶子节点呢？

```TypeScript
type NormalFilter = {
  field: string;
  operator: "="  | "!=";
  value: string | number | boolean;
}
type NumberFilter = {
  field: string;
  operator: ">" | "<" | ">=" | "<=";
  value: number;
}
type Filter = NormalFilter | NumberFilter
type Logic = {
  logic:"or" | "and"
  filter: Filter[]
}
const isLogic = (node: Filter | Logic): node is Logic => {
  return 'logic' in node
}
const isNumberFilter = (filter:Filter): filter is NumberFilter => {
  return 'operator' in filter && [ ">" ,"<" , ">=" , "<="].includes(filter.operator)
}
```

ok,那么掌握到这种程度，基本已经可以写一些简单的页面了
但是如果我们遇到一些比较复杂的页面，我们就需要考虑一下进阶写法
我们下期再见
