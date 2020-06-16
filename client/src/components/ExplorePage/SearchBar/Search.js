import React,{useState,useEffect} from 'react'
import TextLoop from "react-text-loop";
import {connect} from 'react-redux'
import Axios from 'axios';
import "./search.css"
import Artwork from '../ArtworkCard/Artwork'
const Searchbar = () => {

    
    let artworkArray = ["Starry Nights","Sunflower","Peace","The Girl With a Pearl Earring"];
    const [searchField,setField]=useState("");
    // var [search,updateSearch]=useState(0);
    var [artworks,searchArtworks]=useState([]);
    var i=0;

    async function searchArt(){
        const res = await Axios.get(`/api/artwork/byname/${searchField}`);
        console.log(res.data);
        searchArtworks(res.data);
        return;
    }

    // useEffect(function effectFunction(){
        
    //     if(!search%2)
    //     {
    //         searchArt();
    //     }
    // },[search])
    

    // useEffect(function effectFunction(){
    //     console.log(search)
    // },[search])
    const InputKeyDown=(e)=>{
        // console.log('dwaad')
        const val = e.target.value;
        if(e.key==='Enter' && val){
            console.log('pres');
            // updateSearch(search + 1);
            searchArt();

            // searchArtworks(res);
        }
    }
    const handleClick = (e)=>{
        e.preventDefault();
        console.log('clik')
        // updateSearch(search += 1);
        
    }
    
    const RenderSearch = ()=>{
        
            return (
                <div id="searchDiv">
                    <div>
                        <h1 id="trySearching">Try searching</h1>
                        <h1 id="randomArt">"
                        <TextLoop interval={3000} children={artworkArray} />"
                        </h1>
                    </div>

                    <div id="wrapSearch">
                        <input type="text" id="searchBar" onKeyDown={InputKeyDown} onChange={e=>setField(e.target.value)} placeholder="Search Critle..."/>
                        <button id="searchButton" onClick={(e)=>handleClick(e)}>Search</button>
                    </div>
            
                
                </div>
            )
    }
    const RenderResults = ()=>{
        return (
            <div>
            <p>wadaw</p>
            <button onClick={(e)=>handleClick(e)}>Search</button>
            </div>
        )
    }
    
    return (
        <div id="searchResultsDiv">
            {RenderSearch()}
            {!artworks.length?null:<div id="resultsTitleDiv">
                    <h1 id="searchresultsTitle">Search Results for '{searchField}'</h1>
            </div>
            }
            {
                artworks.map(artwork=>(
                                    <Artwork title={artwork.title} key={i++} postedBy={artwork.postedBy} embedded_link={artwork.embedded_link} id={artwork._id}/>
                                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps)(Searchbar);