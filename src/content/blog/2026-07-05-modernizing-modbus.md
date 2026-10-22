---
title: Home Assistant 中 Modbus 的现代化
description: "Modbus 在现代家庭中无处不在：太阳能逆变器、电表、热泵以及各种进入室内的工业设备。"
date: 2026-07-05
authors:
  - Paulus Schoutsen
areas:
  - core
---

Modbus 在现代家庭中无处不在：太阳能逆变器、电表、热泵以及各种进入室内的工业设备。长期以来，Home Assistant 一直通过基于 YAML 的 `modbus` 集成来支持这些设备，用户需要在配置中手动编写寄存器映射。该集成不会被废弃，现有的配置也能继续正常工作。但是，手动编写寄存器映射将理解设备协议的负担推给了每个用户，这也不符合 Home Assistant 其余部分所采用的配置流（config-flow）、UI 优先的发展方向。

因此，我们正在添加一种使用 Modbus 的新方法：一种基于集成的方法，由设备集成（device integration）掌握特定设备的知识，用户只需在 UI 中选择他们的设备，就像使用其他任何集成一样。

## 共享连接

Modbus 连接是一个单一的、独占的资源：同一时间只能有一方在总线上进行通信。串行（RS-485）总线或 TCP 转串行网关可以同时承载许多设备，有时甚至来自不同的制造商。如果两个集成各自打开到同一总线的连接，它们就会相互争抢，而在过去，Home Assistant 根本不支持在集成之间共享总线。

`modbus` 集成通过在其共享的连接上分配单元（unit）来解决这个问题。设备集成在其自身的配置流中收集自己的连接详细信息，就像其他任何集成一样，并向 `modbus` 请求在这些连接上的一个单元。使用相同详细信息进行请求的两个集成会通过一个连接获得单元，因此它们的请求会在其后串行化，而不是争抢总线。

共享连接不会被单独配置或持久化。它仅在集成持有一个单元时存在，并在最后一个使用者的配置条目（config entry）卸载时关闭。这保持了用户体验的合理性——你设置的是热泵，而不是总线——同时仍然为总线提供了一个单一的所有者。[Modbus 开发者文档](/core/internals/modbus/) 介绍了如何请求单元，并附带了示例代码。

## 独立的库

`modbus` 底层的连接抽象存在于 [`modbus-connection`](https://home-assistant-libs.github.io/modbus-connection/) 中，这是我们为此目的设计并发布在 PyPI 上的一个新库。它不绑定于 Home Assistant，可以在任何 Python 项目中独立使用。它提供了一个通用的、与后端无关的接口，因此设备库作者可以针对一个 API 进行编写，而无需关心底层的 Modbus 实现，并且它附带了一个设备建模框架和一个 `pytest` 插件，使构建和测试设备库变得简单直接。

这使得关注点保持在它们该在的地方。设备库是一个普通的 PyPI 包，它知道如何与特定设备通信，而 Home Assistant 中的消费集成（consuming integration）将该库连接到共享连接并暴露实体（entity）。两者都可以独立开发和测试。

如需更多背景信息，请参阅我们的[研究](https://gist.github.com/balloob/b9fa91ba1a0914a9787f8f6ceb637b83)。

## 让我们开始构建吧

有了这些新的构建模块，现在可以将 Modbus 的 YAML 配置集合转换为特定于制造商的集成，人们可以通过 UI 进行设置。如果你（有兴趣）参与这项工作，请前往 [Home Assistant Discord 的 #modbus 频道](https://discord.com/channels/330944238910963714/1347329854495916044)，我们将很乐意提供帮助。

如果你正在使用 AI 代理，可以向它提供以下提示词：

> 我想使用新的 Modbus Connection 集成来为 Home Assistant 创建一个新的集成，相关文档在此：/core/internals/modbus/
> 
> 我们想要转换为设备库的 YAML 可以在这里找到：*TODO INSERT LOCATION OF MODBUS YAML!*
>
> 此任务的交付成果将是 3 个文件夹：
> 
> - 首先基于 YAML 创建设备库。严格遵循 https://github.com/darkrain-nl/sofar-modbus 作为示例，包括如何使用组件模型、所有 GitHub Actions、辅助脚本和 README。该库旨在作为一个独立的设备库，不应提及 Home Assistant。查看 modbus_connection 的源码以了解所有受支持的字段。
> 
> - 创建一个可以贡献给 Home Assistant 核心的集成，遵循此示例：https://github.com/home-assistant/core/tree/dev/homeassistant/components/sofar
> 
> - 创建一个自定义集成版本，其中设备库被内置（vendorized），以便社区可以通过 HACS 进行测试。遵循此模板 https://github.com/ludeeus/integration_blueprint
