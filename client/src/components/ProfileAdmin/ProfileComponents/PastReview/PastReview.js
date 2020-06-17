import React,{useState,useEffect} from 'react'
import "./PastReview.css"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Axios from 'axios';

const Review = (props) => {
    
    const leftMar = {
        marginLeft : "20px",
        marginTop : "20px"
    }
    
    var firstTym = false;

    const [imgSrc,updateImgSrc]=useState('');
    useEffect(function effectFunction(){
        async function fetchImg(){
            if(!firstTym)
            {
                const res = await Axios.get(`/api/artwork/artworkimg/${props.title}/${props.postedBy}`);
                updateImgSrc(res.data);
                firstTym=true
            }
        }
        fetchImg();
    },[])

    const handleClick=  async (e)=>{
        e.preventDefault();
        const res = await Axios.delete(`/api/rating/removerating/${encodeURI(props.title)}/${encodeURI(props.postedBy)}/${encodeURI(props.ratedBy)}`);
        console.log(res.data);
        props.callBack(e);
        // console.log(props.ratedBy)
        // props.history.push('/profileAdmin');
    }

    return (
        <div id="reviewDiv">
            <Row>
                <Col xs={1}>
                <img className="reviewCoverImage" src={imgSrc}/>
                </Col>
                <Col >
                    <div style={leftMar}>
                        <h1 className="titlE" >{props.title}</h1>
                        <h1 className="artisT" >{props.postedBy}</h1>
                        <h4 className="ratinG">Rating</h4>
                        <h4 className="ratingNo">{props.rating}</h4>

                    </div>
                    
                    
                </Col>
                <Col xs={6}></Col>
                <Col xs={2}>
                    <h6 className="datE">23 March, 2020</h6>
                </Col>
            </Row>
            
            <Row>
            <Col xs={1}></Col>
                <Col>
                <p className="reviewTitle">Review</p>
                <p className="actualReview">{props.review}</p>
                <button onClick={(e)=>handleClick(e)}>X</button>
                </Col>
            <Col xs={1}></Col>
            
            </Row>
                       
            
            
        </div>
    );
}

export default Review;