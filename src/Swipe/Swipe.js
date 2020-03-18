import React, { Component } from "react";
import "./Swipe.css";

class Swipe extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div className="Swipe">
                <div className="Movie-box">
                    <image className="Movie-image">
                        this is image
                    </image>
                    <p className="Title">
                        This is title
                    </p>
                    <p>
                        This is year
                    </p>
                    <p>
                        This is director
                    </p>
                    <p className="Description">
                        This text describes the current movie.
                    </p>
                </div>
                <button className="good"></button>
                <button className="bad"></button>
                <button className="remove"></button>
                <div className="menu"></div>
            </div>
        )
    }
}

export default Swipe;