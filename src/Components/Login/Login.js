import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

        return (
            <div className="Login">
                <span id="Login_text">
                    LOGIN
                </span>
                <p id="errorMsg" style={(this.state.error) ? {"display":"block"} : {"dispaly":"none"}}>{this.state.errorMsg}</p>
                <div className="flex_row">
                    <div className={(this.state.email.length === 0 && this.state.error) ? "input_container input_error" : "input_container"}>
                        <FontAwesomeIcon icon={faEnvelope} size="2x" className="icon"/>
                        <input type="email" value={this.state.email} name="email" className="input" placeholder="Email" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="flex_row">
                    <div className={(this.state.password.length < 6 && this.state.error) ? "input_container input_error" : "input_container"}>
                        <FontAwesomeIcon icon={faLock} size="2x" className="icon"/>
                        <input type="password" value={this.state.password} name="password" className="input" placeholder="Password" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="flex_row">
                    <button className="auth_button" type="submit" disabled={this.state.loginDisabled} onClick={this.logIn}>
                        LOGIN
                    </button>
                </div>
                <div className="flex_row">
                    <p>
                        Not a member?
                    </p>
                    <Link to="/signup">
                        Sign up now
                    </Link>
                </div>
            </div>
        )
    }
}

export default Login;