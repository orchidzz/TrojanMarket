import { combineReducers } from "@reduxjs/toolkit";
import {
    userReducer,
    authReducer,
    rateReducer,
    sellerReducer,
} from "./userReducer";
import { getItemsReducer, buyReducer } from "./itemReducer";

const reducers = combineReducers({
    userReducer,
    authReducer,
    getItemsReducer,
    buyReducer,
    rateReducer,
    sellerReducer,
});
export default reducers;
