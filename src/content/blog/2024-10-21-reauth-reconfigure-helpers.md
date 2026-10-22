---
title: 重新认证（reauth）和重新配置（reconfigure）流程的新辅助方法与最佳实践
description: "ConfigFlow 中新增了辅助方法（helper methods），以便于管理重新认证和重新配置流程："
date: 2024-10-21
authors:
  - epenet
areas:
  - core
---

ConfigFlow 中新增了辅助方法，以便于管理重新认证和重新配置流程：
- `self._get_reauth_entry()` 和 `self._get_reconfigure_entry()` 可让你随时访问对应的配置条目（config entry）
  - 应使用这些方法，而不是 `self.hass.config_entries.async_get_entry(self.context["entry_id"])`
  - 应在需要时请求配置条目（使用局部变量，每步一次），而不要将其缓存为类属性
  - 如果这些步骤与发现（discovery）或用户（user）流程共享，则在访问配置条目之前，应将 `self.source` 与 `SOURCE_REAUTH` 和 `SOURCE_RECONFIGURE` 进行比对检查
- `self._abort_if_unique_id_mismatch` 允许在 `unique_id` 与待重新认证或重新配置的配置条目的 `unique_id` 不匹配时中止流程
  - 应在调用 `self.async_set_unique_id` 之后使用
  - 如果这些步骤与发现或用户流程共享，应将 `self.source` 与 `SOURCE_REAUTH` 和 `SOURCE_RECONFIGURE` 进行比对检查
  - 其他来源应继续使用 `self._abort_if_unique_id_configured`
- `self.async_update_reload_and_abort` 已经过调整，以更新重新配置流程的默认消息
  - 新消息 `reconfigure_successful` 必须存在于 `strings.json` 中
- `self.async_update_reload_and_abort` 新增了参数 `data_updates`，用于将数据更新与已有数据合并
  - 相比 `data` 参数，更推荐使用该参数，因为在 schema 更新时它可以降低数据丢失的风险

更多详情请参阅[重新配置](/core/integrations/reauth-reconfigure/#reconfiguration)和[重新认证](/core/integrations/reauth-reconfigure/#reauthentication)文档。
