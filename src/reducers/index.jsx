import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { login } from "./loginReducer";
import { client } from "./client";
import { signup } from "./signupReducer";

const rootReducer = combineReducers({
  login,
  signup,
  client,
  form: form
});

export default rootReducer;
