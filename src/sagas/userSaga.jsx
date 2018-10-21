import { call, put } from "redux-saga/effects";
import { userAPI } from "./apiCalls";

export function* loadUser() {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const token = userInfo.token;
  try {
    //Get Contest information
    const userInfo = yield call(userAPI, token);

    yield put({ type: "USER_SUCCESS", payload: userInfo });
  } catch (error) {
    yield put({ type: "USER_FAILED", error: error.message });
  }
}
