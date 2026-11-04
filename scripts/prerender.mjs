// Puts the rendered page HTML into build/index.html after `vite build`.
// Search engines and AI crawlers that don't run JavaScript then see the full docs.
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

const file = new URL("../build/index.html", import.meta.url);
const placeholder = '<div id="app"></div>';

const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  logLevel: "error",
});

try {
  const { render, structuredData } = await vite.ssrLoadModule(
    "/entry-server.tsx",
  );
  const html = await readFile(file, "utf8");

  if (!html.includes(placeholder)) {
    throw new Error(`${placeholder} not found in build/index.html`);
  }

  const jsonLd = structuredData()
    .map(
      (data) =>
        `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`,
    )
    .join("\n    ");

  await writeFile(
    file,
    html
      .replace(placeholder, `<div id="app">${render()}</div>`)
      .replace("</head>", `    ${jsonLd}\n  </head>`),
  );
  console.log("Prerendered build/index.html");

  // Full docs for AI tools, always in sync with the README, the site's
  // reference tables (the README keeps only the short version) and the migration guide.
  const read = (name) => readFile(new URL(`../${name}`, import.meta.url), "utf8");
  const [readme, migration, api] = await Promise.all([
    read("README.md"),
    read("MIGRATION.md"),
    vite.ssrLoadModule("/lib/api.ts"),
  ]);
  const table = (header, rows) =>
    [
      `| ${header.join(" | ")} |`,
      `| ${header.map(() => "---").join(" | ")} |`,
      ...rows.map((cells) => `| ${cells.map((c) => c.replace(/\|/g, "\\|")).join(" | ")} |`),
    ].join("\n");
  const reference = [
    "# Reference",
    "## CSS variables",
    table(
      ["Variable", "What it changes"],
      api.CSS_VARS.map((v) => [`\`${v.name}\``, v.description]),
    ),
    "## useSmartBanner() result",
    table(
      ["Field", "Type", "Description"],
      api.HOOK_FIELDS.map((f) => [`\`${f.name}\``, `\`${f.type}\``, f.description]),
    ),
    "## FAQ",
    api.FAQ.map((item) => `**${item.q}**\n${item.a}`).join("\n\n"),
  ].join("\n\n");
  await writeFile(
    new URL("../build/llms-full.txt", import.meta.url),
    `${readme.trim()}\n\n---\n\n${reference}\n\n---\n\n${migration.trim()}\n`,
  );
  console.log("Wrote build/llms-full.txt");
} finally {
  await vite.close();
}
