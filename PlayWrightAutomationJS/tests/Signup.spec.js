const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

const dataSet = JSON.parse(JSON.stringify(require("../utils/signinData.json")));

test("TC009 - Sign Up Success", async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage();
    await signinPage.goto();
    const signupPage = poManager.getSignupPage();
    await signupPage.goSignup();
    const newUsr = dataSet.newUser + (Math.floor(Math.random() * 100000));
    await signupPage.signup(newUsr, dataSet.newPwd);
    page.on('dialog', dialog => {
        dialog.message();
        dialog.accept();
    }); 
});

test("Existing username for sign up", async ({page}) => {
    const poManager = new POManager(page);
    const signinPage = poManager.getSigninPage();
    await signinPage.goto();
    const signupPage = poManager.getSignupPage();
    await signupPage.goSignup();
    await signupPage.signup(dataSet.user, dataSet.pwd);
    page.on('dialog', dialog => {
        dialog.message();
        dialog.accept();
    }); 
});