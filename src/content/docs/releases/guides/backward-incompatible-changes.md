---
title: 记录不向后兼容的变更
description: 当你的变更意味着用户需要做某些操作时，告诉他们什么会失效、如何修复以及原因。这些文字会出现在发布说明中。
order: 2
---

不向后兼容的变更（backward-incompatible change）是指要求人们在更新后在自己这边做某些操作的变更，比如修改他们的配置、自动化（automation）或仪表盘（dashboard）。Home Assistant 会尽力避免这类变更。当无法避免时，必须把它解释清楚，因为成千上万的人会在更新前阅读它。

## 尽量避免它

在编写不向后兼容的变更之前，先检查是否可以避免它：

- 旧的方式能否在一段时间内与新方式并存继续工作？那么它是一个[弃用（deprecation）](/releases/guides/deprecations/)，还不是不向后兼容的变更。
- Home Assistant 能否自动迁移旧配置？那么任何人都不需要做任何事。

## 标记拉取请求

[core 仓库](https://github.com/home-assistant/core)的拉取请求（pull request）模板中有一个变更类型清单。当现有功能会失效时，勾选 **Breaking change**；当失效发生在未来的版本中时，勾选 **Deprecation**。这样拉取请求就会获得 `breaking-change` 标签，正是这个标签让你的文字进入发布说明。

## 编写不向后兼容的变更部分

拉取请求模板以一个 **Breaking change** 部分开头。模板说得很直白：告诉用户什么会失效、如何让它重新工作，以及原因。这些文字会随发布说明一起发布，所以要为用户而写，而不是为开发者。

一个好的不向后兼容的变更部分会回答三个问题：

1. **什么变了？** 描述用户看到的东西，而不是代码。“`uptime` 传感器已被移除”是可以的。“重构了传感器平台”则不行。
2. **我需要做什么？** 给出具体步骤。如果用户需要修改 YAML，请展示新的 YAML。
3. **为什么？** 一两句话就够了。当人们理解了原因，就更容易接受变更。

例如：

```markdown
The **Subscribed to Xbox Game Pass** binary sensor has been removed,
because it never worked. The Xbox API always reported `false`, whether
you were subscribed to Game Pass or not.

If you use this binary sensor in an automation or a dashboard, remove it.
```

## 提示

- 写作时要让不了解该集成（integration）的人也能看懂。很多人会阅读每一条不向后兼容的变更，只是为了确认它是否影响自己。
- 使用用户在 UI 中看到的名称，指明发生变化的集成以及实体（entity）、操作（action）或选项。
- 不要掩盖失效。如果有东西停止工作，请在第一句话中说明。
- 当变更在审查过程中发生演变时，保持拉取请求中的该部分内容为最新。
- 遵循[用户文档的写作风格](/writing/reference/style/)。发布说明也使用这种风格。

## 你的文字会怎样处理

在准备发布时，发布团队会收集所有带有 `breaking-change` 标签的已合并拉取请求中的不向后兼容的变更部分。它们会出现在发布说明的 **Backward-incompatible changes** 之下，按集成分组，并附上指向你的拉取请求和文档的链接。发布说明的作者可能会为了清晰和一致而编辑你的文字。

只影响开发者的不向后兼容的变更，比如 Python API 的变更，会改为发布在开发者博客上。发布说明会链接到这些文章。
