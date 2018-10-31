const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

export function search(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "Logging in...", time: new Date() }],
        errors: []
      };

    case "SEARCH_SUCCESS":
      return {
        errors: [],
        messages: [
          {
            body: action.payload,
            time: new Date()
          }
        ],
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
        messages: [],
        requesting: false,
        successful: false
      };

    default:
      return state;
  }
}

export default search;
