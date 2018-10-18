const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

export function login(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        requesting: true,
        successful: false,
        messages: [{ body: "Logging in...", time: new Date() }],
        errors: []
      };

    case "LOGIN_SUCCESS":
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

    case "LOGIN_ERROR":
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

export default login;
