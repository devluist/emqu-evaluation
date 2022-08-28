from pydantic import BaseModel, EmailStr, PositiveInt ,conint
from enum import Enum, IntEnum


class Gender(str, Enum):
    male = 'Male'
    female = 'Female'
    other = 'Other'

class AgeGroup(str, Enum):
    group_18_25 = '18-25'
    group_26_33 = '26-33'
    group_34_40 = '34-40'
    group_40 = '40+'

class SocialNetwork(IntEnum):
    facebook = 1
    whatsapp = 2
    twitter = 3
    instagram = 4 
    tiktok = 5


class SurveyBase(BaseModel):
    email: EmailStr
    gender: Gender
    age_group: AgeGroup
    favorite_social_net: SocialNetwork
    avg_hours_fb: conint(ge=0, le=24)
    avg_hours_wa: conint(ge=0, le=24)
    avg_hours_tw: conint(ge=0, le=24)
    avg_hours_ig: conint(ge=0, le=24)
    avg_hours_tk: conint(ge=0, le=24)

    class Config:
        orm_mode = True

class SurveyCreate(SurveyBase):
    pass

class Survey(SurveyBase):
    id: int



class Stats(BaseModel):
    number_surveys: PositiveInt
    most_fav_socialnet: str
    less_fav_socialnet: str
    avg_hours_fb: float
    avg_hours_wa: float
    avg_hours_tw: float
    avg_hours_ig: float
    avg_hours_tk: float
    age_range_fb: AgeGroup
    age_range_wa: AgeGroup
    age_range_tw: AgeGroup
    age_range_ig: AgeGroup
    age_range_tk: AgeGroup

    class Config:
        orm_mode = True
