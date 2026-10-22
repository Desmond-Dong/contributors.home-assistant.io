---
title: 弃用旧版设备追踪器平台 API
description: 旧版（非配置条目）设备追踪器平台 API 已被弃用，并将在 Home Assistant 2027.5 版本中移除。
date: 2026-04-20
authors:
  - Erik Montnémery
areas:
  - core
---

## 摘要

旧版（非配置条目）设备追踪器平台 API 已被弃用，并将在 Home Assistant 2027.5 版本中移除。
在 12 个月的弃用期结束时，所有剩余的旧版设备追踪器平台将从核心代码库中移除，实现旧版 API 的自定义集成将停止工作。

集成开发者需要更新集成，以实现[现代设备追踪器平台 API](/core/entities/device-tracker/)。

## 背景

配置条目设备追踪器于 2019 年 5 月引入，这意味着当支持在 2027 年 5 月移除时，集成开发者已有 8 年的时间来迁移集成。

截至今天（2026 年 4 月），大多数广泛使用的核心设备追踪器集成已经完成迁移。

请注意，尚未迁移的最受欢迎的集成 xiaomi_miio 具有广泛混合的功能，包括设备追踪器以外的其他功能。

弃用旧版设备追踪器 API 的提案已在[架构提案 1375](https://github.com/home-assistant/architecture/discussions/1375) 中获得批准。

### 核心集成列表，按报告使用量排序

该列表于 2026 年 3 月从 https://analytics.home-assistant.io/ 生成

```text
Integration                    Installations  API      Type               Details
----------------------------------------------------------------------------------------------------
mobile_app                           415,204  modern   tracker            TrackerEntity
mqtt                                 233,161  modern   tracker            TrackerEntity
zha                                  126,903  modern   scanner            ScannerEntity
ibeacon                               89,099  modern   unknown            BaseTrackerEntity
fritz                                 42,934  modern   scanner            ScannerEntity
ping                                  33,439  modern   scanner            ScannerEntity
unifi                                 33,136  modern   scanner            ScannerEntity
xiaomi_miio                           12,866  legacy   scanner            async_scan_devices
nmap_tracker                           7,397  modern   scanner            ScannerEntity
icloud                                 5,772  modern   tracker            TrackerEntity
freebox                                5,312  modern   scanner            ScannerEntity
asuswrt                                4,686  modern   scanner            ScannerEntity
tile                                   4,212  modern   tracker            TrackerEntity
renault                                3,646  modern   tracker            TrackerEntity
private_ble_device                     3,231  modern   unknown            BaseTrackerEntity
keenetic_ndms2                         3,080  modern   scanner            ScannerEntity
owntracks                              3,022  modern   tracker            TrackerEntity
snmp                                   2,923  legacy   scanner            async_scan_devices
devolo_home_network                    2,910  modern   scanner            ScannerEntity
tesla_fleet                            2,798  modern   tracker            TrackerEntity
netgear                                2,782  modern   scanner            ScannerEntity
mikrotik                               2,761  modern   scanner            ScannerEntity
tplink_omada                           2,708  modern   scanner            ScannerEntity
starlink                               2,250  modern   tracker            TrackerEntity
tractive                               2,144  modern   tracker            TrackerEntity
volvo                                  2,077  modern   tracker            TrackerEntity
husqvarna_automower                    1,924  modern   tracker            TrackerEntity
tessie                                 1,562  modern   tracker            TrackerEntity
bluetooth_le_tracker                   1,011  legacy
traccar_server                           978  modern   tracker            TrackerEntity
huawei_lte                               827  modern   scanner            ScannerEntity
gpslogger                                813  modern   tracker            TrackerEntity
teslemetry                               720  modern   tracker            TrackerEntity
traccar                                  609  modern   tracker            TrackerEntity
luci                                     590  legacy   scanner            scan_devices
subaru                                   502  modern   tracker            TrackerEntity
mysensors                                474  modern   tracker            TrackerEntity
starline                                 460  modern   tracker            TrackerEntity
geofency                                 443  modern   tracker            TrackerEntity
google_maps                              389  legacy
locative                                 378  modern   tracker            TrackerEntity
opnsense                                 355  legacy   scanner            scan_devices
fing                                     266  modern   scanner            ScannerEntity
ruckus_unleashed                         232  modern   scanner            ScannerEntity
synology_srm                             193  legacy   scanner            scan_devices
unifi_direct                             190  legacy   scanner            scan_devices
mqtt_json                                182  legacy
vodafone_station                         166  modern   scanner            ScannerEntity
xiaomi                                   143  legacy   scanner            scan_devices
demo                                     141  legacy
ubus                                     111  legacy   scanner            scan_devices
bt_smarthub                               95  legacy   scanner            scan_devices
aprs                                      93  legacy
nrgkick                                   81  modern   tracker            TrackerEntity
ddwrt                                     79  legacy   scanner            scan_devices
fressnapf_tracker                         74  modern   tracker            TrackerEntity
linksys_smart                             69  legacy   scanner            scan_devices
fortios                                   53  legacy   scanner            scan_devices
swisscom                                  51  legacy   scanner            scan_devices
tomato                                    45  legacy   scanner            scan_devices
quantum_gateway                           42  legacy   scanner            scan_devices
aruba                                     24  legacy   scanner            scan_devices
meraki                                    24  legacy
sky_hub                                   22  legacy   scanner            async_scan_devices
ituran                                    19  modern   tracker            TrackerEntity
cisco_ios                                 10  legacy   scanner            scan_devices
upc_connect                               10  legacy   scanner            async_scan_devices
cisco_mobility_express                     6  legacy   scanner            scan_devices
arris_tg2492lg                             2  legacy   scanner            async_scan_devices
bbox                                       1  legacy   scanner            scan_devices
actiontec                                  0  legacy   scanner            scan_devices
autoskope                                  0  modern   tracker            TrackerEntity
bt_home_hub_5                              0  legacy   scanner            scan_devices
cppm_tracker                               0  legacy   scanner            scan_devices
fleetgo                                    0  legacy
hitron_coda                                0  legacy   scanner            scan_devices
lojack                                     0  modern   tracker            TrackerEntity
thomson                                    0  legacy   scanner            scan_devices
```
