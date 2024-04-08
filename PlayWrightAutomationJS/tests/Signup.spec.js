const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

const dataSet = JSON.parse(JSON.stringify(require("../utils/signinData.json")));

test("TC009 - Sign Up Success", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage();
    // Go to demoblaze page
    await page.goto(baseURL);
    const signupPage = poManager.getSignupPage();
    // Open Sign up modal
    await signupPage.goSignup();
    const newUsr = dataSet.newUser + (Math.floor(Math.random() * 100000));
    //Enter a valid username and password
    await signupPage.signup(newUsr, dataSet.newPwd);
    //Click on Sign Up button
    await signupPage.submit();
    //Click on Confirmation message & Confirmation message is closed
    page.on('dialog', dialog => {
        dialog.message();
        dialog.accept();
    }); 
});

test("TC010 - Existing username for sign up", async ({baseURL, page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage();
    // Go to demoblaze page
    await page.goto(baseURL);
    const signupPage = poManager.getSignupPage();
    //Open Sign up modal
    await signupPage.goSignup();
    //Enter an existing username and password
    await signupPage.signup(dataSet.user, dataSet.pwd);
    //Click on Sign Up button
    await signupPage.submit();
    //Close popup message & Popup with error message "This user already exist" is closed
    page.on('dialog', dialog => {
        dialog.message();
        dialog.accept();
    }); 
});