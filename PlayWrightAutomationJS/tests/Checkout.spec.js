const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

const loginDataSet = JSON.parse(JSON.stringify(require("../utils/signinData.json")));
const dataSet = JSON.parse(JSON.stringify(require("../utils/checkoutData.json")));

test(dataSet.scenario29, async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    await signinPage.goto();
    await signinPage.goSignin();
    await signinPage.signin(loginDataSet.user, loginDataSet.pwd);
    const cartPage = poManager.getCartPage();
    await cartPage.addProductBtn();
    await cartPage.openCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    checkoutPage.openCheckout();
    checkoutPage.fillForm(dataSet.cardName, dataSet.country, dataSet.city, dataSet.cardNumber, dataSet.month, dataSet.year);
    checkoutPage.submitOrder();
    await expect(checkoutPage.confirmMsg).toHaveText(dataSet.confirmMsg);

});

test(dataSet.scenario30, async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    await signinPage.goto();
    await signinPage.goSignin();
    await signinPage.signin(loginDataSet.user, loginDataSet.pwd);
    const cartPage = poManager.getCartPage();
    await page.waitForTimeout(3000);
    await cartPage.openCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    checkoutPage.openCheckout();
    await page.waitForTimeout(2000);
    checkoutPage.submitOrder();
    page.on('dialog', dialog => {
        dialog.message();
        dialog.accept();
    }); 
});
