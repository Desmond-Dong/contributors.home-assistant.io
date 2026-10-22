---
title: group 集成中实体平台设置的更改
description: 默认情况下，group 集成允许将实体（entity）分组。如果实体的默认 ON/OFF 状态默认为 on 和 off，则默认支持分组。
date: 2024-05-10
authors:
  - Jan Bouwhuis
areas:
  - core
---

## group 集成中实体平台设置的更改

默认情况下，`group` 集成允许将实体（entity）分组。如果实体的默认 `ON`/`OFF` 状态默认为 `on` 和 `off`，则默认支持 `grouping`。不过，对于可以被分组但具有替代状态的实体平台（例如 `cover`（`open`/`closed`）或 `person`（`home`/`not_home`）），以及打算排除在外的平台（例如 `sensor`），设置方式则有所变化。这些实体平台必须在 `group.py` 模块中实现 `async_describe_on_off_states`。

在 `async_describe_on_off_states` 中，`domain` 需要作为传给 `registry` 方法 `on_off_states` 和 `exclude_domain` 的第一个参数。使用 `registry.on_off_state` 注册替代 `ON`/`OFF` 状态时，除了各个 `ON` 状态之外，还需要传入默认的 `ON` 状态。

### 注册替代状态的示例

`registry.on_off_states` 的新签名：

```python
    @callback
    def on_off_states(
        self, domain: str, on_states: set[str], default_on_state:str, off_state: str
    ) -> None:
        """Register on and off states for the current domain."""
    ...
```

用于 `vacuum` 实体平台注册替代 `ON`/`OFF` 状态的 `group.py` 示例。注意，第一个 `ON` 状态现在被视为默认的 `ON` 状态。

```python
"""Describe group states."""

from typing import TYPE_CHECKING

from homeassistant.const import STATE_OFF, STATE_ON
from homeassistant.core import HomeAssistant, callback

if TYPE_CHECKING:
    from homeassistant.components.group import GroupIntegrationRegistry

from .const import DOMAIN, STATE_CLEANING, STATE_ERROR, STATE_RETURNING


@callback
def async_describe_on_off_states(
    hass: HomeAssistant, registry: "GroupIntegrationRegistry"
) -> None:
    """Describe group on off states."""
    registry.on_off_states(
        DOMAIN,  # domain
        # set with all group ON states
        {
            STATE_ON,
            STATE_CLEANING,
            STATE_RETURNING,
            STATE_ERROR,
        },
        STATE_ON, # Default group ON state 
        STATE_OFF, # Group OFF state
    )
```

### 将实体平台排除在 group 实体之外的示例

`registry.exclude_domain` 的新签名：

```python
    @callback
    def exclude_domain(self, domain: str) -> None:
        """Exclude the current domain."""
        ...
```

用于 `sensor` 实体平台将传感器实体排除在 `group` 实体之外的 `group.py` 示例。

```python
"""Describe group states."""

from typing import TYPE_CHECKING

from homeassistant.core import HomeAssistant, callback

if TYPE_CHECKING:
    from homeassistant.components.group import GroupIntegrationRegistry

from .const import DOMAIN


@callback
def async_describe_on_off_states(
    hass: HomeAssistant, registry: "GroupIntegrationRegistry"
) -> None:
    """Describe group on off states."""
    registry.exclude_domain(DOMAIN)
```
