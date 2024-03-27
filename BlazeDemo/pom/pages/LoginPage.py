class LoginPage:

    def __init__(self, page):
        self.page = page

    def open_login_modal(self):
        self.page.get_by_role("link", name="Log in").click()

    def enter_username(self, username):
        self.page.locator("#loginusername").fill(username)

    def enter_password(self, password):
        self.page.locator("#loginpassword").fill(password)

    def click_submit(self):
        self.page.get_by_role("button", name="Log in").click()

    def get_modal_name(self):
        return self.page.locator("h5#logInModalLabel")

    def get_username(self):
        return self.page.get_by_role("link", name="Welcome userautomation")
    
    