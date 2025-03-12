import { configureStore } from "@reduxjs/toolkit";
import { authReducer, userReducer } from "./reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
