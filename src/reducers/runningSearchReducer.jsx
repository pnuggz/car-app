const initialState = {
  requesting: false,
  successful: false,
  runningSearch: []
};

export function runningSearch(state = initialState, action) {
  switch (action.type) {
    case "RUNNING_SEARCH_REQUEST":
      return {
        requesting: true,
        successful: false,
        runningSearch: []
      };

    case "RUNNING_SEARCH_SUCCESS":
      return {
        runningSearch: action.payload,
        requesting: false,
        successful: true
      };

    default:
      return state;
  }
}

export default runningSearch;
