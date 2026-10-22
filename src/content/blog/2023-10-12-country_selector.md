---
title: 国家选择器
description: 选择器（selector）得到了扩展，现在还包含了 CountrySelector。
date: 2023-10-12
authors:
  - G Johansson
areas:
  - core
---

[选择器（selector）](https://www.home-assistant.io/docs/blueprint/selectors/)得到了扩展，现在还包含了一个 `CountrySelector`。

在[配置流程（config flow）](/core/integrations/flow-steps/#show-a-form)中使用它，可以让前端自动将国家代码翻译为相应的国家名称。

示例：

```python
vol.Schema(
    {
        vol.Optional(CONF_COUNTRY): CountrySelector(
            CountrySelectorConfig(
                countries=["DE", "US"],
            )
        ),
    }
)
```
