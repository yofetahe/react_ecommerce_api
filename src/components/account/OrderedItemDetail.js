import React, { Component } from "react";

class OrderedItemDetail extends Component {
  render() {
    return (
      <tr>
        <td>
          <img
            src={this.props.item.picture_url}
            alt="test"
            style={{ width: "50px" }}
          />
        </td>
        <td>
          {this.props.item.item_name} / {this.props.item.brand}
        </td>
        <td>{this.props.item.size} </td>
        <td>{this.props.item.color} </td>
        <td>{this.props.item.item_quantity} </td>
        <td>{this.props.item.unit_price} </td>
        <td>{this.props.item.unit_price * this.props.item.item_quantity} </td>
        <td>{this.props.item.order_status}</td>
        <td>{this.props.item.order_date}</td>
        <td>
          <i
            class="trash icon"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => this.props.cancelOrderHandler(this.props.item)}
          ></i>
        </td>
      </tr>
    );
  }
}

export default OrderedItemDetail;
