import React,{useState,useEffect} from 'react'
import "./Artwork.css"
import Axios from 'axios'
import {Link} from 'react-router-dom'
import ReviewComp from '../../ArtworkDetails/Details'

const Artwork = (props) => {
    
    const [show,toggleShow] =  useState(0);

    const handleClick = (e) =>{
        e.preventDefault();
        toggleShow(!show);
        console.log('yepyep');
    }
    
    return (
            <div id="pastUploadCard" >
                <Link to={`/details/${props.id}/${props.displayName}`} state={{title:props.title,postedBy:props.postedBy}}>
                        <div className="containeR">
                            
                                <img src={props.embedded_link} id="imagica" />
                            
                            <div className="overlaY">
                                <div className="texT">
                                    {props.title}
                                </div>
                                <div className="texT2">
                                    {props.postedBy}
                                </div>
                            </div>
                        </div>
                </Link>
            </div>

    );
}

export default Artwork;