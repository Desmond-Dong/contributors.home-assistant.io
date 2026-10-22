---
title: 新增仅限单实例的清单选项
description: 在 Home Assistant 2024.3 中，我们为集成清单文件引入了新的 single_config_entry 选项。
date: 2024-02-26
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

在 Home Assistant 2024.3 中，我们为集成清单文件引入了新的 `single_config_entry` 选项。
该选项允许你声明你的集成仅支持一个配置条目（config entry）。

如果该集成已经存在配置条目，Home Assistant 将会自动阻止配置流程（config flow）的初始化。
这样你就无需在配置流程中实现任何检查。

在其清单中未设置该选项、而是在配置流程中进行检查的集成，应改用这一新选项。
