import React, { Component } from "react";
import "./Details.css";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <img src={"https://image.tmdb.org/t/p/original"+this.props.movie.poster_path} id="Image" alt="Movie Poster"/>
                    <div id="MTitle">{this.props.movie.title}</div>
                    <div className="detailsRow" >
                        <div id="Runtime"> 218{this.props.movie.runtime} min</div>
                        <div id="Year">{this.props.movie.release_date}</div>
                        <div id="Genre">Action Drama Sci-fi{/*this.props.movie.genres.map(gen=>{return gen.name+" "})*/}</div>
                        <div id="Rating">Rating: {this.props.movie.vote_average}</div>
                        <div id="Budget">Budget: 170 000 000${/*this.props.movie.budget*/}</div>
                        <div id="ProductionCompany">20th Century Fox Paramount{/*this.state.props.production_companies.map(com=>{return com.name+" "})*/}</div>
                    </div>
                    <div id="Description">{this.props.movie.overview}</div>
                    {/*<div id="starContainer">
                        <FontAwesomeIcon icon={faStar} size="7x" id="starIcon"/>
                        <p id="matchRating">{this.props.rating}</p>
                    </div>*/}
                </div>
            </div>
        )
    }
}