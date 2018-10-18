const loginRequest = function loginRequest({ username, password }) {
  return {
    type: "LOGIN_REQUEST",
    username,
    password
  };
};

export default loginRequest;
