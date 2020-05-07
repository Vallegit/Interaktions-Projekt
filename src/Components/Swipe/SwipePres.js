import React, { Component } from "react";
import { faHeart, faHeartBroken, faTimes, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Swipe.css";

export default class SwipePres extends Component {
    constructor(props){
        super(props);
        this.state={
            description: false
        };
    }

    /** 
     * handleLikeButton
     * This function handles the OnClick event of the like button
    */
    handleLikeButton = () => {
        this.props.likeCurrentMovie();
    }

    /** 
     * handleDislikeButton
     * This function handles the OnClick event of the dislike button
    */
    handleDislikeButton = () => {
        this.props.dislikeCurrentMovie();
    }

    /** 
     * handleBlacklistButton
     * This function handles the OnClick event of the blacklist button
    */
    handleBlacklistButton = () => {
        this.props.blacklistCurrentMovie();
    }

    /**
     * toggleDescription
     * This function toggles the visibility of the movie description 
    */
    toggleDescription = () => {
        (this.state.description) ? this.setState({description: false}) : this.setState({description: true});
    }

    render(){
        let posterUrl = "https://image.tmdb.org/t/p/original";
        let MovieBox = null;
        let backgroundImage = null;
        switch(this.props.status){

            case "LOADING":
                MovieBox = <div className="Movie-box"> <div className="Loader" id="Loader1"></div></div>
                break;
            
            case "LOADED":
                let backgroundURL = (window.matchMedia(`(max-width: 600px)`).matches) ? posterUrl+this.props.currentMovie.poster_path : posterUrl+this.props.currentMovie.backdrop_path;
                backgroundImage = {
                    backgroundImage: `url(${backgroundURL})`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat'
                    };
                MovieBox =
                    <div className="Movie-box">
                        <img src={posterUrl+this.props.currentMovie.poster_path} id="movieImage" alt="movie poster"/>
                        <p id="movieTitle">{this.props.currentMovie.title}</p>
                        <div className="flex-row2">
                            <p id="year">{this.props.currentMovie.release_date}</p>
                            <p id="genre">{this.props.currentMovie.genres.map(gen=>{return gen.name+" "})}</p>
                            <p id="rating">Rating: {this.props.currentMovie.vote_average}</p>
                        </div>
                        <div className="description-box" style={(this.state.description) ? {"height": "14vh"} : {"height": "0px"}}>
                            <p id="description">{this.props.currentMovie.overview}</p>
                        </div>
                        <button className="showDescriptionBtn" title={(this.state.description) ? "Read less" : "Read more"} onClick={this.toggleDescription}>
                            <FontAwesomeIcon icon={faAngleDown} size={(window.matchMedia(`(max-height: 800px)`).matches) ? '2x' : '4x'} transform={(this.state.description) ? {rotate: 180} : {rotate: 0}}/>
                        </button>
                        <div className="flex-row3">
                            <button className="rateBtn good" title="LIKE this movie" onClick={() => this.handleLikeButton()}>
                            <FontAwesomeIcon icon={faHeart} size={(window.matchMedia(`(max-height: 800px)`).matches) ? '1x' : '2x'}/>
                            </button>
                            <button className="rateBtn bad" title="DISLIKE this movie" onClick={() => this.handleDislikeButton()}>
                            <FontAwesomeIcon icon={faHeartBroken} size={(window.matchMedia(`(max-height: 800px)`).matches) ? '1x' : '2x'}/>
                            </button>
                            <button className="rateBtn remove" title="Don't vote" onClick={() => this.handleBlacklistButton()}>
                            <FontAwesomeIcon icon={faTimes} size={(window.matchMedia(`(max-height: 800px)`).matches) ? '1x' : '2x'}/>
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