---
title: "更新实体可自定义更新可用性"
description: 自 Home Assistant Core 2026.11 起，更新实体可以重写新的 has_update 属性，以确定是否有可用更新。
date: 2026-10-10
authors:
  - Tomer
areas:
  - core
---

自 Home Assistant Core 2026.11 起，更新实体（update entity）可以重写新的 `has_update` 属性，以确定是否有可用更新。

以前，更新实体通过比较 `installed_version` 和 `latest_version` 来确定可用性。集成（integration）仍然可以通过重写 `version_is_newer` 来自定义该比较，并且现有的实现将继续保持不变地工作。

其设备（device）或服务（service）直接提供更新可用性的集成，现在可以改为重写 `has_update`：

```python
@property
def has_update(self) -> bool:
    """Return whether an update is available."""
    return self.device.update_available
```

Home Assistant 仅在两个版本均已知且不同，并且最新版本未被跳过时，才会读取 `has_update`。默认实现会调用 `version_is_newer`，从而保留现有行为。

有关更多详细信息，请参阅[更新实体文档](/core/entities/update/#decide-whether-an-update-is-available)。
