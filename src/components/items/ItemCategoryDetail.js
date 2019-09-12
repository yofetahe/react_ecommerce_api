import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductCatalog from "./ItemCatalog";
import ItemList from "./ItemList";

const ProductMenuItems = props => {
  let styleAll = props.type_id ? "teal item" : "active teal item";
  let tealLeft = props.type_id ? "ui label" : "ui teal left pointing label";

  let cat = props.category_id;
  return (
    <div>
      <div className="ui vertical menu">
        <Link
          to={{
            pathname: `/Items/${props.category_id}`,
            state: {
              selectedCategory: props.category_name
            }
          }}
          component={ItemList}
          className={styleAll}
        >
          All
          <div className={tealLeft}>{props.totalSize}</div>
        </Link>
        {props.itemCategoryDetail &&
          props.itemCategoryDetail.map(itemCatDetail => {
            let detailStyle =
              props.type_id === itemCatDetail.type_id
                ? "active teal item"
                : "teal item";
            let detailTealLeft =
              props.type_id === itemCatDetail.type_id
                ? "ui teal left pointing label"
                : "ui label";
            return (
              <Link
                to={{
                  pathname: `/Items/${cat}/${itemCatDetail.type_id}`,
                  state: {
                    selectedCategory: props.selectedCategory
                  }
                }}
                component={ProductCatalog}
                className={detailStyle}
              >
                {itemCatDetail.name}
                <div className={detailTealLeft}>0</div>
              </Link>
            );
          })}
      </div>

      <div className="ui vertical menu" style={{ padding: "10px 5px" }}>
        Sort By Price
        <div style={{ float: "right" }}>
          <i
            class="arrow alternate circle down outline icon"
            style={{ cursor: "pointer" }}
            onClick={props.sortItemsDescByPrice}
          ></i>
          <i
            class="arrow alternate circle up outline icon"
            style={{ cursor: "pointer" }}
            onClick={props.sortItemsAscByPrice}
          ></i>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    itemCategoryDetail: state.item.ItemCatagoryDetail
  };
};

export default connect(mapStateToProps)(ProductMenuItems);
