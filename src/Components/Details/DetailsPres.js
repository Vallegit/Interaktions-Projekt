import React, { Component } from "react";
import "./Details.css";

export default class DetailsPres extends Component {
    render(){
        let backgroundImage = {
            backgroundImage: `url(${"https://image.tmdb.org/t/p/original"+this.props.movie.backdrop_path})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat'
            };
        return (
            <div style={backgroundImage} className="Details">
                <div className="DetailsContainer">
                        <p id="matchRating">Match Rating: {this.props.rating}%</p>
                    <img src={"https://image.tmdb.org/t/p/original"+this.props.movie.poster_path} id="Image" alt="Movie Poster"/>
                    <div id="MTitle">{this.props.movie.title}</div>
                    <div className="detailsRow" >
                        <div id="Year">{this.props.movie.release_date}</div>
                        <div id="Genre">Action Drama Sci-fi{/*this.props.movie.genres.map(gen=>{return gen.name+" "})*/}</div>
                        <div id="Rating">Rating: {this.props.movie.vote_average}</div>
                    </div>
                    <div id="Description">{this.props.movie.overview}</div>
                </div>
            </div>
        )
    }
}