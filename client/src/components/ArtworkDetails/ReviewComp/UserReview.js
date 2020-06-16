import React,{useState,useEffect} from 'react'
import "./UserReview.css"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Axios from 'axios'

const Userreview = (props) => {

    const red = {
        backgroundColor : "red"
    }
    const blue = {
        backgroundColor : "blue"
    }
    const btmMar = {
        marginBottom : "45px",
        borderBottom : "1px rgba(0,0,0,0.3) solid"
    }
    const [reviewDetails,getReviewDeatils]= useState('');
    const [userImage,getUserImage]= useState('');
    useEffect(function effectFunction(){
        var isCancelled=false;
        if(!isCancelled){
        async function getDetails(){
            const res = await Axios.get(`/api/rating/review/${props.id}`);
            // console.log(res.data);
            getReviewDeatils(res.data);
            const res2 = await Axios.get(`/api/user/profileimg/${res.data.ratedBy}`)
            getUserImage(res2.data);
        }
        getDetails();
        return () => {
            isCancelled = true;
          };
        }
    },[])
    return (
        <div style={btmMar}>
            <Row>
                <Col xs={1}>
                <img id="profilePic" src={userImage} />       
                </Col>
                <Col xs={2}>
                <h6 id="reviewUser">{reviewDetails.ratedBy}</h6>
                <h6 id="reviewDate">{reviewDetails.dtu}</h6>
                <h6 ><span id="reviewRated">Rated</span>{(reviewDetails.rating/2)}/5</h6>
                </Col>

                <Col>
                    <p id="actualReview">{reviewDetails.review}</p>
                </Col>
            </Row>
        </div>
    );
}

export default Userreview;