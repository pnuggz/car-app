const initialState = {
  requesting: false,
  successful: false,
  locations: []
};

export function locations(state = initialState, action) {
  switch (action.type) {
    case "LOCATIONS_REQUEST":
      return {
        requesting: true,
        successful: false,
        locations: []
      };

    case "LOCATIONS_SUCCESS":
      return {
        locations: action.payload,
        requesting: false,
        successful: true
      };

    default:
      return state;
  }
}

export default locations;
