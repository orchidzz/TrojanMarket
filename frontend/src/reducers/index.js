import { combineReducers } from "@reduxjs/toolkit";
import { userReducer, authReducer } from "./userReducer";
import { getItemsReducer, buyReducer } from "./itemReducer";

const reducers = combineReducers({
    userReducer,
    authReducer,
    getItemsReducer,
    buyReducer,
});
export default reducers;
