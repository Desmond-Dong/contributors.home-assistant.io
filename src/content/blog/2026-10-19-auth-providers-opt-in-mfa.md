---
title: "身份验证提供者现已改为主动选择启用多因素身份验证"
description: 自 Home Assistant Core 2026.11 起，登录流程仅在扩展 MfaLoginFlow 时才会要求提供第二因素。support_mfa 属性已被移除。
date: 2026-10-19
authors:
  - Josef Zweck
areas:
  - core
---

自 Home Assistant Core 2026.11 起，登录流程仅在扩展新的 `MfaLoginFlow` 时才会要求提供第二因素。身份验证管理器不再将多因素身份验证（MFA）步骤添加到每个提供者中，并且 `AuthProvider.support_mfa` 已被移除。

## 需要采取的措施

仅当您的自定义集成（integration）引入了自己的身份验证提供者时才与此相关。

> [!NOTE]
> 不支持自定义身份验证提供者。

如果您不做任何更改，您的提供者将默默停止要求提供第二因素，即使它从未重写 `support_mfa`。

要要求提供已启用的第二因素，请扩展 `MfaLoginFlow`。在验证第一因素后，返回 `await self.async_finish(flow_result)`，而不是直接调用 `self.async_create_entry(data=flow_result)`，后者会绕过 MFA 检查。如果您重写了 `async_finish`，请返回 `await super().async_finish(flow_result)`，以便 MFA 检查仍能运行。

例如，更改您的登录流程的基类：

```python
from homeassistant.auth.providers import MfaLoginFlow


class MyLoginFlow(MfaLoginFlow[MyAuthProvider]):
    ...
```

如果您的提供者重写了 `support_mfa`，请移除该属性。如果它返回 `True`，请如上所示扩展 `MfaLoginFlow`，否则您的提供者将停止要求提供第二因素。如果它返回 `False`，请继续保持扩展 `LoginFlow`。
