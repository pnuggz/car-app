import { call, put } from "redux-saga/effects";
import { runningSearchAPI } from "./apiCalls";

export function* loadRunningSearch() {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const token = userInfo.token;
  try {
    // const runningSearch = yield call(runningSearchAPI, token);
    const runningSearch = yield call(runningSearchAPI, token);

    yield put({ type: "RUNNING_SEARCH_SUCCESS", payload: runningSearch });
  } catch (error) {
    yield put({ type: "RUNNING_SEARCH_FAILED", error: error.message });
  }
}
