// import { combineReducers } from "redux";

// import AccountReducers from "./AccountReducers";
// import CartReducers from "./CartReducers";
// import ItemReducers from "./ItemReducers";

// export default combineReducers({
//   account: AccountReducers,
//   cart: CartReducers,
//   item: ItemReducers
// });

import initialState from "../data/initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return {
        ...state,
        ItemCatagories: action.payload
      };
    case "FETCH_CATEGORY_DETAILS":
      return {
        ...state,
        ItemCatagoryDetail: action.categoryDetail,
        products: action.items
      };
    case "FETCH_CATEGORY_ITEMS":
      return {
        ...state,
        products: action.payload
      };
    case "FETCH_CATEGORY_TYPE_ITEMS":
      return {
        ...state,
        products: action.payload
      };
    case "FETCH_ITEM_SIZE_AND_COLOR":
      console.log(state.colorList);
      let itemSize = [...state.sizeList, action.itemSize];
      let itemColor = [...state.colorList, action.itemColor];
      return {
        ...state,
        sizeList: itemSize,
        colorList: itemColor
      };
    // case "FETCH_ITEM_COLOR":
    //   let itemColor = [...state.colorList];
    //   itemColor.push(action.payload);
    //   return {
    //     ...state,
    //     colorList: itemColor
    //   };
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
      let qtyAddButton = true;

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
          if (action.balance === i.quantity) qtyAddButton = false;
          return i;
        }
        return i;
      });

      console.log(incrementedPrice);

      return {
        ...state,
        selectedProducts: added_items,
        totalPrice: incrementedPrice,
        quantityAddButton: qtyAddButton,
        quantityDeductButton: true
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
      return {
        ...state,
        purchaseInProcess: false
      };
    case "SAVED_ITEM_LIST":
      return {
        ...state,
        savedItemsList: action.payload
      };
    case "USER_SIGN_UP":
      if (action.payload.user_id) {
        sessionStorage.setItem("loggedInUserEmail", action.payload.email);
        sessionStorage.setItem("loggedInUserId", action.payload.user_id);
        return {
          ...state,
          userLoggedIn: true,
          showPopupLogin: false,
          showPopupSignup: false,
          loggedInUserEmail: action.payload.email,
          loggedInUserId: action.payload.user_id
        };
      }
      return {
        ...state
      };
    case "AUTHENTICATE_USER":
      if (action.payload.user_id) {
        sessionStorage.setItem("loggedInUserEmail", action.payload.email);
        sessionStorage.setItem("loggedInUserId", action.payload.user_id);
        return {
          ...state,
          userLoggedIn: true,
          showPopupLogin: false,
          showPopupSignup: false,
          loggedInUserEmail: action.payload.email,
          loggedInUserId: action.payload.user_id
        };
      }
      return {
        ...state,
        authenticationFailed: action.payload.authenticationFailed
      };
    case "LOGOUT":
      console.log("reduced");
      sessionStorage.removeItem("loggedInUserEmail");
      sessionStorage.removeItem("loggedInUserId");
      return {
        ...state,
        userLoggedIn: false,
        loggedInUserEmail: "",
        loggedInUserId: ""
      };
    case "POPUP_LOGIN":
      return {
        ...state,
        showPopupLogin: action.payload,
        showPopupSignup: !action.payload,
        authenticationFailed: ""
      };
    case "POPUP_SIGNUP":
      return {
        ...state,
        showPopupLogin: !action.payload,
        showPopupSignup: action.payload,
        authenticationFailed: ""
      };
    case "CLOSE_POPUP":
      return {
        ...state,
        showPopupLogin: false,
        showPopupSignup: false,
        authenticationFailed: ""
      };
    default:
      return state;
  }
};

export default reducer;
