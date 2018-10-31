const initialState = {
  requesting: false,
  successful: false,
  makes: []
};

export function makes(state = initialState, action) {
  switch (action.type) {
    case "MAKES_REQUEST":
      return {
        requesting: true,
        successful: false,
        makes: []
      };

    case "MAKES_SUCCESS":
      return {
        makes: action.payload,
        requesting: false,
        successful: true
      };

    default:
      return state;
  }
}

export default makes;
