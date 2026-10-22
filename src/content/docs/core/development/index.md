---
title: 开发工作流
description: 代码如何从你的机器进入 Home Assistant 发布版本。包括环境、工具、检查和评审流程。
order: 2
sidebarGroups:
  - Write code
  - Pull requests
  - Changing behavior
---

对 Home Assistant Core 的每一项更改都遵循相同的路径。你在开发环境中编写代码，测试和代码检查工具对其进行检查，然后针对 `dev` 分支发起一个拉取请求（pull request），有人对其进行评审，一旦合并，它就会在此之后从 `dev` 分支切出 beta 版的第一个月度发布中发布。

本节介绍这条路径。它适用于 core 中的所有内容，从一行修复到新的集成（integration）。

## 编写代码

- [开发环境](/core/development/environment/)：开发容器，或在 Linux、macOS 或 Windows 上的手动安装。
- [代码风格](/core/development/style/)：格式化、文档字符串（docstring）、日志记录，以及评审者关注的约定。
- [类型注解](/core/development/typing/)：core 如何使用 mypy，以及如何启用严格检查。
- [运行测试](/core/development/testing/)：pytest、覆盖率、快照，以及 CI 运行的内容。
- [编写测试](/core/development/tests/)：集成的测试如何组织，包括 fixture、mock 和快照。
- [代码检查工具、hassfest 和 CI](/core/development/checks/)：在每次提交和每个拉取请求上运行的检查。
- [输入验证](/core/development/input-validation/)：用于配置流程、动作和 YAML 的模式（schema）。

## 拉取请求

- [开发清单](/core/development/checklist/)：提交前需要检查的内容。
- [提交拉取请求](/core/development/submitting/)：分支、提交、模板，以及如何界定你的更改范围。
- [发起拉取请求之后](/core/development/review-process/)：接下来会发生什么，以及如何加快速度。
- [保持分支最新](/core/development/catching-up/)：引入 `dev` 分支的最新更改。
- [评审拉取请求](/core/development/reviewing/)：评审他人工作时应该关注什么。
- [技巧与窍门](/core/development/tips/)：让你工作更轻松的小技巧。

## 更改行为

- [弃用](/core/development/deprecating/)：如何在不一夜之间破坏用户家庭的情况下移除或更改某些内容。
- [版本控制](/core/development/versioning/)：Home Assistant 版本号的构成方式。
- [Labs 预览功能](/core/development/labs/)：在功能成为标准之前，发布可供用户选择加入的功能。

## 简要版本

如果你只从本节记住一件事，那就是：保持拉取请求小而精。每个拉取请求只包含一个修复、一个功能或一次重构。小的拉取请求评审更快、更不容易出问题，对包括你自己在内的所有人都更容易。
