import React, { Component } from "react";

import classes from "./account.module.css";

class Signup extends Component {
  render() {
    return (
      <div className={classes.popup}>
        <div className={classes.popup_inner_signup}>
          <br />
          <span
            onClick={this.props.closePopupLogin}
            className={classes.close_popup}
          >
            <span className="ui label">
              <i className="close icon" style={{ color: "red" }}>
                &nbsp;
              </i>
            </span>
          </span>
          <div className="ui placeholder segment">
            <div className="ui two column very relaxed stackable grid">
              <div className="column">
                <div className="ui form">
                  <div
                    className={`field ${
                      this.props.errors.first_name ? "error" : ""
                    }`}
                  >
                    <div className="ui left icon input">
                      <input
                        type="text"
                        placeholder="First Name"
                        onChange={event =>
                          this.props.inputChangeHandler(event, "first_name")
                        }
                      />
                      <i className="user icon"></i>
                    </div>
                  </div>
                  <div
                    className={`field ${
                      this.props.errors.last_name ? "error" : ""
                    }`}
                  >
                    <div className="ui left icon input">
                      <input
                        type="text"
                        placeholder="Last Name"
                        onChange={event =>
                          this.props.inputChangeHandler(event, "last_name")
                        }
                      />
                      <i className="user icon"></i>
                    </div>
                  </div>
                  <div
                    className={`field ${
                      this.props.errors.email ? "error" : ""
                    }`}
                  >
                    <div className="ui left icon input">
                      <input
                        type="text"
                        placeholder="Email"
                        onChange={event =>
                          this.props.inputChangeHandler(event, "email")
                        }
                      />
                      <i className="envelope icon"></i>
                    </div>
                  </div>
                  <div
                    className={`field ${
                      this.props.errors.password ? "error" : ""
                    }`}
                  >
                    <div className="ui left icon input">
                      <input
                        type="password"
                        placeholder="Password"
                        onChange={event =>
                          this.props.inputChangeHandler(event, "password")
                        }
                      />
                      <i className="lock icon"></i>
                    </div>
                  </div>
                  <div
                    className={`field ${
                      this.props.errors.confirm_password ? "error" : ""
                    }`}
                  >
                    <div className="ui left icon input">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={event =>
                          this.props.inputChangeHandler(
                            event,
                            "confirm_password"
                          )
                        }
                      />
                      <i className="lock icon"></i>
                    </div>
                  </div>
                  <div
                    className="ui blue submit button"
                    onClick={this.props.signupHandler}
                  >
                    Sign up
                  </div>
                </div>
              </div>
              <div className="middle aligned column">
                <div style={{ textAlign: "center", width: "100%" }}>
                  Already have an account?
                </div>
                <div className="ui big button" onClick={this.props.loginPopup}>
                  <i className="signup icon"></i>
                  Login
                </div>
              </div>
            </div>
            <div className="ui vertical divider">Or</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
