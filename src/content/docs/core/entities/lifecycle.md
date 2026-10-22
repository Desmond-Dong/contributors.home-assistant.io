---
title: 实体生命周期
description: Home Assistant 添加和移除实体时会发生什么，以及你用来订阅、清理和响应注册表（registry）变化的钩子（hook）。
sidebarLabel: Lifecycle
sidebarGroup: Basics
order: 4
---

你在集成（integration）的平台设置中创建实体（entity）对象，并通过 `async_add_entities` 把它们交给 Home Assistant。从那时起，由 Home Assistant 决定实体何时被添加、更新和移除。生命周期钩子（lifecycle hooks）让你能在这些时刻运行代码。所有这些钩子都是可选的。

## 添加实体

当你把实体传给 `async_add_entities` 时，Home Assistant 会经过以下步骤：

1. 它为实体设置其 `hass` 和 `platform` 属性。
2. 它调用 `async_prepare_to_add_to_hass()`。
3. 如果你传入了 `update_before_add=True`，它会调用更新方法。如果更新抛出异常，添加过程在此停止。
4. 如果实体具有唯一 ID（unique ID），它会在[注册表](/core/entities/registry/)中注册设备和实体，并选定实体 ID（entity ID）。如果实体已被禁用，或者其唯一 ID 或实体 ID 已被占用，添加过程在此停止。
5. 它调用 `async_added_to_hass()`。
6. 它写入第一个状态。

你的 `__init__` 在这一切之前运行，因此 `self.hass` 和 `self.entity_id` 在那里还没有被设置。让 `__init__` 只负责存储实体所需的内容，其余工作放在钩子中完成。

### `async_added_to_hass()`

最主要的钩子。它只在添加成功时运行，就在第一个状态被写入之前。到那时实体已经有了自己的实体 ID 和注册表条目。用它来订阅更新、注册监听器，或恢复先前的状态。

```python
async def async_added_to_hass(self) -> None:
    """Subscribe to the device once the entity is added."""
    await super().async_added_to_hass()
    self.async_on_remove(
        self._device.subscribe(self._handle_update)
    )
```

当你继承的类也可能实现该钩子时，例如 `CoordinatorEntity` 或 `RestoreEntity`，要调用 `super()`。

由于被禁用的实体永远不会被添加，如果你的集成需要保留对某个实体的引用，这个钩子也是合适的位置。你在这里注册的任何内容，只会为实际正在运行的实体注册。

### `async_prepare_to_add_to_hass()`

在 Home Assistant 查看注册表之前，每次尝试添加实体时都会运行。对于最终不会被添加的实体它也会运行，例如因为它们被禁用了。你很少需要用到它。如果你在这里设置了任何内容，请用 `async_on_remove` 注册其清理逻辑，因为当添加被中止时 `async_will_remove_from_hass` 不会运行。

## 移除实体

实体会在这几种情况下被移除：其配置条目（config entry）卸载时、用户将其禁用时，或者它被从实体注册表中删除时。停止 Home Assistant 并不会移除实体，因此这些钩子不会在关机时运行。如果必须在关机时执行某些操作，请监听 `EVENT_HOMEASSISTANT_STOP`。当实体被移除时，Home Assistant 会：

1. 调用所有通过 `async_on_remove` 注册的回调。
2. 调用 `async_will_remove_from_hass()`。
3. 移除状态。或者，当实体仍在注册表中且处于启用状态时（例如配置条目只是被卸载的情况），它会将状态设置为 `unavailable` 并带有 `restored` 属性。

### `async_on_remove(func)`

注册一个在实体被移除或添加被中止时要调用的函数。大多数订阅辅助函数（subscription helpers）会返回一个取消订阅的函数，你可以直接把它传入。这是确保你不会泄漏监听器的最干净的方式。

### `async_will_remove_from_hass()`

`async_added_to_hass` 的对应钩子。用它来撤销 `async_on_remove` 无法完成的工作，例如关闭仅属于该实体的连接。

### `async_removed_from_registry()`

在实体被从实体注册表中删除时运行，而不仅仅是暂时移除。用它来清理存储在实体之外的数据，例如一个文件或设备上一个只对该实体有意义的设置。

## 注册表变化

用户可以在实体运行时在注册表中更改它：重命名它、给它换一个实体 ID、更改它的选项。

### `async_registry_entry_updated()`

在实体的注册表条目发生更改之后运行。`self.registry_entry` 中保存着新的条目。当你的实体依赖于注册表选项时使用它，例如用户选择的单位或精度。

### `async_entity_id_changed(old_entity_id)`

在用户更改了实体 ID 时运行。到那时，`self.entity_id` 已经是新 ID，Home Assistant 也已将自身的内部记录转移到该 ID 上。如果你按实体 ID 跟踪某些内容，例如你自己实体上的状态变化监听器，请在这里把它移动到新 ID 并调用 `super()`。该方法不能使用 await。Home Assistant 会在它返回之后把状态写入新 ID。

## 恢复状态

有些实体必须在重启后仍记住自己的状态，因为设备无法告诉它们。同时还要继承 `homeassistant.helpers.restore_state` 中的 `RestoreEntity`，并在 `async_added_to_hass` 中读取最后一个状态：

```python
from homeassistant.helpers.restore_state import RestoreEntity


class ExampleSwitch(SwitchEntity, RestoreEntity):
    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        if (last_state := await self.async_get_last_state()) is not None:
            self._attr_is_on = last_state.state == "on"
```

传感器（sensor）实体则使用 `RestoreSensor`，并通过 `RestoreSensor.async_get_last_sensor_data()` 读取最后一个状态，它还会恢复原生值（native value）和单位。参见[传感器实体](/core/entities/sensor/)。
