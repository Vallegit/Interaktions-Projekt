import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Swipe from "./Swipe/Swipe";
import Matches from "./Matches/Matches";
import Details from "./Details/Details";
import Login from "./Login/Login";
import Premium from "./Premium/Premium";
import Firebase from "./Firebase/Firebase"
import datainstance from "./Data/Data";

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
                console.log("User: " + user.uid + " logged in");
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
                            <Link className="loginLink" onClick={() => {
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
                    render={() => <Login data={datainstance} firebase={Firebase} user={this.state.user} authListener={this.authListener}/>}
                />
                <Route 
                    path="/swipe" 
                    render ={() => <Swipe data={datainstance} firebase={Firebase} user={this.state.user}/>}
                />
                <Route
                    path="/matches"
                    render={() => <Matches data={datainstance} firebase={Firebase} user={this.state.user}/>}
                />
                <Route
                    path="/details"
                    render={() => <Details data={datainstance} firebase={Firebase} user={this.state.user}/>}
                />
                <Route
                    path="/premium"
                    render={() => <Premium data={datainstance} firebase={Firebase} user={this.state.user}/>}
                />
            </div>
        );
    }
}

export default App;