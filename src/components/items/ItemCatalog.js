import React, { Component } from "react";
import { connect } from "react-redux";
import ItemCategory from "./ItemCategory";
import { addToCart, fetchCategories } from "../../actions";
import classes from "./item.module.css";
import CartQuantity from "../cart/CartQuantity";

class ItemCatalog extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div>
        <div className={classes.acc_info_header}>
          <div className={classes.acc_info_title}>...</div>
          <div style={{ float: "right" }}>
            <CartQuantity />
          </div>
        </div>
        <div style={{ marginBottom: "50px", textAlign: "center" }}>
          {this.props.ItemCatagories &&
            this.props.ItemCatagories.map((cat, index) => {
              return <ItemCategory key={index} category={cat} />;
            })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.item.products,
    selectedProducts: state.item.selectedProducts,
    ItemCatagories: state.item.ItemCatagories
  };
};

export default connect(
  mapStateToProps,
  { addToCart, fetchCategories }
)(ItemCatalog);
