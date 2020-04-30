import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginPres from "./LoginPres";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: false,
            errorMsg: "",
            user: null
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

    /**
     * logIn
     * Use this function to log in a user
     * @argument { event } e button click
    */
    logIn = (email, password) => {
        this.props.data.loginAccount(email, password)
            .then((u) => {
                this.props.data.authListener(u.user);
            })
            .catch((e) => {
                this.setState({error: true, errorMsg: e.message});
            });
    }

    render(){
        return (this.state.user !== null) ? <Redirect to="/swipe"/> : <LoginPres error={this.state.error} errorMsg={this.state.errorMsg} login={this.logIn}/>;
    }
}

export default Login;