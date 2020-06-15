import React from 'react'
import "./Explore.css"
import Artwork from "./ArtworkCard/Artwork"

import Search from "./SearchBar/Search"




const explore = () => {

    return (
        <div>
            <Search />

            <div id="suggestDiv">

                <div className="suggestStrip">

                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">For You</h1>
                        </div>
                           
                        <div className="pastUploadDiv">

                            <Artwork title='helo' postedBy='Male' embedded_link='https://i.imgur.com/k9xY1hE.jpg'/>

                        </div>

                </div>

                <div className="suggestStrip">
                        
                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">Most Popular</h1>
                        </div>
                           
                        <div className="pastUploadDiv">
                        <Artwork title='helo' postedBy='Male' embedded_link='https://i.imgur.com/k9xY1hE.jpg' />

                        </div>
                </div>

                <div className="suggestStrip">

                        <div className="profileSubTitleDiv">
                            <h1 className="profileSubTitle">Highest Rated</h1>
                        </div>
                           
                        <div className="pastUploadDiv">
                        <Artwork title='helo' postedBy='Male' embedded_link='https://i.imgur.com/k9xY1hE.jpg'/> 

                        </div>

                </div>

                

            </div>
            

        </div>
    );

}

export default explore;