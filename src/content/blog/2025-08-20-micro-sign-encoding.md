---
title: 统一测量单位中 μ 的编码
description: "单位前缀 μ 用于 μV 和 μS 等测量单位常量。然而 μ 存在两种不同的 Unicode 编码："
date: 2025-08-20
authors:
  - Jan Bouwhuis
areas:
  - core
---

## 统一使用一种首选编码来表示测量单位中的 μ

单位前缀 μ 用于 μV 和 μS 等测量单位常量。
然而，μ 存在两种不同的 Unicode 编码：

1. [MICRO SIGN（微符号）](https://www.compart.com/en/unicode/U+00B5)
2. [Greek Small Letter Mu（希腊小写字母 Mu）](https://www.compart.com/en/unicode/U+03BC)

Home Assistant 此前混用了这两种编码，这导致了问题，因为两种编码之间的字符串比较会失败，从而使测量单位验证失败。

我们选择了“Greek Small Letter Mu”，因为“MICRO SIGN”编码是为了兼容旧的 8 位西欧字符集而存在的，而且 Unicode 联盟（Unicode Consortium）建议不要使用它。

通过 [#144853](https://github.com/home-assistant/core/pull/144853)，我们已在 Home Assistant 的核心中修复了此问题，统一使用 Greek Small Letter Mu 版本来编码 μ。在 Python 字面量字符串中，该变体编码为 `"\u03bc"`。

开发者应检查其代码和所用的库是否依赖于有歧义的 MICRO SIGN（μ）`"\u00b5"`，并将代码迁移为使用 Greek Small Letter Mu `"\u03bc"`，以避免出现问题。

`sensor` 和 `number` 实体（entity）平台现在内置了一项功能，可自动转换单位中使用有歧义的 MICRO SIGN（μ）编码的情况。

## 在 Visual Studio Code 中查找出现位置

在 Visual Studio Code 中，在**搜索**（文件）面板中启用**区分大小写**（Match Case），以仅查找所选的编码。从上方复制确切的 μ 字符，并将其粘贴到搜索框中。编辑器内的页面搜索会匹配所有变体；请改用全局搜索。
## 新增 linter

为避免新增或修改的代码出现问题，[#144853](https://github.com/home-assistant/core/pull/144853) 添加了一个 linter，当使用非首选编码的 μ 进行不正确的字面量赋值时，它会发出警告。
