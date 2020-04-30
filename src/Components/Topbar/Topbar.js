import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faFilm, faExchangeAlt, faPercent, faSignOutAlt, faBoxTissue } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Topbar.css"

class Topbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.data.getUser(),
            smallMenu: (window.matchMedia(`(max-width: 1000px)`).matches)
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

    render(){
        return(
            <div className="Topbar">
                <FontAwesomeIcon icon={faFilm} size={(this.state.smallMenu) ? "3x" : "5x"} className="TitleIcon"/>
                <div className="Topbar-Title"> Movie Swiper</div>
                <Link className="MenuLink" to={"/swipe"}>
                    <button className="MenuBtn" title="Go to Swipe screen"> 
                        <FontAwesomeIcon icon={faExchangeAlt} size={(this.state.smallMenu) ? "1x" : "2x"} className="TitleIcon"/>
                        <p className="MenuText">Swipe</p>
                    </button>
                </Link>
                <Link className="MenuLink" to={"/matches"}>
                    <button className="MenuBtn" title="Check your matches"> 
                        <FontAwesomeIcon icon={faPercent} size={(this.state.smallMenu) ? "1x" : "2x"} className="TitleIcon"/>
                        <p className="MenuText">Matches</p>
                    </button>
                </Link>
                <button className="MenuBtn" id="trrd_btn" title="Logout User" onClick={() => this.props.data.logoutAccount()}>
                    <FontAwesomeIcon icon={faSignOutAlt} size={(this.state.smallMenu) ? "1x" : "2x"} className="TitleIcon"/>
                    <p className="MenuText" >{(this.state.user === null) ? 'Sign In' : 'Sign Out'}</p>
                </button>
            </div>
        );
    }
}

export default Topbar;