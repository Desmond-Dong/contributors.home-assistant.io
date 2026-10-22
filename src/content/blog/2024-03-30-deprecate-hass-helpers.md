---
title: 弃用 hass.helpers 的使用
description: 自 Home Assistant 2024.5 起，我们弃用了 hass.helpers 的使用。使用 hass.helpers 将会在日志中发出警告。
date: 2024-03-30
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

自 Home Assistant 2024.5 起，我们弃用了 `hass.helpers` 的使用。
使用 `hass.helpers` 将会在日志中发出警告。
建议自定义集成（integration）的作者更新其代码，
以在 Home Assistant 2024.11 之前避免任何问题。

从 Home Assistant 2024.11 开始，`hass.helpers` 将被移除，届时将无法继续使用。

使用 `hass.helpers` 的集成应更新为直接从集成包导入函数和类，
并将 `hass` 对象作为第一个参数传入。

### 新示例

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    client = async_get_clientsession(hass)
```

### 旧示例

```python
from homeassistant.core import HomeAssistant

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    client = hass.helpers.aiohttp_client.async_get_clientsession()
```
