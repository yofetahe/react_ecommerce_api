import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CartQuantity extends Component {
  render() {
    return (
      <div className="right menu">
        <div style={{ display: "inline-block" }}>
          <Link to="/" class="ui label">
            <div class="ui label">
              <i class="home icon">&nbsp;</i> HOME
            </div>
          </Link>
        </div>{" "}
        {this.props.selectedProducts && this.props.selectedProducts.length > 0 && (
          <div style={{ display: "inline-block" }}>
            <Link to="/cart" class="ui label">
              <div class="ui label">
                <i class="shopping cart icon">&nbsp;</i>{" "}
                {this.props.selectedProducts.length}
              </div>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedProducts: state.cart.selectedProducts
  };
};

export default connect(mapStateToProps)(CartQuantity);
