import { combineReducers } from "redux";
import notices from "./notices";
import qnas from "./qnas";

const rootReducer = combineReducers({
  notices,
  qnas,
});

export default rootReducer;
