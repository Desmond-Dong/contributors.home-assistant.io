---
title: 配置处理与错误处理
description: 组件 YAML 配置的处理方式已发生变更。现在，如果发生错误，可以抛出异常。
date: 2023-11-27
authors:
  - Jan Bouwhuis
areas:
  - core
---

## 组件配置处理与错误处理的变更

组件 YAML 配置的处理方式已发生变更。现在，如果发生错误，可以抛出异常（raise）。一些自定义集成（integration）如果使用了 `config.async_process_component_config`，可能会出现故障。现在，它们可以改用 `config.async_process_component_and_handle_errors`。这个新方法支持在配置处理过程中发生错误时抛出异常。
从现在起，失败将不再以持久化消息（persistent message）的形式进行通知，因此集成需要实现错误处理，以便在失败时通知用户。在设置过程中如果出现配置问题，仍会添加通知。

```python
async def async_process_component_and_handle_errors(
    hass: HomeAssistant,
    config: ConfigType,
    integration: Integration,
    raise_on_failure: bool = False,
) -> ConfigType | None:
...
```

在重新加载（reload）期间，集成可以使用 `helpers.reload.async_integration_yaml_config`。这个辅助方法（helper）现在也支持在发生失败时抛出异常。

```python
async def async_integration_yaml_config(
    hass: HomeAssistant, integration_name: str, *, raise_on_failure: bool = False
) -> ConfigType | None:
...
```

## 配置校验异常的翻译支持

引入了一个新的异常类 `ConfigValidationError`。当在配置错误处理过程中发生错误且 `raise_on_failure` 被设置为 `True` 时，将抛出该异常。如果此错误在服务（service）调用的执行过程中被抛出，且不需要堆栈跟踪（stack trace），则可以将其重新抛出为 `ServiceValidationError`。新增了翻译键，以便对错误消息进行本地化。

### 背景

- 背景[讨论](https://github.com/home-assistant/architecture/discussions/992)。
- 实现：[Core PR #102410](https://github.com/home-assistant/core/pull/102410)。
