import React from "react";
import { Link } from "react-router-dom";

const ItemCategory = props => {
  return (
    <div
      className="ui four card"
      style={{
        display: "inline-block",
        margin: "0px 10px 10px 0px",
        verticalAlign: "top"
      }}
    >
      <div className="image" style={{ maxHeight: "250px", overflow: "hidden" }}>
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
      </div>
    </div>
  );
};

export default ItemCategory;
