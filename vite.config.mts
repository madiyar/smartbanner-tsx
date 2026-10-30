import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const src = (file: string) =>
  fileURLToPath(new URL(`./src/${file}`, import.meta.url));

export default defineConfig(({ command, isPreview }) => ({
  root: "docs",
  // GitHub Pages serves the site from /smartbanner-tsx/.
  base: command === "build" || isPreview ? "/smartbanner-tsx/" : "/",
  resolve: {
    // The demo imports the library by its package name, exactly like users do.
    alias: [
      { find: /^smartbanner-tsx\/style\.css$/, replacement: src("style.css") },
      { find: /^smartbanner-tsx$/, replacement: src("index.ts") },
    ],
  },
  build: {
    outDir: "../build",
    emptyOutDir: true,
  },
  plugins: [react()],
}));
