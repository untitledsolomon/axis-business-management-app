from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def root():
    return {"message": "Axis backend api running"}