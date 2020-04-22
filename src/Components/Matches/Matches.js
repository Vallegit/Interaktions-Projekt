import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Matches.css";

class Match extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING",
            page: 1,
            movies: [],
            preferences: {}
        };
    }

    componentDidMount(){
        this.loadMovies();
        this.preferencesRef = this.props.firebase.database().ref('users').child(this.props.user.uid).child('preferences');

        this.preferencesRef.on('value',snap =>{
            this.setState({preferences: snap.val()});
        });
    }

    loadMovies = () => {
        this.props.data
            .getTopMovies(this.state.page)// 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club
            .end(result => {
                if(result.error)this.setState({status: "ERROR"})
                else this.setState({status: "LOADED", movies: result.body.results})});
    }

    loadPreference = () => {
        this.props.firebase.database().ref('users').child(this.props.user.uid).child('preferences').on('value', snap  => {
            let prefs = this.updatePreference(snap.val());
            this.setState({preferences: prefs}, () => this.rateMovie(this.state.movie));
        });
    }

    updatePreference = pref => {
        Object.keys(pref).map(subPref => {
            this.adjustToMax(pref[subPref]);
            return 0;
        });
        return pref;
    }

    adjustToMax = subPref => {
        let max = 0;
        Object.keys(subPref).map(key => {
            if(subPref[key] === 0) return 0;
            if(subPref[key].count < 10) return 0;
            if(subPref[key].rating > max) max = subPref[key].rating;
            return 0;
        });
        Object.keys(subPref).map(key => {
            if(subPref[key] === 0) return 0;
            if(subPref[key].rating === 1 || subPref[key].count < 10) return 0;
            subPref[key].rating /= max;
            return 0;
        });
    }

    rateMovie = movie => {
        let rating = 0;
        let genreFactor = 0;
        movie.genres.map(gen => {
            genreFactor += this.state.preferences.genres[gen.name].rating;
        });
        genreFactor /= movie.genres.length;

        rating = 80 * genreFactor + 20 * movie.vote_average/10;

        let index = movie.original_language;
        rating = rating * this.state.preferences.language[index].rating;
        index = movie.release_date.substring(0,3) + '0';
        rating = rating * this.state.preferences.releaseYear[index].rating;
        rating = rating.toFixed(1);
        console.log("your match: " + rating + "%");
        this.props.setRating(rating);
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
                movieList = this.state.movies.map(movie =>(
                    <Link to={"/details/" + movie.id} className="MovieLink" onClick={() => {
                        console.log(movie);
                        this.rateMovie(movie);
                        }}>
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
