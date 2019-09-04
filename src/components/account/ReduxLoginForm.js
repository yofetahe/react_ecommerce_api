import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

import classes from "./account.module.css";

class Login extends Component {
  renderError(meta) {
    if (meta.touched && meta.error) {
      return (
        <div className="ui error message">
          <div className="header">{meta.error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, meta, label, icon }) => {
    console.log(input);
    const t = { ...input };
    console.log(t);
    const fieldStyle = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={fieldStyle}>
        {/* <div className="ui left icon input"> */}
        <input {...input} autoComplete="off" placeholder={label} />
        <i className={icon}></i>
        {this.renderError(meta)}
        {/* </div> */}
      </div>
    );
  };

  onSubmit(formValues) {
    console.log("OnSubmit >>> ", formValues);
  }

  render() {
    console.log(this.props.handleSubmit);
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
                <form
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                  className="ui form error"
                >
                  <Field
                    name="email"
                    component={this.renderInput}
                    icon="envelope icon"
                    label="Email"
                  />
                  <Field
                    name="password"
                    component={this.renderInput}
                    icon="lock icon"
                    label="Password"
                  />
                  <button className="ui button primary">Submit</button>
                </form>
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

const validate = formValues => {
  console.log(">>>>> ", formValues);
  const errors = {};
  if (!formValues.email) {
    errors.email = "Please put your email";
  }
  if (!formValues.password) {
    errors.password = "Please insert your password";
  }
  return errors;
};

export default reduxForm({
  form: "Login",
  validate: validate
})(Login);
