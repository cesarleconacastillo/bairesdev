class CheckoutPage{

    constructor(page)
    {
        this.page = page;
        this.placeorderBtn = page.locator("//*[@id='page-wrapper']/div/div[2]/button");
        this.inputName = page.locator("input#name");
        this.inputCountry = page.locator("input#country");
        this.inputCity = page.locator("input#city");
        this.inputCard = page.locator("input#card");
        this.inputMonth = page.locator("input#month");
        this.inputYear = page.locator("input#year");
        this.submitOrderBtn = page.locator("//*[@id='orderModal']/div/div/div[3]/button[2]");
        this.confirmMsg = page.locator("div.sweet-alert h2");
        this.okBtn = page.locator("/html/body/div[10]/div[7]/div/button");
    }

    async openCheckout(){
        await this.placeorderBtn.click();
    }

    async fillForm(cardName, country, city, cardNumber, month, year){
        await this.inputName.fill(cardName);
        await this.inputCountry.fill(country);
        await this.inputCity.fill(city);
        await this.inputCard.fill(cardNumber);
        await this.inputMonth.fill(month);
        await this.inputYear.fill(year);
    }

    async submitOrder(){
        await this.submitOrderBtn.click();
    }

    async okButton(){
        await this.okBtn.click();
    }

    
}

module.exports = {CheckoutPage}