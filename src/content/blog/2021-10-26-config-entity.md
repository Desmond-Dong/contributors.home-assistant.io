---
title: 设备配置 URL 和实体类别
description: Home Assistant Core 2021.11 引入了两个新概念，让设备管理更加轻松：设备配置 URL 和实体类别。
date: 2021-10-26
authors:
  - Erik Montnémery
areas:
  - core
---

Home Assistant Core 2021.11 引入了两个新概念，让设备管理更加轻松：
设备配置 URL 和实体类别（entity category）。

### 设备配置 URL

现在可以在设备注册信息中提供 configuration_url 了。
configuration_url 用于设备卡片，让用户可以访问设备，进行 Home Assistant 中无法完成的配置或诊断。
请注意，链接指向的 URL 不会由 Home Assistant 代理，因此在远程连接 Home Assistant 时通常无法使用。

[![Screenshot showing visit device](/img/en/blog/2021-10-26-config-entity/configuration_url.png)](/img/en/blog/2021-10-26-config-entity/configuration_url.png)

### 实体类别 

实体（entity）现在有了一个可选属性 `entity_category`，用于对非主要实体进行分类。对于允许更改设备配置的实体，请设置为 `config`，例如，一个开关实体，可以打开或关闭开关的背景照明。对于展示设备的某些配置参数或诊断信息但不允许更改的实体，请设置为 `diagnostic`，例如，一个显示 RSSI 或 MAC 地址及允许值的传感器。

设置了 `entity_category` 的实体：
- 不会包含在针对整个设备或区域（area）的服务调用中。
- 默认情况下，不会暴露给 Google Assistant 或 Alexa。
- 会显示在设备配置页面的单独卡片上。
- 不会显示在自动生成的 Lovelace 仪表盘（dashboard）上。

[![Screenshot showing seperation of entity categories](/img/en/blog/2021-10-26-config-entity/entity_categories.png)](/img/en/blog/2021-10-26-config-entity/entity_categories.png)
