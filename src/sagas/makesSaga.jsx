import { call, put } from "redux-saga/effects";
import { makesAPI } from "./apiCalls";

export function* loadMakes() {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const token = userInfo.token;
  try {
    const makes = yield call(makesAPI, token);

    yield put({ type: "MAKES_SUCCESS", payload: makes });
  } catch (error) {
    yield put({ type: "MAKES_FAILED", error: error.message });
  }
}
