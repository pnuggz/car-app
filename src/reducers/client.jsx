const initialState = {
  id: null,
  token: null
};

export function client(state = initialState, action) {
  switch (action.type) {
    case "CLIENT_SET":
      return {
        id: action.token.userId,
        token: action.token
      };

    case "CLIENT_UNSET":
      return {
        id: null,
        token: null
      };

    default:
      return state;
  }
}
