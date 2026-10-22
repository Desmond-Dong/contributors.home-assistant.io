---
title: 弃用 homeassistant.remote
description: 随着 Home Assistant 0.76 的发布，homeassistant.remote 包中的功能将被弃用，并将在 0.77 中移除。
date: 2018-08-13
authors:
  - Paulus Schoutsen
areas:
  - core
---

随着 Home Assistant 0.76 的发布，`homeassistant.remote` 包中的功能将被弃用，并将在 0.77 中移除。该包包含以非异步（non-async）方式调用 Home Assistant REST API 的函数。

移除的原因有两点：首先，这段代码在 Home Assistant 内部并没有被使用，因此不应成为 Home Assistant 的一部分。其次，它与新的身份验证（auth）系统不兼容，而我们也不想花费时间使其兼容。

如果你想继续使用 `homeassistant.remote` 中的方法，可以随意将[代码](https://github.com/home-assistant/core/blob/0.75.0/homeassistant/remote.py)复制到自己的项目中。
