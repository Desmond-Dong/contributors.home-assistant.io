---
title: hass.data 的类型标注改进
description: 过去，hass.data 面临的挑战之一是如何正确地指定类型信息。
date: 2024-05-01
authors:
  - Marc Mueller
areas:
  - core
---

过去，`hass.data` 面临的挑战之一是如何正确地指定类型信息。由于它的类型被标注为 `dict[str, Any]`，唯一的选择就是使用注解赋值或 `cast`，例如：

```py
data: MyData = hass.data[SOME_KEY]
```

这种方式有几个缺点。不仅每次赋值都需要添加注解，而且类型检查器基本上会假定注解始终是正确的。尤其是在重构时，很容易漏掉某一处，虽然类型检查仍然通过，但实际代码已经出错了。

为了解决这个问题，现在可以使用两个新的键类型 `HassKey` 和 `HassEntryKey`。借助一点小小的魔法，类型检查器现在能够推断类型并确保其正确性，即使在存储数据时也是如此。


一个示例如下：
```py
# <integration>/__init__.py
from homeassistant.util.hass_dict import HassKey

MY_KEY: HassKey["MyData"] = HassKey(DOMAIN)

@dataclass
class MyData:
    client: MyClient
    other_data: dict[str, Any]

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    client = MyClient(...)

    hass.data[MY_KEY] = MyData(client, {...})
    hass.data[MY_KEY] = 1  # mypy error
```

```py    
# <integration>/switch.py
from . import MY_KEY

async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    data = hass.data[MY_KEY]
    reveal_type(data)  # MyData
    
    async_add_entities([MySwitch(data.client)])
```

通过 `entry.entry_id` 将数据存储在字典中？通常更好的做法是直接将数据存储在 `ConfigEntry` 中。请参阅最近关于此的[博客文章](/blog/2024/04/30/store-runtime-data-inside-config-entry)。如果这不可行，请使用 `HassEntryKey`。

```py
# <integration>/__init__.py
from homeassistant.util.hass_dict import HassEntryKey

MY_KEY: HassEntryKey["MyData"] = HassEntryKey(DOMAIN)

async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    client = MyClient(...)
    
    hass.data.setdefault(MY_KEY, {})[entry.entry_id] = MyData(client, {...})
```
