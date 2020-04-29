import React, { Component } from "react";
import { Link} from "react-router-dom";
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Login.css";

class LoginDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: this.props.email,
            password: this.props.password,
            loginDisabled: this.props.loginDisabled,
            error: this.props.error,
            errorMsg: this.props.errorMsg
        }
    }
    render(){
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
export default LoginDisplay;