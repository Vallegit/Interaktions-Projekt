import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SignUpPres from "./SignUpPres";
import "./SignUp.css";

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            user:null
        }
    }
    componentDidMount(){
        this.props.data.addObserver(this);
    }
    
    componentWillUnmount(){
        this.props.data.removeObserver(this);
    }

    update(){
        this.setState({user:this.props.data.getUser()});
    }

    render(){
        return (this.state.user !== null) ? <Redirect to="/swipe"/> : <SignUpPres signUp={this.props.data.signUp}/>
    }
}
export default SignUp;