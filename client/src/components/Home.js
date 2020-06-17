import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import TitleImage from './TitleImage'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Home.css";

const Home = ()=>{

    const customTitle = {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "70px",
        lineHeight: "82px",
        color: "black"
    }
    
    const titleButton = {
        marginTop : "30px"
    }
    // const learnMore = {
    //     marginLeft : "50px",
    //     color : "black",
    //     fontSize : "20px",
    //     fontWeight : "500",
    //     paddingTop : "10px"
    // }
    const textCenter = {
        paddingLeft : "8%"
    }
    const inline = {
        display : "inline"
    }

    return(
        
        <div className="WrapperMain">
        {/* <div className="card" style={{margin:"10%",padding:"20px",textAlign:"center"}}>
            <div className="row">
                <a href ="/auth/google" className="waves-effect waves-light btn">SignUp With Google</a>
            </div>
        </div> */}
                    <Row>
                        <Col id="customColMe">
                            <div>
                                <h1 style={customTitle}>Explore and review</h1>
                                <h1 style={customTitle}>millions of artworks.</h1>
                                <div >
                                    
                                    <button className="critleButton" style={titleButton}>Try Critle</button>
                                
                                    <Nav.Link href="#About" id="navMarginMe" style={inline}>Learn more &gt; </Nav.Link>
                                </div>
                            </div>
                        </Col>
                        <Col >
                            <TitleImage />
                        </Col>
                    </Row>


                    <div id="About">
                    <Row className="customSubRow align-items-center">
                        <Col xs={7}>
                            <img className="customSubImage" src={require('./TitleAssets/Image1.png')} />
                        </Col>
                        <Col>
                            <h3 className="subInfoHeading">Discover millions of artworks.</h3>
                            <p className="subInfoBody">Whether you are a connoisseur of books,</p>
                            <p className="subInfoBody">movies or songs, we got everything you desire.</p>
                        </Col>
                    </Row>

                    <Row className="customSubRow align-items-center">
                        <Col style={textCenter}>
                            <h3 className="subInfoHeading">Unleash the critic within.</h3>
                            <p className="subInfoBody">Let your heart out by reviewing what you like (or dislike)</p>
                            <p className="subInfoBody">and hear what others have to say.</p>
                        </Col>
                        <Col>
                            <img className="customSubImage" src={require('./TitleAssets/Image2.png')} />
                        </Col>
                    </Row>

                    <Row className="customSubRow align-items-center">
                        <Col>
                            <img className="customSubImage" src={require('./TitleAssets/Image3.png')} />
                        </Col>
                        <Col style={textCenter}>
                            <h3 className="subInfoHeading">Share what you love.</h3>
                            <p className="subInfoBody">Didn’t find what you were looking for? Upload </p>
                            <p className="subInfoBody">your artwork and share it with the world.</p>

                        </Col>
                    </Row>
                    </div>
            </div>

        
    )
}

export default Home