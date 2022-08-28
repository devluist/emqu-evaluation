from fastapi import Depends, APIRouter, HTTPException
from pydantic import ValidationError
from models import models, schemas, crud
from models.db import SessionLocal, engine
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# TODO: The endpoints require proper struture... proper error and data in response

@router.get("/")
async def index():
    return {"ok": True}


@router.post("/survey/new", response_model=schemas.Survey)
async def store_survey(surv: schemas.SurveyCreate, db: Session = Depends(get_db)):

    return crud.create_survey(db, survey=surv)

@router.get("/stats", response_model=schemas.Stats)
def check_stats(db: Session = Depends(get_db)):

    return crud.show_stats(db)
