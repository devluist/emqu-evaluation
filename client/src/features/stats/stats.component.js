import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants"
import "./stats.css"


export function Stats(props) {
    const defaultStats = {
        "number_surveys": 0,
        "most_fav_socialnet": "Red Social",
        "less_fav_socialnet": "Red Social",
        "avg_hours_fb": 0.0,
        "avg_hours_wa": 0.0,
        "avg_hours_tw": 0.0,
        "avg_hours_ig": 0.0,
        "avg_hours_tk": 0.0,
        "age_range_fb": "18-25",
        "age_range_wa": "18-25",
        "age_range_tw": "18-25",
        "age_range_ig": "18-25",
        "age_range_tk": "18-25"
    }
    const [statValues, setStatValues] = useState(defaultStats)


    useEffect(() => {
        fetch(API_HOST + "/stats", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())  // TODO: this is NOT detecting other errors
        .then( res => {
            setStatValues(res)
        })
        .catch( async data => {
            const errs = await data;
            console.log(errs)
        })
    }, [])


    return <div className="stats-container">
        <h2 className="container-title">Estadísticas de las encuestas</h2>

        <div className="numbers">
            <div className="card1"><span>Número de Encuestas</span>{statValues.number_surveys}</div>
            <div className="card2"><span>Red Social más usada</span>{statValues.most_fav_socialnet}</div>
            <div className="card2"><span>Red Social menos usada</span>{statValues.less_fav_socialnet}</div>

            <div className="card1"><span>Tiempo Promedio en Facebook</span>{statValues.avg_hours_fb}</div>
            <div className="card1"><span>Tiempo Promedio en WhatsApp</span>{statValues.avg_hours_wa}</div>
            <div className="card1"><span>Tiempo Promedio en Twitter</span>{statValues.avg_hours_tw}</div>
            <div className="card1"><span>Tiempo Promedio en Instagram</span>{statValues.avg_hours_ig}</div>
            <div className="card1"><span>Tiempo Promedio en TikTok</span>{statValues.avg_hours_tk}</div>

            <div className="card1"><span>Grupo de edad que mas usa Facebook</span>{statValues.age_range_fb}</div>
            <div className="card1"><span>Grupo de edad que mas usa WhatsApp</span>{statValues.age_range_wa}</div>
            <div className="card1"><span>Grupo de edad que mas usa Twitter</span>{statValues.age_range_tw}</div>
            <div className="card1"><span>Grupo de edad que mas usa Instagram</span>{statValues.age_range_ig}</div>
            <div className="card1"><span>Grupo de edad que mas usa TikTok</span>{statValues.age_range_tk}</div>
        </div>

        <button className="add-survey" onClick={() => props.setShowForm(true)}>Agregar Encuesta</button>
    </div>
}