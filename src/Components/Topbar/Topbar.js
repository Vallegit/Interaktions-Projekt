import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { faFilm, faExchangeAlt, faPercent, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Topbar.css"

class Topbar extends Component{

    render(){
        return(
            <div className="Topbar">
                <FontAwesomeIcon icon={faFilm} size="5x" className="TitleIcon"/>
                <div className="Topbar-Title"> Movie Swiper</div>

                    <Link className="MenuLink" to={"/swipe"}>
                        <button className="MenuBtn" title="Go to Swipe screen"> 
                            <FontAwesomeIcon icon={faExchangeAlt} size="2x" className="TitleIcon"/>
                            <p className="MenuText">Swipe</p>
                        </button>
                    </Link>
                    <Link className="MenuLink" to={"/matches"}>
                        <button className="MenuBtn" title="Check your matches"> 
                            <FontAwesomeIcon icon={faPercent} size="2x" className="TitleIcon"/>
                            <p className="MenuText">Matches</p></button>
                    </Link>

                        <button className="MenuBtn" id="trrd_btn" title="Logout User">
                            <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="TitleIcon"/>
                            <p className="MenuText">Sign Out</p>
                        </button>
            </div>
        );
        
    }
}

export default Topbar;