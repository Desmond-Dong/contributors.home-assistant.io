---
title: 共享的配置流中止原因由集中翻译
description: 自 Home Assistant Core 2026.10 起，homeassistant 集成可以翻译所有集成采用相同措辞的中止原因。
date: 2026-09-28
authors:
  - Josef Zweck
areas:
  - core
---

自 Home Assistant Core 2026.10 起，`homeassistant` 集成可以翻译所有集成采用相同措辞的中止原因。如果您目前将中止原因的本地翻译键链接到 `homeassistant` 集成下的共享翻译键，您现在可以直接依赖 `homeassistant` 域下的共享翻译键。这在一些辅助元素（helper）中是默认完成的，也可以通过在中止流程时设置 `translation_domain` 参数来显式完成。

## 具体操作

* 仅当该中止使用 `homeassistant` 翻译域时，从 `strings.json` 的 `abort` 部分（包括 `config_subentries` 下的部分）中删除以下键。
* 下面列出的辅助元素会自动使用中央翻译域。
* 如果您的代码将这些原因之一传递给 `async_abort` 或 `AbortFlow`，请在删除本地键之前传递 `homeassistant` 翻译域。如果没有该域，请保留本地键。请参阅[显式翻译域](#explicit-translation-domain)。

当中止使用中央翻译域时，前端会从该域解析原因，而不使用本地键。

## 默认原因

| 原因                               | 引发者                                                                         |
|------------------------------------|--------------------------------------------------------------------------------|
| `already_in_progress`              | `async_set_unique_id`，无唯一 ID 的发现                                        |
| `single_instance_allowed`          | `single_config_entry`、`DiscoveryFlowHandler`、`WebhookFlowHandler`            |
| `no_devices_found`                 | `DiscoveryFlowHandler`                                                         |
| `cloud_not_connected`              | `WebhookFlowHandler`                                                           |
| `reauth_successful`                | `async_update_reload_and_abort`、`async_update_and_abort`                      |
| `reconfigure_successful`           | `async_update_reload_and_abort`、`async_update_and_abort`，同样适用于子条目    |
| `authorize_url_timeout`            | `AbstractOAuth2FlowHandler`                                                    |
| `missing_credentials`              | `AbstractOAuth2FlowHandler`                                                    |
| `no_url_available`                 | `AbstractOAuth2FlowHandler`                                                    |
| `oauth_error`                      | `AbstractOAuth2FlowHandler`                                                    |
| `oauth_failed`                     | `AbstractOAuth2FlowHandler`                                                    |
| `oauth_implementation_unavailable` | `AbstractOAuth2FlowHandler`                                                    |
| `oauth_timeout`                    | `AbstractOAuth2FlowHandler`                                                    |
| `oauth_unauthorized`               | `AbstractOAuth2FlowHandler`                                                    |
| `user_rejected_authorize`          | `AbstractOAuth2FlowHandler`                                                    |

## 显式翻译域

传递拥有该字符串的域。`async_abort` 和 `AbortFlow` 均接受此参数。

```python
from homeassistant.core import DOMAIN as HOMEASSISTANT_DOMAIN

return self.async_abort(
    reason="no_devices_found",
    translation_domain=HOMEASSISTANT_DOMAIN,
)
```

这在配置流和子条目流中有效。选项流会在 `options` 部分中查找，而 `homeassistant` 集成没有该部分。

## 保留您自己的措辞

仅在您故意对原因采用不同措辞时需要：

* 将 `reason` 传递给 `async_update_reload_and_abort` 或 `async_update_and_abort`，即使使用默认名称也是如此。
* 在 OAuth2 流程中，传递 `translation_domain=DOMAIN`。

核心自身引发的中止（如 `already_in_progress`）始终使用中央字符串。若要在那里保留自定义字符串，请覆盖上游生成这些字符串的步骤。
