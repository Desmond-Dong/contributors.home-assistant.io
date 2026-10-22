---
title: 抛出带翻译的异常
description: 翻译支持适用于 HomeAssistantError 及其诸如 ServiceValidationError 之类的子类。
date: 2024-03-15
authors:
  - Jan Bouwhuis
areas:
  - core
---

### 记录带翻译支持的异常

翻译支持适用于 `HomeAssistantError` 及其诸如 `ServiceValidationError` 之类的子类。当设置了 `translation_domain` 和 `translation_key`，并且错误消息已添加到 `strings.json` 中时，就不再需要为本地日志记录添加错误消息字符串。Home Assistant 会自动从翻译缓存中获取英文错误消息。

在抛出 `HomeAssistantError` 或带有翻译支持的子类时，我们应该从参数列表中移除日志消息，以便使其能够从翻译缓存中获取。

例如：

```python
async def async_select_index(hass: HomeAssistant, index: int) -> None:
    """Setup the config entry for my device."""
    try:
        check_index(index)
    except ValueError as exc:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="invalid_index",
            translation_placeholders={
                "index": index,
                "expected": expected,
            },
        ) from exc
```

错误消息放置在 `strings.json` 中：

```json
{
    ...
    "exceptions": {
        "invalid_index": {
            "message": "An invalid index is selected, expected: {expected}, got: {index}"
        }
    }
}
```
