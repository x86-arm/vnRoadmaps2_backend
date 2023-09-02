import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import { useDispatch } from "react-redux";

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: {
      auth: authReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
