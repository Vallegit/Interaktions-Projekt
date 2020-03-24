import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
        render(){
            return (
                <div className="Login">
                    <div id="break"/>
                    <span id="Login_text">
                        Welcome to Movie Swiper, please log in or create an account to continue
                    </span>

                    <div className="Username">
                        <span id="Username_text">
                            Username:
                        </span>
                        <input type="text" id="Username_input">

                        </input>
                    </div>
                    <div className="Password">
                        <span id="Password_text">
                            Password:
                        </span>
                        <input type="text" id="Password_input">

                        </input>
                    </div>

                </div>
            )
        }
    }

export default Login;