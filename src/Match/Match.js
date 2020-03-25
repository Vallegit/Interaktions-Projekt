import React, { Component } from "react";
import "./Match.css";
import dataInstance from "../Data/Data";

class Match extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING MOVIES",
            index: 0,
            page: 1
        };
    }
    componentDidMount(){
        this.loadMovies();
     }

    loadMovies = () => {
         dataInstance
             .getTopMovies(this.state.page)// 200 - star trek, 240 - godfather, 280 - terminator, 330 - jurassic park, 350 - Devil n prada 550 - fight club
             .end(result => {
                 if(result.error)this.setState({status: "ERROR"})
                 else this.setState({status: "LOADED", movies: result.body.results})});
     }
 
    render(){
        let movieList=null;
        switch(this.state.status){

            case "LOADING MOVIES":
                movieList=
                                <div className="Loader"></div>
                break;
            
            case "LOADED":
                movieList=null;
                break;
            default: 
            movieList=
                    <h1 className="Error" >
                        Big error, contact the helpdesk for more info.
                    </h1>
                break;
        }
        return (
            <div className="Match">
               <ul>{movieList}</ul>
            </div>
            )
        }
}


export default Match;