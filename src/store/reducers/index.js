import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import event from "./event";
import calendar from "./calendar";

const rootReducer = combineReducers({
  form: formReducer,
  event,
  calendar,
});

export default rootReducer;
