import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addToCart,
  removeItem,
  addLikeByItemId,
  addDislikeByItemId
} from "../../actions";
import ItemColor from "./ItemColor";
import ItemSize from "./ItemSize";

class Item extends Component {
  state = {
    addedToCart: false,
    selectedSizeId: "",
    selectedSizeName: "",
    selectedColorId: "",
    selectedColorName: ""
  };
  // componentDidMount() {
  //   console.log(">>> ComponentDidMount");
  //   const item_id = this.props.product.item_id;
  //   this.props.fetchItemSizesAndColorsByItemId(item_id);
  // }

  addToCartHandler = (event, item) => {
    event.preventDefault();
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

  removeFromCartHandler = (event, item) => {
    event.preventDefault();
    this.setState({ addedToCart: false });
    this.props.removeItem(item);
  };

  sizeSelectionHandler = (size_id, size_name) => {
    this.setState({ selectedSizeId: size_id, selectedSizeName: size_name });
  };

  colorSelectionHandler = (color_id, color_name) => {
    this.setState({ selectedColorId: color_id, selectedColorName: color_name });
  };

  resetItemForOtherSelection = (event, item) => {
    event.preventDefault();
    console.log(item);
  };

  addLikeHandler = event => {
    event.preventDefault();
    this.props.addLikeByItemId(this.props.product.item_id);
  };
  addDislikeHandler = event => {
    event.preventDefault();
    this.props.addDislikeByItemId(this.props.product.item_id);
  };
  render() {
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
          <div
            className="image"
            style={{ maxHeight: "200px", overflow: "hidden" }}
          >
            <img src={this.props.product.picture_url} alt="img" />
          </div>
          <div className="content">
            <div class="ui raised segment">
              <span class="ui red ribbon label">
                {this.props.product.name} / {this.props.product.brand}
              </span>
              <span style={{ float: "right" }}>
                ${this.props.product.price}
              </span>
            </div>
            <div>SIZE</div>
            <div class="ui form">
              <div class="inline fields">
                {this.props.sizeColorLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    {this.props.sizeList &&
                      this.props.sizeList.map(sz => {
                        if (
                          parseInt(sz.item_id) === this.props.product.item_id
                        ) {
                          return (
                            <ItemSize
                              key={sz.size_id}
                              size_name={sz.name}
                              size_id={sz.size_id}
                              sizeSelectionHandler={this.sizeSelectionHandler}
                              item_id={this.props.product.item_id}
                            />
                          );
                        } else {
                          return;
                        }
                      })}
                    {this.props.sizeList.length === 0 && (
                      <div style={{ color: "RED" }}>SOLD OUT</div>
                    )}
                  </div>
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
            {this.props.sizeColorLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                {this.props.colorList &&
                  this.props.colorList.map(clr => {
                    if (parseInt(clr.item_id) === this.props.product.item_id) {
                      return (
                        <ItemColor
                          key={clr.color_id}
                          color_name={clr.name}
                          color_id={clr.color_id}
                          colorSelectionHandler={this.colorSelectionHandler}
                          item_id={this.props.product.item_id}
                        />
                      );
                    }
                  })}
                {this.props.sizeList.length === 0 && (
                  <div style={{ color: "RED" }}>SOLD OUT</div>
                )}
              </div>
            )}
          </div>
          <div className="extra content">
            {this.state.addedToCart ? (
              <div>
                <a
                  href="/"
                  onClick={event =>
                    this.removeFromCartHandler(event, this.props.product)
                  }
                >
                  <i className="cart arrow down icon" />
                  Remove from Cart
                </a>
                {" | "}
                <a
                  href="/"
                  onClick={event =>
                    this.resetItemForOtherSelection(event, this.props.product)
                  }
                >
                  <i className="cart arrow down icon" />
                  Add Other
                </a>
              </div>
            ) : (
              <a
                href="/"
                onClick={event =>
                  this.addToCartHandler(event, this.props.product)
                }
              >
                <i className="cart plus icon" />
                Add to Cart
              </a>
            )}

            <a
              href="/"
              style={{ float: "right" }}
              onClick={this.addDislikeHandler}
            >
              <i className="thumbs down icon" />
              {this.props.product.dislikes}
            </a>
            <a href="/" style={{ float: "right" }}>
              |
            </a>
            <a
              href="/"
              style={{ float: "right" }}
              onClick={this.addLikeHandler}
            >
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
  console.log("SIZE LIST >>> ", state.item.sizeList);
  return {
    colorList: state.item.colorList,
    sizeList: state.item.sizeList,
    sizeColorLoading: state.item.sizeColorLoading
  };
};

export default connect(
  mapStateToProps,
  {
    addToCart,
    removeItem,
    addLikeByItemId,
    addDislikeByItemId
  }
)(Item);
