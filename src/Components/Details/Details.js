import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import DetailsPres from "./DetailsPres";

export default class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            movie: this.props.data.getCurrentMovie(),
            rating:this.props.data.getCurrentRating(),
            user: this.props.data.getUser()
        };
    }

    componentDidMount(){
        this.props.data.addObserver(this);
    }

    componentWillUnmount(){
        this.props.data.removeObserver(this);
    }

    update(){
        this.setState({user: this.props.data.getUser()});
    }

    render(){
        return (this.state.user === null) ? <Redirect to="/"/> : <DetailsPres movie={this.state.movie} rating={this.state.rating}/>;
    }
}