const initialState = {
  requesting: false,
  successful: false
};

export function remove(state = initialState, action) {
  switch (action.type) {
    case "REMOVE_REQUEST":
      return {
        requesting: true,
        successful: false
      };

    case "REMOVE_SUCCESS":
      return {
        requesting: false,
        successful: true
      };

    default:
      return state;
  }
}

export default remove;
