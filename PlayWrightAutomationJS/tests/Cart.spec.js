const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

const loginDataSet = JSON.parse(JSON.stringify(require("../utils/signinData.json")));
const dataSet = JSON.parse(JSON.stringify(require("../utils/cartData.json")));

test("TC026 - Add a product in the cart", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    // Go to demoblaze page
    await page.goto(baseURL);
    //Click on signin button
    await signinPage.goSignin();
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
    //Product title should display
    expect(cartPage.productTitle).toHaveText(dataSet.title);
    //Product price should display
    expect(cartPage.productPrice).toHaveText(dataSet.price);
    //Delete a product
    await cartPage.deleteProduct();
});

test("TC027 - Remove a product from the cart", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    // Go to demoblaze page
    await page.goto(baseURL);
    await signinPage.goSignin();
    //Enter username and password
    await signinPage.signin(loginDataSet.user, loginDataSet.pwd);
    //Click on submit
    await signinPage.submit();
    const cartPage = poManager.getCartPage();
    //Click on view product detawils
    await cartPage.clickProductDetails();
    //Click on add product in the cart
    await cartPage.addProductBtn();
    //Go to cart page
    await cartPage.openCartPage();
    //Product should be removed from the cart
    await cartPage.deleteProduct();
});
