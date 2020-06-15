import React,{useState,useEffect} from 'react'
import "./Artwork.css"
import Axios from 'axios'

const Artwork = (props) => {

    var firstTym = false;

    const [imgSrc,updateImgSrc]=useState('');
    useEffect(function effectFunction(){
        async function fetchImg(){
            if(!firstTym)
            {
                const res = await Axios.get(`/api/artwork/artworkimg/${props.title}/${props.postedBy}`);
                updateImgSrc(res.data);
                console.log(res.data);
                firstTym=true
            }
        }
        fetchImg();
    },[])

    return (
            <div id="pastUploadCard" >
                    
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
            </div>

    );
}

export default Artwork;