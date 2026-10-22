---
title: 配置项（config entry）状态转换的变更
description: "卸载和移除配置项时的状态转换已被修改："
date: 2025-02-19
authors:
  - Erik Montnémery
areas:
  - core
---

卸载和移除配置项（config entry）时的状态转换已被修改：

- 新增了状态 `ConfigEntryState.UNLOAD_IN_PROGRESS`，它会在调用集成的 `async_unload_entry` 之前被设置<br />
  原因：
    - 让编写需要在最后一个配置项卸载完成后运行的清理代码变得更加容易
    - 改进与配置项重载和卸载相关问题的调试

- 当集成的 `async_unload_entry` 返回 False 时，配置项状态会被设置为 `ConfigEntryState.FAILED_UNLOAD`<br />
  原因：
    - 如果 `async_unload_entry` 返回 `False`，我们不能假设集成仍处于已加载状态，它很可能已经部分卸载了自己，尤其是考虑到这是我们推荐的模式：
  ```py
  async def async_unload_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Unload a config entry."""
    # async_unload_platforms returns False if at least one platform did not unload
    if (unload_ok := await hass.config_entries.async_unload_platforms(entry, PLATFORMS)):
        entry.runtime_data.listener()
    # Finish cleanup not related to platforms
    return unload_ok
    ```

- 在调用集成的 `async_remove_entry` 之前，配置项会先被从 `hass.config_entries` 中移除<br />
  原因：
    - 让编写需要在最后一个配置项移除完成后运行的清理代码变得更加容易

自定义集成的作者需要检查并在必要时更新其集成的 `async_unload_entry` 和 `async_remove_entry`。
最常见的需要更新的模式是这样的：

```python
async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    loaded_entries = [
        entry
        for entry in hass.config_entries.async_entries(DOMAIN)
        if entry.state is ConfigEntryState.LOADED
    ]
    if len(loaded_entries) == 1:
        # The last config entry is being unloaded, release shared resources, unregister services etc.
        ...
```

如果自定义集成的最低 Home Assistant 版本设置为 2025.3.0，现在可以将其简化为：
```python
async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    if not hass.config_entries.async_loaded_entries(DOMAIN):
        # The last config entry is being unloaded, release shared resources, unregister services etc.
        ...
```


如果自定义集成需要向后兼容 Home Assistant Core 的早期版本：
```python
async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    other_loaded_entries = [
        _entry
        for _entry in hass.config_entries.async_loaded_entries(DOMAIN)
        if _entry.entry_id != entry.entry_id
    ]
    if not other_loaded_entries:
        # The last config entry is being unloaded, release shared resources, unregister services etc.
        ...
```

更多背景信息请查看[配置项文档](/core/integrations/config-entries/)，以及 [home assistant core PR #138522](https://github.com/home-assistant/core/pull/138522)。
