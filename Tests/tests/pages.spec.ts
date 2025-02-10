import { test, expect } from "../config/chromium";

// * Test the extension is blocking the website by default
test("The Extension is blocking website by default", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://example.com").catch((e) => {});
  await expect(page).toHaveTitle(/Security/);
});

// * open extension home page
test("Open Extension Home Page", async ({ context, extensionId }) => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/index.html`);
  await expect(page).toHaveTitle("Security Plus: Security Check");
  // there should be a search bar with Enter URL placeholder
  const searchInput = page.locator("input[placeholder='Enter URL']");
  await expect(searchInput).toBeVisible();
});

// * open database section in the extension
test("Open Database Section", async ({ context, extensionId }) => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/index.html#/database`);
  await expect(page).toHaveTitle("Security Plus: DataBase");
  // there should be a table with the database
  const databaseTable = page.locator("table");
  await expect(databaseTable).toBeVisible();
  // there should be search input with filter-urls name
  const searchInput = page.locator("input[name='filter-urls']");
  await expect(searchInput).toBeVisible();
});

// * open settings section in the extension
test("Open Settings Section", async ({ context, extensionId }) => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/index.html#/settings`);
  await expect(page).toHaveTitle("Security Plus: Settings");
  // there are 2 switch buttons with role of switch
  const switchButtons = page.locator("button[role='switch']");
  await expect(switchButtons.nth(0)).toBeVisible();
  await expect(switchButtons.nth(1)).toBeVisible();
});
