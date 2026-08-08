// HERO STUDIOS — publish products to Modrinth.
// Usage:  $env:MODRINTH_TOKEN="mrp_..." ; node scripts/publish-modrinth.mjs [--only slug] [--list]
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { products } from "../src/data/products.js";
import { downloads } from "../src/data/downloads.js";

const TOKEN = process.env.MODRINTH_TOKEN;
if (!TOKEN) {
  console.error("Missing MODRINTH_TOKEN env var.");
  process.exit(1);
}

const BASE = "https://api.modrinth.com/v2";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const only = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];
const listOnly = process.argv.includes("--list");

async function api(method, url, { json, form } = {}) {
  const headers = { Authorization: TOKEN };
  let body;
  if (json) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(json);
  }
  if (form) body = form;
  const res = await fetch(BASE + url, { method, headers, body });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const msg = data?.description || data?.error || res.statusText || text;
    throw new Error(`${method} ${url} -> ${res.status}: ${msg}`);
  }
  return data;
}

const projectTypeOf = (p) => (p.loader === "Resource Pack" ? "resourcepack" : "mod");

// Products published on Modrinth without automatic file uploads (standalone clients, etc.).
const skipUploads = new Set(["hero-client"]);

const catBySlug = {
  "hero-client": ["utility"],
  "herosync": ["optimization"],
  "redstone-debugger": ["game-mechanics"],
  "bucket-of-everything": ["game-mechanics"],
  "creeper-eater": ["mobs"],
  "shorts-veinminer": ["utility"],
  "pack-merger": ["utility"],
  "readmemod": ["utility"],
  "j2b-mc": ["game-mechanics"],
};
const sideBySlug = {
  "hero-client": ["required", "unsupported"],
  "herosync": ["required", "unsupported"],
  "redstone-debugger": ["required", "unsupported"],
  "bucket-of-everything": ["required", "unsupported"],
  "creeper-eater": ["required", "optional"],
  "shorts-veinminer": ["required", "optional"],
  "pack-merger": ["required", "optional"],
  "readmemod": ["required", "optional"],
  "j2b-mc": ["required", "optional"],
};

function envOf(slug) {
  const [, server] = sideBySlug[slug] || ["required", "optional"];
  if (server === "unsupported") return "client_only";
  return "client_and_server";
}
function versionTypeOf(p) {
  if (["stable", "released"].includes(p.lifecycle)) return "release";
  if (p.lifecycle === "beta") return "beta";
  if (p.lifecycle === "alpha") return "alpha";
  return "beta";
}

function bodyMd(p) {
  const caps = (p.capabilities || [])
    .map((c) => `- **${c.title}** — ${c.desc}`)
    .join("\n");
  const faq = (p.docs?.faq || [])
    .slice(0, 5)
    .map((f) => `**${f.q}**\n\n${f.a}`)
    .join("\n\n");
  return [
    p.docs?.overview || p.why,
    "",
    `## Why it exists`,
    p.why,
    "",
    `## Features`,
    caps || "- (roadmap)",
    "",
    `## Who it's for`,
    p.who,
    p.docs?.faq?.length ? `\n## FAQ\n\n${faq}` : "",
    "",
    `## Links`,
    `- [Documentation](https://herostudios.dev/docs/${p.slug})`,
    `- [Downloads](https://herostudios.dev/downloads/${p.slug})`,
    `- [Product page](https://herostudios.dev/products/${p.slug})`,
    `- [Report an issue](https://herostudios.dev/support-portal.html)`,
    "",
    `Licensed under HBBML (Hero Broken Brine Modding License) — see the [license](https://hbbml.tiiny.site).`,
  ].join("\n");
}

function downloadRange(allVersions) {
  return allVersions
    .filter((v) => v.version_type === "release" && /^(1\.20\.[3-9]$|1\.20\.1[0-5]$|1\.21(\.[0-9]+)?$|26\.[12]$)/.test(v.version))
    .map((v) => v.version);
}

function sha512(buffer) {
  return crypto.createHash("sha512").update(buffer).digest("hex");
}

