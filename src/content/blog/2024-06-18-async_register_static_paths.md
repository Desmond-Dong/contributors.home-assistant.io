---
title: 使用 `async_register_static_paths` 让 http 路径注册具备异步安全性
description: hass.http.register_static_path 已被弃用，因为它会在事件循环中执行阻塞 I/O，请改用 await hass.http.async_register_static_paths([StaticPathConfig(url_path, path, cache_headers)])
date: 2024-06-18
authors:
  - J. Nick Koston
areas:
  - core
---

`hass.http.register_static_path` 已被弃用，因为它会在事件循环（event loop）中执行阻塞 I/O，请改用 `await hass.http.async_register_static_paths([StaticPathConfig(url_path, path, cache_headers)])`

`async_register_static_paths` 的参数与 `register_static_path` 相同，只是它们被封装在 `StaticPathConfig` `dataclass` 中，并且接受一个由它们组成的 `Iterable`，以便一次注册多个路径，从而避免多个 executor 作业。

例如，如果你的集成（integration）之前调用的是 `hass.http.register_static_path("/integrations/photos", "/config/photos", True)`，那么现在应该调用 `await hass.http.async_register_static_paths([StaticPathConfig("/integrations/photos", "/config/photos", True)])`

`StaticPathConfig` `dataclass` 应从 `homeassistant.components.http` 导入

`hass.http.register_static_path` 将于 2025.7 被移除

## 示例

```python
from pathlib import Path
from homeassistant.components.http import StaticPathConfig

should_cache = False
files_path = Path(__file__).parent / "static"
files2_path = Path(__file__).parent / "static2"

await hass.http.async_register_static_paths([
    StaticPathConfig("/api/my_integration/static", str(files_path), should_cache),
    StaticPathConfig("/api/my_integration/static2", str(files2_path), should_cache)
])
```
