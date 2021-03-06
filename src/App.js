import React, { Component } from "react";
import { Route } from "react-router-dom";
import Swipe from "./Components/Swipe/Swipe";
import Matches from "./Components/Matches/Matches";
import Login from "./Components/Login/Login";
import Premium from "./Components/Premium/Premium";
import Landing from "./Components/Landing/Landing";
import SignUp from "./Components/SignUp/SignUp";
import Topbar from "./Components/Topbar/Topbar";
import MobileMenu from "./Components/MobileMenu/MobileMenu";
import Firebase from "./Firebase/Firebase";
import datainstance from "./Data/Data";
import "./App.css";

export default class App extends Component{
    render(){
        return (
            <div className="App">
                <Topbar data={datainstance}></Topbar>
                <Route exact
                    path="/"
                    render={() => <Landing data={datainstance}/>}
                />
                <Route  
                    path="/login"
                    render={() => <Login data={datainstance}/>}
                />
                <Route  
                    path="/signup"
                    render={() => <SignUp data={datainstance}/>}
                />
                <Route 
                    path="/swipe" 
                    render ={() => <Swipe data={datainstance} firebase={Firebase}/>}
                />
                <Route
                    path="/(matches|details)"
                    render={() => <Matches data={datainstance} firebase={Firebase}/>}
                />
                <Route
                    path="/premium"
                    render={() => <Premium data={datainstance}/>}
                />
                {(window.matchMedia(`(max-width: 450px)`).matches) ? <MobileMenu data={datainstance}/> : <div/>}
            </div>
        );
    }
}