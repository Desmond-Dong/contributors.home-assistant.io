---
title: "设备类别"
description: "实体（entity）测量什么或是什么，例如 `temperature` 或 `door`。它决定了图标、单位，以及前端如何显示该实体。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "device classes"
  code:
    - "device_class"
    - "SensorDeviceClass"
    - "BinarySensorDeviceClass"
  related:
    - "entity"
    - "state-class"
  autolink:
    - "device class"
    - "device classes"
---

具有 `door` 设备类别（device class）的二进制传感器（binary sensor）会显示为“打开”和“关闭”，而不是“开”和“关”。具有 `temperature` 设备类别的传感器会获得正确的图标，并转换为用户选择的单位。
