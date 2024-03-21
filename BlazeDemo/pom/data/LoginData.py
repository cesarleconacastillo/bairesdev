from data.BaseData import BaseData
from dataclasses import dataclass


@dataclass
class LoginData(BaseData):
    username: str = ' '
    password: str = ' '
    confirmation_msg: str = ' '
    product_title: str = ' '
    product_price: str = ' '
    name: str = ' '
    country: str = ' '
    city: str = ' '
    card_number: str = ' '
    month: str = ' '
    year: str = ' '
