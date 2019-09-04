import React from "react";

const ItemColor = props => {
  const style =
    "ui big " + props.color_name.toLowerCase() + " empty circular label";

  return (
    <span
      onClick={() =>
        props.colorSelectionHandler(props.color_id, props.color_name)
      }
      class={style}
      style={{ cursor: "pointer" }}
    >
      &nbsp;
    </span>
  );
};

export default ItemColor;
