---
title: 新的选项流程（options flow）属性
description: "新代码：`python @staticmethod @callback def async_get_options_flow( config_entry:`
date: 2024-11-12
authors:
  - epenet
areas:
  - core
---

### 变更摘要
已为 `OptionsFlow` 添加了新的辅助属性：
- `self._config_entry_id` 提供配置条目（config entry）ID
- `self.config_entry` 返回配置条目

### 向后兼容性
在 Home Assistant Core 2025.12 之前，仍然可以手动设置 `self.config_entry`，但这样做会记录一条警告，要求用户在该自定义集成（custom integration）的 bug 跟踪器中提交 issue。

新代码：
```python
@staticmethod
@callback
def async_get_options_flow(
    config_entry: ConfigEntry,
) -> OptionsFlowHandler:
    """Create the options flow."""
    return OptionsFlowHandler()

class OptionsFlowHandler(OptionsFlow):
    """Options flow handler."""

    def __init__(self) -> None:
        """Initialize options flow."""
        self._conf_app_id: str | None = None
```

使用 `OptionsFlow` 属性的旧代码：
```python
@staticmethod
@callback
def async_get_options_flow(
    config_entry: ConfigEntry,
) -> OptionsFlowHandler:
    """Create the options flow."""
    return OptionsFlowHandler(config_entry)

class OptionsFlowHandler(OptionsFlow):
    """Options flow handler."""

    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialize options flow."""
        self.config_entry = config_entry
        self._conf_app_id: str | None = None
```

### OptionsFlowWithConfigEntry 的特殊处理
`OptionsFlowWithConfigEntry` 类的主要用途是提供 `self.config_entry` 属性，而该属性现在已由父类提供。
目前尚无移除 `OptionsFlowWithConfigEntry` 类的计划，但它仅为向后兼容而保留，在新代码中应避免使用。

希望移除 `OptionsFlowWithConfigEntry` 引用的自定义集成需要考虑它们引用 `self.options` 的方式：
- 如果未引用 `self.options`，则迁移到 `OptionsFlow` 非常简单（参见 [PR #129651](https://github.com/home-assistant/core/pull/129651)）
- 如果只是读取选项值，建议将读取部分调整为 `self.config_entry.options`（参见 [PR #129895](https://github.com/home-assistant/core/pull/129895)）
- 如果在单个步骤中更新/修改选项值，则可能需要先复制选项（`options = deepcopy(dict(self.config_entry.options))`（参见 [PR #129928](https://github.com/home-assistant/core/pull/129928)）
- 如果跨多个步骤更新/修改选项值，则可能需要在类初始化时复制选项（`self.options = deepcopy(dict(config_entry.options))`（参见 [PR #129890]( https://github.com/home-assistant/core/pull/129890)）

更多详细信息可在[选项流程](/core/integrations/options-flow/)文档中找到。
