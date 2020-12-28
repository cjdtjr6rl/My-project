import { combineReducers } from "redux";
import notices from "./notices";

const rootReducer = combineReducers({
  notices,
});

export default rootReducer;
