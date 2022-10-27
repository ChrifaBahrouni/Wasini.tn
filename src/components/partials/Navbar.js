import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutAdmin} from "../../actions/authActions";
import Notif from "../pages/icondata"
import { Link } from "react-router-dom";
class Navbar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutAdmin();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container-fluid p-0"  >
                <nav className="navbar navbar-expand-lg navbar-dark "  id="navbar-content">
                    
                    <a  id="profil" href="/">Admin Dashboard</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <Notif/>
                            <li className="dropdown">
                           
                                <a className="nav-link dropdown-toggle" href="#" id="settings"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="profil">
                                    Settings
                                </a>
                                <div className="dropdown-menu" aria-labelledby="settings">
                                  <Link to="/changepassword"> <a className="dropdown-item" href="#"  id="profil">Security</a></Link>  
                                  <a className="dropdown-item" href="#"  id="profil">traduction</a>
                                </div>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={this.onLogoutClick} id="profil">Logout ({user.name}) <FontAwesomeIcon icon={faSignOutAlt} id="profil" /> </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutAdmin }
)(Navbar);
