const initialState = {
  ItemCatagories: [],
  ItemCatagoryDetail: [],
  selectedCategory: "",
  products: [],
  selectedProducts: [],
  colorList: [],
  sizeList: [],
  totalPrice: 0,
  authenticationFailed: "",
  userLoggedIn: false,
  loggedInUserId: sessionStorage.getItem("loggedInUserId"),
  loggedInUserEmail: sessionStorage.getItem("loggedInUserEmail"),
  showPopupLogin: false,
  showPopupSignup: false,
  quantityAddButton: true,
  quantityDeductButton: false,
  purchaseInProcess: true,
  savedItemsList: [],
  creditCardInfo: []
};

export default initialState;
