import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Swipe from "./Swipe/Swipe";
import Match from "./Match/Match";
import Detail from "./Match/Match";

class App extends Component{

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
                            <Link to="/matches" className="matchesLink" >
                                Matches
                            </Link>
                            <a>Logout</a>
                        </div>
                    </div>
                </div>
             
                <Route exact path="/" 
                    render ={()=> <Swipe/>}
                />
                <Route
                    path="/matches"
                    render={()=> <Match/>}
                />
                 <Route
                    path="/details"
                    render={()=> <Detail/>}
                />
            </div>
        );
    }
}

export default App;