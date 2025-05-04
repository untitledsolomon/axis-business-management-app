from flask import *
from flask_socketio import SocketIO
from flask_cors import CORS
from datetime import datetime
from modules import inventory

app = Flask(__name__)
CORS(app)

socketIO = SocketIO(app, cors_allowed_origins="*")

@app.route("/api/products", methods=["GET"])
def get_products():
    return inventory.load_products()

@app.route("/api/products", methods=["POST"])
def create_new_product():
    name = request.json.get("name")
    sku = request.json.get("sku")
    price = request.json.get("price")
    category = request.json.get("category")

    inventory.create_product(name, sku, price, category)
    return {"message": "product added successfully"}

@app.route("/api/editproduct", methods=["POST"])
def edit_product():
    name = request.json.get("name")
    sku = request.json.get("sku")
    price = request.json.get("price")
    category = request.json.get("category")

    inventory.edit_product(name, sku, price, [], category)
    return  {"message": "product edited successfully"}

@app.route("/api/deleteproduct", methods=["POST"])
def delete_product():
    name = request.json.get("name")

    inventory.delete_product(name)
    return  {"message": "product deleted successfully"}

if __name__ == "__main__":
    socketIO.run(app, host="0.0.0.0", debug=True, port=8000)