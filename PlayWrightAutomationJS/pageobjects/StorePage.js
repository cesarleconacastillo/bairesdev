
class StorePage {

    constructor(page)
    {
        this.page = page;
        this.catName = page.locator("a#cat");
        this.phoneName = page.locator("//a[@id='itemc'][text()='Phones']");
        this.lapName = page.locator("//a[@id='itemc'][text()='Laptops']");
        this.monitorName = page.locator("//a[@id='itemc'][text()='Monitors']");

        this.productTitle = page.locator("div#tbodyid h4");
        this.productPrice = page.locator("div#tbodyid h5");
        this.productDescription = page.locator("div#tbodyid p");

    }

    async clickPhoneName(){
        await this.phoneName.click();
    }

    async clickLapName(){
        await this.lapName.click();
    }

    async clickMonitorName(){
        await this.monitorName.click();
    }


}
module.exports = {StorePage}