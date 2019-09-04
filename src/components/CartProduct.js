import React from "react";
import NumberFormat from "react-number-format";

const CartProduct = props => {
  return (
    <tr>
      <td>
        <h4 class="ui image header">
          <img
            src={props.product.picture_url}
            class="ui mini rounded image"
            alt={props.product.description}
          />
          <div class="content">
            {props.product.name}
            <div class="sub header">{props.product.brand}</div>
          </div>
        </h4>
      </td>
      <td>{props.product.size_name}</td>
      <td>{props.product.color_name}</td>
      <td>
        {props.qtyAddButton && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => props.addItemQuantityHandler(props.product)}
          >
            <i class="plus square icon" />
          </span>
        )}{" "}
        {props.product.quantity}{" "}
        {props.qtyDeductButton && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => props.deductItemQuantityHandler(props.product)}
          >
            <i class="minus square icon" />
          </span>
        )}
      </td>
      <td style={{ textAlign: "right" }}>
        {/* unit price */}
        <NumberFormat
          value={props.product.price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={value => <div>{value}</div>}
        />
      </td>
      <td style={{ textAlign: "right" }}>
        {/* total price */}
        <NumberFormat
          value={props.product.totalPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={value => <div>{value}</div>}
        />
      </td>
      <td style={{ textAlign: "center", color: "blue", cursor: "pointer" }}>
        {/* remove */}
        <i
          onClick={() => props.removeItem(props.product)}
          className="cut icon"
        />
      </td>
      <td style={{ textAlign: "center", color: "blue", cursor: "pointer" }}>
        {/* save for later */}

        <i
          onClick={() => props.saveItemForLaterPurchaseHandler(props.product)}
          className="save icon"
        />
      </td>
    </tr>
  );
};

export default CartProduct;
