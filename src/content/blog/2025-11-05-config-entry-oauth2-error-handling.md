---
title: 无互联网时 OAuth2 配置的错误处理改进
description: 使用 Application Credentials 和通过 OAuth2 进行配置的集成需要更新其错误处理，以便在互联网中断时正确处理配置。
date: 2025-11-05
authors:
  - Will Moss
areas:
  - core
---

使用 [Application Credentials](/core/integrations/oauth2/) 和 [通过 OAuth2 进行配置](/core/integrations/oauth2/) 的集成需要更新其错误处理，以便在断网时正确处理配置。

目前，使用通过 OAuth2 进行配置的集成会在其 `__init__.py` 的 `async_setup_entry` 中调用 `config_entry_oauth2_flow.async_get_config_entry_implementation`。以前在没有网络时，这会抛出 `ValueError: Implementation not available`，这是一个不可重试的错误，导致集成在互联网恢复后需要手动重新配置（参见 Issue [153956](https://github.com/home-assistant/core/issues/153956) 和 [144582](https://github.com/home-assistant/core/issues/144582)）。[core PR 154579](https://github.com/home-assistant/core/pull/154579) 添加了 `config_entry_oauth2_flow.ImplementationUnavailableError`，并在因缺少互联网连接导致 OAuth2 配置不可用时，在 `config_entry_oauth2_flow.async_get_config_entry_implementation` 中抛出该错误。集成应捕获此错误并抛出 `ConfigEntryNotReady`。
使用新异常的这一行为变更将于 2025.12 版本发布。

以下是一个迁移示例，
```diff
-    implementation = await async_get_config_entry_implementation(hass, entry)
+    try:
+        implementation = await async_get_config_entry_implementation(hass, entry)
+    except ImplementationUnavailableError as err:
+        raise ConfigEntryNotReady(
+            "OAuth2 implementation temporarily unavailable, will retry"
+        ) from err
```

新集成会发现由 `python3 -m script.scaffold config_flow_oauth2` 生成的正确 `try` / `except` 代码块。
