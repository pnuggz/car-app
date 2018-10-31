import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { login } from "./loginReducer";
import { client } from "./client";
import { signup } from "./signupReducer";
import { user } from "./userReducer";
import { models } from "./modelsReducer";
import { makes } from "./makesReducer";
import { locations } from "./locationsReducer";
import { search } from "./searchReducer";
import { runningSearch } from "./runningSearchReducer";

const rootReducer = combineReducers({
  login,
  signup,
  client,
  form: form,
  user,
  models,
  makes,
  locations,
  search,
  runningSearch
});

export default rootReducer;
