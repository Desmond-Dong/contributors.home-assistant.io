---
title: "支持的功能"
description: "实体（entity）设置的一个数字，用于表明其类型支持哪些功能，例如可以设置位置的卷帘（cover）。"
sidebarGroup: "Entities and devices"
term:
  code:
    - "supported_features"
    - "CoverEntityFeature"
    - "LightEntityFeature"
  related:
    - "entity"
    - "action"
  autolink:
    - "supported features"
---

每个功能都是一个二进制位，来自像 `CoverEntityFeature` 这样的枚举。前端只显示受支持功能的控件，Home Assistant 也只允许执行与之匹配的操作（action）。
