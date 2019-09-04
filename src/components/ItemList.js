import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item";
import ItemCatagoryDetail from "./ItemCategoryDetail";
import CartQuantity from "./CartQuantity";
import {
  fetchCategoryDetailsAndItemsByCategoryId,
  fetchItemByCategoryTypeId
} from "../actions";

class ItemList extends Component {
  componentDidMount() {
    const cat_id = this.props.match.params.category_id;
    this.props.fetchCategoryDetailsAndItemsByCategoryId(cat_id);
  }
  componentDidUpdate(nextProps) {
    if (nextProps.match.params.type_id !== this.props.match.params.type_id) {
      this.props.fetchItemByCategoryTypeId(
        this.props.match.params.category_id,
        this.props.match.params.type_id
      );
    }
  }

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
              fontSize: "30px"
            }}
          >
            {this.props.location.state.selectedCategory}
            <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
              's items
            </span>
          </div>
          <div style={{ float: "right" }}>
            <CartQuantity />
          </div>
        </div>
        <div
          style={{
            float: "left",
            width: "20%",
            display: "inline-block",
            verticalAlign: "top"
          }}
        >
          <ItemCatagoryDetail
            selectedCategory={this.props.location.state.selectedCategory}
            totalSize={this.props.products.length}
            category_id={this.props.match.params.category_id}
            category_name={this.props.location.state.selectedCategory}
            type_id={this.props.match.params.type_id}
          />
        </div>
        <div
          style={{
            float: "right",
            width: "80%",
            display: "inline-block",
            verticalAlign: "top"
          }}
        >
          {this.props.products &&
            this.props.products.map(product => {
              return (
                <Item
                  key={product.id}
                  addToCart={this.props.addToCart}
                  product={product}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    colorsList: state.colorList,
    selectedCategory: state.selectedCategory
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCategoryDetailsAndItemsByCategoryId,
    fetchItemByCategoryTypeId
  }
)(ItemList);
