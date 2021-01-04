import { combineReducers } from "redux";
import login from "./login";
import notices from "./notices";
import qnas from "./qnas";

const rootReducer = combineReducers({
  notices,
  qnas,
  login,
});

export default rootReducer;
