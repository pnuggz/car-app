import { takeLatest, take } from "redux-saga/effects";
import { fork } from "redux-saga/effects";
import { loginRequest, logout } from "./loginSaga";
import { signupRequest } from "./singupSaga";
import { loadUser } from "./userSaga";
import { loadModels } from "./modelsSaga";
import { loadMakes } from "./makesSaga";
import { loadLocations } from "./locationsSaga";
import { searchRequest } from "./searchSaga";
import { loadRunningSearch } from "./runningSearchSaga";
import { removeSearch } from "./removeSaga";

function* rootSaga() {
  yield [
    takeLatest("LOGIN_REQUEST", loginRequest),
    takeLatest("CLIENT_UNSET", logout),
    takeLatest("SIGNUP_REQUEST", signupRequest),
    takeLatest("USER_REQUEST", loadUser),
    takeLatest("MODELS_REQUEST", loadModels),
    takeLatest("MAKES_REQUEST", loadMakes),
    takeLatest("LOCATIONS_REQUEST", loadLocations),
    takeLatest("SEARCH_REQUEST", searchRequest),
    takeLatest("RUNNING_SEARCH_REQUEST", loadRunningSearch),
    takeLatest("REMOVE_REQUEST", removeSearch)
  ];
}

export default rootSaga;
