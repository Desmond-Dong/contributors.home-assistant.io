---
title: 加载项公开配置
description: 加载项（add-on）现在可以拥有一个用于配置或数据文件的公开文件夹，用户可以查看和修改其中的内容，同时它仍会随加载项一起备份。
date: 2023-11-06
authors:
  - Mike Degatano
areas:
  - apps
---

加载项（add-on）现在可以拥有一个用于配置或数据文件的公开文件夹，用户可以查看和修改其中的内容，同时它仍会随加载项一起备份。

许多加载项会要求用户提供文件作为加载项配置的一部分，或者会生成一些希望用户能够查看甚至修改的文件。它们通常通过在需要映射的文件夹列表中包含 `config` 和/或 `share` 来实现这一点。

这种做法的问题有两方面：

1. `config` 或 `share` 中的任何内容都不会随加载项一起备份。因此，该加载项的备份在恢复后并不包含运行它所需的全部文件。
2. 映射 `config` 的加载项拥有远超其所需的访问权限，因为 `config` 中包含了你的 Home Assistant 集成（integration）所使用的所有机密和凭据。

现在，加载项开发者有了一个更好的解决方案。加载项可以在需要映射的文件夹列表中包含 `addon_config`。随后，supervisor 会为该加载项创建一个位于 `/addon_configs/<your addon slug>` 的文件夹，并将其映射到加载项容器内的 `/config`。如果你的加载项除了收集用户提供的文件之外，还需要能够在这个文件夹中创建和修改文件，请改用 `addon_config:rw`。

欲了解更多关于此功能的信息以及一些使用场景，请参阅[加载项高级选项](/apps/reference/configuration/)。

## 与 `/config` 的向后兼容性

你可能已经注意到，新的公开配置文件夹被映射到了 `/config`。而这正是以前当你在 `map` 字段中添加 `config` 时，Home Assistant 配置文件夹的映射位置。

此选项旨在取代加载项将 Home Assistant 配置映射到其容器中的需求。因此，加载项不能在 `map` 字段中同时包含 `config` 和 `addon_config`。

今后，如果你确实需要让加载项访问 Home Assistant 的配置，应该在 `map` 字段中列出 `homeassistant_config` 文件夹。这样，Home Assistant 的配置文件夹将被映射到容器内的 `/homeassistant`。

## 新的 `addon_configs` 文件夹

有些加载项需要访问所有这些加载项专属的配置文件夹。例如：

1. Samba
2. SSH
3. Studio Code Server

从本质上讲，这些加载项提供了编辑 Home Assistant 及其加载项配置文件的替代方式。此类加载项应该在 map 字段的文件夹列表中添加 `all_addon_configs:rw`。这会将整个加载项配置文件夹映射到容器内的 `/addon_configs`。
