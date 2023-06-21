import thunkMiddleware from "redux-thunk";
import reducers from "../reducers/index";
import { configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunkMiddleware],
});
export const persistor = persistStore(store);
