
class CartPage {

    constructor(page)
    {
        this.page = page;
        this.prodDetail = page.locator("//*[@id='tbodyid']/div[1]/div/div/h4/a");
        this.addProduct = page.locator("//*[@id='tbodyid']/div[2]/div/a");
        this.openCart = page.locator("#cartur");
        this.productTitle = page.locator("//*[@id='tbodyid']/tr/td[2]");
        this.productPrice = page.locator("//*[@id='tbodyid']/tr/td[3]");
        this.deleteBtn = page.locator("//*[@id='tbodyid']/tr/td[4]/a");
    }

    async clickProductDetails(){
        await this.prodDetail.click();
    }

    async addProductBtn(){
        await this.addProduct.click();
    }

    async openCartPage(){
        await this.openCart.click();
    }

    async deleteProduct(){
        await this.deleteBtn.click();
    }

}

module.exports = {CartPage}