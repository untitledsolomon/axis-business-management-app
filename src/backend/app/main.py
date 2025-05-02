from flask import *
from flask_socketio import SocketIO
from flask_cors import CORS
from datetime import datetime
from modules.inventory import *

app = Flask(__name__)
CORS(app)

socketIO = SocketIO(app, cors_allowed_origins="*")

@app.route("/api/products", methods=["GET"])
def get_Products():
    return load_products()

@app.route("/api/products", methods=["POST"])
def create_new_product():
    name = request.json.get("name")
    sku = request.json.get("sku")
    price = request.json.get("price")
    category = request.json.get("category")

    create_product(name, sku, price, category)
    return {"message": "product added successfully"}

if __name__ == "__main__":
    socketIO.run(app, host="0.0.0.0", debug=True, port=8000)