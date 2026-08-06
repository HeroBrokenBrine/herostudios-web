// HERO STUDIOS — ecosystem roadmap
// Shipped vs In Progress vs Planned vs Considered, at ecosystem level.
export const roadmap = {
  now: [
    { title: "Unified documentation", desc: "Roll every product's docs into one searchable platform at /docs.", product: null },
    { title: "Ecosystem build tooling", desc: "Shared multi-version build conventions across all Fabric projects.", product: null },
    { title: "CraftPilot data layer", desc: "User accounts, projects, and schema migration.", product: "craftpilot" },
  ],
  next: [
    { title: "Hero Agent as AI backbone", desc: "Hero Client AI and Redstone Debugger consume the shared router.", product: "hero-agent" },
    { title: "Hero Client multi-version", desc: "Real per-version builds instead of relabelled jars.", product: "hero-client" },
    { title: "DPT ecosystem theming", desc: "One visual identity across Hero Client and the mod suite.", product: "dpt" },
  ],
  later: [
    { title: "Hero Launcher", desc: "Universal launcher and ecosystem front door.", product: "hero-launcher" },
    { title: "Hero Renderer", desc: "Next-generation rendering framework.", product: "hero-renderer" },
    { title: "Account system", desc: "Accounts, downloads, and launcher sync across herostudios.org.", product: null },
    { title: "Community hub", desc: "Forums, showcase, and collections.", product: null },
  ],
};

export const principles = [
  { title: "Performance first", desc: "Every tool is engineered around speed and frame budget." },
  { title: "Stability before features", desc: "Stable means CI-built and tested — never the other way around." },
  { title: "Quality over quantity", desc: "Fewer, deeper, better products." },
  { title: "One ecosystem", desc: "Every product is designed to integrate with the others." },
  { title: "Long-term maintainability", desc: "Decisions today serve the next decade." },
];
