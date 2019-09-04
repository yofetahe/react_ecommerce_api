const ItemReducers = (state = [], action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      console.log(">>>> ", action.payload);
      return {
        ...state,
        ItemCatagories: action.payload
      };
    case "FETCH_CATEGORY_DETAILS":
      return {
        ...state,
        ItemCatagoryDetail: action.payload
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
    case "FETCH_ITEM_SIZE":
      let itemSize = [...state.sizeList, action.payload];
      return {
        ...state,
        sizeList: itemSize
      };
    case "FETCH_ITEM_COLOR":
      let itemColor = [...state.colorList];
      itemColor.push(action.payload);
      return {
        ...state,
        colorList: itemColor
      };
    default:
      return state;
  }
};

export default ItemReducers;
