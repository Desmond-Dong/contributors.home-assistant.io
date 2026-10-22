---
title: 条件与脚本 API 的变更
description: 条件与脚本 API 已发生变更。
date: 2026-05-13
authors:
  - Erik Montnémery
areas:
  - core
---

## 概述

条件与脚本 API 已发生变更。

条件现在是条件类的实例，通过调用 `async_check` 方法进行评估，并通过调用 `async_unload` 方法丢弃。此外，条件可以选择性地实现 `_async_setup` 或 `_async_unload` 方法。请注意，条件的使用者无需调用条件的 `async_setup` 方法。

在弃用期间（该期间将于 Home Assistant Core 2027.1 发布时结束），可以将条件对象作为可调用对象使用。

脚本也具有 `async_unload` 方法，在不再需要该脚本时必须调用此方法。

## 对自定义集成的影响

### 创建条件或脚本的自定义集成

创建条件对象的自定义集成应通过调用 `async_check` 方法对其进行评估，并在不再需要该条件时调用 `async_unload` 方法。

示例：

```python
from homeassistant.helpers.condition import (
    async_condition_from_config,
    async_validate_condition_config,
)

# Validate condition config
validated_config = await async_validate_condition_config(hass, config)

# Create a condition
condition = await async_condition_from_config(hass, validated_config)

...

# Evaluate the condition
result = condition.async_check(...)
...

# Discard the condition
condition.async_unload()
```

创建脚本的自定义集成应在不再需要该脚本时调用 `async_unload` 方法。

示例：

```python
from homeassistant.helpers.script import (
    Script,
    async_validate_actions_config,
)

# Validate script config
validated_config = await async_validate_actions_config(hass, config)

# Create a script
script = Script(hass, validated_config, ...)

...

# Execute the script
result = await script.async_run(...)
...

# Discard the script
await script.async_unload()
```

### 提供条件平台的自定义集成

提供条件平台的集成无需进行更改，但如果该平台需要执行异步初始化或进行清理，则可以实现 `_async_setup` 和 `_async_unload` 方法。

示例：

```python

from homeassistant.core import HomeAssistant
from homeassistant.helpers.condition import (
    Condition,
    ConditionCheckParams,
    ConditionConfig,
)
from homeassistant.helpers.typing import ConfigType

class CustomCondition(Condition):
    """A custom condition."""

    @classmethod
    async def async_validate_config(
        cls, hass: HomeAssistant, config: ConfigType
    ) -> ConfigType:
        """Validate config."""
        ...

    def __init__(self, hass: HomeAssistant, config: ConditionConfig) -> None:
        """Initialize condition."""
        super().__init__(hass, config)
        ...

    async def _async_setup(self) -> None:
        """Set up the condition checker."""
        ...

    def _async_unload(self) -> None:
        """Clean up any resources held by the checker."""
        ...

    def _async_check(self, **kwargs: Unpack[ConditionCheckParams]) -> bool:
        """Check the condition."""
        ...
```
