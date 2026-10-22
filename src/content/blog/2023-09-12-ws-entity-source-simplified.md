---
title: WebSocket 命令 entity/source 已被修改
description: "WebSocket 命令 entity/source 已被大大简化："
date: 2023-09-12
authors:
  - Erik Montnémery
areas:
  - core
---

WebSocket 命令 `entity/source` 已被大大简化：
- 已无法获取单个实体（entity）的信息
- 响应中仅包含实体的域（domain），`custom_component`、`config_entry` 和 `source` 不再存在。

### 新的响应示例
```json
{
  "light.entity_1": {
    "domain": "template",
  },
  "switch.entity_2": {
    "domain": "shelly",
  },
}
```

### 旧的响应示例
```json
{
  "light.entity_1": {
    "custom_component": false,
    "domain": "template",
    "source": "platform_config",
  },
  "switch.entity_2": {
    "custom_component": false,
    "config_entry": "<config_entry_id>",
    "domain": "shelly",
    "source": "config_entry",
  },
}
```


此更改由 [core PR#99439](https://github.com/home-assistant/core/pull/99439) 引入。
