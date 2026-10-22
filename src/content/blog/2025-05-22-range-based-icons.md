---
title: 图标翻译现已支持范围
description: 图标翻译现在支持基于数值范围定义图标。这意味着集成作者可以定义随数值变化而变化的图标，而无需在其代码中实现自定义逻辑。
date: 2025-05-22
authors:
  - Franck Nijhof
areas:
  - core
---

图标翻译（icon translations）现在支持基于数值范围来定义图标。这意味着集成（integration）作者可以定义随数值变化而变化的图标，而无需在其代码中实现自定义逻辑。

此前，图标翻译仅支持基于状态（state）的图标，即特定状态映射到特定图标。虽然这种方式对于“开”/“关”等离散状态效果很好，但要处理电池电量或信号强度指示等数值，则需要自定义代码。

基于范围的图标定义在 `icons.json` 文件中：

```json
{
  "entity": {
    "sensor": {
      "battery_level": {
        "default": "mdi:battery",
        "range": {
          "0": "mdi:battery-outline",
          "10": "mdi:battery-10",
          "20": "mdi:battery-20",
          "30": "mdi:battery-30",
          "40": "mdi:battery-40",
          "50": "mdi:battery-50",
          "60": "mdi:battery-60",
          "70": "mdi:battery-70",
          "80": "mdi:battery-80",
          "90": "mdi:battery-90",
          "100": "mdi:battery"
        }
      }
    }
  }
}
```

系统会选择与小于或等于实体（entity）当前值的最大范围值相关联的图标。例如：

- 值为 15 时将显示 `mdi:battery-10` 图标
- 值为 45 时将显示 `mdi:battery-40` 图标
- 值为 100 时将显示 `mdi:battery` 图标

有关实现细节，请参阅[图标翻译文档](/core/quality-scale/icon-translations/)。
