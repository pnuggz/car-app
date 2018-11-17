const initialState = {
  requesting: false,
  successful: false,
  errors: []
};

export function search(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        requesting: true,
        successful: false,
        errors: []
      };

    case "SEARCH_SUCCESS":
      return {
        errors: [],
        requesting: false,
        successful: true
      };

    case "SEARCH_ERROR":
      return {
        errors: state.errors.concat([
          {
            body: action.payload.toString(),
            time: new Date()
          }
        ]),
        requesting: false,
        successful: false
      };

    default:
      return state;
  }
}

export default search;
