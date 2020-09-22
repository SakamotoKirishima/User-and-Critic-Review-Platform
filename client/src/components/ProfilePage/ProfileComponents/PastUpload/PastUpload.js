import React from 'react'
import "./PastUpload.css"
import {connect} from 'react-redux'
import Axios from 'axios'
import {Link} from 'react-router-dom'


const upload = (props) => {
    const handleClick=  async (e)=>{
        e.preventDefault();
        const res = await Axios.delete(`/api/deleteartwork/${encodeURI(props.artworkName)}/${encodeURI(props.user.displayName)}`);
        props.callBack(e);
    }
    return (
            <div id="pastUploadCard" >
                <Link to={`/details/${props.id}/-1`} state={{title:props.title,postedBy:props.user.displayName}}>
                    {/* <img src={require('./ReviewAssets/SamplePic.jpg')} className="coverImage" />
                    <h4 id="imageTitle">Volition</h4>   */}
                    {/*console.log(props.user)*/}
                    <div className="containeR">
                        <img src={props.imgLink} id="imagica" />

                        <div className="overlaY">
                            <div className="texT">
                                {props.artworkName}
                            </div>
                            <div className="texT2">
                                {props.desc}
                            </div>
                        </div>
                    </div>
                    </Link>
                    <button className="critleButtonNewToo" onClick={(e)=>handleClick(e)}>X</button> 
            </div>

    );
}
const mapStateToProps=(state)=>{
    return {
        user:state.auth
    }
}
export default connect(mapStateToProps)(upload);