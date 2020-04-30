import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Matches.css";

export default class MatchesPres extends Component {
    constructor(props){
        super(props);
    }

    render() {
    let posterUrl = "https://image.tmdb.org/t/p/original";
    let movieList = null;
    switch(this.props.status){
        case "LOADING":
            movieList = <div className = "Loader" id="Loader2"/>;
            break;
        
        case "LOADED":
            movieList = this.props.movies.map(movie =>(
                <Link to={"/details/" + movie.id} key={movie.id} className="MovieLink" onClick={() => this.props.rateMovie(movie)}>
                    <div className="MovieContainer">
                        <img src={posterUrl + movie.poster_path} id="MovieImage" alt="Movie Poster"/>
                        <p id="MovieTitle">{movie.title}</p>
                    </div>
                </Link>
            ))
            break;

        default: 
            movieList =
                <h1 className="Error" >
                    Big error, contact the helpdesk for more info.
                </h1>
            break;
    }
    return (
        <div className="Match">
            <ul id="list">{movieList}</ul>
        </div>
        )
    }
}