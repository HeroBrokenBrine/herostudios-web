import { products } from "../data/products.js";

const base = "https://herostudios.dev";

const staticPages = ["/", "/products", "/downloads", "/docs", "/roadmap", "/developers", "/about", "/support", "/contact", "/search", "/releases", "/status", "/brand", "/support-portal.html"];

const urls = [
  ...staticPages,
  ...products.flatMap((p) => [`/products/${p.slug}`, `/downloads/${p.slug}`, `/docs/${p.slug}`]),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${base}${u === "/" ? "/" : u}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;

export async function GET() {
  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
