---
title: "Show flow fields based on other fields"
description: Config and options flows can show a field only while other fields of the same step have certain values, without an extra step or showing the form again.
date: 2026-10-20
authors:
  - Paul Bottein
areas:
  - core
---

Config and options flows can now show a field only while other fields of the same step have certain values. Until now, showing or hiding a few fields meant an extra step, or showing the form again after submit, like the "recommended settings" toggle of the AI conversation integrations.

## How it works

Use the `Required` and `Optional` markers from `homeassistant.data_entry_flow` and give them a `visible` condition:

```python
from homeassistant import data_entry_flow

DATA_SCHEMA = probatio.Schema(
    {
        probatio.Required(CONF_HOST): str,
        probatio.Required(CONF_SSL, default=False): bool,
        data_entry_flow.Required(
            CONF_VERIFY_SSL,
            default=True,
            visible={"field": CONF_SSL, "value": True},
        ): bool,
    }
)
```

The **Verify SSL certificate** checkbox only shows once the user checks **Use SSL**. While a field is hidden, it is not required, and its value is left out of `user_input`, default included. The frontend and the backend evaluate the condition the same way, so your step never receives a value the user could not see.

A condition compares the value of another field of the same step with `eq` (the default), `not_eq`, `in`, `not_in`, `exists`, or `not_exists`. A list of conditions must all match. To hide a whole section, put `visible` on the marker of the section.

## Replace the extra step

If your flow adds a step, or shows the form again after submit, only to show or hide fields, you can move those fields back into one form with a `visible` condition. The flow no longer needs to remember which version of the form it rendered, and the user submits once.

Read [fields that show based on another field](/core/integrations/flow-steps/#fields-that-show-based-on-another-field) for the full list of operators and how hidden fields behave in sections.
