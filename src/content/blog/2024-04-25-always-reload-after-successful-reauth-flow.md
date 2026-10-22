---
title: 重新身份验证流程成功后始终重新加载
description: 在重新身份验证流程成功后，可以使用辅助函数（helper）`async_update_reload_and_abort` 来更新并重新加载该条目。
date: 2024-04-25
authors:
  - Jan Bouwhuis
areas:
  - core
---

## 重新身份验证成功后始终重新加载

要在重新身份验证（reauthentication）流程成功后更新并重新加载条目（entry），可以使用辅助函数（helper）`async_update_reload_and_abort`。该辅助函数的默认行为已经更改。默认情况下，只要调用该辅助函数，条目就会始终重新加载。如果条目需要重新身份验证，则不一定需要更新该条目，例如在账户被临时禁用或 API 密钥被临时拒绝的情况下。

对于条目未发生更改时不希望重新加载的情况，可以向该辅助函数传递 `reload_even_if_entry_is_unchanged=False` 参数。

有关此辅助函数的更多信息可以在[这里](/core/integrations/reauth-reconfigure/#reauthentication)找到。

### 示例

```python
class OAuth2FlowHandler(
    config_entry_oauth2_flow.AbstractOAuth2FlowHandler, domain=DOMAIN
):
    """Config flow to handle OAuth2 authentication."""

    reauth_entry: ConfigEntry | None = None

    async def async_step_reauth(self, user_input=None):
        """Perform reauth upon an API authentication error."""
        self.reauth_entry = self.hass.config_entries.async_get_entry(
            self.context["entry_id"]
        )
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(self, user_input=None):
        """Dialog that informs the user that reauth is required."""
        if user_input is None:
            return self.async_show_form(
                step_id="reauth_confirm",
                data_schema=vol.Schema({}),
            )
        return await self.async_step_user()

    async def async_oauth_create_entry(self, data: dict) -> dict:
        """Create an oauth config entry or update existing entry for reauth."""
        if self.reauth_entry:
            # Only reload if the entry was updated
            return self.async_update_reload_and_abort(
                self.reauth_entry,
                data=data,
                reload_even_if_entry_is_unchanged=False,
            )
        return await super().async_oauth_create_entry(data)
```
