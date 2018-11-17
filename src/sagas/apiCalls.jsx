import LoginAPI from "../apis/loginApi";
import SignupAPI from "../apis/signupApi";
import UserAPI from "../apis/userApi";
import ModelsAPI from "../apis/modelsApi";
import MakesAPI from "../apis/makesApi";
import LocationsAPI from "../apis/locationsApi";
import SearchAPI from "../apis/searchApi";
import RunningSearchAPI from "../apis/runningSearchApi";
import RemoveAPI from "../apis/removeApi";
import { handleApiErrors } from "../components/templates/api-errors";

export const runningSearchAPI = token => {
  return RunningSearchAPI.getRunningSearch(token)
    .then(res => res.json())
    .then(runningSearch => runningSearch.data);
};

export const modelsAPI = token => {
  return ModelsAPI.getModels(token)
    .then(res => res.json())
    .then(models => models.data);
};

export const makesAPI = token => {
  return MakesAPI.getMakes(token)
    .then(res => res.json())
    .then(makes => makes.data);
};

export const locationsAPI = token => {
  return LocationsAPI.getLocations(token)
    .then(res => res.json())
    .then(locations => locations.data);
};

export const loginAPI = (username, password) => {
  console.log("logging in SAGA API");
  return LoginAPI.loginRequest(username, password)
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

export const userAPI = token => {
  return UserAPI.getUser(token)
    .then(res => res.json())
    .then(userInfo => userInfo.data);
};

export const searchAPI = (make, model, location, minPrice, maxPrice, token) => {
  return SearchAPI.submitSearch(
    make,
    model,
    location,
    minPrice,
    maxPrice,
    token
  )
    .then(res => res.json())
    .then(success => success);
};

export const removeAPI = (searchid, token) => {
  return RemoveAPI.removeSearch(searchid, token)
    .then(res => res.json())
    .then(success => success);
};
