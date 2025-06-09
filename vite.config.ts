import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  root: "docs",
  base: command === "build" ? '/smartbanner-tsx/' : "/",
  build: {
    outDir: "../build",
    emptyOutDir: true,
  },
  plugins: [react()],
}));
