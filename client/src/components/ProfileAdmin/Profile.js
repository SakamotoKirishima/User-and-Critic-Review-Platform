import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import {handleSubmit} from '../../actions/updateUserDetails'
import { LineChart, Line , CartesianGrid, XAxis, YAxis,Tooltip,Legend,PieChart,Pie  } from 'recharts';
import artworkData from './MOCK_DATA.json'
import DataToPlot from './DataKeyVal.json'
import Upload from "./ProfileComponents/PastUpload/PastUpload"
import Review from "./ProfileComponents/PastReview/PastReview"
import User from './ProfileComponents/UsersData/UserData'
import {Link} from 'react-router-dom'
import { Redirect } from "react-router";
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import "./Profile.css"
import fs from 'fs';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const platformUsers = [
    { name: 'Personal Computers', value: 2400 }, { name: 'Mobiles', value: 9800 },
    { name: 'Laptops', value: 1398 }, { name: 'Tablets', value: 4532 }
  ];
  const uploadByCategory = [
    { name: 'Artworks', value: 481 }, { name: 'Books', value: 910 },
    { name: 'Movies', value: 731 }, { name: 'Songs', value: 1231 }
  ];

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
            async function fetchArtworks(){
                const res = await Axios.get(`/api/artworks`);
                // const json = await res.json();
                updateUserArtworks(res.data.artworks);
                console.log(res.data);
            }
            fetchArtworks()
        }
    },[])
    var occurences;
    var resultDates;
    const [userReviews,updateUserReviews] = useState([]);
    const handleSaveToPC = jsonData => {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'DataKeyVal.json';
        link.href = url;
        link.click();
      }
    useEffect(function effectFunction(){
        // artworkData.sort(custom_sort);
        // occurences = artworkData.reduce(function (r, row) {
        //     r[row.dtu] = ++r[row.dtu] || 1;
        //     return r;
        // }, {});
        // resultDates = Object.keys(occurences).map(function (key) {
        //     return { key: key, value: occurences[key] };
        // });
        // console.log(typeof(resultDates))
        // handleSaveToPC(resultDates);
        // fs.writeFile("keyValueDate.txt", resultDates, function(err) {
        //     if (err) {
        //         console.log(err);
        //     }
        // });
        if(props.user)
        {
            async function fetchReviews(){
                const res = await Axios.get(`api/rating/all`);
                // const json = await res.json();
                updateUserReviews(res.data);
                // console.log(res.data);
            }
            fetchReviews()
        }
    },[])

    const [users,updateUsers] = useState([]);
    useEffect(function effectFunction(){
        if(props.user)
        {
            async function fetchUsers(){
                const res = await Axios.get(`/api/user/all`);
                // const json = await res.json();
                updateUsers(res.data);
                console.log(res.data);
            }
            fetchUsers()
        }
    },[])

    const [editName,toggleEdit]= useState(0);

    const [curDisName,setDispName]=useState(props.user?props.user.displayName:'');
    // function handleSubmit(event){
    //     event.preventDefault();
    //     Axios.put(`/api/update/${userdata.googleId}/${curDisName}`).then(response=>{
    //         console.log(response);
    //         if(response.data.msg==='Name Updated Successfully')
    //         {
    //             alert('Name Updated Successfully')
    //             window.location.reload(true)
    //         }
    //     })
    // }
    //if(props.user)
    const userProfileMargin = {
        marginTop : "2em"
    }
    const center = {
        textAlign : "center"
    }

    const topMargin = {
        marginTop : "100px"
    }
    
    function custom_sort(a, b) {
        return new Date(a.dtu).getTime() - new Date(b.dtu).getTime();
    }

    function formatXAxis(tickItem) {
        console.log(moment(tickItem).format('MMM Do YY'))
        return moment(tickItem).format('MMM Do YY')
    }

    if(!props.user)
        props.history.push('/')
    return(
        <div className="WrapperMain">
            {editName?
                <div>
            <button onClick={(e)=>{e.preventDefault();toggleEdit(0)}}></button>

            <div>   
                    <div style={topMargin}>
                        <Row className="align-items-center" style={userProfileMargin}>
                            <Col style={center}>
                                <img id="profilePic" src={userdata.picture} />
                                <h1 id="profileName">{userdata.displayName} #SuperUser</h1>
                                <h4 id="profileRealName">{userdata.name}</h4>
                                <h4 id="profileMail">{userdata.googleMail}</h4>
                            </Col>
                        </Row>
                    </div>

                    <div className="center">
                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">All Uploads</h1>
                        </div>
                           
                        <div className="pastUploadDiv">
                            {   userArtworks.length?
                                userArtworks.map(artwork=>(
                                    <Upload key={i++} callBack={(e)=>{e.preventDefault();alert('Deleted Successfully');props.history.push("/")}} postedBy={artwork.postedBy} imgLink={artwork.embedded_link} artworkName={artwork.title} desc={artwork.description}/>
                                )):null
                            }
                        </div>
                    </div>

                    <div className="center">
                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">All Reviews</h1>
                        </div>
                           
                        <div>
                        {/* {console.log(userReviews.length)} */}
                            {
                                userReviews.length?
                                userReviews.map(review=>(
                                    <Review key={i++} ratedBy={review.ratedBy} callBack={(e)=>{e.preventDefault();alert('Deleted Successfully');props.history.push("/")}} title={review.title} postedBy={review.postedBy} rating={review.rating} review={review.review} date={review.dtu}/>
                                )):null
                            }
                        </div>
                    </div>

                    <div className="center">
                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">All Users</h1>
                        </div>
                           
                        <div className="pastUploadDiv">
                            {   users.length?
                                users.map(user=>(
                                    <User key={i++} picture={user.picture} callBack={(e)=>{e.preventDefault();alert('Deleted Successfully');props.history.push("/")}} displayName={user.displayName} googleMail={user.googleMail} googleId={user.googleId}/>
                                )):null
                            }
                        </div>
                    </div>
            </div>
            </div>
            :
            <div>
                <button onClick={(e)=>{e.preventDefault();toggleEdit(1)}}></button>
                <LineChart
                    width={1500}
                    height={900}
                    data={DataToPlot}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="key" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" name="Uploads per day"dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
                <PieChart width={400} height={400}>
                    <Pie data={platformUsers} name="" dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
                    <Tooltip />
                </PieChart>
                <PieChart width={400} height={400}>
                    <Pie data={uploadByCategory} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" label/>
                    <Tooltip />
                </PieChart>
            </div>
}
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