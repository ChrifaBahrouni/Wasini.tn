import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAdmin } from "../../actions/authActions";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {Link} from "react-router-dom";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons/faUserAlt";
import '../../App.css';


class Dashboard extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        //const { user } = this.props.auth;
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                        <button className="btn btn-link mt-2" id="menu-toggle"><FontAwesomeIcon icon={faList}/></button>                   
                                 <h1 className="mt-2 text-warning">Dashboard</h1>
                            <div className="row px-2">
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card " id="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Users</h5>{/*pour avoir la tables de liste de users*/}
                                            <p className="card-text">All Listed Users</p>
                                            <Link to="/users" className="btn btn-dark"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Check</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                    <div className="card " id="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Voyageur</h5>{/*pour avoir la tables de liste de users*/}
                                            <p className="card-text">All Listed  Voyageur</p>
                                            <Link to="/users" className="btn btn-dark"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Check</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                <div className="card " id="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Paiement </h5>
                                            <p className="card-text">All Listed Paiements</p>
                                            
                                            <Link to="/Events" className="btn btn-dark"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Check</Link> {/**dans le dashboard dans la liste on l'icon qui nous permet d'avoir la liste de event */}

                                        </div>
                                    </div>
                                </div>
                            
                                
                                <div className="col-sm-3 p-sm-2">
                                <div className="card " id="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Posts</h5>
                                            <p className="card-text">All Listed Posts</p>
                                            <Link to="/Posts" className="btn btn-dark"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Check</Link>
                                        </div>
                                    </div>
                                </div>
                               
                                
                                <div className="col-sm-3 p-sm-2">
                                <div className="card " id="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Réclamations</h5>
                                            <p className="card-text">All Listed Claming </p>
                                            <Link to="/claming" className="btn btn-dark"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Check</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 p-sm-2">
                                <div className="card " id="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Discussions</h5>
                                            <p className="card-text">All Listed Discussions</p>
                                            <Link to="/discussions" className="btn btn-dark"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Check</Link>
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="col-sm-3 p-sm-2">
                                <div className="card " id="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Notifications</h5>
                                            <p className="card-text">All Listed Notifications</p>
                                            <Link to="/Notif" className="btn btn-dark"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Check</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutAdmin}
)(Dashboard);
