import { call, put } from "redux-saga/effects";
import { removeAPI } from "./apiCalls";
import { runningSearchAPI } from "./apiCalls";

export function* removeSearch(action) {
  console.log(action.searchid);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const token = userInfo.token;
  try {
    //Get Contest information
    const removeSearch = yield call(removeAPI, action.searchid, token);
    yield put({ type: "REMOVE_SUCCESS", payload: removeSearch });

    const runningSearch = yield call(runningSearchAPI, token);
    yield put({ type: "RUNNING_SEARCH_SUCCESS", payload: runningSearch });
  } catch (error) {
    yield put({ type: "REMOVE_FAILED", error: error.message });
  }
}
