import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdmin } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { textAlign } from "@mui/system";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
      this.props.loginAdmin(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div id="login">
        <div className="row mt-5">
          <div className="col-md-4 mx-auto mt-5 card shadow-lg">
            <div id ="login">
              <h2 className="text-center text-warning mt-3">Login</h2>
              <img    width="100px"  height="100px" src="https://firebasestorage.googleapis.com/v0/b/wasini-30843.appspot.com/o/logo.png?alt=media&token=15fd1920-51a8-4492-b738-febf4122b4c5" alt="image not fund " />
              <form noValidate onSubmit={this.onSubmit} className="white">
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
                <p className="text-center pb-0 mt-2">
                  <button
                    type="submit"
                    className="btn btn-large btn-warning mt-2 px-5">
                    Sign In
                  </button>
                  {/* <p id="login">You don't have an account?
                                    <Link to="/register" className="formFieldLink">
                      Create an account !
            </Link></p> */}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginAdmin }
)(Login);
