const initialState = {
  requesting: false,
  successful: false,
  models: []
};

export function models(state = initialState, action) {
  switch (action.type) {
    case "MODELS_REQUEST":
      return {
        requesting: true,
        successful: false,
        models: []
      };

    case "MODELS_SUCCESS":
      return {
        models: action.payload,
        requesting: false,
        successful: true
      };

    default:
      return state;
  }
}

export default models;
