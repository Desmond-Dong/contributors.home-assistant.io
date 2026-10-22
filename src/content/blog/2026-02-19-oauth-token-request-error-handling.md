---
title: OAuth 2.0 辅助元素错误处理的变更
description: 从 2026.3 开始，我们将改进 OAuth 2.0 辅助元素处理令牌请求和刷新令牌失败的方式。
date: 2026-02-19
authors:
  - Erwin Douna
areas:
  - core
---

## 变更摘要

从 `2026.3` 开始，我们将改进 OAuth 2.0 辅助元素（helper）处理令牌请求（token request）和刷新令牌（refresh token）失败的方式。此变更使错误处理更加健壮，与 aiohttp 库解耦，并帮助使用[数据更新协调器（Data Update Coordinator）](/core/integrations/fetching-data/)的集成自动触发正确的错误处理。

## 变更内容

当 OAuth 2.0 令牌请求或令牌刷新失败时，Home Assistant 会允许底层的 `aiohttp.ClientResponseError` 直接传播到集成。我们正在对这一行为进行修改和增强。

我们引入了三个新的异常，以提供更清晰的语义：
- `OAuth2TokenRequestTransientError` - 可恢复的错误，可以重试。
- `OAuth2TokenRequestReauthError` - 不可恢复的错误，需要重新认证（reauthentication）。
- `OAuth2TokenRequestError` - 基础异常，用于上述两个条件都不满足的情况，或用于让集成能够捕获所有令牌请求异常。

### 数据更新协调器（Data Update Coordinator）

大多数使用 OAuth 2.0 辅助元素的集成也使用数据更新协调器。当令牌请求或刷新令牌失败时，异常会在数据更新协调器中向上冒泡，现在会触发以下错误处理：

对于不可恢复的错误（400 及以上，429（速率限制）除外）：

- `OAuth2TokenRequestReauthError`：数据更新协调器会在应当抛出异常时引发 `ConfigEntryAuthFailed`，否则会启动重新认证流程。

对于临时错误（500 及以上和 429）：

- `OAuth2TokenRequestTransientError`：数据更新协调器会将其视为 `UpdateFailed`，并触发重试机制。

这意味着同时使用 OAuth 2.0 辅助元素和数据更新协调器的集成无需对新异常进行任何特殊处理。

### 迁移

目前使用 OAuth 2.0 辅助元素并显式处理 `aiohttp.ClientResponseError` 的集成，应调整其错误处理方式以应对新的异常。为了简化这一过渡，我们添加了一个兼容层，让新的 OAuth 异常继承自 `aiohttp.ClientResponseError`。捕获此异常类型的现有代码应能继续正常工作。不过，我们鼓励重构代码以使用新的异常。详见代码示例。

#### 迁移代码示例

更新异常处理，然后在集成中继续判断这是（非）可恢复错误。例如：

```python
    try:
        await auth.async_get_access_token()
    except OAuth2TokenRequestReauthError as err:
        raise ConfigEntryAuthFailed(
            translation_domain=DOMAIN, translation_key="reauth_required"
        ) from err
    except (OAuth2TokenRequestError, ClientError) as err:
        raise ConfigEntryNotReady(
            translation_domain=DOMAIN, translation_key="auth_server_error"
        ) from err
```
