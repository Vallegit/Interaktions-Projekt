import * as ApiConfig from "./apiConfig";

var unirest = require("unirest");
var req;

class Data {
    constructor(){
    }
    
    getMovie(id){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT + id)
        return (req

            .query({
                "t": "loadvideo",
                "q": "60029591",
                "api_key": ApiConfig.API_KEY
            })
        );
        // MOVIE IMAGE URL = https://image.tmdb.org/t/p/original
    }
}

const dataInstance = new Data();
export default dataInstance;