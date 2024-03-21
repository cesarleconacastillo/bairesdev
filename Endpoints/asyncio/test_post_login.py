
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):

    api_request_context = await playwright.request.new_context(base_url="https://api.demoblaze.com")
    data = {
        "username": "userautomation",
        "password": "UDQkJHdvcmQ="
    }

    # Create a repository.
    response = await api_request_context.post(
        "/login",
        data=data,
    )
    assert response.ok
    print(f"login value: {response}")

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())