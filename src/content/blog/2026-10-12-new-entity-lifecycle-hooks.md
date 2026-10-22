---
title: "新的实体生命周期钩子"
description: "新增了两个实体生命周期钩子：async_prepare_to_add_to_hass 和 async_entity_id_changed。"
date: 2026-10-12
authors:
  - Erik Montnémery
areas:
  - core
---

## 摘要

新增了两个实体（entity）生命周期钩子：

- `Entity.async_prepare_to_add_to_hass` 允许集成（integration）在实体添加到 Home Assistant *之前*运行代码。它从 Home Assistant Core 2026.10 开始提供。
- 当实体的 `entity_id` 在实体注册表中被更改时，会调用 `Entity.async_entity_id_changed`。从 Home Assistant Core 2026.11 开始，当实体的 `entity_id` 被更改时，不再将其移除并重新添加，而是就地更新。

实现了 `async_prepare_to_add_to_hass`、`async_added_to_hass` 或 `async_will_remove_from_hass` 的自定义集成需要通过实现 `async_entity_id_changed` 来选择加入就地 `entity_id` 更改。在此之前，当 `entity_id` 更改时，它们的实体仍会被移除并重新添加。此向后兼容性将在 Home Assistant Core 2027.11 中移除。

生命周期钩子记录在[实体生命周期钩子](/core/entities/lifecycle/)中。

## 在实体添加前运行代码

### 新钩子

```python
async def async_prepare_to_add_to_hass(self) -> None:
    """Run before the entity is added to hass."""
```

`async_prepare_to_add_to_hass` 在每次添加尝试时都会被等待，在实体平台处理该次添加尝试的实体注册表条目之前，以及在实体的状态写入状态机之前。当钩子运行时，实体的 `hass` 和 `platform` 属性会被分配，但钩子不能依赖 `entity_id` 或 `registry_entry`：根据实体的添加方式，它们可能未设置、由集成设置，或是从早期添加中遗留下来的。

与 `async_added_to_hass` 不同，该钩子也会为将被中止的添加运行，例如因为实体在实体注册表中被禁用，或者因为其 `entity_id` 或 `unique_id` 与已添加的实体冲突。这就是为什么它对于无论实体最终是否被添加都必须发生的工作很有用，但这也意味着钩子中的代码不能假设添加会完成。

从钩子中引发异常会中止添加。

