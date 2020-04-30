import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MatchesPres from "./MatchesPres";

export default class Match extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING",
            page: 1,
            movies: [],
            genreIDs: [],
            preferences: {},
            user: this.props.data.getUser()
        };
    }

    componentDidMount(){
        this.props.data.addObserver(this);
        if(this.state.user !== null){
            this.loadMovies();
            this.loadGenres();
            this.preferencesRef = this.props.firebase.database().ref('users').child(this.state.user.uid).child('preferences');

            this.preferencesRef.on('value',snap =>{
                this.setState({preferences: snap.val()});
            }); 
        }
    }

    componentWillUnmount(){
        this.props.data.removeObserver(this);
    }

    update(){
        this.setState({user: this.props.data.getUser()});
    }

    loadMovies = () => {
        this.props.data
            .getTopMovies(this.state.page)// 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club
            .end(result => {
                if(result.error)this.setState({status: "ERROR"});
                else this.setState({status: "LOADED", movies: result.body.results});
            });
    }

    loadGenres = () => {
        this.props.data
            .getGenres()
            .end(result => {
                if(result.error)this.setState({status: "ERROR"});
                else this.setState({genreIDs: result.body.genres});
            });
    }

    loadPreference = () => {
        this.props.firebase.database().ref('users').child(this.props.user.uid).child('preferences').on('value', snap  => {
            let prefs = this.updatePreference(snap.val());
            this.setState({preferences: prefs}, () => this.rateMovie(this.state.movie));
        });
    }

    updatePreference = (pref) => {
        Object.keys(pref).map(subPref => {
            this.adjustToMax(pref[subPref]);
            return 0;
        });
        return pref;
    }

    adjustToMax = (subPref) => {
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

    rateMovie = (movie) => {
        let rating = 0;
        let genreFactor = 0;
        movie.genre_ids.map(genID => {
            genreFactor += this.state.preferences.genres[this.state.genreIDs.find(o => o.id === genID).name].rating;
            return 0;
        });
        genreFactor /= movie.genre_ids.length;

        rating = 80 * genreFactor + 20 * movie.vote_average/10;

        let index = movie.original_language;
        rating = rating * this.state.preferences.language[index].rating;
        index = movie.release_date.substring(0,3) + '0';
        rating = rating * this.state.preferences.releaseYear[index].rating;
        rating = rating.toFixed(1);
        this.props.data.setCurrentRating(rating);
        this.props.data.setCurrentMovie(movie);
    }
 
    render(){
        return (this.state.user === null) ? <Redirect to="/"/> : <MatchesPres status={this.state.status} movies={this.state.movies} rateMovie={this.rateMovie}/>;
    }
}