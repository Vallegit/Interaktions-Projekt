import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css"

class Landing extends Component{


    render(){
        return(
            <div className="landingContainer">
                <text id="landingText">
                    Welcome to Movie Swiper!
                </text>
                <Link to="/login">
                    <button id="landingButton"> Get started </button>
                </Link>
            </div>
        );
    }
}

export default Landing;