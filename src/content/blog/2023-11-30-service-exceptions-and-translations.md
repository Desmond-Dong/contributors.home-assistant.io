---
title: 服务调用过程中的异常处理与翻译支持
description: 迄今为止，抛出异常的服务调用都会记录堆栈跟踪。因使用不当（例如输入无效）而失败的服务调用不需要堆栈跟踪，如果能为用户提供以其母语显示的有帮助的错误消息，将会更有益。
date: 2023-11-30
authors:
  - Jan Bouwhuis
areas:
  - core
---

## 服务调用过程中的异常处理

迄今为止，抛出异常的服务调用都会记录堆栈跟踪（stack trace）。因使用不当（例如输入无效）而失败的服务调用不需要堆栈跟踪，如果能为用户提供以其母语显示的有帮助的错误消息，将会更有益。

为了在这些情况下抑制堆栈跟踪，我们引入了新的异常类型 `ServiceValidationError`，它派生自 `HomeAssistantError`。当服务因使用不当而失败时，现在应该抛出 `ServiceValidationError` 而不是 `ValueError`。

如果服务的使用方式正确但仍然失败，则仍应抛出 `HomeAssistantError`，或者 `HomeAssistantError` 的除 `ServiceValidationError` 之外的子类。

当服务抛出 `ServiceValidationError` 时，错误消息将显示在 UI 和日志中，但堆栈跟踪只会以调试（debug）级别记录。对于从服务调用中抛出的其他异常（包括  `HomeAssistantError`），一切保持不变，完整的堆栈跟踪仍将以异常严重级别打印。

集成（integration）应进行更新，在服务因使用不当而失败时抛出 `ServiceValidationError` 而不是 `ValueError`，在因其他预期错误（例如网络错误）而失败时抛出 `HomeAssistantError`。[了解更多](/core/integrations/setup-failures/)。

## 异常的翻译支持

`HomeAssistantError` 异常及其子类（包括 `ServiceValidationError`）现在接受一个翻译键（translation key）以支持本地化。[了解更多](/core/integrations/translations/#exceptions)。在前端接收有关异常信息的情况下，将使用该翻译键。如果没有将自定义错误消息作为参数传递给异常，翻译缓存中的英文错误消息也将用于向控制台记录消息。

### 背景

- 相关[讨论](https://github.com/home-assistant/architecture/discussions/992)。
- 实现 [Core PR #102592](https://github.com/home-assistant/core/pull/102592)。
