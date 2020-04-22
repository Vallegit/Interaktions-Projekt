import React, { Component } from "react";
import { Route } from "react-router-dom";
import Swipe from "./Components/Swipe/Swipe";
import Matches from "./Components/Matches/Matches";
import Details from "./Components/Details/Details";
import Login from "./Components/Login/Login";
import Premium from "./Components/Premium/Premium";
import Landing from "./Components/Landing/Landing";
import SignUp from "./Components/SignUp/SignUp";
import Topbar from "./Components/Topbar/Topbar";
import MobileMenu from "./Components/MobileMenu/MobileMenu";
import Firebase from "./Firebase/Firebase";
import datainstance from "./Data/Data";
import "./App.css";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:null,
            rating: 0
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
        });
    }
    setRating = rating => {
        this.setState({rating: rating});
    }

    render(){
        return (
            <div className="App">
                <Topbar firebase={Firebase}></Topbar>
                <Route exact
                    path="/"
                    render={() => <Landing/>}
                />
                <Route  
                    path="/login"
                    render={() => <Login data={datainstance} firebase={Firebase} user={this.state.user} authListener={this.authListener}/>}
                />
                <Route  
                    path="/signup"
                    render={() => <SignUp data={datainstance} firebase={Firebase} user={this.state.user} />}
                />
                <Route 
                    path="/swipe" 
                    render ={() => <Swipe data={datainstance} firebase={Firebase} user={this.state.user}/>}
                />
                <Route
                    path="/matches"
                    render={() => <Matches data={datainstance} setRating={this.setRating} firebase={Firebase} user={this.state.user}/>}
                />
                <Route
                    path="/details/"
                    render={() => <Details data={datainstance} rating={this.state.rating} firebase={Firebase} user={this.state.user}/>}
                />
                <Route
                    path="/premium"
                    render={() => <Premium data={datainstance} firebase={Firebase} user={this.state.user}/>}
                />
                {(window.matchMedia(`(max-width: 450px)`).matches) ? <MobileMenu firebase={Firebase}/> : <div/>}
            </div>
        );
    }
}

export default App;