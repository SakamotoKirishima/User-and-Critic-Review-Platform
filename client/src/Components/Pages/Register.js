import React, { useState, useEffect, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Row, Col, Form } from 'react-bootstrap';
// import logo from './logo.svg';
import './Register.css';
import PropTypes from 'prop-types';
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            name:'',
            age:'',
            username:'',
            password:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const data={email:this.state.email,
        name:this.state.name,
        age:this.state.age,
        username:this.state.username,
        password:this.state.password
        }
        console.log(e);
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    render() {
        return (
            <div className="RegPage">
                <div className="Left">

                </div>
                <div className="Right">
                    <div className="RegUser">
                        <Form className="Forms" onSubmit={this.handleSubmit}>
                            <fieldset className="row row1">
                                <Form.Group as={Row}>
                                    <Form.Label as="TypeOfUsr" column sm={4}>
                                        User Type
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Check
                                            custom
                                            inline
                                            label="User"
                                            name="UserType"
                                            type="radio"
                                            defaultChecked
                                            id={`TypeUser`}
                                        />
                                        <Form.Check
                                            custom
                                            inline
                                            label="Artist"
                                            name="UserType"
                                            type="radio"
                                            id={`TypeArtist`}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                            <Form.Group as={Row} controlId="formHorEmail" className="row row2">
                                <Form.Label column sm={2}>
                                    Email
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="email" placeholder="name123@email.com" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorName" className="row row3">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Enter name here" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorName" className="row row4">
                                <Form.Label column sm={2}>
                                    Age
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Enter age here" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorUserName" className="row row5">
                                <Form.Label column sm={2}>
                                    Username
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Enter username here" onChange={this.handleChange}/>
                                    <Form.Text className="text-muted">
                                        This'll be your unique name on website (Choose wisely).
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorPswd" className="row row6">
                                <Form.Label column sm={2}>
                                    Password
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="password" placeholder="Enter password here" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorSign" className="row row7">
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit" className="SignIn" onChange={this.handleChange}>Sign in</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;