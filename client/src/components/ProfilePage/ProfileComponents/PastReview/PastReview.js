import React,{useState,useEffect} from 'react'
import "./PastReview.css"
import moment from 'moment'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {Link} from 'react-router-dom'
import Axios from 'axios';
import {connect} from 'react-redux'

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

    const getImage = async ()=>{
        await Axios.get(`/api/artwork/artworkimg/${props.title}/${props.postedBy}`)
        .then((res)=>{
            return res.data;
        })
    }
    const handleClick=  async (e)=>{
        e.preventDefault();
        const res = await Axios.delete(`/api/rating/removerating/${encodeURI(props.title)}/${encodeURI(props.postedBy)}/${encodeURI(props.user.displayName)}`);
        props.callBack(e);
    }
    return (
        <div id="reviewDiv">
            <Row>
                <Col xs={1}>
                <img id="reviewCoverImage" src={imgSrc}/>
                </Col>
   
                <Col >
                    <div style={leftMar}>
                    
                        <h1 id="titlE" >{props.title}</h1>

                        <h1 id="artisT" >{props.postedBy}</h1>
                        <h4 id="ratinG">Rating</h4>
                        <h4 id="ratingNo">{props.rating/2}</h4>

                    </div>
                    
                    
                </Col>
                <Col xs={6}></Col>
                <Col xs={2}>
                    <h6 id="datE">{moment(props.date).format("ddd, MMM Do YYYY, h:mm:ss a")}</h6>
                </Col>
            </Row>
            
            <Row>
            <Col xs={1}></Col>
                <Col>
                <p id="reviewTitle">Review</p>
                <p id="actualReview">{props.review}</p>
                <button className="critleButtonNewToo" onClick={(e)=>handleClick(e)}>X</button>
                </Col>
            <Col xs={1}></Col>
            </Row>    
        </div>
    );
}
const mapStateToProps=(state)=>{
    return{
        user:state.auth
    }
}
export default connect(mapStateToProps)(Review);