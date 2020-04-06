import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import dataInstance from "../Data/Data";
import "./Swipe.css";

class Swipe extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING",
            index: 0,
            page: 1,
            blacklist: []
        };
    }
    componentDidMount(){
        if(this.props.user !== null){
            this.database = this.props.firebase.database().ref('blacklist').child(this.props.user.uid);
            this.database.on('value', snap => {
                this.setState((state) => ({blacklist: Object.values(snap.val())}), this.nextSwipe);
                console.log(this.state.blacklist);
            });

        }
        
    }

    loadMovies = () => {
        return dataInstance.getTopMovies(this.state.page)// 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club);
    }

    loadMovieById = (id) => {
        this.setState({status: "LOADING"});
        return dataInstance.getMovie(id);
    }

    handleError = () => {
        this.setState({status: "ERROR"});
    }

    nextSwipe = () => {
        if(this.state.index === 0){
            this.loadMovies().end(result => {
                if(result.error) this.handleError();
                else this.setState({movies: result.body.results});
                this.nextSwipe_util();
            })
        }
        else{
            this.nextSwipe_util();
        }
    }

    nextSwipe_util = () =>{
        let id = this.state.movies[this.state.index].id;
        console.log(id);
        if(this.state.blacklist.includes(id)){ //If movie is blacklisted, increment index and load next movie instead
            this.incrementIndex(this.nextSwipe); //nextSwipe is passed to incrementIndex to be used in setState's callback, otherwise nextSwipe risks being called before the state has changed
        }

        this.loadMovieById(id).end(result => {
            if(result.error) this.handleError();
            else this.setState({status: "LOADED", currentMovie: result.body});
            this.incrementIndex();
        })
    }

    incrementIndex = (func) => { //func is used to utilize setState's callback functionality
        if(this.state.index === 19){
            this.setState((state) => ({
                index: 0,
                page: state.page + 1
            }), func);
        }
        else {
            this.setState((state) => ({
                index: state.index + 1 
            }), func);
        }
    }
    blacklistCurrentMovie = () => {
        let id = 0;
        if(this.state.index === 0) id = this.state.movies[19].id;
        else id = this.state.movies[this.state.index - 1].id;
        this.database.push(id);
    }

    handleLikeButton = () => {
        this.nextSwipe();
    }

    handleDislikeButton = () => {
        this.nextSwipe();
    }

    handleBlacklistButton = () => {
        this.blacklistCurrentMovie();
        this.nextSwipe();
    }

    render(){
        if(this.props.user === null) return <Redirect to="/"/>;

        let posterUrl="https://image.tmdb.org/t/p/original";
        let MovieBox=null;
        let backgroundImage=null;
        switch(this.state.status){

            case "LOADING":
                MovieBox =  
                    <div className="Movie-box">
                        <div className="Loader"></div>
                    </div>
                break;
            
            case "LOADED":
                backgroundImage = {
                    backgroundImage: `url(${posterUrl+this.state.currentMovie.backdrop_path})`,
                    backgroundSize: '100%'
                    };
                MovieBox =
                    <div className="Movie-box">
                        <img src={posterUrl+this.state.currentMovie.poster_path} id="movieImage" alt="movie poster"/>
                        <p id="movieTitle">{this.state.currentMovie.original_title}</p>
                        <p id="year">{this.state.currentMovie.release_date}</p>
                        <p id="director">{this.state.currentMovie.genres.map(gen=>{return gen.name+" "})}</p>
                        <p id="description">{this.state.currentMovie.overview}</p>
                        <p id="rating">Rating: {this.state.currentMovie.vote_average}</p>
                    </div>       
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
                <button className="good" onClick={() => this.handleLikeButton()}>
                    <span className="tooltip" id="tooltipGood">Like this movie</span>
                </button>
                <button className="bad" onClick={() => this.handleDislikeButton()}>
                    <span className="tooltip" id="tooltipBad">Dislike this movie</span>
                </button>
                <div className="break"/>
                <button className="remove" onClick={() => this.handleBlacklistButton()}>
                    <span className="tooltip" id="tooltipRemove">Don't vote</span>X</button>
            </div>
        )
    }
}

export default Swipe;