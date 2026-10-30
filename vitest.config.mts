import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    // Only the library's own tests (not copies in .claude/worktrees or build output).
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
