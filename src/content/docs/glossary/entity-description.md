---
title: "实体描述（entity description）"
description: "一个包含实体（entity）固定属性的数据类（dataclass），例如其键、翻译键和设备类别（device class），这样许多相似的实体可以共用一个类。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "entity descriptions"
  code:
    - "EntityDescription"
    - "SensorEntityDescription"
  related:
    - "entity"
    - "device-class"
    - "translation-key"
  autolink:
    - "entity description"
    - "entity descriptions"
---

一个拥有二十个传感器的集成（integration）通常只有一个传感器类，以及一个包含二十个实体描述的列表。每个描述说明了其中一个传感器的不同之处。
