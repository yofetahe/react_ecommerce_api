// import { createBrowserHistory } from "history";
import { browserHistory } from "react-router";
import ecommerce from "../api/ecommerce";
import history from "../util/history";

export const fetchCategories = () => async dispatch => {
  const response = await ecommerce.get("/getAllCategories");
  dispatch({
    type: "FETCH_CATEGORIES",
    payload: response.data,
    cList: [],
    sList: []
  });
};

export const fetchCategoryDetailsAndItemsByCategoryId = category_id => async dispatch => {
  const [categoryDetail, itemsByCategoryId] = await Promise.all([
    ecommerce.get(`/getCategoryDetailsByCategoryId/${category_id}`),
    ecommerce.get(`/getItemsByCategoryId/${category_id}`)
  ]);

  const itemIds = [];
  let x = 0;
  for (let i of itemsByCategoryId.data) {
    itemIds[x] = i["item_id"];
    x = x + 1;
  }

  const [itemsSizes, itemsColors] = await Promise.all([
    ecommerce.post("/fetchItemSizesByItemsList", {
      items: itemIds
    }),
    ecommerce.post("/fetchItemColorsByItemsList", {
      items: itemIds
    })
  ]);

  dispatch({
    type: "FETCH_CATEGORY_DETAILS",
    categoryDetail: categoryDetail.data,
    items: itemsByCategoryId.data,
    colorsList: itemsColors.data,
    sizesList: itemsSizes.data
  });
};

// export const fetchItemsByCategoryId = category_id => async dispatch => {
//   const response = await ecommerce.get("/getItemsByCategoryId/" + category_id);
//   dispatch({
//     type: "FETCH_CATEGORY_ITEMS",
//     payload: response.data
//   });
// };

export const sortItemsByPrice = items => dispatch => {
  dispatch({
    type: "SORT_ITEMS_BY_PRICE",
    payload: items
  });
};

export const addLikeByItemId = item_id => async dispatch => {
  const response = await ecommerce.post(`/addLikeByItemId/${item_id}`);

  dispatch({
    type: "LIKE_DISLIKE_ITEM",
    payload: response.data
  });
};

export const addDislikeByItemId = item_id => async dispatch => {
  const response = await ecommerce.post(`/addDislikeByItemId/${item_id}`);

  dispatch({
    type: "LIKE_DISLIKE_ITEM",
    payload: response.data
  });
};

export const fetchItemByCategoryTypeId = (
  category_id,
  type_id
) => async dispatch => {
  const response = await ecommerce.get(
    "/getItemsByCategoryTypeId/" + category_id + "/" + type_id
  );

  const itemIds = [];
  let x = 0;
  for (let i of response.data) {
    itemIds[x] = i["item_id"];
    x = x + 1;
  }

  const [itemsSizes, itemsColors] = await Promise.all([
    ecommerce.post("/fetchItemSizesByItemsList", {
      items: itemIds
    }),
    ecommerce.post("/fetchItemColorsByItemsList", {
      items: itemIds
    })
  ]);

  dispatch({
    type: "FETCH_CATEGORY_TYPE_ITEMS",
    payload: response.data,
    colorsList: itemsColors.data,
    sizesList: itemsSizes.data
  });
};

// export const fetchItemSizesAndColorsByItemId = item_id => async dispatch => {
//   const [itemSize, itemColor] = await Promise.all([
//     ecommerce.get(`/fetchItemSizesByItemId/${item_id}`),
//     ecommerce.get(`/fetchItemColorsByItemId/${item_id}`)
//   ]);
//   const updateItemSizes = itemSize.data;
//   for (let i in updateItemSizes) {
//     updateItemSizes[i]["item_id"] = item_id;
//   }
//   const updateItemColors = itemColor.data;
//   for (let i in updateItemColors) {
//     updateItemColors[i]["item_id"] = item_id;
//   }
//   dispatch({
//     type: "FETCH_ITEM_SIZE_AND_COLOR",
//     itemSize: updateItemSizes,
//     itemColor: updateItemColors,
//     sizeColorLoading: false
//   });
// };

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
  history.push("/");
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
  billingInformation,
  billingAddress
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
    billingInformation: billingInformation,
    billingAddress: billingAddress
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

export const submitActiveUserOrder = (
  selectedItems,
  shippingAddress,
  selectedCardInfo,
  user_id
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
  console.log("ACTION ", user_id);
  const response = await ecommerce.post("/submitActiveUserPurchaseOrder", {
    item_size_color: filteredItems,
    shippingAddress: shippingAddress,
    creditCardInfoId: selectedCardInfo.credit_card_info_id,
    billingAddressId: selectedCardInfo.billingShippingAddress.address_id,
    user_id: user_id
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
  console.log(delete_response.data);
  dispatch({
    type: "SAVED_ITEM_LIST",
    payload: savedItemList.data
  });
};

export const getAccountInformation = user_id => async dispatch => {
  const [credit_card_info, ordered_items] = await Promise.all([
    ecommerce.get(`/getCreditCardInfoByUserId/${user_id}`),
    ecommerce.get(`/getOrderedItemsByUserId/${user_id}`)
  ]);

  dispatch({
    type: "USER_ACCOUNT_INFO",
    creditCardInfo: credit_card_info.data,
    orderedItems: ordered_items.data
  });
};

export const cancelOrderedItem = (item, user_id) => async dispatch => {
  const response = await ecommerce.post(
    `/cancelOrderedItem/${item.order_id}/${item.order_detail_id}/${item.item_size_color_id}`
  );
  console.log(response.date);
  if (response.data) {
    const ordered_items = await ecommerce.get(
      `/getOrderedItemsByUserId/${user_id}`
    );
    dispatch({
      type: "CANCEL_ORDERED_ITEM",
      orderedItems: ordered_items.data
    });
  }
};

export const getLoggedInUserAcctInfo = user_id => async dispatch => {
  const [credit_card_info, billing_address] = await Promise.all([
    ecommerce.get(`/getCreditCardInfoByUserId/${user_id}`),
    ecommerce.get(`/getBillingAddressByUserId/${user_id}`)
  ]);
  console.log(credit_card_info.data);
  console.log(billing_address.data);
  dispatch({
    type: "LOGGED_IN_USER_ACCOUNT_INFO",
    creditCardInfo: credit_card_info.data,
    billingAddress: billing_address.data
  });
};
