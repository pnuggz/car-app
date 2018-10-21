const initialState = {
  id: null,
  token: null
};

export function client(state = initialState, action) {
  switch (action.type) {
    case "CLIENT_SET":
      return {
        id: action.payload.id,
        token: action.payload.token
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
