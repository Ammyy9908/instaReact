import React from 'react';
import { useHistory } from 'react-router';
import "./StartCard.css"

function StartCard({title,subtitle,button,Icon,link}) {

    const history = useHistory();

    const handler = ()=>{
        history.push(link);
    }
    return (
        <div className="startCard">
            <div className="card__top">
            <div className="start__card__icon">
                <Icon/>
            </div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            </div>
            <button className="card__button" onClick={handler}>
                {button}
            </button>
        </div>
    )
}

export default StartCard

/**
 * 
 * url(/static/bundles/es6/sprite_glyphs_55fdcdb93af0.png/55fdcdb93af0.png)
 */