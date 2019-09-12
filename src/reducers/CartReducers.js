const cartState = {
  selectedProducts: [],
  totalPrice: 0,
  quantityAddButton: true,
  quantityDeductButton: false,
  purchaseInProcess: true
};

const CartReducers = (state = cartState, action) => {
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
      let added_input = action.payload;
      let incrementedPrice = state.totalPrice;
      // let qtyAddButton = true;

      added_items.map(i => {
        if (
          i.item_id === added_input.item_id &&
          i.size_id === added_input.size_id &&
          i.color_id === added_input.color_id &&
          action.balance > i.quantity
        ) {
          i.quantity = i.quantity + 1;
          i.totalPrice = i.price * i.quantity;
          incrementedPrice = state.totalPrice + action.payload["price"];
          // if (action.balance === i.quantity) qtyAddButton = false;
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
      //if it reach a min value
      if (deducted_input.quantity === 1) {
        return {
          ...state,
          quantityDeductButton: false,
          quantityAddButton: true
        };
      }
      let previousSelectedProducts = [...state.selectedProducts];

      //deducting the total price
      let decreasedPrice = state.totalPrice - action.payload["price"];

      let updatedQty = deducted_input.quantity;
      //deducting the item quantity
      previousSelectedProducts.map(i => {
        if (
          i.item_id === deducted_input.item_id &&
          i.size_id === deducted_input.size_id &&
          i.color_id === deducted_input.color_id
        ) {
          i.quantity = i.quantity - 1;
          i.totalPrice = i.price * i.quantity;
          updatedQty = i.quantity;
          return i;
        }
        return i;
      });
      return {
        ...state,
        selectedProducts: previousSelectedProducts,
        totalPrice: decreasedPrice,
        quantityDeductButton: updatedQty === 1 ? false : true,
        quantityAddButton: true
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
    case "SUBMIT_ORDER":
      if (action.payload) {
        return {
          ...state,
          purchaseInProcess: false,
          selectedProducts: []
        };
      } else {
        return {
          ...state
        };
      }
    default:
      return state;
  }
};

export default CartReducers;
