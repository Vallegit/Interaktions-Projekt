import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import DetailsDisplay from "./DetailsDisplay";
import "./Details.css";

class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING",
            movieID:this.props.location.pathname.substr(9),
            movie: {},
            preferences: {},
            rating:this.props.rating
        };
    }

    componentDidMount(){
        if(this.props.user !== null){
            this.props.data.getMovie(this.state.movieID).end(result => {
                this.setState({movie:result.body, status: "LOADED"});
                console.log(result.body);
            });
        }
    }

    render(){
        if(this.props.user === null) return <Redirect to="/"/>;
        else return <DetailsDisplay status={this.state.status} movie={this.state.movie} rating={this.state.rating}/>;
    }
}

export default withRouter(Details);
