import React from 'react'
import "./Suggestion.css"
function Suggestion({name}) {
    return (
        <div className="suggestion">
            <div className="suggesstion__avatar">

            </div>
            <div className="suggesstion__name">
                {name}
            </div>
            <div className="suggesttion__folow__btn">
                Follow
            </div>
        </div>
    )
}

export default Suggestion
