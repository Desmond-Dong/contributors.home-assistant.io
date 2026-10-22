---
title: 全局可用的 HomeAssistant 对象（hass）
description: 现在可以通过调用 core.async_get_hass() 获取 HomeAssistant 实例的引用。
date: 2022-08-24
authors:
  - Erik Montnémery
areas:
  - core
---

现在可以通过调用 `core.async_get_hass()` 获取 `HomeAssistant` 实例的引用。

虽然这意味着不再严格需要到处传递 `hass`，但我们仍然建议仅在将 `hass` 传递给需要它的代码非常繁琐或根本不可能的情况下，才使用 `core.async_get_hass`。
一个能体现其用处的例子是 voluptuous 校验器（validator），以前它无法访问 `hass`，因为 voluptuous 无法向校验器传递用户数据。

```python
@callback
def async_get_hass() -> HomeAssistant:
    """Return the HomeAssistant instance.
    Raises LookupError if no HomeAssistant instance is available.
    This should be used where it's very cumbersome or downright impossible to pass
    hass to the code which needs it.
    """
```
