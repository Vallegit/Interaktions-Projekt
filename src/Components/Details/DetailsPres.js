import React, { Component } from "react";
import "./Details.css";

export default class DetailsPres extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let backgroundImage = {
            backgroundImage: `url(${"https://image.tmdb.org/t/p/original"+this.props.movie.backdrop_path})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat'
            };
        return (
            <div style={backgroundImage} className="Details">
                <div className="DetailsContainer">
                    <img src={"https://image.tmdb.org/t/p/original"+this.props.movie.poster_path} id="Image" alt="Movie Poster"/>
                    <div id="MTitle">{this.props.movie.title}</div>
                    <div id="Runtime">Runtime: {this.props.movie.runtime} min</div>
                    <div id="Year">Release Date: {this.props.movie.release_date}</div>
                    <div id="Genre">Genre: {/*this.props.movie.genres.map(gen=>{return gen.name+" "})*/}</div>
                    <div id="Rating">Rating: {this.props.movie.vote_average}</div>
                    <div id="Budget">Budget: {/*this.props.movie.budget*/}</div>
                    <div id="ProductionCompany">Production Company: {/*this.state.props.production_companies.map(com=>{return com.name+" "})*/}</div>
                    <div id="Description">{this.props.movie.overview}</div>
                    <p>{this.props.rating}</p>
                </div>
            </div>
        )
    }
}