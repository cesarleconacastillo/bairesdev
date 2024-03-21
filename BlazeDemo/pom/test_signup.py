import pytest
from pageObjects.SignupPage import SignupPage
from playwright.sync_api import Page, expect
from data.LoginData import LoginData
from helper.CsvParser import CsvParser
from helper.Utils import path_from_project_root

csv_data = CsvParser(path_from_project_root('resources/test_data/login.csv'), LoginData)


@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-3'))
def test_singup_success(test_data: LoginData, page: Page):
    signup = SignupPage(page)
    page.goto("/")
    signup.open_signup_modal()
    expect(signup.get_modal_name()).to_contain_text('Sign up')
    signup.enter_username(test_data.username)
    signup.enter_password(test_data.password)
    signup.click_submit()
    page.on("dialog", lambda dialog: dialog.accept())


@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-4'))
def test_signup_close_modal(test_data: LoginData, page: Page):
    signup = SignupPage(page)
    page.goto("/")
    signup.open_signup_modal()
    expect(signup.get_modal_name()).to_contain_text('Sign up')
    signup.close_modal()