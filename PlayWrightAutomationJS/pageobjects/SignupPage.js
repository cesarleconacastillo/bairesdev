
class SignupPage {

    constructor(page)
    {
        this.page = page;
        this.openSignupModal = page.locator("#signin2");
        this.userName = page.locator("#sign-username");
        this.password = page.locator("#sign-password");
        this.signupButton = page.locator("button[onclick='register()']");
    }

    async goSignup() {
        await this.openSignupModal.click();
    }

    async signup(newUser, newPwd){
        await this.userName.fill(newUser);
        await this.password.fill(newPwd);
        await this.signupButton.click();
    }

}

module.exports = {SignupPage}