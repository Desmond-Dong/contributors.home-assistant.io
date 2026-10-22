---
title: 迁移 dhcp/ssdp/usb/zeroconf ServiceInfo 模型
description: "为了减少当前对可选集成（integration）的依赖——这些名称本质上是被用作辅助元素（helper）的——以下 ServiceInfo 模型已被迁移："
date: 2025-01-15
authors:
  - epenet
areas:
  - core
---

### 变更摘要

为了减少当前对可选集成（integration）的依赖——这些名称本质上是被用作辅助元素（helper）的——以下 ServiceInfo 模型已被迁移：
- `DhcpServiceInfo` 从 `homeassistant.components.dhcp` 迁移至 `homeassistant.helpers.service_info.dhcp`
- `SsdpServiceInfo` 从 `homeassistant.components.ssdp` 迁移至 `homeassistant.helpers.service_info.ssdp`
- `UsbServiceInfo` 从 `homeassistant.components.usb` 迁移至 `homeassistant.helpers.service_info.usb`
- `ZeroconfServiceInfo` 从 `homeassistant.components.zeroconf` 迁移至 `homeassistant.helpers.service_info.zeroconf`


要更新您的集成：
1. 按照下方示例替换 import 语句
2. 使用新的 import 测试您的集成

旧的 import 位置已被弃用，并将在 Home Assistant 2026.2 中移除。


### 示例

```python
# Old
# from homeassistant.components.dhcp import DhcpServiceInfo
# from homeassistant.components.ssdp import SsdpServiceInfo
# from homeassistant.components.usb import UsbServiceInfo
# from homeassistant.components.zeroconf import ZeroconfServiceInfo

# New
from homeassistant.helpers.service_info.dhcp import DhcpServiceInfo
from homeassistant.helpers.service_info.ssdp import SsdpServiceInfo
from homeassistant.helpers.service_info.usb import UsbServiceInfo
from homeassistant.helpers.service_info.zeroconf import ZeroconfServiceInfo

class MyConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow."""

    async def async_step_dhcp(self, discovery_info: DhcpServiceInfo) -> ConfigFlowResult:
        """Handle dhcp discovery."""
        ...

    async def async_step_ssdp(self, discovery_info: SsdpServiceInfo) -> ConfigFlowResult:
        """Handle ssdp discovery."""
        ...

    async def async_step_usb(self, discovery_info: UsbServiceInfo) -> ConfigFlowResult:
        """Handle usb discovery."""
        ...

    async def async_step_zeroconf(self, discovery_info: ZeroconfServiceInfo) -> ConfigFlowResult:
        """Handle zeroconf discovery."""
        ...
```
