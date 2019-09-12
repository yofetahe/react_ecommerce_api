import React, { Component } from "react";
import OrderedItemDetail from "./OrderedItemDetail";

class OrderedItems extends Component {
  render() {
    return (
      <div>
        <div class="ui header">Ordered Item List</div>
        <table className="ui single line table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Items</th>
              <th>Size</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orderedItems &&
              this.props.orderedItems.map(item => {
                return (
                  <OrderedItemDetail
                    cancelOrderHandler={this.props.cancelOrderHandler}
                    item={item}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderedItems;
