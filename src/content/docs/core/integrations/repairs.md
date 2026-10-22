---
title: 维修
description: 告知用户需要处理的问题，并通过维修流程（repair flow）帮助他们解决这些问题。
sidebarGroup: Integration features
order: 6
---

[维修（repair）](/glossary/repair/)问题会告知用户需要注意的事项，例如过旧的固件、即将停用的 API，或不再受支持的 YAML 配置。问题会显示在 **设置** > **系统** > **维修** 中。有些问题只说明需要做什么，另一些则可以通过维修流程当场修复。

维修也是公布影响用户的[弃用（deprecation）](/core/development/deprecating/)的方式，这是它最常见的用途之一。核心 API 的弃用则改为通过日志报告给开发者。

## 创建问题

```python
from homeassistant.helpers import issue_registry as ir

ir.async_create_issue(
    hass,
    DOMAIN,
    "firmware_too_old",
    is_fixable=False,
    severity=ir.IssueSeverity.ERROR,
    translation_key="firmware_too_old",
    translation_placeholders={"version": device.firmware_version},
    learn_more_url="https://www.home-assistant.io/integrations/example",
)
```

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `domain` | | 创建该问题的域名（domain） |
| `issue_id` | | 该问题的 ID，在域名内唯一。使用已有 ID 创建问题会更新该问题。 |
| `is_fixable` | | 用户是否可以通过维修流程修复该问题 |
| `severity` | | 问题的严重程度。见下文。 |
| `translation_key` | | `strings.json` 中标题和描述所用的键 |
| `translation_placeholders` | `None` | 文本中占位符的值 |
| `config_entry_id` | `None` | 该问题所属的配置条目（config entry）。该条目被禁用期间问题会被隐藏，条目被删除时问题也会随之删除。 |
| `breaks_in_ha_version` | `None` | 出现故障的版本，例如 `"2027.4.0"` |
| `learn_more_url` | `None` | 用户了解更多信息的地址 |
| `is_persistent` | `False` | 问题是否在重启后保留。参见[持久性](#persistence)。 |
| `issue_domain` | `None` | 当您代表另一个集成（integration）创建问题时设置 |
| `data` | `None` | 维修流程所用的数据。不会向用户显示。 |

| 严重程度 | 使用时机 |
| --- | --- |
| `IssueSeverity.CRITICAL` | 保留给真正危急的情况 |
| `IssueSeverity.ERROR` | 现在已经出问题，需要立即处理 |
| `IssueSeverity.WARNING` | 将来会出问题，例如 API 即将停用 |

文本放在 `strings.json` 的 `issues` 下面：

```json
{
  "issues": {
    "firmware_too_old": {
      "title": "The firmware of your Example device is too old",
      "description": "Update the firmware from {version} in the Example app."
    }
  }
}
```

可修复的问题没有 `description`，取而代之的是 `fix_flow`，其中包含其[维修流程](#fix-an-issue-with-a-repair-flow)各步骤的文本，方式与配置流程（config flow）相同：

```json
{
  "issues": {
    "settings_outdated": {
      "title": "Your Example settings need to be updated",
      "fix_flow": {
        "step": {
          "confirm": {
            "title": "Update the Example settings",
            "description": "Select **Submit** to update your settings."
          }
        }
      }
    }
  }
}
```

## 删除问题

当问题消失后，删除该问题：

```python
ir.async_delete_issue(hass, DOMAIN, "firmware_too_old")
```

一种典型的模式：在 `async_setup_entry` 中检查问题是否存在，然后根据结果创建或删除该问题。

## 通过维修流程修复问题

对于 `is_fixable=True` 的问题，用户会看到一个 **修复** 按钮。它会启动维修流程：一个[数据录入流程（data entry flow）](/core/integrations/flow-steps/)，与配置流程类似。当流程以 `async_create_entry` 结束时，该问题即被移除。

如果修复只是需要用户确认，则无需任何代码：在没有 `repairs.py` 的情况下，Home Assistant 会使用 `ConfirmRepairFlow`，它会要求用户确认，然后移除该问题。该确认的文本是问题 `fix_flow` 中的 `confirm` 步骤。

对于其他情况，请创建包含 `async_create_fix_flow` 的 `repairs.py`，它会为问题返回相应的流程：

```python
import probatio

from homeassistant.components.repairs import RepairsFlow, RepairsFlowResult
from homeassistant.core import HomeAssistant


class MigrateSettingsFlow(RepairsFlow):
    """Move the settings to the new format."""

    async def async_step_init(
        self, user_input: dict[str, str] | None = None
    ) -> RepairsFlowResult:
        """Start the fix."""
        return await self.async_step_confirm()

    async def async_step_confirm(
        self, user_input: dict[str, str] | None = None
    ) -> RepairsFlowResult:
        """Ask the user to confirm, then fix it."""
        if user_input is not None:
            await async_migrate_settings(self.hass, self.data["entry_id"])
            return self.async_create_entry(data={})

        return self.async_show_form(
            step_id="confirm", data_schema=probatio.Schema({})
        )


async def async_create_fix_flow(
    hass: HomeAssistant,
    issue_id: str,
    data: dict[str, str | int | float | None] | None,
) -> RepairsFlow:
    """Create the flow that fixes an issue."""
    return MigrateSettingsFlow()
```

Home Assistant 会根据问题在流程上设置 `issue_id` 和 `data`。请勿自行将它们传递给流程：否则它们会被覆盖。

### 在配置或选项流程中继续

有时修复方法是重新配置某些内容，例如配置条目或子条目（subentry）。维修流程可以通过 `next_flow` 交接给该流程：

```python
from homeassistant.components.repairs import FlowType
from homeassistant.config_entries import SOURCE_RECONFIGURE

if user_input is not None:
    result = await self.hass.config_entries.flow.async_init(
        DOMAIN,
        context={
            "source": SOURCE_RECONFIGURE,
            "entry_id": self.data["entry_id"],
        },
    )

    return self.async_abort(
        reason="reconfigure",
        next_flow=(FlowType.CONFIG_FLOW, result["flow_id"]),
    )
```

中止并不会移除该问题。请在修复完成后自行删除它，例如在重新配置步骤中、就在 `async_update_reload_and_abort` 之前，或在 `async_setup_entry` 中。

如果配置条目的迁移失败，而用户可以修复导致失败的原因，请在修复完成后从维修流程中调用 `hass.config_entries.async_retry_migration(entry_id)`。参见[迁移配置条目](/core/integrations/config-entries/#migrate-a-config-entry)。

## 持久性

问题会一直保留，直到创建它的集成将其删除，或用户将其修复。重启后的表现取决于 `is_persistent`：

- **非持久**（默认）：重启后问题不会显示，直到您的集成重新创建它。请将其用于您可以主动检查的问题，例如固件过旧。无论如何，您的集成在下一次启动时都会再次检查。
- **持久**：重启后问题会再次显示。请将其用于只有在发生时才能发现的问题，例如更新失败。

用户也可以忽略某个问题。该问题将保持被忽略的状态，即使重启后也是如此，直到它被删除并重新创建。
