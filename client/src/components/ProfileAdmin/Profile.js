import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import {handleSubmit} from '../../actions/updateUserDetails'
import { LineChart, Line , CartesianGrid, XAxis, YAxis,Tooltip,Legend,PieChart,Pie ,Cell,Brush } from 'recharts';
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
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const COLORS2 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',"#9F3838","#A2C082","#32BDBC","#477911","#DE14FF","#FF1432"];
  const mostPopularTags = [
    { name: 'Sci-fi', value: 321 }, { name: 'Horror', value: 456 },
    { name: 'Landscape', value: 555 }, { name: 'Cyberpunk', value: 812 },
    { name: 'Digital Art', value: 112 }, { name: 'Nostalgic', value: 461 },
    { name: 'Motivating', value: 65 }, { name: 'Thriller', value: 33 },
    { name: 'Funny', value: 18 }, { name: 'Creepy', value: 9 },
  ]

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
                updateUserArtworks(res.data.artworks);
            }
            fetchArtworks()
        }
    },[])

    const [userReviews,updateUserReviews] = useState([]);
    useEffect(function effectFunction(){
        if(props.user)
        {
            async function fetchReviews(){
                const res = await Axios.get(`api/rating/all`);
                updateUserReviews(res.data);
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
                updateUsers(res.data);
            }
            fetchUsers()
        }
    },[])

    const [editName,toggleEdit]= useState(0);

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
        return moment(tickItem).format('MMM Do YY')
    }

    if(!props.user)
        props.history.push('/')
    return(
        <div className="WrapperMain">
            <div id="titleDashDiv">
                            <h1 id="welcomeTo">Welcome to</h1>
                            <h1 id="adminDash">Admin Dashboard</h1>
                    </div>
            {editName?
                <div className="wrapperDasher">
                    <div className="buttonWrap"> 
                        <button className="align-items-center critleButtonNew" onClick={(e)=>{e.preventDefault();toggleEdit(0)}}>Dashboard</button>
                    </div><div>   
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
                           
                        <div className="pastUploadDivAdmin">
                            {   userArtworks.length?
                                userArtworks.map(artwork=>(
                                    <Upload id={artwork._id} key={i++} callBack={(e)=>{e.preventDefault();alert('Deleted Successfully');props.history.push("/")}} postedBy={artwork.postedBy} imgLink={artwork.embedded_link} artworkName={artwork.title} desc={artwork.description}/>
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
                                    <Review date={review.dtu} key={i++} ratedBy={review.ratedBy} callBack={(e)=>{e.preventDefault();alert('Deleted Successfully');props.history.push("/")}} title={review.title} postedBy={review.postedBy} rating={review.rating} review={review.review} date={review.dtu}/>
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
            <div className="wrapperDash">
            
                    
                <button className="align-items-center critleButtonNew" onClick={(e)=>{e.preventDefault();toggleEdit(1)}} style={{'marginTop':'2%'}}>Manage</button>
                <div className="dashboardStatsDiv">

                    <div className="profileSubTitleDiv">
                        <h1 className="profileSubTitle">CRITLE STATISTICS</h1>
                    
                    </div>
                <Row className="align-items-center row" style={{'marginTop':'3%','padding':'20px'}}>
                    <Col style={{'width':'250px','height':'150px','verticalAlign':'center','textAlign':'center','border':'2px solid','margin':'1%'}}>
                        <p style={{'fontSize':"40px"}}>{userArtworks.length}<br />Artworks</p>
                    </Col>

                    <Col style={{'width':'250px','height':'150px','verticalAlign':'center','textAlign':'center','border':'2px solid','margin':'1%'}}>
                        <p style={{'fontSize':"40px"}}>{users.length}<br />Users</p>
                    </Col>

                    <Col style={{'width':'250px','height':'150px','verticalAlign':'center','textAlign':'center','border':'2px solid','margin':'1%'}}>
                        <p style={{'fontSize':"40px"}}>{userReviews.length}<br />Reviews</p>
                    </Col>

                </Row>
                </div>
                <div className="dashboardStatsDiv">

                    <div className="profileSubTitleDiv">
                        <h1 className="profileSubTitle">USAGE STATISTICS</h1>
                    
                    </div>
                <Row className="align-items-center row" >
                        <Col style={{'textAlign':'center'}}>
                                            
                        <LineChart
                            width={1500}
                            height={600}
                            data={DataToPlot}
                            margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                        
                        <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="key" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Brush />
                            <Line type="monotone" name="Uploads per day"dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </Col>
                </Row>
                </div>
                
                <Row className="align-items-center row1" style={{'width':'auto','columnGap':"5%"}}>
                    <Col style={{'textAlign':'center','borderbottom':'2px solid grey','padding':"1%"}}>
                        <div id="titleDashDiv">
                            <h1 id="welcomeTo">Users By Platform</h1>
                        </div>
                        <PieChart width={400} height={130}>
                            <Pie data={platformUsers}  dataKey="value" cx={200} cy={65} outerRadius={60} fill="#8884d8" >
                            {
                                platformUsers.map((entry, index) => <Cell key={i++} fill={COLORS[index % COLORS.length]}/>)
                            }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Col>
                    <Col style={{'textAlign':'center'}}>
                    <div id="titleDashDiv">
                            <h1 id="welcomeTo">Uploads Per Category</h1>
                        </div>
                        <PieChart width={400} height={130}>
                            <Pie data={uploadByCategory} dataKey="value" cx={200} cy={65} outerRadius={60} fill="#8884d8" >
                            {
                                uploadByCategory.map((entry, index) => <Cell key={i++} fill={COLORS[index % COLORS.length]}/>)
                            }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Col>
                </Row>
                <Row className="align-items-center rowLast">
                    <Col style={{'textAlign':'center'}}>
                    <div id="titleDashDiv">
                            <h1 id="welcomeTo">Top 10 Tags</h1>
                        </div>
                        <PieChart width={400} height={300}>
                            <Pie data={mostPopularTags} dataKey="value" cx={200} cy={100} innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={2}>
                            {
                                mostPopularTags.map((entry, index) => <Cell key={i++} fill={COLORS2[index % COLORS2.length]}/>)
                            }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        
                    </Col>
                </Row>
                
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