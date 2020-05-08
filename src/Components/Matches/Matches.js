import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import MatchesPres from "./MatchesPres";
import DetailsPres from "./DetailsPres";

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
            alreadyRated: [],
            currentMovie: null,
            currentRating: null,
            currentGenres: null
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
        this.setState({user: change.user});
    }

    filterMovies = () => {
        let finalMovies = this.state.movies;
        this.loadMovies().end(movies => {
            if(movies.error) this.setState({status: 'ERROR'});
            let newMovies = movies.body.results.filter(movie => {return !this.state.alreadyRated.includes(movie.id)});
            finalMovies=finalMovies.concat(newMovies);
            this.setState({status: 'LOADED', movies: finalMovies, page: this.state.page+1},
            ()=>{if(finalMovies.length<30)this.filterMovies()});
        });
    }

    loadMovies = () => {
        let pref = this.state.preferences;
        return this.props.data.discoverMovies(
            "popularity.desc",
            Object.keys(pref.releaseYear).find((y)=>pref.releaseYear[y].rating>0.8),
            7,
            Object.keys(pref.genres).filter((g)=>pref.genres[g].rating >= 0.90).map((gen)=>{return this.state.genreIDs.find((o)=> o.name === gen).id}).toString(),
            Object.keys(pref.genres).filter((g)=>pref.genres[g].rating <= 0.5).map((gen)=>{return this.state.genreIDs.find((o)=> o.name === gen).id}).toString(),
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
        let genres = [];
        movie.genre_ids.map(genID => {
            genres.push(this.state.genreIDs.find(o => o.id === genID).name);
            genreFactor += this.state.preferences.genres[this.state.genreIDs.find(o => o.id === genID).name].rating;
            return 0;
        });
        genreFactor /= movie.genre_ids.length;

        rating = 100 * genreFactor + 20 * movie.vote_average/10;

        let index = movie.original_language;
        rating = rating * this.state.preferences.language[index].rating;
        index = movie.release_date.substring(0,3) + '0';
        rating = rating * this.state.preferences.releaseYear[index].rating;
        rating = rating.toFixed(1);
        this.setState({currentMovie: movie, currentRating: rating, currentGenres: genres});
    }
 
    render(){
        if(this.state.user === null) return <Redirect to="/login"/>;
        else{
            return(
                <div>
                    <Route path='/details/' render={() => <DetailsPres movie={this.state.currentMovie} rating={this.state.currentRating} genres={this.state.currentGenres}/>}/>
                    <Route path='/matches'  render={() => <MatchesPres status={this.state.status} movies={this.state.movies} rateMovie={this.rateMovie}/>}/>
                </div>
            );
        }
    }
}