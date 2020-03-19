import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Swipe from "./Swipe/Swipe";
import dataInstance from "./Data/Data";

class App extends Component{
    constructor(){
        super();
    }

    render(){
        console.log(dataInstance.getMovie());
        return (
            <div className="App">
                <h1 id="Title">
                    Movie Swipe
                </h1>
                <Route exact path="/" 
                    render ={()=> <Swipe/>}
                />
            </div>
        );
    }
}

export default App;