---
title: 弃用 @bind_hass 和 hass.components
description: 自 Home Assistant 2024.3 起，我们弃用了 @bind_hass 装饰器，因此也弃用了 hass.components。
date: 2024-02-27
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

自 Home Assistant 2024.3 起，我们弃用了 `@bind_hass` 装饰器，
因此也弃用了 `hass.components`。
使用 `hass.components` 将会在日志中发出警告。
建议自定义集成（integration）的作者更新其代码，
以在 Home Assistant 2024.9 之前避免出现任何问题。

从 Home Assistant 2024.9 开始，`@bind_hass` 装饰器和
`hass.components` 将被移除，并且不再可用。

## 使用 `@bind_hass` 装饰器

使用 `@bind_hass` 装饰器的集成应更新为移除该装饰器，并将 `hass` 对象作为第一个参数传递给函数：

### 新示例

```python
from homeassistant.core import HomeAssistant
from homeassistant.components.persistent_notification import async_create

def create_notification(hass: HomeAssistant, message: str):
    """Create a notification."""
    async_create(
        hass,
        message, 
        title='Important notification'
    )

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    create_notification(hass, "You're already using the latest version!")
```

### 旧示例

```python
from homeassistant.core import HomeAssistant
from homeassistant.loader import bind_hass
from homeassistant.components.persistent_notification import async_create

@bind_hass
def create_notification(hass: HomeAssistant, message: str):
    """Create a notification."""
    async_create(
        hass,
        message, 
        title='Important notification'
    )

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    create_notification("You're already using the latest version!")
```

## 使用 `hass.components` 

使用 `hass.components` 的集成应更新为直接从集成包中导入函数和类，
并将 `hass` 对象作为第一个参数传递。
请记得在 `manifest.json` 的 `dependencies` 中包含所导入的组件。

### 新示例

```python
from homeassistant.core import HomeAssistant
from homeassistant.components.persistent_notification import async_create

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    async_create(
        hass, 
        "You're already using the latest version!", 
        title='Important notification'
    )
```

### 旧示例

```python
from homeassistant.core import HomeAssistant

async def async_setup(hass: HomeAssistant, config):
    """Set up the component."""
    hass.components.persistent_notification.async_create(
        "You're already using the latest version!", 
        title='Important notification'
    )
```
