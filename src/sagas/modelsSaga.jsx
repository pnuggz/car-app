import { call, put } from "redux-saga/effects";
import { modelsAPI } from "./apiCalls";

export function* loadModels() {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const token = userInfo.token;
  try {
    const models = yield call(modelsAPI, token);

    yield put({ type: "MODELS_SUCCESS", payload: models });
  } catch (error) {
    yield put({ type: "MODELS_FAILED", error: error.message });
  }
}
