import React, { Component } from "react";
import { connect } from "react-redux";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import {
  removeItem,
  addCartItemQuantity,
  deductCartItemQuantity,
  saveItemForLaterPurchase,
  togglePopup
} from "../actions/index";

class CartContent extends Component {
  addItemQuantityHandler = item => {
    this.props.addCartItemQuantity(item);
  };
  deductItemQuantityHandler = item => {
    this.props.deductCartItemQuantity(item);
  };
  removeItemHandler = item => {
    this.props.removeItem(item);
  };
  saveItemForLaterPurchaseHandler = item => {
    if (this.props.userLoggedIn) {
      this.props.saveItemForLaterPurchase(item, this.props.loggedInUserId);
    } else {
      this.props.togglePopup("POPUP_LOGIN", !this.props.showPopupLogin);
    }
  };
  paymentProcessHandler = () => {
    console.log("selectedProducts >>>> ", this.props.selectedProducts);
  };

  render() {
    return (
      <div>
        <div className="ui breadcrumb">
          <Link to="/" className="section">
            Home
          </Link>
          <i className="right angle icon divider" />
          <span className="section">Cart</span>
        </div>
        <div className="ui divider" />
        <table className="ui very basic collapsing celled table">
          <thead>
            <tr>
              <th>Items</th>
              <th>Size</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.selectedProducts &&
              this.props.selectedProducts.map(product => {
                return (
                  <CartProduct
                    addItemQuantityHandler={this.addItemQuantityHandler}
                    deductItemQuantityHandler={this.deductItemQuantityHandler}
                    removeItem={this.removeItemHandler}
                    saveItemForLaterPurchaseHandler={
                      this.saveItemForLaterPurchaseHandler
                    }
                    key={product.id}
                    product={product}
                    qtyAddButton={this.props.qtyAddButton}
                    qtyDeductButton={this.props.qtyDeductButton}
                  />
                );
              })}
          </tbody>
          <tr>
            <td colSpan="5" style={{ textAlign: "right" }}>
              Total Price
            </td>
            <td style={{ textAlign: "right" }}>
              <NumberFormat
                value={this.props.totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                renderText={value => <div>{value}</div>}
              />
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
        <Link to="/ProcessPayment">
          <div
            class="ui large label"
            style={{
              backgroundColor: "#0000ff",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Checkout
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedProducts: state.selectedProducts,
    totalPrice: state.totalPrice,
    qtyAddButton: state.quantityAddButton,
    qtyDeductButton: state.quantityDeductButton,
    userLoggedIn: state.userLoggedIn,
    showPopupLogin: state.showPopupLogin,
    showPopupSignup: state.showPopupSignup,
    loggedInUserId: state.loggedInUserId
  };
};

export default connect(
  mapStateToProps,
  {
    removeItem,
    addCartItemQuantity,
    deductCartItemQuantity,
    saveItemForLaterPurchase,
    togglePopup
  }
)(CartContent);
