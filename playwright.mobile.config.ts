import { defineConfig, devices } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  use: {
    browserName: "chromium",
    ...devices["Pixel 5"],
    headless: true,
    baseURL: process.env.BASE_URL,
  },
  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 13"] },
    },
  ],
});
