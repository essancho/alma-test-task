import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "./slices/leadsSlice";
// import authReducer from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // auth: authReducer,
      leads: leadsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

