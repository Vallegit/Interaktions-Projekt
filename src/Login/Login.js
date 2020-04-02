import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Firebase from "../Firebase/Firebase";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    logIn(){

    }

    signUp(){

    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

        render(){
            return (
                <div className="Login">
                    <span id="Login_text">
                        Welcome to Movie Swiper, please log in or create an account to continue
                    </span>

                    <div className="input_container">
                        <span className="input_text">
                            Email address
                        </span>
                        <input type="email" name="email" className="input" placeholder="Enter email" onChange={this.handleChange}/>
                    </div>
                    <div className="input_container">
                        <span className="input_text">
                            Password
                        </span>
                        <input type="password" name="password" className="input" placeholder="Password" onChange={this.handleChange}/>
                    </div>
                    <div className="flex_Row">
                        <Link to="/swipe" className="login_Link">
                            <button className="button"  onClick={this.logIn}>
                                LOG IN
                            </button>
                        </Link>
                    </div>
                    <div className="flex_Row">
                        <button className="button" onClick={this.signUp}>
                            SIGN UP
                        </button>
                    </div>
                </div>
            )
        }
    }

export default Login;