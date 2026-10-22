---
title: 核心配置类已被移动
description: 核心配置类的定义已从 homeassistant/core.py 移动到 homeassistant/core_config.py，其实例可通过 hass.config 访问。
date: 2024-10-31
authors:
  - Erik Montnémery
areas:
  - core
---

### 变更摘要

核心配置类的定义（其实例可通过 [`hass.config`](/core/internals/hass/) 访问）已从 `homeassistant/core.py` 移动到 `homeassistant/core_config.py`。此次移动是为了让核心代码更易于阅读和理解。目前从 `homeassistant.core` 导入 `Config` 的自定义集成（custom integration）需要更新为从 `homeassistant.core_config` 导入。

> [!NOTE]
> 通常情况下，集成（integration）不需要使用核心 `Config` 类。但有一些自定义集成使用了不正确的类型注解，将传递给集成 `async_setup` 的 `config` 对象指定为了 `Config` 实例：
> ```py
> from homeassistant.core import Config
>
> async def async_setup(hass: HomeAssistant, config: Config) -> bool:
>     """Set up the integration."""
> ```
>
> 正确的类型注解应该是这样：
> ```py
> from homeassistant.helpers.typing import ConfigType
>
> async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
>     """Set up the integration."""
> ```


### 向后兼容性

在 Home Assistant Core 2025.11 之前，仍然可以从 `homeassistant.core` 导入，但这样做会记录一条警告，提示用户在该自定义集成的 bug 跟踪器（bug tracker）上提交问题。
