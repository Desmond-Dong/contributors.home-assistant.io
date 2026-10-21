---
title: "发现（Discovery）"
description: "查找设备和服务的位置，例如在网络中或通过蓝牙，以便 Home Assistant 可以提供设置它们的选项。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "discovered"
  code:
    - "zeroconf"
    - "ssdp"
    - "dhcp"
    - "bluetooth"
    - "usb"
    - "async_step_zeroconf"
  ui: "Discovered"
  related:
    - "config-flow"
    - "manifest"
---

集成在其清单（manifest）中列出其设备可以被找到的方式，例如通过 mDNS（`zeroconf`）、SSDP、DHCP、蓝牙或 USB。当 Home Assistant 找到匹配项时，它会启动该集成的配置流程（config flow），并将该设备显示为已发现（discovered）。
