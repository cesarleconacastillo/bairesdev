class CartPage:

    def __init__(self, page):
        self.page = page

    def go_product_detail(self):
        self.page.locator("//*[@id='tbodyid']/div[1]/div/div/h4/a").click()

    def add_product(self):
        self.page.locator("//*[@id='tbodyid']/div[2]/div/a").click()

    def open_cart(self):
        self.page.locator("#cartur").click()

    def get_product_title(self):
        return self.page.locator("//*[@id='tbodyid']/tr/td[2]")

    def get_product_price(self):
        return self.page.locator("//*[@id='tbodyid']/tr/td[3]")

    def click_delete(self):
        self.page.locator("//*[@id='tbodyid']/tr/td[4]/a").click()

    def add_products(self):
        laptop = self.page.locator("div#tbodyid h4 a").all()
        for l in laptop:
            l.click()
            self.add_product()
            self.page.element("//*[@id='navbarExample']/ul/li[1]/a").click()