---
title: 割草机新增停止动作和空闲活动
description: 自 Home Assistant Core 2026.10 起，LawnMowerEntity 支持停止动作和 IDLE 活动。
date: 2026-09-11
authors:
  - Paul Bottein
areas:
  - core
---

自 Home Assistant Core 2026.10 起，`LawnMowerEntity` 支持 `stop` 动作和 `IDLE` 活动。

`stop` 会取消当前的割草任务，但不会让割草机返回充电座。它不同于 `pause`（保留任务以便恢复），也不同于 `dock`（让割草机返回充电座）。要支持此功能，请将 `LawnMowerEntityFeature.STOP` 添加到支持的功能中，并实现 `stop` 或 `async_stop`。

`LawnMowerActivity.IDLE` 描述的是已停止但既未返回充电座也未暂停的割草机。将此类状态映射为 `PAUSED` 或 `ERROR` 的集成（integration）现在应使用 `IDLE`。

更多详细信息，请参阅[文档](/core/entities/lawn-mower/)。

## 示例

```python
class MyLawnMower(LawnMowerEntity):
    _attr_supported_features = (
        LawnMowerEntityFeature.START_MOWING
        | LawnMowerEntityFeature.DOCK
        | LawnMowerEntityFeature.STOP
    )

    async def async_stop(self) -> None:
        """Stop the mower and cancel the current task."""
        await self.mower.stop()
        self._attr_activity = LawnMowerActivity.IDLE
        self.async_write_ha_state()
```
