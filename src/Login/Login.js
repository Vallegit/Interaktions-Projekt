import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
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
                console.log(e.message)
            });
    }

    /** 
     * signUp
     * Use this function to set up a new user
     * @argument { event } e button click
    */
    signUp = (e) => {
        e.preventDefault();
        this.setupAccount()
            .then((u) => {
                console.log(u.user);
                this.setupDatabase(u.user);
                this.logIn();
            })
            .catch((e) => {
                console.log(e.message)
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
        let movieRatingsRef = databaseRef.child('movie-ratings');
        let preferencesRef = databaseRef.child('preferences');

        // Dummy values in ratings so it isn't empty
        movieRatingsRef.child('blacklist').push(0);
        movieRatingsRef.child('liked-movies').push(0);
        movieRatingsRef.child('disliked-movies').push(0);
        movieRatingsRef.child('already-rated').push(0);

        // Initial values in preferences
        preferencesRef.child('genres').set({
            Action: 0,
            Drama: 0,
            Romance: 0,
            Horror: 0,
            Thriller: 0,
            Adventure: 0,
            Comedy: 0,
            Crime: 0
        });
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
            if(this.props.user !== null) return <Redirect to="/swipe"/>;

            return (
                <div className="Login">
                    <span id="Login_text">
                        Welcome to Movie Swiper, please log in or create an account to continue
                    </span>
                    <div className="input_container">
                        <span className="input_text">
                            Email address
                        </span>
                        <input type="email" value={this.state.email} name="email" className="input" placeholder="Enter email" onChange={this.handleChange}/>
                    </div>
                    <div className="input_container">
                        <span className="input_text">
                            Password
                        </span>
                        <input type="password" value={this.state.password} name="password" className="input" placeholder="Password" onChange={this.handleChange}/>
                    </div>
                    <div className="flex_Row">
                        <Link to="/swipe" className="login_Link">
                            <button className="button"  onClick={this.logIn}>
                                LOG IN
                            </button>
                        </Link>
                    </div>
                    <div className="flex_Row">
                        <Link to="/swipe" className="login_Link">
                            <button className="button" onClick={this.signUp}>
                                SIGN UP
                            </button>
                        </Link>
                    </div>
                </div>
            )
        }
    }

export default Login;