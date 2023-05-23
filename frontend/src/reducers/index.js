import { combineReducers } from "redux";

import userReducer from "./userReducer";
import itemReducer from "./itemReducer";

export const reducers = combineReducers({ userReducer, itemReducer });
