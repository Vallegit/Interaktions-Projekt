import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faExchangeAlt, faPercent, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MobileMenu.css";

export default class MobileMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            user:null
        }
    }
    render(){
        return( 
            <div className="MobileMenu">
                <Link className="mobMenuLink" to={"/swipe"}>
                    <button className="mobMenuBtn" title="Go to Swipe screen"> 
                        <FontAwesomeIcon icon={faExchangeAlt} size="2x" className="TitleIcon"/>
                        <p className="MenuText">Swipe</p>
                    </button>
                </Link>
                <Link className="mobMenuLink" to={"/matches"}>
                    <button className="mobMenuBtn" title="Check your matches"> 
                        <FontAwesomeIcon icon={faPercent} size="2x" className="TitleIcon"/>
                        <p className="MenuText">Matches</p>
                    </button>
                </Link>
                <button className="mobMenuBtn" id="third_btn" title="Logout User">
                    <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="TitleIcon"/>
                    <p className="MenuText" onClick={() => this.props.data.logoutAccount()}>{(this.state.user === null) ? 'Sign In' : 'Sign Out'}</p>
                </button>
            </div>
        );
    }
}