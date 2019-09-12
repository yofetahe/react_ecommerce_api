const itemState = {
  ItemCatagories: [],
  ItemCatagoryDetail: [],
  products: [],
  colorList: [],
  sizeList: [],
  sizeColorLoading: true
};

const ItemReducers = (state = itemState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return {
        ...state,
        ItemCatagories: action.payload,
        sizeList: action.sList,
        colorList: action.cList
      };
    case "FETCH_CATEGORY_DETAILS":
      return {
        ...state,
        ItemCatagoryDetail: action.categoryDetail,
        products: action.items,
        colorList: action.colorsList,
        sizeList: action.sizesList,
        sizeColorLoading: false
      };
    // case "FETCH_CATEGORY_ITEMS":
    //   return {
    //     ...state,
    //     products: action.payload,
    //     sizeList: [],
    //     colorList: []
    //   };
    case "FETCH_CATEGORY_TYPE_ITEMS":
      return {
        ...state,
        products: action.payload,
        sizeList: action.sizesList,
        colorList: action.colorsList
      };
    case "FETCH_ITEM_SIZE_AND_COLOR":
      let itemSize = [...state.sizeList, action.itemSize];
      let itemColor = [...state.colorList, action.itemColor];
      return {
        ...state,
        sizeList: itemSize,
        colorList: itemColor,
        sizeColorLoading: false
      };
    // case "FETCH_ITEM_COLOR":
    //   let itemColor = [...state.colorList];
    //   itemColor.push(action.payload);
    //   return {
    //     ...state,
    //     colorList: itemColor
    //   };
    case "SORT_ITEMS_BY_PRICE":
      return {
        ...state,
        products: action.payload
      };
    case "LIKE_DISLIKE_ITEM":
      const item = action.payload;
      const products = [...state.products];
      const updatedProducts = products.map(i => {
        if (i.item_id === item.item_id) {
          return item;
        } else {
          return i;
        }
      });
      return {
        ...state,
        products: updatedProducts
      };
    default:
      return state;
  }
};

export default ItemReducers;
