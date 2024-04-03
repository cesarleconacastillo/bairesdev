import pytest
from pages.StorePage import StorePage
from playwright.sync_api import Page, expect
from data.LoginData import LoginData
from helper.CsvParser import CsvParser
from helper.Utils import path_from_project_root

csv_data = CsvParser(path_from_project_root('resources/test_data/login.csv'), LoginData)


@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-1'))
def test_navigate_categories(test_data: LoginData, page: Page):
    store = StorePage(page)
    page.goto("/")
    expect(store.get_categories_title()).to_contain_text('CATEGORIES')
    expect(store.get_phones_category()).to_contain_text('Phones')
    store.open_phones_cat()
    expect(store.get_laptops_category()).to_contain_text('Laptops')
    store.open_laptops_cat()
    expect(store.get_monitors_category()).to_contain_text('Monitors')
    store.open_monitors_cat()

@pytest.mark.parametrize('test_data', csv_data.filter_on_test_case_id('TC-1'))
def test_iterate_phones(test_data: LoginData, page: Page):
    store = StorePage(page)
    page.goto("/")
    store.open_phones_cat()
    elements = store.get_phone_titles()
    for e in elements:
        print(e)
    
@pytest.mark.parametrize('test_data', csv_data.filNter_on_test_case_id('TC-1'))
def test_pagination(test_data: LoginData, page: Page):
    store = StorePage(page) 
    page.goto("/")
    expect(store.get_next_btn_text()).to_contain_text('Next')
    expect(store.get_prev_btn_text()).to_contain_text('Previous')
    store.move_page_forwards()
    store.move_page_backwards()


       
