import { takeLatest, take } from "redux-saga/effects";
import { fork } from "redux-saga/effects";
import { loginRequest, logout } from "./loginSaga";
import { signupRequest } from "./singupSaga";
import { loadUser } from "./userSaga";

function* rootSaga() {
  yield [
    takeLatest("LOGIN_REQUEST", loginRequest),
    takeLatest("CLIENT_UNSET", logout),
    takeLatest("SIGNUP_REQUEST", signupRequest),
    takeLatest("USER_REQUEST", loadUser)
  ];
}

export default rootSaga;
