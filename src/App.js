import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
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
            user:null
        }
    }

    authListener = () => {
        Firebase.auth().onAuthStateChanged((user) => {
            
            if(user){
                console.log("User: " + user.displayName + " logged in");
                this.setState({user});
            }else{
                console.log("User logged out");
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
                            <Link to="/" className="loginLink" onClick={() => {
                                Firebase.auth().signOut();
                                this.authListener();
                                }}>
                                Log out
                            </Link>
                        </div>
                    </div>
                </div>
                <Route exact 
                    path="/"
                    render={() => <Login user={this.state.user} authListener={this.authListener}/>}
                />
                <Route 
                    path="/swipe" 
                    render ={() => <Swipe user={this.state.user}/>}
                />
                <Route
                    path="/matches"
                    render={() => <Match user={this.state.user}/>}
                />
                <Route
                    path="/details"
                    render={() => <Detail user={this.state.user}/>}
                />
                <Route
                    path="/premium"
                    render={() => <Premium user={this.state.user}/>}
                />
            </div>
        );
    }
}

export default App;