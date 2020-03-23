import React, { Component } from "react";
import dataInstance from "../Data/Data";
import "./Swipe.css";

class Swipe extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING"
        };
    }
    componentDidMount(){
       // this.loadMovie();
    }
    loadMovie = () => {
        dataInstance
            .getMovie(550)
            .end(result => {
                if(result.error)this.setState({status: "ERROR"})
                else this.setState({status: "LOADED", movie: result.body})});
    }
    render(){
        switch(this.state.status){
            case "LOADING":
                break;
            
            case "LOADED":
                console.log(this.state.movie);
                break;

            default:
                break;
        }

        return (
            <div className="Swipe">
                <div className="Movie-box">
                    <image id="movieImage">
                        HotStuff.png
                    </image>
                    <p id="movieTitle">
                        Story of my life
                    </p>
                    <p id="year">
                        1996
                    </p>
                    <p id="director">
                        Valerius Maximus
                    </p>
                    <p id="description">
                        Story about the greatest man that ever lived.
                    </p>
                </div>
                <button className="good">
                    <span className="tooltip" id="tooltipGood">Like this movie</span>
                </button>
                <button className="bad">
                    <span className="tooltip" id="tooltipBad">Dislike this movie</span>
                </button>
                <div className="break"></div>
                <button className="remove">
                    <span className="tooltip" id="tooltipRemove">Don't vote</span>X</button>
            </div>
        )
    }
}

export default Swipe;