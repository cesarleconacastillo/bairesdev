const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

const loginDataSet = JSON.parse(JSON.stringify(require("../utils/signinData.json")));
const dataSet = JSON.parse(JSON.stringify(require("../utils/cartData.json")));

test(dataSet.scenario26, async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    await signinPage.goto();
    await signinPage.goSignin();
    await signinPage.signin(loginDataSet.user, loginDataSet.pwd);
    const cartPage = poManager.getCartPage();
    await cartPage.addProductBtn();
    await cartPage.openCartPage();
    expect(cartPage.productTitle).toHaveText(dataSet.title);
    expect(cartPage.productPrice).toHaveText(dataSet.price);
    await cartPage.deleteProduct();
    await page.waitForTimeout(1000);
});

test(dataSet.scenario27, async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    await signinPage.goto();
    await signinPage.goSignin();
    await signinPage.signin(loginDataSet.user, loginDataSet.pwd);
    const cartPage = poManager.getCartPage();
    await cartPage.addProductBtn();
    await cartPage.openCartPage();
    await cartPage.deleteProduct();
    await page.waitForTimeout(1000);
});
