---
title: 新增警报控制面板（alarm control panel）状态属性与状态枚举
description: 从 Home Assistant Core 2024.11 开始，我们在 AlarmControlPanelEntity 中引入了 alarm_state 属性。
date: 2024-10-22
authors:
  - G Johansson
areas:
  - core
---

从 Home Assistant Core 2024.11 开始，我们在 `AlarmControlPanelEntity` 中引入了 `alarm_state` 属性。这一新增的属性应被用来替代直接设置 `state` 属性的做法。

新的 `alarm_state` 属性应使用新的 `AlarmControlPanelState` 枚举（enum）返回其状态，而不是像以前那样使用 `STATE_ALARM_*` 常量来设置状态。

有一个为期一年的弃用期（deprecation period），这些常量将从 2025.11 起停止工作，以确保所有自定义集成（custom integration）的作者都有时间进行调整。

### 示例

```python

from homeassistant.components.alarm_control_panel import AlarmControlPanelEntity, AlarmControlPanelState

class MyAlarm(AlarmControlPanelEntity):
    """My alarm."""

    @property
    def alarm_state(self) -> AlarmControlPanelState | None:
        """Return the state of the alarm."""
        if self.device.is_on():
            return AlarmControlPanelState.ARMED_AWAY
        return AlarmControlPanelState.DISARMED

```

更多详情请参阅[警报控制面板文档](/core/entities/alarm-control-panel/#states)。
