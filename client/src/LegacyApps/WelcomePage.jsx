import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { bounce } from "react-animations";
import styled, { keyframes } from "styled-components";

const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite;
`;

function App() {
  var navImg = {
    width: "25px"
  };
  var navBrand = {
    fontSize: "25px",
    position: "static",
    top: "5px"
  };
  var mainImg = {
    width: "300px"
  };
  var marginMainImage = {
    marginTop: "20px"
  };
  var mainHeading = {
    fontSize: "70px",
    letterSpacing: "0.75rem",
    paddingLeft: "8px",
    fontWeight: "700"
  };

  var marginButton = {
    marginTop: "50px"
  };

  var marginAlready = {
    marginTop: "20px",
    fontSize: "14px"
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="#home">
          <img
            src={require("./newLogo.png")}
            alt="critle-logo"
            style={navImg}
          ></img>
          <span style={navBrand}> Critle</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav></Nav>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">About</Nav.Link>
            <Nav.Link href="#memes">Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div style={marginMainImage}>
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col md="auto">
            <img
              src={require("./newLogo.png")}
              alt="critle-logo"
              style={mainImg}
            ></img>
          </Col>
          <Col xs lg="2"></Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col md="auto">
            <Bounce>
              <h1 style={mainHeading}>Critle</h1>
            </Bounce>
          </Col>
          <Col xs lg="2"></Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col md="auto">
            <h2>Explore. Critic. Repeat. </h2>
          </Col>
          <Col xs lg="2"></Col>
        </Row>

        <Row className="justify-content-md-center" style={marginButton}>
          <Col xs lg="2"></Col>
          <Col md="auto">
            <Button
              size="lg"
              variant="outline-dark"
              href="./signup.component.jsx"
            >
              Get Started
            </Button>
          </Col>
          <Col xs lg="2"></Col>
        </Row>

        <Row className="justify-content-md-center" style={marginAlready}>
          <Col xs lg="2"></Col>
          <Col md="auto">
            <p>
              Already a member? <a href="./login.component.jsx">Sign In</a>
            </p>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
