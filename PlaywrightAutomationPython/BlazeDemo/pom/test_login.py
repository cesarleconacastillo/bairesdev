import pytest
from pages.LoginPage import LoginPage
from playwright.sync_api import Page, expect
from data.LoginData import LoginData
from helper.CsvParser import CsvParser
from helper.Utils import path_from_project_root

csv_data = CsvParser(path_from_project_root('resources/test_data/login.csv'), LoginData)

@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-1'))
def test_login_success(test_data: LoginData, page: Page):
    login = LoginPage(page)
    page.goto("/")
    login.open_login_modal()
    expect(login.get_modal_name()).to_contain_text('Log in')
    login.enter_username(test_data.username)
    login.enter_password(test_data.password)
    login.click_submit()
    expect(login.get_username()).to_have_text(test_data.confirmation_msg)

@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-8'))
def test_login_sql_injection(test_data: LoginData, page: Page):
    login = LoginPage(page)
    page.goto("/")
    login.open_login_modal()
    expect(login.get_modal_name()).to_contain_text('Log in')
    login.enter_username(test_data.username)
    login.enter_password(test_data.password)
    login.click_submit()
    page.on("dialog", lambda dialog: print(dialog.message))
    page.on("dialog", lambda dialog: dialog.accept())   

@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-9'))
def test_login_long_username(test_data: LoginData, page: Page):
    login = LoginPage(page)
    page.goto("/")
    login.open_login_modal()
    expect(login.get_modal_name()).to_contain_text('Log in')
    login.enter_username(test_data.username)
    login.enter_password(test_data.password)
    login.click_submit()
    page.on("dialog", lambda dialog: print(dialog.message))
    page.on("dialog", lambda dialog: dialog.accept())   

@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-2'))
def test_login_failed(test_data: LoginData, page: Page):
    login = LoginPage(page)
    page.goto("/")
    login.open_login_modal()
    expect(login.get_modal_name()).to_contain_text('Log in')
    login.enter_username(test_data.username)
    login.enter_password(test_data.password)
    login.click_submit()
    page.on("dialog", lambda dialog: print(dialog.message))
    page.on("dialog", lambda dialog: dialog.accept())    
