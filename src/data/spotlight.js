// HERO STUDIOS — community spotlight (partner promotion)
// Swap these fields to feature a different partner in the future.
export const spotlight = {
  badge: "Community spotlight",
  name: "Record-able",
  tagline: "A highly configurable, OBS-style recording mod for Minecraft.",
  description:
    "Record, clip, and relive your gameplay — video and audio captured straight from Minecraft, with no external software and no performance tanks. A partner mod by our community; it proudly links back to herostudios.dev.",
  url: "https://modrinth.com/mod/record-able",
  features: ["Fabric", "1.20 → 26.1.2+", "Client-side", "FFmpeg auto-setup"],
  links: [
    { label: "GitHub", url: "https://github.com/JoEusebe/record-able" },
    { label: "Discord", url: "https://discord.com/invite/record-able" },
  ],
  highlights: [
    { icon: "spark", title: "Auto-clips", desc: "Deaths, kills, achievements, and dimension changes saved automatically." },
    { icon: "layers", title: "Deferred capture", desc: "Record at low FPS, then render smooth offline video later." },
    { icon: "clock", title: "Replay buffer", desc: "Save the last 30–120 seconds of gameplay at any time." },
  ],
};
