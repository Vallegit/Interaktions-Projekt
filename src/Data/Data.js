import * as ApiConfig from "./apiConfig";

var unirest = require("unirest");
var req;

class Data {
    constructor(){
        req = unirest("GET", "https://" + ApiConfig.ENDPOINT)
    }
    
    getMovie(){
        req
            .query({
                "t": "loadvideo",
                "q": "60029591",
                "api_key": ApiConfig.API_KEY
            })
            .end(function (res) {
                if (res.error) throw new Error(res.error);
                console.log(res.body);
            });
    }
}

const dataInstance = new Data();
export default dataInstance;