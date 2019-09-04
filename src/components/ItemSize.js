import React from "react";

const ItemSize = props => {
  return (
    <div class="field">
      <div class="ui radio checkbox">
        <input
          type="radio"
          name={props.item_id}
          onClick={() =>
            props.sizeSelectionHandler(props.size_id, props.size_name)
          }
        />
        <label>{props.size_name}</label>
      </div>
    </div>
  );
};

export default ItemSize;
