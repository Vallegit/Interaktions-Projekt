import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Swipe.css";

class Swipe extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING",
            index: 0,
            page: 1,
            alreadyRated: []
        };
    }

    componentDidMount(){
        if(this.props.user !== null){
            this.databaseRef = this.props.firebase.database().ref('users').child(this.props.user.uid);
            this.movieRatingsRef = this.databaseRef.child('movie-ratings');
            this.preferencesRef = this.databaseRef.child('preferences');
            this.blacklistRef = this.movieRatingsRef.child('blacklist');
            this.likedMoviesRef = this.movieRatingsRef.child('liked-movies');
            this.dislikedMoviesRef = this.movieRatingsRef.child('disliked-movies');
            this.alreadyRatedRef = this.movieRatingsRef.child('already-rated');

            this.alreadyRatedRef.on('value', snap => {
                this.setState({alreadyRated: Object.values(snap.val())}, this.nextSwipe);
            });
        }
        
    }

    /**
     * loadMovies 
     * Use this function to fetch an array of 20 movies with minimum information
     * @returns { Promise }
    */
    loadMovies = () => {
        return this.props.data.getTopMovies(this.state.page)// 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club);
    }

    /**
     * loadMovieById 
     * Use this function to fetch a single movie using the unique id of that movie
     * @argument { Int } id
     * @returns { Promise }
    */
    loadMovieById = (id) => {
        this.setState({status: "LOADING"});
        return this.props.data.getMovie(id);
    }

    /**
     * handleError
     * Use this function to set the status state to "ERROR", this will make the render function display a error message on the site. 
    */
    handleError = () => {
        this.setState({status: "ERROR"});
    }

    /**
     * nextSwipe, nextSwipe_util
     * Use this function to fetch the next movie and reset the moviebox to display the new currentMovie 
    */
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
        if(this.state.alreadyRated.includes(id)){
            this.incrementIndex(this.nextSwipe);
        }else{
            this.loadMovieById(id).end(result => {
                if(result.error) this.handleError();
                else this.setState({status: "LOADED", currentMovie: result.body});
                this.incrementIndex();
            })
        }
    }

    /**
     * incrementIndex
     * Use this function to increment the index state which determines which movie in the movies array to display next
     * Because of the size of the movies array ( 20 ), index will have a maximum value of 19, if incremented when at 19
     * the index will return to 0 and instead the page will be incremented
     * Accepts 1 @argument { function } func to pass as setState's callback function 
    */
    incrementIndex = (func) => {
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

    /** 
     * getCurrentMovieId
     * Use this function to get the id of the displayed movie, this function is neccesary because when nextSwipe runs
     * it calls incrementIndex making it so the index is always one step ahead of the displayed movie
     * @returns { int }  
    */
    getCurrentMovieId = () => {
        let id = 0;
        if(this.state.index === 0) id = this.state.movies[19].id;
        else id = this.state.movies[this.state.index - 1].id;
        return id;
    }
    /** 
     * updatePreferences
     * Use this function to increment or decrement all relevant preferences in the firebase-realtime-database
     * @argument { boolean } inc if inc is true => increment, false => decrement
    */
    updatePreferences = (inc) => {
        let val = 0;
        if(inc) val = 1;
        else val = -1;

        this.state.currentMovie.genres.map(gen => {
            this.preferencesRef.child('genres').child(gen.name).transaction(currentPref => {
                return (currentPref || 0) + val;
            });
        });
        this.state.currentMovie.production_companies.map(prodCom => {
            this.preferencesRef.child('porduction-companies').child(prodCom.name.replace(/[.#$[]]/g,'')).transaction(currentPref => {
                return (currentPref || 0) + val;
            });
        });
        this.state.currentMovie.production_countries.map(prodCon => {
            this.preferencesRef.child('porduction-countries').child(prodCon.name).transaction(currentPref => {
                return (currentPref || 0) + val;
            });
        });
        this.preferencesRef.child('language').child(this.state.currentMovie.original_language).transaction(currentPref => {
            return (currentPref || 0) + val;
        });
        this.preferencesRef.child('realease-year').child(this.state.currentMovie.release_date.substring(0,3) + '0').transaction(currentPref => {
            return (currentPref || 0) + val;
        });
    }

    /** 
     * blacklistCurrentMovie
     * Use this function to push the displayed movie to the firebase-Realtime-Database-reference thereby saving the 
     * displayed movie in the blacklist for the current user
    */
    blacklistCurrentMovie = () => {
        let id = this.getCurrentMovieId();
        this.blacklistRef.push(id);
        this.alreadyRatedRef.push(id);
    }

    /** 
     * likeCurrentMovie
     * Use this function to push the displayed movie to the firebase-Realtime-Database-reference thereby saving the 
     * displayed movie in the liked-movies list for the current user
     * This function also updates the preferences in the database acordingly
    */
    likeCurrentMovie = () => {
        let id = this.getCurrentMovieId();
        this.likedMoviesRef.push(id);
        this.alreadyRatedRef.push(id);
        this.updatePreferences(true);
    }

    /**
     * dislikeCurrentMovie
     * Use this function to push the displayed movie to the firebase-Realtime-Database-reference thereby saving the 
     * displayed movie in the disliked-movies list for the current user
     * This function also updates the preferences in the database acordingly
    */
    dislikeCurrentMovie = () => {
        let id = this.getCurrentMovieId();
        this.dislikedMoviesRef.push(id);
        this.alreadyRatedRef.push(id);
        this.updatePreferences(false);
    }

    /** 
     * handleLikeButton
     * This function handles the OnClick event of the like button
    */
    handleLikeButton = () => {
        this.likeCurrentMovie();
    }

    /** 
     * handleDislikeButton
     * This function handles the OnClick event of the dislike button
    */
    handleDislikeButton = () => {
        this.dislikeCurrentMovie();
    }

    /** 
     * handleBlacklistButton
     * This function handles the OnClick event of the blacklist button
    */
    handleBlacklistButton = () => {
        this.blacklistCurrentMovie();
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