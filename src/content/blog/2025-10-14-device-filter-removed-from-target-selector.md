---
title: 设备筛选器已从目标选择器中移除
description: 目标选择器不再支持设备筛选器选项，该选项已从目标选择器文档中移除。
date: 2025-10-14
authors:
  - Erik Montnémery
areas:
  - core
---

目标选择器（target selector）不再支持设备筛选器（device filter）选项，并且已从[目标选择器文档](https://www.home-assistant.io/docs/blueprint/selectors/#target-selector)中将其移除。

Hassfest 已更新，对于[在目标上使用设备筛选器的服务将报错](https://github.com/home-assistant/core/pull/152794)。

在 Home Assistant Core 2026.11 中，指定了设备筛选器的目标选择器将无法通过校验。

### 背景

Core 中用于从目标中提取实体的辅助元素（helper）并不支持设备筛选器。当用户选择楼层、区域（area）、标签或类别时，该筛选器会被忽略。前端在为目标选择实体时也会忽略设备筛选器。

对所有核心集成进行审查后发现，没有任何正确使用目标选择器上设备筛选器的情况。因此，我们选择从目标选择器中移除设备筛选器，而不是在 Core 和前端中实现对它的支持。

### 对自定义集成和蓝图的影响

请更新自定义集成和蓝图，从目标选择器中移除设备筛选器。

如果您有在目标选择器上使用设备筛选器的合理用例，请在 Discord 上与我们联系。
