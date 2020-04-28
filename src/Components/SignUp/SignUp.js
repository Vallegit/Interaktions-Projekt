import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignUp.css";

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            signedUp: 0
        }
    }

    /** 
     * signUp
     * Use this function to set up a new user
     * @argument { event } e button click
    */
    signUp = (e) => {
        if(this.state.password !== this.state.confirmPassword || this.state.email === "" || this.state.username === "" || this.state.password === "") console.log("please fill fields");
        else{
            e.preventDefault();
            this.setupAccount()
                .then((u) => {
                    console.log(u.user);
                    this.setupDatabase(u.user);
                    u.user.updateProfile({displayName: this.state.username});
                    this.setState({signedUp: 1});
                })
                .catch((e) => {
                    console.log(e.message)
                });
        }
    }

    /** 
     * setupAccount
     * Use this function to create a new user in the firebase-auth-database
     * @returns { promise }
    */
    setupAccount = () => {
        return this.props.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
    }

    /** 
     * Use this function to create the necessary firebase-database references for the current user
     * @argument { user } user
    */
    setupDatabase = (user) => {
        let databaseRef = this.props.firebase.database().ref('users').child(user.uid);
        let movieRatingsRef = databaseRef.child('movieRatings');

        // Dummy values in ratings so it isn't empty
        movieRatingsRef.child('blacklist').push(0);
        movieRatingsRef.child('likedMovies').push(0);
        movieRatingsRef.child('dislikedMovies').push(0);
        movieRatingsRef.child('alreadyRated').push(0);
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
        if(this.state.signedUp === 1) return <Redirect to="/login"/>;
        
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
export default SignUp;