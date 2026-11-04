# Contributing

## Development

```bash
pnpm install
pnpm dev          # demo with hot reload (imports the library from src/)
pnpm test         # unit tests
pnpm typecheck
pnpm build        # library → dist/
pnpm build:docs   # shadcn registry → docs/public/r/, then demo → build/
```

## Releases

- **Library** — `.github/workflows/release.yml` runs [semantic-release](https://semantic-release.gitbook.io) when `src/`, `package.json` or the lockfile change on `main` (or `next` for pre-releases). Version comes from [Conventional Commits](https://www.conventionalcommits.org): `fix:` → patch, `feat:` → minor, `BREAKING CHANGE:` → major.
- **Demo** — `.github/workflows/deploy-docs.yml` deploys to GitHub Pages when `docs/` changes, after each library release, or manually.
- Commits scoped `demo`, `docs` or `deps-dev` (e.g. `feat(demo): ...`) never publish a library version.
