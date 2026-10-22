---
title: 更新协调器现在支持重新触发
description: 启用防抖器（debouncer）的更新协调器（update coordinator）现在可以在一次更新正在进行时接受新的更新请求。
date: 2025-10-05
authors:
  - Joakim Plate
areas:
  - core
---

启用防抖器（debouncer）的更新协调器（update coordinator）现在可以在一次更新正在进行时接受新的更新请求。该请求会被排入队列，在当前更新完成后执行。

考虑以下情形：

```python
async def _update():
    a = await get_a()
    # A: User or other logic request a new update here through async_schedule_update()
    b = await get_b()
    return (a,b)
```

在时间戳 `A` 发起更新请求的用户或代码，期望所关联的实体会全部获取从那一刻起的新数据。然而，由于我们之前会忽略该请求，实体所拥有的 `a` 值数据可能来自被忽略的那次更新请求之前的时间。

为了避免这种情况，更新协调器现在会在正在执行更新的过程中收到请求时，额外调度一次更新。

这样做的一个附带效果是，现在可以在协调器的更新函数内部调度一次更新。这在例如更新过程中连接中断时会很有用：我们希望所有实体立即显示为不可用（unavailable），同时又希望尽快尝试重新连接，但把重连放在下一个更新周期中进行。
