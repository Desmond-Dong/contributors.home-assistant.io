---
title: 图标翻译架构（schema）的变更
description: 图标翻译架构已进行调整，允许为服务中的分区指定图标。
date: 2024-08-27
authors:
  - Erik Montnémery
areas:
  - core
---

图标翻译架构（schema）已进行调整，允许为[服务中的分区](/core/integrations/actions/)指定图标。
服务的图标现在应按照更明确的架构提供，该架构允许为分区指定图标。

这样就可以像下面这样指定服务图标：
```json
  "services": {
    "test_service_1": {
      "service": "mdi:flask",
      "sections": {
        "section_1": "mdi:test-tube"
      }
    }
  }
```

旧格式将在一年的弃用期内继续受支持，以便为自定义集成留出迁移到新架构的时间：
```json
  "services": {
    "test_service_1": "mdi:flask"
  }
```

实现细节请参见 [core PR #124656](https://github.com/home-assistant/core/pull/124656)。

### 对自定义卡片的影响

发送到前端的图标数据将始终采用新格式，显示服务图标的自定义卡片需要进行相应调整。
