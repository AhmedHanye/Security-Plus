import { test, expect } from "../config/chromium";

const controlButtons: controlButtons = {
  "allow-domain": "button[title='alt+a']",
  "block-domain": "button[title='alt+b']",
  "allow-page": "button[title='alt+c']",
  "block-page": "button[title='alt+s']",
};

// * Test allow website functionality
test("Allow Page Button", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://example.com").catch((e) => {});
  await page.click(controlButtons["allow-page"]);
  await expect(page).toHaveTitle("Example Domain");
});

// * Test block website functionality
test("Block Page button", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://example.com").catch((e) => {});
  await page.click(controlButtons["block-page"]);
  await expect(page).toHaveURL(/chrome-extension:\/\/.*\/block\/.*/);
});

// * Test allow domain functionality
test("Allow Domain Button", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://github.com").catch((e) => {});
  await page.click(controlButtons["allow-domain"]);
  await expect(page).toHaveTitle(/GitHub/);
  await page.goto("https://github.com/AhmedHanye");
  await expect(page).toHaveTitle(/AhmedHanye/);
});

// * Test block domain functionality
test("Block Domain Button", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://github.com").catch((e) => {});
  await page.click(controlButtons["block-domain"]);
  await expect(page).toHaveURL(/chrome-extension:\/\/.*\/block\/.*/);
  await page.goto("https://github.com/AhmedHanye").catch((e) => {});
  await expect(page).toHaveURL(/chrome-extension:\/\/.*\/block\/.*/);
});

// TODO: add more advanced test cases for the control buttons functionality
