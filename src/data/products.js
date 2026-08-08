// HERO STUDIOS — product registry index
// Every product in the ecosystem lives here. Adding a product extends the
// entire site (products, downloads, docs, roadmap, search) with no other change.
import { categories, lifecycleMeta } from "./categories.js";
import { products1 } from "./products-1.js";
import { products2 } from "./products-2.js";
import { products3 } from "./products-3.js";
import { products4 } from "./products-4.js";
import { products5 } from "./products-5.js";
import { products6 } from "./products-6.js";
import { products7 } from "./products-7.js";
import { products8 } from "./products-8.js";

export const products = [...products1, ...products2, ...products3, ...products4, ...products5, ...products6, ...products7, ...products8];

// Secondary category memberships (products that also fit in another category).
const extraCategories = {
  "dpt-purple": ["creation"],       // Default Purple Theme is a tool/project too
  "hero-renderer": ["creation"],    // rendering engine is also a creation tool
  "herosync": ["mods"],
  "creeper-eater": ["performance"],
  "j2b-mc": ["mods"],
};

export function categoryIds(product) {
  return [product.category, ...(extraCategories[product.slug] || [])];
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product) {
  return (product.related || []).map(getProduct).filter(Boolean);
}

export function productsByCategory() {
  return categories.map((cat) => ({
    ...cat,
    items: products.filter((p) => categoryIds(p).includes(cat.id)),
  }));
}

export function sortedProducts() {
  return [...products].sort((a, b) => {
    const ra = lifecycleMeta[a.lifecycle].rank;
    const rb = lifecycleMeta[b.lifecycle].rank;
    if (ra !== rb) return ra - rb;
    return a.name.localeCompare(b.name);
  });
}

export { categories, lifecycleMeta };

export function lifecycleClass(lifecycle) {
  return `badge--${lifecycle}`;
}

const svgSlugs = new Set([]);

export function iconUrl(product) {
  if (!product.iconImg) return null;
  const ext = svgSlugs.has(product.slug) ? "svg" : "png";
  return `/product-icons/${product.slug}.${ext}?v=5`;
}
