import React, { Component } from "react";
import { connect } from "react-redux";
import CartQuantity from "../cart/CartQuantity";
import { getAccountInformation, cancelOrderedItem } from "../../actions";
import CreditCardInfo from "./CreditCardInfo";
import classes from "./account.module.css";
import OrderedItems from "./OrderedItems";

class AccountInformation extends Component {
  componentDidMount() {
    this.props.getAccountInformation(sessionStorage.getItem("loggedInUserId"));
  }
  cancelOrderHandler = item => {
    console.log(item);
    this.props.cancelOrderedItem(
      item,
      sessionStorage.getItem("loggedInUserId")
    );
  };
  render() {
    return (
      <div>
        <div className={classes.acc_info_header}>
          <div className={classes.acc_info_title}>Account Information</div>
          <div style={{ float: "right" }}>
            <CartQuantity />
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          {/* <div class="ui label">
            <i class="home icon">&nbsp;</i> HOME
          </div> */}
          <CreditCardInfo creditCardInfo={this.props.creditCardInfo} />
        </div>
        <div className={classes.acc_info_items}>
          <OrderedItems
            cancelOrderHandler={this.cancelOrderHandler}
            orderedItems={this.props.orderedItems}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    creditCardInfo: state.account.creditCardInfo,
    orderedItems: state.account.orderedItems
  };
};

export default connect(
  mapStateToProps,
  { getAccountInformation, cancelOrderedItem }
)(AccountInformation);
