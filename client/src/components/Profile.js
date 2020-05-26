import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'
const Profile = (props)=>{
    const [userdata,setUserData]=useState({
        name:"Loading",
        picture:""
    })
    useEffect(()=>{
        if(props.user){
            setUserData({
                name:props.user.userName,
                picture:props.user.picture
            })  
        }
    },[])
    if(!props.user)
        props.history.push('/')
    return(
        <div>
            <h1>userid : </h1>
            <div className="card" style={{margin:"10%",padding:"10%",textAlign:"center"}}>
                <h2>{userdata.name}</h2>
                <img className="circle" src={userdata.picture}></img>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.auth
    }
}

export default connect(mapStateToProps)(Profile);