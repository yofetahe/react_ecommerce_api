import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  signUpAppUser,
  authenticateUser,
  logout,
  togglePopup,
  closePopup
} from "../actions";
import Login from "./account/Login";
import Signup from "./account/Signup";
import classes from "./header_footer.module.css";

class Header extends Component {
  state = {
    form: {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      confirm_password: null
    },
    errors: {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      confirm_password: null
    }
  };

  refreshErrorsMessage = () => {
    const errors = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      confirm_password: null
    };
    this.setState({ errors });
  };

  toggleLoginPopup = () => {
    this.refreshErrorsMessage();
    this.props.togglePopup("POPUP_LOGIN", !this.props.showPopupLogin);
  };

  toggleSignupPopup = () => {
    this.refreshErrorsMessage();
    this.props.togglePopup("POPUP_SIGNUP", !this.props.showPopupSignup);
  };

  closePopup = () => {
    this.props.closePopup();
    this.refreshErrorsMessage();
  };

  inputChangeHandler = (event, type) => {
    const form = { ...this.state.form };
    form[type] = event.target.value;
    this.setState({ form });
  };

  validateLogin = () => {
    this.refreshErrorsMessage();

    let check = false;

    const errors = { ...this.state.errors };

    if (!this.state.form.email) {
      errors.email = "Email is required";
      check = true;
    }
    if (
      this.state.form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.form.email)
    ) {
      errors.email = "Please provide correct email format";
      check = true;
    }
    if (!this.state.form.password) {
      errors.password = "Password is required";
      check = true;
    }

    this.setState({ errors });

    return check;
  };

  validateSignup = () => {
    this.refreshErrorsMessage();

    let check = false;

    const errors = { ...this.state.errors };

    if (!this.state.form.first_name) {
      errors.first_name = "First name is required";
      check = true;
    }
    if (!this.state.form.last_name) {
      errors.last_name = "Last name is required";
      check = true;
    }
    if (!this.state.form.email) {
      errors.email = "Email is required";
      check = true;
    }
    if (!this.state.form.password) {
      errors.password = "Password is required";
      check = true;
    }
    if (!this.state.form.confirm_password) {
      errors.confirm_password = "Password confirmation is required";
      check = true;
    }
    if (
      this.state.form.password &&
      this.state.form.confirm_password &&
      this.state.form.password !== this.state.form.confirm_password
    ) {
      errors.password = "A given password is not similar";
      errors.confirm_password = "A given password is not similar";
      check = true;
    }
    this.setState({ errors });

    return check;
  };

  loginHandler = event => {
    event.preventDefault();
    if (this.validateLogin()) {
      return;
    }
    this.props.authenticateUser(this.state.form);
  };

  signupHandler = event => {
    event.preventDefault();
    if (this.validateSignup()) {
      return;
    }
    console.log(this.state.form);
    this.props.signUpAppUser(this.state.form);
  };

  logoutHandler = () => {
    console.log("here");
    this.props.logout();
  };

  render() {
    return (
      <div className={classes.header_background}>
        <div className={classes.logo}>
          <img
            alt="logo"
            src="https://logodix.com/logo/2085040.png"
            style={{ width: "180px" }}
          />
        </div>
        <div className={classes.header_link}>
          {sessionStorage.getItem("loggedInUserEmail") ? (
            <div>
              {this.props.loggedInUserEmail} |{" "}
              <Link to={`/SavedItems`}>Saved Items</Link> |{" "}
              <Link to={`/MyAccount`}>My Account</Link> |{" "}
              <span
                onClick={this.logoutHandler}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Logout
              </span>
            </div>
          ) : (
            <span onClick={this.toggleLoginPopup} style={{ cursor: "pointer" }}>
              Login
            </span>
          )}
        </div>

        {this.props.showPopupLogin ? (
          <Login
            inputChangeHandler={this.inputChangeHandler}
            loginHandler={this.loginHandler}
            closePopupLogin={this.closePopup}
            signupPopup={this.toggleSignupPopup}
            errors={this.state.errors}
            authenticationFailed={this.props.authenticationFailed}
          />
        ) : null}

        {this.props.showPopupSignup ? (
          <Signup
            inputChangeHandler={this.inputChangeHandler}
            signupHandler={this.signupHandler}
            closePopupLogin={this.closePopup}
            loginPopup={this.toggleLoginPopup}
            errors={this.state.errors}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.account.userLoggedIn,
    loggedInUserId: state.account.loggedInUserId,
    loggedInUserEmail: state.account.loggedInUserEmail,
    showPopupLogin: state.account.showPopupLogin,
    showPopupSignup: state.account.showPopupSignup,
    authenticationFailed: state.account.authenticationFailed
  };
};

export default connect(
  mapStateToProps,
  { signUpAppUser, authenticateUser, logout, togglePopup, closePopup }
)(Header);
