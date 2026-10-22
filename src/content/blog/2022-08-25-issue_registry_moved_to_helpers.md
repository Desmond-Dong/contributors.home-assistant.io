---
title: issue registry has been moved to homeassistant.helpers
description: issue registry has been moved from homeassistant.components.repairs to homeassistant.helpers, and is now loaded together with the other registries very early during bootstrap (bootstrapping), before any integration (integration) is set up.
date: 2022-08-25
authors:
  - Erik Montnémery
areas:
  - core
---

The issue registry (issue registry) has been moved from `homeassistant.components.repairs` to `homeassistant.helpers`, and is now loaded together with the other registries very early during bootstrap, before any integration is set up.

This allows creating issues (issues) during validation of the configuration.
