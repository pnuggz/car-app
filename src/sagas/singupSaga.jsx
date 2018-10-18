import { call, put } from "redux-saga/effects";
import { signupAPI } from "./apiCalls";

export function* signupRequest(action) {
  try {
    console.log(action);
    const {
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
    } = action;

    //Get Contest information
    const register = yield call(
      signupAPI,
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
    );

    console.log(register);

    if (register.success) {
      //Tell the store we are ready to be displayed
      yield put({ type: "SIGNUP_SUCCESS", payload: register });
    } else {
      yield put({ type: "SIGNUP_ERROR", payload: register });
    }
  } catch (error) {
    yield put({ type: "SIGNUP_ERROR", payload: error.message });
  }
}
