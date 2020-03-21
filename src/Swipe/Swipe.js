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
        this.loadMovie();
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
                    <img className="Movie-image">
                        
                    </img>
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
            </div>
        )
    }
}

export default Swipe;