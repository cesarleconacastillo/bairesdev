const {test, expect, request} = require('@playwright/test');

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const brewResponse = await apiContext.get("https://web-api.staging.bellwether.link/v1/brew-methods");
    expect(brewResponse.ok()).toBeTruthy();
    const brewResponseJson = brewResponse.json();
    console.log(brewResponseJson);
});