import React, { Component } from "react";
import { connect } from "react-redux";
import { togglePopup, submitOrder } from "../actions";
import States from "./utils/States";
import Months from "./utils/Months";

class CartPayment extends Component {
  state = {
    shippingAddress: {
      first_name: "",
      last_name: "",
      email: "",
      shipping_address: "",
      zip_code: "",
      state: "",
      country: "USA"
    },
    billingInfo: {
      card_holder_name: "",
      card_type: "",
      card_number: "",
      cvc: "",
      expire_month: "",
      expire_year: ""
    }
  };

  inputChangeHandler = (event, key, category) => {
    if (category === "shippingAddress") {
      const shippingAddress = { ...this.state.shippingAddress };
      shippingAddress[key] = event.target.value;
      this.setState({ shippingAddress });
    }
    if (category === "billingInfo") {
      const billingInfo = { ...this.state.billingInfo };
      billingInfo[key] = event.target.value;
      this.setState({ billingInfo });
    }
  };

  loginSignupSumbitOrder = () => {
    this.props.togglePopup("POPUP_LOGIN", !this.props.showPopupLogin);
  };

  submitOrderHandler = event => {
    event.preventDefault();
    console.log(this.props.selectedProducts);
    console.log(this.state);
    this.props.submitOrder(
      this.props.selectedProducts,
      this.state.shippingAddress,
      this.state.billingInfo
    );
  };
  render() {
    return (
      <div>
        {this.props.purchaseInProcess ? (
          <div style={{ width: "50%", marginBottom: "40px" }}>
            <div class="ui info message">
              <div class="header">Payment Information</div>
              <div class="ui divider"></div>
              <p>Transaction Amount: ${this.props.totalPrice}</p>
            </div>
            <div>
              {sessionStorage.getItem("loggedInUserId") ? (
                <div>Logged-In Customer Payment Information</div>
              ) : (
                <div>
                  <div class="ui button" onClick={this.loginSignupSumbitOrder}>
                    Login and Submit Your Order
                  </div>
                  <div class="ui divider"></div>
                  <form class="ui form" onSubmit={this.submitOrderHandler}>
                    <h4 class="ui dividing header">Shipping Information</h4>
                    <div class="field">
                      <label>Name</label>
                      <div class="two fields">
                        <div class="field">
                          <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            onChange={event =>
                              this.inputChangeHandler(
                                event,
                                "first_name",
                                "shippingAddress"
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
                              this.inputChangeHandler(
                                event,
                                "last_name",
                                "shippingAddress"
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
                            this.inputChangeHandler(
                              event,
                              "email",
                              "shippingAddress"
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
                              this.inputChangeHandler(
                                event,
                                "shipping_address",
                                "shippingAddress"
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
                              this.inputChangeHandler(
                                event,
                                "zip_code",
                                "shippingAddress"
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div class="two fields">
                      <div class="field">
                        <label>State</label>
                        <States inputChangeHandler={this.inputChangeHandler} />
                      </div>
                      <div class="field">
                        <label>Country</label>
                        <input
                          type="text"
                          name="country"
                          value="USA"
                          readonly=""
                        />
                      </div>
                    </div>
                    <h4 class="ui dividing header">Billing Information</h4>
                    <div class="field">
                      <label>Card Holder Name</label>
                      <input
                        type="text"
                        name="card_holder_name"
                        placeholder="Card Holder Name"
                        onChange={event =>
                          this.inputChangeHandler(
                            event,
                            "card_holder_name",
                            "billingInfo"
                          )
                        }
                      />
                    </div>
                    <div class="inline fields">
                      <div class="field">
                        <div class="ui radio checkbox">
                          <input
                            type="radio"
                            name="card"
                            value="VISA"
                            onChange={event =>
                              this.inputChangeHandler(
                                event,
                                "card_type",
                                "billingInfo"
                              )
                            }
                          />
                          <label>
                            <img
                              alt="VISA"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png"
                              style={{ width: "50px" }}
                            />
                          </label>
                        </div>
                      </div>
                      <div class="field">
                        <div class="ui radio checkbox">
                          <input
                            type="radio"
                            name="card"
                            value="MASTER"
                            onChange={event =>
                              this.inputChangeHandler(
                                event,
                                "card_type",
                                "billingInfo"
                              )
                            }
                          />
                          <label>
                            <img
                              alt="MASTERCARD"
                              src="http://www.pngall.com/wp-content/uploads/2016/07/Mastercard-Download-PNG.png"
                              style={{ width: "50px" }}
                            />
                          </label>
                        </div>
                      </div>
                      <div class="field">
                        <div class="ui radio checkbox">
                          <input
                            type="radio"
                            name="card"
                            value="DISCOVER"
                            onChange={event =>
                              this.inputChangeHandler(
                                event,
                                "card_type",
                                "billingInfo"
                              )
                            }
                          />
                          <label>
                            <img
                              alt="DISCOVER"
                              src="https://www.cardinalcommerce.com/-/media/images/hubpages/acceptingdiscover.ashx?h=233&w=350&la=en&hash=AC617583EE9C365DFD596DDE6185BC964E11C41B"
                              style={{ width: "50px" }}
                            />
                          </label>
                        </div>
                      </div>
                      <div class="field">
                        <div class="ui radio checkbox">
                          <input
                            type="radio"
                            name="card"
                            value="AMERICAN_EXPRESS"
                            onChange={event =>
                              this.inputChangeHandler(
                                event,
                                "card_type",
                                "billingInfo"
                              )
                            }
                          />
                          <label>
                            <img
                              alt="AMERICANEXPRESS"
                              src="https://www.thebalance.com/thmb/T3cJJhgegt7rCXlpZjR285xu0EQ=/400x0/AmericanExpressMagnet-5ba94ea646e0fb0050f3728c.jpg"
                              style={{ width: "50px" }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="fields">
                      <div class="seven wide field">
                        <label>Card Number</label>
                        <input
                          type="text"
                          name="card_number"
                          maxlength="16"
                          placeholder="Card #"
                          onChange={event =>
                            this.inputChangeHandler(
                              event,
                              "card_number",
                              "billingInfo"
                            )
                          }
                        />
                      </div>
                      <div class="three wide field">
                        <label>CVC</label>
                        <input
                          type="text"
                          name="cvc"
                          maxlength="3"
                          placeholder="CVC"
                          onChange={event =>
                            this.inputChangeHandler(event, "cvc", "billingInfo")
                          }
                        />
                      </div>
                      <div class="six wide field">
                        <label>Expiration</label>
                        <div class="two fields">
                          <div class="field">
                            <Months
                              inputChangeHandler={this.inputChangeHandler}
                            />
                          </div>
                          <div class="field">
                            <input
                              type="text"
                              name="expire_year"
                              maxlength="4"
                              placeholder="Year"
                              onChange={event =>
                                this.inputChangeHandler(
                                  event,
                                  "expire_year",
                                  "billingInfo"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="ui segment">
                      <div class="field">
                        <div class="ui toggle checked checkbox">
                          <input type="checkbox" name="gift" />
                          <label>
                            Shipping and billing address is not the same
                          </label>
                        </div>
                      </div>
                    </div>
                    <h4 class="ui dividing header">Receipt</h4>
                    <div class="ui segment">
                      <div class="field">
                        <div class="ui toggle checkbox">
                          <input type="checkbox" name="gift" />
                          <label>Do not include a receipt in the package</label>
                        </div>
                      </div>
                    </div>
                    <div class="ui button" onClick={this.submitOrderHandler}>
                      Submit Order
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>Thank you. Your purchase will deliver to the address given.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedProducts: state.selectedProducts,
    totalPrice: state.totalPrice,
    showPopupLogin: state.showPopupLogin,
    showPopupSignup: state.showPopupSignup,
    loggedInUserId: state.loggedInUserId,
    purchaseInProcess: state.purchaseInProcess
  };
};

export default connect(
  mapStateToProps,
  { togglePopup, submitOrder }
)(CartPayment);
