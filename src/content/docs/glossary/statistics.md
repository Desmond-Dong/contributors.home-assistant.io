---
title: "长期统计"
description: "记录器永久保存的传感器数值每小时汇总，例如平均值、最小值和最大值，或累计总量，用于长时间跨度的图表和能源仪表盘。"
sidebarGroup: "Data"
term:
  aliases:
    - "statistics"
    - "LTS"
  code:
    - "statistics"
    - "state_class"
  related:
    - "recorder"
    - "state-class"
  autolink:
    - "long-term statistics"
---

Home Assistant 会为每个具有[状态类别](/glossary/state-class/)的传感器保存统计数据。与历史记录不同，这些统计数据不会在十天之后被清除。五分钟的汇总也会被保存，但保存时长与历史记录相同。
