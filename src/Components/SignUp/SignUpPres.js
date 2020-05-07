import React, { Component } from "react";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignUp.css";

export default class SignUpPres extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            confirmPassword:"",
            username:""
        }
    }
    /**
     * handleChange
     * Use this function to handle change in an input field
     * @argument { event } e input field value
    */
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){

        return(
            <div className="SignUp">
                <span id="SignUp_text">
                    SIGN UP
                </span>
                <p id="errorMsg" style={(this.state.error) ? {"display":"block"} : {"dispaly":"none"}}>{this.state.errorMsg}</p>
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
                    <button className="auth_button" id="SignUp_button" onClick={()=> this.props.signUp(this.state.password, this.state.confirmPassword, this.state.email, this.state.username).catch((e)=>this.setState({error:true,errorMsg:e.message}))}>
                        SIGN UP
                    </button>
                </div>
            </div>
        );
    }
    
}