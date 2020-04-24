import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            loginDisabled: true,
            error: false,
            errorMsg: ""
        }
    }

    /**
     * logIn
     * Use this function to log in a user
     * @argument { event } e button click
    */
    logIn = (e) => {
        e.preventDefault();
        this.loginAccount()
            .then((u) => {
                this.props.authListener(u.user);
            })
            .catch((e) => {
                this.setState({error: true, errorMsg: e.message});
            });
    }

    /** 
     * loginAccount
     * Use this function to authenticate a user with the firebase-auth-database and log in the user
     * @returns { promise }
    */
    loginAccount = () => {
        return this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
    }

    /**
     * handleChange
     * Use this function to handle change in an input field
     * @argument { event } e input field value
    */
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        (this.state.password.length >= 5 && this.state.email.length > 0) ? this.setState({loginDisabled: false}) : this.setState({loginDisabled: true});
    }

    render(){
        if(this.props.user !== null) return <Redirect to="/swipe"/>;
        else return <LoginDisplay email={this.state.email} password={this.state.password} loginDisabled={this.state.loginDisabled} error={this.state.error} errorMsg={this.state.errorMsg}/>
    }
}

export default Login;