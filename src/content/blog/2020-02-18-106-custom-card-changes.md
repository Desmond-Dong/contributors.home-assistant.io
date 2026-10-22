---
title: 可能影响 0.106 中自定义卡片的变更
description: 我们在 Home Assistant Core 0.106 中进行了一些可能会影响自定义 Lovelace 卡片的更改。如果您是自定义卡片开发者，请阅读以下内容。
date: 2020-02-18
authors:
  - Bram Kragten
areas:
  - frontend
---

我们在 Home Assistant Core 0.106 中进行了一些可能会影响自定义 Lovelace 卡片的更改。如果您是自定义卡片开发者，请阅读以下内容。

### 冻结配置

过去，我们会为每张卡片提供一份配置的副本，因为有些卡片会修改 Lovelace 传递给它们的配置。在 0.105 中我们不再这样做，因为为每张卡片创建深拷贝不利于性能。
这导致了一些问题，因为卡片仍在修改配置。在 0.106 中，我们冻结了配置。这意味着自定义卡片不能修改配置。如果它仍然尝试这样做，将会抛出异常或静默失败，具体取决于它是否在严格模式下运行。

请检查您的自定义卡片在 0.106 中是否仍然正常工作，并做出调整以不再修改配置。如有需要，您可以自行创建配置的副本。

### 辅助函数

> [!NOTE]
> 我们决定将此更改推迟至 0.107。

所做的第二项更改是，我们不再默认加载所有元素类型，而是在需要时才加载它们。这也有助于提升性能，但可能会破坏您的自定义卡片。

我们引入了一组辅助函数，您可以用它们来创建 Lovelace 元素。这些函数与 Home Assistant 内部使用的函数相同，并且始终与用户正在使用的版本保持最新。
您可以按如下方式使用它们：

```js
const helpers = await loadCardHelpers();
const element = helpers.createRowElement(config);
element.hass = this.hass;
```

更多信息请参见 https://github.com/home-assistant/frontend/pull/4853
