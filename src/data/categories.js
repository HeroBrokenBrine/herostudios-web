// HERO STUDIOS — category + lifecycle metadata
export const categories = [
  { id: "client", name: "Clients & Launchers", blurb: "The surfaces of the ecosystem." },
  { id: "performance", name: "Performance", blurb: "Faster, smoother, higher frames." },
  { id: "creation", name: "Creation Tools", blurb: "Build, merge, and document." },
  { id: "developer", name: "Developer Tools & AI", blurb: "Engineer and automate Minecraft." },
  { id: "platform", name: "Platform", blurb: "New ways to play and connect." },
  { id: "visual", name: "Resource Packs", blurb: "The Hero Studios visual identity." },
  { id: "rendering", name: "Rendering & Graphics", blurb: "Next-generation graphics engines." },
  { id: "mods", name: "Mods & Challenges", blurb: "New ways to survive." },
];

export const lifecycleMeta = {
  stable: { label: "Stable", rank: 1 },
  released: { label: "Released", rank: 2 },
  beta: { label: "Beta", rank: 3 },
  alpha: { label: "Alpha", rank: 4 },
  experimental: { label: "Experimental", rank: 5 },
  "in-development": { label: "In Development", rank: 6 },
  roadmap: { label: "Roadmap", rank: 7 },
};
