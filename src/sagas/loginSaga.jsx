import { call, put, cancelled } from "redux-saga/effects";

import { loginAPI } from "./apiCalls";
import history from "../lib/history";

export function* logout() {
  // remove our token
  sessionStorage.removeItem("userInfo");

  yield put({ type: "CLIENT_UNSET_SUCCESS" });

  // redirect to the /login screen
  //eslint-disable-next-line
  history.push("/");
}

export function* loginRequest(action) {
  var username = action.username;
  var password = action.password;
  let token;

  try {
    const login = yield call(loginAPI, username, password);

    if (login.token) {
      yield put({ type: "LOGIN_SUCCESS" });

      let token = login.token;
      let id = login.data.id;
      let userData = login.data;
      let userInfo = {
        token: token,
        token_date: Date.now(),
        data: userData
      };

      yield put({ type: "CLIENT_SET", payload: { id, token } });

      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

      //eslint-disable-next-line
      history.push("/");
    }

    yield put({ type: "LOGIN_ERROR", payload: login.error.message });
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", payload: error });
  } finally {
    if (yield cancelled()) {
      //eslint-disable-next-line
      history.push("/login");
    }
  }

  return token;
}
