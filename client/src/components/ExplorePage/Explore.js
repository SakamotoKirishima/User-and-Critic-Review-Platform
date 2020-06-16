import React,{useState,useEffect} from 'react'
import "./Explore.css"
import Artwork from "./ArtworkCard/Artwork"
import Axios from 'axios'
import Search from "./SearchBar/Search"
import { use } from 'passport'
import {connect} from 'react-redux'



const Explore = (props) => {
    const [userdata,setUserData]=useState({
        
        displayName:"Loading",
        
    })
    useEffect(()=>{
        if(props.user){
            console.log(props.user.displayName);
            setUserData({
                displayName:props.user.displayName,
                
            })  
        }
    },[]);
    const [artworks,searchArtworks] = useState([]);
    
    var i = 0 ;
    useEffect(function effectFunction(){
        async function fetchArtworks(){
            const res = await Axios.get(`api/artworks`);
            // const json = await res.json();
            console.log(res.data)
            searchArtworks(res.data.artworks);
            // console.log(res.data);
        }
        fetchArtworks()
    },[])


    return (
        <div>
            <Search />

            <div id="suggestDiv">

                <div className="suggestStrip">

                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">For You</h1>
                        </div>
                           
                        <div className="pastUploadDiv">
                            {
                                artworks.map(artwork=>(
                                    <Artwork key={i++} displayName={userdata.displayName} id={artwork._id} title={artwork.title} postedBy={artwork.postedBy} embedded_link={artwork.embedded_link}/>
                                ))
                            }
                        </div>

                </div>

                <div className="suggestStrip">
                        
                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">Most Popular</h1>
                        </div>
                           
                        <div className="pastUploadDiv">
                        {
                                (artworks.sort((a, b) => -parseFloat(a.ratingCount) + parseFloat(b.ratingCount))).map(artwork=>(
                                    <Artwork key={i++} displayName={userdata.displayName} id={artwork._id} title={artwork.title} postedBy={artwork.postedBy} embedded_link={artwork.embedded_link}/>
                                ))
                        }

                        </div>
                </div>

                <div className="suggestStrip">

                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">Highest Rated</h1>
                        </div>
                           
                        <div className="pastUploadDiv">
                        {
                                (artworks.sort((a, b) => -parseFloat(a.rating+1)/parseFloat(a.ratingCount) + parseFloat(b.rating+1)/parseFloat(b.ratingCount))).map(artwork=>(
                                    <Artwork key={i++} displayName={userdata.displayName} id={artwork._id} title={artwork.title} postedBy={artwork.postedBy} embedded_link={artwork.embedded_link}/>
                                ))
                        }

                        </div>

                </div>

                

            </div>
            

        </div>
    );

}
const mapStateToProps=(state)=>{
    return{
        user:state.auth
    }
}
export default connect(mapStateToProps)(Explore);