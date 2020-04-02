import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Swipe from "./Swipe/Swipe";
import Match from "./Match/Match";
import Detail from "./Match/Match";
import Login from "./Login/Login";
import Premium from "./Premium/Premium";
import Firebase from "./Firebase/Firebase"

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{}
        }
        
    }

    authListener(){
        Firebase.auth().onAuthStateChanged((user) => {
            console.log("User: " + user + " logged in");
            if(user){
                this.setState({user});
            }else{
                this.setState({user: null});
            }
        })
    }

    render(){
        return (
            <div className="App">
                <div className="Top-Bar">
                    <h1 id="Title">
                        Movie Swipe
                    </h1>
                    <div className="dropDown">
                        <button className="menuBtn">Menu</button>
                        <div className="menuContent">
                            <Link to="/swipe" className="swipeLink">
                                Swipe
                            </Link>
                            <Link to="/matches" className="matchesLink">
                                Matches
                            </Link>
                            <Link to="/" className="loginLink">
                                Log out
                            </Link>
                        </div>
                    </div>
                </div>
                <Route exact 
                    path="/"
                    render={() => <Login/>}
                />
                <Route 
                    path="/swipe" 
                    render ={() => <Swipe/>}
                />
                <Route
                    path="/matches"
                    render={() => <Match/>}
                />
                <Route
                    path="/details"
                    render={() => <Detail/>}
                />
                <Route
                    path="/premium"
                    render={() => <Premium/>}
                />
            </div>
        );
    }
}

export default App;