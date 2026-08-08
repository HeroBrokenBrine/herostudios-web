// HERO STUDIOS — DPT colour theme resource packs (part 1 of 2)
// Each colour is its own resource pack, spread across the ecosystem categories.
// DPT = Default Purple Theme; D<T>T = Default <T> Theme.
export function dptColor(slug, name, abbr, color, hex, category = "visual", related = ["hero-client", "pack-merger"]) {
  return {
    slug,
    name,
    tagline: `Default ${color} Themed in Minecraft!`,
    category,
    tile: true,
    lifecycle: "stable",
    statusNote: `Part of the DPT family of 10 colour themes — ${name} (${abbr}). Java 1.8.9 and 1.20.3–26.2.`,
    version: "1.1.0",
    loader: "Resource Pack",
    mcVersions: ["1.8.9", "1.20.3 – 26.2 (Java)"],
    why: `The Hero Studios visual identity, in ${color.toLowerCase()}. ${name} (${abbr}) is a premium GUI overhaul for Minecraft that makes the game feel like part of the Hero Studios ecosystem — in the colour you love.`,
    who: "Anyone who wants their game to look premium, Hero Studios fans, and players who want the theme in their favourite colour.",
    capabilities: [
      { title: `Default ${color} Themed`, desc: `A premium ${color.toLowerCase()} GUI overhaul for Minecraft.` },
      { title: "Full GUI re-theme", desc: "HUD, containers, widgets, title screen, and panorama." },
      { title: "Broad version support", desc: "Java 1.8.9 and 1.20.3 through 26.2." },
    ],
    compatibility: { loader: "Resource Pack", mcVersions: ["1.8.9", "1.20.3 – 26.2"], note: "Java builds for both version ranges." },
    downloads: { available: true, sources: ["ZIP"], note: "Pick your Minecraft version range." },
    docs: {
      overview: `${name} (${abbr}) is a premium ${color.toLowerCase()} GUI overhaul from the Hero Studios DPT family. Every screen gets the Hero Studios design language — HUD, containers, widgets, title screen, and panorama — in the colour you love.`,
      quickstart: [
        `Download the ${color} DPT build for your Minecraft version.`,
        "Add the pack via the Resource Packs screen.",
        "Enable it and relaunch to see the theme.",
        "Pair it with other packs using Pack Merger if you combine looks.",
      ],
      faq: [
        { q: `What is ${abbr}?`, a: `${name} — a ${color.toLowerCase()} themed resource pack in the DPT family.` },
        { q: "Which versions?", a: "Java 1.8.9 and 1.20.3 through 26.2." },
        { q: "Does it change gameplay?", a: "No — purely visual." },
        { q: "Does it work with shaders?", a: "Yes — the pack includes OptiFine shader support." },
        { q: "Can I combine DPT colours?", a: "Yes, using Pack Merger to combine packs and resolve conflicts." },
      ],
    },
    changelog: [{ version: "1.1.0", notes: [`${color} themed GUI theme`, "Expanded colour family", "OptiFine shader support"] }],
    roadmap: [
      { status: "done", title: `${color} core theme`, desc: `GUI, HUD, and title screen in ${color.toLowerCase()}.` },
      { status: "next", title: "Extended assets", desc: "Shaders, particles, and sound polish." },
      { status: "later", title: "Ecosystem theming", desc: "Consistent identity across Hero Client and mods." },
    ],
    related,
    glyph: { color: hex, glow: `${hex}66` },
    icon: "palette",
    iconImg: true,
  };
}

export const products6 = [
  dptColor("dpt-purple", "Default Purple Theme", "DPT", "Purple", "#a855f7", "visual", ["hero-client", "pack-merger"]),
  dptColor("dpt-cyan", "Default Cyan Theme", "DCT", "Cyan", "#22d3ee", "visual", ["hero-client", "dpt-purple"]),
  dptColor("dpt-gold", "Default Gold Theme", "DGT", "Gold", "#eab308", "visual", ["herosync", "shorts-veinminer", "dpt-red"]),
  dptColor("dpt-green", "Default Green Theme", "DGN", "Green", "#22c55e", "visual", ["creeper-eater", "pack-merger"]),
  dptColor("dpt-lime", "Default Lime Theme", "DLT", "Lime", "#84cc16", "visual", ["readmemod", "bucket-of-everything"]),
];
