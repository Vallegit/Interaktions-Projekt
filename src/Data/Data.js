import * as ApiConfig from "./apiConfig";

var unirest = require("unirest");
var req;

/*  This is where API-calls and user info is handled,
    the API used is "themovieDB" at https://www.themoviedb.org/.
    User information including username and password is stored in 
    plaintext txt-files because encrypting is extra work.   */
class Data {
    
    /** * Get a specific movie by movie-ID
        * @returns { object }  
    */
    getMovie(id){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "movie/" + id)
        return (req

            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language":"en-US",
                "api_key": ApiConfig.API_KEY
            })
        );
    }

    /** 
     * Get an array with the top rated movies
     * @returns { object[] }  
    */
    getTopMovies(){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "movie/" +  "top_rated")
        return (req

            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language":"en-US",
                "api_key": ApiConfig.API_KEY
            })
        );
    }

    /** 
     * Search for movies that are similar to a specific movie
     * @returns { object[] } 
    */
    getSimilarMovies(id){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "movie/" + id + "/similar")
        return (req

            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language":"en-US",
                "api_key": ApiConfig.API_KEY
            })
        );
    }

    /** 
     * Search for movies based on a query
     * @returns { object[] } 
    */
    searchMovies(query, year, genre){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + "search/movie")
        return (req

            .query({
                "t": "loadvideo",
                "q": "60029591",
                "language":"en-US",
                "api_key": ApiConfig.API_KEY,
                "query": query,
                "year": year,
                "with_genres": genre
            })
        );
    }
}

const dataInstance = new Data();
export default dataInstance;