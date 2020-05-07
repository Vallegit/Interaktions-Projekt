import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Landing.css"

export default class Landing extends Component{


    render(){
        if(this.props.data.getUser !== null) return <Redirect to="/"/>;
        else return(
            <div className="landingContainer">
                <p id="landingText">
                    Welcome to Movie Swiper, your movie match maker!
                </p>
                <p id="expText">
                    Vote on movies and recieve movie recommendations based on your votes.<br/>The more you vote, the better the match!
                </p>
                <Link to="/login">
                    <button id="landingButton"> Get started </button>
                </Link>
            </div>
        );
    }
}