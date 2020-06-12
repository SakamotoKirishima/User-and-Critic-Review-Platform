import React from 'react';
import "./TitleImage.css";


const titleimage = () => {
    return (
        
            <div>
                <img className="titleImage" src={require('./TitleAssets/TitleImage.png')} />
            </div>
        
    );
}

export default titleimage;