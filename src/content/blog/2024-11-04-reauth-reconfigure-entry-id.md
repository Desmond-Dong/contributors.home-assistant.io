---
title: 重新认证和重新配置流程需要与配置条目相关联
description: 在不关联配置条目的情况下启动重新认证或重新配置流程的做法已被弃用，并将在 2025.12 开始失效。
date: 2024-11-04
authors:
  - epenet
areas:
  - core
---

在不关联配置条目（config entry）的情况下启动重新认证（reauth）或重新配置（reconfigure）流程的做法已被弃用，并将在 2025.12 开始失效。

自定义集成应进行更新，使用 `entry.async_start_reauth(hass)` 辅助方法（helper）来触发重新认证流程。
```python
    async def async_press(self) -> None:
        """Handle the button press."""
        try:
            await self.device.press_button()
        except DevicePasswordProtected as ex:
            self.entry.async_start_reauth(self.hass)
```

旧的错误代码：
```python
    async def async_press(self) -> None:
        """Handle the button press."""
        try:
            await self.device.press_button()
        except DevicePasswordProtected as ex:
            # old incorrect code:
            self.hass.async_create_task(
                hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_REAUTH}
            )
    )
```

自定义集成也可以在初始化阶段，或在数据更新协调器（data update coordinator）的更新方法中抛出 `ConfigEntryAuthFailed` 异常。

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up integration from a config entry."""
    username = entry.data[CONF_USERNAME]
    password = entry.data[CONF_PASSWORD]

    if not _credentials_valid(username, password):
        raise ConfigEntryAuthFailed()
```

重新配置流程仅由前端启动，自定义集成无需为这些流程进行任何更改。

更多详情请参阅[重新配置](/core/integrations/reauth-reconfigure/#reconfiguration)和[重新认证](/core/integrations/reauth-reconfigure/#reauthentication)文档。
