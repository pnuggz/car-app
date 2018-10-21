import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { login } from "./loginReducer";
import { client } from "./client";
import { signup } from "./signupReducer";
import { user } from "./userReducer";

const rootReducer = combineReducers({
  login,
  signup,
  client,
  form: form,
  user
});

export default rootReducer;
