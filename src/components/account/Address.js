import React, { Component } from "react";

class Address extends Component {
  render() {
    return (
      <div class="ui info message">
        <div class="header">Billing Address</div>
        <div class="ui divider"></div>
        {this.props.billingAddress &&
          this.props.billingAddress.map(info => {
            return (
              <div>
                <div>{info.address}</div>
                <div>
                  {info.state}, {info.country}
                </div>
                <div>{info.zip_code}</div>
              </div>
            );
          })}
        <div class="ui divider"></div>
        <div>
          <button class="mini ui basic button">
            <i class="edit icon"></i>
            Edit
          </button>
          <button class="mini ui basic button">
            <i class="trash icon"></i>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Address;
