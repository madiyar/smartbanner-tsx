import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/style.css"],
  format: ["cjs", "esm"],
  outDir: "dist",
  dts: {
    entry: "./src/index.ts",
  },
  clean: true,
  sourcemap: false,
  treeshake: true,
  splitting: false,
  // ----------------------------
  shims: true,
  skipNodeModulesBundle: true,
  external: ["react", "react-dom"],
  minify: true,
  bundle: true,
  target: "es2015",
});
