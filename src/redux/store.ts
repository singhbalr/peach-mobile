import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../screens/auth/rx/reducer";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createDebugger = require("redux-flipper").default;
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// const middleware = [thunk];
// if (process.env.NODE_ENV === "development") {
//   const createDebugger = require("redux-flipper").default;

//   middleware.push(createDebugger);
// }
const middleware = [thunk, __DEV__ ? createDebugger() : ""];
const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
