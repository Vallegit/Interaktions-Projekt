import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Matches.css";

class Match extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING",
            page: 1,
            movies: []
        };
    }
    componentDidMount(){
        this.loadMovies();
    }

    loadMovies = () => {
        this.props.data
            .getTopMovies(this.state.page)// 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club
            .end(result => {
                if(result.error)this.setState({status: "ERROR"})
                else this.setState({status: "LOADED", movies: result.body.results})});
    }
 
    render(){

        if(this.props.user === null) return <Redirect to="/"/>;

        let posterUrl = "https://image.tmdb.org/t/p/original";
        let movieList = null;
        switch(this.state.status){

            case "LOADING":
                movieList = <div className = "Loader" id="Loader2"/>;
                break;
            
            case "LOADED":
                movieList = this.state.movies.map(movie=>(
                    <Link to={"/details/" + movie.id} className="MovieLink">
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


export default Match;
