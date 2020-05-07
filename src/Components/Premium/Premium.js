import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Premium.css";

export default class Premium extends Component{
    render(){
        if(this.props.user === null) return <Redirect to="/"/>;

        return(
        <div className="Premium">
            <div className="flex_row">
                <h1 id="premium_text">
                    GUCCI SECTION UNDER CONSTRUCTION YO
                </h1>
            </div>
        </div>
        )
    }
}