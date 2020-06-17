import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/ProfilePage/Profile';
import ProfileAdmin from './components/ProfileAdmin/Profile';
import Upload from './components/Upload';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchUserAction} from './actions/myaction';
import Explore from './components/ExplorePage/Explore'
import Review from './components/ArtworkDetails/Details'
// import userRoute from '../../routes/userRoute';
function App(props) {
    useEffect(()=>{
        props.fetch_user()
        // console.log(props.state)
    },[])
  return (

    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/profileAdmin" component={ProfileAdmin} />
      <Route path="/upload" component={Upload} />
      <Route path="/explore" component={Explore}/>
      <Route path="/details/:id/:displayName" component={Review}/>
    
    </BrowserRouter>
  );
}
const mapStateToProps = (state)=>{
    return {
        user:state.auth
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        fetch_user:()=>{dispatch(fetchUserAction())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
