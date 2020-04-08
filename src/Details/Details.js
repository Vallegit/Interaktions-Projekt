import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Details.css";

class Details extends Component {

    render(){
        if(this.props.user === null) return <Redirect to="/"/>;

        return (
            <div className="Detail">
                <div className="Movie-container">Under even more construction</div>
            </div>
        )
    }
}

export default Details;