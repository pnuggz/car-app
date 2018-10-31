import { call, put } from "redux-saga/effects";
import { locationsAPI } from "./apiCalls";

export function* loadLocations() {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const token = userInfo.token;
  try {
    const locations = yield call(locationsAPI, token);

    yield put({ type: "LOCATIONS_SUCCESS", payload: locations });
  } catch (error) {
    yield put({ type: "LOCATIONS_FAILED", error: error.message });
  }
}
