import React, { Component } from "react";
import dataInstance from "../Data/Data";
import "./Swipe.css";

class Swipe extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING MOVIES",
            index: 0,
            page: 1
        };
    }
    componentDidMount(){
       this.loadMovies();
    }
    loadMovies = () => {
        dataInstance
            .getTopMovies(this.state.page)// 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club
            .end(result => {
                if(result.error)this.setState({status: "ERROR"})
                else this.setState({status: "LOADING CURRENT MOVIE", movies: result.body.results})});
    }

    loadCurrentMovie = () => {
        dataInstance
            .getMovie(this.state.movies[this.state.index].id)
            .end(result => {
                if(result.error)this.setState({status: "ERROR"})
                else this.setState({status: "LOADED", currentMovie: result.body})
                if(this.state.index === 19){
                    this.setState({
                        status: "LOADING MOVIES",
                        index: 0,
                        page: this.state.page + 1
                    });
                    this.loadMovies();
                }
                else this.setState({
                    index: this.state.index + 1 
                })
            });
    }

    render(){
        let posterUrl="https://image.tmdb.org/t/p/original";
        let MovieBox=null;
        let backgroundImage=null;
        switch(this.state.status){

            case "LOADING MOVIES":
                MovieBox =  <div className="Movie-box">
                                <div className="Loader"></div>
                            </div>
                break;

            case "LOADING CURRENT MOVIE":
                this.loadCurrentMovie();
                MovieBox =  <div className="Movie-box">
                                <div className="Loader"></div>
                            </div>
                break;
            
            case "LOADED":
                backgroundImage = {
                    backgroundImage: `url(${posterUrl+this.state.currentMovie.backdrop_path})`,
                    backgroundSize: '100%'
                    };
                MovieBox= <div className="Movie-box">
                                <img src={posterUrl+this.state.currentMovie.poster_path} id="movieImage" alt="movie poster"/>

                                <p id="movieTitle">{this.state.currentMovie.original_title}</p>

                                <p id="year">{this.state.currentMovie.release_date}</p>

                                <p id="director">{this.state.currentMovie.genres.map(gen=>{return gen.name+" "})}</p>

                                <p id="description">{this.state.currentMovie.overview}</p>

                                <p id="rating">Rating: {this.state.currentMovie.vote_average}</p>
                        </div>       
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
                <button className="good" onClick={() => this.setState({status: "LOADING CURRENT MOVIE"})}>
                    <span className="tooltip" id="tooltipGood">Like this movie</span>
                </button>
                <button className="bad" onClick={() => this.setState({status: "LOADING CURRENT MOVIE"})}>
                    <span className="tooltip" id="tooltipBad">Dislike this movie</span>
                </button>
                <div className="break"/>
                <button className="remove" onClick={() => this.setState({status: "LOADING CURRENT MOVIE"})}>
                    <span className="tooltip" id="tooltipRemove">Don't vote</span>X</button>
            </div>
        )
    }
}

export default Swipe;