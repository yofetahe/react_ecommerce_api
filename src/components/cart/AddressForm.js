import React, { Component } from "react";
import States from "../utils/States";

class AddressForm extends Component {
  render() {
    return (
      <div>
        <h4 class="ui dividing header">{this.props.formTitle}</h4>
        <div class="field">
          <label>Name</label>
          <div class="two fields">
            <div class="field">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={event =>
                  this.props.inputChangeHandler(
                    event,
                    "first_name",
                    this.props.formType
                  )
                }
              />
            </div>
            <div class="field">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={event =>
                  this.props.inputChangeHandler(
                    event,
                    "last_name",
                    this.props.formType
                  )
                }
              />
            </div>
          </div>
        </div>
        <div class="field">
          <div class="field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={event =>
                this.props.inputChangeHandler(
                  event,
                  "email",
                  this.props.formType
                )
              }
            />
          </div>
        </div>
        <div class="field">
          <label>Shipping Address</label>
          <div class="fields">
            <div class="twelve wide field">
              <input
                type="text"
                name="shipping_address"
                placeholder="Street Address"
                onChange={event =>
                  this.props.inputChangeHandler(
                    event,
                    "shipping_address",
                    this.props.formType
                  )
                }
              />
            </div>
            <div class="four wide field">
              <input
                type="text"
                name="zip_code"
                placeholder="Zip Code"
                onChange={event =>
                  this.props.inputChangeHandler(
                    event,
                    "zip_code",
                    this.props.formType
                  )
                }
              />
            </div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>State</label>
            <States inputChangeHandler={this.props.inputChangeHandler} />
          </div>
          <div class="field">
            <label>Country</label>
            <input type="text" name="country" value="USA" readonly="" />
          </div>
        </div>
      </div>
    );
  }
}

export default AddressForm;
