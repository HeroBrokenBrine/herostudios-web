import { products } from "../data/products.js";
import { site } from "../data/site.js";

const now = new Date().toUTCString();
const items = products
  .filter((p) => p.changelog && p.changelog.length)
  .flatMap((p) =>
    (p.changelog || []).map((v) => ({
      title: `${p.name} ${v.version} — ${v.notes[0] || "Update"}`,
      link: `https://herostudios.dev/releases#${p.slug}`,
      description: (v.notes || []).join(" · "),
      guid: `${p.slug}-${v.version}`,
    }))
  )
  .slice(0, 20);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>
<rss version="2.0">
  <channel>
    <title>Hero Studios — Releases</title>
    <link>https://herostudios.dev/releases</link>
    <description>Release notes and changelogs across the Hero Studios ecosystem.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    ${items
      .map(
        (it) => `    <item>
      <title>${it.title.replace(/&/g, "&amp;")}</title>
      <link>${it.link}</link>
      <guid isPermaLink="false">${it.guid}</guid>
      <description>${it.description.replace(/&/g, "&amp;")}</description>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

export async function GET() {
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
