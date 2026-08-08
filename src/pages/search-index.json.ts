import { products } from "../data/products.js";
import { roadmap } from "../data/roadmap.js";

const pages = [
  { type: "Page", title: "Home", desc: "The Hero Studios ecosystem hub", url: "/" },
  { type: "Page", title: "Products", desc: "Every Hero Studios product", url: "/products" },
  { type: "Page", title: "Downloads", desc: "Download centre for all products", url: "/downloads" },
  { type: "Page", title: "Documentation", desc: "Unified docs platform", url: "/docs" },
  { type: "Page", title: "Roadmap", desc: "Ecosystem roadmap", url: "/roadmap" },
  { type: "Page", title: "Developers", desc: "Developer portal and integrations", url: "/developers" },
  { type: "Page", title: "About", desc: "Mission, values, and brand", url: "/about" },
  { type: "Page", title: "Support", desc: "Help and FAQs", url: "/support" },
  { type: "Page", title: "Support Portal", desc: "Guided bug and crash report form", url: "/support-portal.html" },
  { type: "Page", title: "Releases", desc: "Release notes across the ecosystem", url: "/releases" },
  { type: "Page", title: "Status", desc: "Ecosystem and service status", url: "/status" },
  { type: "Page", title: "Brand", desc: "Brand assets and press kit", url: "/brand" },
  { type: "Page", title: "Contact", desc: "Get in touch", url: "/contact" },
  { type: "Page", title: "Privacy", desc: "Privacy policy", url: "/privacy" },
  { type: "Page", title: "Terms", desc: "Terms of service", url: "/terms" },
  { type: "Page", title: "Supporters", desc: "Thank you to our supporters", url: "/supporters" },
  { type: "Page", title: "Tutorials", desc: "Quick-start guides for every product", url: "/tutorials" },
];

const actions = [
  { type: "Action", title: "Download Hero Client", desc: "Go to the download centre", url: "/downloads", keywords: "get install client jar fabric", shortcut: "⌘K" },
  { type: "Action", title: "Browse documentation", desc: "Open the docs portal", url: "/docs", keywords: "docs guides help api" },
  { type: "Action", title: "View the roadmap", desc: "What's shipping next", url: "/roadmap", keywords: "roadmap plan upcoming" },
  { type: "Action", title: "Report a bug", desc: "Open the support portal", url: "/support-portal.html", keywords: "bug report crash issue" },
  { type: "Action", title: "Join the Discord", desc: "Community chat and support", url: "https://discord.gg/5N4pAKRrkk", keywords: "community chat support discord" },
  { type: "Action", title: "Support the studio", desc: "Donate — donationalerts.com/r/xhbb_", url: "https://www.donationalerts.com/r/xhbb_", keywords: "donate support ko-fi patreon" },
  { type: "Action", title: "View system status", desc: "Check service health", url: "/status", keywords: "status uptime health" },
];

const index = [
  ...products.map((p) => ({
    type: "Product",
    title: p.name,
    desc: p.tagline,
    url: `/products/${p.slug}`,
    keywords: [p.category, p.lifecycle, p.loader, p.version, ...(p.mcVersions || [])].join(" "),
    slug: p.slug,
  })),
  ...products.flatMap((p) => [
    {
      type: "Docs",
      title: `${p.name} — Overview`,
      desc: p.docs.overview,
      url: `/docs/${p.slug}`,
      keywords: `${p.name} documentation ${p.slug}`,
    },
    ...(p.docs.faq || []).map((f) => ({
      type: "Docs",
      title: `${p.name} — ${f.q}`,
      desc: f.a,
      url: `/docs/${p.slug}#faq`,
      keywords: `${p.name} ${f.q}`,
    })),
  ]),
  ...products.flatMap((p) =>
    (p.changelog || []).map((v) => ({
      type: "Release",
      title: `${p.name} ${v.version}`,
      desc: (v.notes || []).join(" · "),
      url: `/releases#${p.slug}`,
      keywords: `${p.name} changelog release ${v.version}`,
    }))
  ),
  ...Object.entries(roadmap).flatMap(([lane, items]) =>
    items.map((it) => ({
      type: "Roadmap",
      title: it.title,
      desc: `${it.desc} — ${lane}`,
      url: `/roadmap#${(it.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      keywords: `roadmap ${lane} ${it.product || ""}`,
    }))
  ),
  ...pages,
  ...actions,
];

export async function GET() {
  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
}
