import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://herostudios.dev",
  output: "static",
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  build: {
    inlineStylesheets: "auto",
  },
});
