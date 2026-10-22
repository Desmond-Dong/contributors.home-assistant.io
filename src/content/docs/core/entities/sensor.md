---
title: 传感器实体
description: 报告只读值（如温度、功率读数或时间戳）及其单位，并可选择加入长期统计。
sidebarLabel: Sensor
sidebarGroup: Sensors and status
---

传感器（sensor）是一种只读实体（entity），用于报告某个值：温度、插头消耗的功率、设备上次启动的时间，或固定文本状态列表中的某一个状态。它可以带有测量单位，Home Assistant 会将该单位转换为用户偏好的单位。请继承从 `homeassistant.components.sensor` 导入的 `SensorEntity`。

当值具有两种以上的状态且用户无法更改它时，请使用传感器。只有两种状态的是[二进制传感器](/core/entities/binary-sensor/)。用户可以设置的值则是[数字](/core/entities/number/)、[选择](/core/entities/select/)或[文本](/core/entities/text/)实体。

## 属性

您以 _原生_ 单位设置值，即设备或服务报告的单位。切勿自行设置 `state` 或 `unit_of_measurement`：基类拥有它们，会将原生值转换为用户想要的单位，并对结果进行校验。

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `native_value` | `str \| int \| float \| date \| datetime \| Decimal \| None` | 必填 | 该值，以 `native_unit_of_measurement` 表示。设备类（device class）可以限制允许的类型。 |
| `device_class` | `SensorDeviceClass \| None` | `None` | 传感器测量的对象。参见[设备类](#device-classes)。 |
| `native_unit_of_measurement` | `str \| None` | `None` | `native_value` 的单位。如果您提供了翻译后的单位（见下文），请将其留空。 |
| `state_class` | `SensorStateClass \| None` | `None` | 该值的种类。设置它会将传感器标记为数值型，并选择加入[长期统计](#long-term-statistics)。 |
| `last_reset` | `datetime \| None` | `None` | 累计型传感器开始新计量周期的时间。仅允许与 `SensorStateClass.TOTAL` 一起使用。 |
| `options` | `list[str] \| None` | `None` | 具有 `enum` 设备类的传感器的可能状态。不能与状态类（state class）或单位同时使用。 |
| `suggested_display_precision` | `int \| None` | `None` | 前端显示的小数位数。状态本身不会四舍五入。 |
| `suggested_unit_of_measurement` | `str \| None` | `None` | 显示值所用的单位，用于替代单位系统原本会选择的单位。首次发现该传感器时存储到实体注册表（entity registry）中，此后仅在用户更改单位系统时更新。 |

每个实体都具有的通用属性（如 `name` 或 `available`）位于[实体类](/core/entities/entity-class/)中。

传感器永远不能具有 `config` [实体类别](/glossary/entity-category/)：Home Assistant 会拒绝添加它。对于信号强度之类的传感器，请使用 `EntityCategory.DIAGNOSTIC`。

### 单位

基类按以下顺序选择显示的单位：

1. 用户在实体设置中设置的单位。
2. 初始单位，对于具有唯一 ID 的传感器，它存储在实体注册表中：即 `suggested_unit_of_measurement`，否则为用户单位系统针对该设备类偏好的单位。没有唯一 ID 的传感器直接使用 `suggested_unit_of_measurement`。
3. 用户单位系统的温度单位，适用于具有 `temperature` 设备类且原生单位为 °C 或 °F 的传感器。
4. 翻译后的单位：即 `strings.json` 中 `entity` 部分名称旁的 `unit_of_measurement` 键，通过 `translation_key` 查找。对于单词形式的单位（如 “steps”），请使用这种方式。具有翻译单位的传感器不得设置 `native_unit_of_measurement`。
5. `native_unit_of_measurement`。

对于设备类带有单位转换器的传感器，用户都可以更改其单位，只要原生单位和新单位对该设备类均有效。

请使用来自 `homeassistant.const` 的单位常量，如 `UnitOfTemperature.CELSIUS`，而不要将单位写成字符串。仅外形与受支持单位相同的自定义字符串（如用 `KWh` 代替 `kWh`）会被视为不同的单位。

### 恢复值

要在重启后恢复该值，请继承 `RestoreSensor` 而不是 `RestoreEntity`。`RestoreEntity` 存储的是转换后的状态，其单位可能与原生值不同。请在 `async_added_to_hass` 中调用 `await self.async_get_last_sensor_data()`，以取回 `native_value` 和 `native_unit_of_measurement`。

### 实体属性

不要为经常变化的值向传感器添加 `extra_state_attributes`。每一次带有属性变化的状态变更都会写入数据库。请改为创建另一个传感器。参见[状态和属性](/core/entities/state-attributes/)。

## 支持的功能

此实体没有支持的功能。

## 设备类

[设备类](/glossary/device-class/)告诉 Home Assistant 传感器测量的是什么。它设置了图标、单位转换，以及前端显示该值的方式。具有设备类且没有名称的传感器以其设备类命名，`enum` 除外。参见[命名](/core/entities/naming/)。

设置设备类时，单位必须是为其列出的单位之一，且状态类必须是该设备类允许的状态类之一。如果不匹配，Home Assistant 会记录一条警告。

非数值型设备类不接受单位，也不接受状态类：

| 设备类 | 描述 |
| --- | --- |
| `SensorDeviceClass.DATE` | 日期。`native_value` 必须是 `datetime.date`。 |
| `SensorDeviceClass.ENUM` | 固定文本状态列表中的某一个状态。设置 `options`。 |
| `SensorDeviceClass.TIMESTAMP` | 某一时刻。`native_value` 必须是带时区的 `datetime`。 |
| `SensorDeviceClass.UPTIME` | 设备上次启动的时间，以带时区的 `datetime` 表示。两次更新之间小于 60 秒的变化会被忽略，因此由运行时间计数器计算出的启动时间不会在每次更新时都改变状态。将 `_attr_uptime_drift_tolerance` 设置为秒数可更改该容差（至少为 5）。 |

数值型设备类及其单位：

| 设备类 | 单位 | 描述 |
| --- | --- | --- |
| `ABSOLUTE_HUMIDITY` | g/m³, mg/m³ | 绝对湿度 |
| `APPARENT_POWER` | mVA, VA, kVA | 视在功率 |
| `AQI` | 无 | 空气质量指数 |
| `AREA` | mm², cm², m², km², in², ft², yd², mi², ac, ha | 面积 |
| `ATMOSPHERIC_PRESSURE` | Pa, hPa, kPa, mPa, cbar, mbar, bar, psi, inHg, inH₂O, mmHg, atm | 大气压 |
| `BATTERY` | % | 电池剩余电量 |
| `BLOOD_GLUCOSE_CONCENTRATION` | mg/dL, mmol/L | 血糖浓度 |
| `CO` | ppb, ppm, μg/m³, mg/m³ | 一氧化碳浓度 |
| `CO2` | ppm | 二氧化碳浓度 |
| `CONDUCTIVITY` | S/cm, mS/cm, μS/cm | 电导率 |
| `CURRENT` | A, mA, μA | 电流 |
| `DATA_RATE` | bit/s, kbit/s, Mbit/s, Gbit/s, B/s, kB/s, MB/s, GB/s, KiB/s, MiB/s, GiB/s | 数据速率 |
| `DATA_SIZE` | bit, kbit, Mbit, Gbit, B, kB, MB, GB, TB, PB, EB, ZB, YB, KiB, MiB, GiB, TiB, PiB, EiB, ZiB, YiB | 数据大小 |
| `DISTANCE` | mm, cm, m, km, in, ft, yd, mi, nmi | 距离 |
| `DURATION` | μs, ms, s, min, h, d | 一段时间。它应只在设备报告新值时变化，而不是随时间流逝而变化。 |
| `ENERGY` | J, kJ, MJ, GJ, mWh, Wh, kWh, MWh, GWh, TWh, cal, kcal, Mcal, Gcal, thm | 使用或产生的能量，如电表。不要与功率混淆。 |
| `ENERGY_DISTANCE` | kWh/100km, Wh/km, mi/kWh, km/kWh | 每距离消耗的能量，如电动汽车的能耗 |
| `ENERGY_STORAGE` | 与 `ENERGY` 相同 | 储存的能量，如家用电池中的电量 |
| `FREQUENCY` | mHz, Hz, kHz, MHz, GHz | 频率 |
| `GAS` | L, m³, ft³, CCF, MCF | 燃气体积。以 kWh 计量的燃气属于 `ENERGY`。 |
| `HUMIDITY` | % | 相对湿度 |
| `ILLUMINANCE` | lx | 光照度 |
| `IRRADIANCE` | W/m², BTU/(h⋅ft²) | 辐照度 |
| `MOISTURE` | % | 湿度 |
| `MONETARY` | 一种 ISO 4217 货币代码 | 货币 |
| `NITROGEN_DIOXIDE` | ppb, ppm, μg/m³ | 二氧化氮浓度 |
| `NITROGEN_MONOXIDE` | ppb, μg/m³ | 一氧化氮浓度 |
| `NITROUS_OXIDE` | μg/m³ | 一氧化二氮浓度 |
| `OZONE` | ppb, ppm, μg/m³ | 臭氧浓度 |
| `PH` | 无 | 水溶液的 pH 值 |
| `PM1`, `PM25`, `PM4`, `PM10` | μg/m³ | 小于 1、2.5、4 或 10 微米的颗粒物 |
| `POWER` | mW, W, kW, MW, GW, TW | 功率 |
| `POWER_FACTOR` | %, 无 | 功率因数 |
| `PRECIPITATION` | mm, cm, in | 累积降水量 |
| `PRECIPITATION_INTENSITY` | mm/h, mm/d, in/h, in/d | 降水强度 |
| `PRESSURE` | 与 `ATMOSPHERIC_PRESSURE` 相同 | 压力 |
| `RADON` | Bq/m³, pCi/L | 氡浓度 |
| `REACTIVE_ENERGY` | varh, kvarh | 无功电能 |
| `REACTIVE_POWER` | mvar, var, kvar | 无功功率 |
| `SIGNAL_STRENGTH` | dB, dBm | 信号强度 |
| `SOUND_PRESSURE` | dB, dBA | 声压 |
| `SPEED` | mm/s, in/s, ft/s, m/s, m/min, km/h, mph, kn, Beaufort, mm/h, mm/d, in/h, in/d | 速度 |
| `SULPHUR_DIOXIDE` | ppb, μg/m³ | 二氧化硫浓度 |
| `TEMPERATURE` | °C, °F, K | 温度 |
| `TEMPERATURE_DELTA` | °C, °F, K | 两个温度之差 |
| `VOLATILE_ORGANIC_COMPOUNDS` | μg/m³, mg/m³ | 挥发性有机化合物，以浓度表示 |
| `VOLATILE_ORGANIC_COMPOUNDS_PARTS` | ppb, ppm | 挥发性有机化合物，以比率表示 |
| `VOLTAGE` | μV, mV, V, kV, MV | 电压 |
| `VOLUME` | mL, L, fl. oz., gal, m³, ft³, CCF, MCF | 使用的体积，如汽车消耗的燃油量 |
| `VOLUME_FLOW_RATE` | mL/s, L/s, L/min, L/h, m³/s, m³/min, m³/h, ft³/min, gal/min, gal/h, gal/d | 流量，如当前流经管道的水 |
| `VOLUME_STORAGE` | 与 `VOLUME` 相同 | 储存的体积，如油箱中的燃油 |
| `WATER` | L, gal, m³, ft³, CCF, MCF | 用水量 |
| `WEIGHT` | μg, mg, g, kg, oz, lb, st | 质量。之所以称为重量（weight），是因为这是日常用语。 |
| `WIND_DIRECTION` | ° | 风向。当风太小而无法测量方向时，报告 `None`。 |
| `WIND_SPEED` | mm/s, in/s, ft/s, m/s, m/min, km/h, mph, kn, Beaufort | 风速 |

每个设备类允许的状态类位于 `homeassistant/components/sensor/const.py` 中的 `DEVICE_CLASS_STATE_CLASSES`。大多数只允许 `measurement`。`AREA`、`DATA_SIZE`、`DISTANCE`、`DURATION` 和 `PRECIPITATION` 允许所有状态类，而 `WEIGHT` 允许 `measurement`、`total` 和 `total_increasing`。进行累加计数的设备类（如 `ENERGY`、`GAS`、`WATER`、`VOLUME` 和 `REACTIVE_ENERGY`）只允许 `total` 和 `total_increasing`。`MONETARY` 只允许 `total`，`WIND_DIRECTION` 只允许 `measurement_angle`。

## 状态类

[状态类](/glossary/state-class/)说明该值是哪一种数字。请谨慎选择：它决定了 Home Assistant 保留哪些统计数据。

| 状态类 | 适用场景 |
| --- | --- |
| `SensorStateClass.MEASUREMENT` | 当前测量的值，如当前温度或功率。不是预测值，也不是像昨日总量那样的聚合值。 |
| `SensorStateClass.MEASUREMENT_ANGLE` | 当前测量的以度为单位的角度，如风向。 |
| `SensorStateClass.TOTAL` | 可以增减的总量，如净电能表。 |
| `SensorStateClass.TOTAL_INCREASING` | 只会增加并会不时从 0 重新开始的总量，如按日计的燃气表。 |

在大多数情况下，您需要的是 `MEASUREMENT`，或不带 `last_reset` 的 `TOTAL`。

## 长期统计

具有状态类的传感器会获得长期统计（long-term statistics），每 5 分钟编译一次。对于某些设备类，统计数据的单位会被归一化，因此具有不同单位的传感器可以显示在同一张图表中。

- **测量值**（`MEASUREMENT` 和 `MEASUREMENT_ANGLE`）会获得每个周期的最小值、最大值和平均值。
- **总量**（`TOTAL` 和 `TOTAL_INCREASING`）会获得不断累计的 `sum`。首次编译统计时的值即为零点。

### 在不同总量类之间选择

- 值从不重置，如设备整个生命周期的能耗：使用 `TOTAL`，不带 `last_reset`。
- 值只增不减，且有时会重置为 0，如与账单月对齐的电能表：使用 `TOTAL_INCREASING`。
- 值有增有减，并在已知时刻重置，如每个账单月的净电能：使用 `TOTAL`，并在重置时更新 `last_reset`。
- 每次更新都是一个新周期，如最后一分钟消耗的电能：使用 `TOTAL`，并在每次状态变化时更新 `last_reset`。

对于 `TOTAL`，总和按新值与旧值之差增长。当 `last_reset` 变化时，新周期从 0 开始：重置后的第一个值会全额计入。在下表的 16:00 处，3 已经被计入。

| 时间 | 状态 | `last_reset` | 总和 |
| --- | --- | --- | --- |
| 13:00 | 1000 | 13:00 | 0 |
| 14:00 | 1010 | 13:00 | 10 |
| 15:00 | 1005 | 13:00 | 5 |
| 16:00 | 3 | 16:00 | 8 |
| 17:00 | 8 | 16:00 | 13 |

对于 `TOTAL_INCREASING`，值的下降会开始一个新的计量周期，该周期同样从 0 开始计数，因此下降后的第一个值会全额计入。小于 10% 的下降被视为噪声，而不是重置。请确保您根据有噪声的读数计算出的值不会意外下降。

| 时间 | 状态 | 总和 |
| --- | --- | --- |
| 13:00 | 1000 | 0 |
| 14:00 | 1010 | 10 |
| 15:00 | 2 | 12 |
| 16:00 | 7 | 17 |

### 迁移到受支持的单位

如果您的集成（integration）之前使用自定义单位字符串，而现在已经迁移到受支持的单位，统计会将其视为单位变更，并停止为该传感器编译。要避免这种情况，请在您的集成中添加一个带有 `async_custom_equivalent_units` 函数的 `recorder.py` 平台。它按实体 ID 返回旧单位与受支持单位之间的对应关系。

```python
from homeassistant.const import UnitOfEnergy
from homeassistant.core import HomeAssistant, callback


@callback
def async_custom_equivalent_units(
    hass: HomeAssistant,
) -> dict[str, dict[str | None, str]]:
    """Return custom equivalent units per entity ID."""
    return {
        "sensor.example_energy": {"KWh": UnitOfEnergy.KILO_WATT_HOUR},
    }
```

## 方法

传感器没有动作（action），因此除了保持 `native_value` 为最新之外，无需实现任何其他内容。可以在 `update` 或 `async_update` 中获取数据，或使用 `async_write_ha_state` 推送数据。参见[更新状态](/core/entities/state-updates/)。

## 状态

状态是 `native_value`，并已转换为向用户显示的单位。日期和时间戳以 ISO 8601 字符串的形式写入，时间戳会转换为 UTC。`None` 值显示为 `unknown`。

## 示例

一个从设备读取其值的温度传感器：

```python
from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.const import UnitOfTemperature


class ExampleTemperatureSensor(SensorEntity):
    """Temperature of an example device."""

    _attr_has_entity_name = True
    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
    _attr_suggested_display_precision = 1

    def __init__(self, device: ExampleDevice) -> None:
        """Initialize the sensor."""
        self._device = device
        self._attr_unique_id = f"{device.serial}_temperature"

    async def async_update(self) -> None:
        """Fetch the latest temperature."""
        self._attr_native_value = await self._device.get_temperature()
```

该传感器没有名称，因此以其设备类命名：“Temperature”。
