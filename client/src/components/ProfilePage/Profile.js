import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import {handleSubmit} from '../../actions/updateUserDetails'
import Upload from "./ProfileComponents/PastUpload/PastUpload"
import Review from "./ProfileComponents/PastReview/PastReview"
import {Link,withRouter} from 'react-router-dom'

import "./Profile.css"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Profile = (props)=>{
    var Artworks=[];
    var i=0;
    const [userdata,setUserData]=useState({
        name:"Loading",
        picture:"",
        displayName:"Loading",
        googleId:"",
        googleMail:"Loading",
        dateOfJoining:"Loading",
        genderType:"Loading",
        userArtworks:[]
    })
    useEffect(()=>{
        if(props.user){
            setUserData({
                name:props.user.userName,
                picture:props.user.picture,
                displayName:props.user.displayName,
                googleId:props.user.googleId,
                googleMail:props.user.googleMail,
                dateOfJoining:props.user.dateOfJoining,
                genderType:props.user.genderType,
                userArtworks:Artworks
            })  
        }
    },[]);

    const [userArtworks,updateUserArtworks] = useState([]);
    useEffect(function effectFunction(){
        if(props.user)
        {
            if(props.user.displayName=="")
                alert('Please set your Display Name');
            async function fetchArtworks(){
                const res = await Axios.get(`/api/artwork/byuser/${props.user.displayName}`);
                updateUserArtworks(res.data);
            }
            fetchArtworks()
        }
    },[])

    const [userReviews,updateUserReviews] = useState([]);
    useEffect(function effectFunction(){
        if(props.user)
        {
            async function fetchReviews(){
                const res = await Axios.get(`api/rating/getrating/${props.user.displayName}`);
                updateUserReviews(res.data);
            }
            fetchReviews()
        }
    },[])

    const [editName,toggleEdit]= useState(0);
    const [curDisName,setDispName]=useState(props.user?props.user.displayName:'');

    const userProfileMargin = {
        marginTop : "2em"
    }
    const center = {
        textAlign : "center"
    }

    const topMargin = {
        marginTop : "100px"
    }

    if(!props.user)
        props.history.push('/')
    return(
        <div className="WrapperMain">
            <div>   
                    <div style={topMargin}>
                        <Row className="align-items-center" style={userProfileMargin}>
                            <Col style={center}>
                                <img id="profilePic" src={userdata.picture} />
                                <h1 id="profileName">{userdata.displayName}
                                    <span id="fredit">
                                        <button className="critleButtonNew"  onClick={(e)=>{e.preventDefault();toggleEdit(!editName)}}>
                                            Edit
                                        </button>   
                                    </span>
                                </h1>
                                {
                                    editName?
                                    <div>
                                        <input style={{'width':'200px'}} onChange={e=>setDispName(e.target.value)} value={curDisName}/>
                                        <button className="critleButtonNew" 
                                            onClick={(e)=>{
                                                    e.preventDefault();
                                                    props.updateUserDetails(curDisName);
                                                    props.history.push('/')
                                                    }}>
                                                    Change Name
                                        </button>
                                        <button className="critleButtonNew" onClick={(e)=>{e.preventDefault();toggleEdit(!editName)}}>
                                            Cancel
                                        </button>
                                    </div>
                                    :null
                                }
                                <h4 id="profileRealName">{userdata.name}</h4>
                                <h4 id="profileMail">{userdata.googleMail}</h4>
                                <Link to="/upload">
                                    <button className="critleButtonNew">Upload Artwork</button>
                                </Link>
                            </Col>
                        </Row>
                    </div>

                    <div className="center">
                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">Recent Uploads</h1>
                        </div>
                           
                        <div className="pastUploadDiv">
                            {   userArtworks.length?
                                userArtworks.map(artwork=>(
                                    <Upload id={artwork._id} callBack={(e)=>{e.preventDefault();alert('Deleted Successfully');props.history.push("/")}} key={i++} imgLink={artwork.embedded_link} artworkName={artwork.title} desc={artwork.description}/>
                                )):null
                            }
                        </div>
                    </div>

                    <div className="center">
                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">Recent Reviews</h1>
                        </div>
                        <div>   
                            {
                                userReviews.length?
                                userReviews.map(review=>(
                                    <Review callBack={(e)=>{e.preventDefault();alert('Deleted Successfully');props.history.push("/")}} key={i++} date={review.dtu} title={review.title} postedBy={review.postedBy} rating={review.rating} review={review.review} date={review.dtu}/>
                                )):null
                            }
                        </div>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.auth
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        updateUserDetails:(newName)=>{dispatch(handleSubmit(newName))}
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Profile));