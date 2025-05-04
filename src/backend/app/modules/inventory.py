import json
import os
from datetime import datetime

products = {}
FILE_PATH = "src/backend/app/data/products.json"

def load_products():
    try:
        with open (FILE_PATH, "r") as file:
            return json.load(file)
    except FileNotFoundError as e:
        raise e

def save_products(data):
    with open(FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)

def create_product(name, sku, price, category = None):
    print(name)
    products = load_products()
    print(products)

    product = {
        "name": name,
        "sku": sku,
        "price": price,
        "category": category
    }

    if name not in products:
        products[name] = product
        save_products(products)
    else:
        return "product already exists in database"
    
def get_product(name):
    products = load_products()

    if name in products:
        return products[name]
    else:
        return("Product is not in the database")
    
def delete_product(name):
    products = load_products()

    if name in products:
        del products[name]
        save_products(products)
        return True
    else:
        return(True)
    
def edit_product(name, sku, price, tags, category):
    products = load_products()

    if name not in products:
        raise "Product not in database"
    else:
        products[name]["sku"] = sku
        products[name]["price"] = price
        products[name]["tags"] = tags
        products[name]["category"] = category
        save_products(products)

def add_tags(name, tags: type = list):
    products = load_products()
    product = get_product(name)
    product_tags = product["tags"]

    if type(tags) != list:
        raise "Tags should be in a list"
    else:
        for tag in tags:
            product_tags.append(tag)
        
        product["tags"] = product_tags
        products[name] = product
        
        save_products(products)