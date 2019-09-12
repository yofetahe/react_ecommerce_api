import React, { Component } from "react";
import Months from "../utils/Months";

class BillingForm extends Component {
  render() {
    return (
      <div>
        <h4 class="ui dividing header">Billing Information</h4>
        <div class="field">
          <label>Card Holder Name</label>
          <input
            type="text"
            name="card_holder_name"
            placeholder="Card Holder Name"
            onChange={event =>
              this.props.inputChangeHandler(
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
                  this.props.inputChangeHandler(
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
                  this.props.inputChangeHandler(
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
                  this.props.inputChangeHandler(
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
                  this.props.inputChangeHandler(
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
                this.props.inputChangeHandler(
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
                this.props.inputChangeHandler(event, "cvc", "billingInfo")
              }
            />
          </div>
          <div class="six wide field">
            <label>Expiration</label>
            <div class="two fields">
              <div class="field">
                <Months inputChangeHandler={this.props.inputChangeHandler} />
              </div>
              <div class="field">
                <input
                  type="text"
                  name="expire_year"
                  maxlength="4"
                  placeholder="Year"
                  onChange={event =>
                    this.props.inputChangeHandler(
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
      </div>
    );
  }
}

export default BillingForm;
