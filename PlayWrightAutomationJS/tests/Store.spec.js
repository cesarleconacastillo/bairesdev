const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const exp = require('constants');

const dataSet = JSON.parse(JSON.stringify(require("../utils/storeData.json")));
const prodDataSet = JSON.parse(JSON.stringify(require("../utils/productsData.json")));

test(dataSet.scenario17, async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage();
    await signinPage.goto();
    const storePage = poManager.getStorePage(); 
    expect(storePage.catName).toHaveText(dataSet.category);
    storePage.clickMonitorName();
    expect(storePage.monitorName).toHaveText(dataSet.monitor);
    storePage.clickPhoneName();
    expect(storePage.phoneName).toHaveText(dataSet.phone);
    storePage.clickLapName();
    await page.waitForTimeout(5000);
    expect(storePage.lapName).toHaveText(dataSet.laptop);
});

test(dataSet.scenario18, async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage();
    await signinPage.goto();
    const storePage = poManager.getStorePage(); 
    let i = 0;
    for (const data of prodDataSet){
        expect(await storePage.productTitle.nth(i).textContent()).toContain(data.title);
        expect(await storePage.productPrice.nth(i).textContent()).toContain(data.price);
        expect(await storePage.productDescription.nth(i).textContent()).toContain(data.description);
        i++;
    }
});

