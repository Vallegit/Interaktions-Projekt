import * as ApiConfig from "./apiConfig";

var unirest = require("unirest");
var req;

/*  This is where API-calls and user info is handled,
    the API used is "themovieDB" at https://www.themoviedb.org/.
    User information including username and password is stored in 
    plaintext txt-files because encrypting is extra work.   */
class Data {
    
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
    discoverMovies(sort, year, rating, cast, crew, with_genre, without_genre, with_keywords, without_keywords, language, page){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "search/movie")
        return (req
            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language": "en-US",
                "api_key": ApiConfig.API_KEY,
                "sort_by": sort,
                "year": year,
                "page": page,
                "include_adult": "false",
                "inlude_video": "false",
                "vote_average.gte": rating,
                "with_cast": cast,
                "with_crew": crew,
                "with_genres": with_genre,
                "without_genre": without_genre,
                "with_keywords": with_keywords,
                "without_keywords": without_keywords,
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