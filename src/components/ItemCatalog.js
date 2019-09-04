import React, { Component } from "react";
import { connect } from "react-redux";
import ItemCategory from "./ItemCategory";
import { addToCart, fetchCategories } from "../actions";

class ItemCatalog extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="ui four cards">
        {this.props.ItemCatagories &&
          this.props.ItemCatagories.map((cat, index) => {
            return <ItemCategory key={index} category={cat} />;
          })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    selectedProducts: state.selectedProducts,
    ItemCatagories: state.ItemCatagories
  };
};

export default connect(
  mapStateToProps,
  { addToCart, fetchCategories }
)(ItemCatalog);
