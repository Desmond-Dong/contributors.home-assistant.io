---
title: 介绍实体翻译占位符
description: 现在可以通过占位符提供静态值，供实体翻译使用。
date: 2024-01-19
authors:
  - Joost Lekkerkerker
areas:
  - core
---

现在可以通过占位符（placeholder）提供静态值，供实体（entity）翻译使用。
你可以通过实体的 `translation_placeholders` 属性传入占位符。

传感器示例：
```python
class TestEntity(SensorEntity):
    """Example entity."""
    
    _attr_has_entity_name = True
    _attr_translation_key = "temperature"
    
    def __init__(self) -> None:
        """Initialize example entity."""
        self._attr_translation_placeholders = {"channel_id": "2"}
        self._attr_device_info = DeviceInfo(
            name="Example device"
        )
```
`strings.json` 文件将如下所示：
```json
{
  "entity": {
    "sensor": {
      "temperature": {
        "name": "Temperature channel {channel_id}"
      }
    }
  }
}
```

生成的实体名称将为 `Example device Temperature channel 2`。

当实体应提供某个翻译占位符但未提供时，会记录一次警告。
当这种情况发生在未运行稳定版本（dev、nightly 或 beta）的系统上时，将会抛出错误，以便快速发现这些失误。

请不要忘记善待你的翻译人员，因为他们需要从占位符名称中了解将会传入什么样的名称或值 ❤️。
