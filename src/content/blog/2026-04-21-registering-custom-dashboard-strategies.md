---
title: 注册自定义仪表盘策略
description: 自 Home Assistant 2026.5 起，你现在可以注册自定义仪表盘策略，就像注册自定义卡片一样，这使得通过“社区仪表盘”部分下的新仪表盘对话框来发现并添加它们变得更加容易。
date: 2026-04-21
authors:
  - Aidan Timson
areas:
  - frontend
---

自 Home Assistant 2026.5 起，你现在可以注册自定义仪表盘策略，就像注册[自定义卡片](/frontend/custom-ui/card/)一样，这使得通过**社区仪表盘**部分下的**新仪表盘**对话框来发现并添加它们变得更加容易。

以前，你必须引导用户创建一个空白仪表盘，在 YAML 模式下进行编辑，然后粘贴你的自定义策略。现在，你可以注册一个友好名称、描述和文档。

要注册你的策略，请使用包含以下键的对象调用 `window.customStrategies.push()`：

- `type`：不带 `custom:` 前缀的策略类型，例如 `"my-demo"`。
- `strategyType`：设置为 `"dashboard"` 以注册仪表盘策略。
- `name`：策略的友好名称。
- `description`（`optional`）：策略的简短描述。
- `documentationURL`（`optional`）：策略文档的 URL。这目前尚未在策略 UI 中显示，但未来可能会显示。

示例：

```js
window.customStrategies = window.customStrategies || [];
window.customStrategies.push({
  type: "my-demo",
  strategyType: "dashboard",
  name: "My demo dashboard",
  description: "A starter dashboard generated from JavaScript.",
  documentationURL: "https://example.com/my-demo-dashboard",
});
```

这些元数据与自定义元素本身是分开的。你的策略仍然需要使用类似 `ll-strategy-dashboard-my-demo` 的标签进行注册，并且用户仍然需要在 Home Assistant 发现它之前加载该资源。你可以为此使用 HACS，就像添加自定义卡片等其他资源一样。

请查看更新的[自定义策略](/frontend/custom-ui/strategy/)文档，其中包含示例代码和更多详细信息。
