import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Login.css";

export default class LoginPres extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            loginDisabled: true
        }
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
        return (
            <div className="Login">
                <span id="Login_text">
                    LOGIN
                </span>
                <p id="errorMsg" style={(this.props.error) ? {"display":"block"} : {"dispaly":"none"}}>{this.props.errorMsg}</p>
                <div className="flex_row">
                    <div className={(this.state.email.length === 0 && this.props.error) ? "input_container input_error" : "input_container"}>
                        <FontAwesomeIcon icon={faEnvelope} size="2x" className="icon"/>
                        <input type="email" value={this.state.email} name="email" className="input" placeholder="Email" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="flex_row">
                    <div className={(this.state.password.length < 6 && this.props.error) ? "input_container input_error" : "input_container"}>
                        <FontAwesomeIcon icon={faLock} size="2x" className="icon"/>
                        <input type="password" value={this.state.password} name="password" className="input" placeholder="Password" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="flex_row">
                    <button className="auth_button" type="submit" disabled={this.state.loginDisabled} onClick={() => this.props.login(this.state.email, this.state.password)}>
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