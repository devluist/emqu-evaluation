import React, { useState } from "react";
import { Stats } from "../features/stats/stats.component";
import { Survey } from "../features/survey/survey-form.component";
import "./home.css"


export default function Home() {
    const [showForm, setShowForm] = useState(false)

    return <div className="container">
        {(showForm && <Survey setShowForm={setShowForm} />) || <Stats showForm setShowForm={setShowForm} />}
    </div>
}
