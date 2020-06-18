import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import "./Details.css"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Axios from 'axios'
import {connect} from 'react-redux'
import Review from "./ReviewComp/UserReview"
import Nav from 'react-bootstrap/Nav'
// import Axios from 'axios'
const Details = (props) => {
    // const {pas} = props.location.state
    
    // var click = false;
    const center = {
        textAlign : "center"
    }
    const right = {
        textAlign : "right"
    }
    const left = {
        textAlign : "left"
    }
    var i=0;
    const [details,getDetails] = useState([]);
    const [reviews,getReviews] = useState([]);
    const [rank,getRank]= useState('');
    const [click,toggleClick]=useState(0);
    const [rating,setRating]=useState('');
    const [userReview,setUserReview]=useState('');
    useEffect(function effectFunction(){
        let isCancelled = false;
        async function fetchArtwork(){
            if(!isCancelled){
            const res = await Axios.get(`/api/artwork/${props.match.params.id}`);
            // const json = await res.json();
            // console.log(res.data)
            getDetails(res.data);
            const title = encodeURI(res.data.title);
            const postedBy = encodeURI(res.data.postedBy);
            const ratingRes = await Axios.get(`/api/rating/getartworkrating/${title}/${postedBy}`);
            getReviews(ratingRes.data.ratings)
            // console.log(ratingRes.data.ratings);
            const rank = await Axios.get(`/api/artwork/rank/${props.match.params.id}`);
            getRank(rank.data);
            }
            // console.log(res.data);
        }
            fetchArtwork()
        return () => {
                isCancelled = true;
              };
    },[])
    async function submitReview(body){
        const res = await Axios.post('/api/rating/rateartwork',body);
        return res;
    }
    const  handleReviewSubmit= async(e)=>{
        e.preventDefault();
        const body = {
            "title":details.title,
            "postedBy":details.postedBy,
            "ratedBy":props.match.params.displayName,
            "rating":rating*2,
            "review":userReview
        }
        const res = await submitReview(body);
        handleCancelClick(null);
        alert('Review Submitted Successfully');
        props.history.push('/profile');
        console.log(res);
    }
    const handleCancelClick=(e)=>{
        if(e)
            e.preventDefault();
        toggleClick(0)
    }
    return (
        <div>
            {!click?
                <div>
            <div id="artworkDetails">
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={2}>
                    <img className="reviewCoverImage" src={details.embedded_link}/>
                    </Col>
                    <Col id="totalDetailsDiv" className="align-items-center">
                        <h1 id="artTitle">{details.title}</h1>
                        
                        
                        <h3 id="artArtist">{details.postedBy}</h3>
                        <p id="artDescription">{details.description}</p>
                        {/* {console.log(props.match.params.displayName)} */}
                        {((!(props.match.params.displayName=='-1')))?<button id="reviewButton" onClick={(e)=>{e.preventDefault();toggleClick(1)}}>Review</button>:null}

                    </Col>
                    <Col xs={1}>
                        
                    </Col>
                </Row>
            </div>


            <div id="ratingTitle">
                <Row style={center}> 
                    <Col>
                        <h6 id="ratingsReviews">Ratings and Reviews</h6>
                     </Col>                                
                </Row>
                <Row>
                    <Col style={right}>
                        <h1 className="headingRating">{(details.rating && details.ratingCount)?Math.round(100*(details.rating+1)/(2*details.ratingCount))/100:'No Ratings Yet'}</h1>
                        <p className="subheadingRating" >out of 5</p>
                    </Col>
                    <Col style={center}>
                        <h1 className="headingRating">{reviews?reviews.length:null}</h1>
                        <p className="subheadingRating">{reviews.length-1?`reviews`:`review`}</p>

                    </Col>
                    <Col style={left}>
                        <h1 className="headingRating">#{rank}</h1>
                        <p className="subheadingRating">in artworks</p>
                    </Col>
                </Row>
            </div>

            <div id="reviewS">
            {   
                reviews.length?
                reviews.map(review=>(
                    <Review key={i++} id={review._id}/>
                )):null
            }
            </div></div>:
            <div>
            <Row className="titlePadding">
              <h1 className="headingStyle">Post Review for {details.title} by {details.postedBy}</h1>

            </Row>
            

            <Row className="align-items-center">
                <Col></Col>
                <Col xs={8} className="center">

                <div id="ratingInputDiv">
                    <h1 id="yourRating">Your Rating</h1>
                    <input type="text" id="ratingInput" placeholder="Your Rating" onChange={e => setRating(e.target.value)}/>
                    <h6 id="outOf">out of 5</h6>

                </div>

                <div>
                    <h1 id="yourReview">Your Review</h1>
                </div>


                <div className="input-field col s12 customMarginX">
                    <textarea id="textarea2" class="materialize-textarea" onChange={e => setUserReview(e.target.value)}></textarea>
                    <label for="textarea2">Write your review</label>
                </div>

                    <button className="critleButton input_img__button" onClick={(e)=>handleReviewSubmit(e)}>Post Review</button>
                    {/* <Nav.Link href="#About" className="navMargin">Cancel</Nav.Link> */}
                    <button className="navMargin" className="critleButton input_img__button" onClick={(e)=>handleCancelClick(e)}>Cancel</button>
                </Col>
                <Col></Col>
            </Row>
        
        </div>
            }

            </div>
    );
}
const mapStateToProps = (state) => {
    return {
        user:state.auth
    }
}
export default withRouter(connect(mapStateToProps)(Details));