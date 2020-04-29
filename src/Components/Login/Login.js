import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginDisplay from "./LoginDisplay";
import "./Login.css";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            loginDisabled: true,
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
    logIn = (e) => {
        e.preventDefault();
        this.props.data.loginAccount(this.state.email, this.state.password)
            .then((u) => {
                this.props.data.authListener(u.user);
            })
            .catch((e) => {
                this.setState({error: true, errorMsg: e.message});
            });
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
        if(this.state.user !== null) return <Redirect to="/swipe"/>;

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