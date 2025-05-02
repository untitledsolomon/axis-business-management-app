from fastapi import APIRouter
from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
from uuid import uuid4
from ..modules.inventory import *

router = APIRouter()

@router.get("/products")
def get_Products():
    return load_products()

@router.post("/products")
async def create_new_product(request: Request):
    data = await request.json()
    create_product(data.get("name"), data.get("sku"), data.get("price"), data.get("category"))
    return {"message": "product added successfully"}