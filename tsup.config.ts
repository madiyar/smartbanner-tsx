import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/style.css", "./src/classic.css"],
  format: ["cjs", "esm"],
  outDir: "dist",
  dts: {
    entry: "./src/index.ts",
  },
  clean: true,
  sourcemap: false,
  splitting: false,
  external: ["react", "react-dom"],
  minify: true,
  target: "es2018",
  // Lets Next.js App Router users import the component from server components.
  banner: { js: '"use client";' },
});
