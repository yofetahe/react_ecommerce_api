import React, { Component } from "react";
import AddressForm from "./AddressForm";

class CartPaymentForLoggedInUser extends Component {
  render() {
    return (
      <div style={{ marginBottom: "15px" }}>
        <div>
          <h4 class="ui dividing header">Billing Information</h4>
          <div class="grouped fields">
            {this.props.creditCardInfo.map(cci => {
              return (
                <div class="field">
                  <div class="ui radio checkbox">
                    <input
                      type="radio"
                      name="cci"
                      onChange={() => this.props.cardSelectionHandler(cci)}
                    />
                    <label>
                      {cci.card_type} Card - # **** **** ****{" "}
                      {cci.card_last_four_digit}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div class="ui segment">
          <div class="field">
            <div class="ui toggle checked checkbox">
              <input
                type="checkbox"
                name="gift"
                onClick={this.props.displayBillingAddressForm}
              />
              <label>Shipping address is not the same billing address</label>
            </div>
          </div>
        </div>

        {this.props.billingAndShippingAddressNotSame && (
          <AddressForm
            billing_data={this.props.billing_data}
            formType="shippingAddress"
            formTitle="Shipping Address"
            inputChangeHandler={this.props.inputChangeHandler}
          />
        )}
      </div>
    );
  }
}

export default CartPaymentForLoggedInUser;
