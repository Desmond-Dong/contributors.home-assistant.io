---
title: 让 Conversation 集成面向未来
description: Home Assistant 2023.2 版本包含 PR 86592 和 PR 86484，其中包括对对话代理（conversation agent）API 的破坏性变更，以使其面向未来。
date: 2023-01-24
authors:
  - Paulus Schoutsen
areas:
  - core
---

Home Assistant 2023.2 版本包含 [PR 86592](https://github.com/home-assistant/core/pull/86592) 和 [PR 86484](https://github.com/home-assistant/core/pull/86484)，其中包括对[对话代理（conversation agent）](/core/entities/conversation/) API 的破坏性变更，以使其面向未来。

- 设置代理现在需要一个配置条目（config entry）：`conversation.async_set_agent(hass, config_entry, agent).
- 取消设置代理现在通过一个新的端点（endpoint）进行：`conversation.async_unset_agent(hass, config_entry)
- `AbstractConversationAgent` API 已更改：
  - 所有入门引导（onboarding）逻辑均已移除
  - `async_process` 现在接受一个新的 `ConversationInput` 参数，其中包含相同的参数。语言现在始终会被设置。
  - `async_process` 现在应始终返回一个 `ConversationResult`。不再允许返回 `None`，也不要指望错误处理会替你完成。
