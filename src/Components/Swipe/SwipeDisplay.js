import React, { Component } from "react";
import { faHeart, faHeartBroken, faTimes, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Swipe.css";

class SwipeDisplay extends Component {
    constructor(props){
        super(props);
        this.state={
            status: this.props.status,
            description: this.props.description,
            currentMovie: this.props.currentMovie

        };
    }
    render(){
        let posterUrl = "https://image.tmdb.org/t/p/original";
        let MovieBox = null;
        let backgroundImage = null;
        switch(this.state.status){

            case "LOADING":
                MovieBox = <div className="Movie-box"> <div className="Loader" id="Loader1"></div></div>
                break;
            
            case "LOADED":
                let backgroundURL = "";
                (window.matchMedia(`(max-width: 600px)`).matches) ? (backgroundURL = posterUrl+this.state.currentMovie.poster_path) : (backgroundURL = posterUrl+this.state.currentMovie.backdrop_path);
                backgroundImage = {
                    backgroundImage: `url(${backgroundURL})`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat'
                    };
                MovieBox =
                    <div className="Movie-box">
                        <img src={posterUrl+this.state.currentMovie.poster_path} id="movieImage" alt="movie poster"/>
                        <p id="movieTitle">{this.state.currentMovie.title}</p>
                        <div className="flex-row2">
                            <p id="year">{this.state.currentMovie.release_date}</p>
                            <p id="genre">{this.state.currentMovie.genres.map(gen=>{return gen.name+" "})}</p>
                            <p id="rating">Rating: {this.state.currentMovie.vote_average}</p>
                        </div>
                        <div className="description-box" style={(this.state.description) ? {"height": "150px"} : {"height": "0px"}}>
                            <p id="description">{this.state.currentMovie.overview}</p>
                        </div>
                        <button className="showDescriptionBtn" title={(this.state.description) ? "Read less" : "Read more"} onClick={this.toggleDescription}>
                            <FontAwesomeIcon icon={faAngleDown} size="4x" transform={(this.state.description) ? {rotate: 180} : {rotate: 0}}/>
                        </button>
                        <div className="flex-row3">
                            <button className="rateBtn good" title="LIKE this movie" onClick={() => this.handleLikeButton()}>
                            <FontAwesomeIcon icon={faHeart} size="2x"/>
                            </button>
                            <button className="rateBtn bad" title="DISLIKE this movie" onClick={() => this.handleDislikeButton()}>
                            <FontAwesomeIcon icon={faHeartBroken} size="2x"/>
                            </button>
                            <button className="rateBtn remove" title="Don't vote" onClick={() => this.handleBlacklistButton()}>
                            <FontAwesomeIcon icon={faTimes} size="2x"/>
                            </button>
                        </div>
                    </div>;                
                break;

            default: 
            MovieBox = 
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

            </div>
        )
    }
}
export default SwipeDisplay;