const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

const dataSet = JSON.parse(JSON.stringify(require("../utils/signinData.json")));


test.only("TC001 - Login Success", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    // Go to demoblaze page
    await page.goto(baseURL); 	
    //1. Click on Sign in
    await signinPage.goSignin();
    //2. Enter a valid username and password
    await signinPage.signin(dataSet.user, dataSet.pwd);
    //3. Click on Login button
    await signinPage.submit();
    //Welcome user message is displayed
    await expect(signinPage.welcomeName).toHaveText(dataSet.welcomeUser);
});

test("TC002 - Invalid username or password", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    // Go to demoblaze page
    await page.goto(baseURL);
    //1. Click on Sign in
    await signinPage.goSignin();
    //2. Enter a valid username and password
    await signinPage.signin(dataSet.invalidUser, dataSet.invalidPwd);
    //3. Click on Login button
    await signinPage.submit();
    // Generic error message should display for empty username or password is displayed
    page.on('dialog', dialog => {
        dialog.message();
        dialog.accept();
    }); 
});