import React from 'react';
import "./Stories.css"

function Story(){
    return(
        <div className="story">
            <div className="story__avatar">
               
            </div>
            <span className="story_uname">User Name</span>
        </div>
    )
}

function Stories() {
    return (
        <div className="stories">
           <div className="storie__presentation">
           <Story/>
            <Story/>
            <Story/>
            <Story/>
           <Story/>
            <Story/>
            <Story/>
            <Story/>
           </div>
        </div>
    )
}

export default Stories
