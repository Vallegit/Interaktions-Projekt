import React, { Component } from "react";
import "./Details.css";

class DetailsDisplay extends Component {
    constructor(props){
        super(props);
        this.state={
            status: this.props.status,
            movie: this.props.movie,
            rating: this.props.rating
        };
    }
    render(){

        let posterUrl="https://image.tmdb.org/t/p/original";
        let DetailsBox=null;
        let BackDrop=null;
        switch(this.state.status){

            case "LOADING":
                DetailsBox= <div className="Loader" id="Loader3"/>
                break;
            
            case "LOADED":
               BackDrop = {
                    backgroundImage: `url(${posterUrl+this.state.movie.backdrop_path})`,
                    backgroundSize: '100%',
                    };
                DetailsBox=
                        <div className="DetailContainer">
                            <img src={posterUrl+this.state.movie.poster_path} id="Image" alt="Movie Poster"/>
                            <div id="MTitle">{this.state.movie.title}</div>
                            <div id="Runtime">Runtime: {this.state.movie.runtime} min</div>
                            <div id="Year">Release Date: {this.state.movie.release_date}</div>
                            <div id="Genre">Genre: {this.state.movie.genres.map(gen=>{return gen.name+" "})}</div>
                            <div id="Rating">Rating: {this.state.movie.vote_average}</div>
                            <div id="Budget">Budget: {this.state.movie.budget}</div>
                            <div id="ProductionCompany">Production Company: {this.state.movie.production_companies.map(com=>{return com.name+" "})}</div>
                            <div id="Description">{this.state.movie.overview}</div>
                            <p>{this.props.rating}</p>
                        </div>
                break;

            default: 
            DetailsBox=
                    <h1 className="Error" >
                        Big error, contact the helpdesk for more info.
                    </h1>
                break;
        }

        return (
            <div style={BackDrop} className="Detail">
                <ul id="detailer">{DetailsBox}</ul>
            </div>
        )
    }
}

export default DetailsDisplay;
