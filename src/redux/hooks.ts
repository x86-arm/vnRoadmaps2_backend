import { authSlice } from "./slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "./selectors";
import { AppDispatch } from "./store";

export const useAuthStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stateAuthStore = useSelector(authSelector);
  return { stateAuthStore, dispatch, authSlice };
};
