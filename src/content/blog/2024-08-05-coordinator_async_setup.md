---
title: 使用 setup 方法设置你的 DataUpdateCoordinator
description: 在 Home Assistant 2024.8 中，我们为数据更新协调器（data update coordinator）引入了 _async_setup 方法。
date: 2024-08-05
authors:
  - Josef Zweck
areas:
  - core
---

在 Home Assistant 2024.8 中，我们为数据更新协调器（data update coordinator）引入了 `_async_setup` 方法。
该方法允许你运行异步代码来准备你的 `DataUpdateCoordinator` 实例，
或加载只需加载一次的数据。

你可以在协调器中重写 `_async_setup`，它会在 `coordinator.async_config_entry_first_refresh()` 期间被自动调用。
它提供与 `_async_update_data` 相同的错误处理，并会相应地处理 `ConfigEntryError`
和 `ConfigEntryAuthFailed`。

## 示例

```python

class MyUpdateCoordinator(DataUpdateCoordinator[MyDataType]):

    prereq_data: SomeData

    def __init__(
        self,
        hass: HomeAssistant,
    ) -> None:
        """Initialize coordinator."""
        super().__init__(hass, _LOGGER, name=DOMAIN, update_interval=SCAN_INTERVAL)
        self.my_api = MyApi()


    async def _async_setup(self) -> None:
        """Do initialization logic."""
        self.prereq_data = await self.my_api.get_initial_data()

    async def _async_update_data(self) -> MyDataType:
        """Do the usual update"""
        return await self.my_api.update(self.prereq_data)
```

## 避免检查初始化状态

此更改使你能够重构通过检查初始化变量来在 `_async_update_data` 方法中加载初始数据的代码，例如

```python
async def _async_update_data(self) -> ...:
    if not self.something:
        self.something = self.client.fetch()
    return self.client.fetch_data()
```

改为

```python
async def _async_setup(self) -> None:
    self.something = self.client.fetch()

async def _async_update_data(self) -> ...:
    return self.client.fetch_data()
```

## 更多信息

欲了解更多信息，请阅读[文档](/core/integrations/fetching-data/)
