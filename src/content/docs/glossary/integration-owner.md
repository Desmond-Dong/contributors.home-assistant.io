---
title: "集成所有者"
description: "负责某个集成（integration）的个人或团队，列在该集成的清单（manifest）中，会收到其相关问题的通知，并被请求审查其拉取请求（pull request）。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "integration owners"
  code:
    - "codeowners (manifest)"
    - "CODEOWNERS"
  formerly:
    - "code owner"
  related:
    - "integration"
    - "manifest"
    - "pull-request"
    - "maintainer"
  autolink:
    - "integration owner"
    - "integration owners"
---

集成所有者（integration owner）以 GitHub 用户名的形式列在集成清单（manifest）的 `codeowners` 字段中。Hassfest 会根据这些列表生成 Home Assistant Core 的 `CODEOWNERS` 文件，GitHub 使用该文件来请求他们进行审查。当某个问题（issue）被加上其集成对应的标签时，机器人会提及（mention）他们。

代码中称他们为 code owners：例如 `codeowners` 字段、`CODEOWNERS` 文件，以及像 `by-code-owner` 这样的标签。在关于集成的文字中，请使用“集成所有者”。“代码所有者（code owner）”这一说法仍适用于与集成无关的仓库的 `CODEOWNERS` 文件，例如负责前端部分代码的团队。
