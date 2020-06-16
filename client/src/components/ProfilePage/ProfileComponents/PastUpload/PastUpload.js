import React from 'react'
import "./PastUpload.css"
import {connect} from 'react-redux'

const upload = (props) => {
    return (
            <div id="pastUploadCard" >
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
            </div>

    );
}
const mapStateToProps=(state)=>{
    return {
        user:state.auth
    }
}
export default connect(mapStateToProps)(upload);