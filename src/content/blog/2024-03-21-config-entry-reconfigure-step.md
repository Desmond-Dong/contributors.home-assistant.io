---
title: 配置条目现在可以提供重新配置步骤
description: 自 Home Assistant Core 2024.4 起，配置条目（config entry）现在可以通过在其配置流程中添加重新配置（reconfigure）步骤来重新配置。
date: 2024-03-21
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2024.4 起，配置条目（config entry）现在可以通过在其配置流程（config flow）中添加 `reconfigure` 步骤来重新配置。

这并不是要取代可选配置（`OptionsFlow`），而是为了让用户能够在配置条目创建之后更改其初始设置配置。

### 重新配置 vs. 重新认证

`reconfigure` 步骤并不能取代 `reauth` 步骤，它们有着不同的用途。

当登录凭证、token 等失效时，集成（integration）应自动启动重新认证（reauthentication），以便用户可以选择调整这些设置。

重新配置由用户从配置条目的选项菜单中启动，应用于更新集成正常工作所必需的（非可选的）配置条目数据。身份验证问题则通过重新认证流程处理。（[参见重新认证](/core/integrations/reauth-reconfigure/#reauthentication)）。

### 示例

例如，在搬家或居住在移动房屋时更改 `WeatherEntity` 的纬度和经度，或者更改本地设备的通信端口等。

要实现 `reconfigure` 步骤，请将其包含在你的配置流程中：

```python
import voluptuous as vol

class ExampleConfigFlow(ConfigFlow, domain=DOMAIN):
    """Config flow for Example integration."""

    async def async_step_reconfigure(self, user_input: dict[str, Any] | None = None):
        """Add reconfigure step to allow to reconfigure a config entry."""
        if user_input is not None:
            pass  # TODO: process user input

        return self.async_show_form(
            step_id="reconfigure",
            data_schema=vol.Schema({vol.Required("password"): str}),
        )
```
