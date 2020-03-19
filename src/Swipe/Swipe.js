import React, { Component } from "react";
import "./Swipe.css";

class Swipe extends Component {
    constructor(props){
        super(props);
        this.state={
            status:"LOADING"
        };
    }
    componentDidMount(){
        this.loadMovie();
    }
    loadMovie(){
        this.props.dataInstance.getMovie()
            .then(result=>this.setState({status:"LOADED",movie:result}))
            .catch(()=>this.setState({status:"ERROR"}));
    }
    render(){
        switch(this.state.status){
            case "LOADING":
                break;

        }

        return (
            <div className="Swipe">
                <div className="Movie-box">
                    <image className="Movie-image">
                        
                    </image>
                    <p className="Title">
                        This is title
                    </p>
                    <p>
                        This is year
                    </p>
                    <p>
                        This is director
                    </p>
                    <p className="Description">
                        This text describes the current movie.
                    </p>
                </div>
                <button className="good"></button>
                <button className="bad"></button>
                <button className="remove"></button>
            </div>
        )
    }
}

export default Swipe;