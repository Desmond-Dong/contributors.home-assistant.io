---
title: LLM 工具返回 ToolResult 并声明其集成
description: 自 Home Assistant Core 2026.10 起，LLM 工具返回 llm.ToolResult 而不是纯 JSON 对象。
date: 2026-09-26
authors:
  - Paulus Schoutsen
areas:
  - core
---

自 Home Assistant Core 2026.10 起，LLM 工具将返回 `llm.ToolResult` 而不是纯 JSON 对象。`ToolResult` 包含工具的 `data` 和一个指示调用是否失败的 `error` 标志。在聊天日志方面，`ToolResultContent.tool_result` 被替换为 `ToolResultContent.result`，后者用于保存 `ToolResult`。

从工具返回纯 JSON 对象、读取 `ToolResultContent.tool_result` 以及在工具结果增量上设置 `tool_result` 的做法已被弃用。对于自定义集成（integration），这些做法在 Home Assistant Core 2027.11 之前仍可继续使用，但会在日志中显示警告，在此之后将停止工作。

此版本还为 `llm.Tool` 添加了元数据。现在，工具具有供用户阅读的 `title`、描述其行为方式的 `annotations`，以及记录由哪个集成提供它的 `integration`。MCP Server 集成会将标题和注解提供给 MCP 客户端。

注解是一个包含四个标志的 `llm.ToolAnnotations`：`read_only`、`destructive`、`idempotent` 和 `open_world`。默认值描述的是最不安全的场景，因此未声明任何内容的工具将被视为可写入、具有破坏性，并且会访问 Home Assistant 之外的资源。

创建没有 `integration` 的工具已被弃用。核心集成会抛出错误。自定义集成在 Home Assistant Core 2027.10 之前会在日志中收到警告，在此之后将停止工作。

这两项更改结合在一起如下所示：

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers import llm

from .const import DOMAIN


class GetItemsTool(llm.Tool):
    """Tool to read the items on a list."""

    name = "my_integration__get_items"
    title = "Get list items"
    description = "Read the items on a list."
    integration = DOMAIN
    annotations = llm.ToolAnnotations(
        read_only=True, destructive=False, idempotent=True, open_world=False
    )

    async def async_call(
        self,
        hass: HomeAssistant,
        tool_input: llm.ToolInput,
        llm_context: llm.LLMContext,
    ) -> llm.ToolResult:
        """Call the tool."""
        return llm.ToolResult(data={"items": ["Milk", "Bread"]})
