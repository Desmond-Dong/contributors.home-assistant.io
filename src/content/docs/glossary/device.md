---
title: "设备"
description: "一个物理设备或一项服务，一个或多个实体（entity）归属于它，例如带有温度传感器和湿度传感器的恒温器。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "devices"
  code:
    - "DeviceInfo"
    - "device_registry"
    - "device_id"
  related:
    - "entity"
    - "registry"
    - "area"
---

集成（integration）使用 `DeviceInfo` 来描述其设备：名称、制造商、型号和版本。Home Assistant 将这些信息保存在设备注册表（device registry）中，用户可以在其中重命名设备并将其归入某个[区域](/glossary/area/)（area）。

设备也可以是一项服务，例如天气预报，这样它的实体就会被归为一组。
