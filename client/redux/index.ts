import { configureStore } from "@reduxjs/toolkit";
import currentGameDetailReducer from "./reducers/currentGameDetail";

export const store = configureStore({
  reducer: {
    currentGameDetailReducer: currentGameDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
