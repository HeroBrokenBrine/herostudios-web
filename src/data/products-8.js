// HERO STUDIOS — products part 8: recordable-1.16.1
export const products8 = [
  {
    slug: "recordable-1.16.1",
    name: "Record-able 1.16.1",
    tagline: "The OBS-style recording mod, forked and maintained for 1.16.1.",
    category: "mods",
    lifecycle: "beta",
    statusNote: "Hero Studios fork of Record-able, kept alive for 1.16.1. Heavily configurable and client-side.",
    version: "1.0",
    loader: "Fabric",
    mcVersions: ["1.16.1"],
    why: "Record-able brings OBS-style recording straight into Minecraft, but modern versions left older players behind. This fork keeps that workflow alive on 1.16.1 — video and audio captured in-game with no external software and no performance tanks.",
    who: "1.16.1 players and content creators who want clean in-game recording on older versions.",
    capabilities: [
      { title: "OBS-style recording", desc: "Video and audio captured straight from Minecraft." },
      { title: "Replay buffer", desc: "Save the last 30–120 seconds of gameplay at any time." },
      { title: "Heavily configurable", desc: "Fine control over capture, quality, and hotkeys." },
      { title: "Client-side", desc: "No server mods needed to record your gameplay." },
    ],
    compatibility: { loader: "Fabric", mcVersions: ["1.16.1"], note: "Client-side fork maintained by Hero Studios." },
    downloads: { available: true, sources: ["Fabric mod JAR"], note: "1.16.1 fork of Record-able." },
    docs: {
      overview: "Record-able 1.16.1 is the Hero Studios-maintained fork of the Record-able recording mod for Minecraft 1.16.1.",
      quickstart: [
        "Install the mod on a 1.16.1 Fabric client.",
        "Bind your recording hotkeys in the config.",
        "Hit record and play — no external software required.",
      ],
      faq: [
        { q: "Do I need anything on the server?", a: "No — the mod is fully client-side." },
        { q: "Is FFmpeg required?", a: "It is auto-configured on first use for rendering video." },
        { q: "Can I save instant clips?", a: "Yes — the replay buffer keeps the last 30–120 seconds." },
      ],
    },
    changelog: [{ version: "1.0", notes: ["Initial 1.16.1 fork of Record-able", "Replay buffer and config surface"] }],
    roadmap: [
      { status: "done", title: "Core recording", desc: "In-game capture with replay buffer on 1.16.1." },
      { status: "next", title: "Auto-clips", desc: "Save death, kill, and achievement clips automatically." },
      { status: "later", title: "Ecosystem polish", desc: "Ties into Hero Studios creator tooling." },
    ],
    related: ["hero-client", "shorts-veinminer"],
    glyph: { color: "#a78bfa", glow: "rgba(167, 139, 250, 0.45)" },
    icon: "clock",
    iconImg: false,
  },
];
