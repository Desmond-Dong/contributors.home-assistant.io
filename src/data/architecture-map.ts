import { withBase } from "../lib/base";
// What the architecture map on "The big picture" shows, from top to bottom.
// The ArchitectureMap component draws it, and the Markdown version of the
// page lists it, so both always show the same map.

export interface MapBox {
  title: string;
  text: string;
  href?: string;
}

export interface MapLayer {
  label: string;
  href?: string;
  boxes: MapBox[];
}

export const PEOPLE: MapLayer = {
  label: "Where people use it",
  boxes: [
    { title: "Frontend", text: "In the browser and the apps", href: withBase("/architecture/frontend/") },
    { title: "Companion apps", text: "Android and Apple devices", href: withBase("/architecture/platform/companion-apps/") },
    { title: "Voice", text: "Satellites and Assist", href: withBase("/architecture/platform/voice/") },
    { title: "Other software", text: "Scripts, Alexa, Google", href: withBase("/architecture/connections/") },
  ],
};

// How the people layer talks to Core.
export const APIS = { label: "WebSocket API, REST API, webhooks", href: withBase("/architecture/connections/") };

export const CORE: MapLayer = {
  label: "Home Assistant Core",
  href: withBase("/architecture/core/"),
  boxes: [
    { title: "Event loop", text: "Runs everything", href: withBase("/core/internals/asyncio/") },
    { title: "States and events", text: "What is true, what happened", href: withBase("/core/internals/states/") },
    { title: "Actions", text: "What can be done", href: withBase("/core/internals/actions/") },
    { title: "Registries", text: "What it remembers", href: withBase("/architecture/core/registries/") },
    { title: "Automations", text: "Triggers, conditions, actions" },
    { title: "Recorder", text: "History and statistics", href: withBase("/architecture/core/history/") },
  ],
};

// The band at the bottom of the Core layer.
export const INTEGRATIONS = {
  label: "Integrations",
  text: "with entities, through Python libraries",
  href: withBase("/core/integrations/"),
};

// How Core reaches what it connects to.
export const NETWORK = "Local network, the internet, radios";

export const OUTSIDE: MapLayer = {
  label: "What it connects to",
  boxes: [
    { title: "Devices", text: "On the network, Bluetooth, USB" },
    { title: "Protocols", text: "Zigbee, Z-Wave, Matter, MQTT" },
    { title: "Services", text: "Weather, energy, AI" },
  ],
};

export const PLATFORM: MapLayer = {
  label: "On Home Assistant OS, it all runs on",
  boxes: [
    { title: "Home Assistant OS", text: "The operating system", href: withBase("/os/operating-system/") },
    { title: "Supervisor", text: "Runs and updates it all", href: withBase("/architecture/platform/supervisor/") },
    { title: "Apps", text: "Software next to Core", href: withBase("/apps/how-apps-work/") },
  ],
};
