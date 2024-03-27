class StorePage:

    def __init__(self, page):
        self.page = page

    def get_categories_title(self):
        return self.page.locator("a#cat")
    
    def get_phones_category(self):
        return self.page.locator("div.list-group a:nth-child(2)")
    
    def get_laptops_category(self):
        return self.page.locator("div.list-group a:nth-child(3)")
    
    def get_monitors_category(self):
        return self.page.locator("div.list-group a:nth-child(4)")
    
    def open_phones_cat(self):
        return self.page.locator("div.list-group a:nth-child(2)").click()
    
    def open_laptops_cat(self):
        return self.page.locator("div.list-group a:nth-child(3)").click()
    
    def open_monitors_cat(self):
        return self.page.locator("div.list-group a:nth-child(4)").click()
    
    def get_phone_titles(self):
        ele = self.page.locator("div#tbodyid h4 a")
        return ele.all_text_contents()
    
    def get_next_btn_text(self):
        return self.page.locator("button#next2")
    
    def get_prev_btn_text(self):
        return self.page.locator("button#prev2")
    
    def move_page_forwards(self):
        self.page.locator("button#next2").click()
    
    def move_page_backwards(self):
        self.page.locator("button#prev2").click()