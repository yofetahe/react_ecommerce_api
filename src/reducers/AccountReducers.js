const acctState = {
  userLoggedIn: false,
  loggedInUserId: sessionStorage.getItem("loggedInUserId"),
  loggedInUserEmail: sessionStorage.getItem("loggedInUserEmail"),
  showPopupLogin: false,
  showPopupSignup: false,
  authenticationFailed: "",
  creditCardInfo: [],
  savedItemsList: []
};

const AccountReducers = (state = acctState, action) => {
  switch (action.type) {
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
    case "USER_ACCOUNT_INFO":
      return {
        ...state,
        creditCardInfo: action.creditCardInfo,
        billingAddress: action.billingAddress,
        orderedItems: action.orderedItems
      };
    case "CANCEL_ORDERED_ITEM":
      return {
        ...state,
        orderedItems: action.orderedItems
      };
    case "LOGGED_IN_USER_ACCOUNT_INFO":
      return {
        ...state,
        creditCardInfo: action.creditCardInfo,
        billingAddress: action.billingAddress
      };
    case "SAVED_ITEM_LIST":
      return {
        ...state,
        savedItemsList: action.payload
      };
    default:
      return state;
  }
};

export default AccountReducers;
