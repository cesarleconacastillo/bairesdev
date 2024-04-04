const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

const dataSet = JSON.parse(JSON.stringify(require("../utils/signinData.json")));

test("TC001 - Login Success", async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    await signinPage.goto(); 	
    //1. Click on Sign in
    await signinPage.goSignin();
    //2. Enter a valid username and password
    //3. Click on Login button
    await signinPage.signin(dataSet.user, dataSet.pwd);
    //Welcome user message is displayed
    await expect(signinPage.welcomeName).toHaveText(dataSet.welcomeUser);
});

test("TC002 - Invalid username or password", async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage()
    await signinPage.goto();
    //1. Click on Sign in
    await signinPage.goSignin();
    //2. Enter a valid username and password
    //3. Click on Login button
    await signinPage.signin(dataSet.invalidUser, dataSet.invalidPwd);
    // Generic error message should display for empty username or password is displayed
    page.on('dialog', dialog => {
        dialog.message();
        dialog.accept();
    }); 
});