// tsup 9 still calls the TypeScript compiler API directly, which TypeScript 7
// no longer ships (https://github.com/egoist/tsup/issues/1405). Give tsup the
// official TypeScript 6 compatibility package so it can build the .d.ts files,
// while `pnpm typecheck` keeps using TypeScript 7. Remove once tsup is fixed.
function readPackage(pkg) {
  if (pkg.name === "tsup") {
    delete pkg.peerDependencies?.typescript;
    pkg.dependencies = {
      ...pkg.dependencies,
      typescript: "npm:@typescript/typescript6@^6.0.2",
    };
  }
  return pkg;
}

module.exports = { hooks: { readPackage } };
