---
title: 大迁移
description: Home Assistant 围绕组件（component）构建。其中一类组件为某类设备提供实体（entity）抽象，例如灯、开关或媒体播放器。
date: 2019-02-19
authors:
  - Paulus Schoutsen
areas:
  - core
---

Home Assistant 围绕组件（component）构建。其中一类组件为某类设备提供实体（entity）抽象，例如灯、开关或媒体播放器。过去，要与这些抽象进行集成，你需要为该组件创建一个平台（platform）。如果灯组件是 `light/`，那么集成就会将其平台创建为 `light/hue.py`。这样，灯的所有逻辑都保存在一起。

随着 Home Assistant 的不断发展，我们所集成的设备/服务的能力和规模也在增长。集成（integration）不再只是实体组件的一个平台，而是五个平台加上一个用于管理连接的组件。对于如此庞大的集成来说，将文件分散为 `light/zwave.py`、`switch/zwave.py`、`cover/zwave.py` 等会成为维护的噩梦。这也使得自定义组件的分发变得更加困难，因为用户现在需要在不同的文件夹中创建文件。

因此，在 Home Assistant 0.87 中，我们启动了一次迁移。我们不再以 `light/hue.py` 的形式查找实体组件的平台，而是以 `hue/light.py` 的形式查找。文件的内容将保持完全不变。通过将文件移出实体组件文件夹，我们还可以将庞大的实体组件拆分为多个文件，以提高可维护性。

这项变更在实现上基本向后兼容，但对自定义组件有一个小的破坏性变更：如果你覆盖了内置平台，现在需要使用新的 `hue/light.py` 文件名格式。

随着集成文件整合到单个文件夹中，我们还将强制执行一项新规则：所有平台都将从与组件相同的来源加载。这意味着，如果你想用自定义版本覆盖内置组件/平台，你需要复制所有组件和平台文件，而不仅仅是你想要加载的那一个。这样一来，即使 Home Assistant 升级移动了内部文件/值，我们也可以防止自定义平台或组件损坏。

## 针对自定义组件开发者的注意事项

- 组件创建于 `<config>/custom_components/<integration name>/`。请务必确保在该文件夹中至少创建一个空的 `__init__.py` 文件。
- 如果你为实体组件制作平台，请将其放在以集成名称命名的文件夹中：`<integration name>/light.py`
- 如果你想分享调整后的 Home Assistant 集成版本，请复制所有（ALL）文件。为你的用户着想，坚持使用相对导入，以避免你的组件在升级过程中损坏。相对导入的示例是 `from . import DATA_BRIDGE`。

## 资源

相关的架构议题（issue）：

 - [嵌入式平台与打包组件之路](https://github.com/home-assistant/architecture/issues/124)
 - [禁用部分自定义组件覆盖](https://github.com/home-assistant/architecture/issues/141)
 - [嵌入式平台的配置结构](https://github.com/home-assistant/architecture/issues/142)
