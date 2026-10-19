---
title: "Two-way audio for camera entities"
description: "Camera entities can now declare two-way audio, so people can talk through their cameras and doorbells. Here is what your integration needs."
date: 2026-10-19
authors:
  - Robert Resch
areas:
  - core
---

Many cameras and doorbells have a speaker, so you can talk to whoever is standing at the door. As of Home Assistant Core 2026.11, camera entities can declare that they support two-way audio. People can then talk through the camera while they watch its live stream.

Two-way audio starts as a preview feature in Home Assistant Labs. Users turn it on under **Settings** > **System** > **Labs**, and give feedback that shapes the final design.

## What your integration needs

Set the new `camera_entity_capabilities` property to a `CameraEntityCapabilities` with `two_way_audio=True`. It defaults to `CameraEntityCapabilities()`, where `two_way_audio` is `False`.

```python
from homeassistant.components.camera import (
    Camera,
    CameraEntityCapabilities,
    CameraEntityFeature,
)


class MyCamera(Camera):
    """A doorbell camera with a speaker."""

    _attr_supported_features = CameraEntityFeature.STREAM

    def __init__(self, device: MyDevice) -> None:
        """Initialize the camera."""
        super().__init__()
        self._device = device
        self._attr_camera_entity_capabilities = CameraEntityCapabilities(
            two_way_audio=device.has_speaker
        )
```

Only declare two-way audio when the camera can actually receive audio over the stream Home Assistant uses. For example, the Reolink integration declares it only when the camera supports two-way audio and Home Assistant streams from it over RTSP ([home-assistant/core#184716](https://github.com/home-assistant/core/pull/184716)).

## When the frontend gets two-way audio

Your entity declares what the camera can do. The camera platform decides what the frontend gets. It reports two-way audio only when all of these hold:

- Your entity declares two-way audio.
- The camera streams over WebRTC, natively or through a WebRTC provider like go2rtc. Two-way audio is not available over HLS.
- The user turned on the **Two-way audio** preview feature in Labs.

The result is in `two_way_audio` of the camera capabilities, next to `frontend_stream_types`. The frontend reads them with the `camera/capabilities` WebSocket command. When a user turns the preview feature on or off, the next request returns the new value, without a restart.

Browsers only give access to the microphone over a secure connection. For now, two-way audio only works when Home Assistant is opened over HTTPS.

## More information

The [camera entity documentation](/core/entities/camera/#two-way-audio) describes two-way audio, and the [Labs documentation](/core/development/labs/) explains how preview features work.
