import * as ApiConfig from "./apiConfig";
import ObservableModel from "./ObservableModel";
import Firebase from "../Firebase/Firebase";

var unirest = require("unirest");
var req;

/*  This is where API-calls and user info is handled,
    the API used is "themovieDB" at https://www.themoviedb.org/.   
*/
class Data extends ObservableModel{
    constructor(){
        super();
        this.user = null; 
            try {
                this.user = JSON.parse(localStorage.getItem('user'));
            }catch(e) {
                this.user = null;
            }
        this.currentMovie = {};
        this.currentRating = 0;
        this.alreadyRated = [];
        this.preferences = {};
        this.authListener();
    }

    /** 
     * getAlreadyRated
     * @returns { Object[] } alreadyRated
    */
    getAlreadyRated(){
        return Object.values(this.alreadyRated);
    }

    /** 
     * setAlreadyRated
     * This is a Firebase callback that updates this.preferences
     * when the Firebase preferences is updated.
    */
    setAlreadyRated(){
        Firebase.database().ref('users').child(this.user.uid).child('movieRatings/alreadyRated').on('value',snap =>{
            this.alreadyRated = snap.val();
            this.notifyObservers('ALREADY_RATED');
        })
    }

    /** 
     * getPreferences
     * @returns { Object } preferences
    */
    getPreferences(){
        return this.preferences;
    }

    /** 
     * getUser
     * @returns { Object } user
    */
    getUser(){
        return this.user;
    }

    /** 
     * getCurrentMovie
     * @returns { Object } currentMovie
    */
    getCurrentMovie(){
        return this.currentMovie;
    }

    /** 
     * setCurrentMovie
     * @argument { Object } movie
    */
    setCurrentMovie(movie){
        this.currentMovie = movie;
    }

    /** 
     * getCurrentRating
     *  @returns { Number } currentRating
    */
    getCurrentRating(){
        return this.currentRating;
    }

    /** 
     * setCurrentRating
     * @argument { Number } rating
    */
    setCurrentRating(rating){
        this.currentRating = rating;
    }

    /** 
     * logoutAccount
     * Use this function to log out the current user
    */
    logoutAccount(){
        Firebase.auth().signOut();
        this.authListener();
    }


    /**
     * logIn
     * Use this function to log in a user
     * @argument { event } e button click
    */
    logIn = (email, password) => {
        return Firebase.auth().signInWithEmailAndPassword(email, password)
            .then((u) => {
                this.authListener(u.user);
            });
    }

    /** 
     * signUp
     * Use this function to set up a new user
     * @argument { event } e button click
    */
    signUp = (password, confirmPassword, email, username) => {
        if(password !== confirmPassword || email === "" || username === "" || password === "") return Promise.reject(new Error("Please fill all fields"));
        else{
            return Firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((u) => {
                    let databaseRef = Firebase.database().ref('users').child(u.user.uid);
                    let movieRatingsRef = databaseRef.child('movieRatings');
            
                    // Dummy values in ratings so it isn't empty
                    movieRatingsRef.child('blacklist').push(0);
                    movieRatingsRef.child('likedMovies').push(0);
                    movieRatingsRef.child('dislikedMovies').push(0);
                    movieRatingsRef.child('alreadyRated').push(0);
                    u.user.updateProfile({displayName: username});
                    this.logIn(email, password);
                });
        }
    }


    /** 
     * authListener
     * Updates this.user according to the Firebase.auth() function
     * and notifies all observers
    */
    authListener(){
        Firebase.auth().onAuthStateChanged((user) => { if(user !== null){
            this.user = user; 
            this.setAlreadyRated();
            Firebase.auth().setPersistence('local');
            localStorage.setItem('user', JSON.stringify(user));
        }else {
            this.user = null;
            this.alreadyRated = null;
            localStorage.setItem('user', JSON.stringify(null));
        }
            this.notifyObservers('USER');
        });
    }
    
    /** 
     * getMovie
     * Get a specific movie by movie-ID
     * @returns { object }  
    */
    getMovie(id){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "movie/" + id)
        return (req
            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language": "en-US",
                "api_key": ApiConfig.API_KEY
            })
        );
    }

    /** 
     * getTopMovies
     * Get an array with the top rated movies
     * @returns { object[] }  
    */
    getTopMovies(page){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "movie/top_rated")
        return (req
            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language": "en-US",
                "page": page,
                "api_key": ApiConfig.API_KEY
            })
        );
    }

    /** 
     * getSimilarMovies
     * Search for movies that are similar to a specific movie
     * @returns { object[] } 
    */
    getSimilarMovies(id, page){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "movie/" + id + "/similar")
        return (req
            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language": "en-US",
                "page": page,
                "api_key": ApiConfig.API_KEY
            })
        );
    }

    /** 
     * searchMovies
     * Search for movies based on a query
     * @returns { object[] } 
    */
    searchMovies(query, year, genre, page){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "search/movie")
        return (req
            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language": "en-US",
                "api_key": ApiConfig.API_KEY,
                "query": query,
                "year": year,
                "page": page
            })
        );
    }

    /**
     * discoverMovies
     * Discover movies based on all kinds of arguments
     * @returns { object[] }
    */
    discoverMovies(sort, year, rating, with_genre, without_genre, language, page){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "discover/movie")
        return (req
            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language": "en-US",
                "api_key": ApiConfig.API_KEY,
                "sort_by": sort,
                "release_date.gte": year,
                "page": page,
                "include_adult": "false",
                "inlude_video": "false",
                "vote_average.gte": rating,
                "with_genres": with_genre,
                "without_genre": without_genre,
                "with_original_language": language
            })
        );
    }

    /** 
     * getGenres
     * Get an array with all genres and corresponding IDs
     * @returns { object[] }
    */
    getGenres(){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "genre/movie/list")
        return (req
            .query({
                "api_key": ApiConfig.API_KEY
            })
        );
    }
}

const dataInstance = new Data();
export default dataInstance;