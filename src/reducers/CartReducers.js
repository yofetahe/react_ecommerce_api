const CartReducers = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let updatedTotalPrice = state.totalPrice + action.payload["price"];
      action.payload["quantity"] = 1;
      action.payload["totalPrice"] = action.payload["price"];
      let selProducts = [...state.selectedProducts, action.payload];
      return {
        ...state,
        selectedProducts: selProducts,
        totalPrice: updatedTotalPrice
      };
    case "ADD_CART_ITEM_QUANTITY":
      let added_items = [...state.selectedProducts];
      let incrementedPrice = state.totalPrice + action.payload["price"];
      let added_input = action.payload;
      let balance = action.balance;
      console.log("REDUCER >>>> ", balance);
      added_items.map(i => {
        if (
          i.item_id === added_input.item_id &&
          i.size_id === added_input.size_id &&
          i.color_id === added_input.color_id
        ) {
          i.quantity = i.quantity + 1;
          i.totalPrice = i.price * i.quantity;
          return i;
        }
        return i;
      });

      return {
        ...state,
        selectedProducts: added_items,
        totalPrice: incrementedPrice
      };
    case "DEDUCT_CART_ITEM_QUANTITY":
      let deducted_input = action.payload;
      if (deducted_input.quantity === 1) {
        return {
          ...state
        };
      }
      let deducted_items = [...state.selectedProducts];
      let decreasedPrice = state.totalPrice - action.payload["price"];

      deducted_items.map(i => {
        if (
          i.item_id === deducted_input.item_id &&
          i.size_id === deducted_input.size_id &&
          i.color_id === deducted_input.color_id
        ) {
          i.quantity = i.quantity - 1;
          i.totalPrice = i.price * i.quantity;
          return i;
        }
        return i;
      });
      return {
        ...state,
        selectedProducts: deducted_items,
        totalPrice: decreasedPrice
      };
    case "REMOVE_CART_ITEM":
      let remove_input = action.payload;
      let removedPrice =
        state.totalPrice - remove_input["price"] * remove_input["quantity"];
      let selectedProducts = state.selectedProducts.filter(item => {
        return (
          item.item_id !== remove_input.item_id &&
          item.color_id !== remove_input.color_id &&
          item.size_id !== remove_input.size_id
        );
      });
      return {
        ...state,
        selectedProducts: selectedProducts,
        totalPrice: removedPrice
      };
    default:
      return state;
  }
};

export default CartReducers;
