---
title: "集成现在有了分类"
description: "集成现在会说明其用途，例如照明或能源。这对你的 manifest 意味着什么，以及自定义集成如何参与其中。"
date: 2026-10-20
authors:
  - Franck Nijhof
areas:
  - core
  - marketplace
---

Home Assistant 拥有超过 1,500 个集成（integration）。要找到合适的集成，意味着你需要知道它的名字，或者在传感器和开关等列表中不断滚动。这只能告诉你一个集成会创建哪些实体（entity），而不能说明它到底是做什么的。

因此，集成现在有了分类：共有 28 个分类，例如照明、气候和能源，其中大多数还有子分类，例如“能源 › 电动汽车充电”。分类说明了集成的用途。

![home-assistant.io 集成页面上的能源分类，其子分类显示在侧边栏中](./images/2026-10-integration-categories/energy-integrations.webp)

## 核心中

核心中的每个集成都在其 [manifest](/core/integrations/manifest/#categories) 的 `categories` 键中列出一到三个分类。Hassfest 会检查这些分类，并要求所有供用户浏览的集成必须包含它们。实体和系统集成没有分类。虚拟集成则显示其所指向的集成的分类。

[home-assistant.io](https://www.home-assistant.io/integrations/) 上的集成页面通过它们进行浏览，每个分类和子分类都有一个专属页面。在文档页面中，`ha_categories` 取代了旧的 `ha_category`。

选择分类归结为一个问题：这是什么，用户会在哪里寻找它？恒温器品牌属于“气候”分类，即使它还会创建传感器和开关。[集成分类](/core/integrations/categories/) 提供了完整的列表以及选择指南。

## 自定义集成

自定义集成可以使用相同的键：

```json title="manifest.json"
{
  "categories": ["energy.ev_charging"]
}
```

对于自定义集成，这是可选的。Hassfest 只会对未知的分类发出警告，因此核心中分类的更改不会导致你的构建失败。[HACS action](https://github.com/hacs/action) 会在缺少该键时发出警告，并在遇到未知分类时使构建失败。

目录已经从你的 manifest 中提取了这些分类。接下来，Marketplace 也会像集成页面一样通过它们进行浏览。现在就添加你的分类，让你的集成从一开始就显示在正确的位置。
