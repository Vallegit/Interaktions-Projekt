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
            .getMovie(350) // 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club
            .end(result => {
                if(result.error)this.setState({status: "ERROR"})
                else this.setState({status: "LOADED", movie: result.body})});
    }

    render(){
        let posterUrl="https://image.tmdb.org/t/p/original";
        let MovieBox=null;
        let backgroundImage=null;
        switch(this.state.status){
            case "LOADING":
                MovieBox=<div className="Movie-box">
                            <div className="Loader"></div>
                        </div>
                break;
            
            case "LOADED":
                backgroundImage = {
                    backgroundImage: `url(${posterUrl+this.state.movie.backdrop_path})`,
                    backgroundSize: '100%'
                    };
                console.log(this.state.movie);
                MovieBox= <div className="Movie-box">
                                <img src={posterUrl+this.state.movie.poster_path} id="movieImage"/>

                                <p id="movieTitle">{this.state.movie.original_title}</p>

                                <p id="year">{this.state.movie.release_date}</p>

                                <p id="director">{this.state.movie.genres.map(gen=>{return gen.name+" "})}</p>

                                <p id="description">{this.state.movie.overview}</p>

                                <p id="rating">Rating: {this.state.movie.vote_average}</p>
                        </div>
                console.log(backgroundImage);        
                break;

            default: 
            MovieBox= 
            <div className="Movie-box">
                <span className="Error-box" >
                    Big error, contact the helpdesk for more info.
                </span>
            </div>
                break;
        }

        return (
            <div style={backgroundImage} className="Swipe">
                {MovieBox}
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