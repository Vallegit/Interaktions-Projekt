import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Swipe from "./Swipe/Swipe";

class App extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <div className="App">
                <Route exact path="/" 
                    render ={()=> <Swipe/>}
                />

            </div>
        );
    }
}

export default App;