---
title: 推出设备名称翻译功能
description: 现在可以为设备名称提供翻译，包括支持将静态值用作占位符（placeholder）。
date: 2024-02-28
authors:
  - Erik Montnémery
areas:
  - core
---

现在可以为设备（device）名称提供翻译，包括支持使用静态值作为占位符。

一个带有已翻译设备名称的传感器示例：
```python
class TestEntity(SensorEntity):
    """Example entity."""
    
    _attr_has_entity_name = True
    
    def __init__(self) -> None:
        """Initialize example entity."""
        self._attr_device_info = DeviceInfo(
            translation_key="n_ch_power_strip",
            translation_placeholders={"number_of_sockets": "2"},
        )
```
对应的 `strings.json` 文件如下所示：
```json
{
  "device": {
    "n_ch_power_strip": {
      "name": "Power strip with {number_of_sockets} sockets"
    }
  }
}
```

最终的设备名称将是 `Power strip with 2 sockets`。

当需要翻译占位符但设备未提供时，会记录一条警告。
当这种情况发生在非稳定版本（dev、nightly 或 beta）的系统上时，会抛出错误，以便能够快速发现这些失误。

请不要忘记善待您的翻译人员，因为他们需要了解占位符名称将会传入什么样的名称或值 ❤️。
