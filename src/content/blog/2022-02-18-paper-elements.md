---
title: Paper Elements 即将被移除
description: 在 Home Assistant Core 2022.3 版本中，我们将移除前端仓库中所有的 paper-dropdown-menu 和 paper-input 元素。
date: 2022-02-18
authors:
  - Zack Barett
areas:
  - core
---

在 Home Assistant Core 2022.3 版本中，我们将移除前端仓库（Frontend Repository）中所有的 `paper-dropdown-menu` 和 `paper-input` 元素。这意味着任何先前在卡片或卡片编辑器中使用这些元素的自定义卡片都将无法正确渲染，并需要更新其代码库。

使用 Home Assistant 前端所用元素的自定义卡片（Custom Cards）从未受到支持。

## 我们为什么要这样做？

我们正在将代码库从已弃用的 `paper` 元素迁移到 Google 全新的 [Material Web Components](https://github.com/material-components/material-components-web-components)。这是为了让我们的前端保持最新，能够使用最新的组件和功能。

## 自定义卡片应该怎么做？

我们的建议是使用 [Scoped Custom Element Registry](https://github.com/lit/lit/tree/main/packages/labs/scoped-registry-mixin) 在您的自定义卡片中打包 Material Web Components。从 Home Assistant 2022.3 版本发布开始，Home Assistant 前端将加载使其正常工作所需的 [polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry)。

这将使任何自定义卡片都能使用与 Lovelace 编辑器中相同的 MWC 元素。您可以在 [Boilerplate Card](https://github.com/custom-cards/boilerplate-card) 中看到这种用法的示例。其他 Home Assistant 元素，例如图标选择器（icon picker，`<ha-icon-picker>`），则不支持以同样的方式使用。

更多信息请参阅[这篇旧的博客文章](/blog/2020/10/02/lazyMoreInfo#what-about-external-elements)。
