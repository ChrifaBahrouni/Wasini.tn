import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div id="login">
                <div className="row mt-5">
                    <div className="col-md-4 mx-auto mt-5 card shadow-lg">

                        <div className="card-body p-1">
                            <h2 className="text-center text-warning mt-3">Register</h2>

                        </div>
                        <form noValidate onSubmit={this.onSubmit} className="white">
                            <div className="input-field col s12">
                                <label htmlFor="name" id="login">Name</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    id="name"
                                    type="text"
                                    error={errors.name}
                                    className={classnames("form-control", {
                                        invalid: errors.name
                                    })}
                                />

                                <span className="text-danger">{errors.name}</span>
                            </div>
                            <br />
                            <div className="input-field col s12">
                                <label htmlFor="email" id="login">Email</label>

                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("form-control", {
                                        invalid: errors.email
                                    })}
                                />
                                <span className="text-danger">{errors.email}</span>

                            </div>
                            <div className="input-field col s12">
                                <br />
                                <label htmlFor="password" id="login">Password</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("form-control", {
                                        invalid: errors.password
                                    })}
                                />
                                <span className="text-danger">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">

                                <label htmlFor="password2" id="login">Confirm Password</label>
                                <br />
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("form-control", {
                                        invalid: errors.password
                                    })}
                                />
                                <span className="text-danger">{errors.password}</span>
                            </div>
                            <br />
                            <div className="col s12">
                            <button
                    type="submit"
                    className="btn btn-large btn-warning mt-2 px-5">
                    Sign Up 
                                    </button>
                                <p className="grey-text text-darken-1" id="login">
                                    Already have an account? <Link to="/login">Log in</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));