import pytest
from pages.LoginPage import LoginPage
from pages.CartPage import CartPage
from pages.CheckoutPage import CheckoutPage
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
    checkout = CheckoutPage(page)
    checkout.place_order()
    checkout.fill_form(test_data.name, test_data.country, test_data.city, test_data.card_number, test_data.month, test_data.year)
    checkout.submit_order()
    expect(checkout.get_confirmation_purchase()).to_contain_text(test_data.confirmation_msg)
    checkout.click_ok()

@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-6'))
def test_place_order_close_modal(test_data: LoginData, page: Page):
    login = LoginPage(page)
    page.goto("/")
    login.open_login_modal()
    login.enter_username(test_data.username)
    login.enter_password(test_data.password)
    login.click_submit()
    cart = CartPage(page)
    cart.open_cart()
    checkout = CheckoutPage(page)
    checkout.place_order()
    checkout.close_purchase_modal()