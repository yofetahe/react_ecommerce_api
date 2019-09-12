import React, { Component } from "react";
import { connect } from "react-redux";
import { getSavedItemsList, deleteSavedItem } from "../../actions";
import Item from "../items/Item";
import CartQuantity from "../cart/CartQuantity";

class SavedItemsList extends Component {
  componentDidMount() {
    this.props.getSavedItemsList(sessionStorage.getItem("loggedInUserId"));
  }
  deleteSavedItemHandler = item_size_color_id => {
    const user_id = sessionStorage.getItem("loggedInUserId");
    this.props.deleteSavedItem(item_size_color_id, user_id);
  };
  render() {
    return (
      <div>
        <div
          style={{
            marginBottom: "25px",
            height: "25px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "15px"
          }}
        >
          <div
            style={{
              float: "left",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            Saved Item List
          </div>
          <div style={{ float: "right" }}>
            <CartQuantity />
          </div>
        </div>
        <div>
          {this.props.savedItemsList &&
            this.props.savedItemsList.map(product => {
              return (
                <div
                  style={{
                    display: "inline-block",
                    width: "30%"
                  }}
                >
                  <span
                    class="ui label"
                    style={{ color: "RED" }}
                    onClick={() =>
                      this.deleteSavedItemHandler(product.item_size_color_id)
                    }
                  >
                    Delete
                    <i class="delete icon"></i>
                  </span>
                  <div>
                    <Item
                      key={product.item_id}
                      addToCart={this.props.addToCart}
                      product={product}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    savedItemsList: state.account.savedItemsList
  };
};

export default connect(
  mapStateToProps,
  { getSavedItemsList, deleteSavedItem }
)(SavedItemsList);
