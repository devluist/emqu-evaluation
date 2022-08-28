from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from .db import Base


class Survey(Base):
    __tablename__ = "surveys"

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.now())
    email = Column(String)
    gender = Column(String)
    age_group = Column(String)
    favorite_social_net = Column(String)
    avg_hours_fb = Column(Integer)
    avg_hours_wa = Column(Integer)
    avg_hours_tw = Column(Integer)
    avg_hours_ig = Column(Integer)
    avg_hours_tk = Column(Integer)
