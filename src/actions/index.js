// import { createBrowserHistory } from "history";
import { browserHistory } from "react-router";
import ecommerce from "../api/ecommerce";

export const fetchCategories = () => async dispatch => {
  const response = await ecommerce.get("/getAllCategories");
  dispatch({
    type: "FETCH_CATEGORIES",
    payload: response.data
  });
};

export const fetchCategoryDetailsAndItemsByCategoryId = category_id => async dispatch => {
  const [categoryDetail, itemsByCategoryId] = await Promise.all([
    ecommerce.get(`/getCategoryDetailsByCategoryId/${category_id}`),
    ecommerce.get(`/getItemsByCategoryId/${category_id}`)
  ]);

  dispatch({
    type: "FETCH_CATEGORY_DETAILS",
    categoryDetail: categoryDetail.data,
    items: itemsByCategoryId.data
  });
};

// export const fetchItemsByCategoryId = category_id => async dispatch => {
//   const response = await ecommerce.get("/getItemsByCategoryId/" + category_id);

//   dispatch({
//     type: "FETCH_CATEGORY_ITEMS",
//     payload: response.data
//   });
// };

export const fetchItemByCategoryTypeId = (
  category_id,
  type_id
) => async dispatch => {
  const response = await ecommerce.get(
    "/getItemsByCategoryTypeId/" + category_id + "/" + type_id
  );

  dispatch({
    type: "FETCH_CATEGORY_TYPE_ITEMS",
    payload: response.data
  });
};

export const fetchItemSizesAndColorsByItemId = item_id => async dispatch => {
  const [itemSize, itemColor] = await Promise.all([
    ecommerce.get(`/fetchItemSizesByItemId/${item_id}`),
    ecommerce.get(`/fetchItemColorsByItemId/${item_id}`)
  ]);

  const updateItemSizes = itemSize.data;
  for (let i in updateItemSizes) {
    updateItemSizes[i]["item_id"] = item_id;
  }

  const updateItemColors = itemColor.data;
  for (let i in updateItemColors) {
    updateItemColors[i]["item_id"] = item_id;
  }

  dispatch({
    type: "FETCH_ITEM_SIZE_AND_COLOR",
    itemSize: updateItemSizes,
    itemColor: updateItemColors
  });
};

// export const fetchItemColorsByItemId = item_id => async dispatch => {
//   const response = await ecommerce.get("/fetchItemColorsByItemId/" + item_id);
//   const updateResponse = response.data;

//   for (let i in updateResponse) {
//     updateResponse[i]["item_id"] = item_id;
//   }

//   dispatch({
//     type: "FETCH_ITEM_COLOR",
//     payload: updateResponse
//   });
// };

export const addToCart = (
  item,
  color_id,
  color_name,
  size_id,
  size_name
) => dispatch => {
  item["color_id"] = color_id;
  item["color_name"] = color_name;
  item["size_id"] = size_id;
  item["size_name"] = size_name;

  dispatch({
    type: "ADD_TO_CART",
    payload: item
  });
};

export const addCartItemQuantity = item => async dispatch => {
  const response = await ecommerce.get(
    `/getItemRemainingBalance/${item.item_id}/${item.color_id}/${item.size_id}`
  );

  dispatch({
    type: "ADD_CART_ITEM_QUANTITY",
    payload: item,
    balance: response.data
  });
};

export const deductCartItemQuantity = item => dispatch => {
  dispatch({
    type: "DEDUCT_CART_ITEM_QUANTITY",
    payload: item
  });
};

export const removeItem = item => dispatch => {
  dispatch({
    type: "REMOVE_CART_ITEM",
    payload: item
  });
};

export const saveItemForLaterPurchase = (item, user_id) => async dispatch => {
  const response = await ecommerce.post(
    `/saveItemForLaterPurchase/${user_id}/${item.item_id}/${item.size_id}/${item.color_id}`,
    {
      item_id: item.item_id,
      color_id: item.color_id,
      size_id: item.size_id
    }
  );

  if (response.data) {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: item
    });
  }
};

export const signUpAppUser = form => async dispatch => {
  const response = await ecommerce.post("/addUser", {
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    password: form.password
  });

  //**** add returned user_id in a form  ****//
  if (response.data !== 0) form["user_id"] = response.data;

  dispatch({
    type: "USER_SIGN_UP",
    payload: form
  });
};

export const authenticateUser = form => async dispatch => {
  const response = await ecommerce.post("/authenticateUser", {
    email: form.email,
    password: form.password
  });

  //**** add returned user_id in a form  ****//
  form["user_id"] = response.data;
  console.log(response.data);
  response.data === 0
    ? (form["authenticationFailed"] = "Wronge username or password")
    : (form["authenticationFailed"] = "");
  console.log(form["authenticationFailed"]);
  dispatch({
    type: "AUTHENTICATE_USER",
    payload: form
  });
};

export const logout = () => dispatch => {
  console.log("dispatch");
  dispatch({
    type: "LOGOUT"
  });
};

export const togglePopup = (formType, value) => dispatch => {
  dispatch({
    type: formType,
    payload: value
  });
};

export const closePopup = () => dispatch => {
  dispatch({
    type: "CLOSE_POPUP"
  });
};

export const submitOrder = (
  selectedItems,
  shippingAddress,
  billingInformation
) => async dispatch => {
  const filteredItems = [];
  selectedItems.forEach(record => {
    const r = {};
    r["color_id"] = record.color_id;
    r["item_id"] = record.item_id;
    r["size_id"] = record.size_id;
    r["quantity"] = record.quantity;
    r["unit_price"] = record.price;
    filteredItems.push(r);
  });

  const response = await ecommerce.post("/submitPurchaseOrder", {
    item_size_color: filteredItems,
    shippingAddress: shippingAddress,
    billingInformation: billingInformation
  });
  console.log("RESPONSE >>> ", response);
  if (response.data) {
    browserHistory.push("/");
  }
  dispatch({
    type: "SUBMIT_ORDER",
    payload: response.data
  });
};

export const getSavedItemsList = user_id => async dispatch => {
  const response = await ecommerce.get(`/getSavedItemsListByUserId/${user_id}`);
  console.log(response.data);
  dispatch({
    type: "SAVED_ITEM_LIST",
    payload: response.data
  });
};

export const deleteSavedItem = (
  item_size_color_id,
  user_id
) => async dispatch => {
  const [delete_response, savedItemList] = await Promise.all([
    ecommerce.delete(`/deleteSavedItem/${user_id}/${item_size_color_id}`),
    ecommerce.get(`/getSavedItemsListByUserId/${user_id}`)
  ]);

  dispatch({
    type: "SAVED_ITEM_LIST",
    payload: savedItemList.data
  });
};
