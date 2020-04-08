import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import "./Details.css";


class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING",
            movieID:this.props.location.pathname.substr(9)
        };
    }


    //Nu kan jag skriva this.state.movie
    componentDidMount(){
        this.props.data.getMovie(this.state.movieID).end(result=>
            {this.setState({movie:result.body, status: "LOADED"})
            
        });
    }

    render(){
        //if(this.props.user === null) return <Redirect to="/"/>;
        this.props.data.getMovie(this.state.movieID).end(result=>console.log(result.body));

        let posterUrl="https://image.tmdb.org/t/p/original";
        let DetailsBox=null;
        let Loader=null
        let BackDrop=null;
        switch(this.state.status){

            case "LOADING":
                DetailsBox=
                    <div className="LoaderIII"></div>
                break;
            
            case "LOADED":
               BackDrop = {
                    backgroundImage: `url(${posterUrl+this.state.movie.backdrop_path})`,
                    backgroundSize: '100%',
                    };
                DetailsBox=
                        <div className="DetailContainer">
                            <img src={posterUrl+this.state.movie.poster_path} id="Image" alt="Movie Poster"/>
                            <div id="MTitle">{this.state.movie.title}</div>
                            <div id="Runtime">Runtime: {this.state.movie.runtime} min</div>
                            <div id="Year">Release Date: {this.state.movie.release_date}</div>
                            <div id="Genre">Genre: {this.state.movie.genres.map(gen=>{return gen.name+" "})}</div>
                            <div id="Rating">Rating: {this.state.movie.vote_average}</div>
                            <div id="Budget">Budget: {this.state.movie.budget}</div>
                            <div id="ProductionCompany">Production Company: {this.state.movie.production_companies.map(com=>{return com.name+" "})}</div>
                            <div id="Description">{this.state.movie.overview}</div>
                        </div>
                break;

            default: 
            DetailsBox=
                    <h1 className="Error" >
                        Big error, contact the helpdesk for more info.
                    </h1>
                break;
        }

        return (
            <div style={BackDrop} className="Detail">
                <ul id="detailer">{DetailsBox}</ul>
            </div>
        )
    }
}

export default withRouter(Details);