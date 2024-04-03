import pytest
from pages.LoginPage import LoginPage
from pages.CartPage import CartPage
from pages.StorePage import StorePage
from playwright.sync_api import Page, expect
from data.LoginData import LoginData
from helper.CsvParser import CsvParser
from helper.Utils import path_from_project_root

csv_data = CsvParser(path_from_project_root('resources/test_data/login.csv'), LoginData)


@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-6'))
def test_add_product_in_cart(test_data: LoginData, page: Page):
    login = LoginPage(page)
    page.goto("/")
    login.open_login_modal()
    login.enter_username(test_data.username)
    login.enter_password(test_data.password)
    login.click_submit()
    cart = CartPage(page)
    cart.go_product_detail()
    cart.add_product()
    page.on("dialog", lambda dialog: dialog.accept())
    cart.open_cart()
    expect(cart.get_product_title()).to_contain_text(test_data.product_title)
    expect(cart.get_product_price()).to_contain_text(test_data.product_price)

@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-6'))
def test_add_multiple_products(test_data: LoginData, page: Page):
    login = LoginPage(page)
    page.goto("/")
    login.open_login_modal()
    login.enter_username(test_data.username)
    login.enter_password(test_data.password)
    login.click_submit()
    store = StorePage(page)
    store.open_laptops_cat()
    cart = CartPage(page)
    cart.add_products()
    cart.open_cart()

@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-6'))
def test_remove_product_from(test_data: LoginData, page: Page):
    login = LoginPage(page)
    page.goto("/")
    login.open_login_modal()
    login.enter_username(test_data.username)
    login.enter_password(test_data.password)
    login.click_submit()
    cart = CartPage(page)
    cart.go_product_detail()
    cart.open_cart()
    expect(cart.get_product_title()).to_contain_text(test_data.product_title)
    expect(cart.get_product_price()).to_contain_text(test_data.product_price)
    cart.click_delete()
    expect(cart.get_product_title()).to_have_count(0)
    expect(cart.get_product_price()).to_have_count(0)