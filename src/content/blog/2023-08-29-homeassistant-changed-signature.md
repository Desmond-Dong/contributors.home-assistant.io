---
title: HomeAssistant.__init__ 需要向其传入一个字符串
description: HomeAssistant.init 的签名已从无参数更改为要求将配置目录作为字符串传入。
date: 2023-08-29
authors:
  - Erik Montnémery
areas:
  - core
---

`HomeAssistant.__init__` 的签名已从无参数更改为要求将配置目录（configuration directory）作为字符串传入。在 HomeAssistant core 仓库之外创建 `HomeAssistant` 对象的脚本、测试等都需要进行相应更新。

此更改由 [core PR#98442](https://github.com/home-assistant/core/pull/98442) 引入。

如果向后兼容性很重要，可以通过以下方式实现：

```python
    try:
        hass = HomeAssistant()  # pylint: disable=no-value-for-parameter
    except TypeError:
        hass = HomeAssistant(config_dir)  # pylint: disable=too-many-function-args
```
