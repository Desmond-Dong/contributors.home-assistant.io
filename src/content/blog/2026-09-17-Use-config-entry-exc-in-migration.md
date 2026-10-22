---
title: 在集成迁移方法中使用配置条目异常
description: 集成迁移 async_migrate_entry 方法现在可以抛出配置条目异常，而不再仅限于返回 False。
date: 2026-09-17
authors:
  - G Johansson
areas:
  - core
---

集成迁移 `async_migrate_entry` 方法现在可以抛出配置条目异常，而不再仅限于返回 `False`。推荐这样做，因为它能提供更多上下文信息并且支持翻译。

在迁移期间从其他服务获取数据的集成可以抛出 `ConfigEntryNotReady`，以便稍后自动重试迁移（与设置期间一样），这有助于处理超时和其他可能自行恢复的错误。

通过返回 `False` 或抛出 `ConfigEntryNotReady` 以外的任何其他异常，迁移将停止，并且配置条目状态将被设置为 `migration_error`，这是一个不可恢复的状态。
以前这需要用户重启 Home Assistant 才能重试迁移。
现在正确的处理方法是创建一个修复问题。用户修复该问题后，调用 `hass.config_entries.async_retry_migration(entry_id)` 来重试迁移。

更多信息请参阅[配置流程文档](/core/integrations/config-flow/)。

## 客户端出现问题时抛出异常的迁移函数示例

迁移函数位于集成的 `__init__.py` 中。

```python
from homeassistant.helpers.issue_registry import IssueSeverity, async_create_issue

async def async_migrate_entry(hass, config_entry: ConfigEntry):
    """Migrate old entry."""
    _LOGGER.debug("Migrating configuration from version %s.%s",
        config_entry.version, config_entry.minor_version
    )

    if config_entry.version == 1:
        try:
            new_info = await client.get_info()
        except ConnectionError as exc:
            raise ConfigEntryNotReady(
                translation_key="key",
                translation_domain=DOMAIN,
            ) from exc
        except AuthenticationError as exc:
            async_create_issue(
                hass,
                DOMAIN,
                f"migrate_could_not_auth_{config_entry.entry_id}",
                is_fixable=True,
                is_persistent=False,
                severity=IssueSeverity.ERROR,
                translation_key="migrate_could_not_auth",
                translation_placeholders={"title": config_entry.title},
                data={"entry_id": config_entry.entry_id},
            )
            raise ConfigEntryError(translation_key="migrate_could_not_auth") from exc

        new_data = {**config_entry.data, "some_data": new_info["some_data"]}
        hass.config_entries.async_update_entry(
            config_entry, data=new_data, version=2
        )

    _LOGGER.debug("Migration to configuration version %s.%s successful",
        config_entry.version, config_entry.minor_version,
    )

    return True
```

## 将重试迁移的修复示例

修复流程位于集成的 `repairs.py` 中。

```python
class MigrationRepairFlow(RepairsFlow):
    """Handler for a migration repair flow."""

    def __init__(self, entry_id: str) -> None:
        """Initialize the flow."""
        self.entry_id = entry_id

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> RepairsFlowResult:
        """Fix the issue and retry the migration."""
        if user_input is not None:
            # TODO: Do whatever is necessary to fix the issue,
            # for example update the config entry data
            await self.hass.config_entries.async_retry_migration(self.entry_id)
            return self.async_create_entry(data={})

        return self.async_show_form(
            step_id="init",
            data_schema=probatio.Schema({}),
        )


async def async_create_fix_flow(
    hass: HomeAssistant,
    issue_id: str,
    data: dict[str, str | int | float | None] | None,
) -> RepairsFlow:
    """Create flow."""
    if issue_id.startswith("migrate_could_not_auth_"):
        return MigrationRepairFlow(data["entry_id"])
```
