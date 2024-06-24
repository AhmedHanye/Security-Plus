import asyncio
import os
from playwright.async_api import async_playwright

extension_path = os.path.abspath("../Extension/dist")
temp_dir = os.path.abspath("./temp")


async def process_page(page, url):
    await page.goto(url)
    await page.wait_for_selector("button[name=action]")
    await page.click("button[name=action]")


async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch_persistent_context(
            headless=False,
            user_data_dir=temp_dir,
            args=[
                f"--disable-extensions-except={extension_path}",
                f"--load-extension={extension_path}",
            ],
        )
        # Make sure the extension is loaded
        await asyncio.sleep(1)

        tasks = []
        for i in range(10):  # Change this to the number of pages you want to process
            url = f"https://example.com?page={i}"
            page = await browser.new_page()
            task = asyncio.create_task(process_page(page, url))
            tasks.append(task)

        # Wait for all tasks to complete
        await asyncio.gather(*tasks)

        # Wait for the browser to disconnect
        await browser.wait_for_event("disconnected")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        if "context or browser has been closed" not in str(e):
            print(e)
    finally:
        os.system(f"rmdir /s /q temp")
