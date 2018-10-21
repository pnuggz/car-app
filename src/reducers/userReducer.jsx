const initialState = {
  requesting: false,
  successful: false,
  userInfo: {}
};

export function user(state = initialState, action) {
  switch (action.type) {
    case "USER_REQUEST":
      return {
        requesting: true,
        successful: false,
        userInfo: {}
      };

    case "USER_SUCCESS":
      return {
        userInfo: action.payload,
        requesting: false,
        successful: true
      };

    default:
      return state;
  }
}

export default user;
