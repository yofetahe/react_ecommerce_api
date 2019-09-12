import React, { Component } from "react";
import NumberFormat from "react-number-format";

class CartProduct extends Component {
  state = {
    qtyAddButton: true,
    qtyDeductButton: false
  };
  addItemQuantityHandler = item => {
    this.props.addCartItemQuantity(item);
    this.setState({ qtyDeductButton: true });
  };
  deductItemQuantityHandler = item => {
    if (this.props.product.quantity === 2) {
      this.setState({ qtyDeductButton: false });
    }
    this.props.deductCartItemQuantity(item);
  };
  render() {
    return (
      <tr>
        <td>
          <h4 class="ui image header">
            <img
              src={this.props.product.picture_url}
              class="ui mini rounded image"
              alt={this.props.product.description}
            />
            <div class="content">
              {this.props.product.name}
              <div class="sub header">{this.props.product.brand}</div>
            </div>
          </h4>
        </td>
        <td>{this.props.product.size_name}</td>
        <td>{this.props.product.color_name}</td>
        <td>
          {this.state.qtyAddButton && (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.addItemQuantityHandler(this.props.product)}
            >
              <i class="plus square icon" />
            </span>
          )}{" "}
          {this.props.product.quantity}{" "}
          {this.state.qtyDeductButton && (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.deductItemQuantityHandler(this.props.product)}
            >
              <i class="minus square icon" />
            </span>
          )}
        </td>
        <td style={{ textAlign: "right" }}>
          {/* unit price */}
          <NumberFormat
            value={this.props.product.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={value => <div>{value}</div>}
          />
        </td>
        <td style={{ textAlign: "right" }}>
          {/* total price */}
          <NumberFormat
            value={this.props.product.totalPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={value => <div>{value}</div>}
          />
        </td>
        <td style={{ textAlign: "center", color: "blue", cursor: "pointer" }}>
          {/* remove */}
          <i
            onClick={() => this.props.removeItem(this.props.product)}
            className="cut icon"
          />
        </td>
        <td style={{ textAlign: "center", color: "blue", cursor: "pointer" }}>
          {/* save for later */}

          <i
            onClick={() =>
              this.props.saveItemForLaterPurchaseHandler(this.props.product)
            }
            className="save icon"
          />
        </td>
      </tr>
    );
  }
}

export default CartProduct;
