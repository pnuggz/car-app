import { takeLatest, take } from "redux-saga/effects";
import { fork } from "redux-saga/effects";
import { loginRequest, logout } from "./loginSaga";
import { signupRequest } from "./singupSaga";

function* rootSaga() {
  yield [
    takeLatest("LOGIN_REQUEST", loginRequest),
    takeLatest("CLIENT_UNSET", logout),
    takeLatest("SIGNUP_REQUEST", signupRequest)
  ];
}

export default rootSaga;
