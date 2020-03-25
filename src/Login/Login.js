import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
        render(){
            return (
                <div className="Login">
                    <span id="Login_text">
                        Welcome to Movie Swiper, please log in or create an account to continue
                    </span>

                    <div className="input_container">
                        <span className="input_text">
                            Username:
                        </span>
                        <input type="text" className="input">

                        </input>
                    </div>
                    <div className="input_container">
                        <span className="input_text">
                            Password:
                        </span>
                        <input type="text" className="input">

                        </input>
                    </div>
                    <div className="flex_Row">
                        <Link to="/swipe" className="login_Link">
                            <button className="button"  onClick={() => {
                                //PUT BUTTON FUNCTIONS HERE
                            }}>
                                LOG IN
                            </button>
                        </Link>
                    </div>
                    <div className="flex_Row">
                        <button className="button" onClick={() => {

                        }}>
                            CREATE ACCOUNT
                        </button>
                    </div>

                </div>
            )
        }
    }

export default Login;