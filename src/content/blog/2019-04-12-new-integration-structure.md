---
title: 集成简介
description: 我们已经完成了大迁移。其成果将随 Home Assistant 0.92 一同发布。
date: 2019-04-12
authors:
  - Paulus Schoutsen
areas:
  - core
---

我们已经完成了[大迁移](/blog/2019/02/19/the-great-migration)。其成果将随 Home Assistant 0.92 一同发布。由于有大量问题需要修复，本次发布稍有延迟！迁移完成后，我们现在将同名的组件（component）和平台（platform）视为同一个集成（integration）的一部分。每个集成要么是单个 Python 文件，要么是包含 `__init__.py` 文件的文件夹。我们已经更新了文档，并为[集成](/core/integrations/file-structure/)引入了新的章节。

Home Assistant 0.92 为集成引入了新的 [`manifest.json`](/core/integrations/manifest/)。此文件对于自定义组件（custom component）来说是可选的，集成用它来指定元数据：名称、指向文档的链接、依赖项（dependencies）、依赖要求（requirements）以及代码所有者（code owners）。我们正在探索在未来利用 `manifest.json` 实现更多功能，例如跟踪破坏性变更，或允许自定义组件提供配置流程（config flow）并被自动发现。

随着所有这些变更，我们不得不移除一些已弃用的内容，并更改一些行为：

- 平台不能再位于实体组件（entity component）的目录中，例如 `light/my_platform.py`。取而代之的是，在您的 custom_components 中新建一个 `my_platform` 文件夹，创建一个空的 `__init__.py` 文件，并将 `light/my_platform.py` 移动到 `my_platform/light.py`。
- 平台不能再拥有依赖项或依赖要求。取而代之的是，在 `my_platform` 文件夹中创建一个 [`manifest.json`](/core/integrations/manifest/) 来指定它们，或者在 `__init__.py` 文件中添加 `REQUIREMENTS` 或 `DEPENDENCIES` 常量。
- 现在，如果组件可用，平台将始终要求先完成该组件的设置。
- 对于包含在单个 Python 文件中的组件，已无法再为其提供翻译。请将它们转换为[目录](/core/integrations/file-structure/)形式的集成。
- 如果您想覆盖一个内置集成，需要为您的自定义集成指定一个 `manifest.json`。请注意，我们强烈不建议覆盖内置集成。取而代之的是，如果您想运行带有自定义更改的集成，请更改集成名称。例如，如果您想运行 MQTT 集成（在 Home Assistant 中名为 `mqtt`）的自定义版本：
  - 将 [Home Assistant 仓库](https://github.com/home-assistant/core/tree/dev/homeassistant/components/mqtt)中 `mqtt` 文件夹的内容复制到一个新文件夹 `<config>/custom_components/mqtt_custom/`
  - 打开 `mqtt_custom/manifest.json`，将 `domain` 的值从 `mqtt` 改为 `mqtt_custom`
  - 打开 `mqtt_custom/__init__.py`，将 `DOMAIN` 的值从 `mqtt` 改为 `mqtt_custom`
  - 在配置中所有引用了 `mqtt` 的地方，改为引用 `mqtt_custom`。也就是说，使用 `mqtt_custom:` 来指定主机，并在指定平台时使用 `platform: mqtt_custom`。
