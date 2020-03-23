import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import Swipe from "./Swipe/Swipe";
import dataInstance from "./Data/Data";
import Match from "./Match/Match";
import Detail from "./Match/Match";

class App extends Component{
    constructor(){
        super();
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
                            <Link to="/matches" className="matchesLink" >
                                <a href="#">Matches</a>
                            </Link>
                            <a href="#">Logout</a>
                        </div>
                    </div>
                </div>
             
                <Route exact path="/" 
                    render ={()=> <Swipe dataInstance={dataInstance}/>}
                />
                <Route
                    path="/matches"
                    render={()=> <Match dataInstance={dataInstance}/>}
                />
                 <Route
                    path="/details"
                    render={()=> <Detail dataInstance={dataInstance}/>}
                />
            </div>
        );
    }
}

export default App;