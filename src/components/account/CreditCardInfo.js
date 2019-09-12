import React, { Component } from "react";

class CreditCardInfo extends Component {
  render() {
    return (
      <div class="ui info message">
        <div class="header" style={{ display: "inline-block", width: "80%" }}>
          Credit Card Information
        </div>
        <i
          class="plus square icon"
          style={{ display: "inline-block", width: "19%", cursor: "pointer" }}
        >
          {" "}
          Add Account
        </i>
        <div class="ui divider"></div>
        {this.props.creditCardInfo &&
          this.props.creditCardInfo.map(info => {
            return (
              <div>
                <div style={{ display: "inline-block", width: "80%" }}>
                  {info.card_type} Card - # **** **** ****{" "}
                  {info.card_last_four_digit}
                  <p>
                    {info.billingShippingAddress.address}
                    {", "}
                    {info.billingShippingAddress.state}
                    {", "}
                    {info.billingShippingAddress.country}{" "}
                    {info.billingShippingAddress.zip_code}
                  </p>
                </div>
                <div style={{ display: "inline-block", width: "19.5%" }}>
                  <button class="mini ui basic button">
                    <i class="edit icon"></i>
                    Edit
                  </button>
                  <button class="mini ui basic button">
                    <i class="trash icon"></i>
                    Delete
                  </button>
                </div>
                <div class="ui divider"></div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default CreditCardInfo;