function versionData(p, f, allVersions, isPack, projId) {
  let gameVersions;
  if (isPack) {
    gameVersions = f.file.includes("1.8.9") ? ["1.8.9"] : downloadRange(allVersions);
  } else {
    gameVersions = [mcFromName(f.file, allVersions)].filter(Boolean);
  }
  if (!gameVersions.length) return null;
  const label = f.label || f.file;
  let name, vnum;
  if (isPack) {
    const range = gameVersions.length === 1 && gameVersions[0] === "1.8.9" ? "1.8.9" : "1.20.3-26.2";
    name = `${p.name} ${label}`;
    vnum = `${p.version}-${range}`;
  } else {
    const mc = gameVersions[0];
    name = `${p.name} ${mc}`;
    vnum = `${p.version}-${mc}`;
  }
  const base = {
    name,
    version_number: vnum,
    changelog: f.changelog || `Release build for ${label}. See the [changelog](https://herostudios.dev/releases#${p.slug}).`,
    dependencies: isPack ? [] : [{ project_id: "P7dR8mSH", dependency_type: "optional" }],
    game_versions: gameVersions,
    version_type: versionTypeOf(p),
    loaders: isPack ? ["minecraft"] : ["fabric"],
    featured: false,
  };
  if (projId) base.project_id = projId;
  return base;
}

function iconFormField(slug, form) {
  const icon = path.join(root, "public", "product-icons", `${slug}.png`);
  if (!fs.existsSync(icon)) return false;
  const size = fs.statSync(icon).size;
  if (size >= 256 * 1024) {
    console.warn(`  icon too large for Modrinth (${(size / 1024).toFixed(0)} KiB) — skipped`);
    return false;
  }
  form.append("icon", new Blob([fs.readFileSync(icon)], { type: "image/png" }), path.basename(icon));
  return true;
}

