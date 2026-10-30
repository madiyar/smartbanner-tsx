/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main", { name: "next", prerelease: true }],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        // Understands both `feat!: ...` and a `BREAKING CHANGE:` footer.
        preset: "conventionalcommits",
        releaseRules: [
          // Demo and docs changes never publish a new library version.
          { scope: "demo", release: false },
          { scope: "docs", release: false },
          // Dev tooling updates: use `chore(deps-dev): ...` or `build(deps-dev): ...`.
          { scope: "deps-dev", release: false },
        ],
      },
    ],
    ["@semantic-release/release-notes-generator", { preset: "conventionalcommits" }],
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
};
