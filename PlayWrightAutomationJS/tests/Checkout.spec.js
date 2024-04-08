const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

const loginDataSet = JSON.parse(JSON.stringify(require("../utils/signinData.json")));
const dataSet = JSON.parse(JSON.stringify(require("../utils/checkoutData.json")));

test("TC029 - Place an order", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    // Go to demoblaze page
    await page.goto(baseURL);
    //Enter username and password
    await signinPage.signin(loginDataSet.user, loginDataSet.pwd);
    //Click on submit
    await signinPage.submit();
    const cartPage = poManager.getCartPage();
    //Click on view product detawils
    await cartPage.clickProductDetails();
    //Click on add product in the cart
    await cartPage.addProductBtn();
    //Click on view cart
    await cartPage.openCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    checkoutPage.openCheckout();
    checkoutPage.fillForm(dataSet.cardName, dataSet.country, dataSet.city, dataSet.cardNumber, dataSet.month, dataSet.year);
    checkoutPage.submitOrder();
    await expect(checkoutPage.confirmMsg).toHaveText(dataSet.confirmMsg);

});

test("TC030 - Empty fields in checkout form", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    // Go to demoblaze page
    await page.goto(baseURL);
    //Go to sign in page
    await signinPage.goSignin();
    //Enter username and password
    await signinPage.signin(loginDataSet.user, loginDataSet.pwd);
    //Click on submit
    await signinPage.submit();
    const cartPage = poManager.getCartPage();
    await page.waitForTimeout(3000);
    //Go to cart page
    await cartPage.openCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    //Click on Place order button
    checkoutPage.openCheckout();
    await page.waitForTimeout(2000);
    //Click on submit order button
    checkoutPage.submitOrder();
    //An error message is displayed if required fields are missed
    page.on('dialog', dialog => {
        dialog.message();
        dialog.accept();
    }); 
});
