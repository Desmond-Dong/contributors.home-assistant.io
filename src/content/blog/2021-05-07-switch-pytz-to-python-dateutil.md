---
title: 用 python-dateutil 替换 pytz
description: 三年前，Paul Ganssle 撰写了一篇关于 pytz 和 python-dateutil 时区处理对比的文章。
date: 2021-05-07
authors:
  - Paulus Schoutsen
areas:
  - core
---

三年前，Paul Ganssle 撰写了[一篇对比文章](https://blog.ganssle.io/articles/2018/03/pytz-fastest-footgun.html)，比较了 `pytz` 和 `python-dateutil` 在时区处理上的差异。在这篇文章中，他展示了如何很容易地以错误的方式使用 `pytz`，而且由于这种错误几乎是对的，因此很难被发现：

```python
import pytz
from datetime import datetime, timedelta

NYC = pytz.timezone('America/New_York')
dt = datetime(2018, 2, 14, 12, tzinfo=NYC)
print(dt)
# 2018-02-14 12:00:00-04:56
```

_[（链接到文章中解释为什么是 -4:56 的部分）](https://blog.ganssle.io/articles/2018/03/pytz-fastest-footgun.html#pytz-s-time-zone-model)_

在 Home Assistant 2021.6 中，我们将切换到 `python-dateutil`。如果您的自定义集成（integration）依赖于非官方接口 `my_time_zone.localize(my_dt)`，则需要升级您的自定义集成。请改用 Python 的官方方法 `my_dt.astimezone(my_time_zone)`。

属性 `hass.config.time_zone` 也将改为字符串，而不是时区对象。

感谢 [@bdraco] 帮助重启这项工作，并将这一变更[推过终点线](https://github.com/home-assistant/core/pull/49643)。我们在迁移过程中实际上还发现了几个 bug！同时感谢 Paul Ganssle 维护 `python-dateutil` 并撰写了这篇出色的文章。

[@bdraco]: https://github.com/bdraco

## 5 月 10 日更新

哇，时间过得真快！`python-dateutil` 的作者 Paul（也是那篇启发我们的博客文章的作者）向我们指出，Python 3.9 包含了升级后的时区处理功能，我们应该改用它。在 Nick 和 Paul 的帮助下，`python-dateutil` 再次被移除，改用 `zoneinfo`（[PR](https://github.com/home-assistant/core/pull/50387)）。
