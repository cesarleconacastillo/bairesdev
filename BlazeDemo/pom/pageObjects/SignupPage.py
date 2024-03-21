class SignupPage:

    def __init__(self, page):
        self.page = page

    def open_signup_modal(self):
        self.page.locator("#signin2").click()

    def get_modal_name(self):
        return self.page.locator("h5#signInModalLabel")
    
    def enter_username(self, username):
        self.page.locator("#sign-username").fill(username)

    def enter_password(self, password):
        self.page.locator("#sign-password").fill(password)

    def click_submit(self):
        self.page.get_by_role("button", name="Sign up").click()

    def close_modal(self):
        self.page.locator("#signInModal div:nth-child(3)  button:nth-child(2)").click()
    
