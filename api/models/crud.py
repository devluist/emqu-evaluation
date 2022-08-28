from sqlalchemy.orm import Session
from sqlalchemy import distinct
from sqlalchemy.sql.expression import func
from . import models, schemas


def create_survey(db: Session, survey: schemas.SurveyCreate):

    surv = models.Survey(
        email = survey.email,
        gender = survey.gender,
        age_group = survey.age_group,
        favorite_social_net = survey.favorite_social_net,
        avg_hours_fb = survey.avg_hours_fb,
        avg_hours_wa = survey.avg_hours_wa,
        avg_hours_tw = survey.avg_hours_tw,
        avg_hours_ig = survey.avg_hours_ig,
        avg_hours_tk = survey.avg_hours_tk
    )
    db.add(surv)
    db.commit()
    db.refresh(surv)

    return surv

def show_stats(db: Session):
    """
        This function could be improved by separiting in multiple functions based on stats required
    """
    SocialNetwork = schemas.SocialNetwork
    Survey = models.Survey
    qNumberSurveys = db.query(Survey).count()

    # TODO: esto puede ser optimizado, pero implicaria reestructurar el esquema de los Surveys
    qAvgTimeFb = db.query(func.avg(Survey.avg_hours_fb)).scalar()
    qAvgTimeWa = db.query(func.avg(Survey.avg_hours_wa)).scalar()
    qAvgTimeTw = db.query(func.avg(Survey.avg_hours_tw)).scalar()
    qAvgTimeIg = db.query(func.avg(Survey.avg_hours_ig)).scalar()
    qAvgTimeTk = db.query(func.avg(Survey.avg_hours_tk)).scalar()

    # TODO: estas las intente pero no las pude terminar, me estaban quitando tiempo asi, que las hice en el api y no en la BD
    all_socialnet = db.query(Survey.favorite_social_net).all()
    favs = [
        0,
        0,
        0,
        0,
        0
    ]
    for net in all_socialnet:
        if net[0] == "1":
            favs[0] += 1

        elif net[0] == "2":
            favs[1] += 1

        elif net[0] == "3":
            favs[2] += 1

        elif net[0] == "4":
            favs[3] += 1

        elif net[0] == "5":
            favs[4] += 1


    return schemas.Stats(
        number_surveys = qNumberSurveys,
        avg_hours_fb = round(qAvgTimeFb, 2),
        avg_hours_wa = round(qAvgTimeWa, 2),
        avg_hours_tw = round(qAvgTimeTw, 2),
        avg_hours_ig = round(qAvgTimeIg, 2),
        avg_hours_tk = round(qAvgTimeTk, 2),

        most_fav_socialnet = SocialNetwork(int(favs.index(max(favs)))).name.capitalize(),
        less_fav_socialnet = SocialNetwork(int(favs.index(min(favs)))).name.capitalize(),

        age_range_fb = "18-25",
        age_range_wa = "18-25",
        age_range_tw = "18-25",
        age_range_ig = "18-25",
        age_range_tk = "18-25"
    )
