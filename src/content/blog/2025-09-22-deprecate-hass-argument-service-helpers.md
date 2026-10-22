---
title: 弃用服务辅助函数中的 hass 参数
description: "已弃用向以下服务辅助函数（service helpers）提供 hass 参数的做法：verify_domain_control、extract_entity_ids、async_extract_entities、async_extract_entity_ids 和 async_extract_config_entry_ids。"
date: 2025-09-22
authors:
  - epenet
areas:
  - core
---

### 变更摘要

已弃用向以下服务辅助函数（service helpers）传递 `hass` 参数的做法：
`verify_domain_control`、`extract_entity_ids`、`async_extract_entities`、
`async_extract_entity_ids` 和 `async_extract_config_entry_ids`。

自 `2025.1` 版本发布以来（通过 core PR [#133062](https://github.com/home-assistant/core/pull/133062)），
`HomeAssistant` 的引用已可以作为 `ServiceCall` 对象的一个属性使用，
因此再向上述辅助函数传递 `hass` 对象就变得多余了。

要更新您的集成（integration），只需移除 `hass` 参数即可。

对 `hass` 参数的支持将在 Home Assistant 2026.10 中被移除。

### 示例

#### ID 提取辅助函数

```python
# Old
# target_entry_ids = await async_extract_config_entry_ids(hass, service_call)
# entity_ids = await async_extract_entity_ids(hass, service_call)
# entities = await service.async_extract_entities(hass, platform_entities.values(), service_call)

# New
target_entry_ids = await async_extract_config_entry_ids(service_call)
entity_ids = await async_extract_entity_ids(service_call)
entities = await service.async_extract_entities(platform_entities.values(), service_call)
```

#### 装饰器辅助函数

```python
# Old
# @verify_domain_control(hass, DOMAIN)
# async def do_action(call: ServiceCall) -> None:
#     ...

# New
@verify_domain_control(DOMAIN)
async def do_action(call: ServiceCall) -> None:
    ...
```
