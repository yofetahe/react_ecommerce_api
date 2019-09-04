import React, { Component } from "react";

import classes from "./account.module.css";

class Login extends Component {
  render() {
    const emailFieldStyle = `field ${this.props.errors.email ? "error" : ""}`;
    const passwordFieldStyle = `field ${
      this.props.errors.password ? "error" : ""
    }`;
    return (
      <div className={classes.popup}>
        <div className={classes.popup_inner_login}>
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
                {this.props.authenticationFailed && (
                  <div class="ui pointing below red basic label">
                    {this.props.authenticationFailed}
                  </div>
                )}
                <div className="ui form">
                  <div className={emailFieldStyle}>
                    <div className="ui left icon input">
                      <input
                        type="email"
                        placeholder="Email"
                        onChange={event =>
                          this.props.inputChangeHandler(event, "email")
                        }
                      />
                      <i className="envelope icon"></i>
                    </div>
                  </div>
                  <div className={passwordFieldStyle}>
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
                    className="ui blue submit button"
                    onClick={this.props.loginHandler}
                  >
                    Login
                  </div>
                </div>
              </div>
              <div className="middle aligned column">
                <div className="ui big button" onClick={this.props.signupPopup}>
                  <i className="signup icon"></i>
                  Sign Up
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

export default Login;