这是在核心 [PR #182156](https://github.com/home-assistant/core/pull/182156) 中实现的，其基本原理在架构提案 [home-assistant/architecture#1480](https://github.com/home-assistant/architecture/discussions/1480) 中进行了描述。

### 清理

由于添加可能会被中止，因此对于已运行 `async_prepare_to_add_to_hass` 的实体，不保证会运行 `async_will_remove_from_hass`。在钩子中设置的任何内容的清理都应使用 `async_on_remove` 进行注册，当添加被中止以及成功添加的实体被移除时，都会调用它：

```python
async def async_prepare_to_add_to_hass(self) -> None:
    """Run before the entity is added to hass."""
    await super().async_prepare_to_add_to_hass()
    unsubscribe = self._device.subscribe(self._handle_update)
    self.async_on_remove(unsubscribe)
```

### 从 `add_to_platform_start` 迁移

到目前为止，集成通过重写 `Entity.add_to_platform_start` 来实现在实体添加前运行代码。该方法是实体平台辅助元素的实现细节，不应被重写。重写它的集成应改为重写 `async_prepare_to_add_to_hass`。新钩子不接受任何参数；使用 `self.hass` 和 `self.platform` 代替 `hass` 和 `platform` 参数，并使用 `self.parallel_updates` 代替 `parallel_updates`。

修改前：

```python
@callback
def add_to_platform_start(
    self,
    hass: HomeAssistant,
    platform: EntityPlatform,
    parallel_updates: asyncio.Semaphore | None,
) -> None:
    """Start adding an entity to a platform."""
    super().add_to_platform_start(hass, platform, parallel_updates)
    _async_register_thing(hass, platform.platform_name, self.unique_id)
```

修改后：

```python
async def async_prepare_to_add_to_hass(self) -> None:
    """Run before the entity is added to hass."""
    await super().async_prepare_to_add_to_hass()
    _async_register_thing(self.hass, self.platform.platform_name, self.unique_id)
```

## 就地更改实体 ID

到目前为止，当实体的 `entity_id` 在实体注册表中被更改时，实体会被移除，然后在其新的 `entity_id` 下重新添加。这会再次运行实体的整个移除和添加生命周期，包括 `async_will_remove_from_hass` 和 `async_added_to_hass`，即使对于大多数实体来说，除了 `entity_id` 本身之外没有任何需要更改的内容。

从 Home Assistant Core 2026.11 开始，实体将改为就地更新。Home Assistant 会移除旧 `entity_id` 下的状态，将 `self.entity_id` 设置为新的 `entity_id`，将其自身的内部记录（实体注册表和设备注册表跟踪、实体源、恢复状态和实体组）移动到新的 `entity_id`，并在新 `entity_id` 下写入状态。不会调用 `async_will_remove_from_hass` 和 `async_added_to_hass`。

这是在核心 [PR #183946](https://github.com/home-assistant/core/pull/183946)、[PR #184943](https://github.com/home-assistant/core/pull/184943) 和 [PR #185462](https://github.com/home-assistant/core/pull/185462) 中实现的，其基本原理在架构提案 [home-assistant/architecture#1393](https://github.com/home-assistant/architecture/discussions/1393) 中进行了描述。

### 新钩子

已设置任何以其自身 `entity_id` 为键的内容的实体可以实现一个新的回调来更新它：

```python
@callback
def async_entity_id_changed(self, old_entity_id: str) -> None:
    """Run when the entity_id has been changed in the entity registry."""
```

在 Home Assistant 移除旧 `entity_id` 下的状态、移动其自身的内部记录并运行 `async_registry_entry_updated` 之后，会调用 `async_entity_id_changed`。`self.entity_id` 已经是新的 `entity_id`，之前的 `entity_id` 作为 `old_entity_id` 传递。使用它来更新状态或属性派生自的任何内容，例如以 `self.entity_id` 为键的状态更改侦听器或调度程序信号。

从钩子写入状态是可选的：如果当钩子返回时未在新 `entity_id` 下写入状态，Home Assistant 会写入它。需要实体在新 `entity_id` 下的自身状态的工作，例如渲染引用 `this` 的模板，应首先使用 `self.async_write_ha_state()` 写入状态。

必须等待的工作可以在任务中完成；由于实体注册表更新不与其序列化，请在每次 `await` 之后检查实体是否仍被添加，以及 `self.entity_id` 是否未再次更改。

钩子必须调用 `super()`，以便基类可以更新其自身的内部记录。如果钩子写入状态，则必须在执行此操作之前调用 `super()`。

钩子引发的异常会被 Home Assistant 捕获并记录，并且 `entity_id` 更改仍会完成：状态会在新 `entity_id` 下写入。这与 `async_prepare_to_add_to_hass` 不同，在后者中引发异常会中止添加。

示例：

```python
async def async_added_to_hass(self) -> None:
    """Run when the entity has been added to hass."""
    await super().async_added_to_hass()
    self._subscribe_signal()
    self.async_on_remove(lambda: self._unsub_signal())

@callback
def _subscribe_signal(self) -> None:
    """Subscribe to the signal for the current entity_id."""
    self._unsub_signal = async_dispatcher_connect(
        self.hass, f"{DOMAIN}_{self.entity_id}", self._handle_signal
    )

@callback
def async_entity_id_changed(self, old_entity_id: str) -> None:
    """Run when the entity_id has been changed in the entity registry."""
    super().async_entity_id_changed(old_entity_id)
    self._unsub_signal()
    self._subscribe_signal()
```

请注意，使用 `async_on_remove` 注册的回调会调用当前的任何取消订阅函数。传递取消订阅函数本身，如 `self.async_on_remove(self._unsub_signal)`，会注册初始订阅的取消订阅函数：在 `entity_id` 更改后，移除实体会再次调用该过时的函数，并且新订阅会泄漏。

### 向后兼容性

如果其实体的添加和移除钩子依赖于其 `entity_id`，那么如果它被静默就地更改，将会中断。为了给自定义集成时间进行迁移，如果自定义集成自身类层次结构中的类之一实现了 `async_prepare_to_add_to_hass`、`async_added_to_hass` 或 `async_will_remove_from_hass`，则当自定义集成的实体的 `entity_id` 更改时，仍会将其移除并重新添加，除非同一个类或其子类也实现了 `async_entity_id_changed`。Home Assistant Core 提供的基类（如 `SensorEntity` 或 `CoordinatorEntity`）不计入在内，核心集成的实体始终就地更改。

自定义集成作者应检查其实体是否设置了任何以其自身 `entity_id` 为键的内容，然后实现 `async_entity_id_changed`。如果不需要更新任何内容，将其实现为仅调用 `super()` 的方法就足以选择加入：

```python
@callback
def async_entity_id_changed(self, old_entity_id: str) -> None:
    """Opt in to in-place entity_id changes."""
    super().async_entity_id_changed(old_entity_id)
```

此向后兼容性将在 Home Assistant Core 2027.11 中移除。此后，所有实体的 `entity_id` 都将就地更改。

## 使用哪个钩子

根据经验：

- 使用 `async_added_to_hass` 进行常规设置工作：恢复状态、订阅更新、注册侦听器、获取初始数据。它在添加尝试的最后一步运行，在实体拥有其 `entity_id` 和实体注册表条目之后。它不会为较早中止的添加调用，例如因为实体被禁用，但添加在开始后仍可能失败：如果它引发异常、如果添加被取消，或者如果写入第一个状态引发异常。
- 使用 `async_will_remove_from_hass` 在成功添加的实体被移除时撤消在 `async_added_to_hass` 中完成的工作。当添加失败时不会调用它。
- 仅当工作确实必须在实体平台处理实体的注册表条目之前发生，或者即使实体被禁用也必须发生时，才使用 `async_prepare_to_add_to_hass`。
- 使用 `async_on_remove` 进行清理，该清理必须在添加被中止或失败以及实体被移除时运行。这是在 `async_prepare_to_add_to_hass` 或 `async_added_to_hass` 中设置的任何内容的安全选择。
- 使用 `async_entity_id_changed` 在实体的 `entity_id` 更改时更新任何以其自身 `entity_id` 为键的内容。如果工作需要新 `entity_id` 下的状态，请先使用 `self.async_write_ha_state()` 写入它。
- 不要重写 `add_to_platform_start`、`add_to_platform_finish` 或 `add_to_platform_abort`。
