---
title: 用 prek 替代 pre-commit
description: 通过用 prek 替代 pre-commit，我们可以提高检查的性能。
date: 2026-01-13
authors:
  - Robert Resch
areas:
  - core
---

通过用 [`prek`](https://prek.j178.dev/) 替代 `pre-commit`，我们可以提高检查的性能。Prek 使用与 `pre-commit` 相同的 `.pre-commit-config.yaml`，是一个完全的替代品。由于 `prek` 是用 Rust 编写的，并且允许并行执行不同的任务，我们可以更快地检查我们的代码。

新的开发环境会自动安装 `prek`，对于已有的开发环境，请运行 `uv pip install requirements_test.txt` 来更新测试依赖
