import React, { Component } from "react";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignUp.css";

class SignUpDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: this.props.email,
            password: this.props.password,
            confirmPassword: this.props.confirmPassword,
            username:this.props.username
        }
    }
    render(){

        return(
            <div className="SignUp">
                <span id="SignUp_text">
                    SIGN UP
                </span>
                <div className="flex_row">
                    <div className="input_container">
                        <FontAwesomeIcon icon={faEnvelope} size="2x" className="icon"/>
                        <input type="email" value={this.state.email} name="email" className="input" placeholder="Email" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="flex_row">
                    <div className="input_container">
                        <FontAwesomeIcon icon={faUser} size="2x" className="icon"/>
                        <input type="text" value={this.state.username} name="username" className="input" placeholder="Username" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="flex_row">
                    <div className="input_container">
                        <FontAwesomeIcon icon={faLock} size="2x" className="icon"/>
                        <input type="password" value={this.state.password} name="password" className="input" placeholder="Password" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="flex_row">
                    <div className="input_container">
                        <FontAwesomeIcon icon={faLock} size="2x" className="icon"/>
                        <input type="password" value={this.state.confirmPassword} name="confirmPassword" className="input" placeholder="Confirm Password" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="flex_row">
                    <button className="auth_button" id="SignUp_button" onClick={this.signUp}>
                        SIGN UP
                    </button>
                </div>
            </div>
        );
    }
    
}
export default SignUpDisplay;