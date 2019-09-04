import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ItemCategory = props => {
  return (
    <div className="card">
      <div className="image">
        <img src={props.category.picture_url} alt="test" />
      </div>
      <div className="extra">
        <Link
          to={{
            pathname: `/Items/${props.category.category_id}`,
            state: {
              selectedCategory: props.category.name
            }
          }}
        >
          {props.category.name}
        </Link>
        <div className="ui star rating" data-rating="4" />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ItemCatagories: state.ItemCatagories
  };
};

export default connect(mapStateToProps)(ItemCategory);
