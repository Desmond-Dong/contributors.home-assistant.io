---
title: 在配置条目（config entry）中存储运行时数据
description: 集成（integration）通常需要设置和跟踪自定义数据，例如协调器（coordinator）、API 连接或代码对象。
date: 2024-04-30
authors:
  - Marc Mueller
areas:
  - core
---

集成通常需要设置和跟踪自定义数据，例如协调器（coordinator）、API 连接或代码对象。以前，这些数据都存储在 `hass.data` 中，这使得跟踪它们变得困难。

随着近期的改动，现在可以使用 `entry.runtime_data` 来实现这一点。配置条目在设置平台时已经可用，并且会被自动清理。再也不用在卸载后从 `hass.data` 中删除对应的键了。

它还更好地支持了类型检查。`ConfigEntry` 现在是泛型的，因此可以传递数据类型。为此请使用类型化的数据结构，例如 `dataclass`。为了简化注解，建议为其定义一个类型别名（type alias）。

示例如下：
```py
# <integration>/__init__.py

# The type alias needs to be suffixed with 'ConfigEntry'
type MyConfigEntry = ConfigEntry[MyData]

@dataclass
class MyData:
    client: MyClient
    other_data: dict[str, Any]

async def async_setup_entry(
    hass: HomeAssistant,
    entry: MyConfigEntry,  # use type alias instead of ConfigEntry
) -> bool:
    client = MyClient(...)
    
    # Assign the runtime_data
    entry.runtime_data = MyData(client, {...})
```

```py
# <integration>/switch.py

from . import MyConfigEntry

async def async_setup_entry(
    hass: HomeAssistant,
    entry: MyConfigEntry,  # use type alias instead of ConfigEntry
    async_add_entities: AddEntitiesCallback,
) -> None:
    # Access the runtime data form the config entry
    data = entry.runtime_data
    
    async_add_entities([MySwitch(data.client)])
```
