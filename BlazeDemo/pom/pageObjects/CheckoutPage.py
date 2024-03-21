class CheckoutPage:

    def __init__(self, page):
        self.page = page

    def place_order(self):
        self.page.get_by_role("button", name="Place Order").click()
    
    def fill_form(self, name, country, city, card, month, year):
        self.page.locator("input#name").fill(name)
        self.page.locator("input#country").fill(country)
        self.page.locator("input#city").fill(city)
        self.page.locator("input#card").fill(card)
        self.page.locator("input#month").fill(month)
        self.page.locator("input#year").fill(year)

    def submit_order(self):
        self.page.get_by_role("button", name="Purchase").click()

    def get_confirmation_purchase(self):
        return self.page.get_by_text("Thank you for your purchase!")
    
    def click_ok(self):
        self.page.get_by_role("button", name="OK").click()

    def close_purchase_modal(self):
        self.page.get_by_role("button", name="Purchase").click()