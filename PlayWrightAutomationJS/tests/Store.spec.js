const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const exp = require('constants');

const dataSet = JSON.parse(JSON.stringify(require("../utils/storeData.json")));
const prodDataSet = JSON.parse(JSON.stringify(require("../utils/productsData.json")));

test("TC017 - Navigate through store categories", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage();
    // Go to demoblaze page
    await page.goto(baseURL);
    const storePage = poManager.getStorePage(); 
    //On home page, review Categories
    //Categories title should display
    expect(storePage.catName).toHaveText(dataSet.category);
    //Click on Monitors
    storePage.clickMonitorName();
    //Monitors categories should display
    expect(storePage.monitorName).toHaveText(dataSet.monitor);
    //Click on Phones
    storePage.clickPhoneName();
    //Phones categories should display
    expect(storePage.phoneName).toHaveText(dataSet.phone);
    // Click on Laptops
    storePage.clickLapName();
    await page.waitForTimeout(5000);
    //Laptops categories should display
    expect(storePage.lapName).toHaveText(dataSet.laptop);
});

test("TC018 - Review title, price and description for all products under a category", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage();
    // Go to demoblaze page
    await page.goto(baseURL);
    //Click on Phones
    storePage.clickPhoneName();
    const storePage = poManager.getStorePage(); 
    let i = 0;
    for (const data of prodDataSet){
        //Title for each product should match the expected result
        expect(await storePage.productTitle.nth(i).textContent()).toContain(data.title);
        //Price for each product should match the expected result
        expect(await storePage.productPrice.nth(i).textContent()).toContain(data.price);
        //Description for each product should match the expected result
        expect(await storePage.productDescription.nth(i).textContent()).toContain(data.description);
        i++;
    }
});

