const signupRequest = function signupRequest({
  first_name,
  last_name,
  username,
  email,
  password,
  password2,
  address,
  zipcode,
  mobilephone,
  birthday,
  gender,
  subscribe
}) {
  return {
    type: "SIGNUP_REQUESTING",
    first_name,
    last_name,
    username,
    email,
    password,
    password2,
    address,
    zipcode,
    mobilephone,
    birthday,
    gender,
    subscribe
  };
};

export default signupRequest;
