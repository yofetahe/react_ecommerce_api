import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  togglePopup,
  submitOrder,
  getLoggedInUserAcctInfo,
  submitActiveUserOrder
} from "../../actions";

import AddressForm from "./AddressForm";
import BillingForm from "./BillingForm";
import CartPaymentForLoggedInUser from "./CartPaymentForLoggedInUser";

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
    },
    billingAddress: {
      first_name: "",
      last_name: "",
      email: "",
      shipping_address: "",
      zip_code: "",
      state: "",
      country: "USA"
    },
    billingAndShippingAddressNotSame: false,
    selectedCardInfo: ""
  };

  componentDidMount() {
    if (sessionStorage.getItem("loggedInUserId")) {
      this.props.getLoggedInUserAcctInfo(
        sessionStorage.getItem("loggedInUserId")
      );
    }
  }

  inputChangeHandler = (event, key, category) => {
    if (category === "shippingAddress") {
      const shippingAddress = { ...this.state.shippingAddress };
      shippingAddress[key] = event.target.value;
      this.setState({ shippingAddress });
    }
    if (category === "billingAddress") {
      const billingAddress = { ...this.state.billingAddress };
      billingAddress[key] = event.target.value;
      this.setState({ billingAddress });
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
    this.props.submitOrder(
      this.props.selectedProducts,
      this.state.shippingAddress,
      this.state.billingInfo,
      this.state.billingAddress
    );
  };
  submitActiveUserOrderHandler = event => {
    event.preventDefault();
    console.log("SELECTED ITEMS >>>", this.props.selectedProducts);
    console.log("CARD INFO >>> ", this.state.selectedCardInfo);
    console.log("SHIPPING ADDRESS >>> ", this.state.shippingAddress);

    this.props.submitActiveUserOrder(
      this.props.selectedProducts,
      this.state.shippingAddress,
      this.state.selectedCardInfo,
      sessionStorage.getItem("loggedInUserId")
    );
  };
  displayBillingAddressForm = () => {
    const billingAndShippingAddressNotSame = !this.state
      .billingAndShippingAddressNotSame;
    this.setState({
      billingAndShippingAddressNotSame
    });
  };

  cardSelectionHandler = card => {
    console.log(card);
    this.setState({ selectedCardInfo: card });
  };
  render() {
    return (
      <div>
        <div
          style={{
            marginBottom: "25px",
            height: "25px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "15px"
          }}
        >
          <div style={{ float: "left", fontWeight: "bold", fontSize: "20px" }}>
            Payment Information
          </div>
          <div style={{ float: "right" }}>
            <div className="right menu">
              <div style={{ display: "inline-block" }}>
                <Link to="/" class="ui label">
                  <div className="ui label">
                    <i className="home icon">&nbsp;</i> BACK
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {this.props.purchaseInProcess ? (
          <div style={{ width: "50%", marginBottom: "40px" }}>
            <div className="ui info message">
              <p>
                <span style={{ fontWeight: "bold" }}>Transaction Amount</span> :
                ${this.props.totalPrice}
              </p>
            </div>
            <div>
              {sessionStorage.getItem("loggedInUserId") ? (
                <form className="ui form">
                  <CartPaymentForLoggedInUser
                    billing_data={this.state.billingAddress}
                    inputChangeHandler={this.inputChangeHandler}
                    creditCardInfo={this.props.creditCardInfo}
                    billingAddress={this.props.billingAddress}
                    billingAndShippingAddressNotSame={
                      this.state.billingAndShippingAddressNotSame
                    }
                    displayBillingAddressForm={this.displayBillingAddressForm}
                    cardSelectionHandler={this.cardSelectionHandler}
                  />
                  <div
                    className="ui button"
                    onClick={this.submitActiveUserOrderHandler}
                  >
                    Submit Order
                  </div>
                </form>
              ) : (
                <div>
                  <div
                    className="ui button"
                    onClick={this.loginSignupSumbitOrder}
                  >
                    Login and Submit Your Order
                  </div>
                  <div className="ui divider"></div>
                  <form className="ui form">
                    <AddressForm
                      data={this.state.shippingAddress}
                      formType="shippingAddress"
                      formTitle="Shipping Address"
                      inputChangeHandler={this.inputChangeHandler}
                    />

                    <BillingForm inputChangeHandler={this.inputChangeHandler} />

                    <div className="ui segment">
                      <div className="field">
                        <div className="ui toggle checked checkbox">
                          <input
                            type="checkbox"
                            name="gift"
                            onClick={this.displayBillingAddressForm}
                          />
                          <label>
                            Billing address is not the same billing address
                            shipping address
                          </label>
                        </div>
                      </div>
                    </div>
                    {this.state.billingAndShippingAddressNotSame && (
                      <AddressForm
                        data={this.state.billingAddress}
                        formType="billingAddress"
                        formTitle="Billing Address"
                        inputChangeHandler={this.inputChangeHandler}
                      />
                    )}

                    {/* <h4 class="ui dividing header">Receipt</h4>
                    <div class="ui segment">
                      <div class="field">
                        <div class="ui toggle checkbox">
                          <input type="checkbox" name="gift" />
                          <label>Do not include a receipt in the package</label>
                        </div>
                      </div>
                    </div> */}
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
    selectedProducts: state.cart.selectedProducts,
    totalPrice: state.cart.totalPrice,
    showPopupLogin: state.account.showPopupLogin,
    showPopupSignup: state.account.showPopupSignup,
    loggedInUserId: state.account.loggedInUserId,
    purchaseInProcess: state.cart.purchaseInProcess,
    creditCardInfo: state.account.creditCardInfo,
    billingAddress: state.account.billingAddress
  };
};

export default connect(
  mapStateToProps,
  { togglePopup, submitOrder, getLoggedInUserAcctInfo, submitActiveUserOrder }
)(CartPayment);
