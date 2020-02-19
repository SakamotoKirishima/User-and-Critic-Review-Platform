import React, { useState, useEffect, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route, Link, Switch } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './App.css';
import PropTypes from 'prop-types';
import Register from './Components/Pages/Register';
import Login from './Components/Pages/Login';

class App extends Component {
    render() {
        return (
            <div className="Wrap">
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" render={() => (
                            <div className="Main">
                                <p className="HeadingOne">
                                    Delve&nbsp;&nbsp;In&nbsp;&nbsp;A&nbsp;&nbsp;World&nbsp;&nbsp;Of&nbsp;&nbsp;Art
                                </p>
                                <Link to="/Components/Pages/Register">
                                    <Button variant={"primary"} className={"ButRegis"} >
                                        Register
                                    </Button>
                                </Link>
                                <Link to="/Components/Pages/Login">
                                    <Button variant={"primary"} className={"ButLogin"} >
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        )} />
                        <Route path="/Components/Pages/Register" component={Register} />
                        <Route path="/Components/Pages/Login" component={Login} />
                    </Switch>
                </div>
            </Router>
            </div>
        );
    }
}

export default App;
