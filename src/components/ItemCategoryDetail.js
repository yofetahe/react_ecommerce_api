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
      <div className="ui vertical menu">
        <div className="ui dropdown item">
          Price Sort
          <i className="dropdown icon" />
          <div className="menu">
            {/* <a href="#" class="item">
              <i class="edit icon" /> Edit Profile
            </a>
            <a href="#" class="item">
              <i class="globe icon" /> Choose Language
            </a>
            <a href="#" class="item">
              <i class="settings icon" /> Account Settings
            </a> */}
          </div>
        </div>
      </div>
      <div className="ui vertical menu">
        <div className="ui dropdown item">
          Size Sort
          <i className="dropdown icon" />
          <div className="menu">
            {/* <a href="#" class="item">
              <i class="edit icon" /> Edit Profile
            </a>
            <a href="#" class="item">
              <i class="globe icon" /> Choose Language
            </a>
            <a href="#" class="item">
              <i class="settings icon" /> Account Settings
            </a> */}
          </div>
        </div>
      </div>

      <div className="ui vertical menu" style={{ padding: "10px 5px" }}>
        <a href="/" class="ui red empty circular label">
          &nbsp;
        </a>
        {/* <a href="#" class="ui orange empty circular label" />
        <a href="#" class="ui yellow empty circular label" />
        <a href="#" class="ui olive empty circular label" />
        <a href="#" class="ui green empty circular label" />
        <a href="#" class="ui teal empty circular label" />
        <a href="#" class="ui blue empty circular label" />
        <a href="#" class="ui violet empty circular label" />
        <a href="#" class="ui purple empty circular label" />
        <a href="#" class="ui pink empty circular label" />
        <a href="#" class="ui brown empty circular label" />
        <a href="#" class="ui grey empty circular label" />
        <a href="#" class="ui black empty circular label" /> */}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    itemCategoryDetail: state.ItemCatagoryDetail
  };
};

export default connect(mapStateToProps)(ProductMenuItems);
