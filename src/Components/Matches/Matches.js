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
            user: this.props.data.getUser(),
            alreadyRated: []
        };
    }

    componentDidMount(){
        this.props.data.addObserver(this);
        if(this.state.user !== null){
            this.loadGenres();
            this.setState({alreadyRated: this.props.data.getAlreadyRated()});
        }
    }

    componentWillUnmount(){
        this.props.data.removeObserver(this);
    }

    update(change){
        switch(change){
            case 'USER':
                this.setState({user: this.props.data.getUser()});
                return;
            case 'ALREADY_RATED':
                this.setState({alreadyRated: this.props.data.getAlreadyRated()});
                return;
            default:
                return;
        }
    }

    filterMovies = () => {
        let finalMovies = [];
        this.loadMovies().end(movies => {
            if(movies.error) this.setState({status: 'ERROR'});
            finalMovies = movies.body.results.filter(movie => {return !this.state.alreadyRated.includes(movie.id)});
            this.setState({status: 'LOADED', movies: finalMovies, page: this.state.page+1});
        });
    }

    loadMovies = () => {
        let pref = this.state.preferences;
        return this.props.data.discoverMovies(
            "popularity.desc",
            Object.keys(pref.releaseYear).find((y)=>pref.releaseYear[y].rating>0.8),
            7,
            Object.keys(pref.genres).filter((g)=>pref.genres[g].rating>0.9).map((gen)=>{return this.state.genreIDs.find((o)=> o.name === gen).id}).toString(),
            Object.keys(pref.genres).filter((g)=>pref.genres[g].rating<0.5).map((gen)=>{return this.state.genreIDs.find((o)=> o.name === gen).id}).toString(),
            Object.keys(pref.language).find((l)=>pref.language[l].rating===1),
            this.state.page);
    }

    loadGenres = () => {
        this.props.data
            .getGenres()
            .end(result => {
                if(result.error)this.setState({status: "ERROR"});
                else this.setState({genreIDs: result.body.genres}, this.loadPreference);
            });
    }

    loadPreference = () => {
        this.props.firebase.database().ref('users').child(this.state.user.uid).child('preferences').on('value', snap  => {
            if(snap.val() === null){
                this.setState({status: "NO_PREF"});
                return;
            }
            let prefs = this.updatePreference(snap.val());
            this.setState({preferences: prefs}, this.filterMovies);
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