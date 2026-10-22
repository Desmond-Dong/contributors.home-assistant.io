---
title: OAuth2 错误处理移至辅助元素中
description: 自 Home Assistant Core 2026.10 起，OAuth2 辅助元素（helper）会抛出配置条目（config entry）设置已能理解的异常，因此集成不再需要自行处理 OAuth2 失败情况。
date: 2026-09-07
authors:
  - Josef Zweck
areas:
  - core
---

自 Home Assistant Core 2026.10 起，OAuth2 辅助元素（helper）会抛出配置条目（config entry）设置已能理解的异常，因此集成不再需要自行处理 OAuth2 失败情况。

## 变更内容

OAuth2 异常现在继承自描述后续操作的配置条目异常，并携带来自 `homeassistant` 集成的已翻译消息。

| 异常 | 同时也是 | 未捕获时的结果 |
| --- | --- | --- |
| `ImplementationUnavailableError` | `ConfigEntryNotReady` | 重试设置 |
| `UnknownImplementationError` | `ConfigEntryAuthFailed` | 启动重新认证流程 |
| `OAuth2TokenRequestError` | `ConfigEntryNotReady` | 重试设置 |
| `OAuth2TokenRequestTransientError` | `ConfigEntryNotReady` | 重试设置 |
| `OAuth2TokenRequestConnectionError` | `ConfigEntryNotReady` | 重试设置 |
| `OAuth2TokenRequestReauthError` | `ConfigEntryAuthFailed` | 启动重新认证流程 |

所有这些异常均可从 `homeassistant.exceptions` 导入，并携带面向用户的已翻译消息，因此集成无需为它们添加 `strings.json` 条目。

## 迁移

```diff
-    try:
-        implementation = await async_get_config_entry_implementation(hass, entry)
-    except ImplementationUnavailableError as err:
-        raise ConfigEntryNotReady(
-            translation_domain=DOMAIN,
-            translation_key="oauth2_implementation_unavailable",
-        ) from err
+    implementation = await async_get_config_entry_implementation(hass, entry)
```

同时从 `strings.json` 的 `exceptions` 部分移除现已不再使用的 `oauth2_implementation_unavailable` 条目。

在此调用周围捕获 `ValueError` 的代码也可以移除。为了向后兼容，`UnknownImplementationError` 是 `ValueError` 的子类，因此 `ValueError` 处理程序会将其静默降级并丢弃已翻译的消息。

### 令牌请求

```diff
-    try:
-        await auth.async_get_access_token()
-    except OAuth2TokenRequestReauthError as err:
-        raise ConfigEntryAuthFailed from err
-    except OAuth2TokenRequestError as err:
-        raise ConfigEntryNotReady from err
+    await auth.async_get_access_token()
```

这同样适用于 `await session.async_ensure_token_valid()`。


## 质量等级

[`test-before-setup`](/core/quality-scale/test-before-setup/) 规则接受在 `async_setup_entry` 中使用 `await session.async_ensure_token_valid()` 以及 `await coordinator.async_config_entry_first_refresh()` 来满足该规则。两者都会代表集成抛出相应的配置条目异常。

## 何时保留捕获

集中处理是默认行为，而非限制。当集成确实需要不同的行为时，请保留显式处理程序，例如：

- 使用 ConfigEntryError 将特定状态视为永久状态，而不是重试。
- 为只有集成才知道的消息添加上下文。
- 在异常传播之前清理集成状态。

在这些情况下，捕获适用的最具体的异常，并让其余异常继续传播。
