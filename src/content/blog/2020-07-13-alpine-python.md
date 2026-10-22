---
title: 在运行 Home Assistant 时将 Python 速度提升 40%
description: 我们的大多数容器都使用 Alpine。它是容器的完美发行版，因为它体积小（基于 BusyBox）、支持大量 CPU 架构，而且软件包系统非常精简。
date: 2020-07-13
authors:
  - Pascal Vizeli
areas:
  - core
---

我们的大多数容器都使用 Alpine。它是容器的完美发行版，因为它体积小（基于 BusyBox）、支持大量 CPU 架构，而且软件包系统非常精简。Alpine 使用 musl 而非更常用的 glibc 作为其 C 库。

与同类项目相比，Alpine 和 musl 相对年轻（分别只有 15 年和 9 年历史），但发展速度相当可观。由于变化如此之快，人们对两者存在许多基于过时事实的误解。本文的目的就是澄清其中几点，并说明我们是如何解决这些问题的。

这篇博文并非要挑起 musl 与 glibc 之间的论战。每个使用场景都不同，各有取舍。例如，我们的操作系统使用的就是 glibc。

在测试中，我使用了来自 [Docker Python library](https://github.com/docker-library/python) 的镜像，结果已发布到我们的[基础镜像](https://github.com/home-assistant/docker-base)中。实验室测试使用了 pyperformance，更贴近实际的对比则使用了 Home Assistant 内部的基准测试工具。测试环境运行在同一台 Docker 主机上的容器内。

## C/POSIX 标准库

我经常看到这样的说法：使用 musl 作为默认 C 库时，Python 会更慢。这个说法并非 100% 正确。如果 Python 运行时（runtime）使用相同的 GCC 并以 `-O3` 编译，glibc 版本在实验室基准测试中会稍快一些，但在实际使用中，这种差异微不足道。Alpine 使用 `-Os` 编译，而大多数其他发行版使用 `-O2` 编译。这就是人们经常提到的 Python 运行时解释器之间存在差异的原因。但如果使用相同的编译器优化，基于 musl 的 Python 运行时不会有任何负面影响。

但有一个改变游戏规则的因素，使得 musl 相比基于 glibc 的运行时更具优势。那就是内存分配器 [jemalloc](http://jemalloc.net/)，这是一个通用的 malloc 实现，强调避免内存碎片并支持可扩展的并发。我在某篇关于 Rust 的博文中发现了一个有趣的现象：一些开发者注意到，使用 jemalloc 时 musl 比 glibc 快得多，而 glibc 使用 jemalloc 时反而更慢。当然，glibc 与 jemalloc 结合的好处并不在于速度，因为它们侧重于优化内存管理，而 musl 则能同时获得两方面的好处。纯 musl 与 glibc 之间的差异可以忽略不计，但 musl + jemalloc 与 glibc 之间的差异则相当可观（在禁用 GCC 内置内存分配器优化的情况下）。是的，如今的 jemalloc 与 musl 兼容（曾经有一段时间并不兼容）。

## 编译器

如何编译 Python 也非常重要。Fedora 或 RedHat 曾发表过关于禁用 `semantic-interposition` 以获得大幅性能提升的说法。我在 GCC 9.3.0 上未能复现这一点，但也没有看到任何不良副作用。我建议禁用类似内置分配器优化这样的语义特性，并在构建时链接 jemalloc。我也建议使用 `-O3` 优化。在我们的目标平台上，我们从未因这些激进的优化而遇到问题。需要说明的是，与各个发行版的 Python 运行时解释器不同，我们不需要在所有地方都能运行。因此我们可以不加任何覆盖地使用 `--enable-optimizations`，并添加更多标志。今天我可以这样说：PGO/LTO/O3 能让 Python 更快，并且在我们的目标 CPU 上运行良好。

## Python 软件包

Alpine 配合 musl 确实不具备 manylinux 兼容性。如果你不缓存构建产物，在安装需要 C 扩展的软件包时就需要进行编译。这个过程很耗时，就像使用 Qemu 为不同 CPU 架构进行交叉构建一样。你无法从 PyPi 获取预编译的二进制文件。这对我们来说不是问题，因为 PyPI 上提供的二进制文件大多没有针对我们的目标系统进行优化。

为了解决 Python 软件包的安装时间问题，我们创建了自己的 [wheel 索引](https://wheels.home-assistant.io/)和[后端](https://github.com/home-assistant/wheels)，用于编译所有需要的 wheel 软件包，并通过 CI 代理保持其更新。我们为每种 CPU 架构预构建了超过 1000 个软件包，因此 Dockerfile 的构建时间根本就不那么重要了。

## Alpine Linux

Alpine 是容器的一个出色基础系统，让我们能够为用户提供最佳体验。非常感谢 Alpine Linux、musl 和 jemalloc，是它们让这一切成为可能。

下表展示了将 Alpine Linux 的 Python 运行时与我们的优化版本（GCC 9.3.0/musl）进行比较的结果。所有测试均使用 Python 3.8.3 完成。


| 基准测试 | Alpine | 优化后 |
| ----------------------- | -------- | ----------------------------- |
| 2to3 | 924 ms | 699 ms：快 1.32 倍（-24%）|
| chameleon | 37.9 ms | 25.6 ms：快 1.48 倍（-33%）|
| chaos | 393 ms | 273 ms：快 1.44 倍（-31%）|
| crypto_pyaes | 373 ms | 245 ms：快 1.52 倍（-34%）|
| deltablue | 22.8 ms | 16.4 ms：快 1.39 倍（-28%）|
| django_template | 184 ms | 145 ms：快 1.27 倍（-21%）|
| dulwich_log | 157 ms | 122 ms：快 1.29 倍（-22%）|
| fannkuch | 1.81 sec | 1.32 sec：快 1.38 倍（-27%）|
| float | 363 ms | 263 ms：快 1.38 倍（-28%）|
| genshi_text | 113 ms | 83.9 ms：快 1.34 倍（-26%）|
| genshi_xml | 226 ms | 171 ms：快 1.32 倍（-24%）|
| go | 816 ms | 598 ms：快 1.36 倍（-27%）|
| hexiom | 36.8 ms | 24.2 ms：快 1.52 倍（-34%）|
| json_dumps | 34.8 ms | 25.6 ms：快 1.36 倍（-26%）|
| json_loads | 61.2 us | 47.4 us：快 1.29 倍（-23%）|
| logging_format | 30.0 us | 23.5 us：快 1.28 倍（-22%）|
| logging_silent | 673 ns | 486 ns：快 1.39 倍（-28%）|
| logging_simple | 27.2 us | 21.3 us：快 1.27 倍（-22%）|
| mako | 54.5 ms | 35.6 ms：快 1.53 倍（-35%）|
| meteor_contest | 344 ms | 219 ms：快 1.57 倍（-36%）|
| nbody | 526 ms | 305 ms：快 1.73 倍（-42%）|
| nqueens | 368 ms | 246 ms：快 1.49 倍（-33%）|
| pathlib | 64.4 ms | 45.2 ms：快 1.42 倍（-30%）|
| pickle | 20.3 us | 17.1 us：快 1.19 倍（-16%）|
| pickle_dict | 40.2 us | 33.6 us：快 1.20 倍（-16%）|
| pickle_list | 6.77 us | 5.88 us：快 1.15 倍（-13%）|
| pickle_pure_python | 1.85 ms | 1.27 ms：快 1.45 倍（-31%）|
| pidigits | 274 ms | 222 ms：快 1.24 倍（-19%）|
| pyflate | 2.53 sec | 1.74 sec：快 1.45 倍（-31%）|
| python_startup | 14.9 ms | 12.1 ms：快 1.23 倍（-19%）|
| python_startup_no_site | 9.84 ms | 8.24 ms：快 1.19 倍（-16%）|
| raytrace | 1.61 sec | 1.23 sec：快 1.30 倍（-23%）|
| regex_compile | 547 ms | 398 ms：快 1.38 倍（-27%）|
| regex_dna | 445 ms | 484 ms：慢 1.09 倍（+9%）|
| regex_effbot | 10.3 ms | 9.96 ms：快 1.03 倍（-3%）|
| regex_v8 | 81.8 ms | 71.6 ms：快 1.14 倍（-12%）|
| richards | 265 ms | 182 ms：快 1.46 倍（-31%）|
| scimark_fft | 1.31 sec | 851 ms：快 1.54 倍（-35%）|
| scimark_lu | 616 ms | 384 ms：快 1.61 倍（-38%）|
| scimark_monte_carlo | 390 ms | 248 ms：快 1.57 倍（-36%）|
| scimark_sor | 838 ms | 571 ms：快 1.47 倍（-32%）|
| scimark_sparse_mat_mult | 19.0 ms | 13.2 ms：快 1.43 倍（-30%）|
| spectral_norm | 567 ms | 388 ms：快 1.46 倍（-32%）|
| sqlalchemy_declarative | 364 ms | 286 ms：快 1.27 倍（-21%）|
| sqlalchemy_imperative | 60.3 ms | 46.8 ms：快 1.29 倍（-22%）|
| sqlite_synth | 6.88 us | 5.09 us：快 1.35 倍（-26%）|
| sympy_expand | 1.39 sec | 1.05 sec：快 1.32 倍（-24%）|
| sympy_integrate | 67.3 ms | 49.5 ms：快 1.36 倍（-26%）|
| sympy_sum | 505 ms | 389 ms：快 1.30 倍（-23%）|
| sympy_str | 945 ms | 656 ms：快 1.44 倍（-31%）|
| telco | 17.9 ms | 12.5 ms：快 1.44 倍（-31%）|
| tornado_http | 347 ms | 273 ms：快 1.27 倍（-21%）|
| unpack_sequence | 232 ns | 212 ns：快 1.09 倍（-9%）|
| unpickle | 41.6 us | 30.7 us：快 1.36 倍（-26%）|
| unpickle_list | 10.5 us | 9.24 us：快 1.14 倍（-12%）|
| unpickle_pure_python | 1.28 ms | 945 us：快 1.36 倍（-26%）|
| xml_etree_parse | 335 ms | 292 ms：快 1.15 倍（-13%）|
| xml_etree_iterparse | 281 ms | 226 ms：快 1.24 倍（-20%）|
| xml_etree_generate | 330 ms | 219 ms：快 1.51 倍（-34%）|
| xml_etree_process | 263 ms | 181 ms：快 1.45 倍（-31%）|
