---
title: Hacktoberfest 2019
description: 今年我们再次参加 Hacktoberfest。Hacktoberfest 是一项庆祝开源的全球性活动。
date: 2019-09-27
authors:
  - Paulus Schoutsen
areas:
  - core
---

今年我们再次参加 [Hacktoberfest](https://hacktoberfest.digitalocean.com)。Hacktoberfest 是一项庆祝开源的全球性活动。如果您在十月份提交四个拉取请求（pull request），就可以获得一件免费的 Hacktoberfest T 恤。

Home Assistant 目前正朝着我们神奇的 1.0 版本冲刺。Home Assistant 1.0 的核心在于用户友好性。作为其中的一部分，我们最近引入了设备自动化（device automation），并且正在扩展场景（scene）在 Home Assistant 中的工作方式。

Home Assistant 支持各种各样的产品，因此我们构建的并非每个功能都已支持每种产品类型。为了这次 Hacktoberfest，我们准备了一些 issue，以帮助各个集成（integration）使用最新的 Home Assistant 功能。

为了让入门更容易，我们引入了一个新的脚手架脚本。这个脚本能够创建为现有实体（entity）集成添加新功能所需的全部样板代码。包括测试！您只需要专注于与特定集成打交道的代码。每个链接的 issue 中都包含了如何使用它的说明。

如果您想查看所有可用的 issue，而不是下面这份精选列表，请[查看这里](https://github.com/issues?page=1&q=is%3Aopen+is%3Aissue+org%3Ahome-assistant+archived%3Afalse+label%3AHacktoberfest&utf8=%E2%9C%93)（需要登录 GitHub）。

**9 月 30 日更新：** 新增了文档部分，更新了 Almond 部分中的链接，并添加了指向所有 Home Assistant Hacktoberfest issue 的链接。

**10 月 1 日更新：** 新增了前端部分。

## 场景

场景（scene）允许用户定义一盏灯应该是什么样子（即：应该处于开启状态，并且颜色应该是蓝色）。当场景被激活时，就由 Home Assistant 来确定需要调用哪些服务（service）来实现这一效果。

场景是一种用户易于理解的强大工具。因此，改进我们对场景的支持非常重要。我们准备了以下 issue：

- [添加 `scene.create` 服务以动态创建场景。](https://github.com/home-assistant/core/issues/27023)
- ~~[添加 `scene.apply` 服务以应用定义为服务数据的场景。](https://github.com/home-assistant/core/issues/26813)~~
- ~~[在脚本语法中添加激活场景](https://github.com/home-assistant/core/issues/27026)~~
- [为实体集成添加状态重现（reproduce state）支持。](https://github.com/home-assistant/core/issues?utf8=%E2%9C%93&q=label%3AHacktoberfest+reproduce_state+is%3Aopen+)（多个 issue）

<!--truncate-->

## 设备自动化

设备自动化（device automation）是一种面向设备的方式，供用户创建自动化。在定义自动化中的触发、条件或动作部分时，用户首先会选择一个设备，然后查看该设备可用的选项列表。非常简单！

设备自动化依赖于集成来定义每个设备可用的选项。由于这是一项新技术，我们仍在寻求帮助，让我们所有的实体集成（灯、开关等）都支持此功能。我们准备了以下 issue：

- [为实体集成添加设备触发器（device trigger）支持](https://github.com/home-assistant/core/issues?utf8=%E2%9C%93&q=label%3AHacktoberfest+device_trigger+is%3Aopen+)（多个 issue）
- [为实体集成添加设备条件（device condition）支持](https://github.com/home-assistant/core/issues?utf8=%E2%9C%93&q=label%3AHacktoberfest+device_condition+is%3Aopen+)（多个 issue）
- [为实体集成添加设备动作（device action）支持](https://github.com/home-assistant/core/issues?utf8=%E2%9C%93&q=label%3AHacktoberfest+device_action+is%3Aopen+)（多个 issue）

## Home Assistant 文档

猜猜看什么永远做不完？文档。

- [补充缺失的集成文档](https://github.com/home-assistant/home-assistant.io/issues?q=is%3Aissue+is%3Aopen+label%3AHacktoberfest)
- [补充缺失的 hass.io 插件（add-on）文档](https://github.com/home-assistant/hassio-addons/issues?q=is%3Aissue+is%3Aopen+label%3AHacktoberfest)

## 前端

Home Assistant 的前端也有一些工作要做。
所以我们也准备了一些 issue 来帮助您入门：

- [让所有文本都可以翻译](https://github.com/home-assistant/frontend/issues?utf8=%E2%9C%93&q=label%3AHacktoberfest+label%3Alocalization+is%3Aopen+)（多个 issue）
- [帮助提升 Home Assistant 的无障碍性](https://github.com/home-assistant/frontend/issues?q=is%3Aopen+label%3AHacktoberfest+label%3Aaccessibility)（多个 issue）
- [以及许多其他小的用户体验（UX）问题](https://github.com/home-assistant/frontend/labels/Hacktoberfest?page=2&q=is%3Aopen+label%3AHacktoberfest)

## 附加：Almond - 虚拟助手

[Almond](https://almond.stanford.edu/) 是斯坦福大学推出的一个开放且保护隐私的虚拟助手。我们一直在[合作](https://github.com/stanford-oval/thingpedia-common-devices/pull/80)，让它能够与 Home Assistant 协同工作。目前它仅限于控制 Home Assistant 中的灯光。

在这次 Hacktoberfest 中，让我们看看能否扩大所支持类型的数量！要开始参与，请查看以下链接：

- [关于如何贡献 Home Assistant 特定类型的文档](https://almond.stanford.edu/doc/home-assistant-integration.md)
- [关于如何运行测试的文档](https://almond.stanford.edu/doc/thingpedia-testing.md)
- 在[家中](https://github.com/stanford-oval/almond-server)运行 Almond，使用 [Android 版本](https://play.google.com/store/apps/details?id=edu.stanford.thingengine.engine&hl=en_US)或 [Gnome 版本](https://flathub.org/apps/details/edu.stanford.Almond)
