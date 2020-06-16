import React,{useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/ProfilePage/Profile';
import Upload from './components/Upload';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchUserAction} from './actions/myaction';
import Explore from './components/ExplorePage/Explore'
import Review from './components/ArtworkDetails/Details'
function App(props) {
    useEffect(()=>{
        props.fetch_user()
    },[])
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/upload" component={Upload} />
      <Route path="/explore" component={Explore}/>
      <Route path="/details/:id/:displayName" component={Review}/>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch)=>{
    return{
        fetch_user:()=>{dispatch(fetchUserAction())}
    }
}

export default connect(null,mapDispatchToProps)(App);
