---
title: 传感器设备类别现已有默认显示精度
description: 如果数值型传感器没有由其集成设置的建议显示精度，Home Assistant 现在将根据传感器的设备类别使用默认显示精度。
date: 2025-05-26
authors:
  - Abílio Costa
areas:
  - core
---

如果数值型传感器没有由其集成设置的建议显示精度，Home Assistant 现在将根据传感器的设备类别（device class）使用默认显示精度。

新的设备类别应添加到 `homeassistant/components/sensor/const.py` 中的 `UNITS_PRECISION`，同时提供相应的单位以及所需的默认显示精度。有关如何选择合适单位和精度的更多详细信息，请参阅该常量的 docstring。

之前在进行单位转换时应用于传感器状态的舍入处理现已移除，传感器状态将包含完整的原始值。

仍建议集成在其传感器上设置 `suggested_display_precision`。此更改是一种回退机制，用于确保所有数值型传感器都能获得一致的体验。

有关更多详细信息，请查看实现该功能的[拉取请求（pull request）](https://github.com/home-assistant/core/pull/145013)以及[传感器实体文档](/core/entities/sensor/)。
