import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./",
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
