
class SigninPage {

    constructor(page)
    {
        this.page = page;
        this.openSigninModal = page.locator("#login2");
        this.userName = page.locator("#loginusername");
        this.password = page.locator("#loginpassword");
        this.signInButton = page.locator("button[onclick='logIn()']");
        this.welcomeName = page.locator("#nameofuser");
    }

    async goto() {
        await this.page.goto("https://www.demoblaze.com/");
    }

    async goSignin() {
        await this.openSigninModal.click();
    }

    async signin(user, pwd){
        await this.userName.fill(user);
        await this.password.fill(pwd);
        await this.signInButton.click();
    }

}

module.exports = {SigninPage}