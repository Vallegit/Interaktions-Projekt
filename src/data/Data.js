import * as ApiConfig from "./apiConfig";

const BASE_URL = ApiConfig.ENDPOINT;
const httpOptions = {
    headers: { method: "GET"}
};

var unirest = require("unirest");

class Data {
    constructor(){
        super();
        var req = unirest("GET", "https://" + ApiConfig.ENDPOINT);
    }

    getMovie(){
        req.query = ({
            "t": "loadvideo",
            "q": "60029591"
        });
        req.headers = ({
            "x-rapidapi-host": ApiConfig.ENDPOINT,
            "x-rapidapi-key": ApiConfig.API_KEY
        });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            console.log(res.body);
        });
    }
}

export default Data;