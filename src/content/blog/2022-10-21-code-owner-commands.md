---
title: 面向代码所有者的 GitHub 命令
description: "Ludeeus 为 Home Assistant service hub 扩展了一项新功能：面向代码所有者的 GitHub 命令。"
date: 2022-10-21
authors:
  - Paulus Schoutsen
areas:
  - core
---

[Ludeeus](https://github.com/ludeeus) 为 Home Assistant [service hub](https://github.com/home-assistant/service-hub/) 扩展了一项新功能：面向代码所有者（code owner）的 GitHub 命令。

该功能允许任何代码所有者对打有其集成（integration）标签的问题（issue）进行分类处理（triage）。从今天起，以下命令可用：

* `@home-assistant close`<br />
  关闭该问题。仅限于只标记了 1 个集成的情况

* `@home-assistant rename New Title`<br />
  更改问题的标题。仅限于只标记了 1 个集成的情况

* `@home-assistant unassign <your domain>`<br />
  移除集成标签及相关指派人（assignee）。

当机器人发表评论通知代码所有者有新问题（issue）或拉取请求（pull request）时，会包含这些命令（[示例](https://github.com/home-assistant/core/issues/80731#issuecomment-1287084569)）。