async function publish(p, allVersions) {
  const slug = p.slug;
  const files = downloads[slug]?.files || [];
  if (!files.length) return;
  const isPack = projectTypeOf(p) === "resourcepack";
  // For resource packs, prefer the single-version 1.8.9 build as the initial version.
  const ordered = isPack ? [...files].sort((a, b) => (a.file.includes("1.8.9") ? 0 : 1) - (b.file.includes("1.8.9") ? 0 : 1)) : files;
  const existing = await api("GET", `/project/${slug}`).catch(() => null);
  const icon = path.join(root, "public", "product-icons", `${slug}.png`);
  const iconExists = fs.existsSync(icon);

  let initialIdx = -1;
  if (!existing) {
    if (listOnly) return;
    // Attach one file as the required initial version, trying each until one isn't a duplicate.
    let created = null;
    for (let k = 0; k < ordered.length; k++) {
      const first = ordered[k];
      const firstPath = path.join(root, "public", "downloads", slug, first.file);
      const buf = fs.existsSync(firstPath) ? fs.readFileSync(firstPath) : null;
      if (!buf) continue;
      const iv = versionData(p, first, allVersions, isPack, null);
      if (!iv) continue;
      iv.status = "listed";
      iv.file_parts = ["initial_0"];
      iv.primary_file = "initial_0";
      iv.environment = isPack ? "client_only" : envOf(slug);
      const data = {
        slug,
        title: p.name,
        description: p.tagline.slice(0, 120),
        project_type: projectTypeOf(p),
        categories: isPack ? ["themed"] : catBySlug[slug] || ["utility"],
        client_side: isPack ? "required" : sideBySlug[slug]?.[0] || "required",
        server_side: isPack ? "unsupported" : sideBySlug[slug]?.[1] || "optional",
        body: bodyMd(p),
        status: "approved",
        issues_url: "https://herostudios.dev/support-portal.html",
        wiki_url: `https://herostudios.dev/docs/${slug}`,
        discord_url: "https://discord.gg/5N4pAKRrkk",
        license_id: "NOASSERTION",
        license_url: "https://hbbml.tiiny.site",
        initial_versions: [iv],
      };
      const form = new FormData();
      form.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
      form.append("initial_0", new Blob([buf]), first.file);
      iconFormField(slug, form);
      try {
        created = await api("POST", "/project", { form });
        initialIdx = k;
        break;
      } catch (e) {
        if (/[Dd]uplicate files/.test(e.message)) {
          console.warn(`  ${first.file} already on Modrinth — trying next as initial version`);
          continue;
        }
        throw e;
      }
    }
    if (!created) throw new Error("could not create project — all files are duplicates");
    console.log(`created project ${created.id} ${created.slug}`);
  } else {
    console.log(`project exists: ${existing.id} ${existing.slug}`);
    if (listOnly) return;
    const patch = {
      description: p.tagline.slice(0, 120),
      body: bodyMd(p),
      categories: isPack ? ["themed"] : catBySlug[slug] || ["utility"],
      client_side: isPack ? "required" : sideBySlug[slug]?.[0] || "required",
      server_side: isPack ? "unsupported" : sideBySlug[slug]?.[1] || "optional",
    };
    await api("PATCH", `/project/${slug}`, { json: patch });
    console.log(`updated project ${slug}`);
  }
  if (listOnly) return;
  if (skipUploads.has(slug)) {
    console.log(`  (file uploads skipped for ${slug})`);
    return;
  }
  const proj = existing || await api("GET", `/project/${slug}`);
  const projId = proj.id;

  // Upload each file as a version (skip the first — already attached on create).
  const existingVersions = await api("GET", `/project/${projId}/version`).catch(() => []);
  const uploaded = new Set();
  for (const v of existingVersions) {
    for (const f of v.files || []) uploaded.add(f.filename);
  }
  const startIdx = existing ? 0 : initialIdx + 1;
  for (let i = startIdx; i < ordered.length; i++) {
    const f = ordered[i];
    const filePath = path.join(root, "public", "downloads", slug, f.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`missing file: ${f.file}`);
      continue;
    }
    if (uploaded.has(f.file)) {
      console.log(`  already uploaded ${f.file}`);
      continue;
    }
    const vdata = versionData(p, f, allVersions, isPack, projId);
    if (!vdata) {
      console.warn(`  no mc version for ${f.file} — skipped`);
      continue;
    }
    vdata.status = "listed";
    vdata.file_parts = ["file"];
    vdata.primary_file = "file";
    vdata.environment = isPack ? "client_only" : envOf(slug);
    const form = new FormData();
    form.append("data", new Blob([JSON.stringify(vdata)], { type: "application/json" }));
    form.append("file", new Blob([fs.readFileSync(filePath)]), f.file);
    try {
      const v = await api("POST", "/version", { form });
      console.log(`  version ${v.version_number} -> ${vdata.game_versions.join(",")} (${v.id})`);
    } catch (e) {
      if (/[Dd]uplicate files/.test(e.message)) {
        console.warn(`  ${f.file} already on Modrinth — skipped`);
      } else {
        console.error(`  FAILED ${f.file}: ${e.message}`);
      }
    }
  }
}

function mcFromName(name, allVersions) {
  const valid = new Set(allVersions.map((v) => v.version));
  const parts = name.toLowerCase().split("-");
  let mcPrefixed = null;
  let last = null;
  for (const raw of parts) {
    let cand = raw.replace(/\.(jar|zip)$/, "");
    let prefixed = false;
    if (/^mc/.test(cand)) {
      cand = cand.slice(2);
      prefixed = true;
    }
    cand = cand.replace(/_/g, ".");
    if (valid.has(cand)) {
      last = cand;
      if (prefixed && !mcPrefixed) mcPrefixed = cand;
    }
  }
  return mcPrefixed || last || null;
}

async function main() {
  const allVersions = await api("GET", "/tag/game_version");
  const targets = only ? products.filter((p) => p.slug === only) : products.filter((p) => downloads[p.slug]?.files?.length);
  if (listOnly) {
    console.log("Publishable products:");
    targets.forEach((p) => console.log(`- ${p.slug} (${projectTypeOf(p)}) — ${downloads[p.slug].files.length} files`));
    return;
  }
  for (const p of targets) {
    console.log(`\n== ${p.slug} ==`);
    try {
      await publish(p, allVersions);
    } catch (e) {
      console.error(`ERROR ${p.slug}: ${e.message}`);
    }
  }
  console.log("\nDone.");
}

main();
