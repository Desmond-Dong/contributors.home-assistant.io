---
title: 翻译计量单位
description: Home Assistant 2024.12 将支持自定义计量单位的翻译。
date: 2024-11-21
authors:
  - Abílio Costa
areas:
  - core
---

Home Assistant 2024.12 将支持自定义计量单位的翻译。此前，这些单位都是硬编码在各自的集成（integration）中的。

与实体（entity）名称一样，集成只需在实体定义中设置 `translation_key`，并在 `strings.json` 文件中提供单位名称（使用新的 `unit_of_measurement` 键）：

```json
{
  "entity": {
    "sensor": {
      "subscribers_count": {
        "unit_of_measurement": "subscribers"
      },
    }
  }
}
```

详情请查看我们的[后端本地化文档](/core/integrations/translations/)。
