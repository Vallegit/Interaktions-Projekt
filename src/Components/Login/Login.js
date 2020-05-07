import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginPres from "./LoginPres";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.data.getUser()
        }
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
        return (this.state.user !== null) ? <Redirect to="/swipe"/> : <LoginPres login={this.props.data.logIn}/>;
    }
}

export default Login;