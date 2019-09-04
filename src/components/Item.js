import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchItemSizesAndColorsByItemId,
  addToCart,
  removeItem
} from "../actions";
import ItemColor from "./ItemColor";
import ItemSize from "./ItemSize";

class Item extends Component {
  state = {
    // colorList: [],
    // sizeList: [],
    addedToCart: false,
    selectedSizeId: "",
    selectedSizeName: "",
    selectedColorId: "",
    selectedColorName: ""
  };
  componentDidMount() {
    const item_id = this.props.product.item_id;
    this.props.fetchItemSizesAndColorsByItemId(item_id);
  }

  addToCartHandler = item => {
    if (this.state.selectedSizeId === "") {
      alert("Please select your size");
      return;
    }
    if (this.state.selectedColorId === "") {
      alert("Please select your color preference");
      return;
    }
    this.setState({ addedToCart: true });
    this.props.addToCart(
      item,
      this.state.selectedColorId,
      this.state.selectedColorName,
      this.state.selectedSizeId,
      this.state.selectedSizeName
    );
  };

  removeFromCartHandler = item => {
    this.setState({ addedToCart: false });
    this.props.removeItem(item);
  };

  sizeSelectionHandler = (size_id, size_name) => {
    this.setState({ selectedSizeId: size_id, selectedSizeName: size_name });
  };

  colorSelectionHandler = (color_id, color_name) => {
    this.setState({ selectedColorId: color_id, selectedColorName: color_name });
  };

  resetItemForOtherSelection = item => {
    console.log(item);
  };

  render() {
    {
      var colors = null;
      for (let color of this.props.colorList) {
        if (color[0] && color[0]["item_id"] === this.props.product.item_id) {
          colors = color;
          break;
        }
      }

      var sizes = null;
      for (let size of this.props.sizeList) {
        if (size[0] && size[0]["item_id"] === this.props.product.item_id) {
          sizes = size;
          break;
        }
      }
    }
    const selectedColorStyle =
      "ui small " + this.state.selectedColorName.toLowerCase() + " empty label";
    return (
      <div
        style={{
          display: "inline-block",
          verticalAlign: "top",
          marginRight: "10px",
          marginBottom: "10px"
        }}
      >
        <div className="ui card">
          <div className="image">
            <img
              src={this.props.product.picture_url}
              alt="img"
              style={{ width: "150px", height: "auto" }}
            />
          </div>
          <div className="content">
            <div class="content">
              {this.props.product.brand}
              <div class="sub header">{this.props.product.name}</div>
            </div>
            <div class="ui raised segment">
              <span class="ui red ribbon label">Price</span>
              <span>{this.props.product.price}</span>
            </div>
            <div>SIZE</div>
            <div class="ui form">
              <div class="inline fields">
                {sizes ? (
                  sizes.map(size => {
                    return (
                      <ItemSize
                        sizeSelectionHandler={this.sizeSelectionHandler}
                        key={size.size_id}
                        size_name={size.name}
                        size_id={size.size_id}
                        item_id={this.props.product.item_id}
                      />
                    );
                  })
                ) : (
                  <div style={{ color: "RED" }}>SOLD OUT</div>
                )}
              </div>
            </div>
            <div>
              COLOR{" "}
              {this.state.selectedColorName.length > 0 ? (
                <span
                  className={selectedColorStyle}
                  style={{ color: this.state.selectedColorName }}
                >
                  Your Color
                </span>
              ) : (
                ""
              )}
            </div>
            <div>
              {colors ? (
                colors.map(clr => {
                  return (
                    <ItemColor
                      key={clr.color_id}
                      color_name={clr.name}
                      color_id={clr.color_id}
                      colorSelectionHandler={this.colorSelectionHandler}
                      item_id={this.props.product.item_id}
                    />
                  );
                })
              ) : (
                <div style={{ color: "RED" }}>SOLD OUT</div>
              )}
            </div>
          </div>
          <div className="extra content">
            {this.state.addedToCart ? (
              <div>
                <a
                  onClick={() => this.removeFromCartHandler(this.props.product)}
                >
                  <i className="cart arrow down icon" />
                  Remove from Cart
                </a>
                {" | "}
                <a
                  onClick={() =>
                    this.resetItemForOtherSelection(this.props.product)
                  }
                >
                  <i className="cart arrow down icon" />
                  Add Other
                </a>
              </div>
            ) : (
              <a onClick={() => this.addToCartHandler(this.props.product)}>
                <i className="cart plus icon" />
                Add to Cart
              </a>
            )}

            <a href="/" style={{ float: "right" }}>
              <i className="thumbs down icon" />
              {this.props.product.dislikes}
            </a>
            <a href="/" style={{ float: "right" }}>
              |
            </a>
            <a href="/" style={{ float: "right" }}>
              <i className="thumbs up icon" />
              {this.props.product.likes}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    colorList: state.colorList,
    sizeList: state.sizeList
  };
};

export default connect(
  mapStateToProps,
  {
    fetchItemSizesAndColorsByItemId,
    addToCart,
    removeItem
  }
)(Item);
