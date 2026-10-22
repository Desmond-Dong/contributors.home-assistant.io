---
title: 我可以拥有用户权限吗？
description: 自 Home Assistant 0.82（2018 年 11 月发布）以来，Home Assistant 就已拥有用户权限系统。
date: 2019-03-11
authors:
  - Paulus Schoutsen
areas:
  - core
---

自 Home Assistant 0.82（2018 年 11 月发布）以来，Home Assistant 就已拥有用户权限系统。权限附加在组上，一个用户可以属于多个组，用户权限基于合并其所有组的权限策略。更多详细信息可以在[我们的文档](/core/internals/permissions/)中找到。用户可以创建自己的组，但也有三个系统组："admin"（管理员）、"users"（用户，0.90 新增）和 "read-only"（只读）。这三者都可以访问所有实体（entity），但只读组无法控制其中任何一个。只有属于 admin 组的用户才能访问管理选项，例如管理用户和集成（integration）。

在 Home Assistant 0.90 之前，我们并没有使用其中任何功能。相反，所有用户都属于 admin 组，因为该组提供的访问权限与我们拥有权限系统之前相同。在 0.90 中，我们将允许在系统组 "admin" 和 "users" 之间切换用户组。当用户属于 "users" 组时，他们将无法管理 Home Assistant。UI 会隐藏用于打开配置面板或开发者工具的菜单项。

![显示 users 组中用户的屏幕截图](/img/en/blog/2019-03-user-permissions/screenshot.png)

然而，这项功能尚未完成。我们需要审计 Home Assistant 的代码，以确保所有 API 和服务（service）调用都会检查用户权限。因此，尽管用户将无法使用 UI 进行更改，但仍可能存在可以在没有权限的情况下访问的 API。而且我们不仅需要检查 Home Assistant 的代码，注册了服务或 API 的自定义组件也必须更新。

所以这正是您可以帮忙的地方！如果您在维护一个集成，无论是自定义的还是内置的，请阅读[关于如何检查权限的文档](/core/internals/permissions/#check-a-permission)。然后检查您的集成是否恰当地检查了权限。当您检查完自己的之后，请帮助他人检查他们的，并帮助我们审计 Home Assistant 中的所有服务和 API 调用。

## 那么自定义组呢？

尽管我们支持创建自定义组，但不要指望它会很快公开开放。原因在于，这需要对与自定义策略交互的 API 进行大量的工作。最难的部分是，自定义策略可能仅允许对少数几个实体进行读取访问，并且只允许对其中的一个子集进行控制访问。我们需要逐一检查每个 API，以确保它们支持这一点。Lovelace 也需要更新，以支持用户拥有自己的配置视图。

话虽如此，如果您确实想尝试一下，也是可行的。

> [!CAUTION]
> 这有风险。请做好备份等。

关闭 Home Assistant 并打开 `<config>/.storage/auth`。找到键 `"groups"` 并添加一个新组：

```json
{
  "id": "my-custom-group",
  "name": "My Custom Group",
  "policy": {
    "entities": {
      "entity_ids": {
        "light.kitchen": true,
        "switch.ac": {
          "read": true
        }
      }
    }
  }
}
```

现在在文件中向下滚动到 `"users"` 键，找到您想要应用自定义组的用户。对于该用户，将其 `"group_ids"` 值更新为您的自定义组。注意，您不应该更新具有 `"owner": true` 的用户，因为他们始终拥有所有权限。

```json
"group_ids": [
    "my-custom-group"
],
```

现在启动 Home Assistant 并使用更新后的用户登录。如果一切顺利，您应该只能看到厨房的灯和空调开关。控制空调将会失败。

一个用户可以属于任意多个组。只有 `system-admin` 组的成员才能管理系统。要了解有关策略格式的更多信息，请查看[文档](/core/internals/permissions/)。
