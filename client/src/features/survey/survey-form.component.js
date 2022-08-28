import React, { useEffect, useState } from "react";
import { API_HOST } from "../../constants"
import "./survey-form.css"


export function Survey(props) {
    const defaultSurvey = {
        email: "",
        gender: "",
        age_group: "",
        favorite_social_net: "",
        avg_hours_fb: 0,
        avg_hours_wa: 0,
        avg_hours_tw: 0,
        avg_hours_ig: 0,
        avg_hours_tk: 0
    }
    const defaultEmptyErrors = {
        email: false,
        gender: false,
        age_group: false,
        favorite_social_net: false,
        avg_hours_fb: false,
        avg_hours_wa: false,
        avg_hours_tw: false,
        avg_hours_ig: false,
        avg_hours_tk: false
    }
    const [surveyData, setSurveyData] = useState(defaultSurvey);
    const [hasSendIt, setHasSendIt] = useState(false);
    const [tooltip, setTooltip] = useState({show: false, type: "success"});
    const [errors, setError] = useState(defaultEmptyErrors);


    useEffect(() => {
        if(hasSendIt){
            fetch(API_HOST+"/survey/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(surveyData)
            })
            .then(res => { 
                if(res.ok)
                    return res.json()
                else // this is only assuming 422 errors, not specific ones for each posible case
                    throw res.json()
            })
            .then( res => {
                if ( res.id ){
                    setHasSendIt(false)
                    setSurveyData(defaultSurvey)
                    setError(defaultEmptyErrors)
                    toggleTooltip("success")
                    props.setShowForm(false)
                }
                else {
                    return res.data.json()
                }
            })
            .catch( async data => {
                const errs = await data;
                setHasSendIt(false)
                toggleTooltip("error")
                handleErrors(errs.detail)
            })
        }
    }, [hasSendIt])


    function updateStateData({name, value}) {
        setSurveyData({
            ...surveyData,
            [name]: value
        })
    }

    function handleErrors(data) {

        let list = {}
        data.forEach(err => {
            let field = err.loc[1]
            list[field] = true
        })
        setError({
            ...defaultEmptyErrors,
            ...list
        })
    }

    function toggleTooltip(type) {
        setTooltip({show: true, type})
        setTimeout(() => {
            setTooltip({show: false, type}) 
        }, 3000);
    }

    let hoursIters = [];
    for(let i = 0; i <= 24; i++) {
        hoursIters.push(
            <option key={i} value={i}>{i}</option>
        )
    }


    return <div className="survey-form">
        <h2 className="form-title">Por favor llene la siguiente encuesta</h2>

        {tooltip.show && tooltip.type === "success" && <p className="tooltip-success">Se almacenó exitosamente 👍</p>}
        {tooltip.show && tooltip.type === "error" && <p className="tooltip-error">No se pudo procesar su formulario, por favor verifique 😖</p>}

        <div>
            <label htmlFor="email">Escribe tu correo</label>
            { errors.email && <label className="error" htmlFor="email">Debe verificar el correo ingresado</label> }
            <input name="email" onChange={e => updateStateData(e.target)} value={surveyData.email} />
        </div>

        <div>
            <label htmlFor="favorite_social_net">Selecciona tu red social Favorita</label>
            { errors.favorite_social_net && <label className="error" htmlFor="favorite_social_net">Debe verificar su selección</label> }
            <select name="favorite_social_net" onChange={e => updateStateData(e.target)} value={surveyData.favorite_social_net}>
                <option>Seleccione...</option>
                <option value="1">Facebook</option>
                <option value="2">Whatsapp</option>
                <option value="3">Twitter</option>
                <option value="4">Instagram</option>
                <option value="5">TikTok</option>
            </select>
        </div>

        <div>
            <label htmlFor="gender">Selecciona genero con que te identificas</label>
            { errors.gender && <label className="error" htmlFor="gender">Debe verificar su selección</label> }
            <select name="gender" onChange={e => updateStateData(e.target)} value={surveyData.gender}>
                <option>Seleccione...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>

        <div>
            <label htmlFor="age_group">Selecciona tu edad</label>
            { errors.age_group && <label className="error" htmlFor="age_group">Debe verificar su selección</label> }
            <select name="age_group" onChange={e => updateStateData(e.target)} value={surveyData.age_group}>
                <option>Seleccione...</option>
                <option value="18-25">18-25</option>
                <option value="26-33">26-33</option>
                <option value="34-40">34-40</option>
                <option value="40+">40+</option>
            </select>
        </div>

        <div>
            <label htmlFor="avg_hours_fb">Promedio de horas al día que pasas en Facebook</label>
            { errors.avg_hours_fb && <label className="error" htmlFor="avg_hours_fb">Debe verificar su selección</label> }
            <select name="avg_hours_fb" onChange={e => updateStateData(e.target)} value={surveyData.avg_hours_fb}>
                {hoursIters}
            </select>
        </div>

        <div>
            <label htmlFor="avg_hours_wa">Promedio de horas al día que pasas en WhatsApp</label>
            { errors.avg_hours_wa && <label className="error" htmlFor="avg_hours_wa">Debe verificar su selección</label> }
            <select name="avg_hours_wa" onChange={e => updateStateData(e.target)} value={surveyData.avg_hours_wa}>
                {hoursIters}
            </select>
        </div>

        <div>
            <label htmlFor="avg_hours_tw">Promedio de horas al día que pasas en Twitter</label>
            { errors.avg_hours_tw && <label className="error" htmlFor="avg_hours_tw">Debe verificar su selección</label> }
            <select name="avg_hours_tw" onChange={e => updateStateData(e.target)} value={surveyData.avg_hours_tw}>
                {hoursIters}
            </select>
        </div>

        <div>
            <label htmlFor="avg_hours_ig">Promedio de horas al día que pasas en Instagram</label>
            { errors.avg_hours_ig && <label className="error" htmlFor="avg_hours_ig">Debe verificar su selección</label> }
            <select name="avg_hours_ig" onChange={e => updateStateData(e.target)} value={surveyData.avg_hours_ig}>
                {hoursIters}
            </select>
        </div>

        <div>
            <label htmlFor="">Promedio de horas al día que pasas en TikTok</label>
            { errors.avg_hours_tk && <label className="error" htmlFor="avg_hours_tk">Debe verificar su selección</label> }
            <select name="avg_hours_tk" onChange={e => updateStateData(e.target)} value={surveyData.avg_hours_tk}>
                {hoursIters}
            </select>
        </div>

        <button className="btn-form" onClick={e => setHasSendIt(true)} disabled={hasSendIt} type="submit">Enviar Encuesta</button>
    </div>
}