const {SigninPage} = require('./SigninPage');
const {SignupPage} = require('./SignupPage');
const {StorePage} = require('./StorePage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');

class POManager {

    constructor(page)
    {
        this.page = page;
        this.signinPage = new SigninPage (this.page);
        this.signupPage = new SignupPage (this.page);
        this.storePage = new StorePage (this.page);
        this.cartPage = new CartPage (this.page);
        this.checkoutPage = new CheckoutPage (this.page);
    }


    getSigninPage(){
        return this.signinPage;
    }

    getSignupPage(){
        return this.signupPage;
    }

    getStorePage(){
        return this.storePage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

}

module.exports = {POManager}