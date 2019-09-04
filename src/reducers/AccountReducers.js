const AccountReducers = (state = [], action) => {
  switch (action.type) {
    case "USER_SIGN_UP":
      return {
        ...state
      };
    case "AUTHENTICATE_USER":
      return {
        ...state
      };
    case "LOGOUT":
      return {
        ...state,
        userLoggedIn: false,
        loggedInUserId: "",
        loggedInUserEmail: ""
      };
    default:
      return state;
  }
};

export default AccountReducers;
