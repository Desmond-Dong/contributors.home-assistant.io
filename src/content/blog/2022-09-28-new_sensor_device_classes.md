---
title: 新增的传感器设备类别
description: "已新增以下几种传感器设备类别："
date: 2022-09-28
authors:
  - Erik Montnémery
areas:
  - core
---

已新增以下几种传感器设备类别：
 - `distance`（距离），以 `cm`、`ft`、`in`、`km`、`m`、`mi`、`mm`、`yd` 中的任一单位测量的距离
 - `speed`（速度），以 `ft/s`、`in/d`、`in/h`、`km/h`、`kn`、`m/s`、`mm/d`、`mph` 中的任一单位测量的速度
 - `volume`（体积），以 `fl. oz.`、`ft³`、`gal`、`L`、`mL`、`m³` 中的任一单位测量的体积
 - `weight`（重量），以 `g`、`kg`、`lb`、`mg`、`oz`、`µg` 中的任一单位测量的质量

 与 `pressure` 和 `temperatures` 传感器一样，用户可以在 UI 中为使用任一新设备类别的传感器自由选择显示单位。

### 长期统计

 长期统计（long term statistics）会将 `distance` 存储为 `m`，将 `speed` 存储为 `m/s`，将 `volume` 存储为 `m³`，并将 `weight` 存储为 `g`。
 对于被修改为任一新设备类别的现有传感器，统计将继续以传感器的 `state_unit` 记录，但用户可以选择将现有统计转换为标准化单位。
