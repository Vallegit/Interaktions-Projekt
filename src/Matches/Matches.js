import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Matches.css";

class Match extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING",
            index: 0,
            page: 1
        };
    }
    componentDidMount(){
        this.loadMovies();
     }

    loadMovies = () => {
        this.props.dataInstance
            .getTopMovies(this.state.page)// 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club
            .end(result => {
                if(result.error)this.setState({status: "ERROR"})
                else this.setState({status: "LOADED", movies: result.body.results})});
     }
 
    render(){

        if(this.props.user === null) return <Redirect to="/"/>;

        let posterUrl="https://image.tmdb.org/t/p/original";
        let movieList=null;
        switch(this.state.status){

            case "LOADING":
                movieList=
                    <div className="Loader2">

                    </div>
                break;
            
            case "LOADED":
                movieList=this.state.movies.map(movie=>(
                    <Link to={"/details"}>
                        <div className="MovieContainer">
                            <img src={posterUrl+movie.poster_path} id="MovieImage" alt="Movie Poster"/>
                            <div id="MovieTitle">{movie.original_title}</div>
                        </div>
                    </Link>
                ))
                break;
            default: 
            movieList=
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