---
title: 系统健康状况与模板
description: 在 Home Assistant 0.118 中，将有两项变更可能会影响您的自定义集成。
date: 2020-11-09
authors:
  - Paulus Schoutsen
areas:
  - core
---

在 Home Assistant 0.118 中，将有两项变更可能会影响您的自定义集成（custom integration）。

## 移除已弃用的 `helpers.template.extract_entities`

模板辅助元素（Template helper）中先前已弃用的 `extract_entities` 方法已被移除（[PR 42601](https://github.com/home-assistant/core/pull/42601)）。与其先提取实体（entity）再手动监听状态（state）变化，不如使用事件辅助元素（Event helper）中新增的 `async_track_template_result`。它会动态地确保每个被触及的实体都得到正确跟踪。

```python
from homeassistant.helpers.event import async_track_template_result, TrackTemplate

template = "{{ light.kitchen.state == 'on' }}"

async_track_template_result(
    hass,
    [TrackTemplate(template, None)],
    lambda event, updates: print(event, updates),
)
```

## 改进的系统健康状况

从 Home Assistant 0.118 开始，我们将弃用为您的集成提供系统健康状况信息的旧方式。取而代之的是，请在您的集成中创建一个 `system_health.py` 文件（[PR 42785](https://github.com/home-assistant/core/pull/42785)）。

从此版本开始，您还可以包含需要较长时间才能完成的健康检查（[PR 42831](https://github.com/home-assistant/core/pull/42831)），例如检查服务（service）是否在线。结果就绪后将会传递给前端。

```python
"""Provide info to system health."""
from homeassistant.components import system_health
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN


@callback
def async_register(
    hass: HomeAssistant, register: system_health.RegisterSystemHealth
) -> None:
    """Register system health callbacks."""
    register.async_register_info(system_health_info)


async def system_health_info(hass):
    """Get info for the info page."""
    client = hass.data[DOMAIN]

    return {
      "server_version": client.server_version,
      "can_reach_server": system_health.async_check_can_reach_url(
          hass, client.server_url
      )
    }
```
