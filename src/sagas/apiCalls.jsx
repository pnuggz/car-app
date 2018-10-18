import LoginAPI from "../apis/loginApi";
import SignupAPI from "../apis/signupApi";
import { handleApiErrors } from "../components/templates/api-errors";

export const loginAPI = (username, password) => {
  console.log("logging in SAGA API");
  return LoginAPI.loginRequest(username, password)
    .then(handleApiErrors)
    .then(res => res.json())
    .then(login => login)
    .catch(error => {
      throw error;
    });
};

export const signupAPI = (
  first_name,
  last_name,
  username,
  email,
  password,
  password2,
  address,
  zipcode,
  mobilephone,
  gender,
  birthday,
  subscribe
) => {
  console.log("signing up");
  return SignupAPI.signupRequest(
    first_name,
    last_name,
    username,
    email,
    password,
    password2,
    address,
    zipcode,
    mobilephone,
    gender,
    birthday,
    subscribe
  )
    .then(res => res.json())
    .then(register_success => register_success);
};
