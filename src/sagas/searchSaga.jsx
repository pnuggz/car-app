import { call, put, cancelled } from "redux-saga/effects";

import { searchAPI } from "./apiCalls";
import history from "../lib/history";

export function* searchRequest(action) {
  console.log(action);
  var make = action.selectMake;
  var model = action.selectModel;
  var location = action.selectLocation;
  var minPrice = action.minPrice;
  var maxPrice = action.maxPrice;

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const token = userInfo.token;

  try {
    const search = yield call(
      searchAPI,
      make,
      model,
      location,
      minPrice,
      maxPrice,
      token
    );

    if (search.success) {
      yield put({ type: "SEARCH_SUCCESS" });

      history.push("/landing");
    }

    yield put({ type: "SEARCH_ERROR", payload: search.error.message });
  } catch (error) {
    yield put({ type: "SEARCH_ERROR", payload: error });
  } finally {
    if (yield cancelled()) {
      //eslint-disable-next-line
      history.push("/landing");
    }
  }
}
