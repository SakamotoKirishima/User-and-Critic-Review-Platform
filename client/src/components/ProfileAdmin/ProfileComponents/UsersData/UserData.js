import React from 'react'
import "./PastUpload.css"
import {connect} from 'react-redux'
import Axios from 'axios'


const upload =(props) => {
    const handleClick=  async (e)=>{
        e.preventDefault();
        const res = await Axios.delete(`/api/delete/${props.googleId}`);
        props.callBack(e);
        // props.history.push('/profileAdmin');
    }
    return (
            <div id="pastUploadCard" >
                    {/* <img src={require('./ReviewAssets/SamplePic.jpg')} className="coverImage" />
                    <h4 id="imageTitle">Volition</h4>   */}
                    {/*console.log(props.user)*/}
                    <div className="containeR">
                        <img src={props.picture} id="imagica" />
                        <div className="overlaY">
                            <div className="texT">
                                {props.displayName}
                            </div>
                            <div className="texT2">
                                {props.googleMail}
                            </div>
                            
                        </div>
                    </div>
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